import { CLASS_DATA } from "../data/class-data.js";
import { FULL_CASTER_SLOTS } from "../data/spell-data.js";
import { STAT_MOD_LABEL, UNARMORED_DEFENSE_STAT, activeForms, benefitsOfPower, charClasses, charTotalLevel, profBonusForLevel, statMod } from "./core.js";

/* ===== Spellcasting (book Ch.1 "Spellcasting" + caster classes) ===== */
// SD&DBZ casting is NOT slot-gated in general: "the casting of Spells in SD&DBZ
// is only limited by having the Action Economy necessary to do so" (Ch.1).
// Magus/Guardian track per-Rest CAST POOLS (Mysticism: Burst = Prof casts/Rest,
// Magic Infusion = CHA mod/Rest); the Mystic instead spends true Spell Slots
// that replenish on a Long Rest. This container holds both shapes plus the
// common block (ability → Save DC/Attack, Schools, Cantrips, Spells known).
// It is a CONTAINER only — no book spell lists are seeded (that's Track B).
const MAGIC_FEATURE_RE = /Mysticism|Miracle|Magic Infusion|Mana Armament|Guardian's Blessing|Spellcast/i;
const SPELL_SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
// Book default Spellcasting Modifier per caster class — editable on the sheet.
const CASTER_ABILITY = { Magus: "cha", Mystic: "cha", Guardian: "wis", Hero: "wis" };

// A class grants casting if any feature it has by this level names a magic
// feature. Data-driven off CLASS_DATA so it never drifts from the class table.
function classIsCaster(classId, level) {
  const cd = CLASS_DATA[classId];
  if (!cd) return false;
  return Object.entries(cd.featuresByLevel)
    .some(([lvl, text]) => Number(lvl) <= (level || 20) && MAGIC_FEATURE_RE.test(text));
}
function isCaster(char) {
  if (char.spellcasting?.enabled) return true;
  return charClasses(char).some(c => classIsCaster(c.classId, c.level));
}
function defaultCasterAbility(char) {
  for (const c of charClasses(char)) if (CASTER_ABILITY[c.classId]) return CASTER_ABILITY[c.classId];
  return "cha";
}
const spellcastingAbility = (char) => char.spellcasting?.ability || defaultCasterAbility(char);
// Spell Save DC = 8 + Prof + ability mod; Spell Attack = Prof + ability mod.
// Ability mod comes through statMod(), so casting gear (a +CHA item) counts.
function spellStats(char) {
  const ability = spellcastingAbility(char);
  const prof = profBonusForLevel(charTotalLevel(char));
  const mod = statMod(char, ability);
  const energy = benefitsOfPower(char).energy; // Energy Bonus applies to spell Save DC & attack
  return { ability, mod, prof, saveDC: 8 + prof + mod + energy, attack: prof + mod + energy };
}
// Levels in the Mystic class — the one 5e full-caster (book table matches 5e).
const mysticLevel = (char) => charClasses(char).filter(c => c.classId === "Mystic").reduce((s, c) => s + (c.level || 0), 0);
// Standard 5e full-caster slots for a caster level → [{ level, current, max }].
function fullCasterSlots(casterLevel) {
  const row = FULL_CASTER_SLOTS[Math.max(0, Math.min(20, casterLevel || 0))];
  if (!row) return [];
  return row.map((max, i) => ({ id: `slot${i + 1}`, level: i + 1, current: max, max }));
}

// Aura colors a Form can flare. Bright-on-dark so the aura always reads.
const AURA_SWATCHES = [
  { label: "White", color: "#EAF2FF" },
  { label: "Gold (SSJ)", color: "#F5C542" },
  { label: "Blue (SSJ Blue)", color: "#37C6FF" },
  { label: "Green", color: "#48E06A" },
  { label: "Rosé", color: "#FF6FB5" },
  { label: "Red", color: "#FF5C5C" },
  { label: "Purple", color: "#B583FF" },
  { label: "Orange", color: "#FF9B3D" },
];
// Aura color by Alignment (book "Aura: Color" table). Black is rendered as a
// dark smoky tone so it still reads on the dark paperdoll.
const AURA_BY_ALIGN = {
  lawful:  { good: "#4FD1FF", neutral: "#5A5668", evil: "#5A5668" },
  neutral: { good: "#4FD1FF", neutral: "#EAF2FF", evil: "#FF5C5C" },
  chaotic: { good: "#B583FF", neutral: "#B583FF", evil: "#FF5C5C" },
};
function alignmentAuraColor(char) {
  const a = (char.alignment || "").toLowerCase();
  if (!a.trim()) return "#EAF2FF";
  const law = a.includes("lawful") ? "lawful" : a.includes("chaotic") ? "chaotic" : "neutral";
  const mor = a.includes("good") ? "good" : a.includes("evil") ? "evil" : "neutral";
  return AURA_BY_ALIGN[law][mor];
}

// The aura color to flare on the paperdoll: the highest-power active Form's own
// color wins; otherwise the aura reflects the character's Alignment (book rule).
// Powered down (nothing active) → null, so no aura shows.
function activeAura(char) {
  const forms = activeForms(char);
  if (forms.length) {
    const top = forms.slice().sort((a, b) => (b.powerBonus || 0) - (a.powerBonus || 0))[0];
    return top.auraColor || alignmentAuraColor(char);
  }
  if (Object.values(char.activeConditions || {}).some(Boolean)) return alignmentAuraColor(char);
  return null;
}

// AC = 10 + DEX + [class's second stat, or half-Prof for Magic/Prof variants].
// Multiclass uses the primary (first-listed) class's Unarmored Defense.
// This runs live off classes + level + stats, so it never goes stale on level-up.
function computeUnarmoredAC(char) {
  const classId = charClasses(char)[0]?.classId;
  const variant = UNARMORED_DEFENSE_STAT[classId];
  if (!variant) return null;
  const dex = statMod(char, "dex");
  const prof = profBonusForLevel(charTotalLevel(char));
  if (variant === "magic" || variant === "prof") {
    return { value: 10 + dex + Math.floor(prof / 2), formula: `10 + DEX (${dex >= 0 ? "+" : ""}${dex}) + half Proficiency (+${Math.floor(prof/2)})` };
  }
  const variantMod = statMod(char, variant);
  return { value: 10 + dex + variantMod, formula: `10 + DEX (${dex >= 0 ? "+" : ""}${dex}) + ${STAT_MOD_LABEL[variant]} (${variantMod >= 0 ? "+" : ""}${variantMod})` };
}

export {
  MAGIC_FEATURE_RE,
  SPELL_SCHOOLS,
  CASTER_ABILITY,
  classIsCaster,
  isCaster,
  defaultCasterAbility,
  spellcastingAbility,
  spellStats,
  mysticLevel,
  fullCasterSlots,
  AURA_SWATCHES,
  AURA_BY_ALIGN,
  alignmentAuraColor,
  activeAura,
  computeUnarmoredAC,
};
