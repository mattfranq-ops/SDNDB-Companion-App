import React, { useState } from "react";
import { Dices, Minus, Plus, X } from "lucide-react";
import { deathSave } from "../../engine/damage.js";
import { applyToCombatant } from "./apply.js";
import { HIT_LOCATIONS } from "../../engine/equipment.js";
import { roll, uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, Gauge, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ============================== SESSION (Initiative / Rolls / Details) ============================== */
const blankCombatant = () => ({ id: uid(), name: "New Combatant", init: 10, hp: 20, maxHp: 20, ki: 0, maxKi: 0, stamina: 0, maxStamina: 0, dr: 0, conditions: [], deathSaves: { success: 0, fail: 0 }, exhaustion: 0, dead: false, sourceId: null, sourceType: null });
const miniBtnStyle = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.text, cursor: "pointer", padding: 2 };
const statStepBtn = { background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0, display: "flex", alignItems: "center" };

// At 0 HP (book p.25): Unstable, a flat DC 10 d20 at the start of each turn.
// Three successes: Stable at 0 HP. Three failures: dead. Natural 1 is two
// failures, natural 20 regains 1 HP, and taking damage adds two failures. The
// tracker rolls it automatically on the creature's turn; the button is for
// rolling it by hand. The Exhaustion buttons are the DM Playbook house rule for
// acting while dying.
function DyingPanel({ c, onUpdate }) {
  const ds = c.deathSaves || { success: 0, fail: 0 };
  const rollSave = () => onUpdate(deathSave(c).patch);
  const spend = (kind) => {
    const cost = kind === "action" ? 3 : kind === "movement" ? 0 : 1;
    onUpdate({ exhaustion: (c.exhaustion || 0) + cost });
  };
  if (c.dead) {
    return (
      <div style={{ gridColumn: "2 / 9", background: `${COLORS.red}12`, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: COLORS.red, fontWeight: 700, fontSize: 12.5 }}>DEAD — 3 failed death saves</span>
        <Btn size="sm" onClick={() => onUpdate({ dead: false, stable: false, hp: 1, deathSaves: { success: 0, fail: 0 } })}>Revive to 1 HP</Btn>
      </div>
    );
  }
  if (c.stable) {
    return (
      <div style={{ gridColumn: "2 / 9", background: `${COLORS.green}0C`, border: `1px solid ${COLORS.green}44`, borderRadius: 8, padding: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: COLORS.green, fontWeight: 700, fontSize: 12 }}>STABLE at 0 HP — no more Death Saves until hurt again</span>
        <Btn size="sm" onClick={() => onUpdate({ stable: false })}>Unstable again</Btn>
      </div>
    );
  }
  return (
    <div style={{ gridColumn: "2 / 9", background: `${COLORS.gold}0C`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: 10, marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
        <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12 }}>UNSTABLE — Death Saves <span style={{ color: COLORS.dim, fontWeight: 400 }}>(rolled at the start of their turn)</span></span>
        <Btn size="sm" variant="gold" onClick={rollSave}><Dices size={12}/> Roll Save</Btn>
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Success</span>
          {[0,1,2].map(i => <div key={i} onClick={() => onUpdate({ deathSaves: { ...ds, success: i+1 === ds.success ? i : i+1 } })} style={{ width: 14, height: 14, borderRadius: "50%", cursor: "pointer", border: `1.5px solid ${COLORS.green}`, background: i < ds.success ? COLORS.green : "transparent" }} />)}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Fail</span>
          {[0,1,2].map(i => <div key={i} onClick={() => onUpdate({ deathSaves: { ...ds, fail: i+1 === ds.fail ? i : i+1 } })} style={{ width: 14, height: 14, borderRadius: "50%", cursor: "pointer", border: `1.5px solid ${COLORS.red}`, background: i < ds.fail ? COLORS.red : "transparent" }} />)}
        </div>
        {c.exhaustion > 0 && <Tag color={COLORS.purple}>Exhaustion {c.exhaustion}</Tag>}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Btn size="sm" onClick={() => spend("action")}>Action (+3 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("bonus")}>Bonus/Reaction (+1 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("movement")}>Movement (free)</Btn>
      </div>
    </div>
  );
}

// Damage / heal one tracker row. The rules (DR and its cap, Destruction, saves,
// Block, resistance, Temporary HP first, Death Save failures) live in
// engine/damage.js; this is only the form.
function ApplyPanel({ row, onClose }) {
  const [amount, setAmount] = useState("");
  const [pool, setPool] = useState("hp");
  const [destruction, setDestruction] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resist, setResist] = useState("none");
  const [location, setLocation] = useState("any");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const go = async (kind) => {
    const n = Math.floor(Number(amount) || 0);
    if (n <= 0 || busy) return;
    setBusy(true);
    const r = await applyToCombatant(row.id, { kind, amount: n, pool, destruction, saved, resist, location });
    setBusy(false);
    setResult(r);
    if (r.ok) setAmount("");
  };
  const chip = (on, label, onClick, title) => (
    <button onClick={onClick} title={title} aria-pressed={on} style={{ padding: "4px 9px", fontSize: 11.5, fontWeight: 700, borderRadius: 5, cursor: "pointer", border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}1A` : "transparent", color: on ? COLORS.gold : COLORS.muted }}>{label}</button>
  );
  return (
    <div style={{ gridColumn: "2 / 9", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, marginTop: 4, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <TextInput type="number" autoFocus value={amount} onChange={e => setAmount(e.target.value)} onKeyDown={e => e.key === "Enter" && go("damage")} placeholder="Amount" aria-label="Amount" style={{ width: 90, textAlign: "center" }} />
        <Btn size="sm" variant="danger" disabled={busy} onClick={() => go("damage")}>Damage</Btn>
        <Btn size="sm" disabled={busy} onClick={() => go("heal")} style={{ color: COLORS.green }}>Heal</Btn>
        <span style={{ width: 10 }} />
        {chip(pool === "hp", "HP", () => setPool("hp"))}
        {chip(pool === "ki", "Ki", () => setPool("ki"), "Ki Damage comes off Ki Points (Temporary Ki first)")}
        <span style={{ width: 10 }} />
        {chip(destruction, "Destruction", () => setDestruction(!destruction), "Destruction Damage can't be reduced by anything")}
        {chip(saved, "Saved (half)", () => setSaved(!saved), "They passed the save for half damage")}
        {chip(resist === "resist", "Resist", () => setResist(resist === "resist" ? "none" : "resist"))}
        {chip(resist === "vuln", "Vulnerable", () => setResist(resist === "vuln" ? "none" : "vuln"))}
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="ghost" onClick={onClose} title="Close"><X size={13}/></Btn>
      </div>
      {row.sourceType === "player" && row.sourceId && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 10.5, color: COLORS.dim }}>Hit location</span>
          {HIT_LOCATIONS.map(l => <React.Fragment key={l.key}>{chip(location === l.key, l.label, () => setLocation(l.key), l.slots ? `Only gear worn on the ${l.label.toLowerCase()} (plus neck, rings, held items and artifacts) adds DR` : "Every piece of worn gear adds DR (book rule)")}</React.Fragment>)}
        </div>
      )}
      {result && (
        <div style={{ fontSize: 12, color: result.ok ? COLORS.muted : COLORS.red, fontFamily: FONTS.mono }}>
          {result.ok
            ? `${result.name} ${result.kind === "heal" ? "healed" : "took"} ${result.amount}${result.steps.length ? ` (${result.steps.join(", ")})` : ""}${result.state ? ` · ${result.state}` : ""}`
            : result.reason}
        </div>
      )}
      <div style={{ fontSize: 10.5, color: COLORS.dim }}>DR (capped at Prof + 1), Block and Temporary HP are applied for you. Damage at 0 HP adds two Death Save failures.</div>
    </div>
  );
}

function StatStepper({ label, value, max, color, onValue, onMax }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 2 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button onClick={() => onValue(Math.max(0, value - 1))} style={miniBtnStyle}><Minus size={13}/></button>
        <TextInput type="number" value={value} onChange={e => onValue(+e.target.value)} style={{ textAlign: "center", padding: "6px 2px", width: 48 }} />
        <span style={{ color: COLORS.dim, fontSize: 12 }}>/</span>
        <TextInput type="number" value={max} onChange={e => onMax(+e.target.value)} style={{ textAlign: "center", padding: "6px 2px", width: 48 }} />
        <button onClick={() => onValue(value + 1)} style={miniBtnStyle}><Plus size={13}/></button>
      </div>
      <div style={{ marginTop: 3 }}><Gauge label="" value={value} max={max||1} color={color} /></div>
    </div>
  );
}

// Shared activity feed — features spent, per-turn costs, etc. Written via
// logSession() from anywhere; rendered live in the Session tab.
function SessionFeed() {
  const [feed, persist] = useSharedList("session_feed");
  if (!feed || feed.length === 0) return null;
  return (
    <div style={{ marginTop: 16, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Activity</span>
        <Btn size="sm" variant="ghost" onClick={() => persist([])}>Clear</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {feed.slice(0, 10).map(e => (
          <div key={e.id} style={{ display: "flex", gap: 8, fontSize: 12.5, alignItems: "baseline" }}>
            <span style={{ color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 10.5, minWidth: 46 }}>{new Date(e.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <span style={{ color: COLORS.text }}>{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  blankCombatant,
  miniBtnStyle,
  statStepBtn,
  DyingPanel,
  ApplyPanel,
  StatStepper,
  SessionFeed,
};
