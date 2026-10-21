// Species and Heritages from the 5.0 book (Ch.3).
import { describe, it, expect } from "vitest";
import { HERITAGE_DATA, SPECIES_DATA } from "../renderer/data/species-data.js";
import { characterSpeciesFeatures, heritageAllowed, heritageByName, heritageSwaps, speciesFor } from "../renderer/engine/species.js";

describe("species data", () => {
  it("has all 18 species with traits and feature rules", () => {
    expect(SPECIES_DATA).toHaveLength(18);
    for (const s of SPECIES_DATA) {
      expect(s.complete, s.name).toBe(true);
      for (const k of ["abilityScoreIncrease", "speed", "languages", "skills"]) expect(s[k], `${s.name} ${k}`).toBeTruthy();
      expect(s.featureDetails.length, s.name).toBeGreaterThanOrEqual(4);
      for (const f of s.featureDetails) expect(f.text || f.options?.length, `${s.name}: ${f.name}`).toBeTruthy();
    }
  });
  it("fills in the species that were stubs", () => {
    const chronin = speciesFor("Chronin");
    expect(chronin.abilityScoreIncrease).toBe("Wisdom +2 or Dexterity +2, Intelligence +1");
    expect(chronin.skillChoice).toEqual({ count: 2, from: "*" });
    expect(speciesFor("Yardratian").grantedSkills).toEqual(["History", "Ki Control"]);
    expect(speciesFor("Majin").abilityScoreIncrease).toBe("Constitution +2 or Charisma +2, Dexterity +1");
    expect(speciesFor("Zoolatar").subSpecies).toContain("Sekhmen");
  });
  it("keeps sub-species and option lists with their text", () => {
    const majin = speciesFor("Majin");
    expect(majin.subSpeciesDetails.find(s => s.name === "Raw Magic").text).toMatch(/Split Form\./);
    const bestial = speciesFor("Beastmen").featureDetails.find(f => f.name === "Bestial Characteristics");
    expect(bestial.options.filter(o => o.group === "Limited Bestial Characteristics").map(o => o.name)).toContain("Poison Bite");
    expect(speciesFor("Celestial Primate").skillChoice.from).toEqual(["Nature", "Religion", "Survival"]);
  });
});

describe("heritages", () => {
  it("has the 11 heritages", () => {
    expect(HERITAGE_DATA.map(h => h.name)).toEqual(["Blessing of Komedi", "Experiment", "Mutant", "Reincarnation", "Speedster", "Cyborg", "Daemonchilde", "Hybrid", "Prehistoric Blood", "S-Cell Overload", "Saiyan Blood"]);
    for (const h of HERITAGE_DATA) expect(h.features.length, h.name).toBeGreaterThan(0);
  });
  it("checks who can take a Restricted Heritage", () => {
    expect(heritageAllowed(heritageByName("Cyborg"), "Android").ok).toBe(false);
    expect(heritageAllowed(heritageByName("Cyborg"), "Saiyan").ok).toBe(true);
    expect(heritageAllowed(heritageByName("Daemonchilde"), "Namekian").ok).toBe(false);
    expect(heritageAllowed(heritageByName("Daemonchilde"), "Beastmen").ok).toBe(true);
    expect(heritageAllowed(heritageByName("Prehistoric Blood"), "Saiyan").ok).toBe(true);
    expect(heritageAllowed(heritageByName("Prehistoric Blood"), "Majin").ok).toBe(false);
    expect(heritageAllowed(heritageByName("Saiyan Blood"), "Saiyan").ok).toBe(false);
    expect(heritageAllowed(heritageByName("Mutant"), "Saiyan").ok).toBe(true);
  });
  it("swaps up to three Species Features, in book order with fixed replacements first", () => {
    const char = { species: "Saiyan", heritage: "S-Cell Overload", heritageSwaps: { "Mighty Ape": "Zenkai Boost", "“Evil Saiyan”": "Super Stomach" } };
    const swaps = heritageSwaps(char);
    expect(swaps).toEqual({ "Berserker Sub-Species": "Super Saiyan", "Bubbling Energy": "Saiyan Instincts", "“Evil Saiyan”": "Super Stomach" });
    const list = characterSpeciesFeatures(char);
    expect(list.filter(f => f.swappedOut).map(f => f.name).sort()).toEqual(["Saiyan Instincts", "Super Saiyan", "Super Stomach"]);
    expect(list.filter(f => f.source === "heritage")).toHaveLength(3);
  });
  it("never swaps one Species Feature twice", () => {
    const char = { species: "Majin", heritage: "Mutant", heritageSwaps: { Limitless: "Magical Nature", "Neverending Energy": "Magical Nature" } };
    expect(Object.keys(heritageSwaps(char))).toEqual(["Limitless"]);
  });
  it("puts the chosen Sub-Species on its feature", () => {
    const f = characterSpeciesFeatures({ species: "Majin", subspecies: "Saibaman" }).find(x => x.name === "Majin Sub-Species");
    expect(f.chosen.text).toMatch(/Saibaman Seed/);
  });
});
