import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Minus, Plus, Search, Trash2, Zap } from "lucide-react";
import { emitRoll } from "../../app/bus.js";
import { FORM_DATA, FORM_MOD_DATA } from "../../data/form-data.js";
import { formCtx } from "../../engine/core.js";
import { spendPatch } from "../../engine/damage.js";
import { ascendCost, awakenActionName, awakenCheck, formAwakenLimit, formBaseUpkeep, formFromBook, formHpUpkeep, formKind, formPower, formUpkeep, isVariableUpkeep, minUpkeep, rampUpCheck } from "../../engine/forms.js";
import { uid } from "../../lib/dice.js";
import { Btn, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ===== Forms from the 5.0 book (Ch.6) =====
   The picker that adds book forms to a sheet, and the play card that runs
   Awaken / Ascend, Variable Upkeep and Ramp Up for them. */

const SECTION_LABEL = { biology: "Biology", general: "General", restricted: "Restricted (DM's call)" };
const statLine = (b) => [
  b.power === 0 ? null : typeof b.power === "number" ? `+${b.power} ${b.stable ? "Stable Power" : "Power"}` : `Power ${b.power}${b.powerCap ? ` (max ${b.powerCap})` : ""}`,
  b.awaken != null ? `Awaken ${b.awaken}` : null,
  b.costToAscend ? `Ascend ${b.costToAscend}` : null,
  b.upkeep ? `Upkeep ${b.upkeep}` : b.hpUpkeep ? `${b.hpUpkeep} HP Upkeep` : null,
].filter(Boolean).join(" · ");

function KindTags({ f }) {
  return (
    <>
      <Tag color={formKind(f) === "Power-Up" ? COLORS.blue : COLORS.gold}>{formKind(f)}</Tag>
      {f.godly && <Tag color={COLORS.purple}>Godly</Tag>}
      {(f.berserkDC || f.berserker) && <Tag color={COLORS.red}>Berserker</Tag>}
    </>
  );
}

// Which book forms this fighter can take: their species' Biology forms, the
// heritage Biology forms (Prehistoric Blood, S-Cell Overload, Speedsters),
// General forms, and Restricted forms the DM hands out.
function BookFormPicker({ char, forms, set }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const has = (b) => forms.some(f => f.bookId === b.id);
  const species = (char.species || "").toLowerCase();
  const list = useMemo(() => FORM_DATA.filter(b => {
    if (q && !`${b.name} ${b.family || ""} ${b.group}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (showAll || q) return true;
    return b.section !== "biology" || !b.species || species.includes(b.species.toLowerCase());
  }), [q, showAll, species]);
  const add = (b) => set({ forms: [...forms, formFromBook(b, FORM_MOD_DATA, uid)] });
  const groups = ["biology", "general", "restricted"].map(s => [s, list.filter(b => b.section === s)]).filter(([, l]) => l.length);
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Forms from the book</span>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative", width: 220 }}>
          <Search size={13} style={{ position: "absolute", left: 9, top: 9, color: COLORS.dim }} />
          <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search forms" style={{ paddingLeft: 28, padding: "5px 8px 5px 28px" }} />
        </div>
        <Btn size="sm" variant="ghost" onClick={() => setShowAll(v => !v)}>{showAll ? "Only mine" : "Every species"}</Btn>
      </div>
      {groups.map(([sec, l]) => (
        <div key={sec} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{SECTION_LABEL[sec]}</div>
          {l.map(b => {
            const isOpen = open === b.id;
            return (
              <div key={b.id} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "6px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <button onClick={() => setOpen(isOpen ? null : b.id)} aria-expanded={isOpen} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.text, display: "flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 12.5 }}>
                    {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}{b.name}
                  </button>
                  <KindTags f={b} />
                  <span style={{ fontSize: 11, color: COLORS.dim }}>{b.species || b.group}{b.family && b.family !== b.name ? ` · ${b.family} Family` : ""}</span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: 11, color: COLORS.muted, fontFamily: FONTS.mono }}>{statLine(b)}</span>
                  <Btn size="sm" variant={has(b) ? "ghost" : "gold"} disabled={has(b)} onClick={() => add(b)}>{has(b) ? "Added" : <><Plus size={12} /> Add</>}</Btn>
                </div>
                {isOpen && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.55, whiteSpace: "pre-line", margin: "6px 0 2px 18px" }}>{b.text}<div style={{ color: COLORS.dim, fontSize: 11, marginTop: 4 }}>5.0 Beta p. {b.page}{b.learnedAs ? ` · learned as ${b.learnedAs}` : ""}</div></div>}
              </div>
            );
          })}
        </div>
      ))}
      {groups.length === 0 && <div style={{ fontSize: 12, color: COLORS.dim }}>No forms match.</div>}
    </div>
  );
}

// A book form in play: its live numbers, Awaken / Ascend, the Ki it runs on
// (Variable Form Upkeep) and its modifications with Ramp Up.
function BookFormCard({ char, form: f, set, onRemove }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const ctx = formCtx(char);
  const forms = char.forms || [];
  const update = (patch) => set({ forms: forms.map(x => x.id === f.id ? { ...x, ...patch } : x) });
  const power = formPower(f, ctx), upkeep = formUpkeep(f, ctx), hpUp = formHpUpkeep(f, ctx);
  const limit = formAwakenLimit(f, ctx, []);
  const check = f.active ? null : awakenCheck(char, f, ctx);

  const awaken = () => {
    const r = awakenCheck(char, f, ctx);
    if (!r.ok) { setMsg(r.reason); return; }
    // God Forms pay their Cost to Ascend now and Upkeep from next turn;
    // everything else pays its Upkeep to start.
    const pool = f.godly && r.stamina ? "stamina" : "ki";
    const amount = pool === "stamina" ? r.stamina : formUpkeep(f, ctx);
    const paid = amount > 0 ? spendPatch(char, pool, amount) : {};
    if (!paid) { setMsg(`not enough ${pool === "ki" ? "Ki" : "Stamina"} for ${amount}`); return; }
    set({ ...paid, forms: forms.map(x => x.id === f.id ? { ...x, active: true } : x) });
    setMsg("");
    emitRoll({ label: `${char.name || "Fighter"}: ${f.name}`, detail: `${awakenActionName(f).split(" · ")[0]} · −${amount} ${pool === "ki" ? "Ki" : "Stamina"}`, color: COLORS.gold, share: true, who: char.name || "" });
  };
  const end = () => { update({ active: false, modifications: (f.modifications || []).map(m => ({ ...m, active: false })) }); setMsg(""); };
  const rampUp = (mod) => {
    const r = rampUpCheck(char, f, mod, ctx);
    if (!r.ok) { setMsg(r.reason); return; }
    const pool = r.stamina ? "stamina" : "ki";
    const amount = r.stamina || r.cost;
    const paid = amount > 0 ? spendPatch(char, pool, amount) : {};
    if (!paid) { setMsg(`not enough ${pool === "ki" ? "Ki" : "Stamina"} for ${amount}`); return; }
    const mods = (f.modifications || []).map(m => m.id === mod.id ? { ...m, active: true } : r.swapFrom.includes(m.id) ? { ...m, active: false } : m);
    set({ ...paid, forms: forms.map(x => x.id === f.id ? { ...x, modifications: mods } : x) });
    setMsg("");
    emitRoll({ label: `${char.name || "Fighter"}: ${mod.name}`, detail: `Ramp Up · ${amount ? `−${amount} ${pool === "ki" ? "Ki" : "Stamina"}` : "no cost now"}`, color: COLORS.gold, share: true, who: char.name || "" });
  };
  const dropMod = (mod) => update({ modifications: (f.modifications || []).map(m => m.id === mod.id ? { ...m, active: false } : m) });

  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${f.active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{f.name}</span>
        <KindTags f={f} />
        <div style={{ flex: 1 }} />
        {onRemove && <Btn size="sm" variant="danger" onClick={onRemove} aria-label={`Remove ${f.name}`}><Trash2 size={12} /></Btn>}
        {f.active
          ? <Btn size="sm" onClick={end}>End form</Btn>
          : <Btn size="sm" variant="gold" onClick={awaken} title={check && !check.ok ? check.reason : awakenActionName(f)} style={check && !check.ok ? { opacity: 0.6 } : {}}><Zap size={12} /> {f.godly ? "Ascend" : "Awaken"}</Btn>}
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 11, color: COLORS.muted, fontFamily: FONTS.mono, flexWrap: "wrap" }}>
        <span style={{ color: COLORS.gold }}>+{power} {f.stable ? "Stable" : "Pwr"}</span>
        <span>Upkeep {upkeep} Ki{hpUp ? ` · ${hpUp} HP` : ""}</span>
        <span>Awaken &gt; {limit} Ki</span>
        {f.godly && f.costToAscend && <span>Ascend {ascendCost(f, ctx)} Stamina</span>}
        {f.berserkDC && <span style={{ color: COLORS.red }}>Berserk DC {f.berserkDC}</span>}
      </div>
      <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 3 }}>{f.active ? "Active" : awakenActionName(f)}{!f.active && check && !check.ok ? ` · ${check.reason}` : ""}</div>
      {isVariableUpkeep(f) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Ki into Upkeep</span>
          <Btn size="sm" onClick={() => update({ upkeepChoice: Math.max(minUpkeep(f), formBaseUpkeep(f, ctx) - 1) })} aria-label="Less Ki"><Minus size={11} /></Btn>
          <span style={{ fontFamily: FONTS.mono, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{formBaseUpkeep(f, ctx)}</span>
          <Btn size="sm" onClick={() => update({ upkeepChoice: formBaseUpkeep(f, ctx) + 1 })} aria-label="More Ki"><Plus size={11} /></Btn>
          <span style={{ fontSize: 11, color: COLORS.dim }}>minimum {minUpkeep(f)}</span>
        </div>
      )}
      {msg && <div style={{ fontSize: 11.5, color: COLORS.red, marginTop: 6 }}>Can't: {msg}</div>}
      {(f.modifications || []).length > 0 && (
        <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 6 }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Modifications{f.active ? " · Ramp Up is a Bonus Action" : ""}</div>
          {f.modifications.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 0" }} title={m.description}>
              <span style={{ fontSize: 11.5, color: m.active ? COLORS.gold : COLORS.text, fontWeight: m.active ? 700 : 400, flex: 1 }}>{m.name}{m.req ? <span style={{ color: COLORS.dim, fontWeight: 400 }}> · {m.req}</span> : null}</span>
              <span style={{ fontSize: 10, color: COLORS.muted, fontFamily: FONTS.mono }}>{m.upkeepIncrease ? `+${m.upkeepIncrease} Ki` : m.hpUpkeepAdd ? `+${m.hpUpkeepAdd} HP` : ""}</span>
              {f.active && (m.active
                ? <Btn size="sm" variant="ghost" onClick={() => dropMod(m)}>Drop</Btn>
                : <Btn size="sm" onClick={() => rampUp(m)}>Ramp Up</Btn>)}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{ marginTop: 6, background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.blue, fontSize: 11.5, display: "flex", alignItems: "center", gap: 4 }}>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Rules
      </button>
      {open && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.55, whiteSpace: "pre-line", marginTop: 4 }}>{f.description}</div>}
    </div>
  );
}

export { BookFormPicker, BookFormCard };
