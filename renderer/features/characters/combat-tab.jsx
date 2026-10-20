import React, { useState } from "react";
import { ChevronDown, ChevronRight, Crosshair, Dices, Flame, Plus, Swords, Trash2, X, Zap } from "lucide-react";
import { emitRoll } from "../../app/bus.js";
import { exhaustionPenalty, exhaustionRanks, inKiExhaustion } from "../../engine/conditions.js";
import { drIgnoredBy, spendPatch } from "../../engine/damage.js";
import { applyToCombatant } from "../session/apply.js";
import { STAT_MOD_LABEL, activeConditionPower, activeFormPower, benefitsOfPower, charTotalLevel, computeKiRank, effectivePowerBonus, profBonusForLevel, statMod, totalPowerBonus } from "../../engine/core.js";
import { TECH_TYPE_ORDER, computeCarryWeight, computeKiRegen, computeOverload, computePassives, computePowerLevel, computeTechRefs } from "../../engine/derived.js";
import { equippedEntries, weightedPower } from "../../engine/equipment.js";
import { roll, rollD20, rollModeLabel, uid } from "../../lib/dice.js";
import { CURRENT_HOUSE_RULES, envFlatMod, useHouseRules } from "../../state/hooks.js";
import { hookSummary, hookType, styleFlatMod, useRegistry } from "../../state/registry.js";
import { Btn, Checkbox, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { techResColor } from "./forms.jsx";
import { ResourceTracker } from "./magic.jsx";

// Combat / derived reference — the "scouter" computed block, its own tab so it
// stays off the main stat-entry page per the design north star.
// Parse "NdM+K" → { count, faces, mod }. Returns null if unrollable.
function parseDice(str) {
  const m = /(\d+)d(\d+)\s*([+-]\s*\d+)?/.exec(str || "");
  if (!m) return null;
  return { count: +m[1], faces: +m[2], mod: m[3] ? +m[3].replace(/\s/g, "") : 0 };
}
function rollDice(d) {
  const rolls = Array.from({ length: d.count }, () => roll(d.faces));
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) + d.mod, mod: d.mod };
}

// Snap Decisions (book Ch.1) — reaction-style acts that cost Stamina (a few cost
// a variable amount, shown "Special"). Curated from the rulebook.
const SNAP_DECISIONS = [
  { name: "Assist", cost: 2, limit: "Once", trigger: "An ally within range of your Ki Techniques starts an Energy Clash, or within range of your Strike Techniques starts a Struggle.", text: "Add your own attack to the clash: cast a Technique of the matching category (Strike→Struggle, Ki→Energy Clash) with the triggering creature in range. Half this cost if the Technique is a 1 Reaction; its Ki cost is halved. The triggering creature adds your Technique's Rank to their contested Attack Rolls." },
  { name: "Block", cost: 2, limit: "None", trigger: "You would take Damage that is not Destruction Damage.", text: "Until the start of your next turn, halve all Damage you take, but auto-fail Dexterity saves. Spend +2 Stamina to also gain DR equal to your Ki Rank. Cancelled by using another Snap Decision; can't follow Push Back." },
  { name: "Burst Transformation", cost: 1, limit: "Once", trigger: "You would take an Action/Bonus Action, or cast a Technique.", text: "Spend half a Form's Upkeep Cost to activate it until the end of your turn (ends after the triggering effect if not your turn). All Power gained is Stable Power." },
  { name: "Counter!", cost: 4, limit: "Once", trigger: "You pass a Save enforced by a Technique, or a Technique's Attack Roll misses you.", text: "Instinctively lash out: cast a Technique of your choice that includes the creature who cast the triggering Technique." },
  { name: "Energy Clash", cost: 2, limit: "Once", trigger: "You are targeted by a Ki Technique that deals Damage.", text: "Immediately cast a damaging Ki Technique with the caster in range to meet theirs. Both make contested Attack Rolls by Technique Type; first to win 2 completes their Technique. Loser is auto-hit and fails saves. +1 static per Ki Rank difference. Half cost if a 1 Reaction." },
  { name: "Flurry", cost: 2, limit: "Ki Rank / round", trigger: "You make an attack with your Attack Action.", text: "Make an additional attack as part of your Attack Action." },
  { name: "Follow Up", cost: 2, limit: "None", trigger: "You Launch a creature within your Movement Speed.", text: "Move to the nearest space next to where the creature stopped without provoking, and immediately perform the Power Strike Action for free." },
  { name: "I Got 'Em!", cost: 2, limit: "Once", trigger: "A creature within your Movement Speed would take Fall Damage, or is Launched through/inside your Melee Reach.", text: "The triggering creature stops all movement and you take the Fall Damage instead. Cost doubled if they're a larger Size. End adjacent without provoking." },
  { name: "Interception (Ally)", cost: 2, limit: "Once", trigger: "An ally within your Movement Speed is targeted by an Attack Roll, or by a damaging Spell/Technique.", text: "The effect hits you instead. If an Attack Roll it auto-hits; if a Dex save it auto-fails. End adjacent to the protected ally without provoking." },
  { name: "Interception (Enemy)", cost: 2, limit: "Once", trigger: "A creature within your Movement Speed makes an Attack Roll, or casts a damaging Spell/Technique.", text: "You become the only valid target for it. If an Attack Roll it auto-hits you; if a Dex save you auto-fail. End adjacent without provoking." },
  { name: "Push Back", cost: "Special", limit: "Once", trigger: "You are damaged by a Spell/Technique that does not deal Destruction Damage.", text: "Designate Stamina up to your Character Level. Reduce the oncoming Damage by 1d12 + your Ki Rank per Stamina spent." },
  { name: "Redirect (Sphere)", cost: 1, limit: "None", trigger: "You reduce a Sphere-shaped Spell/Technique's Damage to zero and are within Melee of its Point of Origin.", text: "Move the Point of Origin anywhere within the Technique's remaining Maximum Range — creatures previously in the area may no longer be targets." },
  { name: "Redirect (Cone/Cube)", cost: 1, limit: "None", trigger: "You reduce a Cone/Cube-shaped Spell/Technique's Damage to zero.", text: "Creatures in the Area draw a line to the Point of Origin; if your body interrupts that line, they're immune to the effect." },
  { name: "Redirect (Cylinder/Line)", cost: 1, limit: "None", trigger: "You reduce a Cylinder/Line-shaped Spell/Technique's Damage to zero.", text: "Draw a straight line from yourself; the remainder of the shape's length/height follows that line." },
  { name: "Redirect (Targeted)", cost: 1, limit: "None", trigger: "You reduce a single-target Attack Roll / Technique (not Melee range) to zero.", text: "Choose a creature within the Technique's remaining Maximum Range; they become the target using the original Attack Roll or Save DC (loses any granted extra casting)." },
  { name: "Redirect (Emanation)", cost: 1, limit: "None", trigger: "You reduce an Emanation-shaped Spell/Technique's Damage to zero.", text: "The Emanation's length becomes the distance between you and its Caster." },
  { name: "Sonic Sway", cost: "Special", limit: "Ki Rank / round", trigger: "You would be hit by an Attack Roll that is not a Reaction, Technique, or Spell.", text: "Expend Stamina to gain +2 AC per Stamina until the start of your next turn (only vs the triggering attacks). Max Stamina per round equals your Ki Rank." },
  { name: "Struggle", cost: 2, limit: "Once", trigger: "You are targeted by a Strike Technique that deals Damage.", text: "Immediately cast a damaging Strike Technique to meet theirs (cost drops to 1 if a 1 Reaction). Contested Attack Rolls; first to win 2 completes. Loser is auto-hit and fails saves. +1 static per Ki Rank difference." },
  { name: "Tag Team", cost: 4, limit: "Once", trigger: "You begin Charging a Technique within 5 ft of another creature Charging a Technique of the same Category.", text: "Their Technique is the Lead. Stay within 5 ft for the Charge; when released, add yours (damage, effects, and your static bonuses) to it. Concentration effects reapply on each failed save." },
  { name: "Wild Sense", cost: 2, limit: "Once", trigger: "You pass a Dexterity Saving Throw to reduce damage.", text: "Until the start of your next turn, take no damage whenever you'd take halved damage from a successful save. Cancelled by using another Snap Decision." },
];

const MOVE_RESOLUTIONS = [["attack", "Attack"], ["save", "Save"], ["utility", "Utility"]];
const blankMove = (tier) => ({ uid: uid(), tier, name: "New Move", techType: "Unarmed", resolution: "attack", damageDice: "", damageType: "", saveAbility: "", kiCost: "" });

// Inline damage-logic editor for one move (custom move, or an override of a
// computed default). nameEditable=false locks the name of a computed move.
function MoveFields({ mv, onChange, onRemove, onReset, nameEditable = true }) {
  const f = (patch) => onChange(patch);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <TextInput value={mv.name || ""} onChange={e => f({ name: e.target.value })} placeholder="Move name" disabled={!nameEditable} style={{ flex: 1, fontWeight: 600, ...(nameEditable ? {} : { opacity: 0.6 }) }} />
        {onReset && <span onClick={onReset} title="Reset to computed" style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textDecoration: "underline", whiteSpace: "nowrap" }}>reset</span>}
        {onRemove && <button onClick={onRemove} title="Remove" style={{ background: "transparent", border: "none", color: COLORS.red, cursor: "pointer", padding: 2 }}><Trash2 size={13}/></button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr 0.8fr", gap: 6 }}>
        <Select value={mv.techType || "Unarmed"} onChange={e => f({ techType: e.target.value })} style={{ fontSize: 11 }} title="Type (drives Atk/DC)">{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select>
        <Select value={mv.resolution || "attack"} onChange={e => f({ resolution: e.target.value })} style={{ fontSize: 11 }} title="Resolution">{MOVE_RESOLUTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
        <TextInput value={mv.damageDice || ""} onChange={e => f({ damageDice: e.target.value })} placeholder="2d6+4" style={{ fontSize: 11 }} title="Damage dice" />
        <TextInput value={mv.kiCost || ""} onChange={e => f({ kiCost: e.target.value })} placeholder="Ki" style={{ fontSize: 11 }} title="Ki cost" />
      </div>
      {mv.resolution === "save" && (
        <TextInput value={mv.saveAbility || ""} onChange={e => f({ saveAbility: e.target.value })} placeholder="Save ability (e.g. Dexterity)" style={{ fontSize: 11 }} />
      )}
    </div>
  );
}

function CombatRefTab({ char, set, combatTarget, onClearTarget }) {
  const [houseRules] = useHouseRules();
  const stylesReg = useRegistry("styles");
  const equippedStyle = char.styleId ? (stylesReg.entries || []).find(s => s._id === char.styleId) : null;
  const power = computePowerLevel(char, houseRules.powerSystem);
  // Physical Bonus (+extra above 10) adds flat damage to Attack-Action attacks —
  // i.e. Basic Moves (unarmed/weapon/Ki Blast), not cast techniques.
  const aaDmg = benefitsOfPower(char).physical + benefitsOfPower(char).extra;
  const refs = computeTechRefs(char);
  const refByType = Object.fromEntries(refs.map(r => [r.type, r]));
  const ov = computeOverload(char);
  const regen = computeKiRegen(char);
  const pas = computePassives(char);
  const [log, setLog] = useState([]);
  const [rollMode, setRollMode] = useState("normal");   // "normal" | "adv" | "dis"
  const [situBonus, setSituBonus] = useState("");        // situational modifier on the attack roll
  const [editSpecial, setEditSpecial] = useState(false);
  const [editBasic, setEditBasic] = useState(false);
  const [openSnap, setOpenSnap] = useState(null);
  // The last hit on a tracker target, waiting to be applied (or dismissed).
  const [pending, setPending] = useState(null);
  const [applying, setApplying] = useState(false);
  const applyPending = async (factor) => {
    if (!pending || applying) return;
    setApplying(true);
    const res = await applyToCombatant(pending.id, {
      kind: "damage", amount: pending.amount, saved: factor === "half",
      ignoreDR: pending.ignoreDR, by: char.name, what: pending.move,
    });
    setApplying(false);
    setPending(res.ok ? { ...pending, done: res } : { ...pending, error: res.reason });
  };
  const cardStyle = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 };
  const headStyle = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 };

  // Basic moves: the held weapon's damage logic replaces unarmed CQC (empty
  // hands fall back to CQC); Basic Ki Blast is always there. A weapon's unique
  // effects/charges stay in Advanced Moves, not here.
  const strMod = statMod(char, "str"), wisMod = statMod(char, "wis");
  const profB = profBonusForLevel(charTotalLevel(char));
  const heldWeapons = equippedEntries(char).filter(e => (e.slotKey === "hand1" || e.slotKey === "hand2") && e.item.damageDice);
  const weaponMoves = heldWeapons.map(e => {
    const mod = statMod(char, e.item.attackStat || "str");
    const dice = /[+-]\s*\d+\s*$/.test(e.item.damageDice) ? e.item.damageDice : `${e.item.damageDice}${mod >= 0 ? "+" : ""}${mod}`;
    const melee = !/ranged|bow|gun|rifle|pistol|throw/i.test(`${e.item.category} ${e.item.name}`);
    return { uid: `wpn-${e.item.id}`, name: e.item.name, techType: "Armed", resolution: "attack", damageDice: dice, kiCost: "", atkOverride: profB + mod, melee };
  });
  const basicMoves = [
    ...(weaponMoves.length ? weaponMoves : [{ uid: "cqc", name: "CQC (Unarmed Strike)", techType: "Unarmed", resolution: "attack", damageDice: `1d4${strMod>=0?"+":""}${strMod}`, kiCost: "", melee: true }]),
    { uid: "kiblast", name: "Basic Ki Blast", techType: "Blast", resolution: "attack", damageDice: `1d6${wisMod>=0?"+":""}${wisMod}`, kiCost: "" },
  ];
  const weaponEffects = heldWeapons.flatMap(e => (e.item.effects || []).map(ef => ({ ...ef, itemName: e.item.name })));
  const specialAll = (char.techniques || []).filter(k => k.damageDice || k.resolution !== "utility");
  const specialShown = specialAll.filter(k => k.combatVisible !== false);
  const toggleSpecial = (tuid) => set && set({ techniques: (char.techniques || []).map(t => t.uid === tuid ? { ...t, combatVisible: t.combatVisible === false } : t) });

  // Player edits: per-move damage-logic overrides on computed defaults, plus
  // fully custom moves filed under Basic or Advanced.
  const overrides = char.moveOverrides || {};
  const customMoves = char.customMoves || [];
  const customBasic = customMoves.filter(m => m.tier === "basic");
  const customAdvanced = customMoves.filter(m => m.tier === "advanced");
  const applyOv = (mv) => ({ ...mv, ...(overrides[mv.uid] || {}) });
  const setOverride = (muid, patch) => set && set({ moveOverrides: { ...overrides, [muid]: { ...(overrides[muid] || {}), ...patch } } });
  const resetOverride = (muid) => { if (!set) return; const next = { ...overrides }; delete next[muid]; set({ moveOverrides: next }); };
  const setCustom = (muid, patch) => set && set({ customMoves: customMoves.map(m => m.uid === muid ? { ...m, ...patch } : m) });
  const removeCustom = (muid) => set && set({ customMoves: customMoves.filter(m => m.uid !== muid) });
  const addCustom = (tier) => set && set({ customMoves: [...customMoves, blankMove(tier)] });
  // Basic Moves are Attack-Action attacks → they receive the Physical damage bonus.
  const basicRender = [...basicMoves.map(m => ({ ...applyOv(m), attackAction: true })), ...customBasic.map(m => ({ ...m, attackAction: true }))];
  const advancedRender = [...specialShown, ...customAdvanced];

  const moveCard = (mv) => {
    const refBase = refByType[mv.techType] || { atk: 0, dc: 8 };
    const ref = mv.atkOverride != null ? { ...refBase, atk: mv.atkOverride } : refBase;
    const color = techResColor(mv.resolution);
    return (
      <div key={mv.uid} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>{mv.name}</span>
          {mv.kiCost && <span style={{ fontSize: 9, color: COLORS.dim, whiteSpace: "nowrap" }}>{mv.kiCost}</span>}
        </div>
        <div style={{ fontSize: 10, color: COLORS.muted, fontFamily: FONTS.mono }}>
          {mv.resolution === "attack" && <span style={{ color: COLORS.blue }}>+{ref.atk} atk</span>}
          {mv.resolution === "save" && <span style={{ color: COLORS.gold }}>DC {ref.dc}{mv.saveAbility ? ` ${mv.saveAbility.slice(0,3)}` : ""}</span>}
          {mv.damageDice && <span> · {mv.damageDice}{mv.attackAction && aaDmg > 0 ? <span style={{ color: COLORS.gold }}> +{aaDmg}</span> : ""}</span>}
        </div>
        <button onClick={() => doRoll(mv)} style={{ marginTop: 2, background: `${color}1A`, border: `1px solid ${color}66`, color, borderRadius: 5, padding: "4px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <Dices size={12}/> Roll
        </button>
      </div>
    );
  };

  const doRoll = (mv) => {
    const ref = refByType[mv.techType] || { atk: 0, dc: 8 };
    const atk = mv.atkOverride != null ? mv.atkOverride : ref.atk;
    const parsed = mv.damageDice ? parseDice(mv.damageDice) : null;
    const dmg = parsed ? rollDice(parsed) : null;
    // Attack-Action attacks (Basic Moves) get the Physical/overpowered damage bonus.
    if (dmg && mv.attackAction && aaDmg > 0) { dmg.total += aaDmg; dmg.mod += aaDmg; }
    const situ = Number(situBonus) || 0;
    // Environmental (Harsh Galaxies) + equipped Fighting Style modifiers to attacks.
    const envAtk = (CURRENT_HOUSE_RULES.harshGalaxies ? envFlatMod("attacks") : 0) + styleFlatMod(char, "attacks");
    let head;
    if (mv.resolution === "attack") {
      const r = rollD20(rollMode);
      const d20 = r.die;
      const exh = exhaustionPenalty(char);
      head = { kind: "attack", d20, atk, situ, env: envAtk, exh, mode: r.mode, rolls: r.rolls, hit: d20 + atk + situ + envAtk + exh };
      // A natural 20 is a Critical Hit: roll the damage dice again and add them.
      if (d20 === 20 && dmg && parsed) {
        const extra = rollDice({ ...parsed, mod: 0 });
        dmg.total += extra.total; dmg.crit = extra.rolls;
      }
      // Auto-resolve against a Session-selected target. The target's AC is never
      // shown — players only see HIT / MISS.
      if (combatTarget && combatTarget.ac != null) {
        const crit = d20 === 20, fumble = d20 === 1;
        head.landed = crit || (!fumble && head.hit >= combatTarget.ac);
        head.outcome = crit ? "crit" : fumble ? "fumble" : head.landed ? "hit" : "miss";
        head.targetName = combatTarget.name;
      }
    } else if (mv.resolution === "save") {
      head = { kind: "save", dc: ref.dc, ability: mv.saveAbility || "" };
    } else {
      head = { kind: "utility" };
    }
    // Spend the move's Ki cost automatically, Temporary Ki first (book p.9).
    // Short on Ki: drain what's there and flag it.
    const cost = parseInt(String(mv.kiCost || "").match(/\d+/)?.[0] || "0", 10) || 0;
    const paid = cost > 0 ? spendPatch(char, "ki", cost) : null;
    const short = cost > 0 && !paid;
    const patch = cost > 0 ? (paid || { ki: 0, temp: { ...(char.temp || { hp: 0, ki: 0, stamina: 0 }), ki: 0 } }) : {};
    // A melee hit during the Attack Action restores 5 × Ki Rank Ki (p.25),
    // doubled by Boosted (Instinct). Only known when there's a target.
    let kiGain = 0;
    if (head.kind === "attack" && head.landed && mv.melee && mv.attackAction) {
      kiGain = 5 * computeKiRank(char) * ((char.activeConditions || {}).boostedInstinct ? 2 : 1);
      const base = patch.ki != null ? patch.ki : (char.ki || 0);
      patch.ki = Math.min(char.maxKi || 0, base + kiGain);
      kiGain = patch.ki - base;
    }
    if (set && Object.keys(patch).length) set(patch);
    // A hit (or a save move) on a tracker target can be applied straight to it.
    const target = combatTarget && combatTarget.id && dmg && (head.kind === "save" || head.landed)
      ? { id: combatTarget.id, name: combatTarget.name, ignoreDR: mv.attackAction ? drIgnoredBy(char) : 0, crit: head.outcome === "crit" }
      : null;
    setLog(prev => [{ id: uid(), name: mv.name, type: mv.techType, head, dmg, kiSpent: cost, kiShort: short, kiGain, target }, ...prev].slice(0, 10));
    if (target) setPending({ ...target, amount: dmg.total, save: head.kind === "save", move: mv.name });
    else if (combatTarget) setPending(null);
    const landedOnTarget = head.kind === "attack" && head.outcome;
    const bannerColor = landedOnTarget ? (head.landed ? COLORS.red : COLORS.dim) : head.kind === "attack" ? COLORS.blue : head.kind === "save" ? COLORS.gold : COLORS.muted;
    const dieText = head.kind === "attack" ? (head.mode !== "normal" ? `d20 ${rollModeLabel(head.mode)} [${head.rolls.join(", ")}] ${head.d20}` : `d20 ${head.d20}`) : "";
    const headDetail = head.kind === "attack" ? `${dieText} ${atk >= 0 ? "+" : ""}${atk}${head.situ ? ` ${head.situ >= 0 ? "+" : ""}${head.situ}` : ""}${head.env ? ` ${head.env >= 0 ? "+" : ""}${head.env} mod` : ""}${head.exh ? ` ${head.exh} Exhaustion` : ""} → hit ${head.hit}`
      : head.kind === "save" ? `DC ${head.dc}${head.ability ? ` ${head.ability.slice(0, 3)}` : ""}` : "";
    emitRoll({
      label: landedOnTarget ? `${mv.name} → ${head.targetName}` : mv.name,
      total: head.kind === "attack" ? head.hit : (dmg ? dmg.total : ""),
      // The target's AC is deliberately omitted — only the outcome is shared.
      detail: [landedOnTarget ? head.outcome.toUpperCase() : "", headDetail, dmg ? `dmg ${dmg.total}` : "", cost > 0 ? `−${cost} Ki` : ""].filter(Boolean).join(" · "),
      color: bannerColor, share: true, who: char.name || "",
    });
    if (rollMode !== "normal") setRollMode("normal");   // Advantage / Disadvantage is a per roll choice
  };

  const useSnap = (sd) => {
    const cost = typeof sd.cost === "number" ? sd.cost : 0;
    const paid = cost > 0 ? spendPatch(char, "stamina", cost) : null;
    const short = cost > 0 && !paid;
    const patch = cost > 0 ? (paid || { stamina: 0, temp: { ...(char.temp || { hp: 0, ki: 0, stamina: 0 }), stamina: 0 } }) : {};
    // Block and Wild Sense last until the start of your next turn and end when
    // you use any other Snap Decision. The tracker applies them to hits.
    patch.blocking = sd.name === "Block";
    patch.wildSense = sd.name === "Wild Sense";
    if (set) set(patch);
    setLog(prev => [{ id: uid(), name: `Snap: ${sd.name}`, head: { kind: "utility" }, staSpent: cost, staShort: short }, ...prev].slice(0, 10));
  };

  // Breather pool (book): Lv + CON mod, drawn as an Action to top off Stamina;
  // refreshes on a Long Rest.
  const breatherMax = Math.max(0, charTotalLevel(char) + statMod(char, "con"));
  const breatherLeft = char.breatherPool != null ? char.breatherPool : breatherMax;
  const takeBreather = () => {
    if (!set) return;
    const room = (char.maxStamina || 0) - (char.stamina || 0);
    const draw = Math.min(breatherLeft, room);
    if (draw <= 0) { setLog(prev => [{ id: uid(), name: "Breather", head: { kind: "utility" }, note: room <= 0 ? "Stamina full" : "Pool empty" }, ...prev].slice(0, 10)); return; }
    set({ stamina: (char.stamina || 0) + draw, breatherPool: breatherLeft - draw });
    setLog(prev => [{ id: uid(), name: "Breather", head: { kind: "utility" }, staGain: draw }, ...prev].slice(0, 10));
  };
  const refreshBreather = () => set && set({ breatherPool: null });

  // Gather Ki (book Ch.1): Major restores 16×(Rank+Power); Minor rolls (4×Rank)d4
  // + WIS. Overfill past Max Ki becomes Temporary Ki (1 minute) — routed into the
  // Vitals Temp Ki tracker.
  const gatherKi = (kind) => {
    if (!set) return;
    const maxKi = char.maxKi || 0, cur = char.ki || 0;
    let amount, note;
    if (kind === "major") { amount = regen.major; note = "Action"; }
    else { const d = rollDice(parseDice(regen.minorDice)); amount = d.total; note = `Bonus · [${d.rolls.join(",")}${d.mod ? (d.mod >= 0 ? "+" : "") + d.mod : ""}]`; }
    const kiGain = Math.min(amount, Math.max(0, maxKi - cur));
    const overfill = Math.max(0, amount - kiGain);
    const patch = { ki: cur + kiGain };
    if (overfill > 0) patch.temp = { ...(char.temp || { hp: 0, ki: 0, stamina: 0 }), ki: (char.temp?.ki || 0) + overfill };
    set(patch);
    setLog(prev => [{ id: uid(), name: `Gather Ki (${kind === "major" ? "Major" : "Minor"})`, head: { kind: "utility" }, kiGain, tempKiGain: overfill, note }, ...prev].slice(0, 10));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {inKiExhaustion(char) && (
        <div role="alert" style={{ background: `${COLORS.purple}14`, border: `1px solid ${COLORS.purple}55`, borderRadius: 8, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.5 }}>
          <b style={{ color: COLORS.purple }}>Ki Exhaustion.</b> No Techniques, Basic Ki Blasts or Heroic Feats; no form or Proficiency AC bonus;
          no Ascend, Awaken, Ramp Up, Shine or Power Strike; one Snap Decision per round. Gather Ki to get out of it.
        </div>
      )}
      {exhaustionRanks(char) > 0 && (
        <div style={{ background: `${COLORS.amber}12`, border: `1px solid ${COLORS.amber}44`, borderRadius: 8, padding: "7px 12px", fontSize: 12.5 }}>
          <b style={{ color: COLORS.amber }}>Exhaustion {exhaustionRanks(char)}</b>: {exhaustionPenalty(char)} on every d20 roll (already in your rolls), −{5 * exhaustionRanks(char)} ft speed.
          {exhaustionRanks(char) >= 6 ? " Six ranks is death." : " A Long Rest removes one rank."}
        </div>
      )}
      {combatTarget && (
        <div style={{ background: `${COLORS.red}14`, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <Crosshair size={15} color={COLORS.red} />
          <span style={{ fontSize: 13 }}>Attacking <b style={{ color: COLORS.red }}>{combatTarget.name}</b> — roll a move; it lands as <b>HIT</b> or <b>MISS</b>.</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={() => { setPending(null); onClearTarget && onClearTarget(); }} title="Clear target"><X size={13} /></Btn>
        </div>
      )}
      {pending && (
        <div role="status" style={{ background: COLORS.panel2, border: `1px solid ${pending.done ? COLORS.green : COLORS.red}66`, borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {pending.done ? (
            <span style={{ fontSize: 13 }}>
              <b style={{ color: COLORS.green }}>{pending.done.name}</b> took <b>{pending.done.amount}</b>
              {pending.done.steps.length > 0 && <span style={{ color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11 }}> ({pending.done.steps.join(", ")})</span>}
              {pending.done.state && <Tag color={pending.done.state === "bloodied" ? COLORS.amber : COLORS.red}>{pending.done.state === "down" ? "Down" : pending.done.state === "critical" ? "Critical" : "Bloodied"}</Tag>}
            </span>
          ) : (
            <>
              <span style={{ fontSize: 13 }}>
                <b>{pending.move}</b>{pending.crit ? <b style={{ color: COLORS.gold }}> CRIT</b> : ""} for <b style={{ color: COLORS.red }}>{pending.amount}</b>
                {pending.save ? <> — did <b>{pending.name}</b> make the save?</> : <> on <b>{pending.name}</b></>}
              </span>
              {pending.error && <span style={{ color: COLORS.red, fontSize: 12 }}>{pending.error}</span>}
              <div style={{ flex: 1 }} />
              {pending.save ? (<>
                <Btn size="sm" variant="danger" disabled={applying} onClick={() => applyPending("full")}>Failed: apply {pending.amount}</Btn>
                <Btn size="sm" disabled={applying} onClick={() => applyPending("half")}>Saved: apply half</Btn>
              </>) : (
                <Btn size="sm" variant="danger" disabled={applying} onClick={() => applyPending("full")} title="DR, Block and Temp HP are worked out for you">Apply to {pending.name}</Btn>
              )}
            </>
          )}
          <Btn size="sm" variant="ghost" onClick={() => setPending(null)} title="Dismiss"><X size={13} /></Btn>
        </div>
      )}
      {/* Moves — roll your turn from here */}
      {/* Battle Power banner — top of the page */}
      <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", background: `linear-gradient(90deg, ${COLORS.gold}14, transparent)` }}>
        <div>
          <div style={{ fontSize: 10.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{power.label}</div>
          <div style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 900, color: COLORS.gold }}>{power.value.toLocaleString()}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, color: COLORS.dim, lineHeight: 1.6 }}>
          <div>Ki Rank <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeKiRank(char)}</span> · Power <span style={{ color: COLORS.text, fontWeight: 700 }}>{effectivePowerBonus(char) >= 0 ? "+" : ""}{effectivePowerBonus(char)}</span>{(() => {
            // Full breakdown — every source that feeds effectivePowerBonus, so the
            // parenthetical always sums to the number shown (forms/conditions/
            // weighted were previously dropped, making +4 read as "+0 base +2 forms").
            const base = totalPowerBonus(char), forms = activeFormPower(char), cond = activeConditionPower(char), wt = weightedPower(char);
            if (forms === 0 && cond === 0 && wt === 0) return null;
            return <span style={{ color: COLORS.gold }}> ({base >= 0 ? "+" : ""}{base} base{forms !== 0 ? ` · ${forms >= 0 ? "+" : ""}${forms} forms` : ""}{cond !== 0 ? ` · ${cond >= 0 ? "+" : ""}${cond} cond` : ""}{wt !== 0 ? ` · ${wt >= 0 ? "+" : ""}${wt} wt` : ""})</span>;
          })()}</div>
          <div>Carry Weight <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeCarryWeight(char).toLocaleString()}</span></div>
        </div>
      </div>

      {/* Fighting Style — one equipped stance; its effects apply while worn */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <Swords size={14} color={COLORS.red} />
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Fighting Style</span>
        <Select value={char.styleId || ""} onChange={e => set({ styleId: e.target.value || null })} style={{ minWidth: 190 }}>
          <option value="">None equipped</option>
          {(stylesReg.entries || []).filter(s => s.enabled || s._id === char.styleId).map(s => <option key={s._id} value={s._id}>{s._name}</option>)}
        </Select>
        {equippedStyle && (<>
          <span style={{ fontSize: 11.5, color: COLORS.dim, flex: "1 1 160px", minWidth: 0 }}>{equippedStyle.effect && equippedStyle.effect.text}</span>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {((equippedStyle.effect && equippedStyle.effect.hooks) || []).map((h, i) => <Tag key={i} color={(hookType(h.type) || {}).color || COLORS.green}>{hookSummary(h)}</Tag>)}
          </div>
        </>)}
      </div>

      {/* Roll modifiers — apply to your next attack roll */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Roll with</span>
        <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {[["dis", "Disadvantage", COLORS.red], ["normal", "Normal", COLORS.text], ["adv", "Advantage", COLORS.green]].map(([m, l, c]) => (
            <button key={m} onClick={() => setRollMode(m)} style={{ padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", background: rollMode === m ? `${c}22` : "transparent", color: rollMode === m ? c : COLORS.muted }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Bonus</span>
          <TextInput type="number" value={situBonus} onChange={e => setSituBonus(e.target.value)} placeholder="0" style={{ width: 58, textAlign: "center" }} title="Situational modifier added to your attack roll" />
          {situBonus !== "" && Number(situBonus) !== 0 && <Btn size="sm" variant="ghost" onClick={() => setSituBonus("")}>Clear</Btn>}
        </div>
        {rollMode !== "normal" && <Tag color={rollMode === "adv" ? COLORS.green : COLORS.red}>{rollModeLabel(rollMode)} · next roll</Tag>}
      </div>

      {/* Passives — kept above the moves for at-a-glance reference */}
      <div style={cardStyle}>
        <div style={headStyle}>Passive Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {[["Ki Stealth", pas.kiStealth],["Perception", pas.perception],["Insight", pas.insight],["Stealth", pas.stealth]].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 4px" }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{val}</div>
              <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ATK / DC Quick Ref — kept with Passives for at-a-glance reference */}
      <div style={cardStyle}>
        <div style={headStyle}>ATK / DC Quick Ref</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
          {refs.map(r => (
            <div key={r.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px" }}>
              <span style={{ fontSize: 11.5 }}>{r.label} <span style={{ color: COLORS.dim, fontSize: 9.5 }}>({STAT_MOD_LABEL[r.stat]})</span></span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11.5 }}>
                <span style={{ color: COLORS.blue }} title="Attack Bonus">{r.atk >= 0 ? "+" : ""}{r.atk}</span>
                <span style={{ color: COLORS.dim }}> / </span>
                <span style={{ color: COLORS.gold }} title="Save DC">DC {r.dc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Moves — held weapon's damage logic (or unarmed CQC) + Ki Blast */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Basic Moves</span>
          {set && <span onClick={() => setEditBasic(!editBasic)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline", textTransform: "none", letterSpacing: 0 }}>{editBasic ? "done" : "edit"}</span>}
        </div>
        {editBasic ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {basicMoves.map(mv => {
              const cur = applyOv(mv);
              return <MoveFields key={mv.uid} mv={cur} nameEditable={false} onChange={patch => setOverride(mv.uid, patch)} onReset={overrides[mv.uid] ? () => resetOverride(mv.uid) : null} />;
            })}
            {customBasic.map(mv => <MoveFields key={mv.uid} mv={mv} onChange={patch => setCustom(mv.uid, patch)} onRemove={() => removeCustom(mv.uid)} />)}
            <Btn size="sm" onClick={() => addCustom("basic")}><Plus size={12}/> Add basic move</Btn>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
            {basicRender.map(moveCard)}
          </div>
        )}
      </div>

      {/* Advanced Moves — techniques, feature attacks, weapon extras; curated via edit */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Advanced Moves</span>
          {set && (
            <span onClick={() => setEditSpecial(!editSpecial)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline", textTransform: "none", letterSpacing: 0 }}>
              {editSpecial ? "done" : "edit"}
            </span>
          )}
        </div>
        {editSpecial ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {specialAll.length > 0 && <div style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Known techniques — show in Combat</div>}
            {specialAll.map(t => (
              <label key={t.uid} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px" }}>
                <Checkbox checked={t.combatVisible !== false} onChange={() => toggleSpecial(t.uid)} />
                <span style={{ fontWeight: 600, flex: 1 }}>{t.name}</span>
                <span style={{ color: COLORS.dim, fontSize: 10, fontFamily: FONTS.mono }}>{t.techType}{t.damageDice ? ` · ${t.damageDice}` : ""}</span>
              </label>
            ))}
            {customAdvanced.length > 0 && <div style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 }}>Custom moves</div>}
            {customAdvanced.map(mv => <MoveFields key={mv.uid} mv={mv} onChange={patch => setCustom(mv.uid, patch)} onRemove={() => removeCustom(mv.uid)} />)}
            <Btn size="sm" onClick={() => addCustom("advanced")}><Plus size={12}/> Add advanced move</Btn>
          </div>
        ) : advancedRender.length === 0 && weaponEffects.length === 0 ? (
          <div style={{ fontSize: 11.5, color: COLORS.dim }}>—</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
            {advancedRender.map(moveCard)}
          </div>
        )}
        {!editSpecial && weaponEffects.length > 0 && (
          <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {weaponEffects.map(ef => (
              <div key={ef.id} style={{ fontSize: 11.5, lineHeight: 1.5 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>[{ef.name}]</span>
                <span style={{ color: COLORS.dim }}> from {ef.itemName}:</span>
                {ef.description ? <span style={{ color: COLORS.muted }}> {ef.description}</span> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Limited-Use Resources — class pools + custom; spend/roll where you act. */}
      {(char.resources || []).length > 0 && (
        <div style={cardStyle}>
          <div style={headStyle}>Resources</div>
          <ResourceTracker char={char} set={set} compact />
        </div>
      )}

      {/* Snap Decisions — reactions that spend Stamina on use */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Snap Decisions</span>
          <span style={{ color: COLORS.dim, fontSize: 9, textTransform: "none", letterSpacing: 0 }}>1 per round · limits not auto-tracked</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
          {SNAP_DECISIONS.map(sd => {
            const isOpen = openSnap === sd.name;
            const numeric = typeof sd.cost === "number";
            return (
              <div key={sd.name} style={{ background: COLORS.panel, border: `1px solid ${isOpen ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px" }}>
                  <span onClick={() => setOpenSnap(isOpen ? null : sd.name)} style={{ cursor: "pointer", flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                    {isOpen ? <ChevronDown size={13} color={COLORS.dim} /> : <ChevronRight size={13} color={COLORS.dim} />}
                    <span style={{ fontWeight: 700, fontSize: 12.5 }}>{sd.name}</span>
                    <span style={{ fontSize: 9.5, color: COLORS.dim }}>{sd.limit}</span>
                  </span>
                  <span style={{ fontSize: 10, color: COLORS.gold, fontFamily: FONTS.mono, whiteSpace: "nowrap" }}>{numeric ? `${sd.cost} Sta` : sd.cost}</span>
                  {set && <button onClick={() => useSnap(sd)} title={numeric ? `Spend ${sd.cost} Stamina` : "Log (variable cost)"} style={{ background: `${COLORS.gold}1A`, border: `1px solid ${COLORS.gold}66`, color: COLORS.gold, borderRadius: 5, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>Use</button>}
                </div>
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "8px 10px", fontSize: 11.5, lineHeight: 1.5 }}>
                    <div style={{ color: COLORS.blue, marginBottom: 4 }}><span style={{ color: COLORS.dim }}>Trigger:</span> {sd.trigger}</div>
                    <div style={{ color: COLORS.muted }}>{sd.text}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Breather — draw Stamina from the pool (Action); refills on a Long Rest.
          Sits right after the Snap Decisions (stamina maneuvers). */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ ...headStyle, marginBottom: 2 }}>Breather</div>
          <div style={{ fontSize: 12.5, color: COLORS.muted }}>Pool <span style={{ color: breatherLeft > 0 ? COLORS.text : COLORS.dim, fontWeight: 700, fontFamily: FONTS.mono }}>{breatherLeft} / {breatherMax}</span> <span style={{ color: COLORS.dim, fontSize: 10 }}>(Lv + CON)</span></div>
        </div>
        <div style={{ flex: 1 }} />
        {set && <span onClick={refreshBreather} title="Refill (Long Rest)" style={{ cursor: "pointer", color: COLORS.dim, fontSize: 10 }}>long rest</span>}
        {set && <Btn size="sm" variant="gold" onClick={takeBreather}><Flame size={13}/> Take a Breather</Btn>}
      </div>

      {/* Ki Regen */}
      <div style={cardStyle}>
          <div style={headStyle}>Ki Regen Quick Ref</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginBottom: 6 }}>
            <span style={{ color: COLORS.muted }}>Gather Ki (Major)</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: FONTS.mono, color: COLORS.blue, fontWeight: 700 }}>+{regen.major}</span>
              {set && <Btn size="sm" onClick={() => gatherKi("major")} title="Restore Ki (Action); overfill → Temp Ki"><Zap size={12}/> Gather</Btn>}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
            <span style={{ color: COLORS.muted }}>Gather Ki (Minor)</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: FONTS.mono, color: COLORS.blue, fontWeight: 700 }}>{regen.minorDice}</span>
              {set && <Btn size="sm" onClick={() => gatherKi("minor")} title="Roll & restore Ki (Bonus Action); overfill → Temp Ki"><Zap size={12}/> Gather</Btn>}
            </div>
          </div>
          <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 6 }}>Major = Action · Minor = Bonus Action</div>
        </div>

      {/* Roll log — bottom of the tab */}
      {log.length > 0 && (
        <div style={cardStyle}>
          <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
            <span>Roll Log</span>
            <span onClick={() => setLog([])} style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textTransform: "none", letterSpacing: 0 }}>clear</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {log.map(r => (
              <div key={r.id} style={{ fontSize: 11.5, fontFamily: FONTS.mono, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, color: COLORS.text }}>{r.name}</span>
                {r.head.kind === "attack" && <span style={{ color: COLORS.blue }}>hit {r.head.hit} <span style={{ color: COLORS.dim }}>(d20 {r.head.d20} +{r.head.atk}{r.head.env ? `${r.head.env >= 0 ? " +" : " "}${r.head.env} mod` : ""})</span></span>}
                {r.head.kind === "save" && <span style={{ color: COLORS.gold }}>DC {r.head.dc}{r.head.ability ? ` ${r.head.ability}` : ""}</span>}
                {r.dmg && <span style={{ color: COLORS.red }}>dmg {r.dmg.total} <span style={{ color: COLORS.dim }}>[{r.dmg.rolls.join(",")}{r.dmg.crit ? ` | crit ${r.dmg.crit.join(",")}` : ""}{r.dmg.mod ? (r.dmg.mod>=0?"+":"")+r.dmg.mod : ""}]</span></span>}
                {r.kiSpent > 0 && <span style={{ color: r.kiShort ? COLORS.red : COLORS.blue }}>−{r.kiSpent} Ki{r.kiShort ? " (short!)" : ""}</span>}
                {r.staSpent > 0 && <span style={{ color: r.staShort ? COLORS.red : COLORS.gold }}>−{r.staSpent} Stamina{r.staShort ? " (short!)" : ""}</span>}
                {r.staGain > 0 && <span style={{ color: COLORS.green }}>+{r.staGain} Stamina</span>}
                {r.kiGain > 0 && <span style={{ color: COLORS.green }}>+{r.kiGain} Ki</span>}
                {r.tempKiGain > 0 && <span style={{ color: COLORS.blue }}>+{r.tempKiGain} Temp Ki</span>}
                {r.note && <span style={{ color: COLORS.dim }}>{r.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export {
  parseDice,
  rollDice,
  SNAP_DECISIONS,
  MOVE_RESOLUTIONS,
  blankMove,
  MoveFields,
  CombatRefTab,
};
