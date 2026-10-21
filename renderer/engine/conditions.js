/* ===== Condition library (5.0 Ch.1 pp. 10–17, plus the 5e 2024 basics) =====
   One short rules summary per condition for the tracker's picker and hover
   text, a default duration where the book gives one, and the start-of-turn
   effect the tracker runs for it. `sheet` names the sheet toggle (see
   CONDITIONS_DATA in core.js) that a linked player gets while the condition
   is on them, so its Power and bonuses apply. `needsRank` conditions scale
   with the Ki Rank of whoever inflicted them; the tracker asks for it. */

const CONDITION_LIBRARY = [
  // Beneficial
  { name: "Boosted (Body)", group: "Beneficial", sheet: "boostedBody", start: "boostedBody", text: "Start of turn: Temp HP equal to Character Level. Advantage on Death Saves if dropped to 0. Add Con mod to HP/Ki regained." },
  { name: "Boosted (Heart)", group: "Beneficial", sheet: "boostedHeart", text: "Spend 3 Stamina to regain a used Reaction. Advantage vs Charmed, Frightened, Berserk. Once per round, Advantage on a Clash / Struggle roll." },
  { name: "Boosted (Instinct)", group: "Beneficial", sheet: "boostedInstinct", text: "+1 to Attack-Action attacks. Melee Ki regain doubled. Reaction attacks against you take −Ki Rank." },
  { name: "Boosted (Mind)", group: "Beneficial", sheet: "boostedMind", text: "Add Ki Rank to Concentration. Add Character Level to Gather Ki. Max Ki +2 × Character Level." },
  { name: "Boosted (Soul)", group: "Beneficial", sheet: "boostedSoul", text: "Once per round: a free Metamagic or Mastery Option. Attack-Action damage can become Energy." },
  { name: "Boosted (Spirit)", group: "Beneficial", sheet: "boostedSpirit", text: "+1 Static Bonus to Techniques and Spells. Charge one extra time. Once per round, Disadvantage on an enemy's Clash / Struggle roll." },
  { name: "Boosted (Tempo)", group: "Beneficial", sheet: "boostedTempo", text: "Once per round, reroll a save against movement or action-economy conditions. An extra attack with the Attack Action." },
  { name: "Bulk", group: "Beneficial", ranked: true, text: "Per rank: melee hits can Launch 5 ft; +1 to Strength saves (max Ki Rank)." },
  { name: "Enraged", group: "Beneficial", sheet: "enraged", rounds: 1, text: "+2 Stable Power, +10 ft speed, +1 AC, 5 Temp Stamina. No Concentration. Lasts until the end of your next turn." },
  { name: "Gigantification", group: "Beneficial", ranked: true, text: "Per rank: +1 size, +5 ft reach and Ki range; non-Shifting armor breaks; Ki Blasts become a Dex save. 2+ ranks: DR = half your ranks, area blasts and strikes." },
  { name: "Hyper Mode", group: "Beneficial", sheet: "hyperMode", rounds: "2xKiRank", text: "+2 Power, +10 ft speed, your chosen Boosted condition, halve one Technique's cost. Costs 2 Stamina; lasts 2 × Ki Rank rounds." },
  { name: "Rescaled (Maxi)", group: "Beneficial", ranked: true, text: "Per rank: 1 rank of Bulk, +5 ft reach, +1 size." },
  { name: "Rescaled (Mini)", group: "Beneficial", ranked: true, text: "Per rank: +10 ft speed, +1 Dex checks and saves, −1 Attack-Action damage, −5 ft reach, −1 size." },
  { name: "Weighted (Light)", group: "Beneficial", ranked: true, text: "Per rank: +10 ft speed, +5 ft Technique movement, +1 Stable Power while conscious." },
  // Soft crowd control
  { name: "Altered (Older)", group: "Soft CC", ranked: true, text: "Per rank: +1 Str/Con checks and saves, resources as if you gained a level. Past 4 − Ki Rank ranks you lose them; 10 ranks and you die." },
  { name: "Altered (Younger)", group: "Soft CC", ranked: true, text: "Per rank: +5 ft speed, extra Ki when regaining it, +1 Dex. Past Ki Rank ranks: −1 damage per rank and −1 Str. 10 ranks: Incapacitated." },
  { name: "Barrier Strain", group: "Soft CC", text: "AC bonuses from Techniques and Spells are halved, and so is damage they would prevent." },
  { name: "Berserk", group: "Soft CC", text: "Also Enraged. Must spend your Action or Bonus Action attacking the last creature that hurt you or a random one. Disadvantage on Wis. No Assist, Counter!, I Got 'Em!, Interception or Tag Team. Ends after two turns with no target." },
  { name: "Impaled", group: "Soft CC", needsRank: true, start: "impaled", text: "Start of turn, before Upkeep: Ki Damage equal to 12 × the inflicter's Ki Rank." },
  { name: "Ki-Flux", group: "Soft CC", needsRank: true, start: "kiFlux", text: "Start of turn, roll d6. 1–2: Ki Techniques cost +3 × inflicter's Ki Rank. 3–4: Con save (10 + 5 × Technique Rank) to cast. 5–6: only Gather Ki (Minor). Melee Ki regain halved." },
  { name: "Pinned", group: "Soft CC", text: "Speed halved. No teleporting, flying or hovering." },
  { name: "Reactively Charged", group: "Soft CC", needsRank: true, text: "When damaged: everyone within 10 ft makes a Dex save or takes Xd10 Energy (X = inflicter's Ki Rank), half on a success. You fail it. You subtract their Ki Rank from Con / Wis saves vs Techniques this turn. Once per turn." },
  { name: "Suspended", group: "Soft CC", start: "suspended", text: "Hanging in the air: you don't fall until the start of your next turn, or until you touch a surface." },
  { name: "Weighted (Heavy)", group: "Soft CC", ranked: true, text: "Per rank: −10 ft speed, −5 ft Technique movement, −1 Power (can go negative)." },
  { name: "Wounded", group: "Soft CC", text: "All Stamina costs are doubled. Ends with a Healer's Kit (Action), a Long Rest or Greater Restoration." },
  // Hard crowd control
  { name: "Crippled", group: "Hard CC", ranked: true, text: "Roll on the Lingering Injury table for each rank." },
  { name: "Dazed", group: "Hard CC", rounds: 1, buffer: true, text: "Movement or Action, not both. No Bonus Action or Reaction. Only Block, Energy Clash, Push Back and Struggle." },
  { name: "Disabled", group: "Hard CC", rounds: 10, buffer: true, text: "Casting Times step up (Bonus Action → Action → 1 Turn). 1 minute, or an Action (yours or an ally's) ends it." },
  { name: "Embedded", group: "Hard CC", needsRank: true, rounds: "inflicterPlus1", buffer: true, text: "Can't move or take Bonus Actions; your Action must be the Strength save to escape. Technique attacks auto-hit and Dex saves auto-fail, then you break free. Breaks after the inflicter's Ki Rank + 1 rounds." },
  { name: "Frozen in Time", group: "Hard CC", text: "Incapacitated, speed 0, attacks against you have Advantage, Disadvantage on Str and Dex. Immune if your Power ≥ the inflicter's Proficiency Bonus." },
  // Other
  { name: "Dead", group: "Other", text: "(Optional) Max HP −2d12 at the start and end of each turn on the Prime Material Plane without Anchor Points. Max resources doubled." },
  // 5e 2024 basics
  { name: "Blinded", group: "5e", text: "Can't see. Your attacks have Disadvantage; attacks against you have Advantage." },
  { name: "Charmed", group: "5e", text: "Can't attack the charmer. They have Advantage on social checks against you." },
  { name: "Deafened", group: "5e", text: "Can't hear." },
  { name: "Frightened", group: "5e", text: "Disadvantage on checks and attacks while the source is in sight. Can't move closer to it." },
  { name: "Grappled", group: "5e", text: "Speed 0. Escape with a Str or Dex save against the grappler's Unarmed Save DC." },
  { name: "Incapacitated", group: "5e", text: "No Actions, Bonus Actions or Reactions. Concentration breaks." },
  { name: "Invisible", group: "5e", text: "Attacks against you have Disadvantage; yours have Advantage." },
  { name: "Paralyzed", group: "5e", buffer: true, text: "Incapacitated, speed 0, fail Str and Dex saves. Attacks against you have Advantage; hits within 5 ft are Critical." },
  { name: "Petrified", group: "5e", text: "Turned to stone: Incapacitated, resistance to all damage." },
  { name: "Poisoned", group: "5e", text: "Disadvantage on attack rolls and ability checks." },
  { name: "Prone", group: "5e", text: "Crawl or spend half your speed to stand. Melee attacks against you have Advantage, ranged have Disadvantage." },
  { name: "Restrained", group: "5e", text: "Speed 0. Your attacks and Dex saves have Disadvantage; attacks against you have Advantage." },
  { name: "Stunned", group: "5e", buffer: true, text: "Incapacitated. Fail Str and Dex saves. Attacks against you have Advantage." },
  { name: "Unconscious", group: "5e", text: "Incapacitated and Prone. Fail Str and Dex saves. Hits within 5 ft are Critical." },
];
const CONDITION_GROUPS = ["Beneficial", "Soft CC", "Hard CC", "Other", "5e"];

function findCondition(text) {
  const t = String(text || "").trim().toLowerCase();
  return CONDITION_LIBRARY.find(c => c.name.toLowerCase() === t) || null;
}

// Default rounds for a condition when the user didn't type any. `kiRank` is
// the subject's own Ki Rank (Hyper Mode), `inflicterRank` the attacker's.
function defaultRounds(def, { kiRank = 1, inflicterRank = 1 } = {}) {
  if (!def || def.rounds == null) return null;
  if (def.rounds === "2xKiRank") return 2 * kiRank;
  if (def.rounds === "inflicterPlus1") return inflicterRank + 1;
  return def.rounds;
}

// Ki-Flux table (p.16), rolled at the start of the afflicted creature's turn.
function kiFluxResult(d6, inflicterRank = 1) {
  if (d6 <= 2) return `Ki Techniques cost +${3 * inflicterRank} Ki this turn`;
  if (d6 <= 4) return "casting a Technique needs a Con save (10 + 5 × its Rank) or it fizzles";
  return "Gather Ki (Minor) only this turn";
}

// Exhaustion (p.9): −2 per rank on every d20 test, −5 ft speed per rank, death at 6.
function exhaustionRanks(char) {
  return Math.max(0, (char && (char.vitals?.exhaustion ?? char.exhaustion)) || 0);
}
const exhaustionPenalty = (char) => -2 * exhaustionRanks(char);

// Saved roll modifiers (a blessing, a scouter, a grudge): switched on or off on
// the Combat tab and added to every matching roll. appliesTo is "all",
// "attack", "damage", "check" or "save"; spell attacks count as attacks.
const ROLL_MOD_TARGETS = [["all", "All d20 rolls"], ["attack", "Attacks"], ["damage", "Damage"], ["check", "Checks"], ["save", "Saves"]];
function rollModBonus(char, kind) {
  const on = ((char && char.rollMods) || []).filter(m => m.on && (Number(m.value) || 0) !== 0
    && (m.appliesTo === kind || (m.appliesTo === "all" && kind !== "damage")));
  return { total: on.reduce((s, m) => s + (Number(m.value) || 0), 0), names: on.map(m => m.name || "Modifier") };
}

// Ki Exhaustion (p.25): no Ki left, Temporary Ki included.
const inKiExhaustion = (char) => !!char && (char.maxKi || 0) > 0 && (char.ki || 0) + ((char.temp && char.temp.ki) || 0) <= 0;

export {
  CONDITION_LIBRARY,
  CONDITION_GROUPS,
  findCondition,
  defaultRounds,
  kiFluxResult,
  exhaustionRanks,
  exhaustionPenalty,
  ROLL_MOD_TARGETS,
  rollModBonus,
  inKiExhaustion,
};
