import React, { useState, useEffect } from "react";
import { Check, ChevronRight, Crosshair, Dices, Eye, EyeOff, HeartPulse, Plus, Radio, RotateCcw, Skull, Sparkles, Swords, Trash2, Users, Wand2, X } from "lucide-react";
import { useLocalOption } from "../../state/local-options.js";
import { deviceId, emitNav, emitRoll, logSession, rollsPrivate, setRollsPrivate } from "../../app/bus.js";
import { abilityMod, activeFormUpkeep, effectivePowerBonus, statMod } from "../../engine/core.js";
import { HEALTH_LABEL, damagePatch, deathSave, healthState, overloadDamage, spendPatch, totalDR } from "../../engine/damage.js";
import { computeSaveBonus } from "../../engine/skills.js";
import { computeOverload } from "../../engine/derived.js";
import { computeAC } from "../../engine/equipment.js";
import { isCaster } from "../../engine/spellcasting.js";
import { roll, uid } from "../../lib/dice.js";
import { CURRENT_HOUSE_RULES, envDmgPerTurn, envKiCostMult, useSharedList } from "../../state/hooks.js";
import { Btn, ConfirmBtn, EmptyState, ErrorBanner, LoadingBlock, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { ApplyPanel, DyingPanel, StatStepper, blankCombatant } from "./combat-parts.jsx";
import { advanceTime, readTime } from "./time.jsx";

const DEATH_SAVE_TEXT = { revived: "natural 20, back up at 1 HP", stable: "third success, Stable", success: "success", fail: "failure", dead: "third failure, dead" };

function InitiativeTab() {
  const [state, persist, error] = useSharedList("session_combat");
  const data = state && state[0] ? state[0] : { round: 1, turn: 0, combatants: [] };
  const [newName, setNewName] = useState("");
  const [tagInputs, setTagInputs] = useState({});
  const [tagRounds, setTagRounds] = useState({});   // optional round timer per condition
  const [chars, persistChars] = useSharedList("characters_v2");
  const [npcs, persistNpcs] = useSharedList("npcs_v2");
  const [timeState, persistTime] = useSharedList("session_time");
  const [picker, setPicker] = useState(null);   // "players" | "npcs" | null
  const [sel, setSel] = useState({});            // id -> true, staged in the picker
  const [atkId, setAtkId] = useState("");        // armed attacker (click a row to target)
  const [applyId, setApplyId] = useState("");    // row with the damage / heal panel open
  // Per-device view. Players see teammate resources but not enemy (NPC) ones;
  // the DM sees everything and can reveal specific enemies.
  const [sessionView, setSessionView] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const isDM = sessionView.mode === "dm";
  useEffect(() => {
    if (!atkId) return;
    const onKey = (e) => { if (e.key === "Escape") setAtkId(""); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [atkId]);
  if (state === null) return <LoadingBlock />;
  const save = (patch) => persist([{ ...data, ...patch }]);
  const sorted = [...data.combatants].sort((a,b) => b.init - a.init);
  const activeId = sorted[data.turn % Math.max(sorted.length,1)]?.id;
  const addCombatant = () => { save({ combatants: [...data.combatants, { ...blankCombatant(), name: newName || "New Combatant" }] }); setNewName(""); };

  // The live source sheet behind a linked combatant (Slice 1b). Its pools are
  // the source of truth: linked rows display these and edits write back to them.
  const sourceOf = (c) => {
    if (!c || !c.sourceId) return null;
    const list = c.sourceType === "player" ? (chars || []) : (npcs || []);
    return list.find(e => e.id === c.sourceId) || null;
  };
  const POOL_FIELDS = ["hp", "maxHp", "ki", "maxKi", "stamina", "maxStamina", "temp", "deathSaves", "dead", "stable"];
  const updateCombatant = (id, patch) => {
    save({ combatants: data.combatants.map(c => c.id===id?{...c,...patch}:c) });
    // Write pool changes through to the linked sheet so damage/Ki stays in step.
    const c = data.combatants.find(x => x.id === id);
    if (!c || !c.sourceId) return;
    const pool = {};
    for (const k of POOL_FIELDS) if (k in patch) pool[k] = patch[k];
    if (!Object.keys(pool).length) return;
    if (c.sourceType === "player" && chars && persistChars) persistChars(chars.map(e => e.id===c.sourceId ? { ...e, ...pool } : e));
    else if (c.sourceType === "npc" && npcs && persistNpcs) persistNpcs(npcs.map(e => e.id===c.sourceId ? { ...e, ...pool } : e));
  };
  const removeCombatant = (id) => save({ combatants: data.combatants.filter(c => c.id !== id) });

  // --- Targeting: hand off to the fighter's own sheet (Slice 1c) ------------
  // The acting fighter jumps to their Combat tab to roll their real attack. The
  // target's AC rides along silently so the sheet can show HIT/MISS without ever
  // revealing the number. Combat profile only needs the defender's AC here.
  const combatProfile = (c) => {
    const src = sourceOf(c);
    if (c?.sourceType === "player" && src) {
      const ac = (computeAC(src)?.value) ?? src.ac ?? 10;
      return { ac };
    }
    if (c?.sourceType === "npc" && src) return { ac: src.ac ?? 10 };
    return { ac: 10 };
  };
  const attacker = data.combatants.find(c => c.id === atkId) || null;
  // Linked players AND NPCs have a sheet to roll from. Their sheet lives on a
  // different top-nav tab and names its "features" surface differently.
  const canAct = (c) => !!(c && c.sourceId && (c.sourceType === "player" || c.sourceType === "npc"));
  const navTabFor = (c) => c.sourceType === "npc" ? "npcs" : "players";
  const featureTabFor = (c) => c.sourceType === "npc" ? "features" : "growth";
  const isCasterC = (c) => { const s = sourceOf(c); return !!(s && (isCaster(s) || ["Caster", "Mage"].includes(s.archetype))); };
  const handOff = (tgt) => {
    if (!attacker || !tgt || attacker.id === tgt.id || !canAct(attacker)) { setAtkId(""); return; }
    const tp = combatProfile(tgt);
    emitNav({ tab: navTabFor(attacker), entityId: attacker.sourceId, sheetTab: "combat", target: { id: tgt.id, name: tgt.name, ac: tp.ac } });
    setAtkId("");
  };
  const goToSheet = (c, sheetTab) => { if (canAct(c)) emitNav({ tab: navTabFor(c), entityId: c.sourceId, sheetTab, target: null }); };
  const armAttacker = (id) => setAtkId(id);

  // Flat damage strings from hazards: "2d6+1" or "5".
  const rollDestruction = (s) => {
    const m = String(s).match(/(\d*)d(\d+)([+-]\d+)?/i);
    if (m) { let t = 0; const cnt = +(m[1] || 1); for (let i = 0; i < cnt; i++) t += roll(+m[2]); return t + (+(m[3] || 0)); }
    const flat = String(s).match(/^\s*(\d+)/); return flat ? +flat[1] : 0;
  };

  // --- Turn order: end of the old turn, start of the new one ----------------
  // Timed conditions count down at the END of their owner's turn, so "1 round"
  // from an enemy lasts through your next turn, and "until the start of your
  // next turn" effects you gain at the start of your turn cover that turn.
  // The start of a turn runs the book's start-of-turn steps (Ch.1) on the
  // linked sheet: Block / Wild Sense end, Upkeep is paid (Temporary Ki first),
  // Overload deals Destruction Damage and forces the Wisdom save against
  // Dazed, Harsh Galaxies hazards hit, and anyone at 0 HP rolls a Death Save.
  const nextTurn = () => {
    if (!sorted.length) return;
    const n = data.turn + 1;
    const wrap = n >= sorted.length;
    const newTurn = wrap ? 0 : n;
    const newRound = wrap ? data.round + 1 : data.round;
    let combatants = data.combatants;

    // A completed round is 6 seconds of in world time (10 rounds = 1 minute).
    if (wrap && persistTime) persistTime([advanceTime(readTime(timeState), 6)]);

    const ending = sorted[data.turn % sorted.length];
    if (ending && ending.conditions && ending.conditions.length) {
      const expired = [];
      const next = [];
      for (const raw of ending.conditions) {
        const cd = typeof raw === "string" ? { text: raw, rounds: null } : raw;
        if (cd.rounds != null) {
          const rr = cd.rounds - 1;
          if (rr <= 0) { expired.push(cd.text); continue; }
          next.push({ ...cd, rounds: rr });
        } else next.push(cd);
      }
      combatants = combatants.map(c => c.id === ending.id ? { ...c, conditions: next } : c);
      if (expired.length) logSession(`${ending.name}: ${expired.join(", ")} ended`, ending.name);
    }

    const nowActive = sorted[newTurn];
    const src = nowActive ? sourceOf(nowActive) : null;
    const subject = src || nowActive;
    if (subject) {
      const notes = [];
      let cur = { ...subject };
      const merge = (patch) => { cur = { ...cur, ...patch }; };
      const addCondition = (text, rounds) => {
        combatants = combatants.map(c => c.id === nowActive.id ? { ...c, conditions: [...(c.conditions || []), { text, rounds }] } : c);
      };
      if (src && (src.blocking || src.wildSense)) merge({ blocking: false, wildSense: false });

      const conscious = (cur.hp || 0) > 0;
      if (src && conscious) {
        // Upkeep is only paid while conscious (p.8).
        let upkeep = 0;
        try { upkeep = activeFormUpkeep(src) || 0; } catch { /* no forms */ }
        if (CURRENT_HOUSE_RULES.harshGalaxies && upkeep > 0) upkeep = Math.round(upkeep * envKiCostMult());
        if (upkeep > 0) {
          const paid = spendPatch(cur, "ki", upkeep);
          merge(paid || { ki: 0, temp: { ...(cur.temp || { hp: 0, ki: 0, stamina: 0 }), ki: 0 } });
          notes.push(paid ? `−${upkeep} Ki upkeep` : `couldn't cover ${upkeep} Ki upkeep`);
        }
        // Overload: Destruction Damage, then a Wisdom save (DC 10 + Power) or Dazed.
        let ov = null;
        try { ov = computeOverload(src); } catch { /* no overload model */ }
        if (ov && ov.over > 0) {
          const hurt = overloadDamage(ov.over);
          merge(damagePatch(cur, hurt).patch);
          const bonus = nowActive.sourceType === "player" ? computeSaveBonus(src, "wis").value : abilityMod(src.stats?.wis ?? 10);
          const dc = 10 + effectivePowerBonus(src);
          const d20 = roll(20);
          const passed = d20 + bonus >= dc;
          notes.push(`−${hurt} HP Overload (Destruction)`);
          notes.push(`Wis save ${d20 + bonus} vs DC ${dc}: ${passed ? "held on" : "Dazed"}`);
          if (!passed) addCondition("Dazed", 1);
        }
      }
      // Environmental effect hooks (Harsh Galaxies): poison, radiation and the like.
      if (CURRENT_HOUSE_RULES.harshGalaxies) {
        let envDmg = 0;
        for (const f of envDmgPerTurn()) envDmg += rollDestruction(f);
        if (envDmg > 0) { merge(damagePatch(cur, envDmg).patch); notes.push(`−${envDmg} HP environment`); }
      }
      // At 0 HP and not yet Stable: the Death Save happens now (p.25).
      if ((cur.hp || 0) <= 0 && !cur.dead && !cur.stable && (cur.maxHp || 0) > 0) {
        const ds = deathSave(cur);
        merge(ds.patch);
        notes.push(`Death Save ${ds.d20}: ${DEATH_SAVE_TEXT[ds.outcome]}`);
      }

      const changed = {};
      for (const k of ["hp", "ki", "temp", "deathSaves", "dead", "stable", "blocking", "wildSense"]) {
        if (JSON.stringify(cur[k]) !== JSON.stringify(subject[k])) changed[k] = cur[k];
      }
      if (Object.keys(changed).length) {
        if (src && nowActive.sourceType === "player" && chars && persistChars) persistChars(chars.map(e => e.id === src.id ? { ...e, ...changed } : e));
        else if (src && nowActive.sourceType === "npc" && npcs && persistNpcs) persistNpcs(npcs.map(e => e.id === src.id ? { ...e, ...changed } : e));
        const mirror = Object.fromEntries(Object.entries(changed).filter(([k]) => k !== "blocking" && k !== "wildSense"));
        combatants = combatants.map(c => c.id === nowActive.id ? { ...c, ...mirror } : c);
      }
      if (notes.length) logSession(`${nowActive.name} start of turn: ${notes.join(" · ")}`, nowActive.name);
    }
    save({ turn: newTurn, round: newRound, combatants });
  };
  const resetCombat = () => save({ round: 1, turn: 0, combatants: [] });

  // --- Pull real fighters into the tracker (Slice 1a) -----------------------
  // Combatants carry sourceId/sourceType so their pools can sync back to the
  // sheet later. Stats mirror what the sheet computes: DR = armor + power,
  // initiative = d20 + Dex mod.
  const linkedIds = new Set(data.combatants.map(c => c.sourceId).filter(Boolean));
  const combatantFromChar = (c) => ({
    ...blankCombatant(), name: c.name, sourceId: c.id, sourceType: "player",
    init: roll(20) + statMod(c, "dex"),
    hp: c.hp ?? c.maxHp ?? 20, maxHp: c.maxHp ?? 20,
    ki: c.ki ?? 0, maxKi: c.maxKi ?? 0,
    stamina: c.stamina ?? 0, maxStamina: c.maxStamina ?? 0,
    dr: totalDR(c),
  });
  const combatantFromNpc = (n) => ({
    ...blankCombatant(), name: n.name, sourceId: n.id, sourceType: "npc",
    init: roll(20) + abilityMod(n.stats?.dex ?? 10),
    hp: n.hp ?? n.maxHp ?? 20, maxHp: n.maxHp ?? 20,
    ki: n.ki ?? 0, maxKi: n.maxKi ?? 0,
    stamina: n.stamina ?? 0, maxStamina: n.maxStamina ?? 0,
    dr: n.dr ?? 0,
  });
  const openPicker = (which) => { setPicker(which); setSel({}); };
  const pickerList = picker === "players" ? (chars || []) : picker === "npcs" ? (npcs || []) : [];
  const commitPicker = () => {
    const maker = picker === "players" ? combatantFromChar : combatantFromNpc;
    const chosen = pickerList.filter(e => sel[e.id]).map(maker);
    if (chosen.length) save({ combatants: [...data.combatants, ...chosen] });
    setPicker(null); setSel({});
  };

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <TextInput placeholder="Combatant name..." value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key==="Enter" && addCombatant()} style={{ maxWidth: 200 }} />
        <Btn variant="gold" onClick={addCombatant}><Plus size={14}/> Add</Btn>
        <Btn onClick={() => openPicker("players")}><Users size={14}/> Add Players</Btn>
        <Btn onClick={() => openPicker("npcs")}><Skull size={14}/> Add NPCs</Btn>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${COLORS.border}`, alignSelf: "center" }} title="Player view hides enemy resources; DM view shows everything">
          {[["dm", "DM", Eye], ["player", "Player", EyeOff]].map(([m, l, Ico]) => (
            <button key={m} onClick={() => setSessionView({ mode: m })} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", background: sessionView.mode === m ? (m === "dm" ? `${COLORS.gold}22` : `${COLORS.blue}22`) : "transparent", color: sessionView.mode === m ? (m === "dm" ? COLORS.gold : COLORS.blue) : COLORS.muted }}><Ico size={13}/> {l}</button>
          ))}
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12.5, alignSelf: "center", fontFamily: FONTS.mono }}>Round {data.round}</div>
        <Btn variant="blue" onClick={nextTurn}><ChevronRight size={14}/> Next Turn</Btn>
        <ConfirmBtn variant="danger" size="md" confirmTitle="Clear the whole encounter" onConfirm={resetCombat}><RotateCcw size={14}/> Reset</ConfirmBtn>
      </div>
      {picker && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Add {picker === "players" ? "Players" : "NPCs"} to the encounter</span>
            <Btn size="sm" variant="ghost" onClick={() => { setPicker(null); setSel({}); }}><X size={14}/></Btn>
          </div>
          {(picker === "players" ? chars : npcs) === null ? <LoadingBlock /> : pickerList.length === 0 ? (
            <div style={{ color: COLORS.dim, fontSize: 12.5 }}>No {picker === "players" ? "characters" : "NPCs"} saved yet.</div>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pickerList.map(e => {
                  const on = !!sel[e.id];
                  const already = linkedIds.has(e.id);
                  return (
                    <button key={e.id} onClick={() => setSel(s => ({ ...s, [e.id]: !s[e.id] }))} title={already ? "Already linked in the tracker — adding makes a second copy" : ""}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: on ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${on ? COLORS.gold : COLORS.border}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", color: COLORS.text, fontSize: 12.5 }}>
                      {on ? <Check size={13} color={COLORS.gold}/> : <Plus size={13} color={COLORS.dim}/>}
                      <span style={{ fontWeight: 600 }}>{e.name}</span>
                      <span style={{ color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11 }}>{e.hp ?? e.maxHp ?? 0}/{e.maxHp ?? 0} HP</span>
                      {already && <span style={{ color: COLORS.blue, fontSize: 10 }}>linked</span>}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn variant="gold" onClick={commitPicker} disabled={Object.values(sel).every(v => !v)}><Plus size={14}/> Add {Object.values(sel).filter(Boolean).length || ""} to encounter</Btn>
              </div>
            </>
          )}
        </div>
      )}
      {attacker && (
        <div style={{ background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Crosshair size={16} color={COLORS.gold} />
          <span style={{ fontSize: 13.5 }}><b style={{ color: COLORS.gold }}>{attacker.name}</b> is attacking — click a target to roll on their sheet</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={() => setAtkId("")}><X size={13} /> Cancel</Btn>
        </div>
      )}
      {sorted.length === 0 ? (
        <EmptyState icon={Swords} title="No combatants" body="Add everyone rolling initiative." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map(c => {
            const active = c.id === activeId;
            // Linked rows read their pools live from the source sheet; overload
            // is a player-only readout (needs the character's Forms/Power).
            const src = sourceOf(c);
            const view = src ? { ...c, hp: src.hp, maxHp: src.maxHp, ki: src.ki, maxKi: src.maxKi, stamina: src.stamina, maxStamina: src.maxStamina, temp: src.temp, deathSaves: src.deathSaves || c.deathSaves, dead: !!src.dead, stable: !!src.stable } : c;
            // Bloodied / Critical are announced to everyone, even when enemy HP is hidden (p.13).
            const health = healthState(view.hp || 0, view.maxHp || 0);
            const ov = (c.sourceType === "player" && src) ? computeOverload(src) : null;
            const linkLost = c.sourceId && !src && (c.sourceType === "player" ? chars : npcs) !== null;
            const isAttacker = atkId === c.id;
            const isTargetable = !!atkId && !isAttacker;
            // Players see teammates but not enemy (NPC) pools unless the DM reveals them.
            const concealed = !isDM && c.sourceType !== "player" && !c.revealed;
            return (
              <div key={c.id} style={{ position: "relative", background: isAttacker ? `${COLORS.gold}18` : active ? `${COLORS.gold}10` : COLORS.panel, border: `1px solid ${isAttacker ? COLORS.gold : active?COLORS.gold+"88":COLORS.border}`, borderRadius: 10, padding: 12, display: "grid", gridTemplateColumns: "18px 118px 48px minmax(150px,1fr) minmax(150px,1fr) minmax(150px,1fr) 48px auto", gap: 8, alignItems: "center" }}>
                <div style={{ color: active?COLORS.gold:COLORS.dim }}>{active ? <Radio size={13}/> : ""}</div>
                <TextInput value={c.name} onChange={e => updateCombatant(c.id, { name: e.target.value })} style={{ fontWeight: 700 }} />
                <TextInput type="number" value={c.init} onChange={e => updateCombatant(c.id, { init: +e.target.value })} style={{ textAlign: "center" }} />
                {concealed ? (
                  <div style={{ gridColumn: "4 / 8", display: "flex", alignItems: "center", gap: 8, color: COLORS.dim, fontSize: 12.5 }}>
                    <EyeOff size={15} /> <span>Enemy — resources hidden</span>
                  </div>
                ) : (<>
                  <StatStepper label="HP" value={view.hp} max={view.maxHp} color={COLORS.red} onValue={v => updateCombatant(c.id, { hp: v })} onMax={v => updateCombatant(c.id, { maxHp: v })} />
                  <StatStepper label="Ki" value={view.ki} max={view.maxKi} color={COLORS.blue} onValue={v => updateCombatant(c.id, { ki: v })} onMax={v => updateCombatant(c.id, { maxKi: v })} />
                  <StatStepper label="Stam" value={view.stamina} max={view.maxStamina} color={COLORS.gold} onValue={v => updateCombatant(c.id, { stamina: v })} onMax={v => updateCombatant(c.id, { maxStamina: v })} />
                  <TextInput type="number" value={c.dr} onChange={e => updateCombatant(c.id, { dr: +e.target.value })} title="DR" style={{ textAlign: "center" }} />
                </>)}
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 3, justifyContent: "end", justifyItems: "center", alignItems: "center" }}>
                  {isDM && c.sourceType !== "player" && (
                    <Btn size="sm" variant="ghost" title={c.revealed ? "Hide resources from players" : "Reveal resources to players"} onClick={() => updateCombatant(c.id, { revealed: !c.revealed })}>{c.revealed ? <Eye size={14} color={COLORS.green}/> : <EyeOff size={14} color={COLORS.dim}/>}</Btn>
                  )}
                  {canAct(c) && (c.sourceType === "player" || isDM) && (isAttacker
                    ? <Btn size="sm" variant="ghost" title="Cancel (Esc)" onClick={() => setAtkId("")}><X size={14} color={COLORS.gold}/></Btn>
                    : <>
                        <Btn size="sm" variant="ghost" title="Target — pick an enemy, then roll a weapon or technique on the Combat tab" onClick={() => armAttacker(c.id)}><Crosshair size={14} color={COLORS.blue}/></Btn>
                        <Btn size="sm" variant="ghost" title="Use a Feature" onClick={() => goToSheet(c, featureTabFor(c))}><Sparkles size={14} color={COLORS.amber}/></Btn>
                        {(() => { const caster = isCasterC(c); return (
                          <Btn size="sm" variant="ghost" disabled={!caster} title={caster ? "Cast a spell" : "No spellcasting — not a caster"} onClick={() => caster && goToSheet(c, "magic")} style={{ opacity: caster ? 1 : 0.4, cursor: caster ? "pointer" : "not-allowed" }}><Wand2 size={14} color={caster ? COLORS.purple : COLORS.dim}/></Btn>
                        ); })()}
                      </>)}
                  <Btn size="sm" variant="ghost" title="Apply damage or healing" onClick={() => setApplyId(applyId === c.id ? "" : c.id)}><HeartPulse size={14} color={applyId === c.id ? COLORS.gold : COLORS.red}/></Btn>
                  <Btn size="sm" variant="ghost" onClick={() => removeCombatant(c.id)}><Trash2 size={13} color={COLORS.red}/></Btn>
                </div>
                <div style={{ gridColumn: "2 / 8", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
                  {c.sourceId && !linkLost && <Tag color={c.sourceType === "player" ? COLORS.blue : COLORS.dim}>{c.sourceType === "player" ? "Linked · syncs to sheet" : "Linked NPC"}</Tag>}
                  {linkLost && <Tag color={COLORS.dim}>source removed</Tag>}
                  {health && !view.dead && <Tag color={health === "bloodied" ? COLORS.amber : COLORS.red}>{view.stable && health === "down" ? "Stable" : HEALTH_LABEL[health]}</Tag>}
                  {view.temp && view.temp.hp > 0 && !concealed && <Tag color={COLORS.green}>+{view.temp.hp} Temp HP</Tag>}
                  {src && src.blocking && <Tag color={COLORS.blue}>Blocking</Tag>}
                  {ov && ov.over > 0 && <Tag color={COLORS.amber}>⚠ Overload +{ov.over} · {ov.damage} dmg/turn</Tag>}
                  {c.conditions.map((cond,i) => { const cd = typeof cond === "string" ? { text: cond, rounds: null } : cond; return (
                    <Tag key={i} color={cd.rounds != null ? COLORS.amber : COLORS.purple} onRemove={() => updateCombatant(c.id, { conditions: c.conditions.filter((_,j) => j!==i) })}>{cd.text}{cd.rounds != null ? ` · ${cd.rounds}r` : ""}</Tag>
                  ); })}
                  {(() => { const addCond = () => { const text = (tagInputs[c.id]||"").trim(); if (!text) return; const r = tagRounds[c.id] ? Number(tagRounds[c.id]) : null; updateCombatant(c.id, { conditions: [...c.conditions, { text, rounds: r }] }); setTagInputs(t => ({...t,[c.id]:""})); setTagRounds(t => ({...t,[c.id]:""})); }; return (<>
                    <input placeholder="+ condition" value={tagInputs[c.id]||""} onChange={e => setTagInputs(t => ({...t,[c.id]:e.target.value}))} onKeyDown={e => e.key==="Enter" && addCond()}
                      style={{ background: "transparent", border: "none", outline: "none", color: COLORS.muted, fontSize: 11.5, width: 80 }} />
                    <input type="number" placeholder="rds" value={tagRounds[c.id]||""} onChange={e => setTagRounds(t => ({...t,[c.id]:e.target.value}))} onKeyDown={e => e.key==="Enter" && addCond()} title="Rounds until it expires (optional)"
                      style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 5, outline: "none", color: COLORS.muted, fontSize: 11, width: 40, textAlign: "center", padding: "2px 0" }} />
                  </>); })()}
                </div>
                {applyId === c.id && <ApplyPanel row={c} onClose={() => setApplyId("")} />}
                {!concealed && view.hp <= 0 && view.maxHp > 0 && <DyingPanel c={view} onUpdate={(patch) => updateCombatant(c.id, patch)} />}
                {isTargetable && (
                  <div onClick={() => handOff(c)} title={`Attack ${c.name}`}
                    onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.red}22`; e.currentTarget.style.borderColor = COLORS.red; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${COLORS.red}10`; e.currentTarget.style.borderColor = `${COLORS.red}66`; }}
                    style={{ position: "absolute", inset: 0, borderRadius: 10, cursor: "pointer", background: `${COLORS.red}10`, border: `1.5px solid ${COLORS.red}66`, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, paddingBottom: 12, zIndex: 5, transition: "background .1s" }}>
                    <Crosshair size={18} color={COLORS.red} />
                    <span style={{ color: COLORS.red, fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>Attack {c.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Revivify rules (DM Playbook, Matt Mercer-style) — Resurrection Check is
// d20 + spellcasting mod vs DC 10 +1 per prior successful resurrection for
// that specific character. Tracked per-name so the DC keeps climbing.
function RevivifyTool() {
  const [records, persist, error] = useSharedList("revivify_records");
  const [name, setName] = useState("");
  const [mod, setMod] = useState(0);
  const [result, setResult] = useState(null);
  if (records === null) return <LoadingBlock />;

  const priorFor = (n) => (records.find(r => r.name.toLowerCase() === n.toLowerCase())?.count) || 0;
  const attempt = () => {
    if (!name.trim()) return;
    const prior = priorFor(name);
    const dc = 10 + prior;
    const r = roll(20);
    const total = r + Number(mod || 0);
    const success = total >= dc;
    setResult({ r, total, dc, success, prior });
    if (success) {
      const existing = records.find(rec => rec.name.toLowerCase() === name.toLowerCase());
      if (existing) persist(records.map(rec => rec === existing ? { ...rec, count: rec.count + 1 } : rec));
      else persist([...records, { name: name.trim(), count: 1 }]);
    }
  };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginTop: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>Revivify Check</div>
      <div style={{ color: COLORS.dim, fontSize: 11.5, marginBottom: 12 }}>DC 10 + 1 per previous successful resurrection for that character.</div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Character name..." style={{ maxWidth: 200 }} />
        <TextInput type="number" value={mod} onChange={e => setMod(+e.target.value)} placeholder="Mod" style={{ maxWidth: 80 }} title="Spellcasting ability modifier" />
        <Btn variant="gold" onClick={attempt}><Dices size={14}/> Attempt</Btn>
        {name.trim() && <span style={{ alignSelf: "center", fontSize: 11, color: COLORS.dim }}>Current DC: {10 + priorFor(name)}</span>}
      </div>
      {result && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${result.success?COLORS.green+"55":COLORS.red+"55"}`, borderRadius: 8, padding: 12, fontSize: 13, color: result.success?COLORS.green:COLORS.red }}>
          Rolled {result.r} {mod ? `+ ${mod}` : ""} = {result.total} vs DC {result.dc} — {result.success ? "Success! The character returns." : "Failed — the soul isn't lost, but this attempt fails. Future checks for them are now DC " + (result.dc + 1) + "."}
        </div>
      )}
      {records.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {records.map((r,i) => <Tag key={i} color={COLORS.purple}>{r.name}: {r.count} resurrection{r.count>1?"s":""} (next DC {10+r.count})</Tag>)}
        </div>
      )}
    </div>
  );
}

// The table's shared roll log. Manual rolls from here and every roll made on
// a sheet (moves, skills, saves, spells) land in it. A device set to roll
// privately only shows its rolls to itself and to DM view.
function RollsTab() {
  const [log] = useSharedList("session_rolls");
  const [expr, setExpr] = useState("1d20");
  const [priv, setPriv] = useState(rollsPrivate);
  const [sessionView] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const isDM = sessionView.mode === "dm";
  if (log === null) return <LoadingBlock />;
  const me = deviceId();
  const doRoll = () => {
    const m = expr.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
    if (!m) return;
    const count = parseInt(m[1]||"1",10), sides = parseInt(m[2],10), mod = parseInt(m[3]||"0",10);
    const rolls = Array.from({length: count}, () => roll(sides));
    const total = rolls.reduce((a,b)=>a+b,0) + mod;
    emitRoll({ label: expr, total, detail: `[${rolls.join(", ")}]${mod ? ` ${mod >= 0 ? "+" : ""}${mod}` : ""}`, color: COLORS.gold, share: true });
  };
  const togglePriv = () => { setRollsPrivate(!priv); setPriv(!priv); };
  const shown = log.filter(r => !r.private || isDM || r.device === me);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <TextInput value={expr} onChange={e => setExpr(e.target.value)} placeholder="e.g. 2d6+3" onKeyDown={e => e.key==="Enter" && doRoll()} style={{ maxWidth: 160 }} />
        <Btn variant="gold" onClick={doRoll}><Dices size={14}/> Roll</Btn>
        {["1d20","2d6","1d100"].map(p => <Btn key={p} size="sm" onClick={() => setExpr(p)}>{p}</Btn>)}
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant={priv ? "gold" : "ghost"} onClick={togglePriv} title="Private rolls are shown only to you and to DM view">{priv ? <EyeOff size={13}/> : <Eye size={13}/>} {priv ? "Rolling privately" : "Rolling in the open"}</Btn>
      </div>
      {shown.length === 0 ? <EmptyState icon={Dices} title="No rolls yet" body="Every roll at the table shows up here: this roller, plus moves, skills, saves and spells rolled on a sheet." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {shown.map(r => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, background: COLORS.panel, border: `1px solid ${r.private ? COLORS.purple + "55" : COLORS.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
              {r.kind === "sheet" ? (
                <span style={{ minWidth: 0 }}>
                  {r.who && <b style={{ color: COLORS.text }}>{r.who} </b>}
                  <span style={{ color: COLORS.text }}>{r.label}</span>
                  {r.private && <span style={{ color: COLORS.purple, fontSize: 11 }}> · private</span>}
                  {r.detail && <span style={{ display: "block", fontFamily: FONTS.mono, color: COLORS.muted, fontSize: 11.5 }}>{r.detail}</span>}
                </span>
              ) : (
                <span style={{ fontFamily: FONTS.mono, color: COLORS.muted }}>{r.expr} = [{(r.rolls || []).join(", ")}]{r.mod ? (r.mod>0?`+${r.mod}`:r.mod) : ""}</span>
              )}
              <span style={{ fontWeight: 700, color: COLORS.gold, fontFamily: FONTS.mono, alignSelf: "center" }}>{r.total}</span>
            </div>
          ))}
        </div>
      )}
      <RevivifyTool />
    </div>
  );
}

export {
  InitiativeTab,
  RevivifyTool,
  RollsTab,
};
