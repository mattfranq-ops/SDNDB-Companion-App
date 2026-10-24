// Class-granted limited-use resources (book Ch.4 — SDNDB Master Doc). This drives
// AUTO-PROVISIONING: a reconcile pass builds char.resources[] from the character's
// classes + levels, so a pool appears the moment you level into the feature that
// grants it, tracks through play, and re-clamps its max on level-up (your current
// value is preserved). Same editable-data pattern as feat-data / technique-data.
//
// Values are extracted and VERIFIED against the book — never guessed. Where the
// mangled PDF table can't be read confidently, the field is left null and flagged
// (needsMax / needsDie) so the tracker still auto-appears with a "set once" max
// rather than a fabricated number.
//
// Entry shape:
//   { key, class, feature, level,   // identity + the class level it comes online
//     name,                         // label the player sees on the tracker
//     die,                          // "" | "d8" | { byLevel: { 1:"d4", … } } — set = a rollable dice pool
//     max,                          // int | "prof" | "profHalf" | "kirank" | { byLevel: { 1:4, 5:5, … } }
//     reset,                        // "short" | "long" | "shortHalfLongFull" | "turn" | "encounter" | "dawn" | "manual"
//                                   //   | "earned" (starts empty, fills in play, emptied by a Long Rest)
//     regen,                        // optional: amount restored per reset trigger (e.g. "kirank")
//     note }                        // short reminder shown on the Combat surface
//
// Resolver rules (in app.jsx):
//   - max/die byLevel: the highest keyed level ≤ the character's level in THAT class wins.
//   - formula maxes: "prof" = Proficiency Bonus, "profHalf" = ceil(Prof/2), "kirank" = Ki Rank.
//   - reset "turn"/"encounter" have no auto-trigger until the Session turn system exists;
//     until then they carry a manual reset (intent recorded so they auto-wire later).
//   - "shortHalfLongFull" = regain half of max on a Short Rest, all on a Long Rest.
export const CLASS_RESOURCES = [
  // Every entry below is read from the 5.0 Beta class tables (Ch.4) and the
  // feature's own text. Columns quoted are the class table's.

  // ---- Agent — Battery Points (Major Gadgets, L5). Table column "Battery
  // Points"; "These Battery Points refresh on a Short or Long Rest."
  {
    key: "agent:battery-points", class: "Agent", feature: "Major Gadgets", level: 5,
    name: "Battery Points", die: "",
    max: { byLevel: { 5: 12, 7: 15, 10: 18, 13: 21, 16: 24, 19: 27, 20: 54 } },
    reset: "short",
    note: "One per Major Gadget cast. Int is the casting stat; save DC 8 + Prof + Int.",
  },

  // ---- Bastion — Defensive Energy (L2). "a number of times equal to your
  // Proficiency Bonus per Short or Long Rest", 4d4 Temp HP growing to 4d6 (7),
  // 4d8 (13) and 4d10 (18).
  {
    key: "bastion:defensive-energy", class: "Bastion", feature: "Defensive Energy", level: 2,
    name: "Defensive Energy", die: { byLevel: { 2: "4d4", 7: "4d6", 13: "4d8", 18: "4d10" } },
    max: "prof", reset: "short",
    note: "Reaction: you and an ally within 30 ft gain the dice + CON in Temp HP until the end of their next turn.",
  },

  // ---- Bruiser — Dragon Soul (L2). Table column "Dragon Soul Uses", per Long
  // Rest; "Unlimited" at 20. Going past the max costs a Rank of Exhaustion.
  {
    key: "bruiser:dragon-soul", class: "Bruiser", feature: "Dragon Soul", level: 2,
    name: "Dragon Soul", die: "",
    max: { byLevel: { 2: 2, 4: 3, 7: 4, 13: 5, 18: 6, 20: 99 } },
    reset: "long",
    note: "Bonus Action, 1 minute: Advantage on STR, the Dragon Soul Bonus to STR attacks, Resistance to all but Destruction and Psychic. Past the max: a Rank of Exhaustion when it ends.",
  },

  // ---- Champion — Hype (Crowd Pleaser, L2). "You may hold an amount of Hype
  // equal to your Proficiency Bonus, lost on a Long Rest." Earned, not refilled.
  {
    key: "champion:hype", class: "Champion", feature: "Crowd Pleaser", level: 2,
    name: "Hype", die: "", max: "prof", reset: "earned",
    note: "Gain one when you damage with an Unarmed Strike or melee weapon. Spend 2 for +1 to an Attack Roll or Technique.",
  },

  // ---- Grand Chef — Restorative Candy (L1). "a number of times per Long Rest
  // equal to your Proficiency Bonus"; heal from the "Restorative Candy" column.
  {
    key: "grandchef:restorative-candy", class: "Grand Chef", feature: "Restorative Candy", level: 1,
    name: "Restorative Candy", die: { byLevel: { 1: "2d6", 5: "2d8", 9: "2d10", 13: "2d12", 17: "5d6" } },
    max: "prof", reset: "long",
    note: "Bonus Action: make INT-mod candies. Eating one (Bonus Action) restores the dice in HP or Ki.",
  },

  // ---- Hero — Hero Die (Heroic Actions, L1). "a number of Hero Die equal to
  // your Proficiency Bonus, regaining half of your expended uses on a Short Rest
  // and all uses when you finish a Long Rest." Size from "Hero Die Size".
  {
    key: "hero:hero-die", class: "Hero", feature: "Heroic Actions", level: 1,
    name: "Hero Die", die: { byLevel: { 1: "d6", 5: "d8", 9: "d10", 13: "d12", 17: "2d6" } },
    max: "prof", reset: "shortHalfLongFull",
    note: "Bonus Action: spend one on a Heroic Action.",
  },

  // ---- Leader — We Can Do This! (L1). "a pool of Temporary Hit Points that
  // replenishes when you take a Long Rest … equal to your Leader Level x 5."
  {
    key: "leader:we-can-do-this", class: "Leader", feature: "We Can Do This!", level: 1,
    name: "Leadership Pool (Temp HP)", die: "", max: "classLevelX5", reset: "long",
    note: "Action: touch a creature to grant Temp HP drawn from the pool.",
  },

  // ---- Punisher — Power Points (Punishing Smites, L2). Table column "Power
  // Pool", regained on a Long Rest.
  {
    key: "punisher:power-points", class: "Punisher", feature: "Punishing Smites", level: 2,
    name: "Power Points", die: "",
    max: { byLevel: { 2: 2, 3: 3, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 12, 10: 14, 11: 15, 12: 17, 13: 18, 14: 20, 15: 21, 16: 23, 17: 24, 18: 26, 19: 27, 20: 30 } },
    reset: "long",
    note: "Spend on Punishing Smites.",
  },

  // ---- Virtuoso — Explosive Power (L7). "a number of times equal to your
  // Proficiency Bonus per Long Rest."
  {
    key: "virtuoso:explosive-power", class: "Virtuoso", feature: "Explosive Power", level: 7,
    name: "Explosive Power", die: "", max: "prof", reset: "long",
    note: "Expend a Reaction to treat a Technique as if it began with Charge.",
  },

  // ---- Warrior — Superiority Dice (Combat Mastery, L2). "You have four
  // Superiority Dice, which are d8s … regain expended Superiority Dice equal to
  // your Ki Rank at the start of your turn. You gain another Superiority Die at
  // 5th Level and one more at 13th Level." d10 at 9th, d12 at 17th
  // (Superiority Improvement).
  {
    key: "warrior:combat-maneuvers", class: "Warrior", feature: "Combat Mastery", level: 2,
    name: "Superiority Dice", die: { byLevel: { 2: "d8", 9: "d10", 17: "d12" } },
    max: { byLevel: { 2: 4, 5: 5, 13: 6 } },
    reset: "turn", regen: "kirank",
    note: "Spend a die to fuel a Combat Maneuver. Regain Ki Rank dice at the start of your turn. Save DC 8 + Prof + STR or DEX.",
  },
];
