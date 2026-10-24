import { logSession, undoable } from "../../app/bus.js";
import { HEALTH_LABEL, damagePatch, healPatch, healthState, resolveDamage, totalDR } from "../../engine/damage.js";
import { defaultRounds, findCondition } from "../../engine/conditions.js";
import { addInjuriesPatch, injuryLine, rollCritInjury, rollLingeringInjury } from "../../engine/injuries.js";

/* ===== Apply a hit or a heal to someone in the initiative tracker =====
   Used from the tracker rows and from a sheet's roll log (after a targeted
   attack). Reads the live docs, applies the rules from engine/damage.js to the
   linked sheet (the source of truth) or to the bare tracker row, writes back,
   and posts one line to the shared Session feed.

   Enemy HP is never written to the feed; Bloodied / Critical / Down are,
   because the book says the DM must announce them. */

const SOURCE_KEY = { player: "characters_v2", npc: "npcs_v2" };
// Fields a hit can change; mirrored onto the tracker row so unlinked and
// linked rows read the same way.
const MIRROR = ["hp", "ki", "temp", "deathSaves", "dead", "stable", "injuries"];

async function readDoc(key) {
  try { const r = await window.storage.get(key, true); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function writeDoc(key, value) {
  await window.storage.set(key, JSON.stringify(value), true);
}

// Hit locations only narrow a player's worn DR; NPCs and bare rows keep one DR.
function targetDR(type, src, row, location) {
  if (type === "player" && src) return totalDR(src, location || "any");
  if (src) return src.dr || 0;
  return row.dr || 0;
}

// opts: { kind: "damage" | "heal", amount, pool: "hp" | "ki", destruction,
//         resist: "none" | "resist" | "vuln" | "immune", saved, block,
//         ignoreDR, location (hit location key, default "any"), crit,
//         by (attacker name), what (move name) }
// A Critical Hit that does HP damage rolls a Crit Injury where it landed
// (house rule `critInjuries`, on by default).
// Every hit or heal can be undone for a few seconds (see undoable in bus.js).
async function applyToCombatant(combatantId, opts) {
  const doc0 = await readDoc("session_combat");
  const row0 = doc0 && doc0[0] && (doc0[0].combatants || []).find(c => c.id === combatantId);
  const keys = ["session_combat", "session_feed", ...(row0 && row0.sourceId && SOURCE_KEY[row0.sourceType] ? [SOURCE_KEY[row0.sourceType]] : []),
    ...(row0 && row0.vehicleOwnerId ? ["characters_v2"] : [])];
  const label = row0 ? `${opts.kind === "heal" ? "Healed" : "Hit"} ${row0.name}` : "Change";
  return undoable(label, keys, () => applyNow(combatantId, opts));
}

async function applyNow(combatantId, opts) {
  const doc = await readDoc("session_combat");
  const data = doc && doc[0];
  const row = data && (data.combatants || []).find(c => c.id === combatantId);
  if (!row) return { ok: false, reason: "That fighter isn't in the tracker any more." };

  const type = row.sourceType;
  const key = row.sourceId ? SOURCE_KEY[type] : null;
  const list = key ? (await readDoc(key)) || [] : null;
  const src = list ? list.find(e => e.id === row.sourceId) : null;
  const target = src || row;
  const pool = opts.pool || "hp";

  let patch, amount, steps = [];
  if (opts.kind === "heal" && pool === "hp" && target.dead) return { ok: false, reason: `${row.name} is dead. Revive them first.` };
  if (opts.kind === "heal") {
    const r = healPatch(target, opts.amount, pool);
    patch = r.patch; amount = r.gained;
  } else {
    const r = resolveDamage(opts.amount, {
      dr: pool === "hp" ? targetDR(type, src, row, opts.location) : 0,
      ignoreDR: opts.ignoreDR || 0, destruction: !!opts.destruction,
      resist: opts.resist || "none", saved: !!opts.saved,
      block: opts.block != null ? !!opts.block : !!target.blocking, wildSense: !!target.wildSense,
    });
    const d = damagePatch(target, r.damage, pool);
    patch = d.patch; amount = r.damage; steps = r.steps;
    if (opts.location && opts.location !== "any") steps.unshift(`hit ${opts.location}`);
    if (d.fromTemp > 0) steps.push(`${d.fromTemp} to Temp`);
    if (d.patch.deathSaves) steps.push(d.patch.dead ? "third Death Save failure" : "+2 Death Save failures");
  }

  let injury = null, rowConditions = null;
  if (opts.kind !== "heal" && opts.crit && pool === "hp" && amount > 0) {
    const hr = { critInjuries: true, ...((await readDoc("house_rules")) || {}) };
    if (hr.critInjuries) injury = rollCritInjury({ location: opts.location || "any", rows: hr.critInjuryRows || undefined, rng: opts.rng });
    if (injury) {
      Object.assign(patch, addInjuriesPatch(target, [injury]));
      steps.push(`Crit Injury: ${injuryLine(injury)}`);
      if (injury.adds) rowConditions = conditionEntries(injury.adds, injury.rounds);
    }
  }

  if (src) await writeDoc(key, list.map(e => e.id === src.id ? { ...e, ...patch } : e));
  const mirror = Object.fromEntries(MIRROR.filter(k => k in patch).map(k => [k, patch[k]]));
  await writeDoc("session_combat", [{ ...data, combatants: data.combatants.map(c => c.id === row.id ? { ...c, ...mirror, ...(rowConditions ? { conditions: [...(c.conditions || []), ...rowConditions] } : {}) } : c) }]);

  const after = { ...target, ...patch };
  // A deployed vehicle keeps its HP on the owner's item (the Garage reads it).
  if (type === "vehicle" && row.vehicleOwnerId && "hp" in patch) {
    const chars = (await readDoc("characters_v2")) || [];
    await writeDoc("characters_v2", chars.map(c => c.id !== row.vehicleOwnerId ? c : { ...c,
      items: (c.items || []).map(i => i.id === row.vehicleItemId ? { ...i, vehicle: { ...(i.vehicle || {}), hp: Math.max(0, after.hp) } } : i) }));
  }
  const state = pool === "hp" ? healthState(after.hp, after.maxHp) : null;
  const shown = type === "player" ? ` (${after[pool]}/${after[pool === "hp" ? "maxHp" : "maxKi"]})` : "";
  const unit = pool === "ki" ? " Ki" : "";
  const verb = opts.kind === "heal" ? `heals ${amount}${unit}` : `takes ${amount}${pool === "ki" ? " Ki" : ""} damage`;
  const lead = opts.by ? `${opts.by}${opts.what ? `'s ${opts.what}` : ""} → ` : "";
  const tail = [steps.length ? steps.join(", ") : "", state ? HEALTH_LABEL[state] : "", after.dead && !target.dead ? "DEAD" : ""].filter(Boolean).join(" · ");
  logSession(`${lead}${row.name} ${verb}${shown}${tail ? ` · ${tail}` : ""}`, opts.by || row.name);

  return { ok: true, kind: opts.kind, amount, steps, state, name: row.name, injury };
}

// Tracker condition entries for the conditions an injury inflicts.
function conditionEntries(names, rounds) {
  return names.map(n => { const def = findCondition(n); return { text: def ? def.name : n, rounds: rounds ?? defaultRounds(def) }; });
}

// Crippled: one Lingering Injury per rank gained, placed on the body.
function crippledInjuries(ranks = 1, location = "any", rng = Math.random) {
  return Array.from({ length: Math.max(1, ranks) }, () => rollLingeringInjury({ location, rng }));
}

export { applyToCombatant, conditionEntries, crippledInjuries };
