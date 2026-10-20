// Rules for taking damage, healing, spending and Death Saves (5.0 Ch.1).
import { describe, it, expect } from "vitest";
import {
  resolveDamage, damagePatch, healPatch, spendPatch, grantTempPatch, deathSave,
  overloadDamage, healthState, cappedArmorDR, drCap,
} from "../renderer/engine/damage.js";

describe("resolveDamage", () => {
  it("takes DR off before resistance", () => {
    // 20 − 4 DR = 16, resisted → 8 (not 20 → 10 − 4 = 6).
    expect(resolveDamage(20, { dr: 4, resist: "resist" }).damage).toBe(8);
  });
  it("lets Destruction Damage through untouched", () => {
    expect(resolveDamage(20, { dr: 10, resist: "resist", saved: true, block: true, destruction: true }).damage).toBe(20);
  });
  it("respects DR the attacker ignores", () => {
    expect(resolveDamage(10, { dr: 3, ignoreDR: 2 }).damage).toBe(9);
    expect(resolveDamage(10, { dr: 3, ignoreDR: 5 }).damage).toBe(10);
  });
  it("halves for a save and again for Block, rounding down", () => {
    expect(resolveDamage(23, { saved: true }).damage).toBe(11);
    expect(resolveDamage(23, { saved: true, block: true }).damage).toBe(5);
  });
  it("turns a halved save into nothing with Wild Sense", () => {
    expect(resolveDamage(30, { saved: true, wildSense: true }).damage).toBe(0);
    expect(resolveDamage(30, { wildSense: true }).damage).toBe(30);
  });
  it("never goes below zero", () => {
    expect(resolveDamage(3, { dr: 8 }).damage).toBe(0);
  });
});

describe("damagePatch", () => {
  it("spends Temporary HP first", () => {
    const { patch, fromTemp } = damagePatch({ hp: 30, temp: { hp: 5, ki: 0, stamina: 0 } }, 8);
    expect(fromTemp).toBe(5);
    expect(patch).toEqual({ hp: 27, temp: { hp: 0, ki: 0, stamina: 0 } });
  });
  it("adds two Death Save failures when hit at 0 HP", () => {
    const { patch } = damagePatch({ hp: 0, deathSaves: { success: 2, fail: 0 }, stable: true }, 1);
    expect(patch.deathSaves).toEqual({ success: 2, fail: 2 });
    expect(patch.stable).toBe(false);
    expect(patch.dead).toBeUndefined();
  });
  it("kills on the third failure", () => {
    expect(damagePatch({ hp: 0, deathSaves: { success: 0, fail: 2 } }, 4).patch.dead).toBe(true);
  });
  it("can take Ki Damage", () => {
    expect(damagePatch({ ki: 40, temp: { hp: 0, ki: 10, stamina: 0 } }, 25, "ki").patch).toEqual({ ki: 25, temp: { hp: 0, ki: 0, stamina: 0 } });
  });
});

describe("healing and spending", () => {
  it("caps healing at max and resets Death Saves when back above 0", () => {
    expect(healPatch({ hp: 0, maxHp: 20, deathSaves: { success: 1, fail: 2 } }, 50).patch).toEqual({ hp: 20, deathSaves: { success: 0, fail: 0 }, stable: false });
  });
  it("doesn't heal the dead", () => {
    expect(healPatch({ hp: 0, maxHp: 20, dead: true }, 5).gained).toBe(0);
  });
  it("spends Temporary points first, and refuses when short", () => {
    expect(spendPatch({ ki: 10, temp: { hp: 0, ki: 4, stamina: 0 } }, "ki", 6)).toEqual({ ki: 8, temp: { hp: 0, ki: 0, stamina: 0 } });
    expect(spendPatch({ ki: 2, temp: { hp: 0, ki: 1, stamina: 0 } }, "ki", 6)).toBeNull();
  });
  it("replaces Temporary points instead of stacking them", () => {
    expect(grantTempPatch({ temp: { hp: 9, ki: 0, stamina: 0 } }, "hp", 5).temp.hp).toBe(5);
  });
});

describe("deathSave", () => {
  const unstable = { hp: 0, deathSaves: { success: 0, fail: 0 } };
  it("is a flat DC 10", () => {
    expect(deathSave(unstable, 10).outcome).toBe("success");
    expect(deathSave(unstable, 9).outcome).toBe("fail");
  });
  it("counts a natural 1 as two failures", () => {
    expect(deathSave(unstable, 1).patch.deathSaves.fail).toBe(2);
  });
  it("brings you back at 1 HP on a natural 20", () => {
    expect(deathSave(unstable, 20).patch.hp).toBe(1);
  });
  it("makes you Stable at 0 HP on the third success, not conscious", () => {
    const r = deathSave({ hp: 0, deathSaves: { success: 2, fail: 1 } }, 15);
    expect(r.outcome).toBe("stable");
    expect(r.patch.stable).toBe(true);
    expect(r.patch.hp).toBeUndefined();
  });
  it("kills on the third failure", () => {
    expect(deathSave({ hp: 0, deathSaves: { success: 0, fail: 2 } }, 5).outcome).toBe("dead");
  });
});

describe("overloadDamage", () => {
  const max = (n) => n; // every die rolls its maximum
  it("follows the Overload Chart", () => {
    expect([1, 2, 3, 4, 5, 6].map(o => overloadDamage(o, max))).toEqual([2, 4, 6, 8, 10, 12]);
  });
  it("adds 1d6 for each point above 6", () => {
    expect(overloadDamage(7, max)).toBe(18);
    expect(overloadDamage(9, max)).toBe(30);
  });
});

describe("health and DR cap", () => {
  it("marks Bloodied at half and Critical at a quarter", () => {
    expect(healthState(50, 100)).toBe("bloodied");
    expect(healthState(25, 100)).toBe("critical");
    expect(healthState(0, 100)).toBe("down");
    expect(healthState(51, 100)).toBeNull();
  });
  it("caps armor DR at Proficiency Bonus + 1", () => {
    const lv1 = { level: 1, classes: [{ classId: "Bruiser", level: 1 }], drOverride: true, dr: 9 };
    // SDNDB's Proficiency Bonus starts at +3, so the cap is 4 at level 1.
    expect(drCap(lv1)).toBe(4);
    expect(cappedArmorDR(lv1)).toBe(4);
  });
});

import { findCondition, defaultRounds, kiFluxResult, exhaustionPenalty, inKiExhaustion, CONDITION_LIBRARY } from "../renderer/engine/conditions.js";

describe("conditions", () => {
  it("has every 5.0 condition from the Ch.1 list", () => {
    const book = ["Boosted (Body)", "Bulk", "Enraged", "Dead", "Gigantification", "Hyper Mode", "Rescaled (Maxi)", "Rescaled (Mini)",
      "Weighted (Light)", "Weighted (Heavy)", "Altered (Older)", "Altered (Younger)", "Barrier Strain", "Berserk", "Impaled", "Ki-Flux",
      "Pinned", "Reactively Charged", "Suspended", "Wounded", "Crippled", "Dazed", "Disabled", "Embedded", "Frozen in Time"];
    for (const n of book) expect(findCondition(n), n).toBeTruthy();
    expect(new Set(CONDITION_LIBRARY.map(c => c.name)).size).toBe(CONDITION_LIBRARY.length);
  });
  it("fills in the book's durations", () => {
    expect(defaultRounds(findCondition("hyper mode"), { kiRank: 3 })).toBe(6);
    expect(defaultRounds(findCondition("Embedded"), { inflicterRank: 2 })).toBe(3);
    expect(defaultRounds(findCondition("Disabled"))).toBe(10);
    expect(defaultRounds(findCondition("Pinned"))).toBeNull();
  });
  it("reads the Ki-Flux table", () => {
    expect(kiFluxResult(2, 3)).toMatch(/\+9 Ki/);
    expect(kiFluxResult(4)).toMatch(/Con save/);
    expect(kiFluxResult(6)).toMatch(/Minor/);
  });
  it("applies Exhaustion and Ki Exhaustion", () => {
    expect(exhaustionPenalty({ vitals: { exhaustion: 3 } })).toBe(-6);
    expect(inKiExhaustion({ ki: 0, maxKi: 30, temp: { ki: 0 } })).toBe(true);
    expect(inKiExhaustion({ ki: 0, maxKi: 30, temp: { ki: 5 } })).toBe(false);
  });
});
