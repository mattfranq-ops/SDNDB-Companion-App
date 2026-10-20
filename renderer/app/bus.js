import { Building2, Globe2, Orbit, UserSquare2, Users, Wrench } from "lucide-react";
import { uid } from "../lib/dice.js";

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
// Sheets consume a pending hand-off once they've read it.
function clearPendingNav(entityId) { if (_pendingNav && _pendingNav.entityId === entityId) _pendingNav = null; }

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

export {
  NAV,
  _rollBannerSubs,
  emitRoll,
  _navSubs,
  _pendingNav,
  emitNav,
  onNav,
  clearPendingNav,
  logSession,
};
