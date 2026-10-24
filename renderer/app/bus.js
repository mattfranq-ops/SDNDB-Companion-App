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
function emitRoll(payload) {
  _rollBannerSubs.forEach(fn => { try { fn(payload); } catch { /* ignore */ } });
  if (payload && payload.share) shareRoll(payload);
}

/* ===== Shared roll log — rolls made on a sheet also land in the table's
   Session → Rolls log (key "session_rolls"), so the DM sees every roll the way
   the Cyberpunk RED Companion's online session does. A device can roll
   privately: those entries are shown only in DM view and on the device that
   rolled them. ===== */
const DEVICE_KEY = "sdndbz_device_v1";
const ROLL_PRIVATE_KEY = "sdndbz_roll_private_v1";
function deviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) { id = uid(); localStorage.setItem(DEVICE_KEY, id); }
    return id;
  } catch { return "local"; }
}
function rollsPrivate() { try { return localStorage.getItem(ROLL_PRIVATE_KEY) === "1"; } catch { return false; } }
function setRollsPrivate(on) { try { localStorage.setItem(ROLL_PRIVATE_KEY, on ? "1" : "0"); } catch { /* ignore */ } }
async function shareRoll({ label, total, detail, who }) {
  try {
    let list = [];
    try { const r = await window.storage.get("session_rolls", true); list = JSON.parse(r.value) || []; } catch { /* first roll */ }
    const entry = { id: uid(), time: Date.now(), kind: "sheet", label: label || "", total: total ?? "", detail: detail || "", who: who || "", private: rollsPrivate(), device: deviceId() };
    await window.storage.set("session_rolls", JSON.stringify([entry, ...list].slice(0, 80)), true);
  } catch { /* not at a table */ }
}

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
/* ===== Undo — an action that changes shared docs can be taken back for a few
   seconds. undoable() snapshots the docs, runs the action, and UndoHost
   (mounted once by App) offers an Undo button that writes the snapshot back. */
const _undoSubs = new Set();
function onUndo(fn) { _undoSubs.add(fn); return () => _undoSubs.delete(fn); }
async function undoable(label, keys, action) {
  const before = {};
  for (const k of keys) {
    try { const r = await window.storage.get(k, true); before[k] = r.value; } catch { before[k] = null; }
  }
  const out = await action();
  if (out && out.ok === false) return out;
  const restore = async () => {
    for (const k of keys) {
      if (before[k] == null) await window.storage.delete(k, true).catch(() => {});
      else await window.storage.set(k, before[k], true);
    }
  };
  _undoSubs.forEach(fn => { try { fn({ label, restore }); } catch { /* ignore */ } });
  return out;
}

// A short in-app notice in the same spot (no Undo button), instead of alert().
function notify(label) { _undoSubs.forEach(fn => { try { fn({ label }); } catch { /* ignore */ } }); }

async function logSession(text, who = "") {
  try {
    let list = [];
    try { const r = await window.storage.get("session_feed", true); list = JSON.parse(r.value) || []; } catch { /* first entry */ }
    list = [{ id: uid(), time: Date.now(), who, text }, ...list].slice(0, 60);
    await window.storage.set("session_feed", JSON.stringify(list), true);
  } catch { /* not in a room / offline */ }
}

export {
  onUndo,
  undoable,
  notify,
  NAV,
  _rollBannerSubs,
  emitRoll,
  deviceId,
  rollsPrivate,
  setRollsPrivate,
  _navSubs,
  _pendingNav,
  emitNav,
  onNav,
  clearPendingNav,
  logSession,
};
