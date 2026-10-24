import React, { useState } from "react";
import { BookOpen, Check, Dices, Minus, Plus, RotateCcw, Sparkles, Trash2, X } from "lucide-react";
import { emitRoll } from "../../app/bus.js";
import { SPELL_DATA } from "../../data/spell-data.js";
import { exhaustionPenalty, rollModBonus } from "../../engine/conditions.js";
import { STAT_MOD_LABEL } from "../../engine/core.js";
import { STAT_KEYS } from "../../engine/skills.js";
import { SPELL_SCHOOLS, defaultCasterAbility, fullCasterSlots, mysticLevel, spellStats } from "../../engine/spellcasting.js";
import { roll, uid } from "../../lib/dice.js";
import { Btn, Field, Select, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { miniBtnStyle } from "../session/combat-parts.jsx";

// Limited-use resource pools (class-granted + custom). Full mode (Vitals) can add
// custom pools and remove them; compact mode (Combat) just spends/rolls them where
// you act. Class pools are auto-provisioned by reconcileResources, so here they're
// only spent/restored/rolled — their max is owned by the class table.
const RESOURCE_RESET_LABEL = { short: "Short Rest", long: "Long Rest", shortHalfLongFull: "½ Short · Long", turn: "Start of turn", encounter: "Per encounter", dawn: "Dawn", manual: "Manual", earned: "Earned · lost on Long Rest" };
// "d8" or "4d6" → { count, size }; size 0 when there's no die.
const parseResourceDie = (die) => {
  const m = String(die || "").match(/^(\d*)d(\d+)$/);
  return m ? { count: Number(m[1]) || 1, size: Number(m[2]) } : { count: 0, size: 0 };
};
const resourceDieSize = (die) => parseResourceDie(die).size;
function ResourceTracker({ char, set, compact = false }) {
  const list = char.resources || [];
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", max: 3, die: "", reset: "long" });
  const [flash, setFlash] = useState(null); // { id, value } — last die roll
  const upd = (id, patch) => set({ resources: list.map(r => r.id === id ? { ...r, ...patch } : r) });
  const spend = (r, n = 1) => upd(r.id, { current: Math.max(0, (r.current || 0) - n) });
  const restore = (r, n = 1) => upd(r.id, { current: Math.min(r.max, (r.current || 0) + n) });
  const rollDie = (r) => {
    const size = resourceDieSize(r.die);
    if (!size || (r.current || 0) <= 0) return;
    const { count } = parseResourceDie(r.die);
    let v = 0; for (let i = 0; i < count; i++) v += roll(size);
    spend(r);
    setFlash({ id: r.id, value: v });
    emitRoll({ label: r.name, total: v, detail: `${r.die} · spent 1`, color: COLORS.blue });
  };
  const remove = (id) => set({ resources: list.filter(r => r.id !== id) });
  const addCustom = () => {
    const name = form.name.trim(); if (!name) return;
    const mx = Math.max(0, +form.max || 0);
    set({ resources: [...list, { id: uid(), source: "custom", name, die: form.die, max: mx, current: mx, reset: form.reset, regen: "", note: "" }] });
    setForm({ name: "", max: 3, die: "", reset: "long" });
    setAdding(false);
  };
  if (!list.length && compact) return null;
  const row = (r) => {
    const size = resourceDieSize(r.die);
    return (
      <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.text }}>{r.name}</span>
            {r.die && <span style={{ fontSize: 9.5, color: COLORS.blue, fontFamily: FONTS.mono }}>{r.die}</span>}
            {r.source === "class" && <span style={{ fontSize: 8.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>class</span>}
          </div>
          {!compact && <div style={{ fontSize: 10, color: COLORS.dim }}>{RESOURCE_RESET_LABEL[r.reset] || r.reset}{r.note ? ` · ${r.note}` : ""}</div>}
          {flash && flash.id === r.id && <div style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: FONTS.mono }}>rolled {r.die} → {flash.value}</div>}
        </div>
        <span style={{ fontFamily: FONTS.mono, fontWeight: 700, minWidth: 44, textAlign: "center" }}>
          <span style={{ color: (r.current || 0) > 0 ? COLORS.text : COLORS.dim }}>{r.current || 0}</span>
          <span style={{ color: COLORS.dim, fontWeight: 400 }}> / {r.max}</span>
        </span>
        <button onClick={() => spend(r)} title="Spend one" style={miniBtnStyle} disabled={(r.current || 0) <= 0}><Minus size={12} /></button>
        {size > 0 && <Btn size="sm" onClick={() => rollDie(r)} title={`Roll ${r.die} and spend one`}><Dices size={12} /></Btn>}
        <button onClick={() => restore(r)} title="Restore one" style={miniBtnStyle}><Plus size={12} /></button>
        {!compact && <span onClick={() => upd(r.id, { current: r.max })} title="Reset to full" style={{ cursor: "pointer", color: COLORS.dim }}><RotateCcw size={13} /></span>}
        {!compact && r.source === "custom" && <span onClick={() => remove(r.id)} title="Remove" style={{ cursor: "pointer", color: COLORS.dim }}><Trash2 size={12} /></span>}
      </div>
    );
  };
  return (
    <div>
      {list.map(row)}
      {!compact && (adding ? (
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginTop: 4, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <TextInput value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ width: 140 }} />
          <TextInput type="number" value={form.max} onChange={e => setForm({ ...form, max: e.target.value })} placeholder="Max" style={{ width: 64 }} title="Max" />
          <Select value={form.die} onChange={e => setForm({ ...form, die: e.target.value })} style={{ width: 78 }} title="Die (optional)">
            <option value="">no die</option>{["d4", "d6", "d8", "d10", "d12"].map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
          <Select value={form.reset} onChange={e => setForm({ ...form, reset: e.target.value })} style={{ width: 116 }} title="Reset">
            {["short", "long", "shortHalfLongFull", "encounter", "dawn", "manual"].map(k => <option key={k} value={k}>{RESOURCE_RESET_LABEL[k]}</option>)}
          </Select>
          <Btn size="sm" variant="gold" onClick={addCustom}><Check size={12} /> Add</Btn>
          <Btn size="sm" variant="ghost" onClick={() => setAdding(false)}>Cancel</Btn>
        </div>
      ) : (
        <div style={{ borderTop: list.length ? `1px solid ${COLORS.border}` : "none", paddingTop: 10, marginTop: 4 }}>
          <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13} /> Add custom resource</Btn>
        </div>
      ))}
    </div>
  );
}

// Vitals — the same body figure (tinted by HP) plus health resources, injuries,
// status effects, and sustenance/rest trackers.
// Picker over the core 5e SRD spell list. Filters by search + level + school;
// "Add" hands the chosen spell up to Cantrips Known (level 0) or Spells Known.
function SpellPicker({ known, onAdd, onClose }) {
  const [q, setQ] = useState("");
  const [lvl, setLvl] = useState("all");
  const [school, setSchool] = useState("all");
  const knownIds = new Set((known || []).map(s => s.spellId).filter(Boolean));
  const list = SPELL_DATA.filter(s =>
    (lvl === "all" || s.level === +lvl) &&
    (school === "all" || s.school === school) &&
    (!q.trim() || s.name.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const lvlLabel = (n) => n === 0 ? "Cantrip" : `Level ${n}`;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Add from Core Spells (SRD)</div>
        <button onClick={onClose} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer" }}><X size={14}/></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6, marginBottom: 10 }}>
        <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search spells…" autoFocus />
        <Select value={lvl} onChange={e => setLvl(e.target.value)} style={{ width: 110 }}>
          <option value="all">All levels</option>
          {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{lvlLabel(n)}</option>)}
        </Select>
        <Select value={school} onChange={e => setSchool(e.target.value)} style={{ width: 130 }}>
          <option value="all">All schools</option>
          {SPELL_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {list.length === 0 && <div style={{ fontSize: 12, color: COLORS.dim, padding: 8 }}>No spells match.</div>}
        {list.map(s => {
          const added = knownIds.has(s.id);
          return (
            <div key={s.id} title={s.description} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: COLORS.gold, minWidth: 30 }}>{s.level === 0 ? "Can" : `L${s.level}`}</span>
              <span style={{ flex: 1, fontSize: 12.5 }}>{s.name} <span style={{ color: COLORS.dim, fontSize: 10.5 }}>· {s.school}</span></span>
              {added
                ? <span style={{ fontSize: 10.5, color: COLORS.dim }}>added</span>
                : <Btn size="sm" onClick={() => onAdd(s)}><Plus size={11}/></Btn>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Spellcasting play surface. A CONTAINER: casting ability → live Save DC/Attack,
// Schools, Cantrips/Spells known, an optional Spell-Slot table (Mystic) and named
// per-Rest cast pools (Magus). No book spell data is seeded here — that's Track B.
function MagicTab({ char, set }) {
  const sc = char.spellcasting || {};
  const setSc = (patch) => set({ spellcasting: { ...sc, ...patch } });
  const { ability, mod, saveDC, attack } = spellStats(char);
  const suggested = defaultCasterAbility(char);
  const [cantrip, setCantrip] = useState("");
  const [spellName, setSpellName] = useState("");
  const [spellLevel, setSpellLevel] = useState("1");
  const [poolName, setPoolName] = useState("");
  const [picker, setPicker] = useState(false);

  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 };
  const head = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 };
  const stat = (label, val) => (
    <div style={{ textAlign: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", flex: 1 }}>
      <div style={{ fontSize: 9.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.gold }}>{val}</div>
    </div>
  );

  const cantrips = sc.cantrips || [], spells = sc.spells || [], slots = sc.slots || [], pools = sc.pools || [], schools = sc.schools || [];
  const addCantrip = () => { const n = cantrip.trim(); if (!n) return; setSc({ cantrips: [...cantrips, { id: uid(), name: n, notes: "" }] }); setCantrip(""); };
  const addSpell = () => { const n = spellName.trim(); if (!n) return; setSc({ spells: [...spells, { id: uid(), name: n, level: +spellLevel || 1, notes: "" }] }); setSpellName(""); };
  // Add a picked SRD spell — cantrips (level 0) and leveled spells go to their
  // own lists, both carrying spellId so the picker can flag them as "added".
  const addFromBook = (s) => {
    if (s.level === 0) {
      if (cantrips.some(c => c.spellId === s.id)) return;
      setSc({ cantrips: [...cantrips, { id: uid(), spellId: s.id, name: s.name, school: s.school, notes: "" }] });
    } else {
      if (spells.some(x => x.spellId === s.id)) return;
      setSc({ spells: [...spells, { id: uid(), spellId: s.id, name: s.name, level: s.level, school: s.school, notes: "" }] });
    }
  };
  const toggleSchool = (s) => setSc({ schools: schools.includes(s) ? schools.filter(x => x !== s) : [...schools, s] });
  const addSlotRow = () => { const used = new Set(slots.map(s => s.level)); const level = [1,2,3,4,5,6,7,8,9].find(l => !used.has(l)) || 1; setSc({ slots: [...slots, { id: uid(), level, current: 1, max: 1 }].sort((a,b)=>a.level-b.level) }); };
  const updSlot = (id, patch) => setSc({ slots: slots.map(s => s.id === id ? { ...s, ...patch } : s) });
  const rmSlot = (id) => setSc({ slots: slots.filter(s => s.id !== id) });
  const addPool = () => { const n = poolName.trim(); if (!n) return; setSc({ pools: [...pools, { id: uid(), name: n, current: 1, max: 1, reset: "long" }] }); setPoolName(""); };
  const updPool = (id, patch) => setSc({ pools: pools.map(p => p.id === id ? { ...p, ...patch } : p) });
  const rmPool = (id) => setSc({ pools: pools.filter(p => p.id !== id) });
  // Cast — roll the spell attack and surface the Save DC to the shared roll
  // banner. Leveled spells spend the lowest available slot at or above their level.
  const castRoll = (name, note) => {
    const d20 = roll(20);
    const exh = exhaustionPenalty(char);
    const mods = rollModBonus(char, "attack").total;
    emitRoll({ label: `${char.name || "Caster"} casts ${name}`, total: d20 + attack + exh + mods, detail: `Atk d20 ${d20} ${attack >= 0 ? "+" : ""}${attack}${mods ? ` ${mods >= 0 ? "+" : ""}${mods} mods` : ""}${exh ? ` ${exh} Exhaustion` : ""} · Save DC ${saveDC}${note ? ` · ${note}` : ""}`, color: COLORS.purple, share: true, who: char.name || "" });
  };
  const castSpell = (s) => {
    const slot = slots.filter(sl => sl.level >= s.level && sl.current > 0).sort((a, b) => a.level - b.level)[0];
    if (slot) updSlot(slot.id, { current: slot.current - 1 });
    castRoll(s.name, slot ? `Lv ${slot.level} slot spent` : "no slot spent");
  };

  const stepBtns = (val, on, max) => (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <Btn size="sm" onClick={() => on(Math.max(0, val - 1))}><Minus size={11}/></Btn>
      <span style={{ minWidth: 46, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{val}<span style={{ color: COLORS.dim, fontWeight: 400 }}> / {max}</span></span>
      <Btn size="sm" onClick={() => on(Math.min(max, val + 1))}><Plus size={11}/></Btn>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={card}>
        <div style={head}>Casting</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          {stat("Spell Save DC", saveDC)}
          {stat("Spell Attack", `${attack >= 0 ? "+" : ""}${attack}`)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Spellcasting Ability">
            <Select value={sc.ability || ""} onChange={e => setSc({ ability: e.target.value })}>
              <option value="">Class default ({STAT_MOD_LABEL[suggested]})</option>
              {STAT_KEYS.map(k => <option key={k} value={k}>{STAT_MOD_LABEL[k]}</option>)}
            </Select>
          </Field>
          <Field label="Max Spell Level">
            <TextInput type="number" value={sc.maxSpellLevel || 0} onChange={e => setSc({ maxSpellLevel: +e.target.value })} />
          </Field>
        </div>
        <div style={{ fontSize: 11, color: COLORS.dim }}>Using {STAT_MOD_LABEL[ability]} ({mod >= 0 ? "+" : ""}{mod}).</div>
      </div>

      <div style={card}>
        <div style={head}>Schools of Magic</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SPELL_SCHOOLS.map(s => {
            const on = schools.includes(s);
            return <button key={s} onClick={() => toggleSchool(s)} style={{ cursor: "pointer", fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 12px", border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}1A` : "transparent", color: on ? COLORS.gold : COLORS.muted }}>{s}</button>;
          })}
        </div>
      </div>

      {picker && <SpellPicker known={[...cantrips, ...spells]} onAdd={addFromBook} onClose={() => setPicker(false)} />}

      <div style={card}>
        <div style={{ ...head, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Cantrips Known</span>
          {!picker && <Btn size="sm" onClick={() => setPicker(true)}><BookOpen size={12}/> Add from Core Spells</Btn>}
        </div>
        {cantrips.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
            {cantrips.map(c => (
              <div key={c.id} title={(SPELL_DATA.find(b => b.id === c.spellId) || {}).description || ""} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
                <span style={{ flex: 1, fontSize: 12.5 }}>{c.name}{c.school ? <span style={{ color: COLORS.dim, fontSize: 10.5 }}> · {c.school}</span> : null}</span>
                <Btn size="sm" variant="gold" onClick={() => castRoll(c.name, "cantrip")}><Sparkles size={11}/> Cast</Btn>
                <button onClick={() => setSc({ cantrips: cantrips.filter(x => x.id !== c.id) })} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={cantrip} onChange={e => setCantrip(e.target.value)} placeholder="Custom cantrip name" onKeyDown={e => { if (e.key === "Enter") addCantrip(); }} />
          <Btn size="sm" onClick={addCantrip}><Plus size={12}/> Add</Btn>
        </div>
      </div>

      <div style={card}>
        <div style={head}>Spells Known</div>
        {spells.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
            {spells.slice().sort((a,b) => (a.level||0)-(b.level||0)).map(s => (
              <div key={s.id} title={(SPELL_DATA.find(b => b.id === s.spellId) || {}).description || ""} style={{ display: "flex", gap: 8, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.gold, minWidth: 26 }}>Lv{s.level}</span>
                <span style={{ flex: 1, fontSize: 12.5 }}>{s.name}{s.school ? <span style={{ color: COLORS.dim, fontSize: 10.5 }}> · {s.school}</span> : null}</span>
                <Btn size="sm" variant="gold" onClick={() => castSpell(s)} title={slots.some(sl => sl.level >= s.level && sl.current > 0) ? "Cast — spends a slot" : "Cast — no slot to spend"}><Sparkles size={11}/> Cast</Btn>
                <button onClick={() => setSc({ spells: spells.filter(x => x.id !== s.id) })} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 6 }}>
          <Select value={spellLevel} onChange={e => setSpellLevel(e.target.value)} style={{ width: 74 }}>{[1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>Lv {l}</option>)}</Select>
          <TextInput value={spellName} onChange={e => setSpellName(e.target.value)} placeholder="Spell name" onKeyDown={e => { if (e.key === "Enter") addSpell(); }} />
          <Btn size="sm" onClick={addSpell}><Plus size={12}/> Add</Btn>
        </div>
      </div>

      <div style={card}>
        <div style={{ ...head, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Spell Slots <span style={{ textTransform: "none", fontWeight: 400, color: COLORS.dim }}>— Mystic; refill on Long Rest</span></span>
          {mysticLevel(char) > 0 && <Btn size="sm" onClick={() => setSc({ slots: fullCasterSlots(mysticLevel(char)) })} title={`Fill from Mystic level ${mysticLevel(char)} (standard 5e table)`}><RotateCcw size={12}/> Auto (Mystic {mysticLevel(char)})</Btn>}
        </div>
        {slots.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
            {slots.map(s => (
              <div key={s.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, minWidth: 52 }}>Level {s.level}</span>
                {stepBtns(s.current, (v) => updSlot(s.id, { current: v }), s.max)}
                <span style={{ fontSize: 10.5, color: COLORS.dim }}>max</span>
                <Btn size="sm" onClick={() => updSlot(s.id, { max: Math.max(1, (s.max||1) - 1), current: Math.min(s.current, Math.max(1,(s.max||1)-1)) })}><Minus size={11}/></Btn>
                <Btn size="sm" onClick={() => updSlot(s.id, { max: (s.max||0) + 1 })}><Plus size={11}/></Btn>
                <button onClick={() => rmSlot(s.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", marginLeft: "auto" }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <Btn size="sm" onClick={addSlotRow}><Plus size={12}/> Add slot level</Btn>
      </div>

      <div style={card}>
        <div style={head}>Cast Pools <span style={{ textTransform: "none", fontWeight: 400, color: COLORS.dim }}>— per-Rest uses (Magic Infusion, Burst…)</span></div>
        {pools.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
            {pools.map(p => (
              <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, minWidth: 120, flex: 1 }}>{p.name}</span>
                {stepBtns(p.current, (v) => updPool(p.id, { current: v }), p.max)}
                <span style={{ fontSize: 10.5, color: COLORS.dim }}>max</span>
                <Btn size="sm" onClick={() => updPool(p.id, { max: Math.max(1, (p.max||1) - 1), current: Math.min(p.current, Math.max(1,(p.max||1)-1)) })}><Minus size={11}/></Btn>
                <Btn size="sm" onClick={() => updPool(p.id, { max: (p.max||0) + 1 })}><Plus size={11}/></Btn>
                <Select value={p.reset} onChange={e => updPool(p.id, { reset: e.target.value })} style={{ width: 116 }}><option value="short">Short Rest</option><option value="long">Long Rest</option></Select>
                <button onClick={() => rmPool(p.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer" }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={poolName} onChange={e => setPoolName(e.target.value)} placeholder="Pool name (e.g. Magic Infusion)" onKeyDown={e => { if (e.key === "Enter") addPool(); }} />
          <Btn size="sm" onClick={addPool}><Plus size={12}/> Add</Btn>
        </div>
      </div>
    </div>
  );
}

// Refill magic resources on rest: Long Rest tops up slots + all pools; Short
// Rest tops up only the pools set to reset on a Short Rest. Returns a patch
// object (or null) so the Vitals rest handlers can fold it into their own set().
function magicRestPatch(char, kind) {
  const sc = char.spellcasting;
  if (!sc) return null;
  const slots = kind === "long" ? (sc.slots || []).map(s => ({ ...s, current: s.max })) : sc.slots;
  const pools = (sc.pools || []).map(p => (kind === "long" || p.reset === "short") ? { ...p, current: p.max } : p);
  return { spellcasting: { ...sc, slots, pools } };
}

export {
  RESOURCE_RESET_LABEL,
  resourceDieSize,
  ResourceTracker,
  SpellPicker,
  MagicTab,
  magicRestPatch,
};
