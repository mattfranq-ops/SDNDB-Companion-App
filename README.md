# SDNDBZ Companion

A desktop companion app for **Super Dungeons and Dragonball (SD&DBZ)**, the D&D 5e (2024) based
Dragon Ball tabletop RPG. Character sheets, NPCs and antagonists, a live session tracker with
initiative, dice, environment and a battle map, a generated galaxy with an economy, and a
compendium of the book's rules data. Everything is shared live with your table.

Unofficial, non-commercial, fan-made. Not affiliated with the SD&DBZ Team, Bird Studio /
Shueisha / Toei Animation, or Wizards of the Coast. You need the SD&DBZ rulebook to play.

## How the table works

One person (usually the DM) **hosts**: their copy of the app runs a small table server and
keeps the campaign on their computer. Everyone else **joins** that computer's address. There is
no cloud service and no account.

- Same Wi-Fi: players join the host's LAN address (`192.168.x.x` or `10.x.x.x`).
- Remote players: everyone joins one free VPN network (Hamachi or ZeroTier) and players join
  the host's VPN address (Hamachi addresses start with `25.`).
- The host keeps the app open while you play. The table panel at the top right shows the
  addresses to give players, who is connected, and the Stop hosting button.

Player-facing instructions live in [HOW_TO_HOST_AND_JOIN.txt](HOW_TO_HOST_AND_JOIN.txt).
Worlds are saved in the host's app data folder (`%APPDATA%\SDNDBZ Companion\worlds` on
Windows), one JSON file per table name, with a rolling `.bak` beside each.

## Development

Requirements: Node.js 20+ and npm. Building the Windows installer from Linux also needs Wine.

```bash
npm install
npm start          # build the renderer and launch Electron
npm run watch      # rebuild on change (run `npm run electron` alongside it)
npm test           # rules-engine and table-server tests
npm run serve      # run a table server on :30000 without Electron (for testing)
npm run dist:win   # build the Windows installer into release/
```

You can also open `dist/index.html` in a browser after `npm run build` and use **Join a table**
against `npm run serve`; hosting needs the desktop app.

## Project layout

```
main.js, preload.js     Electron main process + the host-server bridge (window.lanHost)
server.js               The table server: HTTP ops + Server-Sent Events, JSON world files
renderer/
  entry.jsx             Splash → Connect → App
  storage.js            window.storage: local saves + the live table connection
  app/                  App shell, header table panel, options, roll banner, event bus
  engine/               Pure rules math (stats, Power, AC/DR, spellcasting, resources,
                        cybernetics, skills, environment, universe generation)
  state/                Shared-room hooks, house rules, the World & Rules registry
  data/                 Book data (classes, feats, techniques, spells, species, NPCs…)
  features/             One folder per section: characters, npcs, session, universe,
                        base, compendium, tables, registry, gmtools
  ui/                   theme.js (colors, fonts, themes) and the shared UI atoms
scripts/build.mjs       esbuild bundling of the renderer into dist/
test/                   Vitest suites
```

Conventions worth knowing before you change things:

- **Colors and fonts come from `renderer/ui/theme.js`.** Components style inline and often
  append a hex alpha (`${COLORS.gold}55`), so theme colors must stay 6-digit hex.
- **Read stats through the engine** (`statMod`, `effectiveStats`, `effectivePowerBonus`), never
  `char.stats` directly: the engine layers in gear, feats, forms, conditions and gravity.
- **Shared state** goes through `useSharedList(key)` in `state/hooks.js`, which reads, writes
  and live-subscribes a key in the current table.
- **Book numbers are verified, not guessed.** Data files flag anything not yet confirmed
  against the book; keep doing that.
- `test/__snapshots__` pins the numbers the sheet shows. If a rules change is intentional,
  run `npx vitest run -u` and review the snapshot diff in the PR.
