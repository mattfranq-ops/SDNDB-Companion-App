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

Compare the app against the **5.0 Beta Document** (514 pages: rules, character creation,
species and heritages, 18 classes, downtime and training, forms, customization/feats,
techniques) and build what's missing. That list lives in the project thread.

## Tips for whoever picks this up

- Start with the README's "conventions" list; most bugs come from reading `char.stats`
  directly or hard-coding a color.
- `npm test` after any engine change. A snapshot diff means the sheet's numbers moved.
- The table server is the only copy of a campaign. Treat changes to `server.js` and the
  storage keys in `useSharedList(...)` calls as data migrations.
