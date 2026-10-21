# Handoff — where the app stands

_Last updated 2026-10-20, after the 2.0 remaster._

## State

- **Version 2.0.0** is the remaster of 1.13.2. Same features and same data; the renderer was
  split out of one 11,400-line `app.jsx` into the `renderer/` folders described in the README,
  restyled, and given tests. Players' existing worlds and characters load unchanged.
- The repo was empty before this; `main` holds the untouched 1.13.2 source as the baseline.
- Verified in this container: the build, the Vitest suites, a click-through of every screen in
  a browser (old and new builds hit no page errors), and a real Electron run that hosts a table,
  creates a character, shows the join addresses and stops hosting. **Not yet verified:** the
  Windows installer (`npm run dist:win`) and a real two-machine game over Hamachi.

## What changed in the remaster

- Module split with a pure `engine/` layer; characterization snapshots prove the engine gives
  the same numbers as 1.13.2 for the pregens and every class at levels 1/5/10/20.
- Theme system (Scouter + Night Market), bundled fonts (works offline), refreshed components,
  header table panel with join addresses / connected devices / stop hosting, per-screen error
  boundary, Alt+1–6 shortcuts, plain-language connection errors.
- Table server: atomic saves, rolling backups with automatic recovery, input validation,
  clean shutdown. Electron: single instance, sandboxed renderer, locked navigation.

## Known gaps carried over from 1.13.2 (data, not code)

- **Species:** 8 of 18 species are name-only stubs (Chronin, Demon Realm Denizen, Greys,
  Neko Majin, Neo Machine Mutant, Sateery, Yardratian, Zoolatar); Majin's ASI is unread.
  (`renderer/data/species-data.js`)
- **Heritages:** only one placeholder entry; the book has General and Restricted heritage lists.
- **Class resources:** auto-tracked for Warrior, Punisher, Hero, Virtuoso, Elite and Leader only.
  Bruiser (Dragon Soul), Agent (Battery Points), Killer, Martial Artist, Grand Chef and others
  are waiting on clean book tables. (`renderer/data/class-resource-data.js`)
- `turn` / `encounter` resource resets have no automatic trigger yet; they reset manually.

## Next up

Two reports in the project's shared files say what's left:

- `sdnd/companion-comparison.md` compares the app with the Cyberpunk RED Companion and lists
  every Ch.1 rule the table still does by hand. Pass 1 of its plan (damage, shared rolls,
  death saves, start of turn) is done; `engine/damage.js` holds those rules and
  `test/damage.test.js` pins them. Pass 2 is the full condition list with timers and
  start-of-turn effects; pass 3 is the sheet (backstory, technique charges, table backup).
- `sdnd/5.0-feature-gaps.md` lists the 5.0 book content that's missing or wrong. The class
  tables are done: `data/class-data.js` was regenerated from the book (tables, feature text and
  options, saves, proficiencies, table columns), and `test/classes.test.js` checks it. Forms
  are done too: `data/form-data.js` holds all 56 Ch.6 forms and 58 Form Modifications with the
  book's formulas, `engine/forms.js` evaluates them (Power, Upkeep, Awaken Limit, Ascend cost,
  slots and families, Ramp Up), and `test/forms.test.js` checks it. Species and heritages are done:
  `data/species-data.js` holds all 18 species and 11 heritages with feature text,
  `engine/species.js` runs the heritage restrictions and the swap-up-to-3 rule, and
  `test/species.test.js` checks it. Biology Feats are in `data/biology-feat-data.js`. Next in that report: gear (Ch.9), then
  Soulbinding (Ch.10).
- Every gap found against the Cyberpunk RED Companion is closed (encounters, clocks, oracle,
  cart, map pins, saved roll modifiers). `engine/encounters.js` and `engine/table-tools.js`
  hold their rules.

## Tips for whoever picks this up

- Start with the README's "conventions" list; most bugs come from reading `char.stats`
  directly or hard-coding a color.
- `npm test` after any engine change. A snapshot diff means the sheet's numbers moved.
- The table server is the only copy of a campaign. Treat changes to `server.js` and the
  storage keys in `useSharedList(...)` calls as data migrations.
