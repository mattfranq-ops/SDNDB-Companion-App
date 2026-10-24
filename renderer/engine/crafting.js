/* ===== Crafting and the other making Downtime Activities (5.0 Ch.5) =====
   Crafting (1 Downtime Point): pick a Goal (Adventuring Gear, Armor, Vehicle
   or Weapon; Scientific Marvels once Invented) and make a DC 15 check with
   its toolkit. Success makes it for 85% of the price, 5% less for every 5 over
   the DC, never under 50%.
   Gather Materials (1 DP): DC 15 Perception, Investigation or Persuasion.
   Success takes 15% off the next Crafting or Enchanting, 5% more per 5 over,
   down to 45% of the base price.
   Invent (2 DP): Intelligence (Technology) against a DC by rarity; success
   adds that Scientific Marvel to what you can Craft.
   Enchanting (2 DP, spellcasters): pay by rarity for a Magical Bonus and an
   Enchantment on a piece of your gear.
   Cooking (1 DP): a tiered meal granting Temporary HP, Ki or Stamina.
   Base facilities (engine/base.js) add a check bonus and a discount on top. */

const TOOLKIT_FOR = {
  "Adventuring Gear": "Tinker's Tools",
  "Armor (Heavy)": "Smith's Tools",
  "Armor (Medium)": "Leatherworker's Tools or Smith's Tools",
  "Armor (Light)": "Leatherworker's Tools",
  Armor: "Smith's Tools",
  Vehicle: "Engineer's Kit",
  Mech: "Engineer's Kit",
  Weapon: "Smith's Tools",
  "Scientific Marvel": "Engineer's Kit",
  Consumable: "Alchemist's Supplies",
};

const CRAFT_DC = 15;
const GATHER_DC = 15;
const INVENT_DC = { common: 10, uncommon: 15, rare: 20, veryrare: 25, legendary: 30 };
const ENCHANT_TABLE = [
  { rarity: "common", label: "Common", bonus: 1, zeni: 400 },
  { rarity: "uncommon", label: "Uncommon", bonus: 1, zeni: 5000 },
  { rarity: "rare", label: "Rare", bonus: 2, zeni: 20000 },
  { rarity: "veryrare", label: "Very Rare", bonus: 3, zeni: 80000 },
  { rarity: "legendary", label: "Legendary", bonus: 3, zeni: 300000 },
];
const COOKING_TIERS = [
  { tier: 1, zeni: 20,    dc: 10, hp: 5,  ki: 5,  stamina: 1,  name: "A simple meal" },
  { tier: 2, zeni: 50,    dc: 15, hp: 15, ki: 15, stamina: 2,  name: "A home-cooked meal" },
  { tier: 3, zeni: 250,   dc: 20, hp: 30, ki: 30, stamina: 4,  name: "A waistband-loosening meal" },
  { tier: 4, zeni: 1250,  dc: 25, hp: 45, ki: 45, stamina: 8,  name: "A feast fit for a king" },
  { tier: 5, zeni: 10000, dc: 30, hp: 75, ki: 75, stamina: 12, name: "Food for a God of Destruction" },
];
const DOWNTIME_COST = { craft: 1, gather: 1, invent: 2, enchant: 2, cook: 1, improve: 1 };

// Book price share after a Crafting check (0.85, −0.05 per 5 over, floor 0.5).
function craftPriceShare(total, dc = CRAFT_DC) {
  if (total < dc) return null;
  return Math.max(0.5, 0.85 - 0.05 * Math.floor((total - dc) / 5));
}
// Gather Materials discount (0.15, +0.05 per 5 over, so the price floors at 45%).
function gatherDiscount(total, dc = GATHER_DC, extraPct = 0) {
  if (total < dc) return 0;
  return Math.min(0.55, 0.15 + 0.05 * Math.floor((total - dc) / 5) + extraPct / 100);
}

/* The final Zeni cost of a crafted Goal.
   share       from craftPriceShare (book)
   gathered    a stored Gather Materials discount (0..0.55)
   facilityPct the Workshop's extra discount (base.js)
   The Workshop discount comes off the result, but never below 40% of price. */
function craftCost(price, { share, gathered = 0, facilityPct = 0 }) {
  if (share == null) return null;
  let s = share;
  if (gathered) s = Math.min(s, Math.max(0.45, 1 - gathered));
  s = Math.max(0.4, s - facilityPct / 100);
  return { zeni: Math.round(price * s), share: s };
}

// What kind of Goal a catalog entry is (for its toolkit).
function goalType(entry) {
  if (!entry) return "Adventuring Gear";
  if (entry.section === "Vehicles" || entry.category === "Vehicle") return "Vehicle";
  if (entry.section === "Mechs" || entry.category === "Mech") return "Mech";
  if (entry.section === "Scientific Marvels" || entry.category === "Technology") return "Scientific Marvel";
  if (entry.restore) return "Consumable";
  if (entry.damageDice || entry.weaponGroup) return "Weapon";
  if (entry.slot === "body" || entry.acBase || /armor|shield/i.test(entry.category || "")) {
    const c = `${entry.category || ""} ${entry.armorType || ""} ${entry.name || ""}`;
    return /heavy/i.test(c) ? "Armor (Heavy)" : /medium/i.test(c) ? "Armor (Medium)" : /light/i.test(c) ? "Armor (Light)" : "Armor";
  }
  return "Adventuring Gear";
}
const toolkitFor = (entry) => TOOLKIT_FOR[goalType(entry)] || "Tinker's Tools";

// Spending Downtime Points (char.downtimePoints).
function spendDowntime(char, activity) {
  const cost = DOWNTIME_COST[activity] || 1;
  const have = char.downtimePoints || 0;
  if (have < cost) return null;
  return { downtimePoints: have - cost };
}

/* Enchanting and Improving. Scientific gear (Technology) costs double. A
   stored Gather Materials discount applies, down to 45% of the price.
   Improving raises an enchanted item one rarity for half that tier's price.
   App mapping: Common/Uncommon tiers give the Enchantment's Level 1, Rare
   Level 2, Very Rare and Legendary Level 3. */
const ENCHANT_LEVEL = { common: 1, uncommon: 1, rare: 2, veryrare: 3, legendary: 3 };
const isScientific = (item) => /technology|vehicle|mech|marvel/i.test(`${item.category || ""}`);
const enchantTierOf = (item) => item && item.magicBonus ? ENCHANT_TABLE.findIndex(t => t.rarity === item.rarity) : -1;
function enchantCost(item, tierIdx, { gathered = 0, improve = false } = {}) {
  const t = ENCHANT_TABLE[tierIdx];
  if (!t) return null;
  let zeni = t.zeni * (isScientific(item) ? 2 : 1) * (improve ? 0.5 : 1);
  if (gathered) zeni *= Math.max(0.45, 1 - gathered);
  return Math.round(zeni);
}
function enchantPatch(item, tierIdx, enchantName) {
  const t = ENCHANT_TABLE[tierIdx];
  const level = ENCHANT_LEVEL[t.rarity];
  const list = (item.enchantments || []).map(e => ({ ...e, level }));
  if (enchantName && !list.some(e => e.name === enchantName)) list.push({ name: enchantName, level });
  return { magicBonus: t.bonus, rarity: t.rarity, enchantments: list };
}

/* Gravity training (app rule, with a Gravity Chamber): a DC 15 Constitution
   save; success raises Accustomed Gravity by 5×g, +5 more per 5 over the DC,
   up to the chamber's gravity. */
function gravityTraining(current, total, cap, dc = 15) {
  if (total < dc) return current || 0;
  return Math.min(cap, (current || 0) + 5 + 5 * Math.floor((total - dc) / 5));
}

// A meal's Temporary pools (the higher of what you have and what it gives).
function mealPatch(char, tier) {
  const t = char.temp || {};
  return { temp: { ...t, hp: Math.max(t.hp || 0, tier.hp), ki: Math.max(t.ki || 0, tier.ki), stamina: Math.max(t.stamina || 0, tier.stamina) } };
}

export {
  ENCHANT_LEVEL, isScientific, enchantTierOf, enchantCost, enchantPatch, gravityTraining, mealPatch,
  TOOLKIT_FOR, CRAFT_DC, GATHER_DC, INVENT_DC, ENCHANT_TABLE, COOKING_TIERS, DOWNTIME_COST,
  craftPriceShare, gatherDiscount, craftCost, goalType, toolkitFor, spendDowntime,
};
