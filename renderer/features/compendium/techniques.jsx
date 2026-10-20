import React, { useState } from "react";
import { Check, RotateCcw, Search, X, Zap } from "lucide-react";
import { TECHNIQUE_DATA } from "../../data/technique-data.js";
import { TECH_CATEGORIES, TECH_TYPE_ORDER } from "../../engine/derived.js";
import { applyOverrides, useOverrides } from "../../state/hooks.js";
import { Btn, EmptyState, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { techResColor } from "../characters/forms.jsx";

const TECH_CAT_COLOR = { "Generic": "blue", "Super Line": "purple", "External Super Line": "amber", "Miscellaneous Super": "green", "Ultimate": "red" };

function TechniquesCompendiumTab() {
  const { map: ovMap, setOverride, clearOverride } = useOverrides("technique_overrides_v1");
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [editing, setEditing] = useState(false);

  const allTechs = applyOverrides(TECHNIQUE_DATA, ovMap);
  const open = openId ? allTechs.find(t => t.id === openId) : null;
  if (open) {
    const color = COLORS[TECH_CAT_COLOR[open.category]] || COLORS.muted;
    const rescolor = techResColor(open.resolution);
    const edited = !!ovMap[open.id];
    const upd = (patch) => setOverride(open.id, { ...open, ...patch });
    const row = (label, val) => val ? <div style={{ display: "flex", gap: 8, fontSize: 12.5 }}><span style={{ color: COLORS.muted, minWidth: 110 }}>{label}</span><span>{val}</span></div> : null;
    const F = ({ label, k, ph, ta }) => (
      <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
        {ta ? <TextArea value={open[k] || ""} onChange={e => upd({ [k]: e.target.value })} style={{ minHeight: 120 }} />
            : <TextInput value={open[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} style={{ padding: "5px 8px" }} />}
      </div>
    );
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
          <div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Tag color={color}>{open.category}</Tag>
              <Tag color={COLORS.dim}>{open.techType} · Ki Rank {open.kiRank}</Tag>
              <Tag color={rescolor}>{open.resolution}</Tag>
              {edited && <Tag color={COLORS.amber}>Edited</Tag>}
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, marginTop: 8 }}>{open.name}</div>
            {open.lineName && open.lineName !== open.name && <div style={{ fontSize: 11.5, color: COLORS.dim }}>{open.lineName} line</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant={editing ? "gold" : "default"} onClick={() => setEditing(!editing)}>{editing ? <><Check size={13}/> Done</> : "Edit"}</Btn>
            {edited && <Btn size="sm" onClick={() => clearOverride(open.id)} title="Discard edits, restore the book version"><RotateCcw size={13}/> Reset</Btn>}
            <Btn size="sm" variant="ghost" onClick={() => { setEditing(false); setOpenId(null); }}><X size={15}/></Btn>
          </div>
        </div>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <F label="Name" k="name" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Type</div><Select value={open.techType} onChange={e => upd({ techType: e.target.value })}>{TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}</Select></div>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Ki Rank</div><Select value={open.kiRank} onChange={e => upd({ kiRank: e.target.value })}>{["1","2","3","4"].map(r => <option key={r} value={r}>{r}</option>)}</Select></div>
              <div><div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", marginBottom: 2 }}>Resolution</div><Select value={open.resolution} onChange={e => upd({ resolution: e.target.value })}><option value="attack">attack</option><option value="save">save</option><option value="utility">utility</option></Select></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <F label="Ki Cost" k="kiCost" ph="7 Ki" /><F label="Casting Time" k="castingTime" ph="1 Action" /><F label="Range" k="range" ph="60ft" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <F label="Damage Dice" k="damageDice" ph="2d6+18" /><F label="Damage Type" k="damageType" ph="Energy" /><F label="Save Ability" k="saveAbility" ph="Dexterity" />
            </div>
            <F label="Full Text" k="fullText" ta />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "10px 0" }}>
              {row("Ki Cost", open.kiCost)}
              {row("Casting Time", open.castingTime)}
              {row("Range", open.range)}
              {row("Duration", open.duration)}
              {row("Chargeable", open.chargeable ? "Yes" : null)}
              {row("Damage", open.damageDice ? `${open.damageDice}${open.damageType ? " " + open.damageType : ""}` : null)}
              {row("Weapon Req.", open.weaponRequirement)}
              {row("Learning Req.", open.learningRequirement)}
              {row("Iconic Mastery", open.iconicMastery)}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-line" }}>{open.fullText}</div>
          </>
        )}
      </div>
    );
  }

  const visible = allTechs.filter(t => {
    if (catFilter !== "all" && t.category !== catFilter) return false;
    if (typeFilter !== "all" && t.techType !== typeFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return t.name.toLowerCase().includes(q) || (t.lineName || "").toLowerCase().includes(q) || (t.fullText || "").toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${TECHNIQUE_DATA.length} techniques...`} style={{ paddingLeft: 30 }} />
        </div>
        <Select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: 180 }}>
          <option value="all">All categories</option>
          {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 130 }}>
          <option value="all">All types</option>
          {TECH_TYPE_ORDER.map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 12, fontFamily: FONTS.mono }}>{visible.length} shown</div>
      {visible.length === 0 ? (
        <EmptyState icon={Zap} title="No techniques match" body="Try a different search, category, or type." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10 }}>
          {visible.slice(0, 400).map(t => {
            const color = COLORS[TECH_CAT_COLOR[t.category]] || COLORS.muted;
            const rescolor = techResColor(t.resolution);
            return (
              <div key={t.id} onClick={() => { setEditing(false); setOpenId(t.id); }} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{t.name}{ovMap[t.id] && <span style={{ color: COLORS.amber, fontSize: 9.5, marginLeft: 5 }}>• edited</span>}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: FONTS.mono, whiteSpace: "nowrap" }}>{t.techType} R{t.kiRank}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {t.kiCost && <span>{t.kiCost}</span>}
                  {t.damageDice && <span style={{ color: rescolor }}>{t.damageDice}</span>}
                  <span style={{ color: rescolor, textTransform: "capitalize" }}>{t.resolution}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {visible.length > 400 && <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 12, textAlign: "center" }}>Showing first 400 — narrow with search or filters to see the rest.</div>}
    </div>
  );
}

export {
  TECH_CAT_COLOR,
  TechniquesCompendiumTab,
};
