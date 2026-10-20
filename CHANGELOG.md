# Changelog

## 2.0.0 — Remaster

Everything from 1.13.2 still works the same way, and existing tables load unchanged.

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
