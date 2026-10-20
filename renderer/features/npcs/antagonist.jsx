import React, { useState } from "react";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { NPC_TIERS } from "../../data/book-tables.js";
import { NPC_POOLS } from "../../data/name-pools.js";
import { pick, uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, LoadingBlock, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

/* ============================== NPCS ============================== */

// ---- Antagonist creation rules (Roster of FighterZ, Ch.1) ------------------
// Everything an antagonist needs derives from its Type (General/Elite/Iconic)
// and Antagonist Level. These helpers transcribe the book's tables so Guided
// Creation and the NPC sheet compute the same budgets the book prescribes.
const ANTAGONIST_TYPES = ["General", "Elite", "Iconic"];

// Antagonist Level → Ki Rank (Level & Ki Rank table). Distinct from the PC
// kiRankForLevel scale — antagonists start at Rank 0.
function antagonistKiRank(level) {
  const L = Math.max(1, level || 1);
  if (L === 1) return 0;
  if (L <= 4) return 1;
  if (L <= 9) return 2;   // book prints 5-9 → Rank 2 (level 10 falls in this band)
  if (L <= 15) return 3;
  if (L <= 20) return 4;
  return 5;
}

// Antagonist Level → Proficiency Bonus (book table, steeper than PC scaling).
function antagonistProf(level) {
  const L = Math.max(1, level || 1);
  if (L === 1) return 2;
  if (L <= 3) return 3;
  if (L <= 6) return 4;
  if (L <= 9) return 5;
  if (L <= 12) return 6;
  if (L <= 15) return 7;
  if (L <= 18) return 8;
  if (L <= 21) return 9;
  if (L <= 24) return 10;
  if (L <= 27) return 11;
  return 12;
}

// Ki Rank → hit die, average HP/die, and Ki modifier (Iconic gets the boosted col).
const KI_RANK_TABLE = {
  0: { die: "d4", avg: 2.5, kiMod: 4, iconicKiMod: 4 },
  1: { die: "d6", avg: 3.5, kiMod: 5, iconicKiMod: 7 },
  2: { die: "d8", avg: 4.5, kiMod: 6, iconicKiMod: 8 },
  3: { die: "d10", avg: 5.5, kiMod: 7, iconicKiMod: 9 },
  4: { die: "d12", avg: 6.5, kiMod: 8, iconicKiMod: 10 },
  5: { die: "d20", avg: 10.5, kiMod: 9, iconicKiMod: 11 },
};

// Ability Score maximum by Type + Ki Rank (General caps lower and stops at Rank 4).
function antagonistAbilityCap(type, kiRank) {
  const general = { 0: 20, 1: 20, 2: 20, 3: 22, 4: 22, 5: null };
  const elite = { 0: 22, 1: 22, 2: 24, 3: 26, 4: 28, 5: 30 };
  return type === "General" ? (general[kiRank] ?? 22) : (elite[kiRank] ?? 30);
}

// Max recommended Phases by Ki Rank (Iconic only).
const PHASES_BY_KI_RANK = { 0: 0, 1: 4, 2: 4, 3: 5, 4: 5, 5: 6 };

// The full derived profile for a Type + Level (+ CON/WIS mods for pools).
function antagonistDerived(type, level, conMod = 0, wisMod = 0) {
  const L = Math.max(1, level || 1);
  const kiRank = antagonistKiRank(L);
  const kt = KI_RANK_TABLE[kiRank];
  const iconic = type === "Iconic";
  const kiMod = iconic ? kt.iconicKiMod : kt.kiMod;
  const feats = 2 + (iconic ? 2 * kiRank : kiRank);
  const stamina = Math.max(0, 2 * L + conMod) * (iconic ? 2 : 1);
  const kiPerLevel = conMod + wisMod + kiMod;
  return {
    kiRank,
    prof: antagonistProf(L),
    hitDie: kt.die,
    avgHpPerDie: kt.avg,
    abilityCap: antagonistAbilityCap(type, kiRank),
    feats,
    techniques: 2 * L,                                  // General Techniques
    superTechniques: type === "General" ? 0 : 1 + kiRank, // Elite/Iconic only
    stamina,
    kiMod,
    kiPerLevel,                                         // Ki gained per level
    maxKi: Math.max(0, kiPerLevel * L),
    maxPhases: iconic ? PHASES_BY_KI_RANK[kiRank] : 0,
    spellsKnown: iconic ? 2 * L : L,                    // if a caster
    schools: 1 + kiRank,
    initBonus: iconic ? Math.ceil(antagonistProf(L) / 2) : 0, // Iconic +½ prof
  };
}

// Party Baseline — the exact variables the DM Playbook recommends tracking
// before designing any encounter (Average damage/round, AC, Save DC, Bonus to
// Hit, Move Speed). Shared with the table so NPC math stays consistent.
const DEFAULT_PARTY_BASELINE = { avgDmgPerRound: 25, avgAC: 15, avgSaveDC: 14, avgToHit: 7, avgMoveSpeed: 30 };

function usePartyBaseline() {
  const [state, persist] = useSharedList("party_baseline");
  const baseline = state && state[0] ? state[0] : DEFAULT_PARTY_BASELINE;
  const save = (patch) => persist([{ ...baseline, ...patch }]);
  return [state === null ? null : baseline, save];
}

function PartyBaselineEditor() {
  const [baseline, save] = usePartyBaseline();
  if (baseline === null) return <LoadingBlock />;
  const fields = [
    ["avgDmgPerRound", "Avg Damage / Round"], ["avgAC", "Avg AC"], ["avgSaveDC", "Avg Save DC"],
    ["avgToHit", "Avg Bonus to Hit"], ["avgMoveSpeed", "Avg Move Speed"],
  ];
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Party Baseline</div>
      <div style={{ color: COLORS.dim, fontSize: 11, marginBottom: 10 }}>From the DM Playbook's "Variables to Consider" — NPC targeting math below is computed from these.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {fields.map(([key, label]) => (
          <div key={key}>
            <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>{label}</div>
            <TextInput type="number" value={baseline[key]} onChange={e => save({ [key]: +e.target.value })} style={{ textAlign: "center" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// NPC-Building math — DM Playbook, "Enemy Considerations":
// Single-Entity: enemy needs ~8 on d20 to hit/succeed vs players; players need
//   ~12 to hit/succeed vs the enemy's own AC/DC.
// Party-to-Party: enemy needs ~10 vs players; players need ~8 vs standard
//   enemies (Elite variant: enemy needs 8-9, players need 9-10).
const FIGHT_TYPES = [
  { key: "solo", label: "Single-Entity (Boss)", enemyTarget: 8, playerTarget: 12 },
  { key: "party", label: "Party vs Party (Standard)", enemyTarget: 10, playerTarget: 8 },
  { key: "elite", label: "Party vs Party (Elite)", enemyTarget: 9, playerTarget: 9 },
];

function computeNpcCombatTargets(fightTypeKey, baseline) {
  const ft = FIGHT_TYPES.find(f => f.key === fightTypeKey) || FIGHT_TYPES[1];
  return {
    attackBonus: Math.round(baseline.avgAC - ft.enemyTarget),
    saveBonus: Math.round(baseline.avgSaveDC - ft.enemyTarget),
    ac: Math.round(baseline.avgToHit + ft.playerTarget),
    dc: Math.round(baseline.avgToHit + ft.playerTarget),
    fightType: ft,
  };
}

function scaledNpc({ species, role, tierKey, fightTypeKey = "party", baseline = DEFAULT_PARTY_BASELINE }) {
  const tier = NPC_TIERS.find(t => t.key === tierKey) || NPC_TIERS[2];
  const baseHp = 30, baseKi = 20, baseDr = 1;
  const maxHp = Math.round(baseHp * tier.mult * (5 + Math.random()*3));
  const maxKi = Math.round(baseKi * tier.mult * (3 + Math.random()*2));
  const targets = computeNpcCombatTargets(fightTypeKey, baseline);
  return {
    id: uid(), name: `${pick(NPC_POOLS.first)} ${Math.random()>0.4?pick(NPC_POOLS.last):""}`.trim(),
    species, role, tier: tier.label, fightType: targets.fightType.label,
    hp: maxHp, maxHp, ki: maxKi, maxKi,
    ac: targets.ac, dc: targets.dc, attackBonus: targets.attackBonus, saveBonus: targets.saveBonus,
    dr: Math.round(baseDr * tier.mult),
    hook: pick(NPC_POOLS.hook), notes: "",
    breakBars: [
      { pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" },
    ],
  };
}

// Break Bars (DM Playbook) — HP % thresholds an enemy crosses during a fight,
// each optionally granting more Power, stronger moves, or a shift in intent.
function currentBreakBarTier(npc) {
  const pct = npc.maxHp > 0 ? (npc.hp / npc.maxHp) * 100 : 0;
  const bars = [...(npc.breakBars || [])].sort((a,b) => b.pct - a.pct);
  const crossed = bars.filter(b => pct <= b.pct);
  return crossed.length; // how many bars have been crossed so far
}

function BreakBarsPanel({ npc, onUpdate }) {
  const [open, setOpen] = useState(false);
  const bars = npc.breakBars || [];
  const pct = npc.maxHp > 0 ? Math.round((npc.hp / npc.maxHp) * 100) : 0;
  const crossedCount = currentBreakBarTier(npc);
  const updateBar = (i, patch) => onUpdate({ breakBars: bars.map((b,j) => j===i ? { ...b, ...patch } : b) });
  const addBar = () => onUpdate({ breakBars: [...bars, { pct: 10, note: "" }] });
  const removeBar = (i) => onUpdate({ breakBars: bars.filter((_,j) => j!==i) });
  return (
    <div style={{ marginTop: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
        <ChevronRight size={13} style={open ? { transform: "rotate(90deg)" } : undefined} color={COLORS.muted} />
        <span>Break Bars — {pct}% HP{crossedCount > 0 ? `, ${crossedCount} crossed` : ""}{bars.length ? ` · ${bars.length}` : ""}</span>
      </div>
      {open && (
        <div style={{ marginTop: 8 }}>
          {bars.sort((a,b) => b.pct - a.pct).map((b, i) => {
            const isCrossed = pct <= b.pct;
            return (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6, opacity: isCrossed ? 1 : 0.5 }}>
                <TextInput type="number" value={b.pct} onChange={e => updateBar(i, { pct: +e.target.value })} style={{ width: 60, textAlign: "center" }} />
                <span style={{ fontSize: 11, color: COLORS.dim }}>%</span>
                <TextInput value={b.note} onChange={e => updateBar(i, { note: e.target.value })} placeholder="e.g. +2 Power, clears negative Conditions..." style={{ flex: 1 }} />
                {isCrossed && <Tag color={COLORS.red}>crossed</Tag>}
                <Btn size="sm" variant="ghost" onClick={() => removeBar(i)}><Trash2 size={12} color={COLORS.red}/></Btn>
              </div>
            );
          })}
          <Btn size="sm" onClick={addBar}><Plus size={12}/> Add Threshold</Btn>
        </div>
      )}
    </div>
  );
}

export {
  ANTAGONIST_TYPES,
  antagonistKiRank,
  antagonistProf,
  KI_RANK_TABLE,
  antagonistAbilityCap,
  PHASES_BY_KI_RANK,
  antagonistDerived,
  DEFAULT_PARTY_BASELINE,
  usePartyBaseline,
  PartyBaselineEditor,
  FIGHT_TYPES,
  computeNpcCombatTargets,
  scaledNpc,
  currentBreakBarTier,
  BreakBarsPanel,
};
