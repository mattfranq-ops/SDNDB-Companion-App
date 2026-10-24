/* ===== Vehicles and Mechs (5.0 Ch.9) =====
   The book's statblocks (in GEAR_RULES, sections "Vehicles" and "Mechs") are
   parsed into numbers so a vehicle in someone's inventory can take damage,
   collect Dings, be repaired, carry upgrades and join the initiative tracker.

   Book rules used here:
   - Dinged Up: each 25% of Maximum HP lost adds a Ding. Restoring the vehicle
     to full costs an hour and 10% of its price per Ding.
   - Tier Up!: Crafting can turn a Tier 1 Mech into a Tier 2 (or 2 into 3) for
     25% of the higher tier's price.
   Upgrades (VEHICLE_MODS) are app rules, built with the Crafting activity. */

import { GEAR_RULES } from "../data/gear-data.js";

const VEHICLE_RULES = GEAR_RULES.filter(r => r.section === "Vehicles" || r.section === "Mechs");
const vehicleRule = (catalogId) => VEHICLE_RULES.find(r => r.id === catalogId) || null;
const isVehicleItem = (item) => !!(item && vehicleRule(item.catalogId));

const num = (s) => parseInt(String(s).replace(/,/g, ""), 10);

function parseVehicle(rule) {
  if (!rule) return null;
  const t = rule.text || "";
  const lines = t.split("\n");
  const head = (lines[0] || "").match(/^(Tiny|Small|Medium|Large|Huge|Gargantuan)\s+(\w+)/);
  const ac = t.match(/Armor Class (\d+)(?:\s*\(([^)]*)\))?/);
  const hp = t.match(/Hit Points (\d+)(?:\s*\(([^)]*)\))?/);
  const sp = t.match(/Speed ([^\n]*?)(?=\n|$|STR)/);
  const stam = t.match(/Stamina (\d+)/);
  const statsLine = t.match(/STR DEX CON INT WIS CHA\s+([^\n]+)/);
  const scores = statsLine ? (statsLine[1].match(/(\d+) \(([+-]\d+)\)|-/g) || []).slice(0, 6) : [];
  const stats = {};
  ["str", "dex", "con", "int", "wis", "cha"].forEach((k, i) => { const m = String(scores[i] || "").match(/^(\d+)/); stats[k] = m ? +m[1] : null; });
  // Named traits and actions: "Name. Text" lines; "Actions:" splits them.
  const traits = [], actions = [];
  let inActions = false;
  for (const ln of lines.slice(1)) {
    if (/^Actions:?\s*$/.test(ln.trim())) { inActions = true; continue; }
    const m = ln.match(/^([A-Z][A-Za-z’' !\-()/]{1,40}?)\.\s+(.+)$/);
    if (!m || /^(Price|Armor Class|Speed|STR)/.test(ln)) continue;
    const entry = { name: m[1].trim(), text: m[2].trim() };
    const atk = entry.text.match(/(Melee|Ranged) Weapon Attack:(?:\s*\+(\d+) to hit,)?\s*(?:reach|Range|range)\s*([^,]+),[^.]*\.\s*Hit\s*(\d+)\s*\(([^)]+)\)\s*([A-Za-z]+)/);
    if (atk) entry.attack = { kind: atk[1], toHit: atk[2] ? +atk[2] : null, range: atk[3].trim(), avg: +atk[4], dice: atk[5].replace(/\s+/g, ""), type: atk[6] };
    (inActions ? actions : traits).push(entry);
  }
  const speedText = sp ? sp[1].trim().replace(/\.$/, "") : "";
  const speedNum = num((speedText.match(/(\d[\d,]*)\s*ft/) || [])[1] || 0);
  return {
    id: rule.id, name: rule.name, section: rule.section, category: rule.category || rule.section,
    price: rule.zeni || 0, size: head ? head[1] : "", kind: head ? head[2] : rule.section,
    ac: ac ? +ac[1] : 10, acNote: ac && ac[2] ? ac[2] : "",
    maxHp: hp ? +hp[1] : 1, hpDice: hp && hp[2] ? hp[2] : "",
    speed: speedNum, speedText, stamina: stam ? +stam[1] : 0, stats, traits, actions,
    occupancy: (traits.find(x => /Occupancy|Cockpit|Controlled/.test(x.name)) || {}).text || "",
    tierUp: /Tier U/i.test(t) ? (rule.name.match(/Tier (\d)/) ? `Tier ${+rule.name.match(/Tier (\d)/)[1] + 1} Mech` : null) : null,
  };
}

/* Upgrades, each buildable up to `max` times with the Crafting activity.
   Cost is a share of the vehicle's price (minimum 100 Zeni). */
const VEHICLE_MODS = [
  { key: "plating",  name: "Armor Plating",     max: 3, pct: 20, desc: "+1 AC per plate." },
  { key: "frame",    name: "Reinforced Frame",  max: 2, pct: 25, desc: "+25% Maximum HP per frame." },
  { key: "boosters", name: "Boosters",          max: 2, pct: 15, desc: "+25% Speed per booster." },
  { key: "cannon",   name: "Mounted Cannon",    max: 1, pct: 30, desc: "A mounted Ki cannon: +5 to hit (plus the pilot's Proficiency), 3d10 Energy, 120/360 ft." },
  { key: "shield",   name: "Shield Emitter",    max: 1, pct: 30, desc: "Starts each combat with Temporary HP equal to 20% of its Maximum HP." },
];
const modCost = (spec, mod) => Math.max(100, Math.round((spec.price || 0) * mod.pct / 100));

// The vehicle as it stands, with its upgrades counted in.
function vehicleStats(item) {
  const spec = parseVehicle(vehicleRule(item.catalogId));
  if (!spec) return null;
  const mods = (item.vehicle && item.vehicle.mods) || {};
  const ac = spec.ac + (mods.plating || 0);
  const maxHp = Math.round(spec.maxHp * (1 + 0.25 * (mods.frame || 0)));
  const speed = Math.round(spec.speed * (1 + 0.25 * (mods.boosters || 0)));
  const actions = [...spec.actions];
  if (mods.cannon) actions.push({ name: "Mounted Cannon", text: "Ranged Weapon Attack: +5 plus the pilot's Proficiency to hit, range 120/360 ft., one target. Hit 16 (3d10) Energy Damage.", attack: { kind: "Ranged", toHit: 5, range: "120/360 ft.", avg: 16, dice: "3d10", type: "Energy" } });
  const v = item.vehicle || {};
  const hp = Math.min(maxHp, v.hp ?? maxHp);
  return { ...spec, ac, maxHp, speed, actions, hp, dings: dingsFor(hp, maxHp), shieldTemp: mods.shield ? Math.round(maxHp * 0.2) : 0, mods };
}

// Dinged Up: one Ding for each full 25% of Maximum HP lost.
const dingsFor = (hp, maxHp) => maxHp > 0 ? Math.min(4, Math.floor(((maxHp - Math.max(0, hp)) / maxHp) * 4 + 1e-9)) : 0;
function repairCost(stats, pct = 100) {
  return Math.round(stats.dings * 0.1 * (stats.price || 0) * pct / 100);
}

// Patches for a vehicle item (merged into item.vehicle).
const damageVehicle = (item, amount) => {
  const s = vehicleStats(item);
  return { ...(item.vehicle || {}), hp: Math.max(0, s.hp - Math.max(0, amount || 0)) };
};
const repairVehicle = (item) => { const s = vehicleStats(item); return { ...(item.vehicle || {}), hp: s.maxHp }; };
const addMod = (item, key) => {
  const v = item.vehicle || {}; const mods = { ...(v.mods || {}) };
  const spec = VEHICLE_MODS.find(m => m.key === key);
  if (!spec || (mods[key] || 0) >= spec.max) return null;
  mods[key] = (mods[key] || 0) + 1;
  const before = vehicleStats(item);
  const after = vehicleStats({ ...item, vehicle: { ...v, mods } });
  // A frame raises current HP along with the maximum.
  return { ...v, mods, hp: Math.min(after.maxHp, before.hp + (after.maxHp - before.maxHp)) };
};

// A tracker row for a deployed vehicle (unlinked: its damage is applied back
// to the item from the Garage).
function vehicleCombatant(item, owner, { id, init = 0 } = {}) {
  const s = vehicleStats(item);
  return {
    id, name: `${item.name}${owner ? ` (${owner.name})` : ""}`, hp: s.hp, maxHp: s.maxHp, ac: s.ac, dr: 0,
    ki: 0, maxKi: 0, stamina: 0, maxStamina: 0, init, conditions: [], deathSaves: { success: 0, fail: 0 },
    exhaustion: 0, dead: false, sourceId: null, sourceType: "vehicle",
    vehicleItemId: item.id, vehicleOwnerId: owner ? owner.id : null,
    temp: { hp: s.shieldTemp, ki: 0, stamina: 0 },
  };
}

// Tier Up!: the next tier's rule and its price (25% of the higher tier).
function tierUpTarget(item) {
  const spec = parseVehicle(vehicleRule(item.catalogId));
  if (!spec || !spec.tierUp) return null;
  const next = VEHICLE_RULES.find(r => r.name === spec.tierUp);
  return next ? { rule: next, zeni: Math.round((next.zeni || 0) * 0.25) } : null;
}
function tierUpItem(item) {
  const t = tierUpTarget(item);
  if (!t) return null;
  const up = { ...item, catalogId: t.rule.id, name: item.name.replace(/Tier \d/, t.rule.name.match(/Tier \d/)[0]), zeni: t.rule.zeni || item.zeni };
  const s = vehicleStats(up);
  return { ...up, vehicle: { ...(item.vehicle || {}), hp: s.maxHp } };
}

export {
  VEHICLE_RULES, vehicleRule, isVehicleItem, parseVehicle,
  VEHICLE_MODS, modCost, vehicleStats, dingsFor, repairCost,
  damageVehicle, repairVehicle, addMod, vehicleCombatant, tierUpTarget, tierUpItem,
};
