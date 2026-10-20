import React, { useState, useEffect } from "react";
import { Building2, Coins, Crosshair, Crown, HeartPulse, Minus, Plus, Radio, Rocket, Skull, Sparkles, Swords, TrendingUp, Users, Weight, Wrench, X, Zap } from "lucide-react";
import { UNI_STABILITY, UNI_WEALTH } from "../../engine/universe.js";
import { uid } from "../../lib/dice.js";
import { useHouseRules, useSharedList } from "../../state/hooks.js";
import { Btn, LoadingBlock, ScannerHeader, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { miniBtnStyle } from "../session/combat-parts.jsx";
import { absDay, readTime } from "../session/time.jsx";

/* ============================== BASE BUILDING ============================== */
// A player faction's home base (planet-bound) and its capital ship (mobile, a
// home away from home that carries a few amenities). Facilities are buildable and
// upgradeable; `ship` marks the ones a capital ship has room for. Effects and
// costs tie into play so the base stays campaign-relevant.
const FACILITY_MAX_TIER = 3;   // each facility upgrades across three named tiers
const BASE_FACILITIES = [
  { type: "gravity",  name: "Gravity Chamber",  icon: Weight,     color: COLORS.purple, ship: true,  desc: "Train under crushing gravity to push past your limits.", perLevel: "Higher training gravity", tiers: ["Weight Room", "Gravity Chamber", "Hyperbolic Time Chamber"] },
  { type: "medbay",   name: "Med Bay",          icon: HeartPulse, color: COLORS.red,    ship: true,  desc: "Rejuvenation tanks patch the party up between fights.", perLevel: "Faster rest healing", tiers: ["Novice Practitioner's Office", "Med Bay", "Medical Hub"] },
  { type: "reactor",  name: "Ki Reactor",       icon: Zap,        color: COLORS.green,  ship: true,  desc: "An ambient Ki field speeds recovery.", perLevel: "Bonus Ki regen on rest", tiers: ["Ki Cell", "Ki Reactor", "Ki Nexus"] },
  { type: "workshop", name: "Workshop",         icon: Wrench,     color: COLORS.muted,  ship: true,  desc: "Craft and upgrade gear and High-Tech parts.", perLevel: "Cheaper crafting", tiers: ["Tinker's Bench", "Workshop", "Forge Complex"] },
  { type: "comms",    name: "Comms Array",      icon: Radio,      color: COLORS.gold,   ship: true,  desc: "Track bounties, jobs and galactic news.", perLevel: "Better job and bounty intel", tiers: ["Radio Set", "Comms Array", "Intelligence Network"] },
  { type: "warroom",  name: "War Room",         icon: Swords,     color: COLORS.red,    ship: true,  desc: "Plan faction operations and command your forces.", perLevel: "Stronger faction operations", tiers: ["Planning Table", "War Room", "Grand War Council"] },
  { type: "training", name: "Training Grounds", icon: Crosshair,  color: COLORS.amber,  ship: false, desc: "Sparring rings and drills that need real ground.", perLevel: "Extra downtime training", tiers: ["Sparring Ring", "Dojo", "Warrior's Crucible"] },
  { type: "barracks", name: "Barracks",         icon: Users,      color: COLORS.blue,   ship: false, desc: "House allies, recruits and rescued fighters.", perLevel: "More allied capacity", tiers: ["Bunkroom", "Barracks", "Fortress Quarter"] },
  { type: "hangar",   name: "Hangar",           icon: Rocket,     color: COLORS.blue,   ship: false, desc: "Dock and service the capital ship and smaller craft.", perLevel: "Faster ship repairs", tiers: ["Landing Pad", "Hangar", "Fleet Yard"] },
  { type: "market",   name: "Trade Hub",        icon: Coins,      color: COLORS.gold,   ship: false, desc: "A home market that generates Zeni and cheap goods.", perLevel: "More Zeni income", tiers: ["Trading Post", "Trade Hub", "Grand Exchange"] },
  { type: "blackmarket", name: "Black Market",  icon: Skull,      color: COLORS.red,    ship: false, desc: "A 'legal' underground market. Fat profits, but the people whisper of corruption.", perLevel: "More Zeni & Loot, less Stability & Reputation", tiers: ["Back-Alley Deals", "Undermarket", "Shadow Exchange"] },
];
const baseFacility = (type) => BASE_FACILITIES.find(f => f.type === type);
// Per-level governance effect of a facility (More Governing). Helpful ones lift the
// people; the Black Market prints money but corrupts. Neutral facilities omitted.
const FACILITY_GOV = {
  market:      { income: 300, stab: 0,  rep: 0 },
  blackmarket: { income: 600, loot: 3, stab: -1, rep: -1 },
  medbay:      { income: 0,   stab: 0,  rep: 1 },
  barracks:    { income: 0,   stab: 1,  rep: 0 },
  warroom:     { income: 0,   stab: 1,  rep: 0 },
  comms:       { income: 150, stab: 0,  rep: 0 },
};
// Reputation tiers (0..4), a people-facing counterpart to the planet's Stability.
const UNI_REPUTATION = ["Reviled", "Distrusted", "Tolerated", "Respected", "Revered"];
// The display name of a facility at its current tier (custom override wins).
const facilityTierName = (f) => { const def = baseFacility(f.type); return f.customName || (def && def.tiers && def.tiers[(f.level || 1) - 1]) || (def && def.name) || "Facility"; };

// Two pools fund building & upgrading: Zeni and a single Loot pool. The DM tops
// them up as the party finds loot; upgrades draw from them. (Earning = TBD.)
const RES_KEYS = ["zeni", "loot"];
const RESOURCE_POOLS = [
  { key: "zeni", label: "Zeni", icon: Coins,    color: COLORS.gold },
  { key: "loot", label: "Loot", icon: Sparkles, color: COLORS.purple },
];
// Cost to build/upgrade to a given tier. Scales with tier. (Numbers become
// table-customizable in the P8 pass.)
const facilityCost = (targetLevel) => ({ zeni: 400 * targetLevel, loot: 2 * targetLevel });
const canAfford = (res, cost) => RES_KEYS.every(k => (res[k] || 0) >= (cost[k] || 0));
const deductCost = (res, cost) => { const out = { ...res }; RES_KEYS.forEach(k => { out[k] = Math.max(0, (res[k] || 0) - (cost[k] || 0)); }); return out; };
const costLabel = (cost) => RES_KEYS.filter(k => cost[k]).map(k => k === "zeni" ? `${cost[k].toLocaleString()}ᶻ` : `${cost[k]} loot`).join(" · ");

// A faction resource ledger: four editable loot pools (the DM tops them up).
function ResourceLedger({ resources, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      {RESOURCE_POOLS.map(p => (
        <div key={p.key} style={{ flex: "1 1 150px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <p.icon size={18} color={p.color} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{p.label}</div>
            <TextInput type="number" value={resources[p.key] || 0} onChange={e => onChange({ [p.key]: Math.max(0, +e.target.value || 0) })} style={{ padding: "2px 6px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: p.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
const SHIP_BAYS = 4;   // a capital ship only has room for so many amenities

// One buildable/upgradeable facility grid, shared by the home base and the ship.
function FacilitySection({ label, Icon, color, locationNode, extra, facilities, capacity, open, onToggle, onAdd, onUpgrade, onDowngrade, onRename, onRemove, resources }) {
  const built = new Set(facilities.map(f => f.type));
  const buildable = BASE_FACILITIES.filter(f => !built.has(f.type) && (capacity == null || f.ship));
  const full = capacity != null && facilities.length >= capacity;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <Icon size={18} color={color} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>{label}</span>
        {capacity != null && <Tag color={facilities.length >= capacity ? COLORS.red : color}>{facilities.length}/{capacity} bays</Tag>}
        {locationNode}
        <div style={{ flex: 1 }} />
        {!full && buildable.length > 0 && <Btn size="sm" variant="gold" onClick={onToggle}><Plus size={13} /> Build</Btn>}
      </div>
      {extra}
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 8px" }}>Facilities</div>
      {full && <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 8 }}>At capacity — remove a bay to install something else.</div>}
      {open && buildable.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 8, marginBottom: 12 }}>
          {buildable.map(f => { const cost = facilityCost(1); const afford = canAfford(resources || {}, cost); return (
            <div key={f.type} onClick={() => afford && onAdd(f.type)} style={{ cursor: afford ? "pointer" : "not-allowed", opacity: afford ? 1 : 0.5, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}
              onMouseEnter={e => { if (afford) e.currentTarget.style.borderColor = f.color + "88"; }} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><f.icon size={15} color={f.color} /><span style={{ fontWeight: 700, fontSize: 12.5 }}>{(f.tiers && f.tiers[0]) || f.name}</span></div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{f.desc}</div>
              <div style={{ fontSize: 10, color: afford ? COLORS.gold : COLORS.red, marginTop: 5, fontFamily: "JetBrains Mono, monospace" }}>Build: {costLabel(cost)}</div>
            </div>
          ); })}
        </div>
      )}
      {facilities.length === 0 ? (
        <div style={{ fontSize: 12, color: COLORS.dim, padding: "4px 2px" }}>No facilities yet. Hit <b style={{ color: COLORS.gold }}>Build</b> to start.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 10 }}>
          {facilities.map(f => { const def = baseFacility(f.type); if (!def) return null;
            const lvl = f.level || 1, maxed = lvl >= FACILITY_MAX_TIER;
            const upCost = maxed ? null : facilityCost(lvl + 1);
            const canUp = upCost && canAfford(resources || {}, upCost);
            return (
            <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${def.color}55`, borderRadius: 10, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <def.icon size={16} color={def.color} />
                <TextInput value={facilityTierName(f)} onChange={e => onRename(f.id, e.target.value)} title="Rename this facility" style={{ fontWeight: 700, fontSize: 13, padding: "2px 6px", flex: 1, minWidth: 0 }} />
                <Tag color={def.color}>Lv {lvl}</Tag>
                <X size={14} color={COLORS.red} style={{ cursor: "pointer" }} title="Demolish" onClick={() => onRemove(f.id)} />
              </div>
              <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 6 }}>{def.name}{f.customName ? "" : ` · Tier ${lvl}`}</div>
              <div style={{ fontSize: 11.5, color: COLORS.muted, marginBottom: 8 }}>{def.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: maxed ? COLORS.gold : (canUp ? COLORS.gold : COLORS.red), flex: 1, fontFamily: "JetBrains Mono, monospace" }}>{maxed ? "Max tier" : `Upgrade: ${costLabel(upCost)}`}</span>
                <button onClick={() => onDowngrade(f.id)} disabled={lvl <= 1} title="Downgrade" style={{ ...miniBtnStyle, opacity: lvl <= 1 ? 0.4 : 1 }}><Minus size={13} /></button>
                <button onClick={() => canUp && onUpgrade(f.id)} disabled={!canUp} title={maxed ? "At max tier" : canUp ? "Upgrade" : "Not enough resources"} style={{ ...miniBtnStyle, opacity: canUp ? 1 : 0.4 }}><TrendingUp size={13} /></button>
              </div>
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}

// Made-up defense rules: incoming damage minus Hardness, absorbed by Shields, then
// eats Structural Integrity. At 0 SI the base/ship is breached. All values editable.
function BaseStatBlock({ stats, onChange, noun = "base" }) {
  const maxSi = stats.maxSi ?? 60, maxSh = stats.maxShields ?? 0, hard = stats.hardness ?? 0;
  const si = stats.si ?? maxSi, sh = stats.shields ?? maxSh;
  const [amt, setAmt] = useState("");
  const patch = (p) => onChange({ ...stats, ...p });
  const applyDamage = () => {
    let d = Math.max(0, (Number(amt) || 0) - hard);
    let sh2 = sh; const absorbed = Math.min(sh2, d); sh2 -= absorbed; d -= absorbed;
    patch({ shields: maxSh > 0 ? sh2 : stats.shields, si: Math.max(0, si - d) }); setAmt("");
  };
  const repair = () => { patch({ si: Math.min(maxSi, si + (Number(amt) || 0)) }); setAmt(""); };
  const breached = si <= 0;
  const bar = (cur, max, color, label) => (
    <div style={{ flex: "1 1 150px", minWidth: 130 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.muted, marginBottom: 3, fontFamily: "JetBrains Mono, monospace" }}>
        <span>{label}</span><span style={{ color: cur <= 0 ? COLORS.red : COLORS.text }}>{cur} / {max}</span>
      </div>
      <div style={{ height: 10, background: COLORS.panel, borderRadius: 6, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
        <div style={{ height: "100%", width: `${max ? Math.max(0, Math.min(100, cur / max * 100)) : 0}%`, background: color, opacity: 0.85 }} />
      </div>
    </div>
  );
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${breached ? COLORS.red + "88" : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        {bar(si, maxSi, breached ? COLORS.red : COLORS.gold, "Structural Integrity")}
        {maxSh > 0 && bar(sh, maxSh, COLORS.blue, "Shields")}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10.5, color: COLORS.muted }}>Hardness</span>
        <TextInput type="number" value={hard} onChange={e => patch({ hardness: Math.max(0, +e.target.value || 0) })} style={{ width: 50, textAlign: "center", padding: "4px 6px" }} title="Flat reduction on each incoming hit" />
        <div style={{ flex: 1 }} />
        <TextInput type="number" value={amt} onChange={e => setAmt(e.target.value)} placeholder="amt" style={{ width: 60, textAlign: "center", padding: "4px 6px" }} />
        <Btn size="sm" variant="danger" onClick={applyDamage}>Damage</Btn>
        <Btn size="sm" variant="ghost" onClick={repair}>Repair</Btn>
        {maxSh > 0 && <Btn size="sm" variant="ghost" onClick={() => patch({ shields: maxSh })} title="Restore shields to full">Recharge</Btn>}
      </div>
      <details style={{ marginTop: 8 }}>
        <summary style={{ fontSize: 10.5, color: COLORS.dim, cursor: "pointer" }}>Set max integrity / shields</summary>
        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <label style={{ fontSize: 10, color: COLORS.muted, display: "flex", alignItems: "center", gap: 5 }}>Max SI <TextInput type="number" value={maxSi} onChange={e => patch({ maxSi: Math.max(0, +e.target.value || 0) })} style={{ width: 64, padding: "3px 6px" }} /></label>
          <label style={{ fontSize: 10, color: COLORS.muted, display: "flex", alignItems: "center", gap: 5 }}>Max Shields <TextInput type="number" value={maxSh} onChange={e => patch({ maxShields: Math.max(0, +e.target.value || 0) })} style={{ width: 64, padding: "3px 6px" }} /></label>
        </div>
      </details>
      {breached && <div style={{ fontSize: 11, color: COLORS.red, fontWeight: 700, marginTop: 6 }}>Integrity breached — the {noun} is overrun. Repair to bring it back online.</div>}
    </div>
  );
}

// Derive the home world's economy + standing (More Governing). Income auto-derives
// from the planet's wealth + tax + commerce facilities (with a DM override); the
// Black Market and high taxes trade money for Stability + Reputation.
function computeGovernance(base, planet) {
  const g = base.gov || {};
  const wealthIdx = planet ? Math.max(0, UNI_WEALTH.indexOf(planet.wealth)) : 2;
  const tax = planet ? (planet.taxRate || 0) : 0;
  const planetBase = (wealthIdx + 1) * 250;
  const taxIncome = Math.round(planetBase * tax / 100);
  const facs = (base.home && base.home.facilities) || [];
  let facIncome = 0, lootIncome = 0, stabDelta = 0, repDelta = 0;
  facs.forEach(f => { const gv = FACILITY_GOV[f.type]; if (gv) { const L = f.level || 1; facIncome += (gv.income || 0) * L; lootIncome += (gv.loot || 0) * L; stabDelta += (gv.stab || 0) * L; repDelta += (gv.rep || 0) * L; } });
  const derived = planetBase + taxIncome + facIncome;
  const grossIncome = g.incomeOverride != null ? g.incomeOverride : derived;
  const dividendPct = g.dividendPct != null ? g.dividendPct : 10;
  const dividend = Math.round(grossIncome * dividendPct / 100);
  const peoples = grossIncome - dividend;
  const planetStab = planet && planet.stabilityIdx != null ? planet.stabilityIdx : 3;
  const taxPenalty = tax > 25 ? -1 : 0;
  const stabilityIdx = Math.max(0, Math.min(4, planetStab + stabDelta + taxPenalty));
  const reputationIdx = Math.max(0, Math.min(4, 2 + repDelta + taxPenalty));
  return { wealthIdx, tax, planetBase, taxIncome, facIncome, lootIncome, derived, grossIncome, override: g.incomeOverride != null, dividendPct, dividend, peoples, stabilityIdx, reputationIdx };
}
const govTierColor = (idx) => [COLORS.red, COLORS.amber, COLORS.dim, COLORS.green, COLORS.gold][idx] || COLORS.dim;

function GovernancePanel({ base, planet, onChange }) {
  const g = base.gov || {};
  const gc = computeGovernance(base, planet);
  const setGov = (patch) => onChange({ ...g, ...patch });
  const row = (label, val, color, strong) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "2px 0" }}>
      <span style={{ color: COLORS.muted }}>{label}</span>
      <span style={{ color: color || COLORS.text, fontWeight: strong ? 700 : 400, fontFamily: "JetBrains Mono, monospace" }}>{val}</span>
    </div>
  );
  const z = (n) => `${(n || 0).toLocaleString()}ᶻ`;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <Coins size={16} color={COLORS.gold} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>Governance</span>
        <div style={{ flex: 1 }} />
        <Tag color={govTierColor(gc.stabilityIdx)}>Stability: {UNI_STABILITY[gc.stabilityIdx]}</Tag>
        <Tag color={govTierColor(gc.reputationIdx)}>Reputation: {UNI_REPUTATION[gc.reputationIdx]}</Tag>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px", minWidth: 220 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Weekly Economy</div>
          {row("Planet base", z(gc.planetBase))}
          {row("Tax income", z(gc.taxIncome))}
          {row("Facilities", z(gc.facIncome))}
          {gc.lootIncome > 0 && row("Loot / week", `+${gc.lootIncome}`, COLORS.purple)}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, margin: "5px 0" }} />
          {row(`Gross income / week${gc.override ? " (override)" : ""}`, z(gc.grossIncome), COLORS.gold, true)}
          {row(`Dividend to players (${gc.dividendPct}%)`, z(gc.dividend), COLORS.blue)}
          {row("The People's Money → treasury", z(gc.peoples), COLORS.green, true)}
          {g.dividendBank > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}><Tag color={COLORS.blue}>Dividend bank: {z(g.dividendBank)}</Tag><Btn size="sm" variant="ghost" onClick={() => setGov({ dividendBank: 0 })}>Split & clear</Btn></div>}
        </div>
        <div style={{ flex: "1 1 200px", minWidth: 180 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Controls</div>
          <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 8 }}>Player dividend: <b style={{ color: COLORS.blue }}>{gc.dividendPct}%</b>
            <input type="range" min="0" max="40" value={gc.dividendPct} onChange={e => setGov({ dividendPct: +e.target.value })} style={{ width: "100%" }} />
            <span style={{ fontSize: 10, color: COLORS.dim }}>Skim more for the players; the people notice.</span>
          </label>
          <label style={{ fontSize: 11, color: COLORS.muted, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <input type="checkbox" checked={gc.override} onChange={e => setGov({ incomeOverride: e.target.checked ? gc.derived : null })} /> Override income
          </label>
          {gc.override && <TextInput type="number" value={g.incomeOverride ?? 0} onChange={e => setGov({ incomeOverride: Math.max(0, +e.target.value || 0) })} style={{ marginTop: 6, width: 120 }} />}
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 8 }}>Income banks automatically as in-world weeks pass (Session clock). The People's Money feeds the treasury; upgrades draw from it.</div>
    </div>
  );
}

function BaseTab() {
  const [state, persist] = useSharedList("party_base");
  const [universe] = useSharedList("universe");
  const [houseRules] = useHouseRules();
  const [timeState] = useSharedList("session_time");
  const [pickerFor, setPickerFor] = useState(null);   // "home" | "ship" | null
  const moreGoverning = houseRules.baseBuilding && houseRules.moreGoverning;
  const nowAbs = (timeState && timeState[0]) ? absDay(readTime(timeState).age, readTime(timeState).month, readTime(timeState).day) : null;
  // Auto-accrue the home world's income as in-world weeks pass on the Session clock.
  useEffect(() => {
    if (!moreGoverning || nowAbs == null || !state || !state[0]) return;
    const b = state[0], g = b.gov || {};
    if (g.lastAccruedAbs == null) { persist([{ ...b, gov: { ...g, lastAccruedAbs: nowAbs } }]); return; }
    const PERIOD = 7, periods = Math.floor((nowAbs - g.lastAccruedAbs) / PERIOD);
    if (periods <= 0) return;
    const galaxy = universe && universe[0];
    const planet = galaxy && galaxy.partyHomePlanetId ? galaxy.systems.flatMap(s => s.planets).find(p => p.id === galaxy.partyHomePlanetId) : null;
    const gc = computeGovernance({ home: b.home, gov: g }, planet);
    const res = b.resources || {};
    persist([{ ...b,
      resources: { ...res, zeni: (res.zeni || 0) + gc.peoples * periods, loot: (res.loot || 0) + gc.lootIncome * periods },
      gov: { ...g, lastAccruedAbs: g.lastAccruedAbs + periods * PERIOD, dividendBank: (g.dividendBank || 0) + gc.dividend * periods },
    }]);
  }, [nowAbs, moreGoverning]);
  if (state === null) return <LoadingBlock />;
  const raw = (state && state[0]) || {};
  const base = {
    factionName: raw.factionName || "",
    resources: { zeni: 0, loot: 0, ...(raw.resources || {}) },
    home: { facilities: [], maxSi: 80, maxShields: 40, hardness: 5, ...(raw.home || (raw.facilities ? { facilities: raw.facilities } : {})) },
    ship: { name: "", facilities: [], maxSi: 50, maxShields: 30, hardness: 5, ...(raw.ship || {}) },
  };
  const save = (patch) => persist([{ factionName: base.factionName, resources: base.resources, home: base.home, ship: base.ship, ...patch }]);
  const upd = (which, patch) => save({ [which]: { ...base[which], ...patch } });
  const setRes = (patch) => save({ resources: { ...base.resources, ...patch } });
  const listOf = (which) => base[which].facilities || [];
  // Build / upgrade draw from the loot pools; blocked when the pools are short.
  const addF = (which, type) => {
    const l = listOf(which); if (l.some(f => f.type === type)) return;
    const cost = facilityCost(1); if (!canAfford(base.resources, cost)) return;
    save({ resources: deductCost(base.resources, cost), [which]: { ...base[which], facilities: [...l, { id: uid(), type, level: 1 }] } });
    setPickerFor(null);
  };
  const upgrade = (which, id) => {
    const f = listOf(which).find(x => x.id === id); if (!f) return; const lvl = f.level || 1; if (lvl >= FACILITY_MAX_TIER) return;
    const cost = facilityCost(lvl + 1); if (!canAfford(base.resources, cost)) return;
    save({ resources: deductCost(base.resources, cost), [which]: { ...base[which], facilities: listOf(which).map(x => x.id === id ? { ...x, level: lvl + 1 } : x) } });
  };
  const downgrade = (which, id) => upd(which, { facilities: listOf(which).map(f => f.id === id ? { ...f, level: Math.max(1, (f.level || 1) - 1) } : f) });
  const rename = (which, id, name) => upd(which, { facilities: listOf(which).map(f => f.id === id ? { ...f, customName: name } : f) });
  const rem = (which, id) => upd(which, { facilities: listOf(which).filter(f => f.id !== id) });
  const galaxy = universe && universe[0];
  const home = galaxy && galaxy.partyHomePlanetId ? galaxy.systems.flatMap(s => s.planets.map(p => ({ s, p }))).find(x => x.p.id === galaxy.partyHomePlanetId) : null;
  const shipSys = galaxy && galaxy.currentPlanetId ? galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.currentPlanetId)) : null;
  const hp = home && home.p;
  return (
    <div>
      <ScannerHeader title="BASE OF OPERATIONS" subtitle="Your faction's home world and capital ship." />
      {/* Faction identity */}
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}44`, borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Crown size={22} color={COLORS.gold} />
        <div style={{ flex: "1 1 240px", minWidth: 0 }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>Player Faction</div>
          <TextInput value={base.factionName} onChange={e => save({ factionName: e.target.value })} placeholder="Name your faction (e.g. The Crimson Fist)" style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700 }} />
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, maxWidth: 280 }}>Your player-driven faction. Claim territory and manage Influence over in the <b style={{ color: COLORS.gold }}>Universe</b> map.</div>
      </div>

      {/* Loot pools that fund building & upgrading */}
      <ResourceLedger resources={base.resources} onChange={setRes} />

      <FacilitySection label="Home World" Icon={Building2} color={COLORS.gold}
        locationNode={home ? <span style={{ fontSize: 12 }}><Crown size={11} color={COLORS.gold} style={{ verticalAlign: "-1px" }} /> <b style={{ color: COLORS.gold }}>{hp.name}</b> <span style={{ color: COLORS.dim }}>· {home.s.name.replace(/ System$/, "")} System</span></span> : <span style={{ fontSize: 11, color: COLORS.dim }}>Set a Party Home in the Universe tab</span>}
        extra={<>
          {home && !moreGoverning && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <Tag color={COLORS.blue}>{hp.economy || "—"}</Tag>
            <Tag color={COLORS.green}>Wealth: {hp.wealth || "—"}</Tag>
            <Tag color={COLORS.amber}>Tax {hp.taxRate ?? 0}%</Tag>
            <Tag color={COLORS.dim}>Pop: {hp.population || "—"}</Tag>
          </div>}
          {moreGoverning && <GovernancePanel base={base} planet={hp} onChange={g => save({ gov: g })} />}
          <BaseStatBlock stats={base.home} onChange={s => save({ home: s })} noun="home base" />
        </>}
        facilities={listOf("home")} capacity={null} resources={base.resources} open={pickerFor === "home"} onToggle={() => setPickerFor(pickerFor === "home" ? null : "home")}
        onAdd={t => addF("home", t)} onUpgrade={id => upgrade("home", id)} onDowngrade={id => downgrade("home", id)} onRename={(id, n) => rename("home", id, n)} onRemove={id => rem("home", id)} />

      <FacilitySection label="Capital Ship" Icon={Rocket} color={COLORS.blue}
        locationNode={<span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <TextInput value={base.ship.name || ""} onChange={e => upd("ship", { name: e.target.value })} placeholder="Name the ship" style={{ width: 150, fontSize: 12, padding: "4px 8px" }} />
          {shipSys ? <span style={{ fontSize: 12, color: COLORS.blue }}><Rocket size={11} style={{ verticalAlign: "-1px" }} /> {shipSys.name.replace(/ System$/, "")} System</span> : <span style={{ fontSize: 11, color: COLORS.dim }}>Docked</span>}
        </span>}
        extra={<BaseStatBlock stats={base.ship} onChange={s => save({ ship: s })} noun="capital ship" />}
        facilities={listOf("ship")} capacity={SHIP_BAYS} resources={base.resources} open={pickerFor === "ship"} onToggle={() => setPickerFor(pickerFor === "ship" ? null : "ship")}
        onAdd={t => addF("ship", t)} onUpgrade={id => upgrade("ship", id)} onDowngrade={id => downgrade("ship", id)} onRename={(id, n) => rename("ship", id, n)} onRemove={id => rem("ship", id)} />
    </div>
  );
}

export {
  FACILITY_MAX_TIER,
  BASE_FACILITIES,
  baseFacility,
  FACILITY_GOV,
  UNI_REPUTATION,
  facilityTierName,
  RES_KEYS,
  RESOURCE_POOLS,
  facilityCost,
  canAfford,
  deductCost,
  costLabel,
  ResourceLedger,
  SHIP_BAYS,
  FacilitySection,
  BaseStatBlock,
  computeGovernance,
  govTierColor,
  GovernancePanel,
  BaseTab,
};
