import React, { useMemo, useState } from "react";
import { Dices, Plus, X } from "lucide-react";
import { ANTAGONIST_DATA } from "../../data/npc-data.js";
import { ENCOUNTER_DIFFICULTIES, partySummary, rollEncounter } from "../../engine/encounters.js";
import { Btn, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

const TIER_COLOR = { General: COLORS.blue, Elite: COLORS.gold, Iconic: COLORS.red };
const label = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 };

/* ===== Random encounter roller =====
   Rolls a fight from the Roster of FighterZ sized to the party, previews it
   and rerolls until the DM likes it. onAdd receives [{ book, qty }]. */
function EncounterRoller({ chars, onAdd, onClose }) {
  const party = useMemo(() => partySummary(chars), [chars]);
  const [size, setSize] = useState(party.size);
  const [avgLevel, setAvgLevel] = useState(party.avgLevel);
  const [difficulty, setDifficulty] = useState("standard");
  const [saga, setSaga] = useState("");
  const sagas = useMemo(() => [...new Set(ANTAGONIST_DATA.map(b => b.saga).filter(Boolean))], []);
  const reroll = (patch = {}) => rollEncounter(ANTAGONIST_DATA, { size, avgLevel, difficulty, saga, ...patch });
  const [result, setResult] = useState(() => reroll());
  // Changing a setting rolls again with it.
  const change = (setter, key) => (v) => { setter(v); setResult(reroll({ [key]: v })); };
  const bodies = result.picks.reduce((n, p) => n + p.qty, 0);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Random encounter</span>
        <Btn size="sm" variant="ghost" onClick={onClose} aria-label="Close"><X size={14}/></Btn>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <div><div style={label}>Players</div>
          <TextInput type="number" min={1} max={12} value={size} onChange={e => change(setSize, "size")(Math.max(1, +e.target.value || 1))} style={{ width: 70 }} /></div>
        <div><div style={label}>Avg level</div>
          <TextInput type="number" min={1} max={20} value={avgLevel} onChange={e => change(setAvgLevel, "avgLevel")(Math.min(20, Math.max(1, +e.target.value || 1)))} style={{ width: 70 }} /></div>
        <div><div style={label}>Difficulty</div>
          <Select value={difficulty} onChange={e => change(setDifficulty, "difficulty")(e.target.value)}>
            {ENCOUNTER_DIFFICULTIES.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
          </Select></div>
        <div><div style={label}>Saga</div>
          <Select value={saga} onChange={e => change(setSaga, "saga")(e.target.value)}>
            <option value="">Any saga</option>
            {sagas.map(s => <option key={s} value={s}>{s}</option>)}
          </Select></div>
      </div>
      {result.picks.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5 }}>Nothing in the roster matches.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {result.picks.map(({ book, qty }) => (
            <div key={book.name} style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "7px 10px" }}>
              <span style={{ fontFamily: FONTS.mono, fontWeight: 700, color: COLORS.gold, minWidth: 26 }}>{qty}×</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{book.name}</span>
              <Tag color={TIER_COLOR[book.tier] || COLORS.blue}>{book.tier}</Tag>
              <span style={{ color: COLORS.dim, fontSize: 11.5 }}>Lv {book.antagonistLevel} · {book.hp} HP · AC {book.ac}</span>
              <div style={{ flex: 1 }} />
              <span style={{ color: COLORS.dim, fontSize: 11 }}>{book.group}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ color: COLORS.dim, fontSize: 11.5, marginTop: 8 }}>
        Antagonist tier {result.tier} · threat {result.spent} of {result.budget} (a General is 1, an Elite 2, an Iconic 4; the book gives no budget, so this is the app's guide)
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Btn onClick={() => setResult(reroll())}><Dices size={14}/> Reroll</Btn>
        <Btn variant="gold" disabled={!bodies} onClick={() => onAdd(result.picks)}><Plus size={14}/> Add {bodies} to encounter</Btn>
      </div>
    </div>
  );
}

export { EncounterRoller };
