import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Home, Users, UserSquare2, Swords, BookOpen, Sparkles, FileText, Plus, Trash2, Download,
  Upload, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, X, Search, Minus, RotateCcw, Dices, Wrench,
  ShieldHalf, Zap, Flame, HeartPulse, Radio, Settings, Table2, Globe2, ClipboardList,
  Check, ArrowLeft, Shuffle, TrendingUp, Archive, Orbit, Coins, MapPin, Rocket, Home as HomeIcon, Hexagon, Skull, Crosshair, Eye, EyeOff, Wand2, Clock,
  Weight, Calendar, CalendarDays, Crown, Cloud, Building2
} from "lucide-react";
import { FEAT_DATA } from "./feat-data.js";
import { SPECIES_DATA, HERITAGE_DATA } from "./species-data.js";
import { TECHNIQUE_DATA } from "./technique-data.js";
import { SPELL_DATA, FULL_CASTER_SLOTS } from "./spell-data.js";
import { CLASS_RESOURCES } from "./class-resource-data.js";
import { ANTAGONIST_DATA, ANTAGONIST_TRAITS } from "./npc-data.js";
import { HIGH_TECH_PARTS, CYBERNETICS_RULES } from "./hightech-data.js";

/* ============================== REAL BOOK DATA ============================== */
const CLASS_DATA = {"Agent":{"flavor":"Tech-Savvy Soldiers A Konatsian ducks around a corner, arming a bomb from his bag. He never was much for the powerful sorceries some of his peers could do but it didn\u2019t bother him much, he could do enough with the metal in his hands. \u201cThree against one, maybe you all actually stand a chance.\u201d The young cerealian takes a deep breath to steady himself, it\u2019s been a long time since he had odds stacked against him this far. He throws a small device on the ground that slows the attackers before picking them apart with deadly efficiency. Agents are quick thinkers and even quicker doers. Armed with impressive combat abilities and gadgets that allow them greater flexibility and versatility.","featuresByLevel":{"1":"Expertise, Unarmed Combat (Calculated), Unarmored Defense (Intelligence), Weapon Mastery","2":"Fighting Style, Minor Gadgets","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Major Gadgets","6":"Heroic Surge","7":"Expertise, Major Gadget","8":"Feat","9":"Jack of All Trades, Major Gadget, Upgraded Battery Pack","10":"Heroic Surge","11":"Major Gadget","12":"Feat","13":"Extra Attack, Major Gadget","14":"Heroic Surge","15":"Empowered Gadgets, Major Gadget","16":"Feat","17":"Reliable Talent, Major Gadget","18":"Heroic Surge","19":"Epic Boon, Major Gadget","20":"Quantum Battery"}},"Bastion":{"flavor":"Immovable Object. A Bastion stands their ground, planting their feet as blows rain down around them. Where others might flinch or retreat, they hold the line, daring their enemies to test their resolve. Bastions are the wall between danger and their allies, using resilience and tactical positioning to control the battlefield and protect those who need it most.","featuresByLevel":{"1":"Defensive Combat, Guardian's Resolve, Unarmored Defense","2":"Fighting Style, Taunt","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Bulwark","6":"Heroic Surge","7":"Unyielding","8":"Feat","9":"Indomitable Stance","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Last Stand","14":"Heroic Surge","15":"Immovable","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Unbreakable"}},"Bruiser":{"flavor":"Raw Power. A Bruiser wades into combat, letting fists and fury do the talking. They hit hard, take hits harder, and revel in the chaos of close-quarters combat. Bruisers channel raw physical power into devastating unarmed and melee strikes, becoming more dangerous the longer a fight drags on.","featuresByLevel":{"1":"Dragon Soul, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Powerful Build","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Brutal Critical","6":"Heroic Surge","7":"Wild Frenzy","8":"Feat","9":"Concussive Strikes","10":"Heroic Surge","11":"Dragon Soul (2)","12":"Feat","13":"Extra Attack (2)","14":"Heroic Surge","15":"Relentless","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Dragon Soul (3)"}},"Challenger":{"flavor":"Rivalry Incarnate. Challengers thrive on competition, marking their target as a rival and drawing strength from the confrontation. Every battle is personal, every victory sweeter when earned against a worthy opponent. They goad, provoke, and outlast, turning the fight into a duel of wills as much as weapons.","featuresByLevel":{"1":"Announce Rivalry, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Rival's Mark","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Combo Finisher","6":"Heroic Surge","7":"Rivalry Escalation","8":"Feat","9":"Unshakable Focus","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Decisive Blow","14":"Heroic Surge","15":"Champion's Rivalry","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Undefeated"}},"Champion":{"flavor":"The People's Fighter. Champions win the crowd before they win the fight, distracting and demoralizing foes with showmanship, taunts, and sheer presence. They control the battlefield not through brute force alone, but through the psychological toll of being outclassed in front of an audience.","featuresByLevel":{"1":"Crowd Pleaser, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Showboat","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Debilitating Taunt","6":"Heroic Surge","7":"Fan Favorite","8":"Feat","9":"Unshakeable Confidence","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Center Stage","14":"Heroic Surge","15":"Living Legend","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"World Champion"}},"Elite":{"flavor":"Precision Perfected. Elites are masters of martial refinement, striking with pinpoint accuracy where lesser warriors flail. Every attack is calculated, every opening exploited without hesitation. They train relentlessly to guarantee that when the moment matters, their blow lands true.","featuresByLevel":{"1":"Unarmed Strikes, Unarmored Defense, Weapon Mastery","2":"Fighting Style, Precision Strikes","3":"Heroic Surge","4":"Feat","5":"Extra Attack","6":"Heroic Surge","7":"Improved Precision","8":"Feat","9":"Relentless Assault","10":"Heroic Surge, Critical Technique","11":"Extra Attack (2)","12":"Feat","13":"Guaranteed Strike","14":"Heroic Surge","15":"Critical Technique (All Strike Techniques)","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Perfect Precision"}},"Grand Chef":{"flavor":"Culinary Combatant. Grand Chefs bring the kitchen to the battlefield, using meals and treats infused with ki to buff allies and turn the tide of combat. Even the corpses of enemies become ingredients for the next dish, a grim but effective use of the spoils of war.","featuresByLevel":{"1":"Culinary Arts, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Signature Dish","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Enhanced Recipes","6":"Heroic Surge","7":"Gourmet Techniques","8":"Feat","9":"Master Chef","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Feast of Champions","14":"Heroic Surge","15":"Culinary Mastery","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Legendary Recipe"}},"Guardian":{"flavor":"Watcher and Healer. Guardians replicate the role of beings like Kami or Dende, gaining minor access to magic focused on healing and buffing allies. They allow spellcasters freedom from always needing to pick healing options, while still holding their own offensively and defensively.","featuresByLevel":{"1":"Guardian's Blessing, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Minor Mysticism","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Protective Ward","6":"Heroic Surge","7":"Healing Touch","8":"Feat","9":"Guardian's Vigil","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Restorative Aura","14":"Heroic Surge","15":"Divine Intervention","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Eternal Guardian"}},"Heel":{"flavor":"Grip and Break. Heels replicate warriors like Vegito or Broly, specializing in grappling their enemies and keeping the enemy's eyes fixed on them. Their high Hit Points let them absorb punishment while disabling anything within Grapple range, or forcing foes to stay close.","featuresByLevel":{"1":"Grapple Mastery, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Iron Grip","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Crushing Hold","6":"Heroic Surge","7":"Unbreakable Grip","8":"Feat","9":"Suplex Master","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Devastating Slam","14":"Heroic Surge","15":"Total Domination","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Unstoppable Force"}},"Hero":{"flavor":"Inspiring Presence. Heroes lead through charisma and conviction, bolstering allies and rallying them when hope runs thin. Their Hero Die fuels a suite of options that keep the party standing and steady even against overwhelming odds.","featuresByLevel":{"1":"Heroic Action, Unarmed Strikes, Unarmored Defense (Wisdom)","2":"Fighting Style, Secret Fighting Pose","3":"Heroic Surge","4":"Feat","5":"Flash Conversion","6":"Heroic Surge","7":"Heroic Reaction","8":"Feat","9":"Rapid Fire Posing","10":"Heroic Surge","11":"Improvised Posing","12":"Feat","13":"Extra Attack","14":"Heroic Surge","15":"Greater Heroic Action","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Legendary Hero"}},"Killer":{"flavor":"Death by a Thousand Cuts. Killers replicate fighters like Hit, layering small, precise strikes into Killer Counts that chip away at foes without needing a Saving Throw, then unleashing Deadly Tricks that debuff and cripple their target.","featuresByLevel":{"1":"Killer Count, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Deadly Tricks","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Marked for Death","6":"Heroic Surge","7":"Silent Killer","8":"Feat","9":"Guaranteed Kill","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Time-Skip Strike","14":"Heroic Surge","15":"Perfect Assassination","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Executioner"}},"Leader":{"flavor":"Command the Battlefield. Leaders replicate figures like Paragus or Elec, issuing commands that grant allies additional action economy. Their Stratagem feature lets them hand out boosts to survivability and battlefield options to the whole party.","featuresByLevel":{"1":"Stratagem, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Command","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Rally","6":"Heroic Surge","7":"Tactical Insight","8":"Feat","9":"Coordinated Assault","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Inspiring Command","14":"Heroic Surge","15":"Grand Strategy","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Supreme Commander"}},"Magus":{"flavor":"Martial Spellblade. Magus fighters weave magic into melee, using Magic Infusion to empower their strikes and Mana Armament to summon a weapon of their choosing at will. They walk the line between arcane caster and front-line combatant.","featuresByLevel":{"1":"Minor Mysticism, Unarmed Strikes, Unarmored Defense (Magic)","2":"Fighting Style, Magic Infusion","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Mana Armament","6":"Heroic Surge","7":"Magic Conversion","8":"Feat","9":"Versatile Armament","10":"Heroic Surge","11":"Mysticism: Burst","12":"Feat","13":"Extra Attack (2)","14":"Heroic Surge","15":"Improved Infusion","16":"Feat","17":"Versatile Armament (At Will)","18":"Heroic Surge","19":"Epic Boon","20":"Mysticism: Burst (20th)"}},"Martial Artist":{"flavor":"Discipline in Motion. Martial Artists channel focus and training into a flexible, ki-fueled fighting style, adapting their techniques to whatever the fight demands. Their strikes grow sharper and their movement more fluid the more they train.","featuresByLevel":{"1":"Martial Discipline, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Ki Focus","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Flurry of Blows","6":"Heroic Surge","7":"Evasion","8":"Feat","9":"Stillness of Mind","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Tongue of the Sun and Moon","14":"Heroic Surge","15":"Diamond Body","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Perfect Self"}},"Mystic":{"flavor":"Woven from the Weave. Mystics channel Mysticism through Spell Slots, growing their access to Schools of Magic as they level. True Magic lets them treat their Spells as Ki Techniques entirely, blurring the line between caster and warrior.","featuresByLevel":{"1":"Minor Mysticism, Unarmed Strikes, Unarmored Defense (Magic)","2":"Fighting Style, Magic Conversion","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Mystic Recovery","6":"Heroic Surge","7":"Magic Blasts, Magic Conversion (2)","8":"Feat","9":"True Magic","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Master of Elements","14":"Heroic Surge","15":"Magic Barrier","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Archmagus"}},"Punisher":{"flavor":"Retribution Made Manifest. Punishers channel Power Points into Punishing Smite, converting raw grit into devastating bursts of retaliatory damage. Every hit they take is a debt they intend to collect in full.","featuresByLevel":{"1":"Grit, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Punishing Smite","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Expanded Punishing Smite","6":"Heroic Surge","7":"Frontloaded Power","8":"Feat","9":"Unbridled Grit","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Explosive Clash","14":"Heroic Surge","15":"Punishing Attack","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Final Reckoning"}},"Virtuoso":{"flavor":"Technique Perfected. Virtuosos are masters of the Technique list, applying Paragon Masteries to reshape how their Techniques function on the fly. Their Signature Move lets known Iconic Masteries apply freely, even stacking for devastating effect.","featuresByLevel":{"1":"Paragon Mastery, Unarmed Strikes, Unarmored Defense","2":"Fighting Style, Technical Genius","3":"Heroic Surge","4":"Feat","5":"Extra Attack, Signature Move","6":"Heroic Surge","7":"Paragon Mastery (2)","8":"Feat","9":"Adaptive Casting","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Paragon Mastery (3)","14":"Heroic Surge","15":"Perfect Technique","16":"Feat","17":"Reliable Talent","18":"Heroic Surge","19":"Epic Boon","20":"Grand Virtuoso"}},"Warrior":{"flavor":"Battle-Tested. Warriors rely on raw martial skill and battlefield maneuvers, using the 2024 5e Battlemaster's Maneuvers to outclass foes with tactical superiority in melee. Simple, direct, and always dangerous in a fight.","featuresByLevel":{"1":"Combat Maneuvers, Unarmed Strikes, Unarmored Defense, Weapon Mastery","2":"Fighting Style, Action Surge","3":"Heroic Surge","4":"Feat","5":"Extra Attack","6":"Feat","7":"Heroic Surge","8":"Feat","9":"Indomitable","10":"Heroic Surge","11":"Extra Attack (2)","12":"Feat","13":"Indomitable (2 uses)","14":"Feat","15":"Heroic Surge","16":"Feat","17":"Action Surge (2 uses)","18":"Heroic Surge","19":"Epic Boon","20":"Extra Attack (3)"}}};
const CLASS_NAMES = Object.keys(CLASS_DATA);
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

/* ===== Equipment: slots, book armor catalog, equipped-item AC/DR ===== */

// The 14 body slots (paperdoll). `type` matches an item's `slot` field; several
// physical slots can share a type (two rings, two hands).
const EQUIP_SLOTS = [
  { key: "head",     label: "Head",      type: "head" },
  { key: "eyes",     label: "Eyes",      type: "eyes" },
  { key: "neck",     label: "Neck",      type: "neck" },
  { key: "body",     label: "Body",      type: "body" },
  { key: "back",     label: "Back",      type: "back" },
  { key: "wrists",   label: "Wrists",    type: "wrists" },
  { key: "gloves",   label: "Gloves",    type: "gloves" },
  { key: "waist",    label: "Waist",     type: "waist" },
  { key: "feet",     label: "Feet",      type: "feet" },
  { key: "ring1",    label: "Ring 1",    type: "ring" },
  { key: "ring2",    label: "Ring 2",    type: "ring" },
  { key: "hand1",    label: "Main Hand", type: "held" },
  { key: "hand2",    label: "Off Hand",  type: "held" },
  { key: "artifact", label: "Artifact",  type: "artifact" },
];
// Selectable slot types for an item (what body location it can occupy). "" = not
// worn/held (consumables, key items).
const SLOT_TYPES = [
  { key: "", label: "— (carried only)" },
  { key: "head", label: "Head" }, { key: "eyes", label: "Eyes" }, { key: "neck", label: "Neck" },
  { key: "body", label: "Body (armor)" }, { key: "back", label: "Back" }, { key: "wrists", label: "Wrists" },
  { key: "gloves", label: "Gloves" }, { key: "waist", label: "Waist" }, { key: "feet", label: "Feet" },
  { key: "ring", label: "Ring" }, { key: "held", label: "Hand (weapon/shield)" }, { key: "artifact", label: "Artifact" },
];
const slotTypeLabel = (t) => (SLOT_TYPES.find(s => s.key === t) || { label: t }).label;

// Book armor (Ch. 9) as structured equipment items. These seed the Data Pool
// dictionary and can be added to a character; homebrew reuses the same shape.
// acDexMode: "full" (light) · "max2" (medium, +2 cap) · "none" (heavy).
const BOOK_EQUIPMENT = [
  { catalogId: "book_padded_gi",     name: "Padded Gi",           category: "Armor",  slot: "body", rarity: "common", zeni: 5,    acBase: 11, acDexMode: "full", acHalfProf: true, acBonus: 0, dr: 1, stealthDisadv: false, strReq: 0,  notes: "Little more than padded clothing." },
  { catalogId: "book_light_battle",  name: "Light Battle Armor",  category: "Armor",  slot: "body", rarity: "common", zeni: 45,   acBase: 12, acDexMode: "full", acHalfProf: true, acBonus: 0, dr: 1, stealthDisadv: true,  strReq: 0,  notes: "Basic light battle armor." },
  { catalogId: "book_medium_battle", name: "Medium Battle Armor", category: "Armor",  slot: "body", rarity: "common", zeni: 50,   acBase: 13, acDexMode: "max2", acHalfProf: true, acBonus: 0, dr: 2, stealthDisadv: false, strReq: 0,  notes: "Advanced alloy, resists energy attacks." },
  { catalogId: "book_medium_elite",  name: "Medium Elite Armor",  category: "Armor",  slot: "body", rarity: "uncommon", zeni: 400, acBase: 14, acDexMode: "max2", acHalfProf: true, acBonus: 0, dr: 2, stealthDisadv: false, strReq: 0,  notes: "Protective and easy to move in." },
  { catalogId: "book_heavy_battle",  name: "Heavy Battle Armor",  category: "Armor",  slot: "body", rarity: "common", zeni: 75,   acBase: 16, acDexMode: "none", acHalfProf: true, acBonus: 0, dr: 3, stealthDisadv: true,  strReq: 13, notes: "Singular durable elastic armor pieces." },
  { catalogId: "book_heavy_elite",   name: "Heavy Elite Armor",   category: "Armor",  slot: "body", rarity: "rare", zeni: 1500,  acBase: 18, acDexMode: "none", acHalfProf: true, acBonus: 0, dr: 4, stealthDisadv: true,  strReq: 15, notes: "Plated/scaled body armor molded to the body." },
  { catalogId: "book_shield",        name: "Shield",              category: "Shield", slot: "held", rarity: "common", zeni: 10,   acBase: 0,  acDexMode: "none", acHalfProf: false, acBonus: 2, dr: 0, stealthDisadv: false, strReq: 0,  notes: "Wielded in one hand; +2 AC." },
];

// Resolve which inventory items are currently equipped, paired with their slot.
function equippedEntries(char) {
  const map = char.equipment || {};
  const byId = Object.fromEntries((char.items || []).map(it => [it.id, it]));
  return EQUIP_SLOTS.map(s => (map[s.key] && byId[map[s.key]]) ? { slotKey: s.key, item: byId[map[s.key]] } : null).filter(Boolean);
}

// AC from equipped gear: the Body-slot armor sets the base (its Dex/½Prof rule);
// every equipped item's acBonus stacks (shields, rings, homebrew). Falls back to
// Unarmored Defense when no body armor is worn.
function computeAC(char) {
  const eq = equippedEntries(char);
  const body = eq.find(e => e.slotKey === "body" && (e.item.acBase || 0) > 0)?.item || null;
  const bonus = eq.reduce((s, e) => s + (e.item.acBonus || 0), 0);
  const tough = benefitsOfPower(char).toughness; // Toughness Bonus: +1/rank to AC
  const styleAc = styleFlatMod(char, "ac");
  const extra = bonus + tough + styleAc;
  const bonusLabel = `${bonus ? ` + gear (+${bonus})` : ""}${tough ? ` + Power (+${tough})` : ""}${styleAc ? ` + Style (${styleAc >= 0 ? "+" : ""}${styleAc})` : ""}`;
  if (body) {
    const dex = statMod(char, "dex");
    const halfProf = Math.floor(profBonusForLevel(charTotalLevel(char)) / 2);
    let dexPart = 0, dexLabel = "";
    if (body.acDexMode === "full") { dexPart = dex; dexLabel = ` + DEX (${dex >= 0 ? "+" : ""}${dex})`; }
    else if (body.acDexMode === "max2") { dexPart = Math.min(dex, 2); dexLabel = ` + DEX (${dexPart >= 0 ? "+" : ""}${dexPart}, max 2)`; }
    const profLabel = body.acHalfProf ? ` + half Prof (+${halfProf})` : "";
    const value = (body.acBase || 0) + dexPart + (body.acHalfProf ? halfProf : 0) + extra;
    return { value, formula: `${body.name}: ${body.acBase}${dexLabel}${profLabel}${bonusLabel}`, armored: true, dr: body.dr || 0 };
  }
  const un = computeUnarmoredAC(char);
  if (!un) return extra ? { value: 10 + statMod(char, "dex") + extra, formula: `10 + DEX${bonusLabel}`, armored: false, dr: 0 } : null;
  return { value: un.value + extra, formula: un.formula + bonusLabel, armored: false, dr: 0 };
}

// DR contributed by equipped gear (body armor + any item's dr). Manual char.dr
// holds other DR sources (class features) and is preserved via drOverride.
const computeArmorDR = (char) => equippedEntries(char).reduce((s, e) => s + (e.item.dr || 0), 0);

// Weighted Condition (book Ch.1/9). Worn weighted gear gives Weighted (Heavy);
// un-attuning flips it to Weighted (Light) for a minute. weightedManual lets a
// Feat/Form add Light (+) or Heavy (−) ranks. Heavy and Light cancel via `net`.
// net > 0 = Light (buff), net < 0 = Heavy (penalty).
function computeWeighted(char) {
  const gear = equippedEntries(char).reduce((s, e) => s + (e.item.weightedRank || 0), 0);
  const gearNet = char.weightedUnattuned ? gear : -gear;
  // Synthetic Muscle Fibers (High-Tech Part) grants 1 Rank of Weighted (Light).
  const cyber = hasCybernetic(char, "synthetic-muscle-fibers") ? 1 : 0;
  // Gravity acclimation (Materoids Flavor): a heavy-gravity homeworld grants
  // Lightweight ranks that carry over anywhere lighter.
  const acclim = CURRENT_HOUSE_RULES.gravityAcclimation ? gravAcclimRanks(char.accustomedGravity) : 0;
  // The world underfoot (Harsh Galaxies): low gravity floats you into Weighted
  // (Light), crushing gravity drags you into Weighted (Heavy). Applies to
  // everyone present and folds through the same net so acclimation offsets it.
  const envG = (CURRENT_HOUSE_RULES.harshGalaxies && CURRENT_ENV_GRAVITY != null) ? envGravityRanks(CURRENT_ENV_GRAVITY) : 0;
  // A star trait or hazard can also impose Weighted ranks via an effect hook.
  const envHookW = CURRENT_HOUSE_RULES.harshGalaxies ? envWeightedRanks() : 0;
  // The fighter's equipped Fighting Style can grant Weighted ranks too.
  const styleW = styleWeightedRanks(char);
  const net = gearNet + (char.weightedManual || 0) + cyber + acclim + envG + envHookW + styleW;
  return { gear, net, heavy: Math.max(0, -net), light: Math.max(0, net), acclim, envG };
}
// Power from Weighted: +1 Stable per Light rank, −1 per Heavy rank (folds into
// effectivePowerBonus so it flows through every downstream formula).
const weightedPower = (char) => computeWeighted(char).net;
// Battle Power weight multiplier: ×1.5 per Light rank, ÷1.5 per Heavy rank.
const weightMultiplier = (char) => Math.pow(1.5, computeWeighted(char).net);

// Snapshot a catalog entry (book or custom dictionary entry) into a fresh
// carried item. catalogId links it back to its dictionary source.
function catalogToItem(entry) {
  return normalizeItem({ ...entry, id: uid(), catalogId: entry.catalogId || entry.id || null });
}
// The equipment dictionary = book equipment + any custom entry flagged isEquipment.
function equipmentCatalog(customEntries) {
  return [...BOOK_EQUIPMENT, ...(customEntries || []).filter(e => e && e.isEquipment)];
}
const catalogKey = (e) => e.catalogId || e.id;

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

// Attacks per turn — counts "Extra Attack" occurrences unlocked at or below
// each class's own level (multiclass takes the best across classes).
function computeAttacksPerTurn(char) {
  let attacks = 1;
  charClasses(char).forEach(({ classId, level }) => {
    const classData = CLASS_DATA[classId];
    if (!classData) return;
    Object.entries(classData.featuresByLevel).forEach(([lvl, text]) => {
      if (Number(lvl) > (level || 1)) return;
      const m = text.match(/Extra Attack(?:\s*\((\d+)\))?/);
      if (m) attacks = Math.max(attacks, 1 + (m[1] ? Number(m[1]) : 1));
    });
  });
  return attacks;
}

/* ===== Class-granted resources (auto-provision, see class-resource-data.js) ===== */
// Pick the value for a byLevel map: the highest keyed level <= the class level.
function resolveByLevel(map, classLevel) {
  let val;
  for (const k of Object.keys(map).map(Number).sort((a, b) => a - b)) {
    if (k <= classLevel) val = map[k];
  }
  return val;
}
// A resource's max can be a plain int, a formula string, or a byLevel table.
function resolveResourceMax(def, char, classLevel) {
  const m = def.max;
  if (m && typeof m === "object") return resolveByLevel(m.byLevel || {}, classLevel) ?? 0;
  if (m === "prof") return profBonusForLevel(charTotalLevel(char));
  if (m === "profHalf") return Math.ceil(profBonusForLevel(charTotalLevel(char)) / 2);
  if (m === "profThird") return Math.ceil(profBonusForLevel(charTotalLevel(char)) / 3);
  if (m === "kirank") return computeKiRank(char);
  if (m === "classLevelX5") return (classLevel || 1) * 5; // pool scales with THIS class's level
  return Number(m) || 0;
}
function resolveResourceDie(def, classLevel) {
  const d = def.die;
  if (d && typeof d === "object") return resolveByLevel(d.byLevel || {}, classLevel) || "";
  return d || "";
}
// Every class-granted resource the character currently qualifies for, resolved to
// concrete numbers for their class level. Keyed by def.key so reconcile can match.
function classGrantedResources(char) {
  const out = [];
  for (const c of charClasses(char)) {
    for (const def of CLASS_RESOURCES) {
      if (def.class !== c.classId || (c.level || 1) < def.level) continue;
      out.push({
        key: def.key, source: "class", name: def.name,
        die: resolveResourceDie(def, c.level || 1),
        max: resolveResourceMax(def, char, c.level || 1),
        reset: def.reset, regen: def.regen || "", note: def.note || "", feature: def.feature,
      });
    }
  }
  return out;
}
// Reconcile char.resources[] against class grants: keep player-made ("custom")
// resources untouched; add newly granted class pools (current = max); update the
// max/die of existing class pools on level-up (preserving current, re-clamped);
// drop class pools the character no longer qualifies for. Returns the new array,
// or null if nothing changed (so callers can skip the write).
function reconcileResources(char) {
  const existing = char.resources || [];
  const custom = existing.filter(r => r.source !== "class");
  const granted = classGrantedResources(char);
  const byKey = Object.fromEntries(existing.filter(r => r.source === "class").map(r => [r.key, r]));
  const nextClass = granted.map(g => {
    const prev = byKey[g.key];
    if (!prev) return { id: uid(), current: g.max, ...g };
    return { ...prev, ...g, current: Math.min(prev.current ?? g.max, g.max) };
  });
  const next = [...custom, ...nextClass];
  const same = next.length === existing.length && next.every((r, i) => {
    const e = existing[i];
    return e && r.key === e.key && r.current === e.current && r.max === e.max && r.die === e.die && r.reset === e.reset;
  });
  return same ? null : next;
}
// Refill resources on rest, mirroring magicRestPatch. Short: reset "short" to full,
// "shortHalfLongFull" regains half. Long: everything rest-based tops off. turn/
// encounter/manual are left for the player (no auto-trigger until Sessions exist).
function resourceRestPatch(char, kind) {
  const list = char.resources || [];
  if (!list.length) return null;
  const next = list.map(r => {
    if (kind === "long") return { ...r, current: r.max }; // a full rest tops off every pool
    if (kind === "short" && r.reset === "short") return { ...r, current: r.max };
    if (kind === "short" && r.reset === "shortHalfLongFull") return { ...r, current: Math.min(r.max, (r.current || 0) + Math.ceil(r.max / 2)) };
    return r;
  });
  return { resources: next };
}

/* ===== Cybernetics — High-Tech Parts (see hightech-data.js) ===== */
// Installed Parts live on char.cybernetics = [{ uid, partId, signature }]. `signature`
// marks the free species/heritage Signature Upgrade (doesn't count against the Limit).
const installedParts = (char) => (char.cybernetics || []).map(c => ({ ...c, def: HIGH_TECH_PARTS.find(p => p.id === c.partId) })).filter(c => c.def);
const hasCybernetic = (char, partId) => (char.cybernetics || []).some(c => c.partId === partId);
// Cybernetic Limit (book): half of (CON mod + WIS mod), floored at 0. Signature
// Upgrades don't count, so they aren't included in the "used" tally below.
const cyberneticLimit = (char) => Math.max(0, Math.floor((statMod(char, "con") + statMod(char, "wis")) / 2));
const cyberneticsUsed = (char) => (char.cybernetics || []).filter(c => !c.signature).length;
// Androids take no negatives and treat every Part as Advanced; the Cyborg heritage
// also takes no negatives. A manual flag (cyberneticsNoPenalty) covers other cases.
const isAndroidBody = (char) => (char.species || "").toLowerCase() === "android";
const cyberneticsExempt = (char) => isAndroidBody(char) || /cyborg/i.test(char.heritage || "") || !!char.cyberneticsNoPenalty;
const partIsAdvanced = (char) => isAndroidBody(char) || !!char.cyberneticsAdvanced;
// −2 to Ki Control (and Berserk saves) per attuned Part, waived for exempt bodies.
const cyberneticKiControlPenalty = (char) => cyberneticsExempt(char) ? 0 : (char.cybernetics || []).length * 2;

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


const BOOK_TABLES = [
  {
    id: "lingering_injury", name: "Lingering Injury Table", die: "1d20", source: "Book — Crippled Condition",
    rows: [
      { range: "1", result: "Lose an Eye. Disadvantage on Perception (sight) checks, -2 to Ranged/Shot Attack Rolls. Regenerate (or losing all eyes) can fix/change this." },
      { range: "2", result: "Lose an Arm or Hand. Can only hold one object; Casting Time of Action/Bonus Action Techniques increases by 1 step. A 4th-level+ healing spell restores it." },
      { range: "3", result: "Lose a Foot or Leg. Walk Speed halved, need a cane/crutch/prosthesis. A 4th-level+ healing spell restores it." },
      { range: "4", result: "Tailless. Permanently lose your tail (and any regrow feature) if your Species has one. 4th-level+ healing regenerates it." },
      { range: "5-7", result: "Major Internal Injury. Once per combat on an Action, DC 20 Con save or gain Dazed until your next turn. Heals with 6th-level+ healing or 10 days of rest." },
      { range: "8-10", result: "Minor Internal Injury. As Major Internal Injury, but DC 15." },
      { range: "11-13", result: "Horrible Scar. -1 to Persuasion, +1 to Intimidation. Removed by 2nd-level+ healing." },
      { range: "14-16", result: "Festering Wound. Lose 1 Max HP every 24 hours until treated (dies at 0). Magical healing cures it, or DC 15 Medicine check once/24hrs, 10 successes needed." },
      { range: "17-20", result: "Minor Scar. No mechanical effect. Removed by 2nd-level+ healing." },
    ],
  },
];

// DM Playbook — Yoohar's Unofficial 5.0 DM Playbook, uploaded reference content.
const DM_PLAYBOOK = [
  {
    section: "Encounter Design",
    entries: [
      { title: "Variables to Consider", body: "Before structuring an encounter, know player capabilities: average damage/round, average AC, average Save DC and to-hit for their common attacks, average movement speed. Beyond numbers, consider items/potions, Ki-sapping abilities, healers in the party, status conditions available to them, and their damage types dealt/resisted. Don't consider all factors every fight — leave room for creative problem-solving. Attack-roll-centric builds have swingy, hard-to-predict DPR (100% or 0% propositions)." },
      { title: "Gentlemen's Agreement", body: "Balance around a player's base stat line, not their fully powered-up state — if a player gets a +1 Weapon, don't raise all future enemy AC by +1 to compensate. In exchange, ask players to power up gradually across a fight's rounds rather than turning everything on turn one, so enhancements actually feel like a difference." },
      { title: "Introduce Fundamentals Early, Weakly", body: "Introduce damage resistances and condition immunities early in small doses (a Piercing resistance here, a Frightened immunity there) so players know these mechanics exist before they matter. Encourage party roles/unique playstyles so no single damage type renders a character useless." },
      { title: "Encountering Flaws Can Lead to Paranoid Preparation", body: "Watch for players over-covering every possible weakness until characters become homogenized (everyone just picks whatever counters the last enemy). It's fine for players to shore up a real weak point — just keep giving them moments of effectiveness with their existing kit often enough that weaknesses don't feel like mandatory holes to patch." },
      { title: "Draw Out Resources and Test Endurance", body: "5.0's caps make attrition realistic again. Chip at HP/Stamina before a set-piece encounter — a hazard that saps Stamina, a Skill Check with real stakes. Exhaustion works well as a trade rather than a punishment (auto-succeed a dire check in exchange for a Rank). Rests are precious: after level 5, stop guaranteeing a Long Rest before/after every encounter, and give Short Rests only after 1-2 encounters. Ease into this gradually to avoid an accidental TPK." },
    ],
  },
  {
    section: "Enemy Considerations",
    entries: [
      { title: "Action Economy", body: "The side with more total Action Economy usually wins. Snap Decisions and Reactions mean simply matching player count with Legendary Actions isn't enough. Don't stack extra enemies (\"adds\") onto a boss if the adds ARE the boss's Action Economy leverage, unless you're intentionally gating some of that power behind the adds being defeated." },
      { title: "Resources", body: "Don't just inflate HP/Stamina carelessly on single bosses — give respectable HP and tune Stamina to how threatening the fight should feel. Let hits land on HP sometimes rather than constant Push Back/Wild Sense/Energy Clash/Struggle announcements every turn. Enemies essentially require 2-3 Snap Decision uses even at low tier, given Technique lethality. Give enough Ki for a real \"War of Attrition\" — not so much the fight ends before they ever need to Gather Ki." },
      { title: "Forcing Movement", body: "Players won't move without a reason. Use Spacing, Cover, and Environment — line of sight problems, spread-out enemies vs AoEs, Lair Actions (telegraph the next round's hazard area at the top of initiative). Give single-entity enemies 1 Emanation Lair Action to stop the inevitable player blob." },
      { title: "Shoot Your Monks (Responsibly)", body: "Give characters chances to show off their build — let the tank tank, the healer heal, don't counter every build aspect just to \"challenge\" players. Build in exploitable flaws in enemies that happen to reward the party's actual strategy, rather than always attacking whoever's easiest to hit." },
      { title: "Objectives", body: "Avoid pure \"beat the guy till he dies\" brawls outside rare cases — they get static fast. Objectives must be mechanically relevant, not just RP flavor (saving civilians should have a real mechanical stake, not just moral victory), and must be worth the Action Economy cost to engage with or players will ignore them entirely." },
      { title: "Break Bars", body: "Control pacing with HP thresholds (75%/50%/25%, etc). Crossing one (\"losing a Break Bar\") can grant more Power, stronger moves, a shift in motivation (sparring → lethal intent). Optionally: crossing a threshold makes the enemy immune to further damage for the rest of that round, and/or clears their negative Conditions. Consider telegraphing how close a Break Bar is so players can strategize their round." },
      { title: "Stunning, Incapacitating, and Paralyzing", body: "Use extremely sparingly on both sides of the table — these are \"no-fun buttons\" that leave the affected creature doing nothing but rolling saves. Overuse forces absurd Legendary Resistances / high Con-mental saves into every fight just to counter it." },
      { title: "Single-Entity Fights", body: "Action Economy is critical — give mobility (move while ignoring opportunity attacks, Launch to prevent clumping) so the boss isn't just damage-raced. Target ~8 on the d20 for them to hit average player AC/DC (6-7 vs a fully rested party); ~12 on the d20 for players to hit them (higher vs a rested party). Give the boss their own objective so targeting doesn't just default to \"most damage last round.\" Adds should diminish the boss's own capabilities if renewable, or gate boss power behind their defeat — and shouldn't be tanky enough to feel like mini-bosses themselves (2-3 intercepts/hits max)." },
      { title: "Party vs Party Fights", body: "Two flavors: individually strong enemies matching party size (Ginyu Force), or numerous weaker enemies (Goblin Camp) — treat the latter as a swarm: one statblock with multi-attacks as if 4 units, HP divided into thresholds that shed -1 attack/-2 Stamina/-10 Ki/etc per 25% lost. Give each enemy or swarm a clear niche (bruiser/ranged/support) so players have defined engagement points. Target ~10 on the d20 for enemies to succeed vs players, ~8 for players vs them (elites: 8-9 / 9-10)." },
    ],
  },
  {
    section: "Favored Optional Rulings",
    entries: [
      { title: "Chase Mechanics", body: "5e's Opportunity Attacks + individual initiative make fleeing combat cumbersome, so most fights become pseudo-fights-to-the-death by default. Consider adopting dedicated Fleeing Combat rules (MonkeyDM's Rules for Fleeing Combat PDF is the referenced source) so either side can realistically flee overwhelming danger." },
      { title: "Dying Condition (replaces Unconscious at 0 HP)", body: "At 0 HP, fall prone and gain the Dying Condition instead of going Unconscious (still counts as Unconscious for rule interactions). Concentration checks from the triggering damage are at disadvantage. Each turn under Dying, make a death save at the start of the turn, then may spend one of: Action (3 Ranks of Exhaustion), Bonus Action or Reaction (1 Rank of Exhaustion), or Movement (free). 3 successes = 1 HP and the condition ends. 3 failures = dead." },
      { title: "Revivify Rules (Matt Mercer-style)", body: "Casting a resurrection makes a Resurrection Check: d20 + spellcasting ability modifier vs DC 10, +1 for each previous successful resurrection that character has undergone. On failure, the soul isn't lost, but the attempt fails and future Resurrection Checks for that character get +1 DC." },
      { title: "Tumble and Overrun", body: "Replaces moving through a hostile space as Difficult Terrain. Tumble: Action or Bonus Action, Dex (Acrobatics) vs the creature's Unarmed Save DC — win and move through their space once this turn. Overrun: Action or Bonus Action, Str (Athletics) vs their Unarmed Save DC — win and push through their space once this turn (Advantage if you're larger than them, Disadvantage if smaller)." },
    ],
  },
  {
    section: "Campaign Design",
    entries: [
      { title: "Encouraging Creativity", body: "Give players real reasons to take non-combat options. If someone wants a utility Cantrip or similar, build scenarios where it specifically matters (a hunger/satiation mechanic, a reputation system for feeding the poor) rather than letting it sit unused." },
      { title: "Lopsided Player Stats", body: "\"Average\" balancing assumes only a 3-4 point spread between players' AC/to-hit/DCs. If that spread grows past comfort range (e.g. 16 AC lowest vs 22 AC highest), talk to your players directly. Offer alternate investment paths instead of just handing out +1-3 weapons/armor to close gaps — custom conjurable items via a burned Feat, or a custom Temporary Form Improvement Feat suited to their playstyle, land better." },
    ],
  },
];

// Rarity ladder used across Gear, Enchanting, Night Market, Bounty rewards.
// Pseudo-Legendary is a dead end; only true Legendary items can awaken into Mythic.
const RARITY_TIERS = [
  { key: "common", label: "Common", color: "#9AA3B5" },
  { key: "uncommon", label: "Uncommon", color: "#4ADE80" },
  { key: "rare", label: "Rare", color: "#4FD1FF" },
  { key: "veryrare", label: "Very Rare", color: "#B990FF" },
  { key: "pseudolegendary", label: "Pseudo-Legendary", color: "#FF8C42", deadEnd: true },
  { key: "legendary", label: "Legendary", color: "#F5B942" },
  { key: "mythic", label: "Mythic", color: "#FF5C5C", requiresLegendary: true },
];
const rarityInfo = (key) => RARITY_TIERS.find(r => r.key === key) || RARITY_TIERS[0];

// Real Downtime Activities, pulled from the rulebook (Chapter 5).
const DOWNTIME_ACTIVITIES = [
  { name: "Befriend", cost: 2, desc: "By taking time to build trust, you form an unbreakable bond with a Buddy. Create and Soulbind to a Buddy of your design, crafted through the Buddy Creation Guidelines." },
  { name: "Buddy Training", cost: 2, desc: "All Buddies that you are Soulbound to gain 5 Training Boons. A Buddy can only receive this benefit a number of times equal to your Ki Rank." },
  { name: "Center", cost: 1, desc: "Reflect on your growth. Expend any retained Training Boons. Additionally, you may replace any Techniques learned by Level-Up that have no Ranks of Mastery with another Technique on your Learnable Technique List." },
  { name: "Cooking", cost: 1, desc: "Requires Cook's Utensils. Choose a Tier (1-5) and succeed a Con/Wis (Cook's Utensils) check against that Tier's DC and Zeni cost to grant temporary HP/Ki/Stamina to whoever eats it (24 hrs or until expended). Tier 1: DC10, 20z, 5 temp HP/Ki or 1 Stamina. Tier 5: DC30, 10,000z, 75 temp HP/Ki or 12 Stamina." },
  { name: "Crafting", cost: 1, desc: "Choose Adventuring Gear, Armor, a Vehicle, or a Weapon as your Goal. Succeed a DC 15 check with the matching Toolkit (Tinker's/Smith's/Leatherworker's/Engineer's) to create it for 85% of normal price, dropping 5% further per 5 you beat the DC by, to a minimum of 50%." },
  { name: "Enchanting", cost: 2, desc: "Spellcasters only. Spend Zeni to turn a piece of Equipment into Enchanted Gear, choosing one Enchantment and gaining the listed Magical Bonus. Common: +1 / 400z. Uncommon: +1 / 5,000z. Rare: +2 / 20,000z. Very Rare: +3 / 80,000z. Legendary: +3 / 300,000z." },
  { name: "Gather Materials", cost: 1, desc: "DC 15 Wis (Perception), Int (Investigation), or Cha (Persuasion) check. On success, your next Crafting or Enchanting activity's Zeni cost drops 15%, further 5% per 5 over the DC, to a minimum of 45%." },
  { name: "Hunting", cost: 2, desc: "Choose a Tier (1-5), succeed a Nature check at that Tier's DC to gain Rations or Bento Boxes. Tier 1: DC10, 3 Rations. Tier 5: DC30, 30 Rations or 3 Bento Boxes." },
  { name: "Improving", cost: 1, desc: "Those who can Enchant may spend half the next Rarity tier's Zeni cost to raise a piece of Enchanted or Heroic Gear to the next Rarity, gaining a new Level 1 Enchantment (max 3 for Enchanted Gear, 2 for Heroic Gear) or upgrading an existing one." },
  { name: "Invent", cost: 2, desc: "Attempt an Int (Technology) check against a Scientific Marvel's rarity DC to unlock it as a Crafting option, using an Engineer's Kit. Common: DC10. Uncommon: DC15. Rare: DC20. Very Rare: DC25. Legendary: DC30." },
];

const TRAINING_ARC_STYLES = [
  { name: "Solo", desc: "Training alone lets you develop your own style. Gain 3 Ranks of Mastery to put into known Techniques, or a unique DM-defined benefit, in addition to your Training Boons." },
  { name: "Collaborative", desc: "Designate a location. All creatures training at that location (and their Buddies) can spend 2 Training Boons to learn a Mortal Trained Feature or Super Technique from someone else there they qualify for, or 3 Boons for an Otherworldly Trained Feature." },
  { name: "Tutored", desc: "Designate an eligible Master. You and anyone else training with that Master (plus Buddies) can spend 2 Training Boons to learn a Mortal Trained Feature or Super Technique the Master knows, or 3 Boons for an Otherworldly Trained Feature or Ultimate Technique." },
];

const TRAINING_BOON_SPENDS = [
  "1 Boon: Increase a Resource (max times = Ki Rank + 1)",
  "1 Boon: Gain a Hit Die + Max HP as if you gained a level",
  "1 Boon: Gain Ki as if you gained a level",
  "1 Boon: Max Stamina increases by 4",
  "1 Boon: Base Walk Speed increases by 5ft",
  "1 Boon: Gain 1 Rank of Mastery for a known Technique",
  "1 Boon: Learn a Generic or Super Technique of your Ki Rank (can't be traded later)",
  "1 Boon: Gain proficiency in a Tool, Vehicle, or Weapon",
  "2 Boons: Gain a Feat you qualify for",
];

const MAX_TRAINING_BOONS_PER_RANK = [
  { rank: 1, max: 4 }, { rank: 2, max: 8 }, { rank: 3, max: 16 }, { rank: 4, max: 32 },
];

// Gambling & Bounty Hunting are not in the rulebook — designed here to fit the
// existing math (Ki Rank scaling, Zeni economy, DC-based checks).
const GAMBLING_GAMES = [
  { name: "Dice Clash", stake: "10-500 Ƶeni", desc: "Wager, then roll 2d6 + your Luck-equivalent modifier (or straight 2d6 if none) against the house's 2d6+2. Beat it, double your stake. Tie, stake returned. Lose, stake forfeited." },
  { name: "Ki Pull Machines", stake: "5-100 Ƶeni per pull", desc: "DC 12 flat roll (no modifiers). Success: 2x stake. Beat DC by 10+: roll on a rarity table for a bonus Common-tier item. Slow, repeatable Zeni sink with a small item-drop chance." },
  { name: "High-Stakes Sparring Bets", stake: "50-5,000 Ƶeni", desc: "Wager on the outcome of an actual sparring/exhibition match between two NPCs the DM controls. Payout scales with the underdog's odds — a good excuse to run a quick Combat Sim." },
  { name: "Card Tables (Speed Draw)", stake: "20-1,000 Ƶeni", desc: "Contested Charisma (Deception) or Wisdom (Insight) check against the dealer's DC 14. Winners double their stake; a natural 20 triples it. Cheating attempts use Sleight of Hand vs. the house's passive Perception." },
];

const BOUNTY_TIERS = [
  { key: "petty", label: "Petty", reward: "150-400 Ƶeni", npcTier: "fodder" },
  { key: "standard", label: "Standard", reward: "500-1,500 Ƶeni", npcTier: "elite" },
  { key: "dangerous", label: "Dangerous", reward: "2,000-6,000 Ƶeni", npcTier: "miniboss" },
  { key: "capital", label: "Capital", reward: "10,000-40,000 Ƶeni + rarity-scaled gear", npcTier: "boss" },
];

const NPC_TIERS = [
  { key: "fodder", label: "Fodder", mult: 0.6 },
  { key: "hfodder", label: "Hardened Fodder", mult: 0.8 },
  { key: "elite", label: "Elite", mult: 1.0 },
  { key: "helite", label: "Hardened Elite", mult: 1.25 },
  { key: "miniboss", label: "Mini-Boss", mult: 1.6 },
  { key: "hminiboss", label: "Hardened Mini-Boss", mult: 2.0 },
  { key: "boss", label: "Boss", mult: 2.6 },
  { key: "hboss", label: "Hardened Boss", mult: 3.4 },
];

/* ---------------------------------- tokens ---------------------------------- */
const COLORS = {
  bg: "#0A0C11", panel: "#12151D", panel2: "#171B26", border: "#232838", borderLit: "#37405A",
  gold: "#F5B942", blue: "#4FD1FF", green: "#4ADE80", red: "#FF5C5C", purple: "#B990FF", amber: "#FF8C42",
  text: "#E8E9ED", muted: "#8A93A6", dim: "#5A6178",
};
const FEAT_LIST_COLOR = {
  "Epic Boon": "gold", "Fighting Style": "blue", "General": "dim", "Heroic": "purple",
  "Stance": "green", "Trained": "red", "Origin": "amber", "Custom": "muted",
};
const FEAT_LISTS = ["Epic Boon", "Fighting Style", "General", "Heroic", "Stance", "Trained", "Origin"];
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const roll = (die) => Math.floor(Math.random() * die) + 1;
// A d20 with optional Advantage / Disadvantage (roll twice, keep the higher or
// lower). Returns the kept die plus both rolls for display.
function rollD20(mode) {
  const a = roll(20);
  if (mode === "adv" || mode === "dis") {
    const b = roll(20);
    return { die: mode === "adv" ? Math.max(a, b) : Math.min(a, b), rolls: [a, b], mode };
  }
  return { die: a, rolls: [a], mode: "normal" };
}
const rollModeLabel = (m) => m === "adv" ? "Advantage" : m === "dis" ? "Disadvantage" : "";
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------------------------------- storage hooks ---------------------------------- */
function useSharedList(key) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    let unsub = null;
    (async () => {
      try { const res = await window.storage.get(key, true); if (!cancelled) setItems(res ? JSON.parse(res.value) : []); }
      catch { if (!cancelled) setItems([]); }
      if (window.storage.subscribe) {
        unsub = window.storage.subscribe(key, true, (rawValue) => {
          try { setItems(JSON.parse(rawValue)); } catch {}
        });
      }
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, [key]);
  const persist = useCallback(async (next) => {
    setItems(next);
    try { const res = await window.storage.set(key, JSON.stringify(next), true); setError(res ? null : "Save failed — try again."); }
    catch { setError("Save failed — check your connection / room code."); }
  }, [key]);
  return [items, persist, error];
}

// Editable-book-data layer: edits to canonical book items (Feats, Techniques,
// Tables, etc.) are stored as overrides keyed by the item's id and synced to the
// whole table, merged over the base at render time — so rules changes never need
// a recompile. `map[id]` holds the full edited object; clearing resets to book.
function useOverrides(key) {
  const [list, persist] = useSharedList(key);
  const arr = list || [];
  const map = {};
  for (const o of arr) map[o.id] = o;
  const setOverride = (id, obj) => persist([...arr.filter(o => o.id !== id), { ...obj, id, edited: true }]);
  const clearOverride = (id) => persist(arr.filter(o => o.id !== id));
  return { map, setOverride, clearOverride, loading: list === null };
}
// Apply overrides to a base book array (base items keyed by id).
const applyOverrides = (base, map) => base.map(b => map[b.id] ? { ...b, ...map[b.id] } : b);
function usePersonalList(key) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try { const res = await window.storage.get(key, false); if (!cancelled) setItems(res ? JSON.parse(res.value) : []); }
      catch { if (!cancelled) setItems([]); }
    })();
    return () => { cancelled = true; };
  }, [key]);
  const persist = useCallback(async (next) => { setItems(next); try { await window.storage.set(key, JSON.stringify(next), false); } catch {} }, [key]);
  return [items, persist];
}

// Table-wide house rules ("Materoids Flavors" — deviant/optional content), one
// shared object synced to everyone in the room. Defaults applied on read so an
// unset key behaves like the book.
const HOUSE_RULE_DEFAULTS = {
  powerSystem: "kili",            // "kili" | "battlePower"
  attunementCapEnabled: false,    // false = book cap (2); true = use custom below
  attunementCap: 3,               // custom Attunement slot limit when unlocked
  gravityAcclimation: false,      // high-gravity homeworld auto-grants Lightweight ranks
  harshGalaxies: false,           // planet gravity/weather/star conditions go live in combat
  quickCombat: false,             // abstract skirmish/war resolver in the Session tab
  baseBuilding: false,            // player-faction home base + capital ship (its own tab)
  moreGoverning: false,           // governance/economy layer on the home world (needs baseBuilding)
};
// Module mirror of the live table rules so pure compute helpers (computeWeighted)
// can factor them in without threading the hook through every call site.
let CURRENT_HOUSE_RULES = HOUSE_RULE_DEFAULTS;
// Gravity (×g) of the world the party currently stands on, mirrored here while
// Harsh Galaxies is live so the pure Weighted math can read it. null = no world
// set / rule off. Kept fresh by useEnvGravitySync() mounted in App.
let CURRENT_ENV_GRAVITY = null;
// Effective Attunement slot cap for a table's house rules (book default is 2).
const attunementCapFor = (hr) => (hr && hr.attunementCapEnabled ? Math.max(0, hr.attunementCap ?? 2) : 2);
function useHouseRules() {
  const [hr, setHr] = useState(HOUSE_RULE_DEFAULTS);
  useEffect(() => {
    let cancelled = false, unsub = null;
    (async () => {
      try { const res = await window.storage.get("house_rules", true); if (!cancelled && res) setHr({ ...HOUSE_RULE_DEFAULTS, ...JSON.parse(res.value) }); }
      catch {}
      if (window.storage.subscribe) {
        unsub = window.storage.subscribe("house_rules", true, (raw) => { try { setHr({ ...HOUSE_RULE_DEFAULTS, ...JSON.parse(raw) }); } catch {} });
      }
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, []);
  const persist = useCallback(async (patch) => {
    const next = { ...HOUSE_RULE_DEFAULTS, ...hr, ...patch };
    setHr(next);
    try { await window.storage.set("house_rules", JSON.stringify(next), true); } catch {}
  }, [hr]);
  CURRENT_HOUSE_RULES = hr;   // keep the module mirror current for pure compute fns
  return [hr, persist];
}

// Keep CURRENT_ENV_GRAVITY mirrored to the party's current world so the Weighted
// math reflects gravity everywhere at once. Mounted app-wide in App(); returns
// the live world gravity (or null) for anyone that wants it.
function useEnvGravitySync() {
  const [houseRules] = useHouseRules();
  const [universe] = useSharedList("universe");
  const galaxy = universe && universe[0];
  let g = null;
  if (houseRules.harshGalaxies && galaxy && galaxy.currentPlanetId) {
    const p = (galaxy.systems || []).flatMap(s => s.planets || []).find(x => x.id === galaxy.currentPlanetId);
    if (p && p.gravity != null) g = p.gravity;
  }
  CURRENT_ENV_GRAVITY = g;
  return g;
}

// The active environmental effect hooks this session: the union of hooks from the
// current world's active hazards and its system's star traits. Mirrored so pure
// compute functions and rolls can read them. Kept fresh by useEnvHooksSync().
let CURRENT_ENV_HOOKS = [];
const envHooksOf = (type) => CURRENT_ENV_HOOKS.filter(h => h.type === type);
// Flat modifier for a roll kind; an "all d20" hook applies to every kind.
const envFlatMod = (kind) => envHooksOf("flatPenalty").filter(h => h.to === kind || h.to === "all d20").reduce((s, h) => s + (+h.amount || 0), 0);
const envKiCostMult = () => envHooksOf("kiField").filter(h => h.mode === "ki cost").reduce((m, h) => m * (+h.mult || 1), 1);
const envKiRegenMult = () => envHooksOf("kiField").filter(h => h.mode === "ki regen").reduce((m, h) => m * (+h.mult || 1), 1);
const envDmgPerTurn = () => envHooksOf("dmgPerTurn").map(h => h.formula || "1d4");
const envWeightedRanks = () => envHooksOf("weightedRanks").reduce((s, h) => s + (+h.ranks || 0), 0);
const envMoveMod = () => envHooksOf("movementMod").reduce((s, h) => s + (+h.feet || 0), 0);
// A human list of what's currently in effect, for the Environment banner.
const envEffectSummary = () => {
  const parts = [];
  const byTo = {};
  envHooksOf("flatPenalty").forEach(h => { byTo[h.to] = (byTo[h.to] || 0) + (+h.amount || 0); });
  Object.entries(byTo).forEach(([to, amt]) => { if (amt) parts.push(`${amt > 0 ? "+" : ""}${amt} ${to}`); });
  const kc = envKiCostMult(); if (kc !== 1) parts.push(`Ki cost x${kc}`);
  const kr = envKiRegenMult(); if (kr !== 1) parts.push(`Ki regen x${kr}`);
  const dmg = envDmgPerTurn(); if (dmg.length) parts.push(`${dmg.join(" + ")} per turn`);
  const mv = envMoveMod(); if (mv) parts.push(`${mv > 0 ? "+" : ""}${mv} ft speed`);
  const w = envWeightedRanks(); if (w) parts.push(`Weighted ${w > 0 ? `Light ${w}` : `Heavy ${-w}`}`);
  return parts;
};

// Gather the active environmental hooks (Harsh Galaxies only) from the current
// world's active hazards + its star traits, and mirror them for the appliers.
function useEnvHooksSync() {
  const [houseRules] = useHouseRules();
  const [universe] = useSharedList("universe");
  const [envState] = useSharedList("session_env");
  const hreg = useRegistry("hazards");
  const sreg = useRegistry("startraits");
  const wreg = useRegistry("weather");
  const hooks = [];
  if (houseRules.harshGalaxies) {
    const galaxy = universe && universe[0];
    const loc = galaxy && galaxy.currentPlanetId
      ? (galaxy.systems || []).map(s => ({ s, p: (s.planets || []).find(p => p.id === galaxy.currentPlanetId) })).find(x => x.p)
      : null;
    const env = (envState && envState[0]) || { active: {} };
    const active = env.active || {};
    const curWeather = loc ? loc.p.weather : null;
    if (!hreg.loading) {
      for (const e of hreg.entries.filter(x => x.enabled)) {
        const on = weatherMatchesEntry(curWeather, e.weatherMatch) || active[e._id];
        if (on) for (const h of ((e.effect && e.effect.hooks) || [])) hooks.push(h);
      }
    }
    if (loc && !sreg.loading) {
      for (const n of ((loc.s.star && loc.s.star.traits) || [])) {
        const e = sreg.entries.find(x => x._id === n && x.enabled);
        if (e) for (const h of ((e.effect && e.effect.hooks) || [])) hooks.push(h);
      }
    }
    // The current world's weather can carry its own effect hooks now.
    if (curWeather && !wreg.loading) {
      const we = wreg.entries.find(x => x.enabled && x._name === curWeather);
      if (we) for (const h of ((we.effect && we.effect.hooks) || [])) hooks.push(h);
    }
  }
  CURRENT_ENV_HOOKS = hooks;
  return hooks;
}

/* ============================== UI atoms ============================== */
function ScannerHeader({ title, subtitle, onBack }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: `linear-gradient(135deg, ${COLORS.panel} 0%, #0D1017 100%)`, padding: "16px 20px", marginBottom: 18 }}>
      <div style={{ position: "absolute", top: 0, left: "-30%", width: "30%", height: "100%", background: `linear-gradient(90deg, transparent, ${COLORS.blue}22, transparent)`, animation: "scanmove 3.5s linear infinite" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && <button onClick={onBack} style={{ background: "transparent", border: "none", color: COLORS.muted, cursor: "pointer", display: "flex" }}><ArrowLeft size={19} /></button>}
        <div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: 1.3, color: COLORS.text, textShadow: `0 0 18px ${COLORS.blue}33` }}>{title}</div>
          {subtitle && <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 3 }}>{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}
function Gauge({ label, value, max, color, icon: Icon }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.muted, marginBottom: 3, fontFamily: "JetBrains Mono, monospace" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icon && <Icon size={11} />} {label}</span>
        <span style={{ color: COLORS.text }}>{(value ?? 0).toLocaleString()}/{(max ?? 0).toLocaleString()}</span>
      </div>
      <div style={{ height: 7, background: "#00000055", borderRadius: 4, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}99, ${color})`, boxShadow: `0 0 8px ${color}88`, transition: "width .3s" }} />
      </div>
    </div>
  );
}
function Btn({ children, onClick, variant = "default", size = "md", style, ...rest }) {
  const base = { fontFamily: "Inter, sans-serif", fontWeight: 600, cursor: "pointer", border: `1px solid ${COLORS.border}`, borderRadius: 7, display: "inline-flex", alignItems: "center", gap: 6, transition: "all .15s", padding: size === "sm" ? "5px 10px" : "8px 14px", fontSize: size === "sm" ? 12.5 : 13.5, background: COLORS.panel2, color: COLORS.text };
  const variants = {
    default: {}, gold: { background: `${COLORS.gold}1A`, borderColor: `${COLORS.gold}55`, color: COLORS.gold },
    blue: { background: `${COLORS.blue}1A`, borderColor: `${COLORS.blue}55`, color: COLORS.blue },
    danger: { background: `${COLORS.red}15`, borderColor: `${COLORS.red}44`, color: COLORS.red },
    ghost: { background: "transparent", borderColor: "transparent" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }} {...rest}
      onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.borderLit}
      onMouseLeave={e => e.currentTarget.style.borderColor = variants[variant].borderColor || COLORS.border}>{children}</button>
  );
}
// Two-step confirm — replaces blocking native confirm(). First click arms the
// button into ✓/✗; confirming fires onConfirm. Auto-disarms after a few seconds.
function ConfirmBtn({ children, onConfirm, variant = "danger", size = "sm", style, confirmTitle = "Confirm", ...rest }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 3500); return () => clearTimeout(t); }, [armed]);
  if (!armed) return <Btn variant={variant} size={size} style={style} onClick={e => { e.stopPropagation(); setArmed(true); }} {...rest}>{children}</Btn>;
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      <Btn variant="danger" size={size} title={confirmTitle} onClick={e => { e.stopPropagation(); setArmed(false); onConfirm(); }}><Check size={13} /></Btn>
      <Btn variant="ghost" size={size} title="Cancel" onClick={e => { e.stopPropagation(); setArmed(false); }}><X size={13} /></Btn>
    </span>
  );
}
function Field({ label, children }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>{children}</label>; }
const inputStyle = { width: "100%", background: "#0D0F16", border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.text, padding: "7px 10px", fontSize: 13.5, fontFamily: "Inter, sans-serif", outline: "none" };
// Number fields select their contents on focus so typing replaces the value
// instead of appending to a leading "0" (player feedback).
function TextInput(props) {
  const onFocus = props.type === "number" ? (e => { e.target.select(); props.onFocus?.(e); }) : props.onFocus;
  return <input {...props} onFocus={onFocus} style={{ ...inputStyle, ...(props.style||{}) }} />;
}
// Auto-grows to fit its content so notes/descriptions expand to show everything
// (player feedback) — line breaks and long text stay fully visible without scrolling.
function TextArea(props) {
  const grow = (el) => { if (el) { el.style.height = "auto"; el.style.height = Math.max(el.scrollHeight, 60) + "px"; } };
  return <textarea {...props} ref={grow} onInput={e => { grow(e.target); props.onInput?.(e); }}
    style={{ ...inputStyle, resize: "vertical", minHeight: 60, overflow: "hidden", ...(props.style||{}) }} />;
}
function Select({ children, ...props }) { return <select {...props} style={{ ...inputStyle, ...(props.style||{}) }}>{children}</select>; }

// A starship-console dropdown: angular clipped corners, monospace uppercase text,
// a scanning glow, and ▸ markers. options = [{ value, label, count? }].
function SciSelect({ value, onChange, options, placeholder = "SELECT", width = 180, accent = COLORS.blue }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const sel = options.find(o => o.value === value);
  const clip = "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))";
  const mono = "JetBrains Mono, monospace";
  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(${COLORS.panel2}, #0b1220)`, border: `1px solid ${accent}${open ? "cc" : "66"}`, color: sel ? accent : COLORS.muted, padding: "8px 11px", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: mono, cursor: "pointer", textAlign: "left", clipPath: clip, boxShadow: open ? `0 0 12px ${accent}55, inset 0 0 8px ${accent}22` : `inset 0 0 6px ${accent}14` }}>
        <span style={{ color: accent, opacity: 0.7 }}>▸</span>
        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sel ? sel.label : placeholder}</span>
        {sel && sel.count != null && <span style={{ opacity: 0.8 }}>[{sel.count}]</span>}
        <span style={{ color: accent, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s", fontSize: 9 }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0, zIndex: 60, background: "#0a121e", border: `1px solid ${accent}88`, boxShadow: `0 0 16px ${accent}44`, maxHeight: 300, overflowY: "auto", padding: 3, clipPath: clip }}>
          {options.length === 0 && <div style={{ padding: "8px 10px", fontSize: 11, color: COLORS.dim, fontFamily: mono, letterSpacing: 1 }}>NO DATA</div>}
          {options.map(o => { const on = o.value === value; return (
            <div key={String(o.value)} onClick={() => { onChange(o.value); setOpen(false); }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${accent}14`; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", cursor: "pointer", background: on ? `${accent}22` : "transparent", color: on ? accent : COLORS.text, fontSize: 11.5, letterSpacing: 0.6, textTransform: "uppercase", fontFamily: mono }}>
              <span style={{ color: accent, opacity: on ? 1 : 0.35 }}>{on ? "▸" : "·"}</span>
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.label}</span>
              {o.count != null && <span style={{ opacity: 0.7 }}>[{o.count}]</span>}
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}
// Dropdown that still allows free text ("Other…") — book lists are incomplete
// for some fields (heritages), and custom values like "Cyborg" gate mechanics.
function SelectWithCustom({ value, onChange, options, placeholder }) {
  const [typing, setTyping] = useState(false);
  if (!options.length || typing || (value && !options.includes(value))) {
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus={typing} />
        {options.length > 0 && <Btn size="sm" onClick={() => { setTyping(false); onChange(""); }} title="Pick from list"><X size={13}/></Btn>}
      </div>
    );
  }
  return (
    <Select value={value || ""} onChange={e => { if (e.target.value === "__other__") { setTyping(true); onChange(""); } else onChange(e.target.value); }}>
      <option value="">—</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
      <option value="__other__">Other…</option>
    </Select>
  );
}
// Styled replacement for the bare OS checkbox (player feedback) — real <input>
// stays in the tree (hidden) so keyboard/label semantics are unchanged.
function Checkbox({ checked, onChange, disabled, style }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0, ...style }}>
      <input type="checkbox" checked={!!checked} disabled={disabled} onChange={onChange} style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", margin: 0, cursor: disabled ? "default" : "pointer" }} />
      <span style={{ width: 15, height: 15, borderRadius: 4, border: `1px solid ${checked ? COLORS.gold : COLORS.borderLit}`, background: checked ? COLORS.gold : "#0D0F16", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all .15s", opacity: disabled ? 0.45 : 1 }}>
        {checked && <Check size={11} strokeWidth={3.5} color="#0D0F16" />}
      </span>
    </span>
  );
}
// Number input that comma-formats while you type (player feedback). Emits a
// plain number via onValue; accepts an optional leading minus.
function CommaNumInput({ value, onValue, style, ...rest }) {
  const num = typeof value === "number" && !isNaN(value) ? value : 0;
  const handle = (e) => {
    const raw = e.target.value.replace(/[^\d-]/g, "");
    const n = parseInt(raw, 10);
    onValue(isNaN(n) ? 0 : n);
  };
  return <input {...rest} type="text" inputMode="numeric" value={num.toLocaleString()} onChange={handle}
    onFocus={e => { e.target.select(); rest.onFocus?.(e); }} style={{ ...inputStyle, ...(style||{}) }} />;
}
function Tag({ children, color = COLORS.dim, onRemove }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, background: `${color}22`, color, border: `1px solid ${color}55`, borderRadius: 20, padding: "2px 9px", marginRight: 5, marginBottom: 5 }}>{children}{onRemove && <X size={11} style={{ cursor: "pointer" }} onClick={onRemove} />}</span>;
}
// Hover to reveal on desktop, tap to toggle on mobile — used for feature/technique descriptions.
function InfoChip({ label, description, color = COLORS.blue, sub }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block", marginRight: 8, marginBottom: 8 }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div onClick={() => setOpen(o => !o)} style={{
        cursor: "pointer", fontSize: 12.5, fontWeight: 600, background: `${color}18`, color,
        border: `1px solid ${color}55`, borderRadius: 8, padding: "7px 11px", userSelect: "none",
      }}>
        {label}{sub && <span style={{ color: COLORS.dim, fontWeight: 500, marginLeft: 5, fontSize: 11 }}>{sub}</span>}
      </div>
      {open && description && (
        <div style={{
          position: "absolute", top: "110%", left: 0, zIndex: 20, width: 240,
          background: COLORS.panel2, border: `1px solid ${color}55`, borderRadius: 8, padding: 10,
          fontSize: 12, color: COLORS.text, lineHeight: 1.5, boxShadow: "0 6px 20px #00000088",
        }}>{description}</div>
      )}
    </div>
  );
}
function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px", color: COLORS.muted, border: `1px dashed ${COLORS.border}`, borderRadius: 10, background: COLORS.panel }}>
      <Icon size={28} style={{ opacity: 0.4, marginBottom: 10 }} />
      <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 380, margin: "0 auto 14px" }}>{body}</div>
      {action}
    </div>
  );
}
function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function LoadingBlock() { return <div style={{ color: COLORS.muted, padding: 40, textAlign: "center", fontFamily: "JetBrains Mono, monospace" }}>Loading table data…</div>; }
function ErrorBanner({ text }) { return <div style={{ background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}55`, color: COLORS.red, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, marginBottom: 12 }}>{text}</div>; }
function ModeCard({ title, desc, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold + "77"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
      <div style={{ color: COLORS.muted, fontSize: 12.5 }}>{desc}</div>
    </div>
  );
}
function Pills({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: "6px 12px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          border: `1px solid ${value === o ? COLORS.gold : COLORS.border}`,
          background: value === o ? `${COLORS.gold}1A` : COLORS.panel2, color: value === o ? COLORS.gold : COLORS.text,
        }}>{o}</button>
      ))}
    </div>
  );
}

/* ============================== NAME / FLAVOR POOLS (GM Toolkit tables) ============================== */
const NPC_POOLS = {
  first: ["Kessu","Vorra","Brenlo","Nadeth","Zhun","Karrik","Tessek","Ombra","Yulen","Draza","Miku","Solen","Tarrow","Vex","Ondu","Ketch"],
  last: ["of the Red Sands","Ironhide","of Namek's Edge","Voss","the Wandering","Karr-Sett","of North Galaxy","Steelclaw","the Unbroken","Dray'zul"],
  species: ["Saiyan","Namekian","Human","Majin","Android","Cerealian","Beastman","Zoolatar","Demon World Denizen","Grey","Tuffle","Yardratian","Acorsian"],
  role: ["Rookie Fighter","Bandit Captain","Wandering Sage","Bounty Hunter","Village Elder","Arena Champion","Rogue Scientist","Ki Cultist","Merchant-Smuggler","Failed Experiment","Retired Soldier","Street Brawler"],
  hook: ["Owes a debt to a crime syndicate.","Searching for a lost sibling.","Secretly weaker than their reputation suggests.","Hunting the party for a bounty.","Wants to defect from their faction.","Obsessed with surpassing a childhood rival.","Guards a Dragon Ball fragment.","Was exiled from their homeworld."],
  planet: ["Konatsu Prime","the Red Wastes of Xerath","the floating city of Ombrus","New Namek's outer moon","the ruined arena world Grellow","the ice-locked station Veyra-9","the trading hub Marrowgate","the jungle world Sennai"],
  clothing: ["torn training gi","corp-issue combat suit","tattered heritage robes","scavenged armor plating","street-gang colors","ceremonial fighting garb"],
};
const NAME_TABLE = { id: "npc_names", name: "NPC Name Generator", die: "roll", source: "GM Toolkit", pools: NPC_POOLS };

/* ============================== CHARACTERS ============================== */
// Real species names pulled from the rulebook (Chapter 3). Custom species added
// via the Encyclopedia (Data Pool, type "species") merge into this list live.
// Base species list = the real book species (from SPECIES_DATA).
const SPECIES_BASE_LIST = SPECIES_DATA.map(s => s.name);
const speciesByName = (name) => SPECIES_DATA.find(s => s.name.toLowerCase() === (name || "").toLowerCase()) || null;

function useSpeciesList() {
  const [custom] = useSharedList("compendium_v2");
  const races = useRegistry("races");
  const customSpecies = (custom || []).filter(e => e.type === "species").map(e => e.name);
  // Enabled races from the registry (book species + registry customs, minus disabled).
  const base = races.loading ? SPECIES_BASE_LIST : races.entries.filter(e => e.enabled).map(e => e._name);
  const merged = Array.from(new Set([...base, ...customSpecies])).sort();
  return merged;
}

const blankChar = () => ({
  id: uid(), name: "New Fighter", species: "", subspecies: "", heritage: "", classId: "", level: 1,
  classes: [], // multiclass: [{ classId, level }] — classId/level above stay synced as denormalized copies
  hp: 20, maxHp: 20, ki: 20, maxKi: 20, stamina: 5, maxStamina: 5, maxStaminaOverride: null,
  ac: 12, dr: 0, acOverride: false, drOverride: false, attacksPerTurn: 1, kiRankOverride: null,
  equipment: {}, // physical slot key → item id (references items[])
  powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0 },
  speedBase: 30, speedExtra: 0, zeni: 0, resistances: [],
  deathSaves: { success: 0, fail: 0 },
  alignment: "", pictureUrl: "",
  appearance: { age: "", height: "", weight: "", size: "Medium", gender: "", eyes: "", hair: "", skin: "" },
  personality: "", flaws: "",
  stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  conditions: [], activeConditions: {}, techniques: [], forms: [], items: [], equipped: [], notes: "", handle: "",
  trainingBoons: { current: 0, max: 4 }, features: [],
  savingThrowProfs: [], skillProfs: {}, speciesSkillChoices: [], feats: [],
  customMoves: [], moveOverrides: {}, // Combat: player-made moves + edits to computed ones
  breatherPool: null, // Stamina pool (Lv + CON mod); null = full
  weightedUnattuned: false, weightedManual: 0, // Weighted (Heavy/Light) state
  accustomedGravity: 0, // max gravity (×g) they can handle; drives Gravity Acclimation
  injuries: [], // [{ id, name, location, notes }]
  vitals: { exhaustion: 0, food: 3, water: 3, rest: 3 }, // 0–3 trackers (3 = full)
  // Spellcasting container — see spellStats()/isCaster(). Empty by default; the
  // Magic tab only appears for caster classes (or when enabled is set).
  spellcasting: {
    enabled: false,       // force-show the tab for a non-detected caster
    ability: "",          // "" = use the class default (defaultCasterAbility)
    maxSpellLevel: 0,     // highest castable Spell/Burst level (book table; editable)
    schools: [],          // chosen Schools of Magic (names from SPELL_SCHOOLS)
    cantrips: [],         // [{ id, name, notes }]
    spells: [],           // [{ id, name, level, notes }]
    slots: [],            // [{ id, level, current, max }] — slot-casters (Mystic)
    pools: [],            // [{ id, name, current, max, reset:"short"|"long" }]
  },
  // Resource trackers (book Ch.1/10). Max Hit Dice = character level; the die
  // size is class-set (editable, no per-class die in CLASS_DATA). Temp pools sit
  // on top of HP/Ki/Stamina and clear on a Long Rest. God Ki is usually gained
  // at Lv20. Attunement max 2, Soulbind max 2.
  hitDie: "d8", hitDiceUsed: 0,
  temp: { hp: 0, ki: 0, stamina: 0 },
  godKi: { current: 0, max: 0, temp: 0 },
  attunements: [], // [{ id, name }] — max 2
  soulbinds: [],   // [{ id, name }] — max 2
  // Limited-use resource pools. Class-granted ones (source:"class") are auto-built
  // from CLASS_RESOURCES by reconcileResources; custom ones (source:"custom") are
  // player-made. { id, key, source, name, die, max, current, reset, regen, note }.
  resources: [],
  // Installed High-Tech Parts (cybernetics): [{ uid, partId, signature }].
  cybernetics: [],
});

// One migration path for every character regardless of how/when it was created
// (pregen, quick paths, imports, or saves from before a field existed).
// Items used to be a free-text string[]; upgrade to structured entries with
// rarity/zeni/qty so nothing is lost and old saves keep working.
function normalizeItem(it) {
  if (typeof it === "string") it = { name: it };
  return {
    id: it.id || uid(), catalogId: it.catalogId || null,
    name: it.name || "", category: it.category || "", slot: it.slot || "",
    rarity: it.rarity || "common", zeni: it.zeni || 0, qty: it.qty || 1,
    weightedRank: it.weightedRank || 0, notes: it.notes || "",
    // defense
    acBase: it.acBase || 0, acDexMode: it.acDexMode || "full", acHalfProf: it.acHalfProf != null ? it.acHalfProf : true,
    acBonus: it.acBonus || 0, dr: it.dr || 0, stealthDisadv: it.stealthDisadv || false, strReq: it.strReq || 0,
    // weapon
    damageDice: it.damageDice || "", damageType: it.damageType || "", attackStat: it.attackStat || "str",
    // named conditions/effects this item grants (descriptive for now)
    effects: Array.isArray(it.effects) ? it.effects.map(e => ({ id: e.id || uid(), name: e.name || "", description: e.description || "" })) : [],
    // Ability Score changes while equipped — see effectiveStats().
    statMods: Array.isArray(it.statMods)
      ? it.statMods.map(m => ({ id: m.id || uid(), stat: m.stat || "str", mode: m.mode === "add" ? "add" : "set", value: Number(m.value) || 0 }))
      : [],
  };
}

function migrateChar(char) {
  // Legacy flat "equipped" strings become carried inventory items so nothing is
  // lost when moving to the paperdoll (slot→item) model.
  const legacyEquipped = (char.equipped || []).filter(e => typeof e === "string").map(name => normalizeItem({ name }));
  const merged = {
    ...blankChar(), ...char,
    items: [...(char.items || char.gear || []).map(normalizeItem), ...legacyEquipped],
    equipment: char.equipment || {},
    equipped: [],
    customMoves: char.customMoves || [],
    moveOverrides: char.moveOverrides || {},
    breatherPool: char.breatherPool !== undefined ? char.breatherPool : null,
    weightedUnattuned: char.weightedUnattuned || false,
    weightedManual: char.weightedManual || 0,
    injuries: char.injuries || [],
    vitals: { exhaustion: 0, food: 3, water: 3, rest: 3, ...(char.vitals || {}) },
    spellcasting: { enabled: false, ability: "", maxSpellLevel: 0, schools: [], cantrips: [], spells: [], slots: [], pools: [], ...(char.spellcasting || {}) },
    hitDie: char.hitDie || "d8", hitDiceUsed: char.hitDiceUsed || 0,
    temp: { hp: 0, ki: 0, stamina: 0, ...(char.temp || {}) },
    godKi: { current: 0, max: 0, temp: 0, ...(char.godKi || {}) },
    attunements: char.attunements || [],
    soulbinds: char.soulbinds || [],
    resources: char.resources || [],
    cybernetics: char.cybernetics || [],
    features: char.features || [],
    // Feats are instances now (uid) so repeatable ones — ASI — can be taken
    // more than once and removed individually.
    feats: (char.feats || []).map(f => ({ ...f, uid: f.uid || uid() })),
    trainingBoons: char.trainingBoons || { current: 0, max: 4 },
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0, ...(char.powerBonus || {}) },
    appearance: { age: "", height: "", weight: "", size: "Medium", gender: "", eyes: "", hair: "", skin: "", ...(char.appearance || {}) },
    deathSaves: char.deathSaves || { success: 0, fail: 0 },
  };
  // Techniques used to be a free-text string[]; upgrade any old entries to the
  // structured shape (kept as custom/free-text so nothing is lost).
  merged.techniques = (char.techniques || []).map(t =>
    typeof t === "string"
      ? { uid: uid(), techId: null, custom: true, mastery: 0, name: t, lineName: "", techType: "", kiRank: "", kiCost: "", castingTime: "", range: "", damageDice: "", damageType: "", resolution: "utility", saveAbility: "", fullText: "" }
      : t
  );
  // Known techniques snapshot the book entry when added, so techniques added
  // before the merge script learned to inherit resolution across ranks are
  // frozen as "utility" — they roll damage with no attack roll or save DC.
  // Re-adopt the book's resolution for exactly that case; custom techniques and
  // anything without damage dice are left untouched.
  merged.techniques = merged.techniques.map(t => {
    if (t.custom || !t.techId || !t.damageDice || t.resolution !== "utility") return t;
    const book = TECHNIQUE_DATA.find(b => b.id === t.techId);
    if (!book || book.resolution === "utility") return t;
    return { ...t, resolution: book.resolution, saveAbility: t.saveAbility || book.saveAbility };
  });
  if ((!merged.classes || !merged.classes.length) && merged.classId) {
    merged.classes = [{ classId: merged.classId, level: merged.level || 1 }];
  }
  // Hand-entered stamina that disagrees with the book formula becomes an
  // explicit override instead of silently changing under the player.
  if (merged.maxStaminaOverride == null && merged.maxStamina != null) {
    const formula = Math.max(1, 2 + statMod(merged, "con") + 2 * (charTotalLevel(merged) - 1));
    if (merged.maxStamina !== formula) merged.maxStaminaOverride = merged.maxStamina;
  }
  // Preserve any DR a character already carries (class features, etc.): if they
  // had a manual DR that the worn armor doesn't account for, keep it as an
  // override so re-opening the sheet never silently zeroes it.
  if (char.drOverride == null && (char.dr || 0) !== computeArmorDR(merged)) {
    merged.drOverride = (char.dr || 0) > 0;
  }
  return merged;
}

const PREGEN_CHARS = [
  { name: "Kael Redstreak", classId: "Bruiser", species: "Saiyan", level: 5, hp: 55, maxHp: 55, ki: 30, maxKi: 30, stamina: 8, maxStamina: 8, ac: 15, notes: "Hot-headed brawler, always first into a fight." },
  { name: "Nira Voss", classId: "Guardian", species: "Namekian", level: 5, hp: 45, maxHp: 45, ki: 40, maxKi: 40, stamina: 7, maxStamina: 7, ac: 14, notes: "Calm support caster, keeps the party alive." },
  { name: "Dex Okonda", classId: "Agent", species: "Cerealian", level: 5, hp: 38, maxHp: 38, ki: 28, maxKi: 28, stamina: 6, maxStamina: 6, ac: 16, notes: "Gadget specialist, plans three steps ahead." },
];

function ClassPicker({ value, onConfirm, onCancel }) {
  const [sel, setSel] = useState(value || CLASS_NAMES[0]);
  const c = CLASS_DATA[sel];
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, overflowX: "auto" }}>
        {CLASS_NAMES.map(n => (
          <button key={n} onClick={() => setSel(n)} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${sel === n ? COLORS.gold : COLORS.border}`, background: sel === n ? `${COLORS.gold}1A` : COLORS.panel2, color: sel === n ? COLORS.gold : COLORS.text, whiteSpace: "nowrap" }}>{n}</button>
        ))}
      </div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 16 }}>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{sel}</div>
        <div style={{ height: 1, background: COLORS.border, marginBottom: 10 }} />
        <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, maxHeight: 180, overflowY: "auto" }}>{c.flavor}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <Btn variant="gold" onClick={() => onConfirm(sel)}><Check size={14}/> Confirm</Btn>
          <Btn onClick={onCancel}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

function AbilityTab({ classId, level }) {
  if (!classId || !CLASS_DATA[classId]) return <EmptyState icon={BookOpen} title="No class selected" body="Pick a class in the Class tab to see its live feature progression here." />;
  const c = CLASS_DATA[classId];
  const lvls = Object.keys(c.featuresByLevel).map(Number).filter(l => l <= (level || 20)).sort((a,b) => a-b);
  return (
    <div>
      <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{classId} — Level {level}</div>
      <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>{c.flavor}</div>
      {lvls.map(l => (
        <div key={l} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
          <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 7, background: `${COLORS.blue}15`, border: `1px solid ${COLORS.blue}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: COLORS.blue, fontWeight: 700 }}>{l}</div>
          <div style={{ fontSize: 13, color: COLORS.text, paddingTop: 6 }}>{c.featuresByLevel[l]}</div>
        </div>
      ))}
    </div>
  );
}

// Book species traits readout — shows under the Species field when the selected
// species matches book data (SPECIES_DATA).
function SpeciesTraits({ species }) {
  const sp = speciesByName(species);
  if (!sp) return null;
  const row = (label, val) => val ? (
    <div style={{ display: "flex", gap: 6, fontSize: 11.5, lineHeight: 1.5 }}>
      <span style={{ color: COLORS.dim, minWidth: 92, flexShrink: 0 }}>{label}</span>
      <span style={{ color: COLORS.muted }}>{val}</span>
    </div>
  ) : null;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{sp.name}</span>
        <span style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>{sp.category}</span>
        {!sp.complete && <span style={{ fontSize: 9, color: COLORS.amber }}>partial data</span>}
      </div>
      {sp.description && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5, marginBottom: 8, fontStyle: "italic" }}>{sp.description}</div>}
      {row("Ability Scores", sp.abilityScoreIncrease)}
      {row("Speed", sp.speed)}
      {row("Languages", sp.languages)}
      {row("Skills", sp.skills)}
      {sp.features?.length > 0 && row("Features", sp.features.join(", "))}
      {sp.subSpecies?.length > 0 && row("Sub-Species", sp.subSpecies.join(", "))}
    </div>
  );
}

// Picker for species that grant a *choice* of Skills (e.g. Celestial Primate:
// Acrobatics + one of Nature/Survival/Religion). Renders only when the current
// species has a skillChoice; the picks feed the Skill floor via speciesSkillData.
function SpeciesSkillChoice({ char, set }) {
  const { sp, fixed, choice, pool, chosen } = speciesSkillData(char);
  if (!sp || !choice) return null;
  const toggle = (skill) => {
    const cur = new Set(chosen);
    if (cur.has(skill)) cur.delete(skill);
    else if (cur.size < choice.count) cur.add(skill);
    set({ speciesSkillChoices: [...cur] });
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
          Species Skill{choice.count > 1 ? "s" : ""} — choose {choice.count}{choice.from === "*" ? " (any)" : ""}
        </span>
        <span style={{ fontSize: 10.5, color: chosen.length === choice.count ? COLORS.gold : COLORS.dim }}>{chosen.length}/{choice.count}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {pool.map(skill => {
          const on = chosen.includes(skill);
          const full = !on && chosen.length >= choice.count;
          return (
            <button key={skill} onClick={() => toggle(skill)} disabled={full}
              style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 12, cursor: full ? "default" : "pointer",
                background: on ? `${COLORS.gold}22` : COLORS.panel, color: on ? COLORS.gold : full ? COLORS.dim : COLORS.muted,
                border: `1px solid ${on ? COLORS.gold + "88" : COLORS.border}`, opacity: full ? 0.5 : 1 }}>
              {skill}
            </button>
          );
        })}
      </div>
      {fixed.length > 0 && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 8 }}>Always granted: {fixed.join(", ")}</div>}
    </div>
  );
}

function SpeciesPicker({ value, onChange, customValue, onCustomChange }) {
  const speciesList = useSpeciesList();
  const [addingNew, setAddingNew] = useState(false);
  const [newSpecies, persistCompendium] = useSharedList("compendium_v2");

  const addCustomSpecies = () => {
    const name = (customValue || "").trim();
    if (!name) return;
    const list = newSpecies || [];
    persistCompendium([...list, { id: uid(), type: "species", name, cost: "", rank: "", range: "", damage: "", description: "Added from character creation." }]);
    onChange(name);
    onCustomChange("");
    setAddingNew(false);
  };

  return (
    <div>
      {!addingNew ? (
        <div style={{ display: "flex", gap: 6 }}>
          <Select value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1 }}>
            <option value="">Select a species...</option>
            {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Btn size="sm" onClick={() => setAddingNew(true)} title="Add a new species to the Encyclopedia"><Plus size={13}/></Btn>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={customValue} onChange={e => onCustomChange(e.target.value)} placeholder="New species name..." onKeyDown={e => e.key==="Enter" && addCustomSpecies()} />
          <Btn size="sm" variant="gold" onClick={addCustomSpecies}><Check size={13}/></Btn>
          <Btn size="sm" variant="ghost" onClick={() => setAddingNew(false)}><X size={13}/></Btn>
        </div>
      )}
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Adding a new species saves it to the Encyclopedia so it's available for everyone next time.</div>
    </div>
  );
}

function FeaturesTab({ char, set }) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAction, setNewAction] = useState("");
  const [newMax, setNewMax] = useState("");
  // Each class contributes features up to its OWN level, not the total.
  const classFeatures = charClasses(char).flatMap(({ classId, level }) =>
    CLASS_DATA[classId]
      ? Object.entries(CLASS_DATA[classId].featuresByLevel)
          .filter(([lvl]) => Number(lvl) <= (level || 1))
          .map(([lvl, text]) => ({ classId, lvl, text }))
      : []
  );
  const multi = charClasses(char).length > 1;
  // Species features auto-show from SPECIES_DATA (player feedback #10). Names are
  // book-extracted; full text arrives with the Track B extraction pass.
  const sp = speciesByName(char.species);
  const speciesFeatures = (sp && sp.features) || [];
  const addCustom = () => {
    if (!newName) return;
    const max = newMax ? Number(newMax) : null;
    set({ features: [...char.features, { name: newName, description: newDesc, source: "Custom", action: newAction, maxUses: max, uses: max }] });
    setNewName(""); setNewDesc(""); setNewAction(""); setNewMax("");
  };
  const removeCustom = (i) => set({ features: char.features.filter((_,j) => j!==i) });
  const updateFeature = (i, patch) => set({ features: char.features.map((f, j) => j === i ? { ...f, ...patch } : f) });
  // Spend a feature: decrement its use pool (if limited) and post to the shared
  // Session feed so the table sees it.
  const useFeature = (i) => {
    const f = char.features[i];
    const tracked = Number(f.maxUses) > 0;
    if (tracked) {
      const left = f.uses != null ? f.uses : f.maxUses;
      if (left <= 0) return;
      updateFeature(i, { uses: left - 1 });
    }
    logSession(`${char.name || "A fighter"} used ${f.name}${f.action ? ` (${f.action})` : ""}`, char.name || "");
  };

  return (
    <div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
        Class Features {charClasses(char).length ? `(${charClasses(char).map(c => c.classId).join(" / ")})` : ""}
      </div>
      {classFeatures.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 16 }}>Pick a Class in the Class tab to see its features here.</div>
      ) : (
        <div style={{ marginBottom: 18 }}>
          {classFeatures.map(({ classId, lvl, text }, i) => (
            <InfoChip key={`${classId}-${lvl}-${i}`} label={multi ? `${classId} ${lvl}` : `Lv ${lvl}`} sub={text.split(",")[0]} description={text} color={COLORS.blue} />
          ))}
        </div>
      )}
      {speciesFeatures.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Species Features ({sp.name})</div>
          <div style={{ marginBottom: 18 }}>
            {speciesFeatures.map((name, i) => (
              <InfoChip key={i} label={name} color={COLORS.green} />
            ))}
          </div>
        </>
      )}
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Other Features (Feats, Custom)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {char.features.map((f, i) => {
          const tracked = Number(f.maxUses) > 0;
          const left = f.uses != null ? f.uses : f.maxUses;
          return (
            <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{f.name}</span>
                {f.action && <Tag color={COLORS.blue}>{f.action}</Tag>}
                {tracked && <Tag color={left > 0 ? COLORS.green : COLORS.red}>{left}/{f.maxUses} uses</Tag>}
                {f.source && <span style={{ fontSize: 10.5, color: COLORS.dim }}>({f.source})</span>}
                <div style={{ flex: 1 }} />
                <Btn size="sm" variant="gold" disabled={tracked && left <= 0} onClick={() => useFeature(i)}><Zap size={12}/> Use</Btn>
                {tracked && left < f.maxUses && <Btn size="sm" variant="ghost" title="Restore uses (on a rest)" onClick={() => updateFeature(i, { uses: f.maxUses })}><RotateCcw size={12}/></Btn>}
                <Btn size="sm" variant="ghost" onClick={() => removeCustom(i)}><X size={13} color={COLORS.red}/></Btn>
              </div>
              {f.description && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>{f.description}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 6, marginTop: 8 }}>
                <TextInput value={f.action || ""} onChange={e => updateFeature(i, { action: e.target.value })} placeholder="Action economy — Action / Bonus / Reaction / Special…" style={{ fontSize: 11.5 }} />
                <TextInput type="number" value={f.maxUses ?? ""} onChange={e => { const m = e.target.value ? Number(e.target.value) : null; updateFeature(i, { maxUses: m, uses: m }); }} placeholder="Max uses" style={{ fontSize: 11.5, textAlign: "center" }} title="Blank = unlimited" />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        <TextInput value={newName} onChange={e => setNewName(e.target.value)} placeholder="Feature name..." />
        <TextInput value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Short description..." />
        <TextInput value={newAction} onChange={e => setNewAction(e.target.value)} placeholder="Action economy (Action / Bonus / Reaction / Special / …)" />
        <TextInput type="number" value={newMax} onChange={e => setNewMax(e.target.value)} placeholder="Max uses (blank = unlimited)" />
      </div>
      <Btn size="sm" onClick={addCustom}><Plus size={13}/> Add Feature</Btn>
    </div>
  );
}

const boonCostOf = (s) => { const m = s.match(/^(\d+) Boons?:/); return m ? Number(m[1]) : 1; };

function TrainingTab({ char, set }) {
  const tb = char.trainingBoons || {};
  const spends = tb.spends || {};
  const total = tb.total ?? tb.max ?? 4; // player sets this; migrates from old `max`
  const used = TRAINING_BOON_SPENDS.reduce((sum, s, i) => sum + (spends[i] || 0) * boonCostOf(s), 0);
  const remaining = total - used;
  const setTb = (patch) => set({ trainingBoons: { total, spends, ...patch } });
  const spend = (i, cost) => { if (remaining < cost) return; setTb({ spends: { ...spends, [i]: (spends[i] || 0) + 1 } }); };
  const refund = (i, cost) => { if ((spends[i] || 0) <= 0) return; setTb({ spends: { ...spends, [i]: spends[i] - 1 } }); };
  return (
    <div>
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Training Boons — Total</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => setTb({ total: Math.max(0, total - 1) })} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={total} onChange={e => setTb({ total: Math.max(0, +e.target.value) })} style={{ width: 60, textAlign: "center" }} />
            <button onClick={() => setTb({ total: total + 1 })} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <Gauge label="" value={used} max={total || 1} color={remaining < 0 ? COLORS.red : COLORS.gold} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11.5 }}>
          <span style={{ color: COLORS.muted }}>Used <span style={{ color: COLORS.gold, fontWeight: 700 }}>{used}</span> of {total}</span>
          <span style={{ color: remaining < 0 ? COLORS.red : COLORS.green, fontWeight: 700 }}>{remaining} remaining{remaining < 0 ? " (over!)" : ""}</span>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Spend Boons</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TRAINING_BOON_SPENDS.map((s, i) => {
          const cost = boonCostOf(s);
          const count = spends[i] || 0;
          const canSpend = remaining >= cost;
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, background: COLORS.panel, border: `1px solid ${count > 0 ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ fontSize: 12.5, color: COLORS.text, flex: 1 }}>{s}</span>
              {count > 0 && <span style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>×{count} · {count * cost} TB</span>}
              <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                <button onClick={() => refund(i, cost)} disabled={count === 0} style={{ ...miniBtnStyle, opacity: count === 0 ? 0.35 : 1, cursor: count === 0 ? "default" : "pointer" }} title="Refund one"><Minus size={12}/></button>
                <span style={{ width: 18, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{count}</span>
                <button onClick={() => spend(i, cost)} disabled={!canSpend} style={{ ...miniBtnStyle, borderColor: canSpend ? COLORS.gold + "88" : COLORS.border, color: canSpend ? COLORS.gold : COLORS.dim, opacity: canSpend ? 1 : 0.5, cursor: canSpend ? "pointer" : "default" }} title={`Spend ${cost} boon${cost>1?"s":""}`}><Plus size={12}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfCircle({ on, expertise }) {
  const color = expertise ? COLORS.blue : on ? COLORS.gold : COLORS.dim;
  return <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${color}`, background: expertise || on ? color : "transparent", flexShrink: 0 }} />;
}

function SkillsSavesTab({ char, set }) {
  const prof = profBonusForLevel(char.level);
  const [log, setLog] = useState([]);
  const toggleSave = (statKey) => {
    const cur = char.savingThrowProfs || [];
    set({ savingThrowProfs: cur.includes(statKey) ? cur.filter(s => s !== statKey) : [...cur, statKey] });
  };
  const cycleSkill = (skillName) => {
    const cur = char.skillProfs || {};
    const state = cur[skillName] || "none";
    const next = state === "none" ? "prof" : state === "prof" ? "expertise" : "none";
    set({ skillProfs: { ...cur, [skillName]: next } });
  };
  // CPR pattern: the modifier IS the roll button — tap it to roll d20 + bonus.
  const rollCheck = (label, bonus) => {
    const d20 = roll(20);
    setLog(prev => [{ id: uid(), label, d20, bonus, total: d20 + bonus }, ...prev].slice(0, 8));
    emitRoll({ label, total: d20 + bonus, detail: `d20 ${d20} ${bonus >= 0 ? "+" : ""}${bonus}`, color: COLORS.blue });
  };
  const rollBtn = (label, value, color) => (
    <button onClick={e => { e.stopPropagation(); rollCheck(label, value); }} title={`Roll d20 ${value >= 0 ? "+" : ""}${value}`}
      style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}14`, border: `1px solid ${color}55`, color, borderRadius: 5, padding: "2px 8px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "JetBrains Mono, monospace" }}>
      <Dices size={11}/>{value >= 0 ? "+" : ""}{value}
    </button>
  );
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 10, lineHeight: 1.5 }}>
        Proficiency Bonus <span style={{ color: COLORS.gold, fontWeight: 700 }}>+{prof}</span> — non-proficient Saving Throws still get half of it, rounded up (book rule). Click the dot next to Saving Throw to toggle proficiency. Click a Skill to cycle Untrained → Proficient → Expertise.
      </div>
      {log.length > 0 && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
            <span>Checks</span>
            <span onClick={() => setLog([])} style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textTransform: "none" }}>clear</span>
          </div>
          {log.map(r => (
            <div key={r.id} style={{ fontSize: 11.5, fontFamily: "JetBrains Mono, monospace", display: "flex", gap: 8, alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, color: COLORS.text }}>{r.label}</span>
              <span style={{ color: COLORS.blue, fontWeight: 700 }}>{r.total}</span>
              <span style={{ color: COLORS.dim }}>(d20 {r.d20} {r.bonus >= 0 ? "+" : ""}{r.bonus})</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
        {STAT_KEYS.map(statKey => {
          const mod = statMod(char, statKey);
          const save = computeSaveBonus(char, statKey);
          return (
            <div key={statKey} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{statKey}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim }}>{mod >= 0 ? "+" : ""}{mod} mod</div>
              </div>
              <div onClick={() => toggleSave(statKey)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 2px", borderBottom: `1px dashed ${COLORS.border}`, marginBottom: 6 }}>
                <ProfCircle on={save.proficient} />
                <span style={{ fontSize: 12, flex: 1, color: COLORS.text }}>Saving Throw</span>
                {rollBtn(`${statKey.toUpperCase()} Save`, save.value, save.proficient ? COLORS.gold : COLORS.muted)}
              </div>
              {(SKILL_LIST[statKey] || []).map(skill => {
                const sk = computeSkillBonus(char, skill);
                return (
                  <div key={skill} onClick={() => cycleSkill(skill)} title={sk.granted ? `Proficient from ${char.species} (species)` : undefined} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "3px 2px" }}>
                    <ProfCircle on={sk.state !== "none"} expertise={sk.state === "expertise"} />
                    <span style={{ fontSize: 11.5, color: COLORS.muted, flex: 1 }}>
                      {skill}
                      {sk.granted && <span style={{ fontSize: 9, color: COLORS.dim, marginLeft: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>species</span>}
                    </span>
                    {rollBtn(skill, sk.value, sk.state === "expertise" ? COLORS.blue : sk.state === "prof" ? COLORS.gold : COLORS.muted)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatsPickerTab({ char, set }) {
  const [custom] = useSharedList("custom_feats_v1");
  const [query, setQuery] = useState("");
  const [listFilter, setListFilter] = useState("all");
  if (custom === null) return <LoadingBlock />;

  const allFeats = [...FEAT_DATA, ...custom];
  const picked = char.feats || [];
  const pickedIds = new Set(picked.map(f => f.id));
  // The book marks repeatable feats in their text (e.g. ASI); those can be taken
  // more than once, so picks are stored as instances keyed by uid.
  const isRepeatable = (f) => /repeatable/i.test(f.fullText || "");
  const isASI = (f) => f.id === "book_32" || /^ability score improvement$/i.test(f.name || "");
  const results = allFeats.filter(f => {
    if (listFilter !== "all" && f.list !== listFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return f.name.toLowerCase().includes(q) || f.fullText.toLowerCase().includes(q);
  });
  const addFeat = (f) => { if (!pickedIds.has(f.id) || isRepeatable(f)) set({ feats: [...picked, { ...f, uid: uid() }] }); };
  const removeFeat = (u) => set({ feats: picked.filter(f => f.uid !== u) });
  // ASI: 3 points per take, spread across ability scores. Feeds effectiveStats()
  // through statModSources so the Stats tab shows the applied points.
  const asiUsed = (f) => STAT_KEYS.reduce((s, k) => s + ((f.asi || {})[k] || 0), 0);
  const setAsiPoint = (u, stat, delta) => set({ feats: picked.map(f => {
    if (f.uid !== u) return f;
    if (delta > 0 && asiUsed(f) >= 3) return f;
    const asi = { ...(f.asi || {}) };
    asi[stat] = Math.max(0, (asi[stat] || 0) + delta);
    return { ...f, asi };
  }) });
  const asiPicks = picked.filter(isASI);
  const owed = featsOwed(char);
  const owedBreakdown = [owed.heroic && `${owed.heroic} Heroic`, owed.general && `${owed.general} General`, owed.epic && `${owed.epic} Epic Boon`].filter(Boolean).join(" · ");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
          Feats Known ({picked.length}{owed.total ? <> / <span style={{ color: picked.length < owed.total ? COLORS.amber : COLORS.text }}>{owed.total} owed</span></> : ""})
        </span>
        {owed.total > 0 && <span title="From class levels: Heroic Surge (2 first, +1 each after) + a Feat at Lv 4/8/12/16 + Epic Boon at 19. Excludes species feats." style={{ fontSize: 10.5, color: COLORS.dim }}>{owedBreakdown}</span>}
      </div>
      {picked.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 16 }}>No Feats picked yet — search the list below to add some.</div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          {picked.map(f => (
            <span key={f.uid || f.id} style={{ position: "relative", display: "inline-block" }}>
              <InfoChip label={f.name} sub={f.list} description={f.fullText} color={COLORS[FEAT_LIST_COLOR[f.list]] || COLORS.muted} />
              <X size={11} onClick={() => removeFeat(f.uid)} style={{ position: "absolute", top: -4, right: 2, cursor: "pointer", background: COLORS.panel, borderRadius: 8, color: COLORS.red }} />
            </span>
          ))}
        </div>
      )}
      {asiPicks.map((f, idx) => (
        <div key={f.uid} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Ability Score Improvement{asiPicks.length > 1 ? ` #${idx + 1}` : ""} — {3 - asiUsed(f)} of 3 points left
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {STAT_KEYS.map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", width: 24 }}>{k}</span>
                <Btn size="sm" onClick={() => setAsiPoint(f.uid, k, -1)} style={{ padding: "2px 6px" }}><Minus size={10}/></Btn>
                <span style={{ width: 14, textAlign: "center", fontWeight: 700, fontSize: 12, color: (f.asi || {})[k] ? COLORS.gold : COLORS.dim }}>{(f.asi || {})[k] || 0}</span>
                <Btn size="sm" onClick={() => setAsiPoint(f.uid, k, 1)} style={{ padding: "2px 6px" }}><Plus size={10}/></Btn>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Feats to add..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={listFilter} onChange={e => setListFilter(e.target.value)} style={{ width: 150 }}>
          <option value="all">All lists</option>
          {FEAT_LISTS.map(l => <option key={l} value={l}>{l}</option>)}
        </Select>
      </div>
      <div style={{ maxHeight: 340, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, paddingRight: 4 }}>
        {results.map(f => {
          const already = pickedIds.has(f.id) && !isRepeatable(f);
          const againCount = isRepeatable(f) ? picked.filter(p => p.id === f.id).length : 0;
          const color = COLORS[FEAT_LIST_COLOR[f.list]] || COLORS.muted;
          return (
            <div key={f.id} onClick={() => !already && addFeat(f)} title={f.fullText} style={{ cursor: already ? "default" : "pointer", opacity: already ? 0.45 : 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <Tag color={color}>{f.list}</Tag>
              <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>{f.name}</div>
              <div style={{ fontSize: 10, marginTop: 2, color: already ? COLORS.green : COLORS.blue }}>{already ? "✓ Known" : againCount ? `+ Add again (×${againCount})` : "+ Add"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Shared character tabs (used by FullBuilder AND the editor) -------- */

function BioTab({ char, set, withName, withNotes, customSpeciesInput, setCustomSpeciesInput }) {
  const [houseRules] = useHouseRules();
  const app = char.appearance || {};
  const setApp = (k, v) => set({ appearance: { ...app, [k]: v } });
  return (
    <div>
      {withName && (
        <Field label="Name">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.name} onChange={e => set({ name: e.target.value })} />
            <Btn size="sm" onClick={() => set({ name: `${pick(NPC_POOLS.first)} ${pick(NPC_POOLS.last)}` })} title="Reroll from Name table"><Shuffle size={13}/></Btn>
          </div>
        </Field>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Handle / Nickname"><TextInput value={char.handle} onChange={e => set({ handle: e.target.value })} placeholder="e.g. Redstreak" /></Field>
        <Field label="Alignment">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Select value={char.alignment || ""} onChange={e => set({ alignment: e.target.value })} style={{ flex: 1 }}>
              <option value="">— Alignment —</option>
              {["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"].map(a => <option key={a} value={a}>{a}</option>)}
              {char.alignment && !["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"].includes(char.alignment) && <option value={char.alignment}>{char.alignment}</option>}
            </Select>
            <div title="Aura color (book alignment table)" style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: alignmentAuraColor(char), border: `1px solid ${COLORS.border}` }} />
          </div>
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Homeworld">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.homeworld || ""} onChange={e => set({ homeworld: e.target.value })} placeholder="Planet name" />
            <Btn size="sm" onClick={() => set({ homeworld: pick(NPC_POOLS.planet) })}><Shuffle size={13}/></Btn>
          </div>
        </Field>
        {houseRules.gravityAcclimation && (
          <Field label="Accustomed Gravity (×g)">
            <TextInput type="number" step="0.1" value={char.accustomedGravity || 0} onChange={e => set({ accustomedGravity: +e.target.value })} title="Max gravity they can handle — drives Gravity Acclimation" />
          </Field>
        )}
        <Field label="Clothing Style">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.clothing || ""} onChange={e => set({ clothing: e.target.value })} />
            <Btn size="sm" onClick={() => set({ clothing: pick(NPC_POOLS.clothing) })}><Shuffle size={13}/></Btn>
          </div>
        </Field>
      </div>
      <Field label="Species">
        <SpeciesPicker value={char.species} onChange={(v) => set({ species: v })} customValue={customSpeciesInput} onCustomChange={setCustomSpeciesInput} />
      </Field>
      <SpeciesTraits species={char.species} />
      <SpeciesSkillChoice char={char} set={set} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Sub-Species"><SelectWithCustom value={char.subspecies} onChange={v => set({ subspecies: v })} options={(speciesByName(char.species) || {}).subSpecies || []} placeholder="Sub-species…" /></Field>
        <Field label="Heritage"><SelectWithCustom value={char.heritage || ""} onChange={v => set({ heritage: v })} options={HERITAGE_DATA.map(h => h.name)} placeholder="e.g. Mutant, Blessing of Komedi" /></Field>
      </div>
      <Field label="Picture URL"><TextInput value={char.pictureUrl || ""} onChange={e => set({ pictureUrl: e.target.value })} placeholder="https:// — shows on the sheet header" /></Field>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", margin: "6px 0 8px" }}>Appearance</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {[["age","Age"],["height","Height"],["weight","Weight"],["size","Size"],["gender","Gender"],["eyes","Eyes"],["hair","Hair"],["skin","Skin"]].map(([k,label]) => (
          <Field key={k} label={label}><TextInput value={app[k] || ""} onChange={e => setApp(k, e.target.value)} /></Field>
        ))}
      </div>
      <Field label="Core Personality Traits"><TextArea value={char.personality || ""} onChange={e => set({ personality: e.target.value })} placeholder="One trait per line..." /></Field>
      <Field label="Flaws & Weaknesses"><TextArea value={char.flaws || ""} onChange={e => set({ flaws: e.target.value })} placeholder="One flaw per line..." /></Field>
      {withNotes && <Field label="Notes"><TextArea value={char.notes} onChange={e => set({ notes: e.target.value })} /></Field>}
    </div>
  );
}

// Guided level-up (play editor only). Fired from ClassesTab's + button: bumps one
// class's level, rolls (or averages) HP for the new level, and previews everything
// the level changes so the player knows what to pick next. The class-level change
// cascades through useDerivedCharSync (char.level, prof bonus, max Stamina, etc.).
function LevelUpModal({ char, set, classIndex, onClose }) {
  const classes = char.classes || [];
  const c = classes[classIndex] || {};
  const fromCL = c.level || 1;
  const toCL = Math.min(20, fromCL + 1);
  const after = { ...char, classes: classes.map((x, j) => j === classIndex ? { ...x, level: toCL } : x) };
  const cd = CLASS_DATA[c.classId];
  const feats = (cd && cd.featuresByLevel && cd.featuresByLevel[toCL]) || "";
  const featTokens = feats.split(",").map(s => s.trim()).filter(Boolean);
  const grantsFeat = featTokens.some(t => /^(Feat|Epic Boon|Heroic Surge)$/.test(t));

  const die = char.hitDie || "d8";
  const dieSize = parseInt(die.slice(1), 10) || 8;
  const conMod = statMod(char, "con");
  const avgRoll = Math.floor(dieSize / 2) + 1; // 5e "fixed HP" value for the die

  const [mode, setMode] = useState("roll"); // roll | average | manual
  const [rolled, setRolled] = useState(() => roll(dieSize));
  const [manual, setManual] = useState(String(Math.max(1, avgRoll + conMod)));

  const baseDie = mode === "average" ? avgRoll : rolled;
  const hpGain = mode === "manual" ? Math.max(0, parseInt(manual, 10) || 0) : Math.max(1, baseDie + conMod);

  const rows = [
    ["Character Level", charTotalLevel(char), charTotalLevel(after)],
    ["Proficiency Bonus", profBonusForLevel(charTotalLevel(char)), profBonusForLevel(charTotalLevel(after))],
    ["Ki Rank", computeKiRank(char), computeKiRank(after)],
    ["Max Stamina", computeMaxStamina(char), computeMaxStamina(after)],
    ["Attacks / Turn", computeAttacksPerTurn(char), computeAttacksPerTurn(after)],
    ["Techniques Known (budget)", techniquesKnownBudget(char), techniquesKnownBudget(after)],
    ["Feats Owed", featsOwed(char).total, featsOwed(after).total],
  ].filter(r => r[1] !== r[2]);
  // Resource pools this level newly grants (or whose max grows) — auto-provisioned.
  const beforeRes = classGrantedResources(char);
  const afterRes = classGrantedResources(after);
  const newResources = afterRes.filter(a => {
    const b = beforeRes.find(x => x.key === a.key);
    return !b || b.max !== a.max;
  });

  const confirm = () => {
    const patch = { classes: after.classes };
    if (hpGain > 0) { patch.maxHp = (char.maxHp || 0) + hpGain; patch.hp = (char.hp || 0) + hpGain; }
    set(patch);
    onClose();
  };

  const modeBtn = (key, label) => (
    <button onClick={() => setMode(key)} style={{ flex: 1, padding: "6px 8px", fontSize: 12, fontWeight: 600, cursor: "pointer",
      background: mode === key ? `${COLORS.gold}22` : COLORS.panel, color: mode === key ? COLORS.gold : COLORS.muted,
      border: `1px solid ${mode === key ? COLORS.gold + "88" : COLORS.border}`, borderRadius: 6 }}>{label}</button>
  );

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(6,8,12,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: COLORS.panel, border: `1px solid ${COLORS.borderLit}`, borderRadius: 12, padding: 18, width: 460, maxWidth: "100%", maxHeight: "86vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <TrendingUp size={18} color={COLORS.gold} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>Level Up — {c.classId}</span>
          <span style={{ marginLeft: "auto", cursor: "pointer", color: COLORS.dim }} onClick={onClose}><X size={18} /></span>
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>{c.classId} {fromCL} → <span style={{ color: COLORS.gold, fontWeight: 700 }}>{toCL}</span></div>

        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Hit Points — {die}{conMod !== 0 ? ` ${conMod > 0 ? "+" : "−"} ${Math.abs(conMod)} CON` : ""}</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {modeBtn("roll", "Roll")}{modeBtn("average", `Average (${avgRoll})`)}{modeBtn("manual", "Manual")}
          </div>
          {mode === "roll" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}>{die} rolled <span style={{ color: COLORS.gold, fontWeight: 700 }}>{rolled}</span></span>
              <Btn size="sm" onClick={() => setRolled(roll(dieSize))}><Dices size={13} /> Re-roll</Btn>
            </div>
          )}
          {mode === "manual" && (
            <div style={{ marginBottom: 6 }}>
              <TextInput type="number" value={manual} onChange={e => setManual(e.target.value)} style={{ width: 90 }} />
              <span style={{ fontSize: 11, color: COLORS.dim, marginLeft: 8 }}>total HP added</span>
            </div>
          )}
          <div style={{ fontSize: 13, marginTop: 4 }}>
            <span style={{ color: COLORS.green, fontWeight: 700 }}>+{hpGain} HP</span>
            <span style={{ color: COLORS.dim }}> — Max HP {char.maxHp || 0} → <span style={{ color: COLORS.text, fontWeight: 700 }}>{(char.maxHp || 0) + hpGain}</span></span>
          </div>
        </div>

        {feats && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Class Features at {c.classId} {toCL}</div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{feats}</div>
            {grantsFeat && <div style={{ fontSize: 11.5, color: COLORS.gold, marginTop: 6 }}>Grants a Feat — pick it in Growth → Feats.</div>}
          </div>
        )}

        {newResources.length > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.green}44`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: COLORS.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>New Resource{newResources.length > 1 ? "s" : ""} — auto-tracked</div>
            {newResources.map(r => (
              <div key={r.key} style={{ fontSize: 12.5, color: COLORS.text }}>
                <span style={{ fontWeight: 700 }}>{r.name}</span>
                <span style={{ color: COLORS.dim }}> — {r.max}{r.die ? ` × ${r.die}` : ""} · {RESOURCE_RESET_LABEL[r.reset] || r.reset}</span>
              </div>
            ))}
          </div>
        )}

        {rows.length > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>What Changes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {rows.map(([label, a, b]) => (
                <div key={label} style={{ display: "flex", fontSize: 12.5 }}>
                  <span style={{ color: COLORS.muted, flex: 1 }}>{label}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace" }}><span style={{ color: COLORS.dim }}>{a}</span> <span style={{ color: COLORS.dim }}>→</span> <span style={{ color: COLORS.gold, fontWeight: 700 }}>{b}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="gold" onClick={confirm}><Check size={14} /> Confirm Level {toCL}</Btn>
        </div>
      </div>
    </div>
  );
}

function ClassesTab({ char, set, guided = false }) {
  const [adding, setAdding] = useState(false);
  const [levelUpIdx, setLevelUpIdx] = useState(null);
  const classes = char.classes || [];
  const updateClass = (i, patch) => set({ classes: classes.map((c, j) => j === i ? { ...c, ...patch } : c) });
  const bumpLevel = (i, c) => {
    if (guided && (c.level || 1) < 20) setLevelUpIdx(i);
    else updateClass(i, { level: Math.min(20, (c.level || 1) + 1) });
  };
  const removeClass = (i) => set({ classes: classes.filter((_, j) => j !== i) });
  const addClass = (classId) => { set({ classes: [...classes, { classId, level: 1 }] }); setAdding(false); };
  const total = charTotalLevel(char);

  if (adding || classes.length === 0) return (
    <div>
      {classes.length > 0 && <div style={{ marginBottom: 10 }}><Btn size="sm" variant="ghost" onClick={() => setAdding(false)}><ArrowLeft size={13}/> Back</Btn></div>}
      <ClassPicker value="" onConfirm={addClass} onCancel={() => setAdding(false)} />
    </div>
  );

  return (
    <div>
      {classes.map((c, i) => (
        <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Tag color={i === 0 ? COLORS.gold : COLORS.blue}>{c.classId}</Tag>
            {i === 0 && classes.length > 1 && <span style={{ fontSize: 10, color: COLORS.dim }}>primary — drives Unarmored Defense</span>}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: COLORS.muted }}>Level</span>
              <button onClick={() => updateClass(i, { level: Math.max(1, (c.level || 1) - 1) })} style={miniBtnStyle}><Minus size={12}/></button>
              <span style={{ fontWeight: 700, width: 22, textAlign: "center" }}>{c.level || 1}</span>
              <button onClick={() => bumpLevel(i, c)} style={miniBtnStyle} title={guided ? "Level up (guided)" : "Increase level"}><Plus size={12}/></button>
              <Btn size="sm" variant="danger" onClick={() => removeClass(i)} title="Remove this class"><Trash2 size={12}/></Btn>
            </div>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {CLASS_DATA[c.classId]?.flavor}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13}/> Add Class (multiclass)</Btn>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>Character Level <span style={{ color: COLORS.gold, fontWeight: 700 }}>{total}</span> = sum of class levels</span>
      </div>
      {levelUpIdx != null && <LevelUpModal char={char} set={set} classIndex={levelUpIdx} onClose={() => setLevelUpIdx(null)} />}
    </div>
  );
}

// Shared look for the four Stats-page derived-stat cards, so Ki Rank / Power /
// Speed / Kili read as one consistent row instead of four mismatched boxes.
const STAT_CARD = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "11px 13px", minHeight: 98, display: "flex", flexDirection: "column" };
const STAT_LABEL = { fontSize: 10, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.7, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 };
const STAT_LINK = { cursor: "pointer", color: COLORS.blue, fontSize: 9.5, fontWeight: 600, letterSpacing: 0, textTransform: "none" };
const STAT_VALUE = { fontFamily: "Orbitron, sans-serif", fontWeight: 900, lineHeight: 1 };
const STAT_SUB = { fontSize: 9.5, color: COLORS.dim, marginTop: "auto", paddingTop: 8 };
const STAT_MINI = { textAlign: "center", padding: "4px 4px", fontSize: 12 };
const STAT_MINI_LABEL = { fontSize: 8.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 };

function KiRankPanel({ char, set }) {
  const auto = kiRankForLevel(charTotalLevel(char));
  const overridden = char.kiRankOverride != null;
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Ki Rank</span>
        <span onClick={() => set({ kiRankOverride: overridden ? null : auto })} style={STAT_LINK}>{overridden ? "auto" : "override"}</span>
      </div>
      {overridden ? (
        <TextInput type="number" value={char.kiRankOverride} onChange={e => set({ kiRankOverride: Math.max(1, Math.min(4, +e.target.value || 1)) })} style={{ textAlign: "center", fontSize: 20, fontWeight: 700, padding: "3px 6px" }} />
      ) : (
        <div title="Rank 1 at Lv1, +1 at Levels 5 / 10 / 15 (book Ch.1)" style={{ ...STAT_VALUE, fontSize: 27, color: COLORS.gold, cursor: "help" }}>{auto}</div>
      )}
      <div style={STAT_SUB}>+1 at Lv 5 / 10 / 15</div>
    </div>
  );
}

function PowerPanel({ char, set }) {
  const p = char.powerBonus || {};
  const setP = (k, v) => set({ powerBonus: { ...p, [k]: v } });
  const [editing, setEditing] = useState(false);
  // Live effective power = manual base (the 4 boxes) + active Forms + active
  // Conditions + Weighted gear — the same effectivePowerBonus() the Combat banner,
  // Kili/Battle Power, Overload and Carry Weight all read, so this never drifts.
  const total = totalPowerBonus(char);
  const eff = effectivePowerBonus(char);
  const fromForms = activeFormPower(char), fromCond = activeConditionPower(char), fromWt = weightedPower(char);
  const parts = [`base ${total >= 0 ? "+" : ""}${total}`];
  if (fromForms) parts.push(`forms +${fromForms}`);
  if (fromCond) parts.push(`cond +${fromCond}`);
  if (fromWt) parts.push(`wt ${fromWt >= 0 ? "+" : ""}${fromWt}`);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Power Bonus</span>
        <span onClick={() => setEditing(e => !e)} style={STAT_LINK}>{editing ? "done" : "edit"}</span>
      </div>
      <div style={{ ...STAT_VALUE, fontSize: 27, color: eff > 0 ? COLORS.gold : COLORS.text }}>{eff >= 0 ? "+" : ""}{eff}</div>
      {editing ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          {[["stable","Stable"],["transformation","Transform"],["powerUp","Power-Up"],["misc","Misc"]].map(([k,label]) => (
            <div key={k} title={k === "stable" ? "Stable Power — gives every Power benefit but is exempt from Overload" : undefined}>
              <div style={STAT_MINI_LABEL}>{label}{k === "stable" && <span style={{ color: COLORS.blue }}> ◇</span>}</div>
              <TextInput type="number" value={p[k] || 0} onChange={e => setP(k, +e.target.value || 0)} style={STAT_MINI} />
            </div>
          ))}
        </div>
      ) : (
        <div style={STAT_SUB}>{parts.join(" · ")}</div>
      )}
    </div>
  );
}

function SpeedPanel({ char, set }) {
  const [editing, setEditing] = useState(false);
  const wt = computeWeighted(char);
  const phys = benefitsOfPower(char).physical * 5; // Physical Bonus: +5 ft/rank to all speeds
  const final = Math.max(0, (char.speedBase || 30) + (char.speedExtra || 0) + wt.net * 10 + phys);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}>
        <span>Speed{wt.net !== 0 && <span style={{ color: wt.net > 0 ? COLORS.green : COLORS.red, fontSize: 9, letterSpacing: 0 }}> ({wt.net > 0 ? "+" : ""}{wt.net * 10}ft wt)</span>}</span>
        <span onClick={() => setEditing(e => !e)} style={STAT_LINK}>{editing ? "done" : "edit"}</span>
      </div>
      <div style={{ ...STAT_VALUE, fontSize: 27, color: COLORS.gold }}>{final}<span style={{ fontSize: 12, color: COLORS.dim, fontFamily: "Inter, sans-serif", fontWeight: 600 }}> ft</span></div>
      {editing ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          <div><div style={STAT_MINI_LABEL}>Base</div><TextInput type="number" value={char.speedBase ?? 30} onChange={e => set({ speedBase: +e.target.value || 0 })} style={STAT_MINI} /></div>
          <div><div style={STAT_MINI_LABEL}>Extra</div><TextInput type="number" value={char.speedExtra || 0} onChange={e => set({ speedExtra: +e.target.value || 0 })} style={STAT_MINI} /></div>
        </div>
      ) : (
        <div style={STAT_SUB}>×1.5 {Math.floor(final * 1.5)} · ×2 {final * 2} · ×3 {final * 3}</div>
      )}
    </div>
  );
}

// Death Saves — lives on Vitals (dying-state tracker; Long Rest resets it there).
function DeathSavesPanel({ char, set }) {
  const ds = char.deathSaves || { success: 0, fail: 0 };
  const cycle = (kind) => set({ deathSaves: { ...ds, [kind]: (ds[kind] + 1) % 4 } });
  const Dots = ({ kind, color }) => (
    <div onClick={() => cycle(kind)} style={{ display: "flex", gap: 4, cursor: "pointer" }} title="Click to add; wraps to 0 after 3">
      {[1,2,3].map(n => <div key={n} style={{ width: 11, height: 11, borderRadius: "50%", border: `2px solid ${color}`, background: ds[kind] >= n ? color : "transparent" }} />)}
    </div>
  );
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>Death Saves</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: COLORS.green }}>Success</span><Dots kind="success" color={COLORS.green} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: COLORS.red }}>Fail</span><Dots kind="fail" color={COLORS.red} />
      </div>
    </div>
  );
}

// Read-only power readout mirrored onto Stats — same value/label as the Combat
// banner, following the table's chosen power system (Kili or Battle Power).
function BattlePowerPanel({ char }) {
  const [houseRules] = useHouseRules();
  const power = computePowerLevel(char, houseRules.powerSystem);
  return (
    <div style={STAT_CARD}>
      <div style={STAT_LABEL}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><Radio size={11}/> {power.label}</span></div>
      <div style={{ ...STAT_VALUE, fontSize: 24, color: COLORS.gold }}>{power.value.toLocaleString()}</div>
      <div style={STAT_SUB}>Carry Weight <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeCarryWeight(char).toLocaleString()}</span> lb</div>
    </div>
  );
}

function StatsTab({ char, set }) {
  const hasClasses = (char.classes || []).length > 0;
  const staminaAuto = char.maxStaminaOverride == null;
  const staminaFormula = Math.max(1, 2 + statMod(char, "con") + 2 * (charTotalLevel(char) - 1));
  const setStat = (k, v) => set({ stats: { ...char.stats, [k]: v } });
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        {[["hp","maxHp","HP",COLORS.red,HeartPulse],["ki","maxKi","Ki",COLORS.blue,Zap]].map(([cur,mx,label,color,Icon]) => (
          <div key={cur} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 11, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}><Icon size={12}/>{label}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <CommaNumInput value={char[cur] || 0} onValue={v => set({ [cur]: v })} style={{ textAlign: "center" }} />
              <CommaNumInput value={char[mx] || 0} onValue={v => set({ [mx]: v })} style={{ textAlign: "center" }} />
            </div>
            <div style={{ marginTop: 6 }}><Gauge label="" value={char[cur]} max={char[mx]||1} color={color} /></div>
          </div>
        ))}
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Flame size={12}/>Stamina {staminaAuto && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
            <span onClick={() => set({ maxStaminaOverride: staminaAuto ? (char.maxStamina ?? staminaFormula) : null })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline" }}>
              {staminaAuto ? "override" : "use auto"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <CommaNumInput value={char.stamina || 0} onValue={v => set({ stamina: v })} style={{ textAlign: "center" }} />
            {staminaAuto ? (
              <div title="2 + CON mod + 2 per Level-Up (book Ch.1)" style={{ flex: 1, textAlign: "center", fontWeight: 700, padding: "8px 0", cursor: "help" }}>{staminaFormula}</div>
            ) : (
              <TextInput type="number" value={char.maxStaminaOverride} onChange={e => set({ maxStaminaOverride: +e.target.value || 0 })} style={{ textAlign: "center" }} />
            )}
          </div>
          <div style={{ marginTop: 6 }}><Gauge label="" value={char.stamina} max={char.maxStamina||1} color={COLORS.gold} /></div>
        </div>
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
          <ComputedACField char={char} onOverride={set} />
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 8, marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
            <span>Damage Reduction {char.drOverride !== true && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
            <span onClick={() => set({ drOverride: char.drOverride !== true })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9, textDecoration: "underline" }}>{char.drOverride === true ? "use auto" : "override"}</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {char.drOverride === true ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
                <TextInput type="number" value={char.dr} onChange={e => set({ dr: +e.target.value })} style={{ textAlign: "center", flex: 1 }} title="Damage Reduction (base)" />
                {powerDR(char) > 0 && <span style={{ fontSize: 10, color: COLORS.gold, whiteSpace: "nowrap" }} title="From Power (Toughness)">+{powerDR(char)}</span>}
              </div>
            ) : (
              <div title={`From worn armor${powerDR(char) ? ` + Power (+${powerDR(char)})` : ""}`} style={{ flex: 1, textAlign: "center", fontWeight: 700, padding: "8px 0", cursor: "help" }}>{computeArmorDR(char) + powerDR(char)}</div>
            )}
            {hasClasses ? (
              <div title="Level = sum of class levels — edit them in the Class tab" style={{ flex: 1, textAlign: "center", fontWeight: 700, cursor: "help" }}>Lv {charTotalLevel(char)}</div>
            ) : (
              <TextInput type="number" value={char.level} onChange={e => set({ level: +e.target.value })} style={{ textAlign: "center" }} title="Level" />
            )}
          </div>
          <AttacksPerTurnBadge char={char} />
        </div>
      </div>
      {/* Abilities. The big pill is the MODIFIER (what you roll); the field below
          is your editable base score. Gear that shifts a stat tints the block gold
          and shows the effective score — the modifier reflects it. */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 16 }}>
        {Object.entries(char.stats).map(([k,v]) => {
          const eff = effectiveStats(char)[k];
          const mod = abilityMod(eff);
          const moved = eff !== v;
          const accent = moved ? COLORS.gold : COLORS.text;
          const from = statModSources(char).filter(m => m.stat === k).map(m => `${m.itemName}: ${STAT_MOD_LABEL[k]} ${m.mode === "set" ? `set to ${m.value}` : `+${m.value}`}`).join(" · ");
          return (
            <div key={k} title={moved ? from : undefined} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: COLORS.panel2, border: `1px solid ${moved ? COLORS.gold + "77" : COLORS.border}`, borderRadius: 10, padding: "10px 6px 8px" }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{k}</div>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, fontWeight: 900, lineHeight: 1, color: accent }}>{mod >= 0 ? "+" : ""}{mod}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 2, background: "#0D0F16", border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "1px 3px" }}>
                <button onClick={() => setStat(k, Math.max(1, (v || 0) - 1))} title="−1" style={{ ...statStepBtn }}><Minus size={11} /></button>
                <input type="number" value={v} onFocus={e => e.target.select()} onChange={e => setStat(k, +e.target.value)} style={{ width: 30, textAlign: "center", border: "none", background: "transparent", color: COLORS.text, fontSize: 13, fontWeight: 700, fontFamily: "Inter, sans-serif", outline: "none", MozAppearance: "textfield" }} />
                <button onClick={() => setStat(k, (v || 0) + 1)} title="+1" style={{ ...statStepBtn }}><Plus size={11} /></button>
                {moved && <span title="Effective (with gear)" style={{ fontSize: 11, fontWeight: 800, color: COLORS.gold }}>→{eff}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginBottom: 14 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Saving Throws &amp; Skills</div>
        <SkillsSavesTab char={char} set={set} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <KiRankPanel char={char} set={set} />
        <PowerPanel char={char} set={set} />
        <SpeedPanel char={char} set={set} />
        <BattlePowerPanel char={char} />
      </div>
      <TagListEditor label="Resistances to Damage" items={char.resistances || []} onAdd={(v) => set({ resistances: [...(char.resistances || []), v] })} onRemove={(i) => set({ resistances: (char.resistances || []).filter((_,j) => j!==i) })} color={COLORS.green} placeholder="Bludgeoning..." />
    </div>
  );
}

// Combat / derived reference — the "scouter" computed block, its own tab so it
// stays off the main stat-entry page per the design north star.
// Parse "NdM+K" → { count, faces, mod }. Returns null if unrollable.
function parseDice(str) {
  const m = /(\d+)d(\d+)\s*([+-]\s*\d+)?/.exec(str || "");
  if (!m) return null;
  return { count: +m[1], faces: +m[2], mod: m[3] ? +m[3].replace(/\s/g, "") : 0 };
}
function rollDice(d) {
  const rolls = Array.from({ length: d.count }, () => roll(d.faces));
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) + d.mod, mod: d.mod };
}

// Snap Decisions (book Ch.1) — reaction-style acts that cost Stamina (a few cost
// a variable amount, shown "Special"). Curated from the rulebook.
const SNAP_DECISIONS = [
  { name: "Assist", cost: 2, limit: "Once", trigger: "An ally within range of your Ki Techniques starts an Energy Clash, or within range of your Strike Techniques starts a Struggle.", text: "Add your own attack to the clash: cast a Technique of the matching category (Strike→Struggle, Ki→Energy Clash) with the triggering creature in range. Half this cost if the Technique is a 1 Reaction; its Ki cost is halved. The triggering creature adds your Technique's Rank to their contested Attack Rolls." },
  { name: "Block", cost: 2, limit: "None", trigger: "You would take Damage that is not Destruction Damage.", text: "Until the start of your next turn, halve all Damage you take, but auto-fail Dexterity saves. Spend +2 Stamina to also gain DR equal to your Ki Rank. Cancelled by using another Snap Decision; can't follow Push Back." },
  { name: "Burst Transformation", cost: 1, limit: "Once", trigger: "You would take an Action/Bonus Action, or cast a Technique.", text: "Spend half a Form's Upkeep Cost to activate it until the end of your turn (ends after the triggering effect if not your turn). All Power gained is Stable Power." },
  { name: "Counter!", cost: 4, limit: "Once", trigger: "You pass a Save enforced by a Technique, or a Technique's Attack Roll misses you.", text: "Instinctively lash out: cast a Technique of your choice that includes the creature who cast the triggering Technique." },
  { name: "Energy Clash", cost: 2, limit: "Once", trigger: "You are targeted by a Ki Technique that deals Damage.", text: "Immediately cast a damaging Ki Technique with the caster in range to meet theirs. Both make contested Attack Rolls by Technique Type; first to win 2 completes their Technique. Loser is auto-hit and fails saves. +1 static per Ki Rank difference. Half cost if a 1 Reaction." },
  { name: "Flurry", cost: 2, limit: "Ki Rank / round", trigger: "You make an attack with your Attack Action.", text: "Make an additional attack as part of your Attack Action." },
  { name: "Follow Up", cost: 2, limit: "None", trigger: "You Launch a creature within your Movement Speed.", text: "Move to the nearest space next to where the creature stopped without provoking, and immediately perform the Power Strike Action for free." },
  { name: "I Got 'Em!", cost: 2, limit: "Once", trigger: "A creature within your Movement Speed would take Fall Damage, or is Launched through/inside your Melee Reach.", text: "The triggering creature stops all movement and you take the Fall Damage instead. Cost doubled if they're a larger Size. End adjacent without provoking." },
  { name: "Interception (Ally)", cost: 2, limit: "Once", trigger: "An ally within your Movement Speed is targeted by an Attack Roll, or by a damaging Spell/Technique.", text: "The effect hits you instead. If an Attack Roll it auto-hits; if a Dex save it auto-fails. End adjacent to the protected ally without provoking." },
  { name: "Interception (Enemy)", cost: 2, limit: "Once", trigger: "A creature within your Movement Speed makes an Attack Roll, or casts a damaging Spell/Technique.", text: "You become the only valid target for it. If an Attack Roll it auto-hits you; if a Dex save you auto-fail. End adjacent without provoking." },
  { name: "Push Back", cost: "Special", limit: "Once", trigger: "You are damaged by a Spell/Technique that does not deal Destruction Damage.", text: "Designate Stamina up to your Character Level. Reduce the oncoming Damage by 1d12 + your Ki Rank per Stamina spent." },
  { name: "Redirect (Sphere)", cost: 1, limit: "None", trigger: "You reduce a Sphere-shaped Spell/Technique's Damage to zero and are within Melee of its Point of Origin.", text: "Move the Point of Origin anywhere within the Technique's remaining Maximum Range — creatures previously in the area may no longer be targets." },
  { name: "Redirect (Cone/Cube)", cost: 1, limit: "None", trigger: "You reduce a Cone/Cube-shaped Spell/Technique's Damage to zero.", text: "Creatures in the Area draw a line to the Point of Origin; if your body interrupts that line, they're immune to the effect." },
  { name: "Redirect (Cylinder/Line)", cost: 1, limit: "None", trigger: "You reduce a Cylinder/Line-shaped Spell/Technique's Damage to zero.", text: "Draw a straight line from yourself; the remainder of the shape's length/height follows that line." },
  { name: "Redirect (Targeted)", cost: 1, limit: "None", trigger: "You reduce a single-target Attack Roll / Technique (not Melee range) to zero.", text: "Choose a creature within the Technique's remaining Maximum Range; they become the target using the original Attack Roll or Save DC (loses any granted extra casting)." },
  { name: "Redirect (Emanation)", cost: 1, limit: "None", trigger: "You reduce an Emanation-shaped Spell/Technique's Damage to zero.", text: "The Emanation's length becomes the distance between you and its Caster." },
  { name: "Sonic Sway", cost: "Special", limit: "Ki Rank / round", trigger: "You would be hit by an Attack Roll that is not a Reaction, Technique, or Spell.", text: "Expend Stamina to gain +2 AC per Stamina until the start of your next turn (only vs the triggering attacks). Max Stamina per round equals your Ki Rank." },
  { name: "Struggle", cost: 2, limit: "Once", trigger: "You are targeted by a Strike Technique that deals Damage.", text: "Immediately cast a damaging Strike Technique to meet theirs (cost drops to 1 if a 1 Reaction). Contested Attack Rolls; first to win 2 completes. Loser is auto-hit and fails saves. +1 static per Ki Rank difference." },
  { name: "Tag Team", cost: 4, limit: "Once", trigger: "You begin Charging a Technique within 5 ft of another creature Charging a Technique of the same Category.", text: "Their Technique is the Lead. Stay within 5 ft for the Charge; when released, add yours (damage, effects, and your static bonuses) to it. Concentration effects reapply on each failed save." },
  { name: "Wild Sense", cost: 2, limit: "Once", trigger: "You pass a Dexterity Saving Throw to reduce damage.", text: "Until the start of your next turn, take no damage whenever you'd take halved damage from a successful save. Cancelled by using another Snap Decision." },
];

const MOVE_RESOLUTIONS = [["attack", "Attack"], ["save", "Save"], ["utility", "Utility"]];
const blankMove = (tier) => ({ uid: uid(), tier, name: "New Move", techType: "Unarmed", resolution: "attack", damageDice: "", damageType: "", saveAbility: "", kiCost: "" });

// Inline damage-logic editor for one move (custom move, or an override of a
// computed default). nameEditable=false locks the name of a computed move.
function MoveFields({ mv, onChange, onRemove, onReset, nameEditable = true }) {
  const f = (patch) => onChange(patch);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <TextInput value={mv.name || ""} onChange={e => f({ name: e.target.value })} placeholder="Move name" disabled={!nameEditable} style={{ flex: 1, fontWeight: 600, ...(nameEditable ? {} : { opacity: 0.6 }) }} />
        {onReset && <span onClick={onReset} title="Reset to computed" style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textDecoration: "underline", whiteSpace: "nowrap" }}>reset</span>}
        {onRemove && <button onClick={onRemove} title="Remove" style={{ background: "transparent", border: "none", color: COLORS.red, cursor: "pointer", padding: 2 }}><Trash2 size={13}/></button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr 0.8fr", gap: 6 }}>
        <Select value={mv.techType || "Unarmed"} onChange={e => f({ techType: e.target.value })} style={{ fontSize: 11 }} title="Type (drives Atk/DC)">{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select>
        <Select value={mv.resolution || "attack"} onChange={e => f({ resolution: e.target.value })} style={{ fontSize: 11 }} title="Resolution">{MOVE_RESOLUTIONS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
        <TextInput value={mv.damageDice || ""} onChange={e => f({ damageDice: e.target.value })} placeholder="2d6+4" style={{ fontSize: 11 }} title="Damage dice" />
        <TextInput value={mv.kiCost || ""} onChange={e => f({ kiCost: e.target.value })} placeholder="Ki" style={{ fontSize: 11 }} title="Ki cost" />
      </div>
      {mv.resolution === "save" && (
        <TextInput value={mv.saveAbility || ""} onChange={e => f({ saveAbility: e.target.value })} placeholder="Save ability (e.g. Dexterity)" style={{ fontSize: 11 }} />
      )}
    </div>
  );
}

function CombatRefTab({ char, set, combatTarget, onClearTarget }) {
  const [houseRules] = useHouseRules();
  const stylesReg = useRegistry("styles");
  const equippedStyle = char.styleId ? (stylesReg.entries || []).find(s => s._id === char.styleId) : null;
  const power = computePowerLevel(char, houseRules.powerSystem);
  // Physical Bonus (+extra above 10) adds flat damage to Attack-Action attacks —
  // i.e. Basic Moves (unarmed/weapon/Ki Blast), not cast techniques.
  const aaDmg = benefitsOfPower(char).physical + benefitsOfPower(char).extra;
  const refs = computeTechRefs(char);
  const refByType = Object.fromEntries(refs.map(r => [r.type, r]));
  const ov = computeOverload(char);
  const regen = computeKiRegen(char);
  const pas = computePassives(char);
  const [log, setLog] = useState([]);
  const [rollMode, setRollMode] = useState("normal");   // "normal" | "adv" | "dis"
  const [situBonus, setSituBonus] = useState("");        // situational modifier on the attack roll
  const [editSpecial, setEditSpecial] = useState(false);
  const [editBasic, setEditBasic] = useState(false);
  const [openSnap, setOpenSnap] = useState(null);
  const cardStyle = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 };
  const headStyle = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 };

  // Basic moves: the held weapon's damage logic replaces unarmed CQC (empty
  // hands fall back to CQC); Basic Ki Blast is always there. A weapon's unique
  // effects/charges stay in Advanced Moves, not here.
  const strMod = statMod(char, "str"), wisMod = statMod(char, "wis");
  const profB = profBonusForLevel(charTotalLevel(char));
  const heldWeapons = equippedEntries(char).filter(e => (e.slotKey === "hand1" || e.slotKey === "hand2") && e.item.damageDice);
  const weaponMoves = heldWeapons.map(e => {
    const mod = statMod(char, e.item.attackStat || "str");
    const dice = /[+-]\s*\d+\s*$/.test(e.item.damageDice) ? e.item.damageDice : `${e.item.damageDice}${mod >= 0 ? "+" : ""}${mod}`;
    return { uid: `wpn-${e.item.id}`, name: e.item.name, techType: "Armed", resolution: "attack", damageDice: dice, kiCost: "", atkOverride: profB + mod };
  });
  const basicMoves = [
    ...(weaponMoves.length ? weaponMoves : [{ uid: "cqc", name: "CQC (Unarmed Strike)", techType: "Unarmed", resolution: "attack", damageDice: `1d4${strMod>=0?"+":""}${strMod}`, kiCost: "" }]),
    { uid: "kiblast", name: "Basic Ki Blast", techType: "Blast", resolution: "attack", damageDice: `1d6${wisMod>=0?"+":""}${wisMod}`, kiCost: "" },
  ];
  const weaponEffects = heldWeapons.flatMap(e => (e.item.effects || []).map(ef => ({ ...ef, itemName: e.item.name })));
  const specialAll = (char.techniques || []).filter(k => k.damageDice || k.resolution !== "utility");
  const specialShown = specialAll.filter(k => k.combatVisible !== false);
  const toggleSpecial = (tuid) => set && set({ techniques: (char.techniques || []).map(t => t.uid === tuid ? { ...t, combatVisible: t.combatVisible === false } : t) });

  // Player edits: per-move damage-logic overrides on computed defaults, plus
  // fully custom moves filed under Basic or Advanced.
  const overrides = char.moveOverrides || {};
  const customMoves = char.customMoves || [];
  const customBasic = customMoves.filter(m => m.tier === "basic");
  const customAdvanced = customMoves.filter(m => m.tier === "advanced");
  const applyOv = (mv) => ({ ...mv, ...(overrides[mv.uid] || {}) });
  const setOverride = (muid, patch) => set && set({ moveOverrides: { ...overrides, [muid]: { ...(overrides[muid] || {}), ...patch } } });
  const resetOverride = (muid) => { if (!set) return; const next = { ...overrides }; delete next[muid]; set({ moveOverrides: next }); };
  const setCustom = (muid, patch) => set && set({ customMoves: customMoves.map(m => m.uid === muid ? { ...m, ...patch } : m) });
  const removeCustom = (muid) => set && set({ customMoves: customMoves.filter(m => m.uid !== muid) });
  const addCustom = (tier) => set && set({ customMoves: [...customMoves, blankMove(tier)] });
  // Basic Moves are Attack-Action attacks → they receive the Physical damage bonus.
  const basicRender = [...basicMoves.map(m => ({ ...applyOv(m), attackAction: true })), ...customBasic.map(m => ({ ...m, attackAction: true }))];
  const advancedRender = [...specialShown, ...customAdvanced];

  const moveCard = (mv) => {
    const refBase = refByType[mv.techType] || { atk: 0, dc: 8 };
    const ref = mv.atkOverride != null ? { ...refBase, atk: mv.atkOverride } : refBase;
    const color = techResColor(mv.resolution);
    return (
      <div key={mv.uid} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>{mv.name}</span>
          {mv.kiCost && <span style={{ fontSize: 9, color: COLORS.dim, whiteSpace: "nowrap" }}>{mv.kiCost}</span>}
        </div>
        <div style={{ fontSize: 10, color: COLORS.muted, fontFamily: "JetBrains Mono, monospace" }}>
          {mv.resolution === "attack" && <span style={{ color: COLORS.blue }}>+{ref.atk} atk</span>}
          {mv.resolution === "save" && <span style={{ color: COLORS.gold }}>DC {ref.dc}{mv.saveAbility ? ` ${mv.saveAbility.slice(0,3)}` : ""}</span>}
          {mv.damageDice && <span> · {mv.damageDice}{mv.attackAction && aaDmg > 0 ? <span style={{ color: COLORS.gold }}> +{aaDmg}</span> : ""}</span>}
        </div>
        <button onClick={() => doRoll(mv)} style={{ marginTop: 2, background: `${color}1A`, border: `1px solid ${color}66`, color, borderRadius: 5, padding: "4px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <Dices size={12}/> Roll
        </button>
      </div>
    );
  };

  const doRoll = (mv) => {
    const ref = refByType[mv.techType] || { atk: 0, dc: 8 };
    const atk = mv.atkOverride != null ? mv.atkOverride : ref.atk;
    const dmg = mv.damageDice ? rollDice(parseDice(mv.damageDice)) : null;
    // Attack-Action attacks (Basic Moves) get the Physical/overpowered damage bonus.
    if (dmg && mv.attackAction && aaDmg > 0) { dmg.total += aaDmg; dmg.mod += aaDmg; }
    const situ = Number(situBonus) || 0;
    // Environmental (Harsh Galaxies) + equipped Fighting Style modifiers to attacks.
    const envAtk = (CURRENT_HOUSE_RULES.harshGalaxies ? envFlatMod("attacks") : 0) + styleFlatMod(char, "attacks");
    let head;
    if (mv.resolution === "attack") {
      const r = rollD20(rollMode);
      const d20 = r.die;
      head = { kind: "attack", d20, atk, situ, env: envAtk, mode: r.mode, rolls: r.rolls, hit: d20 + atk + situ + envAtk };
      // Auto-resolve against a Session-selected target. The target's AC is never
      // shown — players only see HIT / MISS.
      if (combatTarget && combatTarget.ac != null) {
        const crit = d20 === 20, fumble = d20 === 1;
        head.landed = crit || (!fumble && head.hit >= combatTarget.ac);
        head.outcome = crit ? "crit" : fumble ? "fumble" : head.landed ? "hit" : "miss";
        head.targetName = combatTarget.name;
      }
    } else if (mv.resolution === "save") {
      head = { kind: "save", dc: ref.dc, ability: mv.saveAbility || "" };
    } else {
      head = { kind: "utility" };
    }
    // Spend the move's Ki cost automatically (clamped at 0). Flag if short.
    const cost = parseInt(String(mv.kiCost || "").match(/\d+/)?.[0] || "0", 10) || 0;
    const short = cost > (char.ki || 0);
    if (cost > 0 && set) set({ ki: Math.max(0, (char.ki || 0) - cost) });
    setLog(prev => [{ id: uid(), name: mv.name, type: mv.techType, head, dmg, kiSpent: cost, kiShort: short }, ...prev].slice(0, 10));
    const landedOnTarget = head.kind === "attack" && head.outcome;
    const bannerColor = landedOnTarget ? (head.landed ? COLORS.red : COLORS.dim) : head.kind === "attack" ? COLORS.blue : head.kind === "save" ? COLORS.gold : COLORS.muted;
    const dieText = head.kind === "attack" ? (head.mode !== "normal" ? `d20 ${rollModeLabel(head.mode)} [${head.rolls.join(", ")}] ${head.d20}` : `d20 ${head.d20}`) : "";
    const headDetail = head.kind === "attack" ? `${dieText} ${atk >= 0 ? "+" : ""}${atk}${head.situ ? ` ${head.situ >= 0 ? "+" : ""}${head.situ}` : ""}${head.env ? ` ${head.env >= 0 ? "+" : ""}${head.env} mod` : ""} → hit ${head.hit}`
      : head.kind === "save" ? `DC ${head.dc}${head.ability ? ` ${head.ability.slice(0, 3)}` : ""}` : "";
    emitRoll({
      label: landedOnTarget ? `${mv.name} → ${head.targetName}` : mv.name,
      total: head.kind === "attack" ? head.hit : (dmg ? dmg.total : ""),
      // The target's AC is deliberately omitted — only the outcome is shared.
      detail: [landedOnTarget ? head.outcome.toUpperCase() : "", headDetail, dmg ? `dmg ${dmg.total}` : "", cost > 0 ? `−${cost} Ki` : ""].filter(Boolean).join(" · "),
      color: bannerColor,
    });
    if (rollMode !== "normal") setRollMode("normal");   // Advantage / Disadvantage is a per roll choice
  };

  const useSnap = (sd) => {
    const cost = typeof sd.cost === "number" ? sd.cost : 0;
    const short = cost > (char.stamina || 0);
    if (cost > 0 && set) set({ stamina: Math.max(0, (char.stamina || 0) - cost) });
    setLog(prev => [{ id: uid(), name: `Snap: ${sd.name}`, head: { kind: "utility" }, staSpent: cost, staShort: short }, ...prev].slice(0, 10));
  };

  // Breather pool (book): Lv + CON mod, drawn as an Action to top off Stamina;
  // refreshes on a Long Rest.
  const breatherMax = Math.max(0, charTotalLevel(char) + statMod(char, "con"));
  const breatherLeft = char.breatherPool != null ? char.breatherPool : breatherMax;
  const takeBreather = () => {
    if (!set) return;
    const room = (char.maxStamina || 0) - (char.stamina || 0);
    const draw = Math.min(breatherLeft, room);
    if (draw <= 0) { setLog(prev => [{ id: uid(), name: "Breather", head: { kind: "utility" }, note: room <= 0 ? "Stamina full" : "Pool empty" }, ...prev].slice(0, 10)); return; }
    set({ stamina: (char.stamina || 0) + draw, breatherPool: breatherLeft - draw });
    setLog(prev => [{ id: uid(), name: "Breather", head: { kind: "utility" }, staGain: draw }, ...prev].slice(0, 10));
  };
  const refreshBreather = () => set && set({ breatherPool: null });

  // Gather Ki (book Ch.1): Major restores 16×(Rank+Power); Minor rolls (4×Rank)d4
  // + WIS. Overfill past Max Ki becomes Temporary Ki (1 minute) — routed into the
  // Vitals Temp Ki tracker.
  const gatherKi = (kind) => {
    if (!set) return;
    const maxKi = char.maxKi || 0, cur = char.ki || 0;
    let amount, note;
    if (kind === "major") { amount = regen.major; note = "Action"; }
    else { const d = rollDice(parseDice(regen.minorDice)); amount = d.total; note = `Bonus · [${d.rolls.join(",")}${d.mod ? (d.mod >= 0 ? "+" : "") + d.mod : ""}]`; }
    const kiGain = Math.min(amount, Math.max(0, maxKi - cur));
    const overfill = Math.max(0, amount - kiGain);
    const patch = { ki: cur + kiGain };
    if (overfill > 0) patch.temp = { ...(char.temp || { hp: 0, ki: 0, stamina: 0 }), ki: (char.temp?.ki || 0) + overfill };
    set(patch);
    setLog(prev => [{ id: uid(), name: `Gather Ki (${kind === "major" ? "Major" : "Minor"})`, head: { kind: "utility" }, kiGain, tempKiGain: overfill, note }, ...prev].slice(0, 10));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {combatTarget && (
        <div style={{ background: `${COLORS.red}14`, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <Crosshair size={15} color={COLORS.red} />
          <span style={{ fontSize: 13 }}>Attacking <b style={{ color: COLORS.red }}>{combatTarget.name}</b> — roll a move; it lands as <b>HIT</b> or <b>MISS</b>.</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={onClearTarget} title="Clear target"><X size={13} /></Btn>
        </div>
      )}
      {/* Moves — roll your turn from here */}
      {/* Battle Power banner — top of the page */}
      <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", background: `linear-gradient(90deg, ${COLORS.gold}14, transparent)` }}>
        <div>
          <div style={{ fontSize: 10.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{power.label}</div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 26, fontWeight: 900, color: COLORS.gold }}>{power.value.toLocaleString()}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, color: COLORS.dim, lineHeight: 1.6 }}>
          <div>Ki Rank <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeKiRank(char)}</span> · Power <span style={{ color: COLORS.text, fontWeight: 700 }}>{effectivePowerBonus(char) >= 0 ? "+" : ""}{effectivePowerBonus(char)}</span>{(() => {
            // Full breakdown — every source that feeds effectivePowerBonus, so the
            // parenthetical always sums to the number shown (forms/conditions/
            // weighted were previously dropped, making +4 read as "+0 base +2 forms").
            const base = totalPowerBonus(char), forms = activeFormPower(char), cond = activeConditionPower(char), wt = weightedPower(char);
            if (forms === 0 && cond === 0 && wt === 0) return null;
            return <span style={{ color: COLORS.gold }}> ({base >= 0 ? "+" : ""}{base} base{forms !== 0 ? ` · ${forms >= 0 ? "+" : ""}${forms} forms` : ""}{cond !== 0 ? ` · ${cond >= 0 ? "+" : ""}${cond} cond` : ""}{wt !== 0 ? ` · ${wt >= 0 ? "+" : ""}${wt} wt` : ""})</span>;
          })()}</div>
          <div>Carry Weight <span style={{ color: COLORS.text, fontWeight: 700 }}>{computeCarryWeight(char).toLocaleString()}</span></div>
        </div>
      </div>

      {/* Fighting Style — one equipped stance; its effects apply while worn */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <Swords size={14} color={COLORS.red} />
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Fighting Style</span>
        <Select value={char.styleId || ""} onChange={e => set({ styleId: e.target.value || null })} style={{ minWidth: 190 }}>
          <option value="">None equipped</option>
          {(stylesReg.entries || []).filter(s => s.enabled || s._id === char.styleId).map(s => <option key={s._id} value={s._id}>{s._name}</option>)}
        </Select>
        {equippedStyle && (<>
          <span style={{ fontSize: 11.5, color: COLORS.dim, flex: "1 1 160px", minWidth: 0 }}>{equippedStyle.effect && equippedStyle.effect.text}</span>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {((equippedStyle.effect && equippedStyle.effect.hooks) || []).map((h, i) => <Tag key={i} color={(hookType(h.type) || {}).color || COLORS.green}>{hookSummary(h)}</Tag>)}
          </div>
        </>)}
      </div>

      {/* Roll modifiers — apply to your next attack roll */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Roll with</span>
        <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {[["dis", "Disadvantage", COLORS.red], ["normal", "Normal", COLORS.text], ["adv", "Advantage", COLORS.green]].map(([m, l, c]) => (
            <button key={m} onClick={() => setRollMode(m)} style={{ padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", background: rollMode === m ? `${c}22` : "transparent", color: rollMode === m ? c : COLORS.muted }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Bonus</span>
          <TextInput type="number" value={situBonus} onChange={e => setSituBonus(e.target.value)} placeholder="0" style={{ width: 58, textAlign: "center" }} title="Situational modifier added to your attack roll" />
          {situBonus !== "" && Number(situBonus) !== 0 && <Btn size="sm" variant="ghost" onClick={() => setSituBonus("")}>Clear</Btn>}
        </div>
        {rollMode !== "normal" && <Tag color={rollMode === "adv" ? COLORS.green : COLORS.red}>{rollModeLabel(rollMode)} · next roll</Tag>}
      </div>

      {/* Passives — kept above the moves for at-a-glance reference */}
      <div style={cardStyle}>
        <div style={headStyle}>Passive Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {[["Ki Stealth", pas.kiStealth],["Perception", pas.perception],["Insight", pas.insight],["Stealth", pas.stealth]].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 4px" }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{val}</div>
              <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ATK / DC Quick Ref — kept with Passives for at-a-glance reference */}
      <div style={cardStyle}>
        <div style={headStyle}>ATK / DC Quick Ref</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
          {refs.map(r => (
            <div key={r.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px" }}>
              <span style={{ fontSize: 11.5 }}>{r.label} <span style={{ color: COLORS.dim, fontSize: 9.5 }}>({STAT_MOD_LABEL[r.stat]})</span></span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11.5 }}>
                <span style={{ color: COLORS.blue }} title="Attack Bonus">{r.atk >= 0 ? "+" : ""}{r.atk}</span>
                <span style={{ color: COLORS.dim }}> / </span>
                <span style={{ color: COLORS.gold }} title="Save DC">DC {r.dc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Moves — held weapon's damage logic (or unarmed CQC) + Ki Blast */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Basic Moves</span>
          {set && <span onClick={() => setEditBasic(!editBasic)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline", textTransform: "none", letterSpacing: 0 }}>{editBasic ? "done" : "edit"}</span>}
        </div>
        {editBasic ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {basicMoves.map(mv => {
              const cur = applyOv(mv);
              return <MoveFields key={mv.uid} mv={cur} nameEditable={false} onChange={patch => setOverride(mv.uid, patch)} onReset={overrides[mv.uid] ? () => resetOverride(mv.uid) : null} />;
            })}
            {customBasic.map(mv => <MoveFields key={mv.uid} mv={mv} onChange={patch => setCustom(mv.uid, patch)} onRemove={() => removeCustom(mv.uid)} />)}
            <Btn size="sm" onClick={() => addCustom("basic")}><Plus size={12}/> Add basic move</Btn>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
            {basicRender.map(moveCard)}
          </div>
        )}
      </div>

      {/* Advanced Moves — techniques, feature attacks, weapon extras; curated via edit */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Advanced Moves</span>
          {set && (
            <span onClick={() => setEditSpecial(!editSpecial)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline", textTransform: "none", letterSpacing: 0 }}>
              {editSpecial ? "done" : "edit"}
            </span>
          )}
        </div>
        {editSpecial ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {specialAll.length > 0 && <div style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Known techniques — show in Combat</div>}
            {specialAll.map(t => (
              <label key={t.uid} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 10px" }}>
                <Checkbox checked={t.combatVisible !== false} onChange={() => toggleSpecial(t.uid)} />
                <span style={{ fontWeight: 600, flex: 1 }}>{t.name}</span>
                <span style={{ color: COLORS.dim, fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}>{t.techType}{t.damageDice ? ` · ${t.damageDice}` : ""}</span>
              </label>
            ))}
            {customAdvanced.length > 0 && <div style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 }}>Custom moves</div>}
            {customAdvanced.map(mv => <MoveFields key={mv.uid} mv={mv} onChange={patch => setCustom(mv.uid, patch)} onRemove={() => removeCustom(mv.uid)} />)}
            <Btn size="sm" onClick={() => addCustom("advanced")}><Plus size={12}/> Add advanced move</Btn>
          </div>
        ) : advancedRender.length === 0 && weaponEffects.length === 0 ? (
          <div style={{ fontSize: 11.5, color: COLORS.dim }}>—</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
            {advancedRender.map(moveCard)}
          </div>
        )}
        {!editSpecial && weaponEffects.length > 0 && (
          <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {weaponEffects.map(ef => (
              <div key={ef.id} style={{ fontSize: 11.5, lineHeight: 1.5 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>[{ef.name}]</span>
                <span style={{ color: COLORS.dim }}> from {ef.itemName}:</span>
                {ef.description ? <span style={{ color: COLORS.muted }}> {ef.description}</span> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Limited-Use Resources — class pools + custom; spend/roll where you act. */}
      {(char.resources || []).length > 0 && (
        <div style={cardStyle}>
          <div style={headStyle}>Resources</div>
          <ResourceTracker char={char} set={set} compact />
        </div>
      )}

      {/* Snap Decisions — reactions that spend Stamina on use */}
      <div style={cardStyle}>
        <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
          <span>Snap Decisions</span>
          <span style={{ color: COLORS.dim, fontSize: 9, textTransform: "none", letterSpacing: 0 }}>1 per round · limits not auto-tracked</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
          {SNAP_DECISIONS.map(sd => {
            const isOpen = openSnap === sd.name;
            const numeric = typeof sd.cost === "number";
            return (
              <div key={sd.name} style={{ background: COLORS.panel, border: `1px solid ${isOpen ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px" }}>
                  <span onClick={() => setOpenSnap(isOpen ? null : sd.name)} style={{ cursor: "pointer", flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                    {isOpen ? <ChevronDown size={13} color={COLORS.dim} /> : <ChevronRight size={13} color={COLORS.dim} />}
                    <span style={{ fontWeight: 700, fontSize: 12.5 }}>{sd.name}</span>
                    <span style={{ fontSize: 9.5, color: COLORS.dim }}>{sd.limit}</span>
                  </span>
                  <span style={{ fontSize: 10, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{numeric ? `${sd.cost} Sta` : sd.cost}</span>
                  {set && <button onClick={() => useSnap(sd)} title={numeric ? `Spend ${sd.cost} Stamina` : "Log (variable cost)"} style={{ background: `${COLORS.gold}1A`, border: `1px solid ${COLORS.gold}66`, color: COLORS.gold, borderRadius: 5, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>Use</button>}
                </div>
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "8px 10px", fontSize: 11.5, lineHeight: 1.5 }}>
                    <div style={{ color: COLORS.blue, marginBottom: 4 }}><span style={{ color: COLORS.dim }}>Trigger:</span> {sd.trigger}</div>
                    <div style={{ color: COLORS.muted }}>{sd.text}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Breather — draw Stamina from the pool (Action); refills on a Long Rest.
          Sits right after the Snap Decisions (stamina maneuvers). */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ ...headStyle, marginBottom: 2 }}>Breather</div>
          <div style={{ fontSize: 12.5, color: COLORS.muted }}>Pool <span style={{ color: breatherLeft > 0 ? COLORS.text : COLORS.dim, fontWeight: 700, fontFamily: "JetBrains Mono, monospace" }}>{breatherLeft} / {breatherMax}</span> <span style={{ color: COLORS.dim, fontSize: 10 }}>(Lv + CON)</span></div>
        </div>
        <div style={{ flex: 1 }} />
        {set && <span onClick={refreshBreather} title="Refill (Long Rest)" style={{ cursor: "pointer", color: COLORS.dim, fontSize: 10 }}>long rest</span>}
        {set && <Btn size="sm" variant="gold" onClick={takeBreather}><Flame size={13}/> Take a Breather</Btn>}
      </div>

      {/* Ki Regen */}
      <div style={cardStyle}>
          <div style={headStyle}>Ki Regen Quick Ref</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginBottom: 6 }}>
            <span style={{ color: COLORS.muted }}>Gather Ki (Major)</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", color: COLORS.blue, fontWeight: 700 }}>+{regen.major}</span>
              {set && <Btn size="sm" onClick={() => gatherKi("major")} title="Restore Ki (Action); overfill → Temp Ki"><Zap size={12}/> Gather</Btn>}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
            <span style={{ color: COLORS.muted }}>Gather Ki (Minor)</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", color: COLORS.blue, fontWeight: 700 }}>{regen.minorDice}</span>
              {set && <Btn size="sm" onClick={() => gatherKi("minor")} title="Roll & restore Ki (Bonus Action); overfill → Temp Ki"><Zap size={12}/> Gather</Btn>}
            </div>
          </div>
          <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 6 }}>Major = Action · Minor = Bonus Action</div>
        </div>

      {/* Roll log — bottom of the tab */}
      {log.length > 0 && (
        <div style={cardStyle}>
          <div style={{ ...headStyle, display: "flex", justifyContent: "space-between" }}>
            <span>Roll Log</span>
            <span onClick={() => setLog([])} style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textTransform: "none", letterSpacing: 0 }}>clear</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {log.map(r => (
              <div key={r.id} style={{ fontSize: 11.5, fontFamily: "JetBrains Mono, monospace", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, color: COLORS.text }}>{r.name}</span>
                {r.head.kind === "attack" && <span style={{ color: COLORS.blue }}>hit {r.head.hit} <span style={{ color: COLORS.dim }}>(d20 {r.head.d20} +{r.head.atk}{r.head.env ? `${r.head.env >= 0 ? " +" : " "}${r.head.env} mod` : ""})</span></span>}
                {r.head.kind === "save" && <span style={{ color: COLORS.gold }}>DC {r.head.dc}{r.head.ability ? ` ${r.head.ability}` : ""}</span>}
                {r.dmg && <span style={{ color: COLORS.red }}>dmg {r.dmg.total} <span style={{ color: COLORS.dim }}>[{r.dmg.rolls.join(",")}{r.dmg.mod ? (r.dmg.mod>=0?"+":"")+r.dmg.mod : ""}]</span></span>}
                {r.kiSpent > 0 && <span style={{ color: r.kiShort ? COLORS.red : COLORS.blue }}>−{r.kiSpent} Ki{r.kiShort ? " (short!)" : ""}</span>}
                {r.staSpent > 0 && <span style={{ color: r.staShort ? COLORS.red : COLORS.gold }}>−{r.staSpent} Stamina{r.staShort ? " (short!)" : ""}</span>}
                {r.staGain > 0 && <span style={{ color: COLORS.green }}>+{r.staGain} Stamina</span>}
                {r.kiGain > 0 && <span style={{ color: COLORS.green }}>+{r.kiGain} Ki</span>}
                {r.tempKiGain > 0 && <span style={{ color: COLORS.blue }}>+{r.tempKiGain} Temp Ki</span>}
                {r.note && <span style={{ color: COLORS.dim }}>{r.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const blankForm = () => ({ id: uid(), name: "New Form", formType: "Transformation", powerBonus: 1, bulk: "", upkeepCost: 0, multiplier: "", awakenLimit: "", giga: 0, description: "", active: false, auraColor: "", modifications: [] });

// Signature Forms available by race, so a Saiyan can pull Super Saiyan without
// hand-typing it. Names + requirements are book-accurate (Master Doc Ch.6 "Forms"
// — Form Family List); Power Bonus / Upkeep are LEFT BLANK for the user to fill
// from the book (values not guessed). Biology forms are species-gated; General
// and Restricted forms are available to anyone (Restricted are DM-gated).
const FORM_CATALOG = {
  species: {
    Saiyan: [
      { name: "Great Ape", formType: "Biology · Great Ape Family", req: "an intact Saiyan tail", auraColor: "#8B5E3C" },
      { name: "Super Saiyan", formType: "Biology · Super Saiyan", req: "Level 5+", auraColor: "#F5C542", mods: ["Super Saiyan grade (see Form-Specific Modifications)"] },
    ],
    Arcosian: [
      { name: "Power Regression", formType: "Biology · Metamorphosis", req: "Arcosian — suppressed base form", auraColor: "#B44BE0" },
      { name: "Metamorphosis", formType: "Biology · Metamorphosis", req: "Arcosian", auraColor: "#E0555A" },
    ],
  },
  general: ["Full Power", "Energy Release", "Divine Might", "Dark Energy", "God Ki Released", "No-Ego", "Pure Progress"],
  restricted: ["Kaio-Ken", "Ultra Instinct", "Ultra Ego", "Unleashed Power", "Creation Power", "Four Witches Technique", "Heroic Resolve", "Positions of Power"],
};
function formFromCatalog(entry, group) {
  const e = typeof entry === "string" ? { name: entry } : entry;
  return {
    ...blankForm(),
    name: e.name,
    formType: e.formType || (group === "restricted" ? "Restricted Form" : group === "general" ? "General Form" : "Biology Form"),
    powerBonus: 0, upkeepCost: 0, auraColor: e.auraColor || "",
    description: [e.req ? `Requirement: ${e.req}.` : "", "Set Power Bonus / Ki Upkeep from the book (Ch.6 Forms)."].filter(Boolean).join(" "),
    modifications: (e.mods || []).map(m => ({ ...blankFormMod(), name: m })),
  };
}

// "Available Forms — tap to add" — shown in both the editable and play Forms
// surfaces so a fighter can pull their race's signature Forms without typing.
function AvailableFormsRow({ char, forms, set }) {
  const has = (name) => forms.some(f => (f.name || "").toLowerCase() === name.toLowerCase());
  const level = charTotalLevel(char);
  // Only the fighter's OWN race unlocks Forms here, and each surfaces only once its
  // level requirement is met — signature transformations become available as the
  // player progresses, not the whole cross-species catalog at once. (General /
  // Restricted Forms are DM calls — add those as customs below.)
  const reqLevel = (req) => { const m = /level\s+(\d+)/i.exec(req || ""); return m ? +m[1] : 0; };
  const speciesForms = Object.entries(FORM_CATALOG.species)
    .filter(([sp]) => (char.species || "").toLowerCase().includes(sp.toLowerCase()))
    .flatMap(([, list]) => list)
    .filter(e => level >= reqLevel(e.req) && !has(e.name));
  if (speciesForms.length === 0) return null;
  const addCat = (entry) => set({ forms: [...forms, formFromCatalog(entry, "species")] });
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Available Forms — {char.species || "your race"}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {speciesForms.map((e, i) => (
          <span key={i} onClick={() => addCat(e)} title={e.req ? `Requirement: ${e.req}` : "Add this Form"} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, borderRadius: 14, padding: "3px 10px", background: `${COLORS.gold}18`, color: COLORS.gold, border: `1px solid ${COLORS.gold}55` }}>+ {e.name}{e.req ? <span style={{ color: COLORS.dim, fontWeight: 400, marginLeft: 5 }}>· {e.req}</span> : null}</span>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 8 }}>Set each Form's Power Bonus / Ki Upkeep from the book (Ch.6 Forms) after adding.</div>
    </div>
  );
}
const blankFormMod = () => ({ id: uid(), name: "New Modification", powerBonus: 0, upkeepIncrease: 0, multiplier: "", description: "", active: false });

function ConditionCard({ cond, active, onToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onToggle} title="Toggle active" style={{ background: active ? COLORS.gold : "transparent", border: `1px solid ${active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: active ? "#0A0C11" : COLORS.muted, fontSize: 10, fontWeight: 700, padding: "3px 9px", cursor: "pointer", whiteSpace: "nowrap" }}>{active ? "ACTIVE" : "off"}</button>
        <span style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{cond.name}</span>
        {cond.power > 0 && <span style={{ fontSize: 10, color: COLORS.gold }}>+{cond.power} Pwr</span>}
        <span onClick={() => setOpen(!open)} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 10.5 }}>{open ? "hide" : "details"}</span>
      </div>
      {open && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5, whiteSpace: "pre-line", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>{cond.text}</div>}
    </div>
  );
}

function ConditionsPanel({ char, set }) {
  const active = char.activeConditions || {};
  const toggle = (id) => set({ activeConditions: { ...active, [id]: !active[id] } });
  const boosted = CONDITIONS_DATA.filter(c => c.group === "Boosted");
  const singles = CONDITIONS_DATA.filter(c => c.group !== "Boosted");
  const condPower = activeConditionPower(char);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Special Conditions</div>
        {condPower > 0 && <div style={{ fontSize: 11, color: COLORS.gold }}>+{condPower} Power from active conditions</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {singles.map(c => <ConditionCard key={c.id} cond={c} active={!!active[c.id]} onToggle={() => toggle(c.id)} />)}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Boosted (may have several at once)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
        {boosted.map(c => <ConditionCard key={c.id} cond={c} active={!!active[c.id]} onToggle={() => toggle(c.id)} />)}
      </div>
    </div>
  );
}

// Lightweight play-surface Forms tab: toggle on/off + reference box per form
// (name, upkeep, awaken limit, description). Editing/progression lives in Growth.
// Power Overload readout (book Ch.1) — lives on the Forms tab since Forms drive
// the Power that pushes you over the threshold.
function PowerOverloadCard({ char }) {
  const ov = computeOverload(char);
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Power Overload</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: ov.over > 0 ? COLORS.red : COLORS.green }}>{ov.current}</span>
        <span style={{ color: COLORS.dim, fontSize: 12 }}>/ {ov.threshold} threshold{ov.stable > 0 && <span style={{ color: COLORS.blue }}> · +{ov.stable} Stable exempt</span>}</span>
      </div>
      {ov.over > 0 ? (
        <div style={{ fontSize: 11.5, color: COLORS.red }}>Overloaded by {ov.over} — take {ov.damage} at start of turn, Ki Control save DC {10 + ov.current} or Dazed.</div>
      ) : (
        <div style={{ fontSize: 11.5, color: COLORS.green }}>Within safe threshold (Prof +1{char.overloadMod ? ` ${char.overloadMod >= 0 ? "+" : ""}${char.overloadMod}` : ""}).</div>
      )}
    </div>
  );
}

// Benefits of Power readout — the active Static Bonuses granted by the current
// Power Bonus (book Ch.1). Auto-applied throughout the sheet; this just shows what
// is live so a transformed fighter can see their bonuses at a glance.
function BenefitsOfPowerCard({ char }) {
  const b = benefitsOfPower(char);
  const rows = [
    b.energy > 0 && [`Energy ×${b.energy}`, `+${b.energy} Attack Rolls & Save DCs · −${b.energy} Ki Control / Ki Stealth`, COLORS.blue],
    b.toughness > 0 && [`Toughness ×${b.toughness}`, `+${b.toughness} AC · +${b.toughness} Saving Throws · +${b.toughness} DR · ×${Math.pow(2, b.toughness)} Carry`, COLORS.green],
    b.physical > 0 && [`Physical ×${b.physical}`, `+${b.physical} Attack-Action damage · +${b.physical * 5} ft Speed · ignore ${b.physical} DR`, COLORS.gold],
    b.extra > 0 && [`Overpowered +${b.extra}`, `+${b.extra} Attack-Action damage · +${b.extra} DR`, COLORS.red],
  ].filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Benefits of Power</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rows.map(([label, desc, color]) => (
          <div key={label} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color, fontWeight: 700, fontSize: 12, minWidth: 96, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.4 }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormsPlayTab({ char, set }) {
  const forms = char.forms || [];
  const activePower = activeFormPower(char);
  const activeUpkeep = activeFormUpkeep(char);
  const toggle = (i) => set({ forms: forms.map((f, j) => j === i ? { ...f, active: !f.active } : f) });
  const toggleMod = (i, mi) => set({ forms: forms.map((f, j) => j === i ? { ...f, modifications: f.modifications.map((m, k) => k === mi ? { ...m, active: !m.active } : m) } : f) });
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Form Power</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gold }}>{activePower >= 0 ? "+" : ""}{activePower}</div>
        </div>
        <div style={{ flex: 1, background: `${COLORS.blue}12`, border: `1px solid ${COLORS.blue}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Ki Upkeep / Turn</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.blue }}>{activeUpkeep}</div>
        </div>
      </div>
      {forms.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5 }}>No Forms yet — add signature forms and customs in the <span style={{ color: COLORS.gold }}>Growth</span> tab; they show here to run in play.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
          {forms.map((f, i) => (
            <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${f.active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <button onClick={() => toggle(i)} title="Toggle active" style={{ background: f.active ? COLORS.gold : "transparent", border: `1px solid ${f.active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: f.active ? "#0A0C11" : COLORS.muted, fontSize: 10, fontWeight: 700, padding: "3px 9px", cursor: "pointer" }}>{f.active ? "ACTIVE" : "off"}</button>
                <span style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{f.name}</span>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10.5, color: COLORS.muted, fontFamily: "JetBrains Mono, monospace", marginBottom: f.description ? 6 : 0 }}>
                {(f.powerBonus || 0) !== 0 && <span style={{ color: COLORS.gold }}>+{f.powerBonus} Pwr</span>}
                <span>Upkeep {f.upkeepCost || 0}</span>
                {f.awakenLimit && <span>Awaken {f.awakenLimit}</span>}
              </div>
              {f.description && <div style={{ fontSize: 11.5, color: COLORS.text, lineHeight: 1.45, whiteSpace: "pre-line" }}>{f.description}</div>}
              {(f.modifications || []).length > 0 && (
                <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                  {f.modifications.map((m, mi) => (
                    <div key={m.id} onClick={() => toggleMod(i, mi)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, flexShrink: 0, background: m.active ? COLORS.gold : "transparent", border: `1px solid ${m.active ? COLORS.gold : COLORS.dim}` }} />
                      <span style={{ fontSize: 11, color: m.active ? COLORS.text : COLORS.muted }}>{m.name}</span>
                      {(m.powerBonus || 0) !== 0 && <span style={{ fontSize: 9.5, color: COLORS.gold, marginLeft: "auto" }}>+{m.powerBonus}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FormsTab({ char, set }) {
  const forms = char.forms || [];
  const activePower = activeFormPower(char);
  const activeUpkeep = activeFormUpkeep(char);
  const updateForm = (i, patch) => set({ forms: forms.map((f, j) => j === i ? { ...f, ...patch } : f) });
  const addForm = () => set({ forms: [...forms, blankForm()] });
  const removeForm = (i) => set({ forms: forms.filter((_, j) => j !== i) });
  const addMod = (i) => updateForm(i, { modifications: [...(forms[i].modifications || []), blankFormMod()] });
  const updateMod = (i, mi, patch) => updateForm(i, { modifications: forms[i].modifications.map((m, j) => j === mi ? { ...m, ...patch } : m) });
  const removeMod = (i, mi) => updateForm(i, { modifications: forms[i].modifications.filter((_, j) => j !== mi) });

  const numIn = (val, on) => <TextInput type="number" value={val} onChange={e => on(+e.target.value || 0)} style={{ textAlign: "center", padding: "5px 6px" }} />;
  const txtIn = (val, on, ph) => <TextInput value={val} onChange={e => on(e.target.value)} placeholder={ph} style={{ padding: "5px 8px" }} />;

  return (
    <div>
      {/* Active totals banner */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Form Power</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gold }}>{activePower >= 0 ? "+" : ""}{activePower}</div>
        </div>
        <div style={{ flex: 1, background: `${COLORS.blue}12`, border: `1px solid ${COLORS.blue}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Ki Upkeep / Turn</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.blue }}>{activeUpkeep}</div>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 12 }}>Toggle a Form active to fold its Power Bonus into your Overload / Battle Power and its Ki Upkeep into the per-turn cost above.</div>

      {forms.length === 0 && <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 12 }}>No Forms yet. Add one to track transformations, their multipliers, and modifications.</div>}

      {forms.map((f, i) => (
        <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${f.active ? COLORS.gold : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <button onClick={() => updateForm(i, { active: !f.active })} title="Toggle active" style={{ background: f.active ? COLORS.gold : "transparent", border: `1px solid ${f.active ? COLORS.gold : COLORS.dim}`, borderRadius: 20, color: f.active ? "#0A0C11" : COLORS.muted, fontSize: 10.5, fontWeight: 700, padding: "3px 10px", cursor: "pointer" }}>{f.active ? "ACTIVE" : "inactive"}</button>
            <TextInput value={f.name} onChange={e => updateForm(i, { name: e.target.value })} style={{ fontWeight: 700, background: "transparent", border: "none", flex: 1, fontSize: 14 }} />
            <TextInput value={f.formType} onChange={e => updateForm(i, { formType: e.target.value })} placeholder="Type" style={{ width: 120, padding: "5px 8px" }} />
            <Btn size="sm" variant="danger" onClick={() => removeForm(i)}><Trash2 size={12}/></Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 8 }}>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Power Bonus</div>{numIn(f.powerBonus, v => updateForm(i, { powerBonus: v }))}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Ki Upkeep</div>{numIn(f.upkeepCost, v => updateForm(i, { upkeepCost: v }))}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Multiplier</div>{txtIn(f.multiplier, v => updateForm(i, { multiplier: v }), "x10")}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Awaken Limit</div>{txtIn(f.awakenLimit, v => updateForm(i, { awakenLimit: v }), "")}</div>
            <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }} title="Size points added on the battle map (Great Ape and the like)">Gigantify</div>{numIn(f.giga || 0, v => updateForm(i, { giga: v }))}</div>
          </div>
          <TextArea value={f.description} onChange={e => updateForm(i, { description: e.target.value })} placeholder="Form description / benefits..." style={{ minHeight: 44, marginBottom: 8 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Aura</span>
            {AURA_SWATCHES.map(sw => (
              <button key={sw.color} onClick={() => updateForm(i, { auraColor: f.auraColor === sw.color ? "" : sw.color })} title={sw.label}
                style={{ width: 18, height: 18, borderRadius: "50%", cursor: "pointer", background: sw.color, border: f.auraColor === sw.color ? `2px solid ${COLORS.text}` : `1px solid ${COLORS.border}` }} />
            ))}
            <input type="color" value={f.auraColor || "#EAF2FF"} onChange={e => updateForm(i, { auraColor: e.target.value })} title="Custom aura color" style={{ width: 22, height: 22, padding: 0, border: `1px solid ${COLORS.border}`, borderRadius: 4, background: "transparent", cursor: "pointer" }} />
            {f.auraColor && <button onClick={() => updateForm(i, { auraColor: "" })} style={{ fontSize: 9.5, color: COLORS.dim, background: "transparent", border: "none", cursor: "pointer" }}>clear</button>}
          </div>
          {/* Modifications */}
          {(f.modifications || []).length > 0 && (
            <div style={{ borderLeft: `2px solid ${COLORS.border}`, paddingLeft: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", marginBottom: 6 }}>Form-Specific Modifications</div>
              {f.modifications.map((m, mi) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <button onClick={() => updateMod(i, mi, { active: !m.active })} title="Toggle active" style={{ width: 14, height: 14, flexShrink: 0, borderRadius: 4, background: m.active ? COLORS.gold : "transparent", border: `1px solid ${m.active ? COLORS.gold : COLORS.dim}`, cursor: "pointer" }} />
                  <TextInput value={m.name} onChange={e => updateMod(i, mi, { name: e.target.value })} style={{ flex: 1, padding: "4px 8px", fontSize: 12 }} />
                  <span style={{ fontSize: 9, color: COLORS.dim }}>PWR</span>{numIn(m.powerBonus, v => updateMod(i, mi, { powerBonus: v }))}
                  <span style={{ fontSize: 9, color: COLORS.dim }}>UP</span>{numIn(m.upkeepIncrease, v => updateMod(i, mi, { upkeepIncrease: v }))}
                  <X size={13} onClick={() => removeMod(i, mi)} style={{ cursor: "pointer", color: COLORS.red, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )}
          <Btn size="sm" variant="ghost" onClick={() => addMod(i)}><Plus size={12}/> Modification</Btn>
        </div>
      ))}

      <AvailableFormsRow char={char} forms={forms} set={set} />

      <Btn variant="gold" onClick={addForm}><Plus size={13}/> Add Form</Btn>
    </div>
  );
}

function techResColor(res) {
  return res === "attack" ? COLORS.blue : res === "save" ? COLORS.gold : COLORS.dim;
}

function KnownTechniquesTab({ char, set }) {
  const known = char.techniques || [];
  const [mode, setMode] = useState(null); // null | 'pick' | 'custom'
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [draft, setDraft] = useState(null);

  const setKnown = (next) => set({ techniques: next });
  const addTech = (t) => setKnown([...known, techToKnown(t)]);
  const removeTech = (u) => setKnown(known.filter(k => k.uid !== u));
  const cycleMastery = (u) => setKnown(known.map(k => k.uid === u ? { ...k, mastery: ((k.mastery || 0) + 1) % 4 } : k));
  const knownRefKeys = new Set(known.filter(k => k.techId).map(k => k.techId));

  /* ---- Book picker ---- */
  if (mode === "pick") {
    const results = TECHNIQUE_DATA.filter(t => {
      if (typeFilter !== "all" && t.techType !== typeFilter) return false;
      if (catFilter !== "all" && t.category !== catFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return t.name.toLowerCase().includes(q) || (t.lineName || "").toLowerCase().includes(q) || (t.fullText || "").toLowerCase().includes(q);
    }).slice(0, 300);
    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          <Btn size="sm" variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
            <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${TECHNIQUE_DATA.length} techniques...`} style={{ paddingLeft: 30 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: 170 }}>
            <option value="all">All categories</option>
            {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 130 }}>
            <option value="all">All types</option>
            {TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          <div style={{ alignSelf: "center", fontSize: 11, color: COLORS.dim }}>{results.length} shown</div>
        </div>
        <div style={{ maxHeight: 380, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 8, paddingRight: 4 }}>
          {results.map(t => {
            const already = knownRefKeys.has(t.id);
            const color = techResColor(t.resolution);
            return (
              <div key={t.id} onClick={() => !already && addTech(t)} title={t.fullText} style={{ cursor: already ? "default" : "pointer", opacity: already ? 0.45 : 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5 }}>{t.name}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{t.techType} R{t.kiRank}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 3, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {t.kiCost && <span>{t.kiCost}</span>}
                  {t.damageDice && <span style={{ color }}>{t.damageDice} {t.damageType}</span>}
                  <span style={{ color, textTransform: "capitalize" }}>{t.resolution}</span>
                </div>
                <div style={{ fontSize: 9.5, marginTop: 3, color: already ? COLORS.green : COLORS.blue }}>{already ? "✓ Known" : "+ Add"}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---- Custom creator ---- */
  if (mode === "custom" && draft) {
    const upd = (patch) => setDraft({ ...draft, ...patch });
    const save = () => { setKnown([...known, draft]); setDraft(null); setMode(null); };
    return (
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 14 }}>Custom Technique</div>
          <Btn size="sm" variant="ghost" onClick={() => { setDraft(null); setMode(null); }}><X size={14}/></Btn>
        </div>
        <Field label="Name"><TextInput value={draft.name} onChange={e => upd({ name: e.target.value })} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Type"><Select value={draft.techType} onChange={e => upd({ techType: e.target.value })}>{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select></Field>
          <Field label="Ki Rank"><Select value={draft.kiRank} onChange={e => upd({ kiRank: e.target.value })}>{["1","2","3","4"].map(r => <option key={r} value={r}>{r}</option>)}</Select></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Field label="Ki Cost"><TextInput value={draft.kiCost} onChange={e => upd({ kiCost: e.target.value })} placeholder="7 Ki" /></Field>
          <Field label="Casting Time"><TextInput value={draft.castingTime} onChange={e => upd({ castingTime: e.target.value })} placeholder="1 Action" /></Field>
          <Field label="Range"><TextInput value={draft.range} onChange={e => upd({ range: e.target.value })} placeholder="60ft" /></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Field label="Resolution"><Select value={draft.resolution} onChange={e => upd({ resolution: e.target.value })}><option value="attack">Attack Roll</option><option value="save">Saving Throw</option><option value="utility">Utility (no roll)</option></Select></Field>
          {draft.resolution === "save" ? (
            <Field label="Save Ability"><Select value={draft.saveAbility} onChange={e => upd({ saveAbility: e.target.value })}>{["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map(a => <option key={a} value={a}>{a}</option>)}</Select></Field>
          ) : <div />}
          <Field label="Damage Type"><TextInput value={draft.damageType} onChange={e => upd({ damageType: e.target.value })} placeholder="Energy" /></Field>
        </div>
        <Field label="Damage Dice"><TextInput value={draft.damageDice} onChange={e => upd({ damageDice: e.target.value })} placeholder="2d6+18" /></Field>
        <Field label="Full Text / Effect"><TextArea value={draft.fullText} onChange={e => upd({ fullText: e.target.value })} placeholder="What the technique does..." style={{ minHeight: 80 }} /></Field>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <Btn variant="gold" onClick={save}><Check size={14}/> Add Technique</Btn>
          <Btn variant="ghost" onClick={() => { setDraft(null); setMode(null); }}>Cancel</Btn>
        </div>
      </div>
    );
  }

  /* ---- Known list ---- */
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <Btn variant="gold" onClick={() => setMode("pick")}><Plus size={13}/> Add from Book</Btn>
        <Btn onClick={() => { setDraft(blankCustomTech()); setMode("custom"); }}><Sparkles size={13}/> Create Custom</Btn>
        {(() => {
          const budget = techniquesKnownBudget(char);
          const over = known.length > budget;
          return (
            <span title="Book Ch.8: INT mod + 2 at Lv1, +2 per Level-Up to 10, +2 per even level 11–20, plus any from Training Boons" style={{ marginLeft: "auto", fontSize: 12.5, color: COLORS.muted }}>
              Known <b style={{ color: over ? COLORS.amber : COLORS.text }}>{known.length}</b> <span style={{ color: COLORS.dim }}>/ {budget}</span>
            </span>
          );
        })()}
      </div>
      {known.length === 0 ? (
        <EmptyState icon={Zap} title="No techniques yet" body="Add from the book, or build your own." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
          {known.map(k => {
            const color = techResColor(k.resolution);
            return (
              <div key={k.uid} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, position: "relative" }}>
                <X size={13} onClick={() => removeTech(k.uid)} style={{ position: "absolute", top: 8, right: 8, cursor: "pointer", color: COLORS.red }} />
                <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{k.name}</span>
                  {k.custom && <Tag color={COLORS.muted}>Custom</Tag>}
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>{[k.techType, k.kiRank && `R${k.kiRank}`, k.kiCost].filter(Boolean).join(" · ")}</div>
                {k.damageDice && <div style={{ fontSize: 11.5, marginTop: 5, color }}>{k.damageDice} {k.damageType} · <span style={{ textTransform: "capitalize" }}>{k.resolution}</span></div>}
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                  <span style={{ fontSize: 9.5, color: COLORS.dim }}>Mastery</span>
                  {[1,2,3].map(n => <span key={n} onClick={() => cycleMastery(k.uid)} title="Click to cycle" style={{ cursor: "pointer", fontSize: 13, color: (k.mastery||0) >= n ? COLORS.gold : COLORS.dim }}>★</span>)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Keeps denormalized fields (classId, level, maxStamina) in step with their
// sources so roster cards, exports, and old code paths read correct values.
function useDerivedCharSync(char, setChar) {
  useEffect(() => {
    const patch = {};
    const cls = char.classes || [];
    if (cls.length) {
      const lvl = cls.reduce((a, c) => a + (c.level || 1), 0);
      if (char.level !== lvl) patch.level = lvl;
      if (char.classId !== cls[0].classId) patch.classId = cls[0].classId;
    }
    const ms = computeMaxStamina({ ...char, ...patch });
    if (char.maxStamina !== ms) patch.maxStamina = ms;
    // Auto-provision class-granted resource pools (compute with the level patch
    // applied so formula maxes like "prof"/"kirank" reflect the new level).
    const nextRes = reconcileResources({ ...char, ...patch });
    if (nextRes) patch.resources = nextRes;
    if (Object.keys(patch).length) setChar(prev => ({ ...prev, ...patch }));
    // Effective CON, not base — gear can move it, so worn/removed items have to
    // retrigger the max-Stamina resync just like a raw score change does.
  }, [JSON.stringify(char.classes), effectiveStats(char).con, char.maxStaminaOverride, char.level, JSON.stringify(char.resources)]);
}

function FullBuilder({ onSave, onCancel }) {
  const [tab, setTab] = useState("bio");
  const [char, setChar] = useState(blankChar());
  const [customSpeciesInput, setCustomSpeciesInput] = useState("");
  const set = (patch) => setChar(prev => ({ ...prev, ...patch }));
  // Order = creation flow (player feedback): Features right after Class,
  // Combat + Vitals at the end, Summary as the final step before saving.
  const TABS = ["bio", "class", "features", "stats", "feats", "techniques", "forms", "inventory", "training", "combat", "vitals", "summary"];
  const TAB_LABELS = { bio: "Bio", class: "Class", features: "Features", stats: "Stats", feats: "Feats", techniques: "Techniques", forms: "Forms", inventory: "Inventory", training: "Training", combat: "Combat", vitals: "Vitals", summary: "Summary" };
  const tabIndex = TABS.indexOf(tab);

  useDerivedCharSync(char, setChar);
  useEffect(() => {
    setChar(prev => {
      const patch = {};
      if (!prev.acOverride) { const c = computeAC(prev); if (c && c.value !== prev.ac) patch.ac = c.value; }
      if (prev.drOverride !== true) { const d = computeArmorDR(prev); if (d !== prev.dr) patch.dr = d; }
      return Object.keys(patch).length ? { ...prev, ...patch } : prev;
    });
  }, [JSON.stringify(char.classes), char.classId, char.level, char.stats?.dex, char.stats?.con, char.stats?.int, char.stats?.wis, char.acOverride, JSON.stringify(char.equipment), JSON.stringify(char.items), char.drOverride]);
  useEffect(() => {
    const attacks = computeAttacksPerTurn(char);
    if (attacks !== char.attacksPerTurn) setChar(prev => ({ ...prev, attacksPerTurn: attacks }));
  }, [JSON.stringify(char.classes), char.classId, char.level]);

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 16 }}>{char.name || "New Character"}</div>
        <Btn size="sm" variant="ghost" onClick={onCancel}><X size={15}/></Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "bio" && <BioTab char={char} set={set} withName customSpeciesInput={customSpeciesInput} setCustomSpeciesInput={setCustomSpeciesInput} />}

      {tab === "class" && <ClassesTab char={char} set={set} />}

      {tab === "stats" && <StatsTab char={char} set={set} />}

      {tab === "combat" && <CombatRefTab char={char} set={set} />}

      {tab === "vitals" && <VitalsTab char={char} set={set} />}


      {tab === "features" && <FeaturesTab char={char} set={set} />}

      {tab === "feats" && <FeatsPickerTab char={char} set={set} />}

      {tab === "techniques" && (
        <KnownTechniquesTab char={char} set={set} />
      )}

      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <PowerOverloadCard char={char} />
          <BenefitsOfPowerCard char={char} />
          <FormsTab char={char} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <ConditionsPanel char={char} set={set} />
          </div>
        </div>
      )}

      {tab === "inventory" && <InventoryTab char={char} set={set} />}

      {tab === "training" && <TrainingTab char={char} set={set} />}

      {tab === "summary" && <ScouterSheet char={char} />}

      <div style={{ display: "flex", gap: 8, marginTop: 18, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
        <Btn onClick={() => setTab(TABS[tabIndex - 1])} disabled={tabIndex === 0} style={tabIndex === 0 ? { opacity: 0.4, cursor: "default" } : {}}><ChevronLeft size={14}/> Previous</Btn>
        <Btn onClick={() => setTab(TABS[tabIndex + 1])} disabled={tabIndex === TABS.length - 1} style={tabIndex === TABS.length - 1 ? { opacity: 0.4, cursor: "default" } : {}}>Next <ChevronRight size={14}/></Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="gold" onClick={() => onSave(char)}><Check size={14}/> Save Character</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

function TagListEditor({ label, items, onAdd, onRemove, color, placeholder }) {
  const [val, setVal] = useState("");
  return (
    <div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, marginBottom: 8, fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
      <div style={{ marginBottom: 8 }}>{items.map((c,i) => <Tag key={i} color={color} onRemove={() => onRemove(i)}>{c}</Tag>)}</div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} onKeyDown={e => { if (e.key==="Enter" && val) { onAdd(val); setVal(""); } }} />
        <Btn size="sm" onClick={() => { if (val) { onAdd(val); setVal(""); } }}><Plus size={13}/></Btn>
      </div>
    </div>
  );
}

const ITEM_CATEGORIES = ["Weapon", "Armor", "Shield", "Consumable", "Gear", "Tech", "Key Item", "Artifact", "Other"];
const ATTACK_STATS = [["str", "STR"], ["dex", "DEX"], ["con", "CON"], ["int", "INT"], ["wis", "WIS"], ["cha", "CHA"]];

// Named conditions/effects an item grants (e.g. "Searing Embers — 1d4 fire on a
// failed Con save"). Descriptive for now; surfaced in the Inventory readout.
function ItemEffectsEditor({ effects, onChange }) {
  const list = effects || [];
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const add = () => { const n = name.trim(); if (!n) return; onChange([...list, { id: uid(), name: n, description: desc.trim() }]); setName(""); setDesc(""); };
  const remove = (id) => onChange(list.filter(e => e.id !== id));
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Effects / Conditions</div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 6 }}>
          {list.map(e => (
            <div key={e.id} style={{ display: "flex", gap: 6, alignItems: "flex-start", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 8px" }}>
              <div style={{ flex: 1, fontSize: 11.5, lineHeight: 1.4 }}><span style={{ color: COLORS.gold, fontWeight: 700 }}>[{e.name}]</span>{e.description ? <span style={{ color: COLORS.muted }}> — {e.description}</span> : null}</div>
              <button onClick={() => remove(e.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }} title="Remove"><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr auto", gap: 6 }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Effect name" />
        <TextInput value={desc} onChange={e => setDesc(e.target.value)} placeholder="What it does and when it triggers" onKeyDown={e => { if (e.key === "Enter") add(); }} />
        <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
      </div>
    </div>
  );
}

// Ability Score changes an item applies while equipped (Hill Giant Gauntlets →
// "STR set 20"; a +2 belt → "STR add 2"). Resolution lives in effectiveStats().
function ItemStatModsEditor({ statMods, onChange }) {
  const list = statMods || [];
  const [stat, setStat] = useState("str");
  const [mode, setMode] = useState("set");
  const [value, setValue] = useState("");
  const add = () => {
    const v = Number(value);
    if (!value.trim() || Number.isNaN(v)) return;
    onChange([...list, { id: uid(), stat, mode, value: v }]);
    setValue("");
  };
  const remove = (id) => onChange(list.filter(m => m.id !== id));
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Ability Scores</div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
          {list.map(m => (
            <div key={m.id} style={{ display: "flex", gap: 6, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "4px 8px" }}>
              <span style={{ fontSize: 11.5 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>{STAT_MOD_LABEL[m.stat]}</span>
                <span style={{ color: COLORS.muted }}> {m.mode === "set" ? "set to" : "+"}{m.mode === "set" ? ` ${m.value}` : m.value}</span>
              </span>
              <button onClick={() => remove(m.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }} title="Remove"><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 6 }}>
        <Select value={stat} onChange={e => setStat(e.target.value)}>
          {STAT_KEYS.map(k => <option key={k} value={k}>{STAT_MOD_LABEL[k]}</option>)}
        </Select>
        <Select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="set">Set to</option>
          <option value="add">Add</option>
        </Select>
        <TextInput type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Value" onKeyDown={e => { if (e.key === "Enter") add(); }} />
        <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
      </div>
    </div>
  );
}

// Structured inventory. Items carry slot + combat fields so they can drive AC and
// surface as weapons. Every item mirrors into the shared Data Pool dictionary so
// "anything you add" is findable/reusable there; equipping happens in Equipped.
function ItemsEditor({ items, onChange }) {
  const list = (items || []).map(normalizeItem);
  const [catalog, persistCatalog] = useSharedList("compendium_v2");
  const [draft, setDraft] = useState("");
  const [pick, setPick] = useState("");
  const [openId, setOpenId] = useState(null);
  const cat = equipmentCatalog(catalog);
  const upd = (id, patch) => onChange(list.map(it => it.id === id ? { ...it, ...patch } : it));
  const remove = (id) => onChange(list.filter(it => it.id !== id));

  // Ensure the shared dictionary has an equivalent entry; returns its catalogId.
  const ensureCatalog = (item) => {
    if (!catalog) return item.catalogId || null;
    const existing = catalog.find(e => e.isEquipment && (e.name || "").toLowerCase() === item.name.toLowerCase());
    if (existing) return existing.id;
    const n = normalizeItem(item);
    const entry = { ...n, id: uid(), isEquipment: true, type: (item.category || "item").toLowerCase(),
      cost: item.zeni ? `${item.zeni}z` : "", rank: "", range: "", damage: item.damageDice || "", description: item.notes || "" };
    persistCatalog([...catalog, entry]);
    return entry.id;
  };

  const addByName = () => {
    const name = draft.trim(); if (!name) return;
    const base = normalizeItem({ name });
    onChange([...list, { ...base, catalogId: ensureCatalog(base) }]);
    setDraft("");
  };
  const addFromCatalog = () => {
    const entry = cat.find(e => catalogKey(e) === pick); if (!entry) return;
    onChange([...list, catalogToItem(entry)]);
    setPick("");
  };
  const totalZeni = list.reduce((s, it) => s + (it.zeni || 0) * (it.qty || 1), 0);
  const cols = "2fr 1.1fr 1.2fr 0.8fr 0.6fr auto";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Items / Inventory</div>
        {list.length > 0 && <div style={{ fontSize: 10.5, color: COLORS.dim }}>{list.length} item{list.length > 1 ? "s" : ""} · {totalZeni.toLocaleString()}z value</div>}
      </div>

      {/* Add from the Compendium dictionary (book armor/shield + custom) */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <Select value={pick} onChange={e => setPick(e.target.value)} style={{ flex: 1 }}>
          <option value="">Add from Compendium…</option>
          {cat.map(e => <option key={catalogKey(e)} value={catalogKey(e)}>{e.name}{e.category ? ` — ${e.category}` : ""}{e.zeni ? ` (${e.zeni}z)` : ""}</option>)}
        </Select>
        <Btn size="sm" onClick={addFromCatalog} disabled={!pick}><Plus size={13}/> Add</Btn>
      </div>

      {list.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, padding: "0 8px 4px", fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <span>Name</span><span>Type</span><span>Rarity</span><span style={{ textAlign: "center" }}>Ƶeni ea.</span><span style={{ textAlign: "center" }}>Qty</span><span />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10, maxHeight: 460, overflowY: list.length > 8 ? "auto" : "visible", paddingRight: list.length > 8 ? 4 : 0 }}>
        {list.map(it => {
          const r = rarityInfo(it.rarity);
          const isOpen = openId === it.id;
          return (
            <div key={it.id} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${r.color}`, borderRadius: 7 }}>
              <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, alignItems: "center", padding: "6px 8px" }}>
                <TextInput value={it.name} onChange={e => upd(it.id, { name: e.target.value })} placeholder="Item name" style={{ color: r.color, fontWeight: 600 }} />
                <Select value={it.category} onChange={e => upd(it.id, { category: e.target.value })} style={{ fontSize: 11 }}>
                  <option value="">—</option>
                  {ITEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
                <Select value={it.rarity} onChange={e => upd(it.id, { rarity: e.target.value })} style={{ fontSize: 11, color: r.color }}>
                  {RARITY_TIERS.map(t => <option key={t.key} value={t.key} style={{ color: COLORS.text }}>{t.label}</option>)}
                </Select>
                <CommaNumInput value={it.zeni || 0} onValue={v => upd(it.id, { zeni: v })} title="Ƶeni each" style={{ textAlign: "center", fontSize: 11 }} />
                <TextInput type="number" value={it.qty} onChange={e => upd(it.id, { qty: +e.target.value || 1 })} title="Quantity" style={{ textAlign: "center", fontSize: 11 }} />
                <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <button onClick={() => setOpenId(isOpen ? null : it.id)} title="Slot & combat stats" style={{ background: "transparent", border: "none", color: it.slot ? COLORS.blue : COLORS.dim, cursor: "pointer", padding: 2 }}>{isOpen ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</button>
                  <button onClick={() => remove(it.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 2 }} title="Remove"><Trash2 size={14}/></button>
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                    <Field label="Slot"><Select value={it.slot} onChange={e => upd(it.id, { slot: e.target.value })}>{SLOT_TYPES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</Select></Field>
                    <Field label="+AC bonus (stacks)"><TextInput type="number" value={it.acBonus} onChange={e => upd(it.id, { acBonus: +e.target.value || 0 })} /></Field>
                    <Field label="+DR"><TextInput type="number" value={it.dr} onChange={e => upd(it.id, { dr: +e.target.value || 0 })} /></Field>
                    <Field label="Weighted rank"><TextInput type="number" value={it.weightedRank} onChange={e => upd(it.id, { weightedRank: +e.target.value || 0 })} title="Weighted (Heavy) ranks while worn" /></Field>
                  </div>
                  {it.slot === "body" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 8, alignItems: "end" }}>
                      <Field label="Base AC"><TextInput type="number" value={it.acBase} onChange={e => upd(it.id, { acBase: +e.target.value || 0 })} /></Field>
                      <Field label="Dex handling"><Select value={it.acDexMode} onChange={e => upd(it.id, { acDexMode: e.target.value })}><option value="full">+ full Dex (light)</option><option value="max2">+ Dex, max 2 (medium)</option><option value="none">no Dex (heavy)</option></Select></Field>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, cursor: "pointer", paddingBottom: 8 }}><Checkbox checked={!!it.acHalfProf} onChange={e => upd(it.id, { acHalfProf: e.target.checked })} /> add ½ Prof</label>
                    </div>
                  )}
                  {it.slot === "held" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr", gap: 8 }}>
                      <Field label="Damage dice"><TextInput value={it.damageDice} onChange={e => upd(it.id, { damageDice: e.target.value })} placeholder="1d8+3" /></Field>
                      <Field label="Damage type"><TextInput value={it.damageType} onChange={e => upd(it.id, { damageType: e.target.value })} placeholder="Slashing" /></Field>
                      <Field label="Attack stat"><Select value={it.attackStat} onChange={e => upd(it.id, { attackStat: e.target.value })}>{ATTACK_STATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select></Field>
                    </div>
                  )}
                  <Field label="Notes"><TextInput value={it.notes} onChange={e => upd(it.id, { notes: e.target.value })} placeholder="Effect / description" /></Field>
                  <ItemStatModsEditor statMods={it.statMods} onChange={next => upd(it.id, { statMods: next })} />
                  <ItemEffectsEditor effects={it.effects} onChange={next => upd(it.id, { effects: next })} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={draft} onChange={e => setDraft(e.target.value)} placeholder="New custom item…" onKeyDown={e => { if (e.key === "Enter") addByName(); }} />
        <Btn size="sm" onClick={addByName}><Plus size={13}/> Create</Btn>
      </div>
    </div>
  );
}

// Where each slot marker sits on the silhouette (percent of the paperdoll box).
const SLOT_POS = {
  head: { l: 50, t: 5 }, eyes: { l: 50, t: 13 }, neck: { l: 50, t: 21 },
  body: { l: 50, t: 34 }, waist: { l: 50, t: 48 }, artifact: { l: 50, t: 61 }, feet: { l: 50, t: 94 },
  back: { l: 77, t: 27 },
  hand1: { l: 12, t: 40 }, wrists: { l: 15, t: 53 }, ring1: { l: 17, t: 66 },
  hand2: { l: 88, t: 40 }, gloves: { l: 85, t: 53 }, ring2: { l: 83, t: 66 },
};

// The Equipped paperdoll: a silhouette with the 14 body slots. Click a slot to
// equip a fitting inventory item; AC/DR update live off the equipment.
// The shared holographic body silhouette (used by the Inventory paperdoll and
// the Vitals tab). Fills its positioned parent; pass an aura color to flare it,
// and a stroke color to tint the figure (e.g. red when bloodied).
function BodyFigure({ aura = null, stroke = COLORS.blue }) {
  const bodyPath = "M120 36 C133 36 142 47 143 65 C143 78 138 86 132 90 L150 99 C170 104 182 110 186 118 L189 158 L183 210 C186 232 187 246 178 256 C170 262 164 256 167 244 L169 208 L161 150 C154 168 146 188 141 206 C148 214 150 224 150 234 L148 258 L145 320 L141 362 L137 399 C150 405 157 410 156 416 C146 420 134 417 127 410 L123 300 L120 252 L117 300 L113 410 C106 417 94 420 84 416 C83 410 90 405 103 399 L99 362 L95 320 L92 258 L90 234 C90 224 92 214 99 206 C94 188 86 168 79 150 L71 208 L73 244 C76 256 70 262 62 256 C53 246 54 232 57 210 L51 158 L54 118 C58 110 70 104 90 99 L108 90 C102 86 97 78 97 65 C98 47 107 36 120 36 Z";
  return (
    <svg viewBox="0 0 300 460" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <filter id="figGlow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="auraGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      {aura && (
        <g transform="translate(24,2) scale(1.05)">
          <path d={bodyPath} transform="translate(120,232) scale(1.16) translate(-120,-232)" fill={aura} fillOpacity="0.14" filter="url(#auraGlow)" />
          <path d="M120 452 L142 442 L158 404 L150 392 L190 338 L178 326 L214 256 L200 248 L210 178 L196 176 L188 104 L176 110 L166 36 L154 50 L146 -30 L132 4 L120 -58 L108 4 L94 -30 L86 50 L74 36 L64 110 L52 104 L44 176 L30 178 L40 248 L26 256 L62 326 L50 338 L90 392 L82 404 L98 442 Z" fill={aura} fillOpacity="0.16" stroke={aura} strokeOpacity="0.6" strokeWidth="1.4" strokeLinejoin="round" filter="url(#auraGlow)">
            <animate attributeName="opacity" values="0.6;1;0.72;0.95;0.6" dur="1.8s" repeatCount="indefinite" />
          </path>
        </g>
      )}
      <g transform="translate(24,2) scale(1.05)" filter="url(#figGlow)">
        <path d={bodyPath} fill={`${stroke}12`} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <g fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round">
          <path d="M101 103 Q120 113 139 103" /><path d="M120 111 L120 150" /><path d="M102 107 Q111 132 120 130" /><path d="M138 107 Q129 132 120 130" /><path d="M109 166 Q120 170 131 166" /><path d="M110 182 Q120 186 130 182" /><path d="M112 197 Q120 200 128 197" /><path d="M86 322 Q92 328 98 322" /><path d="M142 322 Q148 328 154 322" />
        </g>
      </g>
    </svg>
  );
}

// Limited-use resource pools (class-granted + custom). Full mode (Vitals) can add
// custom pools and remove them; compact mode (Combat) just spends/rolls them where
// you act. Class pools are auto-provisioned by reconcileResources, so here they're
// only spent/restored/rolled — their max is owned by the class table.
const RESOURCE_RESET_LABEL = { short: "Short Rest", long: "Long Rest", shortHalfLongFull: "½ Short · Long", turn: "Start of turn", encounter: "Per encounter", dawn: "Dawn", manual: "Manual" };
const resourceDieSize = (die) => parseInt(String(die || "").slice(1), 10) || 0;
function ResourceTracker({ char, set, compact = false }) {
  const list = char.resources || [];
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", max: 3, die: "", reset: "long" });
  const [flash, setFlash] = useState(null); // { id, value } — last die roll
  const upd = (id, patch) => set({ resources: list.map(r => r.id === id ? { ...r, ...patch } : r) });
  const spend = (r, n = 1) => upd(r.id, { current: Math.max(0, (r.current || 0) - n) });
  const restore = (r, n = 1) => upd(r.id, { current: Math.min(r.max, (r.current || 0) + n) });
  const rollDie = (r) => {
    const size = resourceDieSize(r.die);
    if (!size || (r.current || 0) <= 0) return;
    const v = roll(size);
    spend(r);
    setFlash({ id: r.id, value: v });
    emitRoll({ label: r.name, total: v, detail: `${r.die} · spent 1`, color: COLORS.blue });
  };
  const remove = (id) => set({ resources: list.filter(r => r.id !== id) });
  const addCustom = () => {
    const name = form.name.trim(); if (!name) return;
    const mx = Math.max(0, +form.max || 0);
    set({ resources: [...list, { id: uid(), source: "custom", name, die: form.die, max: mx, current: mx, reset: form.reset, regen: "", note: "" }] });
    setForm({ name: "", max: 3, die: "", reset: "long" });
    setAdding(false);
  };
  if (!list.length && compact) return null;
  const row = (r) => {
    const size = resourceDieSize(r.die);
    return (
      <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.text }}>{r.name}</span>
            {r.die && <span style={{ fontSize: 9.5, color: COLORS.blue, fontFamily: "JetBrains Mono, monospace" }}>{r.die}</span>}
            {r.source === "class" && <span style={{ fontSize: 8.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>class</span>}
          </div>
          {!compact && <div style={{ fontSize: 10, color: COLORS.dim }}>{RESOURCE_RESET_LABEL[r.reset] || r.reset}{r.note ? ` · ${r.note}` : ""}</div>}
          {flash && flash.id === r.id && <div style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>rolled {r.die} → {flash.value}</div>}
        </div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, minWidth: 44, textAlign: "center" }}>
          <span style={{ color: (r.current || 0) > 0 ? COLORS.text : COLORS.dim }}>{r.current || 0}</span>
          <span style={{ color: COLORS.dim, fontWeight: 400 }}> / {r.max}</span>
        </span>
        <button onClick={() => spend(r)} title="Spend one" style={miniBtnStyle} disabled={(r.current || 0) <= 0}><Minus size={12} /></button>
        {size > 0 && <Btn size="sm" onClick={() => rollDie(r)} title={`Roll ${r.die} and spend one`}><Dices size={12} /></Btn>}
        <button onClick={() => restore(r)} title="Restore one" style={miniBtnStyle}><Plus size={12} /></button>
        {!compact && <span onClick={() => upd(r.id, { current: r.max })} title="Reset to full" style={{ cursor: "pointer", color: COLORS.dim }}><RotateCcw size={13} /></span>}
        {!compact && r.source === "custom" && <span onClick={() => remove(r.id)} title="Remove" style={{ cursor: "pointer", color: COLORS.dim }}><Trash2 size={12} /></span>}
      </div>
    );
  };
  return (
    <div>
      {list.map(row)}
      {!compact && (adding ? (
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginTop: 4, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <TextInput value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ width: 140 }} />
          <TextInput type="number" value={form.max} onChange={e => setForm({ ...form, max: e.target.value })} placeholder="Max" style={{ width: 64 }} title="Max" />
          <Select value={form.die} onChange={e => setForm({ ...form, die: e.target.value })} style={{ width: 78 }} title="Die (optional)">
            <option value="">no die</option>{["d4", "d6", "d8", "d10", "d12"].map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
          <Select value={form.reset} onChange={e => setForm({ ...form, reset: e.target.value })} style={{ width: 116 }} title="Reset">
            {["short", "long", "shortHalfLongFull", "encounter", "dawn", "manual"].map(k => <option key={k} value={k}>{RESOURCE_RESET_LABEL[k]}</option>)}
          </Select>
          <Btn size="sm" variant="gold" onClick={addCustom}><Check size={12} /> Add</Btn>
          <Btn size="sm" variant="ghost" onClick={() => setAdding(false)}>Cancel</Btn>
        </div>
      ) : (
        <div style={{ borderTop: list.length ? `1px solid ${COLORS.border}` : "none", paddingTop: 10, marginTop: 4 }}>
          <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13} /> Add custom resource</Btn>
        </div>
      ))}
    </div>
  );
}

// Vitals — the same body figure (tinted by HP) plus health resources, injuries,
// status effects, and sustenance/rest trackers.
// Picker over the core 5e SRD spell list. Filters by search + level + school;
// "Add" hands the chosen spell up to Cantrips Known (level 0) or Spells Known.
function SpellPicker({ known, onAdd, onClose }) {
  const [q, setQ] = useState("");
  const [lvl, setLvl] = useState("all");
  const [school, setSchool] = useState("all");
  const knownIds = new Set((known || []).map(s => s.spellId).filter(Boolean));
  const list = SPELL_DATA.filter(s =>
    (lvl === "all" || s.level === +lvl) &&
    (school === "all" || s.school === school) &&
    (!q.trim() || s.name.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const lvlLabel = (n) => n === 0 ? "Cantrip" : `Level ${n}`;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Add from Core Spells (SRD)</div>
        <button onClick={onClose} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer" }}><X size={14}/></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6, marginBottom: 10 }}>
        <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search spells…" autoFocus />
        <Select value={lvl} onChange={e => setLvl(e.target.value)} style={{ width: 110 }}>
          <option value="all">All levels</option>
          {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{lvlLabel(n)}</option>)}
        </Select>
        <Select value={school} onChange={e => setSchool(e.target.value)} style={{ width: 130 }}>
          <option value="all">All schools</option>
          {SPELL_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {list.length === 0 && <div style={{ fontSize: 12, color: COLORS.dim, padding: 8 }}>No spells match.</div>}
        {list.map(s => {
          const added = knownIds.has(s.id);
          return (
            <div key={s.id} title={s.description} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: COLORS.gold, minWidth: 30 }}>{s.level === 0 ? "Can" : `L${s.level}`}</span>
              <span style={{ flex: 1, fontSize: 12.5 }}>{s.name} <span style={{ color: COLORS.dim, fontSize: 10.5 }}>· {s.school}</span></span>
              {added
                ? <span style={{ fontSize: 10.5, color: COLORS.dim }}>added</span>
                : <Btn size="sm" onClick={() => onAdd(s)}><Plus size={11}/></Btn>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Spellcasting play surface. A CONTAINER: casting ability → live Save DC/Attack,
// Schools, Cantrips/Spells known, an optional Spell-Slot table (Mystic) and named
// per-Rest cast pools (Magus). No book spell data is seeded here — that's Track B.
function MagicTab({ char, set }) {
  const sc = char.spellcasting || {};
  const setSc = (patch) => set({ spellcasting: { ...sc, ...patch } });
  const { ability, mod, saveDC, attack } = spellStats(char);
  const suggested = defaultCasterAbility(char);
  const [cantrip, setCantrip] = useState("");
  const [spellName, setSpellName] = useState("");
  const [spellLevel, setSpellLevel] = useState("1");
  const [poolName, setPoolName] = useState("");
  const [picker, setPicker] = useState(false);

  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 };
  const head = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 };
  const stat = (label, val) => (
    <div style={{ textAlign: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", flex: 1 }}>
      <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.gold }}>{val}</div>
    </div>
  );

  const cantrips = sc.cantrips || [], spells = sc.spells || [], slots = sc.slots || [], pools = sc.pools || [], schools = sc.schools || [];
  const addCantrip = () => { const n = cantrip.trim(); if (!n) return; setSc({ cantrips: [...cantrips, { id: uid(), name: n, notes: "" }] }); setCantrip(""); };
  const addSpell = () => { const n = spellName.trim(); if (!n) return; setSc({ spells: [...spells, { id: uid(), name: n, level: +spellLevel || 1, notes: "" }] }); setSpellName(""); };
  // Add a picked SRD spell — cantrips (level 0) and leveled spells go to their
  // own lists, both carrying spellId so the picker can flag them as "added".
  const addFromBook = (s) => {
    if (s.level === 0) {
      if (cantrips.some(c => c.spellId === s.id)) return;
      setSc({ cantrips: [...cantrips, { id: uid(), spellId: s.id, name: s.name, school: s.school, notes: "" }] });
    } else {
      if (spells.some(x => x.spellId === s.id)) return;
      setSc({ spells: [...spells, { id: uid(), spellId: s.id, name: s.name, level: s.level, school: s.school, notes: "" }] });
    }
  };
  const toggleSchool = (s) => setSc({ schools: schools.includes(s) ? schools.filter(x => x !== s) : [...schools, s] });
  const addSlotRow = () => { const used = new Set(slots.map(s => s.level)); const level = [1,2,3,4,5,6,7,8,9].find(l => !used.has(l)) || 1; setSc({ slots: [...slots, { id: uid(), level, current: 1, max: 1 }].sort((a,b)=>a.level-b.level) }); };
  const updSlot = (id, patch) => setSc({ slots: slots.map(s => s.id === id ? { ...s, ...patch } : s) });
  const rmSlot = (id) => setSc({ slots: slots.filter(s => s.id !== id) });
  const addPool = () => { const n = poolName.trim(); if (!n) return; setSc({ pools: [...pools, { id: uid(), name: n, current: 1, max: 1, reset: "long" }] }); setPoolName(""); };
  const updPool = (id, patch) => setSc({ pools: pools.map(p => p.id === id ? { ...p, ...patch } : p) });
  const rmPool = (id) => setSc({ pools: pools.filter(p => p.id !== id) });
  // Cast — roll the spell attack and surface the Save DC to the shared roll
  // banner. Leveled spells spend the lowest available slot at or above their level.
  const castRoll = (name, note) => {
    const d20 = roll(20);
    emitRoll({ label: `${char.name || "Caster"} casts ${name}`, total: d20 + attack, detail: `Atk d20 ${d20} ${attack >= 0 ? "+" : ""}${attack} · Save DC ${saveDC}${note ? ` · ${note}` : ""}`, color: COLORS.purple });
  };
  const castSpell = (s) => {
    const slot = slots.filter(sl => sl.level >= s.level && sl.current > 0).sort((a, b) => a.level - b.level)[0];
    if (slot) updSlot(slot.id, { current: slot.current - 1 });
    castRoll(s.name, slot ? `Lv ${slot.level} slot spent` : "no slot spent");
  };

  const stepBtns = (val, on, max) => (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <Btn size="sm" onClick={() => on(Math.max(0, val - 1))}><Minus size={11}/></Btn>
      <span style={{ minWidth: 46, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{val}<span style={{ color: COLORS.dim, fontWeight: 400 }}> / {max}</span></span>
      <Btn size="sm" onClick={() => on(Math.min(max, val + 1))}><Plus size={11}/></Btn>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={card}>
        <div style={head}>Casting</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          {stat("Spell Save DC", saveDC)}
          {stat("Spell Attack", `${attack >= 0 ? "+" : ""}${attack}`)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Spellcasting Ability">
            <Select value={sc.ability || ""} onChange={e => setSc({ ability: e.target.value })}>
              <option value="">Class default ({STAT_MOD_LABEL[suggested]})</option>
              {STAT_KEYS.map(k => <option key={k} value={k}>{STAT_MOD_LABEL[k]}</option>)}
            </Select>
          </Field>
          <Field label="Max Spell Level">
            <TextInput type="number" value={sc.maxSpellLevel || 0} onChange={e => setSc({ maxSpellLevel: +e.target.value })} />
          </Field>
        </div>
        <div style={{ fontSize: 11, color: COLORS.dim }}>Using {STAT_MOD_LABEL[ability]} ({mod >= 0 ? "+" : ""}{mod}).</div>
      </div>

      <div style={card}>
        <div style={head}>Schools of Magic</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SPELL_SCHOOLS.map(s => {
            const on = schools.includes(s);
            return <button key={s} onClick={() => toggleSchool(s)} style={{ cursor: "pointer", fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 12px", border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}1A` : "transparent", color: on ? COLORS.gold : COLORS.muted }}>{s}</button>;
          })}
        </div>
      </div>

      {picker && <SpellPicker known={[...cantrips, ...spells]} onAdd={addFromBook} onClose={() => setPicker(false)} />}

      <div style={card}>
        <div style={{ ...head, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Cantrips Known</span>
          {!picker && <Btn size="sm" onClick={() => setPicker(true)}><BookOpen size={12}/> Add from Core Spells</Btn>}
        </div>
        {cantrips.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
            {cantrips.map(c => (
              <div key={c.id} title={(SPELL_DATA.find(b => b.id === c.spellId) || {}).description || ""} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
                <span style={{ flex: 1, fontSize: 12.5 }}>{c.name}{c.school ? <span style={{ color: COLORS.dim, fontSize: 10.5 }}> · {c.school}</span> : null}</span>
                <Btn size="sm" variant="gold" onClick={() => castRoll(c.name, "cantrip")}><Sparkles size={11}/> Cast</Btn>
                <button onClick={() => setSc({ cantrips: cantrips.filter(x => x.id !== c.id) })} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={cantrip} onChange={e => setCantrip(e.target.value)} placeholder="Custom cantrip name" onKeyDown={e => { if (e.key === "Enter") addCantrip(); }} />
          <Btn size="sm" onClick={addCantrip}><Plus size={12}/> Add</Btn>
        </div>
      </div>

      <div style={card}>
        <div style={head}>Spells Known</div>
        {spells.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
            {spells.slice().sort((a,b) => (a.level||0)-(b.level||0)).map(s => (
              <div key={s.id} title={(SPELL_DATA.find(b => b.id === s.spellId) || {}).description || ""} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.gold, minWidth: 26 }}>Lv{s.level}</span>
                <span style={{ flex: 1, fontSize: 12.5 }}>{s.name}{s.school ? <span style={{ color: COLORS.dim, fontSize: 10.5 }}> · {s.school}</span> : null}</span>
                <Btn size="sm" variant="gold" onClick={() => castSpell(s)} title={slots.some(sl => sl.level >= s.level && sl.current > 0) ? "Cast — spends a slot" : "Cast — no slot to spend"}><Sparkles size={11}/> Cast</Btn>
                <button onClick={() => setSc({ spells: spells.filter(x => x.id !== s.id) })} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 6 }}>
          <Select value={spellLevel} onChange={e => setSpellLevel(e.target.value)} style={{ width: 74 }}>{[1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>Lv {l}</option>)}</Select>
          <TextInput value={spellName} onChange={e => setSpellName(e.target.value)} placeholder="Spell name" onKeyDown={e => { if (e.key === "Enter") addSpell(); }} />
          <Btn size="sm" onClick={addSpell}><Plus size={12}/> Add</Btn>
        </div>
      </div>

      <div style={card}>
        <div style={{ ...head, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Spell Slots <span style={{ textTransform: "none", fontWeight: 400, color: COLORS.dim }}>— Mystic; refill on Long Rest</span></span>
          {mysticLevel(char) > 0 && <Btn size="sm" onClick={() => setSc({ slots: fullCasterSlots(mysticLevel(char)) })} title={`Fill from Mystic level ${mysticLevel(char)} (standard 5e table)`}><RotateCcw size={12}/> Auto (Mystic {mysticLevel(char)})</Btn>}
        </div>
        {slots.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
            {slots.map(s => (
              <div key={s.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, minWidth: 52 }}>Level {s.level}</span>
                {stepBtns(s.current, (v) => updSlot(s.id, { current: v }), s.max)}
                <span style={{ fontSize: 10.5, color: COLORS.dim }}>max</span>
                <Btn size="sm" onClick={() => updSlot(s.id, { max: Math.max(1, (s.max||1) - 1), current: Math.min(s.current, Math.max(1,(s.max||1)-1)) })}><Minus size={11}/></Btn>
                <Btn size="sm" onClick={() => updSlot(s.id, { max: (s.max||0) + 1 })}><Plus size={11}/></Btn>
                <button onClick={() => rmSlot(s.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", marginLeft: "auto" }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <Btn size="sm" onClick={addSlotRow}><Plus size={12}/> Add slot level</Btn>
      </div>

      <div style={card}>
        <div style={head}>Cast Pools <span style={{ textTransform: "none", fontWeight: 400, color: COLORS.dim }}>— per-Rest uses (Magic Infusion, Burst…)</span></div>
        {pools.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
            {pools.map(p => (
              <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, minWidth: 120, flex: 1 }}>{p.name}</span>
                {stepBtns(p.current, (v) => updPool(p.id, { current: v }), p.max)}
                <span style={{ fontSize: 10.5, color: COLORS.dim }}>max</span>
                <Btn size="sm" onClick={() => updPool(p.id, { max: Math.max(1, (p.max||1) - 1), current: Math.min(p.current, Math.max(1,(p.max||1)-1)) })}><Minus size={11}/></Btn>
                <Btn size="sm" onClick={() => updPool(p.id, { max: (p.max||0) + 1 })}><Plus size={11}/></Btn>
                <Select value={p.reset} onChange={e => updPool(p.id, { reset: e.target.value })} style={{ width: 116 }}><option value="short">Short Rest</option><option value="long">Long Rest</option></Select>
                <button onClick={() => rmPool(p.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer" }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={poolName} onChange={e => setPoolName(e.target.value)} placeholder="Pool name (e.g. Magic Infusion)" onKeyDown={e => { if (e.key === "Enter") addPool(); }} />
          <Btn size="sm" onClick={addPool}><Plus size={12}/> Add</Btn>
        </div>
      </div>
    </div>
  );
}

// Refill magic resources on rest: Long Rest tops up slots + all pools; Short
// Rest tops up only the pools set to reset on a Short Rest. Returns a patch
// object (or null) so the Vitals rest handlers can fold it into their own set().
function magicRestPatch(char, kind) {
  const sc = char.spellcasting;
  if (!sc) return null;
  const slots = kind === "long" ? (sc.slots || []).map(s => ({ ...s, current: s.max })) : sc.slots;
  const pools = (sc.pools || []).map(p => (kind === "long" || p.reset === "short") ? { ...p, current: p.max } : p);
  return { spellcasting: { ...sc, slots, pools } };
}

function VitalsTab({ char, set }) {
  const hpPct = char.maxHp ? char.hp / char.maxHp : 1;
  const healthColor = hpPct < 0.25 ? COLORS.red : hpPct < 0.5 ? COLORS.amber : COLORS.blue;
  const v = char.vitals || { exhaustion: 0, food: 3, water: 3, rest: 3 };
  const setV = (patch) => set({ vitals: { ...v, ...patch } });
  const injuries = char.injuries || [];
  const [inj, setInj] = useState("");
  const addInjury = () => { const n = inj.trim(); if (!n) return; set({ injuries: [...injuries, { id: uid(), name: n, location: "", notes: "" }] }); setInj(""); };
  const updInjury = (id, patch) => set({ injuries: injuries.map(x => x.id === id ? { ...x, ...patch } : x) });
  const rmInjury = (id) => set({ injuries: injuries.filter(x => x.id !== id) });
  // Rests (book Ch.1): Short → regain half max Ki. Long → full HP/Ki/Stamina,
  // refill the Breather pool, reset death saves, drop one Exhaustion, Rest→Fresh.
  const shortRest = () => set({
    ki: Math.min(char.maxKi || 0, (char.ki || 0) + Math.floor((char.maxKi || 0) / 2)),
    ...(magicRestPatch(char, "short") || {}),
    ...(resourceRestPatch(char, "short") || {}),
    // Stamina Engine (High-Tech Part): the Breather Pool refills on a Short Rest.
    ...(hasCybernetic(char, "stamina-engine") ? { breatherPool: null } : {}),
  });
  const longRest = () => set({
    hp: char.maxHp || 0, ki: char.maxKi || 0, stamina: char.maxStamina || 0,
    breatherPool: null, deathSaves: { success: 0, fail: 0 },
    vitals: { ...v, exhaustion: Math.max(0, (v.exhaustion || 0) - 1), rest: 3 },
    // Regain half your Hit Dice (min 1, 5e rule); temp pools expire; God Ki refills.
    hitDiceUsed: Math.max(0, (char.hitDiceUsed || 0) - Math.max(1, Math.floor(charTotalLevel(char) / 2))),
    temp: { hp: 0, ki: 0, stamina: 0 },
    godKi: { ...(char.godKi || { max: 0 }), current: (char.godKi || {}).max || 0, temp: 0 },
    ...(magicRestPatch(char, "long") || {}),
    ...(resourceRestPatch(char, "long") || {}),
  });
  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 };
  const head = { fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 };
  const stepper = (label, val, on, max, words) => (
    <div>
      <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span><span style={{ color: COLORS.text, fontWeight: 700 }}>{words ? words[val] ?? val : val}</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Btn size="sm" onClick={() => on(Math.max(0, val - 1))}><Minus size={11}/></Btn>
        <div style={{ flex: 1, height: 6, background: "#00000055", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${(val / max) * 100}%`, height: "100%", background: label === "Exhaustion" ? COLORS.red : COLORS.gold }} /></div>
        <Btn size="sm" onClick={() => on(Math.min(max, val + 1))}><Plus size={11}/></Btn>
      </div>
    </div>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(220px,280px) 1fr", gap: 18, alignItems: "start" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4.6", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
        <BodyFigure stroke={healthColor} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={card}>
          <div style={head}>Health</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["hp", "maxHp", "HP", COLORS.red], ["ki", "maxKi", "Ki", COLORS.blue], ["stamina", "maxStamina", "Stamina", COLORS.gold]].map(([cur, mx, label, color]) => (
              <div key={cur}>
                <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>{label}</div>
                <CommaNumInput value={char[cur] || 0} onValue={v => set({ [cur]: v })} style={{ textAlign: "center" }} />
                <div style={{ marginTop: 6 }}><Gauge label="" value={char[cur]} max={char[mx] || 1} color={color} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card, display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ ...head, marginBottom: 0, flex: 1 }}>Rest</div>
          <Btn size="sm" onClick={shortRest} title="Regain half your maximum Ki"><Zap size={13}/> Short Rest</Btn>
          <Btn size="sm" variant="gold" onClick={longRest} title="Full HP / Ki / Stamina, refill Breather, reset Death Saves, −1 Exhaustion"><HeartPulse size={13}/> Long Rest</Btn>
        </div>
        <DeathSavesPanel char={char} set={set} />
        {(() => {
          const hdMax = charTotalLevel(char);
          const hdUsed = char.hitDiceUsed || 0;
          const hdAvail = Math.max(0, hdMax - hdUsed);
          const temp = char.temp || { hp: 0, ki: 0, stamina: 0 };
          const gk = char.godKi || { current: 0, max: 0, temp: 0 };
          const subHead = { fontSize: 10, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 };
          const numCol = (label, val, on, color) => (
            <div><div style={{ fontSize: 10, color: color || COLORS.muted, marginBottom: 4 }}>{label}</div>
              <TextInput type="number" value={val || 0} onChange={e => on(+e.target.value || 0)} style={{ textAlign: "center" }} /></div>
          );
          return (
            <div style={card}>
              <div style={head}>Resources</div>
              {/* Hit Dice — max = character level; spend to heal, regain half on a Long Rest. */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ ...subHead, marginBottom: 0, flex: 1 }}>Hit Dice</div>
                <Select value={char.hitDie || "d8"} onChange={e => set({ hitDie: e.target.value })} style={{ width: 74 }}>
                  {["d6", "d8", "d10", "d12"].map(d => <option key={d} value={d}>{d}</option>)}
                </Select>
                <Btn size="sm" onClick={() => set({ hitDiceUsed: Math.min(hdMax, hdUsed + 1) })} title="Spend a Hit Die">Spend</Btn>
                <span style={{ fontWeight: 700, minWidth: 62, textAlign: "center" }}>{hdAvail}<span style={{ color: COLORS.dim, fontWeight: 400 }}> / {hdMax}</span></span>
                <Btn size="sm" onClick={() => set({ hitDiceUsed: Math.max(0, hdUsed - 1) })} title="Restore a Hit Die"><RotateCcw size={12}/></Btn>
              </div>
              {/* Temp pools sit on top of HP/Ki/Stamina; cleared by a Long Rest. */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginBottom: 12 }}>
                <div style={subHead}>Temporary Points</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {numCol("Temp HP", temp.hp, x => set({ temp: { ...temp, hp: x } }), COLORS.red)}
                  {numCol("Temp Ki", temp.ki, x => set({ temp: { ...temp, ki: x } }), COLORS.blue)}
                  {numCol("Temp Stamina", temp.stamina, x => set({ temp: { ...temp, stamina: x } }), COLORS.gold)}
                </div>
              </div>
              {/* God Ki — usually gained at Lv20; refills on a Long Rest. */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
                <div style={subHead}>God Ki</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {numCol("Current", gk.current, x => set({ godKi: { ...gk, current: x } }))}
                  {numCol("Max", gk.max, x => set({ godKi: { ...gk, max: x } }))}
                  {numCol("Temp", gk.temp, x => set({ godKi: { ...gk, temp: x } }))}
                </div>
              </div>
              {/* Class-granted + custom limited-use pools (Superiority Dice, Power Points, …). */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginTop: 12 }}>
                <div style={subHead}>Limited-Use Resources</div>
                <ResourceTracker char={char} set={set} />
              </div>
            </div>
          );
        })()}
        <div style={card}>
          <div style={head}>Sustenance &amp; Rest</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {stepper("Food", v.food, x => setV({ food: x }), 3, ["Starving", "Hungry", "Fed", "Well Fed"])}
            {stepper("Water", v.water, x => setV({ water: x }), 3, ["Parched", "Thirsty", "Hydrated", "Full"])}
            {stepper("Rest", v.rest, x => setV({ rest: x }), 3, ["Exhausted", "Tired", "Rested", "Fresh"])}
            {stepper("Exhaustion", v.exhaustion, x => setV({ exhaustion: x }), 6, null)}
          </div>
        </div>
        <div style={card}>
          <div style={head}>Injuries</div>
          {injuries.length === 0 ? <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>—</div> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
              {injuries.map(x => (
                <div key={x.id} style={{ display: "flex", gap: 6, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${COLORS.red}`, borderRadius: 6, padding: "5px 8px" }}>
                  <TextInput value={x.name} onChange={e => updInjury(x.id, { name: e.target.value })} style={{ flex: 1, fontWeight: 600, color: COLORS.red }} />
                  <TextInput value={x.notes} onChange={e => updInjury(x.id, { notes: e.target.value })} placeholder="notes" style={{ flex: 1.5, fontSize: 11 }} />
                  <button onClick={() => rmInjury(x.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer" }}><Trash2 size={13}/></button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={inj} onChange={e => setInj(e.target.value)} placeholder="Add an injury…" onKeyDown={e => { if (e.key === "Enter") addInjury(); }} />
            <Btn size="sm" onClick={addInjury}><Plus size={12}/> Add</Btn>
          </div>
        </div>
        <div style={card}>
          <TagListEditor label="Status Effects" items={char.conditions || []} onAdd={val => set({ conditions: [...(char.conditions || []), val] })} onRemove={i => set({ conditions: (char.conditions || []).filter((_, j) => j !== i) })} color={COLORS.purple} placeholder="Poisoned, Stunned, Crippled…" />
        </div>
      </div>
    </div>
  );
}

function EquippedTab({ char, set }) {
  const items = (char.items || []).map(normalizeItem);
  const equipment = char.equipment || {};
  const byId = Object.fromEntries(items.map(it => [it.id, it]));
  const [activeSlot, setActiveSlot] = useState(null);

  const equip = (slotKey, itemId) => {
    const next = { ...equipment };
    for (const k of Object.keys(next)) if (next[k] === itemId) delete next[k]; // one item, one slot
    next[slotKey] = itemId;
    set({ equipment: next });
    setActiveSlot(null);
  };
  const unequip = (slotKey) => { const next = { ...equipment }; delete next[slotKey]; set({ equipment: next }); setActiveSlot(null); };
  const slotOf = (key) => EQUIP_SLOTS.find(s => s.key === key);
  const candidates = (slotKey) => { const t = slotOf(slotKey)?.type; return items.filter(it => it.slot && it.slot === t); };

  const ac = computeAC(char);
  const drShown = char.drOverride === true ? (char.dr || 0) : computeArmorDR(char);
  const active = activeSlot ? slotOf(activeSlot) : null;
  const filled = Object.values(equipment).filter(Boolean).length;
  const equippedEffects = equippedEntries(char).flatMap(e => (e.item.effects || []).map(ef => ({ ...ef, itemName: e.item.name, color: rarityInfo(e.item.rarity).color })));
  const wt = computeWeighted(char);
  const aura = activeAura(char);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 300px) 1fr", gap: 18, alignItems: "start" }}>
      {/* Paperdoll */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4.6", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
        <BodyFigure aura={aura} />
        {EQUIP_SLOTS.map(s => {
          const pos = SLOT_POS[s.key];
          const item = byId[equipment[s.key]];
          const isActive = activeSlot === s.key;
          const rar = item ? rarityInfo(item.rarity) : null;
          return (
            <button key={s.key} onClick={() => setActiveSlot(isActive ? null : s.key)} title={s.label}
              style={{ position: "absolute", left: `${pos.l}%`, top: `${pos.t}%`, transform: "translate(-50%,-50%)",
                minWidth: 62, maxWidth: 82, padding: "3px 5px", borderRadius: 6, cursor: "pointer", textAlign: "center",
                background: item ? `${rar.color}22` : COLORS.panel, border: `1px solid ${isActive ? COLORS.gold : (item ? rar.color + "99" : COLORS.border)}`,
                color: item ? rar.color : COLORS.dim, fontSize: 8.5, lineHeight: 1.2 }}>
              <div style={{ textTransform: "uppercase", letterSpacing: 0.3, fontSize: 7.5, color: COLORS.dim }}>{s.label}</div>
              <div style={{ fontWeight: 700, fontSize: 9, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item ? item.name : "—"}</div>
            </button>
          );
        })}
      </div>

      {/* Right column: AC/DR + slot picker */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Armor Class</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.text }}>{char.acOverride ? char.ac : (ac ? ac.value : char.ac)}</div>
            <div style={{ fontSize: 9, color: COLORS.dim, marginTop: 2 }}>{ac && !char.acOverride ? ac.formula : "manual override"}</div>
          </div>
          <div style={{ flex: 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Damage Reduction</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.text }}>{drShown}</div>
            <div style={{ fontSize: 9, color: COLORS.dim, marginTop: 2 }}>{filled} slot{filled !== 1 ? "s" : ""} filled</div>
          </div>
        </div>

        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Item Effects</div>
          {equippedEffects.length === 0 ? (
            <div style={{ fontSize: 11.5, color: COLORS.dim }}>—</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {equippedEffects.map(ef => (
                <div key={ef.id} style={{ fontSize: 12, lineHeight: 1.5 }}>
                  <span style={{ color: ef.color, fontWeight: 700 }}>[{ef.name}]</span>
                  <span style={{ color: COLORS.dim }}> from {ef.itemName}:</span>
                  {ef.description ? <span style={{ color: COLORS.muted }}> {ef.description}</span> : null}
                </div>
              ))}
            </div>
          )}
        </div>

        {wt.gear > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Weighted Gear</div>
              <span style={{ fontWeight: 700, fontSize: 12, color: wt.net > 0 ? COLORS.green : wt.net < 0 ? COLORS.red : COLORS.dim }}>{wt.heavy > 0 ? `Heavy ${wt.heavy}` : wt.light > 0 ? `Light ${wt.light}` : "—"}</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => set && set({ weightedUnattuned: !char.weightedUnattuned })} style={{ background: char.weightedUnattuned ? `${COLORS.green}1A` : `${COLORS.red}1A`, border: `1px solid ${char.weightedUnattuned ? COLORS.green : COLORS.red}66`, color: char.weightedUnattuned ? COLORS.green : COLORS.red, borderRadius: 6, padding: "4px 10px", fontSize: 10.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                {char.weightedUnattuned ? "Un-attuned (Light)" : "Attuned (Heavy)"}
              </button>
              <div style={{ fontSize: 10, color: COLORS.dim, lineHeight: 1.5 }}>
                Power {wt.net >= 0 ? "+" : ""}{wt.net} · Speed {wt.net >= 0 ? "+" : ""}{wt.net * 10}ft · BP ×{weightMultiplier(char).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {active ? (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}66`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{active.label} <span style={{ color: COLORS.dim, fontSize: 10.5 }}>· fits {slotTypeLabel(active.type)}</span></div>
              <Btn size="sm" variant="ghost" onClick={() => setActiveSlot(null)}><X size={14}/></Btn>
            </div>
            {equipment[active.key] && (
              <div style={{ marginBottom: 8 }}><Btn size="sm" variant="danger" onClick={() => unequip(active.key)}><Minus size={12}/> Unequip {byId[equipment[active.key]]?.name}</Btn></div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {candidates(active.key).length === 0 ? (
                <div style={{ fontSize: 11.5, color: COLORS.dim }}>No items for this slot.</div>
              ) : candidates(active.key).map(it => {
                const rar = rarityInfo(it.rarity);
                const here = equipment[active.key] === it.id;
                return (
                  <button key={it.id} onClick={() => equip(active.key, it.id)} disabled={here}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 6, cursor: here ? "default" : "pointer",
                      background: here ? `${rar.color}22` : COLORS.panel, border: `1px solid ${here ? rar.color + "99" : COLORS.border}`, color: COLORS.text, textAlign: "left" }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: rar.color }}>{it.name}</span>
                    <span style={{ fontSize: 10, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{it.slot === "body" ? `AC ${it.acBase}` : it.acBonus ? `+${it.acBonus} AC` : ""}{it.dr ? ` · DR ${it.dr}` : ""}{it.damageDice ? ` · ${it.damageDice}` : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Single "Inventory" tab: the equip paperdoll and the item list together, so you
// add/stat an item and equip it without switching tabs.
// Attunement (max 2) & Soulbinding (max 2) — book Ch.10. A capped list of named
// bonds; a Soulbind can only be broken by Death or a Dragon Ball wish.
function BondSlots({ label, max, items, onChange, color }) {
  const list = items || [];
  const [name, setName] = useState("");
  const add = () => { const n = name.trim(); if (!n || list.length >= max) return; onChange([...list, { id: uid(), name: n }]); setName(""); };
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{label} <span style={{ color: list.length >= max ? COLORS.amber : COLORS.dim }}>{list.length}/{max}</span></div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
          {list.map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.panel, border: `1px solid ${color}55`, borderRadius: 6, padding: "5px 9px" }}>
              <span style={{ flex: 1, fontSize: 12.5 }}>{b.name}</span>
              <button onClick={() => onChange(list.filter(x => x.id !== b.id))} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      {list.length < max && (
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Item name" onKeyDown={e => { if (e.key === "Enter") add(); }} />
          <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
        </div>
      )}
    </div>
  );
}

// Cybernetics — install/track High-Tech Parts against the computed Cybernetic Limit
// (½ of CON mod + WIS mod). Android/Cyborg bodies take no −2 Ki Control/Berserk
// penalty and (Android) treat every Part as Advanced. Auto-wired effects: Synthetic
// Muscle Fibers → Weighted (Light), Stamina Engine → Breather refills on Short Rest,
// Ki Engine → per-turn Ki regen (shown as a readout). Others are reference text.
function CyberneticsPanel({ char, set }) {
  const installed = char.cybernetics || [];
  const limit = cyberneticLimit(char);
  const used = cyberneticsUsed(char);
  const advanced = partIsAdvanced(char);
  const exempt = cyberneticsExempt(char);
  const penalty = cyberneticKiControlPenalty(char);
  const [adding, setAdding] = useState(false);
  const install = (partId) => { set({ cybernetics: [...installed, { uid: uid(), partId, signature: false }] }); setAdding(false); };
  const remove = (u) => set({ cybernetics: installed.filter(c => c.uid !== u) });
  const toggleSig = (u) => set({ cybernetics: installed.map(c => c.uid === u ? { ...c, signature: !c.signature } : c) });
  const available = HIGH_TECH_PARTS.filter(p => !hasCybernetic(char, p.id));
  const overLimit = used > limit;
  const kiEngine = hasCybernetic(char, "ki-engine") ? (advanced ? charTotalLevel(char) : Math.ceil(charTotalLevel(char) / 2)) : 0;

  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Cybernetics — High-Tech Parts</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: overLimit ? COLORS.red : COLORS.text }}>{used} / {limit}</span>
        <span style={{ fontSize: 10, color: COLORS.dim }}>limit = ½(CON+WIS mod)</span>
        {installed.some(c => c.signature) && <span style={{ fontSize: 10, color: COLORS.gold }}>+ signature (free)</span>}
        <label style={{ marginLeft: "auto", fontSize: 10.5, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <Checkbox checked={exempt} disabled={isAndroidBody(char) || /cyborg/i.test(char.heritage || "")} onChange={e => set({ cyberneticsNoPenalty: e.target.checked })} /> no penalty
        </label>
        <label style={{ fontSize: 10.5, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <Checkbox checked={advanced} disabled={isAndroidBody(char)} onChange={e => set({ cyberneticsAdvanced: e.target.checked })} /> advanced
        </label>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 10 }}>
        {CYBERNETICS_RULES.installCheck}. {penalty > 0 ? <span style={{ color: COLORS.amber }}>−{penalty} to Ki Control &amp; Berserk saves</span> : <span style={{ color: COLORS.green }}>no Ki Control / Berserk penalty</span>}{kiEngine > 0 ? ` · Ki Engine +${kiEngine} Ki/turn` : ""}
      </div>

      {installed.length === 0 ? <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 10 }}>None installed.</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
          {installedParts(char).map(({ uid: u, signature, def }) => (
            <div key={u} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 12.5 }}>{def.name}</span>
                <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>DC {def.integrationDC}</span>
                {def.integrates && <span style={{ fontSize: 8.5, color: COLORS.green, textTransform: "uppercase", letterSpacing: 0.5 }}>auto</span>}
                <span onClick={() => toggleSig(u)} title="Mark as your free Signature Upgrade (doesn't count against the Limit)" style={{ marginLeft: "auto", cursor: "pointer", fontSize: 10, color: signature ? COLORS.gold : COLORS.dim }}>{signature ? "★ signature" : "☆ signature"}</span>
                <span onClick={() => remove(u)} style={{ cursor: "pointer", color: COLORS.dim }}><Trash2 size={12} /></span>
              </div>
              <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5 }}>{advanced ? def.advancedTech : def.effect}</div>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: COLORS.muted, textTransform: "uppercase" }}>Install a Part</span>
            <span onClick={() => setAdding(false)} style={{ cursor: "pointer", color: COLORS.dim }}><X size={14} /></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 6, maxHeight: 260, overflowY: "auto" }}>
            {available.map(p => (
              <div key={p.id} onClick={() => install(p.id)} title={p.advancedTech} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{p.name}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>DC {p.integrationDC} · Ƶ{p.zeni.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 3, lineHeight: 1.4 }}>{p.effect}</div>
              </div>
            ))}
            {available.length === 0 && <div style={{ fontSize: 11, color: COLORS.dim }}>All Parts installed.</div>}
          </div>
        </div>
      ) : (
        <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13} /> Install High-Tech Part</Btn>
      )}
    </div>
  );
}

function InventoryTab({ char, set }) {
  const [houseRules] = useHouseRules();
  const attuneCap = attunementCapFor(houseRules);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <EquippedTab char={char} set={set} />
      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Ƶeni</span>
          <CommaNumInput value={char.zeni || 0} onValue={v => set({ zeni: v })} style={{ width: 140, textAlign: "center", padding: "5px 6px" }} />
        </div>
        <ItemsEditor items={char.items} onChange={next => set({ items: next })} />
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 16 }}>
          <BondSlots label="Attunement" max={attuneCap} items={char.attunements} onChange={next => set({ attunements: next })} color={COLORS.blue} />
          <BondSlots label="Soulbinding" max={2} items={char.soulbinds} onChange={next => set({ soulbinds: next })} color={COLORS.purple} />
        </div>
        <div style={{ marginTop: 16 }}><CyberneticsPanel char={char} set={set} /></div>
      </div>
    </div>
  );
}

function ComputedACField({ char, onOverride }) {
  const computed = computeAC(char);
  const isOverridden = char.acOverride === true;
  if (!computed) {
    return (
      <div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>AC</div>
        <TextInput type="number" value={char.ac} onChange={e => onOverride({ ac: +e.target.value })} style={{ textAlign: "center" }} />
        <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 4 }}>Pick a Class to auto-compute AC</div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
        <span>AC {!isOverridden && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
        <span onClick={() => onOverride({ acOverride: !isOverridden, ac: isOverridden ? computed.value : char.ac })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline" }}>
          {isOverridden ? "use auto" : "override"}
        </span>
      </div>
      {isOverridden ? (
        <TextInput type="number" value={char.ac} onChange={e => onOverride({ ac: +e.target.value })} style={{ textAlign: "center" }} />
      ) : (
        <div title={computed.formula} style={{ textAlign: "center", fontSize: 16, fontWeight: 700, padding: "7px 0", cursor: "help" }}>{computed.value}</div>
      )}
      <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 4, textAlign: "center" }}>{isOverridden ? "Manual override" : computed.formula}</div>
    </div>
  );
}

function AttacksPerTurnBadge({ char }) {
  if (!char.classId) return null;
  const attacks = computeAttacksPerTurn(char);
  return (
    <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 6, textAlign: "center" }}>
      <span style={{ color: COLORS.blue, fontWeight: 700 }}>{attacks}</span> Attack{attacks>1?"s":""}/Turn <span style={{ color: COLORS.green }}>(auto)</span>
    </div>
  );
}

// Scouter sheet — dense, read-only, everything-computed overview of a character.
// Pure assembly off the existing compute functions (no new math, no mutation), so
// it always matches the live sheet. Techniques and Feats get their own full-width
// space (table directive). Scouter-HUD look: cyan labels, mono/Orbitron numbers.
const SC = {
  card: { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 },
  head: { fontSize: 10, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  label: { fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 },
  mono: { fontFamily: "JetBrains Mono, monospace" },
};
function ScTile({ label, value, sub, color = COLORS.text }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", minWidth: 0 }}>
      <div style={SC.label}>{label}</div>
      <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 17, color, lineHeight: 1.1 }}>{value}</div>
      {sub != null && <div style={{ fontSize: 8.5, color: COLORS.dim }}>{sub}</div>}
    </div>
  );
}
function ScProfDot({ state }) {
  const c = state === "expertise" ? COLORS.blue : state === "prof" || state === true ? COLORS.gold : "transparent";
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, border: `1px solid ${c === "transparent" ? COLORS.dim : c}`, display: "inline-block", flexShrink: 0 }} />;
}
function ScouterSheet({ char }) {
  const [houseRules] = useHouseRules();
  const prof = profBonusForLevel(charTotalLevel(char));
  const power = computePowerLevel(char, houseRules.powerSystem);
  const pas = computePassives(char);
  const ac = computeAC(char);
  const dr = (char.drOverride === true ? (char.dr || 0) : computeArmorDR(char)) + powerDR(char);
  const bop = benefitsOfPower(char);
  const eff = effectivePowerBonus(char);
  const over = computeOverload(char);
  const speed = Math.max(0, (char.speedBase || 30) + (char.speedExtra || 0) + computeWeighted(char).net * 10 + bop.physical * 5);
  const forms = activeForms(char);
  const caster = isCaster(char);
  const ss = caster ? spellStats(char) : null;
  const resources = char.resources || [];
  const techs = char.techniques || [];
  const feats = char.feats || [];
  const refByType = Object.fromEntries(computeTechRefs(char).map(r => [r.type, r]));
  const classLine = charClasses(char).map(c => `${c.classId} ${c.level}`).join(" · ") || "—";
  const equipped = equippedEntries(char);
  const conds = Object.entries(char.activeConditions || {}).filter(([, v]) => v).map(([k]) => CONDITIONS_DATA.find(c => c.id === k)?.name || k).concat(char.conditions || []);
  const injuries = char.injuries || [];
  const aura = activeAura(char);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header — figure + identity + the scouter's signature Power readout */}
      <div style={{ ...SC.card, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        {char.pictureUrl && <img src={char.pictureUrl} alt="" style={{ width: 96, height: 96, borderRadius: 12, objectFit: "cover", border: `1px solid ${COLORS.border}`, flexShrink: 0 }} onError={e => { e.currentTarget.style.display = "none"; }} />}
        <div style={{ position: "relative", width: 66, height: 101, flexShrink: 0 }}><BodyFigure aura={aura} stroke={aura || COLORS.blue} /></div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>{char.name || "—"}</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{classLine} · {char.species || "—"}{char.subspecies ? ` (${char.subspecies})` : ""}</div>
          <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 2 }}>Lv {charTotalLevel(char)} · Ki Rank {computeKiRank(char)} · Prof +{prof}{char.alignment ? ` · ${char.alignment}` : ""}{char.heritage ? ` · ${char.heritage}` : ""}</div>
          {(char.homeworld || (houseRules.gravityAcclimation && char.accustomedGravity > 0)) && (
            <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 2, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              <HomeIcon size={11} style={{ color: COLORS.gold }} />
              <span>Home: <span style={{ color: COLORS.text }}>{char.homeworld || "—"}</span>{houseRules.gravityAcclimation && char.accustomedGravity > 0 ? <span style={{ color: gravityColor(char.accustomedGravity) }}> · handles {char.accustomedGravity}×g</span> : null}</span>
              {houseRules.gravityAcclimation && gravAcclimRanks(char.accustomedGravity) > 0 && <Tag color={COLORS.green}>Lightweight +{gravAcclimRanks(char.accustomedGravity)}</Tag>}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right", minWidth: 120 }}>
          <div style={SC.label}>{power.label}</div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 26, color: COLORS.gold, lineHeight: 1 }}>{power.value.toLocaleString()}</div>
          <div style={{ ...SC.label, marginTop: 4 }}>Carry {computeCarryWeight(char).toLocaleString()} lb</div>
        </div>
      </div>

      {/* Vitals + defenses */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(74px,1fr))", gap: 8 }}>
        <ScTile label="HP" value={`${char.hp ?? 0}`} sub={`/ ${char.maxHp ?? 0}`} color={COLORS.red} />
        <ScTile label="Ki" value={`${char.ki ?? 0}`} sub={`/ ${char.maxKi ?? 0}`} color={COLORS.blue} />
        <ScTile label="Stamina" value={`${char.stamina ?? 0}`} sub={`/ ${char.maxStamina ?? 0}`} color={COLORS.gold} />
        <ScTile label="AC" value={char.acOverride ? char.ac : (ac ? ac.value : char.ac)} color={COLORS.text} />
        <ScTile label="DR" value={dr} color={COLORS.text} />
        <ScTile label="Speed" value={`${speed}`} sub="ft" />
        <ScTile label="Atk/Turn" value={computeAttacksPerTurn(char)} />
        <ScTile label="Power" value={`${eff >= 0 ? "+" : ""}${eff}`} sub={over.over > 0 ? `overload ${over.over}` : "stable"} color={over.over > 0 ? COLORS.amber : COLORS.green} />
      </div>

      {/* Abilities + Saving Throws */}
      <div style={SC.card}>
        <div style={SC.head}>Abilities &amp; Saves</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {STAT_KEYS.map(k => {
            const mod = statMod(char, k);
            const save = computeSaveBonus(char, k);
            return (
              <div key={k} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                <div style={SC.label}>{k}</div>
                <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}>{mod >= 0 ? "+" : ""}{mod}</div>
                <div style={{ ...SC.mono, fontSize: 10, color: COLORS.muted }}>{effectiveStats(char)[k]}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center", marginTop: 4, fontSize: 10, color: save.proficient ? COLORS.gold : COLORS.dim }}>
                  <ScProfDot state={save.proficient} /> save {save.value >= 0 ? "+" : ""}{save.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      <div style={SC.card}>
        <div style={SC.head}>Skills</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: "3px 14px" }}>
          {STAT_KEYS.flatMap(k => (SKILL_LIST[k] || []).map(skill => {
            const sk = computeSkillBonus(char, skill);
            return (
              <div key={skill} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, padding: "2px 0" }}>
                <ScProfDot state={sk.state} />
                <span style={{ flex: 1, color: sk.state !== "none" ? COLORS.text : COLORS.muted }}>{skill}</span>
                <span style={{ ...SC.mono, color: sk.state !== "none" ? COLORS.gold : COLORS.dim }}>{sk.value >= 0 ? "+" : ""}{sk.value}</span>
              </div>
            );
          }))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, flexWrap: "wrap", fontSize: 11, color: COLORS.muted }}>
          <span><span style={SC.label}>Passive Perc</span> {pas.perception}</span>
          <span><span style={SC.label}>Insight</span> {pas.insight}</span>
          <span><span style={SC.label}>Stealth</span> {pas.stealth}</span>
          <span><span style={SC.label}>Ki Stealth</span> {pas.kiStealth}</span>
        </div>
      </div>

      {/* Power / Benefits / Forms */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <div style={SC.card}>
          <div style={SC.head}>Power</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div><span style={SC.label}>Effective Bonus</span> <span style={{ color: COLORS.gold, fontWeight: 700 }}>{eff >= 0 ? "+" : ""}{eff}</span></div>
            <div><span style={SC.label}>Overload</span> threshold {over.threshold} · <span style={{ color: over.over > 0 ? COLORS.amber : COLORS.green }}>{over.over > 0 ? `over by ${over.over} (${over.damage} dmg)` : "stable"}</span></div>
            <div><span style={SC.label}>{power.label}</span> {power.value.toLocaleString()}</div>
          </div>
        </div>
        <div style={SC.card}>
          <div style={SC.head}>Benefits of Power</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px", fontSize: 11.5 }}>
            <span><span style={SC.label}>Energy</span> {bop.energy}</span>
            <span><span style={SC.label}>Toughness</span> {bop.toughness}</span>
            <span><span style={SC.label}>Physical</span> {bop.physical}</span>
            <span><span style={SC.label}>Extra</span> {bop.extra}</span>
          </div>
        </div>
        {forms.length > 0 && (
          <div style={SC.card}>
            <div style={SC.head}>Active Forms</div>
            {forms.map(f => (
              <div key={f.id} style={{ fontSize: 11.5, marginBottom: 3 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>{f.name}</span>
                <span style={{ color: COLORS.dim }}> · +{f.powerBonus || 0} pwr{f.multiplier ? ` · ×${f.multiplier}` : ""}{f.upkeepCost ? ` · ${f.upkeepCost} Ki upkeep` : ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Techniques — own space */}
      <div style={SC.card}>
        <div style={SC.head}>Techniques — {techs.length}</div>
        {techs.length === 0 ? <div style={{ color: COLORS.dim, fontSize: 12 }}>None known.</div> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {techs.map(t => {
              const ref = refByType[t.techType];
              const res = t.resolution === "attack" ? `+${ref ? ref.atk : 0} atk` : t.resolution === "save" ? `DC ${ref ? ref.dc : 0}${t.saveAbility ? ` ${t.saveAbility.slice(0, 3)}` : ""}` : "utility";
              return (
                <div key={t.uid} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 11.5, padding: "3px 0", borderTop: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontWeight: 700, flex: 1, minWidth: 0 }}>{t.name}{t.mastery ? <span style={{ color: COLORS.gold }}> {"★".repeat(t.mastery)}</span> : ""}</span>
                  <span style={{ ...SC.label, width: 62, textAlign: "right" }}>{t.techType} R{t.kiRank}</span>
                  <span style={{ ...SC.mono, color: COLORS.dim, width: 70, textAlign: "right" }}>{t.kiCost || "—"}</span>
                  <span style={{ ...SC.mono, color: COLORS.blue, width: 92, textAlign: "right" }}>{res}</span>
                  <span style={{ ...SC.mono, color: COLORS.muted, width: 78, textAlign: "right" }}>{t.damageDice || ""}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feats — own space */}
      <div style={SC.card}>
        <div style={SC.head}>Feats — {feats.length}</div>
        {feats.length === 0 ? <div style={{ color: COLORS.dim, fontSize: 12 }}>None taken.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "3px 14px" }}>
            {feats.map((f, i) => (
              <div key={f.id || i} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ fontWeight: 700, flex: 1 }}>{typeof f === "string" ? f : (f.name || "—")}</span>
                {f.list && <span style={SC.label}>{f.list}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resources + Spellcasting */}
      {(resources.length > 0 || caster) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          {resources.length > 0 && (
            <div style={SC.card}>
              <div style={SC.head}>Resources</div>
              {resources.map(r => (
                <div key={r.id} style={{ display: "flex", fontSize: 11.5, padding: "2px 0" }}>
                  <span style={{ flex: 1 }}>{r.name}{r.die ? <span style={{ color: COLORS.blue }}> {r.die}</span> : ""}</span>
                  <span style={SC.mono}>{r.current ?? 0} / {r.max}</span>
                </div>
              ))}
            </div>
          )}
          {caster && (
            <div style={SC.card}>
              <div style={SC.head}>Spellcasting</div>
              <div style={{ fontSize: 11.5, lineHeight: 1.8 }}>
                <div><span style={SC.label}>Save DC</span> {ss.saveDC} · <span style={SC.label}>Attack</span> +{ss.attack} · <span style={SC.label}>{ss.ability}</span></div>
                <div><span style={SC.label}>Cantrips</span> {(char.spellcasting?.cantrips || []).length} · <span style={SC.label}>Spells</span> {(char.spellcasting?.spells || []).length}</div>
                {(char.spellcasting?.slots || []).length > 0 && <div><span style={SC.label}>Slots</span> {char.spellcasting.slots.map(s => `${s.current}/${s.max}`).join(" · ")}</div>}
                {(char.spellcasting?.pools || []).map(p => <div key={p.id}><span style={SC.label}>{p.name}</span> {p.current}/{p.max}</div>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Equipment */}
      {equipped.length > 0 && (
        <div style={SC.card}>
          <div style={SC.head}>Equipped</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "3px 14px" }}>
            {equipped.map(e => (
              <div key={e.slotKey} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ ...SC.label, width: 60, flexShrink: 0 }}>{e.slotKey}</span>
                <span style={{ flex: 1, color: COLORS.text }}>{e.item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cybernetics */}
      {(char.cybernetics || []).length > 0 && (
        <div style={SC.card}>
          <div style={SC.head}>Cybernetics — {cyberneticsUsed(char)} / {cyberneticLimit(char)}{cyberneticKiControlPenalty(char) > 0 ? ` · −${cyberneticKiControlPenalty(char)} Ki Control` : ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "3px 14px" }}>
            {installedParts(char).map(({ uid: u, signature, def }) => (
              <div key={u} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ flex: 1, color: COLORS.text }}>{def.name}</span>
                {signature && <span style={{ color: COLORS.gold }}>★</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditions & Injuries */}
      {(conds.length > 0 || injuries.length > 0) && (
        <div style={SC.card}>
          <div style={SC.head}>Status</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {conds.map((c, i) => <Tag key={"c" + i} color={COLORS.amber}>{c}</Tag>)}
            {injuries.map(inj => <Tag key={inj.id} color={COLORS.red}>{inj.name}</Tag>)}
          </div>
        </div>
      )}
    </div>
  );
}

function CharacterEditorSimple({ char, onChange, onDelete, onClose }) {
  const [local, setLocal] = useState(() => migrateChar(char));
  // A Session hand-off may have set the tab we should open on + a combat target.
  const [tab, setTab] = useState(() => (_pendingNav && _pendingNav.entityId === char.id && _pendingNav.sheetTab) || "scouter");
  const [combatTarget, setCombatTarget] = useState(() => (_pendingNav && _pendingNav.entityId === char.id && _pendingNav.target) || null);
  const [customSpeciesInput, setCustomSpeciesInput] = useState("");
  const fileRef = useRef();
  const set = (patch) => setLocal(prev => ({ ...prev, ...patch }));
  // Consume the pending nav (last reader) and keep listening for further hand-offs.
  useEffect(() => {
    if (_pendingNav && _pendingNav.entityId === char.id) _pendingNav = null;
    return onNav(p => {
      if (p.entityId !== char.id) return;
      if (p.sheetTab) setTab(p.sheetTab);
      setCombatTarget(p.target || null);
    });
  }, [char.id]);
  // Keep the stored ac/attacksPerTurn numbers live-synced to the class formula
  // whenever level, stats, or class change — so anywhere else that reads
  // char.ac or char.attacksPerTurn (roster cards, exports, combat) is correct
  // without the player re-entering anything.
  useDerivedCharSync(local, setLocal);
  useEffect(() => {
    setLocal(prev => {
      const patch = {};
      if (!prev.acOverride) { const c = computeAC(prev); if (c && c.value !== prev.ac) patch.ac = c.value; }
      if (prev.drOverride !== true) { const d = computeArmorDR(prev); if (d !== prev.dr) patch.dr = d; }
      return Object.keys(patch).length ? { ...prev, ...patch } : prev;
    });
  }, [JSON.stringify(local.classes), local.classId, local.level, local.stats?.dex, local.stats?.con, local.stats?.int, local.stats?.wis, local.acOverride, JSON.stringify(local.equipment), JSON.stringify(local.items), local.drOverride]);
  useEffect(() => {
    const attacks = computeAttacksPerTurn(local);
    if (attacks !== local.attacksPerTurn) setLocal(prev => ({ ...prev, attacksPerTurn: attacks }));
  }, [JSON.stringify(local.classes), local.classId, local.level]);

  useEffect(() => { onChange(local); /* eslint-disable-next-line */ }, [local]);
  const importFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { setLocal(migrateChar({ ...JSON.parse(reader.result), id: local.id })); } catch { alert("Couldn't read that file."); } };
    reader.readAsText(f);
  };
  const TABS = ["scouter", "bio", "stats", "combat", ...(isCaster(local) ? ["magic"] : []), "vitals", "forms", "inventory", "manage"];
  const TAB_LABELS = { scouter: "Scouter", bio: "Bio", stats: "Stats", combat: "Combat", magic: "Magic", vitals: "Vitals", forms: "Forms", inventory: "Inventory", manage: "Manage" };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <TextInput value={local.name} onChange={e => set({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <Btn size="sm" variant="ghost" onClick={onClose}><X size={15}/></Btn>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {local.pictureUrl && <img src={local.pictureUrl} alt="" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: `1px solid ${COLORS.border}` }} onError={e => { e.currentTarget.style.display = "none"; }} />}
        {charClasses(local).map((c, i) => <Tag key={i} color={i === 0 ? COLORS.gold : COLORS.blue}>{c.classId} {charClasses(local).length > 1 ? c.level : ""}</Tag>)}
        {local.species && <Tag color={COLORS.purple}>{local.species}</Tag>}
        {local.heritage && <Tag color={COLORS.amber}>{local.heritage}</Tag>}
        <Tag color={COLORS.dim}>Lv {charTotalLevel(local)}</Tag>
        <Tag color={COLORS.dim}>Ki Rank {computeKiRank(local)}</Tag>
        <Btn size="sm" variant={tab === "growth" ? "gold" : "default"} style={{ marginLeft: "auto" }} onClick={() => setTab("growth")}><TrendingUp size={13}/> Growth</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        <Gauge label="HP" value={local.hp} max={local.maxHp} color={COLORS.red} />
        <Gauge label="Ki" value={local.ki} max={local.maxKi} color={COLORS.blue} />
        <Gauge label="Stamina" value={local.stamina} max={local.maxStamina} color={COLORS.gold} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "scouter" && <ScouterSheet char={local} />}

      {tab === "bio" && <BioTab char={local} set={set} withNotes customSpeciesInput={customSpeciesInput} setCustomSpeciesInput={setCustomSpeciesInput} />}

      {tab === "growth" && (() => {
        const box = (title, node) => (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>{title}</div>
            {node}
          </div>
        );
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {box("Classes & Levels", <ClassesTab char={local} set={set} guided />)}
            {box("Feats", <FeatsPickerTab char={local} set={set} />)}
            {box("Features", <FeaturesTab char={local} set={set} />)}
            {box("Techniques", <KnownTechniquesTab char={local} set={set} />)}
            {box("Forms", <FormsTab char={local} set={set} />)}
            {box("Training", <TrainingTab char={local} set={set} />)}
          </div>
        );
      })()}

      {tab === "stats" && <StatsTab char={local} set={set} />}

      {tab === "combat" && <CombatRefTab char={local} set={set} combatTarget={combatTarget} onClearTarget={() => setCombatTarget(null)} />}

      {tab === "magic" && <MagicTab char={local} set={set} />}

      {tab === "vitals" && <VitalsTab char={local} set={set} />}

      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <PowerOverloadCard char={local} />
          <BenefitsOfPowerCard char={local} />
          <FormsPlayTab char={local} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <ConditionsPanel char={local} set={set} />
          </div>
        </div>
      )}

      {tab === "inventory" && <InventoryTab char={local} set={set} />}

      {tab === "manage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
          <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importFile} />
          <Btn variant="blue" onClick={() => downloadJSON(local, `${local.name.replace(/\s+/g,'_')}.json`)}><Download size={14}/> Save to device</Btn>
          <Btn onClick={() => fileRef.current.click()}><Upload size={14}/> Load from file</Btn>
          <Btn onClick={() => { const next = { ...local, archived: !local.archived }; setLocal(next); onChange(next); if (next.archived) onClose(); }}><Archive size={14}/> {local.archived ? "Unarchive character" : "Archive character"}</Btn>
          <ConfirmBtn variant="danger" size="md" confirmTitle="Delete this character permanently" onConfirm={() => onDelete(local.id)}><Trash2 size={14}/> Delete character</ConfirmBtn>
        </div>
      )}
    </div>
  );
}

function CharactersTab() {
  const [chars, persist, error] = useSharedList("characters_v2");
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState(null); // null | 'menu' | 'pregen' | 'template' | 'fast' | 'full'
  const [showArchived, setShowArchived] = useState(false);

  // Open the fighter a Session hand-off points at (this tab mounts as the nav
  // switches to it, so also read any nav that already fired).
  useEffect(() => {
    const apply = (p) => { if (p && p.tab === "players" && p.entityId) { setMode(null); setOpenId(p.entityId); } };
    apply(_pendingNav);
    return onNav(apply);
  }, []);

  if (chars === null) return <LoadingBlock />;
  const updateChar = (updated) => persist(chars.map(c => c.id === updated.id ? updated : c));
  const deleteChar = (id) => { persist(chars.filter(c => c.id !== id)); setOpenId(null); };
  const openChar = chars.find(c => c.id === openId);
  const addAndOpen = (c) => { const full = migrateChar(c.id ? c : { ...c, id: uid() }); persist([...chars, full]); setOpenId(full.id); setMode(null); };

  if (mode === "full") return (
    <div>
      <ScannerHeader title="FULL BUILDER" subtitle="Bio → Class → Stats → Skills → Inventory → Ability" onBack={() => setMode(null)} />
      <FullBuilder onSave={addAndOpen} onCancel={() => setMode(null)} />
    </div>
  );
  if (mode === "pregen") return (
    <div>
      <ScannerHeader title="PREGENERATED" subtitle="Ready-to-go fighters" onBack={() => setMode(null)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
        {PREGEN_CHARS.map((p,i) => (
          <div key={i} onClick={() => addAndOpen(p)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700 }}>{p.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{p.species} · {p.classId} · Lv {p.level}</div>
            <div style={{ color: COLORS.dim, fontSize: 11.5, fontStyle: "italic" }}>{p.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
  if (mode === "template" || mode === "fast") return (
    <div>
      <ScannerHeader title={mode === "template" ? "QUICK TEMPLATE" : "FAST & DIRTY"} subtitle={mode === "template" ? "Balanced stat block, pick species & class" : "Random stats, pick species & class"} onBack={() => setMode(null)} />
      <QuickCreate randomStats={mode === "fast"} onCreate={addAndOpen} onCancel={() => setMode(null)} />
    </div>
  );

  return (
    <div>
      <ScannerHeader title="PLAYERS" subtitle="Shared with the table. Export any sheet to save a copy on your device." />
      {error && <ErrorBanner text={error} />}
      {openChar ? (
        <CharacterEditorSimple char={openChar} onChange={updateChar} onClose={() => setOpenId(null)} onDelete={deleteChar} />
      ) : mode === "menu" ? (
        <div>
          <ModeCard title="Pregenerated" desc="Ready-to-go character from a small preset roster." onClick={() => setMode("pregen")} />
          <ModeCard title="Quick Template" desc="Balanced stat block, pick species/class, quick start." onClick={() => setMode("template")} />
          <ModeCard title="Fast & Dirty" desc="Randomly rolled stats. Pick species/class manually." onClick={() => setMode("fast")} />
          <ModeCard title="Full Builder" desc="Bio, real Class data with live feature progression, stats, skills, inventory." onClick={() => setMode("full")} />
          <Btn variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New Character</Btn>
            {chars.some(c => c.archived) && (
              <Btn size="sm" variant={showArchived ? "default" : "ghost"} onClick={() => setShowArchived(!showArchived)}><Archive size={13}/> Archived ({chars.filter(c => c.archived).length})</Btn>
            )}
          </div>
          {chars.filter(c => !c.archived).length === 0 && !showArchived ? (
            <EmptyState icon={Users} title="No characters yet" body="Add your first fighter." action={<Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New Character</Btn>} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
              {chars.filter(c => !c.archived).map(c => (
                <div key={c.id} onClick={() => setOpenId(c.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                    <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete this character permanently" onConfirm={() => deleteChar(c.id)}><Trash2 size={13}/></ConfirmBtn>
                  </div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{[c.species, charClasses(c).map(x => charClasses(c).length > 1 ? `${x.classId} ${x.level}` : x.classId).join(" / ")].filter(Boolean).join(" · ") || "Unset"} {c.level ? `· Lv ${charTotalLevel(c)}` : ""}</div>
                  <Gauge label="HP" value={c.hp} max={c.maxHp||1} color={COLORS.red} />
                  <Gauge label="Ki" value={c.ki} max={c.maxKi||1} color={COLORS.blue} />
                </div>
              ))}
            </div>
          )}
          {showArchived && chars.some(c => c.archived) && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10, paddingBottom: 4, borderBottom: `1px solid ${COLORS.border}` }}>Archived</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
                {chars.filter(c => c.archived).map(c => (
                  <div key={c.id} onClick={() => setOpenId(c.id)} style={{ cursor: "pointer", opacity: 0.55, background: COLORS.panel, border: `1px dashed ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                      <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete this character permanently" onConfirm={() => deleteChar(c.id)}><Trash2 size={13}/></ConfirmBtn>
                    </div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{[c.species, c.classId].filter(Boolean).join(" · ") || "Unset"} {c.level ? `· Lv ${charTotalLevel(c)}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Book ability-score methods (Ch.3): Standard Array (15,14,13,12,10,8) and Roll
// (4d6, keep the three highest). Both quick builders share this — Template uses the
// array, Fast & Dirty rolls — then you assign each number to an ability yourself.
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const rollAbilityScore = () => { const r = [roll(6), roll(6), roll(6), roll(6)].sort((a, b) => b - a); return r[0] + r[1] + r[2]; };

function QuickCreate({ randomStats, onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [customSpecies, setCustomSpecies] = useState("");
  const [classId, setClassId] = useState(CLASS_NAMES[0]);
  const [level, setLevel] = useState(1);
  const genPool = () => randomStats ? Array.from({ length: 6 }, rollAbilityScore) : [...STANDARD_ARRAY];
  const [pool, setPool] = useState(genPool);
  const [assign, setAssign] = useState({ str: null, dex: null, con: null, int: null, wis: null, cha: null });
  const reroll = () => { setPool(genPool()); setAssign({ str: null, dex: null, con: null, int: null, wis: null, cha: null }); };
  const usedIdx = STAT_KEYS.map(k => assign[k]).filter(i => i != null);
  const setAbility = (ab, raw) => setAssign(prev => {
    const idx = raw === "" ? null : Number(raw);
    const next = { ...prev };
    if (idx != null) for (const k of STAT_KEYS) if (next[k] === idx) next[k] = null; // each number used once
    next[ab] = idx;
    return next;
  });
  const stats = Object.fromEntries(STAT_KEYS.map(k => [k, assign[k] != null ? pool[assign[k]] : 10]));
  const ready = STAT_KEYS.every(k => assign[k] != null);

  // Book-correct derived stats: HP from the class hit die + CON; Stamina via the
  // book formula; AC is left to the computed unarmored-defense in the editor.
  const die = CLASS_HIT_DICE[classId] || "d8";
  const dieMax = parseInt(die.slice(1), 10) || 8;
  const avg = Math.floor(dieMax / 2) + 1;
  const conMod = abilityMod(stats.con);
  const L = Math.max(1, level || 1);
  const maxHp = Math.max(1, (dieMax + conMod) + (L - 1) * (avg + conMod));
  const maxStamina = Math.max(1, 2 + conMod + 2 * (L - 1));
  const maxKi = 10 + 5 * (L - 1); // no book Ki-max formula — editable starting estimate

  const create = () => onCreate({
    name: name || "New Fighter", species: species || customSpecies, classId, level: L,
    classes: [{ classId, level: L }],
    stats, hitDie: die,
    hp: maxHp, maxHp, ki: maxKi, maxKi, stamina: maxStamina, maxStamina,
  });

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <Field label="Name"><TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Character name" /></Field>
      <Field label="Species"><SpeciesPicker value={species} onChange={setSpecies} customValue={customSpecies} onCustomChange={setCustomSpecies} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Class"><Select value={classId} onChange={e => setClassId(e.target.value)}>{CLASS_NAMES.map(n => <option key={n}>{n}</option>)}</Select></Field>
        <Field label="Level"><TextInput type="number" value={level} min={1} max={20} onChange={e => setLevel(Math.max(1, Math.min(20, +e.target.value || 1)))} /></Field>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "6px 0 8px" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>
          {randomStats ? "Ability Scores — Rolled (4d6, drop lowest)" : "Ability Scores — Standard Array"}
        </span>
        {randomStats && <Btn size="sm" onClick={reroll}><Dices size={13} /> Re-roll</Btn>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {pool.map((v, i) => (
          <span key={i} style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 12.5, padding: "3px 9px", borderRadius: 6, background: usedIdx.includes(i) ? COLORS.panel2 : `${COLORS.gold}18`, color: usedIdx.includes(i) ? COLORS.dim : COLORS.gold, border: `1px solid ${usedIdx.includes(i) ? COLORS.border : COLORS.gold + "66"}`, textDecoration: usedIdx.includes(i) ? "line-through" : "none" }}>{v}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
        {STAT_KEYS.map(ab => {
          const options = pool.map((v, i) => ({ i, v })).filter(({ i }) => assign[ab] === i || !usedIdx.includes(i));
          const val = assign[ab] != null ? pool[assign[ab]] : null;
          const mod = val != null ? abilityMod(val) : null;
          return (
            <div key={ab} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: COLORS.muted }}>{ab}</span>
                {mod != null && <span style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{mod >= 0 ? "+" : ""}{mod}</span>}
              </div>
              <Select value={assign[ab] == null ? "" : assign[ab]} onChange={e => setAbility(ab, e.target.value)} style={{ padding: "5px 6px" }}>
                <option value="">—</option>
                {options.map(({ i, v }) => <option key={i} value={i}>{v}</option>)}
              </Select>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>
        {die} hit die · HP {maxHp} · Stamina {maxStamina} · Ki {maxKi}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Btn variant="gold" onClick={create} disabled={!ready} style={{ opacity: ready ? 1 : 0.5 }}><Check size={14} /> Create</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

/* ============================== NPCS ============================== */

// ---- Antagonist creation rules (Roster of FighterZ, Ch.1) ------------------
// Everything an antagonist needs derives from its Type (General/Elite/Iconic)
// and Antagonist Level. These helpers transcribe the book's tables so Guided
// Creation and the NPC sheet compute the same budgets the book prescribes.
const ANTAGONIST_TYPES = ["General", "Elite", "Iconic"];

// Antagonist Level → Ki Rank (Level & Ki Rank table). Distinct from the PC
// kiRankForLevel scale — antagonists start at Rank 0.
function antagonistKiRank(level) {
  const L = Math.max(1, level || 1);
  if (L === 1) return 0;
  if (L <= 4) return 1;
  if (L <= 9) return 2;   // book prints 5-9 → Rank 2 (level 10 falls in this band)
  if (L <= 15) return 3;
  if (L <= 20) return 4;
  return 5;
}

// Antagonist Level → Proficiency Bonus (book table, steeper than PC scaling).
function antagonistProf(level) {
  const L = Math.max(1, level || 1);
  if (L === 1) return 2;
  if (L <= 3) return 3;
  if (L <= 6) return 4;
  if (L <= 9) return 5;
  if (L <= 12) return 6;
  if (L <= 15) return 7;
  if (L <= 18) return 8;
  if (L <= 21) return 9;
  if (L <= 24) return 10;
  if (L <= 27) return 11;
  return 12;
}

// Ki Rank → hit die, average HP/die, and Ki modifier (Iconic gets the boosted col).
const KI_RANK_TABLE = {
  0: { die: "d4", avg: 2.5, kiMod: 4, iconicKiMod: 4 },
  1: { die: "d6", avg: 3.5, kiMod: 5, iconicKiMod: 7 },
  2: { die: "d8", avg: 4.5, kiMod: 6, iconicKiMod: 8 },
  3: { die: "d10", avg: 5.5, kiMod: 7, iconicKiMod: 9 },
  4: { die: "d12", avg: 6.5, kiMod: 8, iconicKiMod: 10 },
  5: { die: "d20", avg: 10.5, kiMod: 9, iconicKiMod: 11 },
};

// Ability Score maximum by Type + Ki Rank (General caps lower and stops at Rank 4).
function antagonistAbilityCap(type, kiRank) {
  const general = { 0: 20, 1: 20, 2: 20, 3: 22, 4: 22, 5: null };
  const elite = { 0: 22, 1: 22, 2: 24, 3: 26, 4: 28, 5: 30 };
  return type === "General" ? (general[kiRank] ?? 22) : (elite[kiRank] ?? 30);
}

// Max recommended Phases by Ki Rank (Iconic only).
const PHASES_BY_KI_RANK = { 0: 0, 1: 4, 2: 4, 3: 5, 4: 5, 5: 6 };

// The full derived profile for a Type + Level (+ CON/WIS mods for pools).
function antagonistDerived(type, level, conMod = 0, wisMod = 0) {
  const L = Math.max(1, level || 1);
  const kiRank = antagonistKiRank(L);
  const kt = KI_RANK_TABLE[kiRank];
  const iconic = type === "Iconic";
  const kiMod = iconic ? kt.iconicKiMod : kt.kiMod;
  const feats = 2 + (iconic ? 2 * kiRank : kiRank);
  const stamina = Math.max(0, 2 * L + conMod) * (iconic ? 2 : 1);
  const kiPerLevel = conMod + wisMod + kiMod;
  return {
    kiRank,
    prof: antagonistProf(L),
    hitDie: kt.die,
    avgHpPerDie: kt.avg,
    abilityCap: antagonistAbilityCap(type, kiRank),
    feats,
    techniques: 2 * L,                                  // General Techniques
    superTechniques: type === "General" ? 0 : 1 + kiRank, // Elite/Iconic only
    stamina,
    kiMod,
    kiPerLevel,                                         // Ki gained per level
    maxKi: Math.max(0, kiPerLevel * L),
    maxPhases: iconic ? PHASES_BY_KI_RANK[kiRank] : 0,
    spellsKnown: iconic ? 2 * L : L,                    // if a caster
    schools: 1 + kiRank,
    initBonus: iconic ? Math.ceil(antagonistProf(L) / 2) : 0, // Iconic +½ prof
  };
}

// Party Baseline — the exact variables the DM Playbook recommends tracking
// before designing any encounter (Average damage/round, AC, Save DC, Bonus to
// Hit, Move Speed). Shared with the table so NPC math stays consistent.
const DEFAULT_PARTY_BASELINE = { avgDmgPerRound: 25, avgAC: 15, avgSaveDC: 14, avgToHit: 7, avgMoveSpeed: 30 };

function usePartyBaseline() {
  const [state, persist] = useSharedList("party_baseline");
  const baseline = state && state[0] ? state[0] : DEFAULT_PARTY_BASELINE;
  const save = (patch) => persist([{ ...baseline, ...patch }]);
  return [state === null ? null : baseline, save];
}

function PartyBaselineEditor() {
  const [baseline, save] = usePartyBaseline();
  if (baseline === null) return <LoadingBlock />;
  const fields = [
    ["avgDmgPerRound", "Avg Damage / Round"], ["avgAC", "Avg AC"], ["avgSaveDC", "Avg Save DC"],
    ["avgToHit", "Avg Bonus to Hit"], ["avgMoveSpeed", "Avg Move Speed"],
  ];
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Party Baseline</div>
      <div style={{ color: COLORS.dim, fontSize: 11, marginBottom: 10 }}>From the DM Playbook's "Variables to Consider" — NPC targeting math below is computed from these.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {fields.map(([key, label]) => (
          <div key={key}>
            <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>{label}</div>
            <TextInput type="number" value={baseline[key]} onChange={e => save({ [key]: +e.target.value })} style={{ textAlign: "center" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// NPC-Building math — DM Playbook, "Enemy Considerations":
// Single-Entity: enemy needs ~8 on d20 to hit/succeed vs players; players need
//   ~12 to hit/succeed vs the enemy's own AC/DC.
// Party-to-Party: enemy needs ~10 vs players; players need ~8 vs standard
//   enemies (Elite variant: enemy needs 8-9, players need 9-10).
const FIGHT_TYPES = [
  { key: "solo", label: "Single-Entity (Boss)", enemyTarget: 8, playerTarget: 12 },
  { key: "party", label: "Party vs Party (Standard)", enemyTarget: 10, playerTarget: 8 },
  { key: "elite", label: "Party vs Party (Elite)", enemyTarget: 9, playerTarget: 9 },
];

function computeNpcCombatTargets(fightTypeKey, baseline) {
  const ft = FIGHT_TYPES.find(f => f.key === fightTypeKey) || FIGHT_TYPES[1];
  return {
    attackBonus: Math.round(baseline.avgAC - ft.enemyTarget),
    saveBonus: Math.round(baseline.avgSaveDC - ft.enemyTarget),
    ac: Math.round(baseline.avgToHit + ft.playerTarget),
    dc: Math.round(baseline.avgToHit + ft.playerTarget),
    fightType: ft,
  };
}

function scaledNpc({ species, role, tierKey, fightTypeKey = "party", baseline = DEFAULT_PARTY_BASELINE }) {
  const tier = NPC_TIERS.find(t => t.key === tierKey) || NPC_TIERS[2];
  const baseHp = 30, baseKi = 20, baseDr = 1;
  const maxHp = Math.round(baseHp * tier.mult * (5 + Math.random()*3));
  const maxKi = Math.round(baseKi * tier.mult * (3 + Math.random()*2));
  const targets = computeNpcCombatTargets(fightTypeKey, baseline);
  return {
    id: uid(), name: `${pick(NPC_POOLS.first)} ${Math.random()>0.4?pick(NPC_POOLS.last):""}`.trim(),
    species, role, tier: tier.label, fightType: targets.fightType.label,
    hp: maxHp, maxHp, ki: maxKi, maxKi,
    ac: targets.ac, dc: targets.dc, attackBonus: targets.attackBonus, saveBonus: targets.saveBonus,
    dr: Math.round(baseDr * tier.mult),
    hook: pick(NPC_POOLS.hook), notes: "",
    breakBars: [
      { pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" },
    ],
  };
}

// Break Bars (DM Playbook) — HP % thresholds an enemy crosses during a fight,
// each optionally granting more Power, stronger moves, or a shift in intent.
function currentBreakBarTier(npc) {
  const pct = npc.maxHp > 0 ? (npc.hp / npc.maxHp) * 100 : 0;
  const bars = [...(npc.breakBars || [])].sort((a,b) => b.pct - a.pct);
  const crossed = bars.filter(b => pct <= b.pct);
  return crossed.length; // how many bars have been crossed so far
}

function BreakBarsPanel({ npc, onUpdate }) {
  const [open, setOpen] = useState(false);
  const bars = npc.breakBars || [];
  const pct = npc.maxHp > 0 ? Math.round((npc.hp / npc.maxHp) * 100) : 0;
  const crossedCount = currentBreakBarTier(npc);
  const updateBar = (i, patch) => onUpdate({ breakBars: bars.map((b,j) => j===i ? { ...b, ...patch } : b) });
  const addBar = () => onUpdate({ breakBars: [...bars, { pct: 10, note: "" }] });
  const removeBar = (i) => onUpdate({ breakBars: bars.filter((_,j) => j!==i) });
  return (
    <div style={{ marginTop: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
        <ChevronRight size={13} style={open ? { transform: "rotate(90deg)" } : undefined} color={COLORS.muted} />
        <span>Break Bars — {pct}% HP{crossedCount > 0 ? `, ${crossedCount} crossed` : ""}{bars.length ? ` · ${bars.length}` : ""}</span>
      </div>
      {open && (
        <div style={{ marginTop: 8 }}>
          {bars.sort((a,b) => b.pct - a.pct).map((b, i) => {
            const isCrossed = pct <= b.pct;
            return (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6, opacity: isCrossed ? 1 : 0.5 }}>
                <TextInput type="number" value={b.pct} onChange={e => updateBar(i, { pct: +e.target.value })} style={{ width: 60, textAlign: "center" }} />
                <span style={{ fontSize: 11, color: COLORS.dim }}>%</span>
                <TextInput value={b.note} onChange={e => updateBar(i, { note: e.target.value })} placeholder="e.g. +2 Power, clears negative Conditions..." style={{ flex: 1 }} />
                {isCrossed && <Tag color={COLORS.red}>crossed</Tag>}
                <Btn size="sm" variant="ghost" onClick={() => removeBar(i)}><Trash2 size={12} color={COLORS.red}/></Btn>
              </div>
            );
          })}
          <Btn size="sm" onClick={addBar}><Plus size={12}/> Add Threshold</Btn>
        </div>
      )}
    </div>
  );
}

// Assemble a full antagonist from the guided choices, computing every book-Ch.1
// derived value. HP/AC are book-loose (dice count and armor are DM discretion),
// so they land as sensible, editable estimates.
function assembleGuidedNpc(g) {
  const conMod = abilityMod(g.stats.con);
  const wisMod = abilityMod(g.stats.wis);
  const dexMod = abilityMod(g.stats.dex);
  const d = antagonistDerived(g.type, g.level, conMod, wisMod);
  const L = Math.max(1, g.level || 1);
  const bestMod = Math.max(...STAT_KEYS.map(k => abilityMod(g.stats[k])));
  const dieMax = parseInt(d.hitDie.slice(1), 10) || 6;
  const hp = Math.max(1, Math.round((d.avgHpPerDie + conMod) * L));
  const ac = 10 + dexMod + Math.floor(d.prof / 2);
  // Species + archetype traits are inherent; Universal traits the user added.
  const inherent = [...(ANTAGONIST_TRAITS.species[g.species] || []), ...(ANTAGONIST_TRAITS.archetype[g.archetype] || [])];
  const traits = [...inherent, ...(g.universalTraits || [])];
  return blankNpc({
    name: g.name || "New Antagonist",
    species: g.species, archetype: g.archetype, role: g.faction || "",
    tier: g.type, antagonistLevel: L, kiRank: d.kiRank, prof: d.prof, hitDie: d.hitDie,
    stats: { ...g.stats },
    skillProfs: Object.fromEntries((g.skills || []).map(s => [s, "prof"])),
    traits, refTechniques: g.techniques || [], feats: g.feats || [],
    hp, maxHp: hp, ki: d.maxKi, maxKi: d.maxKi, stamina: d.stamina, maxStamina: d.stamina,
    ac, dc: 8 + d.prof + bestMod, attackBonus: d.prof + Math.max(abilityMod(g.stats.str), dexMod), saveBonus: d.prof, dr: 0,
    legendaryResistance: { max: g.type === "Iconic" ? (g.legendaryResistance ?? 3) : 0, used: 0 },
    iconicActions: g.iconicActions || [], telegraphedActions: g.telegraphedActions || [],
    phases: g.phases || [],
    breakBars: (g.phases && g.phases.length)
      ? g.phases.map(t => ({ pct: Math.round((t / hp) * 100), note: "Phase" }))
      : [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }],
    hook: g.hook || "",
  });
}

// Guided NPC Creation — implements the Roster's Ch.1 "Creating an Antagonist"
// rules as a wizard: Threat → Identity → Build (stats+skills) → Kit → Review.
// Pick Type + Level and every budget is derived; Iconic unlocks the boss kit.
function GuidedNpcCreation({ onCreate, onCancel }) {
  const [baseline] = usePartyBaseline();
  const [step, setStep] = useState(0);
  const [g, setG] = useState(() => ({
    type: "General", level: 3,
    name: "", species: "", archetype: "", faction: "", hook: "",
    stats: { str: 12, dex: 12, con: 12, int: 10, wis: 10, cha: 10 },
    skills: [], universalTraits: [], techniques: [], feats: [],
    legendaryResistance: 3, iconicActions: [], telegraphedActions: [], phases: [],
  }));
  const upd = (patch) => setG(prev => ({ ...prev, ...patch }));
  const STEPS = ["Threat", "Identity", "Build", "Kit", "Review"];
  if (baseline === null) return <LoadingBlock />;

  const conMod = abilityMod(g.stats.con), wisMod = abilityMod(g.stats.wis);
  const d = antagonistDerived(g.type, g.level, conMod, wisMod);
  const isIconic = g.type === "Iconic";
  const speciesList = Object.keys(ANTAGONIST_TRAITS.species);
  const archetypeList = Object.keys(ANTAGONIST_TRAITS.archetype);
  const rollName = () => `${pick(NPC_POOLS.first)} ${Math.random() > 0.4 ? pick(NPC_POOLS.last) : ""}`.trim();

  const typeBlurb = {
    General: "Dangerous in groups, individually limited — grunts, soldiers, Saibamen.",
    Elite: "Named lieutenants and standout threats — Ginyu Force, Saiyan warriors.",
    Iconic: "Saga bosses with Phases, Iconic Actions & Legendary Resistance — Frieza, Cell.",
  };
  const secHead = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "10px 0 6px" };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {STEPS.map((s, i) => <div key={s} onClick={() => setStep(i)} style={{ flex: 1, minWidth: 70, cursor: "pointer", textAlign: "center", padding: "6px 4px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, background: i === step ? `${COLORS.gold}1A` : COLORS.panel2, color: i === step ? COLORS.gold : COLORS.dim, border: `1px solid ${i === step ? COLORS.gold + "55" : COLORS.border}` }}>{s}</div>)}
      </div>

      {/* 1 — Threat */}
      {step === 0 && (
        <div>
          <div style={secHead}>Antagonist Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {ANTAGONIST_TYPES.map(t => (
              <div key={t} onClick={() => upd({ type: t })} style={{ cursor: "pointer", padding: 12, borderRadius: 8, background: g.type === t ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${g.type === t ? COLORS.gold : COLORS.border}` }}>
                <div style={{ fontWeight: 700, color: g.type === t ? COLORS.gold : COLORS.text }}>{t}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4, lineHeight: 1.4 }}>{typeBlurb[t]}</div>
              </div>
            ))}
          </div>
          <div style={secHead}>Antagonist Level</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Btn size="sm" onClick={() => upd({ level: Math.max(1, g.level - 1) })}><Minus size={12} /></Btn>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 24, color: COLORS.gold, minWidth: 40, textAlign: "center" }}>{g.level}</span>
            <Btn size="sm" onClick={() => upd({ level: Math.min(30, g.level + 1) })}><Plus size={12} /></Btn>
            <input type="range" min={1} max={30} value={g.level} onChange={e => upd({ level: +e.target.value })} style={{ flex: 1 }} />
          </div>
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 10, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Derived (book Ch.1)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 12 }}>
              <span><b>Ki Rank</b> {d.kiRank}</span><span><b>Prof</b> +{d.prof}</span><span><b>Hit Die</b> {d.hitDie}</span>
              <span><b>Ability Cap</b> {d.abilityCap ?? "—"}</span><span><b>Feats</b> {d.feats}</span>
              <span><b>Techniques</b> {d.techniques}{d.superTechniques ? ` +${d.superTechniques} Super` : ""}</span>
              <span><b>Stamina</b> {d.stamina}</span><span><b>Ki/Lvl</b> {d.kiPerLevel}</span>
            </div>
            {isIconic && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, fontSize: 12, color: COLORS.red }}>
                <b>Legendary kit unlocked:</b> up to {d.maxPhases} Phases · Iconic Actions · Legendary Resistance · +{d.initBonus} Initiative
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2 — Identity */}
      {step === 1 && (
        <div>
          <Field label="Name">
            <div style={{ display: "flex", gap: 6 }}>
              <TextInput value={g.name} onChange={e => upd({ name: e.target.value })} placeholder="Antagonist name" />
              <Btn size="sm" onClick={() => upd({ name: rollName() })}><Shuffle size={13} /></Btn>
            </div>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Species"><Select value={g.species} onChange={e => upd({ species: e.target.value })}><option value="">— none —</option>{speciesList.map(s => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Archetype"><Select value={g.archetype} onChange={e => upd({ archetype: e.target.value })}><option value="">— none —</option>{archetypeList.map(a => <option key={a}>{a}</option>)}</Select></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Faction / Descriptor">
              <div style={{ display: "flex", gap: 6 }}><TextInput value={g.faction} onChange={e => upd({ faction: e.target.value })} placeholder="e.g. Red Ribbon Army" /><Btn size="sm" onClick={() => upd({ faction: pick(NPC_POOLS.role) })}><Shuffle size={13} /></Btn></div>
            </Field>
            <Field label="Hook">
              <div style={{ display: "flex", gap: 6 }}><TextInput value={g.hook} onChange={e => upd({ hook: e.target.value })} placeholder="What drives them" /><Btn size="sm" onClick={() => upd({ hook: pick(NPC_POOLS.hook) })}><Shuffle size={13} /></Btn></div>
            </Field>
          </div>
          {(g.species || g.archetype) && (
            <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>
              Auto-applies {(ANTAGONIST_TRAITS.species[g.species] || []).length + (ANTAGONIST_TRAITS.archetype[g.archetype] || []).length} inherent traits from species + archetype.
            </div>
          )}
          <Btn size="sm" variant="ghost" style={{ marginTop: 8 }} onClick={() => upd({ name: g.name || rollName(), faction: g.faction || pick(NPC_POOLS.role), hook: g.hook || pick(NPC_POOLS.hook), species: g.species || pick(speciesList), archetype: g.archetype || pick(archetypeList) })}><Dices size={13} /> Roll the blanks</Btn>
        </div>
      )}

      {/* 3 — Build: stats + skills combined */}
      {step === 2 && (
        <div>
          <div style={secHead}>Ability Scores {d.abilityCap ? `(max ${d.abilityCap})` : ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {STAT_KEYS.map(k => {
              const v = g.stats[k];
              const over = d.abilityCap && v > d.abilityCap;
              return (
                <div key={k} style={{ background: COLORS.panel2, border: `1px solid ${over ? COLORS.red : COLORS.border}`, borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: COLORS.muted }}>{k}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Btn size="sm" onClick={() => upd({ stats: { ...g.stats, [k]: Math.max(1, v - 1) } })} style={{ padding: "2px 6px" }}><Minus size={10} /></Btn>
                    <span style={{ width: 26, textAlign: "center", fontWeight: 700, color: over ? COLORS.red : COLORS.text }}>{v}</span>
                    <Btn size="sm" onClick={() => upd({ stats: { ...g.stats, [k]: Math.min(d.abilityCap || 30, v + 1) } })} style={{ padding: "2px 6px" }}><Plus size={10} /></Btn>
                    <span style={{ width: 22, textAlign: "right", fontSize: 10.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <Btn size="sm" variant="ghost" onClick={() => { const arr = [15, 14, 13, 12, 10, 8]; upd({ stats: Object.fromEntries(STAT_KEYS.map((k, i) => [k, arr[i]])) }); }}><Dices size={12} /> Standard spread</Btn>
            <Btn size="sm" variant="ghost" title="Suggest stats that match your party baseline" onClick={() => { const target = 10 + Math.max(0, Math.round((baseline.avgToHit - d.prof) )) * 2; upd({ stats: Object.fromEntries(STAT_KEYS.map(k => [k, ["str", "dex"].includes(k) ? Math.min(d.abilityCap || 20, target + 4) : target])) }); }}>Match my party</Btn>
          </div>
          <div style={secHead}>Skill Proficiencies</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {ALL_SKILLS.map(s => {
              const on = (g.skills || []).includes(s);
              return <span key={s} onClick={() => upd({ skills: on ? g.skills.filter(x => x !== s) : [...(g.skills || []), s] })} style={{ cursor: "pointer", fontSize: 11, fontWeight: 600, borderRadius: 14, padding: "3px 10px", background: on ? `${COLORS.blue}22` : COLORS.panel2, color: on ? COLORS.blue : COLORS.dim, border: `1px solid ${on ? COLORS.blue + "66" : COLORS.border}` }}>{s}</span>;
            })}
          </div>
        </div>
      )}

      {/* 4 — Kit: techniques, feats, legendary */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>Budgets from the book: <b style={{ color: COLORS.text }}>{d.techniques}</b> Techniques{d.superTechniques ? <> + <b style={{ color: COLORS.text }}>{d.superTechniques}</b> Super</> : null}, <b style={{ color: COLORS.text }}>{d.feats}</b> Feats. (Guidance — add what fits.)</div>
          <NamedEntryList label="Techniques" entries={g.techniques} onChange={v => upd({ techniques: v })} color={COLORS.blue} namePlaceholder="Technique" suggestions={TECHNIQUE_DATA.slice(0, 40).map(t => ({ name: t.name, text: t.techType || "" }))} />
          <NamedEntryList label="Feats" entries={g.feats} onChange={v => upd({ feats: v })} color={COLORS.amber} namePlaceholder="Feat" suggestions={FEAT_DATA.slice(0, 30).map(f => ({ name: f.name, text: f.list || "" }))} />
          <NamedEntryList label="Universal Traits (optional)" entries={g.universalTraits} onChange={v => upd({ universalTraits: v })} color={COLORS.green} namePlaceholder="Trait" suggestions={ANTAGONIST_TRAITS.universal} />
          {isIconic && (
            <div style={{ marginTop: 6, paddingTop: 10, borderTop: `1px solid ${COLORS.red}44` }}>
              <div style={{ ...secHead, color: COLORS.red }}>Legendary Kit (Iconic)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 11.5 }}>Legendary Resistance / day</span>
                <Btn size="sm" onClick={() => upd({ legendaryResistance: Math.max(0, g.legendaryResistance - 1) })}><Minus size={11} /></Btn>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{g.legendaryResistance}</span>
                <Btn size="sm" onClick={() => upd({ legendaryResistance: g.legendaryResistance + 1 })}><Plus size={11} /></Btn>
              </div>
              <PhaseThresholdEditor phases={g.phases} onChange={v => upd({ phases: v })} maxHpHint={Math.round((d.avgHpPerDie + conMod) * g.level)} maxPhases={d.maxPhases} />
              <NamedEntryList label="Iconic Actions" entries={g.iconicActions} onChange={v => upd({ iconicActions: v })} color={COLORS.red} namePlaceholder="Iconic Action" />
              <NamedEntryList label="Telegraphed Actions" entries={g.telegraphedActions} onChange={v => upd({ telegraphedActions: v })} color={COLORS.amber} namePlaceholder="Telegraphed Action" />
            </div>
          )}
        </div>
      )}

      {/* 5 — Review */}
      {step === 4 && (() => {
        const npc = assembleGuidedNpc(g);
        return (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{npc.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 10 }}>{[npc.tier, `Lv ${npc.antagonistLevel}`, npc.species, npc.archetype, npc.faction].filter(Boolean).join(" · ")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
              <Gauge label="HP" value={npc.hp} max={npc.maxHp} color={COLORS.red} />
              <Gauge label="Ki" value={npc.ki} max={npc.maxKi} color={COLORS.blue} />
            </div>
            <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>AC {npc.ac} · DC {npc.dc} · Atk +{npc.attackBonus} · Save +{npc.saveBonus} · Stamina {npc.maxStamina} · Prof +{npc.prof} · {npc.hitDie}</div>
            <div style={{ fontSize: 11.5 }}><b>{npc.traits.length}</b> traits · <b>{npc.techniques.length}</b> techniques · <b>{npc.feats.length}</b> feats{npc.legendaryResistance.max ? <> · <span style={{ color: COLORS.red }}>Legendary Resistance {npc.legendaryResistance.max}/day</span></> : null}{npc.phases.length ? <> · <span style={{ color: COLORS.red }}>{npc.phases.length} Phases</span></> : null}</div>
          </div>
        );
      })()}

      <div style={{ display: "flex", gap: 8, marginTop: 16, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        {step > 0 && <Btn onClick={() => setStep(step - 1)}><ChevronLeft size={13} /> Back</Btn>}
        {step < 4 && <Btn variant="blue" onClick={() => setStep(step + 1)}>Next <ChevronRight size={13} /></Btn>}
        {step === 4 && <Btn variant="gold" onClick={() => onCreate(assembleGuidedNpc(g))}><Check size={14} /> Create Antagonist</Btn>}
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

// Phase HP-threshold editor (Iconic) — each row is an HP value the boss stops at
// to escalate; they render as break bars on the sheet.
function PhaseThresholdEditor({ phases, onChange, maxHpHint, maxPhases }) {
  const list = phases || [];
  const [val, setVal] = useState("");
  const add = () => { const n = parseInt(val, 10); if (!n) return; onChange([...list, n].sort((a, b) => b - a)); setVal(""); };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Phase HP Thresholds{maxPhases ? ` (up to ${maxPhases})` : ""}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
        {list.map((t, i) => <span key={i} style={{ fontSize: 11, fontWeight: 600, borderRadius: 12, padding: "3px 9px", background: `${COLORS.red}22`, color: COLORS.red, border: `1px solid ${COLORS.red}55`, display: "inline-flex", alignItems: "center", gap: 5 }}>{t} HP<X size={11} style={{ cursor: "pointer" }} onClick={() => onChange(list.filter((_, j) => j !== i))} /></span>)}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput type="number" value={val} onChange={e => setVal(e.target.value)} placeholder={maxHpHint ? `HP threshold (max ~${maxHpHint})` : "HP threshold"} onKeyDown={e => e.key === "Enter" && add()} style={{ fontSize: 12 }} />
        <Btn size="sm" onClick={add}><Plus size={12} /></Btn>
      </div>
    </div>
  );
}

// The unified NPC model. Every creation mode (Empty, Pregenerated, Guided)
// produces this shape and opens the same sheet. Legendary fields stay empty for
// non-Iconic NPCs. Quick-run tiles (ac/dc/attackBonus/…) drive the combat strip;
// the structured fields drive the editable stat block.
function blankNpc(patch = {}) {
  return {
    id: uid(), name: "New NPC",
    species: "", archetype: "", role: "", tier: "",       // tier = Type (General/Elite/Iconic)
    antagonistLevel: 1,                                    // level (below) mirrors it so shared char helpers work
    kiRank: 0, prof: 2, hitDie: "d4",
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    traits: [], feats: [], refTechniques: [], cybernetics: [], sections: {},
    // Char-compatible fields so the reused player tabs (Skills/Techniques/
    // Combat/Forms/Inventory) drive the NPC the same way they drive a PC.
    skillProfs: {}, savingThrowProfs: [],
    techniques: [], forms: [], items: [], equipment: {},
    zeni: 0, attunements: [], soulbinds: [], resources: [],
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0 },
    ac: 12, dc: 0, attackBonus: 0, saveBonus: 0, dr: 0,
    hp: 20, maxHp: 20, ki: 10, maxKi: 10, stamina: 0, maxStamina: 0,
    breakBars: [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }],
    // Legendary / Iconic boss kit (Roster §Additional Mechanics).
    iconicActions: [], legendaryResistance: { max: 0, used: 0 },
    telegraphedActions: [], phases: [],
    hook: "", notes: "",
    ...patch,
    level: patch.level ?? patch.antagonistLevel ?? 1,
  };
}

// Backfill older saved NPCs with the fields the tabbed sheet now expects.
function migrateNpc(n) {
  return {
    ...blankNpc(),
    ...n,
    level: n.level ?? n.antagonistLevel ?? 1,
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, ...(n.stats || {}) },
    legendaryResistance: { max: 0, used: 0, ...(n.legendaryResistance || {}) },
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0, ...(n.powerBonus || {}) },
    traits: n.traits || [], feats: n.feats || [],
    // Legacy NPCs stored guided techniques as {name,text} in `techniques`; move
    // those to refTechniques and keep `techniques` for the rich rollable shape.
    refTechniques: n.refTechniques || (Array.isArray(n.techniques) && n.techniques[0] && !n.techniques[0].techId && !n.techniques[0].uid ? n.techniques : []),
    techniques: (Array.isArray(n.techniques) && n.techniques[0] && (n.techniques[0].techId || n.techniques[0].uid)) ? n.techniques : [],
    forms: n.forms || [], items: n.items || [], equipment: n.equipment || {},
    skillProfs: n.skillProfs || {}, savingThrowProfs: n.savingThrowProfs || [],
    attunements: n.attunements || [], soulbinds: n.soulbinds || [], resources: n.resources || [],
    cybernetics: n.cybernetics || [], iconicActions: n.iconicActions || [],
    telegraphedActions: n.telegraphedActions || [], phases: n.phases || [],
    sections: n.sections || {},
  };
}

// Roster entry from a book antagonist: quick-run numbers (attack/DC pulled from
// the Actions text) plus the whole block for the stat-block panel. Iconic Phase
// thresholds become break bars so the sheet tracks them out of the box.
function npcFromBook(b) {
  const allText = Object.values(b.sections || {}).join("\n");
  const atkRolls = [...allText.matchAll(/Attack Roll:?\*?\s*\+(\d+)/gi)].map(m => +m[1]);
  const dcs = [...allText.matchAll(/\bDC\b\s*:?\s*(\d+)/gi)].map(m => +m[1]);
  const phaseThresholds = [...new Set([...(b.sections?.Phases || b.sections?.Phase || "").matchAll(/^\|\s*\d+\s*\|\s*([\d,]+)/gm)]
    .map(m => parseInt(m[1].replace(/,/g, ""), 10)).filter(n => n > 0 && b.hp && n < b.hp))];
  const breakBars = phaseThresholds.length
    ? phaseThresholds.map(t => ({ pct: Math.round((t / b.hp) * 100), note: "Phase" }))
    : [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }];
  // Legendary Resistance uses/day, if the trait names a count (e.g. "3/Day").
  const lrTrait = (b.traits || []).find(t => /legendary resistance/i.test(t.name));
  const lrMax = lrTrait ? (parseInt((lrTrait.name.match(/(\d+)\s*\/\s*day/i) || lrTrait.text.match(/(\d+)\s*\/\s*day/i) || [])[1], 10) || 0) : 0;
  return blankNpc({
    name: b.name,
    species: (b.meta.match(/\(([^)]+)\)/) || [])[1] || "",
    role: b.group || "", tier: b.tier || "",
    antagonistLevel: b.antagonistLevel || 1, kiRank: b.kiRank ?? 0,
    prof: b.prof || 2, hitDie: b.hpDice ? `d${(b.hpDice.match(/d(\d+)/) || [])[1] || 8}` : "d8",
    stats: b.stats || undefined,
    traits: b.traits || [], sections: b.sections || {},
    hp: b.hp || 1, maxHp: b.hp || 1, ki: b.ki ?? 0, maxKi: b.ki ?? 0,
    stamina: b.stamina ?? 0, maxStamina: b.stamina ?? 0,
    ac: b.ac || 10, dr: 0, dc: dcs.length ? Math.max(...dcs) : 0,
    attackBonus: atkRolls.length ? Math.max(...atkRolls) : 0, saveBonus: 0,
    legendaryResistance: { max: lrMax, used: 0 },
    phases: phaseThresholds, breakBars, bookId: b.id, book: b,
  });
}

// Section text from the book keeps its markdown; render it plainly — emphasis
// stripped, table rows in monospace so the columns still line up.
function BookText({ text }) {
  const blocks = [];
  let cur = null;
  for (const line of (text || "").split("\n")) {
    const isRow = line.trim().startsWith("|");
    if (!cur || cur.table !== isRow) { cur = { table: isRow, lines: [] }; blocks.push(cur); }
    cur.lines.push(line);
  }
  const strip = (s) => s.replace(/\*\*\*|\*\*|\*|#{2,}\s?/g, "").replace(/^:\s*$/gm, "").replace(/^___\s*$/gm, "");
  return (
    <div style={{ fontSize: 12, lineHeight: 1.55 }}>
      {blocks.map((blk, i) => {
        if (!blk.table) return <div key={i} style={{ whiteSpace: "pre-wrap", color: COLORS.text }}>{strip(blk.lines.join("\n")).replace(/\n{3,}/g, "\n\n").trim()}</div>;
        const rows = blk.lines.filter(l => !/^\|[\s:|-]+\|$/.test(l.trim()))
          .map(l => l.trim().replace(/^\||\|$/g, "").split("|").map(c => strip(c).trim()));
        if (!rows.length) return null;
        return (
          <table key={i} style={{ borderCollapse: "collapse", margin: "8px 0", width: "100%", fontSize: 11.5 }}>
            <tbody>
              {rows.map((cells, r) => (
                <tr key={r}>
                  {cells.map((c, j) => r === 0
                    ? <th key={j} style={{ border: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, textAlign: "left", whiteSpace: "nowrap" }}>{c}</th>
                    : <td key={j} style={{ border: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.text, verticalAlign: "top" }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}


function BookAntagonistBrowser({ onPick }) {
  const [query, setQuery] = useState("");
  const [saga, setSaga] = useState("all");
  const [tier, setTier] = useState("all");
  const sagas = [...new Set(ANTAGONIST_DATA.map(b => b.saga).filter(Boolean))];
  const results = ANTAGONIST_DATA.filter(b => {
    if (saga !== "all" && b.saga !== saga) return false;
    if (tier !== "all" && b.tier !== tier) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return b.name.toLowerCase().includes(q) || (b.group || "").toLowerCase().includes(q) || (b.meta || "").toLowerCase().includes(q);
  });
  const tierColor = { General: COLORS.blue, Elite: COLORS.amber, Iconic: COLORS.red };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search fighters..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={saga} onChange={e => setSaga(e.target.value)} style={{ width: 220 }}>
          <option value="all">All sagas</option>
          {sagas.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={tier} onChange={e => setTier(e.target.value)} style={{ width: 130 }}>
          <option value="all">All tiers</option>
          {["General", "Elite", "Iconic"].map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 8 }}>{results.length} fighter{results.length === 1 ? "" : "s"}</div>
      <div style={{ maxHeight: 420, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 8, paddingRight: 4 }}>
        {results.map(b => {
          const tc = tierColor[b.tier] || COLORS.dim;
          return (
            <div key={b.id} onClick={() => onPick(b)} style={{ cursor: "pointer", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, display: "flex", gap: 10 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, background: `${tc}1A`, border: `1px solid ${tc}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 16, color: tc }}>{(b.name || "?").charAt(0).toUpperCase()}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {b.tier && <Tag color={tc}>{b.tier}</Tag>}
                  {b.antagonistLevel != null && <Tag color={COLORS.dim}>AL {b.antagonistLevel}</Tag>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>{b.name}</div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[b.saga, b.group].filter(Boolean).join(" · ")}</div>
                <div style={{ fontSize: 10, marginTop: 3, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>
                  HP {b.hp}{b.powerLevel != null ? ` · PL ${b.powerLevel.toLocaleString()}` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Reusable editor for a list of {name, text} entries — traits, techniques,
// Iconic Actions, Telegraphed Actions all share this shape.
function NamedEntryList({ label, entries, onChange, color = COLORS.blue, namePlaceholder = "Name", suggestions }) {
  const list = entries || [];
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const add = () => { const n = name.trim(); if (!n) return; onChange([...list, { name: n, text: text.trim() }]); setName(""); setText(""); };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}{list.length ? ` (${list.length})` : ""}</div>
      {list.map((e, i) => (
        <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 8px", marginBottom: 4, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{ flex: 1, fontSize: 12 }}><b style={{ color }}>{e.name}</b>{e.text ? <span style={{ color: COLORS.text }}> — {e.text}</span> : null}</div>
          <X size={12} onClick={() => onChange(list.filter((_, j) => j !== i))} style={{ cursor: "pointer", color: COLORS.red, flexShrink: 0, marginTop: 2 }} />
        </div>
      ))}
      {suggestions && suggestions.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "4px 0 6px" }}>
          {suggestions.filter(s => !list.some(e => e.name === s.name)).slice(0, 12).map((s, i) => (
            <span key={i} onClick={() => onChange([...list, s])} title={s.text} style={{ cursor: "pointer", fontSize: 10.5, color: COLORS.dim, border: `1px dashed ${COLORS.border}`, borderRadius: 12, padding: "2px 8px" }}>+ {s.name}</span>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,1fr) 2fr auto", gap: 6 }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder={namePlaceholder} style={{ fontSize: 12 }} />
        <TextInput value={text} onChange={e => setText(e.target.value)} placeholder="Description (optional)" style={{ fontSize: 12 }} onKeyDown={e => e.key === "Enter" && add()} />
        <Btn size="sm" onClick={add}><Plus size={12} /></Btn>
      </div>
    </div>
  );
}

// Editable antagonist stat block — the shared build surface for Empty, Guided
// output, and (as an editable copy) Pregenerated. Type + Level drive the derived
// readout; Iconic unlocks the legendary panels.
function EditableStatBlock({ npc, onUpdate }) {
  const set = (patch) => onUpdate(patch);
  const conMod = abilityMod(npc.stats?.con ?? 10);
  const wisMod = abilityMod(npc.stats?.wis ?? 10);
  const derived = npc.tier ? antagonistDerived(npc.tier, npc.antagonistLevel, conMod, wisMod) : null;
  const isIconic = npc.tier === "Iconic";
  const head = { fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "14px 0 6px" };
  const cap = derived?.abilityCap;
  const speciesTraits = ANTAGONIST_TRAITS.species[npc.species] || [];
  const archetypeTraits = ANTAGONIST_TRAITS.archetype[npc.archetype] || [];
  const suggestions = [...ANTAGONIST_TRAITS.universal, ...archetypeTraits, ...speciesTraits];

  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
      {/* Type / Level / Archetype / Species + derived readout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
        <Field label="Antagonist Type"><Select value={npc.tier || ""} onChange={e => set({ tier: e.target.value })}><option value="">— none —</option>{ANTAGONIST_TYPES.map(t => <option key={t}>{t}</option>)}</Select></Field>
        <Field label="Antagonist Level"><TextInput type="number" value={npc.antagonistLevel ?? 1} min={1} max={30} onChange={e => { const v = Math.max(1, Math.min(30, +e.target.value || 1)); set({ antagonistLevel: v, level: v }); }} /></Field>
        <Field label="Archetype"><Select value={npc.archetype || ""} onChange={e => set({ archetype: e.target.value })}><option value="">— none —</option>{Object.keys(ANTAGONIST_TRAITS.archetype).map(a => <option key={a}>{a}</option>)}</Select></Field>
        <Field label="Species"><Select value={npc.species || ""} onChange={e => set({ species: e.target.value })}><option value="">— none —</option>{Object.keys(ANTAGONIST_TRAITS.species).map(s => <option key={s}>{s}</option>)}</Select></Field>
      </div>
      {derived && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 11.5, color: COLORS.muted, margin: "2px 0 4px" }}>
          <span><b style={{ color: COLORS.gold }}>Ki Rank</b> {derived.kiRank}</span>
          <span><b>Prof</b> +{derived.prof}</span>
          <span><b>Hit Die</b> {derived.hitDie}</span>
          <span><b>Ability Cap</b> {derived.abilityCap ?? "—"}</span>
          <span><b>Feats</b> {derived.feats}</span>
          <span><b>Techniques</b> {derived.techniques}{derived.superTechniques ? ` (+${derived.superTechniques} Super)` : ""}</span>
          <span><b>Stamina</b> {derived.stamina}</span>
          <span><b>Ki/Lvl</b> {derived.kiPerLevel}</span>
          {isIconic && <span><b style={{ color: COLORS.red }}>Max Phases</b> {derived.maxPhases}</span>}
        </div>
      )}

      {/* Ability scores */}
      <div style={head}>Ability Scores</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
        {STAT_KEYS.map(k => {
          const v = npc.stats?.[k] ?? 10;
          const over = cap && v > cap;
          return (
            <div key={k} style={{ background: COLORS.panel, border: `1px solid ${over ? COLORS.red : COLORS.border}`, borderRadius: 6, padding: "5px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase" }}>{k}</div>
              <input type="number" value={v} onChange={e => set({ stats: { ...npc.stats, [k]: +e.target.value } })} style={{ width: "100%", textAlign: "center", background: "transparent", border: "none", color: over ? COLORS.red : COLORS.text, fontWeight: 700, fontSize: 14, outline: "none" }} />
              <div style={{ fontSize: 9.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)}</div>
            </div>
          );
        })}
      </div>
      {cap && <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 3 }}>Ability score max for a {npc.tier} at Ki Rank {derived.kiRank}: {cap}</div>}

      {/* Traits, techniques, feats */}
      <div style={head}>Traits</div>
      <NamedEntryList label="Traits" entries={npc.traits} onChange={v => set({ traits: v })} color={COLORS.green} namePlaceholder="Trait name" suggestions={suggestions} />
      <div style={head}>Feats &amp; Technique Notes</div>
      <NamedEntryList label="Feats" entries={npc.feats} onChange={v => set({ feats: v })} color={COLORS.amber} namePlaceholder="Feat" />
      <NamedEntryList label="Technique Notes" entries={npc.refTechniques} onChange={v => set({ refTechniques: v })} color={COLORS.blue} namePlaceholder="Technique" />
      <div style={{ fontSize: 9.5, color: COLORS.dim }}>Rollable Ki techniques live in the Techniques tab.</div>

      {/* Legendary / Iconic kit */}
      {isIconic && (
        <>
          <div style={{ ...head, color: COLORS.red }}>Legendary Kit</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, color: COLORS.text }}>Legendary Resistance</span>
            <Btn size="sm" onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, max: Math.max(0, (npc.legendaryResistance?.max || 0) - 1), used: Math.min(npc.legendaryResistance?.used || 0, Math.max(0, (npc.legendaryResistance?.max || 0) - 1)) } })}><Minus size={11} /></Btn>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{npc.legendaryResistance?.max || 0}/day</span>
            <Btn size="sm" onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, max: (npc.legendaryResistance?.max || 0) + 1 } })}><Plus size={11} /></Btn>
          </div>
          <NamedEntryList label="Iconic Actions" entries={npc.iconicActions} onChange={v => set({ iconicActions: v })} color={COLORS.red} namePlaceholder="Iconic Action" />
          <NamedEntryList label="Telegraphed Actions" entries={npc.telegraphedActions} onChange={v => set({ telegraphedActions: v })} color={COLORS.amber} namePlaceholder="Telegraphed Action" />
          <div style={{ fontSize: 9.5, color: COLORS.dim }}>Phase HP thresholds are tracked as Break Bars above.</div>
        </>
      )}

      {/* Book prose sections (Actions etc.), editable */}
      {Object.keys(npc.sections || {}).length > 0 && (
        <>
          <div style={head}>Sections</div>
          {Object.entries(npc.sections).map(([sec, body]) => (
            <div key={sec} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, marginBottom: 3 }}>{sec}</div>
              <TextArea value={body} onChange={e => set({ sections: { ...npc.sections, [sec]: e.target.value } })} style={{ fontSize: 11.5 }} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// Bulk deploy — pick from the saved bestiary with a per-NPC quantity, then push
// them all onto the Session initiative tracker at once.
function BulkDeploy({ npcs, onDeploy, onCancel }) {
  const [qty, setQty] = useState({});
  const [query, setQuery] = useState("");
  const results = npcs.filter(n => !query || (n.name || "").toLowerCase().includes(query.toLowerCase()));
  const setQ = (id, v) => setQty(prev => ({ ...prev, [id]: Math.max(0, v) }));
  const picks = npcs.filter(n => (qty[n.id] || 0) > 0).map(n => ({ npc: n, qty: qty[n.id] }));
  const total = picks.reduce((s, p) => s + p.qty, 0);
  if (npcs.length === 0) return <EmptyState icon={Users} title="No saved NPCs" body="Create some antagonists first, then deploy them here." />;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
        <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your bestiary..." style={{ paddingLeft: 30 }} />
      </div>
      <div style={{ maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
        {results.map(n => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.panel2, border: `1px solid ${(qty[n.id] || 0) > 0 ? COLORS.purple + "66" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{n.name}</div>
              <div style={{ fontSize: 10.5, color: COLORS.muted }}>{[n.tier, n.species, n.role].filter(Boolean).join(" · ") || "—"} · HP {n.maxHp ?? n.hp}</div>
            </div>
            <Btn size="sm" onClick={() => setQ(n.id, (qty[n.id] || 0) - 1)}><Minus size={12} /></Btn>
            <span style={{ width: 22, textAlign: "center", fontWeight: 700, color: (qty[n.id] || 0) > 0 ? COLORS.purple : COLORS.dim }}>{qty[n.id] || 0}</span>
            <Btn size="sm" onClick={() => setQ(n.id, (qty[n.id] || 0) + 1)}><Plus size={12} /></Btn>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        <Btn variant="gold" disabled={total === 0} style={{ opacity: total === 0 ? 0.5 : 1 }} onClick={() => onDeploy(picks)}><Swords size={14} /> Add {total || ""} to Encounter</Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

// Read-only stat readout for the Sheet tab — ability scores + the derived
// antagonist line + any book meta (senses/resistances). Works for book,
// guided and blank NPCs alike; editing happens in the Growth tab.
function NpcStatReadout({ npc }) {
  const conMod = abilityMod(npc.stats?.con ?? 10), wisMod = abilityMod(npc.stats?.wis ?? 10);
  const derived = npc.tier ? antagonistDerived(npc.tier, npc.antagonistLevel, conMod, wisMod) : null;
  const b = npc.book || {};
  const head = { fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "12px 0 6px" };
  const line = { fontSize: 12, color: COLORS.text };
  const meta = [b.senses, b.languages, b.resistances && `Resistances: ${b.resistances}`, b.immunities && `Immunities: ${b.immunities}`, b.savingThrows && `Saves: ${b.savingThrows}`, b.skills && `Skills: ${b.skills}`].filter(Boolean).join(" · ");
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12 }}>
        {b.powerLevel != null && <span style={line}><b style={{ color: COLORS.gold }}>Power Level</b> {b.powerLevel.toLocaleString()}</span>}
        <span style={line}><b>Antagonist Lv</b> {npc.antagonistLevel ?? npc.level ?? 1}</span>
        {derived && <><span style={line}><b>Ki Rank</b> {derived.kiRank}</span><span style={line}><b>Prof</b> +{derived.prof}</span><span style={line}><b>Hit Die</b> {derived.hitDie}</span></>}
      </div>
      <div style={head}>Ability Scores</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
        {STAT_KEYS.map(k => { const v = npc.stats?.[k] ?? 10; return (
          <div key={k} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase" }}>{k}</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{v} ({abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)})</div>
          </div>); })}
      </div>
      {meta && <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 8 }}>{meta}</div>}
    </div>
  );
}

// The NPC's abilities on their own page — traits, feats, actions and statblock
// prose shown with full descriptions (the player Features tab's counterpart).
// Building/editing happens in the Growth tab; this is the read surface.
function NpcFeaturesTab({ npc }) {
  const isIconic = npc.tier === "Iconic";
  const head = { fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, margin: "0 0 8px" };
  const Entry = ({ e, color }) => (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "9px 11px", marginBottom: 6 }}>
      <div style={{ fontWeight: 700, fontSize: 13, color }}>{e.name}</div>
      {e.text && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5, marginTop: 3, whiteSpace: "pre-line" }}>{e.text.replace(/\*\*\*|\*\*|\*/g, "")}</div>}
    </div>
  );
  const Section = ({ label, entries, color }) => (entries && entries.length) ? (
    <div style={{ marginBottom: 18 }}>
      <div style={head}>{label} ({entries.length})</div>
      {entries.map((e, i) => <Entry key={i} e={e} color={color} />)}
    </div>
  ) : null;
  const secEntries = Object.entries(npc.sections || {});
  const empty = !(npc.traits?.length || npc.feats?.length || npc.refTechniques?.length || (isIconic && (npc.iconicActions?.length || npc.telegraphedActions?.length)) || secEntries.length);
  if (empty) return <EmptyState icon={Sparkles} title="No features yet" body="Add traits, feats and actions in the Growth tab — they'll show here with their full descriptions." />;
  return (
    <div>
      <Section label="Traits" entries={npc.traits} color={COLORS.green} />
      {isIconic && <Section label="Iconic Actions" entries={npc.iconicActions} color={COLORS.red} />}
      {isIconic && <Section label="Telegraphed Actions" entries={npc.telegraphedActions} color={COLORS.amber} />}
      <Section label="Feats" entries={npc.feats} color={COLORS.amber} />
      <Section label="Technique Notes" entries={npc.refTechniques} color={COLORS.blue} />
      {secEntries.map(([sec, body]) => (
        <div key={sec} style={{ marginBottom: 14 }}>
          <div style={head}>{sec}</div>
          <BookText text={body} />
        </div>
      ))}
    </div>
  );
}

// The NPC sheet — a near-mirror of the player play surface. Sheet holds the
// running stat block; Stats (roll tables), Features, Techniques, Combat, Forms and
// Inventory reuse the exact player tab components. A Growth tab is the build
// surface (stat block + traits + form catalog) — the DM-only counterpart to the
// player's Growth, keeping construction off the running sheet.
function NpcSheet({ npc, onUpdate, onRemove, onClose }) {
  const [tab, setTab] = useState(() => (_pendingNav && _pendingNav.entityId === npc.id && _pendingNav.sheetTab) || (npc._startEditing ? "growth" : "sheet"));
  const [combatTarget, setCombatTarget] = useState(() => (_pendingNav && _pendingNav.entityId === npc.id && _pendingNav.target) || null);
  const set = (patch) => onUpdate(patch);
  // Consume the pending Session hand-off and keep listening for further ones.
  useEffect(() => {
    if (_pendingNav && _pendingNav.entityId === npc.id) _pendingNav = null;
    return onNav(p => {
      if (p.entityId !== npc.id) return;
      if (p.sheetTab) setTab(p.sheetTab);
      setCombatTarget(p.target || null);
    });
  }, [npc.id]);
  // Casters (archetype Caster/Mage, or an NPC with spellcasting enabled) get the
  // same Magic surface as players.
  const npcIsCaster = isCaster(npc) || ["Caster", "Mage"].includes(npc.archetype);
  const TABS = ["sheet", "stats", "features", "techniques", "combat", "forms", ...(npcIsCaster ? ["magic"] : []), "inventory"];
  const TAB_LABELS = { sheet: "Sheet", stats: "Stats", features: "Features", techniques: "Techniques", combat: "Combat", forms: "Forms", magic: "Magic", inventory: "Inventory" };
  const hasStamina = (npc.maxStamina || 0) > 0;
  const box = (title, node) => (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>{title}</div>
      {node}
    </div>
  );
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <TextInput value={npc.name} onChange={e => set({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm" variant={tab === "growth" ? "gold" : "default"} onClick={() => setTab(tab === "growth" ? "sheet" : "growth")}><TrendingUp size={13} /> Growth</Btn>
          <Btn size="sm" variant="danger" onClick={onRemove}><Trash2 size={13} /></Btn>
          <Btn size="sm" variant="ghost" onClick={onClose}><X size={15} /></Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {npc.tier && <Tag color={COLORS.purple}>{npc.tier}</Tag>}
        {npc.antagonistLevel > 1 && <Tag color={COLORS.dim}>Lv {npc.antagonistLevel}</Tag>}
        {npc.species && <Tag color={COLORS.blue}>{npc.species}</Tag>}
        {npc.archetype && <Tag color={COLORS.green}>{npc.archetype}</Tag>}
        {npc.role && <Tag color={COLORS.gold}>{npc.role}</Tag>}
      </div>
      {/* Always-visible vitals so HP/Ki track no matter which tab you're on */}
      <div style={{ display: "grid", gridTemplateColumns: hasStamina ? "1fr 1fr 1fr" : "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <Gauge label="HP" value={npc.hp} max={npc.maxHp} color={COLORS.red} />
        <Gauge label="Ki" value={npc.ki} max={npc.maxKi} color={COLORS.blue} />
        {hasStamina && <Gauge label="Stamina" value={npc.stamina} max={npc.maxStamina} color={COLORS.gold} />}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "sheet" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 12 }}>
            {[["ac", "AC"], ["dc", "DC"], ["attackBonus", "Atk Bonus"], ["saveBonus", "Save Bonus"], ["dr", "DR"]].map(([key, label]) => (
              <div key={key} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9.5, color: COLORS.muted, marginBottom: 2 }}>{label}</div>
                <TextInput type="number" value={npc[key] ?? 0} onChange={e => set({ [key]: +e.target.value })} style={{ textAlign: "center", border: "none", background: "transparent", fontWeight: 700, padding: 2 }} />
              </div>
            ))}
          </div>
          {npc.legendaryResistance?.max > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 11.5 }}>
              <span style={{ color: COLORS.red, fontWeight: 700 }}>Legendary Resistance</span>
              {Array.from({ length: npc.legendaryResistance.max }).map((_, i) => {
                const spent = i < (npc.legendaryResistance.used || 0);
                return <span key={i} onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, used: spent ? i : i + 1 } })} style={{ cursor: "pointer", width: 14, height: 14, borderRadius: "50%", border: `1px solid ${COLORS.red}`, background: spent ? "transparent" : COLORS.red }} title={spent ? "regain" : "spend"} />;
              })}
              <span style={{ color: COLORS.dim }}>{npc.legendaryResistance.max - (npc.legendaryResistance.used || 0)} left</span>
            </div>
          )}
          <BreakBarsPanel npc={npc} onUpdate={set} />
          <Field label="Hook"><TextInput value={npc.hook} onChange={e => set({ hook: e.target.value })} /></Field>
          <Field label="GM Notes"><TextArea value={npc.notes} onChange={e => set({ notes: e.target.value })} /></Field>
          <NpcStatReadout npc={npc} />
        </div>
      )}
      {tab === "stats" && <StatsTab char={npc} set={set} />}
      {tab === "features" && <NpcFeaturesTab npc={npc} />}
      {tab === "techniques" && <KnownTechniquesTab char={npc} set={set} />}
      {tab === "combat" && <CombatRefTab char={npc} set={set} combatTarget={combatTarget} onClearTarget={() => setCombatTarget(null)} />}
      {tab === "magic" && <MagicTab char={npc} set={set} />}
      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormsPlayTab char={npc} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}><ConditionsPanel char={npc} set={set} /></div>
        </div>
      )}
      {tab === "inventory" && <InventoryTab char={npc} set={set} />}
      {tab === "growth" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.dim }}>Build surface — the DM-only counterpart to a player's Growth. Everything set here shows on the running tabs.</div>
          {box("Stat Block, Traits & Feats", <EditableStatBlock npc={npc} onUpdate={set} />)}
          {box("Techniques", <KnownTechniquesTab char={npc} set={set} />)}
          {box("Forms", <FormsTab char={npc} set={set} />)}
        </div>
      )}
    </div>
  );
}

// Pre-made caster NPCs — ready-to-drop spellcasters, each with a full spellcasting
// block (schools / cantrips / spells / slots) so their Magic tab is stocked out of
// the box. Archetype Caster/Mage surfaces the Magic tab (see NpcSheet).
const _cn = (name) => ({ id: uid(), name });
const _sp = (name, level) => ({ id: uid(), name, level });
const _slots = (...pairs) => pairs.map(([level, n]) => ({ id: uid(), level, current: n, max: n }));
const PREMADE_CASTERS = [
  {
    name: "Namekian Dragon-Clan Mystic", species: "Namekian", archetype: "Mage", role: "Dragon Clan Healer", tier: "Elite",
    antagonistLevel: 9, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 12, dex: 13, con: 15, int: 14, wis: 18, cha: 12 },
    ac: 15, dc: 16, attackBonus: 4, saveBonus: 6, dr: 1, hp: 104, maxHp: 104, ki: 42, maxKi: 42, stamina: 4, maxStamina: 4,
    hook: "Guards an ancient Dragon Clan secret and mends the fallen.",
    traits: [{ name: "Regeneration", text: "Regains HP at the start of each turn unless it took Destruction damage." }, { name: "Dragon Clan Rites", text: "Can create a Dragon Ball-linked ward; healing spells restore extra HP equal to Ki Rank." }],
    spellcasting: { enabled: true, ability: "wis", maxSpellLevel: 5, schools: ["Abjuration", "Evocation", "Conjuration"],
      cantrips: [_cn("Guidance"), _cn("Sacred Flame"), _cn("Resistance")],
      spells: [_sp("Cure Wounds", 1), _sp("Bless", 1), _sp("Healing Word", 1), _sp("Spiritual Weapon", 2), _sp("Lesser Restoration", 2), _sp("Mass Healing Word", 3), _sp("Revivify", 3), _sp("Death Ward", 4), _sp("Mass Cure Wounds", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Majin Chaos Sorcerer", species: "Majin", archetype: "Caster", role: "Blaster", tier: "Elite",
    antagonistLevel: 10, kiRank: 3, prof: 4, hitDie: "d6",
    stats: { str: 14, dex: 14, con: 16, int: 12, wis: 11, cha: 18 },
    ac: 14, dc: 16, attackBonus: 4, saveBonus: 5, dr: 0, hp: 96, maxHp: 96, ki: 48, maxKi: 48, stamina: 4, maxStamina: 4,
    hook: "A giggling engine of destruction that reshapes anything it touches.",
    traits: [{ name: "Elastic Body", text: "Resistance to Bludgeoning; can stretch to double its reach once per turn." }, { name: "Absorb", text: "On a killing blow it may assimilate a victim, temporarily gaining one of their Techniques." }],
    spellcasting: { enabled: true, ability: "cha", maxSpellLevel: 5, schools: ["Evocation", "Conjuration", "Transmutation"],
      cantrips: [_cn("Fire Bolt"), _cn("Mage Hand"), _cn("Prestidigitation")],
      spells: [_sp("Magic Missile", 1), _sp("Shield", 1), _sp("Chromatic Orb", 1), _sp("Scorching Ray", 2), _sp("Misty Step", 2), _sp("Fireball", 3), _sp("Counterspell", 3), _sp("Polymorph", 4), _sp("Cone of Cold", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Demon Realm Occultist", species: "Demon Realm Denizen", archetype: "Caster", role: "Warlock", tier: "Elite",
    antagonistLevel: 9, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 12, dex: 15, con: 15, int: 13, wis: 12, cha: 18 },
    ac: 15, dc: 16, attackBonus: 6, saveBonus: 4, dr: 1, hp: 92, maxHp: 92, ki: 40, maxKi: 40, stamina: 3, maxStamina: 3,
    hook: "Bound by a pact to something older than the gods.",
    traits: [{ name: "Magic Resistance", text: "Advantage on saving throws against spells and magical effects." }, { name: "Dark Pact", text: "Once per fight, reroll a failed save by offering a sliver of its life force (lose HP equal to level)." }],
    spellcasting: { enabled: true, ability: "cha", maxSpellLevel: 5, schools: ["Necromancy", "Enchantment", "Illusion"],
      cantrips: [_cn("Eldritch Blast"), _cn("Chill Touch"), _cn("Minor Illusion")],
      spells: [_sp("Hex", 1), _sp("Hellish Rebuke", 1), _sp("Hold Person", 2), _sp("Darkness", 2), _sp("Fear", 3), _sp("Vampiric Touch", 3), _sp("Blight", 4), _sp("Dominate Person", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Grey Psi-Technomancer", species: "Grey", archetype: "Mage", role: "Controller", tier: "Elite",
    antagonistLevel: 8, kiRank: 2, prof: 3, hitDie: "d6",
    stats: { str: 8, dex: 14, con: 13, int: 18, wis: 14, cha: 12 },
    ac: 13, dc: 15, attackBonus: 3, saveBonus: 5, dr: 0, hp: 74, maxHp: 74, ki: 44, maxKi: 44, stamina: 3, maxStamina: 3,
    hook: "Studies the party like specimens on a slab.",
    traits: [{ name: "Telepathy", text: "Communicates telepathically within 120 ft; can read surface thoughts as a bonus action." }, { name: "Analytical Mind", text: "After a creature acts, it gains +2 to saves and AC against that creature until its next turn." }],
    spellcasting: { enabled: true, ability: "int", maxSpellLevel: 5, schools: ["Divination", "Enchantment", "Transmutation"],
      cantrips: [_cn("Mind Sliver"), _cn("Message"), _cn("Mage Hand")],
      spells: [_sp("Detect Thoughts", 2), _sp("Levitate", 2), _sp("Suggestion", 2), _sp("Hypnotic Pattern", 3), _sp("Dimension Door", 4), _sp("Telekinesis", 5), _sp("Dominate Person", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 1], [5, 1]), pools: [] },
  },
  {
    name: "Yardratian Astral Sage", species: "Yardratian", archetype: "Mage", role: "Utility / Teleporter", tier: "Elite",
    antagonistLevel: 10, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 11, dex: 16, con: 14, int: 15, wis: 18, cha: 13 },
    ac: 16, dc: 16, attackBonus: 4, saveBonus: 6, dr: 1, hp: 88, maxHp: 88, ki: 46, maxKi: 46, stamina: 4, maxStamina: 4,
    hook: "A master of Instant Transmission — impossible to pin down.",
    traits: [{ name: "Instant Transmission", text: "As a bonus action, teleport to any point it can sense a Ki signature (no range limit within the system)." }, { name: "Serene Mind", text: "Immune to the Frightened and Charmed conditions." }],
    spellcasting: { enabled: true, ability: "wis", maxSpellLevel: 5, schools: ["Conjuration", "Abjuration", "Divination"],
      cantrips: [_cn("Guidance"), _cn("Light"), _cn("Spare the Dying")],
      spells: [_sp("Sanctuary", 1), _sp("Shield of Faith", 1), _sp("Misty Step", 2), _sp("Blink", 3), _sp("Dimension Door", 4), _sp("Banishment", 4), _sp("Wall of Force", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
];

function PremadeCasterBrowser({ onPick }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
      {PREMADE_CASTERS.map((c, i) => (
        <div key={i} onClick={() => onPick({ ...c, id: uid() })} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
            <Tag color={COLORS.purple}>{c.tier}</Tag>
            <Tag color={COLORS.blue}>{c.species}</Tag>
            <Tag color={COLORS.green}>{c.archetype}</Tag>
          </div>
          <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.name}</div>
          <div style={{ fontSize: 10.5, color: COLORS.muted, marginBottom: 6 }}>Lv {c.antagonistLevel} · DC {c.dc} · {(c.spellcasting.spells || []).length} spells</div>
          <div style={{ fontSize: 11, color: COLORS.dim, lineHeight: 1.4 }}>{c.hook}</div>
        </div>
      ))}
    </div>
  );
}

function NpcTab() {
  const [npcs, persist, error] = useSharedList("npcs_v2");
  const [encounter, persistEncounter] = useSharedList("session_combat");
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState(null);
  const [baseline] = usePartyBaseline();
  // Open the NPC a Session hand-off points at (mirrors the players tab).
  useEffect(() => {
    const apply = (p) => { if (p && p.tab === "npcs" && p.entityId) { setMode(null); setOpenId(p.entityId); } };
    apply(_pendingNav);
    return onNav(apply);
  }, []);
  if (npcs === null || baseline === null) return <LoadingBlock />;

  // Bulk deploy — push chosen saved NPCs (×qty) into the Session initiative
  // tracker as combatants, rolling initiative (d20 + Dex mod) for each.
  const deployToBoard = (picks) => {
    const cur = (encounter && encounter[0]) || { round: 1, turn: 0, combatants: [] };
    const added = [];
    for (const { npc, qty } of picks) {
      for (let i = 0; i < qty; i++) {
        const dexMod = abilityMod(npc.stats?.dex ?? 10);
        added.push({
          ...blankCombatant(),
          name: qty > 1 ? `${npc.name} ${i + 1}` : npc.name,
          // Only 1-of deployments link back to the sheet; duplicates share an id
          // so we'd sync them onto each other — leave those unlinked.
          sourceType: qty === 1 ? "npc" : null, sourceId: qty === 1 ? npc.id : null,
          init: roll(20) + dexMod,
          hp: npc.hp ?? npc.maxHp ?? 20, maxHp: npc.maxHp ?? 20,
          ki: npc.ki ?? 0, maxKi: npc.maxKi ?? 0,
          stamina: npc.stamina ?? 0, maxStamina: npc.maxStamina ?? 0,
          dr: npc.dr ?? 0,
        });
      }
    }
    persistEncounter([{ ...cur, combatants: [...cur.combatants, ...added] }]);
    return added.length;
  };

  const addAndOpen = (n) => { persist([migrateNpc(n), ...npcs]); setOpenId(n.id); setMode(null); };
  const remove = (id) => { persist(npcs.filter(n => n.id !== id)); setOpenId(null); };
  const update = (id, patch) => persist(npcs.map(n => n.id === id ? { ...n, ...patch } : n));
  const open = npcs.find(n => n.id === openId);
  const openNpc = open ? migrateNpc(open) : null;

  const quickRoll = () => {
    const n = scaledNpc({ species: pick(NPC_POOLS.species), role: pick(NPC_POOLS.role), tierKey: pick(NPC_TIERS).key, fightTypeKey: pick(FIGHT_TYPES).key, baseline });
    addAndOpen(n);
  };
  if (mode === "book") return (
    <div><ScannerHeader title="FROM THE BOOK" subtitle="Roster of FighterZ — every antagonist, saga by saga" onBack={() => setMode(null)} />
      <BookAntagonistBrowser onPick={(b) => addAndOpen(npcFromBook(b))} /></div>
  );
  if (mode === "casters") return (
    <div><ScannerHeader title="PRE-MADE CASTERS" subtitle="Ready-to-run spellcasters — their Magic tab comes stocked" onBack={() => setMode("menu")} />
      <PremadeCasterBrowser onPick={addAndOpen} /></div>
  );
  if (mode === "guided") return (
    <div><ScannerHeader title="GUIDED NPC CREATION" subtitle="Threat → Identity → Build → Kit → Review (book Ch.1)" onBack={() => setMode(null)} />
      <GuidedNpcCreation onCreate={addAndOpen} onCancel={() => setMode(null)} /></div>
  );
  if (mode === "bulk") return (
    <div><ScannerHeader title="BULK DEPLOY" subtitle="Throw several saved enemies onto the board at once" onBack={() => setMode(null)} />
      <BulkDeploy npcs={npcs} onDeploy={(picks) => { const n = deployToBoard(picks); emitRoll({ label: "Bulk deploy", detail: `${n} combatant${n === 1 ? "" : "s"} added to the encounter` }); setMode(null); }} onCancel={() => setMode(null)} /></div>
  );

  return (
    <div>
      <ScannerHeader title="NPCS" subtitle="Instant statblocks for whoever just walked into the scene." />
      {!open && mode !== "guided" && mode !== "bulk" && <PartyBaselineEditor />}
      {error && <ErrorBanner text={error} />}
      {openNpc ? (
        <NpcSheet key={openNpc.id} npc={openNpc} onUpdate={(patch) => update(openNpc.id, patch)} onRemove={() => remove(openNpc.id)} onClose={() => setOpenId(null)} />
      ) : mode === "menu" ? (
        <div>
          <ModeCard title="From the Book" desc="Roster of FighterZ antagonists — Pilaf Gang to Perfect Cell." onClick={() => setMode("book")} />
          <ModeCard title="Pre-made Casters" desc="Ready-to-run spellcasters with a stocked Magic tab." onClick={() => setMode("casters")} />
          <ModeCard title="Pregenerated" desc="Quick roll — one click, fully randomized." onClick={quickRoll} />
          <ModeCard title="Empty" desc="Blank NPC opened straight into the full editable stat block." onClick={() => { const n = blankNpc({ _startEditing: true }); persist([n, ...npcs]); setOpenId(n.id); setMode(null); }} />
          <ModeCard title="Guided Creation" desc="Pick a threat level and the book builds the antagonist step by step." onClick={() => setMode("guided")} />
          <ModeCard title="Bulk" desc="Deploy several saved enemies onto the board at once." onClick={() => setMode("bulk")} />
          <Btn variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}><Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New NPC</Btn></div>
          {npcs.length === 0 ? (
            <EmptyState icon={Sparkles} title="No NPCs yet" body="Create one — pregen roll, blank sheet, guided wizard, or bulk generate." action={<Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New NPC</Btn>} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {npcs.map(n => (
                <div key={n.id} onClick={() => setOpenId(n.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ fontWeight: 700 }}>{n.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{[n.species,n.role,n.tier].filter(Boolean).join(" · ")}</div>
                  <Gauge label="HP" value={n.hp} max={n.maxHp} color={COLORS.red} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ============================== SESSION (Initiative / Rolls / Details) ============================== */
const blankCombatant = () => ({ id: uid(), name: "New Combatant", init: 10, hp: 20, maxHp: 20, ki: 0, maxKi: 0, stamina: 0, maxStamina: 0, dr: 0, conditions: [], deathSaves: { success: 0, fail: 0 }, exhaustion: 0, dead: false, sourceId: null, sourceType: null });
const miniBtnStyle = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.text, cursor: "pointer", padding: 2 };
const statStepBtn = { background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0, display: "flex", alignItems: "center" };

// Dying Condition (house rule from the DM Playbook) — replaces generic
// Unconscious at 0 HP. Rolls a death save, then lets the player spend an
// Action (3 Exhaustion), Bonus/Reaction (1 Exhaustion), or Movement (free)
// on their turn while still dying.
function DyingPanel({ c, onUpdate }) {
  const ds = c.deathSaves || { success: 0, fail: 0 };
  const rollSave = () => {
    const r = roll(20);
    if (r >= 10) {
      const success = ds.success + 1;
      if (success >= 3) onUpdate({ hp: 1, deathSaves: { success: 0, fail: 0 }, dead: false });
      else onUpdate({ deathSaves: { ...ds, success } });
    } else {
      const fail = ds.fail + 1;
      if (fail >= 3) onUpdate({ dead: true, deathSaves: { ...ds, fail } });
      else onUpdate({ deathSaves: { ...ds, fail } });
    }
  };
  const spend = (kind) => {
    const cost = kind === "action" ? 3 : kind === "movement" ? 0 : 1;
    onUpdate({ exhaustion: (c.exhaustion || 0) + cost });
  };
  if (c.dead) {
    return (
      <div style={{ gridColumn: "2 / 8", background: `${COLORS.red}12`, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: COLORS.red, fontWeight: 700, fontSize: 12.5 }}>DEAD — 3 failed death saves</span>
        <Btn size="sm" onClick={() => onUpdate({ dead: false, hp: 1, deathSaves: { success: 0, fail: 0 } })}>Revive to 1 HP</Btn>
      </div>
    );
  }
  return (
    <div style={{ gridColumn: "2 / 8", background: `${COLORS.gold}0C`, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: 10, marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12 }}>DYING — Death Saves</span>
        <Btn size="sm" variant="gold" onClick={rollSave}><Dices size={12}/> Roll Save</Btn>
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Success</span>
          {[0,1,2].map(i => <div key={i} onClick={() => onUpdate({ deathSaves: { ...ds, success: i+1 === ds.success ? i : i+1 } })} style={{ width: 14, height: 14, borderRadius: "50%", cursor: "pointer", border: `1.5px solid ${COLORS.green}`, background: i < ds.success ? COLORS.green : "transparent" }} />)}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Fail</span>
          {[0,1,2].map(i => <div key={i} onClick={() => onUpdate({ deathSaves: { ...ds, fail: i+1 === ds.fail ? i : i+1 } })} style={{ width: 14, height: 14, borderRadius: "50%", cursor: "pointer", border: `1.5px solid ${COLORS.red}`, background: i < ds.fail ? COLORS.red : "transparent" }} />)}
        </div>
        {c.exhaustion > 0 && <Tag color={COLORS.purple}>Exhaustion {c.exhaustion}</Tag>}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <Btn size="sm" onClick={() => spend("action")}>Action (+3 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("bonus")}>Bonus/Reaction (+1 Exh.)</Btn>
        <Btn size="sm" onClick={() => spend("movement")}>Movement (free)</Btn>
      </div>
    </div>
  );
}

function StatStepper({ label, value, max, color, onValue, onMax }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 2 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button onClick={() => onValue(Math.max(0, value - 1))} style={miniBtnStyle}><Minus size={13}/></button>
        <TextInput type="number" value={value} onChange={e => onValue(+e.target.value)} style={{ textAlign: "center", padding: "6px 2px", width: 48 }} />
        <span style={{ color: COLORS.dim, fontSize: 12 }}>/</span>
        <TextInput type="number" value={max} onChange={e => onMax(+e.target.value)} style={{ textAlign: "center", padding: "6px 2px", width: 48 }} />
        <button onClick={() => onValue(value + 1)} style={miniBtnStyle}><Plus size={13}/></button>
      </div>
      <div style={{ marginTop: 3 }}><Gauge label="" value={value} max={max||1} color={color} /></div>
    </div>
  );
}

// Shared activity feed — features spent, per-turn costs, etc. Written via
// logSession() from anywhere; rendered live in the Session tab.
function SessionFeed() {
  const [feed, persist] = useSharedList("session_feed");
  if (!feed || feed.length === 0) return null;
  return (
    <div style={{ marginTop: 16, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Activity</span>
        <Btn size="sm" variant="ghost" onClick={() => persist([])}>Clear</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {feed.slice(0, 10).map(e => (
          <div key={e.id} style={{ display: "flex", gap: 8, fontSize: 12.5, alignItems: "baseline" }}>
            <span style={{ color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, minWidth: 46 }}>{new Date(e.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <span style={{ color: COLORS.text }}>{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// The party's current Universe planet, surfaced during play (Slice 2c). Shows
// gravity, weather and star conditions so the environment is present in the fight.
function EnvironmentBanner() {
  const [universe] = useSharedList("universe");
  const [houseRules] = useHouseRules();
  const sreg = useRegistry("startraits");
  const galaxy = universe && universe[0];
  if (!galaxy || !galaxy.currentPlanetId) return null;
  const loc = (galaxy.systems || []).flatMap(s => (s.planets || []).map(p => ({ system: s, planet: p }))).find(x => x.planet.id === galaxy.currentPlanetId);
  if (!loc) return null;
  const { planet: p, system: sys } = loc;
  // Star traits come from the registry so edits, disables and customs reflect.
  const starConds = ((sys.star && sys.star.traits) || []).map(n => sreg.entries.find(e => e._id === n && e.enabled)).filter(Boolean);
  const live = houseRules.harshGalaxies;
  const grav = live && p.gravity != null ? envGravityEffect(p.gravity) : null;
  return (
    <div style={{ background: live ? `${COLORS.gold}0E` : COLORS.panel, border: `1px solid ${live ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 10, padding: "9px 14px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <MapPin size={15} color={COLORS.gold} />
        <span style={{ fontSize: 13.5 }}><b>{p.name}</b> <span style={{ color: COLORS.dim }}>· {(sys.name || "").replace(/ System$/, "")} System</span></span>
        {p.gravity != null && <Tag color={gravityColor(p.gravity)}>{p.gravity}g · {gravityBand(p.gravity)}</Tag>}
        {p.weather && <Tag color={COLORS.blue}>{p.weather}</Tag>}
        {starConds.map((t, i) => <Tag key={i} color={COLORS.amber} title={t._desc}>★ {t.env || t._name}{(t.effect.hooks || []).length ? " ⚙" : ""}</Tag>)}
        <div style={{ flex: 1 }} />
        <Tag color={live ? COLORS.gold : COLORS.dim}>{live ? "Harsh Galaxies · in effect" : "Flavor only"}</Tag>
      </div>
      {grav && grav.ranks !== 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
          <Weight size={13} color={grav.color} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Everyone on this world:</span>
          <span style={{ fontSize: 12.5, color: grav.color, fontWeight: 700 }}>{grav.label}</span>
          <span style={{ fontSize: 11, color: COLORS.dim }}>· offset by gravity acclimation</span>
        </div>
      )}
      {live && envEffectSummary().length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          <Zap size={13} color={COLORS.green} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Active effects:</span>
          {envEffectSummary().map((s, i) => <Tag key={i} color={COLORS.green}>{s}</Tag>)}
        </div>
      )}
    </div>
  );
}

// Environmental hazards that go live under Harsh Galaxies. Each is an hourly
// survival save; failure costs a level of Exhaustion. Extensible as more get
// added. (No dashes in any copy, per table style.)
// Preset battlefield terrains for the Environment tab. A dropdown, never a
// free-text box — the table picks a scene, it doesn't type one.
const TERRAIN_PRESETS = [
  { id: "open", name: "Open Field", note: "Clear ground. Full movement and line of sight for everyone." },
  { id: "urban", name: "Urban / Ruins", note: "Cover everywhere, broken sightlines, chokepoints to hold." },
  { id: "forest", name: "Forest", note: "Lightly obscured at range. Difficult terrain off the trails." },
  { id: "mountain", name: "Mountain / Cliffs", note: "Steep elevation. Climbing and falling both come into play." },
  { id: "desert", name: "Desert", note: "Loose sand is difficult terrain. Glare cuts long sightlines." },
  { id: "arctic", name: "Arctic / Ice", note: "Slippery footing. DEX checks to keep balance on a hard rush." },
  { id: "aquatic", name: "Aquatic", note: "Swimming rules. Ranged shots and open flame falter underwater." },
  { id: "volcanic", name: "Volcanic", note: "Lava and ash. Footing can collapse near the flows." },
  { id: "space", name: "Space / Zero-G", note: "No footing. Movement floats free in every direction." },
  { id: "interior", name: "Interior / Ship", note: "Tight corridors. Cramped, hard to spread the party out." },
];
const terrainPreset = (id) => TERRAIN_PRESETS.find(t => t.id === id) || null;

// Does a planet's weather string trip a hazard's trigger keywords? Keywords live
// on each hazard entry (`weatherMatch`), so the DM can retune the mapping in
// World & Rules. Overlaps are fine: a monsoon is both wind and rain.
const weatherMatchesEntry = (weather, match) => {
  if (!weather || !match) return false;
  const w = String(weather).toLowerCase();
  return String(match).split(/[,\n]/).map(s => s.trim()).filter(Boolean).some(k => w.includes(k.toLowerCase()));
};

// Normalize a registry hazard entry into one shape the panel renders and rolls
// from. Book entries carry legacy fields; custom entries express the same
// mechanics through effect hooks (a saveHazard hook = a survival save, an
// effectCondition hook = battlefield effects).
const normHazard = (e) => {
  const hooks = (e.effect && e.effect.hooks) || [];
  const saveHook = hooks.find(h => h.type === "saveHazard");
  const effHook = hooks.find(h => h.type === "effectCondition");
  return {
    id: e._id, name: e._name, cond: (e.cond || e._desc || "").replace(/\.\s*$/, ""),
    isSave: e.type === "save" || !!saveHook,
    ability: e.ability || (saveHook && saveHook.ability) || "con",
    baseDC: e.baseDC != null ? e.baseDC : (saveHook && saveHook.baseDC != null ? saveHook.baseDC : 10),
    perHour: e.perHour != null ? e.perHour : (saveHook && saveHook.perHour != null ? saveHook.perHour : 0),
    fail: e.fail || (saveHook && saveHook.onFail) || "1 level of Exhaustion",
    mods: e.mods || "",
    effects: (e.effects && e.effects.length ? e.effects : (effHook && effHook.effects) || []).filter(Boolean),
    weatherMatch: e.weatherMatch || "",
    hooks,
  };
};

const ENV_HAZARDS = [
  { id: "heat", name: "Extreme Heat", type: "save", cond: "Temperatures over 100°F without water", ability: "con", baseDC: 5, perHour: 1, fail: "1 level of Exhaustion", mods: "Disadvantage in heavy or medium armor or clothing; fire resistant or adapted creatures are immune", weatherMatch: "heat, scorch, mirage, firestorm, ashfall, lava, molten, solar flare, humid" },
  { id: "cold", name: "Extreme Cold", type: "save", cond: "Temperatures at or below 0°F", ability: "con", baseDC: 10, perHour: 0, fail: "1 level of Exhaustion", mods: "Automatic success with cold weather gear, resistance or immunity to cold, or natural adaptation", weatherMatch: "snow, frost, blizzard, freeze, whiteout, sleet, ice, deep freeze, killing cold, chill" },
  { id: "wind", name: "Strong Wind", type: "effect", cond: "Powerful gusts sweep the field", effects: ["Disadvantage on ranged weapon attack rolls", "Open flames go out and fog disperses", "A flying creature must land at the end of its turn or fall", "A desert sandstorm also gives Disadvantage on Wisdom (Perception)"], weatherMatch: "wind, gale, typhoon, squall, sandstorm, cyclone, tornado, storm, monsoon" },
  { id: "precip", name: "Heavy Precipitation", type: "effect", cond: "Heavy rain or heavy snowfall", effects: ["The area is Lightly Obscured", "Disadvantage on all Wisdom (Perception) checks", "Heavy rain also puts out open flames"], weatherMatch: "rain, drizzle, snowfall, sleet, monsoon, shower" },
];

// The survival saves and battlefield effects the current world forces on the
// party. Preset conditions only — the current planet's weather switches them on
// automatically, and the DM tops up from a dropdown. No free-text authoring.
function HazardsPanel() {
  const [houseRules] = useHouseRules();
  const [chars, persistChars] = useSharedList("characters_v2");
  const [envState, persistEnv] = useSharedList("session_env");
  const [universe] = useSharedList("universe");
  const [ui, setUi] = useLocalOption("sdndbz_hazards_ui", { collapsed: false });
  const reg = useRegistry("hazards");
  if (!houseRules.harshGalaxies || chars === null || reg.loading) return null;
  const env = (envState && envState[0]) || { active: {}, hours: 0 };
  const active = env.active || {};
  const hours = env.hours || 0;
  const party = (chars || []).filter(c => !c.archived);
  // Hazards now come from the World & Rules registry: disabled ones drop out,
  // edits show through, and custom hazards appear here automatically.
  const hazards = reg.entries.filter(e => e.enabled).map(normHazard);
  // Weather on the party's current world auto-selects the matching conditions.
  const galaxy = universe && universe[0];
  const curPlanet = galaxy && galaxy.currentPlanetId ? (galaxy.systems || []).flatMap(s => s.planets || []).find(p => p.id === galaxy.currentPlanetId) : null;
  const autoIds = curPlanet ? hazards.filter(h => weatherMatchesEntry(curPlanet.weather, h.weatherMatch)).map(h => h.id) : [];
  const isAuto = (id) => autoIds.includes(id);
  const isOn = (h) => isAuto(h.id) || !!active[h.id];
  const dcFor = (h) => (h.baseDC || 0) + hours * (h.perHour || 0);
  const otherHooks = (h) => (h.hooks || []).filter(hk => hk.type !== "saveHazard" && hk.type !== "effectCondition");
  // Auto (planet-driven) conditions are locked on. The DM can only toggle the
  // manual ones they added from the dropdown.
  const toggleManual = (id) => { if (isAuto(id)) return; persistEnv([{ ...env, active: { ...active, [id]: !active[id] } }]); };
  const addManual = (id) => { if (!id) return; persistEnv([{ ...env, active: { ...active, [id]: true } }]); };
  const activeSaves = hazards.filter(h => isOn(h) && h.isSave);
  const activeCount = hazards.filter(isOn).length;
  const addable = hazards.filter(h => !isOn(h));
  const advanceHour = () => {
    if (!activeSaves.length || !party.length) return;
    let updated = chars;
    for (const hz of activeSaves) {
      const dc = dcFor(hz);
      const results = [];
      for (const c of party) {
        const passed = roll(20) + computeSaveBonus(c, hz.ability) + envFlatMod("saves") >= dc;
        results.push(`${c.name} ${passed ? "passed" : "FAILED"}`);
        if (!passed) updated = updated.map(x => x.id === c.id ? { ...x, vitals: { ...(x.vitals || {}), exhaustion: Math.min(6, ((x.vitals && x.vitals.exhaustion) || 0) + 1) } } : x);
      }
      logSession(`${hz.name} (${hz.ability.toUpperCase()} save DC ${dc}): ${results.join(" · ")}`);
    }
    if (persistChars && updated !== chars) persistChars(updated);
    persistEnv([{ ...env, hours: hours + 1 }]);
  };
  const collapsed = ui.collapsed;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: collapsed ? "9px 14px" : 14, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setUi({ collapsed: !collapsed })}>
        <Flame size={14} color={COLORS.amber} />
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Environmental Hazards</span>
        {activeCount > 0 && <Tag color={COLORS.amber}>{activeCount} active</Tag>}
        <span style={{ fontSize: 11, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>Hour {hours}</span>
        <div style={{ flex: 1 }} />
        {collapsed ? <ChevronDown size={16} color={COLORS.muted}/> : <ChevronUp size={16} color={COLORS.muted}/>}
      </div>
      {!collapsed && (<>
        {curPlanet && (
          <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 8 }}>
            {autoIds.length ? <>Set automatically from <b style={{ color: COLORS.blue }}>{curPlanet.name}</b>: {curPlanet.weather}.</> : <>No weather hazard on <b style={{ color: COLORS.text }}>{curPlanet.name}</b> ({curPlanet.weather}). Add one below if the scene calls for it.</>}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8, marginTop: 12 }}>
          {hazards.filter(isOn).map(hz => { const auto = isAuto(hz.id); const extra = otherHooks(hz); return (
            <div key={hz.id} style={{ background: `${COLORS.amber}12`, border: `1px solid ${COLORS.amber}77`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Check size={13} color={COLORS.amber}/>
                <span style={{ fontWeight: 700, fontSize: 12.5 }}>{hz.name}</span>
                {hz.isSave ? <Tag color={COLORS.amber}>{hz.ability.toUpperCase()} save DC {dcFor(hz)}</Tag> : <Tag color={COLORS.blue}>In effect</Tag>}
                {auto ? <Tag color={COLORS.blue}>Auto · weather</Tag> : <X size={13} color={COLORS.red} style={{ marginLeft: "auto", cursor: "pointer" }} title="Remove" onClick={() => toggleManual(hz.id)} />}
              </div>
              {hz.cond && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 5 }}>{hz.cond}.{hz.isSave ? ` Fail: ${hz.fail}.` : ""}</div>}
              {hz.mods && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 3 }}>{hz.mods}</div>}
              {hz.effects.length > 0 && <ul style={{ margin: "5px 0 0", paddingLeft: 16, fontSize: 10.5, color: COLORS.dim, lineHeight: 1.5 }}>{hz.effects.map((e, i) => <li key={i}>{e}</li>)}</ul>}
              {extra.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>{extra.map((hk, i) => <Tag key={i} color={(hookType(hk.type) || {}).color || COLORS.green}>{hookSummary(hk)}</Tag>)}</div>}
            </div>
          ); })}
          {!activeCount && <div style={{ fontSize: 12, color: COLORS.dim }}>No conditions in effect.</div>}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
          {activeSaves.length > 0 && <Btn variant="gold" disabled={!party.length} onClick={advanceHour}><Dices size={14}/> Advance 1 Hour · roll party saves</Btn>}
          {hours > 0 && <Btn size="sm" variant="ghost" onClick={() => persistEnv([{ ...env, hours: 0 }])}>Reset hours</Btn>}
          <div style={{ flex: 1 }} />
          {addable.length > 0 && (
            <Select value="" onChange={e => addManual(e.target.value)} style={{ width: 200 }} title="Add a preset condition">
              <option value="">Add a condition…</option>
              {addable.map(hz => <option key={hz.id} value={hz.id}>{hz.name}</option>)}
            </Select>
          )}
        </div>
      </>)}
    </div>
  );
}

function InitiativeTab() {
  const [state, persist, error] = useSharedList("session_combat");
  const data = state && state[0] ? state[0] : { round: 1, turn: 0, combatants: [] };
  const [newName, setNewName] = useState("");
  const [tagInputs, setTagInputs] = useState({});
  const [tagRounds, setTagRounds] = useState({});   // optional round timer per condition
  const [chars, persistChars] = useSharedList("characters_v2");
  const [npcs, persistNpcs] = useSharedList("npcs_v2");
  const [timeState, persistTime] = useSharedList("session_time");
  const [picker, setPicker] = useState(null);   // "players" | "npcs" | null
  const [sel, setSel] = useState({});            // id -> true, staged in the picker
  const [atkId, setAtkId] = useState("");        // armed attacker (click a row to target)
  // Per-device view. Players see teammate resources but not enemy (NPC) ones;
  // the DM sees everything and can reveal specific enemies.
  const [sessionView, setSessionView] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const isDM = sessionView.mode === "dm";
  useEffect(() => {
    if (!atkId) return;
    const onKey = (e) => { if (e.key === "Escape") setAtkId(""); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [atkId]);
  if (state === null) return <LoadingBlock />;
  const save = (patch) => persist([{ ...data, ...patch }]);
  const sorted = [...data.combatants].sort((a,b) => b.init - a.init);
  const activeId = sorted[data.turn % Math.max(sorted.length,1)]?.id;
  const addCombatant = () => { save({ combatants: [...data.combatants, { ...blankCombatant(), name: newName || "New Combatant" }] }); setNewName(""); };

  // The live source sheet behind a linked combatant (Slice 1b). Its pools are
  // the source of truth: linked rows display these and edits write back to them.
  const sourceOf = (c) => {
    if (!c || !c.sourceId) return null;
    const list = c.sourceType === "player" ? (chars || []) : (npcs || []);
    return list.find(e => e.id === c.sourceId) || null;
  };
  const POOL_FIELDS = ["hp", "maxHp", "ki", "maxKi", "stamina", "maxStamina"];
  const updateCombatant = (id, patch) => {
    save({ combatants: data.combatants.map(c => c.id===id?{...c,...patch}:c) });
    // Write pool changes through to the linked sheet so damage/Ki stays in step.
    const c = data.combatants.find(x => x.id === id);
    if (!c || !c.sourceId) return;
    const pool = {};
    for (const k of POOL_FIELDS) if (k in patch) pool[k] = patch[k];
    if (!Object.keys(pool).length) return;
    if (c.sourceType === "player" && chars && persistChars) persistChars(chars.map(e => e.id===c.sourceId ? { ...e, ...pool } : e));
    else if (c.sourceType === "npc" && npcs && persistNpcs) persistNpcs(npcs.map(e => e.id===c.sourceId ? { ...e, ...pool } : e));
  };
  const removeCombatant = (id) => save({ combatants: data.combatants.filter(c => c.id !== id) });

  // --- Targeting: hand off to the fighter's own sheet (Slice 1c) ------------
  // The acting fighter jumps to their Combat tab to roll their real attack. The
  // target's AC rides along silently so the sheet can show HIT/MISS without ever
  // revealing the number. Combat profile only needs the defender's AC here.
  const combatProfile = (c) => {
    const src = sourceOf(c);
    if (c?.sourceType === "player" && src) {
      const ac = (computeAC(src)?.value) ?? src.ac ?? 10;
      return { ac };
    }
    if (c?.sourceType === "npc" && src) return { ac: src.ac ?? 10 };
    return { ac: 10 };
  };
  const attacker = data.combatants.find(c => c.id === atkId) || null;
  // Linked players AND NPCs have a sheet to roll from. Their sheet lives on a
  // different top-nav tab and names its "features" surface differently.
  const canAct = (c) => !!(c && c.sourceId && (c.sourceType === "player" || c.sourceType === "npc"));
  const navTabFor = (c) => c.sourceType === "npc" ? "npcs" : "players";
  const featureTabFor = (c) => c.sourceType === "npc" ? "features" : "growth";
  const isCasterC = (c) => { const s = sourceOf(c); return !!(s && (isCaster(s) || ["Caster", "Mage"].includes(s.archetype))); };
  const handOff = (tgt) => {
    if (!attacker || !tgt || attacker.id === tgt.id || !canAct(attacker)) { setAtkId(""); return; }
    const tp = combatProfile(tgt);
    emitNav({ tab: navTabFor(attacker), entityId: attacker.sourceId, sheetTab: "combat", target: { id: tgt.id, name: tgt.name, ac: tp.ac } });
    setAtkId("");
  };
  const goToSheet = (c, sheetTab) => { if (canAct(c)) emitNav({ tab: navTabFor(c), entityId: c.sourceId, sheetTab, target: null }); };
  const armAttacker = (id) => setAtkId(id);

  // --- Per-turn costs (Slice 2a) -------------------------------------------
  // When a fighter's turn comes up they pay for staying powered: active-form Ki
  // upkeep, plus Overload self-damage (Overload is a cost, not a power cap).
  // Computed from the linked player sheet; deductions sync back to it + log.
  const rollDestruction = (s) => {
    const m = String(s).match(/(\d*)d(\d+)([+-]\d+)?/i);
    if (m) { let t = 0; const cnt = +(m[1] || 1); for (let i = 0; i < cnt; i++) t += roll(+m[2]); return t + (+(m[3] || 0)); }
    const flat = String(s).match(/^\s*(\d+)/); return flat ? +flat[1] : 0;
  };
  const nextTurn = () => {
    const n = data.turn + 1;
    const wrap = n >= sorted.length;
    const newTurn = wrap ? 0 : n;
    const newRound = wrap ? data.round + 1 : data.round;
    let combatants = data.combatants;

    // A completed round is 6 seconds of in world time (10 rounds = 1 minute).
    if (wrap && persistTime) persistTime([advanceTime(readTime(timeState), 6)]);

    // Round tick (Slice 2b) — timed conditions count down and expire.
    if (wrap) {
      const expired = [];
      combatants = combatants.map(c => {
        if (!c.conditions || !c.conditions.length) return c;
        const next = [];
        for (const raw of c.conditions) {
          const cd = typeof raw === "string" ? { text: raw, rounds: null } : raw;
          if (cd.rounds != null) {
            const rr = cd.rounds - 1;
            if (rr <= 0) { expired.push(`${c.name}: ${cd.text}`); continue; }
            next.push({ ...cd, rounds: rr });
          } else next.push(cd);
        }
        return { ...c, conditions: next };
      });
      if (expired.length) logSession(`Expired — ${expired.join(" · ")}`);
    }

    // Per-turn costs (Slice 2a) on the newly-active fighter — players AND NPCs.
    const nowActive = sorted[newTurn];
    const src = nowActive ? sourceOf(nowActive) : null;
    if (src) {
      let upkeep = 0, hpLost = 0, envDmg = 0;
      try { upkeep = activeFormUpkeep(src) || 0; } catch { /* no forms */ }
      try { const ov = computeOverload(src); hpLost = ov.over > 0 && ov.damage ? rollDestruction(ov.damage) : 0; } catch { /* no overload model */ }
      // Environmental effect hooks (Harsh Galaxies): a Ki field scales form upkeep,
      // and damage-per-turn hazards (poison, radiation) chip HP each turn.
      if (CURRENT_HOUSE_RULES.harshGalaxies) {
        if (upkeep > 0) upkeep = Math.round(upkeep * envKiCostMult());
        for (const f of envDmgPerTurn()) envDmg += rollDestruction(f);
      }
      const hpDrain = hpLost + envDmg;
      if (upkeep > 0 || hpDrain > 0) {
        const newKi = Math.max(0, (src.ki || 0) - upkeep);
        const newHp = Math.max(0, (src.hp || 0) - hpDrain);
        if (nowActive.sourceType === "player" && chars && persistChars) persistChars(chars.map(e => e.id === src.id ? { ...e, ki: newKi, hp: newHp } : e));
        else if (nowActive.sourceType === "npc" && npcs && persistNpcs) persistNpcs(npcs.map(e => e.id === src.id ? { ...e, ki: newKi, hp: newHp } : e));
        combatants = combatants.map(c => c.id === nowActive.id ? { ...c, ki: newKi, hp: newHp } : c);
        const notes = [];
        if (upkeep > 0) notes.push(`−${upkeep} Ki upkeep`);
        if (hpLost > 0) notes.push(`−${hpLost} HP overload`);
        if (envDmg > 0) notes.push(`−${envDmg} HP environment`);
        logSession(`${nowActive.name} start of turn: ${notes.join(" · ")}`, nowActive.name);
      }
    }
    save({ turn: newTurn, round: newRound, combatants });
  };
  const resetCombat = () => save({ round: 1, turn: 0, combatants: [] });

  // --- Pull real fighters into the tracker (Slice 1a) -----------------------
  // Combatants carry sourceId/sourceType so their pools can sync back to the
  // sheet later. Stats mirror what the sheet computes: DR = armor + power,
  // initiative = d20 + Dex mod.
  const linkedIds = new Set(data.combatants.map(c => c.sourceId).filter(Boolean));
  const combatantFromChar = (c) => ({
    ...blankCombatant(), name: c.name, sourceId: c.id, sourceType: "player",
    init: roll(20) + statMod(c, "dex"),
    hp: c.hp ?? c.maxHp ?? 20, maxHp: c.maxHp ?? 20,
    ki: c.ki ?? 0, maxKi: c.maxKi ?? 0,
    stamina: c.stamina ?? 0, maxStamina: c.maxStamina ?? 0,
    dr: (c.drOverride === true ? (c.dr || 0) : computeArmorDR(c)) + powerDR(c),
  });
  const combatantFromNpc = (n) => ({
    ...blankCombatant(), name: n.name, sourceId: n.id, sourceType: "npc",
    init: roll(20) + abilityMod(n.stats?.dex ?? 10),
    hp: n.hp ?? n.maxHp ?? 20, maxHp: n.maxHp ?? 20,
    ki: n.ki ?? 0, maxKi: n.maxKi ?? 0,
    stamina: n.stamina ?? 0, maxStamina: n.maxStamina ?? 0,
    dr: n.dr ?? 0,
  });
  const openPicker = (which) => { setPicker(which); setSel({}); };
  const pickerList = picker === "players" ? (chars || []) : picker === "npcs" ? (npcs || []) : [];
  const commitPicker = () => {
    const maker = picker === "players" ? combatantFromChar : combatantFromNpc;
    const chosen = pickerList.filter(e => sel[e.id]).map(maker);
    if (chosen.length) save({ combatants: [...data.combatants, ...chosen] });
    setPicker(null); setSel({});
  };

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <TextInput placeholder="Combatant name..." value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key==="Enter" && addCombatant()} style={{ maxWidth: 200 }} />
        <Btn variant="gold" onClick={addCombatant}><Plus size={14}/> Add</Btn>
        <Btn onClick={() => openPicker("players")}><Users size={14}/> Add Players</Btn>
        <Btn onClick={() => openPicker("npcs")}><Skull size={14}/> Add NPCs</Btn>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${COLORS.border}`, alignSelf: "center" }} title="Player view hides enemy resources; DM view shows everything">
          {[["dm", "DM", Eye], ["player", "Player", EyeOff]].map(([m, l, Ico]) => (
            <button key={m} onClick={() => setSessionView({ mode: m })} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", background: sessionView.mode === m ? (m === "dm" ? `${COLORS.gold}22` : `${COLORS.blue}22`) : "transparent", color: sessionView.mode === m ? (m === "dm" ? COLORS.gold : COLORS.blue) : COLORS.muted }}><Ico size={13}/> {l}</button>
          ))}
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12.5, alignSelf: "center", fontFamily: "JetBrains Mono, monospace" }}>Round {data.round}</div>
        <Btn variant="blue" onClick={nextTurn}><ChevronRight size={14}/> Next Turn</Btn>
        <ConfirmBtn variant="danger" size="md" confirmTitle="Clear the whole encounter" onConfirm={resetCombat}><RotateCcw size={14}/> Reset</ConfirmBtn>
      </div>
      {picker && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Add {picker === "players" ? "Players" : "NPCs"} to the encounter</span>
            <Btn size="sm" variant="ghost" onClick={() => { setPicker(null); setSel({}); }}><X size={14}/></Btn>
          </div>
          {(picker === "players" ? chars : npcs) === null ? <LoadingBlock /> : pickerList.length === 0 ? (
            <div style={{ color: COLORS.dim, fontSize: 12.5 }}>No {picker === "players" ? "characters" : "NPCs"} saved yet.</div>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pickerList.map(e => {
                  const on = !!sel[e.id];
                  const already = linkedIds.has(e.id);
                  return (
                    <button key={e.id} onClick={() => setSel(s => ({ ...s, [e.id]: !s[e.id] }))} title={already ? "Already linked in the tracker — adding makes a second copy" : ""}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: on ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${on ? COLORS.gold : COLORS.border}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", color: COLORS.text, fontSize: 12.5 }}>
                      {on ? <Check size={13} color={COLORS.gold}/> : <Plus size={13} color={COLORS.dim}/>}
                      <span style={{ fontWeight: 600 }}>{e.name}</span>
                      <span style={{ color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{e.hp ?? e.maxHp ?? 0}/{e.maxHp ?? 0} HP</span>
                      {already && <span style={{ color: COLORS.blue, fontSize: 10 }}>linked</span>}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn variant="gold" onClick={commitPicker} disabled={Object.values(sel).every(v => !v)}><Plus size={14}/> Add {Object.values(sel).filter(Boolean).length || ""} to encounter</Btn>
              </div>
            </>
          )}
        </div>
      )}
      {attacker && (
        <div style={{ background: `${COLORS.gold}12`, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Crosshair size={16} color={COLORS.gold} />
          <span style={{ fontSize: 13.5 }}><b style={{ color: COLORS.gold }}>{attacker.name}</b> is attacking — click a target to roll on their sheet</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={() => setAtkId("")}><X size={13} /> Cancel</Btn>
        </div>
      )}
      {sorted.length === 0 ? (
        <EmptyState icon={Swords} title="No combatants" body="Add everyone rolling initiative." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map(c => {
            const active = c.id === activeId;
            // Linked rows read their pools live from the source sheet; overload
            // is a player-only readout (needs the character's Forms/Power).
            const src = sourceOf(c);
            const view = src ? { ...c, hp: src.hp, maxHp: src.maxHp, ki: src.ki, maxKi: src.maxKi, stamina: src.stamina, maxStamina: src.maxStamina } : c;
            const ov = (c.sourceType === "player" && src) ? computeOverload(src) : null;
            const linkLost = c.sourceId && !src && (c.sourceType === "player" ? chars : npcs) !== null;
            const isAttacker = atkId === c.id;
            const isTargetable = !!atkId && !isAttacker;
            // Players see teammates but not enemy (NPC) pools unless the DM reveals them.
            const concealed = !isDM && c.sourceType !== "player" && !c.revealed;
            return (
              <div key={c.id} style={{ position: "relative", background: isAttacker ? `${COLORS.gold}18` : active ? `${COLORS.gold}10` : COLORS.panel, border: `1px solid ${isAttacker ? COLORS.gold : active?COLORS.gold+"88":COLORS.border}`, borderRadius: 10, padding: 12, display: "grid", gridTemplateColumns: "18px 118px 48px minmax(150px,1fr) minmax(150px,1fr) minmax(150px,1fr) 48px auto", gap: 8, alignItems: "center" }}>
                <div style={{ color: active?COLORS.gold:COLORS.dim }}>{active ? <Radio size={13}/> : ""}</div>
                <TextInput value={c.name} onChange={e => updateCombatant(c.id, { name: e.target.value })} style={{ fontWeight: 700 }} />
                <TextInput type="number" value={c.init} onChange={e => updateCombatant(c.id, { init: +e.target.value })} style={{ textAlign: "center" }} />
                {concealed ? (
                  <div style={{ gridColumn: "4 / 8", display: "flex", alignItems: "center", gap: 8, color: COLORS.dim, fontSize: 12.5 }}>
                    <EyeOff size={15} /> <span>Enemy — resources hidden</span>
                  </div>
                ) : (<>
                  <StatStepper label="HP" value={view.hp} max={view.maxHp} color={COLORS.red} onValue={v => updateCombatant(c.id, { hp: v })} onMax={v => updateCombatant(c.id, { maxHp: v })} />
                  <StatStepper label="Ki" value={view.ki} max={view.maxKi} color={COLORS.blue} onValue={v => updateCombatant(c.id, { ki: v })} onMax={v => updateCombatant(c.id, { maxKi: v })} />
                  <StatStepper label="Stam" value={view.stamina} max={view.maxStamina} color={COLORS.gold} onValue={v => updateCombatant(c.id, { stamina: v })} onMax={v => updateCombatant(c.id, { maxStamina: v })} />
                  <TextInput type="number" value={c.dr} onChange={e => updateCombatant(c.id, { dr: +e.target.value })} title="DR" style={{ textAlign: "center" }} />
                </>)}
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 3, justifyContent: "end", justifyItems: "center", alignItems: "center" }}>
                  {isDM && c.sourceType !== "player" && (
                    <Btn size="sm" variant="ghost" title={c.revealed ? "Hide resources from players" : "Reveal resources to players"} onClick={() => updateCombatant(c.id, { revealed: !c.revealed })}>{c.revealed ? <Eye size={14} color={COLORS.green}/> : <EyeOff size={14} color={COLORS.dim}/>}</Btn>
                  )}
                  {canAct(c) && (c.sourceType === "player" || isDM) && (isAttacker
                    ? <Btn size="sm" variant="ghost" title="Cancel (Esc)" onClick={() => setAtkId("")}><X size={14} color={COLORS.gold}/></Btn>
                    : <>
                        <Btn size="sm" variant="ghost" title="Target — pick an enemy, then roll a weapon or technique on the Combat tab" onClick={() => armAttacker(c.id)}><Crosshair size={14} color={COLORS.blue}/></Btn>
                        <Btn size="sm" variant="ghost" title="Use a Feature" onClick={() => goToSheet(c, featureTabFor(c))}><Sparkles size={14} color={COLORS.amber}/></Btn>
                        {(() => { const caster = isCasterC(c); return (
                          <Btn size="sm" variant="ghost" disabled={!caster} title={caster ? "Cast a spell" : "No spellcasting — not a caster"} onClick={() => caster && goToSheet(c, "magic")} style={{ opacity: caster ? 1 : 0.4, cursor: caster ? "pointer" : "not-allowed" }}><Wand2 size={14} color={caster ? COLORS.purple : COLORS.dim}/></Btn>
                        ); })()}
                      </>)}
                  <Btn size="sm" variant="ghost" onClick={() => removeCombatant(c.id)}><Trash2 size={13} color={COLORS.red}/></Btn>
                </div>
                <div style={{ gridColumn: "2 / 8", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
                  {c.sourceId && !linkLost && <Tag color={c.sourceType === "player" ? COLORS.blue : COLORS.dim}>{c.sourceType === "player" ? "Linked · syncs to sheet" : "Linked NPC"}</Tag>}
                  {linkLost && <Tag color={COLORS.dim}>source removed</Tag>}
                  {ov && ov.over > 0 && <Tag color={COLORS.amber}>⚠ Overload +{ov.over} · {ov.damage} dmg/turn</Tag>}
                  {c.conditions.map((cond,i) => { const cd = typeof cond === "string" ? { text: cond, rounds: null } : cond; return (
                    <Tag key={i} color={cd.rounds != null ? COLORS.amber : COLORS.purple} onRemove={() => updateCombatant(c.id, { conditions: c.conditions.filter((_,j) => j!==i) })}>{cd.text}{cd.rounds != null ? ` · ${cd.rounds}r` : ""}</Tag>
                  ); })}
                  {(() => { const addCond = () => { const text = (tagInputs[c.id]||"").trim(); if (!text) return; const r = tagRounds[c.id] ? Number(tagRounds[c.id]) : null; updateCombatant(c.id, { conditions: [...c.conditions, { text, rounds: r }] }); setTagInputs(t => ({...t,[c.id]:""})); setTagRounds(t => ({...t,[c.id]:""})); }; return (<>
                    <input placeholder="+ condition" value={tagInputs[c.id]||""} onChange={e => setTagInputs(t => ({...t,[c.id]:e.target.value}))} onKeyDown={e => e.key==="Enter" && addCond()}
                      style={{ background: "transparent", border: "none", outline: "none", color: COLORS.muted, fontSize: 11.5, width: 80 }} />
                    <input type="number" placeholder="rds" value={tagRounds[c.id]||""} onChange={e => setTagRounds(t => ({...t,[c.id]:e.target.value}))} onKeyDown={e => e.key==="Enter" && addCond()} title="Rounds until it expires (optional)"
                      style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 5, outline: "none", color: COLORS.muted, fontSize: 11, width: 40, textAlign: "center", padding: "2px 0" }} />
                  </>); })()}
                </div>
                {!concealed && view.hp <= 0 && <DyingPanel c={c} onUpdate={(patch) => updateCombatant(c.id, patch)} />}
                {isTargetable && (
                  <div onClick={() => handOff(c)} title={`Attack ${c.name}`}
                    onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.red}22`; e.currentTarget.style.borderColor = COLORS.red; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${COLORS.red}10`; e.currentTarget.style.borderColor = `${COLORS.red}66`; }}
                    style={{ position: "absolute", inset: 0, borderRadius: 10, cursor: "pointer", background: `${COLORS.red}10`, border: `1.5px solid ${COLORS.red}66`, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, paddingBottom: 12, zIndex: 5, transition: "background .1s" }}>
                    <Crosshair size={18} color={COLORS.red} />
                    <span style={{ color: COLORS.red, fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>Attack {c.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Revivify rules (DM Playbook, Matt Mercer-style) — Resurrection Check is
// d20 + spellcasting mod vs DC 10 +1 per prior successful resurrection for
// that specific character. Tracked per-name so the DC keeps climbing.
function RevivifyTool() {
  const [records, persist, error] = useSharedList("revivify_records");
  const [name, setName] = useState("");
  const [mod, setMod] = useState(0);
  const [result, setResult] = useState(null);
  if (records === null) return <LoadingBlock />;

  const priorFor = (n) => (records.find(r => r.name.toLowerCase() === n.toLowerCase())?.count) || 0;
  const attempt = () => {
    if (!name.trim()) return;
    const prior = priorFor(name);
    const dc = 10 + prior;
    const r = roll(20);
    const total = r + Number(mod || 0);
    const success = total >= dc;
    setResult({ r, total, dc, success, prior });
    if (success) {
      const existing = records.find(rec => rec.name.toLowerCase() === name.toLowerCase());
      if (existing) persist(records.map(rec => rec === existing ? { ...rec, count: rec.count + 1 } : rec));
      else persist([...records, { name: name.trim(), count: 1 }]);
    }
  };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginTop: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>Revivify Check</div>
      <div style={{ color: COLORS.dim, fontSize: 11.5, marginBottom: 12 }}>DC 10 + 1 per previous successful resurrection for that character.</div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Character name..." style={{ maxWidth: 200 }} />
        <TextInput type="number" value={mod} onChange={e => setMod(+e.target.value)} placeholder="Mod" style={{ maxWidth: 80 }} title="Spellcasting ability modifier" />
        <Btn variant="gold" onClick={attempt}><Dices size={14}/> Attempt</Btn>
        {name.trim() && <span style={{ alignSelf: "center", fontSize: 11, color: COLORS.dim }}>Current DC: {10 + priorFor(name)}</span>}
      </div>
      {result && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${result.success?COLORS.green+"55":COLORS.red+"55"}`, borderRadius: 8, padding: 12, fontSize: 13, color: result.success?COLORS.green:COLORS.red }}>
          Rolled {result.r} {mod ? `+ ${mod}` : ""} = {result.total} vs DC {result.dc} — {result.success ? "Success! The character returns." : "Failed — the soul isn't lost, but this attempt fails. Future checks for them are now DC " + (result.dc + 1) + "."}
        </div>
      )}
      {records.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {records.map((r,i) => <Tag key={i} color={COLORS.purple}>{r.name}: {r.count} resurrection{r.count>1?"s":""} (next DC {10+r.count})</Tag>)}
        </div>
      )}
    </div>
  );
}

function RollsTab() {
  const [log, persist] = useSharedList("session_rolls");
  const [expr, setExpr] = useState("1d20");
  if (log === null) return <LoadingBlock />;
  const doRoll = () => {
    const m = expr.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
    if (!m) return;
    const count = parseInt(m[1]||"1",10), sides = parseInt(m[2],10), mod = parseInt(m[3]||"0",10);
    const rolls = Array.from({length: count}, () => roll(sides));
    const total = rolls.reduce((a,b)=>a+b,0) + mod;
    persist([{ id: uid(), expr, rolls, mod, total, time: Date.now() }, ...log].slice(0,50));
    emitRoll({ label: expr, total, detail: `[${rolls.join(", ")}]${mod ? ` ${mod >= 0 ? "+" : ""}${mod}` : ""}`, color: COLORS.gold });
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextInput value={expr} onChange={e => setExpr(e.target.value)} placeholder="e.g. 2d6+3" onKeyDown={e => e.key==="Enter" && doRoll()} style={{ maxWidth: 160 }} />
        <Btn variant="gold" onClick={doRoll}><Dices size={14}/> Roll</Btn>
        {["1d20","2d6","1d100"].map(p => <Btn key={p} size="sm" onClick={() => setExpr(p)}>{p}</Btn>)}
      </div>
      {log.length === 0 ? <EmptyState icon={Dices} title="No rolls yet" body="Roll something — it's shared with the whole table." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {log.map(r => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", color: COLORS.muted }}>{r.expr} = [{r.rolls.join(", ")}]{r.mod ? (r.mod>0?`+${r.mod}`:r.mod) : ""}</span>
              <span style={{ fontWeight: 700, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{r.total}</span>
            </div>
          ))}
        </div>
      )}
      <RevivifyTool />
    </div>
  );
}

function SessionDetailsTab() {
  const [details, persist] = useSharedList("session_details");
  const [universe] = useSharedList("universe");
  const d = details && details[0] ? details[0] : { title: "", recap: "", nextGoal: "" };
  if (details === null) return <LoadingBlock />;
  const save = (patch) => persist([{ ...d, ...patch }]);
  // Party home — set on a planet over in the Universe tab; shown here as the
  // table's current base of operations (placeholder tie-in).
  const galaxy = universe && universe[0];
  const homeEntry = galaxy?.partyHomePlanetId ? (galaxy.systems || []).flatMap(s => s.planets.map(p => ({ s, p }))).find(x => x.p.id === galaxy.partyHomePlanetId) : null;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ background: COLORS.panel2, border: `1px solid ${homeEntry ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: homeEntry ? 6 : 0 }}>
          <HomeIcon size={14} color={COLORS.gold} />
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Party Home</span>
        </div>
        {homeEntry ? (
          <div style={{ fontSize: 13 }}><b style={{ color: COLORS.gold }}>{homeEntry.p.name}</b> <span style={{ color: COLORS.dim }}>· {homeEntry.p.class || homeEntry.p.biome} · {homeEntry.s.name.replace(/ System$/, "")} System</span></div>
        ) : (
          <div style={{ fontSize: 11.5, color: COLORS.dim }}>No party home set. Pick a world in the <b style={{ color: COLORS.gold }}>Universe</b> tab → Enter System → “Set as Party Home”.</div>
        )}
      </div>
      <Field label="Session Title"><TextInput value={d.title} onChange={e => save({ title: e.target.value })} placeholder="e.g. Session 12 — Ambush on Konatsu" /></Field>
      <Field label="Recap"><TextArea value={d.recap} onChange={e => save({ recap: e.target.value })} style={{ minHeight: 100 }} /></Field>
      <Field label="Next Session Goal"><TextArea value={d.nextGoal} onChange={e => save({ nextGoal: e.target.value })} /></Field>
    </div>
  );
}

// Shared session clock + calendar. Tracks the in world day and time so the
// table stays in sync on when things happen.
const TIME_PHASE = (m) => { const h = m / 60; if (h < 5) return "Night"; if (h < 8) return "Dawn"; if (h < 11) return "Morning"; if (h < 14) return "Midday"; if (h < 17) return "Afternoon"; if (h < 20) return "Evening"; if (h < 22) return "Dusk"; return "Night"; };
// A common 12 month, 7 day calendar. The year reads as an Age (Dragon Ball style).
const CAL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CAL_MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CAL_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthLen = (m) => CAL_MDAYS[m - 1];
const normDate = (age, month, day) => {
  while (month > 12) { month -= 12; age += 1; }
  while (month < 1) { month += 12; age -= 1; }
  while (day > monthLen(month)) { day -= monthLen(month); month += 1; if (month > 12) { month = 1; age += 1; } }
  while (day < 1) { month -= 1; if (month < 1) { month = 12; age -= 1; } day += monthLen(month); }
  return { age: Math.max(0, age), month, day };
};
const weekdayOf = (age, month, day) => { const doy = CAL_MDAYS.slice(0, month - 1).reduce((a, b) => a + b, 0) + (day - 1); const abs = age * 365 + doy; return CAL_WEEKDAYS[(((abs % 7) + 7) % 7)]; };
const DEFAULT_TIME = { age: 762, month: 1, day: 1, minutes: 480, secs: 0 };
const readTime = (state) => (state && state[0] && state[0].month) ? { ...DEFAULT_TIME, ...state[0] } : { ...DEFAULT_TIME };
// Advance by a number of seconds, carrying into minutes, days, months and Age.
function advanceTime(t, addSeconds) {
  let secs = (t.secs || 0) + addSeconds;
  let minutes = (t.minutes || 0) + Math.floor(secs / 60);
  secs = ((secs % 60) + 60) % 60;
  let { age, month, day } = t;
  while (minutes >= 1440) { minutes -= 1440; day += 1; }
  while (minutes < 0) { minutes += 1440; day -= 1; }
  const n = normDate(age, month, day);
  return { age: n.age, month: n.month, day: n.day, minutes, secs };
}
const timeLabel = (t) => `${weekdayOf(t.age, t.month, t.day)}, ${CAL_MONTHS[t.month - 1]} ${t.day} · Age ${t.age} · ${String(Math.floor(t.minutes / 60)).padStart(2, "0")}:${String(t.minutes % 60).padStart(2, "0")} ${TIME_PHASE(t.minutes)}`;

function SessionClockTab() {
  const [state, persist] = useSharedList("session_time");
  if (state === null) return <LoadingBlock />;
  const t = readTime(state);
  const { age, month, day, minutes, secs } = t;
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  const advance = (mins) => persist([advanceTime(t, mins * 60)]);
  const setDate = (a, mo, d) => { const n = normDate(a, mo, d); persist([{ ...t, age: n.age, month: n.month, day: n.day }]); };
  const setClock = (mins) => persist([{ ...t, minutes: Math.max(0, Math.min(1439, mins)), secs: 0 }]);
  return (
    <div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 22, textAlign: "center", marginBottom: 16, background: `linear-gradient(180deg, ${COLORS.gold}0C, transparent)` }}>
        <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1.2 }}>{weekdayOf(age, month, day)}, {CAL_MONTHS[month - 1]} {day} · Age {age}</div>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 50, fontWeight: 900, color: COLORS.gold, lineHeight: 1.1 }}>{hh}:{mm}<span style={{ fontSize: 26, color: COLORS.dim }}>:{ss}</span></div>
        <div style={{ fontSize: 13, color: COLORS.blue, fontWeight: 700, letterSpacing: 0.5 }}>{TIME_PHASE(minutes)}</div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(10)}>+10 min</Btn>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(60)}>+1 hour</Btn>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(480)}>+8 hours (rest)</Btn>
        <Btn style={{ fontSize: 12.5 }} variant="gold" onClick={() => { const n = normDate(age, month, day + 1); persist([{ age: n.age, month: n.month, day: n.day, minutes: 480, secs: 0 }]); }}><ChevronRight size={13}/> Next day</Btn>
      </div>
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Age (year)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setDate(age - 1, month, day)} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={age} onChange={e => setDate(Math.max(0, +e.target.value || 0), month, day)} style={{ width: 70, textAlign: "center" }} />
            <button onClick={() => setDate(age + 1, month, day)} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Month</div>
          <Select value={month} onChange={e => { const mo = +e.target.value; setDate(age, mo, Math.min(day, monthLen(mo))); }} style={{ width: 130 }}>{CAL_MONTHS.map((n, i) => <option key={i} value={i + 1}>{n}</option>)}</Select>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Day</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setDate(age, month, day - 1)} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={day} onChange={e => setDate(age, month, Math.max(1, +e.target.value || 1))} style={{ width: 54, textAlign: "center" }} />
            <button onClick={() => setDate(age, month, day + 1)} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Set time</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TextInput type="number" value={Math.floor(minutes / 60)} onChange={e => setClock(Math.min(23, Math.max(0, +e.target.value || 0)) * 60 + (minutes % 60))} style={{ width: 54, textAlign: "center" }} title="Hour" />
            <span style={{ color: COLORS.dim }}>:</span>
            <TextInput type="number" value={minutes % 60} onChange={e => setClock(Math.floor(minutes / 60) * 60 + Math.min(59, Math.max(0, +e.target.value || 0)))} style={{ width: 54, textAlign: "center" }} title="Minute" />
          </div>
        </div>
      </div>
    </div>
  );
}

const CAL_WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Swatches anyone can tag a calendar event with. Falls back to the shared/DM tint.
const EVENT_COLORS = [COLORS.blue, COLORS.gold, COLORS.green, COLORS.red, COLORS.purple, COLORS.amber];
// Absolute day index for ordering events across months and Ages.
const absDay = (age, month, day) => age * 365 + CAL_MDAYS.slice(0, month - 1).reduce((a, b) => a + b, 0) + day;

// A real month-grid calendar sitting on the shared clock. Players and the DM
// drop dated events on it; DM-only events stay hidden from players. Click a day
// to read it, add an event, or jump the world clock straight to that date.
function SessionCalendar() {
  const [timeState, persistTime] = useSharedList("session_time");
  const [events, persistEvents] = useSharedList("session_events");
  const [sessionView] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const [view, setView] = useState(null);      // {age, month} being browsed
  const [selDay, setSelDay] = useState(null);
  const [draft, setDraft] = useState("");
  const [draftDM, setDraftDM] = useState(false);
  const [draftColor, setDraftColor] = useState(EVENT_COLORS[0]);
  const [colorEditId, setColorEditId] = useState(null);   // event whose swatch tray is open
  if (timeState === null || events === null) return <LoadingBlock />;
  const isDM = sessionView.mode === "dm";
  const t = readTime(timeState);
  const vm = view || { age: t.age, month: t.month };
  const list = (events || []).filter(e => isDM || !e.dm);
  const evOf = (day) => list.filter(e => e.age === vm.age && e.month === vm.month && e.day === day).sort((a, b) => (a.dm === b.dm ? 0 : a.dm ? 1 : -1));
  const firstIdx = CAL_WEEKDAYS.indexOf(weekdayOf(vm.age, vm.month, 1));
  const days = monthLen(vm.month);
  const cells = [...Array(Math.max(0, firstIdx)).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const isToday = (d) => vm.age === t.age && vm.month === t.month && d === t.day;
  const shiftMonth = (dir) => { let m = vm.month + dir, a = vm.age; if (m > 12) { m = 1; a++; } if (m < 1) { m = 12; a--; } setView({ age: Math.max(0, a), month: m }); setSelDay(null); };
  const addEvent = () => { if (!selDay || !draft.trim()) return; persistEvents([...(events || []), { id: uid(), age: vm.age, month: vm.month, day: selDay, title: draft.trim(), dm: draftDM, color: draftColor }]); setDraft(""); setDraftDM(false); };
  const delEvent = (id) => persistEvents((events || []).filter(e => e.id !== id));
  const setEventColor = (id, color) => { persistEvents((events || []).map(e => e.id === id ? { ...e, color } : e)); setColorEditId(null); };
  const jumpTo = (d) => persistTime([{ ...t, age: vm.age, month: vm.month, day: d }]);
  const nowAbs = absDay(t.age, t.month, t.day);
  const upcoming = list.filter(e => absDay(e.age, e.month, e.day) >= nowAbs).sort((a, b) => absDay(a.age, a.month, a.day) - absDay(b.age, b.month, b.day)).slice(0, 6);
  const evColor = (e) => e.color || (e.dm ? COLORS.gold : COLORS.blue);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <CalendarDays size={16} color={COLORS.gold} />
        <button onClick={() => shiftMonth(-1)} style={miniBtnStyle}><ChevronLeft size={14} /></button>
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 15, minWidth: 190, textAlign: "center" }}>{CAL_MONTHS[vm.month - 1]} · Age {vm.age}</span>
        <button onClick={() => shiftMonth(1)} style={miniBtnStyle}><ChevronRight size={14} /></button>
        <Btn size="sm" variant="ghost" onClick={() => { setView({ age: t.age, month: t.month }); setSelDay(t.day); }}>Today</Btn>
        <div style={{ flex: 1 }} />
        {isDM && <Tag color={COLORS.gold}>DM view · sees hidden events</Tag>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {CAL_WEEKDAYS_SHORT.map(w => <div key={w} style={{ textAlign: "center", fontSize: 10, color: COLORS.muted, fontWeight: 700, padding: "2px 0" }}>{w}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const evs = evOf(d);
          const today = isToday(d);
          const sel = selDay === d;
          return (
            <div key={i} onClick={() => setSelDay(sel ? null : d)} title={evs.length ? `${evs.length} event${evs.length > 1 ? "s" : ""}` : undefined} style={{
              height: 58, borderRadius: 8, padding: 5, cursor: "pointer", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              background: sel ? `${COLORS.gold}1A` : today ? `${COLORS.blue}12` : COLORS.panel2,
              border: `1px solid ${sel ? COLORS.gold : today ? COLORS.blue + "88" : COLORS.border}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: today ? COLORS.blue : COLORS.text, textAlign: "right" }}>{d}</div>
              <div style={{ display: "flex", gap: 3, justifyContent: "center", height: 6 }}>
                {evs.slice(0, 4).map(e => <span key={e.id} style={{ width: 6, height: 6, borderRadius: 3, background: evColor(e) }} />)}
              </div>
            </div>
          );
        })}
      </div>
      {selDay && (
        <div style={{ marginTop: 14, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{weekdayOf(vm.age, vm.month, selDay)}, {CAL_MONTHS[vm.month - 1]} {selDay} · Age {vm.age}</span>
            <div style={{ flex: 1 }} />
            <Btn size="sm" variant="ghost" onClick={() => jumpTo(selDay)} title="Set the world clock to this day">Jump clock here</Btn>
          </div>
          {evOf(selDay).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              {evOf(selDay).map(e => (
                <div key={e.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "6px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setColorEditId(colorEditId === e.id ? null : e.id)} title="Change color" style={{ width: 14, height: 14, borderRadius: 4, background: evColor(e), border: `1px solid ${COLORS.borderLit}`, cursor: "pointer", padding: 0, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5 }}>{e.title}</span>
                    {e.dm && <Tag color={COLORS.gold}>DM only</Tag>}
                    <div style={{ flex: 1 }} />
                    <X size={13} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => delEvent(e.id)} />
                  </div>
                  {colorEditId === e.id && (
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {EVENT_COLORS.map(c => (
                        <button key={c} onClick={() => setEventColor(e.id, c)} title="Set color" style={{ width: 20, height: 20, borderRadius: 5, background: c, cursor: "pointer", border: `2px solid ${evColor(e) === c ? COLORS.text : "transparent"}`, padding: 0 }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 10 }}>Nothing scheduled.</div>}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <TextInput value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && addEvent()} placeholder="Add an event on this day" style={{ flex: 1, minWidth: 180 }} />
            <div style={{ display: "flex", gap: 5, alignItems: "center" }} title="Event color">
              {EVENT_COLORS.map(c => (
                <button key={c} onClick={() => setDraftColor(c)} style={{ width: 18, height: 18, borderRadius: 5, background: c, cursor: "pointer", border: `2px solid ${draftColor === c ? COLORS.text : "transparent"}`, padding: 0 }} />
              ))}
            </div>
            {isDM && (
              <button onClick={() => setDraftDM(!draftDM)} title="Hide this event from players" style={{ cursor: "pointer", fontSize: 11, fontWeight: 700, borderRadius: 7, padding: "8px 10px", border: `1px solid ${draftDM ? COLORS.gold : COLORS.border}`, background: draftDM ? `${COLORS.gold}1A` : "transparent", color: draftDM ? COLORS.gold : COLORS.muted }}>
                {draftDM ? "🔒 DM only" : "Shared"}
              </button>
            )}
            <Btn size="sm" variant="gold" onClick={addEvent}><Plus size={13} /> Add</Btn>
          </div>
        </div>
      )}
      {upcoming.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Upcoming</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {upcoming.map(e => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: evColor(e) }} />
                <span style={{ color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", fontSize: 11, minWidth: 130 }}>{CAL_MONTHS[e.month - 1].slice(0, 3)} {e.day} · Age {e.age}</span>
                <span>{e.title}</span>
                {e.dm && <Tag color={COLORS.gold}>DM</Tag>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// The Calendar sub-tab: the live world clock plus the month calendar with events.
function SessionTimeTab() {
  return <div><SessionClockTab /><SessionCalendar /></div>;
}

// Tracks the world the party is standing on. Setting it here (or in the Universe
// tab) is what makes the environment go live: gravity and weather flow straight
// into play. Also surfaces the Harsh Galaxies toggle so it's one click away.
function CurrentPlanetPicker() {
  const [universe, persist] = useSharedList("universe");
  const [houseRules, persistHR] = useHouseRules();
  if (universe === null) return <LoadingBlock />;
  const galaxy = universe && universe[0];
  const systems = (galaxy && galaxy.systems) || [];
  const planets = systems.flatMap(s => (s.planets || []));
  const live = houseRules.harshGalaxies;
  const setPlanet = (id) => { if (!galaxy) return; persist([{ ...galaxy, currentPlanetId: id || null }]); };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <MapPin size={14} color={COLORS.gold} />
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Current Planet</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => persistHR({ harshGalaxies: !live })} title="Whether gravity and weather actually affect the party" style={{ cursor: "pointer", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "4px 12px", border: `1px solid ${live ? COLORS.gold : COLORS.border}`, background: live ? `${COLORS.gold}1A` : "transparent", color: live ? COLORS.gold : COLORS.muted }}>
          {live ? "Effects live" : "Flavor only"}
        </button>
      </div>
      {planets.length ? (
        <Select value={(galaxy && galaxy.currentPlanetId) || ""} onChange={e => setPlanet(e.target.value)} style={{ width: "100%" }}>
          <option value="">Not set — pick where the party is</option>
          {systems.map(s => (
            <optgroup key={s.id || s.name} label={(s.name || "").replace(/ System$/, "") + " System"}>
              {(s.planets || []).map(p => <option key={p.id} value={p.id}>{p.name}{p.gravity != null ? ` · ${p.gravity}g ${gravityBand(p.gravity)}` : ""}{p.weather ? ` · ${p.weather}` : ""}</option>)}
            </optgroup>
          ))}
        </Select>
      ) : (
        <div style={{ fontSize: 11.5, color: COLORS.dim }}>No worlds yet. Generate a galaxy in the <b style={{ color: COLORS.gold }}>Universe</b> tab, then pick the party's location here.</div>
      )}
    </div>
  );
}

// Environment sub-tab: the world state in one place. Current planet, the time of
// day, the preset terrain, and the auto-derived environmental conditions.
function EnvironmentTab() {
  const [envState, persistEnv] = useSharedList("session_env");
  const [timeState] = useSharedList("session_time");
  const treg = useRegistry("terrains");
  if (envState === null || treg.loading) return <LoadingBlock />;
  const env = (envState && envState[0]) || { active: {}, hours: 0, terrain: "" };
  const t = readTime(timeState);
  // Terrains come from the registry so disabled ones drop out and customs appear.
  const terrains = treg.entries.filter(e => e.enabled);
  const terrain = terrains.find(tp => tp._id === env.terrain);
  return (
    <div>
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Clock size={14} color={COLORS.gold} />
        <span style={{ fontSize: 13 }}>{timeLabel(t)}</span>
      </div>
      <CurrentPlanetPicker />
      <EnvironmentBanner />
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Terrain</div>
        <Select value={env.terrain || ""} onChange={e => persistEnv([{ ...env, terrain: e.target.value }])} style={{ width: "100%" }}>
          <option value="">Pick a terrain…</option>
          {terrains.map(tp => <option key={tp._id} value={tp._id}>{tp._name}</option>)}
        </Select>
        {terrain && <div style={{ fontSize: 11.5, color: COLORS.dim, marginTop: 6 }}>{terrain._desc}</div>}
      </div>
      <HazardsPanel />
    </div>
  );
}

// Skirmish outcome bands, best first. A weighted d20 (nudged by the Battle Power
// ratio) lands on one; each carries the toll it takes on the party.
const SKIRMISH_OUTCOMES = [
  { key: "sweep", min: 22, name: "Clean Sweep", tone: "win", hp: 0.05, ki: 0.10, exh: 0, mins: 10, blurb: "The party carves through them almost untouched." },
  { key: "victory", min: 17, name: "Victory", tone: "win", hp: 0.15, ki: 0.25, exh: 0, mins: 30, blurb: "A clean win, a few bruises to show for it." },
  { key: "bloody", min: 12, name: "Bloody Victory", tone: "win", hp: 0.35, ki: 0.45, exh: 1, mins: 60, blurb: "They win, but it costs them dearly." },
  { key: "stale", min: 8, name: "Stalemate", tone: "draw", hp: 0.30, ki: 0.40, exh: 0, mins: 60, blurb: "Both sides break off, battered and unresolved." },
  { key: "retreat", min: 4, name: "Forced Retreat", tone: "loss", hp: 0.40, ki: 0.40, exh: 1, mins: 45, blurb: "The party gives ground and pulls back." },
  { key: "rout", min: -999, name: "Rout", tone: "loss", hp: 0.55, ki: 0.50, exh: 1, mins: 30, blurb: "It falls apart. The party scatters to survive." },
];
const outcomeColor = (tone) => tone === "win" ? COLORS.green : tone === "loss" ? COLORS.red : COLORS.amber;

// War tactics form a counter triangle: Assault beats Hold, Hold beats Flank,
// Flank beats Assault. Each also trades aggression for morale. Reading the enemy
// commander and picking the counter is the strategy, not spamming clashes.
const WAR_TACTICS = {
  assault: { name: "Assault", beats: "hold", deal: 1.5, take: 1.3, morale: 8, desc: "Throw everything forward. You hit hardest but bleed for it, and it drains morale. Strong against Hold, weak to Flank." },
  hold: { name: "Hold", beats: "flank", deal: 0.7, take: 0.6, morale: -6, desc: "Dig in and weather it. Fewest losses on both sides and your morale steadies. Strong against Flank, weak to Assault." },
  flank: { name: "Flank", beats: "assault", deal: 1.2, take: 0.9, morale: 2, desc: "Maneuver for the opening. A favorable trade that shreds an Assault. Strong against Assault, weak to Hold." },
};
const TACTIC_ORDER = ["assault", "hold", "flank"];
const rawStrength = (a) => (a.numbers || 0) * (a.power || 0) * ((a.morale || 0) / 100);
// The enemy commander: defends when shaken, presses when dominant, else mixes it up.
const enemyTacticAI = (e, p) => {
  if ((e.morale || 0) < 35) return "hold";
  if (rawStrength(e) > rawStrength(p) * 1.3) return "assault";
  return TACTIC_ORDER[Math.floor(Math.random() * 3)];
};

function QuickCombatTab() {
  const [chars, persistChars] = useSharedList("characters_v2");
  const [npcs] = useSharedList("npcs_v2");
  const [timeState, persistTime] = useSharedList("session_time");
  const [warState, persistWar] = useSharedList("session_war");
  const [combatState, persistCombat] = useSharedList("session_combat");
  const [enemyCount, setEnemyCount] = useState("12");
  const [enemyUnit, setEnemyUnit] = useState("");
  const [enemyNpcId, setEnemyNpcId] = useState("");
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("skirmish");
  const [warSpend, setWarSpend] = useState({});   // {side:{res,amt}} transient reinforce inputs
  if (chars === null) return <LoadingBlock />;
  const party = (chars || []).filter(c => !c.archived);
  const partyBP = party.reduce((s, c) => s + computeBattlePower(c), 0);
  const pickEnemyNpc = (id) => { setEnemyNpcId(id); const n = (npcs || []).find(x => x.id === id); if (n) setEnemyUnit(String(computeBattlePower(migrateNpc(n)))); };
  const enemyBP = Math.max(0, (Number(enemyCount) || 0) * (Number(enemyUnit) || 0));
  const hasEnemy = enemyBP > 0;
  const ratio = hasEnemy ? partyBP / enemyBP : 1;
  const odds = !hasEnemy ? "Set an enemy" : ratio >= 3 ? "Overwhelming" : ratio >= 1.5 ? "Favored" : ratio >= 0.9 ? "Even" : ratio >= 0.5 ? "Outmatched" : "Hopeless";
  const resolve = () => {
    if (!party.length || !hasEnemy) return;
    const nudge = Math.max(-12, Math.min(12, Math.round((ratio - 1) * 6)));
    const d20 = roll(20);
    if (roll(20) === 1) { setResult({ figure: true, name: "A Figure Intervenes", tone: "draw", blurb: "A greater power steps between the two forces and the fight simply stops.", hp: 0, ki: 0, exh: 0, mins: 15, d20, ratio, partyBP, enemyBP, applied: false }); return; }
    const score = d20 + nudge;
    const oc = SKIRMISH_OUTCOMES.find(o => score >= o.min) || SKIRMISH_OUTCOMES[SKIRMISH_OUTCOMES.length - 1];
    setResult({ ...oc, d20, nudge, score, ratio, partyBP, enemyBP, applied: false });
  };
  const applyResult = () => {
    if (!result || result.applied) return;
    let updated = chars;
    for (const c of party) {
      const hpLoss = Math.round((c.maxHp || 0) * result.hp);
      const kiLoss = Math.round((c.maxKi || 0) * result.ki);
      updated = updated.map(x => x.id === c.id ? { ...x, hp: Math.max(1, (x.hp || 0) - hpLoss), ki: Math.max(0, (x.ki || 0) - kiLoss), vitals: { ...(x.vitals || {}), exhaustion: Math.min(6, ((x.vitals && x.vitals.exhaustion) || 0) + (result.exh || 0)) } } : x);
    }
    if (persistChars) persistChars(updated);
    if (persistTime) persistTime([advanceTime(readTime(timeState), (result.mins || 0) * 60)]);
    logSession(`Quick Combat, ${result.name}: the party spent ${Math.round(result.hp * 100)}% HP and ${Math.round(result.ki * 100)}% Ki${result.exh ? `, +${result.exh} Exhaustion` : ""} over about ${result.mins} min.`);
    setResult({ ...result, applied: true });
  };

  // --- War scale ---------------------------------------------------------
  const war = warState && warState[0] && warState[0].active ? warState[0] : null;
  const strengthOf = (a) => Math.round((a.numbers || 0) * (a.power || 0) * ((a.morale || 0) / 100));
  const startWar = () => persistWar([{
    active: true, round: 0, over: null, log: [], tactic: "assault", enemyMode: "auto", last: null,
    party: { name: "Your Forces", numbers: 100, power: Math.max(1, Math.round(partyBP / Math.max(1, party.length))) || 400, morale: 100, influence: 0, zeni: 0, fillName: "Favor owed", fill: 0 },
    enemy: { name: "Enemy Army", numbers: Math.max(1, Number(enemyCount) || 100), power: Number(enemyUnit) || 400, morale: 100, influence: 0, zeni: 0, fillName: "Ally of convenience", fill: 0 },
  }]);
  const setArmy = (side, patch) => war && persistWar([{ ...war, [side]: { ...war[side], ...patch } }]);
  const clashRound = () => {
    if (!war || war.over) return;
    const p = war.party, e = war.enemy;
    const pt = war.tactic || "assault";
    const et = war.enemyMode === "auto" ? enemyTacticAI(e, p) : (WAR_TACTICS[war.enemyMode] ? war.enemyMode : "hold");
    const PT = WAR_TACTICS[pt], ET = WAR_TACTICS[et];
    const pCounters = PT.beats === et, eCounters = ET.beats === pt;   // did we / they land the counter
    const pStr = strengthOf(p), eStr = strengthOf(e), total = pStr + eStr || 1;
    const swing = () => 0.75 + Math.random() * 0.5;
    const eBase = e.numbers * 0.2 * (pStr / total) * swing();
    const pBase = p.numbers * 0.2 * (eStr / total) * swing();
    const eLoss = Math.min(e.numbers, Math.round(eBase * PT.deal * ET.take * (pCounters ? 1.6 : 1) * (eCounters ? 0.6 : 1)));
    const pLoss = Math.min(p.numbers, Math.round(pBase * ET.deal * PT.take * (eCounters ? 1.6 : 1) * (pCounters ? 0.6 : 1)));
    const pFrac = p.numbers ? pLoss / p.numbers : 1, eFrac = e.numbers ? eLoss / e.numbers : 1;
    const np = { ...p, numbers: p.numbers - pLoss, morale: Math.max(0, Math.min(100, p.morale - PT.morale - Math.round(pFrac * 45) + (pCounters ? 8 : 0) - (eCounters ? 8 : 0))) };
    const ne = { ...e, numbers: e.numbers - eLoss, morale: Math.max(0, Math.min(100, e.morale - ET.morale - Math.round(eFrac * 45) + (eCounters ? 8 : 0) - (pCounters ? 8 : 0))) };
    const pDone = np.numbers <= 0 || np.morale <= 0, eDone = ne.numbers <= 0 || ne.morale <= 0;
    const over = (pDone && eDone) ? "both" : eDone ? "enemy" : pDone ? "party" : null;
    const mins = Math.min(1440, Math.max(60, Math.round((p.numbers + e.numbers) / 2)));
    if (persistTime) persistTime([advanceTime(readTime(timeState), mins * 60)]);
    const counterNote = pCounters ? " You caught them out." : eCounters ? " They read you." : "";
    const tail = over === "enemy" ? " Enemy routs!" : over === "party" ? " Your forces rout!" : over === "both" ? " Both sides shatter!" : "";
    const last = { pt, et, pLoss, eLoss, pCounters, eCounters };
    persistWar([{ ...war, round: war.round + 1, party: np, enemy: ne, last, log: [`Round ${war.round + 1}: You ${PT.name}, they ${ET.name}.${counterNote} You lost ${pLoss}, enemy lost ${eLoss}.${tail}`, ...war.log].slice(0, 40), over }]);
    logSession(`War round ${war.round + 1}: You ${PT.name} vs their ${ET.name}. You lost ${pLoss}, enemy lost ${eLoss}.${tail}`);
  };
  const spendOn = (side, effect) => {
    const s = warSpend[side] || {}; const resKey = s.res || "influence"; const amt = Math.max(0, Math.min(war[side][resKey] || 0, Number(s.amt) || 0));
    if (!amt) return;
    const a = war[side]; const patch = { [resKey]: (a[resKey] || 0) - amt };
    if (effect === "reinforce") patch.numbers = (a.numbers || 0) + amt; else patch.morale = Math.min(100, (a.morale || 0) + amt);
    persistWar([{ ...war, [side]: { ...a, ...patch } }]);
    logSession(`${a.name} spends ${amt} ${resKey === "fill" ? (a.fillName || "resource") : resKey} to ${effect === "reinforce" ? "reinforce" : "steady morale"}.`);
    setWarSpend({ ...warSpend, [side]: { ...s, amt: "" } });
  };
  const breakThrough = () => {
    if (!war) return;
    const cs = (combatState && combatState[0]) || { round: 1, turn: 0, combatants: [] };
    const leader = { ...blankCombatant(), name: `${war.enemy.name || "Enemy"} General`, init: roll(20) + 3, hp: 300, maxHp: 300, ki: 100, maxKi: 100, dr: 3 };
    if (persistCombat) persistCombat([{ ...cs, combatants: [...(cs.combatants || []), leader] }]);
    logSession(`Break through! The party punches to the ${war.enemy.name || "enemy"} leader. Their General drops into the tracker for a real fight.`);
    persistWar([{ ...war, active: false }]);
  };
  const endWar = () => persistWar([]);
  const armyColor = (side) => side === "party" ? COLORS.blue : COLORS.red;
  const bar = (val, max, color) => (
    <div style={{ height: 6, borderRadius: 3, background: COLORS.panel2, overflow: "hidden" }}><div style={{ width: `${Math.max(0, Math.min(100, (val / (max || 1)) * 100))}%`, height: "100%", background: color }} /></div>
  );
  const armyCard = (side) => {
    const a = war[side]; const s = warSpend[side] || {}; const res = s.res || "influence"; const open = !!s.open;
    const mColor = a.morale > 40 ? COLORS.green : a.morale > 15 ? COLORS.amber : COLORS.red;
    const resLabel = { influence: "Influence", zeni: "Zeni", fill: a.fillName || "Favor" };
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${armyColor(side)}55`, borderRadius: 10, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <TextInput value={a.name} onChange={e => setArmy(side, { name: e.target.value })} style={{ fontWeight: 800, fontSize: 14, background: "transparent", border: "none", padding: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: mColor, whiteSpace: "nowrap" }}>Morale {a.morale}</span>
        </div>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, fontWeight: 900, color: armyColor(side) }}>{strengthOf(a).toLocaleString()}</div>
        <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 8 }}>fielded strength</div>
        {bar(a.morale, 100, mColor)}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
          <div><div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", marginBottom: 2 }}>Numbers</div><TextInput type="number" value={a.numbers} onChange={e => setArmy(side, { numbers: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
          <div><div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", marginBottom: 2 }}>Power each</div><TextInput type="number" value={a.power} onChange={e => setArmy(side, { power: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
        </div>
        <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setWarSpend({ ...warSpend, [side]: { ...s, open: !open } })}>
            <span style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700 }}>Muster & resources</span>
            {open ? <ChevronUp size={14} color={COLORS.muted} /> : <ChevronDown size={14} color={COLORS.muted} />}
          </div>
          {!open && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Influence {a.influence} · Zeni {a.zeni} · {a.fillName || "Favor"} {a.fill}</div>}
          {open && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                <div><div style={{ fontSize: 9, color: COLORS.dim, marginBottom: 2 }}>Influence</div><TextInput type="number" value={a.influence} onChange={e => setArmy(side, { influence: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
                <div><div style={{ fontSize: 9, color: COLORS.dim, marginBottom: 2 }}>Zeni</div><TextInput type="number" value={a.zeni} onChange={e => setArmy(side, { zeni: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
                <div><TextInput value={a.fillName} onChange={e => setArmy(side, { fillName: e.target.value })} placeholder="Favor" style={{ fontSize: 10.5, marginBottom: 4 }} /><TextInput type="number" value={a.fill} onChange={e => setArmy(side, { fill: Math.max(0, +e.target.value || 0) })} style={{ textAlign: "center" }} /></div>
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                <Select value={res} onChange={e => setWarSpend({ ...warSpend, [side]: { ...s, res: e.target.value } })} style={{ fontSize: 11, width: 92 }}>
                  {["influence", "zeni", "fill"].map(k => <option key={k} value={k}>{resLabel[k]}</option>)}
                </Select>
                <TextInput type="number" value={s.amt || ""} onChange={e => setWarSpend({ ...warSpend, [side]: { ...s, amt: e.target.value } })} placeholder="amt" style={{ width: 54, textAlign: "center" }} />
                <Btn size="sm" onClick={() => spendOn(side, "reinforce")}>Reinforce</Btn>
                <Btn size="sm" onClick={() => spendOn(side, "recover")}>Recover</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}`, marginBottom: 14, width: "fit-content" }}>
        {[["skirmish", "Skirmish"], ["war", "War"]].map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", background: mode === m ? `${COLORS.gold}22` : "transparent", color: mode === m ? COLORS.gold : COLORS.muted }}>{l}</button>
        ))}
      </div>
      {mode === "skirmish" && (<>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>The Party</div>
          <div style={{ fontSize: 13 }}>{party.length} fighter{party.length === 1 ? "" : "s"}</div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, fontWeight: 900, color: COLORS.gold }}>{partyBP.toLocaleString()}</div>
          <div style={{ fontSize: 10.5, color: COLORS.dim }}>total Battle Power</div>
        </div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Enemy Force</div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Count</div><TextInput type="number" value={enemyCount} onChange={e => setEnemyCount(e.target.value)} style={{ width: 64, textAlign: "center" }} /></div>
            <div style={{ flex: 1, minWidth: 130 }}><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Foe (sets Battle Power)</div>
              <Select value={enemyNpcId} onChange={e => pickEnemyNpc(e.target.value)}>
                <option value="">Custom…</option>
                {(npcs || []).filter(n => !n.archived).map(n => <option key={n.id} value={n.id}>{n.name} ({computeBattlePower(migrateNpc(n)).toLocaleString()})</option>)}
              </Select>
            </div>
            <div><div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 3 }}>Battle Power each</div><TextInput type="number" value={enemyUnit} onChange={e => { setEnemyUnit(e.target.value); setEnemyNpcId(""); }} placeholder="0" style={{ width: 96, textAlign: "center" }} /></div>
          </div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, fontWeight: 900, color: COLORS.red, marginTop: 6 }}>{enemyBP.toLocaleString()}</div>
          <div style={{ fontSize: 10.5, color: COLORS.dim }}>total Battle Power</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <Tag color={!hasEnemy ? COLORS.dim : odds === "Overwhelming" || odds === "Favored" ? COLORS.green : odds === "Even" ? COLORS.amber : COLORS.red}>Odds: {odds}</Tag>
        <Btn variant="gold" disabled={!party.length || !hasEnemy} onClick={resolve}><Swords size={14}/> Resolve Skirmish</Btn>
        {!party.length && <span style={{ fontSize: 11.5, color: COLORS.dim }}>Add player characters first.</span>}
      </div>
      {result && (
        <div style={{ background: `${outcomeColor(result.tone)}12`, border: `1px solid ${outcomeColor(result.tone)}55`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, fontWeight: 900, color: outcomeColor(result.tone) }}>{result.name}</span>
            {result.applied && <Tag color={COLORS.green}>applied</Tag>}
          </div>
          <div style={{ fontSize: 13.5, color: COLORS.text, marginBottom: 10 }}>{result.blurb}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {result.hp > 0 && <Tag color={COLORS.red}>{Math.round(result.hp * 100)}% HP</Tag>}
            {result.ki > 0 && <Tag color={COLORS.blue}>{Math.round(result.ki * 100)}% Ki</Tag>}
            {result.exh > 0 && <Tag color={COLORS.purple}>+{result.exh} Exhaustion</Tag>}
            <Tag color={COLORS.dim}>about {result.mins} min</Tag>
            {result.score != null && <Tag color={COLORS.dim}>d20 {result.d20}{result.nudge ? ` ${result.nudge >= 0 ? "+" : ""}${result.nudge}` : ""} = {result.score}</Tag>}
          </div>
          <Btn variant="gold" disabled={result.applied} onClick={applyResult}>{result.applied ? "Applied to the party" : "Apply the toll to the party"}</Btn>
        </div>
      )}
      </>)}

      {mode === "war" && (war ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 16, fontWeight: 900, color: COLORS.gold }}>Round {war.round}</span>
            {war.over && <Tag color={war.over === "enemy" ? COLORS.green : war.over === "party" ? COLORS.red : COLORS.amber}>{war.over === "enemy" ? "Enemy routed" : war.over === "party" ? "Your forces routed" : "Both sides shattered"}</Tag>}
            <div style={{ flex: 1 }} />
            <ConfirmBtn size="md" variant="danger" confirmTitle="End this war" onConfirm={endWar}><RotateCcw size={14}/> End war</ConfirmBtn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {armyCard("party")}
            {armyCard("enemy")}
          </div>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Your tactic this round</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: COLORS.muted }}>Enemy commander</span>
              <Select value={war.enemyMode || "auto"} onChange={e => persistWar([{ ...war, enemyMode: e.target.value }])} style={{ fontSize: 12, width: 130 }}>
                <option value="auto">Auto (reacts)</option>
                {TACTIC_ORDER.map(k => <option key={k} value={k}>{WAR_TACTICS[k].name}</option>)}
              </Select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {TACTIC_ORDER.map(k => { const T = WAR_TACTICS[k]; const on = (war.tactic || "assault") === k; return (
                <button key={k} onClick={() => persistWar([{ ...war, tactic: k }])} title={T.desc} style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}14` : COLORS.panel2, borderRadius: 8, padding: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: on ? COLORS.gold : COLORS.text }}>{T.name}</div>
                  <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 3, lineHeight: 1.4 }}>{T.desc}</div>
                </button>
              ); })}
            </div>
            {war.last && (
              <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>
                Last clash: you {WAR_TACTICS[war.last.pt].name}, they {WAR_TACTICS[war.last.et].name}.
                {war.last.pCounters ? <b style={{ color: COLORS.green }}> You countered them.</b> : war.last.eCounters ? <b style={{ color: COLORS.red }}> They read you.</b> : <span> An even read.</span>}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Btn variant="gold" disabled={!!war.over} onClick={clashRound}><Swords size={14}/> Clash Round</Btn>
            <Btn onClick={breakThrough}><Crosshair size={14}/> Break Through to the leader</Btn>
          </div>
          {war.log.length > 0 && (
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>War log</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{war.log.map((l, i) => <div key={i} style={{ fontSize: 12, color: i === 0 ? COLORS.text : COLORS.dim }}>{l}</div>)}</div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12, lineHeight: 1.5 }}>Two armies clash across rounds until one routs. Each side has Numbers, Power and Morale, spends Influence, Zeni or a favor to reinforce or recover, and the clock stretches with the scale of the war. Break Through at any point to drop the party against the leader.</div>
          <Btn variant="gold" onClick={startWar}><Swords size={14}/> Start a War</Btn>
        </div>
      ))}
    </div>
  );
}

// Tactical battle map. Tokens come from the initiative tracker; drag to move on
// the X/Y plane, and each carries an altitude for flight. Positions live on the
// combatant so the whole table sees the same board.
const MAP_COLS = 22, MAP_ROWS = 14, MAP_CELL = 30;

// Load an image file and downscale it so its longest side is <= maxDim, returning
// a data URL. Keeps an imported World Anvil map small enough to sync to every
// player through the shared world. PNG keeps transparency; everything else is
// re-encoded as JPEG to shrink it.
function fileToScaledDataURL(file, maxDim, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale)), h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const png = /\.png$/i.test(file.name || "");
      try { cb(canvas.toDataURL(png ? "image/png" : "image/jpeg", 0.85)); } catch { cb(null); }
    };
    img.onerror = () => cb(null);
    img.src = reader.result;
  };
  reader.onerror = () => cb(null);
  reader.readAsDataURL(file);
}

function MapTab() {
  const [state, persist] = useSharedList("session_combat");
  const [chars] = useSharedList("characters_v2");
  const [npcs] = useSharedList("npcs_v2");
  const [mapState, persistMap] = useSharedList("session_map");   // backdrop, kept apart from tokens so drags don't rewrite it
  const [selId, setSelId] = useState(null);
  const [dragPos, setDragPos] = useState(null);   // {id, x, y} live drag position
  const svgRef = useRef(null);
  const fileRef = useRef(null);
  if (state === null) return <LoadingBlock />;
  const map = (mapState && mapState[0]) || {};
  const bg = map.img || null;
  const bgFit = map.fit || "contain";
  const bgOpacity = map.opacity != null ? map.opacity : 0.65;
  const onPickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    fileToScaledDataURL(f, 2000, (url) => { if (url) persistMap([{ ...map, img: url, opacity: bgOpacity, fit: bgFit }]); });
  };
  const data = (state && state[0]) || { round: 1, turn: 0, combatants: [] };
  const combatants = data.combatants || [];
  // A token reflects the linked fighter's active form: its aura colors the token,
  // and gigantification (Great Ape and the like) grows it.
  const srcOf = (c) => { if (!c.sourceId) return null; const list = c.sourceType === "player" ? (chars || []) : (npcs || []); return list.find(e => e.id === c.sourceId) || null; };
  const tokenInfo = (c) => {
    const src = srcOf(c);
    const forms = src ? activeForms(src) : [];
    const form = forms[0] || null;
    const giga = forms.reduce((s, f) => s + (Number(f.giga) || 0), 0);
    return { form, giga, color: form && form.auraColor ? form.auraColor : (c.sourceType === "player" ? COLORS.blue : c.sourceType === "npc" ? COLORS.red : COLORS.muted) };
  };
  const save = (patch) => persist([{ ...data, ...patch }]);
  const setPos = (id, x, y) => save({ combatants: combatants.map(c => c.id === id ? { ...c, mapX: Math.max(0, Math.min(MAP_COLS - 1, x)), mapY: Math.max(0, Math.min(MAP_ROWS - 1, y)) } : c) });
  const setAlt = (id, alt) => save({ combatants: combatants.map(c => c.id === id ? { ...c, alt: Math.max(0, alt) } : c) });
  const posOf = (c, i) => (dragPos && dragPos.id === c.id) ? { x: dragPos.x, y: dragPos.y }
    : { x: c.mapX != null ? c.mapX : (1 + (i % (MAP_COLS - 2))), y: c.mapY != null ? c.mapY : (1 + Math.floor(i / (MAP_COLS - 2))) };
  const cellFromEvent = (e) => { const r = svgRef.current.getBoundingClientRect(); return { x: Math.max(0, Math.min(MAP_COLS - 1, Math.floor((e.clientX - r.left) / MAP_CELL))), y: Math.max(0, Math.min(MAP_ROWS - 1, Math.floor((e.clientY - r.top) / MAP_CELL))) }; };
  const onMove = (e) => { if (dragPos) { const p = cellFromEvent(e); setDragPos({ id: dragPos.id, ...p }); } };
  const onUp = () => { if (dragPos) { setPos(dragPos.id, dragPos.x, dragPos.y); setDragPos(null); } };
  const sel = combatants.find(c => c.id === selId);
  const W = MAP_COLS * MAP_CELL, H = MAP_ROWS * MAP_CELL;
  const tokColor = (c) => c.sourceType === "player" ? COLORS.blue : c.sourceType === "npc" ? COLORS.red : COLORS.muted;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onPickFile} />
        <Btn size="sm" onClick={() => fileRef.current && fileRef.current.click()}><Upload size={13} /> {bg ? "Replace map" : "Import map image"}</Btn>
        {bg && (<>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Fit</span>
          <Select value={bgFit} onChange={e => persistMap([{ ...map, fit: e.target.value }])} style={{ width: 100 }}>
            <option value="contain">Fit</option>
            <option value="cover">Fill</option>
            <option value="stretch">Stretch</option>
          </Select>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Opacity</span>
          <input type="range" min="20" max="100" value={Math.round(bgOpacity * 100)} onChange={e => persistMap([{ ...map, opacity: (+e.target.value) / 100 }])} style={{ width: 90 }} />
          <Btn size="sm" variant="ghost" onClick={() => persistMap([{ ...map, img: null }])}><X size={13} /> Remove</Btn>
        </>)}
        <span style={{ fontSize: 11, color: COLORS.dim }}>Export your map from World Anvil, then import the image here.</span>
      </div>
      <div style={{ overflowX: "auto", border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.panel2, marginBottom: 12 }}>
        <svg ref={svgRef} width={W} height={H} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} style={{ display: "block", userSelect: "none" }}>
          {bg && <image href={bg} x={0} y={0} width={W} height={H} preserveAspectRatio={bgFit === "stretch" ? "none" : bgFit === "cover" ? "xMidYMid slice" : "xMidYMid meet"} opacity={bgOpacity} style={{ pointerEvents: "none" }} />}
          {Array.from({ length: MAP_COLS + 1 }).map((_, i) => <line key={"v" + i} x1={i * MAP_CELL} y1={0} x2={i * MAP_CELL} y2={H} stroke={COLORS.border} strokeWidth={0.5} strokeOpacity={bg ? 0.35 : 1} />)}
          {Array.from({ length: MAP_ROWS + 1 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * MAP_CELL} x2={W} y2={i * MAP_CELL} stroke={COLORS.border} strokeWidth={0.5} strokeOpacity={bg ? 0.35 : 1} />)}
          {combatants.map((c, i) => {
            const p = posOf(c, i); const cx = p.x * MAP_CELL + MAP_CELL / 2, cy = p.y * MAP_CELL + MAP_CELL / 2;
            const { form, giga, color } = tokenInfo(c); const alt = c.alt || 0; const on = c.id === selId;
            const r = Math.min((MAP_CELL / 2 - 5) + giga * MAP_CELL * 0.5, MAP_CELL * 2.2);
            const fs = Math.min(10 + giga * 2, 20);
            return (
              <g key={c.id} onMouseDown={(e) => { e.preventDefault(); setSelId(c.id); setDragPos({ id: c.id, x: p.x, y: p.y }); }} style={{ cursor: "grab" }}>
                {alt > 0 && <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={color} strokeWidth={1} strokeDasharray="2 2" opacity={0.6} />}
                <circle cx={cx} cy={cy} r={r} fill={color} stroke={on ? COLORS.gold : "#0b0e17"} strokeWidth={on ? 2.5 : 1.5} />
                <text x={cx} y={cy + fs / 3} textAnchor="middle" fontSize={fs} fontWeight="700" fill="#0b0e17">{(c.name || "?").slice(0, 2)}</text>
                {alt > 0 && <text x={cx} y={cy - r - 3} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">↑{alt}</text>}
                {form && <text x={cx} y={cy + r + 11} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">{form.name}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      {sel ? (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700 }}>{sel.name}</span>
          <Tag color={tokColor(sel)}>{sel.sourceType || "token"}</Tag>
          {(() => { const ti = tokenInfo(sel); return (<>
            {ti.form && <Tag color={ti.color}>{ti.form.name}</Tag>}
            {ti.giga > 0 && <Tag color={COLORS.amber}>Giant +{ti.giga}</Tag>}
          </>); })()}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Altitude</span>
            <button onClick={() => setAlt(sel.id, (sel.alt || 0) - 1)} style={miniBtnStyle}><Minus size={13} /></button>
            <TextInput type="number" value={sel.alt || 0} onChange={e => setAlt(sel.id, +e.target.value || 0)} style={{ width: 56, textAlign: "center" }} />
            <button onClick={() => setAlt(sel.id, (sel.alt || 0) + 1)} style={miniBtnStyle}><Plus size={13} /></button>
          </div>
          <Btn size="sm" variant="ghost" onClick={() => setSelId(null)}>Deselect</Btn>
        </div>
      ) : (
        <div style={{ fontSize: 12, color: COLORS.dim }}>{combatants.length ? "Drag a token to move it on the ground. Click a token to set its altitude for flight." : "Add fighters in the Initiative tab and they appear here as tokens."}</div>
      )}
    </div>
  );
}

// A slide out battle map. The side arrow is a fixed pull tab shown across
// Players, NPCs and Session so the board is one click away from anywhere.
function MapDrawer() {
  const [ui, setUi] = useLocalOption("sdndbz_map_drawer", { open: false });
  const open = ui.open;
  const width = 760;
  return (
    <>
      <button onClick={() => setUi({ open: !open })} title="Battle map"
        style={{ position: "fixed", top: "50%", right: open ? width : 0, transform: "translateY(-50%)", zIndex: 60, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRight: "none", borderRadius: "10px 0 0 10px", color: COLORS.gold, cursor: "pointer", padding: "16px 7px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "right .25s ease", maxWidth: "8vw" }}>
        {open ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        <span style={{ writingMode: "vertical-rl", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>MAP</span>
      </button>
      <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width, maxWidth: "94vw", background: COLORS.bg, borderLeft: `1px solid ${COLORS.border}`, zIndex: 59, transform: `translateX(${open ? 0 : 100}%)`, transition: "transform .25s ease", boxShadow: open ? "-10px 0 34px rgba(0,0,0,.45)" : "none", overflowY: "auto", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 16, color: COLORS.gold, letterSpacing: 1 }}>BATTLE MAP</span>
          <Btn size="sm" variant="ghost" onClick={() => setUi({ open: false })}><X size={16} /></Btn>
        </div>
        {open && <MapTab />}
      </div>
    </>
  );
}

function SessionTab() {
  const [sub, setSub] = useState("initiative");
  const [houseRules] = useHouseRules();
  return (
    <div>
      <ScannerHeader title="SESSION" subtitle="Live play state, shared with the table in real time." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
        {[["initiative","Initiative"],["rolls","Rolls"],...(houseRules.quickCombat?[["quickcombat","Quick Combat"]]:[]),["environment","Environment"],["time","Calendar"],["details","Session Details"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "initiative" && <InitiativeTab />}
      {sub === "quickcombat" && <QuickCombatTab />}
      {sub === "rolls" && <RollsTab />}
      {sub === "time" && <SessionTimeTab />}
      {sub === "environment" && <EnvironmentTab />}
      {sub === "details" && <SessionDetailsTab />}
      <SessionFeed />
    </div>
  );
}

/* ============================== TABLES ============================== */
function BookTableCard({ table }) {
  const [result, setResult] = useState(null);
  const doRoll = () => {
    const n = roll(20);
    const row = table.rows.find(r => {
      if (r.range.includes("-")) { const [a,b] = r.range.split("-").map(Number); return n >= a && n <= b; }
      return Number(r.range) === n;
    });
    setResult({ n, row });
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700 }}>{table.name}</div>
          <div style={{ color: COLORS.dim, fontSize: 11.5 }}>{table.die} · {table.source}</div>
        </div>
        <Btn variant="gold" size="sm" onClick={doRoll}><Dices size={13}/> Roll</Btn>
      </div>
      {result && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace", marginBottom: 4 }}>Rolled {result.n}</div>
          <div style={{ fontSize: 13 }}>{result.row?.result || "No matching row."}</div>
        </div>
      )}
      <details><summary style={{ cursor: "pointer", color: COLORS.muted, fontSize: 12 }}>View full table</summary>
        <div style={{ marginTop: 8 }}>
          {table.rows.map((r,i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, padding: "5px 0", borderBottom: i<table.rows.length-1?`1px solid ${COLORS.border}`:"none" }}>
              <div style={{ width: 44, flexShrink: 0, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{r.range}</div>
              <div style={{ color: COLORS.muted }}>{r.result}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function NameTableCard() {
  const [result, setResult] = useState(null);
  const doRoll = () => setResult(`${pick(NPC_POOLS.first)} ${Math.random()>0.4?pick(NPC_POOLS.last):""}`.trim());
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div><div style={{ fontWeight: 700 }}>NPC Name Generator</div><div style={{ color: COLORS.dim, fontSize: 11.5 }}>GM Toolkit</div></div>
        <Btn variant="gold" size="sm" onClick={doRoll}><Dices size={13}/> Roll</Btn>
      </div>
      {result && <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 700 }}>{result}</div>}
    </div>
  );
}
function FlavorTableCard({ title, pool }) {
  const [result, setResult] = useState(null);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div><div style={{ fontWeight: 700 }}>{title}</div><div style={{ color: COLORS.dim, fontSize: 11.5 }}>GM Toolkit</div></div>
        <Btn variant="gold" size="sm" onClick={() => setResult(pick(pool))}><Dices size={13}/> Roll</Btn>
      </div>
      {result && <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 8, padding: 10, fontSize: 13 }}>{result}</div>}
    </div>
  );
}

const blankCustomTable = () => ({ id: uid(), name: "New Table", die: "1d20", rows: [] });

function CustomTablesTab() {
  const [tables, persist, error] = useSharedList("custom_tables");
  const [openId, setOpenId] = useState(null);
  const fileRef = useRef();
  if (tables === null) return <LoadingBlock />;
  const add = () => { const t = blankCustomTable(); persist([...tables, t]); setOpenId(t.id); };
  const update = (id, patch) => persist(tables.map(t => t.id===id?{...t,...patch}:t));
  const remove = (id) => { persist(tables.filter(t => t.id!==id)); setOpenId(null); };
  const open = tables.find(t => t.id === openId);

  const importFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const data = JSON.parse(reader.result); persist([...tables, { ...blankCustomTable(), ...data, id: uid() }]); } catch { alert("Couldn't read that file."); } };
    reader.readAsText(f);
  };

  if (open) {
    const addRow = () => update(open.id, { rows: [...open.rows, { range: String(open.rows.length+1), result: "" }] });
    const updateRow = (i, patch) => update(open.id, { rows: open.rows.map((r,j) => j===i?{...r,...patch}:r) });
    const removeRow = (i) => update(open.id, { rows: open.rows.filter((_,j) => j!==i) });
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <TextInput value={open.name} onChange={e => update(open.id, { name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 16, background: "transparent", border: "none", maxWidth: 260 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant="blue" onClick={() => downloadJSON(open, `${open.name.replace(/\s+/g,'_')}.json`)}><Download size={13}/></Btn>
            <Btn size="sm" variant="danger" onClick={() => remove(open.id)}><Trash2 size={13}/></Btn>
            <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
          </div>
        </div>
        <Field label="Die"><TextInput value={open.die} onChange={e => update(open.id, { die: e.target.value })} style={{ maxWidth: 120 }} /></Field>
        {open.rows.map((r,i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <TextInput value={r.range} onChange={e => updateRow(i, { range: e.target.value })} style={{ width: 70 }} placeholder="1-3" />
            <TextInput value={r.result} onChange={e => updateRow(i, { result: e.target.value })} placeholder="Result text..." />
            <Btn size="sm" variant="ghost" onClick={() => removeRow(i)}><Trash2 size={13} color={COLORS.red}/></Btn>
          </div>
        ))}
        <Btn size="sm" onClick={addRow}><Plus size={13}/> Add Row</Btn>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Btn variant="gold" onClick={add}><Plus size={14}/> New Table</Btn>
        <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importFile} />
        <Btn onClick={() => fileRef.current.click()}><Upload size={14}/> Import</Btn>
      </div>
      {tables.length === 0 ? (
        <EmptyState icon={Table2} title="No custom tables yet" body="Build your own, or import one someone shared with you." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
          {tables.map(t => (
            <div key={t.id} onClick={() => setOpenId(t.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div style={{ color: COLORS.dim, fontSize: 11.5 }}>{t.die} · {t.rows.length} rows</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DowntimeTab() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Downtime Activities</div>
        <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 12 }}>Spend Downtime Points your DM awards between sessions.</div>
        {DOWNTIME_ACTIVITIES.map((a, i) => (
          <div key={i} onClick={() => setOpenIdx(openIdx===i?null:i)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>{a.name}</div>
              <Tag color={COLORS.gold}>{a.cost} DP</Tag>
            </div>
            {openIdx === i && <div style={{ color: COLORS.muted, fontSize: 12.5, marginTop: 8, lineHeight: 1.5 }}>{a.desc}</div>}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Training Arcs</div>
        {TRAINING_ARC_STYLES.map((t, i) => (
          <div key={i} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4 }}>{t.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12.5, lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {MAX_TRAINING_BOONS_PER_RANK.map(r => <Tag key={r.rank} color={COLORS.blue}>Ki Rank {r.rank}: max {r.max} Boons</Tag>)}
        </div>
      </div>

      <div>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Spending Training Boons</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
          {TRAINING_BOON_SPENDS.map((s, i) => (
            <div key={i} style={{ fontSize: 12.5, color: COLORS.text, padding: "5px 0", borderBottom: i<TRAINING_BOON_SPENDS.length-1?`1px solid ${COLORS.border}`:"none" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GamblingTab() {
  const [selected, setSelected] = useState(null);
  const [stake, setStake] = useState(50);
  const [result, setResult] = useState(null);

  const play = (game) => {
    if (game.name === "Dice Clash") {
      const player = roll(6) + roll(6);
      const house = roll(6) + roll(6) + 2;
      if (player > house) setResult({ text: `You rolled ${player} vs house's ${house}. You win ${stake*2} Ƶeni!`, win: true });
      else if (player === house) setResult({ text: `Tie at ${player}. Stake returned.`, win: null });
      else setResult({ text: `You rolled ${player} vs house's ${house}. You lose your ${stake} Ƶeni.`, win: false });
    } else if (game.name === "Ki Pull Machines") {
      const r = roll(20);
      if (r >= 22) setResult({ text: `Rolled ${r}. Jackpot! ${stake*2} Ƶeni plus a bonus Common item roll.`, win: true });
      else if (r >= 12) setResult({ text: `Rolled ${r}. Hit! You win ${stake*2} Ƶeni.`, win: true });
      else setResult({ text: `Rolled ${r}. No luck this pull.`, win: false });
    } else {
      const r = roll(20);
      if (r === 20) setResult({ text: `Natural 20! You win ${stake*3} Ƶeni.`, win: true });
      else if (r >= 14) setResult({ text: `Rolled ${r} vs DC 14. You win ${stake*2} Ƶeni.`, win: true });
      else setResult({ text: `Rolled ${r} vs DC 14. You lose your ${stake} Ƶeni.`, win: false });
    }
  };

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 14 }}>Not in the book — built to fit the Zeni economy. Use as flavor for a night at the tables.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, marginBottom: 16 }}>
        {GAMBLING_GAMES.map((g, i) => (
          <div key={i} onClick={() => { setSelected(g); setResult(null); }} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${selected===g?COLORS.gold:COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{g.name}</div>
            <div style={{ color: COLORS.dim, fontSize: 11, marginBottom: 6 }}>Stake: {g.stake}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.4 }}>{g.desc}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{selected.name}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: COLORS.muted }}>Stake (Ƶeni):</span>
            <TextInput type="number" value={stake} onChange={e => setStake(+e.target.value)} style={{ width: 100 }} />
            <Btn variant="gold" onClick={() => play(selected)}><Dices size={14}/> Play</Btn>
          </div>
          {result && (
            <div style={{ background: COLORS.panel2, border: `1px solid ${result.win===true?COLORS.green+"55":result.win===false?COLORS.red+"55":COLORS.border}`, borderRadius: 8, padding: 12, fontSize: 13, color: result.win===true?COLORS.green:result.win===false?COLORS.red:COLORS.text }}>{result.text}</div>
          )}
        </div>
      )}
    </div>
  );
}

function BountyHuntingTab() {
  const [bounties, persist, error] = useSharedList("bounties");
  const [openId, setOpenId] = useState(null);
  if (bounties === null) return <LoadingBlock />;

  const rollBounty = (tierKey) => {
    const tier = BOUNTY_TIERS.find(t => t.key === tierKey);
    const npc = scaledNpc({ species: pick(NPC_POOLS.species), role: pick(NPC_POOLS.role), tierKey: tier.npcTier });
    const bounty = {
      id: uid(), tier: tier.label, target: npc.name, reward: tier.reward,
      status: "open", lastKnown: pick(NPC_POOLS.planet), notes: npc.hook,
    };
    persist([bounty, ...bounties]);
  };
  const setStatus = (id, status) => persist(bounties.map(b => b.id===id?{...b,status}:b));
  const remove = (id) => { persist(bounties.filter(b => b.id!==id)); setOpenId(null); };

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 14 }}>Not in the book — designed to fit. Reward scales with target tier; claim or fail a bounty to track your table's board.</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {BOUNTY_TIERS.map(t => <Btn key={t.key} variant="gold" size="sm" onClick={() => rollBounty(t.key)}><Plus size={12}/> {t.label} ({t.reward})</Btn>)}
      </div>
      {error && <ErrorBanner text={error} />}
      {bounties.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No bounties posted" body="Roll a new bounty at any tier above to populate the board." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {bounties.map(b => (
            <div key={b.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{b.target}</div>
                  <div style={{ color: COLORS.muted, fontSize: 11.5, marginTop: 2 }}>{b.tier} · Last seen: {b.lastKnown}</div>
                  <div style={{ color: COLORS.dim, fontSize: 11.5, marginTop: 2, fontStyle: "italic" }}>{b.notes}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Tag color={b.status==="open"?COLORS.gold:b.status==="claimed"?COLORS.green:COLORS.red}>{b.status}</Tag>
                  <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{b.reward}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {b.status !== "claimed" && <Btn size="sm" variant="blue" onClick={() => setStatus(b.id, "claimed")}>Mark Claimed</Btn>}
                {b.status !== "failed" && <Btn size="sm" onClick={() => setStatus(b.id, "failed")}>Mark Failed</Btn>}
                {b.status !== "open" && <Btn size="sm" onClick={() => setStatus(b.id, "open")}>Reopen</Btn>}
                <Btn size="sm" variant="danger" onClick={() => remove(b.id)}><Trash2 size={12}/></Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function TablesScreen() {
  const [sub, setSub] = useState("book");
  return (
    <div>
      <ScannerHeader title="TABLES" subtitle="Book tables, downtime & training, gambling, bounties, and your own custom rolls." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {[["book","Book Tables"],["downtime","Downtime & Training"],["gambling","Gambling"],["bounty","Bounty Hunting"],["gm","GM Toolkit"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "book" && BOOK_TABLES.map(t => <BookTableCard key={t.id} table={t} />)}
      {sub === "downtime" && <DowntimeTab />}
      {sub === "gambling" && <GamblingTab />}
      {sub === "bounty" && <BountyHuntingTab />}
      {sub === "gm" && (
        <>
          <NameTableCard />
          <FlavorTableCard title="Homeworld / Planet Flavor" pool={NPC_POOLS.planet} />
          <FlavorTableCard title="NPC Role / Archetype" pool={NPC_POOLS.role} />
          <FlavorTableCard title="Plot Hook" pool={NPC_POOLS.hook} />
        </>
      )}
      {sub === "custom" && <CustomTablesTab />}
    </div>
  );
}

/* ===================== WORLD & RULES REGISTRY (Compendium overhaul, Phase 1) =====================
   The editable, effect bearing data layer. Book datasets (planet classes, star
   traits, hazards, terrains) become entries the table can edit, enable or disable,
   rarity weight, and attach effect hooks to. DM edits directly; players propose an
   addition and the DM approves or declines. Consumers wire in during later phases. */

// Rarity as named tiers (reuses the first four RARITY_TIERS) mapped to generation
// weights. Higher weight = shows up more often when a galaxy is generated.
const REG_RARITY_TIERS = [
  ...RARITY_TIERS.slice(0, 4),   // Common, Uncommon, Rare, Very Rare
  { key: "unique", label: "Unique", color: COLORS.gold, unique: true },   // capped count, not weight based
];
const regRarityInfo = (k) => REG_RARITY_TIERS.find(r => r.key === k) || REG_RARITY_TIERS[0];
// Generation weights per tier. Unique gets a low weight so it can appear, but its
// total count is hard-capped by the entry's uniqueCount (see pickReg).
const RARITY_WEIGHT = { common: 8, uncommon: 4, rare: 2, veryrare: 1, unique: 1 };
const rarityWeight = (k) => RARITY_WEIGHT[k] != null ? RARITY_WEIGHT[k] : RARITY_WEIGHT.common;

// Effect hook framework (framework first, per the plan). Each type is data that
// drives the author time picker and, in Phase 3, the applier. Adding a type here
// is all it takes to offer it in the editor.
const HOOK_TYPES = [
  { type: "saveHazard", label: "Survival save", color: COLORS.red,
    params: [
      { key: "ability", kind: "stat", label: "Save" },
      { key: "baseDC", kind: "num", label: "DC", def: 10 },
      { key: "perHour", kind: "num", label: "DC per hour", def: 0 },
      { key: "onFail", kind: "text", label: "On fail", def: "1 level of Exhaustion" },
    ],
    summary: (h) => `${String(h.ability || "con").toUpperCase()} save DC ${h.baseDC != null ? h.baseDC : 10}${h.perHour ? ` (+${h.perHour} per hour)` : ""}` },
  { type: "flatPenalty", label: "Flat modifier", color: COLORS.amber,
    params: [
      { key: "to", kind: "select", label: "Applies to", options: ["attacks", "saves", "checks", "ac", "all d20"], def: "attacks" },
      { key: "amount", kind: "num", label: "Amount", def: -2 },
    ],
    summary: (h) => `${(h.amount != null ? h.amount : 0) >= 0 ? "+" : ""}${h.amount != null ? h.amount : 0} to ${h.to || "attacks"}` },
  { type: "kiField", label: "Ki field", color: COLORS.blue,
    params: [
      { key: "mode", kind: "select", label: "Affects", options: ["ki cost", "ki regen", "overload"], def: "ki cost" },
      { key: "mult", kind: "num", label: "Multiplier", def: 1.5 },
    ],
    summary: (h) => `${h.mode || "ki cost"} x${h.mult != null ? h.mult : 1}` },
  { type: "dmgPerTurn", label: "Damage per turn", color: COLORS.red,
    params: [{ key: "formula", kind: "text", label: "Damage", def: "1d4" }],
    summary: (h) => `${h.formula || "1d4"} damage per turn` },
  { type: "weightedRanks", label: "Weighted ranks", color: COLORS.purple,
    params: [{ key: "ranks", kind: "num", label: "Ranks (positive Light, negative Heavy)", def: -1 }],
    summary: (h) => `Weighted ${(h.ranks != null ? h.ranks : 0) >= 0 ? `Light ${h.ranks != null ? h.ranks : 0}` : `Heavy ${-(h.ranks)}`}` },
  { type: "movementMod", label: "Movement", color: COLORS.green,
    params: [{ key: "feet", kind: "num", label: "Feet", def: -10 }],
    summary: (h) => `${(h.feet != null ? h.feet : 0) >= 0 ? "+" : ""}${h.feet != null ? h.feet : 0} ft speed` },
  { type: "effectCondition", label: "Combat effects", color: COLORS.blue,
    params: [{ key: "effects", kind: "lines", label: "Effects, one per line", def: [] }],
    summary: (h) => { const n = (h.effects || []).filter(Boolean).length; return `${n} combat effect${n === 1 ? "" : "s"}`; } },
];
const hookType = (t) => HOOK_TYPES.find(x => x.type === t);
const hookSummary = (h) => { const t = hookType(h.type); return t ? t.summary(h) : h.type; };
const blankHook = (type) => { const t = hookType(type); const h = { type }; (t.params || []).forEach(p => { h[p.key] = p.def != null ? p.def : (p.kind === "num" ? 0 : p.kind === "lines" ? [] : ""); }); return h; };

// The datasets exposed in World & Rules. base() reads lazily so it can point at
// arrays defined later in the file. id / name / desc adapt each dataset's shape.
// DM quick-builder data: objectives that frame a war, and enemy warband templates.
// Rosters use "Role xN" or "Role xN-M" lines; the builder rolls the ranges.
const WAR_GOALS = [
  { id: "conquest", name: "Total Conquest", desc: "Seize the world and everything on it. Nothing short of full control will do.", rarity: "common" },
  { id: "subjugate", name: "Subjugation", desc: "Break their will and force vassalage. Leave the infrastructure standing.", rarity: "common" },
  { id: "plunder", name: "Plunder & Withdraw", desc: "Strip the world of resources, Ki-crystals and wealth, then pull out before relief arrives.", rarity: "common" },
  { id: "liberation", name: "Liberation", desc: "Free the world from an occupier. Win the population, not just the battlefield.", rarity: "common" },
  { id: "defense", name: "Hold the Line", desc: "Repel the invasion. Survive until relief comes or the enemy breaks.", rarity: "common" },
  { id: "capture", name: "Capture the Prize", desc: "A person, an artifact, or a Dragon Ball. The war is a means to seize one thing.", rarity: "uncommon" },
  { id: "extermination", name: "Extermination", desc: "Wipe out a bloodline, species, or faction entirely. A campaign of annihilation.", rarity: "uncommon" },
  { id: "proxy", name: "Proxy War", desc: "Neither patron wants open war. Fight through deniable forces for a hidden aim.", rarity: "uncommon" },
  { id: "vengeance", name: "Vengeance", desc: "This is personal. A past wrong drives the whole campaign, reason be damned.", rarity: "uncommon" },
  { id: "decapitate", name: "Decapitation Strike", desc: "Ignore the army. Cut straight to the leader and end it in one blow.", rarity: "rare" },
];
const RAID_PARTIES = [
  { id: "frieza-patrol", name: "Frieza Force Patrol", desc: "A standard occupation squad sweeping for resistance.", rarity: "common", roster: "Squad Captain x1\nFoot Soldier x3-5\nScouter Sniper x1-2" },
  { id: "bandits", name: "Space Bandits", desc: "Opportunistic raiders after loot and Zeni.", rarity: "common", roster: "Bandit Leader x1\nBrawler x2-4\nSlicer x1-3" },
  { id: "beasts", name: "Feral Pack", desc: "Wild beastmen or monsters driven from their den.", rarity: "common", roster: "Alpha x1\nPack Beast x3-6" },
  { id: "patrol-gp", name: "Galactic Patrol Detachment", desc: "Lawmen answering a distress call.", rarity: "common", roster: "Patrol Officer x1\nDeputy x2-4" },
  { id: "redribbon", name: "Red Ribbon Strike Team", desc: "Disciplined androids and soldiers on a mission.", rarity: "uncommon", roster: "Field Commander x1\nAssault Android x2\nRifleman x2-4" },
  { id: "cult", name: "Demon Cult Warband", desc: "Fanatics channeling dark Ki for their master.", rarity: "uncommon", roster: "Dark Priest x1\nCultist x3-5\nSummoned Fiend x0-2" },
  { id: "mercs", name: "Mercenary Company", desc: "Guns for hire, well-equipped and coordinated.", rarity: "uncommon", roster: "Captain x1\nVeteran x2-3\nGrunt x3-5\nMedic x0-1" },
  { id: "saiyan", name: "Saiyan Raid Squad", desc: "A handful of Saiyans razing a world for the Empire.", rarity: "rare", roster: "Elite Saiyan x1\nSaiyan Warrior x2-3" },
];

// Fighting Styles: a swappable, effect-bearing stance a fighter equips (one at a
// time). Seeded with book-flavored styles; the table can edit these or add their
// own (e.g. Majin Style, which is homebrew — not in the rulebook). Effects run
// through the same HOOK_TYPES engine as everything else.
const STYLES_DATA = [
  { id: "tiger",   name: "Tiger Style",   rarity: "common",   effect: { text: "Ferocious forward pressure — all offense.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }] } },
  { id: "crane",   name: "Crane Style",   rarity: "common",   effect: { text: "Poised and defensive; strike from stillness.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }] } },
  { id: "snake",   name: "Snake Style",   rarity: "common",   effect: { text: "Precise strikes to the vitals.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }, { type: "flatPenalty", to: "checks", amount: 1 }] } },
  { id: "turtle",  name: "Turtle Style",  rarity: "common",   effect: { text: "Immovable defense; patience over speed.", hooks: [{ type: "flatPenalty", to: "ac", amount: 2 }, { type: "movementMod", feet: -10 }] } },
  { id: "wolf",    name: "Wolf Style",    rarity: "common",   effect: { text: "Relentless pack pursuit; run the foe down.", hooks: [{ type: "movementMod", feet: 10 }] } },
  { id: "monkey",  name: "Monkey Style",  rarity: "common",   effect: { text: "Erratic and acrobatic; hard to pin down.", hooks: [{ type: "movementMod", feet: 10 }, { type: "flatPenalty", to: "ac", amount: 1 }] } },
  { id: "leopard", name: "Leopard Style", rarity: "common",   effect: { text: "Blinding speed and first-strike bursts.", hooks: [{ type: "movementMod", feet: 15 }] } },
  { id: "dragon",  name: "Dragon Style",  rarity: "uncommon", effect: { text: "Overwhelming power flows through every blow.", hooks: [{ type: "weightedRanks", ranks: 1 }] } },
  { id: "taekwondo", name: "Taekwondo",   rarity: "common",   effect: { text: "Devastating kicks with reach.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }] } },
  { id: "judo",    name: "Judo",          rarity: "common",   effect: { text: "Leverage and throws; own the grapple.", hooks: [{ type: "flatPenalty", to: "checks", amount: 2 }] } },
  { id: "calm-heart", name: "Calm Heart (Instinctual)", rarity: "rare", effect: { text: "Ultra Instinct's defense: the body reacts on its own.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }, { type: "flatPenalty", to: "saves", amount: 1 }, { type: "movementMod", feet: 20 }] } },
  { id: "righteous-heart", name: "Righteous Heart (Instinctual)", rarity: "rare", effect: { text: "Ultra Instinct's offense: emotion sharpened into force.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 2 }, { type: "movementMod", feet: 20 }] } },
  { id: "majin",   name: "Majin Style",   rarity: "uncommon", effect: { text: "Homebrew: an elastic Majin body that bends and rebounds.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }, { type: "weightedRanks", ranks: 1 }] } },
];

const REGISTRY_CATS = [
  { key: "planets",    label: "Planet Classes", group: "Worlds",        icon: Globe2,   color: COLORS.green, base: () => PLANET_CLASSES,  id: (i) => i.name, name: (i) => i.name, desc: (i) => `Gravity ${i.g[0]} to ${i.g[1]} times g · ${i.hab}` },
  { key: "terrains",   label: "Terrains",       group: "Worlds",        icon: MapPin,   color: COLORS.blue,  base: () => TERRAIN_PRESETS, id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.note },
  { key: "weather",    label: "Weather",        group: "Worlds",        icon: Cloud,    color: COLORS.blue,  base: () => WEATHER_DATA,    id: (i) => i.id,   name: (i) => i.name, desc: (i) => weatherSlotsLabel(i),
    extraFields: [{ key: "climateTag", label: "Custom weather: which climate or planet class it occurs on (e.g. cold, Frozen)", kind: "text" }] },
  { key: "startraits", label: "Star Traits",    group: "Cosmic",        icon: Sparkles, color: COLORS.amber, base: () => STAR_TRAITS,     id: (i) => i.name, name: (i) => i.name, desc: (i) => i.desc },
  { key: "hazards",    label: "Hazards",        group: "Environmental", icon: Flame,    color: COLORS.red,   base: () => ENV_HAZARDS,     id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.cond,
    extraFields: [{ key: "weatherMatch", label: "Auto trigger on weather keywords (comma separated)", kind: "text" }] },
  { key: "races",      label: "Races",          group: "Peoples",       icon: Users,    color: COLORS.purple, base: () => SPECIES_DATA,   id: (i) => i.name, name: (i) => i.name, desc: (i) => i.description || i.category || "" },
  { key: "styles",     label: "Fighting Styles", group: "Combat",       icon: Swords,   color: COLORS.red,   base: () => STYLES_DATA,     id: (i) => i.id,   name: (i) => i.name, desc: (i) => (i.effect && i.effect.text) || "" },
  { key: "wargoals",   label: "War Goals",      group: "DM Builders",   icon: Swords,   color: COLORS.red,   base: () => WAR_GOALS,       id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.desc },
  { key: "raidparties", label: "Raid Parties",  group: "DM Builders",   icon: Crosshair, color: COLORS.amber, base: () => RAID_PARTIES,   id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.desc,
    extraFields: [{ key: "roster", label: "Roster (one 'Role xN' or 'Role xN-M' per line)", kind: "textarea" }] },
];
const REGISTRY_GROUPS = ["Worlds", "Cosmic", "Environmental", "Peoples", "Combat", "DM Builders"];
const regCat = (k) => REGISTRY_CATS.find(c => c.key === k);

// Mirror of the enabled entries per category, so the pure galaxy generator can
// respect enable/disable, rarity and Unique caps. Kept fresh by useRegistryMirror.
let CURRENT_REG = {};
function useRegistryMirror() {
  const planets = useRegistry("planets");
  const races = useRegistry("races");
  const startraits = useRegistry("startraits");
  const weather = useRegistry("weather");
  const styles = useRegistry("styles");
  CURRENT_REG = {
    planets: planets.loading ? null : planets.entries.filter(e => e.enabled),
    races: races.loading ? null : races.entries.filter(e => e.enabled),
    startraits: startraits.loading ? null : startraits.entries.filter(e => e.enabled),
    weather: weather.loading ? null : weather.entries.filter(e => e.enabled),
    styles: styles.loading ? null : styles.entries,   // keep all so an equipped-but-disabled style still resolves
  };
}
// A fighter's equipped Fighting Style and its effect hooks (applied only to them).
const charStyleEntry = (char) => (char && char.styleId && CURRENT_REG && CURRENT_REG.styles) ? CURRENT_REG.styles.find(s => s._id === char.styleId) : null;
const charStyleHooks = (char) => { const s = charStyleEntry(char); return (s && s.effect && s.effect.hooks) || []; };
const styleFlatMod = (char, kind) => charStyleHooks(char).filter(h => h.type === "flatPenalty" && (h.to === kind || h.to === "all d20")).reduce((s, h) => s + (+h.amount || 0), 0);
const styleWeightedRanks = (char) => charStyleHooks(char).filter(h => h.type === "weightedRanks").reduce((s, h) => s + (+h.ranks || 0), 0);
const styleMoveMod = (char) => charStyleHooks(char).filter(h => h.type === "movementMod").reduce((s, h) => s + (+h.feet || 0), 0);
// Pick a registry entry weighted by rarity, skipping disabled (already filtered
// out of the mirror) and respecting the Unique cap via a per-generation `used`
// counter keyed by category+id. Falls back to a plain array when no registry.
function pickReg(catKey, used, fallback) {
  const pool = (CURRENT_REG && CURRENT_REG[catKey]) || null;
  if (!pool || !pool.length) return fallback && fallback.length ? pick(fallback) : null;
  const capOk = (e) => e.rarity !== "unique" || (used[`${catKey}:${e._id}`] || 0) < (e.uniqueCount != null ? e.uniqueCount : 1);
  const avail = pool.filter(capOk);
  const list = avail.length ? avail : pool.filter(e => e.rarity !== "unique");
  if (!list.length) return fallback && fallback.length ? pick(fallback) : pool[0];
  const weights = list.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total, chosen = list[list.length - 1];
  for (let i = 0; i < list.length; i++) { r -= weights[i]; if (r <= 0) { chosen = list[i]; break; } }
  used[`${catKey}:${chosen._id}`] = (used[`${catKey}:${chosen._id}`] || 0) + 1;
  return chosen;
}
// One weighted roll from a list of entries (no cap tracking) for the DM builders.
const weightedPickEntries = (list) => {
  if (!list || !list.length) return null;
  const w = list.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const t = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * t;
  for (let i = 0; i < list.length; i++) { r -= w[i]; if (r <= 0) return list[i]; }
  return list[list.length - 1];
};

// One registry category = a book base array, plus shared overrides (edits to book
// entries keyed by id), customs (new entries), and an off list (disabled ids).
function useRegistry(key) {
  const cat = regCat(key);
  const [state, persist] = useSharedList("registry_" + key);
  const data = (state && state[0]) || { ov: {}, custom: [], off: [] };
  const ov = data.ov || {}, off = data.off || [], customs = data.custom || [];
  const mk = (raw, custom) => {
    const id = custom ? (raw._id || raw.id) : cat.id(raw);
    const merged = (!custom && ov[id]) ? { ...raw, ...ov[id] } : raw;
    return {
      ...merged, _id: id, _custom: !!custom, _edited: !custom && !!ov[id],
      _name: merged.name != null ? merged.name : cat.name(raw),
      _desc: merged.desc != null ? merged.desc : cat.desc(raw),
      enabled: !off.includes(id),
      rarity: merged.rarity || "common",
      uniqueCount: merged.uniqueCount != null ? merged.uniqueCount : 1,
      effect: merged.effect || { text: "", hooks: [] },
    };
  };
  const entries = [...cat.base().map(b => mk(b, false)), ...customs.map(c => mk(c, true))];
  const save = (patch) => persist([{ ov, custom: customs, off, ...patch }]);
  const setPatch = (id, p) => {
    const e = entries.find(x => x._id === id);
    if (e && e._custom) save({ custom: customs.map(c => (c._id || c.id) === id ? { ...c, ...p } : c) });
    else save({ ov: { ...ov, [id]: { ...(ov[id] || {}), ...p } } });
  };
  const toggleEnabled = (id) => save({ off: off.includes(id) ? off.filter(x => x !== id) : [...off, id] });
  const addCustom = (seed) => { const id = uid(); save({ custom: [...customs, { _id: id, name: seed && seed.name ? seed.name : "New " + cat.label.replace(/s$/, ""), desc: "", rarity: "common", effect: { text: "", hooks: [] }, ...(seed || {}), _id: id }] }); return id; };
  const removeEntry = (id) => { const e = entries.find(x => x._id === id); if (e && e._custom) save({ custom: customs.filter(c => (c._id || c.id) !== id), off: off.filter(x => x !== id) }); };
  const resetEntry = (id) => { const nov = { ...ov }; delete nov[id]; save({ ov: nov, off: off.filter(x => x !== id) }); };
  return { cat, loading: state === null, entries, setPatch, toggleEnabled, addCustom, removeEntry, resetEntry };
}

// Player submitted additions awaiting DM review, shared across the table.
function useProposals() { return useSharedList("registry_proposals"); }

// One editable form field for a hook parameter, keyed off its declared kind.
function HookParamField({ p, value, onChange }) {
  if (p.kind === "num") return <TextInput type="number" value={value != null && value !== "" ? value : ""} onChange={e => onChange(e.target.value === "" ? "" : +e.target.value)} title={p.label} style={{ width: 84 }} />;
  if (p.kind === "stat") return <Select value={value || "con"} onChange={e => onChange(e.target.value)} style={{ width: 84 }}>{STAT_KEYS.map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}</Select>;
  if (p.kind === "select") return <Select value={value || p.options[0]} onChange={e => onChange(e.target.value)} style={{ width: 110 }}>{p.options.map(o => <option key={o} value={o}>{o}</option>)}</Select>;
  if (p.kind === "lines") return <TextArea value={Array.isArray(value) ? value.join("\n") : (value || "")} onChange={e => onChange(e.target.value.split("\n"))} placeholder={p.label} style={{ minHeight: 44, flex: 1, minWidth: 200 }} />;
  return <TextInput value={value || ""} onChange={e => onChange(e.target.value)} placeholder={p.label} style={{ flex: 1, minWidth: 140 }} />;
}

// The effect editor shared by the entry editor and the proposal form: free text
// plus a data driven list of automatic hooks.
function EffectEditor({ effect, onChange, editable }) {
  const eff = effect || { text: "", hooks: [] };
  const hooks = eff.hooks || [];
  const setText = (t) => onChange({ ...eff, text: t });
  const setHook = (i, h) => onChange({ ...eff, hooks: hooks.map((x, j) => j === i ? h : x) });
  const addHook = (type) => onChange({ ...eff, hooks: [...hooks, blankHook(type)] });
  const removeHook = (i) => onChange({ ...eff, hooks: hooks.filter((_, j) => j !== i) });
  return (
    <div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, margin: "10px 0 5px" }}>What it does</div>
      {editable
        ? <TextArea value={eff.text || ""} onChange={e => setText(e.target.value)} placeholder="Describe the effect in plain language. Broad is fine." style={{ minHeight: 48 }} />
        : <div style={{ fontSize: 12.5, color: eff.text ? COLORS.text : COLORS.dim }}>{eff.text || "No description."}</div>}
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, margin: "12px 0 5px" }}>Automatic effects</div>
      {hooks.length === 0 && <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 6 }}>None. {editable ? "Add one below to give this a mechanical effect the app applies for you." : ""}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {hooks.map((h, i) => { const t = hookType(h.type); return (
          <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: editable ? 8 : 0, flexWrap: "wrap" }}>
              <Tag color={t ? t.color : COLORS.muted}>{t ? t.label : h.type}</Tag>
              {!editable && <span style={{ fontSize: 12 }}>{hookSummary(h)}</span>}
              {editable && <><div style={{ flex: 1 }} /><X size={13} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => removeHook(i)} /></>}
            </div>
            {editable && t && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {t.params.map(p => (
                  <label key={p.key} style={{ fontSize: 10, color: COLORS.muted, display: "flex", flexDirection: "column", gap: 3 }}>
                    {p.label}
                    <HookParamField p={p} value={h[p.key]} onChange={v => setHook(i, { ...h, [p.key]: v })} />
                  </label>
                ))}
              </div>
            )}
          </div>
        ); })}
      </div>
      {editable && (
        <Select value="" onChange={e => { if (e.target.value) addHook(e.target.value); }} style={{ marginTop: 8, width: 240 }}>
          <option value="">Add an automatic effect...</option>
          {HOOK_TYPES.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
        </Select>
      )}
    </div>
  );
}

// The World & Rules screen: a hub of registry categories, drilling into a list of
// entries and an editor. DM edits directly; players propose additions.
function WorldRulesTab() {
  const [view] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const isDM = view.mode === "dm";
  const [openCat, setOpenCat] = useState(null);
  const [proposals] = useProposals();
  const pendingBy = {};
  for (const p of (proposals || [])) pendingBy[p.cat] = (pendingBy[p.cat] || 0) + 1;
  if (openCat) return <RegistryCategoryView catKey={openCat} isDM={isDM} onBack={() => setOpenCat(null)} />;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: COLORS.muted }}>Edit the building blocks the app generates and runs on. {isDM ? "You are in DM view: your edits change the table's rules." : "You are in Player view: you can browse and propose additions for the DM to approve."}</div>
      </div>
      {REGISTRY_GROUPS.map(group => (
        <div key={group} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>{group}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {REGISTRY_CATS.filter(c => c.group === group).map(c => (
              <div key={c.key} onClick={() => setOpenCat(c.key)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, position: "relative" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = c.color + "77"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                <c.icon size={22} color={c.color} style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 700, fontSize: 13 }}>{c.label}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 2 }}>{c.base().length} entries</div>
                {isDM && pendingBy[c.key] > 0 && <span style={{ position: "absolute", top: 10, right: 10, background: COLORS.gold, color: "#0b0e17", fontSize: 10, fontWeight: 800, borderRadius: 10, padding: "1px 7px" }}>{pendingBy[c.key]}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RarityTag({ rarity, count }) {
  const r = regRarityInfo(rarity);
  return <Tag color={r.color}>{r.label}{r.unique && count ? ` x${count}` : ""}</Tag>;
}

function RegistryCategoryView({ catKey, isDM, onBack }) {
  const reg = useRegistry(catKey);
  const [proposals, persistProposals] = useProposals();
  const [openId, setOpenId] = useState(null);
  const [draft, setDraft] = useState(null);   // { name, desc, rarity, effect } for a new entry / proposal
  if (reg.loading) return <LoadingBlock />;
  const cat = reg.cat;
  const pending = (proposals || []).filter(p => p.cat === catKey);
  const approve = (p) => { reg.addCustom(p.payload); persistProposals((proposals || []).filter(x => x.id !== p.id)); };
  const decline = (p) => persistProposals((proposals || []).filter(x => x.id !== p.id));
  const startDraft = () => { const seed = { name: "", desc: "", rarity: "common", effect: { text: "", hooks: [] } }; (cat.extraFields || []).forEach(f => { seed[f.key] = ""; }); setDraft(seed); };
  const submitDraft = () => {
    if (!draft.name.trim()) return;
    if (isDM) reg.addCustom(draft);
    else persistProposals([...(proposals || []), { id: uid(), cat: catKey, entryName: draft.name.trim(), payload: draft, ts: Date.now() }]);
    setDraft(null);
  };
  const open = reg.entries.find(e => e._id === openId);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <Btn size="sm" variant="ghost" onClick={onBack}><ArrowLeft size={14} /> All categories</Btn>
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 15 }}>{cat.label}</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={startDraft}><Plus size={13} /> {isDM ? "Add entry" : "Propose entry"}</Btn>
      </div>

      {isDM && pending.length > 0 && (
        <div style={{ background: `${COLORS.gold}0E`, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Player proposals ({pending.length})</div>
          {pending.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{p.entryName}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{(p.payload && p.payload.desc) || "No description."}{p.payload && p.payload.effect && p.payload.effect.hooks && p.payload.effect.hooks.length ? ` · ${p.payload.effect.hooks.length} automatic effect(s)` : ""}</div>
              </div>
              <Btn size="sm" variant="gold" onClick={() => approve(p)}><Check size={13} /> Approve</Btn>
              <Btn size="sm" variant="ghost" onClick={() => decline(p)}><X size={13} /></Btn>
            </div>
          ))}
        </div>
      )}

      {draft && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>{isDM ? "New entry" : "Propose an addition"}</div>
          <Field label="Name"><TextInput value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="Name" /></Field>
          <Field label="Description"><TextArea value={draft.desc} onChange={e => setDraft({ ...draft, desc: e.target.value })} placeholder="What is it?" style={{ minHeight: 44 }} /></Field>
          <Field label="Rarity"><Select value={draft.rarity} onChange={e => setDraft({ ...draft, rarity: e.target.value })} style={{ width: 160 }}>{REG_RARITY_TIERS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
          {draft.rarity === "unique" && <Field label="How many in the galaxy"><TextInput type="number" value={draft.uniqueCount != null ? draft.uniqueCount : 1} onChange={e => setDraft({ ...draft, uniqueCount: Math.max(1, +e.target.value || 1) })} style={{ width: 120 }} /></Field>}
          {(cat.extraFields || []).map(f => (
            <Field key={f.key} label={f.label}>{f.kind === "textarea"
              ? <TextArea value={draft[f.key] || ""} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} style={{ minHeight: 64 }} />
              : <TextInput value={draft[f.key] || ""} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} />}</Field>
          ))}
          <EffectEditor effect={draft.effect} onChange={eff => setDraft({ ...draft, effect: eff })} editable />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn size="sm" variant="gold" onClick={submitDraft}>{isDM ? "Add" : "Submit to DM"}</Btn>
            <Btn size="sm" variant="ghost" onClick={() => setDraft(null)}>Cancel</Btn>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {reg.entries.map(e => {
          const editing = openId === e._id;
          return (
            <div key={e._id} style={{ background: COLORS.panel, border: `1px solid ${editing ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 10, padding: 12, opacity: e.enabled ? 1 : 0.55 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setOpenId(editing ? null : e._id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{e._name}</span>
                    <RarityTag rarity={e.rarity} count={e.uniqueCount} />
                    {e._custom && <Tag color={COLORS.purple}>Custom</Tag>}
                    {e._edited && <Tag color={COLORS.blue}>Edited</Tag>}
                    {!e.enabled && <Tag color={COLORS.dim}>Disabled</Tag>}
                    {(e.effect.hooks || []).length > 0 && <Tag color={COLORS.green}>{e.effect.hooks.length} effect{e.effect.hooks.length === 1 ? "" : "s"}</Tag>}
                  </div>
                  <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 3 }}>{e._desc}</div>
                </div>
                {isDM && (
                  <button onClick={() => reg.toggleEnabled(e._id)} title={e.enabled ? "Disable" : "Enable"} style={{ cursor: "pointer", background: "transparent", border: "none", color: e.enabled ? COLORS.green : COLORS.dim, padding: 4 }}>
                    {e.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                )}
                <button onClick={() => setOpenId(editing ? null : e._id)} style={{ cursor: "pointer", background: "transparent", border: "none", color: COLORS.muted, padding: 4 }}>
                  {editing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              {editing && (
                <div style={{ marginTop: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
                  {isDM ? (
                    <>
                      <Field label="Name"><TextInput value={e._name} onChange={ev => reg.setPatch(e._id, { name: ev.target.value })} /></Field>
                      <Field label="Description"><TextArea value={e._desc} onChange={ev => reg.setPatch(e._id, { desc: ev.target.value })} style={{ minHeight: 44 }} /></Field>
                      <Field label="Rarity"><Select value={e.rarity} onChange={ev => reg.setPatch(e._id, { rarity: ev.target.value })} style={{ width: 160 }}>{REG_RARITY_TIERS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
                      {e.rarity === "unique" && <Field label="How many in the galaxy"><TextInput type="number" value={e.uniqueCount} onChange={ev => reg.setPatch(e._id, { uniqueCount: Math.max(1, +ev.target.value || 1) })} style={{ width: 120 }} /></Field>}
                      {(cat.extraFields || []).map(f => (
                        <Field key={f.key} label={f.label}>{f.kind === "textarea"
                          ? <TextArea value={e[f.key] || ""} onChange={ev => reg.setPatch(e._id, { [f.key]: ev.target.value })} style={{ minHeight: 64 }} />
                          : <TextInput value={e[f.key] || ""} onChange={ev => reg.setPatch(e._id, { [f.key]: ev.target.value })} />}</Field>
                      ))}
                      <EffectEditor effect={e.effect} onChange={eff => reg.setPatch(e._id, { effect: eff })} editable />
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        {e._custom && <Btn size="sm" variant="danger" onClick={() => { reg.removeEntry(e._id); setOpenId(null); }}><Trash2 size={13} /> Delete</Btn>}
                        {e._edited && <Btn size="sm" variant="ghost" onClick={() => { reg.resetEntry(e._id); setOpenId(null); }}><RotateCcw size={13} /> Reset to book</Btn>}
                      </div>
                    </>
                  ) : (
                    <EffectEditor effect={e.effect} onChange={() => {}} editable={false} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Parse a raid-party roster ("Role xN" / "Role xN-M" lines) and roll the ranges.
const rollRoster = (rosterText) => String(rosterText || "").split("\n").map(s => s.trim()).filter(Boolean).map(line => {
  const m = line.match(/^(.*?)\s*[x×]\s*(\d+)(?:\s*[-to]+\s*(\d+))?\s*$/i);
  if (!m) return { role: line, count: 1 };
  const lo = +m[2], hi = m[3] != null ? +m[3] : lo;
  return { role: m[1].trim(), count: rint(Math.min(lo, hi), Math.max(lo, hi)) };
}).filter(r => r.count > 0);

// DM quick-builders: roll a war goal or a raid party from the registry (respecting
// enable/disable + rarity), and drop a rolled warband straight into the tracker.
function WarGoalBuilder() {
  const reg = useRegistry("wargoals");
  const [result, setResult] = useState(null);
  const pool = reg.loading ? [] : reg.entries.filter(e => e.enabled);
  const rollGoal = () => { const e = weightedPickEntries(pool); if (e) setResult(e); };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Swords size={16} color={COLORS.red} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>War Goal</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={rollGoal}><Dices size={13} /> {result ? "Reroll" : "Roll"}</Btn>
      </div>
      {result ? (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{result._name}</span>
            <RarityTag rarity={result.rarity} />
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.muted }}>{result._desc}</div>
        </div>
      ) : <div style={{ fontSize: 12, color: COLORS.dim }}>Roll a random objective to frame the next war. Edit the pool in World & Rules.</div>}
    </div>
  );
}

function RaidPartyBuilder() {
  const reg = useRegistry("raidparties");
  const [combat, persistCombat] = useSharedList("session_combat");
  const [result, setResult] = useState(null);   // { entry, roster: [{role, count}] }
  const [added, setAdded] = useState(false);
  const pool = reg.loading ? [] : reg.entries.filter(e => e.enabled);
  const rollParty = () => { const e = weightedPickEntries(pool); if (e) { setResult({ entry: e, roster: rollRoster(e.roster) }); setAdded(false); } };
  const total = result ? result.roster.reduce((s, r) => s + r.count, 0) : 0;
  const addToTracker = () => {
    if (!result) return;
    const data = (combat && combat[0]) || { round: 1, turn: 0, combatants: [] };
    const newCombs = [];
    result.roster.forEach(r => { for (let i = 0; i < r.count; i++) newCombs.push({ ...blankCombatant(), name: r.count > 1 ? `${r.role} ${i + 1}` : r.role, init: roll(20) }); });
    persistCombat([{ ...data, combatants: [...data.combatants, ...newCombs] }]);
    setAdded(true);
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Crosshair size={16} color={COLORS.amber} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>Raid Party</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={rollParty}><Dices size={13} /> {result ? "Reroll" : "Roll"}</Btn>
      </div>
      {result ? (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.amber}55`, borderRadius: 8, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{result.entry._name}</span>
            <RarityTag rarity={result.entry.rarity} />
            <Tag color={COLORS.dim}>{total} fighters</Tag>
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>{result.entry._desc}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {result.roster.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5 }}>
                <span style={{ color: COLORS.amber, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", minWidth: 28 }}>{r.count}x</span>
                <span>{r.role}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <Btn size="sm" variant={added ? "ghost" : "gold"} disabled={added} onClick={addToTracker}>{added ? "Added to Initiative ✓" : <><Plus size={13} /> Add to Initiative</>}</Btn>
          </div>
        </div>
      ) : <div style={{ fontSize: 12, color: COLORS.dim }}>Roll an enemy warband, then drop it into the Initiative tracker. Edit the templates in World & Rules.</div>}
    </div>
  );
}

function BuildersTab() {
  return (
    <div>
      <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>Quick-roll the pieces of an encounter. Both pull from editable pools in World & Rules (enable/disable, rarity, or add your own).</div>
      <WarGoalBuilder />
      <RaidPartyBuilder />
    </div>
  );
}

/* ============================== COMPENDIUM (Data Pool) ============================== */
const ENTRY_TYPES = [
  { key: "class", label: "Class", color: COLORS.gold },
  { key: "species", label: "Species / Heritage", color: COLORS.purple },
  { key: "weapon", label: "Weapon", color: COLORS.red },
  { key: "armor", label: "Armor", color: COLORS.green },
  { key: "shield", label: "Shield", color: COLORS.blue },
  { key: "item", label: "Item / Gear", color: COLORS.dim },
  { key: "technique", label: "Technique", color: COLORS.blue },
  { key: "form", label: "Form / Transformation", color: COLORS.purple },
  { key: "condition", label: "Condition", color: COLORS.green },
];
const blankEntry = (type="item") => ({ id: uid(), type, name: "New Entry", cost: "", rank: "", range: "", damage: "", description: "" });

function CompendiumTab() {
  const [entries, persist, error] = useSharedList("compendium_v2");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [openClass, setOpenClass] = useState(null);
  const [openEquip, setOpenEquip] = useState(null);
  if (entries === null) return <LoadingBlock />;

  const addEntry = (type) => { const e = blankEntry(type); persist([...entries, e]); setOpenId(e.id); };
  const updateEntry = (id, patch) => persist(entries.map(e => e.id===id?{...e,...patch}:e));
  const deleteEntry = (id) => { persist(entries.filter(e => e.id!==id)); setOpenId(null); };

  const classResults = filter === "all" || filter === "class" ? CLASS_NAMES.filter(n => n.toLowerCase().includes(query.toLowerCase())) : [];
  const bookEquip = BOOK_EQUIPMENT.filter(e => (filter === "all" || filter === (e.category || "").toLowerCase()) && e.name.toLowerCase().includes(query.toLowerCase()));
  const customResults = entries.filter(e => (filter==="all"||e.type===filter) && e.name.toLowerCase().includes(query.toLowerCase()));
  const open = entries.find(e => e.id === openId);
  const typeInfo = (t) => ENTRY_TYPES.find(x => x.key===t) || ENTRY_TYPES[2];

  if (openClass) return (
    <div>
      <ScannerHeader title={openClass.toUpperCase()} subtitle="Class — Book Data" onBack={() => setOpenClass(null)} />
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <AbilityTab classId={openClass} level={20} />
      </div>
    </div>
  );

  if (openEquip) {
    const e = openEquip;
    const acLine = e.slot === "body"
      ? `${e.acBase}${e.acDexMode === "full" ? " + Dex" : e.acDexMode === "max2" ? " + Dex (max 2)" : " (no Dex)"}${e.acHalfProf ? " + ½ Prof" : ""}`
      : e.acBonus ? `+${e.acBonus} AC` : "—";
    const stat = (label, val) => <div><span style={{ color: COLORS.dim, fontSize: 10.5, textTransform: "uppercase" }}>{label}</span><div style={{ fontWeight: 700, fontSize: 13 }}>{val}</div></div>;
    return (
      <div>
        <ScannerHeader title={e.name.toUpperCase()} subtitle={`${e.category} — Book Data`} onBack={() => setOpenEquip(null)} />
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 14 }}>
            {stat("Slot", slotTypeLabel(e.slot))}
            {stat("Armor Class", acLine)}
            {stat("Damage Reduction", e.dr || 0)}
            {stat("Ƶeni", (e.zeni || 0).toLocaleString())}
            {stat("Rarity", rarityInfo(e.rarity).label)}
            {e.strReq > 0 && stat("Str Req.", e.strReq)}
            {e.stealthDisadv && stat("Stealth", "Disadvantage")}
          </div>
          {e.notes && <div style={{ color: COLORS.muted, fontSize: 12.5, marginTop: 14, lineHeight: 1.6, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>{e.notes}</div>}
        </div>
      </div>
    );
  }

  if (open) return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <TextInput value={open.name} onChange={e => updateEntry(open.id, { name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm" variant="danger" onClick={() => deleteEntry(open.id)}><Trash2 size={13}/></Btn>
          <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
        </div>
      </div>
      <Field label="Type"><Select value={open.type} onChange={e => updateEntry(open.id, { type: e.target.value })}>{ENTRY_TYPES.filter(t=>t.key!=="class").map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        <Field label="Cost"><TextInput value={open.cost} onChange={e => updateEntry(open.id, { cost: e.target.value })} /></Field>
        <Field label="Rank"><TextInput value={open.rank} onChange={e => updateEntry(open.id, { rank: e.target.value })} /></Field>
        <Field label="Range"><TextInput value={open.range} onChange={e => updateEntry(open.id, { range: e.target.value })} /></Field>
      </div>
      <Field label="Damage / Effect"><TextInput value={open.damage} onChange={e => updateEntry(open.id, { damage: e.target.value })} /></Field>
      <Field label="Description"><TextArea value={open.description} onChange={e => updateEntry(open.id, { description: e.target.value })} style={{ minHeight: 140 }} /></Field>
    </div>
  );

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the Data Pool..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 180 }}>
          <option value="all">All types</option>
          {ENTRY_TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
        </Select>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {ENTRY_TYPES.filter(t=>t.key!=="class").map(t => <Btn key={t.key} size="sm" onClick={() => addEntry(t.key)} style={{ color: t.color, borderColor: t.color+"44" }}><Plus size={12}/> {t.label}</Btn>)}
      </div>
      {classResults.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Classes (Book Data)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
            {classResults.map(n => (
              <div key={n} onClick={() => setOpenClass(n)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold+"66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                <Tag color={COLORS.gold}>Class</Tag>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{n}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{CLASS_DATA[n].flavor}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {bookEquip.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Equipment (Book Data)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
            {bookEquip.map(e => {
              const ti = typeInfo((e.category || "").toLowerCase());
              return (
                <div key={catalogKey(e)} onClick={() => setOpenEquip(e)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={ev => ev.currentTarget.style.borderColor = ti.color + "66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                  <Tag color={ti.color}>{e.category}</Tag>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{e.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{e.slot === "body" ? `Base AC ${e.acBase}` : e.acBonus ? `+${e.acBonus} AC` : ""}{e.dr ? ` · DR ${e.dr}` : ""} · {(e.zeni || 0).toLocaleString()}z</div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {customResults.length === 0 && classResults.length === 0 && bookEquip.length === 0 ? (
        <EmptyState icon={BookOpen} title="Nothing here yet" body="Search real Classes from the book, or build a custom weapon, technique, form, item, or condition." />
      ) : customResults.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
          {customResults.map(e => {
            const ti = typeInfo(e.type);
            return (
              <div key={e.id} onClick={() => setOpenId(e.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = ti.color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                <Tag color={ti.color}>{ti.label}</Tag>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{e.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4, minHeight: 32, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{e.description || "No description yet."}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================== FEATS ============================== */
const blankCustomFeat = () => ({ id: uid(), name: "New Feat", list: "General", subcategory: "", prerequisite: "", fullText: "", custom: true });

function FeatsTab() {
  const [custom, persist, error] = useSharedList("custom_feats_v1");
  const { map: ovMap, setOverride, clearOverride } = useOverrides("feat_overrides_v1");
  const [source, setSource] = useState("all"); // all | book | custom
  const [activeLists, setActiveLists] = useState(() => new Set(FEAT_LISTS));
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  if (custom === null) return <LoadingBlock />;

  const bookFeats = applyOverrides(FEAT_DATA, ovMap);
  const allFeats = [...bookFeats, ...custom];
  const addCustom = () => { const f = blankCustomFeat(); persist([...custom, f]); setOpenId(f.id); };
  const updateCustom = (id, patch) => persist(custom.map(c => c.id === id ? { ...c, ...patch } : c));
  const deleteCustom = (id) => { persist(custom.filter(c => c.id !== id)); setOpenId(null); };

  const toggleList = (l) => {
    setActiveLists(prev => {
      if (prev.has(l) && prev.size === 1) return new Set(FEAT_LISTS);
      return new Set([l]);
    });
  };

  const visible = allFeats.filter(f => {
    if (source === "book" && f.custom) return false;
    if (source === "custom" && !f.custom) return false;
    if (!activeLists.has(f.list)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return f.name.toLowerCase().includes(q) || (f.fullText || "").toLowerCase().includes(q) || (f.prerequisite || "").toLowerCase().includes(q);
  });

  const open = allFeats.find(f => f.id === openId);

  if (open) {
    const isCustom = !!open.custom;
    const edited = !isCustom && !!ovMap[open.id];
    const upd = (patch) => isCustom ? updateCustom(open.id, patch) : setOverride(open.id, { ...open, ...patch });
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8 }}>
          <TextInput value={open.name} onChange={e => upd({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", flex: 1 }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isCustom ? <Tag color={COLORS.muted}>Custom</Tag> : edited ? <Tag color={COLORS.amber}>Edited</Tag> : null}
            {edited && <Btn size="sm" onClick={() => clearOverride(open.id)} title="Discard edits, restore the book version"><RotateCcw size={13}/> Reset</Btn>}
            {isCustom && <Btn size="sm" variant="danger" onClick={() => deleteCustom(open.id)}><Trash2 size={13}/></Btn>}
            <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="List"><Select value={open.list} onChange={e => upd({ list: e.target.value })}>{FEAT_LISTS.map(l => <option key={l} value={l}>{l}</option>)}</Select></Field>
          <Field label="Subcategory"><TextInput value={open.subcategory || ""} onChange={e => upd({ subcategory: e.target.value })} placeholder="optional" /></Field>
        </div>
        <Field label="Prerequisite"><TextInput value={open.prerequisite || ""} onChange={e => upd({ prerequisite: e.target.value })} placeholder="e.g. Character Level 4+" /></Field>
        <Field label="Full Text"><TextArea value={open.fullText || ""} onChange={e => upd({ fullText: e.target.value })} style={{ minHeight: 160 }} /></Field>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search feat names, rules text, prerequisites..." style={{ paddingLeft: 30 }} />
        </div>
        <Btn variant="gold" onClick={addCustom}><Plus size={13}/> Add Feat</Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
        {[["all","All"],["book","Book"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSource(k)} style={{ padding: "6px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${source===k?COLORS.gold:"transparent"}`, color: source===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>{l} {k==="custom" ? `(${custom.length})` : k==="book" ? `(${FEAT_DATA.length})` : `(${allFeats.length})`}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        <button onClick={() => setActiveLists(new Set(FEAT_LISTS))} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${activeLists.size===FEAT_LISTS.length?COLORS.gold:COLORS.border}`, background: activeLists.size===FEAT_LISTS.length?`${COLORS.gold}1A`:COLORS.panel2, color: activeLists.size===FEAT_LISTS.length?COLORS.gold:COLORS.muted }}>All</button>
        {FEAT_LISTS.map(l => {
          const color = COLORS[FEAT_LIST_COLOR[l]] || COLORS.muted;
          const on = activeLists.has(l);
          return (
            <button key={l} onClick={() => toggleList(l)} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${on?color:COLORS.border}`, background: on?`${color}1A`:COLORS.panel2, color: on?color:COLORS.muted }}>{l}</button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No feats match" body="Try a different search or category, or add a homebrew Feat of your own." />
      ) : (
        FEAT_LISTS.map(l => {
          const items = visible.filter(f => f.list === l);
          if (!items.length) return null;
          const color = COLORS[FEAT_LIST_COLOR[l]] || COLORS.muted;
          return (
            <div key={l} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color }}>{l} Feat List</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{items.length}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                {items.map(f => (
                  <div key={f.id} onClick={() => setOpenId(f.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, position: "relative" }}
                    onMouseEnter={ev => ev.currentTarget.style.borderColor = color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                    {f.custom ? <Tag color={COLORS.muted}>Custom</Tag> : ovMap[f.id] ? <Tag color={COLORS.amber}>Edited</Tag> : null}
                    <div style={{ fontWeight: 700, marginTop: (f.custom || ovMap[f.id]) ? 6 : 0 }}>{f.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11.5, marginTop: 4, fontFamily: "JetBrains Mono, monospace" }}>{f.prerequisite || "No prerequisite"}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const TECH_CAT_COLOR = { "Generic": "blue", "Super Line": "purple", "External Super Line": "amber", "Miscellaneous Super": "green", "Ultimate": "red" };

function TechniquesCompendiumTab() {
  const { map: ovMap, setOverride, clearOverride } = useOverrides("technique_overrides_v1");
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [editing, setEditing] = useState(false);

  const allTechs = applyOverrides(TECHNIQUE_DATA, ovMap);
  const open = openId ? allTechs.find(t => t.id === openId) : null;
  if (open) {
    const color = COLORS[TECH_CAT_COLOR[open.category]] || COLORS.muted;
    const rescolor = techResColor(open.resolution);
    const edited = !!ovMap[open.id];
    const upd = (patch) => setOverride(open.id, { ...open, ...patch });
    const row = (label, val) => val ? <div style={{ display: "flex", gap: 8, fontSize: 12.5 }}><span style={{ color: COLORS.muted, minWidth: 110 }}>{label}</span><span>{val}</span></div> : null;
    const F = ({ label, k, ph, ta }) => (
      <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
        {ta ? <TextArea value={open[k] || ""} onChange={e => upd({ [k]: e.target.value })} style={{ minHeight: 120 }} />
            : <TextInput value={open[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} style={{ padding: "5px 8px" }} />}
      </div>
    );
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
          <div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Tag color={color}>{open.category}</Tag>
              <Tag color={COLORS.dim}>{open.techType} · Ki Rank {open.kiRank}</Tag>
              <Tag color={rescolor}>{open.resolution}</Tag>
              {edited && <Tag color={COLORS.amber}>Edited</Tag>}
            </div>
            <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, fontWeight: 700, marginTop: 8 }}>{open.name}</div>
            {open.lineName && open.lineName !== open.name && <div style={{ fontSize: 11.5, color: COLORS.dim }}>{open.lineName} line</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant={editing ? "gold" : "default"} onClick={() => setEditing(!editing)}>{editing ? <><Check size={13}/> Done</> : "Edit"}</Btn>
            {edited && <Btn size="sm" onClick={() => clearOverride(open.id)} title="Discard edits, restore the book version"><RotateCcw size={13}/> Reset</Btn>}
            <Btn size="sm" variant="ghost" onClick={() => { setEditing(false); setOpenId(null); }}><X size={15}/></Btn>
          </div>
        </div>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <F label="Name" k="name" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Type</div><Select value={open.techType} onChange={e => upd({ techType: e.target.value })}>{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select></div>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Ki Rank</div><Select value={open.kiRank} onChange={e => upd({ kiRank: e.target.value })}>{["1","2","3","4"].map(r => <option key={r} value={r}>{r}</option>)}</Select></div>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Resolution</div><Select value={open.resolution} onChange={e => upd({ resolution: e.target.value })}><option value="attack">attack</option><option value="save">save</option><option value="utility">utility</option></Select></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <F label="Ki Cost" k="kiCost" ph="7 Ki" /><F label="Casting Time" k="castingTime" ph="1 Action" /><F label="Range" k="range" ph="60ft" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <F label="Damage Dice" k="damageDice" ph="2d6+18" /><F label="Damage Type" k="damageType" ph="Energy" /><F label="Save Ability" k="saveAbility" ph="Dexterity" />
            </div>
            <F label="Full Text" k="fullText" ta />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "10px 0" }}>
              {row("Ki Cost", open.kiCost)}
              {row("Casting Time", open.castingTime)}
              {row("Range", open.range)}
              {row("Duration", open.duration)}
              {row("Chargeable", open.chargeable ? "Yes" : null)}
              {row("Damage", open.damageDice ? `${open.damageDice}${open.damageType ? " " + open.damageType : ""}` : null)}
              {row("Weapon Req.", open.weaponRequirement)}
              {row("Learning Req.", open.learningRequirement)}
              {row("Iconic Mastery", open.iconicMastery)}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-line" }}>{open.fullText}</div>
          </>
        )}
      </div>
    );
  }

  const visible = allTechs.filter(t => {
    if (catFilter !== "all" && t.category !== catFilter) return false;
    if (typeFilter !== "all" && t.techType !== typeFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return t.name.toLowerCase().includes(q) || (t.lineName || "").toLowerCase().includes(q) || (t.fullText || "").toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${TECHNIQUE_DATA.length} techniques...`} style={{ paddingLeft: 30 }} />
        </div>
        <Select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: 180 }}>
          <option value="all">All categories</option>
          {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 130 }}>
          <option value="all">All types</option>
          {TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>{visible.length} shown</div>
      {visible.length === 0 ? (
        <EmptyState icon={Zap} title="No techniques match" body="Try a different search, category, or type." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10 }}>
          {visible.slice(0, 400).map(t => {
            const color = COLORS[TECH_CAT_COLOR[t.category]] || COLORS.muted;
            const rescolor = techResColor(t.resolution);
            return (
              <div key={t.id} onClick={() => { setEditing(false); setOpenId(t.id); }} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{t.name}{ovMap[t.id] && <span style={{ color: COLORS.amber, fontSize: 9.5, marginLeft: 5 }}>• edited</span>}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{t.techType} R{t.kiRank}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {t.kiCost && <span>{t.kiCost}</span>}
                  {t.damageDice && <span style={{ color: rescolor }}>{t.damageDice}</span>}
                  <span style={{ color: rescolor, textTransform: "capitalize" }}>{t.resolution}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {visible.length > 400 && <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 12, textAlign: "center" }}>Showing first 400 — narrow with search or filters to see the rest.</div>}
    </div>
  );
}

/* ============================== NOTES ============================== */
function NotesTab() {
  const [shared, persistShared, sharedErr] = useSharedList("notes_shared_v2");
  const [personal, persistPersonal] = usePersonalList("notes_personal_v2");
  const [mode, setMode] = useState("shared");
  const list = mode === "shared" ? shared : personal;
  const persist = mode === "shared" ? persistShared : persistPersonal;
  if (list === null) return <LoadingBlock />;
  const add = () => persist([{ id: uid(), title: "New Note", body: "", updated: Date.now() }, ...list]);
  const update = (id, patch) => persist(list.map(n => n.id===id?{...n,...patch,updated:Date.now()}:n));
  const remove = (id) => persist(list.filter(n => n.id !== id));
  return (
    <div>
      {mode === "shared" && sharedErr && <ErrorBanner text={sharedErr} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Btn variant={mode==="shared"?"blue":"default"} onClick={() => setMode("shared")}>Table Notes</Btn>
        <Btn variant={mode==="personal"?"gold":"default"} onClick={() => setMode("personal")}>My Private Notes</Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="gold" onClick={add}><Plus size={14}/> New Note</Btn>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={FileText} title="No notes yet" body={mode==="shared" ? "Session recaps, house rules — visible to everyone." : "Only you can see these."} action={<Btn variant="gold" onClick={add}><Plus size={14}/> New Note</Btn>} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
          {list.map(n => (
            <div key={n.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <TextInput value={n.title} onChange={e => update(n.id, { title: e.target.value })} style={{ fontWeight: 700, background: "transparent", border: "none", padding: 0 }} />
                <Trash2 size={14} color={COLORS.red} style={{ cursor: "pointer", flexShrink: 0, marginLeft: 6 }} onClick={() => remove(n.id)} />
              </div>
              <TextArea value={n.body} onChange={e => update(n.id, { body: e.target.value })} style={{ minHeight: 80 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================== GM TOOLS HUB ============================== */
function DmPlaybookTab() {
  const [custom, persist] = useSharedList("custom_playbook_v1");
  const [query, setQuery] = useState("");
  const [closedSections, setClosedSections] = useState(() => new Set());   // default: everything open
  const [adding, setAdding] = useState(false);
  const blank = { section: "Homebrew", title: "", body: "" };
  const [draft, setDraft] = useState(blank);
  const toggleSection = (s) => setClosedSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  if (custom === null) return <LoadingBlock />;

  // Merge homebrew entries into the book sections (appending to an existing one,
  // or spinning up a new section) so custom advice lives alongside the real thing.
  const sectionMap = new Map();
  DM_PLAYBOOK.forEach(s => sectionMap.set(s.section, s.entries.map(e => ({ ...e }))));
  custom.forEach(c => { const sec = c.section || "Homebrew"; if (!sectionMap.has(sec)) sectionMap.set(sec, []); sectionMap.get(sec).push({ ...c, custom: true }); });
  const bookSections = DM_PLAYBOOK.map(s => s.section);
  const existingSections = [...sectionMap.keys()];

  const q = query.trim().toLowerCase();
  const filtered = [...sectionMap.entries()].map(([section, entries]) => ({
    section,
    entries: entries.filter(e => !q || e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q)),
  })).filter(section => section.entries.length > 0);

  const save = () => {
    if (!draft.title.trim()) return;
    persist([...custom, { id: uid(), section: (draft.section || "Homebrew").trim(), title: draft.title.trim(), body: draft.body.trim() }]);
    setDraft(blank); setAdding(false);
  };
  const remove = (id) => persist(custom.filter(c => c.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search DM advice — e.g. 'break bars', 'dying'..." style={{ paddingLeft: 30 }} />
        </div>
        {!adding && <Btn variant="gold" size="sm" onClick={() => setAdding(true)}><Plus size={14} /> Homebrew Entry</Btn>}
      </div>
      {adding && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Field label="Section"><TextInput list="dm-sections" value={draft.section} onChange={e => setDraft({ ...draft, section: e.target.value })} placeholder="Homebrew" /><datalist id="dm-sections">{existingSections.map(s => <option key={s} value={s} />)}</datalist></Field>
            <Field label="Title"><TextInput value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="Rule / advice name" /></Field>
          </div>
          <Field label="Body"><TextArea value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} placeholder="The advice, house rule, or reference text." /></Field>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <Btn variant="gold" size="sm" onClick={save}><Check size={13} /> Save Entry</Btn>
            <Btn variant="ghost" size="sm" onClick={() => { setAdding(false); setDraft(blank); }}>Cancel</Btn>
          </div>
        </div>
      )}
      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No matches" body="Try a different search term, or add a homebrew entry." />
      ) : filtered.map(section => {
        const open = !closedSections.has(section.section);
        const homebrewSection = !bookSections.includes(section.section);
        return (
          <div key={section.section} style={{ marginBottom: 14 }}>
            <div onClick={() => toggleSection(section.section)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <ChevronRight size={14} style={open ? { transform: "rotate(90deg)" } : undefined} color={COLORS.gold} />
              <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.gold }}>{section.section}</div>
              {homebrewSection && <Tag color={COLORS.gold}>Homebrew</Tag>}
            </div>
            {open && section.entries.map((e, i) => (
              <div key={e.id || i} style={{ background: COLORS.panel, border: `1px solid ${e.custom ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8, marginLeft: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{e.title}{e.custom && <Tag color={COLORS.gold}>Homebrew</Tag>}</div>
                  {e.custom && <Trash2 size={13} color={COLORS.red} style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => remove(e.id)} />}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 12.5, lineHeight: 1.6 }}>{e.body}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// Materoids Flavors — the table's home for deviant / optional rules. Toggles are
// shared house rules (useHouseRules), so a change applies for everyone at once.
// Browsable reference for the High-Tech Parts (cybernetics). Read-only; installing
// them onto a character happens on the character's Inventory → Cybernetics panel.
function HighTechCompendiumTab() {
  const [custom, persist] = useSharedList("custom_hightech_v1");
  const [adding, setAdding] = useState(false);
  const blank = { name: "", integrationDC: 10, zeni: 100, effect: "", advancedTech: "" };
  const [draft, setDraft] = useState(blank);
  if (custom === null) return <LoadingBlock />;
  const parts = [...HIGH_TECH_PARTS, ...custom];
  const isCustom = (id) => custom.some(c => c.id === id);
  const save = () => {
    if (!draft.name.trim()) return;
    persist([...custom, { ...draft, id: uid(), name: draft.name.trim(), integrationDC: +draft.integrationDC || 0, zeni: +draft.zeni || 0, custom: true }]);
    setDraft(blank); setAdding(false);
  };
  const remove = (id) => persist(custom.filter(c => c.id !== id));
  return (
    <div>
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
        <div style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Installation &amp; Limit</div>
        Install over 8 hours — the implementer makes an <span style={{ color: COLORS.text }}>Int (Technology) + Wis (Medicine)</span> check vs the Part's Integration DC; a failure costs the recipient 1 Rank of Exhaustion. Each attuned Part gives <span style={{ color: COLORS.amber }}>−2 to all Ki Control checks and Berserk saves</span>, and you can't attune duplicates. Your <span style={{ color: COLORS.text }}>Cybernetic Limit</span> (max installed) = <span style={{ color: COLORS.text }}>½ (CON mod + WIS mod)</span>. <span style={{ color: COLORS.green }}>Androids</span> take no negatives and treat every Part as Advanced; the <span style={{ color: COLORS.green }}>Cyborg</span> heritage also takes no negatives (Construct type). A Signature Upgrade grants one Part that doesn't count against the Limit.
      </div>
      <div style={{ marginBottom: 14 }}>
        {adding ? (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Field label="Part Name"><TextInput value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Cloaking Field" /></Field>
              <Field label="Integration DC"><TextInput type="number" value={draft.integrationDC} onChange={e => setDraft({ ...draft, integrationDC: e.target.value })} /></Field>
              <Field label="Ƶeni"><CommaNumInput value={draft.zeni} onValue={v => setDraft({ ...draft, zeni: v })} /></Field>
            </div>
            <Field label="Effect"><TextArea value={draft.effect} onChange={e => setDraft({ ...draft, effect: e.target.value })} placeholder="What the base part does." /></Field>
            <Field label="Advanced Tech"><TextArea value={draft.advancedTech} onChange={e => setDraft({ ...draft, advancedTech: e.target.value })} placeholder="The upgraded effect (Androids treat every Part as Advanced)." /></Field>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <Btn variant="gold" size="sm" onClick={save}><Check size={13} /> Save Part</Btn>
              <Btn variant="ghost" size="sm" onClick={() => { setAdding(false); setDraft(blank); }}>Cancel</Btn>
            </div>
          </div>
        ) : (
          <Btn variant="gold" size="sm" onClick={() => setAdding(true)}><Plus size={14} /> Homebrew Part</Btn>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
        {parts.map(p => (
          <div key={p.id} style={{ background: COLORS.panel2, border: `1px solid ${isCustom(p.id) ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}{isCustom(p.id) && <Tag color={COLORS.gold} style={{ marginLeft: 6 }}>Homebrew</Tag>}</span>
              <span style={{ fontSize: 10, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", display: "flex", alignItems: "center", gap: 6 }}>DC {p.integrationDC} · Ƶ{(p.zeni || 0).toLocaleString()}{isCustom(p.id) && <Trash2 size={12} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => remove(p.id)} />}</span>
            </div>
            {p.effect && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5, marginBottom: 6 }}>{p.effect}</div>}
            {p.advancedTech && <div style={{ fontSize: 11, color: COLORS.blue, lineHeight: 1.5 }}><span style={{ color: COLORS.dim, textTransform: "uppercase", fontSize: 9, letterSpacing: 0.5 }}>Advanced Tech</span><br />{p.advancedTech}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MateroidsFlavorsTab() {
  const [houseRules, persist] = useHouseRules();
  const [chars] = useSharedList("characters_v2");
  const OptionCard = ({ active, onClick, title, formula, blurb }) => (
    <div onClick={onClick} style={{ cursor: "pointer", flex: 1, minWidth: 240, background: active ? `${COLORS.gold}14` : COLORS.panel, border: `1px solid ${active ? COLORS.gold : COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${active ? COLORS.gold : COLORS.muted}`, background: active ? COLORS.gold : "transparent", flexShrink: 0 }} />
        <div style={{ fontWeight: 700, fontSize: 14, color: active ? COLORS.gold : COLORS.text }}>{title}</div>
      </div>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: COLORS.blue, marginBottom: 8, lineHeight: 1.5 }}>{formula}</div>
      <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.55 }}>{blurb}</div>
    </div>
  );
  const system = houseRules.powerSystem;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ fontSize: 12.5, color: COLORS.muted }}>Deviant rules &amp; optional content for your table. Changes here are shared with everyone in the room.</div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Power Level System</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Which number the Combat banner and Stats page show as your power level.</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <OptionCard active={system === "kili"} onClick={() => persist({ powerSystem: "kili" })}
            title="Kili (Book)"
            formula="Max HP × (Ki ÷ 2) × (Power Bonus + 1)"
            blurb="The book's grounded metric. Steady, mid-range numbers; weight doesn't swing it. Best if you like readable power comparisons." />
          <OptionCard active={system === "battlePower"} onClick={() => persist({ powerSystem: "battlePower" })}
            title="Higher Power Levels"
            formula="Current HP × Current Ki × (1 + Ki Rank + Power Bonus) × Form Multiplier × Weight"
            blurb="The scouter reading. Every power buff (forms, Hyper Mode, Enraged) raises it, and a Form's Multiplier field pushes it into the astronomical values from the manga and show — and it drops as a fighter takes damage." />
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Attunement Slots</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>The book caps Attunement at 2. Unlock to set your own limit for the table.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ attunementCapEnabled: !houseRules.attunementCapEnabled })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.attunementCapEnabled ? COLORS.gold : COLORS.border}`, background: houseRules.attunementCapEnabled ? `${COLORS.gold}1A` : "transparent", color: houseRules.attunementCapEnabled ? COLORS.gold : COLORS.muted }}>
            {houseRules.attunementCapEnabled ? "Custom cap" : "Book cap (2)"}
          </button>
          {houseRules.attunementCapEnabled && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: COLORS.muted }}>Limit</span>
              <TextInput type="number" value={houseRules.attunementCap} onChange={e => persist({ attunementCap: Math.max(0, +e.target.value || 0) })} style={{ width: 90, textAlign: "center" }} />
            </div>
          )}
          <span style={{ marginLeft: "auto", fontSize: 12, color: COLORS.dim }}>Effective: <b style={{ color: COLORS.text }}>{attunementCapFor(houseRules)}</b> slots</span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Gravity Acclimation</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>A fighter trained under crushing gravity stays strong anywhere lighter. With this on, a character's Bio gains an <b>Accustomed Gravity</b> field — the highest gravity they can handle — and they auto-gain ranks of Weighted (Light): <b>10× → +1</b>, <b>25× → +2</b>, <b>50× → +3</b>, which feed their Power and Battle Power.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: (houseRules.gravityAcclimation && (chars || []).length) ? 14 : 0 }}>
            <button onClick={() => persist({ gravityAcclimation: !houseRules.gravityAcclimation })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.gravityAcclimation ? COLORS.gold : COLORS.border}`, background: houseRules.gravityAcclimation ? `${COLORS.gold}1A` : "transparent", color: houseRules.gravityAcclimation ? COLORS.gold : COLORS.muted }}>
              {houseRules.gravityAcclimation ? "On — Lightweight auto-applied" : "Off (book default)"}
            </button>
            <span style={{ fontSize: 11.5, color: COLORS.dim }}>Auto-grants Lightweight from each fighter's Accustomed Gravity (set on their Bio).</span>
          </div>
          {houseRules.gravityAcclimation && (chars || []).filter(c => !c.archived).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Accustomed gravity</div>
              {(chars || []).filter(c => !c.archived).map(c => {
                const r = gravAcclimRanks(c.accustomedGravity);
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, padding: "5px 8px", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8 }}>
                    <span style={{ fontWeight: 700, flex: 1, minWidth: 0 }}>{c.name}</span>
                    <span style={{ color: gravityColor(c.accustomedGravity), fontFamily: "JetBrains Mono, monospace" }}>{c.accustomedGravity ? `${c.accustomedGravity}×g` : "—"}</span>
                    {r > 0 ? <Tag color={COLORS.green}>Lightweight +{r}</Tag> : <span style={{ fontSize: 10.5, color: COLORS.dim }}>no bonus (&lt;10×)</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Harsh Galaxies</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>The world you fight on bites back. With this on, the party's current planet goes live in the Session tracker so its gravity, weather and star conditions are in effect during play for the table to run. Off keeps every world as pure flavor.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ harshGalaxies: !houseRules.harshGalaxies })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.harshGalaxies ? COLORS.gold : COLORS.border}`, background: houseRules.harshGalaxies ? `${COLORS.gold}1A` : "transparent", color: houseRules.harshGalaxies ? COLORS.gold : COLORS.muted }}>
            {houseRules.harshGalaxies ? "On · environmental conditions live" : "Off · worlds are flavor only"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Quick Combat</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>For the fights you would rather not play out in full. With this on, the Session tab gains a Quick Combat surface that skips a skirmish to an answer, weighing the party's Battle Power against the enemy force and handing back an outcome plus the toll it took. Scales up to army versus army.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ quickCombat: !houseRules.quickCombat })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.quickCombat ? COLORS.gold : COLORS.border}`, background: houseRules.quickCombat ? `${COLORS.gold}1A` : "transparent", color: houseRules.quickCombat ? COLORS.gold : COLORS.muted }}>
            {houseRules.quickCombat ? "On · Quick Combat tab shown" : "Off"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Base Building</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>For tables that want a home to fight for. With this on, a Base tab appears: your player faction's home world (its facilities and commerce, spread across the planet) and a capital ship you carry with you. Both have Structural Integrity and Shields, so they can be developed, defended, and wrecked in a conflict. Off hides the tab entirely.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ baseBuilding: !houseRules.baseBuilding })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.baseBuilding ? COLORS.gold : COLORS.border}`, background: houseRules.baseBuilding ? `${COLORS.gold}1A` : "transparent", color: houseRules.baseBuilding ? COLORS.gold : COLORS.muted }}>
            {houseRules.baseBuilding ? "On · Base tab shown" : "Off"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>More Governing</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Adds a governance layer to the Base tab's home world (needs Base Building on). The base runs a weekly economy: income auto-derives from the planet's wealth, tax and commerce facilities, banks over time on the Session clock, and splits into a small player dividend and the People's Money that funds upgrades. Facilities move Stability and Reputation, and a "legal" Black Market lets the party trade the people's trust for profit. A balancing game for tables that want it.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ moreGoverning: !houseRules.moreGoverning })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.moreGoverning ? COLORS.gold : COLORS.border}`, background: houseRules.moreGoverning ? `${COLORS.gold}1A` : "transparent", color: houseRules.moreGoverning ? COLORS.gold : COLORS.muted }}>
            {houseRules.moreGoverning ? "On · Governance shown on the base" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GmToolsHub({ setScreen }) {
  const tiles = [
    { key: "tables", label: "Tables", icon: Table2, color: COLORS.gold },
    { key: "worldrules", label: "World & Rules", icon: Orbit, color: COLORS.green },
    { key: "builders", label: "Builders", icon: Swords, color: COLORS.red },
    { key: "compendium", label: "Data Pool", icon: Globe2, color: COLORS.blue },
    { key: "feats", label: "Feats", icon: ClipboardList, color: COLORS.amber },
    { key: "techniques", label: "Techniques", icon: Zap, color: COLORS.blue },
    { key: "notes", label: "Notes", icon: FileText, color: COLORS.green },
    { key: "npcs", label: "NPCs", icon: Sparkles, color: COLORS.purple },
    { key: "materoids", label: "Materoids Flavors", icon: Settings, color: COLORS.purple },
    { key: "hightech", label: "High-Tech Parts", icon: Wrench, color: COLORS.blue },
    { key: "playbook", label: "DM Playbook", icon: BookOpen, color: COLORS.red },
    { key: "options", label: "Options", icon: Settings, color: COLORS.muted },
  ];
  return (
    <div>
      <ScannerHeader title="COMPENDIUM" subtitle="Your table's dictionary — look up or store anything in the game." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
        {tiles.map(t => (
          <div key={t.key} onClick={() => setScreen(t.key)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18, textAlign: "center" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.color+"77"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
            <t.icon size={26} color={t.color} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== APP SHELL ============================== */
/* ============================== UNIVERSE & ECONOMY ==============================
   A randomly generated galaxy: systems → planets, each with economy attributes
   that drive what a world can and can't do. Designed (homebrew) in DBZ flavor.
   Tier 1: the generator, browsable/editable planet cards, and set-home per
   character. Store + Night Market are planet-contextual and come next. */

const GALAXY_SIZES = {
  small: { label: "Small", systems: [4, 6], desc: "A tight cluster — a handful of worlds." },
  medium: { label: "Medium", systems: [10, 15], desc: "A proper galaxy — plenty of homes to choose." },
  large: { label: "Large", systems: [20, 28], desc: "A sprawling expanse — a campaign's worth of worlds." },
  gigantium: { label: "Gigantium", systems: [34, 48], desc: "A titanic reach — an entire sector of the cosmos." },
};
// Eras lightly bias generation (government/stability weights) and tag the galaxy.
const GALAXY_ERAS = {
  frontier: { label: "Post-War Frontier", biasStability: -1, biasGov: ["Warlord State", "Anarchy", "Tribal Confederacy"] },
  frieza: { label: "Frieza's Empire Ascendant", biasStability: -1, biasGov: ["Frieza Force Occupation", "Corporate Oligarchy"] },
  peace: { label: "The Long Peace", biasStability: +1, biasGov: ["Ruling Council", "Galactic Patrol Protectorate"] },
  tournaments: { label: "Age of Tournaments", biasStability: 0, biasGov: ["Absolute Monarchy", "Ruling Council"] },
  androids: { label: "Rise of the Androids", biasStability: -1, biasGov: ["AI Technocracy", "Corporate Oligarchy"] },
};

const UNI_ECONOMIES = ["Mining & Ore", "Heavy Industry", "Agriculture", "Tech & R&D", "Luxury Goods", "Black Market", "Military Complex", "Trade Hub", "Ki-Crystal Harvest", "Salvage & Scrap"];
const UNI_WEALTH = ["Destitute", "Struggling", "Stable", "Prosperous", "Thriving"];        // 0..4
const UNI_STABILITY = ["Warzone", "Unrest", "Tense", "Stable", "Golden Age"];               // 0..4
const UNI_TECH = ["Primitive", "Industrial", "Spacefaring", "Advanced", "Hyper-Advanced"];  // 0..4
const UNI_POP = ["Uninhabited", "Sparse", "Scattered", "Moderate", "Populous", "Teeming"];
const UNI_GOVERNMENTS = ["Absolute Monarchy", "Corporate Oligarchy", "Warlord State", "Ruling Council", "Theocracy", "Frieza Force Occupation", "Galactic Patrol Protectorate", "Anarchy", "Tribal Confederacy", "AI Technocracy"];
const UNI_SPECIES = ["Saiyan", "Namekian", "Arcosian", "Majin", "Android", "Beastman", "Cerealian", "Galactic Citizen", "Yardratian", "Demon Realm Denizen", "Neko Majin", "Grey", "Human"];
const UNI_LAWS = ["Weapons openly permitted", "Personal arms outlawed", "Ki-suppression fields in cities", "Martial law enforced", "Open bounty licenses", "Strict import tariffs", "No-fly restrictions over the capital", "Tournament combat legalized", "Slavery outlawed", "Black market tolerated", "Curfew after dusk", "Free-trade zone", "Outsiders require a visa", "Ki duels settle all disputes"];
const UNI_FEATURES = [
  "A dormant Dragon Ball rumored to lie in the wastes",
  "A gravity-training citadel favored by warriors",
  "A crashed Frieza Force cruiser slowly being salvaged",
  "A grand coliseum that hosts deadly tournaments",
  "A ki-crystal mine the entire economy depends on",
  "A refugee flotilla crowding the orbital lanes",
  "An ancient ruin humming with sealed power",
  "A corporate arcology towering over endless slums",
  "A sacred spring said to heal any wound",
  "A warlord's fortress commanding the trade routes",
  "A hidden bazaar beneath the capital where anything sells",
  "A weather-controlled paradise for the ultra-rich",
  "A shattered moon whose debris rings the planet",
  "A Capsule Corp research outpost testing new tech",
  "A monastery of martial monks who guard an old secret",
];
const UNI_STARS = [
  { type: "Yellow Dwarf", color: "#F5C542" }, { type: "Red Giant", color: "#E5533C" },
  { type: "Blue Supergiant", color: "#5AA9F5" }, { type: "White Star", color: "#E8ECF5" },
  { type: "Binary Pair", color: "#C77DF5" }, { type: "Dying Ember", color: "#B4763C" },
];
// Star modifiers — a condition on the system's star radiates to EVERY planet in
// that system. `twin` draws a second star in the orbital view; `env` is the
// system-wide environmental condition shown on each world.
const STAR_TRAITS = [
  { name: "Dual Suns", twin: true, env: "Scorching daylight", desc: "Two suns share the sky — brutal heat and almost no true night across every world." },
  { name: "Binary System", twin: true, env: "Erratic tides", desc: "Two stars lock the system in a complex dance — wild tides and long, shifting seasons." },
  { name: "Red Giant", env: "Bloated red light", desc: "A swollen dying star bathes the system in dim crimson light; inner worlds slowly bake." },
  { name: "Blue Supergiant", env: "Harsh UV glare", desc: "Fierce ultraviolet output scours unshielded surfaces — radiation saves may apply." },
  { name: "Flare Star", env: "Solar flares", desc: "Unstable — periodic flares knock out tech and irradiate exposed worlds." },
  { name: "Dying Ember", env: "Failing light", desc: "The star is guttering out — cold, dark, and dimming year by year." },
  { name: "Neutron Star", env: "Sweeping radiation", desc: "A pulsar's beams rake the system on a relentless clock — deadly to the unshielded." },
  { name: "Eclipsed", env: "Long shadow", desc: "A dark companion or debris ring throws the system into frequent, lingering eclipses." },
  { name: "Ki-Rich Corona", env: "Ambient Ki", desc: "The star bleeds raw energy — Ki regenerates faster here, but Overload comes quicker too." },
  { name: "Nova Warning", env: "Impending nova", desc: "Instability readings spike — this star may not have long, and everyone can feel it." },
];
const starTrait = (name) => STAR_TRAITS.find(t => t.name === name);
const UNI_SYS_ROOTS = ["Sadal", "Konat", "Yardr", "Cere", "Todok", "Arli", "Brench", "Zeta", "Kanas", "Morvun", "Tarbl", "Vega", "Namek", "Frost", "Ember", "Halox", "Drayen", "Ossul", "Pyria", "Velmor"];
const UNI_SYS_SUFFIX = ["a", "os", "ia", "us", "eon", "ar", "ith", "or", "ex", "is", "un", "el"];
// Palette for galactic factions (empires that claim territory across systems).
const FACTION_COLORS = ["#E5533C", "#5AA9F5", "#F5C542", "#57C97A", "#C77DF5", "#EC6FB0", "#48C7C7", "#E08A3C", "#9B8CF5", "#7FBF4F"];
const FACTION_ROOTS = ["Frieza Force", "Galactic Patrol", "Red Ribbon", "Saiyan Remnant", "Cold Empire", "Free Worlds", "Namekian Concord", "Crimson Syndicate", "Iron Dominion", "Star League", "Void Reavers", "Sable Compact"];

const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const clampIdx = (i, arr) => Math.max(0, Math.min(arr.length - 1, i));

/* ===== Planet classes (Stellaris-style variety) ===== Each class carries a
   habitability tier, a fixed gravity range (rolled once at generation and never
   changes), a colour, and a climate that drives its seasonal weather. Weather is
   picked per-season; hostile/airless worlds ignore seasons (flat tables). ===== */
const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
const WEATHER_CLIMATE = {
  temperate: { Spring: ["Mild rain", "Blossom winds", "Clear skies"], Summer: ["Warm & clear", "Heat haze", "Thunderstorm"], Autumn: ["Crisp air", "Rolling fog", "Steady rain"], Winter: ["Snowfall", "Hard frost", "Cold & clear"] },
  ocean:     { Spring: ["Sea breeze", "Passing squalls", "Calm swells"], Summer: ["Humid heat", "Monsoon rain", "Typhoon warning"], Autumn: ["Coastal storms", "Choppy seas", "Grey drizzle"], Winter: ["Cold rain", "Howling gales", "Sleet"] },
  dry:       { Spring: ["Dust on the breeze", "Dry & clear", "Rare shower"], Summer: ["Scorching heat", "Heat mirage", "Sandstorm"], Autumn: ["Warm days", "Dry winds", "Cooling dusk"], Winter: ["Cold nights", "Frosty dawn", "Clear & mild"] },
  cold:      { Spring: ["Thaw & slush", "Meltwater mist", "Pale sun"], Summer: ["Cool & bright", "Brief green", "Chill wind"], Autumn: ["First frost", "Sleet showers", "Grey freeze"], Winter: ["Blizzard", "Whiteout", "Deep freeze"] },
};
const flatSeasons = (arr) => ({ Spring: arr, Summer: arr, Autumn: arr, Winter: arr });
const WEATHER_HOSTILE = {
  "City-World": flatSeasons(["Smog haze", "Climate-controlled", "Acid drizzle"]),
  Crystalline: flatSeasons(["Resonant winds", "Crystal bloom", "Prismatic storm"]),
  Barren: flatSeasons(["Airless calm", "Meteor shower", "Solar flare exposure"]),
  Molten: flatSeasons(["Ashfall", "Lava geysers", "Firestorm"]),
  Toxic: flatSeasons(["Acid rain", "Toxic fog", "Chemical squall"]),
  Frozen: flatSeasons(["Blizzard", "Ice storm", "Still, killing cold"]),
  "Gas Giant": flatSeasons(["Perpetual storm", "Lightning bands", "Crushing winds"]),
  Asteroid: flatSeasons(["Vacuum", "Micrometeorites", "Silent dark"]),
};
const PLANET_CLASSES = [
  { name: "Gaia", hab: "Habitable", climate: "temperate", g: [0.9, 1.1], color: "#5fe08f" },
  { name: "Continental", hab: "Habitable", climate: "temperate", g: [0.8, 1.3], color: "#4ADE80" },
  { name: "Ocean", hab: "Habitable", climate: "ocean", g: [0.9, 1.4], color: "#4FD1FF" },
  { name: "Tropical", hab: "Habitable", climate: "ocean", g: [0.8, 1.2], color: "#3fcaa0" },
  { name: "Savannah", hab: "Habitable", climate: "temperate", g: [0.8, 1.3], color: "#c8b24a" },
  { name: "City-World", hab: "Habitable", climate: null, g: [0.9, 1.3], color: "#c0c8e0" },
  { name: "Arid", hab: "Marginal", climate: "dry", g: [0.7, 1.4], color: "#e0a24b" },
  { name: "Desert", hab: "Marginal", climate: "dry", g: [0.6, 1.5], color: "#e0813b" },
  { name: "Tundra", hab: "Marginal", climate: "cold", g: [0.8, 1.4], color: "#7fb4c8" },
  { name: "Arctic", hab: "Marginal", climate: "cold", g: [0.8, 1.5], color: "#a8d8f0" },
  { name: "Alpine", hab: "Marginal", climate: "cold", g: [1.0, 2.0], color: "#9fb8d8" },
  { name: "Crystalline", hab: "Hostile", climate: null, g: [0.5, 14], color: "#B990FF" },
  { name: "Molten", hab: "Hostile", climate: null, g: [0.8, 12], color: "#FF5C5C" },
  { name: "Toxic", hab: "Hostile", climate: null, g: [0.7, 1.8], color: "#8fbf3f" },
  { name: "Frozen", hab: "Hostile", climate: null, g: [0.5, 1.6], color: "#bfe0ff" },
  { name: "Barren", hab: "Barren", climate: null, g: [0.2, 1.6], color: "#9AA3B5" },
  { name: "Gas Giant", hab: "Barren", climate: null, g: [8, 50], color: "#d8a86a" },
  { name: "Asteroid", hab: "Barren", climate: null, g: [0.05, 0.3], color: "#8a8a8a" },
];
const planetClass = (name) => PLANET_CLASSES.find(c => c.name === name) || PLANET_CLASSES.find(c => c.name === "Barren");
const classWeather = (name) => { const c = planetClass(name); return c.climate ? WEATHER_CLIMATE[c.climate] : (WEATHER_HOSTILE[name] || flatSeasons(["—"])); };

// --- Weather as registry data (Compendium overhaul, Weather migration) ---------
// Flatten the climate/hostile weather tables into entries keyed by name, each
// carrying the `${climate}|${season}` and `hostile:${class}` slots that generation
// matches on — so weather keeps its climate/season fidelity while becoming an
// editable, enable/disable-able, effect-bearing registry category.
const weatherSlug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const WEATHER_DATA = (() => {
  const bySlug = {};
  const push = (name, slot) => {
    if (!name || name === "—") return;
    const id = weatherSlug(name);
    if (!bySlug[id]) bySlug[id] = { id, name, slots: [], rarity: "common" };
    if (!bySlug[id].slots.includes(slot)) bySlug[id].slots.push(slot);
  };
  for (const climate in WEATHER_CLIMATE) for (const season of SEASONS) for (const w of WEATHER_CLIMATE[climate][season]) push(w, `${climate}|${season}`);
  for (const cls in WEATHER_HOSTILE) for (const w of WEATHER_HOSTILE[cls].Spring) push(w, `hostile:${cls}`);
  return Object.values(bySlug);
})();
const CLIMATE_LABEL = { temperate: "Temperate", ocean: "Ocean", dry: "Dry", cold: "Cold" };
const weatherSlotsLabel = (e) => {
  if (e.climateTag) return `Custom · ${e.climateTag}`;
  const climates = new Set(), classes = new Set();
  (e.slots || []).forEach(s => { if (s.startsWith("hostile:")) classes.add(s.slice(8)); else climates.add(s.split("|")[0]); });
  const parts = [...[...climates].map(c => CLIMATE_LABEL[c] || c), ...[...classes]];
  return parts.length ? parts.join(", ") + " worlds" : "Any world";
};
// Enabled weather entries valid for a planet class + season (registry-driven).
const weatherPool = (entries, cls, season) => {
  const climate = planetClass(cls).climate;
  return (entries || []).filter(e => e.enabled).filter(e => {
    if (e.slots && e.slots.length) return climate ? e.slots.includes(`${climate}|${season}`) : e.slots.includes(`hostile:${cls}`);
    if (e.climateTag) { const t = String(e.climateTag).toLowerCase(); return t === String(climate || "").toLowerCase() || t === String(cls).toLowerCase(); }
    return false;
  });
};
// Weighted pick from an already-filtered pool of registry entries, honoring caps.
function weightedPickFrom(pool, used, catKey) {
  if (!pool || !pool.length) return null;
  const capOk = (e) => e.rarity !== "unique" || (used[`${catKey}:${e._id}`] || 0) < (e.uniqueCount != null ? e.uniqueCount : 1);
  const avail = pool.filter(capOk);
  const use = avail.length ? avail : pool;
  const w = use.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const t = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * t, chosen = use[use.length - 1];
  for (let i = 0; i < use.length; i++) { r -= w[i]; if (r <= 0) { chosen = use[i]; break; } }
  if (used) used[`${catKey}:${chosen._id}`] = (used[`${catKey}:${chosen._id}`] || 0) + 1;
  return chosen;
}
// Generation weather pick: registry pool if mirrored, else the const tables.
function pickWeather(cls, season, used) {
  const all = (CURRENT_REG && CURRENT_REG.weather) || null;
  if (all) { const e = weightedPickFrom(weatherPool(all, cls, season), used, "weather"); if (e) return e._name; }
  return pick(classWeather(cls)[season] || ["—"]);
}
const HAB_ORDER = { Habitable: 3, Marginal: 2, Hostile: 1, Barren: 0 };
const habColor = (hab) => ({ Habitable: COLORS.green, Marginal: COLORS.amber, Hostile: COLORS.red, Barren: COLORS.dim }[hab] || COLORS.dim);
const GRAVITY_MAX = 50;   // the highest gravity (50×) any world may generate at
// A world this heavy (≥10×) can't sustain normal life — it's a crushing gas
// giant (habitation on hovering platforms) or an unstable high-gravity ruin.
const GRAVITY_EXTREME = 10;
const gravityBand = (g) => g == null ? "—" : g < 0.6 ? "Low-g" : g < 1.4 ? "Standard" : g < 2.5 ? "High-g" : g < GRAVITY_EXTREME ? "Crushing" : `${Math.round(g)}× Extreme`;
const gravityColor = (g) => g == null ? COLORS.dim : g < 0.6 ? COLORS.blue : g < 1.4 ? COLORS.green : g < 2.5 ? COLORS.amber : COLORS.red;
const rollGravity = (name) => { const c = planetClass(name); return +Math.min(GRAVITY_MAX, c.g[0] + Math.random() * (c.g[1] - c.g[0])).toFixed(2); };
// Extreme gravity forces a world uninhabitable regardless of its class.
const extremeGravityFlavor = (className) => className === "Gas Giant"
  ? "A crushing gas giant — any habitation clings to hovering platforms above the storm layer."
  : "An unstable high-gravity world, barely holding itself together.";
// Gravity acclimation (Materoids Flavor): a fighter raised/trained under heavy
// gravity carries Lightweight ranks anywhere lighter — 10× → 1, 25× → 2, 50× → 3.
const gravAcclimRanks = (g) => !g ? 0 : g >= 50 ? 3 : g >= 25 ? 2 : g >= GRAVITY_EXTREME ? 1 : 0;
// Environmental gravity → Weighted ranks for anyone standing on the world
// (book Ch.1/9). Near-weightless floats you into Weighted (Light, +); crushing
// gravity drags you into Weighted (Heavy, −). Thresholds mirror gravityBand.
const envGravityRanks = (g) => {
  if (g == null) return 0;
  if (g < 0.15) return 2;                          // near-weightless float
  if (g < 0.6)  return 1;                          // Low-g
  if (g < 1.4)  return 0;                          // Standard, no effect
  if (g < 2.5)  return -1;                         // High-g
  if (g < GRAVITY_EXTREME) return -2;              // Crushing
  return -3 - Math.floor((g - GRAVITY_EXTREME) / 20); // Extreme, worsening with mass
};
// One-line summary of what a world's gravity does to everyone on it, for banners.
const envGravityEffect = (g) => {
  const r = envGravityRanks(g);
  if (!r) return { ranks: 0, kind: "none", label: "Standard gravity · no strain", color: COLORS.green };
  if (r > 0) return { ranks: r, kind: "light", label: `Weighted (Light) ${r}: +${r * 10} ft Speed, +${r} Power`, color: COLORS.blue };
  const h = -r;
  return { ranks: r, kind: "heavy", label: `Weighted (Heavy) ${h}: −${h * 10} ft Speed, −${h} Power`, color: COLORS.red };
};

// Old free-text biomes → new planet classes, for migrating pre-class galaxies.
const OLD_BIOME_MAP = { Desert: "Desert", Ocean: "Ocean", Ice: "Frozen", Volcanic: "Molten", Jungle: "Tropical", "Barren Rock": "Barren", "Gas Giant": "Gas Giant", "City-World": "City-World", "Agri-World": "Continental", "Toxic Waste": "Toxic", Verdant: "Continental", Crystalline: "Crystalline" };
function migratePlanet(p) {
  const cls = (p.class && planetClass(p.class).name === p.class) ? p.class : (OLD_BIOME_MAP[p.biome] || (PLANET_CLASSES.some(c => c.name === p.biome) ? p.biome : "Barren"));
  const c = planetClass(cls);
  const season = SEASONS.includes(p.season) ? p.season : pick(SEASONS);
  const opts = classWeather(cls)[season] || ["—"];
  const gravity = Math.min(GRAVITY_MAX, p.gravity != null ? p.gravity : rollGravity(cls));
  const hab = gravity >= GRAVITY_EXTREME ? "Barren" : c.hab;   // extreme gravity overrides class habitability
  return { ...p, class: cls, biome: cls, habitability: hab, gravity, season, weather: p.weather || opts[0], influence: p.influence ?? 0 };
}

// Terraforming is a colossal, world-reshaping undertaking — it costs the same
// steep Ƶeni price and the FULL Influence outlay no matter what you turn a world
// into. Influence still carries the impoverished penalty (below); Ƶeni does not.
const TERRAFORM_ZENI = 250000;
const TERRAFORM_INF = 150;
// Impoverished worlds under a faction's thumb resist outside influence — actions
// there cost half again as much Influence.
const isImpoverished = (p) => (p.wealthIdx ?? 2) <= 1 || (p.stabilityIdx ?? 2) <= 1;
const influencePenalty = (planet, systemFactionId) => (systemFactionId && isImpoverished(planet)) ? 1.5 : 1;
const withPenalty = (inf, planet, systemFactionId) => Math.round(inf * influencePenalty(planet, systemFactionId));
// Base Influence cost of each world action (before the impoverished penalty).
const INFLUENCE_ACTIONS = {
  revolution: { label: "Lead Revolution", inf: 80, zeni: 0, desc: "Topple the sitting government — install a new one and shake up stability." },
  band: { label: "Form a Band", inf: 40, zeni: 0, desc: "Rally a militia, rebel cell, or crew loyal to your cause." },
  favor: { label: "Call in a Favor", inf: 25, zeni: 0, desc: "Cash in political capital for a one-time boon from the locals." },
};

// Spiral-galaxy layout: normalized [0,1] positions for n systems along 2-3
// logarithmic arms, denser toward the core. Deterministic jitter so a saved
// galaxy always redraws the same way.
// Shared spiral geometry so the drawn arms and the system positions line up.
const SPIRAL_ARMS = (n) => (n > 32 ? 4 : n > 16 ? 3 : 2);
const SPIRAL_TURNS = 1.0;         // gentle sweep — tight coils are what bunched systems into the core
const SPIRAL_RIN = 0.14;          // inner radius floor: nothing sits at dead center
const SPIRAL_ROUT = 0.46;         // outer radius: arms reach near the disk edge
function spiralPositions(n) {
  const arms = SPIRAL_ARMS(n);
  const out = [];
  for (let i = 0; i < n; i++) {
    const arm = i % arms;
    const countInArm = Math.floor((n - 1 - arm) / arms) + 1;   // systems on this arm
    const idxInArm = Math.floor(i / arms);
    const t = countInArm > 1 ? idxInArm / (countInArm - 1) : 0.5; // evenly spaced 0..1 along the arm
    const jr = Math.sin(i * 71.13) * 0.5;                      // -0.5..0.5 deterministic
    const ja = Math.sin(i * 12.9898 + 4.1) * 0.5;             // -0.5..0.5
    const angle = t * SPIRAL_TURNS * Math.PI * 2 + (arm / arms) * Math.PI * 2 + ja * 0.24;
    const radius = SPIRAL_RIN + (SPIRAL_ROUT - SPIRAL_RIN) * t + jr * 0.035;
    out.push({ x: +(0.5 + radius * Math.cos(angle)).toFixed(4), y: +(0.5 + radius * Math.sin(angle)).toFixed(4) });
  }
  return out;
}
// Ensure every system has an {x,y} — backfills galaxies saved before the map.
function ensureGalaxyLayout(galaxy) {
  if (!galaxy) return galaxy;
  const laidOut = galaxy.factions
    && galaxy.systems.every(s => s.x != null && s.y != null && s.planets.every(p => p.class != null))
    && (galaxy.factions || []).every(f => f.influence != null);
  if (laidOut) return galaxy;
  const pos = spiralPositions(galaxy.systems.length);
  return {
    ...galaxy,
    // Factions gain an Influence treasury; backfill existing ones to 0.
    factions: (galaxy.factions || []).map(f => ({ ...f, influence: f.influence ?? 0 })),
    // Backfill: galaxies made before fog-of-war stay fully visible (?? true);
    // freshly generated systems come in undiscovered so players explore. Planets
    // gain a class / gravity / habitability / weather / influence via migratePlanet.
    systems: galaxy.systems.map((s, i) => ({ ...s, x: s.x ?? pos[i].x, y: s.y ?? pos[i].y, factionId: s.factionId ?? null, discovered: s.discovered ?? true, planets: s.planets.map(migratePlanet) })),
  };
}

// Hex placement: pointy-top hexagons laid out in offset rows across [0,1]².
// Snap to the nearest free cell so systems lock to distinct hexes without
// stacking. HEX_COLS controls density; odd rows are shifted half a cell so the
// centers interlock into a proper honeycomb.
const HEX_COLS = 11;
const HEX_DX = 1 / HEX_COLS;                 // column spacing (pointy-top hex width)
const HEX_DY = HEX_DX * Math.sqrt(3) / 2;    // row spacing (3/4 of hex height)
const HEX_R = HEX_DX / Math.sqrt(3);         // circumradius, normalized units
const HEX_CELLS = (() => {
  const out = [];
  const nRows = Math.ceil(1 / HEX_DY) + 1;
  for (let r = 0; r < nRows; r++) {
    const cy = r * HEX_DY + HEX_DY / 2;
    if (cy > 0.99) break;
    const shift = (r & 1) ? HEX_DX / 2 : 0;
    for (let c = 0; c < HEX_COLS; c++) {
      const cx = c * HEX_DX + HEX_DX / 2 + shift;
      if (cx > 0.99) continue;
      out.push({ cx, cy, key: c + "," + r });
    }
  }
  return out;
})();
// SVG polygon points for a pointy-top hex centered at (cx,cy) with radius R.
function hexPoints(cx, cy, R) {
  const p = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 - 90) * Math.PI / 180;
    p.push((cx + R * Math.cos(a)).toFixed(1) + "," + (cy + R * Math.sin(a)).toFixed(1));
  }
  return p.join(" ");
}
function nearestFreeCell(x, y, taken) {
  let best = { x, y }, bd = Infinity;
  for (const cell of HEX_CELLS) {
    if (taken.has(cell.key)) continue;
    const d = (cell.cx - x) ** 2 + (cell.cy - y) ** 2;
    if (d < bd) { bd = d; best = { x: cell.cx, y: cell.cy, key: cell.key }; }
  }
  return best;
}
function nearestCellKey(x, y) {
  let key = null, bd = Infinity;
  for (const cell of HEX_CELLS) {
    const d = (cell.cx - x) ** 2 + (cell.cy - y) ** 2;
    if (d < bd) { bd = d; key = cell.key; }
  }
  return key;
}
function snapOne(x, y, systems, exceptId) {
  const taken = new Set();
  for (const s of systems) {
    if (s.id === exceptId) continue;
    taken.add(nearestCellKey(s.x, s.y));
  }
  return nearestFreeCell(x, y, taken);
}

function uniName(roots) {
  let n = pick(roots) + pick(UNI_SYS_SUFFIX);
  if (Math.random() < 0.25) n += " " + ["Prime", "Major", "Minor", "II", "III", "IV", "IX", "Secundus"][rint(0, 7)];
  else if (Math.random() < 0.2) n += "-" + rint(2, 99);
  return n;
}

// Tax rate is derived, not random noise: corporate/occupied worlds tax hard,
// anarchies barely at all; prosperity and instability nudge it.
function deriveTax(government, wealthIdx, stabilityIdx) {
  const base = { "Corporate Oligarchy": 22, "Frieza Force Occupation": 30, "Absolute Monarchy": 18, "Theocracy": 15, "Ruling Council": 12, "Galactic Patrol Protectorate": 14, "AI Technocracy": 16, "Warlord State": 10, "Tribal Confederacy": 6, "Anarchy": 2 }[government] ?? 12;
  const adj = (wealthIdx - 2) * 2 + (2 - stabilityIdx) * 2;   // richer taxes more; unrest raises desperate levies
  return Math.max(0, Math.min(45, Math.round(base + adj)));
}

function generatePlanet(era, used = {}) {
  // Planet class and population species now come from the World & Rules registry:
  // disabled classes/races never spawn, rarity biases frequency, Unique caps count.
  const c = pickReg("planets", used, PLANET_CLASSES);
  const speciesPick = () => { const e = pickReg("races", used, UNI_SPECIES); return e ? (e._name || e) : "—"; };
  // Gas giants roll extreme naturally; other worlds get a rare unstable spike.
  let gravity = rollGravity(c.name);
  if (c.name !== "Gas Giant" && Math.random() < 0.06) gravity = +Math.min(GRAVITY_MAX, GRAVITY_EXTREME + Math.random() * 20).toFixed(2);
  const hab = gravity >= GRAVITY_EXTREME ? "Barren" : c.hab;   // extreme gravity = uninhabitable
  const uninhabited = (hab === "Barren" || hab === "Hostile") ? Math.random() < 0.85 : Math.random() < 0.08;
  const season = pick(SEASONS);
  const stabilityIdx = uninhabited ? null : clampIdx(rint(1, 4) + (era?.biasStability || 0), UNI_STABILITY);
  const wealthIdx = uninhabited ? null : rint(0, 4);
  const government = uninhabited ? "—" : (Math.random() < 0.5 && era?.biasGov ? pick(era.biasGov) : pick(UNI_GOVERNMENTS));
  return {
    id: uid(),
    name: uniName(UNI_SYS_ROOTS),
    class: c.name, biome: c.name, habitability: hab,
    gravity, season, weather: pickWeather(c.name, season, used), influence: 0,
    population: uninhabited ? "Uninhabited" : UNI_POP[rint(1, UNI_POP.length - 1)],
    species: uninhabited ? "—" : (Math.random() < 0.35 ? `${speciesPick()} & ${speciesPick()}` : speciesPick()),
    economy: uninhabited ? "Uninhabited" : pick(UNI_ECONOMIES),
    wealth: uninhabited ? "—" : UNI_WEALTH[wealthIdx], wealthIdx,
    taxRate: uninhabited ? 0 : deriveTax(government, wealthIdx, stabilityIdx),
    government,
    ruler: uninhabited ? "—" : `${pick(["Warlord", "Governor", "Overlord", "Chief", "Prelate", "Director", "Prince", "Matriarch", "Commander", "Elder"])} ${uniName(UNI_SYS_ROOTS)}`,
    stability: uninhabited ? "—" : UNI_STABILITY[stabilityIdx], stabilityIdx,
    tech: uninhabited ? "—" : UNI_TECH[rint(0, 4)],
    laws: uninhabited ? [] : [...new Set([pick(UNI_LAWS), pick(UNI_LAWS)])],
    feature: pick(UNI_FEATURES),
    homes: [],
  };
}

// A fillable blank planet for "custom" systems where the DM sets everything.
function blankPlanet() {
  return { id: uid(), name: uniName(UNI_SYS_ROOTS), class: "Barren", biome: "Barren", habitability: "Barren", gravity: rollGravity("Barren"), season: "Spring", weather: classWeather("Barren").Spring[0], influence: 0, population: "Uninhabited", species: "—", economy: "Uninhabited", wealth: "—", wealthIdx: null, taxRate: 0, government: "—", ruler: "—", stability: "—", stabilityIdx: null, tech: "—", laws: [], feature: "", homes: [] };
}
function newRandomSystem(eraDef, used = {}) {
  const nPlanets = Math.random() < 0.45 ? rint(1, 2) : rint(2, 5);
  return { id: uid(), name: uniName(UNI_SYS_ROOTS) + " System", star: pick(UNI_STARS), factionId: null, planets: Array.from({ length: nPlanets }, () => generatePlanet(eraDef, used)) };
}

function generateGalaxy({ size = "medium", era = "frontier" } = {}) {
  const sz = GALAXY_SIZES[size] || GALAXY_SIZES.medium;
  const eraDef = GALAXY_ERAS[era];
  const nSystems = rint(sz.systems[0], sz.systems[1]);
  const pos = spiralPositions(nSystems);
  const used = {};   // galaxy-wide tally so Unique entries stay capped across systems
  const systems = Array.from({ length: nSystems }, (_, i) => {
    const nPlanets = Math.random() < 0.45 ? rint(1, 2) : rint(2, 5);
    return {
      id: uid(),
      name: uniName(UNI_SYS_ROOTS) + " System",
      star: pick(UNI_STARS),
      x: pos[i].x, y: pos[i].y, factionId: null, discovered: false,
      planets: Array.from({ length: nPlanets }, () => generatePlanet(eraDef, used)),
    };
  });
  return {
    id: uid(), size, era,
    name: `The ${pick(["Uncharted", "Frontier", "Northern", "Outer", "Forgotten", "Shattered", "Verdant", "Crimson"])} ${pick(["Reaches", "Expanse", "Cluster", "Belt", "Rim", "Spiral"])}`,
    createdAt: Date.now(),
    factions: [],
    systems,
  };
}

// Colors for the two index-based ladders (stability, wealth).
const stabilityColor = (idx) => idx == null ? COLORS.dim : [COLORS.red, COLORS.amber, COLORS.amber, COLORS.green, COLORS.blue][clampIdx(idx, UNI_STABILITY)];
const wealthColor = (idx) => idx == null ? COLORS.dim : [COLORS.red, COLORS.amber, COLORS.muted, COLORS.green, COLORS.gold][clampIdx(idx, UNI_WEALTH)];

function PlanetCard({ planet, characters, onUpdate, onRemove, readOnly, systemFactionId, faction, onInvest, systemConditions, isPartyHome, onSetPartyHome, isCurrent, onSetLocation }) {
  const [edit, setEdit] = useState(false);
  const [terraformOpen, setTerraformOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [earnAmt, setEarnAmt] = useState(1);       // award influence by exact amount (kept scarce)
  const [investAmt, setInvestAmt] = useState(1);
  const p = planet;
  const set = (patch) => onUpdate({ ...p, ...patch });
  const cls = planetClass(p.class || p.biome);
  // Weather options now come from the registry (enable/disable/custom reflect here);
  // fall back to the book tables while the registry is still loading.
  const wreg = useRegistry("weather");
  const wPool = (season, className = p.class || "Barren") => { const names = weatherPool(wreg.entries, className, season).map(e => e._name); return names.length ? names : (classWeather(className)[season] || ["—"]); };
  const penalty = influencePenalty(p, systemFactionId);
  const infPool = p.influence || 0;
  const pushLog = (text, delta) => [{ text, delta, t: Date.now() }, ...(p.influenceLog || [])].slice(0, 10);
  const earn = (amt) => set({ influence: infPool + amt, influenceLog: pushLog("Objective / flavour reward", amt) });
  const act = (baseInf, patch, text) => {
    const cost = withPenalty(baseInf, p, systemFactionId);
    if (infPool < cost) return;
    onUpdate({ ...p, ...patch, influence: infPool - cost, influenceLog: pushLog(text, -cost) });
  };
  const terraform = (targetName) => {
    const t = planetClass(targetName);
    const cost = withPenalty(TERRAFORM_INF, p, systemFactionId);
    if (infPool < cost) return;
    const opts = classWeather(t.name)[p.season || "Spring"] || ["—"];
    // Gravity is a fixed physical property — terraforming never changes it.
    act(TERRAFORM_INF, { class: t.name, biome: t.name, habitability: t.hab, weather: opts[0] }, `Terraformed → ${t.name} (Ƶ${TERRAFORM_ZENI.toLocaleString()})`);
    setTerraformOpen(false);
  };
  const revolution = () => {
    const newGov = pick(UNI_GOVERNMENTS.filter(g => g !== p.government)) || pick(UNI_GOVERNMENTS);
    const ns = clampIdx((p.stabilityIdx ?? 2) + 1, UNI_STABILITY);
    act(INFLUENCE_ACTIONS.revolution.inf, { government: newGov, ruler: `${pick(["Chairman", "General", "Prophet", "Premier", "Warlord", "Chancellor"])} ${uniName(UNI_SYS_ROOTS)}`, stabilityIdx: ns, stability: UNI_STABILITY[ns] }, `Revolution → ${newGov}`);
  };
  const stat = (label, value, color) => (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: color || COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
  const container = (label, value, color) => (
    <div style={{ flex: 1, minWidth: 0, background: COLORS.panel, border: `1px solid ${color}44`, borderRadius: 8, padding: "7px 9px" }}>
      <div style={{ fontSize: 8.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
  const weatherOpts = wPool(p.season || "Spring");
  const inhabited = p.economy !== "Uninhabited";
  const canAct = !readOnly || characters.length > 0;   // players get world-actions too
  const actionBtn = (key, onClick) => {
    const a = INFLUENCE_ACTIONS[key];
    const cost = withPenalty(a.inf, p, systemFactionId);
    return <Btn key={key} size="sm" variant="ghost" disabled={infPool < cost} title={a.desc} onClick={onClick} style={infPool < cost ? { opacity: 0.5 } : {}}>{a.label} · {cost}</Btn>;
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${isPartyHome ? COLORS.gold + "88" : isCurrent ? COLORS.blue + "88" : COLORS.border}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 30% 30%, ${cls.color}, ${COLORS.panel})`, border: `1px solid ${COLORS.border}`, boxShadow: `0 0 8px ${cls.color}55` }} />
        {edit && !readOnly
          ? <TextInput value={p.name} onChange={e => set({ name: e.target.value })} style={{ fontWeight: 700, fontSize: 14, padding: "3px 6px" }} />
          : <div style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{p.name}</div>}
        <Tag color={cls.color}>{p.class || p.biome}</Tag>
        {!readOnly && <Btn size="sm" variant={edit ? "gold" : "ghost"} onClick={() => setEdit(!edit)}><Wrench size={12} /></Btn>}
        {!readOnly && <Btn size="sm" variant="ghost" onClick={onRemove}><Trash2 size={12} /></Btn>}
      </div>
      {(isPartyHome || isCurrent) && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 11, fontWeight: 700 }}>
          {isPartyHome && <span style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.gold }}><Crown size={13} /> Party Home</span>}
          {isCurrent && <span style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.blue }}><Rocket size={12} /> Party is here</span>}
        </div>
      )}
      {/* Physical containers — habitability, (fixed) gravity, current weather */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {container("Habitability", p.habitability || cls.hab, habColor(p.habitability || cls.hab))}
        {container("Gravity", `${p.gravity ?? "—"}g · ${gravityBand(p.gravity)}`, gravityColor(p.gravity))}
        {container("Weather", p.weather || "—", COLORS.blue)}
      </div>
      {systemConditions && systemConditions.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: COLORS.amber, textTransform: "uppercase", letterSpacing: 0.5 }}>Star</span>
          {systemConditions.map((cnd, i) => <Tag key={i} color={COLORS.amber}>{cnd}</Tag>)}
        </div>
      )}
      {(p.gravity || 0) >= GRAVITY_EXTREME && (
        <div style={{ fontSize: 11, color: COLORS.red, lineHeight: 1.45, marginBottom: 8, fontStyle: "italic" }}>⚠ {extremeGravityFlavor(p.class || p.biome)}</div>
      )}
      {/* Season → current weather picker (weather shifts with the season) */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
        <span style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Season</span>
        <Select value={p.season || "Spring"} onChange={e => { const s = e.target.value; const o = wPool(s); set({ season: s, weather: o.includes(p.weather) ? p.weather : o[0] }); }} style={{ flex: 1, padding: "4px 6px", fontSize: 12 }}>{SEASONS.map(s => <option key={s}>{s}</option>)}</Select>
        <Select value={weatherOpts.includes(p.weather) ? p.weather : weatherOpts[0]} onChange={e => set({ weather: e.target.value })} style={{ flex: 2, padding: "4px 6px", fontSize: 12 }}>{weatherOpts.map(w => <option key={w}>{w}</option>)}</Select>
      </div>
      {edit ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Field label="Planet Class"><Select value={p.class || "Barren"} onChange={e => { const t = planetClass(e.target.value); const o = wPool(p.season || "Spring", t.name); set({ class: t.name, biome: t.name, habitability: t.hab, weather: o[0] }); }}>{PLANET_CLASSES.map(c => <option key={c.name}>{c.name}</option>)}</Select></Field>
          <Field label="Gravity (g)"><TextInput type="number" step="0.1" value={p.gravity ?? 1} onChange={e => set({ gravity: +e.target.value })} /></Field>
          <Field label="Economy"><Select value={p.economy} onChange={e => set({ economy: e.target.value })}>{["Uninhabited", ...UNI_ECONOMIES].map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Government"><Select value={p.government} onChange={e => set({ government: e.target.value })}>{["—", ...UNI_GOVERNMENTS].map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Wealth"><Select value={p.wealth} onChange={e => { const i = UNI_WEALTH.indexOf(e.target.value); set({ wealth: e.target.value, wealthIdx: i }); }}>{UNI_WEALTH.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Stability"><Select value={p.stability} onChange={e => { const i = UNI_STABILITY.indexOf(e.target.value); set({ stability: e.target.value, stabilityIdx: i }); }}>{UNI_STABILITY.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Tax Rate %"><TextInput type="number" value={p.taxRate} onChange={e => set({ taxRate: Math.max(0, Math.min(100, +e.target.value || 0)) })} /></Field>
          <Field label="Ruler"><TextInput value={p.ruler} onChange={e => set({ ruler: e.target.value })} /></Field>
          <Field label="Species"><TextInput value={p.species} onChange={e => set({ species: e.target.value })} /></Field>
          <Field label="Tech"><Select value={p.tech} onChange={e => set({ tech: e.target.value })}>{UNI_TECH.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Notable Feature"><TextInput value={p.feature} onChange={e => set({ feature: e.target.value })} /></Field></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <TagListEditor label="Laws" items={p.laws || []} onAdd={v => set({ laws: [...(p.laws || []), v] })} onRemove={i => set({ laws: (p.laws || []).filter((_, j) => j !== i) })} color={COLORS.amber} placeholder="Add a law..." />
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 8 }}>
            {stat("Economy", p.economy, COLORS.green)}
            {stat("Wealth", p.wealth, wealthColor(p.wealthIdx))}
            {stat("Tax", inhabited ? `${p.taxRate}%` : "—", p.taxRate > 20 ? COLORS.red : COLORS.text)}
            {stat("Government", p.government)}
            {stat("Stability", p.stability, stabilityColor(p.stabilityIdx))}
            {stat("Tech", p.tech)}
            {stat("Population", p.population)}
            {stat("Species", p.species, COLORS.blue)}
            {stat("Ruler", p.ruler)}
          </div>
          {(p.laws || []).length > 0 && <div style={{ marginBottom: 6 }}>{p.laws.map((l, i) => <Tag key={i} color={COLORS.amber}>{l}</Tag>)}</div>}
          {p.feature && <div style={{ fontSize: 11.5, color: COLORS.dim, fontStyle: "italic", marginBottom: 8 }}>{p.feature}</div>}
        </>
      )}
      {/* Influence — the political capital invested in this world. Players earn it
          from objectives/flavour and spend it to reshape the planet. */}
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.purple}44`, borderRadius: 8, padding: 10, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <TrendingUp size={13} color={COLORS.purple} />
          <span style={{ fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Influence</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 15, color: COLORS.purple }}>{infPool}</span>
          {penalty > 1 && <Tag color={COLORS.red}>×{penalty} impoverished</Tag>}
          <div style={{ flex: 1 }} />
          {canAct && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }} title="Award an exact amount for a completed objective or flavour — Influence should be rare">
              <TextInput type="number" min="1" value={earnAmt} onChange={e => setEarnAmt(Math.max(0, +e.target.value || 0))} style={{ width: 50, textAlign: "center", padding: "3px 4px" }} />
              <Btn size="sm" variant="ghost" disabled={earnAmt <= 0} onClick={() => earn(earnAmt)}>Award</Btn>
            </div>
          )}
        </div>
        {penalty > 1 && <div style={{ fontSize: 10, color: COLORS.red, marginBottom: 6 }}>Under {faction?.name || "faction"} rule and impoverished — every action costs half again as much Influence.</div>}
        {faction && onInvest && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 11, flexWrap: "wrap" }}>
            <span style={{ color: COLORS.dim }}>{faction.name} treasury: <b style={{ color: faction.color }}>{faction.influence || 0}</b></span>
            <TextInput type="number" min="1" value={investAmt} onChange={e => setInvestAmt(Math.max(0, +e.target.value || 0))} style={{ width: 50, textAlign: "center", padding: "3px 4px" }} />
            <Btn size="sm" variant="ghost" disabled={(faction.influence || 0) < investAmt || investAmt <= 0} onClick={() => onInvest(investAmt)} title="Move this exact amount from the faction treasury onto this world">Invest</Btn>
          </div>
        )}
        {canAct && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Btn size="sm" variant="ghost" onClick={() => setTerraformOpen(o => !o)}><Globe2 size={12} /> Terraform</Btn>
            {actionBtn("revolution", revolution)}
            {actionBtn("band", () => act(INFLUENCE_ACTIONS.band.inf, {}, INFLUENCE_ACTIONS.band.label))}
            {actionBtn("favor", () => act(INFLUENCE_ACTIONS.favor.inf, {}, INFLUENCE_ACTIONS.favor.label))}
            {(p.influenceLog || []).length > 0 && <Btn size="sm" variant="ghost" onClick={() => setLogOpen(o => !o)}>{logOpen ? "Hide log" : "Log"}</Btn>}
          </div>
        )}
        {terraformOpen && (
          <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
            <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 6 }}>Terraform to any class — gravity stays fixed. Flat cost: <b style={{ color: COLORS.gold }}>Ƶ{TERRAFORM_ZENI.toLocaleString()}</b> + <b style={{ color: COLORS.purple }}>{withPenalty(TERRAFORM_INF, p, systemFactionId)} Influence</b>{penalty > 1 ? " (impoverished penalty applied)" : ""} — the same no matter the target.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 6 }}>
              {PLANET_CLASSES.filter(c => c.name !== (p.class || p.biome)).map(c => {
                const afford = infPool >= withPenalty(TERRAFORM_INF, p, systemFactionId);
                return (
                  <button key={c.name} disabled={!afford} onClick={() => terraform(c.name)} style={{ textAlign: "left", cursor: afford ? "pointer" : "not-allowed", opacity: afford ? 1 : 0.5, background: COLORS.panel2, border: `1px solid ${c.color}55`, borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: c.color }}>{c.name}</div>
                    <div style={{ fontSize: 9.5, color: COLORS.muted }}>{c.hab}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {logOpen && (p.influenceLog || []).length > 0 && (
          <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
            {p.influenceLog.map((e, i) => <div key={i} style={{ fontSize: 10.5, color: COLORS.muted, display: "flex", justifyContent: "space-between", gap: 8 }}><span>{e.text}</span><span style={{ color: e.delta >= 0 ? COLORS.green : COLORS.red, fontFamily: "JetBrains Mono, monospace" }}>{e.delta >= 0 ? "+" : ""}{e.delta}</span></div>)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
        <Btn size="sm" variant={isPartyHome ? "gold" : "ghost"} onClick={onSetPartyHome}><HomeIcon size={11} /> {isPartyHome ? "Party Home ✓" : "Set as Party Home"}</Btn>
        {onSetLocation && <Btn size="sm" variant={isCurrent ? "blue" : "ghost"} onClick={onSetLocation}><Rocket size={11} /> {isCurrent ? "Landed here ✓" : "Land here"}</Btn>}
        <span style={{ fontSize: 10, color: COLORS.dim }}>Placeholder — ties into the Session tab.</span>
      </div>
    </div>
  );
}

function GalaxyForge({ onGenerate }) {
  const [size, setSize] = useState("medium");
  const [era, setEra] = useState("frontier");
  const importRef = useRef(null);
  const importGalaxy = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const g = JSON.parse(reader.result); if (!Array.isArray(g.systems)) throw 0; onGenerate(ensureGalaxyLayout(g)); } catch { alert("Couldn't read that galaxy file — expected an exported galaxy JSON."); } };
    reader.readAsText(f); e.target.value = "";
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, maxWidth: 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <Orbit size={34} style={{ color: COLORS.gold, marginBottom: 8 }} />
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 18 }}>Forge a Galaxy</div>
        <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>Generate the systems and worlds your campaign takes place across. Everything is editable after.</div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Size</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
        {Object.entries(GALAXY_SIZES).map(([k, s]) => (
          <div key={k} onClick={() => setSize(k)} style={{ cursor: "pointer", padding: 12, borderRadius: 8, background: size === k ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${size === k ? COLORS.gold : COLORS.border}` }}>
            <div style={{ fontWeight: 700, color: size === k ? COLORS.gold : COLORS.text }}>{s.label}</div>
            <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 2 }}>{s.systems[0]}–{s.systems[1]} systems</div>
            <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 4, lineHeight: 1.35 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Era (flavors what forms)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {Object.entries(GALAXY_ERAS).map(([k, e]) => (
          <span key={k} onClick={() => setEra(k)} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, borderRadius: 16, padding: "5px 12px", background: era === k ? `${COLORS.blue}22` : COLORS.panel2, color: era === k ? COLORS.blue : COLORS.dim, border: `1px solid ${era === k ? COLORS.blue + "66" : COLORS.border}` }}>{e.label}</span>
        ))}
      </div>
      <Btn variant="gold" onClick={() => onGenerate(generateGalaxy({ size, era }))} style={{ width: "100%", justifyContent: "center", padding: "12px" }}><Sparkles size={16} /> Generate Galaxy</Btn>
      <input ref={importRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importGalaxy} />
      <Btn onClick={() => importRef.current?.click()} style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: 10 }}><Upload size={15} /> Import a Galaxy File</Btn>
    </div>
  );
}

// The spiral galaxy map (Stellaris-style): faint arms with system nodes dropped
// in, colored by controlling faction (else star color). Click a node to select a
// system; in claim mode, click toggles faction ownership. Nodes are draggable to
// reposition; with the grid on, drops snap to grid cells.
function GalaxySpiral({ galaxy, selectedId, onSelect, claimFactionId, onToggleClaim, showGrid, onMove, isDM, highlightIds }) {
  const S = 1000;
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null); // { id, x, y, moved }
  const factionColor = (id) => galaxy.factions?.find(f => f.id === id)?.color;
  // Players only see discovered systems; the DM sees the whole map (fog is a haze).
  const shown = isDM ? galaxy.systems : galaxy.systems.filter(s => s.discovered);
  const canDrag = isDM;
  // The party ship sits at the current-location system; a crown marks home.
  const currentSysId = galaxy.currentPlanetId ? (galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.currentPlanetId)) || {}).id : null;
  const homeSysId = galaxy.partyHomePlanetId ? (galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.partyHomePlanetId)) || {}).id : null;
  const arms = SPIRAL_ARMS(galaxy.systems.length);
  const armPath = (arm) => {
    let d = "";
    for (let k = 0; k <= 60; k++) {
      const t = k / 60;
      const angle = t * SPIRAL_TURNS * Math.PI * 2 + (arm / arms) * Math.PI * 2;
      const radius = SPIRAL_RIN + (SPIRAL_ROUT - SPIRAL_RIN) * t;
      const x = (0.5 + radius * Math.cos(angle)) * S;
      const y = (0.5 + radius * Math.sin(angle)) * S;
      d += (k === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return d;
  };
  const evtToNorm = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX);
    const cy = (e.touches ? e.touches[0].clientY : e.clientY);
    return { x: Math.max(0.02, Math.min(0.98, (cx - r.left) / r.width)), y: Math.max(0.02, Math.min(0.98, (cy - r.top) / r.height)) };
  };
  const startDrag = (e, s) => { e.stopPropagation(); if (!canDrag) { claimFactionId ? onToggleClaim(s.id) : onSelect(s.id); return; } setDrag({ id: s.id, x: s.x, y: s.y, moved: false }); };
  const onMouseMove = (e) => {
    if (!drag) return;
    let { x, y } = evtToNorm(e);
    if (showGrid) { const c = snapOne(x, y, galaxy.systems, drag.id); x = c.x; y = c.y; }
    setDrag(d => ({ ...d, x, y, moved: true }));
  };
  const endDrag = () => {
    if (!drag) return;
    if (drag.moved) onMove(drag.id, drag.x, drag.y);
    else (claimFactionId ? onToggleClaim(drag.id) : onSelect(drag.id));
    setDrag(null);
  };
  const posOf = (s) => (drag && drag.id === s.id) ? { x: drag.x, y: drag.y } : { x: s.x, y: s.y };
  const dist2 = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;

  // Faction auras: each claimed system radiates its faction color across the hex
  // tiling. A cell takes the faction pulling hardest on it; the pull is a squared
  // falloff so overlapping claims pile up — brightest at the heart of a territory,
  // dying away toward the frontier. Works whether or not the grid outlines show.
  const AURA_R = HEX_DX * 2.6;
  const claimedPts = shown.filter(s => s.factionId && factionColor(s.factionId)).map(s => ({ ...posOf(s), factionId: s.factionId }));
  const auraCells = claimedPts.length ? HEX_CELLS.map(cell => {
    const byFac = {};
    for (const p of claimedPts) {
      const d = Math.sqrt(dist2(cell.cx, cell.cy, p.x, p.y));
      if (d >= AURA_R) continue;
      const f = 1 - d / AURA_R;
      byFac[p.factionId] = (byFac[p.factionId] || 0) + f * f;
    }
    let bestId = null, best = 0;
    for (const id in byFac) if (byFac[id] > best) { best = byFac[id]; bestId = id; }
    return bestId ? { key: cell.key, cell, color: factionColor(bestId), alpha: Math.min(0.55, best * 0.4) } : null;
  }).filter(Boolean) : [];

  // Fog of war: unexplored space clouds over. A cell clears within FOG_R of any
  // discovered system and fogs up beyond it. Players get thick fog that hides
  // everything unrevealed; the DM sees a light haze and the whole map underneath.
  const FOG_R = HEX_DX * 1.7;
  const discoveredSys = galaxy.systems.filter(s => s.discovered);
  const fogCells = HEX_CELLS.map(cell => {
    if (!discoveredSys.length) return { key: cell.key, cell, fog: 1 };
    let minD = Infinity;
    for (const s of discoveredSys) { const p = posOf(s); minD = Math.min(minD, Math.sqrt(dist2(cell.cx, cell.cy, p.x, p.y))); }
    return { key: cell.key, cell, fog: Math.max(0, Math.min(1, (minD - FOG_R) / FOG_R)) };
  }).filter(c => c.fog > 0.02);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${S} ${S}`}
      onMouseMove={onMouseMove} onMouseUp={endDrag} onMouseLeave={endDrag}
      onTouchMove={onMouseMove} onTouchEnd={endDrag}
      style={{ width: "100%", aspectRatio: "1 / 1", display: "block", background: "radial-gradient(circle at 50% 50%, #131a2b 0%, #0b0e17 70%)", borderRadius: 12, border: `1px solid ${COLORS.border}`, touchAction: "none" }}>
      <defs>
        <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8fb4ff" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#5a6ea0" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={S / 2} cy={S / 2} r={S * 0.46} fill="url(#galaxyCore)" />
      {Array.from({ length: arms }).map((_, a) => (
        <path key={a} d={armPath(a)} fill="none" stroke="#5f76b8" strokeWidth={S * 0.06} strokeLinecap="round" opacity="0.10" />
      ))}
      {/* Faction auras — filled hexes, densest at the territory heart */}
      {auraCells.map(a => (
        <polygon key={"a" + a.key} points={hexPoints(a.cell.cx * S, a.cell.cy * S, HEX_R * S)} fill={a.color} stroke="none" opacity={a.alpha} style={{ filter: `drop-shadow(0 0 ${S * 0.012}px ${a.color})` }} />
      ))}
      {showGrid && HEX_CELLS.map(cell => (
        <polygon key={cell.key} points={hexPoints(cell.cx * S, cell.cy * S, HEX_R * S)} fill="none" stroke="#33405f" strokeWidth="1" opacity="0.45" />
      ))}
      {/* Fog of war — thick for players, a light haze the DM sees through */}
      {fogCells.map(f => (
        <polygon key={"f" + f.key} points={hexPoints(f.cell.cx * S, f.cell.cy * S, HEX_R * S * 1.02)} fill={isDM ? "#0a1120" : "#070a12"} opacity={isDM ? 0.1 + 0.16 * f.fog : 0.55 + 0.4 * f.fog} style={{ pointerEvents: "none" }} />
      ))}
      {shown.map(s => {
        const c = factionColor(s.factionId) || s.star.color;
        const sel = s.id === selectedId; const p = posOf(s);
        const hasHome = s.planets.some(pl => pl.id === galaxy.partyHomePlanetId);
        const dragging = drag && drag.id === s.id;
        const undiscovered = isDM && !s.discovered;           // DM sees it at full color; dashed ring flags "not yet revealed"
        const nomatch = highlightIds && !highlightIds.has(s.id);   // dimmed by the filter
        const hit = highlightIds && highlightIds.has(s.id);
        const r = sel || dragging ? 15 : 9;
        return (
          <g key={s.id} onMouseDown={(e) => startDrag(e, s)} onTouchStart={(e) => startDrag(e, s)} style={{ cursor: canDrag ? (dragging ? "grabbing" : "grab") : "pointer", opacity: nomatch ? 0.18 : 1 }}>
            {hit && <circle cx={p.x * S} cy={p.y * S} r={r + 9} fill="none" stroke={COLORS.blue} strokeWidth={3} opacity={0.9} style={{ filter: `drop-shadow(0 0 8px ${COLORS.blue})` }} />}
            <circle cx={p.x * S} cy={p.y * S} r={r} fill={c} stroke={sel ? "#fff" : undiscovered ? "#8fa2c8" : (hasHome ? COLORS.gold : "#0b0e17")} strokeWidth={sel ? 3 : hasHome ? 3 : 2} strokeDasharray={undiscovered ? "4 3" : undefined} style={{ filter: `drop-shadow(0 0 ${sel || dragging ? 10 : 5}px ${c})` }} />
            {s.id === homeSysId && (
              <g transform={`translate(${p.x * S}, ${p.y * S - r - 18}) scale(1.5)`} style={{ pointerEvents: "none" }}>
                <path d="M-8,5 L-8.5,-5 L-3.5,0 L0,-7 L3.5,0 L8.5,-5 L8,5 Z" fill={COLORS.gold} stroke="#0b0e17" strokeWidth="0.8" style={{ filter: `drop-shadow(0 0 4px ${COLORS.gold})` }} />
              </g>
            )}
            {s.id === currentSysId && (
              <g transform={`translate(${p.x * S + r + 11}, ${p.y * S - r - 11}) scale(1.6)`} style={{ pointerEvents: "none" }}>
                <circle r="13" fill="none" stroke={COLORS.blue} strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <path d="M0,-12 L7,8 L0,3.5 L-7,8 Z" fill={COLORS.blue} stroke="#eaf4ff" strokeWidth="1" style={{ filter: `drop-shadow(0 0 6px ${COLORS.blue})` }} />
              </g>
            )}
            {(sel || claimFactionId || dragging || hit) && <text x={p.x * S} y={p.y * S - 20} textAnchor="middle" fontSize="22" fill="#cdd6ea" fontFamily="Inter, sans-serif">{s.name.replace(/ System$/, "")}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// New System dialog — fully random, or custom (name / star / planets, and
// whether the planets are randomly rolled or blank for the DM to fill in).
function NewSystemModal({ galaxy, onCreate, onCancel }) {
  const [mode, setMode] = useState("random");
  const [name, setName] = useState(() => uniName(UNI_SYS_ROOTS));
  const [starType, setStarType] = useState(UNI_STARS[0].type);
  const [planetCount, setPlanetCount] = useState(2);
  const [randomPlanets, setRandomPlanets] = useState(true);
  const eraDef = GALAXY_ERAS[galaxy.era];
  const create = () => {
    if (mode === "random") return onCreate(newRandomSystem(eraDef));
    const star = UNI_STARS.find(s => s.type === starType) || UNI_STARS[0];
    const planets = Array.from({ length: planetCount }, () => randomPlanets ? generatePlanet(eraDef) : blankPlanet());
    onCreate({ id: uid(), name: /System$/.test(name.trim()) ? name.trim() : name.trim() + " System", star, factionId: null, planets });
  };
  const seg = (k, label) => (
    <button key={k} onClick={() => setMode(k)} style={{ flex: 1, padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: mode === k ? `${COLORS.gold}1A` : COLORS.panel2, color: mode === k ? COLORS.gold : COLORS.muted, border: `1px solid ${mode === k ? COLORS.gold : COLORS.border}` }}>{label}</button>
  );
  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, width: 460, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 16 }}>New System</div>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={onCancel}><X size={15} /></Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>{seg("random", "Random")}{seg("custom", "Build it")}</div>
        {mode === "random" ? (
          <div style={{ fontSize: 12.5, color: COLORS.dim, lineHeight: 1.5, marginBottom: 16 }}>Roll a fully random system — star, planets, and each world's economy, government, stability and features. Drop it anywhere on the map and edit any planet afterward.</div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <Field label="System Name"><div style={{ display: "flex", gap: 6 }}><TextInput value={name} onChange={e => setName(e.target.value)} /><Btn size="sm" onClick={() => setName(uniName(UNI_SYS_ROOTS))}><Shuffle size={13} /></Btn></div></Field>
            <Field label="Star"><Select value={starType} onChange={e => setStarType(e.target.value)}>{UNI_STARS.map(s => <option key={s.type}>{s.type}</option>)}</Select></Field>
            <Field label="Planets">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Btn size="sm" onClick={() => setPlanetCount(Math.max(1, planetCount - 1))}><Minus size={12} /></Btn>
                <span style={{ width: 26, textAlign: "center", fontWeight: 700 }}>{planetCount}</span>
                <Btn size="sm" onClick={() => setPlanetCount(Math.min(8, planetCount + 1))}><Plus size={12} /></Btn>
              </div>
            </Field>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, cursor: "pointer" }}>
              <Checkbox checked={randomPlanets} onChange={e => setRandomPlanets(e.target.checked)} />
              <span style={{ fontSize: 12.5, color: COLORS.text }}>Roll random planets {randomPlanets ? "" : "— blank worlds to fill in yourself"}</span>
            </label>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Btn variant="gold" onClick={create} style={{ flex: 1, justifyContent: "center" }}>{mode === "random" ? <><Dices size={14} /> Generate & Place</> : <><Check size={14} /> Create & Place</>}</Btn>
          <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

// Solar-system level: an orbital diagram of one system's star + planets, with a
// full PlanetCard (containers, weather, terraform, influence) for each world.
function SolarSystemView({ system, characters, faction, isDM, onBack, onUpdatePlanet, onRemovePlanet, onAddPlanet, onInvest, onUpdateStar, partyHomeId, onSetPartyHome, currentPlanetId, onSetLocation }) {
  const [starEdit, setStarEdit] = useState(false);
  const S = 400;
  const planets = system.planets;
  const n = planets.length;
  const star = system.star;
  const traits = (star.traits || []).map(starTrait).filter(Boolean);
  const twin = traits.some(t => t.twin);
  const envs = traits.map(t => t.env).filter(Boolean);
  const toggleTrait = (name) => { const cur = star.traits || []; onUpdateStar({ traits: cur.includes(name) ? cur.filter(x => x !== name) : [...cur, name] }); };
  const rings = planets.map((p, i) => {
    const r = n <= 1 ? 0.3 : 0.16 + 0.3 * (i / (n - 1));
    const a = i * 2.399963 + 0.6;                       // golden-angle spread so orbits don't line up
    return { p, r, x: 0.5 + r * Math.cos(a), y: 0.5 + r * Math.sin(a) };
  });
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <Btn size="sm" variant="ghost" onClick={onBack}><ArrowLeft size={14} /> Galaxy</Btn>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: faction?.color || star.color, boxShadow: `0 0 12px ${faction?.color || star.color}` }} />
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 17 }}>{system.name.replace(/ System$/, "")} System</div>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>{star.type} · {n} planet{n === 1 ? "" : "s"}</span>
        {faction && <Tag color={faction.color}>{faction.name} territory</Tag>}
        {traits.map(t => <Tag key={t.name} color={COLORS.amber}>{t.name}</Tag>)}
        <div style={{ flex: 1 }} />
        {isDM && <Btn size="sm" variant={starEdit ? "gold" : "default"} onClick={() => setStarEdit(o => !o)}><Sparkles size={13} /> Star</Btn>}
        {isDM && <Btn size="sm" onClick={onAddPlanet}><Plus size={13} /> Planet</Btn>}
      </div>
      {/* System-wide star effects — a condition on the star touches every world */}
      {traits.length > 0 && (
        <div style={{ background: `${COLORS.amber}12`, border: `1px solid ${COLORS.amber}44`, borderRadius: 10, padding: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: COLORS.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Star modifiers — apply to every planet in this system</div>
          {traits.map(t => (
            <div key={t.name} style={{ fontSize: 11.5, color: COLORS.text, marginBottom: 3 }}><b style={{ color: COLORS.amber }}>{t.name}</b>{t.env ? <span style={{ color: COLORS.dim }}> · {t.env}</span> : null} — <span style={{ color: COLORS.muted }}>{t.desc}</span></div>
          ))}
        </div>
      )}
      {isDM && starEdit && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Star Type</span>
            <Select value={star.type} onChange={e => { const s = UNI_STARS.find(x => x.type === e.target.value) || UNI_STARS[0]; onUpdateStar({ type: s.type, color: s.color }); }} style={{ maxWidth: 200 }}>{UNI_STARS.map(s => <option key={s.type}>{s.type}</option>)}</Select>
          </div>
          <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 6 }}>Modifiers (tap to toggle — each applies system-wide):</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {STAR_TRAITS.map(t => { const on = (star.traits || []).includes(t.name); return (
              <span key={t.name} onClick={() => toggleTrait(t.name)} title={t.desc} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, borderRadius: 14, padding: "4px 11px", background: on ? `${COLORS.amber}22` : COLORS.panel2, color: on ? COLORS.amber : COLORS.muted, border: `1px solid ${on ? COLORS.amber : COLORS.border}` }}>{on ? "✓ " : "+ "}{t.name}</span>
            ); })}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 300px", minWidth: 260, position: "sticky", top: 8 }}>
          <svg viewBox={`0 0 ${S} ${S}`} style={{ width: "100%", aspectRatio: "1 / 1", background: "radial-gradient(circle at 50% 50%, #10131f 0%, #0b0e17 70%)", borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
            {rings.map((ring, i) => <circle key={"o" + i} cx={S / 2} cy={S / 2} r={ring.r * S} fill="none" stroke="#2a3350" strokeWidth="1" opacity="0.5" />)}
            {twin ? <>
              <circle cx={S / 2 - 11} cy={S / 2} r={13} fill={star.color} style={{ filter: `drop-shadow(0 0 14px ${star.color})` }} />
              <circle cx={S / 2 + 11} cy={S / 2} r={11} fill={star.color} style={{ filter: `drop-shadow(0 0 12px ${star.color})` }} />
            </> : <circle cx={S / 2} cy={S / 2} r={16} fill={star.color} style={{ filter: `drop-shadow(0 0 16px ${star.color})` }} />}
            {rings.map((ring) => { const c = planetClass(ring.p.class || ring.p.biome); return (
              <g key={ring.p.id}>
                <circle cx={ring.x * S} cy={ring.y * S} r={ring.p.id === partyHomeId ? 10 : 8} fill={c.color} stroke={ring.p.id === partyHomeId ? COLORS.gold : "#0b0e17"} strokeWidth="2" style={{ filter: `drop-shadow(0 0 6px ${c.color})` }} />
                <text x={ring.x * S} y={ring.y * S - 14} textAnchor="middle" fontSize="12" fill="#cdd6ea" fontFamily="Inter, sans-serif">{ring.p.name}</text>
              </g>
            ); })}
          </svg>
        </div>
        <div style={{ flex: "2 1 400px", minWidth: 300, display: "flex", flexDirection: "column", gap: 10 }}>
          {planets.map(p => (
            <PlanetCard key={p.id} planet={p} characters={characters} readOnly={!isDM} systemFactionId={system.factionId} faction={faction} systemConditions={envs} onInvest={amt => onInvest(p.id, amt)}
              isPartyHome={p.id === partyHomeId} onSetPartyHome={() => onSetPartyHome(p.id)}
              isCurrent={p.id === currentPlanetId} onSetLocation={onSetLocation ? () => onSetLocation(p.id) : null}
              onUpdate={pl => onUpdatePlanet(pl)} onRemove={() => onRemovePlanet(p.id)} />
          ))}
          {planets.length === 0 && <EmptyState icon={Orbit} title="No planets" body={isDM ? "Add a planet to this system." : "This system has no charted worlds."} />}
        </div>
      </div>
    </div>
  );
}

// Every attribute that personifies a world (plus the system's star trait), so the
// DM can filter the map for "where is X" instead of doom-searching. `scope:system`
// reads the star; the rest read each planet. `list` values are arrays (laws, traits).
const GALAXY_FILTERS = [
  { key: "class",      label: "Planet Class", get: (p) => p.class || p.biome },
  { key: "species",    label: "Species",      get: (p) => p.species, split: true },
  { key: "gravity",    label: "Gravity Band", get: (p) => gravityBand(p.gravity) },
  { key: "weather",    label: "Weather",      get: (p) => p.weather },
  { key: "economy",    label: "Economy",      get: (p) => p.economy },
  { key: "wealth",     label: "Wealth",       get: (p) => p.wealth },
  { key: "stability",  label: "Stability",    get: (p) => p.stability },
  { key: "tech",       label: "Tech",         get: (p) => p.tech },
  { key: "government", label: "Government",    get: (p) => p.government },
  { key: "feature",    label: "Feature",      get: (p) => p.feature },
  { key: "laws",       label: "Law",          get: (p) => p.laws, list: true },
  { key: "star",       label: "Star Trait",   get: (s) => (s.star && s.star.traits) || [], list: true, scope: "system" },
];
const galaxyFilter = (k) => GALAXY_FILTERS.find(f => f.key === k);
const SKIP_VALUES = new Set(["—", "", "Uninhabited"]);
// Distinct values present in the galaxy for an attribute, for the value dropdown.
function galaxyFilterValues(galaxy, attrKey) {
  const def = galaxyFilter(attrKey); if (!def) return [];
  const set = new Set();
  const items = def.scope === "system" ? galaxy.systems : galaxy.systems.flatMap(s => s.planets);
  for (const it of items) {
    const raw = def.get(it);
    if (def.list) (raw || []).forEach(v => { if (v && !SKIP_VALUES.has(v)) set.add(v); });
    else if (def.split) String(raw || "").split(/\s*&\s*/).forEach(v => { v = v.trim(); if (v && !SKIP_VALUES.has(v)) set.add(v); });
    else if (raw != null && !SKIP_VALUES.has(raw)) set.add(raw);
  }
  return [...set].sort();
}
function systemMatchesFilter(sys, attrKey, value) {
  const def = galaxyFilter(attrKey); if (!def || !value) return true;
  if (def.scope === "system") return (def.get(sys) || []).includes(value);
  return (sys.planets || []).some(p => {
    const raw = def.get(p);
    if (def.list) return (raw || []).includes(value);
    if (def.split) return String(raw || "").split(/\s*&\s*/).map(x => x.trim()).includes(value);
    return raw === value;
  });
}

function GalaxyMap({ galaxy, characters, onChange, isDM }) {
  const [selectedId, setSelectedId] = useState(null);
  const [claimFactionId, setClaimFactionId] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [filter, setFilter] = useState({ attr: "", value: "" });
  const [newSystemOpen, setNewSystemOpen] = useState(false);
  const [entered, setEntered] = useState(false);   // drilled into a system's solar-system view
  const importRef = useRef(null);
  const importGalaxy = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const g = JSON.parse(reader.result); if (!Array.isArray(g.systems)) throw 0; onChange(ensureGalaxyLayout(g)); } catch { alert("Couldn't read that galaxy file — expected an exported galaxy JSON."); } };
    reader.readAsText(f); e.target.value = "";
  };
  // Players (fog of war) only see systems the DM has revealed; the DM sees all.
  const visibleSystems = isDM ? galaxy.systems : galaxy.systems.filter(s => s.discovered);
  const discoveredCount = galaxy.systems.filter(s => s.discovered).length;
  // Attribute filter: highlight every system whose worlds match the chosen value.
  const filterActive = !!(filter.attr && filter.value);
  const filterValues = filter.attr ? galaxyFilterValues(galaxy, filter.attr) : [];
  const matchIds = filterActive ? new Set(visibleSystems.filter(s => systemMatchesFilter(s, filter.attr, filter.value)).map(s => s.id)) : null;
  const matchCount = matchIds ? matchIds.size : 0;
  const clearFilter = () => setFilter({ attr: "", value: "" });
  const totalPlanets = visibleSystems.reduce((s, sy) => s + sy.planets.length, 0);
  // The party's home is a single planet across the whole galaxy (ties into Session).
  const partyHomeId = galaxy.partyHomePlanetId || null;
  const partyHomePlanet = partyHomeId ? galaxy.systems.flatMap(s => s.planets).find(p => p.id === partyHomeId) : null;
  const setPartyHome = (planetId) => onChange({ ...galaxy, partyHomePlanetId: partyHomeId === planetId ? null : planetId });
  // The party ship: its current world drives the live environment effects. Flying
  // to a system lands them on its main world; refine the exact planet in the system.
  const setCurrentLocation = (planetId) => onChange({ ...galaxy, currentPlanetId: planetId || null });
  const flyPartyTo = (sys) => { const p = sys.planets.find(pl => pl.economy && pl.economy !== "Uninhabited") || sys.planets[0]; setCurrentLocation(p ? p.id : null); };
  const partyInSystem = (sys) => sys.planets.some(pl => pl.id === galaxy.currentPlanetId);
  const factions = galaxy.factions || [];
  // Fog of war extends to factions: players only see a faction once they've
  // discovered at least one of its systems (and its "N sys" counts only the
  // discovered ones). The DM sees every faction.
  const visibleFactions = isDM ? factions : factions.filter(f => visibleSystems.some(s => s.factionId === f.id));
  const selected = visibleSystems.find(s => s.id === selectedId) || null;
  const factionOf = (id) => factions.find(f => f.id === id);
  const revealSystem = (id, on) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === id ? { ...s, discovered: on } : s) });
  const revealAll = (on) => onChange({ ...galaxy, systems: galaxy.systems.map(s => ({ ...s, discovered: on })) });

  const setPlanet = (sysId, planet) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.map(p => p.id === planet.id ? planet : p) }) });
  const removePlanet = (sysId, pid) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.filter(p => p.id !== pid) }) });
  const addPlanet = (sysId) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: [...s.planets, generatePlanet(GALAXY_ERAS[galaxy.era])] }) });
  const updateStar = (sysId, patch) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === sysId ? { ...s, star: { ...s.star, ...patch } } : s) });
  // Move Influence from a system's controlling faction treasury onto one of its
  // planets — one combined write so neither half clobbers the other.
  const investInPlanet = (sysId, planetId, amt) => {
    const sys = galaxy.systems.find(s => s.id === sysId); if (!sys) return;
    const fac = factions.find(f => f.id === sys.factionId); if (!fac || (fac.influence || 0) < amt) return;
    onChange({
      ...galaxy,
      factions: factions.map(f => f.id === fac.id ? { ...f, influence: (f.influence || 0) - amt } : f),
      systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.map(p => p.id === planetId ? { ...p, influence: (p.influence || 0) + amt, influenceLog: [{ text: `Invested from ${fac.name}`, delta: amt, t: Date.now() }, ...(p.influenceLog || [])].slice(0, 10) } : p) }),
    });
  };
  // Place a newly-built system: a free grid cell near center if the grid is on,
  // else just above the core; the user drags it wherever they like.
  const addSystem = (sys) => {
    const start = showGrid ? snapOne(0.5, 0.32, galaxy.systems, null) : { x: 0.5, y: 0.28 };
    const placed = { ...sys, x: start.x, y: start.y, discovered: sys.discovered ?? false };
    onChange({ ...galaxy, systems: [...galaxy.systems, placed] });
    setSelectedId(placed.id);
    setNewSystemOpen(false);
  };
  const moveSystem = (id, x, y) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === id ? { ...s, x, y } : s) });
  // The grid is just an overlay + a snap-on-drag guide; enabling it never
  // rearranges the galaxy, so the natural spiral layout is preserved.
  const toggleGrid = () => setShowGrid(v => !v);
  // Reflow the existing systems back onto the spiral (keeps every world's data);
  // for galaxies whose positions were saved by an older layout or hand-dragged.
  const relayout = () => {
    const pos = spiralPositions(galaxy.systems.length);
    onChange({ ...galaxy, systems: galaxy.systems.map((s, i) => ({ ...s, x: pos[i].x, y: pos[i].y })) });
  };
  // Faction management
  const addFaction = () => {
    const used = factions.map(f => f.color);
    const color = FACTION_COLORS.find(c => !used.includes(c)) || pick(FACTION_COLORS);
    const f = { id: uid(), name: pick(FACTION_ROOTS.filter(n => !factions.some(x => x.name === n))) || "New Faction", color, description: "" };
    onChange({ ...galaxy, factions: [...factions, f] });
  };
  const updateFaction = (id, patch) => onChange({ ...galaxy, factions: factions.map(f => f.id === id ? { ...f, ...patch } : f) });
  const removeFaction = (id) => onChange({ ...galaxy, factions: factions.filter(f => f.id !== id), systems: galaxy.systems.map(s => s.factionId === id ? { ...s, factionId: null } : s) });
  const toggleClaim = (sysId) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === sysId ? { ...s, factionId: s.factionId === claimFactionId ? null : claimFactionId } : s) });

  const sysStat = { fontSize: 10.5, color: COLORS.dim };
  if (entered && selected) return (
    <SolarSystemView system={selected} characters={characters} faction={factionOf(selected.factionId)} isDM={isDM}
      onBack={() => setEntered(false)}
      onUpdatePlanet={pl => setPlanet(selected.id, pl)}
      onRemovePlanet={pid => removePlanet(selected.id, pid)}
      onAddPlanet={() => addPlanet(selected.id)}
      partyHomeId={partyHomeId} onSetPartyHome={setPartyHome}
      currentPlanetId={galaxy.currentPlanetId} onSetLocation={setCurrentLocation}
      onInvest={(pid, amt) => investInPlanet(selected.id, pid, amt)}
      onUpdateStar={patch => updateStar(selected.id, patch)} />
  );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 16 }}>{galaxy.name}</div>
        <Tag color={COLORS.purple}>{GALAXY_SIZES[galaxy.size]?.label}</Tag>
        <Tag color={COLORS.blue}>{GALAXY_ERAS[galaxy.era]?.label}</Tag>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>{isDM ? `${galaxy.systems.length} systems (${discoveredCount} revealed)` : `${visibleSystems.length} systems`} · {totalPlanets} planets{partyHomePlanet ? <> · <span style={{ color: COLORS.gold }}>Home: {partyHomePlanet.name}</span></> : ""}{visibleFactions.length ? ` · ${visibleFactions.length} factions` : ""}</span>
        <div style={{ flex: 1 }} />
        {isDM && <>
          <Btn size="sm" onClick={relayout} title="Re-arrange all systems into a spiral"><Orbit size={13} /> Arrange</Btn>
          <Btn size="sm" variant={showGrid ? "gold" : "default"} onClick={toggleGrid} title={showGrid ? "Hide hex grid" : "Show hex grid — drag a system to snap it to a cell"}><Hexagon size={13} /> Grid</Btn>
          <Btn size="sm" onClick={() => setNewSystemOpen(true)}><Plus size={13} /> System</Btn>
          <Btn size="sm" variant="blue" onClick={() => downloadJSON(galaxy, `${(galaxy.name || "galaxy").replace(/\s+/g, "_")}.json`)} title="Export this galaxy to a JSON file"><Download size={13} /> Export</Btn>
          <input ref={importRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importGalaxy} />
          <ConfirmBtn size="sm" variant="default" confirmTitle="Replace the current galaxy with the imported one" onConfirm={() => importRef.current?.click()}><Upload size={13} /> Import</ConfirmBtn>
          <ConfirmBtn size="sm" variant="danger" confirmTitle="Discard this galaxy and forge a new one" onConfirm={() => onChange(null)}><RotateCcw size={13} /> New Galaxy</ConfirmBtn>
        </>}
      </div>
      {isDM && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 11 }}>
          <span style={{ color: COLORS.dim }}>Fog of war — players only see revealed systems.</span>
          <Btn size="sm" variant="ghost" onClick={() => revealAll(true)}>Reveal all</Btn>
          <Btn size="sm" variant="ghost" onClick={() => revealAll(false)}>Hide all</Btn>
        </div>
      )}
      {/* Attribute filter — find worlds by any trait instead of hunting the map */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap", background: filterActive ? `${COLORS.blue}0E` : COLORS.panel, border: `1px solid ${filterActive ? COLORS.blue + "55" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
        <Search size={14} color={filterActive ? COLORS.blue : COLORS.muted} />
        <span style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "JetBrains Mono, monospace" }}>Find Worlds</span>
        <SciSelect value={filter.attr} onChange={k => setFilter({ attr: k, value: "" })} width={160} placeholder="Attribute"
          options={GALAXY_FILTERS.map(f => ({ value: f.key, label: f.label }))} />
        {filter.attr && (
          <SciSelect value={filter.value} onChange={v => setFilter({ ...filter, value: v })} width={200} placeholder={filterValues.length ? "Any value" : "None present"}
            options={[{ value: "", label: "Any value" }, ...filterValues.map(v => ({ value: v, label: v, count: visibleSystems.filter(s => systemMatchesFilter(s, filter.attr, v)).length }))]} />
        )}
        {filterActive && <Tag color={matchCount ? COLORS.blue : COLORS.dim}>{matchCount} system{matchCount === 1 ? "" : "s"} match</Tag>}
        <div style={{ flex: 1 }} />
        {(filter.attr || filter.value) && <Btn size="sm" variant="ghost" onClick={clearFilter}><X size={13} /> Clear</Btn>}
      </div>

      {newSystemOpen && isDM && <NewSystemModal galaxy={galaxy} onCreate={addSystem} onCancel={() => setNewSystemOpen(false)} />}

      {claimFactionId && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 12px", borderRadius: 8, background: `${factionOf(claimFactionId)?.color || COLORS.gold}1A`, border: `1px solid ${factionOf(claimFactionId)?.color || COLORS.gold}66` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: factionOf(claimFactionId)?.color }}>Claiming for {factionOf(claimFactionId)?.name}</span>
          <span style={{ fontSize: 11, color: COLORS.dim }}>Click systems on the map (or in the legend) to add/remove them from this faction's territory.</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="gold" onClick={() => setClaimFactionId(null)}><Check size={13} /> Done</Btn>
        </div>
      )}

      {/* Spiral map + side legend */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 420px", minWidth: 300 }}>
          <GalaxySpiral galaxy={galaxy} selectedId={selectedId} onSelect={setSelectedId} claimFactionId={claimFactionId} onToggleClaim={toggleClaim} showGrid={showGrid} onMove={moveSystem} isDM={isDM} highlightIds={matchIds} />
          <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 6, textAlign: "center" }}>{isDM ? <>Drag any system to reposition it{showGrid ? " — snaps to the grid" : ""}. Dashed nodes are hidden from players.</> : "Tap a system to view its worlds."}</div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 260, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Factions */}
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Galactic Factions</div>
              <div style={{ flex: 1 }} />
              {isDM && <Btn size="sm" onClick={addFaction}><Plus size={12} /> Faction</Btn>}
            </div>
            {visibleFactions.length === 0 ? (
              <div style={{ fontSize: 11, color: COLORS.dim }}>{isDM ? "No factions yet. Add one, then claim systems as its territory — planets keep their own local governors." : "No known factions control this region."}</div>
            ) : visibleFactions.map(f => {
              const count = (isDM ? galaxy.systems : visibleSystems).filter(s => s.factionId === f.id).length;
              const claiming = claimFactionId === f.id;
              return (
                <div key={f.id} style={{ padding: "6px 0", borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {isDM
                      ? <input type="color" value={f.color} onChange={e => updateFaction(f.id, { color: e.target.value })} title="Faction color" style={{ width: 20, height: 20, padding: 0, border: "none", background: "transparent", cursor: "pointer", flexShrink: 0 }} />
                      : <div style={{ width: 14, height: 14, borderRadius: 4, background: f.color, flexShrink: 0 }} />}
                    {isDM
                      ? <input value={f.name} onChange={e => updateFaction(f.id, { name: e.target.value })} style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", color: COLORS.text, fontWeight: 600, fontSize: 12.5, outline: "none" }} />
                      : <span style={{ flex: 1, minWidth: 0, color: COLORS.text, fontWeight: 600, fontSize: 12.5 }}>{f.name}</span>}
                    <span style={{ fontSize: 10, color: COLORS.dim, whiteSpace: "nowrap" }}>{count} sys</span>
                    {isDM && <Btn size="sm" variant={claiming ? "gold" : "ghost"} onClick={() => setClaimFactionId(claiming ? null : f.id)} title="Claim territory">{claiming ? <Check size={12} /> : <MapPin size={12} />}</Btn>}
                    {isDM && <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete faction (frees its systems)" onConfirm={() => removeFaction(f.id)}><Trash2 size={12} /></ConfirmBtn>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <TrendingUp size={11} color={COLORS.purple} />
                    <span style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Influence</span>
                    {isDM
                      ? <input type="number" value={f.influence || 0} onChange={e => updateFaction(f.id, { influence: Math.max(0, +e.target.value || 0) })} title="Faction Influence treasury — set an exact amount (keep it scarce)" style={{ width: 58, background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.purple, fontWeight: 700, fontSize: 12, fontFamily: "JetBrains Mono, monospace", textAlign: "center", outline: "none", padding: "2px 4px" }} />
                      : <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 12, color: COLORS.purple }}>{f.influence || 0}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          {/* System legend */}
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, maxHeight: 360, overflowY: "auto" }}>
            <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Systems</div>
            {visibleSystems.length === 0 && <div style={{ fontSize: 11, color: COLORS.dim }}>Nothing charted yet — explore to reveal systems.</div>}
            {visibleSystems.map(sys => {
              const fac = factionOf(sys.factionId);
              const sel = sys.id === selectedId;
              const hidden = isDM && !sys.discovered;
              const nomatch = matchIds && !matchIds.has(sys.id);   // filtered out
              const hit = matchIds && matchIds.has(sys.id);
              return (
                <div key={sys.id} onClick={() => (isDM && claimFactionId) ? toggleClaim(sys.id) : setSelectedId(sys.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 6px", borderRadius: 6, cursor: "pointer", background: sel ? `${COLORS.gold}14` : hit ? `${COLORS.blue}16` : "transparent", opacity: nomatch ? 0.25 : (hidden ? 0.5 : 1) }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", flexShrink: 0, background: hidden ? "#5a6376" : (fac?.color || sys.star.color), boxShadow: `0 0 6px ${(hidden ? "#5a6376" : (fac?.color || sys.star.color))}aa` }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: sel ? COLORS.gold : COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sys.name.replace(/ System$/, "")}</div>
                    <div style={sysStat}>{sys.planets.length} planet{sys.planets.length === 1 ? "" : "s"}{fac ? ` · ${fac.name}` : ""}</div>
                  </div>
                  {sys.planets.some(p => p.id === partyHomeId) && <HomeIcon size={12} style={{ color: COLORS.gold, flexShrink: 0 }} />}
                  {isDM && <button onClick={e => { e.stopPropagation(); revealSystem(sys.id, !sys.discovered); }} title={sys.discovered ? "Revealed to players — click to hide" : "Hidden from players — click to reveal"} style={{ background: "transparent", border: "none", cursor: "pointer", color: sys.discovered ? COLORS.gold : COLORS.dim, flexShrink: 0, display: "flex" }}>{sys.discovered ? <Radio size={13} /> : <ShieldHalf size={13} />}</button>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected system — brief info; "Enter System" drops to solar-system level */}
      <div style={{ marginTop: 16 }}>
        {selected ? (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: factionOf(selected.factionId)?.color || selected.star.color, boxShadow: `0 0 10px ${(factionOf(selected.factionId)?.color || selected.star.color)}aa` }} />
              <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 15 }}>{selected.name.replace(/ System$/, "")}</div>
              <span style={{ fontSize: 11, color: COLORS.dim }}>{selected.star.type} · {selected.planets.length} planet{selected.planets.length === 1 ? "" : "s"}</span>
              {factionOf(selected.factionId) && <Tag color={factionOf(selected.factionId).color}>{factionOf(selected.factionId).name} territory</Tag>}
              {isDM && !selected.discovered && <Tag color={COLORS.dim}>Hidden from players</Tag>}
              <div style={{ flex: 1 }} />
              {isDM && (partyInSystem(selected)
                ? <Tag color={COLORS.blue}>◈ Party is here</Tag>
                : <Btn size="sm" variant="blue" onClick={() => flyPartyTo(selected)}><Rocket size={13} /> Fly party here</Btn>)}
              <Btn size="sm" variant="gold" onClick={() => setEntered(true)}><Orbit size={13} /> Enter System</Btn>
              {isDM && <Btn size="sm" variant={selected.discovered ? "gold" : "default"} onClick={() => revealSystem(selected.id, !selected.discovered)}>{selected.discovered ? <><Radio size={12} /> Revealed</> : <><ShieldHalf size={12} /> Reveal</>}</Btn>}
              <Btn size="sm" variant="ghost" onClick={() => setSelectedId(null)}><X size={14} /></Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
              {selected.planets.map(p => { const c = planetClass(p.class || p.biome); return (
                <div key={p.id} onClick={() => setEntered(true)} title="Enter the system to manage this world" style={{ cursor: "pointer", background: COLORS.panel2, border: `1px solid ${p.id === partyHomeId ? COLORS.gold + "88" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 30% 30%, ${c.color}, ${COLORS.panel})`, boxShadow: `0 0 6px ${c.color}66` }} />
                    <span style={{ fontWeight: 700, fontSize: 12.5, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                    {p.id === partyHomeId && <HomeIcon size={11} style={{ color: COLORS.gold, flexShrink: 0 }} />}
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 3 }}>
                    <Tag color={c.color}>{p.class || p.biome}</Tag>
                    <Tag color={habColor(p.habitability || c.hab)}>{p.habitability || c.hab}</Tag>
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{p.gravity ?? "—"}g · {p.economy !== "Uninhabited" ? p.economy : "Uninhabited"}</div>
                </div>
              ); })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 16px", color: COLORS.dim, fontSize: 12.5, border: `1px dashed ${COLORS.border}`, borderRadius: 10 }}>
            Select a system — on the spiral or in the legend — to see its worlds, then <b style={{ color: COLORS.gold }}>Enter System</b> to manage them.
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Store & Night Market economics — planet-contextual pricing and stock.
   Everything keys off the CURRENT LOCATION planet: its economy biases which
   categories are stocked and their multipliers, wealth caps the rarity on the
   shelf, tech level gates High-Tech Parts, and the local tax rate is added on
   top. The Night Market ignores tax (no receipts) and gets richer on black-market
   and low-stability worlds. Prices come only from real book Ƶeni values. ===== */
const STORE_ECONOMY = {
  "Mining & Ore":       { armor: 0.9,  tech: 1.15, note: "Ore is cheap; finished tech is imported and marked up." },
  "Heavy Industry":     { armor: 0.85, tech: 0.95, note: "Factory world — armor and parts roll off the line cheap." },
  "Agriculture":        { armor: 1.05, tech: 1.3,  techStock: false, note: "Farm world — little demand for high-tech; parts are special-order only." },
  "Tech & R&D":         { armor: 1.05, tech: 0.8,  note: "Cutting-edge labs — cybernetics are cheap and plentiful." },
  "Luxury Goods":       { armor: 1.25, tech: 1.2,  note: "Everything carries a prestige markup." },
  "Black Market":       { armor: 0.8,  tech: 0.8,  illicit: true, note: "No receipts, no questions — cheap, but caveat emptor." },
  "Military Complex":   { armor: 0.8,  tech: 0.9,  note: "Garrison world — battle armor is surplus-cheap." },
  "Trade Hub":          { armor: 0.95, tech: 0.95, note: "Everything's available at fair, competitive prices." },
  "Ki-Crystal Harvest": { armor: 1.0,  tech: 1.0,  note: "Ki-crystal wealth keeps prices steady." },
  "Salvage & Scrap":    { armor: 0.75, tech: 0.7,  note: "Second-hand and salvaged — dirt cheap, quality not guaranteed." },
};
const storeEcon = (planet) => STORE_ECONOMY[planet?.economy] || { armor: 1, tech: 1, note: "" };
const RTIER_IDX = (key) => Math.max(0, RARITY_TIERS.findIndex(r => r.key === (key || "common")));
const planetTechIdx = (planet) => Math.max(0, UNI_TECH.indexOf(planet?.tech));
const planetOpen = (planet) => !!planet && !!planet.economy && planet.economy !== "Uninhabited" && planet.population !== "Uninhabited";
const wealthRarityCap = (planet) => [0, 1, 2, 3, 5][Math.max(0, Math.min(4, planet?.wealthIdx ?? 2))];
const techNeeded = (zeni) => zeni <= 100 ? 0 : zeni <= 1000 ? 1 : zeni <= 5000 ? 2 : 3;
function storePrice(base, planet, kind) {
  const mult = kind === "hightech" ? storeEcon(planet).tech : storeEcon(planet).armor;
  return Math.max(1, Math.round((base || 0) * mult * (1 + (planet?.taxRate || 0) / 100)));
}
function buildStoreCatalog(customHighTech) {
  const armor = BOOK_EQUIPMENT.map(e => ({ ...e, kind: "equipment", storeGroup: "Armor & Shields" }));
  const tech = [...HIGH_TECH_PARTS, ...(customHighTech || [])].map(p => ({
    catalogId: p.id, name: p.name, kind: "hightech", storeGroup: "High-Tech Parts",
    zeni: p.zeni, rarity: "uncommon", integrationDC: p.integrationDC, effect: p.effect, advancedTech: p.advancedTech,
  }));
  return [...armor, ...tech];
}
const storeStock = (planet, catalog) => catalog.filter(it => it.kind === "hightech"
  ? (storeEcon(planet).techStock !== false && planetTechIdx(planet) >= techNeeded(it.zeni))
  : RTIER_IDX(it.rarity) <= wealthRarityCap(planet));
function purchaseItemFromCatalog(it) {
  if (it.kind === "equipment") { const { kind, storeGroup, ...gear } = it; return { ...gear, id: uid(), qty: 1 }; }
  return { id: uid(), name: it.name, rarity: it.rarity || "uncommon", zeni: it.zeni, qty: 1, notes: "High-Tech Part — install via Inventory → Cybernetics." };
}
function hashStr(s) { let h = 2166136261; for (let i = 0; i < (s || "").length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function nightMarketStock(planet, catalog, seed) {
  if (!planetOpen(planet)) return [];
  const econ = storeEcon(planet);
  const stab = planet?.stabilityIdx ?? 2;
  const rng = mulberry32(hashStr((planet?.id || "") + ":" + seed));
  const richness = (econ.illicit ? 2 : 0) + (2 - Math.min(2, stab));            // 0..4 — black-market + unrest = richer
  const count = Math.min(catalog.length, 3 + richness);
  const pool = catalog
    .map(it => ({ it, w: rng() + RTIER_IDX(it.rarity) * 0.15 + (it.zeni > 1000 ? 0.3 : 0) + (it.kind === "hightech" ? 0.2 : 0) }))
    .sort((a, b) => b.w - a.w).map(x => x.it);
  return pool.slice(0, count).map(it => { const discount = 0.6 + rng() * 0.25; return { ...it, price: Math.max(1, Math.round((it.zeni || 0) * discount)), discount }; });
}

// Location + shopper bar shared by the Store and Night Market.
function MarketHeader({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, isDM }) {
  const planet = current?.planet;
  const stat = (label, val, color) => <span style={{ fontSize: 11.5 }}><span style={{ color: COLORS.dim }}>{label} </span><span style={{ color: color || COLORS.text, fontWeight: 600 }}>{val}</span></span>;
  const shopper = chars.find(c => c.id === shopperId) || null;
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
      <div style={{ flex: "2 1 340px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <MapPin size={14} color={COLORS.gold} />
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Current Location</span>
        </div>
        <Select value={galaxy?.currentPlanetId || ""} onChange={e => onSetLocation(e.target.value)}>
          <option value="">— pick a world —</option>
          {galaxy.systems.filter(s => isDM || s.discovered).map(s => (
            <optgroup key={s.id} label={s.name.replace(/ System$/, "")}>
              {s.planets.map(p => <option key={p.id} value={p.id}>{p.name}{planetOpen(p) ? ` — ${p.economy}` : " (uninhabited)"}</option>)}
            </optgroup>
          ))}
        </Select>
        {planet && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            {planetOpen(planet) ? <>
              {stat("Economy", planet.economy, COLORS.blue)}
              {stat("Tax", `${planet.taxRate}%`, planet.taxRate >= 20 ? COLORS.red : COLORS.text)}
              {stat("Wealth", planet.wealth, COLORS.gold)}
              {stat("Tech", planet.tech)}
              {stat("Stability", planet.stability, (planet.stabilityIdx ?? 2) <= 1 ? COLORS.red : COLORS.green)}
            </> : <span style={{ fontSize: 11.5, color: COLORS.dim }}>Uninhabited — no vendors here.</span>}
          </div>
        )}
        {planet && planetOpen(planet) && storeEcon(planet).note && <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 6, fontStyle: "italic" }}>{storeEcon(planet).note}</div>}
      </div>
      <div style={{ flex: "1 1 220px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Shopping As</div>
        <Select value={shopperId || ""} onChange={e => setShopperId(e.target.value)}>
          <option value="">— who's buying —</option>
          {chars.filter(c => !c.archived).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        {shopper && <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}><Coins size={15} color={COLORS.gold} /><span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 18, color: COLORS.gold }}>Ƶ {(shopper.zeni || 0).toLocaleString()}</span></div>}
      </div>
    </div>
  );
}

function StoreItemCard({ item, price, base, canBuy, reason, onBuy }) {
  const rc = rarityInfo(item.rarity).color;
  const discounted = base != null && price < base;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{item.name}</span>
        <Tag color={rc}>{rarityInfo(item.rarity).label}</Tag>
      </div>
      {item.kind === "equipment"
        ? <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "JetBrains Mono, monospace" }}>{[item.acBase ? `AC ${item.acBase}` : null, item.acBonus ? `+${item.acBonus} AC` : null, item.dr ? `DR ${item.dr}` : null, slotTypeLabel(item.slot)].filter(Boolean).join(" · ")}</div>
        : <div style={{ fontSize: 11, color: COLORS.blue, fontFamily: "JetBrains Mono, monospace" }}>Integration DC {item.integrationDC}</div>}
      {(item.notes || item.effect) && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.45 }}>{item.notes || item.effect}</div>}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: COLORS.gold }}>Ƶ {price.toLocaleString()}</span>
          {discounted && <span style={{ fontSize: 10, color: COLORS.dim, textDecoration: "line-through" }}>Ƶ {base.toLocaleString()}</span>}
        </span>
        <Btn size="sm" variant="gold" disabled={!canBuy} title={canBuy ? "Buy" : reason} onClick={onBuy} style={!canBuy ? { opacity: 0.5, cursor: "not-allowed" } : {}}>Buy</Btn>
      </div>
    </div>
  );
}

function StoreScreen({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, onBuy, isDM }) {
  const [custom] = useSharedList("custom_hightech_v1");
  if (!galaxy) return <EmptyState icon={Coins} title="No galaxy charted yet" body="Forge a galaxy first — the Store prices gear by the planet you're standing on." />;
  const catalog = buildStoreCatalog(custom || []);
  const shopper = chars.find(c => c.id === shopperId) || null;
  const header = <MarketHeader galaxy={galaxy} current={current} chars={chars} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={onSetLocation} isDM={isDM} />;
  const planet = current?.planet;
  if (!planet) return <div>{header}<EmptyState icon={MapPin} title="Pick a location" body="Choose the world the party is on — the Store stocks and prices gear to its economy and local tax." /></div>;
  if (!planetOpen(planet)) return <div>{header}<EmptyState icon={Coins} title="No market here" body={`${planet.name} is uninhabited — no vendors. Set a populated world as your location.`} /></div>;
  const stock = storeStock(planet, catalog);
  const groups = ["Armor & Shields", "High-Tech Parts"];
  return (
    <div>
      {header}
      {groups.map(g => {
        const items = stock.filter(i => i.storeGroup === g);
        if (!items.length) return null;
        return (
          <div key={g} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>{g}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {items.map(it => {
                const price = storePrice(it.zeni, planet, it.kind);
                const canBuy = !!shopper && (shopper.zeni || 0) >= price;
                return <StoreItemCard key={it.catalogId || it.name} item={it} price={price} base={price !== it.zeni ? it.zeni : null} canBuy={canBuy} reason={!shopper ? "Pick who's shopping" : "Not enough Ƶeni"} onBuy={() => onBuy(it, price)} />;
              })}
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Wealth caps rarity on the shelf; tech level and economy decide what's stocked. Buying deducts Ƶeni and drops the item into {shopper ? shopper.name + "'s" : "the buyer's"} inventory.</div>
    </div>
  );
}

function NightMarketScreen({ galaxy, current, chars, shopperId, setShopperId, onSetLocation, onBuy, onRefresh, isDM }) {
  const [custom] = useSharedList("custom_hightech_v1");
  if (!galaxy) return <EmptyState icon={Rocket} title="No galaxy charted yet" body="Forge a galaxy first — the Night Market rides on the world you're standing on." />;
  const catalog = buildStoreCatalog(custom || []);
  const shopper = chars.find(c => c.id === shopperId) || null;
  const header = <MarketHeader galaxy={galaxy} current={current} chars={chars} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={onSetLocation} isDM={isDM} />;
  const planet = current?.planet;
  if (!planet) return <div>{header}<EmptyState icon={MapPin} title="Pick a location" body="Choose the world the party is on — the Night Market's stock depends on it." /></div>;
  if (!planetOpen(planet)) return <div>{header}<EmptyState icon={Rocket} title="No stall here" body={`${planet.name} is uninhabited — nobody's dealing. Set a populated world as your location.`} /></div>;
  const stock = nightMarketStock(planet, catalog, galaxy.marketSeed || 0);
  const illicit = storeEcon(planet).illicit;
  return (
    <div>
      {header}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Tonight's Stall</div>
        <span style={{ fontSize: 11, color: COLORS.dim }}>{illicit ? "A black-market world — the stall runs deep." : (planet.stabilityIdx ?? 2) <= 1 ? "Low stability — desperate goods change hands." : "A quiet corner deal — thin pickings."} No tax, no receipts.</span>
        <div style={{ flex: 1 }} />
        {isDM && <Btn size="sm" onClick={onRefresh}><RotateCcw size={13} /> New Stock</Btn>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
        {stock.map(it => {
          const canBuy = !!shopper && (shopper.zeni || 0) >= it.price;
          return <StoreItemCard key={(it.catalogId || it.name) + it.price} item={it} price={it.price} base={it.zeni} canBuy={canBuy} reason={!shopper ? "Pick who's shopping" : "Not enough Ƶeni"} onBuy={() => onBuy(it, it.price)} />;
        })}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 10 }}>Stock is fixed per world until the DM pulls New Stock. Richer on black-market and low-stability worlds.</div>
    </div>
  );
}

function UniverseTab() {
  const [screen, setScreen] = useState("map"); // map | store | market
  const [state, persist, error] = useSharedList("universe");
  const [chars, persistChars] = useSharedList("characters_v2");
  const [shopperId, setShopperId] = useState("");
  // View mode is per-device (not shared): the DM's device runs "dm", players'
  // devices run "player" and only see revealed systems.
  const [viewOpt, setViewOpt] = useLocalOption("sdndbz_universe_view_v1", { mode: "player" });
  const isDM = viewOpt.mode === "dm";
  if (state === null || chars === null) return <LoadingBlock />;
  const galaxy = state && state[0] ? ensureGalaxyLayout(state[0]) : null;
  const setGalaxy = (g) => persist(g ? [g] : []);
  const characterNames = (chars || []).filter(c => !c.archived).map(c => c.name).filter(Boolean);
  // Current-location plumbing for the Store / Night Market.
  const currentLoc = galaxy ? galaxy.systems.flatMap(s => s.planets.map(p => ({ system: s, planet: p }))).find(x => x.planet.id === galaxy.currentPlanetId) || null : null;
  const setLocation = (planetId) => galaxy && setGalaxy({ ...galaxy, currentPlanetId: planetId });
  const refreshMarket = () => galaxy && setGalaxy({ ...galaxy, marketSeed: (galaxy.marketSeed || 0) + 1 });
  const buy = (catalogItem, price) => {
    if (!shopperId) return;
    persistChars((chars || []).map(c => c.id === shopperId ? { ...c, zeni: Math.max(0, (c.zeni || 0) - price), items: [...(c.items || []), purchaseItemFromCatalog(catalogItem)] } : c));
  };

  return (
    <div>
      <ScannerHeader title="UNIVERSE & ECONOMY" subtitle="The galaxy your campaign lives in — worlds, economies, and who calls them home." />
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        {[["map", "Galaxy Map", Orbit], ["store", "Store", Coins], ["market", "Night Market", Rocket]].map(([k, label, Icon]) => (
          <button key={k} onClick={() => setScreen(k)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", background: screen === k ? `${COLORS.gold}1A` : COLORS.panel2, color: screen === k ? COLORS.gold : COLORS.muted, border: `1px solid ${screen === k ? COLORS.gold + "55" : COLORS.border}` }}><Icon size={14} /> {label}</button>
        ))}
        <div style={{ flex: 1 }} />
        {/* Per-device DM / Player view */}
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {[["dm", "DM View"], ["player", "Player View"]].map(([m, label]) => (
            <button key={m} onClick={() => setViewOpt({ mode: m })} title={m === "dm" ? "See everything and control what players discover" : "See only what the DM has revealed"} style={{ padding: "7px 12px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", background: viewOpt.mode === m ? (m === "dm" ? `${COLORS.gold}22` : `${COLORS.blue}22`) : "transparent", color: viewOpt.mode === m ? (m === "dm" ? COLORS.gold : COLORS.blue) : COLORS.muted, border: "none" }}>{label}</button>
          ))}
        </div>
      </div>

      {screen === "map" && (galaxy
        ? <GalaxyMap galaxy={galaxy} characters={characterNames} onChange={setGalaxy} isDM={isDM} />
        : isDM ? <GalaxyForge onGenerate={setGalaxy} />
          : <EmptyState icon={Orbit} title="No galaxy charted yet" body="The DM hasn't forged the galaxy for this campaign — check back once they have." />)}

      {screen === "store" && (
        <StoreScreen galaxy={galaxy} current={currentLoc} chars={chars || []} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={setLocation} onBuy={buy} isDM={isDM} />
      )}
      {screen === "market" && (
        <NightMarketScreen galaxy={galaxy} current={currentLoc} chars={chars || []} shopperId={shopperId} setShopperId={setShopperId} onSetLocation={setLocation} onBuy={buy} onRefresh={refreshMarket} isDM={isDM} />
      )}
    </div>
  );
}

/* ============================== BASE BUILDING ============================== */
// A player faction's home base (planet-bound) and its capital ship (mobile, a
// home away from home that carries a few amenities). Facilities are buildable and
// upgradeable; `ship` marks the ones a capital ship has room for. Effects and
// costs tie into play so the base stays campaign-relevant.
const FACILITY_MAX_TIER = 3;   // each facility upgrades across three named tiers
const BASE_FACILITIES = [
  { type: "gravity",  name: "Gravity Chamber",  icon: Weight,     color: COLORS.purple, ship: true,  desc: "Train under crushing gravity to push past your limits.", perLevel: "Higher training gravity", tiers: ["Weight Room", "Gravity Chamber", "Hyperbolic Time Chamber"] },
  { type: "medbay",   name: "Med Bay",          icon: HeartPulse, color: COLORS.red,    ship: true,  desc: "Rejuvenation tanks patch the party up between fights.", perLevel: "Faster rest healing", tiers: ["Novice Practitioner's Office", "Med Bay", "Medical Hub"] },
  { type: "reactor",  name: "Ki Reactor",       icon: Zap,        color: COLORS.green,  ship: true,  desc: "An ambient Ki field speeds recovery.", perLevel: "Bonus Ki regen on rest", tiers: ["Ki Cell", "Ki Reactor", "Ki Nexus"] },
  { type: "workshop", name: "Workshop",         icon: Wrench,     color: COLORS.muted,  ship: true,  desc: "Craft and upgrade gear and High-Tech parts.", perLevel: "Cheaper crafting", tiers: ["Tinker's Bench", "Workshop", "Forge Complex"] },
  { type: "comms",    name: "Comms Array",      icon: Radio,      color: COLORS.gold,   ship: true,  desc: "Track bounties, jobs and galactic news.", perLevel: "Better job and bounty intel", tiers: ["Radio Set", "Comms Array", "Intelligence Network"] },
  { type: "warroom",  name: "War Room",         icon: Swords,     color: COLORS.red,    ship: true,  desc: "Plan faction operations and command your forces.", perLevel: "Stronger faction operations", tiers: ["Planning Table", "War Room", "Grand War Council"] },
  { type: "training", name: "Training Grounds", icon: Crosshair,  color: COLORS.amber,  ship: false, desc: "Sparring rings and drills that need real ground.", perLevel: "Extra downtime training", tiers: ["Sparring Ring", "Dojo", "Warrior's Crucible"] },
  { type: "barracks", name: "Barracks",         icon: Users,      color: COLORS.blue,   ship: false, desc: "House allies, recruits and rescued fighters.", perLevel: "More allied capacity", tiers: ["Bunkroom", "Barracks", "Fortress Quarter"] },
  { type: "hangar",   name: "Hangar",           icon: Rocket,     color: COLORS.blue,   ship: false, desc: "Dock and service the capital ship and smaller craft.", perLevel: "Faster ship repairs", tiers: ["Landing Pad", "Hangar", "Fleet Yard"] },
  { type: "market",   name: "Trade Hub",        icon: Coins,      color: COLORS.gold,   ship: false, desc: "A home market that generates Zeni and cheap goods.", perLevel: "More Zeni income", tiers: ["Trading Post", "Trade Hub", "Grand Exchange"] },
  { type: "blackmarket", name: "Black Market",  icon: Skull,      color: COLORS.red,    ship: false, desc: "A 'legal' underground market. Fat profits, but the people whisper of corruption.", perLevel: "More Zeni & Loot, less Stability & Reputation", tiers: ["Back-Alley Deals", "Undermarket", "Shadow Exchange"] },
];
const baseFacility = (type) => BASE_FACILITIES.find(f => f.type === type);
// Per-level governance effect of a facility (More Governing). Helpful ones lift the
// people; the Black Market prints money but corrupts. Neutral facilities omitted.
const FACILITY_GOV = {
  market:      { income: 300, stab: 0,  rep: 0 },
  blackmarket: { income: 600, loot: 3, stab: -1, rep: -1 },
  medbay:      { income: 0,   stab: 0,  rep: 1 },
  barracks:    { income: 0,   stab: 1,  rep: 0 },
  warroom:     { income: 0,   stab: 1,  rep: 0 },
  comms:       { income: 150, stab: 0,  rep: 0 },
};
// Reputation tiers (0..4), a people-facing counterpart to the planet's Stability.
const UNI_REPUTATION = ["Reviled", "Distrusted", "Tolerated", "Respected", "Revered"];
// The display name of a facility at its current tier (custom override wins).
const facilityTierName = (f) => { const def = baseFacility(f.type); return f.customName || (def && def.tiers && def.tiers[(f.level || 1) - 1]) || (def && def.name) || "Facility"; };

// Two pools fund building & upgrading: Zeni and a single Loot pool. The DM tops
// them up as the party finds loot; upgrades draw from them. (Earning = TBD.)
const RES_KEYS = ["zeni", "loot"];
const RESOURCE_POOLS = [
  { key: "zeni", label: "Zeni", icon: Coins,    color: COLORS.gold },
  { key: "loot", label: "Loot", icon: Sparkles, color: COLORS.purple },
];
// Cost to build/upgrade to a given tier. Scales with tier. (Numbers become
// table-customizable in the P8 pass.)
const facilityCost = (targetLevel) => ({ zeni: 400 * targetLevel, loot: 2 * targetLevel });
const canAfford = (res, cost) => RES_KEYS.every(k => (res[k] || 0) >= (cost[k] || 0));
const deductCost = (res, cost) => { const out = { ...res }; RES_KEYS.forEach(k => { out[k] = Math.max(0, (res[k] || 0) - (cost[k] || 0)); }); return out; };
const costLabel = (cost) => RES_KEYS.filter(k => cost[k]).map(k => k === "zeni" ? `${cost[k].toLocaleString()}ᶻ` : `${cost[k]} loot`).join(" · ");

// A faction resource ledger: four editable loot pools (the DM tops them up).
function ResourceLedger({ resources, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      {RESOURCE_POOLS.map(p => (
        <div key={p.key} style={{ flex: "1 1 150px", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <p.icon size={18} color={p.color} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{p.label}</div>
            <TextInput type="number" value={resources[p.key] || 0} onChange={e => onChange({ [p.key]: Math.max(0, +e.target.value || 0) })} style={{ padding: "2px 6px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: p.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
const SHIP_BAYS = 4;   // a capital ship only has room for so many amenities

// One buildable/upgradeable facility grid, shared by the home base and the ship.
function FacilitySection({ label, Icon, color, locationNode, extra, facilities, capacity, open, onToggle, onAdd, onUpgrade, onDowngrade, onRename, onRemove, resources }) {
  const built = new Set(facilities.map(f => f.type));
  const buildable = BASE_FACILITIES.filter(f => !built.has(f.type) && (capacity == null || f.ship));
  const full = capacity != null && facilities.length >= capacity;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <Icon size={18} color={color} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>{label}</span>
        {capacity != null && <Tag color={facilities.length >= capacity ? COLORS.red : color}>{facilities.length}/{capacity} bays</Tag>}
        {locationNode}
        <div style={{ flex: 1 }} />
        {!full && buildable.length > 0 && <Btn size="sm" variant="gold" onClick={onToggle}><Plus size={13} /> Build</Btn>}
      </div>
      {extra}
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 8px" }}>Facilities</div>
      {full && <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 8 }}>At capacity — remove a bay to install something else.</div>}
      {open && buildable.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 8, marginBottom: 12 }}>
          {buildable.map(f => { const cost = facilityCost(1); const afford = canAfford(resources || {}, cost); return (
            <div key={f.type} onClick={() => afford && onAdd(f.type)} style={{ cursor: afford ? "pointer" : "not-allowed", opacity: afford ? 1 : 0.5, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}
              onMouseEnter={e => { if (afford) e.currentTarget.style.borderColor = f.color + "88"; }} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><f.icon size={15} color={f.color} /><span style={{ fontWeight: 700, fontSize: 12.5 }}>{(f.tiers && f.tiers[0]) || f.name}</span></div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{f.desc}</div>
              <div style={{ fontSize: 10, color: afford ? COLORS.gold : COLORS.red, marginTop: 5, fontFamily: "JetBrains Mono, monospace" }}>Build: {costLabel(cost)}</div>
            </div>
          ); })}
        </div>
      )}
      {facilities.length === 0 ? (
        <div style={{ fontSize: 12, color: COLORS.dim, padding: "4px 2px" }}>No facilities yet. Hit <b style={{ color: COLORS.gold }}>Build</b> to start.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 10 }}>
          {facilities.map(f => { const def = baseFacility(f.type); if (!def) return null;
            const lvl = f.level || 1, maxed = lvl >= FACILITY_MAX_TIER;
            const upCost = maxed ? null : facilityCost(lvl + 1);
            const canUp = upCost && canAfford(resources || {}, upCost);
            return (
            <div key={f.id} style={{ background: COLORS.panel2, border: `1px solid ${def.color}55`, borderRadius: 10, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <def.icon size={16} color={def.color} />
                <TextInput value={facilityTierName(f)} onChange={e => onRename(f.id, e.target.value)} title="Rename this facility" style={{ fontWeight: 700, fontSize: 13, padding: "2px 6px", flex: 1, minWidth: 0 }} />
                <Tag color={def.color}>Lv {lvl}</Tag>
                <X size={14} color={COLORS.red} style={{ cursor: "pointer" }} title="Demolish" onClick={() => onRemove(f.id)} />
              </div>
              <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 6 }}>{def.name}{f.customName ? "" : ` · Tier ${lvl}`}</div>
              <div style={{ fontSize: 11.5, color: COLORS.muted, marginBottom: 8 }}>{def.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: maxed ? COLORS.gold : (canUp ? COLORS.gold : COLORS.red), flex: 1, fontFamily: "JetBrains Mono, monospace" }}>{maxed ? "Max tier" : `Upgrade: ${costLabel(upCost)}`}</span>
                <button onClick={() => onDowngrade(f.id)} disabled={lvl <= 1} title="Downgrade" style={{ ...miniBtnStyle, opacity: lvl <= 1 ? 0.4 : 1 }}><Minus size={13} /></button>
                <button onClick={() => canUp && onUpgrade(f.id)} disabled={!canUp} title={maxed ? "At max tier" : canUp ? "Upgrade" : "Not enough resources"} style={{ ...miniBtnStyle, opacity: canUp ? 1 : 0.4 }}><TrendingUp size={13} /></button>
              </div>
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}

// Made-up defense rules: incoming damage minus Hardness, absorbed by Shields, then
// eats Structural Integrity. At 0 SI the base/ship is breached. All values editable.
function BaseStatBlock({ stats, onChange, noun = "base" }) {
  const maxSi = stats.maxSi ?? 60, maxSh = stats.maxShields ?? 0, hard = stats.hardness ?? 0;
  const si = stats.si ?? maxSi, sh = stats.shields ?? maxSh;
  const [amt, setAmt] = useState("");
  const patch = (p) => onChange({ ...stats, ...p });
  const applyDamage = () => {
    let d = Math.max(0, (Number(amt) || 0) - hard);
    let sh2 = sh; const absorbed = Math.min(sh2, d); sh2 -= absorbed; d -= absorbed;
    patch({ shields: maxSh > 0 ? sh2 : stats.shields, si: Math.max(0, si - d) }); setAmt("");
  };
  const repair = () => { patch({ si: Math.min(maxSi, si + (Number(amt) || 0)) }); setAmt(""); };
  const breached = si <= 0;
  const bar = (cur, max, color, label) => (
    <div style={{ flex: "1 1 150px", minWidth: 130 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.muted, marginBottom: 3, fontFamily: "JetBrains Mono, monospace" }}>
        <span>{label}</span><span style={{ color: cur <= 0 ? COLORS.red : COLORS.text }}>{cur} / {max}</span>
      </div>
      <div style={{ height: 10, background: COLORS.panel, borderRadius: 6, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
        <div style={{ height: "100%", width: `${max ? Math.max(0, Math.min(100, cur / max * 100)) : 0}%`, background: color, opacity: 0.85 }} />
      </div>
    </div>
  );
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${breached ? COLORS.red + "88" : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        {bar(si, maxSi, breached ? COLORS.red : COLORS.gold, "Structural Integrity")}
        {maxSh > 0 && bar(sh, maxSh, COLORS.blue, "Shields")}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10.5, color: COLORS.muted }}>Hardness</span>
        <TextInput type="number" value={hard} onChange={e => patch({ hardness: Math.max(0, +e.target.value || 0) })} style={{ width: 50, textAlign: "center", padding: "4px 6px" }} title="Flat reduction on each incoming hit" />
        <div style={{ flex: 1 }} />
        <TextInput type="number" value={amt} onChange={e => setAmt(e.target.value)} placeholder="amt" style={{ width: 60, textAlign: "center", padding: "4px 6px" }} />
        <Btn size="sm" variant="danger" onClick={applyDamage}>Damage</Btn>
        <Btn size="sm" variant="ghost" onClick={repair}>Repair</Btn>
        {maxSh > 0 && <Btn size="sm" variant="ghost" onClick={() => patch({ shields: maxSh })} title="Restore shields to full">Recharge</Btn>}
      </div>
      <details style={{ marginTop: 8 }}>
        <summary style={{ fontSize: 10.5, color: COLORS.dim, cursor: "pointer" }}>Set max integrity / shields</summary>
        <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
          <label style={{ fontSize: 10, color: COLORS.muted, display: "flex", alignItems: "center", gap: 5 }}>Max SI <TextInput type="number" value={maxSi} onChange={e => patch({ maxSi: Math.max(0, +e.target.value || 0) })} style={{ width: 64, padding: "3px 6px" }} /></label>
          <label style={{ fontSize: 10, color: COLORS.muted, display: "flex", alignItems: "center", gap: 5 }}>Max Shields <TextInput type="number" value={maxSh} onChange={e => patch({ maxShields: Math.max(0, +e.target.value || 0) })} style={{ width: 64, padding: "3px 6px" }} /></label>
        </div>
      </details>
      {breached && <div style={{ fontSize: 11, color: COLORS.red, fontWeight: 700, marginTop: 6 }}>Integrity breached — the {noun} is overrun. Repair to bring it back online.</div>}
    </div>
  );
}

// Derive the home world's economy + standing (More Governing). Income auto-derives
// from the planet's wealth + tax + commerce facilities (with a DM override); the
// Black Market and high taxes trade money for Stability + Reputation.
function computeGovernance(base, planet) {
  const g = base.gov || {};
  const wealthIdx = planet ? Math.max(0, UNI_WEALTH.indexOf(planet.wealth)) : 2;
  const tax = planet ? (planet.taxRate || 0) : 0;
  const planetBase = (wealthIdx + 1) * 250;
  const taxIncome = Math.round(planetBase * tax / 100);
  const facs = (base.home && base.home.facilities) || [];
  let facIncome = 0, lootIncome = 0, stabDelta = 0, repDelta = 0;
  facs.forEach(f => { const gv = FACILITY_GOV[f.type]; if (gv) { const L = f.level || 1; facIncome += (gv.income || 0) * L; lootIncome += (gv.loot || 0) * L; stabDelta += (gv.stab || 0) * L; repDelta += (gv.rep || 0) * L; } });
  const derived = planetBase + taxIncome + facIncome;
  const grossIncome = g.incomeOverride != null ? g.incomeOverride : derived;
  const dividendPct = g.dividendPct != null ? g.dividendPct : 10;
  const dividend = Math.round(grossIncome * dividendPct / 100);
  const peoples = grossIncome - dividend;
  const planetStab = planet && planet.stabilityIdx != null ? planet.stabilityIdx : 3;
  const taxPenalty = tax > 25 ? -1 : 0;
  const stabilityIdx = Math.max(0, Math.min(4, planetStab + stabDelta + taxPenalty));
  const reputationIdx = Math.max(0, Math.min(4, 2 + repDelta + taxPenalty));
  return { wealthIdx, tax, planetBase, taxIncome, facIncome, lootIncome, derived, grossIncome, override: g.incomeOverride != null, dividendPct, dividend, peoples, stabilityIdx, reputationIdx };
}
const govTierColor = (idx) => [COLORS.red, COLORS.amber, COLORS.dim, COLORS.green, COLORS.gold][idx] || COLORS.dim;

function GovernancePanel({ base, planet, onChange }) {
  const g = base.gov || {};
  const gc = computeGovernance(base, planet);
  const setGov = (patch) => onChange({ ...g, ...patch });
  const row = (label, val, color, strong) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "2px 0" }}>
      <span style={{ color: COLORS.muted }}>{label}</span>
      <span style={{ color: color || COLORS.text, fontWeight: strong ? 700 : 400, fontFamily: "JetBrains Mono, monospace" }}>{val}</span>
    </div>
  );
  const z = (n) => `${(n || 0).toLocaleString()}ᶻ`;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <Coins size={16} color={COLORS.gold} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>Governance</span>
        <div style={{ flex: 1 }} />
        <Tag color={govTierColor(gc.stabilityIdx)}>Stability: {UNI_STABILITY[gc.stabilityIdx]}</Tag>
        <Tag color={govTierColor(gc.reputationIdx)}>Reputation: {UNI_REPUTATION[gc.reputationIdx]}</Tag>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px", minWidth: 220 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Weekly Economy</div>
          {row("Planet base", z(gc.planetBase))}
          {row("Tax income", z(gc.taxIncome))}
          {row("Facilities", z(gc.facIncome))}
          {gc.lootIncome > 0 && row("Loot / week", `+${gc.lootIncome}`, COLORS.purple)}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, margin: "5px 0" }} />
          {row(`Gross income / week${gc.override ? " (override)" : ""}`, z(gc.grossIncome), COLORS.gold, true)}
          {row(`Dividend to players (${gc.dividendPct}%)`, z(gc.dividend), COLORS.blue)}
          {row("The People's Money → treasury", z(gc.peoples), COLORS.green, true)}
          {g.dividendBank > 0 && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}><Tag color={COLORS.blue}>Dividend bank: {z(g.dividendBank)}</Tag><Btn size="sm" variant="ghost" onClick={() => setGov({ dividendBank: 0 })}>Split & clear</Btn></div>}
        </div>
        <div style={{ flex: "1 1 200px", minWidth: 180 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Controls</div>
          <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 8 }}>Player dividend: <b style={{ color: COLORS.blue }}>{gc.dividendPct}%</b>
            <input type="range" min="0" max="40" value={gc.dividendPct} onChange={e => setGov({ dividendPct: +e.target.value })} style={{ width: "100%" }} />
            <span style={{ fontSize: 10, color: COLORS.dim }}>Skim more for the players; the people notice.</span>
          </label>
          <label style={{ fontSize: 11, color: COLORS.muted, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <input type="checkbox" checked={gc.override} onChange={e => setGov({ incomeOverride: e.target.checked ? gc.derived : null })} /> Override income
          </label>
          {gc.override && <TextInput type="number" value={g.incomeOverride ?? 0} onChange={e => setGov({ incomeOverride: Math.max(0, +e.target.value || 0) })} style={{ marginTop: 6, width: 120 }} />}
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 8 }}>Income banks automatically as in-world weeks pass (Session clock). The People's Money feeds the treasury; upgrades draw from it.</div>
    </div>
  );
}

function BaseTab() {
  const [state, persist] = useSharedList("party_base");
  const [universe] = useSharedList("universe");
  const [houseRules] = useHouseRules();
  const [timeState] = useSharedList("session_time");
  const [pickerFor, setPickerFor] = useState(null);   // "home" | "ship" | null
  const moreGoverning = houseRules.baseBuilding && houseRules.moreGoverning;
  const nowAbs = (timeState && timeState[0]) ? absDay(readTime(timeState).age, readTime(timeState).month, readTime(timeState).day) : null;
  // Auto-accrue the home world's income as in-world weeks pass on the Session clock.
  useEffect(() => {
    if (!moreGoverning || nowAbs == null || !state || !state[0]) return;
    const b = state[0], g = b.gov || {};
    if (g.lastAccruedAbs == null) { persist([{ ...b, gov: { ...g, lastAccruedAbs: nowAbs } }]); return; }
    const PERIOD = 7, periods = Math.floor((nowAbs - g.lastAccruedAbs) / PERIOD);
    if (periods <= 0) return;
    const galaxy = universe && universe[0];
    const planet = galaxy && galaxy.partyHomePlanetId ? galaxy.systems.flatMap(s => s.planets).find(p => p.id === galaxy.partyHomePlanetId) : null;
    const gc = computeGovernance({ home: b.home, gov: g }, planet);
    const res = b.resources || {};
    persist([{ ...b,
      resources: { ...res, zeni: (res.zeni || 0) + gc.peoples * periods, loot: (res.loot || 0) + gc.lootIncome * periods },
      gov: { ...g, lastAccruedAbs: g.lastAccruedAbs + periods * PERIOD, dividendBank: (g.dividendBank || 0) + gc.dividend * periods },
    }]);
  }, [nowAbs, moreGoverning]);
  if (state === null) return <LoadingBlock />;
  const raw = (state && state[0]) || {};
  const base = {
    factionName: raw.factionName || "",
    resources: { zeni: 0, loot: 0, ...(raw.resources || {}) },
    home: { facilities: [], maxSi: 80, maxShields: 40, hardness: 5, ...(raw.home || (raw.facilities ? { facilities: raw.facilities } : {})) },
    ship: { name: "", facilities: [], maxSi: 50, maxShields: 30, hardness: 5, ...(raw.ship || {}) },
  };
  const save = (patch) => persist([{ factionName: base.factionName, resources: base.resources, home: base.home, ship: base.ship, ...patch }]);
  const upd = (which, patch) => save({ [which]: { ...base[which], ...patch } });
  const setRes = (patch) => save({ resources: { ...base.resources, ...patch } });
  const listOf = (which) => base[which].facilities || [];
  // Build / upgrade draw from the loot pools; blocked when the pools are short.
  const addF = (which, type) => {
    const l = listOf(which); if (l.some(f => f.type === type)) return;
    const cost = facilityCost(1); if (!canAfford(base.resources, cost)) return;
    save({ resources: deductCost(base.resources, cost), [which]: { ...base[which], facilities: [...l, { id: uid(), type, level: 1 }] } });
    setPickerFor(null);
  };
  const upgrade = (which, id) => {
    const f = listOf(which).find(x => x.id === id); if (!f) return; const lvl = f.level || 1; if (lvl >= FACILITY_MAX_TIER) return;
    const cost = facilityCost(lvl + 1); if (!canAfford(base.resources, cost)) return;
    save({ resources: deductCost(base.resources, cost), [which]: { ...base[which], facilities: listOf(which).map(x => x.id === id ? { ...x, level: lvl + 1 } : x) } });
  };
  const downgrade = (which, id) => upd(which, { facilities: listOf(which).map(f => f.id === id ? { ...f, level: Math.max(1, (f.level || 1) - 1) } : f) });
  const rename = (which, id, name) => upd(which, { facilities: listOf(which).map(f => f.id === id ? { ...f, customName: name } : f) });
  const rem = (which, id) => upd(which, { facilities: listOf(which).filter(f => f.id !== id) });
  const galaxy = universe && universe[0];
  const home = galaxy && galaxy.partyHomePlanetId ? galaxy.systems.flatMap(s => s.planets.map(p => ({ s, p }))).find(x => x.p.id === galaxy.partyHomePlanetId) : null;
  const shipSys = galaxy && galaxy.currentPlanetId ? galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.currentPlanetId)) : null;
  const hp = home && home.p;
  return (
    <div>
      <ScannerHeader title="BASE OF OPERATIONS" subtitle="Your faction's home world and capital ship." />
      {/* Faction identity */}
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}44`, borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Crown size={22} color={COLORS.gold} />
        <div style={{ flex: "1 1 240px", minWidth: 0 }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>Player Faction</div>
          <TextInput value={base.factionName} onChange={e => save({ factionName: e.target.value })} placeholder="Name your faction (e.g. The Crimson Fist)" style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700 }} />
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, maxWidth: 280 }}>Your player-driven faction. Claim territory and manage Influence over in the <b style={{ color: COLORS.gold }}>Universe</b> map.</div>
      </div>

      {/* Loot pools that fund building & upgrading */}
      <ResourceLedger resources={base.resources} onChange={setRes} />

      <FacilitySection label="Home World" Icon={Building2} color={COLORS.gold}
        locationNode={home ? <span style={{ fontSize: 12 }}><Crown size={11} color={COLORS.gold} style={{ verticalAlign: "-1px" }} /> <b style={{ color: COLORS.gold }}>{hp.name}</b> <span style={{ color: COLORS.dim }}>· {home.s.name.replace(/ System$/, "")} System</span></span> : <span style={{ fontSize: 11, color: COLORS.dim }}>Set a Party Home in the Universe tab</span>}
        extra={<>
          {home && !moreGoverning && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <Tag color={COLORS.blue}>{hp.economy || "—"}</Tag>
            <Tag color={COLORS.green}>Wealth: {hp.wealth || "—"}</Tag>
            <Tag color={COLORS.amber}>Tax {hp.taxRate ?? 0}%</Tag>
            <Tag color={COLORS.dim}>Pop: {hp.population || "—"}</Tag>
          </div>}
          {moreGoverning && <GovernancePanel base={base} planet={hp} onChange={g => save({ gov: g })} />}
          <BaseStatBlock stats={base.home} onChange={s => save({ home: s })} noun="home base" />
        </>}
        facilities={listOf("home")} capacity={null} resources={base.resources} open={pickerFor === "home"} onToggle={() => setPickerFor(pickerFor === "home" ? null : "home")}
        onAdd={t => addF("home", t)} onUpgrade={id => upgrade("home", id)} onDowngrade={id => downgrade("home", id)} onRename={(id, n) => rename("home", id, n)} onRemove={id => rem("home", id)} />

      <FacilitySection label="Capital Ship" Icon={Rocket} color={COLORS.blue}
        locationNode={<span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <TextInput value={base.ship.name || ""} onChange={e => upd("ship", { name: e.target.value })} placeholder="Name the ship" style={{ width: 150, fontSize: 12, padding: "4px 8px" }} />
          {shipSys ? <span style={{ fontSize: 12, color: COLORS.blue }}><Rocket size={11} style={{ verticalAlign: "-1px" }} /> {shipSys.name.replace(/ System$/, "")} System</span> : <span style={{ fontSize: 11, color: COLORS.dim }}>Docked</span>}
        </span>}
        extra={<BaseStatBlock stats={base.ship} onChange={s => save({ ship: s })} noun="capital ship" />}
        facilities={listOf("ship")} capacity={SHIP_BAYS} resources={base.resources} open={pickerFor === "ship"} onToggle={() => setPickerFor(pickerFor === "ship" ? null : "ship")}
        onAdd={t => addF("ship", t)} onUpgrade={id => upgrade("ship", id)} onDowngrade={id => downgrade("ship", id)} onRename={(id, n) => rename("ship", id, n)} onRemove={id => rem("ship", id)} />
    </div>
  );
}

const NAV = [
  { key: "players", label: "Players", icon: UserSquare2 },
  { key: "base", label: "Base", icon: Building2 },
  { key: "npcs", label: "NPCs", icon: Users },
  { key: "session", label: "Session", icon: Globe2 },
  { key: "universe", label: "Universe", icon: Orbit },
  { key: "gmtools", label: "Compendium", icon: Wrench },
];

/* ===== Roll banner — a LOCAL, per-user toast on each roll. It fires only on the
   device that made the roll and is NOT shared to the table. Roll sites call
   emitRoll({ label, total, detail, color }); RollBannerHost (mounted once) shows a
   toast that auto-fades or can be dismissed with X. Settings live per-device in
   localStorage and are edited in Compendium → Options. ===== */
const _rollBannerSubs = new Set();
function emitRoll(payload) { _rollBannerSubs.forEach(fn => { try { fn(payload); } catch { /* ignore */ } }); }

// Navigation bus — lets the Session tracker jump the acting fighter to their own
// sheet (Combat/Features/Magic), optionally carrying a target. Same pub/sub shape
// as the roll banner. _pendingNav is read on late mounts (App switches tab → the
// destination component mounts after the event fired), then cleared by the sheet.
const _navSubs = new Set();
let _pendingNav = null;
function emitNav(payload) { _pendingNav = { ...payload }; _navSubs.forEach(fn => { try { fn(_pendingNav); } catch { /* ignore */ } }); }
function onNav(fn) { _navSubs.add(fn); return () => _navSubs.delete(fn); }

// Shared Session activity feed — anything worth surfacing to the whole table
// (a feature spent, a per-turn cost, etc.). Append-capped in the shared room
// doc; the Session tab renders it live.
async function logSession(text, who = "") {
  try {
    let list = [];
    try { const r = await window.storage.get("session_feed", true); list = JSON.parse(r.value) || []; } catch { /* first entry */ }
    list = [{ id: uid(), time: Date.now(), who, text }, ...list].slice(0, 60);
    await window.storage.set("session_feed", JSON.stringify(list), true);
  } catch { /* not in a room / offline */ }
}
const ROLL_BANNER_KEY = "sdndbz_roll_banner_v1";
const ROLL_BANNER_DEFAULT = { enabled: true, sticky: false, seconds: 4 };
function useLocalOption(key, def) {
  const [val, setVal] = useState(() => { try { const v = localStorage.getItem(key); return v == null ? def : { ...def, ...JSON.parse(v) }; } catch { return def; } });
  const save = (patch) => setVal(prev => { const next = { ...prev, ...patch }; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ } return next; });
  return [val, save];
}
function RollBannerHost() {
  const [opts] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const optsRef = useRef(opts); optsRef.current = opts;
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const sub = (p) => {
      const o = optsRef.current;
      if (!o.enabled) return;
      const id = uid();
      setToasts(t => [{ id, ...p }, ...t].slice(0, 4));
      if (!o.sticky) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), Math.max(1, o.seconds || 4) * 1000);
    };
    _rollBannerSubs.add(sub);
    return () => _rollBannerSubs.delete(sub);
  }, []);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  if (!toasts.length) return null;
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 300, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: "auto", minWidth: 210, maxWidth: 300, background: COLORS.panel, border: `1px solid ${(t.color || COLORS.gold)}99`, borderRadius: 10, padding: "10px 12px", boxShadow: "0 10px 34px rgba(0,0,0,0.55)", animation: "rollpop .25s ease" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
            <Dices size={13} color={t.color || COLORS.gold} />
            <span style={{ fontWeight: 700, fontSize: 12.5, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.label}</span>
            <span onClick={() => dismiss(t.id)} title="Dismiss" style={{ cursor: "pointer", color: COLORS.dim, display: "flex" }}><X size={14} /></span>
          </div>
          {t.total != null && t.total !== "" && <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 24, color: t.color || COLORS.gold, lineHeight: 1.1 }}>{t.total}</div>}
          {t.detail && <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: COLORS.muted, marginTop: 2 }}>{t.detail}</div>}
        </div>
      ))}
    </div>
  );
}
function OptionsTab() {
  const [opts, save] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, maxWidth: 520 };
  const rowLabel = { fontSize: 12.5, color: COLORS.text };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={card}>
        <div style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Roll Banner</div>
        <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 12 }}>Saved on this device only — it doesn't affect anyone else at the table.</div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
          <Checkbox checked={opts.enabled} onChange={e => save({ enabled: e.target.checked })} />
          <span style={rowLabel}>Show a pop-up with the result when I make a roll</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: opts.enabled ? "pointer" : "default", opacity: opts.enabled ? 1 : 0.5 }}>
          <Checkbox disabled={!opts.enabled} checked={opts.sticky} onChange={e => save({ sticky: e.target.checked })} />
          <span style={rowLabel}>Stay until I dismiss it (otherwise it fades on its own)</span>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: opts.enabled && !opts.sticky ? 1 : 0.5 }}>
          <span style={rowLabel}>Fade after</span>
          <TextInput type="number" value={opts.seconds} disabled={!opts.enabled || opts.sticky} onChange={e => save({ seconds: Math.max(1, Math.min(30, +e.target.value || 4)) })} style={{ width: 64, textAlign: "center" }} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>seconds</span>
          <Btn size="sm" style={{ marginLeft: "auto" }} onClick={() => emitRoll({ label: "Test Roll", total: roll(20), detail: "d20 · sample", color: COLORS.blue })}><Dices size={13} /> Test</Btn>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("players");
  const [gmScreen, setGmScreen] = useState(null); // null = hub
  const [houseRules] = useHouseRules();
  // The Base tab is a Materoids flavor — only in the nav when the rule is on.
  const nav = NAV.filter(n => n.key !== "base" || houseRules.baseBuilding);

  // Mirror the current world's gravity so Weighted math is live on every tab.
  useEnvGravitySync();
  useEnvHooksSync();
  useRegistryMirror();

  // A Session hand-off (Target/Feature/Cast) switches the bottom-nav tab.
  useEffect(() => onNav(p => { if (p.tab) setTab(p.tab); }), []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        @keyframes scanmove { 0% { left:-30%; } 100% { left:130%; } }
        @keyframes rollpop { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform:none; } }
        input:focus, textarea:focus, select:focus { border-color: ${COLORS.blue}88 !important; box-shadow: 0 0 0 2px ${COLORS.blue}22; }
        ::selection { background: ${COLORS.gold}44; }
        details summary::-webkit-details-marker { color: ${COLORS.muted}; }
        /* No native scrollbars anywhere — scrolling still works by wheel/drag/touch. */
        * { scrollbar-width: none; -ms-overflow-style: none; }
        ::-webkit-scrollbar { width: 0; height: 0; display: none; }
      `}</style>

      <div style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.panel, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`, flexShrink: 0 }} />
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 0.5 }}>SDNDBZ COMPANION</div>
      </div>

      <RollBannerHost />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 20px 90px" }}>
        {tab === "players" && <CharactersTab />}
        {tab === "base" && houseRules.baseBuilding && <BaseTab />}
        {tab === "npcs" && <NpcTab />}
        {tab === "session" && <SessionTab />}
        {["players", "npcs", "session"].includes(tab) && <MapDrawer />}
        {tab === "universe" && <UniverseTab />}
        {tab === "gmtools" && (
          gmScreen === null ? <GmToolsHub setScreen={setGmScreen} /> :
          gmScreen === "tables" ? <div><ScannerHeader title="TABLES" subtitle="" onBack={() => setGmScreen(null)} /><TablesScreenInner /></div> :
          gmScreen === "worldrules" ? <div><ScannerHeader title="WORLD & RULES" subtitle="The editable building blocks the app generates and runs on. Toggle, tune, and give them real effects." onBack={() => setGmScreen(null)} /><WorldRulesTab /></div> :
          gmScreen === "builders" ? <div><ScannerHeader title="BUILDERS" subtitle="DM quick-builders: roll a war goal or a raid party, then drop it into play." onBack={() => setGmScreen(null)} /><BuildersTab /></div> :
          gmScreen === "compendium" ? <div><ScannerHeader title="DATA POOL" subtitle="Real book Classes + your custom compendium entries." onBack={() => setGmScreen(null)} /><CompendiumTab /></div> :
          gmScreen === "feats" ? <div><ScannerHeader title="FEATS" subtitle="Every Epic Boon, Fighting Style, General, Heroic, Stance, Trained, and Origin Feat from the book, plus your own homebrew." onBack={() => setGmScreen(null)} /><FeatsTab /></div> :
          gmScreen === "techniques" ? <div><ScannerHeader title="TECHNIQUES" subtitle="Every Generic, Super, External, Misc, and Ultimate Technique from the book." onBack={() => setGmScreen(null)} /><TechniquesCompendiumTab /></div> :
          gmScreen === "notes" ? <div><ScannerHeader title="NOTES" subtitle="" onBack={() => setGmScreen(null)} /><NotesTab /></div> :
          gmScreen === "npcs" ? <div><ScannerHeader title="NPCS" subtitle="" onBack={() => setGmScreen(null)} /><NpcTab /></div> :
          gmScreen === "materoids" ? <div><ScannerHeader title="MATEROIDS FLAVORS" subtitle="Deviant rules & optional content." onBack={() => setGmScreen(null)} /><MateroidsFlavorsTab /></div> :
          gmScreen === "hightech" ? <div><ScannerHeader title="HIGH-TECH PARTS" subtitle="Cybernetic body enhancements for Android / Cyborg / Machine Mutant bodies." onBack={() => setGmScreen(null)} /><HighTechCompendiumTab /></div> :
          gmScreen === "options" ? <div><ScannerHeader title="OPTIONS" subtitle="Personal, per-device settings — not shared with the table." onBack={() => setGmScreen(null)} /><OptionsTab /></div> :
          gmScreen === "playbook" ? <div><ScannerHeader title="DM PLAYBOOK" subtitle="Yoohar's Unofficial 5.0 DM Playbook — encounter design, enemy tactics, house rules." onBack={() => setGmScreen(null)} /><DmPlaybookTab /></div> : null
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.panel, borderTop: `1px solid ${COLORS.border}`, display: "flex" }}>
        {nav.map(n => {
          const active = tab === n.key;
          return (
            <button key={n.key} onClick={() => { setTab(n.key); setGmScreen(null); }} style={{
              flex: 1, background: "transparent", border: "none", cursor: "pointer", padding: "10px 4px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              color: active ? COLORS.gold : COLORS.muted,
            }}>
              <n.icon size={19} />
              <span style={{ fontSize: 10.5, fontWeight: 600 }}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TablesScreenInner() {
  const [sub, setSub] = useState("book");
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {[["book","Book Tables"],["downtime","Downtime & Training"],["gambling","Gambling"],["bounty","Bounty Hunting"],["gm","GM Toolkit"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "book" && BOOK_TABLES.map(t => <BookTableCard key={t.id} table={t} />)}
      {sub === "downtime" && <DowntimeTab />}
      {sub === "gambling" && <GamblingTab />}
      {sub === "bounty" && <BountyHuntingTab />}
      {sub === "gm" && (
        <>
          <NameTableCard />
          <FlavorTableCard title="Homeworld / Planet Flavor" pool={NPC_POOLS.planet} />
          <FlavorTableCard title="NPC Role / Archetype" pool={NPC_POOLS.role} />
          <FlavorTableCard title="Plot Hook" pool={NPC_POOLS.hook} />
        </>
      )}
      {sub === "custom" && <CustomTablesTab />}
    </div>
  );
}
