import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Upload, X } from "lucide-react";
import { useLocalOption } from "../../app/App.jsx";
import { activeForms } from "../../engine/core.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, LoadingBlock, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { miniBtnStyle } from "./combat-parts.jsx";

// Tactical battle map. Tokens come from the initiative tracker; drag to move on
// the X/Y plane, and each carries an altitude for flight. Positions live on the
// combatant so the whole table sees the same board.
const MAP_COLS = 22, MAP_ROWS = 14, MAP_CELL = 30;

// Load an image file and downscale it so its longest side is <= maxDim, returning
// a data URL. Keeps an imported World Anvil map small enough to sync to every
// player through the shared world. PNG keeps transparency; everything else is
// re-encoded as JPEG to shrink it.
function fileToScaledDataURL(file, maxDim, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale)), h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const png = /\.png$/i.test(file.name || "");
      try { cb(canvas.toDataURL(png ? "image/png" : "image/jpeg", 0.85)); } catch { cb(null); }
    };
    img.onerror = () => cb(null);
    img.src = reader.result;
  };
  reader.onerror = () => cb(null);
  reader.readAsDataURL(file);
}

function MapTab() {
  const [state, persist] = useSharedList("session_combat");
  const [chars] = useSharedList("characters_v2");
  const [npcs] = useSharedList("npcs_v2");
  const [mapState, persistMap] = useSharedList("session_map");   // backdrop, kept apart from tokens so drags don't rewrite it
  const [selId, setSelId] = useState(null);
  const [dragPos, setDragPos] = useState(null);   // {id, x, y} live drag position
  const svgRef = useRef(null);
  const fileRef = useRef(null);
  if (state === null) return <LoadingBlock />;
  const map = (mapState && mapState[0]) || {};
  const bg = map.img || null;
  const bgFit = map.fit || "contain";
  const bgOpacity = map.opacity != null ? map.opacity : 0.65;
  const onPickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    fileToScaledDataURL(f, 2000, (url) => { if (url) persistMap([{ ...map, img: url, opacity: bgOpacity, fit: bgFit }]); });
  };
  const data = (state && state[0]) || { round: 1, turn: 0, combatants: [] };
  const combatants = data.combatants || [];
  // A token reflects the linked fighter's active form: its aura colors the token,
  // and gigantification (Great Ape and the like) grows it.
  const srcOf = (c) => { if (!c.sourceId) return null; const list = c.sourceType === "player" ? (chars || []) : (npcs || []); return list.find(e => e.id === c.sourceId) || null; };
  const tokenInfo = (c) => {
    const src = srcOf(c);
    const forms = src ? activeForms(src) : [];
    const form = forms[0] || null;
    const giga = forms.reduce((s, f) => s + (Number(f.giga) || 0), 0);
    return { form, giga, color: form && form.auraColor ? form.auraColor : (c.sourceType === "player" ? COLORS.blue : c.sourceType === "npc" ? COLORS.red : COLORS.muted) };
  };
  const save = (patch) => persist([{ ...data, ...patch }]);
  const setPos = (id, x, y) => save({ combatants: combatants.map(c => c.id === id ? { ...c, mapX: Math.max(0, Math.min(MAP_COLS - 1, x)), mapY: Math.max(0, Math.min(MAP_ROWS - 1, y)) } : c) });
  const setAlt = (id, alt) => save({ combatants: combatants.map(c => c.id === id ? { ...c, alt: Math.max(0, alt) } : c) });
  const posOf = (c, i) => (dragPos && dragPos.id === c.id) ? { x: dragPos.x, y: dragPos.y }
    : { x: c.mapX != null ? c.mapX : (1 + (i % (MAP_COLS - 2))), y: c.mapY != null ? c.mapY : (1 + Math.floor(i / (MAP_COLS - 2))) };
  const cellFromEvent = (e) => { const r = svgRef.current.getBoundingClientRect(); return { x: Math.max(0, Math.min(MAP_COLS - 1, Math.floor((e.clientX - r.left) / MAP_CELL))), y: Math.max(0, Math.min(MAP_ROWS - 1, Math.floor((e.clientY - r.top) / MAP_CELL))) }; };
  const onMove = (e) => { if (dragPos) { const p = cellFromEvent(e); setDragPos({ id: dragPos.id, ...p }); } };
  const onUp = () => { if (dragPos) { setPos(dragPos.id, dragPos.x, dragPos.y); setDragPos(null); } };
  const sel = combatants.find(c => c.id === selId);
  const W = MAP_COLS * MAP_CELL, H = MAP_ROWS * MAP_CELL;
  const tokColor = (c) => c.sourceType === "player" ? COLORS.blue : c.sourceType === "npc" ? COLORS.red : COLORS.muted;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onPickFile} />
        <Btn size="sm" onClick={() => fileRef.current && fileRef.current.click()}><Upload size={13} /> {bg ? "Replace map" : "Import map image"}</Btn>
        {bg && (<>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Fit</span>
          <Select value={bgFit} onChange={e => persistMap([{ ...map, fit: e.target.value }])} style={{ width: 100 }}>
            <option value="contain">Fit</option>
            <option value="cover">Fill</option>
            <option value="stretch">Stretch</option>
          </Select>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Opacity</span>
          <input type="range" min="20" max="100" value={Math.round(bgOpacity * 100)} onChange={e => persistMap([{ ...map, opacity: (+e.target.value) / 100 }])} style={{ width: 90 }} />
          <Btn size="sm" variant="ghost" onClick={() => persistMap([{ ...map, img: null }])}><X size={13} /> Remove</Btn>
        </>)}
        <span style={{ fontSize: 11, color: COLORS.dim }}>Export your map from World Anvil, then import the image here.</span>
      </div>
      <div style={{ overflowX: "auto", border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.panel2, marginBottom: 12 }}>
        <svg ref={svgRef} width={W} height={H} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} style={{ display: "block", userSelect: "none" }}>
          {bg && <image href={bg} x={0} y={0} width={W} height={H} preserveAspectRatio={bgFit === "stretch" ? "none" : bgFit === "cover" ? "xMidYMid slice" : "xMidYMid meet"} opacity={bgOpacity} style={{ pointerEvents: "none" }} />}
          {Array.from({ length: MAP_COLS + 1 }).map((_, i) => <line key={"v" + i} x1={i * MAP_CELL} y1={0} x2={i * MAP_CELL} y2={H} stroke={COLORS.border} strokeWidth={0.5} strokeOpacity={bg ? 0.35 : 1} />)}
          {Array.from({ length: MAP_ROWS + 1 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * MAP_CELL} x2={W} y2={i * MAP_CELL} stroke={COLORS.border} strokeWidth={0.5} strokeOpacity={bg ? 0.35 : 1} />)}
          {combatants.map((c, i) => {
            const p = posOf(c, i); const cx = p.x * MAP_CELL + MAP_CELL / 2, cy = p.y * MAP_CELL + MAP_CELL / 2;
            const { form, giga, color } = tokenInfo(c); const alt = c.alt || 0; const on = c.id === selId;
            const r = Math.min((MAP_CELL / 2 - 5) + giga * MAP_CELL * 0.5, MAP_CELL * 2.2);
            const fs = Math.min(10 + giga * 2, 20);
            return (
              <g key={c.id} onMouseDown={(e) => { e.preventDefault(); setSelId(c.id); setDragPos({ id: c.id, x: p.x, y: p.y }); }} style={{ cursor: "grab" }}>
                {alt > 0 && <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={color} strokeWidth={1} strokeDasharray="2 2" opacity={0.6} />}
                <circle cx={cx} cy={cy} r={r} fill={color} stroke={on ? COLORS.gold : "#0b0e17"} strokeWidth={on ? 2.5 : 1.5} />
                <text x={cx} y={cy + fs / 3} textAnchor="middle" fontSize={fs} fontWeight="700" fill="#0b0e17">{(c.name || "?").slice(0, 2)}</text>
                {alt > 0 && <text x={cx} y={cy - r - 3} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">↑{alt}</text>}
                {form && <text x={cx} y={cy + r + 11} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">{form.name}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      {sel ? (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700 }}>{sel.name}</span>
          <Tag color={tokColor(sel)}>{sel.sourceType || "token"}</Tag>
          {(() => { const ti = tokenInfo(sel); return (<>
            {ti.form && <Tag color={ti.color}>{ti.form.name}</Tag>}
            {ti.giga > 0 && <Tag color={COLORS.amber}>Giant +{ti.giga}</Tag>}
          </>); })()}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Altitude</span>
            <button onClick={() => setAlt(sel.id, (sel.alt || 0) - 1)} style={miniBtnStyle}><Minus size={13} /></button>
            <TextInput type="number" value={sel.alt || 0} onChange={e => setAlt(sel.id, +e.target.value || 0)} style={{ width: 56, textAlign: "center" }} />
            <button onClick={() => setAlt(sel.id, (sel.alt || 0) + 1)} style={miniBtnStyle}><Plus size={13} /></button>
          </div>
          <Btn size="sm" variant="ghost" onClick={() => setSelId(null)}>Deselect</Btn>
        </div>
      ) : (
        <div style={{ fontSize: 12, color: COLORS.dim }}>{combatants.length ? "Drag a token to move it on the ground. Click a token to set its altitude for flight." : "Add fighters in the Initiative tab and they appear here as tokens."}</div>
      )}
    </div>
  );
}

// A slide out battle map. The side arrow is a fixed pull tab shown across
// Players, NPCs and Session so the board is one click away from anywhere.
function MapDrawer() {
  const [ui, setUi] = useLocalOption("sdndbz_map_drawer", { open: false });
  const open = ui.open;
  const width = 760;
  return (
    <>
      <button onClick={() => setUi({ open: !open })} title="Battle map"
        style={{ position: "fixed", top: "50%", right: open ? width : 0, transform: "translateY(-50%)", zIndex: 60, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRight: "none", borderRadius: "10px 0 0 10px", color: COLORS.gold, cursor: "pointer", padding: "16px 7px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "right .25s ease", maxWidth: "8vw" }}>
        {open ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        <span style={{ writingMode: "vertical-rl", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>MAP</span>
      </button>
      <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width, maxWidth: "94vw", background: COLORS.bg, borderLeft: `1px solid ${COLORS.border}`, zIndex: 59, transform: `translateX(${open ? 0 : 100}%)`, transition: "transform .25s ease", boxShadow: open ? "-10px 0 34px rgba(0,0,0,.45)" : "none", overflowY: "auto", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 16, color: COLORS.gold, letterSpacing: 1 }}>BATTLE MAP</span>
          <Btn size="sm" variant="ghost" onClick={() => setUi({ open: false })}><X size={16} /></Btn>
        </div>
        {open && <MapTab />}
      </div>
    </>
  );
}

export {
  MAP_COLS,
  MAP_ROWS,
  MAP_CELL,
  fileToScaledDataURL,
  MapTab,
  MapDrawer,
};
