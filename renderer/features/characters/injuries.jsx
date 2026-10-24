import React, { useState } from "react";
import { Syringe, Dices, Plus, Trash2, X } from "lucide-react";
import { logSession } from "../../app/bus.js";
import { BODY_PARTS, addInjuriesPatch, bodyMarks, healInjuryPatch, injuryLine, partByKey, partLabel, rollCritInjury, rollLingeringInjury } from "../../engine/injuries.js";
import { uid } from "../../lib/dice.js";
import { useHouseRules } from "../../state/hooks.js";
import { Btn, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ===== Injuries on the Vitals body model =====
   InjuryOverlay draws on top of BodyFigure (same viewBox and transform):
   a pulsing mark for each open injury, a stitched scar for each healed
   serious one, and a severed or patched look for lost limbs and eyes.
   InjuriesCard lists them, rolls the injury tables, and heals them. */

const FIG = "translate(24,2) scale(1.05)";
// Where a lost limb is cut, and the box below the cut that goes dark.
const SEVER = {
  armR: { cut: [48, 206, 82, 200], box: "M46 204 L84 198 L84 266 L46 266 Z" },
  armL: { cut: [158, 200, 192, 206], box: "M156 198 L194 204 L194 266 L156 266 Z" },
  legR: { cut: [90, 352, 122, 352], box: "M80 352 L122 352 L122 424 L80 424 Z" },
  legL: { cut: [118, 352, 150, 352], box: "M118 352 L160 352 L160 424 L118 424 Z" },
  tail: { cut: [150, 228, 170, 244], box: "" },
};

function scarPath(x, y, i) {
  const ox = x - 13 + ((i * 7) % 12) - 3, oy = y - 2 + ((i * 13) % 22) - 11;
  const tilt = i % 2 ? -1 : 1;
  return { line: `M${ox} ${oy} l8 ${4 * tilt} l8 ${-4 * tilt} l8 ${4 * tilt}`, stitches: [0, 8, 16].map(dx => `M${ox + dx + 4} ${oy - 4 + 2 * tilt} l0 8`) };
}

function InjuryOverlay({ char, selected, onSelect }) {
  const marks = bodyMarks(char);
  return (
    <svg viewBox="0 0 300 460" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-label="Injuries on the body">
      <g transform={FIG}>
        {BODY_PARTS.map(p => {
          const m = marks[p.key];
          const isSel = selected === p.key;
          const open = m.injuries.length;
          const serious = m.injuries.some(i => i.serious);
          if (p.key === "tail" && !open && !m.scars.length && !isSel) return null;
          return (
            <g key={p.key} onClick={() => onSelect && onSelect(isSel ? null : p.key)} style={{ cursor: "pointer" }} role="button" aria-label={`${p.label}: ${open} injur${open === 1 ? "y" : "ies"}, ${m.scars.length} scar${m.scars.length === 1 ? "" : "s"}`}>
              <circle cx={p.x} cy={p.y} r="22" fill="transparent" stroke={isSel ? COLORS.gold : "transparent"} strokeDasharray="3 3" strokeWidth="1.2" />
              {m.lost === "limb" && SEVER[p.key] && (
                <g>
                  {SEVER[p.key].box && <path d={SEVER[p.key].box} fill={COLORS.panel2} fillOpacity="0.92" stroke={COLORS.red} strokeOpacity="0.5" strokeDasharray="3 3" strokeWidth="1" />}
                  <path d={`M${SEVER[p.key].cut[0]} ${SEVER[p.key].cut[1]} L${SEVER[p.key].cut[2]} ${SEVER[p.key].cut[3]}`} stroke={COLORS.red} strokeWidth="3" strokeLinecap="round" />
                </g>
              )}
              {m.lost === "eye" && <g><path d={`M${p.x - 22} ${p.y - 12} L${p.x + 20} ${p.y - 1}`} stroke={COLORS.text} strokeOpacity="0.8" strokeWidth="1.6" /><ellipse cx={p.x - 8} cy={p.y - 5} rx="8" ry="6" fill={COLORS.bg} stroke={COLORS.text} strokeOpacity="0.85" strokeWidth="1.6" /></g>}
              {m.scars.map((s, i) => {
                const sp = scarPath(p.x, p.y, i + open);
                return (
                  <g key={s.id} stroke={COLORS.text} strokeOpacity="0.8" fill="none" strokeLinecap="round">
                    <path d={sp.line} strokeWidth="2.4" />
                    {sp.stitches.map((st, j) => <path key={j} d={st} strokeWidth="1.3" />)}
                  </g>
                );
              })}
              {open > 0 && (
                <g>
                  <circle cx={p.x} cy={p.y} r={serious ? 12 : 8} fill={COLORS.red} fillOpacity="0.35">
                    <animate attributeName="r" values={serious ? "10;18;10" : "7;12;7"} dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.45;0.1;0.45" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={p.x} cy={p.y} r={serious ? 6.5 : 4.5} fill={serious ? COLORS.red : COLORS.amber} stroke={COLORS.bg} strokeWidth="1.2" />
                  {open > 1 && <text x={p.x + 11} y={p.y - 9} fontSize="12" fontWeight="700" fill={COLORS.red} fontFamily="sans-serif">{open}</text>}
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function InjuryRow({ inj, onHeal, onRemove, onUpdate }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${inj.serious ? COLORS.red : COLORS.amber}`, borderRadius: 6, padding: "6px 8px" }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <button onClick={() => setOpen(!open)} aria-expanded={open} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: inj.serious ? COLORS.red : COLORS.amber, fontWeight: 700, fontSize: 13, textAlign: "left", flex: 1, minWidth: 0 }}>
          {inj.name}
        </button>
        {inj.serious && <Tag color={COLORS.red}>Serious</Tag>}
      </div>
      {inj.effect && <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 3 }}>{inj.effect}</div>}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
        <Select value={inj.location || "torso"} onChange={e => onUpdate({ location: e.target.value })} aria-label={`Where is ${inj.name}`} style={{ flex: 1, minWidth: 0, padding: "4px 6px", fontSize: 12 }}>
          {BODY_PARTS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
        </Select>
        <Btn size="sm" onClick={onHeal} title={inj.serious || inj.scar ? "Heal it. A serious injury leaves a scar." : "Heal it"} style={{ color: COLORS.green }}><Syringe size={12} /> Heal</Btn>
        <button onClick={onRemove} aria-label={`Remove ${inj.name} without a scar`} title="Remove (no scar)" style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 8 }}><Trash2 size={15} /></button>
      </div>
      {open && (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
          {inj.heal && <div style={{ fontSize: 11, color: COLORS.dim }}><b style={{ color: COLORS.green }}>Heals:</b> {inj.heal}</div>}
          {inj.source && <div style={{ fontSize: 10.5, color: COLORS.dim, fontFamily: FONTS.mono }}>{inj.source}{inj.roll ? ` · rolled ${inj.roll} on ${inj.die}` : ""}{inj.festering && inj.maxHpLost ? ` · −${inj.maxHpLost} Max HP so far` : ""}</div>}
          <TextInput value={inj.notes || ""} onChange={e => onUpdate({ notes: e.target.value })} placeholder="Notes" style={{ fontSize: 11.5 }} />
        </div>
      )}
    </div>
  );
}

function InjuriesCard({ char, set, selected, onSelect }) {
  const [hr] = useHouseRules();
  const injuries = char.injuries || [];
  const scars = char.scars || [];
  const [name, setName] = useState("");
  const [where, setWhere] = useState("any");
  const shown = selected ? injuries.filter(i => i.location === selected) : injuries;
  const shownScars = selected ? scars.filter(s => s.location === selected) : scars;
  const locKey = selected ? (partByKey(selected) || {}).group : where;
  // Rolls on a part keep that part: the group picks the table, the part the spot.
  const pin = (inj) => (inj && selected && !inj.lost && inj.location !== selected ? { ...inj, location: selected } : inj);
  const add = (list, label) => {
    const got = list.filter(Boolean);
    if (!got.length) return;
    set(addInjuriesPatch(char, got));
    logSession(`${char.name} ${label}: ${got.map(injuryLine).join(", ")}`, char.name);
  };
  const rollLingering = () => add([pin(rollLingeringInjury({ location: locKey }))], "rolls a Lingering Injury");
  const rollCrit = () => add([pin(rollCritInjury({ location: locKey, rows: hr.critInjuryRows || undefined }))], "takes a Crit Injury");
  const addCustom = () => {
    const n = name.trim(); if (!n) return;
    set(addInjuriesPatch(char, [{ id: uid(), name: n, location: selected || "torso", serious: false, effect: "", notes: "" }]));
    setName("");
  };
  const upd = (id, patch) => set({ injuries: injuries.map(x => x.id === id ? { ...x, ...patch } : x) });
  const heal = (id) => { const p = healInjuryPatch(char, id); if (p) set(p); };
  const remove = (id) => set({ injuries: injuries.filter(x => x.id !== id) });
  const head = { fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ ...head, flex: 1 }}>Injuries{selected ? ` · ${partLabel(selected)}` : ""}</div>
        {selected && <Btn size="sm" variant="ghost" onClick={() => onSelect(null)} title="Show the whole body"><X size={12} /> {partLabel(selected)}</Btn>}
      </div>
      {shown.length === 0 ? <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>{selected ? "Nothing here." : "No injuries. Tap a body part to see what's there."}</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          {shown.map(x => <InjuryRow key={x.id} inj={x} onHeal={() => heal(x.id)} onRemove={() => remove(x.id)} onUpdate={patch => upd(x.id, patch)} />)}
        </div>
      )}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
        {!selected && (
          <Select value={where} onChange={e => setWhere(e.target.value)} aria-label="Where the hit landed" style={{ width: 104, padding: "4px 6px", fontSize: 12 }}>
            {[["any", "Roll spot"], ["head", "Head"], ["body", "Body"], ["arms", "Arms"], ["legs", "Legs"]].map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        )}
        <Btn size="sm" onClick={rollCrit} title="Roll the Crit Injury table for this spot"><Dices size={12} /> Crit Injury</Btn>
        <Btn size="sm" onClick={rollLingering} title="Roll the book's Lingering Injury table (Crippled)"><Dices size={12} /> Lingering Injury</Btn>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder={`Add an injury${selected ? ` to the ${partLabel(selected).toLowerCase()}` : ""}…`} onKeyDown={e => { if (e.key === "Enter") addCustom(); }} />
        <Btn size="sm" onClick={addCustom}><Plus size={12} /> Add</Btn>
      </div>
      {shownScars.length > 0 && (
        <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
          <div style={{ ...head, marginBottom: 6 }}>Scars</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {shownScars.map(s => <Tag key={s.id} color={COLORS.muted} onRemove={() => set({ scars: scars.filter(x => x.id !== s.id) })}>{partLabel(s.location)}: {s.from}</Tag>)}
          </div>
        </div>
      )}
    </div>
  );
}

export { InjuryOverlay, InjuriesCard };
