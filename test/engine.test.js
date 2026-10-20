// Characterization tests for the rules engine. These pin the numbers the sheet
// shows today, so refactors (and future rules work) can't silently change them.
// When a rule change is intentional, update the snapshot with `npm test -- -u`
// and review the diff like any other code change.
import { describe, it, expect } from "vitest";
import { migrateChar, PREGEN_CHARS } from "../renderer/features/characters/model.js";
import {
  profBonusForLevel, kiRankForLevel, computeKiRank, computeMaxStamina, effectiveStats,
  effectivePowerBonus, abilityMod,
} from "../renderer/engine/core.js";
import { computeAC, computeArmorDR } from "../renderer/engine/equipment.js";
import {
  computeCarryWeight, computeOverload, computeKiRegen, computePassives, computeKili, computeBattlePower,
  techniquesKnownBudget, featsOwed, computeAttacksPerTurn,
} from "../renderer/engine/derived.js";
import { STAT_KEYS, ALL_SKILLS, computeSaveBonus, computeSkillBonus } from "../renderer/engine/skills.js";
import { spellStats } from "../renderer/engine/spellcasting.js";
import { classGrantedResources } from "../renderer/engine/resources.js";
import { CLASS_NAMES } from "../renderer/data/class-data.js";
import { antagonistDerived } from "../renderer/features/npcs/antagonist.jsx";
import { advanceTime } from "../renderer/features/session/time.jsx";

// Stable ids so snapshots don't churn on uid().
const stable = (c, i) => ({ ...c, id: `pc${i}` });

function sheet(char) {
  return {
    level: char.level,
    prof: profBonusForLevel(char.level),
    kiRank: computeKiRank(char),
    maxStamina: computeMaxStamina(char),
    stats: effectiveStats(char),
    power: effectivePowerBonus(char),
    ac: computeAC(char),
    dr: computeArmorDR(char),
    carry: computeCarryWeight(char),
    kili: computeKili(char),
    battlePower: computeBattlePower(char),
    overload: computeOverload(char),
    kiRegen: computeKiRegen(char),
    passives: computePassives(char),
    techniquesBudget: techniquesKnownBudget(char),
    featsOwed: featsOwed(char),
    attacksPerTurn: computeAttacksPerTurn(char),
    saves: Object.fromEntries(STAT_KEYS.map((k) => [k, computeSaveBonus(char, k)])),
    skills: Object.fromEntries(ALL_SKILLS.map((s) => [s, computeSkillBonus(char, s)])),
    spells: spellStats(char),
    resources: classGrantedResources(char).map(({ id, ...r }) => r),
  };
}

describe("core tables", () => {
  it("proficiency bonus by level", () => {
    expect([1, 4, 5, 8, 9, 12, 13, 16, 17, 20].map(profBonusForLevel)).toEqual([3, 4, 4, 5, 5, 6, 7, 8, 8, 9]);
  });
  it("ki rank by level", () => {
    expect([1, 4, 5, 9, 10, 14, 15, 20].map(kiRankForLevel)).toEqual([1, 1, 2, 2, 3, 3, 4, 4]);
  });
  it("ability modifiers", () => {
    expect([1, 8, 9, 10, 11, 12, 20, 30].map(abilityMod)).toEqual([-5, -1, -1, 0, 0, 1, 5, 10]);
  });
});

describe("pregenerated characters", () => {
  PREGEN_CHARS.forEach((p, i) => {
    it(`${p.name} derives the same sheet`, () => {
      expect(sheet(migrateChar(stable(p, i)))).toMatchSnapshot();
    });
  });
});

describe("every class at key levels", () => {
  for (const cls of CLASS_NAMES) {
    it(cls, () => {
      const rows = [1, 5, 10, 20].map((level) => {
        const c = migrateChar({
          id: `c-${cls}-${level}`, name: cls, classId: cls, species: "Saiyan", level,
          hp: 50, maxHp: 50, ki: 30, maxKi: 30,
          stats: { str: 14, dex: 14, con: 14, int: 12, wis: 12, cha: 10 },
        });
        const { skills, saves, stats, passives, ...core } = sheet(c);
        return core;
      });
      expect(rows).toMatchSnapshot();
    });
  }
});

describe("antagonists", () => {
  it("derived stat targets", () => {
    const out = {};
    for (const type of ["General", "Elite", "Iconic"]) out[type] = [1, 5, 10, 20].map((l) => antagonistDerived(type, l, 2, 1));
    expect(out).toMatchSnapshot();
  });
});

describe("session clock", () => {
  it("advances across day boundaries", () => {
    const t0 = { age: 762, month: 12, day: 30, minutes: 23 * 60, secs: 0 };
    expect(advanceTime(t0, 2 * 3600)).toMatchSnapshot();
  });
});
