import { CLASS_DATA, classColumn } from "../data/class-data.js";
import { uid } from "../lib/dice.js";
import { abilityMod, activeForms, benefitsOfPower, charClasses, charTotalLevel, computeKiRank, effectivePowerBonus, effectiveStats, profBonusForLevel, stablePower, statMod } from "./core.js";
import { weightMultiplier } from "./equipment.js";
import { computeSkillBonus } from "./skills.js";

/* ===== Phase 2 computed engine — pure functions off Phase 1 fields ===== */

// Technique ATK/DC per type (Technique 101): DC = 8 + Prof + stat mod,
// Attack Bonus = Prof + stat mod. Unarmed is labeled "Combo" on the sheet.
const TECH_TYPE_STAT = {
  Armed: "str", Barrage: "dex", Beam: "con", Blast: "wis",
  Omni: "int", Shot: "dex", Unarmed: "str",
};
const TECH_TYPE_ORDER = ["Unarmed", "Barrage", "Beam", "Blast", "Omni", "Shot", "Armed"];
const TECH_CATEGORIES = ["Generic", "Super Line", "External Super Line", "Miscellaneous Super", "Ultimate"];
const uidFor = (t) => (t && t.uid) || uid();
// Snapshot a book/data technique into a self-contained "known" instance so the
// Combat roll widgets never need to re-look-up the source data.
function techToKnown(t) {
  return {
    uid: uid(), techId: t.id || null, custom: false, mastery: 0,
    name: t.name, lineName: t.lineName || "", techType: t.techType, kiRank: t.kiRank,
    kiCost: t.kiCost || "", castingTime: t.castingTime || "", range: t.range || "",
    damageDice: t.damageDice || "", damageType: t.damageType || "", resolution: t.resolution || "utility",
    saveAbility: t.saveAbility || "", fullText: t.fullText || "",
  };
}
const blankCustomTech = () => ({
  uid: uid(), techId: null, custom: true, mastery: 0,
  name: "New Technique", lineName: "", techType: "Beam", kiRank: "1",
  kiCost: "", castingTime: "1 Action", range: "", damageDice: "", damageType: "Energy",
  resolution: "save", saveAbility: "Dexterity", fullText: "",
});
function computeTechRefs(char) {
  const prof = profBonusForLevel(charTotalLevel(char));
  const energy = benefitsOfPower(char).energy; // Energy Bonus: +1/rank to Attack Rolls & Save DCs
  return TECH_TYPE_ORDER.map(type => {
    const stat = TECH_TYPE_STAT[type];
    const mod = statMod(char, stat);
    return {
      type, stat,
      label: type === "Unarmed" ? "Unarmed (Combo)" : type,
      dc: 8 + prof + mod + energy,
      atk: prof + mod + energy,
    };
  });
}

// Power Overload (book Ch.1): threshold = Prof + 1. char.overloadMod folds in
// feats that shift it (Limitless +Ki Rank, Uncontrollable Power −Ki Rank).
const OVERLOAD_CHART = [
  "2 Destruction Damage", "1d4 Destruction Damage", "1d6 Destruction Damage",
  "1d8 Destruction Damage", "1d10 Destruction Damage", "1d12 Destruction Damage",
  "1d12 + 1d6 per Power above 6",
];
function computeOverload(char) {
  const prof = profBonusForLevel(charTotalLevel(char));
  const threshold = prof + 1 + (char.overloadMod || 0);
  // Stable Power is exempt from Overload — only non-stable Power counts here.
  const stable = stablePower(char);
  const current = Math.max(0, effectivePowerBonus(char) - stable);
  const over = Math.max(0, current - threshold);
  return { threshold, current, stable, over, damage: over > 0 ? OVERLOAD_CHART[Math.min(over - 1, OVERLOAD_CHART.length - 1)] : null };
}

// Ki Regen (base Gather Ki action, book Ch.1).
function computeKiRegen(char) {
  const rank = computeKiRank(char);
  const power = effectivePowerBonus(char);
  const wis = statMod(char, "wis");
  return {
    major: 16 * (rank + power),
    minorDice: `${4 * rank}d4${wis >= 0 ? "+" : ""}${wis}`,
  };
}

// Passives. Ki Stealth = 10 + WIS (book Ch.1). Perception/Insight/Stealth =
// 10 + the character's own skill bonus (respects proficiency/expertise).
function computePassives(char) {
  const wis = statMod(char, "wis");
  return {
    kiStealth: 10 + wis - benefitsOfPower(char).energy, // Energy Bonus: −1/rank to Passive Ki Stealth
    perception: 10 + computeSkillBonus(char, "Perception").value,
    insight: 10 + computeSkillBonus(char, "Insight").value,
    stealth: 10 + computeSkillBonus(char, "Stealth").value,
  };
}

// Carry Weight (book Ch.1). Toughness Bonus doubles Carry/Pull/Push per rank.
const computeCarryWeight = (char) => Math.round(effectiveStats(char).str * 20 * (charTotalLevel(char) + effectivePowerBonus(char) * 10) * Math.pow(2, benefitsOfPower(char).toughness));
// Damage Reduction granted by Power (book Ch.1): +1 per Toughness rank, +1 per
// point of Power above 10. Stacks on top of worn-armor DR.
const powerDR = (char) => { const b = benefitsOfPower(char); return b.toughness + b.extra; };
// Kili (book Ch.1): Max HP × (Current Ki ÷ 2) × (Power Bonus + 1). No weight
// factor — the Weighted ÷/×1.5 multiplier is a Battle-Power term, not a Kili
// one. Weight still reaches Kili the correct way: its ±1/rank Power change is
// already folded into effectivePowerBonus (the Power Bonus + 1 term below).
const computeKili = (char) => Math.round((char.maxHp || 0) * ((char.ki || 0) / 2) * (effectivePowerBonus(char) + 1));

// "Higher Power Levels" system (Materoids Flavor) — a scouter reading that climbs
// into manga-scale numbers:
//   Current HP × Current Ki × (1 + Ki Rank + Power Bonus) × Form Multiplier × Weight
// The book's Battle Power omits Power Bonus (it scales via Form Multiplier only);
// this deviant flavor folds Power Bonus into the (1 + Ki Rank …)
// term so EVERY buff (Hyper Mode, Enraged, forms) raises the number, while Form
// Multipliers still give the astronomical jumps. Form Multiplier = product of each
// active Form's own multiplier field (e.g. Super Saiyan set to "x50"); Weight
// ×/÷1.5 per rank applies here (unlike Kili). Uses CURRENT HP/Ki so a wounded
// fighter's power visibly drops.
function parseMultiplier(s) {
  const m = String(s == null ? "" : s).match(/([\d.]+)/);
  const n = m ? parseFloat(m[1]) : 1;
  return isFinite(n) && n > 0 ? n : 1;
}
const activeFormMultiplier = (char) => activeForms(char).reduce((prod, f) => prod * parseMultiplier(f.multiplier), 1);
const computeBattlePower = (char) =>
  Math.round((char.hp || 0) * (char.ki || 0) * (1 + computeKiRank(char) + effectivePowerBonus(char)) * activeFormMultiplier(char) * weightMultiplier(char));

// The headline power number, per the table's chosen power system. Returns the
// value + its label so readouts stay honest about which system is live.
function computePowerLevel(char, powerSystem) {
  if (powerSystem === "battlePower") return { value: computeBattlePower(char), label: "Battle Power" };
  return { value: computeKili(char), label: "Kili" };
}

// Techniques Known budget (book Ch.8, "Technique 101"): start at Lv1 with INT
// mod + 2 (min 2); +2 for each Level-Up at Lv1-10; +2 on each EVEN Level-Up at
// Lv11-20; plus any learned via Training Boons (not auto-counted). Uses BASE INT
// — this is a build entitlement, not a live gear-modified stat.
function techniquesKnownBudget(char) {
  const L = charTotalLevel(char);
  let total = Math.max(abilityMod(char.stats?.int) + 2, 2);
  for (let lvl = 2; lvl <= L; lvl++) if (lvl <= 10 || lvl % 2 === 0) total += 2;
  return total;
}

// Feats a character is OWED from class levels (book). CLASS_DATA lists each
// level's grants; counting up to the character's level in each class: a bare
// "Feat" = 1 general Feat (Lv 4/8/12/16); "Epic Boon" = 1 Epic Boon Feat (Lv 19);
// "Heroic Surge" grants Heroic Feats — 2 the first time, +1 each additional time,
// counted across ALL classes per the feature's own text. Species-granted feats
// (e.g. Heroic Nature, Saiyan) are NOT counted here.
function featsOwed(char) {
  let surges = 0, general = 0, epic = 0;
  for (const c of charClasses(char)) {
    const cd = CLASS_DATA[c.classId];
    if (!cd) continue;
    for (const [lvl, text] of Object.entries(cd.featuresByLevel)) {
      if (Number(lvl) > (c.level || 0)) continue;
      for (const item of String(text).split(",").map(s => s.trim())) {
        if (/^Heroic Surge$/.test(item)) surges++;
        else if (/^Epic Boon$/.test(item)) epic++;
        else if (/^Feat$/.test(item)) general++;
      }
    }
  }
  const heroic = surges > 0 ? surges + 1 : 0;
  return { heroic, general, epic, surges, total: heroic + general + epic };
}

// Attacks per turn — 1 + each "Extra Attack" in the Features column at or below
// that class's own level (the book repeats the token: Warrior has it at 5, 11
// and 20). Multiclass takes the best class, like 5e.
function computeAttacksPerTurn(char) {
  let attacks = 1;
  charClasses(char).forEach(({ classId, level }) => {
    const classData = CLASS_DATA[classId];
    if (!classData) return;
    let n = 1;
    Object.entries(classData.featuresByLevel).forEach(([lvl, text]) => {
      if (Number(lvl) > (level || 1)) return;
      for (const item of String(text).split(",")) {
        const m = item.trim().match(/^Extra Attack(?:\s*\((\d+)\))?$/);
        if (m) n = m[1] ? Math.max(n, 1 + Number(m[1])) : n + 1;
      }
    });
    attacks = Math.max(attacks, n);
  });
  return attacks;
}

// Unarmed Strike and Basic Ki Blast dice from the class table (5.0 Ch.4).
// "Set by highest leveled Class" (Basic Ki Blast, p.26); the same class's
// Unarmed Combat style decides which stats an Unarmed Strike may use.
const UNARMED_STYLE_STATS = {
  Calculated: ["str", "int"], Skilled: ["str", "dex"], Power: ["str"], Flashy: ["str", "cha"],
  Perceptive: ["str", "wis"], Magic: ["str", "cha"], Monastic: ["str", "dex"],
};
function classUnarmed(char) {
  const top = charClasses(char).filter(c => CLASS_DATA[c.classId]).sort((a, b) => (b.level || 1) - (a.level || 1))[0];
  if (!top) return { classId: null, style: null, strikeDie: "1d4", blastDie: "1d4", strikeStat: "str" };
  const style = CLASS_DATA[top.classId].unarmedCombat;
  const stats = UNARMED_STYLE_STATS[style] || ["str"];
  const strikeStat = stats.reduce((best, k) => statMod(char, k) > statMod(char, best) ? k : best, stats[0]);
  return {
    classId: top.classId, style,
    strikeDie: classColumn(top.classId, "Unarmed Strikes", top.level) || "1d4",
    blastDie: classColumn(top.classId, "Ki Blast", top.level) || "1d4",
    strikeStat,
  };
}

export {
  TECH_TYPE_STAT,
  TECH_TYPE_ORDER,
  TECH_CATEGORIES,
  uidFor,
  techToKnown,
  blankCustomTech,
  computeTechRefs,
  OVERLOAD_CHART,
  computeOverload,
  computeKiRegen,
  computePassives,
  computeCarryWeight,
  powerDR,
  computeKili,
  parseMultiplier,
  activeFormMultiplier,
  computeBattlePower,
  computePowerLevel,
  techniquesKnownBudget,
  featsOwed,
  computeAttacksPerTurn,
  classUnarmed,
};
