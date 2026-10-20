import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Plus, Search, Sparkles, X, Zap } from "lucide-react";
import { TECHNIQUE_DATA } from "../../data/technique-data.js";
import { computeMaxStamina, effectiveStats } from "../../engine/core.js";
import { TECH_CATEGORIES, TECH_TYPE_ORDER, blankCustomTech, techToKnown, techniquesKnownBudget } from "../../engine/derived.js";
import { reconcileResources } from "../../engine/resources.js";
import { Btn, EmptyState, Field, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { techResColor } from "./forms.jsx";

function KnownTechniquesTab({ char, set }) {
  const known = char.techniques || [];
  const [mode, setMode] = useState(null); // null | 'pick' | 'custom'
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [draft, setDraft] = useState(null);

  const setKnown = (next) => set({ techniques: next });
  const addTech = (t) => setKnown([...known, techToKnown(t)]);
  const removeTech = (u) => setKnown(known.filter(k => k.uid !== u));
  const cycleMastery = (u) => setKnown(known.map(k => k.uid === u ? { ...k, mastery: ((k.mastery || 0) + 1) % 4 } : k));
  const knownRefKeys = new Set(known.filter(k => k.techId).map(k => k.techId));

  /* ---- Book picker ---- */
  if (mode === "pick") {
    const results = TECHNIQUE_DATA.filter(t => {
      if (typeFilter !== "all" && t.techType !== typeFilter) return false;
      if (catFilter !== "all" && t.category !== catFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return t.name.toLowerCase().includes(q) || (t.lineName || "").toLowerCase().includes(q) || (t.fullText || "").toLowerCase().includes(q);
    }).slice(0, 300);
    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          <Btn size="sm" variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
            <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${TECHNIQUE_DATA.length} techniques...`} style={{ paddingLeft: 30 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: 170 }}>
            <option value="all">All categories</option>
            {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 130 }}>
            <option value="all">All types</option>
            {TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          <div style={{ alignSelf: "center", fontSize: 11, color: COLORS.dim }}>{results.length} shown</div>
        </div>
        <div style={{ maxHeight: 380, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 8, paddingRight: 4 }}>
          {results.map(t => {
            const already = knownRefKeys.has(t.id);
            const color = techResColor(t.resolution);
            return (
              <div key={t.id} onClick={() => !already && addTech(t)} title={t.fullText} style={{ cursor: already ? "default" : "pointer", opacity: already ? 0.45 : 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5 }}>{t.name}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{t.techType} R{t.kiRank}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 3, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {t.kiCost && <span>{t.kiCost}</span>}
                  {t.damageDice && <span style={{ color }}>{t.damageDice} {t.damageType}</span>}
                  <span style={{ color, textTransform: "capitalize" }}>{t.resolution}</span>
                </div>
                <div style={{ fontSize: 9.5, marginTop: 3, color: already ? COLORS.green : COLORS.blue }}>{already ? "✓ Known" : "+ Add"}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---- Custom creator ---- */
  if (mode === "custom" && draft) {
    const upd = (patch) => setDraft({ ...draft, ...patch });
    const save = () => { setKnown([...known, draft]); setDraft(null); setMode(null); };
    return (
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: 14 }}>Custom Technique</div>
          <Btn size="sm" variant="ghost" onClick={() => { setDraft(null); setMode(null); }}><X size={14}/></Btn>
        </div>
        <Field label="Name"><TextInput value={draft.name} onChange={e => upd({ name: e.target.value })} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Type"><Select value={draft.techType} onChange={e => upd({ techType: e.target.value })}>{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select></Field>
          <Field label="Ki Rank"><Select value={draft.kiRank} onChange={e => upd({ kiRank: e.target.value })}>{["1","2","3","4"].map(r => <option key={r} value={r}>{r}</option>)}</Select></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Field label="Ki Cost"><TextInput value={draft.kiCost} onChange={e => upd({ kiCost: e.target.value })} placeholder="7 Ki" /></Field>
          <Field label="Casting Time"><TextInput value={draft.castingTime} onChange={e => upd({ castingTime: e.target.value })} placeholder="1 Action" /></Field>
          <Field label="Range"><TextInput value={draft.range} onChange={e => upd({ range: e.target.value })} placeholder="60ft" /></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Field label="Resolution"><Select value={draft.resolution} onChange={e => upd({ resolution: e.target.value })}><option value="attack">Attack Roll</option><option value="save">Saving Throw</option><option value="utility">Utility (no roll)</option></Select></Field>
          {draft.resolution === "save" ? (
            <Field label="Save Ability"><Select value={draft.saveAbility} onChange={e => upd({ saveAbility: e.target.value })}>{["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map(a => <option key={a} value={a}>{a}</option>)}</Select></Field>
          ) : <div />}
          <Field label="Damage Type"><TextInput value={draft.damageType} onChange={e => upd({ damageType: e.target.value })} placeholder="Energy" /></Field>
        </div>
        <Field label="Damage Dice"><TextInput value={draft.damageDice} onChange={e => upd({ damageDice: e.target.value })} placeholder="2d6+18" /></Field>
        <Field label="Full Text / Effect"><TextArea value={draft.fullText} onChange={e => upd({ fullText: e.target.value })} placeholder="What the technique does..." style={{ minHeight: 80 }} /></Field>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <Btn variant="gold" onClick={save}><Check size={14}/> Add Technique</Btn>
          <Btn variant="ghost" onClick={() => { setDraft(null); setMode(null); }}>Cancel</Btn>
        </div>
      </div>
    );
  }

  /* ---- Known list ---- */
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <Btn variant="gold" onClick={() => setMode("pick")}><Plus size={13}/> Add from Book</Btn>
        <Btn onClick={() => { setDraft(blankCustomTech()); setMode("custom"); }}><Sparkles size={13}/> Create Custom</Btn>
        {(() => {
          const budget = techniquesKnownBudget(char);
          const over = known.length > budget;
          return (
            <span title="Book Ch.8: INT mod + 2 at Lv1, +2 per Level-Up to 10, +2 per even level 11–20, plus any from Training Boons" style={{ marginLeft: "auto", fontSize: 12.5, color: COLORS.muted }}>
              Known <b style={{ color: over ? COLORS.amber : COLORS.text }}>{known.length}</b> <span style={{ color: COLORS.dim }}>/ {budget}</span>
            </span>
          );
        })()}
      </div>
      {known.length === 0 ? (
        <EmptyState icon={Zap} title="No techniques yet" body="Add from the book, or build your own." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
          {known.map(k => {
            const color = techResColor(k.resolution);
            return (
              <div key={k.uid} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, position: "relative" }}>
                <X size={13} onClick={() => removeTech(k.uid)} style={{ position: "absolute", top: 8, right: 8, cursor: "pointer", color: COLORS.red }} />
                <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{k.name}</span>
                  {k.custom && <Tag color={COLORS.muted}>Custom</Tag>}
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>{[k.techType, k.kiRank && `R${k.kiRank}`, k.kiCost].filter(Boolean).join(" · ")}</div>
                {k.damageDice && <div style={{ fontSize: 11.5, marginTop: 5, color }}>{k.damageDice} {k.damageType} · <span style={{ textTransform: "capitalize" }}>{k.resolution}</span></div>}
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                  <span style={{ fontSize: 9.5, color: COLORS.dim }}>Mastery</span>
                  {[1,2,3].map(n => <span key={n} onClick={() => cycleMastery(k.uid)} title="Click to cycle" style={{ cursor: "pointer", fontSize: 13, color: (k.mastery||0) >= n ? COLORS.gold : COLORS.dim }}>★</span>)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Keeps denormalized fields (classId, level, maxStamina) in step with their
// sources so roster cards, exports, and old code paths read correct values.
function useDerivedCharSync(char, setChar) {
  useEffect(() => {
    const patch = {};
    const cls = char.classes || [];
    if (cls.length) {
      const lvl = cls.reduce((a, c) => a + (c.level || 1), 0);
      if (char.level !== lvl) patch.level = lvl;
      if (char.classId !== cls[0].classId) patch.classId = cls[0].classId;
    }
    const ms = computeMaxStamina({ ...char, ...patch });
    if (char.maxStamina !== ms) patch.maxStamina = ms;
    // Auto-provision class-granted resource pools (compute with the level patch
    // applied so formula maxes like "prof"/"kirank" reflect the new level).
    const nextRes = reconcileResources({ ...char, ...patch });
    if (nextRes) patch.resources = nextRes;
    if (Object.keys(patch).length) setChar(prev => ({ ...prev, ...patch }));
    // Effective CON, not base — gear can move it, so worn/removed items have to
    // retrigger the max-Stamina resync just like a raw score change does.
  }, [JSON.stringify(char.classes), effectiveStats(char).con, char.maxStaminaOverride, char.level, JSON.stringify(char.resources)]);
}

export {
  KnownTechniquesTab,
  useDerivedCharSync,
};
