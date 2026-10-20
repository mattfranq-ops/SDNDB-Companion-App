import React, { useState } from "react";
import { ChevronDown, ChevronUp, Crosshair, RotateCcw, Swords } from "lucide-react";
import { logSession } from "../../app/bus.js";
import { computeBattlePower } from "../../engine/derived.js";
import { roll } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, ConfirmBtn, LoadingBlock, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { migrateNpc } from "../npcs/creation.jsx";
import { blankCombatant } from "./combat-parts.jsx";
import { advanceTime, readTime } from "./time.jsx";

// Skirmish outcome bands, best first. A weighted d20 (nudged by the Battle Power
// ratio) lands on one; each carries the toll it takes on the party.
const SKIRMISH_OUTCOMES = [
  { key: "sweep", min: 22, name: "Clean Sweep", tone: "win", hp: 0.05, ki: 0.10, exh: 0, mins: 10, blurb: "The party carves through them almost untouched." },
  { key: "victory", min: 17, name: "Victory", tone: "win", hp: 0.15, ki: 0.25, exh: 0, mins: 30, blurb: "A clean win, a few bruises to show for it." },
  { key: "bloody", min: 12, name: "Bloody Victory", tone: "win", hp: 0.35, ki: 0.45, exh: 1, mins: 60, blurb: "They win, but it costs them dearly." },
  { key: "stale", min: 8, name: "Stalemate", tone: "draw", hp: 0.30, ki: 0.40, exh: 0, mins: 60, blurb: "Both sides break off, battered and unresolved." },
  { key: "retreat", min: 4, name: "Forced Retreat", tone: "loss", hp: 0.40, ki: 0.40, exh: 1, mins: 45, blurb: "The party gives ground and pulls back." },
  { key: "rout", min: -999, name: "Rout", tone: "loss", hp: 0.55, ki: 0.50, exh: 1, mins: 30, blurb: "It falls apart. The party scatters to survive." },
];
const outcomeColor = (tone) => tone === "win" ? COLORS.green : tone === "loss" ? COLORS.red : COLORS.amber;

// War tactics form a counter triangle: Assault beats Hold, Hold beats Flank,
// Flank beats Assault. Each also trades aggression for morale. Reading the enemy
// commander and picking the counter is the strategy, not spamming clashes.
const WAR_TACTICS = {
  assault: { name: "Assault", beats: "hold", deal: 1.5, take: 1.3, morale: 8, desc: "Throw everything forward. You hit hardest but bleed for it, and it drains morale. Strong against Hold, weak to Flank." },
  hold: { name: "Hold", beats: "flank", deal: 0.7, take: 0.6, morale: -6, desc: "Dig in and weather it. Fewest losses on both sides and your morale steadies. Strong against Flank, weak to Assault." },
  flank: { name: "Flank", beats: "assault", deal: 1.2, take: 0.9, morale: 2, desc: "Maneuver for the opening. A favorable trade that shreds an Assault. Strong against Assault, weak to Hold." },
};
const TACTIC_ORDER = ["assault", "hold", "flank"];
const rawStrength = (a) => (a.numbers || 0) * (a.power || 0) * ((a.morale || 0) / 100);
// The enemy commander: defends when shaken, presses when dominant, else mixes it up.
const enemyTacticAI = (e, p) => {
  if ((e.morale || 0) < 35) return "hold";
  if (rawStrength(e) > rawStrength(p) * 1.3) return "assault";
  return TACTIC_ORDER[Math.floor(Math.random() * 3)];
};

function QuickCombatTab() {
  const [chars, persistChars] = useSharedList("characters_v2");
  const [npcs] = useSharedList("npcs_v2");
  const [timeState, persistTime] = useSharedList("session_time");
  const [warState, persistWar] = useSharedList("session_war");
  const [combatState, persistCombat] = useSharedList("session_combat");
  const [enemyCount, setEnemyCount] = useState("12");
  const [enemyUnit, setEnemyUnit] = useState("");
  const [enemyNpcId, setEnemyNpcId] = useState("");
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("skirmish");
  const [warSpend, setWarSpend] = useState({});   // {side:{res,amt}} transient reinforce inputs
  if (chars === null) return <LoadingBlock />;
  const party = (chars || []).filter(c => !c.archived);
  const partyBP = party.reduce((s, c) => s + computeBattlePower(c), 0);
  const pickEnemyNpc = (id) => { setEnemyNpcId(id); const n = (npcs || []).find(x => x.id === id); if (n) setEnemyUnit(String(computeBattlePower(migrateNpc(n)))); };
  const enemyBP = Math.max(0, (Number(enemyCount) || 0) * (Number(enemyUnit) || 0));
  const hasEnemy = enemyBP > 0;
  const ratio = hasEnemy ? partyBP / enemyBP : 1;
  const odds = !hasEnemy ? "Set an enemy" : ratio >= 3 ? "Overwhelming" : ratio >= 1.5 ? "Favored" : ratio >= 0.9 ? "Even" : ratio >= 0.5 ? "Outmatched" : "Hopeless";
  const resolve = () => {
    if (!party.length || !hasEnemy) return;
    const nudge = Math.max(-12, Math.min(12, Math.round((ratio - 1) * 6)));
    const d20 = roll(20);
    if (roll(20) === 1) { setResult({ figure: true, name: "A Figure Intervenes", tone: "draw", blurb: "A greater power steps between the two forces and the fight simply stops.", hp: 0, ki: 0, exh: 0, mins: 15, d20, ratio, partyBP, enemyBP, applied: false }); return; }
    const score = d20 + nudge;
    const oc = SKIRMISH_OUTCOMES.find(o => score >= o.min) || SKIRMISH_OUTCOMES[SKIRMISH_OUTCOMES.length - 1];
    setResult({ ...oc, d20, nudge, score, ratio, partyBP, enemyBP, applied: false });
  };
  const applyResult = () => {
    if (!result || result.applied) return;
    let updated = chars;
    for (const c of party) {
      const hpLoss = Math.round((c.maxHp || 0) * result.hp);
      const kiLoss = Math.round((c.maxKi || 0) * result.ki);
      updated = updated.map(x => x.id === c.id ? { ...x, hp: Math.max(1, (x.hp || 0) - hpLoss), ki: Math.max(0, (x.ki || 0) - kiLoss), vitals: { ...(x.vitals || {}), exhaustion: Math.min(6, ((x.vitals && x.vitals.exhaustion) || 0) + (result.exh || 0)) } } : x);
    }
    if (persistChars) persistChars(updated);
    if (persistTime) persistTime([advanceTime(readTime(timeState), (result.mins || 0) * 60)]);
    logSession(`Quick Combat, ${result.name}: the party spent ${Math.round(result.hp * 100)}% HP and ${Math.round(result.ki * 100)}% Ki${result.exh ? `, +${result.exh} Exhaustion` : ""} over about ${result.mins} min.`);
    setResult({ ...result, applied: true });
  };

  // --- War scale ---------------------------------------------------------
  const war = warState && warState[0] && warState[0].active ? warState[0] : null;
  const strengthOf = (a) => Math.round((a.numbers || 0) * (a.power || 0) * ((a.morale || 0) / 100));
  const startWar = () => persistWar([{
    active: true, round: 0, over: null, log: [], tactic: "assault", enemyMode: "auto", last: null,
    party: { name: "Your Forces", numbers: 100, power: Math.max(1, Math.round(partyBP / Math.max(1, party.length))) || 400, morale: 100, influence: 0, zeni: 0, fillName: "Favor owed", fill: 0 },
    enemy: { name: "Enemy Army", numbers: Math.max(1, Number(enemyCount) || 100), power: Number(enemyUnit) || 400, morale: 100, influence: 0, zeni: 0, fillName: "Ally of convenience", fill: 0 },
  }]);
  const setArmy = (side, patch) => war && persistWar([{ ...war, [side]: { ...war[side], ...patch } }]);
  const clashRound = () => {
    if (!war || war.over) return;
    const p = war.party, e = war.enemy;
    const pt = war.tactic || "assault";
    const et = war.enemyMode === "auto" ? enemyTacticAI(e, p) : (WAR_TACTICS[war.enemyMode] ? war.enemyMode : "hold");
    const PT = WAR_TACTICS[pt], ET = WAR_TACTICS[et];
    const pCounters = PT.beats === et, eCounters = ET.beats === pt;   // did we / they land the counter
    const pStr = strengthOf(p), eStr = strengthOf(e), total = pStr + eStr || 1;
    const swing = () => 0.75 + Math.random() * 0.5;
    const eBase = e.numbers * 0.2 * (pStr / total) * swing();
    const pBase = p.numbers * 0.2 * (eStr / total) * swing();
    const eLoss = Math.min(e.numbers, Math.round(eBase * PT.deal * ET.take * (pCounters ? 1.6 : 1) * (eCounters ? 0.6 : 1)));
    const pLoss = Math.min(p.numbers, Math.round(pBase * ET.deal * PT.take * (eCounters ? 1.6 : 1) * (pCounters ? 0.6 : 1)));
    const pFrac = p.numbers ? pLoss / p.numbers : 1, eFrac = e.numbers ? eLoss / e.numbers : 1;
    const np = { ...p, numbers: p.numbers - pLoss, morale: Math.max(0, Math.min(100, p.morale - PT.morale - Math.round(pFrac * 45) + (pCounters ? 8 : 0) - (eCounters ? 8 : 0))) };
    const ne = { ...e, numbers: e.numbers - eLoss, morale: Math.max(0, Math.min(100, e.morale - ET.morale - Math.round(eFrac * 45) + (eCounters ? 8 : 0) - (pCounters ? 8 : 0))) };
    const pDone = np.numbers <= 0 || np.morale <= 0, eDone = ne.numbers <= 0 || ne.morale <= 0;
    const over = (pDone && eDone) ? "both" : eDone ? "enemy" : pDone ? "party" : null;
    const mins = Math.min(1440, Math.max(60, Math.round((p.numbers + e.numbers) / 2)));
    if (persistTime) persistTime([advanceTime(readTime(timeState), mins * 60)]);
    const counterNote = pCounters ? " You caught them out." : eCounters ? " They read you." : "";
    const tail = over === "enemy" ? " Enemy routs!" : over === "party" ? " Your forces rout!" : over === "both" ? " Both sides shatter!" : "";
    const last = { pt, et, pLoss, eLoss, pCounters, eCounters };
    persistWar([{ ...war, round: war.round + 1, party: np, enemy: ne, last, log: [`Round ${war.round + 1}: You ${PT.name}, they ${ET.name}.${counterNote} You lost ${pLoss}, enemy lost ${eLoss}.${tail}`, ...war.log].slice(0, 40), over }]);
    logSession(`War round ${war.round + 1}: You ${PT.name} vs their ${ET.name}. You lost ${pLoss}, enemy lost ${eLoss}.${tail}`);
  };
  const spendOn = (side, effect) => {
    const s = warSpend[side] || {}; const resKey = s.res || "influence"; const amt = Math.max(0, Math.min(war[side][resKey] || 0, Number(s.amt) || 0));
    if (!amt) return;
    const a = war[side]; const patch = { [resKey]: (a[resKey] || 0) - amt };
    if (effect === "reinforce") patch.numbers = (a.numbers || 0) + amt; else patch.morale = Math.min(100, (a.morale || 0) + amt);
    persistWar([{ ...war, [side]: { ...a, ...patch } }]);
    logSession(`${a.name} spends ${amt} ${resKey === "fill" ? (a.fillName || "resource") : resKey} to ${effect === "reinforce" ? "reinforce" : "steady morale"}.`);
    setWarSpend({ ...warSpend, [side]: { ...s, amt: "" } });
  };
  const breakThrough = () => {
    if (!war) return;
    const cs = (combatState && combatState[0]) || { round: 1, turn: 0, combatants: [] };
    const leader = { ...blankCombatant(), name: `${war.enemy.name || "Enemy"} General`, init: roll(20) + 3, hp: 300, maxHp: 300, ki: 100, maxKi: 100, dr: 3 };
    if (persistCombat) persistCombat([{ ...cs, combatants: [...(cs.combatants || []), leader] }]);
    logSession(`Break through! The party punches to the ${war.enemy.name || "enemy"} leader. Their General drops into the tracker for a real fight.`);
    persistWar([{ ...war, active: false }]);
  };
  const endWar = () => persistWar([]);
  const armyColor = (side) => side === "party" ? COLORS.blue : COLORS.red;
  const bar = (val, max, color) => (
    <div style={{ height: 6, borderRadius: 3, background: COLORS.panel2, overflow: "hidden" }}><div style={{ width: `${Math.max(0, Math.min(100, (val / (max || 1)) * 100))}%`, height: "100%", background: color }} /></div>
  );
  const armyCard = (side) => {
    const a = war[side]; const s = warSpend[side] || {}; const res = s.res || "influence"; const open = !!s.open;
    const mColor = a.morale > 40 ? COLORS.green : a.morale > 15 ? COLORS.amber : COLORS.red;
    const resLabel = { influence: "Influence", zeni: "Zeni", fill: a.fillName || "Favor" };
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${armyColor(side)}55`, borderRadius: 10, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <TextInput value={a.name} onChange={e => setArmy(side, { name: e.target.value })} style={{ fontWeight: 800, fontSize: 14, background: "transparent", border: "none", padding: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: mColor, whiteSpace: "nowrap" }}>Morale {a.morale}</span>
        </div>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, fontWeight: 900, color: armyColor(side) }}>{strengthOf(a).toLocaleString()}</div>
        <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 8 }}>fielded strength</div>
        {bar(a.morale, 100, mColor)}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
          <div><div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", marginBottom: 2 }}>Numbers</div><TextInput type="number" value={a.numbers} onChange={e => setArmy(side, { numbers: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
          <div><div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", marginBottom: 2 }}>Power each</div><TextInput type="number" value={a.power} onChange={e => setArmy(side, { power: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
        </div>
        <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setWarSpend({ ...warSpend, [side]: { ...s, open: !open } })}>
            <span style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700 }}>Muster & resources</span>
            {open ? <ChevronUp size={14} color={COLORS.muted} /> : <ChevronDown size={14} color={COLORS.muted} />}
          </div>
          {!open && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Influence {a.influence} · Zeni {a.zeni} · {a.fillName || "Favor"} {a.fill}</div>}
          {open && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                <div><div style={{ fontSize: 9, color: COLORS.dim, marginBottom: 2 }}>Influence</div><TextInput type="number" value={a.influence} onChange={e => setArmy(side, { influence: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
                <div><div style={{ fontSize: 9, color: COLORS.dim, marginBottom: 2 }}>Zeni</div><TextInput type="number" value={a.zeni} onChange={e => setArmy(side, { zeni: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
                <div><TextInput value={a.fillName} onChange={e => setArmy(side, { fillName: e.target.value })} placeholder="Favor" style={{ fontSize: 10.5, marginBottom: 4 }} /><TextInput type="number" value={a.fill} onChange={e => setArmy(side, { fill: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                <Select value={res} onChange={e => setWarSpend({ ...warSpend, [side]: { ...s, res: e.target.value } })} style={{ fontSize: 11, width: 92 }}>
                  {["influence", "zeni", "fill"].map(k => <option key={k} value={k}>{resLabel[k]}</option>)}
                </Select>
                <TextInput type="number" value={s.amt || ""} onChange={e => setWarSpend({ ...warSpend, [side]: { ...s, amt: e.target.value } })} placeholder="amt" style={{ width: 54, textAlign: "center" }} />
                <Btn size="sm" onClick={() => spendOn(side, "reinforce")}>Reinforce</Btn>
                <Btn size="sm" onClick={() => spendOn(side, "recover")}>Recover</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}`, marginBottom: 14, width: "fit-content" }}>
        {[["skirmish", "Skirmish"], ["war", "War"]].map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", background: mode === m ? `${COLORS.gold}22` : "transparent", color: mode === m ? COLORS.gold : COLORS.muted }}>{l}</button>
        ))}
      </div>
      {mode === "skirmish" && (<>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>The Party</div>
          <div style={{ fontSize: 13 }}>{party.length} fighter{party.length === 1 ? "" : "s"}</div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, fontWeight: 900, color: COLORS.gold }}>{partyBP.toLocaleString()}</div>
          <div style={{ fontSize: 10.5, color: COLORS.dim }}>total Battle Power</div>
        </div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Enemy Force</div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Count</div><TextInput type="number" value={enemyCount} onChange={e => setEnemyCount(e.target.value)} style={{ width: 64, textAlign: "center" }} /></div>
            <div style={{ flex: 1, minWidth: 130 }}><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Foe (sets Battle Power)</div>
              <Select value={enemyNpcId} onChange={e => pickEnemyNpc(e.target.value)}>
                <option value="">Custom…</option>
                {(npcs || []).filter(n => !n.archived).map(n => <option key={n.id} value={n.id}>{n.name} ({computeBattlePower(migrateNpc(n)).toLocaleString()})</option>)}
              </Select>
            </div>
            <div><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Battle Power each</div><TextInput type="number" value={enemyUnit} onChange={e => { setEnemyUnit(e.target.value); setEnemyNpcId(""); }} placeholder="0" style={{ width: 96, textAlign: "center" }} /></div>
          </div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, fontWeight: 900, color: COLORS.red, marginTop: 6 }}>{enemyBP.toLocaleString()}</div>
          <div style={{ fontSize: 10.5, color: COLORS.dim }}>total Battle Power</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <Tag color={!hasEnemy ? COLORS.dim : odds === "Overwhelming" || odds === "Favored" ? COLORS.green : odds === "Even" ? COLORS.amber : COLORS.red}>Odds: {odds}</Tag>
        <Btn variant="gold" disabled={!party.length || !hasEnemy} onClick={resolve}><Swords size={14}/> Resolve Skirmish</Btn>
        {!party.length && <span style={{ fontSize: 11.5, color: COLORS.dim }}>Add player characters first.</span>}
      </div>
      {result && (
        <div style={{ background: `${outcomeColor(result.tone)}12`, border: `1px solid ${outcomeColor(result.tone)}55`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, fontWeight: 900, color: outcomeColor(result.tone) }}>{result.name}</span>
            {result.applied && <Tag color={COLORS.green}>applied</Tag>}
          </div>
          <div style={{ fontSize: 13.5, color: COLORS.text, marginBottom: 10 }}>{result.blurb}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {result.hp > 0 && <Tag color={COLORS.red}>{Math.round(result.hp * 100)}% HP</Tag>}
            {result.ki > 0 && <Tag color={COLORS.blue}>{Math.round(result.ki * 100)}% Ki</Tag>}
            {result.exh > 0 && <Tag color={COLORS.purple}>+{result.exh} Exhaustion</Tag>}
            <Tag color={COLORS.dim}>about {result.mins} min</Tag>
            {result.score != null && <Tag color={COLORS.dim}>d20 {result.d20}{result.nudge ? ` ${result.nudge >= 0 ? "+" : ""}${result.nudge}` : ""} = {result.score}</Tag>}
          </div>
          <Btn variant="gold" disabled={result.applied} onClick={applyResult}>{result.applied ? "Applied to the party" : "Apply the toll to the party"}</Btn>
        </div>
      )}
      </>)}

      {mode === "war" && (war ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 16, fontWeight: 900, color: COLORS.gold }}>Round {war.round}</span>
            {war.over && <Tag color={war.over === "enemy" ? COLORS.green : war.over === "party" ? COLORS.red : COLORS.amber}>{war.over === "enemy" ? "Enemy routed" : war.over === "party" ? "Your forces routed" : "Both sides shattered"}</Tag>}
            <div style={{ flex: 1 }} />
            <ConfirmBtn size="md" variant="danger" confirmTitle="End this war" onConfirm={endWar}><RotateCcw size={14}/> End war</ConfirmBtn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {armyCard("party")}
            {armyCard("enemy")}
          </div>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Your tactic this round</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: COLORS.muted }}>Enemy commander</span>
              <Select value={war.enemyMode || "auto"} onChange={e => persistWar([{ ...war, enemyMode: e.target.value }])} style={{ fontSize: 12, width: 130 }}>
                <option value="auto">Auto (reacts)</option>
                {TACTIC_ORDER.map(k => <option key={k} value={k}>{WAR_TACTICS[k].name}</option>)}
              </Select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {TACTIC_ORDER.map(k => { const T = WAR_TACTICS[k]; const on = (war.tactic || "assault") === k; return (
                <button key={k} onClick={() => persistWar([{ ...war, tactic: k }])} title={T.desc} style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}14` : COLORS.panel2, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: on ? COLORS.gold : COLORS.text }}>{T.name}</div>
                  <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 3, lineHeight: 1.4 }}>{T.desc}</div>
                </button>
              ); })}
            </div>
            {war.last && (
              <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>
                Last clash: you {WAR_TACTICS[war.last.pt].name}, they {WAR_TACTICS[war.last.et].name}.
                {war.last.pCounters ? <b style={{ color: COLORS.green }}> You countered them.</b> : war.last.eCounters ? <b style={{ color: COLORS.red }}> They read you.</b> : <span> An even read.</span>}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Btn variant="gold" disabled={!!war.over} onClick={clashRound}><Swords size={14}/> Clash Round</Btn>
            <Btn onClick={breakThrough}><Crosshair size={14}/> Break Through to the leader</Btn>
          </div>
          {war.log.length > 0 && (
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>War log</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{war.log.map((l, i) => <div key={i} style={{ fontSize: 12, color: i === 0 ? COLORS.text : COLORS.dim }}>{l}</div>)}</div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12, lineHeight: 1.5 }}>Two armies clash across rounds until one routs. Each side has Numbers, Power and Morale, spends Influence, Zeni or a favor to reinforce or recover, and the clock stretches with the scale of the war. Break Through at any point to drop the party against the leader.</div>
          <Btn variant="gold" onClick={startWar}><Swords size={14}/> Start a War</Btn>
        </div>
      ))}
    </div>
  );
}

export {
  SKIRMISH_OUTCOMES,
  outcomeColor,
  WAR_TACTICS,
  TACTIC_ORDER,
  rawStrength,
  enemyTacticAI,
  QuickCombatTab,
};
