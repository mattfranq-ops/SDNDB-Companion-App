import React, { useState } from "react";
import { AlarmClock, Dices, Plus, RotateCcw, Trash2 } from "lucide-react";
import { emitRoll, logSession } from "../../app/bus.js";
import { addDie, blankClock, dropDie, rollClock } from "../../engine/table-tools.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, ConfirmBtn, EmptyState, ErrorBanner, Field, LoadingBlock, Select, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ===== Clocks =====
   Dice-pool countdowns shared with the table: roll the pool when the trigger
   happens, lose the low dice, and the event fires when it's empty. */

function ClockCard({ clock, onChange, onRemove }) {
  const [editing, setEditing] = useState(!clock.title);
  const done = (clock.remaining || 0) === 0;
  const roll = () => {
    const r = rollClock(clock);
    onChange({ faces: r.faces, remaining: r.remaining });
    const title = clock.title || "Clock";
    emitRoll({ label: title, total: r.remaining, detail: `${r.dropped} dice dropped, ${r.remaining} left`, color: COLORS.purple });
    logSession(r.done ? `${title} ran out: ${clock.event || "the event fires"}` : `${title}: ${r.remaining} dice left`);
  };
  const tapDie = (i) => {
    const next = dropDie(clock, i);
    onChange(next);
    if (next.remaining === 0) logSession(`${clock.title || "Clock"} ran out: ${clock.event || "the event fires"}`);
  };
  const dice = Array.from({ length: clock.remaining || 0 }, (_, i) => clock.faces?.[i] ?? null);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${done ? COLORS.red : COLORS.border}`, borderRadius: 10, padding: 14 }}>
      {editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Field label="Title"><TextInput value={clock.title} onChange={e => onChange({ title: e.target.value })} placeholder="Red Ribbon reinforcements" /></Field>
          <Field label="Description"><TextArea value={clock.description} onChange={e => onChange({ description: e.target.value })} placeholder="What's counting down?" rows={2} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Field label="When it runs out"><TextInput value={clock.event} onChange={e => onChange({ event: e.target.value })} placeholder="The alarm sounds" /></Field>
            <Field label="Roll it when"><TextInput value={clock.trigger} onChange={e => onChange({ trigger: e.target.value })} placeholder="Someone fails a Stealth check" /></Field>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
            <Field label="Dice"><TextInput type="number" min={1} max={20} value={clock.dice} onChange={e => { const n = Math.max(1, Math.min(20, +e.target.value || 1)); onChange({ dice: n, remaining: n, faces: [] }); }} style={{ width: 70 }} /></Field>
            <Field label="Die"><Select value={clock.die} onChange={e => onChange({ die: +e.target.value, faces: [] })}>{[4, 6, 8, 10, 12].map(d => <option key={d} value={d}>d{d}</option>)}</Select></Field>
            <Field label="Lose dice that roll"><Select value={clock.dropOn} onChange={e => onChange({ dropOn: +e.target.value })}>
              <option value={0}>None (tap to remove)</option>
              {[1, 2, 3].map(n => <option key={n} value={n}>{n === 1 ? "1" : `1–${n}`}</option>)}
            </Select></Field>
            <Btn variant="gold" size="sm" onClick={() => setEditing(false)} style={{ marginBottom: 10 }}>Done</Btn>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AlarmClock size={16} color={done ? COLORS.red : COLORS.purple} />
            <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{clock.title || "Untitled clock"}</span>
            <Btn size="sm" variant="ghost" onClick={() => setEditing(true)}>Edit</Btn>
            <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete this clock" onConfirm={onRemove}><Trash2 size={13} /></ConfirmBtn>
          </div>
          {clock.description && <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 4 }}>{clock.description}</div>}
          {clock.trigger && <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>Roll it when: {clock.trigger}</div>}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "10px 0" }}>
            {dice.map((f, i) => (
              <button key={i} onClick={() => tapDie(i)} title="Tap to remove this die" aria-label={`Remove die ${i + 1}`}
                style={{ width: 34, height: 34, borderRadius: 7, border: `1px solid ${COLORS.purple}88`, background: `${COLORS.purple}1A`, color: COLORS.purple, fontFamily: FONTS.mono, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>{f ?? "·"}</button>
            ))}
            {done && <div style={{ color: COLORS.red, fontWeight: 700, fontSize: 13 }}>Out of time: {clock.event || "the event fires"}</div>}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <Btn size="sm" variant="gold" onClick={roll} disabled={done}><Dices size={13} /> Roll {clock.remaining}d{clock.die}</Btn>
            <Btn size="sm" onClick={() => onChange(addDie(clock))}><Plus size={13} /> Add die</Btn>
            <Btn size="sm" variant="ghost" onClick={() => onChange({ remaining: clock.dice, faces: [] })}><RotateCcw size={13} /> Reset</Btn>
          </div>
          <div style={{ fontSize: 11.5, color: COLORS.dim, marginTop: 6 }}>{clock.dropOn > 0 ? `Dice showing ${clock.dropOn === 1 ? "1" : `1–${clock.dropOn}`} are lost. Tap a die to remove one by hand.` : "Tap a die to remove it."}</div>
        </>
      )}
    </div>
  );
}

function ClocksTab() {
  const [clocks, persist, error] = useSharedList("session_clocks");
  if (clocks === null) return <LoadingBlock />;
  const update = (id, patch) => persist(clocks.map(c => c.id === id ? { ...c, ...patch } : c));
  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ marginBottom: 12 }}><Btn variant="gold" onClick={() => persist([...clocks, blankClock(uid())])}><Plus size={14} /> New clock</Btn></div>
      {clocks.length === 0 ? (
        <EmptyState icon={AlarmClock} title="No clocks" body="A clock is a pool of dice counting down to something: reinforcements, a bomb, the Saiyans landing. Roll it when the trigger happens." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 12 }}>
          {clocks.map(c => <ClockCard key={c.id} clock={c} onChange={(p) => update(c.id, p)} onRemove={() => persist(clocks.filter(x => x.id !== c.id))} />)}
        </div>
      )}
    </div>
  );
}

export { ClocksTab };
