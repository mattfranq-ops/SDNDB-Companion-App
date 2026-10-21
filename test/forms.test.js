// Forms from the 5.0 book (Ch.6) and the rules that run them.
import { describe, it, expect } from "vitest";
import { FORM_DATA, FORM_MOD_DATA } from "../renderer/data/form-data.js";
import { activeFormPower, activeFormUpkeep, activeFormHpUpkeep, stablePower } from "../renderer/engine/core.js";
import { awakenCheck, evalAmount, formAwakenLimit, formFromBook, rampUpCheck, ascendCost } from "../renderer/engine/forms.js";

let n = 0;
const id = () => `id${n++}`;
const book = (name) => FORM_DATA.find(f => f.name === name);
const fromBook = (name) => formFromBook(book(name), FORM_MOD_DATA, id);
// Level 10 Saiyan: Ki Rank 3, Proficiency +6.
const fighter = (forms, extra = {}) => ({ level: 10, classes: [{ classId: "Warrior", level: 10 }], species: "Saiyan", ki: 200, stamina: 20, forms, ...extra });

describe("form data", () => {
  it("has every form with its stat lines", () => {
    expect(FORM_DATA.length).toBeGreaterThanOrEqual(56);
    expect(FORM_MOD_DATA.length).toBeGreaterThanOrEqual(58);
    for (const f of FORM_DATA) {
      expect(f.text, f.name).toBeTruthy();
      if (f.name !== "Ritual Super Saiyan God") expect(f.awaken, f.name).not.toBeNull();
    }
    const ss = book("Super Saiyan");
    expect([ss.power, ss.awaken, ss.upkeep, ss.family, ss.kind]).toEqual([2, "16", "8", "Super Saiyan", "Transformation"]);
    const ssg = book("Super Saiyan God");
    expect(ssg.godly).toBe(true);
    expect(ssg.costToAscend).toBe("4 Stamina");
  });
  it("attaches each form's modifications", () => {
    const kk = fromBook("Kaio-Ken!");
    expect(kk.modifications.map(m => m.name)).toContain("Kaio-Ken x20!");
    expect(fromBook("Super Saiyan").modifications.some(m => m.name === "Super Saiyan 3")).toBe(true);
  });
});

describe("formulas", () => {
  it("reads the book's amounts", () => {
    expect(evalAmount("3 x Ki Rank", { kiRank: 3 })).toBe(9);
    expect(evalAmount("5 x (2 + your Ki Rank)", { kiRank: 2 })).toBe(20);
    expect(evalAmount("2x the Ki Upkeep", { upkeep: 6 })).toBe(12);
    expect(evalAmount("Minimum 4")).toBe(4);
    expect(evalAmount("half Proficiency", { prof: 5 })).toBe(3);
    expect(evalAmount("something else")).toBeNull();
  });
});

describe("power and upkeep", () => {
  it("scales Combat Mode with Ki Rank", () => {
    const f = { ...fromBook("Combat Mode"), active: true };
    const c = fighter([f]);
    expect(activeFormPower(c)).toBe(3);
    expect(activeFormUpkeep(c)).toBe(9);
  });
  it("counts Variable Form Upkeep, capped", () => {
    // Overclock: +1 per 3 Ki, capped at half Proficiency rounded up (+6 → 3).
    const f = { ...fromBook("Overclock"), active: true, upkeepChoice: 15 };
    expect(activeFormPower(fighter([f]))).toBe(3);
    expect(activeFormUpkeep(fighter([f]))).toBe(15);
    // Below the minimum, the minimum is paid.
    expect(activeFormUpkeep(fighter([{ ...f, upkeepChoice: 1 }]))).toBe(3);
  });
  it("adds active modifications and HP upkeep", () => {
    const f = fromBook("Kaio-Ken!");
    f.active = true;
    f.modifications = f.modifications.map(m => ({ ...m, active: m.name === "Kaio-Ken x20!" }));
    const c = fighter([f]);
    expect(activeFormPower(c)).toBe(2);       // 1 + 1
    expect(activeFormHpUpkeep(c)).toBe(6);    // 1 + 5
  });
  it("keeps Stable Power out of Overload", () => {
    const f = { ...fromBook("Controlled Energy Released"), active: true, upkeepChoice: 12 };
    expect(stablePower(fighter([f]))).toBe(3);
  });
  it("makes Super Saiyan's Power stable with Grade 4", () => {
    const ss = { ...fromBook("Super Saiyan"), active: true };
    ss.modifications = ss.modifications.map(m => ({ ...m, active: m.name === "Super Saiyan Grade 4" }));
    expect(stablePower(fighter([ss]))).toBe(2);
  });
  it("still reads hand-made forms", () => {
    const c = fighter([{ id: "h", name: "Custom", active: true, powerBonus: 3, upkeepCost: 5, modifications: [{ active: true, powerBonus: 1, upkeepIncrease: 2 }] }]);
    expect(activeFormPower(c)).toBe(4);
    expect(activeFormUpkeep(c)).toBe(7);
  });
});

describe("Awaken, Ascend and Ramp Up", () => {
  const ctx = { kiRank: 3, prof: 6 };
  it("needs more Ki than the Awaken Limit", () => {
    const ss = fromBook("Super Saiyan");
    expect(awakenCheck(fighter([ss], { ki: 16 }), ss, ctx).ok).toBe(false);
    expect(awakenCheck(fighter([ss], { ki: 17 }), ss, ctx).ok).toBe(true);
  });
  it("adds modification limits", () => {
    const ss = fromBook("Super Saiyan");
    const ss3 = ss.modifications.find(m => m.name === "Super Saiyan 3");
    expect(formAwakenLimit(ss, ctx, [ss3])).toBe(46);
  });
  it("allows one Transformation and one Power-Up, never two of a Family", () => {
    const ss = { ...fromBook("Super Saiyan"), active: true };
    const ape = fromBook("Great Ape");
    const spirit = fromBook("Saiyan Spirit");
    expect(awakenCheck(fighter([ss, ape]), ape, ctx).reason).toMatch(/Transformation slot/);
    expect(awakenCheck(fighter([ss, spirit]), spirit, ctx).ok).toBe(true);
    const wrath = fromBook("Oozaru’s Wrath");
    const apeOn = { ...ape, active: true };
    expect(awakenCheck(fighter([apeOn, wrath]), wrath, ctx).reason).toMatch(/Family/);
  });
  it("charges Stamina to Ascend into a God Form", () => {
    const ssg = fromBook("Super Saiyan God");
    expect(ascendCost(ssg, ctx)).toBe(4);
    expect(awakenCheck(fighter([ssg], { stamina: 3 }), ssg, ctx).reason).toMatch(/Stamina/);
  });
  it("Ramp Up swaps a modification for the difference in Upkeep", () => {
    const ss = { ...fromBook("Super Saiyan"), active: true };
    ss.modifications = ss.modifications.map(m => ({ ...m, active: m.name === "Super Saiyan Grade 2" }));
    const ss3 = ss.modifications.find(m => m.name === "Super Saiyan 3");
    const r = rampUpCheck(fighter([ss]), ss, ss3, ctx);
    expect(r.ok).toBe(true);
    expect(r.cost).toBe(8);   // 10 − 2
    expect(r.swapFrom).toHaveLength(1);
  });
});
