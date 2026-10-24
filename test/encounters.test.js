import { describe, it, expect } from "vitest";
import { ANTAGONIST_DATA } from "../renderer/data/npc-data.js";
import { rollModBonus } from "../renderer/engine/conditions.js";
import { partySummary, partyTier, rollEncounter, threatCost } from "../renderer/engine/encounters.js";

// Small deterministic generator so rolls repeat.
const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

describe("random encounters", () => {
  it("maps party level to the antagonist tier", () => {
    expect(partyTier(1)).toBe(1);
    expect(partyTier(9)).toBe(5);
    expect(partyTier(20)).toBe(10);
  });
  it("prices tiers and levels", () => {
    expect(threatCost({ tier: "General", antagonistLevel: 3 }, 3)).toBe(1);
    expect(threatCost({ tier: "Elite", antagonistLevel: 3 }, 3)).toBe(2);
    expect(threatCost({ tier: "General", antagonistLevel: 5 }, 3)).toBe(1.5);
  });
  it("stays within budget and the body limit", () => {
    for (let s = 1; s < 40; s++) {
      for (const difficulty of ["easy", "standard", "hard", "deadly"]) {
        const r = rollEncounter(ANTAGONIST_DATA, { size: 4, avgLevel: 6, difficulty }, seeded(s));
        const bodies = r.picks.reduce((n, p) => n + p.qty, 0);
        expect(bodies).toBeGreaterThan(0);
        expect(bodies).toBeLessThanOrEqual(8);
        if (bodies > 1) expect(r.spent).toBeLessThanOrEqual(r.budget);
      }
    }
  });
  it("leads Hard fights with an Elite or Iconic", () => {
    const r = rollEncounter(ANTAGONIST_DATA, { size: 4, avgLevel: 8, difficulty: "deadly" }, seeded(7));
    expect(["Elite", "Iconic"]).toContain(r.picks[0].book.tier);
  });
  it("honours the saga filter and reports no match", () => {
    const saga = ANTAGONIST_DATA[0].saga;
    const r = rollEncounter(ANTAGONIST_DATA, { size: 3, avgLevel: 2, saga }, seeded(3));
    expect(r.picks.every(p => p.book.saga === saga)).toBe(true);
    expect(rollEncounter(ANTAGONIST_DATA, { saga: "Nope" }).picks).toEqual([]);
  });
  it("reads the party from the saved characters", () => {
    const c = (level) => ({ level, classes: [{ classId: "Warrior", level }] });
    expect(partySummary([c(4), c(6), { ...c(20), archived: true }])).toEqual({ size: 2, avgLevel: 5 });
    expect(partySummary([])).toEqual({ size: 4, avgLevel: 1 });
  });
});

// Not an encounter rule, but it shares the table-tools file.
describe("saved roll modifiers", () => {
  const char = { rollMods: [
    { name: "Bless", value: 2, appliesTo: "attack", on: true },
    { name: "Cursed", value: -1, appliesTo: "all", on: true },
    { name: "Rage", value: 3, appliesTo: "damage", on: true },
    { name: "Off", value: 5, appliesTo: "attack", on: false },
  ] };
  it("adds the ones switched on that match the roll", () => {
    expect(rollModBonus(char, "attack").total).toBe(1);
    expect(rollModBonus(char, "save").total).toBe(-1);
    expect(rollModBonus(char, "damage")).toEqual({ total: 3, names: ["Rage"] });
    expect(rollModBonus({}, "attack").total).toBe(0);
  });
});
