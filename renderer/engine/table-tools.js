// GM table tools: countdown clocks and the yes/no oracle.

/* A clock is a pool of dice that counts down to an event (the guards change
   shift, the lab self-destructs). When its trigger happens the GM rolls the
   pool; every die that shows `dropOn` or lower is removed (0 means the GM
   removes dice by hand). The event fires when the pool is empty. */
function blankClock(id) {
  return { id, title: "", description: "", event: "", trigger: "", dice: 6, die: 6, dropOn: 1, remaining: 6, faces: [] };
}

function rollClock(clock, rng = Math.random) {
  const n = Math.max(0, clock.remaining || 0);
  const faces = Array.from({ length: n }, () => 1 + Math.floor(rng() * (clock.die || 6)));
  const kept = clock.dropOn > 0 ? faces.filter(f => f > clock.dropOn) : faces;
  return { faces: kept, dropped: n - kept.length, remaining: kept.length, done: kept.length === 0 && n > 0 };
}

// Remove one die by hand (tap it), or add one back.
const dropDie = (clock, index) => {
  const faces = (clock.faces || []).filter((_, i) => i !== index);
  return { faces, remaining: Math.max(0, (clock.remaining || 0) - 1) };
};
const addDie = (clock) => ({ remaining: (clock.remaining || 0) + 1, faces: [] });

/* Oracle: ask a yes/no question and pick how likely "yes" is. A d100 at or
   under the chance is a yes. The best fifth of a yes is "Yes, and…", the
   worst fifth of a no is "No, and…". */
const ORACLE_ODDS = [
  { key: "certain", label: "Almost certain", chance: 90 },
  { key: "likely", label: "Likely", chance: 75 },
  { key: "even", label: "50/50", chance: 50 },
  { key: "unlikely", label: "Unlikely", chance: 25 },
  { key: "impossible", label: "Almost impossible", chance: 10 },
];

function askOracle(oddsKey, rng = Math.random) {
  const odds = ORACLE_ODDS.find(o => o.key === oddsKey) || ORACLE_ODDS[2];
  const d100 = 1 + Math.floor(rng() * 100);
  const yes = d100 <= odds.chance;
  const strong = yes ? d100 <= Math.ceil(odds.chance / 5) : d100 > 100 - Math.ceil((100 - odds.chance) / 5);
  const answer = yes ? (strong ? "Yes, and…" : "Yes") : (strong ? "No, and…" : "No");
  return { d100, chance: odds.chance, yes, strong, answer };
}

export {
  blankClock,
  rollClock,
  dropDie,
  addDie,
  ORACLE_ODDS,
  askOracle,
};
