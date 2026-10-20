import { equippedEntries, weightedPower } from "./equipment.js";
import { STAT_KEYS } from "./skills.js";

// Hit die per class, from each class's "Hit Dice — 1dN per <class> level" block
// (SDNDB Master Doc Ch.4). Drives book-correct starting HP in the quick builders.
const CLASS_HIT_DICE = {
  Agent: "d8", Bastion: "d10", Bruiser: "d12", Challenger: "d10", Champion: "d10",
  Elite: "d8", "Grand Chef": "d8", Guardian: "d8", Heel: "d12", Hero: "d8",
  Killer: "d10", Leader: "d8", Magus: "d8", "Martial Artist": "d8", Mystic: "d6",
  Punisher: "d10", Virtuoso: "d8", Warrior: "d10",
};

// Effects Engine — features that actually compute, not just display.
// Only includes math confirmed against the book's actual mechanical text.
// Everything else in Features stays reference-only until its formula is pulled too.
const UNARMORED_DEFENSE_STAT = {
  Agent: "int", Bastion: "con", Bruiser: "con", Challenger: "wis", Champion: "con",
  Elite: "wis", "Grand Chef": "con", Guardian: "wis", Heel: "con", Hero: "wis",
  Killer: "int", Leader: "int", Magus: "magic", "Martial Artist": "wis", Mystic: "magic",
  Punisher: "con", Virtuoso: "wis", Warrior: "prof",
};
const STAT_MOD_LABEL = { str: "STR", dex: "DEX", con: "CON", int: "INT", wis: "WIS", cha: "CHA" };
const abilityMod = (score) => Math.floor(((score || 10) - 10) / 2);

// Gear that changes Ability Scores (Hill Giant Gauntlets → STR 20). An item
// carries statMods [{ stat, mode: "set" | "add", value }] and only counts while
// EQUIPPED, same rule as its AC. Resolution per stat:
//   effective = max(base, highest "set") + sum of every "add"
// "set" never lowers a score you already beat — the classic item behaviour —
// and multiple "set" items don't stack, only the biggest wins. "add" bonuses do
// stack, and apply on top.
//
// Everything downstream must read stats through statMod()/effectiveStats(), NOT
// char.stats — char.stats stays the character's BASE, which is what the Stats
// tab edits. Same base-vs-effective split as effectivePowerBonus().
function statModSources(char) {
  const itemMods = equippedEntries(char).flatMap(e =>
    (e.item.statMods || []).map(m => ({ ...m, itemName: e.item.name })));
  // ASI feat points (3 per take, player-allocated in the Feats picker) ride the
  // same pipeline so they show up in the Stats breakdown like item mods do.
  const featMods = (char.feats || []).flatMap(f =>
    Object.entries(f.asi || {})
      .filter(([, v]) => (Number(v) || 0) > 0)
      .map(([stat, v]) => ({ stat, mode: "add", value: Number(v) || 0, itemName: f.name })));
  return [...itemMods, ...featMods];
}

function effectiveStats(char) {
  const base = char.stats || {};
  const mods = statModSources(char);
  const out = {};
  for (const k of STAT_KEYS) {
    const b = base[k] || 10;
    const sets = mods.filter(m => m.stat === k && m.mode === "set").map(m => Number(m.value) || 0);
    const adds = mods.filter(m => m.stat === k && m.mode === "add").reduce((s, m) => s + (Number(m.value) || 0), 0);
    out[k] = Math.max(b, ...sets) + adds;
  }
  return out;
}

// The one ability-modifier read for every formula on the sheet.
function statMod(char, key) {
  return abilityMod(effectiveStats(char)[key]);
}

// Per-stat breakdown for the Stats tab: what changed, and which item did it.
function statModBreakdown(char) {
  const base = char.stats || {};
  const mods = statModSources(char);
  const eff = effectiveStats(char);
  return STAT_KEYS.map(k => ({
    key: k,
    base: base[k] || 10,
    effective: eff[k],
    changed: eff[k] !== (base[k] || 10),
    sources: mods.filter(m => m.stat === k),
  })).filter(r => r.changed);
}

// SD&DBZ uses its own proficiency table (book Ch.2): +3 at Lv1-3, stepping +1
// every 3 levels to +9 at Lv19-20 — NOT the 5e 2+(lvl-1)/4 curve.
const profBonusForLevel = (level) => Math.min(9, 3 + Math.floor((Math.max(1, level || 1) - 1) / 3));

// Multiclass — char.classes is [{ classId, level }]. Older saves only have
// classId/level; these helpers accept both shapes so nothing downstream cares.
const charClasses = (char) => (char.classes && char.classes.length ? char.classes : (char.classId ? [{ classId: char.classId, level: char.level || 1 }] : []));
const charTotalLevel = (char) => {
  const cls = charClasses(char);
  return cls.length ? cls.reduce((a, c) => a + (c.level || 1), 0) : (char.level || 1);
};

// Ki Rank — book Ch.1: Rank 1 at Lv1, +1 at Levels 5, 10, 15. Override field
// exists for feats that shift it (e.g. Limitless affects Overload, not Rank,
// but homebrew may differ).
const kiRankForLevel = (level) => 1 + (level >= 5 ? 1 : 0) + (level >= 10 ? 1 : 0) + (level >= 15 ? 1 : 0);
const computeKiRank = (char) => char.kiRankOverride ?? kiRankForLevel(charTotalLevel(char));

// Max Stamina — book Ch.1: 2 + CON mod at Lv1, +2 every Level-Up. Feats like
// Neverending Energy add more; override preserves hand-tuned values.
const computeMaxStamina = (char) => char.maxStaminaOverride ?? Math.max(1, 2 + statMod(char, "con") + 2 * (charTotalLevel(char) - 1));

const totalPowerBonus = (char) => {
  const p = char.powerBonus || {};
  return (p.stable || 0) + (p.transformation || 0) + (p.powerUp || 0) + (p.misc || 0);
};

// Forms — active forms (and their active modifications) add Power Bonus and Ki
// Upkeep on top of the manually-entered powerBonus fields.
const activeForms = (char) => (char.forms || []).filter(f => f && f.active);
const activeFormPower = (char) => activeForms(char).reduce((sum, f) =>
  sum + (f.powerBonus || 0) + (f.modifications || []).filter(m => m.active).reduce((s, m) => s + (m.powerBonus || 0), 0), 0);
const activeFormUpkeep = (char) => activeForms(char).reduce((sum, f) =>
  sum + (f.upkeepCost || 0) + (f.modifications || []).filter(m => m.active).reduce((s, m) => s + (m.upkeepIncrease || 0), 0), 0);
// Special Conditions (book Ch.1) — toggleable states. A couple grant flat Power
// that folds into the engine like Forms; the rest are tracked + documented.
const CONDITIONS_DATA = [
  { id: "hyperMode", name: "Hyper Mode", group: "Hyper Mode", power: 2, text: "Take on a vibrant color as your aura leaks through your very skin.\n• +2 Power Bonus.\n• Increase all Movement Speed by 10 ft.\n• The first time this Condition is applied you must choose one variation of the Boosted Condition; this cannot be changed later. Each subsequent time it is applied, you gain the chosen Boosted Condition for the duration.\n• One time per application, you may reduce the Casting Cost of a Technique you cast by half, rounded up.\n(Cost: expend 2 Stamina; lasts a number of rounds equal to 2× your Ki Rank.)" },
  { id: "enraged", name: "Enraged", group: "Enraged", power: 2, stable: true, text: "Your anger has exploded and your energy has temporarily skyrocketed.\n• You can not maintain Concentration.\n• +2 Stable Power.\n• All available Movement Speeds are increased by 10 feet.\n• Increase your AC by 1.\n• You gain 5 Temporary Stamina.\nYou remain Enraged until the end of your next turn, unless an external factor such as Berserk is extending it." },
  { id: "boostedBody", name: "Boosted (Body)", group: "Boosted", power: 0, text: "Your body is strengthened by all of the excess energy flowing through you:\n• At the start of each of your turns, you gain Temporary Hit Points equal to your Character Level.\n• If you would reach 0 HP while active, you have Advantage on Death Saving Throws until you next become Stable (persists even if the Condition ends).\n• Your Constitution Modifier is added to any Hit Points or Ki Points you regain." },
  { id: "boostedHeart", name: "Boosted (Heart)", group: "Boosted", power: 0, text: "At your deepest level, you feel strong and stable:\n• Whenever you use your Reaction, you may expend 3 Stamina to regain it immediately (not usable with a Floating Trigger Reaction).\n• Advantage on all Saving Throws against Charmed, Frightened, and Berserk.\n• Once per Round, grant yourself Advantage on a single Contested Attack Roll in an Energy Clash or Struggle (or grant it via the Assist Snap Decision)." },
  { id: "boostedInstinct", name: "Boosted (Instinct)", group: "Boosted", power: 0, text: "The additional energy has become part of you:\n• Attacks made as part of your Attack Action gain a +1 Static Bonus.\n• When you regain Ki from a Melee Attack during your Attack Action or the Unarmed Inherent Effect, you regain double.\n• Attack Rolls made against you due to a Reaction take a Negative Static Bonus equal to your Ki Rank; Saving Throws you're forced to make due to a Reaction gain a Static Bonus equal to your Ki Rank." },
  { id: "boostedMind", name: "Boosted (Mind)", group: "Boosted", power: 0, text: "Your mind is sharper than ever:\n• You may add your Ki Rank to any Concentration Check.\n• Your Character Level is added to any attempt to use the Gather Ki Action.\n• Your Maximum Ki Points increase by (2× your Character Level)." },
  { id: "boostedSoul", name: "Boosted (Soul)", group: "Boosted", power: 0, text: "The innate power of your soul is emboldened:\n• Once per Round when you cast a Spell, grant it a Metamagic Option it wouldn't already benefit from for that casting.\n• Once per Round when you cast a Technique that can still be Mastered, grant it a Mastery Option for that casting.\n• You may change the Damage Type of Attacks made with your Attack Action to Energy Damage." },
  { id: "boostedSpirit", name: "Boosted (Spirit)", group: "Boosted", power: 0, text: "It is as if your very ki is improved:\n• All Techniques and Spells you cast gain a +1 Static Bonus.\n• Once per Round, impose Disadvantage on a single Contested Attack Roll to an opposing creature in an Energy Clash or Struggle.\n• Techniques you cast can be Charged one additional time.\n• Your Unarmed Strikes count for the Struggle Snap Decision and your Basic Ki Blast for the Energy Struggle, treated as your Ki Rank." },
  { id: "boostedTempo", name: "Boosted (Tempo)", group: "Boosted", power: 0, text: "The excess energy has made you feel lighter than air:\n• Once per Round, when you roll a Saving Throw against a Condition that restricts/lowers your Movement or restricts your Action Economy, you may reroll and take the higher result.\n• You may retrigger the Sonic Sway Snap Decision off any Attack Roll (double its Casting Cost, no cost reductions).\n• When you take the Attack Action, you gain an additional Attack (no damage modifiers unless a Critical Hit)." },
];
const activeConditionPower = (char) => CONDITIONS_DATA.reduce((sum, c) => sum + ((char.activeConditions || {})[c.id] ? c.power : 0), 0);
// The number every downstream formula should read: manual Power + active Forms + active Conditions.
const effectivePowerBonus = (char) => totalPowerBonus(char) + activeFormPower(char) + activeConditionPower(char) + weightedPower(char);
// Stable Power (book Ch.1) — grants every Power benefit but is EXEMPT from the
// Overload calculation. Sources: the manual "Stable" field and any active
// condition flagged stable (e.g. Enraged, "+2 Stable Power"). It's already part
// of effectivePowerBonus; computeOverload subtracts it back out.
const stablePower = (char) =>
  (char.powerBonus?.stable || 0) +
  CONDITIONS_DATA.reduce((sum, c) => sum + ((char.activeConditions || {})[c.id] && c.stable ? c.power : 0), 0);

// Benefits of Power (book Ch.1) — as Current Power Bonus crosses thresholds you
// gain ranks of three Static-Bonus types. Driven by FULL effective Power (Stable
// included — Stable Power keeps every benefit; it's only exempt from Overload).
//   Energy    (P≥1,≥4,≥10): +1 Attack Rolls, +1 Technique/Combat-Maneuver & Spell
//             Save DCs; −1 Ki Control (except Intimidation/Energy Beacon) & Passive
//             Ki Stealth.
//   Toughness (P≥2,≥6,≥10): +1 AC, +1 Saving Throws, +1 DR.
//   Physical  (P≥3,≥8,≥10): +1 Attack-Action damage, +5 ft speeds, +1 DR-ignore.
//   extra (P>10): each point → +1 Attack-Action damage and +1 DR.
function benefitsOfPower(char) {
  const p = Math.max(0, effectivePowerBonus(char));
  return {
    energy: (p >= 1 ? 1 : 0) + (p >= 4 ? 1 : 0) + (p >= 10 ? 1 : 0),
    toughness: (p >= 2 ? 1 : 0) + (p >= 6 ? 1 : 0) + (p >= 10 ? 1 : 0),
    physical: (p >= 3 ? 1 : 0) + (p >= 8 ? 1 : 0) + (p >= 10 ? 1 : 0),
    extra: Math.max(0, p - 10),
  };
}

export {
  CLASS_HIT_DICE,
  UNARMORED_DEFENSE_STAT,
  STAT_MOD_LABEL,
  abilityMod,
  statModSources,
  effectiveStats,
  statMod,
  statModBreakdown,
  profBonusForLevel,
  charClasses,
  charTotalLevel,
  kiRankForLevel,
  computeKiRank,
  computeMaxStamina,
  totalPowerBonus,
  activeForms,
  activeFormPower,
  activeFormUpkeep,
  CONDITIONS_DATA,
  activeConditionPower,
  effectivePowerBonus,
  stablePower,
  benefitsOfPower,
};
