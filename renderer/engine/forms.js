// Forms (5.0 Ch.6): Power, Upkeep and Awaken Limit from the book's formulas,
// and the Awaken / Ascend / Ramp Up actions (Ch.1, p.18–19).
//
// A form on a sheet that came from the book carries the book's strings
// (power "Ki Rank", upkeep "3 x Ki Rank", awaken "2x the Ki Upkeep"…), so it
// rescales as the fighter's Ki Rank grows. Hand-made forms keep plain numbers
// in powerBonus / upkeepCost, exactly as before.

// ---- Formula strings -------------------------------------------------------
// Understands numbers, Ki Rank, Proficiency Bonus (and half of it, rounded
// up), the form's own Ki Upkeep, + and x, and parentheses.
function evalAmount(str, ctx = {}) {
  if (str == null || str === "") return null;
  if (typeof str === "number") return str;
  let s = String(str).toLowerCase()
    .replace(/minimum/g, "")
    .replace(/half (?:your )?proficiency(?: bonus)?(?:, rounded up)?/g, "H")
    .replace(/\byour\b|\bthe\b/g, "")
    .replace(/ki rank/g, "K").replace(/proficiency bonus/g, "P")
    .replace(/(?:form|ki) upkeep/g, "U")
    .replace(/(\d)\s*x/g, "$1*").replace(/\s+x\s+/g, "*").replace(/×/g, "*")
    .replace(/\s+/g, "");
  if (!/^[\d+*()KPHU]+$/.test(s)) return null;
  const vars = { K: ctx.kiRank ?? 1, P: ctx.prof ?? 3, H: Math.ceil((ctx.prof ?? 3) / 2), U: ctx.upkeep ?? 0 };
  let i = 0;
  const num = () => {
    if (s[i] === "(") { i++; const v = sum(); i++; return v; }
    if (vars[s[i]] != null) return vars[s[i++]];
    let j = i; while (/\d/.test(s[j])) j++;
    const v = +s.slice(i, j); i = j; return v;
  };
  const prod = () => { let v = num(); while (s[i] === "*") { i++; v *= num(); } return v; };
  const sum = () => { let v = prod(); while (s[i] === "+") { i++; v += prod(); } return v; };
  const v = sum();
  return i === s.length && Number.isFinite(v) ? v : null;
}

// "Minimum 4" upkeeps let the fighter choose how much Ki to put in.
const isVariableUpkeep = (f) => /minimum/i.test(String(f && f.upkeep || ""));
const minUpkeep = (f) => evalAmount(f && f.upkeep, {}) || 0;

// Ki spent on the form's own Upkeep each turn (not counting modifications).
function formBaseUpkeep(f, ctx) {
  if (!f) return 0;
  if (f.bookId == null) return f.upkeepCost || 0;
  if (isVariableUpkeep(f)) return Math.max(minUpkeep(f), f.upkeepChoice || 0);
  const v = evalAmount(f.upkeep, ctx);
  return v ?? (f.upkeepCost || 0);
}

const activeMods = (f) => (f.modifications || []).filter(m => m.active);

// Ki Upkeep per turn: the form plus its active modifications.
function formUpkeep(f, ctx) {
  return formBaseUpkeep(f, ctx) + activeMods(f).reduce((s, m) => s + (m.upkeepIncrease || 0), 0);
}
// Hit Point Upkeep (Kaio-Ken), paid at the start of the turn.
function formHpUpkeep(f, ctx) {
  const base = f.bookId != null ? (evalAmount(f.hpUpkeep, ctx) || 0) : 0;
  return base + activeMods(f).reduce((s, m) => s + (m.hpUpkeepAdd || 0), 0);
}

function powerFrom(p, f, ctx) {
  if (typeof p === "number") {
    const at = f.powerAtKiRank || {};
    const best = Object.keys(at).filter(r => (ctx.kiRank ?? 1) >= +r).sort((a, b) => b - a)[0];
    return best ? at[best] : p;
  }
  const per = String(p || "").match(/^per (\d+) Ki$/);
  if (per) {
    const raw = Math.floor(formBaseUpkeep(f, ctx) / +per[1]);
    const cap = evalAmount(f.powerCap, ctx);
    return cap != null ? Math.min(raw, cap) : raw;
  }
  if (p === "varies") return f.powerBonus || 0;
  return evalAmount(p, ctx) ?? (f.powerBonus || 0);
}

// The Power Bonus a form grants right now, its modifications included.
function formPower(f, ctx) {
  if (!f) return 0;
  const base = f.bookId != null ? powerFrom(f.power, f, ctx) : (f.powerBonus || 0);
  return base + activeMods(f).reduce((s, m) => s + (m.bookId != null ? powerFrom(m.power, m, ctx) : (m.powerBonus || 0)), 0);
}
// The part of it that is Stable Power (exempt from Overload).
function formStablePower(f, ctx) {
  // Super Saiyan Grade 4: all of the form's Power becomes Stable Power.
  if (activeMods(f).some(m => m.stabilizes)) return formPower(f, ctx);
  const base = f.bookId != null && f.stable ? powerFrom(f.power, f, ctx) : 0;
  return base + activeMods(f).reduce((s, m) => s + (m.stable ? powerFrom(m.power, m, ctx) : 0), 0);
}

// Awaken Limit: you need more current Ki than this to start the form, and
// the active modifications' limits add to it.
function formAwakenLimit(f, ctx, mods = activeMods(f)) {
  const own = f.bookId != null ? (evalAmount(f.awaken, { ...ctx, upkeep: formBaseUpkeep(f, ctx) }) || 0) : (parseInt(f.awakenLimit, 10) || 0);
  return own + mods.reduce((s, m) => s + (evalAmount(m.awaken, ctx) || parseInt(m.awakenLimit, 10) || 0), 0);
}

// Stamina paid once to Ascend into a God Form ("4 Stamina", "1 Stamina per 3 Ki Upkeep").
function ascendCost(f, ctx) {
  const c = String(f && f.costToAscend || "");
  if (!c) return 0;
  const per = c.match(/(\d+) Stamina per (\d+) Ki Upkeep/i);
  if (per) return Math.ceil(formBaseUpkeep(f, ctx) / +per[2]) * +per[1];
  return parseInt(c, 10) || 0;
}

const formKind = (f) => f.kind || (/power-?up/i.test(f.formType || "") ? "Power-Up" : "Transformation");

// Can this form be switched on? Book rules: one Transformation and one
// Power-Up at a time, never two forms from the same Family, and more current
// Ki than the Awaken Limit.
function awakenCheck(char, f, ctx, mods = []) {
  const others = (char.forms || []).filter(x => x.active && x.id !== f.id);
  const slot = others.find(x => formKind(x) === formKind(f));
  if (slot) return { ok: false, reason: `${slot.name} is already in your ${formKind(f)} slot` };
  const fam = f.family && others.find(x => x.family && x.family === f.family);
  if (fam) return { ok: false, reason: `${fam.name} is in the same Form Family` };
  const limit = formAwakenLimit(f, ctx, mods);
  const ki = (char.ki || 0) + ((char.temp && char.temp.ki) || 0);
  if (ki <= limit) return { ok: false, reason: `needs more than ${limit} Ki (you have ${ki})` };
  const stamina = f.godly ? ascendCost(f, ctx) : 0;
  if (stamina > ((char.stamina || 0) + ((char.temp && char.temp.stamina) || 0))) return { ok: false, reason: `needs ${stamina} Stamina to Ascend` };
  return { ok: true, limit, stamina };
}

// What the action is called in the book: Ascend for God Forms, Awaken (Major
// as an Action for Transformations, Minor as a Bonus Action for Power-Ups).
function awakenActionName(f) {
  const minor = formKind(f) === "Power-Up";
  return `${f.godly ? "Ascend" : "Awaken"} (${minor ? "Minor" : "Major"}) · ${minor ? "Bonus Action" : "Action"}`;
}

// Ramp Up (Bonus Action): add a modification to an active form. Only one
// modification per form, unless the book lets a group stack as one; swapping
// pays only the difference in Upkeep.
function rampUpCheck(char, f, mod, ctx) {
  if (!f.active) return { ok: false, reason: `${f.name} isn't active` };
  const ki = (char.ki || 0) + ((char.temp && char.temp.ki) || 0);
  const limit = evalAmount(mod.awaken, ctx) || parseInt(mod.awakenLimit, 10) || 0;
  if (ki <= limit) return { ok: false, reason: `needs more than ${limit} Ki (you have ${ki})` };
  const current = activeMods(f).filter(m => m.id !== mod.id);
  const swapFrom = current.length && !mod.stacks ? current : [];
  const extra = Math.max(0, (mod.upkeepIncrease || 0) - swapFrom.reduce((s, m) => s + (m.upkeepIncrease || 0), 0));
  // A modification with a Cost to Ascend pays Stamina now and its Upkeep from next turn.
  const stamina = parseInt(mod.costToAscend, 10) || 0;
  return { ok: true, limit, swapFrom: swapFrom.map(m => m.id), cost: stamina ? 0 : extra, stamina };
}

export {
  evalAmount,
  isVariableUpkeep,
  minUpkeep,
  formBaseUpkeep,
  formUpkeep,
  formHpUpkeep,
  formPower,
  formStablePower,
  formAwakenLimit,
  ascendCost,
  formKind,
  awakenCheck,
  awakenActionName,
  rampUpCheck,
};

// ---- Book forms on a sheet --------------------------------------------------
const normName = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
// Form-Specific Modifications printed for a form (Kaio-Ken! takes the Kaio-Ken list).
const modsForForm = (book, modData) => modData.filter(m => normName(m.forForm) === normName(book.name) || normName(m.forForm) === normName(book.name).replace(/s$/, ""));

function modFromBook(m, id) {
  return {
    id, bookId: m.id, name: m.name, active: false,
    power: m.power, stable: !!m.stable, powerAtKiRank: m.powerAtKiRank,
    powerBonus: typeof m.power === "number" ? m.power : 0,
    awaken: m.awaken, upkeepIncrease: m.upkeepAdd || 0, hpUpkeepAdd: m.hpUpkeepAdd || 0,
    costToAscend: m.costToAscend, stacks: !!m.stacks, stabilizes: !!m.stabilizes,
    req: [m.kiRank ? `Ki Rank ${m.kiRank}` : "", m.level ? `Level ${m.level}` : "", m.prereq || ""].filter(Boolean).join(", "),
    description: m.text,
  };
}

function formFromBook(book, modData, makeId) {
  return {
    id: makeId(), bookId: book.id, name: book.name, active: false,
    formType: `${book.godly ? "Godly " : ""}${book.kind}`, kind: book.kind, godly: !!book.godly,
    family: book.family || null,
    power: book.power, powerCap: book.powerCap || null, powerAtKiRank: book.powerAtKiRank, stable: !!book.stable,
    powerBonus: typeof book.power === "number" ? book.power : 0,
    upkeep: book.upkeep, hpUpkeep: book.hpUpkeep, upkeepChoice: minUpkeep(book) || 0,
    upkeepCost: evalAmount(book.upkeep, {}) ?? 0,
    awaken: book.awaken, awakenLimit: book.awaken || "", costToAscend: book.costToAscend,
    berserkDC: book.berserkDC || null, multiplier: "", giga: 0, auraColor: "",
    description: book.text,
    modifications: modsForForm(book, modData).map(m => modFromBook(m, makeId())),
  };
}

export { modsForForm, modFromBook, formFromBook };
