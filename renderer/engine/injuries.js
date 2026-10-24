/* ===== Injuries: where they land, what they do, and the scars they leave =====
   Two tables feed the Vitals body model:
   - The book's Lingering Injury table (Crippled Condition, 5.0 p.11), rolled
     once for each rank of Crippled a creature gains.
   - The Crit Injury table, a house rule: a Critical Hit that lands also rolls
     an injury where it hit. The table rows are editable in GM Tools → House
     Rules, so a table can swap in its own alternate crits.
   Every injury sits on a body part. A serious one leaves a scar on that part
   once it heals; lost limbs and eyes show on the model until restored. */

const BODY_PARTS = [
  { key: "head",  label: "Head",      group: "head", x: 120, y: 60 },
  { key: "torso", label: "Torso",     group: "body", x: 120, y: 160 },
  { key: "armR",  label: "Right Arm", group: "arms", x: 66,  y: 190 },
  { key: "armL",  label: "Left Arm",  group: "arms", x: 174, y: 190 },
  { key: "legR",  label: "Right Leg", group: "legs", x: 105, y: 330 },
  { key: "legL",  label: "Left Leg",  group: "legs", x: 135, y: 330 },
  { key: "tail",  label: "Tail",      group: "body", x: 160, y: 236 },
];
const partByKey = (k) => BODY_PARTS.find(p => p.key === k) || null;
const partLabel = (k) => (partByKey(k) || { label: "Body" }).label;

const d = (n, rng) => Math.floor(rng() * n) + 1;

// d20 hit location when an attack didn't name one (Any).
const LOCATION_ROLL = [[2, "head"], [10, "torso"], [13, "armR"], [15, "armL"], [18, "legR"], [20, "legL"]];
function rollBodyPart(rng = Math.random) {
  const r = d(20, rng);
  return LOCATION_ROLL.find(([max]) => r <= max)[1];
}
// A hit location from the damage panel (any / head / body / arms / legs) to a part.
function partForLocation(location, rng = Math.random) {
  if (location === "head") return "head";
  if (location === "body") return "torso";
  if (location === "arms") return rng() < 0.5 ? "armR" : "armL";
  if (location === "legs") return rng() < 0.5 ? "legR" : "legL";
  return rollBodyPart(rng);
}
const groupOf = (part) => (partByKey(part) || {}).group || "body";

/* Lingering Injury table (book). `part` says where it lands: a fixed part, a
   group (an arm or a leg, the struck side when the hit was there), or "hit"
   for wherever the blow landed. `lost` marks a missing eye or limb on the
   model; `scar` draws a scar right away. */
const LINGERING_INJURIES = [
  { min: 1,  max: 1,  key: "eye",      name: "Lost an Eye",            part: "head", serious: true, lost: "eye",
    effect: "Disadvantage on sight-based Wisdom (Perception) checks; −2 to Ranged and Shot Attack Rolls. No eyes left: Blinded.",
    heal: "Regenerate, or similar magic, restores the eye." },
  { min: 2,  max: 2,  key: "arm",      name: "Lost an Arm or Hand",    part: "arms", serious: true, lost: "limb",
    effect: "Hold only one object, nothing two-handed. Action and Bonus Action Techniques take 1 step longer to cast.",
    heal: "Healing from a 4th-level spell or higher restores it." },
  { min: 3,  max: 3,  key: "leg",      name: "Lost a Foot or Leg",     part: "legs", serious: true, lost: "limb",
    effect: "Walk Speed halved; needs a cane, crutch or prosthesis to move.",
    heal: "Healing from a 4th-level spell or higher restores it." },
  { min: 4,  max: 4,  key: "tail",     name: "Tailless",               part: "tail", serious: true, lost: "limb",
    effect: "The tail is gone for good, and no feature regrows it. No tail: no effect.",
    heal: "Healing from a 4th-level spell or higher regrows it." },
  { min: 5,  max: 7,  key: "majorInt", name: "Major Internal Injury",  part: "torso", serious: true,
    effect: "Once per combat, when you take an Action: DC 20 Con save or Dazed until the start of your next turn.",
    heal: "6th-level healing or higher, or ten days of nothing but rest." },
  { min: 8,  max: 10, key: "minorInt", name: "Minor Internal Injury",  part: "torso", serious: false,
    effect: "Once per combat, when you take an Action: DC 15 Con save or Dazed until the start of your next turn.",
    heal: "6th-level healing or higher, or ten days of nothing but rest." },
  { min: 11, max: 13, key: "horrible", name: "Horrible Scar",          part: "hit", serious: true, scar: true,
    effect: "−1 to Charisma (Persuasion), +1 to Charisma (Intimidation).",
    heal: "2nd-level healing or higher removes the scar." },
  { min: 14, max: 16, key: "fester",   name: "Festering Wound",        part: "hit", serious: true, festering: true,
    effect: "Maximum HP drops by 1 every 24 hours (each Long Rest). At 0 Maximum HP you die.",
    heal: "Any magical healing, or ten successful DC 15 Wisdom (Medicine) checks, one per day." },
  { min: 17, max: 20, key: "minorScar", name: "Minor Scar",            part: "hit", serious: false, scar: true,
    effect: "No mechanical effect.",
    heal: "2nd-level healing or higher removes the scar." },
];

/* Crit Injury table (house rule, editable). One d6 table per hit location;
   5–6 are serious and scar. Conditions listed in `adds` go onto the target's
   tracker row automatically. */
const CRIT_INJURIES = [
  { group: "head", min: 1, max: 2, name: "Ringing Blow",     serious: false, adds: ["Dazed"], rounds: 1,
    effect: "Dazed until the end of your next turn.", heal: "Ends on its own." },
  { group: "head", min: 3, max: 4, name: "Concussion",       serious: false,
    effect: "Disadvantage on Intelligence and Wisdom checks; −2 to Concentration saves.", heal: "A Long Rest, or a Healer's Kit and a DC 15 Medicine check." },
  { group: "head", min: 5, max: 5, name: "Cracked Skull",    serious: true, adds: ["Dazed"], rounds: 1,
    effect: "Dazed until the end of your next turn. −2 to Wisdom saves until healed.", heal: "Magical healing of 3rd level or higher, or a week of rest." },
  { group: "head", min: 6, max: 6, name: "Eye Torn",         serious: true, lost: "eye",
    effect: "Disadvantage on sight-based Perception; −2 to Ranged and Shot Attack Rolls.", heal: "Regenerate, or similar magic." },
  { group: "body", min: 1, max: 2, name: "Winded",           serious: false,
    effect: "Lose 1d4 Stamina; no Breather this round.", heal: "Ends at the end of your next turn." },
  { group: "body", min: 3, max: 4, name: "Cracked Ribs",     serious: false,
    effect: "Stamina costs +1 until healed.", heal: "A Long Rest, or a Healer's Kit and a DC 15 Medicine check." },
  { group: "body", min: 5, max: 5, name: "Ruptured Organ",   serious: true, adds: ["Wounded"],
    effect: "Wounded: every Stamina cost is doubled.", heal: "A Healer's Kit as an Action, a Long Rest, or Greater Restoration." },
  { group: "body", min: 6, max: 6, name: "Impaled Through",  serious: true, adds: ["Impaled"],
    effect: "Impaled. Ki damage at the start of each turn until removed.", heal: "Remove the object as an Action, then magical healing or a Long Rest." },
  { group: "arms", min: 1, max: 2, name: "Numb Arm",         serious: false,
    effect: "−2 to attacks with that arm until the end of your next turn.", heal: "Ends on its own." },
  { group: "arms", min: 3, max: 4, name: "Sprained Wrist",   serious: false,
    effect: "Disadvantage on Strength checks with that arm; drop what it holds.", heal: "A Long Rest, or a Healer's Kit and a DC 15 Medicine check." },
  { group: "arms", min: 5, max: 5, name: "Broken Arm",       serious: true, adds: ["Disabled"],
    effect: "Disabled for 1 minute. That arm can't hold anything until healed.", heal: "Magical healing of 2nd level or higher, or two weeks in a sling." },
  { group: "arms", min: 6, max: 6, name: "Arm Severed",      serious: true, lost: "limb",
    effect: "One object at a time; Action and Bonus Action Techniques take 1 step longer.", heal: "Healing from a 4th-level spell or higher." },
  { group: "legs", min: 1, max: 2, name: "Dead Leg",         serious: false,
    effect: "−10 ft Walk Speed until the end of your next turn.", heal: "Ends on its own." },
  { group: "legs", min: 3, max: 4, name: "Torn Muscle",      serious: false,
    effect: "Walk Speed −10 ft; Disadvantage on Dexterity (Acrobatics).", heal: "A Long Rest, or a Healer's Kit and a DC 15 Medicine check." },
  { group: "legs", min: 5, max: 5, name: "Shattered Knee",   serious: true, adds: ["Prone"],
    effect: "Knocked Prone. Walk Speed halved until healed.", heal: "Magical healing of 2nd level or higher, or two weeks of rest." },
  { group: "legs", min: 6, max: 6, name: "Leg Severed",      serious: true, lost: "limb",
    effect: "Walk Speed halved; needs a crutch or prosthesis.", heal: "Healing from a 4th-level spell or higher." },
];

const uid = () => Math.random().toString(36).slice(2, 10);

function placePart(rule, hitPart, rng) {
  if (rule === "hit") return hitPart;
  if (rule === "arms") return groupOf(hitPart) === "arms" ? hitPart : (rng() < 0.5 ? "armR" : "armL");
  if (rule === "legs") return groupOf(hitPart) === "legs" ? hitPart : (rng() < 0.5 ? "legR" : "legL");
  return rule;
}

function makeInjury(row, part, extra) {
  return {
    id: uid(), name: row.name, location: part, serious: !!row.serious,
    effect: row.effect || "", heal: row.heal || "", notes: "",
    ...(row.lost ? { lost: row.lost } : {}), ...(row.scar ? { scar: true } : {}),
    ...(row.festering ? { festering: true, maxHpLost: 0 } : {}),
    ...(row.adds && row.adds.length ? { adds: row.adds, rounds: row.rounds ?? null } : {}),
    ...extra,
  };
}

// Lingering Injury (one roll per rank of Crippled). `location` is the hit
// location key, if the blow that crippled them named one.
function rollLingeringInjury({ location = "any", rng = Math.random } = {}) {
  const r = d(20, rng);
  const row = LINGERING_INJURIES.find(x => r >= x.min && r <= x.max);
  const hitPart = partForLocation(location, rng);
  return makeInjury(row, placePart(row.part, hitPart, rng), { source: "Lingering Injury", roll: r, die: "d20" });
}

// Crit Injury, rolled where the Critical Hit landed. `rows` overrides the
// table (a table's own alternate crits).
function rollCritInjury({ location = "any", rng = Math.random, rows = CRIT_INJURIES } = {}) {
  const part = partForLocation(location, rng);
  const group = groupOf(part) === "body" ? "body" : groupOf(part);
  const table = (rows || []).filter(x => x.group === group);
  const die = Math.max(1, ...table.map(x => x.max || 0));
  const r = d(die, rng);
  const row = table.find(x => r >= x.min && r <= x.max) || table[0];
  if (!row) return null;
  return makeInjury(row, row.lost === "limb" ? placePart(groupOf(part), part, rng) : part, { source: "Crit Injury", roll: r, die: `d${die}` });
}

// The patch for adding injuries to a sheet (or NPC / tracker row).
function addInjuriesPatch(target, injuries) {
  return { injuries: [...(target.injuries || []), ...injuries.filter(Boolean)] };
}

// Healing an injury removes it. A serious one leaves a scar on its part;
// a Festering Wound gives back the Maximum HP it took.
function healInjuryPatch(target, injuryId, when = Date.now()) {
  const inj = (target.injuries || []).find(x => x.id === injuryId);
  if (!inj) return null;
  const patch = { injuries: (target.injuries || []).filter(x => x.id !== injuryId) };
  if (inj.serious || inj.scar) patch.scars = [...(target.scars || []), { id: uid(), location: inj.location, from: inj.name, at: when }];
  if (inj.festering && inj.maxHpLost) patch.maxHp = (target.maxHp || 0) + inj.maxHpLost;
  return patch;
}

// A Long Rest is a day: each Festering Wound takes 1 Maximum HP.
function longRestInjuryPatch(target) {
  const fest = (target.injuries || []).filter(x => x.festering);
  if (!fest.length) return null;
  const lost = fest.length;
  const maxHp = Math.max(0, (target.maxHp || 0) - lost);
  return {
    maxHp, hp: Math.min(target.hp || 0, maxHp),
    injuries: (target.injuries || []).map(x => x.festering ? { ...x, maxHpLost: (x.maxHpLost || 0) + 1 } : x),
  };
}

// For the body model: what to draw on each part.
function bodyMarks(target) {
  const marks = {};
  for (const p of BODY_PARTS) marks[p.key] = { injuries: [], scars: [], lost: null };
  for (const i of target.injuries || []) {
    const m = marks[i.location] || marks.torso;
    m.injuries.push(i);
    if (i.lost === "limb") m.lost = "limb";
    else if (i.lost === "eye" && !m.lost) m.lost = "eye";
  }
  for (const s of target.scars || []) (marks[s.location] || marks.torso).scars.push(s);
  return marks;
}

const injuryLine = (i) => `${i.name} (${partLabel(i.location)})`;

export {
  BODY_PARTS, partByKey, partLabel, rollBodyPart, partForLocation,
  LINGERING_INJURIES, CRIT_INJURIES,
  rollLingeringInjury, rollCritInjury, addInjuriesPatch, healInjuryPatch, longRestInjuryPatch,
  bodyMarks, injuryLine,
};
