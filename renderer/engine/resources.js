import { CLASS_RESOURCES } from "../data/class-resource-data.js";
import { uid } from "../lib/dice.js";
import { charClasses, charTotalLevel, computeKiRank, profBonusForLevel } from "./core.js";

/* ===== Class-granted resources (auto-provision, see class-resource-data.js) ===== */
// Pick the value for a byLevel map: the highest keyed level <= the class level.
function resolveByLevel(map, classLevel) {
  let val;
  for (const k of Object.keys(map).map(Number).sort((a, b) => a - b)) {
    if (k <= classLevel) val = map[k];
  }
  return val;
}
// A resource's max can be a plain int, a formula string, or a byLevel table.
function resolveResourceMax(def, char, classLevel) {
  const m = def.max;
  if (m && typeof m === "object") return resolveByLevel(m.byLevel || {}, classLevel) ?? 0;
  if (m === "prof") return profBonusForLevel(charTotalLevel(char));
  if (m === "profHalf") return Math.ceil(profBonusForLevel(charTotalLevel(char)) / 2);
  if (m === "profThird") return Math.ceil(profBonusForLevel(charTotalLevel(char)) / 3);
  if (m === "kirank") return computeKiRank(char);
  if (m === "classLevelX5") return (classLevel || 1) * 5; // pool scales with THIS class's level
  return Number(m) || 0;
}
function resolveResourceDie(def, classLevel) {
  const d = def.die;
  if (d && typeof d === "object") return resolveByLevel(d.byLevel || {}, classLevel) || "";
  return d || "";
}
// Every class-granted resource the character currently qualifies for, resolved to
// concrete numbers for their class level. Keyed by def.key so reconcile can match.
function classGrantedResources(char) {
  const out = [];
  for (const c of charClasses(char)) {
    for (const def of CLASS_RESOURCES) {
      if (def.class !== c.classId || (c.level || 1) < def.level) continue;
      out.push({
        key: def.key, source: "class", name: def.name,
        die: resolveResourceDie(def, c.level || 1),
        max: resolveResourceMax(def, char, c.level || 1),
        reset: def.reset, regen: def.regen || "", note: def.note || "", feature: def.feature,
      });
    }
  }
  return out;
}
// Reconcile char.resources[] against class grants: keep player-made ("custom")
// resources untouched; add newly granted class pools (current = max); update the
// max/die of existing class pools on level-up (preserving current, re-clamped);
// drop class pools the character no longer qualifies for. Returns the new array,
// or null if nothing changed (so callers can skip the write).
function reconcileResources(char) {
  const existing = char.resources || [];
  const custom = existing.filter(r => r.source !== "class");
  const granted = classGrantedResources(char);
  const byKey = Object.fromEntries(existing.filter(r => r.source === "class").map(r => [r.key, r]));
  const nextClass = granted.map(g => {
    const prev = byKey[g.key];
    if (!prev) return { id: uid(), current: g.max, ...g };
    return { ...prev, ...g, current: Math.min(prev.current ?? g.max, g.max) };
  });
  const next = [...custom, ...nextClass];
  const same = next.length === existing.length && next.every((r, i) => {
    const e = existing[i];
    return e && r.key === e.key && r.current === e.current && r.max === e.max && r.die === e.die && r.reset === e.reset;
  });
  return same ? null : next;
}
// Refill resources on rest, mirroring magicRestPatch. Short: reset "short" to full,
// "shortHalfLongFull" regains half. Long: everything rest-based tops off. turn/
// encounter/manual are left for the player (no auto-trigger until Sessions exist).
function resourceRestPatch(char, kind) {
  const list = char.resources || [];
  if (!list.length) return null;
  const next = list.map(r => {
    if (kind === "long") return { ...r, current: r.max }; // a full rest tops off every pool
    if (kind === "short" && r.reset === "short") return { ...r, current: r.max };
    if (kind === "short" && r.reset === "shortHalfLongFull") return { ...r, current: Math.min(r.max, (r.current || 0) + Math.ceil(r.max / 2)) };
    return r;
  });
  return { resources: next };
}

export {
  resolveByLevel,
  resolveResourceMax,
  resolveResourceDie,
  classGrantedResources,
  reconcileResources,
  resourceRestPatch,
};
