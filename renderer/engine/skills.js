import { SPECIES_DATA } from "../data/species-data.js";
import { styleFlatMod } from "../state/registry.js";
import { benefitsOfPower, profBonusForLevel, statMod } from "./core.js";
import { cyberneticKiControlPenalty } from "./cybernetics.js";

// Saving Throws & Skills — book rule (Ch. 1, "Saving Throws"): every Saving
// Throw you're NOT proficient in still gets half your Proficiency Bonus
// (rounded up). Skills follow standard 5e rules with no such floor. Ki Control
// (WIS) and Technology (INT) are this system's two added Skills.
const STAT_KEYS = ["str", "dex", "con", "int", "wis", "cha"];
const SKILL_LIST = {
  str: ["Athletics"],
  dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
  con: [],
  int: ["Arcana", "History", "Investigation", "Nature", "Religion", "Technology"],
  wis: ["Animal Handling", "Insight", "Ki Control", "Medicine", "Perception", "Survival"],
  cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
};
const ALL_SKILLS = Object.values(SKILL_LIST).flat();
// Species grant Skill proficiencies (book Ch.3). `grantedSkills` always apply;
// `skillChoice` lets the player pick `count` from a pool (from:"*" = any Skill).
// The player's picks live on char.speciesSkillChoices and are re-validated against
// the current species here, so switching species can't leave a stale pick behind.
// Same "floor" idea as statMods: a grant only raises a Skill to Proficient; the
// player's own Proficient/Expertise toggle still wins if it's higher.
function speciesSkillData(char) {
  const sp = speciesByName(char && char.species);
  const fixed = (sp && sp.grantedSkills) || [];
  const choice = (sp && sp.skillChoice) || null;
  const pool = choice ? (choice.from === "*" ? ALL_SKILLS : choice.from) : [];
  let chosen = ((char && char.speciesSkillChoices) || [])
    .filter(s => pool.includes(s) && !fixed.includes(s));
  chosen = [...new Set(chosen)].slice(0, choice ? choice.count : 0);
  return { sp, fixed, choice, pool, chosen, floor: new Set([...fixed, ...chosen]) };
}
const speciesGrantsSkill = (char, skillName) => speciesSkillData(char).floor.has(skillName);
function computeSaveBonus(char, statKey) {
  const mod = statMod(char, statKey);
  const prof = profBonusForLevel(char.level);
  const proficient = (char.savingThrowProfs || []).includes(statKey);
  const tough = benefitsOfPower(char).toughness; // Toughness Bonus: +1/rank to all Saving Throws
  return { value: mod + (proficient ? prof : Math.ceil(prof / 2)) + tough + styleFlatMod(char, "saves"), proficient };
}
function computeSkillBonus(char, skillName) {
  const statKey = STAT_KEYS.find(k => (SKILL_LIST[k] || []).includes(skillName));
  const mod = statMod(char, statKey);
  const prof = profBonusForLevel(char.level);
  const base = (char.skillProfs || {})[skillName] || "none";
  // Species proficiency is a floor: it lifts a Skill to Proficient, but the
  // player's own Proficient/Expertise toggle still wins if it's higher.
  const granted = speciesGrantsSkill(char, skillName);
  const state = base === "expertise" ? "expertise" : (base === "prof" || granted) ? "prof" : "none";
  let bonus = mod + (state === "expertise" ? prof * 2 : state === "prof" ? prof : 0);
  // Energy Bonus: −1/rank to Ki Control (except Intimidation/Energy Beacon uses).
  // Cybernetics: −2 per attuned High-Tech Part (waived for Android/Cyborg bodies).
  if (skillName === "Ki Control") bonus -= benefitsOfPower(char).energy + cyberneticKiControlPenalty(char);
  return { value: bonus, state, statKey, granted, base };
}

/* ============================== CHARACTERS ============================== */
// Real species names pulled from the rulebook (Chapter 3). Custom species added
// via the Encyclopedia (Data Pool, type "species") merge into this list live.
// Base species list = the real book species (from SPECIES_DATA).
const SPECIES_BASE_LIST = SPECIES_DATA.map(s => s.name);
const speciesByName = (name) => SPECIES_DATA.find(s => s.name.toLowerCase() === (name || "").toLowerCase()) || null;

export {
  STAT_KEYS,
  SKILL_LIST,
  ALL_SKILLS,
  speciesSkillData,
  speciesGrantsSkill,
  computeSaveBonus,
  computeSkillBonus,
  SPECIES_BASE_LIST,
  speciesByName,
};
