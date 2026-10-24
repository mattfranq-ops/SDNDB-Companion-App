// Equipment from the 5.0 book (Ch.9) and using consumables.
import { describe, it, expect } from "vitest";
import { CONSUMABLE_DATA, GEAR_DATA, GEAR_RULES, WEAPON_DATA } from "../renderer/data/gear-data.js";
import { consumeItem, rollAmount } from "../renderer/engine/consumables.js";
import { equipmentCatalog, normalizeItem } from "../renderer/engine/equipment.js";
import { buildStoreCatalog, purchaseItemFromCatalog } from "../renderer/features/universe/store.jsx";

const byName = (list, n) => list.find(x => x.name === n);

describe("equipment data", () => {
  it("has the weapon table", () => {
    expect(WEAPON_DATA).toHaveLength(71);
    expect(byName(WEAPON_DATA, "Greatsword")).toMatchObject({ zeni: 50, damageDice: "2d6", damageType: "Slashing", properties: "Heavy, Two-Handed", mastery: "Graze", attackStat: "str" });
    expect(byName(WEAPON_DATA, "Quarterstaff")).toMatchObject({ damageType: "Bludgeoning", properties: "Versatile (1d8)" });
    expect(byName(WEAPON_DATA, "Pistol")).toMatchObject({ zeni: 25, attackStat: "dex", weaponGroup: "Simple Ranged" });
    expect(byName(WEAPON_DATA, "Dart").zeni).toBe(0.05);
    for (const w of WEAPON_DATA) expect(w.damageType, w.name).toMatch(/^(Slashing|Piercing|Bludgeoning)$/);
  });
  it("has gear, tools, scouters and ammunition with prices", () => {
    expect(GEAR_DATA.length).toBeGreaterThan(120);
    for (const g of GEAR_DATA) expect(g.zeni, g.name).toBeGreaterThan(0);
    expect(byName(GEAR_DATA, "Healers Kit").notes).toMatch(/ten uses/);
    expect(byName(GEAR_DATA, "Scouter (Tier 3)")).toMatchObject({ zeni: 150, slot: "eyes", category: "Scouter" });
    expect(byName(GEAR_DATA, "Sniper Magazine").zeni).toBe(10);
  });
  it("has the consumables at every size", () => {
    expect(CONSUMABLE_DATA.map(c => c.name)).toEqual(expect.arrayContaining(["Lesser Vitadrink", "Vitadrink", "Supreme Sage Water", "Greater Hetap", "Senzu Bean", "Premium Bento Box"]));
    expect(byName(CONSUMABLE_DATA, "Greater Hetap")).toMatchObject({ zeni: 120, restore: { stamina: "2d8+3" }, exhaustionAfterFirst: 3 });
  });
  it("has the rules entries", () => {
    const sec = (s) => GEAR_RULES.filter(r => r.section === s).map(r => r.name);
    expect(sec("Enchantments")).toHaveLength(21);
    expect(sec("Scientific Marvels")).toEqual(["Control Band", "Dragon Radar", "EX Band", "Energy Theft Device", "Healing Pod", "Hero’s Watch", "Micro Band", "Poi Capsule"]);
    expect(sec("Vehicles")).toHaveLength(19);
    expect(byName(GEAR_RULES, "Dragon Radar")).toMatchObject({ zeni: 20000, rarity: "veryrare" });
    for (const r of GEAR_RULES) expect(r.text.length, r.name).toBeGreaterThan(40);
  });
});

describe("store and inventory", () => {
  it("stocks the new groups and buys a weapon ready to swing", () => {
    const cat = buildStoreCatalog([]);
    const groups = new Set(cat.map(i => i.storeGroup));
    for (const g of ["Weapons", "Consumables", "Adventuring Gear", "Tools", "Technology"]) expect(groups.has(g), g).toBe(true);
    const item = normalizeItem(purchaseItemFromCatalog(cat.find(i => i.name === "Longsword")));
    expect(item).toMatchObject({ slot: "held", damageDice: "1d8", damageType: "Slashing", properties: "Versatile (1d10)", mastery: "Sap" });
    expect(equipmentCatalog([]).some(e => e.name === "Senzu Bean")).toBe(true);
  });
});

describe("consumables", () => {
  const seq = (...v) => { let i = 0; return () => v[i++ % v.length]; };
  it("rolls amounts", () => {
    expect(rollAmount("2d6+4", seq(0, 0.99)).total).toBe(1 + 6 + 4);
  });
  it("heals, uses one up and caps at the maximum", () => {
    const vita = { id: "v", ...byName(CONSUMABLE_DATA, "Vitadrink"), qty: 2 };
    const char = { hp: 10, maxHp: 30, items: [vita] };
    const r = consumeItem(char, vita, seq(0.99));
    expect(r.patch.hp).toBe(26);   // 6 + 6 + 4
    expect(r.patch.items[0].qty).toBe(1);
    expect(consumeItem({ hp: 28, maxHp: 30, items: [vita] }, vita, seq(0.99)).patch.hp).toBe(30);
  });
  it("adds Exhaustion for a second Hetap and limits Bento Boxes", () => {
    const het = { id: "h", ...byName(CONSUMABLE_DATA, "Hetap"), qty: 3 };
    const first = consumeItem({ stamina: 0, maxStamina: 10, items: [het] }, het, seq(0));
    expect(first.patch.vitals).toBeUndefined();
    const second = consumeItem({ stamina: 0, maxStamina: 10, items: [het], consumablesUsed: first.patch.consumablesUsed }, het, seq(0));
    expect(second.patch.vitals.exhaustion).toBe(2);
    const bento = { id: "b", ...byName(CONSUMABLE_DATA, "Premium Bento Box"), qty: 2 };
    expect(consumeItem({ items: [bento], consumablesUsed: { "Premium Bento Box": 1 } }, bento).ok).toBe(false);
  });
  it("a Senzu Bean restores everything and the last one leaves the bag", () => {
    const senzu = { id: "s", ...byName(CONSUMABLE_DATA, "Senzu Bean"), qty: 1 };
    const r = consumeItem({ hp: 1, maxHp: 50, ki: 0, maxKi: 80, stamina: 0, maxStamina: 9, vitals: { exhaustion: 3 }, items: [senzu] }, senzu);
    expect([r.patch.hp, r.patch.ki, r.patch.stamina, r.patch.vitals.exhaustion]).toEqual([50, 80, 9, 0]);
    expect(r.patch.items).toEqual([]);
  });
});
