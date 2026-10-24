// The 18 classes as printed in the 5.0 Beta (Ch.4), and the rules that read them.
import { describe, it, expect } from "vitest";
import { CLASS_DATA, CLASS_NAMES, classColumn, classFeature } from "../renderer/data/class-data.js";
import { CLASS_HIT_DICE, UNARMORED_DEFENSE_STAT } from "../renderer/engine/core.js";
import { classUnarmed, computeAttacksPerTurn } from "../renderer/engine/derived.js";
import { computeUnarmoredAC, classDefenseDR } from "../renderer/engine/spellcasting.js";
import { classGrantedResources, resourceRestPatch } from "../renderer/engine/resources.js";

const char = (classId, level, stats = {}) => ({
  level, classes: [{ classId, level }],
  stats: { str: 10, dex: 14, con: 10, int: 10, wis: 10, cha: 10, ...stats },
});

describe("class data", () => {
  it("has all 18 classes with 20 levels each", () => {
    expect(CLASS_NAMES).toHaveLength(18);
    for (const n of CLASS_NAMES) {
      const c = CLASS_DATA[n];
      expect(Object.keys(c.featuresByLevel), n).toHaveLength(20);
      for (const col of c.columns) expect(col.values, `${n} ${col.label}`).toHaveLength(20);
      expect(c.saves, n).toHaveLength(2);
    }
  });
  it("has rules text for every feature in every table", () => {
    for (const n of CLASS_NAMES) {
      for (const text of Object.values(CLASS_DATA[n].featuresByLevel)) {
        for (const t of text.split(",").map(s => s.trim())) {
          expect(classFeature(n, t)?.text, `${n}: ${t}`).toBeTruthy();
        }
      }
    }
  });
  it("matches the engine's hit dice and Unarmored Defense", () => {
    for (const n of CLASS_NAMES) {
      expect(CLASS_DATA[n].hitDie, n).toBe(CLASS_HIT_DICE[n]);
      expect(CLASS_DATA[n].unarmoredDefense, n).toBe(UNARMORED_DEFENSE_STAT[n]);
    }
  });
  it("reads the book's tables", () => {
    expect(CLASS_DATA.Bastion.featuresByLevel[2]).toBe("Defensive Energy, Valiant Defense");
    expect(CLASS_DATA.Bruiser.featuresByLevel[13]).toBe("Brutal Critical (2), Powerful Build");
    expect(classColumn("Agent", "Battery Points", 20)).toBe("54");
    expect(classColumn("Agent", "Battery Points", 4)).toBeNull();
    expect(classColumn("Elite", "Critical Blow", 19)).toBe("10d6");
    expect(CLASS_DATA.Agent.saves).toEqual(["int", "cha"]);
  });
  it("resolves features printed with a count", () => {
    expect(classFeature("Champion", "Quips (3)")).toBe(classFeature("Champion", "Quips"));
    expect(classFeature("Warrior", "Combat Maneuver").options.some(o => o.name === "Trip Attack")).toBe(true);
  });
});

describe("rules that read the class tables", () => {
  it("counts each Extra Attack in the table", () => {
    expect(computeAttacksPerTurn(char("Warrior", 4))).toBe(1);
    expect(computeAttacksPerTurn(char("Warrior", 11))).toBe(3);
    expect(computeAttacksPerTurn(char("Warrior", 20))).toBe(4);
    expect(computeAttacksPerTurn(char("Mystic", 20))).toBe(1);
  });
  it("adds half Proficiency, rounded up, to Unarmored Defense", () => {
    // Level 5: Prof +4. 10 + DEX 2 + CON 3 + 2.
    expect(computeUnarmoredAC(char("Bastion", 5, { con: 16 })).value).toBe(17);
    // Level 1: Prof +3, half rounded up is 2.
    expect(computeUnarmoredAC(char("Mystic", 1)).value).toBe(14);
    // Warrior adds the whole Proficiency Bonus.
    expect(computeUnarmoredAC(char("Warrior", 1)).value).toBe(15);
  });
  it("gives Magus and Mystic DR of Ki Rank + 1, halved in armor", () => {
    expect(classDefenseDR(char("Mystic", 5), false)).toBe(3);
    expect(classDefenseDR(char("Mystic", 5), true)).toBe(1);
    expect(classDefenseDR(char("Warrior", 5), false)).toBe(0);
  });
  it("takes Unarmed Strike and Ki Blast dice from the class table", () => {
    const u = classUnarmed(char("Bruiser", 17));
    expect(u.strikeDie).toBe("2d6");
    expect(u.blastDie).toBe("1d10");
    expect(classUnarmed(char("Agent", 1, { int: 18 })).strikeStat).toBe("int");
  });
  it("tracks the book's class pools", () => {
    const hero = classGrantedResources(char("Hero", 17)).find(r => r.key === "hero:hero-die");
    expect(hero.die).toBe("2d6");
    const soul = classGrantedResources(char("Bruiser", 7)).find(r => r.key === "bruiser:dragon-soul");
    expect(soul.max).toBe(4);
    expect(classGrantedResources(char("Warrior", 1)).length).toBe(0);
  });
  it("empties earned pools like Hype on a Long Rest", () => {
    const r = resourceRestPatch({ resources: [{ key: "champion:hype", reset: "earned", current: 3, max: 4 }] }, "long");
    expect(r.resources[0].current).toBe(0);
  });
});
