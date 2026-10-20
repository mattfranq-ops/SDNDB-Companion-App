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
  // ---- Warrior — fully prose-verified (no table needed) ----
  // Book: "You have four Superiority Dice, which are d8s… You regain expended
  // Superiority Dice equal to your Ki Rank at the start of your turn. You gain
  // another Superiority Die at 5th Level and one more at 13th Level."
  {
    key: "warrior:combat-maneuvers", class: "Warrior", feature: "Combat Maneuvers", level: 1,
    name: "Superiority Dice", die: "d8", max: { byLevel: { 1: 4, 5: 5, 13: 6 } },
    reset: "turn", regen: "kirank",
    note: "Spend a die to fuel a Combat Maneuver. Regain Ki Rank dice at the start of your turn.",
  },

  // ---- Punisher — Power Points, from the Power Pool Table (level grid de-mangled
  // & verified). Begins at 2nd Level, regained on a Long Rest. Curve alternates
  // +1/+2 per level (L2:2 … L20:30). No die — a point pool spent on Punishing Smites.
  {
    key: "punisher:power-points", class: "Punisher", feature: "Punishing Smites", level: 2,
    name: "Power Points", die: "",
    max: { byLevel: { 2: 2, 3: 3, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 12, 10: 14, 11: 15, 12: 17, 13: 18, 14: 20, 15: 21, 16: 23, 17: 24, 18: 26, 19: 27, 20: 30 } },
    reset: "long",
    note: "Spend on Punishing Smites (Punishing Attack: +2d8, +1d8 per extra Power Point up to ½ Prof).",
  },

  // ---- Hero — Hero Die. Book: "a number of Hero Die equal to your Proficiency
  // Bonus, regaining half on a Short Rest and all on a Long Rest." The die grows by
  // the Hero Die Size Table (d4 → d12). Available from 1st Level.
  {
    key: "hero:hero-die", class: "Hero", feature: "Heroic Actions", level: 1,
    name: "Hero Die", die: { byLevel: { 1: "d4", 4: "d6", 8: "d8", 12: "d10", 16: "d12" } },
    max: "prof", reset: "shortHalfLongFull",
    note: "Expend for Bolster / Inspire / Recollect (roll + CHA + Hero level).",
  },

  // ---- Virtuoso — Explosive Power (L7). Book: "use this Feature a number of times
  // equal to your Proficiency Bonus per Long Rest." Formula max, verified from prose.
  {
    key: "virtuoso:explosive-power", class: "Virtuoso", feature: "Explosive Power", level: 7,
    name: "Explosive Power", die: "", max: "prof", reset: "long",
    note: "Expend a Reaction to treat a Technique as if it began with Charge.",
  },

  // ---- Elite — Critical Technique (L10). Book: "use this Feature a number of times
  // equal to 1/3 of your Proficiency Bonus, rounded up, per Long Rest." Formula max.
  {
    key: "elite:critical-technique", class: "Elite", feature: "Critical Technique", level: 10,
    name: "Critical Technique", die: "", max: "profThird", reset: "long",
    note: "Turn a Strike Technique into a guaranteed critical hit.",
  },

  // ---- Leader — Temp-HP pool. Book: "At 1st Level you have a pool of Temporary
  // Hit Points ... equal to your Leader Level x 5 ... replenishes on a Long Rest."
  // Class-level formula, verified from prose.
  {
    key: "leader:we-can-do-this", class: "Leader", feature: "We Can Do This!", level: 1,
    name: "Leadership Pool (Temp HP)", die: "", max: "classLevelX5", reset: "long",
    note: "Action: touch a creature to grant Temp HP drawn from the pool.",
  },
];

// NOT auto-provisioned — pool exists but the per-level table is mangled beyond safe
// reading and the user has no book values to confirm, so encoding a max would risk
// wrong player-facing numbers (Agent especially — Dex Okonda is a live Agent):
//   • Bruiser — Dragon Soul: uses/Long Rest, but the grid interleaves a "uses"
//     column (1→2→3) with a "Static Bonus" column (+3→+6); can't disambiguate.
//   • Agent — Battery Points (Short/Long Rest): the level grid has three candidate
//     number columns (12→27, 3→9, 1→3) and it's unclear which is Battery.
// Left out on purpose. Add once the exact tables can be read/confirmed from the book.

// Backfill queue (pending careful de-mangle + book verification, then appended above):
// Punisher (Power Points — Power Pool Table, long reset, no die), Hero (Hero Die —
// max = Prof, die size table, shortHalfLongFull), Bruiser (Dragon Soul — uses/long
// rest table), Killer (Killer Counters), Martial Artist (Ki Focus), Leader
// (Stratagem), Agent (Gadgets/Battery), Grand Chef (dishes), plus any pool-bearing
// features on Bastion / Challenger / Champion / Elite / Guardian / Virtuoso / Magus
// (Magic Infusion already lives as a caster cast-pool — reconcile must not double it).
