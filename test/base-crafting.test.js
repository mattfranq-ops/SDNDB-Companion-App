import { describe, expect, it } from "vitest";
import { baseBonuses, effectiveDefenses, damageStructure, restBonusPatch } from "../renderer/engine/base.js";
import {
  craftCost, craftPriceShare, enchantCost, enchantPatch, enchantTierOf, gatherDiscount,
  goalType, gravityTraining, mealPatch, spendDowntime, toolkitFor, COOKING_TIERS,
} from "../renderer/engine/crafting.js";
import {
  addMod, damageVehicle, dingsFor, repairCost, repairVehicle, tierUpItem, tierUpTarget,
  vehicleCombatant, vehicleStats, VEHICLE_RULES, parseVehicle,
} from "../renderer/engine/vehicles.js";
import { healInjuryPatch } from "../renderer/engine/injuries.js";

const base = (home, ship = [], partyAt = "home") => ({ partyAt, home: { facilities: home }, ship: { facilities: ship } });

describe("base bonuses", () => {
  it("only facilities where the party is count, but the home economy works anywhere", () => {
    const b = base([{ type: "workshop", level: 2 }, { type: "market", level: 3 }], [{ type: "reactor", level: 1 }], "ship");
    const out = baseBonuses(b);
    expect(out.shortRestKiPct).toBe(25);
    expect(out.craftDiscount).toBeUndefined();
    expect(out.storeDiscount).toBe(15);
  });
  it("is empty with base building off", () => {
    expect(baseBonuses(base([{ type: "workshop", level: 3 }]), { enabled: false }).craftCheck).toBeUndefined();
  });
  it("takes the cheapest repair share and stacks Training Boons", () => {
    const out = baseBonuses(base([{ type: "hangar", level: 2 }, { type: "workshop", level: 3 }, { type: "gravity", level: 3 }, { type: "training", level: 1 }]));
    expect(out.dingRepairPct).toBe(50);
    expect(out.trainingBoons).toBe(3);
  });
  it("adds shield generators and defense grids to defenses", () => {
    const f = [{ type: "shieldgen", level: 2 }, { type: "defense", level: 3 }];
    const d = effectiveDefenses({ maxSi: 80, maxShields: 40, hardness: 5 }, f);
    expect(d).toMatchObject({ maxShields: 80, hardness: 11 });
    expect(d.turret.dice).toBe("8d10");
    const hit = damageStructure({ maxSi: 80, maxShields: 40, hardness: 5, shields: 10, si: 80 }, f, 31);
    expect(hit).toMatchObject({ blocked: 11, shields: 0, si: 70 });
  });
  it("Med Bay and Ki Reactor change rests", () => {
    const b = baseBonuses(base([{ type: "medbay", level: 3 }, { type: "reactor", level: 3 }]));
    const char = { maxKi: 100, ki: 0, hitDiceUsed: 5, vitals: { exhaustion: 4 }, maxHp: 50,
      injuries: [{ id: "a", name: "Broken Ribs", location: "torso", serious: true }] };
    const s = restBonusPatch(char, b, "short");
    expect(s.patch.ki).toBe(100);
    const l = restBonusPatch(char, b, "long", { kiRank: 3, heal: healInjuryPatch });
    expect(l.patch.hitDiceUsed).toBe(0);
    expect(l.patch.vitals.exhaustion).toBe(1);
    expect(l.patch.temp.ki).toBe(15);
    expect(l.patch.injuries.length).toBe(0);
  });
});

describe("crafting", () => {
  it("follows the book's price share", () => {
    expect(craftPriceShare(14)).toBeNull();
    expect(craftPriceShare(15)).toBe(0.85);
    expect(craftPriceShare(25)).toBeCloseTo(0.75);
    expect(craftPriceShare(60)).toBe(0.5);
  });
  it("gathered materials and the workshop lower the cost, with floors", () => {
    expect(gatherDiscount(14)).toBe(0);
    expect(gatherDiscount(20, 15, 5)).toBeCloseTo(0.25);
    expect(craftCost(1000, { share: 0.85 }).zeni).toBe(850);
    expect(craftCost(1000, { share: 0.85, gathered: 0.3 }).zeni).toBe(700);
    expect(craftCost(1000, { share: 0.5, gathered: 0.55, facilityPct: 15 }).zeni).toBe(400);
  });
  it("picks the book toolkit", () => {
    expect(toolkitFor({ name: "Heavy Battle Armor", slot: "body", category: "Armor", acBase: 16 })).toBe("Smith's Tools");
    expect(toolkitFor({ name: "Light Battle Armor", slot: "body", category: "Armor", acBase: 12 })).toBe("Leatherworker's Tools");
    expect(toolkitFor({ category: "Vehicle" })).toBe("Engineer's Kit");
    expect(goalType({ damageDice: "1d8" })).toBe("Weapon");
  });
  it("spends Downtime Points", () => {
    expect(spendDowntime({ downtimePoints: 1 }, "invent")).toBeNull();
    expect(spendDowntime({ downtimePoints: 3 }, "invent")).toEqual({ downtimePoints: 1 });
  });
  it("enchants and improves", () => {
    const sword = { name: "Longsword", category: "Weapon", rarity: "common" };
    expect(enchantCost(sword, 2)).toBe(20000);
    expect(enchantCost({ ...sword, category: "Technology" }, 0)).toBe(800);
    const p = enchantPatch(sword, 1, "Aegis");
    expect(p).toMatchObject({ magicBonus: 1, rarity: "uncommon", enchantments: [{ name: "Aegis", level: 1 }] });
    const up = { ...sword, ...p };
    expect(enchantTierOf(up)).toBe(1);
    expect(enchantCost(up, 2, { improve: true })).toBe(10000);
    expect(enchantPatch(up, 2).enchantments[0].level).toBe(2);
  });
  it("trains gravity up to the chamber and feeds the party", () => {
    expect(gravityTraining(10, 14, 50)).toBe(10);
    expect(gravityTraining(10, 21, 50)).toBe(20);
    expect(gravityTraining(45, 30, 50)).toBe(50);
    expect(mealPatch({ temp: { hp: 40 } }, COOKING_TIERS[1]).temp).toEqual({ hp: 40, ki: 15, stamina: 2 });
  });
});

describe("vehicles", () => {
  it("parses every vehicle and mech statblock", () => {
    for (const r of VEHICLE_RULES) {
      const v = parseVehicle(r);
      expect(v.maxHp).toBeGreaterThan(1);
      expect(v.ac).toBeGreaterThanOrEqual(10);
    }
  });
  it("takes damage, Dings, repairs and upgrades", () => {
    let car = { id: "c1", name: "Car", catalogId: "gear_car" };
    expect(vehicleStats(car)).toMatchObject({ ac: 12, maxHp: 40, hp: 40, dings: 0 });
    car = { ...car, vehicle: damageVehicle(car, 21) };
    const s = vehicleStats(car);
    expect(s.dings).toBe(2);
    expect(repairCost(s)).toBe(50);
    expect(repairCost(s, 50)).toBe(25);
    expect(vehicleStats({ ...car, vehicle: repairVehicle(car) }).hp).toBe(40);
    car = { ...car, vehicle: addMod(car, "frame") };
    expect(vehicleStats(car)).toMatchObject({ maxHp: 50, hp: 29 });
    car = { ...car, vehicle: addMod(car, "plating") };
    expect(vehicleStats(car).ac).toBe(13);
    expect(dingsFor(0, 40)).toBe(4);
  });
  it("tiers up a mech for 25% of the next tier", () => {
    const mech = { id: "m", name: "Tier 1 Mech", catalogId: "gear_tier_1_mech" };
    expect(tierUpTarget(mech).zeni).toBe(625);
    const up = tierUpItem(mech);
    expect(up).toMatchObject({ name: "Tier 2 Mech", catalogId: "gear_tier_2_mech" });
    expect(vehicleStats(up).hp).toBe(160);
  });
  it("deploys onto the tracker linked to its owner", () => {
    const row = vehicleCombatant({ id: "c1", name: "Car", catalogId: "gear_car", vehicle: { mods: { shield: 1 } } }, { id: "p1", name: "Bulma" }, { id: "r1" });
    expect(row).toMatchObject({ id: "r1", name: "Car (Bulma)", hp: 40, ac: 12, sourceType: "vehicle", vehicleOwnerId: "p1", temp: { hp: 8 } });
  });
});

describe("a deployed vehicle in the tracker", () => {
  it("keeps tracker damage on the owner's item", async () => {
    const mem = {};
    globalThis.window = { storage: {
      get: async (k) => { if (!(k in mem)) throw new Error("missing"); return { value: mem[k] }; },
      set: async (k, v) => { mem[k] = v; }, delete: async (k) => { delete mem[k]; },
    } };
    const car = { id: "car1", catalogId: "gear_car", name: "Car" };
    const owner = { id: "p1", name: "Bulma", items: [car] };
    mem.characters_v2 = JSON.stringify([owner]);
    mem.session_combat = JSON.stringify([{ round: 1, turn: 0, combatants: [vehicleCombatant(car, owner, { id: "r1" })] }]);
    const { applyToCombatant } = await import("../renderer/features/session/apply.js");
    const out = await applyToCombatant("r1", { kind: "damage", amount: 15 });
    expect(out.ok).toBe(true);
    const item = JSON.parse(mem.characters_v2)[0].items[0];
    expect(item.vehicle.hp).toBe(25);
    expect(vehicleStats(item).dings).toBe(1);
    delete globalThis.window;
  });
});
