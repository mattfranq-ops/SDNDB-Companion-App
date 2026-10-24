const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const roll = (die) => Math.floor(Math.random() * die) + 1;
// A d20 with optional Advantage / Disadvantage (roll twice, keep the higher or
// lower). Returns the kept die plus both rolls for display.
function rollD20(mode) {
  const a = roll(20);
  if (mode === "adv" || mode === "dis") {
    const b = roll(20);
    return { die: mode === "adv" ? Math.max(a, b) : Math.min(a, b), rolls: [a, b], mode };
  }
  return { die: a, rolls: [a], mode: "normal" };
}
const rollModeLabel = (m) => m === "adv" ? "Advantage" : m === "dis" ? "Disadvantage" : "";
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export {
  uid,
  roll,
  rollD20,
  rollModeLabel,
  pick,
};
