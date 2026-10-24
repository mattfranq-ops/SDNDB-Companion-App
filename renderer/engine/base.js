/* ===== Base of Operations: what each facility actually does =====
   Every facility tier carries numbers the rest of the app reads: crafting
   costs and checks, rests, training, initiative, store prices, the base's own
   defenses and the vehicle garage. A facility works where it's built (the home
   world or the capital ship) and only while the party is there, except the
   home world's economy, which runs all the time.

   These are app rules (the 5.0 book has no base-building chapter), tuned to sit
   alongside the book's Downtime rules (Ch.5) without replacing them. */

const TIERS = 3;

// effects[t] is the full effect at tier t+1 (not a delta).
const FACILITY_EFFECTS = {
  gravity: [
    { trainGravity: 10, trainingBoons: 1 },
    { trainGravity: 25, trainingBoons: 1 },
    { trainGravity: 50, trainingBoons: 2 },
  ],
  medbay: [
    { restHitDice: true, restExhaustion: 1 },
    { restHitDice: true, restExhaustion: 1, healMinor: true },
    { restHitDice: true, restExhaustion: 2, healMinor: true, healSerious: true, healLost: true },
  ],
  reactor: [
    { shortRestKiPct: 25 },
    { shortRestKiPct: 50 },
    { shortRestKiPct: 50, longRestTempKiPerRank: 5 },
  ],
  workshop: [
    { craftDiscount: 5, craftCheck: 1 },
    { craftDiscount: 10, craftCheck: 2, inventCheck: 2 },
    { craftDiscount: 15, craftCheck: 3, inventCheck: 3, dingRepairPct: 50 },
  ],
  comms: [
    { gatherCheck: 2 },
    { gatherCheck: 4 },
    { gatherCheck: 6 },
  ],
  warroom: [
    { initiative: 1 },
    { initiative: 2 },
    { initiative: 3 },
  ],
  training: [
    { trainingBoons: 1 },
    { trainingBoons: 2 },
    { trainingBoons: 3 },
  ],
  barracks: [
    { allies: 2 },
    { allies: 4 },
    { allies: 8 },
  ],
  hangar: [
    { garage: 2, dockRepairPct: 25 },
    { garage: 4, dockRepairPct: 50, dingRepairPct: 75 },
    { garage: 8, dockRepairPct: 100, dingRepairPct: 50 },
  ],
  market: [
    { storeDiscount: 5 },
    { storeDiscount: 10 },
    { storeDiscount: 15 },
  ],
  blackmarket: [
    { gatherDiscount: 5 },
    { gatherDiscount: 10 },
    { gatherDiscount: 15 },
  ],
  shieldgen: [
    { shields: 20 },
    { shields: 40 },
    { shields: 60 },
  ],
  defense: [
    { hardness: 2 },
    { hardness: 4, turret: { toHit: 7, dice: "4d10", type: "Force", range: "300 ft" } },
    { hardness: 6, turret: { toHit: 10, dice: "8d10", type: "Force", range: "600 ft" } },
  ],
};

const facilityEffect = (type, level) => {
  const t = FACILITY_EFFECTS[type];
  return t ? t[Math.max(1, Math.min(TIERS, level || 1)) - 1] : null;
};

// One readable line per effect key, for the facility cards and the bonus list.
const EFFECT_TEXT = {
  trainGravity: (v) => `Train at ${v}×g: training here raises Accustomed Gravity up to ${v}×`,
  trainingBoons: (v) => `+${v} Training Boon${v > 1 ? "s" : ""} from each Training Arc`,
  restHitDice: () => "Long Rest here: all Hit Dice come back",
  restExhaustion: (v) => `Long Rest here: ${v} extra Exhaustion removed`,
  healMinor: () => "Long Rest here: minor injuries heal",
  healSerious: () => "Long Rest here: serious injuries heal (they still scar)",
  healLost: () => "Long Rest here: lost limbs and eyes regrow",
  shortRestKiPct: (v) => `Short Rest here: +${v}% of max Ki on top of the usual half`,
  longRestTempKiPerRank: (v) => `Long Rest here: Temporary Ki equal to ${v} × Ki Rank`,
  craftDiscount: (v) => `Crafting here costs ${v}% less`,
  craftCheck: (v) => `+${v} to Crafting checks`,
  inventCheck: (v) => `+${v} to Invent checks`,
  dingRepairPct: (v) => `Dings repaired at ${v}% of the usual price`,
  gatherCheck: (v) => `+${v} to Gather Materials checks`,
  initiative: (v) => `+${v} to the party's initiative when fighting here`,
  allies: (v) => `Houses up to ${v} allies`,
  garage: (v) => `Garage for ${v} vehicles or mechs`,
  dockRepairPct: (v) => `Dock repairs restore ${v}% of the capital ship's integrity`,
  storeDiscount: (v) => `Stores on the home world charge ${v}% less`,
  gatherDiscount: (v) => `Gather Materials knocks off ${v}% more`,
  shields: (v) => `+${v} Shields`,
  hardness: (v) => `+${v} Hardness`,
  turret: (t) => `Defense turrets: +${t.toHit} to hit, ${t.dice} ${t.type}, ${t.range}`,
};
const effectLines = (eff) => !eff ? [] : Object.entries(eff).map(([k, v]) => (EFFECT_TEXT[k] ? EFFECT_TEXT[k](v) : null)).filter(Boolean);

// Shares of a price: the smallest one wins.
const LOWER_IS_BETTER = new Set(["dingRepairPct"]);
// The Gravity Chamber and Training Grounds both add Training Boons.
const STACKS = new Set(["trainingBoons"]);

// What the party gets right now. `where` is "home", "ship" or "away"; with no
// base-building rule there is nothing. Numbers take the best facility (the home
// and the ship don't stack), except home-only economy effects.
function baseBonuses(base, { enabled = true, where } = {}) {
  const out = { where: where || "away", sources: [] };
  if (!enabled || !base) return out;
  const at = where || base.partyAt || "away";
  out.where = at;
  const take = (fac, loc) => {
    const eff = facilityEffect(fac.type, fac.level);
    if (!eff) return;
    for (const [k, v] of Object.entries(eff)) {
      if (typeof v === "number") out[k] = LOWER_IS_BETTER.has(k) ? Math.min(out[k] ?? Infinity, v) : STACKS.has(k) ? (out[k] || 0) + v : Math.max(out[k] || 0, v);
      else if (v && typeof v === "object") { if (!out[k] || (v.toHit || 0) > (out[k].toHit || 0)) out[k] = v; }
      else if (v) out[k] = true;
    }
    out.sources.push({ type: fac.type, level: fac.level || 1, loc, lines: effectLines(eff) });
  };
  const homeFacs = (base.home && base.home.facilities) || [];
  const shipFacs = (base.ship && base.ship.facilities) || [];
  const here = at === "home" ? homeFacs : at === "ship" ? shipFacs : [];
  for (const f of here) take(f, at);
  // The home economy and garage work wherever the party is.
  for (const f of homeFacs) {
    if (at === "home") continue;
    if (f.type === "market" || f.type === "hangar" || f.type === "barracks") take(f, "home");
  }
  return out;
}

// A base's or ship's defenses with its facilities counted in.
function effectiveDefenses(stats, facilities) {
  let shields = 0, hardness = 0, turret = null;
  for (const f of facilities || []) {
    const e = facilityEffect(f.type, f.level) || {};
    shields += e.shields || 0;
    hardness += e.hardness || 0;
    if (e.turret) turret = e.turret;
  }
  return {
    maxSi: stats.maxSi ?? 60,
    maxShields: (stats.maxShields ?? 0) + shields,
    hardness: (stats.hardness ?? 0) + hardness,
    bonusShields: shields, bonusHardness: hardness, turret,
  };
}

// Hits on a base: Hardness first, then Shields, then Structural Integrity.
function damageStructure(stats, facilities, amount) {
  const d = effectiveDefenses(stats, facilities);
  let dmg = Math.max(0, (amount || 0) - d.hardness);
  const sh = stats.shields ?? d.maxShields;
  const absorbed = Math.min(sh, dmg);
  dmg -= absorbed;
  const si = Math.max(0, (stats.si ?? d.maxSi) - dmg);
  return { shields: sh - absorbed, si, absorbed, toSi: dmg, blocked: Math.min(amount || 0, d.hardness) };
}

// Long Rest at a base: the Med Bay and Ki Reactor parts of the rest patch.
// `heal` is healInjuryPatch, passed in so this module stays dependency-free.
function restBonusPatch(char, bonuses, kind, { kiRank = 1, level = 1, heal } = {}) {
  const b = bonuses || {};
  const patch = {}; const notes = [];
  if (kind === "short" && b.shortRestKiPct) {
    const extra = Math.floor((char.maxKi || 0) * b.shortRestKiPct / 100);
    patch.ki = Math.min(char.maxKi || 0, (char.ki || 0) + Math.floor((char.maxKi || 0) / 2) + extra);
    notes.push(`Ki Reactor: +${extra} Ki`);
  }
  if (kind === "long") {
    if (b.restHitDice) { patch.hitDiceUsed = 0; notes.push("Med Bay: all Hit Dice back"); }
    if (b.restExhaustion) {
      const v = char.vitals || {};
      patch.vitals = { ...v, exhaustion: Math.max(0, (v.exhaustion || 0) - 1 - b.restExhaustion), rest: 3 };
      notes.push(`Med Bay: −${b.restExhaustion} more Exhaustion`);
    }
    if (b.longRestTempKiPerRank) {
      patch.temp = { hp: 0, ki: b.longRestTempKiPerRank * kiRank, stamina: 0 };
      notes.push(`Ki Nexus: ${b.longRestTempKiPerRank * kiRank} Temporary Ki`);
    }
    if (heal && (b.healMinor || b.healSerious || b.healLost)) {
      let cur = { ...char };
      const healed = [];
      for (const inj of char.injuries || []) {
        const ok = inj.lost ? b.healLost : inj.serious ? b.healSerious : b.healMinor;
        if (!ok) continue;
        const p = heal(cur, inj.id);
        if (p) { cur = { ...cur, ...p }; healed.push(inj.name); }
      }
      if (healed.length) {
        patch.injuries = cur.injuries; if (cur.scars !== char.scars) patch.scars = cur.scars;
        if (cur.maxHp !== char.maxHp) patch.maxHp = cur.maxHp;
        notes.push(`Med Bay healed: ${healed.join(", ")}`);
      }
    }
  }
  return { patch, notes };
}

export {
  TIERS, FACILITY_EFFECTS, facilityEffect, effectLines,
  baseBonuses, effectiveDefenses, damageStructure, restBonusPatch,
};
