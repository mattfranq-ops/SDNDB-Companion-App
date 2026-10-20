import React, { useState, useEffect, useCallback } from "react";
import { weatherMatchesEntry } from "../engine/environment.js";
import { useRegistry } from "./registry.js";

/* ---------------------------------- storage hooks ---------------------------------- */
function useSharedList(key) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    let unsub = null;
    (async () => {
      try { const res = await window.storage.get(key, true); if (!cancelled) setItems(res ? JSON.parse(res.value) : []); }
      catch { if (!cancelled) setItems([]); }
      if (window.storage.subscribe) {
        unsub = window.storage.subscribe(key, true, (rawValue) => {
          try { setItems(JSON.parse(rawValue)); } catch {}
        });
      }
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, [key]);
  const persist = useCallback(async (next) => {
    setItems(next);
    try { const res = await window.storage.set(key, JSON.stringify(next), true); setError(res ? null : "Save failed — try again."); }
    catch { setError("Save failed — check your connection / room code."); }
  }, [key]);
  return [items, persist, error];
}

// Editable-book-data layer: edits to canonical book items (Feats, Techniques,
// Tables, etc.) are stored as overrides keyed by the item's id and synced to the
// whole table, merged over the base at render time — so rules changes never need
// a recompile. `map[id]` holds the full edited object; clearing resets to book.
function useOverrides(key) {
  const [list, persist] = useSharedList(key);
  const arr = list || [];
  const map = {};
  for (const o of arr) map[o.id] = o;
  const setOverride = (id, obj) => persist([...arr.filter(o => o.id !== id), { ...obj, id, edited: true }]);
  const clearOverride = (id) => persist(arr.filter(o => o.id !== id));
  return { map, setOverride, clearOverride, loading: list === null };
}
// Apply overrides to a base book array (base items keyed by id).
const applyOverrides = (base, map) => base.map(b => map[b.id] ? { ...b, ...map[b.id] } : b);
function usePersonalList(key) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try { const res = await window.storage.get(key, false); if (!cancelled) setItems(res ? JSON.parse(res.value) : []); }
      catch { if (!cancelled) setItems([]); }
    })();
    return () => { cancelled = true; };
  }, [key]);
  const persist = useCallback(async (next) => { setItems(next); try { await window.storage.set(key, JSON.stringify(next), false); } catch {} }, [key]);
  return [items, persist];
}

// Table-wide house rules ("Materoids Flavors" — deviant/optional content), one
// shared object synced to everyone in the room. Defaults applied on read so an
// unset key behaves like the book.
const HOUSE_RULE_DEFAULTS = {
  powerSystem: "kili",            // "kili" | "battlePower"
  attunementCapEnabled: false,    // false = book cap (2); true = use custom below
  attunementCap: 3,               // custom Attunement slot limit when unlocked
  gravityAcclimation: false,      // high-gravity homeworld auto-grants Lightweight ranks
  harshGalaxies: false,           // planet gravity/weather/star conditions go live in combat
  quickCombat: false,             // abstract skirmish/war resolver in the Session tab
  baseBuilding: false,            // player-faction home base + capital ship (its own tab)
  moreGoverning: false,           // governance/economy layer on the home world (needs baseBuilding)
};
// Module mirror of the live table rules so pure compute helpers (computeWeighted)
// can factor them in without threading the hook through every call site.
let CURRENT_HOUSE_RULES = HOUSE_RULE_DEFAULTS;
// Gravity (×g) of the world the party currently stands on, mirrored here while
// Harsh Galaxies is live so the pure Weighted math can read it. null = no world
// set / rule off. Kept fresh by useEnvGravitySync() mounted in App.
let CURRENT_ENV_GRAVITY = null;
// Effective Attunement slot cap for a table's house rules (book default is 2).
const attunementCapFor = (hr) => (hr && hr.attunementCapEnabled ? Math.max(0, hr.attunementCap ?? 2) : 2);
function useHouseRules() {
  const [hr, setHr] = useState(HOUSE_RULE_DEFAULTS);
  useEffect(() => {
    let cancelled = false, unsub = null;
    (async () => {
      try { const res = await window.storage.get("house_rules", true); if (!cancelled && res) setHr({ ...HOUSE_RULE_DEFAULTS, ...JSON.parse(res.value) }); }
      catch {}
      if (window.storage.subscribe) {
        unsub = window.storage.subscribe("house_rules", true, (raw) => { try { setHr({ ...HOUSE_RULE_DEFAULTS, ...JSON.parse(raw) }); } catch {} });
      }
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, []);
  const persist = useCallback(async (patch) => {
    const next = { ...HOUSE_RULE_DEFAULTS, ...hr, ...patch };
    setHr(next);
    try { await window.storage.set("house_rules", JSON.stringify(next), true); } catch {}
  }, [hr]);
  CURRENT_HOUSE_RULES = hr;   // keep the module mirror current for pure compute fns
  return [hr, persist];
}

// Keep CURRENT_ENV_GRAVITY mirrored to the party's current world so the Weighted
// math reflects gravity everywhere at once. Mounted app-wide in App(); returns
// the live world gravity (or null) for anyone that wants it.
function useEnvGravitySync() {
  const [houseRules] = useHouseRules();
  const [universe] = useSharedList("universe");
  const galaxy = universe && universe[0];
  let g = null;
  if (houseRules.harshGalaxies && galaxy && galaxy.currentPlanetId) {
    const p = (galaxy.systems || []).flatMap(s => s.planets || []).find(x => x.id === galaxy.currentPlanetId);
    if (p && p.gravity != null) g = p.gravity;
  }
  CURRENT_ENV_GRAVITY = g;
  return g;
}

// The active environmental effect hooks this session: the union of hooks from the
// current world's active hazards and its system's star traits. Mirrored so pure
// compute functions and rolls can read them. Kept fresh by useEnvHooksSync().
let CURRENT_ENV_HOOKS = [];
const envHooksOf = (type) => CURRENT_ENV_HOOKS.filter(h => h.type === type);
// Flat modifier for a roll kind; an "all d20" hook applies to every kind.
const envFlatMod = (kind) => envHooksOf("flatPenalty").filter(h => h.to === kind || h.to === "all d20").reduce((s, h) => s + (+h.amount || 0), 0);
const envKiCostMult = () => envHooksOf("kiField").filter(h => h.mode === "ki cost").reduce((m, h) => m * (+h.mult || 1), 1);
const envKiRegenMult = () => envHooksOf("kiField").filter(h => h.mode === "ki regen").reduce((m, h) => m * (+h.mult || 1), 1);
const envDmgPerTurn = () => envHooksOf("dmgPerTurn").map(h => h.formula || "1d4");
const envWeightedRanks = () => envHooksOf("weightedRanks").reduce((s, h) => s + (+h.ranks || 0), 0);
const envMoveMod = () => envHooksOf("movementMod").reduce((s, h) => s + (+h.feet || 0), 0);
// A human list of what's currently in effect, for the Environment banner.
const envEffectSummary = () => {
  const parts = [];
  const byTo = {};
  envHooksOf("flatPenalty").forEach(h => { byTo[h.to] = (byTo[h.to] || 0) + (+h.amount || 0); });
  Object.entries(byTo).forEach(([to, amt]) => { if (amt) parts.push(`${amt > 0 ? "+" : ""}${amt} ${to}`); });
  const kc = envKiCostMult(); if (kc !== 1) parts.push(`Ki cost x${kc}`);
  const kr = envKiRegenMult(); if (kr !== 1) parts.push(`Ki regen x${kr}`);
  const dmg = envDmgPerTurn(); if (dmg.length) parts.push(`${dmg.join(" + ")} per turn`);
  const mv = envMoveMod(); if (mv) parts.push(`${mv > 0 ? "+" : ""}${mv} ft speed`);
  const w = envWeightedRanks(); if (w) parts.push(`Weighted ${w > 0 ? `Light ${w}` : `Heavy ${-w}`}`);
  return parts;
};

// Gather the active environmental hooks (Harsh Galaxies only) from the current
// world's active hazards + its star traits, and mirror them for the appliers.
function useEnvHooksSync() {
  const [houseRules] = useHouseRules();
  const [universe] = useSharedList("universe");
  const [envState] = useSharedList("session_env");
  const hreg = useRegistry("hazards");
  const sreg = useRegistry("startraits");
  const wreg = useRegistry("weather");
  const hooks = [];
  if (houseRules.harshGalaxies) {
    const galaxy = universe && universe[0];
    const loc = galaxy && galaxy.currentPlanetId
      ? (galaxy.systems || []).map(s => ({ s, p: (s.planets || []).find(p => p.id === galaxy.currentPlanetId) })).find(x => x.p)
      : null;
    const env = (envState && envState[0]) || { active: {} };
    const active = env.active || {};
    const curWeather = loc ? loc.p.weather : null;
    if (!hreg.loading) {
      for (const e of hreg.entries.filter(x => x.enabled)) {
        const on = weatherMatchesEntry(curWeather, e.weatherMatch) || active[e._id];
        if (on) for (const h of ((e.effect && e.effect.hooks) || [])) hooks.push(h);
      }
    }
    if (loc && !sreg.loading) {
      for (const n of ((loc.s.star && loc.s.star.traits) || [])) {
        const e = sreg.entries.find(x => x._id === n && x.enabled);
        if (e) for (const h of ((e.effect && e.effect.hooks) || [])) hooks.push(h);
      }
    }
    // The current world's weather can carry its own effect hooks now.
    if (curWeather && !wreg.loading) {
      const we = wreg.entries.find(x => x.enabled && x._name === curWeather);
      if (we) for (const h of ((we.effect && we.effect.hooks) || [])) hooks.push(h);
    }
  }
  CURRENT_ENV_HOOKS = hooks;
  return hooks;
}

export {
  useSharedList,
  useOverrides,
  applyOverrides,
  usePersonalList,
  HOUSE_RULE_DEFAULTS,
  CURRENT_HOUSE_RULES,
  CURRENT_ENV_GRAVITY,
  attunementCapFor,
  useHouseRules,
  useEnvGravitySync,
  CURRENT_ENV_HOOKS,
  envHooksOf,
  envFlatMod,
  envKiCostMult,
  envKiRegenMult,
  envDmgPerTurn,
  envWeightedRanks,
  envMoveMod,
  envEffectSummary,
  useEnvHooksSync,
};
