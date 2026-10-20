import { roll } from "../lib/dice.js";
import { benefitsOfPower, charTotalLevel, profBonusForLevel } from "./core.js";
import { computeArmorDR } from "./equipment.js";

/* ===== Taking damage and healing (book Ch.1, pp. 7, 9, 21–25) =====
   Pure functions: they take a creature's pools and return a patch, so the
   tracker, the sheet and the tests all share one set of rules.

   Order for one instance of damage:
     1. Destruction Damage "cannot be reduced by any means": skip 2–4.
     2. Damage Reduction, less any DR the attacker ignores (Physical Bonus).
     3. Resistance halves / Vulnerability doubles (after DR, per the book).
     4. A successful save for half, then Block halving.
   Then Temporary HP soaks first, the rest comes off HP, and a creature that was
   already at 0 HP (Unstable) gains two Death Save failures. */

const half = (n) => Math.floor(n / 2);

// DR from Armor, Conditions, Forms and Species is capped at Prof + 1 (p.7).
// Toughness DR from Benefits of Power isn't one of the capped sources.
function drCap(char) {
  return profBonusForLevel(charTotalLevel(char)) + 1;
}
function cappedArmorDR(char) {
  const raw = char.drOverride === true ? (char.dr || 0) : computeArmorDR(char);
  return Math.min(raw, drCap(char));
}
function totalDR(char) {
  const b = benefitsOfPower(char);
  return cappedArmorDR(char) + b.toughness + b.extra;
}
// DR an attacker's Attack-Action hits ignore: 1 per rank of Physical Bonus.
function drIgnoredBy(char) {
  return char ? benefitsOfPower(char).physical : 0;
}

// Work out how much of `amount` gets through, step by step, for the log.
function resolveDamage(amount, { dr = 0, ignoreDR = 0, destruction = false, resist = "none", saved = false, block = false, wildSense = false } = {}) {
  let dmg = Math.max(0, Math.floor(Number(amount) || 0));
  const steps = [];
  if (destruction) {
    steps.push("Destruction: can't be reduced");
    return { damage: dmg, steps };
  }
  const effDR = Math.max(0, dr - Math.max(0, ignoreDR));
  if (effDR > 0 && dmg > 0) { const cut = Math.min(dmg, effDR); dmg -= cut; steps.push(`−${cut} DR`); }
  if (resist === "resist") { const after = half(dmg); steps.push(`resisted −${dmg - after}`); dmg = after; }
  else if (resist === "vuln") { steps.push(`vulnerable +${dmg}`); dmg *= 2; }
  else if (resist === "immune") { steps.push("immune"); dmg = 0; }
  // Wild Sense: a successful save that would halve the damage takes none (p.24).
  if (saved && wildSense) { steps.push("Wild Sense"); return { damage: 0, steps }; }
  if (saved) { const after = half(dmg); steps.push(`saved −${dmg - after}`); dmg = after; }
  if (block) { const after = half(dmg); steps.push(`blocked −${dmg - after}`); dmg = after; }
  return { damage: dmg, steps };
}

// Bloodied ≤ 50%, Critical ≤ 25% of Max HP (p.13). DMs must announce both even
// when enemy HP is hidden, so these are shared with the whole table.
function healthState(hp, maxHp) {
  if (!maxHp) return null;
  if (hp <= 0) return "down";
  if (hp <= maxHp * 0.25) return "critical";
  if (hp <= maxHp * 0.5) return "bloodied";
  return null;
}
const HEALTH_LABEL = { down: "Down", critical: "Critical", bloodied: "Bloodied" };

// Apply already-resolved damage to a creature's pools. `pool` is "hp" or "ki"
// (Ki Damage, e.g. Impaled). Temporary points of that pool are spent first.
function damagePatch(target, damage, pool = "hp") {
  const temp = target.temp || { hp: 0, ki: 0, stamina: 0 };
  const cur = target[pool] || 0;
  const tempCur = temp[pool] || 0;
  const fromTemp = Math.min(tempCur, damage);
  const rest = damage - fromTemp;
  const next = Math.max(0, cur - rest);
  const patch = { [pool]: next };
  if (fromTemp > 0) patch.temp = { ...temp, [pool]: tempCur - fromTemp };
  // Taking damage while Unstable counts as two failed Death Saves (p.25).
  if (pool === "hp" && cur <= 0 && damage > 0 && !target.dead) {
    const ds = target.deathSaves || { success: 0, fail: 0 };
    const fail = Math.min(3, ds.fail + 2);
    patch.deathSaves = { ...ds, fail };
    patch.stable = false;
    if (fail >= 3) patch.dead = true;
  }
  return { patch, fromTemp, lost: cur - next };
}

// Healing: never above max. Regaining any HP resets Death Saves (p.25).
function healPatch(target, amount, pool = "hp") {
  // The dead don't heal; bringing someone back is its own step.
  if (target.dead && pool === "hp") return { patch: {}, gained: 0 };
  const max = target[pool === "hp" ? "maxHp" : pool === "ki" ? "maxKi" : "maxStamina"] || 0;
  const cur = target[pool] || 0;
  const next = Math.min(max, cur + Math.max(0, Math.floor(Number(amount) || 0)));
  const patch = { [pool]: next };
  if (pool === "hp" && next > 0 && cur <= 0) { patch.deathSaves = { success: 0, fail: 0 }; patch.stable = false; }
  return { patch, gained: next - cur };
}

// Spend a resource the way the book says: Temporary points first (p.9).
// Returns null when there isn't enough to pay.
function spendPatch(target, pool, amount) {
  const n = Math.max(0, Math.floor(Number(amount) || 0));
  const temp = target.temp || { hp: 0, ki: 0, stamina: 0 };
  const have = (target[pool] || 0) + (temp[pool] || 0);
  if (n > have) return null;
  const fromTemp = Math.min(temp[pool] || 0, n);
  const patch = { [pool]: (target[pool] || 0) - (n - fromTemp) };
  if (fromTemp > 0) patch.temp = { ...temp, [pool]: (temp[pool] || 0) - fromTemp };
  return patch;
}
// A new grant of Temporary points replaces the old amount; they don't stack (p.9).
function grantTempPatch(target, pool, amount) {
  const temp = target.temp || { hp: 0, ki: 0, stamina: 0 };
  return { temp: { ...temp, [pool]: Math.max(0, Math.floor(Number(amount) || 0)) } };
}

/* ===== Death Saving Throws (p.25) =====
   DC 10 flat d20 at the start of the turn. Three successes: Stable (still at
   0 HP). Three failures: dead. A natural 1 is two failures; a natural 20
   regains 1 HP. */
function deathSave(target, d20 = roll(20)) {
  const ds = target.deathSaves || { success: 0, fail: 0 };
  if (d20 === 20) return { d20, outcome: "revived", patch: { hp: 1, deathSaves: { success: 0, fail: 0 }, stable: false, dead: false } };
  if (d20 >= 10) {
    const success = ds.success + 1;
    if (success >= 3) return { d20, outcome: "stable", patch: { deathSaves: { success: 0, fail: 0 }, stable: true } };
    return { d20, outcome: "success", patch: { deathSaves: { ...ds, success } } };
  }
  const fail = Math.min(3, ds.fail + (d20 === 1 ? 2 : 1));
  if (fail >= 3) return { d20, outcome: "dead", patch: { deathSaves: { ...ds, fail }, dead: true } };
  return { d20, outcome: "fail", patch: { deathSaves: { ...ds, fail } } };
}

/* ===== Overload Destruction Damage (p.20) =====
   1 over: 2 · 2: 1d4 · 3: 1d6 · 4: 1d8 · 5: 1d10 · 6: 1d12 · 7+: 1d12 plus
   1d6 for each point above 6. */
const OVERLOAD_DIE = [null, 4, 6, 8, 10, 12];
function overloadDamage(over, rollFn = roll) {
  if (over <= 0) return 0;
  if (over === 1) return 2;
  if (over <= 6) return rollFn(OVERLOAD_DIE[over - 1]);
  let t = rollFn(12);
  for (let i = 0; i < over - 6; i++) t += rollFn(6);
  return t;
}

export {
  drCap,
  cappedArmorDR,
  totalDR,
  drIgnoredBy,
  resolveDamage,
  healthState,
  HEALTH_LABEL,
  damagePatch,
  healPatch,
  spendPatch,
  grantTempPatch,
  deathSave,
  overloadDamage,
};
