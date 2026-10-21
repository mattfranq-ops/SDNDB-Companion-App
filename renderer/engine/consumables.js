// Consumables and Restoratives (5.0 Ch.9, p.444): Hetap, Sage Water,
// Vitadrink, the Premium Bento Box and Senzu Beans. Using one rolls what it
// restores, applies it (never above the maximum), and uses up one.

// "2d6+4" with a roller; "full" refills the pool.
function rollAmount(expr, rng = Math.random) {
  const m = String(expr || "").replace(/\s+/g, "").match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!m) return { total: parseInt(expr, 10) || 0, rolls: [] };
  const rolls = Array.from({ length: +m[1] }, () => Math.floor(rng() * +m[2]) + 1);
  return { total: rolls.reduce((s, r) => s + r, 0) + (+m[3] || 0), rolls };
}

// Size variants share a family for "after the first per Long Rest" rules.
const consumableFamily = (item) => String(item.name || "").replace(/^(Lesser|Greater|Superior|Supreme) /, "");

const POOL = { hp: ["hp", "maxHp", "HP"], ki: ["ki", "maxKi", "Ki"], stamina: ["stamina", "maxStamina", "Stamina"] };

// { ok, reason } or { ok, patch, summary } for using one of an inventory item.
function consumeItem(char, item, rng = Math.random) {
  if (!item || !item.restore) return { ok: false, reason: "Not a consumable" };
  if ((item.qty || 1) < 1) return { ok: false, reason: "None left" };
  const fam = consumableFamily(item);
  const used = (char.consumablesUsed || {})[fam] || 0;
  if (item.oncePerLongRest && used >= 1) return { ok: false, reason: `Only one ${fam} per Long Rest` };
  const patch = {}; const parts = [];
  for (const [k, amt] of Object.entries(item.restore)) {
    if (!POOL[k]) continue;
    const [cur, max, label] = POOL[k];
    const cap = char[max] || 0;
    const before = char[cur] || 0;
    const gain = amt === "full" ? cap - before : rollAmount(amt, rng).total;
    patch[cur] = Math.min(cap, before + Math.max(0, gain));
    parts.push(`+${patch[cur] - before} ${label}`);
  }
  const vitals = { ...(char.vitals || {}) };
  let exh = vitals.exhaustion || 0;
  if (item.restore.exhaustion) { const healed = Math.min(exh, item.restore.exhaustion); exh -= healed; if (healed) parts.push(`−${healed} Exhaustion`); }
  if (item.exhaustionAfterFirst && used >= 1) { exh = Math.min(6, exh + item.exhaustionAfterFirst); parts.push(`+${item.exhaustionAfterFirst} Exhaustion`); }
  if (exh !== (vitals.exhaustion || 0)) patch.vitals = { ...vitals, exhaustion: exh };
  patch.consumablesUsed = { ...(char.consumablesUsed || {}), [fam]: used + 1 };
  const left = (item.qty || 1) - 1;
  patch.items = (char.items || []).flatMap(it => it.id !== item.id ? [it] : left > 0 ? [{ ...it, qty: left }] : []);
  return { ok: true, patch, summary: `${item.name}: ${parts.join(", ") || "no effect"}` };
}

export { rollAmount, consumableFamily, consumeItem };
