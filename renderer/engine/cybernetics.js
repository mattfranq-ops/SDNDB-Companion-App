import { HIGH_TECH_PARTS } from "../data/hightech-data.js";
import { statMod } from "./core.js";

/* ===== Cybernetics — High-Tech Parts (see hightech-data.js) ===== */
// Installed Parts live on char.cybernetics = [{ uid, partId, signature }]. `signature`
// marks the free species/heritage Signature Upgrade (doesn't count against the Limit).
const installedParts = (char) => (char.cybernetics || []).map(c => ({ ...c, def: HIGH_TECH_PARTS.find(p => p.id === c.partId) })).filter(c => c.def);
const hasCybernetic = (char, partId) => (char.cybernetics || []).some(c => c.partId === partId);
// Cybernetic Limit (book): half of (CON mod + WIS mod), floored at 0. Signature
// Upgrades don't count, so they aren't included in the "used" tally below.
const cyberneticLimit = (char) => Math.max(0, Math.floor((statMod(char, "con") + statMod(char, "wis")) / 2));
const cyberneticsUsed = (char) => (char.cybernetics || []).filter(c => !c.signature).length;
// Androids take no negatives and treat every Part as Advanced; the Cyborg heritage
// also takes no negatives. A manual flag (cyberneticsNoPenalty) covers other cases.
const isAndroidBody = (char) => (char.species || "").toLowerCase() === "android";
const cyberneticsExempt = (char) => isAndroidBody(char) || /cyborg/i.test(char.heritage || "") || !!char.cyberneticsNoPenalty;
const partIsAdvanced = (char) => isAndroidBody(char) || !!char.cyberneticsAdvanced;
// −2 to Ki Control (and Berserk saves) per attuned Part, waived for exempt bodies.
const cyberneticKiControlPenalty = (char) => cyberneticsExempt(char) ? 0 : (char.cybernetics || []).length * 2;

export {
  installedParts,
  hasCybernetic,
  cyberneticLimit,
  cyberneticsUsed,
  isAndroidBody,
  cyberneticsExempt,
  partIsAdvanced,
  cyberneticKiControlPenalty,
};
