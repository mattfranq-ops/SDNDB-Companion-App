import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { CONDITIONS_DATA, activeConditionPower, activeFormPower, activeFormUpkeep, benefitsOfPower, charTotalLevel } from "../../engine/core.js";
import { computeOverload } from "../../engine/derived.js";
import { AURA_SWATCHES } from "../../engine/spellcasting.js";
import { uid } from "../../lib/dice.js";
import { Btn, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { BookFormCard, BookFormPicker } from "./forms-book.jsx";

const blankForm = () => ({ id: uid(), name: "New Form", formType: "Transformation", powerBonus: 1, bulk: "", upkeepCost: 0, multiplier: "", awakenLimit: "", giga: 0, description: "", active: false, auraColor: "", modifications: [] });

const blankFormMod = () => ({ id: uid(), name: "New Modification", powerBonus: 0, upkeepIncrease: 0, multiplier: "", description: "", active: false });

function ConditionCard({ cond, active, onToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onToggle} title="Toggle active" style={{ background: active ? COLORS.gold : "transparent", border: `1px solid ${active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: active ? "#0A0C11" : COLORS.muted, fontSize: 10, fontWeight: 700, padding: "3px 9px", cursor: "pointer", whiteSpace: "nowrap" }}>{active ? "ACTIVE" : "off"}</button>
        <span style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{cond.name}</span>
        {cond.power > 0 && <span style={{ fontSize: 10, color: COLORS.gold }}>+{cond.power} Pwr</span>}
        <span onClick={() => setOpen(!open)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 10.5 }}>{open ? "hide" : "details"}</span>
      </div>
      {open && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5, whiteSpace: "pre-line", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>{cond.text}</div>}
    </div>
  );
}

function ConditionsPanel({ char, set }) {
  const active = char.activeConditions || {};
  const toggle = (id) => set({ activeConditions: { ...active, [id]: !active[id] } });
  const boosted = CONDITIONS_DATA.filter(c => c.group === "Boosted");
  const singles = CONDITIONS_DATA.filter(c => c.group !== "Boosted");
  const condPower = activeConditionPower(char);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Special Conditions</div>
        {condPower > 0 && <div style={{ fontSize: 11, color: COLORS.gold }}>+{condPower} Power from active conditions</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {singles.map(c => <ConditionCard key={c.id} cond={c} active={!!active[c.id]} onToggle={() => toggle(c.id)} />)}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Boosted (may have several at once)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
        {boosted.map(c => <ConditionCard key={c.id} cond={c} active={!!active[c.id]} onToggle={() => toggle(c.id)} />)}
      </div>
    </div>
  );
}

// Lightweight play-surface Forms tab: toggle on/off + reference box per form
// (name, upkeep, awaken limit, description). Editing/progression lives in Growth.
// Power Overload readout (book Ch.1) — lives on the Forms tab since Forms drive
// the Power that pushes you over the threshold.
function PowerOverloadCard({ char }) {
  const ov = computeOverload(char);
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Power Overload</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: ov.over > 0 ? COLORS.red : COLORS.green }}>{ov.current}</span>
        <span style={{ color: COLORS.dim, fontSize: 12 }}>/ {ov.threshold} threshold{ov.stable > 0 && <span style={{ color: COLORS.blue }}> · +{ov.stable} Stable exempt</span>}</span>
      </div>
      {ov.over > 0 ? (
        <div style={{ fontSize: 11.5, color: COLORS.red }}>Overloaded by {ov.over} — take {ov.damage} at start of turn, Ki Control save DC {10 + ov.current} or Dazed.</div>
      ) : (
        <div style={{ fontSize: 11.5, color: COLORS.green }}>Within safe threshold (Prof +1{char.overloadMod ? ` ${char.overloadMod >= 0 ? "+" : ""}${char.overloadMod}` : ""}).</div>
      )}
    </div>
  );
}

// Benefits of Power readout — the active Static Bonuses granted by the current
// Power Bonus (book Ch.1). Auto-applied throughout the sheet; this just shows what
// is live so a transformed fighter can see their bonuses at a glance.
function BenefitsOfPowerCard({ char }) {
  const b = benefitsOfPower(char);
  const rows = [
    b.energy > 0 && [`Energy ×${b.energy}`, `+${b.energy} Attack Rolls & Save DCs · −${b.energy} Ki Control / Ki Stealth`, COLORS.blue],
    b.toughness > 0 && [`Toughness ×${b.toughness}`, `+${b.toughness} AC · +${b.toughness} Saving Throws · +${b.toughness} DR · ×${Math.pow(2, b.toughness)} Carry`, COLORS.green],
    b.physical > 0 && [`Physical ×${b.physical}`, `+${b.physical} Attack-Action damage · +${b.physical * 5} ft Speed · ignore ${b.physical} DR`, COLORS.gold],
    b.extra > 0 && [`Overpowered +${b.extra}`, `+${b.extra} Attack-Action damage · +${b.extra} DR`, COLORS.red],
  ].filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Benefits of Power</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rows.map(([label, desc, color]) => (
          <div key={label} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color, fontWeight: 700, fontSize: 12, minWidth: 96, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.4 }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormsPlayTab({ char, set }) {
  const forms = char.forms || [];
  const activePower = activeFormPower(char);
  const activeUpkeep = activeFormUpkeep(char);
  const toggle = (i) => set({ forms: forms.map((f, j) => j === i ? { ...f, active: !f.active } : f) });
  const toggleMod = (i, mi) => set({ forms: forms.map((f, j) => j === i ? { ...f, modifications: f.modifications.map((m, k) => k === mi ? { ...m, active: !m.active } : m) } : f) });
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Form Power</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gold }}>{activePower >= 0 ? "+" : ""}{activePower}</div>
        </div>
        <div style={{ flex: 1, background: `${COLORS.blue}12`, border: `1px solid ${COLORS.blue}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Ki Upkeep / Turn</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.blue }}>{activeUpkeep}</div>
        </div>
      </div>
      {forms.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5 }}>No Forms yet. Add forms from the book or your own in the <span style={{ color: COLORS.gold }}>Growth</span> tab; they show here to run in play.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
          {forms.map((f, i) => f.bookId ? <BookFormCard key={f.id} char={char} form={f} set={set} /> : (
            <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${f.active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <button onClick={() => toggle(i)} title="Toggle active" style={{ background: f.active ? COLORS.gold : "transparent", border: `1px solid ${f.active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: f.active ? "#0A0C11" : COLORS.muted, fontSize: 10, fontWeight: 700, padding: "3px 9px", cursor: "pointer" }}>{f.active ? "ACTIVE" : "off"}</button>
                <span style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{f.name}</span>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10.5, color: COLORS.muted, fontFamily: FONTS.mono, marginBottom: f.description ? 6 : 0 }}>
                {(f.powerBonus || 0) !== 0 && <span style={{ color: COLORS.gold }}>+{f.powerBonus} Pwr</span>}
                <span>Upkeep {f.upkeepCost || 0}</span>
                {f.awakenLimit && <span>Awaken {f.awakenLimit}</span>}
              </div>
              {f.description && <div style={{ fontSize: 11.5, color: COLORS.text, lineHeight: 1.45, whiteSpace: "pre-line" }}>{f.description}</div>}
              {(f.modifications || []).length > 0 && (
                <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                  {f.modifications.map((m, mi) => (
                    <div key={m.id} onClick={() => toggleMod(i, mi)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, flexShrink: 0, background: m.active ? COLORS.gold : "transparent", border: `1px solid ${m.active ? COLORS.gold : COLORS.dim}` }} />
                      <span style={{ fontSize: 11, color: m.active ? COLORS.text : COLORS.muted }}>{m.name}</span>
                      {(m.powerBonus || 0) !== 0 && <span style={{ fontSize: 9.5, color: COLORS.gold, marginLeft: "auto" }}>+{m.powerBonus}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FormsTab({ char, set }) {
  const forms = char.forms || [];
  const activePower = activeFormPower(char);
  const activeUpkeep = activeFormUpkeep(char);
  const updateForm = (i, patch) => set({ forms: forms.map((f, j) => j === i ? { ...f, ...patch } : f) });
  const addForm = () => set({ forms: [...forms, blankForm()] });
  const removeForm = (i) => set({ forms: forms.filter((_, j) => j !== i) });
  const addMod = (i) => updateForm(i, { modifications: [...(forms[i].modifications || []), blankFormMod()] });
  const updateMod = (i, mi, patch) => updateForm(i, { modifications: forms[i].modifications.map((m, j) => j === mi ? { ...m, ...patch } : m) });
  const removeMod = (i, mi) => updateForm(i, { modifications: forms[i].modifications.filter((_, j) => j !== mi) });

  const numIn = (val, on) => <TextInput type="number" value={val} onChange={e => on(+e.target.value || 0)} style={{ textAlign: "center", padding: "5px 6px" }} />;
  const txtIn = (val, on, ph) => <TextInput value={val} onChange={e => on(e.target.value)} placeholder={ph} style={{ padding: "5px 8px" }} />;

  return (
    <div>
      {/* Active totals banner */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Form Power</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gold }}>{activePower >= 0 ? "+" : ""}{activePower}</div>
        </div>
        <div style={{ flex: 1, background: `${COLORS.blue}12`, border: `1px solid ${COLORS.blue}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Ki Upkeep / Turn</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.blue }}>{activeUpkeep}</div>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 12 }}>Forms from the book use their printed Power, Upkeep and Awaken Limit and scale with your Ki Rank. Awaken one to start it (you need more Ki than its Awaken Limit); the tracker takes its Upkeep each turn.</div>

      {forms.length === 0 && <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 12 }}>No Forms yet. Add one to track transformations, their multipliers, and modifications.</div>}

      {forms.map((f, i) => f.bookId ? <div key={f.id} style={{ marginBottom: 10 }}><BookFormCard char={char} form={f} set={set} onRemove={() => removeForm(i)} /></div> : (
        <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${f.active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <button onClick={() => updateForm(i, { active: !f.active })} title="Toggle active" style={{ background: f.active ? COLORS.gold : "transparent", border: `1px solid ${f.active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: f.active ? "#0A0C11" : COLORS.muted, fontSize: 10.5, fontWeight: 700, padding: "3px 10px", cursor: "pointer" }}>{f.active ? "ACTIVE" : "inactive"}</button>
            <TextInput value={f.name} onChange={e => updateForm(i, { name: e.target.value })} style={{ fontWeight: 700, background: "transparent", border: "none", flex: 1, fontSize: 14 }} />
            <TextInput value={f.formType} onChange={e => updateForm(i, { formType: e.target.value })} placeholder="Type" style={{ width: 120, padding: "5px 8px" }} />
            <Btn size="sm" variant="danger" onClick={() => removeForm(i)}><Trash2 size={12}/></Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 8 }}>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Power Bonus</div>{numIn(f.powerBonus, v => updateForm(i, { powerBonus: v }))}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Ki Upkeep</div>{numIn(f.upkeepCost, v => updateForm(i, { upkeepCost: v }))}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Multiplier</div>{txtIn(f.multiplier, v => updateForm(i, { multiplier: v }), "x10")}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Awaken Limit</div>{txtIn(f.awakenLimit, v => updateForm(i, { awakenLimit: v }), "")}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }} title="Size points added on the battle map (Great Ape and the like)">Gigantify</div>{numIn(f.giga || 0, v => updateForm(i, { giga: v }))}</div>
          </div>
          <TextArea value={f.description} onChange={e => updateForm(i, { description: e.target.value })} placeholder="Form description / benefits..." style={{ minHeight: 44, marginBottom: 8 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Aura</span>
            {AURA_SWATCHES.map(sw => (
              <button key={sw.color} onClick={() => updateForm(i, { auraColor: f.auraColor === sw.color ? "" : sw.color })} title={sw.label}
                style={{ width: 18, height: 18, borderRadius: "50%", cursor: "pointer", background: sw.color, border: f.auraColor === sw.color ? `2px solid ${COLORS.text}` : `1px solid ${COLORS.border}` }} />
            ))}
            <input type="color" value={f.auraColor || "#EAF2FF"} onChange={e => updateForm(i, { auraColor: e.target.value })} title="Custom aura color" style={{ width: 22, height: 22, padding: 0, border: `1px solid ${COLORS.border}`, borderRadius: 4, background: "transparent", cursor: "pointer" }} />
            {f.auraColor && <button onClick={() => updateForm(i, { auraColor: "" })} style={{ fontSize: 9.5, color: COLORS.dim, background: "transparent", border: "none", cursor: "pointer" }}>clear</button>}
          </div>
          {/* Modifications */}
          {(f.modifications || []).length > 0 && (
            <div style={{ borderLeft: `2px solid ${COLORS.border}`, paddingLeft: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", marginBottom: 6 }}>Form-Specific Modifications</div>
              {f.modifications.map((m, mi) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <button onClick={() => updateMod(i, mi, { active: !m.active })} title="Toggle active" style={{ width: 14, height: 14, flexShrink: 0, borderRadius: 4, background: m.active ? COLORS.gold : "transparent", border: `1px solid ${m.active ? COLORS.gold : COLORS.dim}`, cursor: "pointer" }} />
                  <TextInput value={m.name} onChange={e => updateMod(i, mi, { name: e.target.value })} style={{ flex: 1, padding: "4px 8px", fontSize: 12 }} />
                  <span style={{ fontSize: 9, color: COLORS.dim }}>PWR</span>{numIn(m.powerBonus, v => updateMod(i, mi, { powerBonus: v }))}
                  <span style={{ fontSize: 9, color: COLORS.dim }}>UP</span>{numIn(m.upkeepIncrease, v => updateMod(i, mi, { upkeepIncrease: v }))}
                  <X size={13} onClick={() => removeMod(i, mi)} style={{ cursor: "pointer", color: COLORS.red, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )}
          <Btn size="sm" variant="ghost" onClick={() => addMod(i)}><Plus size={12}/> Modification</Btn>
        </div>
      ))}

      <BookFormPicker char={char} forms={forms} set={set} />

      <Btn variant="gold" onClick={addForm}><Plus size={13}/> Add your own Form</Btn>
    </div>
  );
}

function techResColor(res) {
  return res === "attack" ? COLORS.blue : res === "save" ? COLORS.gold : COLORS.dim;
}

export {
  blankForm,
  blankFormMod,
  ConditionCard,
  ConditionsPanel,
  PowerOverloadCard,
  BenefitsOfPowerCard,
  FormsPlayTab,
  FormsTab,
  techResColor,
};
