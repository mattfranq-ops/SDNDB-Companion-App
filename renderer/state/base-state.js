import { baseBonuses } from "../engine/base.js";
import { useHouseRules, useSharedList } from "./hooks.js";

// The party base (shared doc "party_base") filled out with defaults.
function normalizeBase(raw) {
  raw = raw || {};
  return {
    ...raw,
    factionName: raw.factionName || "",
    partyAt: raw.partyAt || "away",
    resources: { zeni: 0, loot: 0, ...(raw.resources || {}) },
    home: { facilities: [], maxSi: 80, maxShields: 40, hardness: 5, ...(raw.home || (raw.facilities ? { facilities: raw.facilities } : {})) },
    ship: { name: "", facilities: [], maxSi: 50, maxShields: 30, hardness: 5, ...(raw.ship || {}) },
  };
}

// The base, what it gives the party right now, and a saver. Bonuses are empty
// unless the Base Building house rule is on.
function useBase() {
  const [list, persist] = useSharedList("party_base");
  const [hr] = useHouseRules();
  const base = normalizeBase(list && list[0]);
  const bonuses = baseBonuses(base, { enabled: !!hr.baseBuilding });
  const save = (patch) => persist([{ ...base, ...patch }]);
  return { base, bonuses, save, enabled: !!hr.baseBuilding, loading: list === null };
}

const PARTY_AT = [["home", "Home World"], ["ship", "Capital Ship"], ["away", "Away"]];

export { normalizeBase, useBase, PARTY_AT };
