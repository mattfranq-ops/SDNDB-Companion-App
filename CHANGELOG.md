# Changelog

## 2.0.0 — Remaster

Everything from 1.13.2 still works the same way, and existing tables load unchanged.

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
