// Technique charges, hit-location DR, lifepath tables, and Duplicate / Print.
import { describe, it, expect } from "vitest";
import { chargeState, spendCharge, chargesResetPatch } from "../renderer/engine/charges.js";
import { computeArmorDR, coversLocation } from "../renderer/engine/equipment.js";
import { LIFEPATH_TABLES, rollLifepath, rollLifepathField } from "../renderer/data/lifepath-data.js";
import { characterPrintHtml, duplicateChar } from "../renderer/features/characters/print-sheet.js";

const tech = (uid, charges) => ({ uid, name: uid, charges });

describe("technique charges", () => {
  it("ignores techniques without uses", () => {
    expect(chargeState(tech("a"))).toBe(null);
    const r = spendCharge([tech("a")], "a");
    expect(r).toMatchObject({ ok: true, left: null });
  });
  it("spends one use and stops at zero", () => {
    let list = [tech("a", { max: 2, used: 0, reset: "long" })];
    let r = spendCharge(list, "a");
    expect(r.left).toBe(1);
    r = spendCharge(r.techniques, "a");
    expect(r.left).toBe(0);
    const out = spendCharge(r.techniques, "a");
    expect(out.ok).toBe(false);
    expect(out.techniques).toBe(r.techniques);
  });
  it("refills by reset kind, wider events covering narrower ones", () => {
    const char = { techniques: [
      tech("t", { max: 1, used: 1, reset: "turn" }),
      tech("e", { max: 1, used: 1, reset: "encounter" }),
      tech("s", { max: 1, used: 1, reset: "short" }),
      tech("l", { max: 1, used: 1, reset: "long" }),
      tech("m", { max: 1, used: 1, reset: "manual" }),
    ] };
    const used = (patch) => Object.fromEntries(patch.techniques.map(t => [t.uid, t.charges.used]));
    expect(used(chargesResetPatch(char, "turn"))).toEqual({ t: 0, e: 1, s: 1, l: 1, m: 1 });
    expect(used(chargesResetPatch(char, "encounter"))).toEqual({ t: 0, e: 0, s: 1, l: 1, m: 1 });
    expect(used(chargesResetPatch(char, "short"))).toEqual({ t: 0, e: 0, s: 0, l: 1, m: 1 });
    expect(used(chargesResetPatch(char, "long"))).toEqual({ t: 0, e: 0, s: 0, l: 0, m: 1 });
  });
  it("returns null when nothing needs refilling", () => {
    expect(chargesResetPatch({ techniques: [tech("a", { max: 2, used: 0, reset: "long" })] }, "long")).toBe(null);
  });
});

describe("hit-location DR", () => {
  const char = {
    items: [
      { id: "helm", name: "Helmet", dr: 1 },
      { id: "armor", name: "Heavy Battle Armor", dr: 3 },
      { id: "ring", name: "Ring of Guarding", dr: 1 },
    ],
    equipment: { head: "helm", body: "armor", ring1: "ring" },
  };
  it("counts everything with no location (book rule)", () => {
    expect(computeArmorDR(char)).toBe(5);
    expect(computeArmorDR(char, "any")).toBe(5);
  });
  it("only counts what covers the spot, plus unlocated gear", () => {
    expect(computeArmorDR(char, "head")).toBe(2);
    expect(computeArmorDR(char, "body")).toBe(4);
    expect(computeArmorDR(char, "legs")).toBe(1);
  });
  it("treats rings, neck and held items as covering everywhere", () => {
    for (const slot of ["ring1", "neck", "hand1", "artifact"]) expect(coversLocation(slot, "arms")).toBe(true);
    expect(coversLocation("body", "head")).toBe(false);
  });
});

describe("lifepath tables", () => {
  it("rolls every field from its table", () => {
    const lp = rollLifepath(() => 0);
    for (const t of LIFEPATH_TABLES) expect(lp[t.key]).toBe(t.entries[0]);
  });
  it("rerolls to a different entry", () => {
    const first = LIFEPATH_TABLES[0];
    expect(rollLifepathField(first.key, first.entries[0], () => 0)).toBe(first.entries[1]);
  });
});

describe("duplicate and print", () => {
  const char = { id: "c1", name: "Kael", techniques: [{ uid: "x", name: "Kamehameha <beam>" }], lifepath: { drive: "Revenge" }, archived: true };
  it("copies with a new id and name, unarchived, without sharing objects", () => {
    const copy = duplicateChar(char);
    expect(copy.id).not.toBe("c1");
    expect(copy.name).toBe("Kael (copy)");
    expect(copy.archived).toBe(false);
    copy.techniques[0].name = "changed";
    expect(char.techniques[0].name).toBe("Kamehameha <beam>");
  });
  it("prints an escaped sheet with the lifepath", () => {
    const html = characterPrintHtml(char);
    expect(html).toContain("Kamehameha &lt;beam&gt;");
    expect(html).toContain("Revenge");
  });
});
