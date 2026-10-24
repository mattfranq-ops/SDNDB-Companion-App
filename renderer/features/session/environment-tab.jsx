import React from "react";
import { Clock, MapPin } from "lucide-react";
import { gravityBand } from "../../engine/universe.js";
import { useHouseRules, useSharedList } from "../../state/hooks.js";
import { useRegistry } from "../../state/registry.js";
import { LoadingBlock, Select } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { EnvironmentBanner, HazardsPanel } from "./environment.jsx";
import { readTime, timeLabel } from "./time.jsx";

// Tracks the world the party is standing on. Setting it here (or in the Universe
// tab) is what makes the environment go live: gravity and weather flow straight
// into play. Also surfaces the Harsh Galaxies toggle so it's one click away.
function CurrentPlanetPicker() {
  const [universe, persist] = useSharedList("universe");
  const [houseRules, persistHR] = useHouseRules();
  if (universe === null) return <LoadingBlock />;
  const galaxy = universe && universe[0];
  const systems = (galaxy && galaxy.systems) || [];
  const planets = systems.flatMap(s => (s.planets || []));
  const live = houseRules.harshGalaxies;
  const setPlanet = (id) => { if (!galaxy) return; persist([{ ...galaxy, currentPlanetId: id || null }]); };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <MapPin size={14} color={COLORS.gold} />
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Current Planet</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => persistHR({ harshGalaxies: !live })} title="Whether gravity and weather actually affect the party" style={{ cursor: "pointer", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "4px 12px", border: `1px solid ${live ? COLORS.gold : COLORS.border}`, background: live ? `${COLORS.gold}1A` : "transparent", color: live ? COLORS.gold : COLORS.muted }}>
          {live ? "Effects live" : "Flavor only"}
        </button>
      </div>
      {planets.length ? (
        <Select value={(galaxy && galaxy.currentPlanetId) || ""} onChange={e => setPlanet(e.target.value)} style={{ width: "100%" }}>
          <option value="">Not set — pick where the party is</option>
          {systems.map(s => (
            <optgroup key={s.id || s.name} label={(s.name || "").replace(/ System$/, "") + " System"}>
              {(s.planets || []).map(p => <option key={p.id} value={p.id}>{p.name}{p.gravity != null ? ` · ${p.gravity}g ${gravityBand(p.gravity)}` : ""}{p.weather ? ` · ${p.weather}` : ""}</option>)}
            </optgroup>
          ))}
        </Select>
      ) : (
        <div style={{ fontSize: 11.5, color: COLORS.dim }}>No worlds yet. Generate a galaxy in the <b style={{ color: COLORS.gold }}>Universe</b> tab, then pick the party's location here.</div>
      )}
    </div>
  );
}

// Environment sub-tab: the world state in one place. Current planet, the time of
// day, the preset terrain, and the auto-derived environmental conditions.
function EnvironmentTab() {
  const [envState, persistEnv] = useSharedList("session_env");
  const [timeState] = useSharedList("session_time");
  const treg = useRegistry("terrains");
  if (envState === null || treg.loading) return <LoadingBlock />;
  const env = (envState && envState[0]) || { active: {}, hours: 0, terrain: "" };
  const t = readTime(timeState);
  // Terrains come from the registry so disabled ones drop out and customs appear.
  const terrains = treg.entries.filter(e => e.enabled);
  const terrain = terrains.find(tp => tp._id === env.terrain);
  return (
    <div>
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Clock size={14} color={COLORS.gold} />
        <span style={{ fontSize: 13 }}>{timeLabel(t)}</span>
      </div>
      <CurrentPlanetPicker />
      <EnvironmentBanner />
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Terrain</div>
        <Select value={env.terrain || ""} onChange={e => persistEnv([{ ...env, terrain: e.target.value }])} style={{ width: "100%" }}>
          <option value="">Pick a terrain…</option>
          {terrains.map(tp => <option key={tp._id} value={tp._id}>{tp._name}</option>)}
        </Select>
        {terrain && <div style={{ fontSize: 11.5, color: COLORS.dim, marginTop: 6 }}>{terrain._desc}</div>}
      </div>
      <HazardsPanel />
    </div>
  );
}

export {
  CurrentPlanetPicker,
  EnvironmentTab,
};
