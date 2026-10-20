import React, { useState, useRef } from "react";
import { ArrowLeft, Check, Crown, Dices, Download, Globe2, Hexagon, Home as HomeIcon, MapPin, Minus, Orbit, Plus, Radio, Rocket, RotateCcw, Search, ShieldHalf, Shuffle, Sparkles, Trash2, TrendingUp, Upload, Wrench, X } from "lucide-react";
import { FACTION_COLORS, FACTION_ROOTS, GALAXY_ERAS, GALAXY_SIZES, GRAVITY_EXTREME, HEX_CELLS, HEX_DX, HEX_R, INFLUENCE_ACTIONS, PLANET_CLASSES, SEASONS, SPIRAL_ARMS, SPIRAL_RIN, SPIRAL_ROUT, SPIRAL_TURNS, STAR_TRAITS, TERRAFORM_INF, TERRAFORM_ZENI, UNI_ECONOMIES, UNI_GOVERNMENTS, UNI_STABILITY, UNI_STARS, UNI_SYS_ROOTS, UNI_TECH, UNI_WEALTH, blankPlanet, clampIdx, classWeather, ensureGalaxyLayout, extremeGravityFlavor, generateGalaxy, generatePlanet, gravityBand, gravityColor, habColor, hexPoints, influencePenalty, newRandomSystem, planetClass, snapOne, spiralPositions, stabilityColor, starTrait, uniName, wealthColor, weatherPool, withPenalty } from "../../engine/universe.js";
import { pick, uid } from "../../lib/dice.js";
import { useRegistry } from "../../state/registry.js";
import { Btn, Checkbox, ConfirmBtn, EmptyState, Field, SciSelect, Select, Tag, TextInput, downloadJSON } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { TagListEditor } from "../characters/items.jsx";

function PlanetCard({ planet, characters, onUpdate, onRemove, readOnly, systemFactionId, faction, onInvest, systemConditions, isPartyHome, onSetPartyHome, isCurrent, onSetLocation }) {
  const [edit, setEdit] = useState(false);
  const [terraformOpen, setTerraformOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [earnAmt, setEarnAmt] = useState(1);       // award influence by exact amount (kept scarce)
  const [investAmt, setInvestAmt] = useState(1);
  const p = planet;
  const set = (patch) => onUpdate({ ...p, ...patch });
  const cls = planetClass(p.class || p.biome);
  // Weather options now come from the registry (enable/disable/custom reflect here);
  // fall back to the book tables while the registry is still loading.
  const wreg = useRegistry("weather");
  const wPool = (season, className = p.class || "Barren") => { const names = weatherPool(wreg.entries, className, season).map(e => e._name); return names.length ? names : (classWeather(className)[season] || ["—"]); };
  const penalty = influencePenalty(p, systemFactionId);
  const infPool = p.influence || 0;
  const pushLog = (text, delta) => [{ text, delta, t: Date.now() }, ...(p.influenceLog || [])].slice(0, 10);
  const earn = (amt) => set({ influence: infPool + amt, influenceLog: pushLog("Objective / flavour reward", amt) });
  const act = (baseInf, patch, text) => {
    const cost = withPenalty(baseInf, p, systemFactionId);
    if (infPool < cost) return;
    onUpdate({ ...p, ...patch, influence: infPool - cost, influenceLog: pushLog(text, -cost) });
  };
  const terraform = (targetName) => {
    const t = planetClass(targetName);
    const cost = withPenalty(TERRAFORM_INF, p, systemFactionId);
    if (infPool < cost) return;
    const opts = classWeather(t.name)[p.season || "Spring"] || ["—"];
    // Gravity is a fixed physical property — terraforming never changes it.
    act(TERRAFORM_INF, { class: t.name, biome: t.name, habitability: t.hab, weather: opts[0] }, `Terraformed → ${t.name} (Ƶ${TERRAFORM_ZENI.toLocaleString()})`);
    setTerraformOpen(false);
  };
  const revolution = () => {
    const newGov = pick(UNI_GOVERNMENTS.filter(g => g !== p.government)) || pick(UNI_GOVERNMENTS);
    const ns = clampIdx((p.stabilityIdx ?? 2) + 1, UNI_STABILITY);
    act(INFLUENCE_ACTIONS.revolution.inf, { government: newGov, ruler: `${pick(["Chairman", "General", "Prophet", "Premier", "Warlord", "Chancellor"])} ${uniName(UNI_SYS_ROOTS)}`, stabilityIdx: ns, stability: UNI_STABILITY[ns] }, `Revolution → ${newGov}`);
  };
  const stat = (label, value, color) => (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: color || COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
  const container = (label, value, color) => (
    <div style={{ flex: 1, minWidth: 0, background: COLORS.panel, border: `1px solid ${color}44`, borderRadius: 8, padding: "7px 9px" }}>
      <div style={{ fontSize: 8.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
  const weatherOpts = wPool(p.season || "Spring");
  const inhabited = p.economy !== "Uninhabited";
  const canAct = !readOnly || characters.length > 0;   // players get world-actions too
  const actionBtn = (key, onClick) => {
    const a = INFLUENCE_ACTIONS[key];
    const cost = withPenalty(a.inf, p, systemFactionId);
    return <Btn key={key} size="sm" variant="ghost" disabled={infPool < cost} title={a.desc} onClick={onClick} style={infPool < cost ? { opacity: 0.5 } : {}}>{a.label} · {cost}</Btn>;
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${isPartyHome ? COLORS.gold + "88" : isCurrent ? COLORS.blue + "88" : COLORS.border}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 30% 30%, ${cls.color}, ${COLORS.panel})`, border: `1px solid ${COLORS.border}`, boxShadow: `0 0 8px ${cls.color}55` }} />
        {edit && !readOnly
          ? <TextInput value={p.name} onChange={e => set({ name: e.target.value })} style={{ fontWeight: 700, fontSize: 14, padding: "3px 6px" }} />
          : <div style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{p.name}</div>}
        <Tag color={cls.color}>{p.class || p.biome}</Tag>
        {!readOnly && <Btn size="sm" variant={edit ? "gold" : "ghost"} onClick={() => setEdit(!edit)}><Wrench size={12} /></Btn>}
        {!readOnly && <Btn size="sm" variant="ghost" onClick={onRemove}><Trash2 size={12} /></Btn>}
      </div>
      {(isPartyHome || isCurrent) && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 11, fontWeight: 700 }}>
          {isPartyHome && <span style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.gold }}><Crown size={13} /> Party Home</span>}
          {isCurrent && <span style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.blue }}><Rocket size={12} /> Party is here</span>}
        </div>
      )}
      {/* Physical containers — habitability, (fixed) gravity, current weather */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {container("Habitability", p.habitability || cls.hab, habColor(p.habitability || cls.hab))}
        {container("Gravity", `${p.gravity ?? "—"}g · ${gravityBand(p.gravity)}`, gravityColor(p.gravity))}
        {container("Weather", p.weather || "—", COLORS.blue)}
      </div>
      {systemConditions && systemConditions.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: COLORS.amber, textTransform: "uppercase", letterSpacing: 0.5 }}>Star</span>
          {systemConditions.map((cnd, i) => <Tag key={i} color={COLORS.amber}>{cnd}</Tag>)}
        </div>
      )}
      {(p.gravity || 0) >= GRAVITY_EXTREME && (
        <div style={{ fontSize: 11, color: COLORS.red, lineHeight: 1.45, marginBottom: 8, fontStyle: "italic" }}>⚠ {extremeGravityFlavor(p.class || p.biome)}</div>
      )}
      {/* Season → current weather picker (weather shifts with the season) */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
        <span style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Season</span>
        <Select value={p.season || "Spring"} onChange={e => { const s = e.target.value; const o = wPool(s); set({ season: s, weather: o.includes(p.weather) ? p.weather : o[0] }); }} style={{ flex: 1, padding: "4px 6px", fontSize: 12 }}>{SEASONS.map(s => <option key={s}>{s}</option>)}</Select>
        <Select value={weatherOpts.includes(p.weather) ? p.weather : weatherOpts[0]} onChange={e => set({ weather: e.target.value })} style={{ flex: 2, padding: "4px 6px", fontSize: 12 }}>{weatherOpts.map(w => <option key={w}>{w}</option>)}</Select>
      </div>
      {edit ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Field label="Planet Class"><Select value={p.class || "Barren"} onChange={e => { const t = planetClass(e.target.value); const o = wPool(p.season || "Spring", t.name); set({ class: t.name, biome: t.name, habitability: t.hab, weather: o[0] }); }}>{PLANET_CLASSES.map(c => <option key={c.name}>{c.name}</option>)}</Select></Field>
          <Field label="Gravity (g)"><TextInput type="number" step="0.1" value={p.gravity ?? 1} onChange={e => set({ gravity: +e.target.value })} /></Field>
          <Field label="Economy"><Select value={p.economy} onChange={e => set({ economy: e.target.value })}>{["Uninhabited", ...UNI_ECONOMIES].map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Government"><Select value={p.government} onChange={e => set({ government: e.target.value })}>{["—", ...UNI_GOVERNMENTS].map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Wealth"><Select value={p.wealth} onChange={e => { const i = UNI_WEALTH.indexOf(e.target.value); set({ wealth: e.target.value, wealthIdx: i }); }}>{UNI_WEALTH.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Stability"><Select value={p.stability} onChange={e => { const i = UNI_STABILITY.indexOf(e.target.value); set({ stability: e.target.value, stabilityIdx: i }); }}>{UNI_STABILITY.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Tax Rate %"><TextInput type="number" value={p.taxRate} onChange={e => set({ taxRate: Math.max(0, Math.min(100, +e.target.value || 0)) })} /></Field>
          <Field label="Ruler"><TextInput value={p.ruler} onChange={e => set({ ruler: e.target.value })} /></Field>
          <Field label="Species"><TextInput value={p.species} onChange={e => set({ species: e.target.value })} /></Field>
          <Field label="Tech"><Select value={p.tech} onChange={e => set({ tech: e.target.value })}>{UNI_TECH.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Notable Feature"><TextInput value={p.feature} onChange={e => set({ feature: e.target.value })} /></Field></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <TagListEditor label="Laws" items={p.laws || []} onAdd={v => set({ laws: [...(p.laws || []), v] })} onRemove={i => set({ laws: (p.laws || []).filter((_, j) => j !== i) })} color={COLORS.amber} placeholder="Add a law..." />
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 8 }}>
            {stat("Economy", p.economy, COLORS.green)}
            {stat("Wealth", p.wealth, wealthColor(p.wealthIdx))}
            {stat("Tax", inhabited ? `${p.taxRate}%` : "—", p.taxRate > 20 ? COLORS.red : COLORS.text)}
            {stat("Government", p.government)}
            {stat("Stability", p.stability, stabilityColor(p.stabilityIdx))}
            {stat("Tech", p.tech)}
            {stat("Population", p.population)}
            {stat("Species", p.species, COLORS.blue)}
            {stat("Ruler", p.ruler)}
          </div>
          {(p.laws || []).length > 0 && <div style={{ marginBottom: 6 }}>{p.laws.map((l, i) => <Tag key={i} color={COLORS.amber}>{l}</Tag>)}</div>}
          {p.feature && <div style={{ fontSize: 11.5, color: COLORS.dim, fontStyle: "italic", marginBottom: 8 }}>{p.feature}</div>}
        </>
      )}
      {/* Influence — the political capital invested in this world. Players earn it
          from objectives/flavour and spend it to reshape the planet. */}
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.purple}44`, borderRadius: 8, padding: 10, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <TrendingUp size={13} color={COLORS.purple} />
          <span style={{ fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Influence</span>
          <span style={{ fontFamily: FONTS.mono, fontWeight: 800, fontSize: 15, color: COLORS.purple }}>{infPool}</span>
          {penalty > 1 && <Tag color={COLORS.red}>×{penalty} impoverished</Tag>}
          <div style={{ flex: 1 }} />
          {canAct && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }} title="Award an exact amount for a completed objective or flavour — Influence should be rare">
              <TextInput type="number" min="1" value={earnAmt} onChange={e => setEarnAmt(Math.max(0, +e.target.value || 0))} style={{ width: 50, textAlign: "center", padding: "3px 4px" }} />
              <Btn size="sm" variant="ghost" disabled={earnAmt <= 0} onClick={() => earn(earnAmt)}>Award</Btn>
            </div>
          )}
        </div>
        {penalty > 1 && <div style={{ fontSize: 10, color: COLORS.red, marginBottom: 6 }}>Under {faction?.name || "faction"} rule and impoverished — every action costs half again as much Influence.</div>}
        {faction && onInvest && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 11, flexWrap: "wrap" }}>
            <span style={{ color: COLORS.dim }}>{faction.name} treasury: <b style={{ color: faction.color }}>{faction.influence || 0}</b></span>
            <TextInput type="number" min="1" value={investAmt} onChange={e => setInvestAmt(Math.max(0, +e.target.value || 0))} style={{ width: 50, textAlign: "center", padding: "3px 4px" }} />
            <Btn size="sm" variant="ghost" disabled={(faction.influence || 0) < investAmt || investAmt <= 0} onClick={() => onInvest(investAmt)} title="Move this exact amount from the faction treasury onto this world">Invest</Btn>
          </div>
        )}
        {canAct && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Btn size="sm" variant="ghost" onClick={() => setTerraformOpen(o => !o)}><Globe2 size={12} /> Terraform</Btn>
            {actionBtn("revolution", revolution)}
            {actionBtn("band", () => act(INFLUENCE_ACTIONS.band.inf, {}, INFLUENCE_ACTIONS.band.label))}
            {actionBtn("favor", () => act(INFLUENCE_ACTIONS.favor.inf, {}, INFLUENCE_ACTIONS.favor.label))}
            {(p.influenceLog || []).length > 0 && <Btn size="sm" variant="ghost" onClick={() => setLogOpen(o => !o)}>{logOpen ? "Hide log" : "Log"}</Btn>}
          </div>
        )}
        {terraformOpen && (
          <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
            <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 6 }}>Terraform to any class — gravity stays fixed. Flat cost: <b style={{ color: COLORS.gold }}>Ƶ{TERRAFORM_ZENI.toLocaleString()}</b> + <b style={{ color: COLORS.purple }}>{withPenalty(TERRAFORM_INF, p, systemFactionId)} Influence</b>{penalty > 1 ? " (impoverished penalty applied)" : ""} — the same no matter the target.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 6 }}>
              {PLANET_CLASSES.filter(c => c.name !== (p.class || p.biome)).map(c => {
                const afford = infPool >= withPenalty(TERRAFORM_INF, p, systemFactionId);
                return (
                  <button key={c.name} disabled={!afford} onClick={() => terraform(c.name)} style={{ textAlign: "left", cursor: afford ? "pointer" : "not-allowed", opacity: afford ? 1 : 0.5, background: COLORS.panel2, border: `1px solid ${c.color}55`, borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: c.color }}>{c.name}</div>
                    <div style={{ fontSize: 9.5, color: COLORS.muted }}>{c.hab}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {logOpen && (p.influenceLog || []).length > 0 && (
          <div style={{ marginTop: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
            {p.influenceLog.map((e, i) => <div key={i} style={{ fontSize: 10.5, color: COLORS.muted, display: "flex", justifyContent: "space-between", gap: 8 }}><span>{e.text}</span><span style={{ color: e.delta >= 0 ? COLORS.green : COLORS.red, fontFamily: FONTS.mono }}>{e.delta >= 0 ? "+" : ""}{e.delta}</span></div>)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
        <Btn size="sm" variant={isPartyHome ? "gold" : "ghost"} onClick={onSetPartyHome}><HomeIcon size={11} /> {isPartyHome ? "Party Home ✓" : "Set as Party Home"}</Btn>
        {onSetLocation && <Btn size="sm" variant={isCurrent ? "blue" : "ghost"} onClick={onSetLocation}><Rocket size={11} /> {isCurrent ? "Landed here ✓" : "Land here"}</Btn>}
        <span style={{ fontSize: 10, color: COLORS.dim }}>Placeholder — ties into the Session tab.</span>
      </div>
    </div>
  );
}

function GalaxyForge({ onGenerate }) {
  const [size, setSize] = useState("medium");
  const [era, setEra] = useState("frontier");
  const importRef = useRef(null);
  const importGalaxy = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const g = JSON.parse(reader.result); if (!Array.isArray(g.systems)) throw 0; onGenerate(ensureGalaxyLayout(g)); } catch { alert("Couldn't read that galaxy file — expected an exported galaxy JSON."); } };
    reader.readAsText(f); e.target.value = "";
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, maxWidth: 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <Orbit size={34} style={{ color: COLORS.gold, marginBottom: 8 }} />
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18 }}>Forge a Galaxy</div>
        <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>Generate the systems and worlds your campaign takes place across. Everything is editable after.</div>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Size</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
        {Object.entries(GALAXY_SIZES).map(([k, s]) => (
          <div key={k} onClick={() => setSize(k)} style={{ cursor: "pointer", padding: 12, borderRadius: 8, background: size === k ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${size === k ? COLORS.gold : COLORS.border}` }}>
            <div style={{ fontWeight: 700, color: size === k ? COLORS.gold : COLORS.text }}>{s.label}</div>
            <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 2 }}>{s.systems[0]}–{s.systems[1]} systems</div>
            <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 4, lineHeight: 1.35 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Era (flavors what forms)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {Object.entries(GALAXY_ERAS).map(([k, e]) => (
          <span key={k} onClick={() => setEra(k)} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, borderRadius: 16, padding: "5px 12px", background: era === k ? `${COLORS.blue}22` : COLORS.panel2, color: era === k ? COLORS.blue : COLORS.dim, border: `1px solid ${era === k ? COLORS.blue + "66" : COLORS.border}` }}>{e.label}</span>
        ))}
      </div>
      <Btn variant="gold" onClick={() => onGenerate(generateGalaxy({ size, era }))} style={{ width: "100%", justifyContent: "center", padding: "12px" }}><Sparkles size={16} /> Generate Galaxy</Btn>
      <input ref={importRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importGalaxy} />
      <Btn onClick={() => importRef.current?.click()} style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: 10 }}><Upload size={15} /> Import a Galaxy File</Btn>
    </div>
  );
}

// The spiral galaxy map (Stellaris-style): faint arms with system nodes dropped
// in, colored by controlling faction (else star color). Click a node to select a
// system; in claim mode, click toggles faction ownership. Nodes are draggable to
// reposition; with the grid on, drops snap to grid cells.
function GalaxySpiral({ galaxy, selectedId, onSelect, claimFactionId, onToggleClaim, showGrid, onMove, isDM, highlightIds }) {
  const S = 1000;
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null); // { id, x, y, moved }
  const factionColor = (id) => galaxy.factions?.find(f => f.id === id)?.color;
  // Players only see discovered systems; the DM sees the whole map (fog is a haze).
  const shown = isDM ? galaxy.systems : galaxy.systems.filter(s => s.discovered);
  const canDrag = isDM;
  // The party ship sits at the current-location system; a crown marks home.
  const currentSysId = galaxy.currentPlanetId ? (galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.currentPlanetId)) || {}).id : null;
  const homeSysId = galaxy.partyHomePlanetId ? (galaxy.systems.find(s => s.planets.some(p => p.id === galaxy.partyHomePlanetId)) || {}).id : null;
  const arms = SPIRAL_ARMS(galaxy.systems.length);
  const armPath = (arm) => {
    let d = "";
    for (let k = 0; k <= 60; k++) {
      const t = k / 60;
      const angle = t * SPIRAL_TURNS * Math.PI * 2 + (arm / arms) * Math.PI * 2;
      const radius = SPIRAL_RIN + (SPIRAL_ROUT - SPIRAL_RIN) * t;
      const x = (0.5 + radius * Math.cos(angle)) * S;
      const y = (0.5 + radius * Math.sin(angle)) * S;
      d += (k === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return d;
  };
  const evtToNorm = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX);
    const cy = (e.touches ? e.touches[0].clientY : e.clientY);
    return { x: Math.max(0.02, Math.min(0.98, (cx - r.left) / r.width)), y: Math.max(0.02, Math.min(0.98, (cy - r.top) / r.height)) };
  };
  const startDrag = (e, s) => { e.stopPropagation(); if (!canDrag) { claimFactionId ? onToggleClaim(s.id) : onSelect(s.id); return; } setDrag({ id: s.id, x: s.x, y: s.y, moved: false }); };
  const onMouseMove = (e) => {
    if (!drag) return;
    let { x, y } = evtToNorm(e);
    if (showGrid) { const c = snapOne(x, y, galaxy.systems, drag.id); x = c.x; y = c.y; }
    setDrag(d => ({ ...d, x, y, moved: true }));
  };
  const endDrag = () => {
    if (!drag) return;
    if (drag.moved) onMove(drag.id, drag.x, drag.y);
    else (claimFactionId ? onToggleClaim(drag.id) : onSelect(drag.id));
    setDrag(null);
  };
  const posOf = (s) => (drag && drag.id === s.id) ? { x: drag.x, y: drag.y } : { x: s.x, y: s.y };
  const dist2 = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;

  // Faction auras: each claimed system radiates its faction color across the hex
  // tiling. A cell takes the faction pulling hardest on it; the pull is a squared
  // falloff so overlapping claims pile up — brightest at the heart of a territory,
  // dying away toward the frontier. Works whether or not the grid outlines show.
  const AURA_R = HEX_DX * 2.6;
  const claimedPts = shown.filter(s => s.factionId && factionColor(s.factionId)).map(s => ({ ...posOf(s), factionId: s.factionId }));
  const auraCells = claimedPts.length ? HEX_CELLS.map(cell => {
    const byFac = {};
    for (const p of claimedPts) {
      const d = Math.sqrt(dist2(cell.cx, cell.cy, p.x, p.y));
      if (d >= AURA_R) continue;
      const f = 1 - d / AURA_R;
      byFac[p.factionId] = (byFac[p.factionId] || 0) + f * f;
    }
    let bestId = null, best = 0;
    for (const id in byFac) if (byFac[id] > best) { best = byFac[id]; bestId = id; }
    return bestId ? { key: cell.key, cell, color: factionColor(bestId), alpha: Math.min(0.55, best * 0.4) } : null;
  }).filter(Boolean) : [];

  // Fog of war: unexplored space clouds over. A cell clears within FOG_R of any
  // discovered system and fogs up beyond it. Players get thick fog that hides
  // everything unrevealed; the DM sees a light haze and the whole map underneath.
  const FOG_R = HEX_DX * 1.7;
  const discoveredSys = galaxy.systems.filter(s => s.discovered);
  const fogCells = HEX_CELLS.map(cell => {
    if (!discoveredSys.length) return { key: cell.key, cell, fog: 1 };
    let minD = Infinity;
    for (const s of discoveredSys) { const p = posOf(s); minD = Math.min(minD, Math.sqrt(dist2(cell.cx, cell.cy, p.x, p.y))); }
    return { key: cell.key, cell, fog: Math.max(0, Math.min(1, (minD - FOG_R) / FOG_R)) };
  }).filter(c => c.fog > 0.02);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${S} ${S}`}
      onMouseMove={onMouseMove} onMouseUp={endDrag} onMouseLeave={endDrag}
      onTouchMove={onMouseMove} onTouchEnd={endDrag}
      style={{ width: "100%", aspectRatio: "1 / 1", display: "block", background: `radial-gradient(circle at 50% 50%, ${COLORS.panel2} 0%, ${COLORS.deep} 70%)`, borderRadius: 12, border: `1px solid ${COLORS.border}`, touchAction: "none" }}>
      <defs>
        <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8fb4ff" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#5a6ea0" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={S / 2} cy={S / 2} r={S * 0.46} fill="url(#galaxyCore)" />
      {Array.from({ length: arms }).map((_, a) => (
        <path key={a} d={armPath(a)} fill="none" stroke="#5f76b8" strokeWidth={S * 0.06} strokeLinecap="round" opacity="0.10" />
      ))}
      {/* Faction auras — filled hexes, densest at the territory heart */}
      {auraCells.map(a => (
        <polygon key={"a" + a.key} points={hexPoints(a.cell.cx * S, a.cell.cy * S, HEX_R * S)} fill={a.color} stroke="none" opacity={a.alpha} style={{ filter: `drop-shadow(0 0 ${S * 0.012}px ${a.color})` }} />
      ))}
      {showGrid && HEX_CELLS.map(cell => (
        <polygon key={cell.key} points={hexPoints(cell.cx * S, cell.cy * S, HEX_R * S)} fill="none" stroke="#33405f" strokeWidth="1" opacity="0.45" />
      ))}
      {/* Fog of war — thick for players, a light haze the DM sees through */}
      {fogCells.map(f => (
        <polygon key={"f" + f.key} points={hexPoints(f.cell.cx * S, f.cell.cy * S, HEX_R * S * 1.02)} fill={isDM ? "#0a1120" : "#070a12"} opacity={isDM ? 0.1 + 0.16 * f.fog : 0.55 + 0.4 * f.fog} style={{ pointerEvents: "none" }} />
      ))}
      {shown.map(s => {
        const c = factionColor(s.factionId) || s.star.color;
        const sel = s.id === selectedId; const p = posOf(s);
        const hasHome = s.planets.some(pl => pl.id === galaxy.partyHomePlanetId);
        const dragging = drag && drag.id === s.id;
        const undiscovered = isDM && !s.discovered;           // DM sees it at full color; dashed ring flags "not yet revealed"
        const nomatch = highlightIds && !highlightIds.has(s.id);   // dimmed by the filter
        const hit = highlightIds && highlightIds.has(s.id);
        const r = sel || dragging ? 15 : 9;
        return (
          <g key={s.id} onMouseDown={(e) => startDrag(e, s)} onTouchStart={(e) => startDrag(e, s)} style={{ cursor: canDrag ? (dragging ? "grabbing" : "grab") : "pointer", opacity: nomatch ? 0.18 : 1 }}>
            {hit && <circle cx={p.x * S} cy={p.y * S} r={r + 9} fill="none" stroke={COLORS.blue} strokeWidth={3} opacity={0.9} style={{ filter: `drop-shadow(0 0 8px ${COLORS.blue})` }} />}
            <circle cx={p.x * S} cy={p.y * S} r={r} fill={c} stroke={sel ? "#fff" : undiscovered ? "#8fa2c8" : (hasHome ? COLORS.gold : COLORS.deep)} strokeWidth={sel ? 3 : hasHome ? 3 : 2} strokeDasharray={undiscovered ? "4 3" : undefined} style={{ filter: `drop-shadow(0 0 ${sel || dragging ? 10 : 5}px ${c})` }} />
            {s.id === homeSysId && (
              <g transform={`translate(${p.x * S}, ${p.y * S - r - 18}) scale(1.5)`} style={{ pointerEvents: "none" }}>
                <path d="M-8,5 L-8.5,-5 L-3.5,0 L0,-7 L3.5,0 L8.5,-5 L8,5 Z" fill={COLORS.gold} stroke={COLORS.deep} strokeWidth="0.8" style={{ filter: `drop-shadow(0 0 4px ${COLORS.gold})` }} />
              </g>
            )}
            {s.id === currentSysId && (
              <g transform={`translate(${p.x * S + r + 11}, ${p.y * S - r - 11}) scale(1.6)`} style={{ pointerEvents: "none" }}>
                <circle r="13" fill="none" stroke={COLORS.blue} strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <path d="M0,-12 L7,8 L0,3.5 L-7,8 Z" fill={COLORS.blue} stroke="#eaf4ff" strokeWidth="1" style={{ filter: `drop-shadow(0 0 6px ${COLORS.blue})` }} />
              </g>
            )}
            {(sel || claimFactionId || dragging || hit) && <text x={p.x * S} y={p.y * S - 20} textAnchor="middle" fontSize="22" fill="#cdd6ea" fontFamily={FONTS.body}>{s.name.replace(/ System$/, "")}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// New System dialog — fully random, or custom (name / star / planets, and
// whether the planets are randomly rolled or blank for the DM to fill in).
function NewSystemModal({ galaxy, onCreate, onCancel }) {
  const [mode, setMode] = useState("random");
  const [name, setName] = useState(() => uniName(UNI_SYS_ROOTS));
  const [starType, setStarType] = useState(UNI_STARS[0].type);
  const [planetCount, setPlanetCount] = useState(2);
  const [randomPlanets, setRandomPlanets] = useState(true);
  const eraDef = GALAXY_ERAS[galaxy.era];
  const create = () => {
    if (mode === "random") return onCreate(newRandomSystem(eraDef));
    const star = UNI_STARS.find(s => s.type === starType) || UNI_STARS[0];
    const planets = Array.from({ length: planetCount }, () => randomPlanets ? generatePlanet(eraDef) : blankPlanet());
    onCreate({ id: uid(), name: /System$/.test(name.trim()) ? name.trim() : name.trim() + " System", star, factionId: null, planets });
  };
  const seg = (k, label) => (
    <button key={k} onClick={() => setMode(k)} style={{ flex: 1, padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: mode === k ? `${COLORS.gold}1A` : COLORS.panel2, color: mode === k ? COLORS.gold : COLORS.muted, border: `1px solid ${mode === k ? COLORS.gold : COLORS.border}` }}>{label}</button>
  );
  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, width: 460, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 16 }}>New System</div>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="ghost" onClick={onCancel}><X size={15} /></Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>{seg("random", "Random")}{seg("custom", "Build it")}</div>
        {mode === "random" ? (
          <div style={{ fontSize: 12.5, color: COLORS.dim, lineHeight: 1.5, marginBottom: 16 }}>Roll a fully random system — star, planets, and each world's economy, government, stability and features. Drop it anywhere on the map and edit any planet afterward.</div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <Field label="System Name"><div style={{ display: "flex", gap: 6 }}><TextInput value={name} onChange={e => setName(e.target.value)} /><Btn size="sm" onClick={() => setName(uniName(UNI_SYS_ROOTS))}><Shuffle size={13} /></Btn></div></Field>
            <Field label="Star"><Select value={starType} onChange={e => setStarType(e.target.value)}>{UNI_STARS.map(s => <option key={s.type}>{s.type}</option>)}</Select></Field>
            <Field label="Planets">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Btn size="sm" onClick={() => setPlanetCount(Math.max(1, planetCount - 1))}><Minus size={12} /></Btn>
                <span style={{ width: 26, textAlign: "center", fontWeight: 700 }}>{planetCount}</span>
                <Btn size="sm" onClick={() => setPlanetCount(Math.min(8, planetCount + 1))}><Plus size={12} /></Btn>
              </div>
            </Field>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, cursor: "pointer" }}>
              <Checkbox checked={randomPlanets} onChange={e => setRandomPlanets(e.target.checked)} />
              <span style={{ fontSize: 12.5, color: COLORS.text }}>Roll random planets {randomPlanets ? "" : "— blank worlds to fill in yourself"}</span>
            </label>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Btn variant="gold" onClick={create} style={{ flex: 1, justifyContent: "center" }}>{mode === "random" ? <><Dices size={14} /> Generate & Place</> : <><Check size={14} /> Create & Place</>}</Btn>
          <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

// Solar-system level: an orbital diagram of one system's star + planets, with a
// full PlanetCard (containers, weather, terraform, influence) for each world.
function SolarSystemView({ system, characters, faction, isDM, onBack, onUpdatePlanet, onRemovePlanet, onAddPlanet, onInvest, onUpdateStar, partyHomeId, onSetPartyHome, currentPlanetId, onSetLocation }) {
  const [starEdit, setStarEdit] = useState(false);
  const S = 400;
  const planets = system.planets;
  const n = planets.length;
  const star = system.star;
  const traits = (star.traits || []).map(starTrait).filter(Boolean);
  const twin = traits.some(t => t.twin);
  const envs = traits.map(t => t.env).filter(Boolean);
  const toggleTrait = (name) => { const cur = star.traits || []; onUpdateStar({ traits: cur.includes(name) ? cur.filter(x => x !== name) : [...cur, name] }); };
  const rings = planets.map((p, i) => {
    const r = n <= 1 ? 0.3 : 0.16 + 0.3 * (i / (n - 1));
    const a = i * 2.399963 + 0.6;                       // golden-angle spread so orbits don't line up
    return { p, r, x: 0.5 + r * Math.cos(a), y: 0.5 + r * Math.sin(a) };
  });
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <Btn size="sm" variant="ghost" onClick={onBack}><ArrowLeft size={14} /> Galaxy</Btn>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: faction?.color || star.color, boxShadow: `0 0 12px ${faction?.color || star.color}` }} />
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 17 }}>{system.name.replace(/ System$/, "")} System</div>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>{star.type} · {n} planet{n === 1 ? "" : "s"}</span>
        {faction && <Tag color={faction.color}>{faction.name} territory</Tag>}
        {traits.map(t => <Tag key={t.name} color={COLORS.amber}>{t.name}</Tag>)}
        <div style={{ flex: 1 }} />
        {isDM && <Btn size="sm" variant={starEdit ? "gold" : "default"} onClick={() => setStarEdit(o => !o)}><Sparkles size={13} /> Star</Btn>}
        {isDM && <Btn size="sm" onClick={onAddPlanet}><Plus size={13} /> Planet</Btn>}
      </div>
      {/* System-wide star effects — a condition on the star touches every world */}
      {traits.length > 0 && (
        <div style={{ background: `${COLORS.amber}12`, border: `1px solid ${COLORS.amber}44`, borderRadius: 10, padding: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: COLORS.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Star modifiers — apply to every planet in this system</div>
          {traits.map(t => (
            <div key={t.name} style={{ fontSize: 11.5, color: COLORS.text, marginBottom: 3 }}><b style={{ color: COLORS.amber }}>{t.name}</b>{t.env ? <span style={{ color: COLORS.dim }}> · {t.env}</span> : null} — <span style={{ color: COLORS.muted }}>{t.desc}</span></div>
          ))}
        </div>
      )}
      {isDM && starEdit && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Star Type</span>
            <Select value={star.type} onChange={e => { const s = UNI_STARS.find(x => x.type === e.target.value) || UNI_STARS[0]; onUpdateStar({ type: s.type, color: s.color }); }} style={{ maxWidth: 200 }}>{UNI_STARS.map(s => <option key={s.type}>{s.type}</option>)}</Select>
          </div>
          <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 6 }}>Modifiers (tap to toggle — each applies system-wide):</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {STAR_TRAITS.map(t => { const on = (star.traits || []).includes(t.name); return (
              <span key={t.name} onClick={() => toggleTrait(t.name)} title={t.desc} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, borderRadius: 14, padding: "4px 11px", background: on ? `${COLORS.amber}22` : COLORS.panel2, color: on ? COLORS.amber : COLORS.muted, border: `1px solid ${on ? COLORS.amber : COLORS.border}` }}>{on ? "✓ " : "+ "}{t.name}</span>
            ); })}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 300px", minWidth: 260, position: "sticky", top: 8 }}>
          <svg viewBox={`0 0 ${S} ${S}`} style={{ width: "100%", aspectRatio: "1 / 1", background: `radial-gradient(circle at 50% 50%, ${COLORS.panel} 0%, ${COLORS.deep} 70%)`, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
            {rings.map((ring, i) => <circle key={"o" + i} cx={S / 2} cy={S / 2} r={ring.r * S} fill="none" stroke="#2a3350" strokeWidth="1" opacity="0.5" />)}
            {twin ? <>
              <circle cx={S / 2 - 11} cy={S / 2} r={13} fill={star.color} style={{ filter: `drop-shadow(0 0 14px ${star.color})` }} />
              <circle cx={S / 2 + 11} cy={S / 2} r={11} fill={star.color} style={{ filter: `drop-shadow(0 0 12px ${star.color})` }} />
            </> : <circle cx={S / 2} cy={S / 2} r={16} fill={star.color} style={{ filter: `drop-shadow(0 0 16px ${star.color})` }} />}
            {rings.map((ring) => { const c = planetClass(ring.p.class || ring.p.biome); return (
              <g key={ring.p.id}>
                <circle cx={ring.x * S} cy={ring.y * S} r={ring.p.id === partyHomeId ? 10 : 8} fill={c.color} stroke={ring.p.id === partyHomeId ? COLORS.gold : COLORS.deep} strokeWidth="2" style={{ filter: `drop-shadow(0 0 6px ${c.color})` }} />
                <text x={ring.x * S} y={ring.y * S - 14} textAnchor="middle" fontSize="12" fill="#cdd6ea" fontFamily={FONTS.body}>{ring.p.name}</text>
              </g>
            ); })}
          </svg>
        </div>
        <div style={{ flex: "2 1 400px", minWidth: 300, display: "flex", flexDirection: "column", gap: 10 }}>
          {planets.map(p => (
            <PlanetCard key={p.id} planet={p} characters={characters} readOnly={!isDM} systemFactionId={system.factionId} faction={faction} systemConditions={envs} onInvest={amt => onInvest(p.id, amt)}
              isPartyHome={p.id === partyHomeId} onSetPartyHome={() => onSetPartyHome(p.id)}
              isCurrent={p.id === currentPlanetId} onSetLocation={onSetLocation ? () => onSetLocation(p.id) : null}
              onUpdate={pl => onUpdatePlanet(pl)} onRemove={() => onRemovePlanet(p.id)} />
          ))}
          {planets.length === 0 && <EmptyState icon={Orbit} title="No planets" body={isDM ? "Add a planet to this system." : "This system has no charted worlds."} />}
        </div>
      </div>
    </div>
  );
}

// Every attribute that personifies a world (plus the system's star trait), so the
// DM can filter the map for "where is X" instead of doom-searching. `scope:system`
// reads the star; the rest read each planet. `list` values are arrays (laws, traits).
const GALAXY_FILTERS = [
  { key: "class",      label: "Planet Class", get: (p) => p.class || p.biome },
  { key: "species",    label: "Species",      get: (p) => p.species, split: true },
  { key: "gravity",    label: "Gravity Band", get: (p) => gravityBand(p.gravity) },
  { key: "weather",    label: "Weather",      get: (p) => p.weather },
  { key: "economy",    label: "Economy",      get: (p) => p.economy },
  { key: "wealth",     label: "Wealth",       get: (p) => p.wealth },
  { key: "stability",  label: "Stability",    get: (p) => p.stability },
  { key: "tech",       label: "Tech",         get: (p) => p.tech },
  { key: "government", label: "Government",    get: (p) => p.government },
  { key: "feature",    label: "Feature",      get: (p) => p.feature },
  { key: "laws",       label: "Law",          get: (p) => p.laws, list: true },
  { key: "star",       label: "Star Trait",   get: (s) => (s.star && s.star.traits) || [], list: true, scope: "system" },
];
const galaxyFilter = (k) => GALAXY_FILTERS.find(f => f.key === k);
const SKIP_VALUES = new Set(["—", "", "Uninhabited"]);
// Distinct values present in the galaxy for an attribute, for the value dropdown.
function galaxyFilterValues(galaxy, attrKey) {
  const def = galaxyFilter(attrKey); if (!def) return [];
  const set = new Set();
  const items = def.scope === "system" ? galaxy.systems : galaxy.systems.flatMap(s => s.planets);
  for (const it of items) {
    const raw = def.get(it);
    if (def.list) (raw || []).forEach(v => { if (v && !SKIP_VALUES.has(v)) set.add(v); });
    else if (def.split) String(raw || "").split(/\s*&\s*/).forEach(v => { v = v.trim(); if (v && !SKIP_VALUES.has(v)) set.add(v); });
    else if (raw != null && !SKIP_VALUES.has(raw)) set.add(raw);
  }
  return [...set].sort();
}
function systemMatchesFilter(sys, attrKey, value) {
  const def = galaxyFilter(attrKey); if (!def || !value) return true;
  if (def.scope === "system") return (def.get(sys) || []).includes(value);
  return (sys.planets || []).some(p => {
    const raw = def.get(p);
    if (def.list) return (raw || []).includes(value);
    if (def.split) return String(raw || "").split(/\s*&\s*/).map(x => x.trim()).includes(value);
    return raw === value;
  });
}

function GalaxyMap({ galaxy, characters, onChange, isDM }) {
  const [selectedId, setSelectedId] = useState(null);
  const [claimFactionId, setClaimFactionId] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [filter, setFilter] = useState({ attr: "", value: "" });
  const [newSystemOpen, setNewSystemOpen] = useState(false);
  const [entered, setEntered] = useState(false);   // drilled into a system's solar-system view
  const importRef = useRef(null);
  const importGalaxy = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { const g = JSON.parse(reader.result); if (!Array.isArray(g.systems)) throw 0; onChange(ensureGalaxyLayout(g)); } catch { alert("Couldn't read that galaxy file — expected an exported galaxy JSON."); } };
    reader.readAsText(f); e.target.value = "";
  };
  // Players (fog of war) only see systems the DM has revealed; the DM sees all.
  const visibleSystems = isDM ? galaxy.systems : galaxy.systems.filter(s => s.discovered);
  const discoveredCount = galaxy.systems.filter(s => s.discovered).length;
  // Attribute filter: highlight every system whose worlds match the chosen value.
  const filterActive = !!(filter.attr && filter.value);
  const filterValues = filter.attr ? galaxyFilterValues(galaxy, filter.attr) : [];
  const matchIds = filterActive ? new Set(visibleSystems.filter(s => systemMatchesFilter(s, filter.attr, filter.value)).map(s => s.id)) : null;
  const matchCount = matchIds ? matchIds.size : 0;
  const clearFilter = () => setFilter({ attr: "", value: "" });
  const totalPlanets = visibleSystems.reduce((s, sy) => s + sy.planets.length, 0);
  // The party's home is a single planet across the whole galaxy (ties into Session).
  const partyHomeId = galaxy.partyHomePlanetId || null;
  const partyHomePlanet = partyHomeId ? galaxy.systems.flatMap(s => s.planets).find(p => p.id === partyHomeId) : null;
  const setPartyHome = (planetId) => onChange({ ...galaxy, partyHomePlanetId: partyHomeId === planetId ? null : planetId });
  // The party ship: its current world drives the live environment effects. Flying
  // to a system lands them on its main world; refine the exact planet in the system.
  const setCurrentLocation = (planetId) => onChange({ ...galaxy, currentPlanetId: planetId || null });
  const flyPartyTo = (sys) => { const p = sys.planets.find(pl => pl.economy && pl.economy !== "Uninhabited") || sys.planets[0]; setCurrentLocation(p ? p.id : null); };
  const partyInSystem = (sys) => sys.planets.some(pl => pl.id === galaxy.currentPlanetId);
  const factions = galaxy.factions || [];
  // Fog of war extends to factions: players only see a faction once they've
  // discovered at least one of its systems (and its "N sys" counts only the
  // discovered ones). The DM sees every faction.
  const visibleFactions = isDM ? factions : factions.filter(f => visibleSystems.some(s => s.factionId === f.id));
  const selected = visibleSystems.find(s => s.id === selectedId) || null;
  const factionOf = (id) => factions.find(f => f.id === id);
  const revealSystem = (id, on) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === id ? { ...s, discovered: on } : s) });
  const revealAll = (on) => onChange({ ...galaxy, systems: galaxy.systems.map(s => ({ ...s, discovered: on })) });

  const setPlanet = (sysId, planet) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.map(p => p.id === planet.id ? planet : p) }) });
  const removePlanet = (sysId, pid) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.filter(p => p.id !== pid) }) });
  const addPlanet = (sysId) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: [...s.planets, generatePlanet(GALAXY_ERAS[galaxy.era])] }) });
  const updateStar = (sysId, patch) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === sysId ? { ...s, star: { ...s.star, ...patch } } : s) });
  // Move Influence from a system's controlling faction treasury onto one of its
  // planets — one combined write so neither half clobbers the other.
  const investInPlanet = (sysId, planetId, amt) => {
    const sys = galaxy.systems.find(s => s.id === sysId); if (!sys) return;
    const fac = factions.find(f => f.id === sys.factionId); if (!fac || (fac.influence || 0) < amt) return;
    onChange({
      ...galaxy,
      factions: factions.map(f => f.id === fac.id ? { ...f, influence: (f.influence || 0) - amt } : f),
      systems: galaxy.systems.map(s => s.id !== sysId ? s : { ...s, planets: s.planets.map(p => p.id === planetId ? { ...p, influence: (p.influence || 0) + amt, influenceLog: [{ text: `Invested from ${fac.name}`, delta: amt, t: Date.now() }, ...(p.influenceLog || [])].slice(0, 10) } : p) }),
    });
  };
  // Place a newly-built system: a free grid cell near center if the grid is on,
  // else just above the core; the user drags it wherever they like.
  const addSystem = (sys) => {
    const start = showGrid ? snapOne(0.5, 0.32, galaxy.systems, null) : { x: 0.5, y: 0.28 };
    const placed = { ...sys, x: start.x, y: start.y, discovered: sys.discovered ?? false };
    onChange({ ...galaxy, systems: [...galaxy.systems, placed] });
    setSelectedId(placed.id);
    setNewSystemOpen(false);
  };
  const moveSystem = (id, x, y) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === id ? { ...s, x, y } : s) });
  // The grid is just an overlay + a snap-on-drag guide; enabling it never
  // rearranges the galaxy, so the natural spiral layout is preserved.
  const toggleGrid = () => setShowGrid(v => !v);
  // Reflow the existing systems back onto the spiral (keeps every world's data);
  // for galaxies whose positions were saved by an older layout or hand-dragged.
  const relayout = () => {
    const pos = spiralPositions(galaxy.systems.length);
    onChange({ ...galaxy, systems: galaxy.systems.map((s, i) => ({ ...s, x: pos[i].x, y: pos[i].y })) });
  };
  // Faction management
  const addFaction = () => {
    const used = factions.map(f => f.color);
    const color = FACTION_COLORS.find(c => !used.includes(c)) || pick(FACTION_COLORS);
    const f = { id: uid(), name: pick(FACTION_ROOTS.filter(n => !factions.some(x => x.name === n))) || "New Faction", color, description: "" };
    onChange({ ...galaxy, factions: [...factions, f] });
  };
  const updateFaction = (id, patch) => onChange({ ...galaxy, factions: factions.map(f => f.id === id ? { ...f, ...patch } : f) });
  const removeFaction = (id) => onChange({ ...galaxy, factions: factions.filter(f => f.id !== id), systems: galaxy.systems.map(s => s.factionId === id ? { ...s, factionId: null } : s) });
  const toggleClaim = (sysId) => onChange({ ...galaxy, systems: galaxy.systems.map(s => s.id === sysId ? { ...s, factionId: s.factionId === claimFactionId ? null : claimFactionId } : s) });

  const sysStat = { fontSize: 10.5, color: COLORS.dim };
  if (entered && selected) return (
    <SolarSystemView system={selected} characters={characters} faction={factionOf(selected.factionId)} isDM={isDM}
      onBack={() => setEntered(false)}
      onUpdatePlanet={pl => setPlanet(selected.id, pl)}
      onRemovePlanet={pid => removePlanet(selected.id, pid)}
      onAddPlanet={() => addPlanet(selected.id)}
      partyHomeId={partyHomeId} onSetPartyHome={setPartyHome}
      currentPlanetId={galaxy.currentPlanetId} onSetLocation={setCurrentLocation}
      onInvest={(pid, amt) => investInPlanet(selected.id, pid, amt)}
      onUpdateStar={patch => updateStar(selected.id, patch)} />
  );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 16 }}>{galaxy.name}</div>
        <Tag color={COLORS.purple}>{GALAXY_SIZES[galaxy.size]?.label}</Tag>
        <Tag color={COLORS.blue}>{GALAXY_ERAS[galaxy.era]?.label}</Tag>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>{isDM ? `${galaxy.systems.length} systems (${discoveredCount} revealed)` : `${visibleSystems.length} systems`} · {totalPlanets} planets{partyHomePlanet ? <> · <span style={{ color: COLORS.gold }}>Home: {partyHomePlanet.name}</span></> : ""}{visibleFactions.length ? ` · ${visibleFactions.length} factions` : ""}</span>
        <div style={{ flex: 1 }} />
        {isDM && <>
          <Btn size="sm" onClick={relayout} title="Re-arrange all systems into a spiral"><Orbit size={13} /> Arrange</Btn>
          <Btn size="sm" variant={showGrid ? "gold" : "default"} onClick={toggleGrid} title={showGrid ? "Hide hex grid" : "Show hex grid — drag a system to snap it to a cell"}><Hexagon size={13} /> Grid</Btn>
          <Btn size="sm" onClick={() => setNewSystemOpen(true)}><Plus size={13} /> System</Btn>
          <Btn size="sm" variant="blue" onClick={() => downloadJSON(galaxy, `${(galaxy.name || "galaxy").replace(/\s+/g, "_")}.json`)} title="Export this galaxy to a JSON file"><Download size={13} /> Export</Btn>
          <input ref={importRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importGalaxy} />
          <ConfirmBtn size="sm" variant="default" confirmTitle="Replace the current galaxy with the imported one" onConfirm={() => importRef.current?.click()}><Upload size={13} /> Import</ConfirmBtn>
          <ConfirmBtn size="sm" variant="danger" confirmTitle="Discard this galaxy and forge a new one" onConfirm={() => onChange(null)}><RotateCcw size={13} /> New Galaxy</ConfirmBtn>
        </>}
      </div>
      {isDM && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 11 }}>
          <span style={{ color: COLORS.dim }}>Fog of war — players only see revealed systems.</span>
          <Btn size="sm" variant="ghost" onClick={() => revealAll(true)}>Reveal all</Btn>
          <Btn size="sm" variant="ghost" onClick={() => revealAll(false)}>Hide all</Btn>
        </div>
      )}
      {/* Attribute filter — find worlds by any trait instead of hunting the map */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap", background: filterActive ? `${COLORS.blue}0E` : COLORS.panel, border: `1px solid ${filterActive ? COLORS.blue + "55" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
        <Search size={14} color={filterActive ? COLORS.blue : COLORS.muted} />
        <span style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: FONTS.mono }}>Find Worlds</span>
        <SciSelect value={filter.attr} onChange={k => setFilter({ attr: k, value: "" })} width={160} placeholder="Attribute"
          options={GALAXY_FILTERS.map(f => ({ value: f.key, label: f.label }))} />
        {filter.attr && (
          <SciSelect value={filter.value} onChange={v => setFilter({ ...filter, value: v })} width={200} placeholder={filterValues.length ? "Any value" : "None present"}
            options={[{ value: "", label: "Any value" }, ...filterValues.map(v => ({ value: v, label: v, count: visibleSystems.filter(s => systemMatchesFilter(s, filter.attr, v)).length }))]} />
        )}
        {filterActive && <Tag color={matchCount ? COLORS.blue : COLORS.dim}>{matchCount} system{matchCount === 1 ? "" : "s"} match</Tag>}
        <div style={{ flex: 1 }} />
        {(filter.attr || filter.value) && <Btn size="sm" variant="ghost" onClick={clearFilter}><X size={13} /> Clear</Btn>}
      </div>

      {newSystemOpen && isDM && <NewSystemModal galaxy={galaxy} onCreate={addSystem} onCancel={() => setNewSystemOpen(false)} />}

      {claimFactionId && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 12px", borderRadius: 8, background: `${factionOf(claimFactionId)?.color || COLORS.gold}1A`, border: `1px solid ${factionOf(claimFactionId)?.color || COLORS.gold}66` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: factionOf(claimFactionId)?.color }}>Claiming for {factionOf(claimFactionId)?.name}</span>
          <span style={{ fontSize: 11, color: COLORS.dim }}>Click systems on the map (or in the legend) to add/remove them from this faction's territory.</span>
          <div style={{ flex: 1 }} />
          <Btn size="sm" variant="gold" onClick={() => setClaimFactionId(null)}><Check size={13} /> Done</Btn>
        </div>
      )}

      {/* Spiral map + side legend */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 420px", minWidth: 300 }}>
          <GalaxySpiral galaxy={galaxy} selectedId={selectedId} onSelect={setSelectedId} claimFactionId={claimFactionId} onToggleClaim={toggleClaim} showGrid={showGrid} onMove={moveSystem} isDM={isDM} highlightIds={matchIds} />
          <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 6, textAlign: "center" }}>{isDM ? <>Drag any system to reposition it{showGrid ? " — snaps to the grid" : ""}. Dashed nodes are hidden from players.</> : "Tap a system to view its worlds."}</div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 260, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Factions */}
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Galactic Factions</div>
              <div style={{ flex: 1 }} />
              {isDM && <Btn size="sm" onClick={addFaction}><Plus size={12} /> Faction</Btn>}
            </div>
            {visibleFactions.length === 0 ? (
              <div style={{ fontSize: 11, color: COLORS.dim }}>{isDM ? "No factions yet. Add one, then claim systems as its territory — planets keep their own local governors." : "No known factions control this region."}</div>
            ) : visibleFactions.map(f => {
              const count = (isDM ? galaxy.systems : visibleSystems).filter(s => s.factionId === f.id).length;
              const claiming = claimFactionId === f.id;
              return (
                <div key={f.id} style={{ padding: "6px 0", borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {isDM
                      ? <input type="color" value={f.color} onChange={e => updateFaction(f.id, { color: e.target.value })} title="Faction color" style={{ width: 20, height: 20, padding: 0, border: "none", background: "transparent", cursor: "pointer", flexShrink: 0 }} />
                      : <div style={{ width: 14, height: 14, borderRadius: 4, background: f.color, flexShrink: 0 }} />}
                    {isDM
                      ? <input value={f.name} onChange={e => updateFaction(f.id, { name: e.target.value })} style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", color: COLORS.text, fontWeight: 600, fontSize: 12.5, outline: "none" }} />
                      : <span style={{ flex: 1, minWidth: 0, color: COLORS.text, fontWeight: 600, fontSize: 12.5 }}>{f.name}</span>}
                    <span style={{ fontSize: 10, color: COLORS.dim, whiteSpace: "nowrap" }}>{count} sys</span>
                    {isDM && <Btn size="sm" variant={claiming ? "gold" : "ghost"} onClick={() => setClaimFactionId(claiming ? null : f.id)} title="Claim territory">{claiming ? <Check size={12} /> : <MapPin size={12} />}</Btn>}
                    {isDM && <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete faction (frees its systems)" onConfirm={() => removeFaction(f.id)}><Trash2 size={12} /></ConfirmBtn>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <TrendingUp size={11} color={COLORS.purple} />
                    <span style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>Influence</span>
                    {isDM
                      ? <input type="number" value={f.influence || 0} onChange={e => updateFaction(f.id, { influence: Math.max(0, +e.target.value || 0) })} title="Faction Influence treasury — set an exact amount (keep it scarce)" style={{ width: 58, background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.purple, fontWeight: 700, fontSize: 12, fontFamily: FONTS.mono, textAlign: "center", outline: "none", padding: "2px 4px" }} />
                      : <span style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 12, color: COLORS.purple }}>{f.influence || 0}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          {/* System legend */}
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, maxHeight: 360, overflowY: "auto" }}>
            <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Systems</div>
            {visibleSystems.length === 0 && <div style={{ fontSize: 11, color: COLORS.dim }}>Nothing charted yet — explore to reveal systems.</div>}
            {visibleSystems.map(sys => {
              const fac = factionOf(sys.factionId);
              const sel = sys.id === selectedId;
              const hidden = isDM && !sys.discovered;
              const nomatch = matchIds && !matchIds.has(sys.id);   // filtered out
              const hit = matchIds && matchIds.has(sys.id);
              return (
                <div key={sys.id} onClick={() => (isDM && claimFactionId) ? toggleClaim(sys.id) : setSelectedId(sys.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 6px", borderRadius: 6, cursor: "pointer", background: sel ? `${COLORS.gold}14` : hit ? `${COLORS.blue}16` : "transparent", opacity: nomatch ? 0.25 : (hidden ? 0.5 : 1) }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", flexShrink: 0, background: hidden ? "#5a6376" : (fac?.color || sys.star.color), boxShadow: `0 0 6px ${(hidden ? "#5a6376" : (fac?.color || sys.star.color))}aa` }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: sel ? COLORS.gold : COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sys.name.replace(/ System$/, "")}</div>
                    <div style={sysStat}>{sys.planets.length} planet{sys.planets.length === 1 ? "" : "s"}{fac ? ` · ${fac.name}` : ""}</div>
                  </div>
                  {sys.planets.some(p => p.id === partyHomeId) && <HomeIcon size={12} style={{ color: COLORS.gold, flexShrink: 0 }} />}
                  {isDM && <button onClick={e => { e.stopPropagation(); revealSystem(sys.id, !sys.discovered); }} title={sys.discovered ? "Revealed to players — click to hide" : "Hidden from players — click to reveal"} style={{ background: "transparent", border: "none", cursor: "pointer", color: sys.discovered ? COLORS.gold : COLORS.dim, flexShrink: 0, display: "flex" }}>{sys.discovered ? <Radio size={13} /> : <ShieldHalf size={13} />}</button>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected system — brief info; "Enter System" drops to solar-system level */}
      <div style={{ marginTop: 16 }}>
        {selected ? (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: factionOf(selected.factionId)?.color || selected.star.color, boxShadow: `0 0 10px ${(factionOf(selected.factionId)?.color || selected.star.color)}aa` }} />
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 15 }}>{selected.name.replace(/ System$/, "")}</div>
              <span style={{ fontSize: 11, color: COLORS.dim }}>{selected.star.type} · {selected.planets.length} planet{selected.planets.length === 1 ? "" : "s"}</span>
              {factionOf(selected.factionId) && <Tag color={factionOf(selected.factionId).color}>{factionOf(selected.factionId).name} territory</Tag>}
              {isDM && !selected.discovered && <Tag color={COLORS.dim}>Hidden from players</Tag>}
              <div style={{ flex: 1 }} />
              {isDM && (partyInSystem(selected)
                ? <Tag color={COLORS.blue}>◈ Party is here</Tag>
                : <Btn size="sm" variant="blue" onClick={() => flyPartyTo(selected)}><Rocket size={13} /> Fly party here</Btn>)}
              <Btn size="sm" variant="gold" onClick={() => setEntered(true)}><Orbit size={13} /> Enter System</Btn>
              {isDM && <Btn size="sm" variant={selected.discovered ? "gold" : "default"} onClick={() => revealSystem(selected.id, !selected.discovered)}>{selected.discovered ? <><Radio size={12} /> Revealed</> : <><ShieldHalf size={12} /> Reveal</>}</Btn>}
              <Btn size="sm" variant="ghost" onClick={() => setSelectedId(null)}><X size={14} /></Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
              {selected.planets.map(p => { const c = planetClass(p.class || p.biome); return (
                <div key={p.id} onClick={() => setEntered(true)} title="Enter the system to manage this world" style={{ cursor: "pointer", background: COLORS.panel2, border: `1px solid ${p.id === partyHomeId ? COLORS.gold + "88" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 30% 30%, ${c.color}, ${COLORS.panel})`, boxShadow: `0 0 6px ${c.color}66` }} />
                    <span style={{ fontWeight: 700, fontSize: 12.5, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                    {p.id === partyHomeId && <HomeIcon size={11} style={{ color: COLORS.gold, flexShrink: 0 }} />}
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 3 }}>
                    <Tag color={c.color}>{p.class || p.biome}</Tag>
                    <Tag color={habColor(p.habitability || c.hab)}>{p.habitability || c.hab}</Tag>
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.dim, fontFamily: FONTS.mono }}>{p.gravity ?? "—"}g · {p.economy !== "Uninhabited" ? p.economy : "Uninhabited"}</div>
                </div>
              ); })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 16px", color: COLORS.dim, fontSize: 12.5, border: `1px dashed ${COLORS.border}`, borderRadius: 10 }}>
            Select a system — on the spiral or in the legend — to see its worlds, then <b style={{ color: COLORS.gold }}>Enter System</b> to manage them.
          </div>
        )}
      </div>
    </div>
  );
}

export {
  PlanetCard,
  GalaxyForge,
  GalaxySpiral,
  NewSystemModal,
  SolarSystemView,
  GALAXY_FILTERS,
  galaxyFilter,
  SKIP_VALUES,
  galaxyFilterValues,
  systemMatchesFilter,
  GalaxyMap,
};
