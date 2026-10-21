import { CONSUMABLE_DATA, GEAR_DATA, WEAPON_DATA } from "../data/gear-data.js";
import { uid } from "../lib/dice.js";
import { CURRENT_ENV_GRAVITY, CURRENT_HOUSE_RULES, envWeightedRanks } from "../state/hooks.js";
import { styleFlatMod, styleWeightedRanks } from "../state/registry.js";
import { STAT_MOD_LABEL, benefitsOfPower, charTotalLevel, profBonusForLevel, statMod } from "./core.js";
import { hasCybernetic } from "./cybernetics.js";
import { armoredDefenseStat, computeUnarmoredAC } from "./spellcasting.js";
import { envGravityRanks, gravAcclimRanks } from "./universe.js";

/* ===== Equipment: slots, book armor catalog, equipped-item AC/DR ===== */

// The 14 body slots (paperdoll). `type` matches an item's `slot` field; several
// physical slots can share a type (two rings, two hands).
const EQUIP_SLOTS = [
  { key: "head",     label: "Head",      type: "head" },
  { key: "eyes",     label: "Eyes",      type: "eyes" },
  { key: "neck",     label: "Neck",      type: "neck" },
  { key: "body",     label: "Body",      type: "body" },
  { key: "back",     label: "Back",      type: "back" },
  { key: "wrists",   label: "Wrists",    type: "wrists" },
  { key: "gloves",   label: "Gloves",    type: "gloves" },
  { key: "waist",    label: "Waist",     type: "waist" },
  { key: "feet",     label: "Feet",      type: "feet" },
  { key: "ring1",    label: "Ring 1",    type: "ring" },
  { key: "ring2",    label: "Ring 2",    type: "ring" },
  { key: "hand1",    label: "Main Hand", type: "held" },
  { key: "hand2",    label: "Off Hand",  type: "held" },
  { key: "artifact", label: "Artifact",  type: "artifact" },
];
// Selectable slot types for an item (what body location it can occupy). "" = not
// worn/held (consumables, key items).
const SLOT_TYPES = [
  { key: "", label: "— (carried only)" },
  { key: "head", label: "Head" }, { key: "eyes", label: "Eyes" }, { key: "neck", label: "Neck" },
  { key: "body", label: "Body (armor)" }, { key: "back", label: "Back" }, { key: "wrists", label: "Wrists" },
  { key: "gloves", label: "Gloves" }, { key: "waist", label: "Waist" }, { key: "feet", label: "Feet" },
  { key: "ring", label: "Ring" }, { key: "held", label: "Hand (weapon/shield)" }, { key: "artifact", label: "Artifact" },
];
const slotTypeLabel = (t) => (SLOT_TYPES.find(s => s.key === t) || { label: t }).label;

// Book armor (Ch. 9) as structured equipment items. These seed the Data Pool
// dictionary and can be added to a character; homebrew reuses the same shape.
// acDexMode: "full" (light) · "max2" (medium, +2 cap) · "none" (heavy).
const BOOK_EQUIPMENT = [
  { catalogId: "book_padded_gi",     name: "Padded Gi",           category: "Armor",  slot: "body", rarity: "common", zeni: 5,    acBase: 11, acDexMode: "full", acHalfProf: true, acBonus: 0, dr: 1, stealthDisadv: false, strReq: 0,  notes: "Little more than padded clothing." },
  { catalogId: "book_light_battle",  name: "Light Battle Armor",  category: "Armor",  slot: "body", rarity: "common", zeni: 45,   acBase: 12, acDexMode: "full", acHalfProf: true, acBonus: 0, dr: 1, stealthDisadv: true,  strReq: 0,  notes: "Basic light battle armor." },
  { catalogId: "book_medium_battle", name: "Medium Battle Armor", category: "Armor",  slot: "body", rarity: "common", zeni: 50,   acBase: 13, acDexMode: "max2", acHalfProf: true, acBonus: 0, dr: 2, stealthDisadv: false, strReq: 0,  notes: "Advanced alloy, resists energy attacks." },
  { catalogId: "book_medium_elite",  name: "Medium Elite Armor",  category: "Armor",  slot: "body", rarity: "uncommon", zeni: 400, acBase: 14, acDexMode: "max2", acHalfProf: true, acBonus: 0, dr: 2, stealthDisadv: false, strReq: 0,  notes: "Protective and easy to move in." },
  { catalogId: "book_heavy_battle",  name: "Heavy Battle Armor",  category: "Armor",  slot: "body", rarity: "common", zeni: 75,   acBase: 16, acDexMode: "none", acHalfProf: true, acBonus: 0, dr: 3, stealthDisadv: true,  strReq: 13, notes: "Singular durable elastic armor pieces." },
  { catalogId: "book_heavy_elite",   name: "Heavy Elite Armor",   category: "Armor",  slot: "body", rarity: "rare", zeni: 1500,  acBase: 18, acDexMode: "none", acHalfProf: true, acBonus: 0, dr: 4, stealthDisadv: true,  strReq: 15, notes: "Plated/scaled body armor molded to the body." },
  { catalogId: "book_shield",        name: "Shield",              category: "Shield", slot: "held", rarity: "common", zeni: 10,   acBase: 0,  acDexMode: "none", acHalfProf: false, acBonus: 2, dr: 0, stealthDisadv: false, strReq: 0,  notes: "Wielded in one hand; +2 AC." },
];

// Resolve which inventory items are currently equipped, paired with their slot.
function equippedEntries(char) {
  const map = char.equipment || {};
  const byId = Object.fromEntries((char.items || []).map(it => [it.id, it]));
  return EQUIP_SLOTS.map(s => (map[s.key] && byId[map[s.key]]) ? { slotKey: s.key, item: byId[map[s.key]] } : null).filter(Boolean);
}

// AC from equipped gear: the Body-slot armor sets the base (its Dex/½Prof rule);
// every equipped item's acBonus stacks (shields, rings, homebrew). Falls back to
// Unarmored Defense when no body armor is worn.
function computeAC(char) {
  const eq = equippedEntries(char);
  const body = eq.find(e => e.slotKey === "body" && (e.item.acBase || 0) > 0)?.item || null;
  const bonus = eq.reduce((s, e) => s + (e.item.acBonus || 0), 0);
  const tough = benefitsOfPower(char).toughness; // Toughness Bonus: +1/rank to AC
  const styleAc = styleFlatMod(char, "ac");
  const extra = bonus + tough + styleAc;
  const bonusLabel = `${bonus ? ` + gear (+${bonus})` : ""}${tough ? ` + Power (+${tough})` : ""}${styleAc ? ` + Style (${styleAc >= 0 ? "+" : ""}${styleAc})` : ""}`;
  if (body) {
    // A class with a stat Unarmored Defense may use that stat instead of DEX in armor.
    const swap = armoredDefenseStat(char);
    const dexMod = statMod(char, "dex"), swapMod = swap ? statMod(char, swap) : -Infinity;
    const dex = Math.max(dexMod, swapMod);
    const dexName = swapMod > dexMod ? STAT_MOD_LABEL[swap] : "DEX";
    const halfProf = Math.floor(profBonusForLevel(charTotalLevel(char)) / 2);
    let dexPart = 0, dexLabel = "";
    if (body.acDexMode === "full") { dexPart = dex; dexLabel = ` + ${dexName} (${dex >= 0 ? "+" : ""}${dex})`; }
    else if (body.acDexMode === "max2") { dexPart = Math.min(dex, 2); dexLabel = ` + ${dexName} (${dexPart >= 0 ? "+" : ""}${dexPart}, max 2)`; }
    const profLabel = body.acHalfProf ? ` + half Prof (+${halfProf})` : "";
    const value = (body.acBase || 0) + dexPart + (body.acHalfProf ? halfProf : 0) + extra;
    return { value, formula: `${body.name}: ${body.acBase}${dexLabel}${profLabel}${bonusLabel}`, armored: true, dr: body.dr || 0 };
  }
  const un = computeUnarmoredAC(char);
  if (!un) return extra ? { value: 10 + statMod(char, "dex") + extra, formula: `10 + DEX${bonusLabel}`, armored: false, dr: 0 } : null;
  return { value: un.value + extra, formula: un.formula + bonusLabel, armored: false, dr: 0 };
}

// Optional hit locations. A hit that lands on one place is only stopped by
// what's worn there; neck, rings, held items and artifacts protect everywhere.
// "any" (the default) is the book rule: every equipped item's DR counts.
const HIT_LOCATIONS = [
  { key: "any",  label: "Any",  slots: null },
  { key: "head", label: "Head", slots: ["head", "eyes"] },
  { key: "body", label: "Body", slots: ["body", "back", "waist"] },
  { key: "arms", label: "Arms", slots: ["wrists", "gloves"] },
  { key: "legs", label: "Legs", slots: ["feet"] },
];
const LOCATED_SLOTS = new Set(HIT_LOCATIONS.flatMap(l => l.slots || []));
function coversLocation(slotKey, location) {
  const loc = HIT_LOCATIONS.find(l => l.key === location);
  if (!loc || !loc.slots) return true;
  return !LOCATED_SLOTS.has(slotKey) || loc.slots.includes(slotKey);
}

// DR contributed by equipped gear (body armor + any item's dr). Manual char.dr
// holds other DR sources (class features) and is preserved via drOverride.
const computeArmorDR = (char, location = "any") => equippedEntries(char)
  .filter(e => coversLocation(e.slotKey, location))
  .reduce((s, e) => s + (e.item.dr || 0), 0);

// Weighted Condition (book Ch.1/9). Worn weighted gear gives Weighted (Heavy);
// un-attuning flips it to Weighted (Light) for a minute. weightedManual lets a
// Feat/Form add Light (+) or Heavy (−) ranks. Heavy and Light cancel via `net`.
// net > 0 = Light (buff), net < 0 = Heavy (penalty).
function computeWeighted(char) {
  const gear = equippedEntries(char).reduce((s, e) => s + (e.item.weightedRank || 0), 0);
  const gearNet = char.weightedUnattuned ? gear : -gear;
  // Synthetic Muscle Fibers (High-Tech Part) grants 1 Rank of Weighted (Light).
  const cyber = hasCybernetic(char, "synthetic-muscle-fibers") ? 1 : 0;
  // Gravity acclimation (Materoids Flavor): a heavy-gravity homeworld grants
  // Lightweight ranks that carry over anywhere lighter.
  const acclim = CURRENT_HOUSE_RULES.gravityAcclimation ? gravAcclimRanks(char.accustomedGravity) : 0;
  // The world underfoot (Harsh Galaxies): low gravity floats you into Weighted
  // (Light), crushing gravity drags you into Weighted (Heavy). Applies to
  // everyone present and folds through the same net so acclimation offsets it.
  const envG = (CURRENT_HOUSE_RULES.harshGalaxies && CURRENT_ENV_GRAVITY != null) ? envGravityRanks(CURRENT_ENV_GRAVITY) : 0;
  // A star trait or hazard can also impose Weighted ranks via an effect hook.
  const envHookW = CURRENT_HOUSE_RULES.harshGalaxies ? envWeightedRanks() : 0;
  // The fighter's equipped Fighting Style can grant Weighted ranks too.
  const styleW = styleWeightedRanks(char);
  const net = gearNet + (char.weightedManual || 0) + cyber + acclim + envG + envHookW + styleW;
  return { gear, net, heavy: Math.max(0, -net), light: Math.max(0, net), acclim, envG };
}
// Power from Weighted: +1 Stable per Light rank, −1 per Heavy rank (folds into
// effectivePowerBonus so it flows through every downstream formula).
const weightedPower = (char) => computeWeighted(char).net;
// Battle Power weight multiplier: ×1.5 per Light rank, ÷1.5 per Heavy rank.
const weightMultiplier = (char) => Math.pow(1.5, computeWeighted(char).net);

// Snapshot a catalog entry (book or custom dictionary entry) into a fresh
// carried item. catalogId links it back to its dictionary source.
function catalogToItem(entry) {
  return normalizeItem({ ...entry, id: uid(), catalogId: entry.catalogId || entry.id || null });
}
// The equipment dictionary = book armor, weapons, gear and consumables (Ch.9)
// + any custom entry flagged isEquipment.
function equipmentCatalog(customEntries) {
  return [...BOOK_EQUIPMENT, ...WEAPON_DATA, ...CONSUMABLE_DATA, ...GEAR_DATA, ...(customEntries || []).filter(e => e && e.isEquipment)];
}
const catalogKey = (e) => e.catalogId || e.id;

// One migration path for every character regardless of how/when it was created
// (pregen, quick paths, imports, or saves from before a field existed).
// Items used to be a free-text string[]; upgrade to structured entries with
// rarity/zeni/qty so nothing is lost and old saves keep working.
function normalizeItem(it) {
  if (typeof it === "string") it = { name: it };
  return {
    id: it.id || uid(), catalogId: it.catalogId || null,
    name: it.name || "", category: it.category || "", slot: it.slot || "",
    rarity: it.rarity || "common", zeni: it.zeni || 0, qty: it.qty || 1,
    weightedRank: it.weightedRank || 0, notes: it.notes || "",
    // defense
    acBase: it.acBase || 0, acDexMode: it.acDexMode || "full", acHalfProf: it.acHalfProf != null ? it.acHalfProf : true,
    acBonus: it.acBonus || 0, dr: it.dr || 0, stealthDisadv: it.stealthDisadv || false, strReq: it.strReq || 0,
    // weapon
    damageDice: it.damageDice || "", damageType: it.damageType || "", attackStat: it.attackStat || "str",
    // book weapon / gear / consumable details (Ch.9), kept when present
    ...(it.properties ? { properties: it.properties } : {}), ...(it.mastery ? { mastery: it.mastery } : {}),
    ...(it.weaponGroup ? { weaponGroup: it.weaponGroup } : {}), ...(it.weight ? { weight: it.weight } : {}),
    ...(it.restore ? { restore: it.restore } : {}), ...(it.exhaustionAfterFirst ? { exhaustionAfterFirst: it.exhaustionAfterFirst } : {}),
    ...(it.oncePerLongRest ? { oncePerLongRest: true } : {}),
    // named conditions/effects this item grants (descriptive for now)
    effects: Array.isArray(it.effects) ? it.effects.map(e => ({ id: e.id || uid(), name: e.name || "", description: e.description || "" })) : [],
    // Ability Score changes while equipped — see effectiveStats().
    statMods: Array.isArray(it.statMods)
      ? it.statMods.map(m => ({ id: m.id || uid(), stat: m.stat || "str", mode: m.mode === "add" ? "add" : "set", value: Number(m.value) || 0 }))
      : [],
  };
}

export {
  EQUIP_SLOTS,
  SLOT_TYPES,
  slotTypeLabel,
  BOOK_EQUIPMENT,
  equippedEntries,
  computeAC,
  computeArmorDR,
  HIT_LOCATIONS,
  coversLocation,
  computeWeighted,
  weightedPower,
  weightMultiplier,
  catalogToItem,
  equipmentCatalog,
  catalogKey,
  normalizeItem,
};
