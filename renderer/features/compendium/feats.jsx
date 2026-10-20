import React, { useState } from "react";
import { ClipboardList, Plus, RotateCcw, Search, Trash2, X } from "lucide-react";
import { FEAT_DATA } from "../../data/feat-data.js";
import { uid } from "../../lib/dice.js";
import { applyOverrides, useOverrides, useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, Field, LoadingBlock, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FEAT_LISTS, FEAT_LIST_COLOR } from "../../ui/theme.js";

/* ============================== FEATS ============================== */
const blankCustomFeat = () => ({ id: uid(), name: "New Feat", list: "General", subcategory: "", prerequisite: "", fullText: "", custom: true });

function FeatsTab() {
  const [custom, persist, error] = useSharedList("custom_feats_v1");
  const { map: ovMap, setOverride, clearOverride } = useOverrides("feat_overrides_v1");
  const [source, setSource] = useState("all"); // all | book | custom
  const [activeLists, setActiveLists] = useState(() => new Set(FEAT_LISTS));
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  if (custom === null) return <LoadingBlock />;

  const bookFeats = applyOverrides(FEAT_DATA, ovMap);
  const allFeats = [...bookFeats, ...custom];
  const addCustom = () => { const f = blankCustomFeat(); persist([...custom, f]); setOpenId(f.id); };
  const updateCustom = (id, patch) => persist(custom.map(c => c.id === id ? { ...c, ...patch } : c));
  const deleteCustom = (id) => { persist(custom.filter(c => c.id !== id)); setOpenId(null); };

  const toggleList = (l) => {
    setActiveLists(prev => {
      if (prev.has(l) && prev.size === 1) return new Set(FEAT_LISTS);
      return new Set([l]);
    });
  };

  const visible = allFeats.filter(f => {
    if (source === "book" && f.custom) return false;
    if (source === "custom" && !f.custom) return false;
    if (!activeLists.has(f.list)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return f.name.toLowerCase().includes(q) || (f.fullText || "").toLowerCase().includes(q) || (f.prerequisite || "").toLowerCase().includes(q);
  });

  const open = allFeats.find(f => f.id === openId);

  if (open) {
    const isCustom = !!open.custom;
    const edited = !isCustom && !!ovMap[open.id];
    const upd = (patch) => isCustom ? updateCustom(open.id, patch) : setOverride(open.id, { ...open, ...patch });
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8 }}>
          <TextInput value={open.name} onChange={e => upd({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", flex: 1 }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isCustom ? <Tag color={COLORS.muted}>Custom</Tag> : edited ? <Tag color={COLORS.amber}>Edited</Tag> : null}
            {edited && <Btn size="sm" onClick={() => clearOverride(open.id)} title="Discard edits, restore the book version"><RotateCcw size={13}/> Reset</Btn>}
            {isCustom && <Btn size="sm" variant="danger" onClick={() => deleteCustom(open.id)}><Trash2 size={13}/></Btn>}
            <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="List"><Select value={open.list} onChange={e => upd({ list: e.target.value })}>{FEAT_LISTS.map(l => <option key={l} value={l}>{l}</option>)}</Select></Field>
          <Field label="Subcategory"><TextInput value={open.subcategory || ""} onChange={e => upd({ subcategory: e.target.value })} placeholder="optional" /></Field>
        </div>
        <Field label="Prerequisite"><TextInput value={open.prerequisite || ""} onChange={e => upd({ prerequisite: e.target.value })} placeholder="e.g. Character Level 4+" /></Field>
        <Field label="Full Text"><TextArea value={open.fullText || ""} onChange={e => upd({ fullText: e.target.value })} style={{ minHeight: 160 }} /></Field>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search feat names, rules text, prerequisites..." style={{ paddingLeft: 30 }} />
        </div>
        <Btn variant="gold" onClick={addCustom}><Plus size={13}/> Add Feat</Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
        {[["all","All"],["book","Book"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSource(k)} style={{ padding: "6px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${source===k?COLORS.gold:"transparent"}`, color: source===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>{l} {k==="custom" ? `(${custom.length})` : k==="book" ? `(${FEAT_DATA.length})` : `(${allFeats.length})`}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        <button onClick={() => setActiveLists(new Set(FEAT_LISTS))} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${activeLists.size===FEAT_LISTS.length?COLORS.gold:COLORS.border}`, background: activeLists.size===FEAT_LISTS.length?`${COLORS.gold}1A`:COLORS.panel2, color: activeLists.size===FEAT_LISTS.length?COLORS.gold:COLORS.muted }}>All</button>
        {FEAT_LISTS.map(l => {
          const color = COLORS[FEAT_LIST_COLOR[l]] || COLORS.muted;
          const on = activeLists.has(l);
          return (
            <button key={l} onClick={() => toggleList(l)} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${on?color:COLORS.border}`, background: on?`${color}1A`:COLORS.panel2, color: on?color:COLORS.muted }}>{l}</button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No feats match" body="Try a different search or category, or add a homebrew Feat of your own." />
      ) : (
        FEAT_LISTS.map(l => {
          const items = visible.filter(f => f.list === l);
          if (!items.length) return null;
          const color = COLORS[FEAT_LIST_COLOR[l]] || COLORS.muted;
          return (
            <div key={l} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color }}>{l} Feat List</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>{items.length}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                {items.map(f => (
                  <div key={f.id} onClick={() => setOpenId(f.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, position: "relative" }}
                    onMouseEnter={ev => ev.currentTarget.style.borderColor = color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                    {f.custom ? <Tag color={COLORS.muted}>Custom</Tag> : ovMap[f.id] ? <Tag color={COLORS.amber}>Edited</Tag> : null}
                    <div style={{ fontWeight: 700, marginTop: (f.custom || ovMap[f.id]) ? 6 : 0 }}>{f.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11.5, marginTop: 4, fontFamily: "JetBrains Mono, monospace" }}>{f.prerequisite || "No prerequisite"}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export {
  blankCustomFeat,
  FeatsTab,
};
