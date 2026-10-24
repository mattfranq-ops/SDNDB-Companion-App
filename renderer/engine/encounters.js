// Random encounters from the Roster of FighterZ.
// The 5.0 book has no encounter budget, so this is the app's guideline: each
// player is worth one General of the party's tier, an Elite counts as two and
// an Iconic as four, and difficulty scales the total. Antagonist Levels run
// 1–10, so the party's tier is half its average level.
import { charTotalLevel } from "./core.js";

const ENCOUNTER_DIFFICULTIES = [
  { key: "easy", label: "Easy", mult: 0.5 },
  { key: "standard", label: "Standard", mult: 1 },
  { key: "hard", label: "Hard", mult: 1.5 },
  { key: "deadly", label: "Deadly", mult: 2 },
];
const TIER_WEIGHT = { General: 1, Elite: 2, Iconic: 4 };
const MAX_BODIES = 8;

const partyTier = (avgLevel) => Math.max(1, Math.min(10, Math.round((avgLevel || 1) / 2)));

// What one fighter costs against the budget: its tier weight, a quarter more
// or less for each Antagonist Level above or below the party's tier.
function threatCost(b, tier) {
  const w = TIER_WEIGHT[b.tier] || 1;
  return Math.max(0.25, w * (1 + 0.25 * ((b.antagonistLevel || 1) - tier)));
}

function partySummary(chars) {
  const list = (chars || []).filter(c => !c.archived && !c.dead);
  if (!list.length) return { size: 4, avgLevel: 1 };
  const avg = list.reduce((s, c) => s + charTotalLevel(c), 0) / list.length;
  return { size: list.length, avgLevel: Math.round(avg) };
}

// Fighters within `spread` levels of the tier, widening until some are found.
function nearTier(pool, tier) {
  for (let spread = 1; spread <= 9; spread++) {
    const near = pool.filter(b => Math.abs((b.antagonistLevel || 1) - tier) <= spread);
    if (near.length) return near;
  }
  return pool;
}

const pickFrom = (arr, rng) => arr[Math.floor(rng() * arr.length)];

/* Roll an encounter.
   opts: { size, avgLevel, difficulty, saga?, group? }
   Returns { tier, budget, spent, picks: [{ book, qty }] } — picks is empty
   when nothing in the roster matches the filters. */
function rollEncounter(roster, opts = {}, rng = Math.random) {
  const size = Math.max(1, opts.size || 4);
  const tier = partyTier(opts.avgLevel);
  const diff = ENCOUNTER_DIFFICULTIES.find(d => d.key === opts.difficulty) || ENCOUNTER_DIFFICULTIES[1];
  const budget = size * diff.mult;
  let pool = (roster || []).filter(b => (!opts.saga || b.saga === opts.saga) && (!opts.group || b.group === opts.group));
  if (!pool.length) return { tier, budget, spent: 0, picks: [] };
  pool = nearTier(pool, tier);

  const counts = new Map();
  let spent = 0, bodies = 0;
  const add = (b) => { counts.set(b, (counts.get(b) || 0) + 1); spent += threatCost(b, tier); bodies++; };
  const fits = (b) => spent + threatCost(b, tier) <= budget + 1e-9;

  // Hard and Deadly fights get a leader: the strongest tier that fits.
  let leader = null;
  if (diff.mult >= 1.5) {
    for (const t of ["Iconic", "Elite"]) {
      const options = pool.filter(b => b.tier === t && fits(b));
      if (options.length) { leader = pickFrom(options, rng); add(leader); break; }
    }
  }
  // Fill with Generals from the leader's group, then its saga, then anyone.
  const generals = pool.filter(b => b.tier === "General");
  const kin = leader ? generals.filter(b => b.group === leader.group) : [];
  const saga = leader ? generals.filter(b => b.saga === leader.saga) : [];
  const first = !leader && generals.length ? pickFrom(generals, rng) : null;
  const sameCrew = first ? generals.filter(b => b.group === first.group) : [];
  const fill = [kin, saga, sameCrew, generals].find(l => l.some(fits)) || [];
  if (first && fits(first)) add(first);
  while (bodies < MAX_BODIES) {
    const options = fill.filter(fits);
    if (!options.length) break;
    add(pickFrom(options, rng));
  }
  // Nothing fit (a tiny budget): send the cheapest single fighter.
  if (!bodies) add([...pool].sort((a, b) => threatCost(a, tier) - threatCost(b, tier))[0]);

  const picks = [...counts].map(([book, qty]) => ({ book, qty }))
    .sort((a, b) => (TIER_WEIGHT[b.book.tier] || 1) - (TIER_WEIGHT[a.book.tier] || 1));
  return { tier, budget, spent: Math.round(spent * 100) / 100, picks };
}

export {
  ENCOUNTER_DIFFICULTIES,
  TIER_WEIGHT,
  partyTier,
  partySummary,
  threatCost,
  rollEncounter,
};
