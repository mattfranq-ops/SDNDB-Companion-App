import React from "react";
import { Dices, Minus, Plus } from "lucide-react";
import { roll, uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, Gauge, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ============================== SESSION (Initiative / Rolls / Details) ============================== */
const blankCombatant = () => ({ id: uid(), name: "New Combatant", init: 10, hp: 20, maxHp: 20, ki: 0, maxKi: 0, stamina: 0, maxStamina: 0, dr: 0, conditions: [], deathSaves: { success: 0, fail: 0 }, exhaustion: 0, dead: false, sourceId: null, sourceType: null });
const miniBtnStyle = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.text, cursor: "pointer", padding: 2 };
const statStepBtn = { background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0, display: "flex", alignItems: "center" };

// Dying Condition (house rule from the DM Playbook) — replaces generic
// Unconscious at 0 HP. Rolls a death save, then lets the player spend an
// Action (3 Exhaustion), Bonus/Reaction (1 Exhaustion), or Movement (free)
// on their turn while still dying.
function DyingPanel({ c, onUpdate }) {
  const ds = c.deathSaves || { success: 0, fail: 0 };
  const rollSave = () => {
    const r = roll(20);
    if (r >= 10) {
      const success = ds.success + 1;
      if (success >= 3) onUpdate({ hp: 1, deathSaves: { success: 0, fail: 0 }, dead: false });
      else onUpdate({ deathSaves: { ...ds, success } });
    } else {
      const fail = ds.fail + 1;
      if (fail >= 3) onUpdate({ dead: true, deathSaves: { ...ds, fail } });
      else onUpdate({ deathSaves: { ...ds, fail } });
    }
  };
  const spend = (kind) => {
    const cost = kind === "action" ? 3 : kind === "movement" ? 0 : 1;
    onUpdate({ exhaustion: (c.exhaustion || 0) + cost });
  };
  if (c.dead) {
    return (
      <div style={{ gridColumn: "2 / 8", background: `${COLORS.red}12`, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: COLORS.red, fontWeight: 700, fontSize: 12.5 }}>DEAD — 3 failed death saves</span>
        <Btn size="sm" onClick={() => onUpdate({ dead: false, hp: 1, deathSaves: { success: 0, fail: 0 } })}>Revive to 1 HP</Btn>
      </div>
    );
  }
  return (
    <div style={{ gridColumn: "2 / 8", background: `${COLORS.gold}0C`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: 10, marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12 }}>DYING — Death Saves</span>
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
      <div style={{ display: "flex", gap: 6 }}>
        <Btn size="sm" onClick={() => spend("action")}>Action (+3 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("bonus")}>Bonus/Reaction (+1 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("movement")}>Movement (free)</Btn>
      </div>
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
  StatStepper,
  SessionFeed,
};
