import React, { useState } from "react";
import { Flame, HeartPulse, Minus, Plus, Radio, Zap } from "lucide-react";
import { STAT_MOD_LABEL, abilityMod, activeConditionPower, activeFormPower, benefitsOfPower, charTotalLevel, effectivePowerBonus, effectiveStats, kiRankForLevel, statMod, statModSources, totalPowerBonus } from "../../engine/core.js";
import { computeCarryWeight, computePowerLevel, powerDR } from "../../engine/derived.js";
import { computeArmorDR, computeWeighted, weightedPower } from "../../engine/equipment.js";
import { useHouseRules } from "../../state/hooks.js";
import { CommaNumInput, Gauge, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { statStepBtn } from "../session/combat-parts.jsx";
import { SkillsSavesTab } from "./builder-tabs.jsx";
import { TagListEditor } from "./items.jsx";
import { AttacksPerTurnBadge, ComputedACField } from "./vitals-gear.jsx";

// Shared look for the four Stats-page derived-stat cards, so Ki Rank / Power /
// Speed / Kili read as one consistent row instead of four mismatched boxes.
const STAT_CARD = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "11px 13px", minHeight: 98, display: "flex", flexDirection: "column" };
const STAT_LABEL = { fontSize: 10, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.7, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 };
const STAT_LINK = { cursor: "pointer", color: COLORS.blue, fontSize: 9.5, fontWeight: 600, letterSpacing: 0, textTransform: "none" };
const STAT_VALUE = { fontFamily: FONTS.display, fontWeight: 900, lineHeight: 1 };
const STAT_SUB = { fontSize: 9.5, color: COLORS.dim, marginTop: "auto", paddingTop: 8 };
const STAT_MINI = { textAlign: "center", padding: "4px 4px", fontSize: 12 };
const STAT_MINI_LABEL = { fontSize: 8.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 };

function KiRankPanel({ char, set }) {
  const auto = kiRankForLevel(charTotalLevel(char));
  const overridden = char.kiRankOverride != null;
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Ki Rank</span>
        <span onClick={() => set({ kiRankOverride: overridden ? null : auto })} style={STAT_LINK}>{overridden ? "auto" : "override"}</span>
      </div>
      {overridden ? (
        <TextInput type="number" value={char.kiRankOverride} onChange={e => set({ kiRankOverride: Math.max(1, Math.min(4, +e.target.value || 1)) })} style={{ textAlign: "center", fontSize: 20, fontWeight: 700, padding: "3px 6px" }} />
      ) : (
        <div title="Rank 1 at Lv1, +1 at Levels 5 / 10 / 15 (book Ch.1)" style={{ ...STAT_VALUE, fontSize: 27, color: COLORS.gold, cursor: "help" }}>{auto}</div>
      )}
      <div style={STAT_SUB}>+1 at Lv 5 / 10 / 15</div>
    </div>
  );
}

function PowerPanel({ char, set }) {
  const p = char.powerBonus || {};
  const setP = (k, v) => set({ powerBonus: { ...p, [k]: v } });
  const [editing, setEditing] = useState(false);
  // Live effective power = manual base (the 4 boxes) + active Forms + active
  // Conditions + Weighted gear — the same effectivePowerBonus() the Combat banner,
  // Kili/Battle Power, Overload and Carry Weight all read, so this never drifts.
  const total = totalPowerBonus(char);
  const eff = effectivePowerBonus(char);
  const fromForms = activeFormPower(char), fromCond = activeConditionPower(char), fromWt = weightedPower(char);
  const parts = [`base ${total >= 0 ? "+" : ""}${total}`];
  if (fromForms) parts.push(`forms +${fromForms}`);
  if (fromCond) parts.push(`cond +${fromCond}`);
  if (fromWt) parts.push(`wt ${fromWt >= 0 ? "+" : ""}${fromWt}`);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Power Bonus</span>
        <span onClick={() => setEditing(e => !e)} style={STAT_LINK}>{editing ? "done" : "edit"}</span>
      </div>
      <div style={{ ...STAT_VALUE, fontSize: 27, color: eff > 0 ? COLORS.gold : COLORS.text }}>{eff >= 0 ? "+" : ""}{eff}</div>
      {editing ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          {[["stable","Stable"],["transformation","Transform"],["powerUp","Power-Up"],["misc","Misc"]].map(([k,label]) => (
            <div key={k} title={k === "stable" ? "Stable Power — gives every Power benefit but is exempt from Overload" : undefined}>
              <div style={STAT_MINI_LABEL}>{label}{k === "stable" && <span style={{ color: COLORS.blue }}> ◇</span>}</div>
              <TextInput type="number" value={p[k] || 0} onChange={e => setP(k, +e.target.value || 0)} style={STAT_MINI} />
            </div>
          ))}
        </div>
      ) : (
        <div style={STAT_SUB}>{parts.join(" · ")}</div>
      )}
    </div>
  );
}

function SpeedPanel({ char, set }) {
  const [editing, setEditing] = useState(false);
  const wt = computeWeighted(char);
  const phys = benefitsOfPower(char).physical * 5; // Physical Bonus: +5 ft/rank to all speeds
  const final = Math.max(0, (char.speedBase || 30) + (char.speedExtra || 0) + wt.net * 10 + phys);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Speed{wt.net !== 0 && <span style={{ color: wt.net > 0 ? COLORS.green : COLORS.red, fontSize: 9, letterSpacing: 0 }}> ({wt.net > 0 ? "+" : ""}{wt.net * 10}ft wt)</span>}</span>
        <span onClick={() => setEditing(e => !e)} style={STAT_LINK}>{editing ? "done" : "edit"}</span>
      </div>
      <div style={{ ...STAT_VALUE, fontSize: 27, color: COLORS.gold }}>{final}<span style={{ fontSize: 12, color: COLORS.dim, fontFamily: FONTS.body, fontWeight: 600 }}> ft</span></div>
      {editing ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          <div><div style={STAT_MINI_LABEL}>Base</div><TextInput type="number" value={char.speedBase ?? 30} onChange={e => set({ speedBase: +e.target.value || 0 })} style={STAT_MINI} /></div>
          <div><div style={STAT_MINI_LABEL}>Extra</div><TextInput type="number" value={char.speedExtra || 0} onChange={e => set({ speedExtra: +e.target.value || 0 })} style={STAT_MINI} /></div>
        </div>
      ) : (
        <div style={STAT_SUB}>×1.5 {Math.floor(final * 1.5)} · ×2 {final * 2} · ×3 {final * 3}</div>
      )}
    </div>
  );
}

// Death Saves — lives on Vitals (dying-state tracker; Long Rest resets it there).
function DeathSavesPanel({ char, set }) {
  const ds = char.deathSaves || { success: 0, fail: 0 };
  const cycle = (kind) => set({ deathSaves: { ...ds, [kind]: (ds[kind] + 1) % 4 } });
  const Dots = ({ kind, color }) => (
    <div onClick={() => cycle(kind)} style={{ display: "flex", gap: 4, cursor: "pointer" }} title="Click to add; wraps to 0 after 3">
      {[1,2,3].map(n => <div key={n} style={{ width: 11, height: 11, borderRadius: "50%", border: `2px solid ${color}`, background: ds[kind] >= n ? color : "transparent" }} />)}
    </div>
  );
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Death Saves</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: COLORS.green }}>Success</span><Dots kind="success" color={COLORS.green} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: COLORS.red }}>Fail</span><Dots kind="fail" color={COLORS.red} />
      </div>
    </div>
  );
}

// Read-only power readout mirrored onto Stats — same value/label as the Combat
// banner, following the table's chosen power system (Kili or Battle Power).
function BattlePowerPanel({ char }) {
  const [houseRules] = useHouseRules();
  const power = computePowerLevel(char, houseRules.powerSystem);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Radio size={11}/> {power.label}</span></div>
      <div style={{ ...STAT_VALUE, fontSize: 24, color: COLORS.gold }}>{power.value.toLocaleString()}</div>
      <div style={STAT_SUB}>Carry Weight <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeCarryWeight(char).toLocaleString()}</span> lb</div>
    </div>
  );
}

function StatsTab({ char, set }) {
  const hasClasses = (char.classes || []).length > 0;
  const staminaAuto = char.maxStaminaOverride == null;
  const staminaFormula = Math.max(1, 2 + statMod(char, "con") + 2 * (charTotalLevel(char) - 1));
  const setStat = (k, v) => set({ stats: { ...char.stats, [k]: v } });
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        {[["hp","maxHp","HP",COLORS.red,HeartPulse],["ki","maxKi","Ki",COLORS.blue,Zap]].map(([cur,mx,label,color,Icon]) => (
          <div key={cur} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 11, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}><Icon size={12}/>{label}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <CommaNumInput value={char[cur] || 0} onValue={v => set({ [cur]: v })} style={{ textAlign: "center" }} />
              <CommaNumInput value={char[mx] || 0} onValue={v => set({ [mx]: v })} style={{ textAlign: "center" }} />
            </div>
            <div style={{ marginTop: 6 }}><Gauge label="" value={char[cur]} max={char[mx]||1} color={color} /></div>
          </div>
        ))}
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Flame size={12}/>Stamina {staminaAuto && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
            <span onClick={() => set({ maxStaminaOverride: staminaAuto ? (char.maxStamina ?? staminaFormula) : null })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline" }}>
              {staminaAuto ? "override" : "use auto"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <CommaNumInput value={char.stamina || 0} onValue={v => set({ stamina: v })} style={{ textAlign: "center" }} />
            {staminaAuto ? (
              <div title="2 + CON mod + 2 per Level-Up (book Ch.1)" style={{ flex: 1, textAlign: "center", fontWeight: 700, padding: "8px 0", cursor: "help" }}>{staminaFormula}</div>
            ) : (
              <TextInput type="number" value={char.maxStaminaOverride} onChange={e => set({ maxStaminaOverride: +e.target.value || 0 })} style={{ textAlign: "center" }} />
            )}
          </div>
          <div style={{ marginTop: 6 }}><Gauge label="" value={char.stamina} max={char.maxStamina||1} color={COLORS.gold} /></div>
        </div>
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
          <ComputedACField char={char} onOverride={set} />
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 8, marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
            <span>Damage Reduction {char.drOverride !== true && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
            <span onClick={() => set({ drOverride: char.drOverride !== true })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9, textDecoration: "underline" }}>{char.drOverride === true ? "use auto" : "override"}</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {char.drOverride === true ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
                <TextInput type="number" value={char.dr} onChange={e => set({ dr: +e.target.value })} style={{ textAlign: "center", flex: 1 }} title="Damage Reduction (base)" />
                {powerDR(char) > 0 && <span style={{ fontSize: 10, color: COLORS.gold, whiteSpace: "nowrap" }} title="From Power (Toughness)">+{powerDR(char)}</span>}
              </div>
            ) : (
              <div title={`From worn armor${powerDR(char) ? ` + Power (+${powerDR(char)})` : ""}`} style={{ flex: 1, textAlign: "center", fontWeight: 700, padding: "8px 0", cursor: "help" }}>{computeArmorDR(char) + powerDR(char)}</div>
            )}
            {hasClasses ? (
              <div title="Level = sum of class levels — edit them in the Class tab" style={{ flex: 1, textAlign: "center", fontWeight: 700, cursor: "help" }}>Lv {charTotalLevel(char)}</div>
            ) : (
              <TextInput type="number" value={char.level} onChange={e => set({ level: +e.target.value })} style={{ textAlign: "center" }} title="Level" />
            )}
          </div>
          <AttacksPerTurnBadge char={char} />
        </div>
      </div>
      {/* Abilities. The big pill is the MODIFIER (what you roll); the field below
          is your editable base score. Gear that shifts a stat tints the block gold
          and shows the effective score — the modifier reflects it. */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 16 }}>
        {Object.entries(char.stats).map(([k,v]) => {
          const eff = effectiveStats(char)[k];
          const mod = abilityMod(eff);
          const moved = eff !== v;
          const accent = moved ? COLORS.gold : COLORS.text;
          const from = statModSources(char).filter(m => m.stat === k).map(m => `${m.itemName}: ${STAT_MOD_LABEL[k]} ${m.mode === "set" ? `set to ${m.value}` : `+${m.value}`}`).join(" · ");
          return (
            <div key={k} title={moved ? from : undefined} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: COLORS.panel2, border: `1px solid ${moved ? COLORS.gold + "77" : COLORS.border}`, borderRadius: 10, padding: "10px 6px 8px" }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{k}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 900, lineHeight: 1, color: accent }}>{mod >= 0 ? "+" : ""}{mod}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 2, background: COLORS.input, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "1px 3px" }}>
                <button onClick={() => setStat(k, Math.max(1, (v || 0) - 1))} title="−1" style={{ ...statStepBtn }}><Minus size={11} /></button>
                <input type="number" value={v} onFocus={e => e.target.select()} onChange={e => setStat(k, +e.target.value)} style={{ width: 30, textAlign: "center", border: "none", background: "transparent", color: COLORS.text, fontSize: 13, fontWeight: 700, fontFamily: FONTS.body, outline: "none", MozAppearance: "textfield" }} />
                <button onClick={() => setStat(k, (v || 0) + 1)} title="+1" style={{ ...statStepBtn }}><Plus size={11} /></button>
                {moved && <span title="Effective (with gear)" style={{ fontSize: 11, fontWeight: 800, color: COLORS.gold }}>→{eff}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginBottom: 14 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Saving Throws &amp; Skills</div>
        <SkillsSavesTab char={char} set={set} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <KiRankPanel char={char} set={set} />
        <PowerPanel char={char} set={set} />
        <SpeedPanel char={char} set={set} />
        <BattlePowerPanel char={char} />
      </div>
      <TagListEditor label="Resistances to Damage" items={char.resistances || []} onAdd={(v) => set({ resistances: [...(char.resistances || []), v] })} onRemove={(i) => set({ resistances: (char.resistances || []).filter((_,j) => j!==i) })} color={COLORS.green} placeholder="Bludgeoning..." />
    </div>
  );
}

export {
  STAT_CARD,
  STAT_LABEL,
  STAT_LINK,
  STAT_VALUE,
  STAT_SUB,
  STAT_MINI,
  STAT_MINI_LABEL,
  KiRankPanel,
  PowerPanel,
  SpeedPanel,
  DeathSavesPanel,
  BattlePowerPanel,
  StatsTab,
};
