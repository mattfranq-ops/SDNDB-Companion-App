import { describe, it, expect } from "vitest";
import { CRIT_INJURIES, LINGERING_INJURIES, bodyMarks, healInjuryPatch, longRestInjuryPatch, partForLocation, rollBodyPart, rollCritInjury, rollLingeringInjury } from "../renderer/engine/injuries.js";

// rng that returns the given values in turn (each 0..1)
const seq = (...v) => { let i = 0; return () => v[Math.min(i++, v.length - 1)]; };
const onD = (n, sides) => (n - 0.5) / sides; // value that rolls n on a d<sides>

describe("injury tables", () => {
  it("covers 1-20 on the Lingering Injury table and 1-6 on each crit table", () => {
    for (let r = 1; r <= 20; r++) expect(LINGERING_INJURIES.filter(x => r >= x.min && r <= x.max)).toHaveLength(1);
    for (const g of ["head", "body", "arms", "legs"]) for (let r = 1; r <= 6; r++) expect(CRIT_INJURIES.filter(x => x.group === g && r >= x.min && r <= x.max)).toHaveLength(1);
  });
  it("maps hit locations to body parts", () => {
    expect(partForLocation("head")).toBe("head");
    expect(partForLocation("body")).toBe("torso");
    expect(partForLocation("arms", () => 0.1)).toBe("armR");
    expect(partForLocation("legs", () => 0.9)).toBe("legL");
    expect(rollBodyPart(() => onD(1, 20))).toBe("head");
    expect(rollBodyPart(() => onD(20, 20))).toBe("legL");
  });
  it("places Lingering Injuries by type", () => {
    expect(rollLingeringInjury({ rng: seq(onD(1, 20), onD(15, 20)) })).toMatchObject({ name: "Lost an Eye", location: "head", lost: "eye", serious: true });
    // Lost an arm on an arm hit stays on the struck arm
    const arm = rollLingeringInjury({ location: "arms", rng: seq(onD(2, 20), 0.9) });
    expect(arm).toMatchObject({ name: "Lost an Arm or Hand", location: "armL", lost: "limb" });
    // A scar lands where the blow did
    expect(rollLingeringInjury({ location: "legs", rng: seq(onD(12, 20), 0.1) })).toMatchObject({ name: "Horrible Scar", location: "legR", scar: true });
  });
  it("rolls Crit Injuries on the struck location's table, and honours a custom table", () => {
    expect(rollCritInjury({ location: "head", rng: seq(onD(6, 6)) })).toMatchObject({ name: "Eye Torn", location: "head", serious: true });
    expect(rollCritInjury({ location: "body", rng: seq(onD(5, 6)) })).toMatchObject({ name: "Ruptured Organ", adds: ["Wounded"] });
    const rows = [{ group: "legs", min: 1, max: 10, name: "Kneecapped", serious: true }];
    expect(rollCritInjury({ location: "legs", rows, rng: seq(0.2, onD(3, 10)) })).toMatchObject({ name: "Kneecapped", location: "legR", die: "d10" });
    expect(rollCritInjury({ location: "head", rows })).toBeNull();
  });
  it("heals a serious injury into a scar and gives Festering HP back", () => {
    const c = { maxHp: 40, hp: 40, injuries: [{ id: "a", name: "Festering Wound", location: "torso", serious: true, festering: true, maxHpLost: 0 }, { id: "b", name: "Numb Arm", location: "armR", serious: false }] };
    const day = longRestInjuryPatch(c);
    expect(day.maxHp).toBe(39);
    const c2 = { ...c, ...day };
    const healed = healInjuryPatch(c2, "a");
    expect(healed.maxHp).toBe(40);
    expect(healed.scars).toHaveLength(1);
    expect(healed.scars[0]).toMatchObject({ location: "torso", from: "Festering Wound" });
    const minor = healInjuryPatch(c2, "b");
    expect(minor.scars).toBeUndefined();
  });
  it("builds body marks for the model", () => {
    const m = bodyMarks({ injuries: [{ id: "1", location: "legL", lost: "limb" }, { id: "2", location: "head", lost: "eye" }], scars: [{ id: "s", location: "torso" }] });
    expect(m.legL.lost).toBe("limb");
    expect(m.head.lost).toBe("eye");
    expect(m.torso.scars).toHaveLength(1);
  });
});
