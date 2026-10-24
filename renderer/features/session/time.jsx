import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Home as HomeIcon, Minus, Plus, X } from "lucide-react";
import { useLocalOption } from "../../state/local-options.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, Field, LoadingBlock, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { miniBtnStyle } from "./combat-parts.jsx";

function SessionDetailsTab() {
  const [details, persist] = useSharedList("session_details");
  const [universe] = useSharedList("universe");
  const d = details && details[0] ? details[0] : { title: "", recap: "", nextGoal: "" };
  if (details === null) return <LoadingBlock />;
  const save = (patch) => persist([{ ...d, ...patch }]);
  // Party home — set on a planet over in the Universe tab; shown here as the
  // table's current base of operations (placeholder tie-in).
  const galaxy = universe && universe[0];
  const homeEntry = galaxy?.partyHomePlanetId ? (galaxy.systems || []).flatMap(s => s.planets.map(p => ({ s, p }))).find(x => x.p.id === galaxy.partyHomePlanetId) : null;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ background: COLORS.panel2, border: `1px solid ${homeEntry ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: homeEntry ? 6 : 0 }}>
          <HomeIcon size={14} color={COLORS.gold} />
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Party Home</span>
        </div>
        {homeEntry ? (
          <div style={{ fontSize: 13 }}><b style={{ color: COLORS.gold }}>{homeEntry.p.name}</b> <span style={{ color: COLORS.dim }}>· {homeEntry.p.class || homeEntry.p.biome} · {homeEntry.s.name.replace(/ System$/, "")} System</span></div>
        ) : (
          <div style={{ fontSize: 11.5, color: COLORS.dim }}>No party home set. Pick a world in the <b style={{ color: COLORS.gold }}>Universe</b> tab → Enter System → “Set as Party Home”.</div>
        )}
      </div>
      <Field label="Session Title"><TextInput value={d.title} onChange={e => save({ title: e.target.value })} placeholder="e.g. Session 12 — Ambush on Konatsu" /></Field>
      <Field label="Recap"><TextArea value={d.recap} onChange={e => save({ recap: e.target.value })} style={{ minHeight: 100 }} /></Field>
      <Field label="Next Session Goal"><TextArea value={d.nextGoal} onChange={e => save({ nextGoal: e.target.value })} /></Field>
    </div>
  );
}

// Shared session clock + calendar. Tracks the in world day and time so the
// table stays in sync on when things happen.
const TIME_PHASE = (m) => { const h = m / 60; if (h < 5) return "Night"; if (h < 8) return "Dawn"; if (h < 11) return "Morning"; if (h < 14) return "Midday"; if (h < 17) return "Afternoon"; if (h < 20) return "Evening"; if (h < 22) return "Dusk"; return "Night"; };
// A common 12 month, 7 day calendar. The year reads as an Age (Dragon Ball style).
const CAL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CAL_MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CAL_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthLen = (m) => CAL_MDAYS[m - 1];
const normDate = (age, month, day) => {
  while (month > 12) { month -= 12; age += 1; }
  while (month < 1) { month += 12; age -= 1; }
  while (day > monthLen(month)) { day -= monthLen(month); month += 1; if (month > 12) { month = 1; age += 1; } }
  while (day < 1) { month -= 1; if (month < 1) { month = 12; age -= 1; } day += monthLen(month); }
  return { age: Math.max(0, age), month, day };
};
const weekdayOf = (age, month, day) => { const doy = CAL_MDAYS.slice(0, month - 1).reduce((a, b) => a + b, 0) + (day - 1); const abs = age * 365 + doy; return CAL_WEEKDAYS[(((abs % 7) + 7) % 7)]; };
const DEFAULT_TIME = { age: 762, month: 1, day: 1, minutes: 480, secs: 0 };
const readTime = (state) => (state && state[0] && state[0].month) ? { ...DEFAULT_TIME, ...state[0] } : { ...DEFAULT_TIME };
// Advance by a number of seconds, carrying into minutes, days, months and Age.
function advanceTime(t, addSeconds) {
  let secs = (t.secs || 0) + addSeconds;
  let minutes = (t.minutes || 0) + Math.floor(secs / 60);
  secs = ((secs % 60) + 60) % 60;
  let { age, month, day } = t;
  while (minutes >= 1440) { minutes -= 1440; day += 1; }
  while (minutes < 0) { minutes += 1440; day -= 1; }
  const n = normDate(age, month, day);
  return { age: n.age, month: n.month, day: n.day, minutes, secs };
}
const timeLabel = (t) => `${weekdayOf(t.age, t.month, t.day)}, ${CAL_MONTHS[t.month - 1]} ${t.day} · Age ${t.age} · ${String(Math.floor(t.minutes / 60)).padStart(2, "0")}:${String(t.minutes % 60).padStart(2, "0")} ${TIME_PHASE(t.minutes)}`;

function SessionClockTab() {
  const [state, persist] = useSharedList("session_time");
  if (state === null) return <LoadingBlock />;
  const t = readTime(state);
  const { age, month, day, minutes, secs } = t;
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  const advance = (mins) => persist([advanceTime(t, mins * 60)]);
  const setDate = (a, mo, d) => { const n = normDate(a, mo, d); persist([{ ...t, age: n.age, month: n.month, day: n.day }]); };
  const setClock = (mins) => persist([{ ...t, minutes: Math.max(0, Math.min(1439, mins)), secs: 0 }]);
  return (
    <div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 22, textAlign: "center", marginBottom: 16, background: `linear-gradient(180deg, ${COLORS.gold}0C, transparent)` }}>
        <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1.2 }}>{weekdayOf(age, month, day)}, {CAL_MONTHS[month - 1]} {day} · Age {age}</div>
        <div style={{ fontFamily: FONTS.display, fontSize: 50, fontWeight: 900, color: COLORS.gold, lineHeight: 1.1 }}>{hh}:{mm}<span style={{ fontSize: 26, color: COLORS.dim }}>:{ss}</span></div>
        <div style={{ fontSize: 13, color: COLORS.blue, fontWeight: 700, letterSpacing: 0.5 }}>{TIME_PHASE(minutes)}</div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(10)}>+10 min</Btn>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(60)}>+1 hour</Btn>
        <Btn style={{ fontSize: 12.5 }} onClick={() => advance(480)}>+8 hours (rest)</Btn>
        <Btn style={{ fontSize: 12.5 }} variant="gold" onClick={() => { const n = normDate(age, month, day + 1); persist([{ age: n.age, month: n.month, day: n.day, minutes: 480, secs: 0 }]); }}><ChevronRight size={13}/> Next day</Btn>
      </div>
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Age (year)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setDate(age - 1, month, day)} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={age} onChange={e => setDate(Math.max(0, +e.target.value || 0), month, day)} style={{ width: 70, textAlign: "center" }} />
            <button onClick={() => setDate(age + 1, month, day)} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Month</div>
          <Select value={month} onChange={e => { const mo = +e.target.value; setDate(age, mo, Math.min(day, monthLen(mo))); }} style={{ width: 130 }}>{CAL_MONTHS.map((n, i) => <option key={i} value={i + 1}>{n}</option>)}</Select>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Day</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setDate(age, month, day - 1)} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={day} onChange={e => setDate(age, month, Math.max(1, +e.target.value || 1))} style={{ width: 54, textAlign: "center" }} />
            <button onClick={() => setDate(age, month, day + 1)} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>Set time</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TextInput type="number" value={Math.floor(minutes / 60)} onChange={e => setClock(Math.min(23, Math.max(0, +e.target.value || 0)) * 60 + (minutes % 60))} style={{ width: 54, textAlign: "center" }} title="Hour" />
            <span style={{ color: COLORS.dim }}>:</span>
            <TextInput type="number" value={minutes % 60} onChange={e => setClock(Math.floor(minutes / 60) * 60 + Math.min(59, Math.max(0, +e.target.value || 0)))} style={{ width: 54, textAlign: "center" }} title="Minute" />
          </div>
        </div>
      </div>
    </div>
  );
}

const CAL_WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Swatches anyone can tag a calendar event with. Falls back to the shared/DM tint.
const EVENT_COLORS = [COLORS.blue, COLORS.gold, COLORS.green, COLORS.red, COLORS.purple, COLORS.amber];
// Absolute day index for ordering events across months and Ages.
const absDay = (age, month, day) => age * 365 + CAL_MDAYS.slice(0, month - 1).reduce((a, b) => a + b, 0) + day;

// A real month-grid calendar sitting on the shared clock. Players and the DM
// drop dated events on it; DM-only events stay hidden from players. Click a day
// to read it, add an event, or jump the world clock straight to that date.
function SessionCalendar() {
  const [timeState, persistTime] = useSharedList("session_time");
  const [events, persistEvents] = useSharedList("session_events");
  const [sessionView] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const [view, setView] = useState(null);      // {age, month} being browsed
  const [selDay, setSelDay] = useState(null);
  const [draft, setDraft] = useState("");
  const [draftDM, setDraftDM] = useState(false);
  const [draftColor, setDraftColor] = useState(EVENT_COLORS[0]);
  const [colorEditId, setColorEditId] = useState(null);   // event whose swatch tray is open
  if (timeState === null || events === null) return <LoadingBlock />;
  const isDM = sessionView.mode === "dm";
  const t = readTime(timeState);
  const vm = view || { age: t.age, month: t.month };
  const list = (events || []).filter(e => isDM || !e.dm);
  const evOf = (day) => list.filter(e => e.age === vm.age && e.month === vm.month && e.day === day).sort((a, b) => (a.dm === b.dm ? 0 : a.dm ? 1 : -1));
  const firstIdx = CAL_WEEKDAYS.indexOf(weekdayOf(vm.age, vm.month, 1));
  const days = monthLen(vm.month);
  const cells = [...Array(Math.max(0, firstIdx)).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const isToday = (d) => vm.age === t.age && vm.month === t.month && d === t.day;
  const shiftMonth = (dir) => { let m = vm.month + dir, a = vm.age; if (m > 12) { m = 1; a++; } if (m < 1) { m = 12; a--; } setView({ age: Math.max(0, a), month: m }); setSelDay(null); };
  const addEvent = () => { if (!selDay || !draft.trim()) return; persistEvents([...(events || []), { id: uid(), age: vm.age, month: vm.month, day: selDay, title: draft.trim(), dm: draftDM, color: draftColor }]); setDraft(""); setDraftDM(false); };
  const delEvent = (id) => persistEvents((events || []).filter(e => e.id !== id));
  const setEventColor = (id, color) => { persistEvents((events || []).map(e => e.id === id ? { ...e, color } : e)); setColorEditId(null); };
  const jumpTo = (d) => persistTime([{ ...t, age: vm.age, month: vm.month, day: d }]);
  const nowAbs = absDay(t.age, t.month, t.day);
  const upcoming = list.filter(e => absDay(e.age, e.month, e.day) >= nowAbs).sort((a, b) => absDay(a.age, a.month, a.day) - absDay(b.age, b.month, b.day)).slice(0, 6);
  const evColor = (e) => e.color || (e.dm ? COLORS.gold : COLORS.blue);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <CalendarDays size={16} color={COLORS.gold} />
        <button onClick={() => shiftMonth(-1)} style={miniBtnStyle}><ChevronLeft size={14} /></button>
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 15, minWidth: 190, textAlign: "center" }}>{CAL_MONTHS[vm.month - 1]} · Age {vm.age}</span>
        <button onClick={() => shiftMonth(1)} style={miniBtnStyle}><ChevronRight size={14} /></button>
        <Btn size="sm" variant="ghost" onClick={() => { setView({ age: t.age, month: t.month }); setSelDay(t.day); }}>Today</Btn>
        <div style={{ flex: 1 }} />
        {isDM && <Tag color={COLORS.gold}>DM view · sees hidden events</Tag>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {CAL_WEEKDAYS_SHORT.map(w => <div key={w} style={{ textAlign: "center", fontSize: 10, color: COLORS.muted, fontWeight: 700, padding: "2px 0" }}>{w}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const evs = evOf(d);
          const today = isToday(d);
          const sel = selDay === d;
          return (
            <div key={i} onClick={() => setSelDay(sel ? null : d)} title={evs.length ? `${evs.length} event${evs.length > 1 ? "s" : ""}` : undefined} style={{
              height: 58, borderRadius: 8, padding: 5, cursor: "pointer", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              background: sel ? `${COLORS.gold}1A` : today ? `${COLORS.blue}12` : COLORS.panel2,
              border: `1px solid ${sel ? COLORS.gold : today ? COLORS.blue + "88" : COLORS.border}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: today ? COLORS.blue : COLORS.text, textAlign: "right" }}>{d}</div>
              <div style={{ display: "flex", gap: 3, justifyContent: "center", height: 6 }}>
                {evs.slice(0, 4).map(e => <span key={e.id} style={{ width: 6, height: 6, borderRadius: 3, background: evColor(e) }} />)}
              </div>
            </div>
          );
        })}
      </div>
      {selDay && (
        <div style={{ marginTop: 14, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{weekdayOf(vm.age, vm.month, selDay)}, {CAL_MONTHS[vm.month - 1]} {selDay} · Age {vm.age}</span>
            <div style={{ flex: 1 }} />
            <Btn size="sm" variant="ghost" onClick={() => jumpTo(selDay)} title="Set the world clock to this day">Jump clock here</Btn>
          </div>
          {evOf(selDay).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              {evOf(selDay).map(e => (
                <div key={e.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "6px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setColorEditId(colorEditId === e.id ? null : e.id)} title="Change color" style={{ width: 14, height: 14, borderRadius: 4, background: evColor(e), border: `1px solid ${COLORS.borderLit}`, cursor: "pointer", padding: 0, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5 }}>{e.title}</span>
                    {e.dm && <Tag color={COLORS.gold}>DM only</Tag>}
                    <div style={{ flex: 1 }} />
                    <X size={13} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => delEvent(e.id)} />
                  </div>
                  {colorEditId === e.id && (
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {EVENT_COLORS.map(c => (
                        <button key={c} onClick={() => setEventColor(e.id, c)} title="Set color" style={{ width: 20, height: 20, borderRadius: 5, background: c, cursor: "pointer", border: `2px solid ${evColor(e) === c ? COLORS.text : "transparent"}`, padding: 0 }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 10 }}>Nothing scheduled.</div>}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <TextInput value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && addEvent()} placeholder="Add an event on this day" style={{ flex: 1, minWidth: 180 }} />
            <div style={{ display: "flex", gap: 5, alignItems: "center" }} title="Event color">
              {EVENT_COLORS.map(c => (
                <button key={c} onClick={() => setDraftColor(c)} style={{ width: 18, height: 18, borderRadius: 5, background: c, cursor: "pointer", border: `2px solid ${draftColor === c ? COLORS.text : "transparent"}`, padding: 0 }} />
              ))}
            </div>
            {isDM && (
              <button onClick={() => setDraftDM(!draftDM)} title="Hide this event from players" style={{ cursor: "pointer", fontSize: 11, fontWeight: 700, borderRadius: 7, padding: "8px 10px", border: `1px solid ${draftDM ? COLORS.gold : COLORS.border}`, background: draftDM ? `${COLORS.gold}1A` : "transparent", color: draftDM ? COLORS.gold : COLORS.muted }}>
                {draftDM ? "🔒 DM only" : "Shared"}
              </button>
            )}
            <Btn size="sm" variant="gold" onClick={addEvent}><Plus size={13} /> Add</Btn>
          </div>
        </div>
      )}
      {upcoming.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Upcoming</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {upcoming.map(e => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: evColor(e) }} />
                <span style={{ color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11, minWidth: 130 }}>{CAL_MONTHS[e.month - 1].slice(0, 3)} {e.day} · Age {e.age}</span>
                <span>{e.title}</span>
                {e.dm && <Tag color={COLORS.gold}>DM</Tag>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// The Calendar sub-tab: the live world clock plus the month calendar with events.
function SessionTimeTab() {
  return <div><SessionClockTab /><SessionCalendar /></div>;
}

export {
  SessionDetailsTab,
  TIME_PHASE,
  CAL_MONTHS,
  CAL_MDAYS,
  CAL_WEEKDAYS,
  monthLen,
  normDate,
  weekdayOf,
  DEFAULT_TIME,
  readTime,
  advanceTime,
  timeLabel,
  SessionClockTab,
  CAL_WEEKDAYS_SHORT,
  EVENT_COLORS,
  absDay,
  SessionCalendar,
  SessionTimeTab,
};
