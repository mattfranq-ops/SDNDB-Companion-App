# Changelog

## 2.0.0 — Remaster

Everything from 1.13.2 still works the same way, and existing tables load unchanged.

**Injuries on the body**
- The Vitals tab's body model shows every injury where it is. A pulsing mark means an open
  injury. A lost arm, leg or tail is cut off the figure, and a lost eye gets a patch. Tap a body
  part to see only what's there.
- Healing a serious injury leaves a stitched scar on that spot, and the scar stays on the model.
- Injuries track themselves:
  - Adding Crippled rolls the book's Lingering Injury table and places the result.
  - A Critical Hit that lands rolls a Crit Injury where it hit, from the sheet's Apply button or
    the tracker's damage panel (Crit chip). Any condition the injury causes goes on the tracker row.
  - Each Long Rest, a Festering Wound takes 1 Maximum HP. Healing it gives the HP back.
- The Combat tab pins active injuries and their effects at the top.
- **Crit Injuries** is a house rule (GM Tools → Materoids Flavors), on by default. It has a d6
  table each for the head, body, arms and legs. Every row can be edited, so a table can run its
  own alternate crits.

**Combat that runs itself** (after comparing the app with the Cyberpunk RED Companion; see
`5.0` Ch.1 for the rules)
- A hit on a tracker target now offers **Apply to target**: DR (capped at Proficiency Bonus + 1),
  the Physical Bonus DR-ignore, Destruction Damage, Block, Wild Sense, resistances and Temporary
  HP are all worked out, and the result syncs to the target's sheet.
- Every tracker row has a **damage / heal** panel (HP or Ki, Destruction, saved for half,
  resist, vulnerable).
- Natural 20s roll the damage dice twice. Melee hits during the Attack Action restore 5 × Ki
  Rank Ki (doubled by Boosted Instinct).
- Bloodied and Critical tags show on every row, enemies included, as the book requires.
- **Shared roll log:** moves, skills, saves and spells rolled on a sheet land in Session → Rolls
  with who rolled them. Any device can switch to private rolls (seen only by DM view).
- **Death Saves follow 5.0:** rolled automatically at the start of the turn, three successes
  leave you Stable at 0 HP, a natural 1 is two failures, a natural 20 brings you back at 1 HP,
  and damage while Unstable adds two failures. Tracker and sheet now share one set of saves.
- **Start of turn** pays Upkeep from Temporary Ki first, ends Block and Wild Sense, and on
  Overload deals the full chart's Destruction Damage (it dropped the extra d6s past 6) and
  rolls the Wisdom save against Dazed.
- Timed conditions now count down at the end of their owner's turn.
- Ki and Stamina costs spend Temporary points first.
- **Conditions from the book:** the tracker's condition box suggests all 45 conditions (the 5.0
  list plus the 5e basics) with their rules on hover. Book durations fill in on their own
  (Hyper Mode 2 × Ki Rank, Embedded inflicter's Ki Rank + 1, Disabled 1 minute, Dazed and
  Enraged one turn), and Impaled, Ki-Flux, Embedded and Reactively Charged ask for the
  inflicter's Ki Rank.
- Conditions with a sheet toggle (Hyper Mode, Enraged, the seven Boosted) switch it on for a
  linked fighter, so their Power applies, and off again when they end.
- Start of turn also runs Impaled (Ki Damage before Upkeep), Ki-Flux (rolls the d6 and says
  what it does), Boosted (Body) (Temp HP equal to level) and Suspended (ends), and refreshes
  per-turn class resources. Ending the encounter refreshes per-encounter ones.
- Exhaustion takes 2 per rank off attack rolls, checks, saves and spell attacks, and the
  Combat tab warns about Exhaustion and Ki Exhaustion.
- A condition tag's remove control is now a real button (keyboard and screen readers).

**Classes rebuilt from the 5.0 book** (Ch.4, pp. 89–178)
- All 18 class tables were re-read from the book. 17 of them had the wrong features at some
  levels (Bastion, for one, had a made-up list), so level-up showed the wrong things.
- Every class feature now has its rules text. Click a feature on the class table, the Features
  list or the level-up dialog to read it, options included (Quips, Combat Maneuvers, Deadly
  Tricks, Meal Prep dinners and the rest).
- The class picker and Compendium show the book's tagline and story, hit die, Ki Modifier,
  saves, proficiencies, starting equipment and the full table with its extra columns.
- The first class you pick sets your saving throw proficiencies, and level-up rolls the hit die
  of the class you're levelling.
- **Unarmored Defense** now adds half your Proficiency Bonus, rounded up, as the book says (it
  was missing). Warrior adds the whole Proficiency Bonus. In armor, a class with a stat-based
  Unarmored Defense can use that stat instead of DEX. Magus and Mystic get DR of Ki Rank + 1
  unarmored (halved in armor).
- **Extra Attack** counts each time the table grants it, so a level 20 Warrior gets four attacks
  and classes without it (Mystic) get one.
- Unarmed Strike and Basic Ki Blast dice come from the class table, and the strike uses the
  best stat your Unarmed Combat style allows (Calculated INT, Flashy CHA, Perceptive WIS…).
- Class pools from the book: Agent Battery Points, Bastion Defensive Energy, Bruiser Dragon
  Soul, Champion Hype (earned, lost on a Long Rest), Grand Chef Restorative Candy, Hero Die
  (now d6 → 2d6 as printed), Leader pool, Punisher Power Points, Virtuoso Explosive Power and
  Warrior Superiority Dice (from 2nd level, d8 → d12). Pool dice like 4d6 roll in one click.
  Elite Critical Technique is no longer a limited pool in 5.0, so it's gone.
- Superiority Dice regain Ki Rank dice at the start of the turn, not the whole pool.

**Equipment from the 5.0 book** (Ch.9, pp. 437–488)
- The Store now sells all 71 weapons (damage, properties and Weapon Mastery), ammunition and
  magazines, the adventuring gear and tool tables, Scouters, every size of Hetap, Sage Water
  and Vitadrink, the Premium Bento Box and Senzu Beans, plus the Scientific Marvels, Mechs and
  Vehicles that have a price (gated by the planet's tech level). Shelves have group filters and a search.
- Bought weapons arrive with their stats and go straight into an empty hand.
- **Consumables** in the inventory have a one-tap Use: it rolls what the item restores, caps at
  your maximum and uses one up. A second Hetap or Senzu Bean before a Long Rest adds the book's
  Exhaustion, and a Premium Bento Box works once per Long Rest.
- A new **Equipment** page in the Compendium lists every weapon, armor, consumable, gear and tool,
  plus the rules entries: weapon properties, magical gear, all 21 enchantments, heroic armors
  and weapons, Dragon Balls, Nimbus, Potara, the Scientific Marvels, mechs and 19 vehicles.

**Species and Heritages from the 5.0 book** (Ch.3, pp. 31–88)
- All 18 species now carry their full traits (the 8 that were name-only, Chronin through Zoolatar,
  are filled in) plus every Species Feature, option list (Bestial Characteristics, Strange
  Quirks, Alien Characteristics…) and Sub-Species with its rules text. Click a feature under the
  Species field to read it. Categories follow the book (Saiyan, Namekian and Majin are Otherworldly).
- All 11 Heritages, General and Restricted. The Heritage list only offers the ones your species
  can take (no Saiyan Blood for a Saiyan, no Daemonchilde for an Otherworldly species).
- The swap rule: pick which Species Feature each Heritage Feature replaces, up to three.
  Features that name their replacement (S-Cell Overload's Berserker Sub-Species replaces Super
  Saiyan) are set for you. The Features tab shows what you have, swapped-out features struck through.
- Heritage Biology forms (Speedster, Prehistoric Blood, S-Cell Overload) show in the form picker
  once you have the Heritage.
- All 80 Biology Feats (Ch.7, pp. 252–264) join the feat list with their prerequisites. The feat
  picker offers the ones for your Species and Heritage; search or pick the Biology list to see the rest.

**Forms from the 5.0 book** (Ch.6, pp. 201–248)
- All 56 Forms and 58 Form Modifications with their rules text, Power, Awaken Limit, Upkeep and
  Cost to Ascend. Pick them in Growth → Forms: your species' Biology forms show first, with
  General and Restricted forms below and a search across every species.
- Book forms scale as you level: Combat Mode's Power is your Ki Rank and its Upkeep 3 × Ki Rank,
  Super Saiyan Full Power's Upkeep is 5 × (2 + Ki Rank), and so on.
- **Awaken** a form from the Forms tab: it needs more current Ki than the Awaken Limit and pays
  the Upkeep to start. God Forms **Ascend** instead and pay their Stamina cost. The book's limits
  hold: one Transformation and one Power-Up at a time, and never two forms from one Family.
- **Ramp Up** adds a Form Modification to an active form (Super Saiyan Grade 2, Kaio-Ken x20!,
  Super Saiyan 3…), checks its Awaken Limit, and swapping one for another pays only the
  difference in Upkeep.
- Variable Form Upkeep forms (Overclock, Full Power, Pure Progress…) let you choose how much Ki to
  put in, and their Power follows it up to the book's cap. Stable Power from forms stays out of
  Overload, and Super Saiyan Grade 4 makes the whole form's Power stable.
- Kaio-Ken's Hit Point Upkeep comes off HP at the start of the turn.
- Forms you made by hand keep working exactly as before.

**Table tools** (the last gaps found against the Cyberpunk RED Companion)
- **Roll Encounter** in the Session tracker rolls a fight from the Roster of FighterZ sized to
  the party (players, average level, Easy to Deadly, any saga). Hard and Deadly fights get an
  Elite or Iconic leader with Generals from the same crew. Reroll until it fits, then one click
  saves the NPCs and puts them in initiative. The book has no encounter budget, so the app's
  guide is: each player is one General of the party's tier, an Elite counts two, an Iconic four.
- **Saved modifiers** on the Combat tab: keep Bless +2, a high-ground bonus or a curse on the
  sheet, switch them on when they apply, and they're added to attacks, damage, checks, saves or
  spell attacks automatically.
- **Store cart:** add several items (or several of one) to a cart in the Store or Night Market
  and buy them all at once, with one Zeni deduction and a running "keeps / short by" total.
- **Clocks** (Session → Clocks): a pool of dice counting down to an event. Roll it when its
  trigger happens; dice showing 1 (or 1–2, 1–3) are lost, or tap a die to remove it. The
  event lands in the activity feed when the last die goes.
- **Oracle** (Compendium → Tables → GM Toolkit): ask a yes/no question, pick how likely, roll
  d100 for Yes, No, "Yes, and…" or "No, and…".
- Store checkout puts bought gear straight into an empty slot that fits it.
- The tracker shows whose turn it is and who's up next.
- **Map pins:** drop named pins on the battle map with a note shown on hover, drag them around,
  and (in DM view) hide a pin from players until they find it.

**Sheet and table**
- Bio → **Story**: backstory, a goals checklist, and the people in a character's life (allies,
  contacts, mentors, family, rivals, enemies) with notes.
- Table panel → **Backup** saves every shared doc at the table (characters, NPCs, galaxy,
  tracker, notes) to one JSON file on any device.

**Fixed**
- An open character sheet ignored changes made elsewhere at the table (damage, Upkeep) and
  wrote the old numbers back on the next edit.

**New**
- Interface themes in Compendium → Options: **Scouter** (the original look) and **Night Market**
  (black, signal red and cyan).
- Table panel at the top right: live/reconnecting status, the addresses players join with
  (the host never saw these before, they flashed past on Start Hosting), devices connected,
  and Stop hosting / Leave table.
- Alt+1 … Alt+6 jump between sections.

**Improved**
- Refreshed visual design across shared components, the header, navigation, splash and
  connect screens.
- Fonts ship with the app, so a LAN with no internet still looks right.
- Connection errors explain what to check instead of showing raw error codes.
- If one screen crashes it shows an error card with "Try again" instead of a blank app.

**Safer saves**
- World files are written atomically and backed up; a damaged save restores from the backup.
- Stopping the host frees the port immediately.
- Only one copy of the app can run at a time.

**Under the hood**
- `app.jsx` (11,400 lines) split into engine, state, data, ui and per-feature modules.
- Tests for the rules engine and the table server; new build script with a watch mode.
