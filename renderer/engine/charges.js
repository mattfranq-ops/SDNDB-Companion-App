/* ===== Technique charges =====
   Some techniques (and homebrew moves) can only be used so many times before
   a reset: "twice per Long Rest", "once per encounter". A known technique can
   carry `charges: { max, used, reset }`; these pure helpers spend and refill
   them so the technique card, the Combat tab and the tracker agree. */

const CHARGE_RESETS = ["turn", "encounter", "short", "long", "manual"];
const CHARGE_RESET_LABEL = { turn: "per turn", encounter: "per encounter", short: "per Short Rest", long: "per Long Rest", manual: "manual reset" };

// What refills on each event. A rest also counts as the end of any encounter,
// and a Long Rest covers a Short Rest.
const RESETS_ON = {
  turn: ["turn"],
  encounter: ["turn", "encounter"],
  short: ["turn", "encounter", "short"],
  long: ["turn", "encounter", "short", "long"],
};

function chargeState(tech) {
  const c = tech && tech.charges;
  const max = Math.max(0, Math.floor(Number(c && c.max) || 0));
  if (!max) return null;
  const used = Math.min(max, Math.max(0, Math.floor(Number(c.used) || 0)));
  return { max, used, left: max - used, reset: CHARGE_RESETS.includes(c.reset) ? c.reset : "long" };
}

// Spend one charge of technique `uid`. Techniques without charges always
// succeed and are left alone; one with none left returns ok: false.
function spendCharge(techniques, uid) {
  const list = techniques || [];
  const t = list.find(k => k.uid === uid);
  const st = chargeState(t);
  if (!st) return { ok: true, techniques: list, left: null };
  if (st.left <= 0) return { ok: false, techniques: list, left: 0 };
  const next = list.map(k => k.uid === uid ? { ...k, charges: { ...k.charges, used: st.used + 1 } } : k);
  return { ok: true, techniques: next, left: st.left - 1 };
}

// Refill charges for a rest or a tracker event. Returns a sheet patch, or null
// when nothing changed.
function chargesResetPatch(char, kind) {
  const kinds = RESETS_ON[kind] || [];
  let changed = false;
  const techniques = (char.techniques || []).map(t => {
    const st = chargeState(t);
    if (!st || !st.used || !kinds.includes(st.reset)) return t;
    changed = true;
    return { ...t, charges: { ...t.charges, used: 0 } };
  });
  return changed ? { techniques } : null;
}

export {
  CHARGE_RESETS,
  CHARGE_RESET_LABEL,
  chargeState,
  spendCharge,
  chargesResetPatch,
};
