import React from "react";
import { Check, ChevronDown, ChevronUp, Dices, Flame, MapPin, Weight, X, Zap } from "lucide-react";
import { useLocalOption } from "../../app/App.jsx";
import { logSession } from "../../app/bus.js";
import { normHazard, weatherMatchesEntry } from "../../engine/environment.js";
import { computeSaveBonus } from "../../engine/skills.js";
import { envGravityEffect, gravityBand, gravityColor } from "../../engine/universe.js";
import { roll } from "../../lib/dice.js";
import { envEffectSummary, envFlatMod, useHouseRules, useSharedList } from "../../state/hooks.js";
import { hookSummary, hookType, useRegistry } from "../../state/registry.js";
import { Btn, Select, Tag } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

// The party's current Universe planet, surfaced during play (Slice 2c). Shows
// gravity, weather and star conditions so the environment is present in the fight.
function EnvironmentBanner() {
  const [universe] = useSharedList("universe");
  const [houseRules] = useHouseRules();
  const sreg = useRegistry("startraits");
  const galaxy = universe && universe[0];
  if (!galaxy || !galaxy.currentPlanetId) return null;
  const loc = (galaxy.systems || []).flatMap(s => (s.planets || []).map(p => ({ system: s, planet: p }))).find(x => x.planet.id === galaxy.currentPlanetId);
  if (!loc) return null;
  const { planet: p, system: sys } = loc;
  // Star traits come from the registry so edits, disables and customs reflect.
  const starConds = ((sys.star && sys.star.traits) || []).map(n => sreg.entries.find(e => e._id === n && e.enabled)).filter(Boolean);
  const live = houseRules.harshGalaxies;
  const grav = live && p.gravity != null ? envGravityEffect(p.gravity) : null;
  return (
    <div style={{ background: live ? `${COLORS.gold}0E` : COLORS.panel, border: `1px solid ${live ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 10, padding: "9px 14px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <MapPin size={15} color={COLORS.gold} />
        <span style={{ fontSize: 13.5 }}><b>{p.name}</b> <span style={{ color: COLORS.dim }}>· {(sys.name || "").replace(/ System$/, "")} System</span></span>
        {p.gravity != null && <Tag color={gravityColor(p.gravity)}>{p.gravity}g · {gravityBand(p.gravity)}</Tag>}
        {p.weather && <Tag color={COLORS.blue}>{p.weather}</Tag>}
        {starConds.map((t, i) => <Tag key={i} color={COLORS.amber} title={t._desc}>★ {t.env || t._name}{(t.effect.hooks || []).length ? " ⚙" : ""}</Tag>)}
        <div style={{ flex: 1 }} />
        <Tag color={live ? COLORS.gold : COLORS.dim}>{live ? "Harsh Galaxies · in effect" : "Flavor only"}</Tag>
      </div>
      {grav && grav.ranks !== 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
          <Weight size={13} color={grav.color} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Everyone on this world:</span>
          <span style={{ fontSize: 12.5, color: grav.color, fontWeight: 700 }}>{grav.label}</span>
          <span style={{ fontSize: 11, color: COLORS.dim }}>· offset by gravity acclimation</span>
        </div>
      )}
      {live && envEffectSummary().length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          <Zap size={13} color={COLORS.green} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Active effects:</span>
          {envEffectSummary().map((s, i) => <Tag key={i} color={COLORS.green}>{s}</Tag>)}
        </div>
      )}
    </div>
  );
}

// The survival saves and battlefield effects the current world forces on the
// party. Preset conditions only — the current planet's weather switches them on
// automatically, and the DM tops up from a dropdown. No free-text authoring.
function HazardsPanel() {
  const [houseRules] = useHouseRules();
  const [chars, persistChars] = useSharedList("characters_v2");
  const [envState, persistEnv] = useSharedList("session_env");
  const [universe] = useSharedList("universe");
  const [ui, setUi] = useLocalOption("sdndbz_hazards_ui", { collapsed: false });
  const reg = useRegistry("hazards");
  if (!houseRules.harshGalaxies || chars === null || reg.loading) return null;
  const env = (envState && envState[0]) || { active: {}, hours: 0 };
  const active = env.active || {};
  const hours = env.hours || 0;
  const party = (chars || []).filter(c => !c.archived);
  // Hazards now come from the World & Rules registry: disabled ones drop out,
  // edits show through, and custom hazards appear here automatically.
  const hazards = reg.entries.filter(e => e.enabled).map(normHazard);
  // Weather on the party's current world auto-selects the matching conditions.
  const galaxy = universe && universe[0];
  const curPlanet = galaxy && galaxy.currentPlanetId ? (galaxy.systems || []).flatMap(s => s.planets || []).find(p => p.id === galaxy.currentPlanetId) : null;
  const autoIds = curPlanet ? hazards.filter(h => weatherMatchesEntry(curPlanet.weather, h.weatherMatch)).map(h => h.id) : [];
  const isAuto = (id) => autoIds.includes(id);
  const isOn = (h) => isAuto(h.id) || !!active[h.id];
  const dcFor = (h) => (h.baseDC || 0) + hours * (h.perHour || 0);
  const otherHooks = (h) => (h.hooks || []).filter(hk => hk.type !== "saveHazard" && hk.type !== "effectCondition");
  // Auto (planet-driven) conditions are locked on. The DM can only toggle the
  // manual ones they added from the dropdown.
  const toggleManual = (id) => { if (isAuto(id)) return; persistEnv([{ ...env, active: { ...active, [id]: !active[id] } }]); };
  const addManual = (id) => { if (!id) return; persistEnv([{ ...env, active: { ...active, [id]: true } }]); };
  const activeSaves = hazards.filter(h => isOn(h) && h.isSave);
  const activeCount = hazards.filter(isOn).length;
  const addable = hazards.filter(h => !isOn(h));
  const advanceHour = () => {
    if (!activeSaves.length || !party.length) return;
    let updated = chars;
    for (const hz of activeSaves) {
      const dc = dcFor(hz);
      const results = [];
      for (const c of party) {
        const passed = roll(20) + computeSaveBonus(c, hz.ability) + envFlatMod("saves") >= dc;
        results.push(`${c.name} ${passed ? "passed" : "FAILED"}`);
        if (!passed) updated = updated.map(x => x.id === c.id ? { ...x, vitals: { ...(x.vitals || {}), exhaustion: Math.min(6, ((x.vitals && x.vitals.exhaustion) || 0) + 1) } } : x);
      }
      logSession(`${hz.name} (${hz.ability.toUpperCase()} save DC ${dc}): ${results.join(" · ")}`);
    }
    if (persistChars && updated !== chars) persistChars(updated);
    persistEnv([{ ...env, hours: hours + 1 }]);
  };
  const collapsed = ui.collapsed;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: collapsed ? "9px 14px" : 14, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setUi({ collapsed: !collapsed })}>
        <Flame size={14} color={COLORS.amber} />
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Environmental Hazards</span>
        {activeCount > 0 && <Tag color={COLORS.amber}>{activeCount} active</Tag>}
        <span style={{ fontSize: 11, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>Hour {hours}</span>
        <div style={{ flex: 1 }} />
        {collapsed ? <ChevronDown size={16} color={COLORS.muted}/> : <ChevronUp size={16} color={COLORS.muted}/>}
      </div>
      {!collapsed && (<>
        {curPlanet && (
          <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 8 }}>
            {autoIds.length ? <>Set automatically from <b style={{ color: COLORS.blue }}>{curPlanet.name}</b>: {curPlanet.weather}.</> : <>No weather hazard on <b style={{ color: COLORS.text }}>{curPlanet.name}</b> ({curPlanet.weather}). Add one below if the scene calls for it.</>}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8, marginTop: 12 }}>
          {hazards.filter(isOn).map(hz => { const auto = isAuto(hz.id); const extra = otherHooks(hz); return (
            <div key={hz.id} style={{ background: `${COLORS.amber}12`, border: `1px solid ${COLORS.amber}77`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Check size={13} color={COLORS.amber}/>
                <span style={{ fontWeight: 700, fontSize: 12.5 }}>{hz.name}</span>
                {hz.isSave ? <Tag color={COLORS.amber}>{hz.ability.toUpperCase()} save DC {dcFor(hz)}</Tag> : <Tag color={COLORS.blue}>In effect</Tag>}
                {auto ? <Tag color={COLORS.blue}>Auto · weather</Tag> : <X size={13} color={COLORS.red} style={{ marginLeft: "auto", cursor: "pointer" }} title="Remove" onClick={() => toggleManual(hz.id)} />}
              </div>
              {hz.cond && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 5 }}>{hz.cond}.{hz.isSave ? ` Fail: ${hz.fail}.` : ""}</div>}
              {hz.mods && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 3 }}>{hz.mods}</div>}
              {hz.effects.length > 0 && <ul style={{ margin: "5px 0 0", paddingLeft: 16, fontSize: 10.5, color: COLORS.dim, lineHeight: 1.5 }}>{hz.effects.map((e, i) => <li key={i}>{e}</li>)}</ul>}
              {extra.length > 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>{extra.map((hk, i) => <Tag key={i} color={(hookType(hk.type) || {}).color || COLORS.green}>{hookSummary(hk)}</Tag>)}</div>}
            </div>
          ); })}
          {!activeCount && <div style={{ fontSize: 12, color: COLORS.dim }}>No conditions in effect.</div>}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
          {activeSaves.length > 0 && <Btn variant="gold" disabled={!party.length} onClick={advanceHour}><Dices size={14}/> Advance 1 Hour · roll party saves</Btn>}
          {hours > 0 && <Btn size="sm" variant="ghost" onClick={() => persistEnv([{ ...env, hours: 0 }])}>Reset hours</Btn>}
          <div style={{ flex: 1 }} />
          {addable.length > 0 && (
            <Select value="" onChange={e => addManual(e.target.value)} style={{ width: 200 }} title="Add a preset condition">
              <option value="">Add a condition…</option>
              {addable.map(hz => <option key={hz.id} value={hz.id}>{hz.name}</option>)}
            </Select>
          )}
        </div>
      </>)}
    </div>
  );
}

export {
  EnvironmentBanner,
  HazardsPanel,
};
