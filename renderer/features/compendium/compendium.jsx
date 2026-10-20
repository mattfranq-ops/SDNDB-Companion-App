import React, { useState } from "react";
import { BookOpen, Plus, Search, Trash2, X } from "lucide-react";
import { rarityInfo } from "../../data/book-tables.js";
import { CLASS_DATA, CLASS_NAMES } from "../../data/class-data.js";
import { BOOK_EQUIPMENT, catalogKey, slotTypeLabel } from "../../engine/equipment.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, Field, LoadingBlock, ScannerHeader, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { AbilityTab } from "../characters/builder-tabs.jsx";

/* ============================== COMPENDIUM (Data Pool) ============================== */
const ENTRY_TYPES = [
  { key: "class", label: "Class", color: COLORS.gold },
  { key: "species", label: "Species / Heritage", color: COLORS.purple },
  { key: "weapon", label: "Weapon", color: COLORS.red },
  { key: "armor", label: "Armor", color: COLORS.green },
  { key: "shield", label: "Shield", color: COLORS.blue },
  { key: "item", label: "Item / Gear", color: COLORS.dim },
  { key: "technique", label: "Technique", color: COLORS.blue },
  { key: "form", label: "Form / Transformation", color: COLORS.purple },
  { key: "condition", label: "Condition", color: COLORS.green },
];
const blankEntry = (type="item") => ({ id: uid(), type, name: "New Entry", cost: "", rank: "", range: "", damage: "", description: "" });

function CompendiumTab() {
  const [entries, persist, error] = useSharedList("compendium_v2");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [openClass, setOpenClass] = useState(null);
  const [openEquip, setOpenEquip] = useState(null);
  if (entries === null) return <LoadingBlock />;

  const addEntry = (type) => { const e = blankEntry(type); persist([...entries, e]); setOpenId(e.id); };
  const updateEntry = (id, patch) => persist(entries.map(e => e.id===id?{...e,...patch}:e));
  const deleteEntry = (id) => { persist(entries.filter(e => e.id!==id)); setOpenId(null); };

  const classResults = filter === "all" || filter === "class" ? CLASS_NAMES.filter(n => n.toLowerCase().includes(query.toLowerCase())) : [];
  const bookEquip = BOOK_EQUIPMENT.filter(e => (filter === "all" || filter === (e.category || "").toLowerCase()) && e.name.toLowerCase().includes(query.toLowerCase()));
  const customResults = entries.filter(e => (filter==="all"||e.type===filter) && e.name.toLowerCase().includes(query.toLowerCase()));
  const open = entries.find(e => e.id === openId);
  const typeInfo = (t) => ENTRY_TYPES.find(x => x.key===t) || ENTRY_TYPES[2];

  if (openClass) return (
    <div>
      <ScannerHeader title={openClass.toUpperCase()} subtitle="Class — Book Data" onBack={() => setOpenClass(null)} />
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
        <AbilityTab classId={openClass} level={20} />
      </div>
    </div>
  );

  if (openEquip) {
    const e = openEquip;
    const acLine = e.slot === "body"
      ? `${e.acBase}${e.acDexMode === "full" ? " + Dex" : e.acDexMode === "max2" ? " + Dex (max 2)" : " (no Dex)"}${e.acHalfProf ? " + ½ Prof" : ""}`
      : e.acBonus ? `+${e.acBonus} AC` : "—";
    const stat = (label, val) => <div><span style={{ color: COLORS.dim, fontSize: 10.5, textTransform: "uppercase" }}>{label}</span><div style={{ fontWeight: 700, fontSize: 13 }}>{val}</div></div>;
    return (
      <div>
        <ScannerHeader title={e.name.toUpperCase()} subtitle={`${e.category} — Book Data`} onBack={() => setOpenEquip(null)} />
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 14 }}>
            {stat("Slot", slotTypeLabel(e.slot))}
            {stat("Armor Class", acLine)}
            {stat("Damage Reduction", e.dr || 0)}
            {stat("Ƶeni", (e.zeni || 0).toLocaleString())}
            {stat("Rarity", rarityInfo(e.rarity).label)}
            {e.strReq > 0 && stat("Str Req.", e.strReq)}
            {e.stealthDisadv && stat("Stealth", "Disadvantage")}
          </div>
          {e.notes && <div style={{ color: COLORS.muted, fontSize: 12.5, marginTop: 14, lineHeight: 1.6, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>{e.notes}</div>}
        </div>
      </div>
    );
  }

  if (open) return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <TextInput value={open.name} onChange={e => updateEntry(open.id, { name: e.target.value })} style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm" variant="danger" onClick={() => deleteEntry(open.id)}><Trash2 size={13}/></Btn>
          <Btn size="sm" variant="ghost" onClick={() => setOpenId(null)}><X size={15}/></Btn>
        </div>
      </div>
      <Field label="Type"><Select value={open.type} onChange={e => updateEntry(open.id, { type: e.target.value })}>{ENTRY_TYPES.filter(t=>t.key!=="class").map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        <Field label="Cost"><TextInput value={open.cost} onChange={e => updateEntry(open.id, { cost: e.target.value })} /></Field>
        <Field label="Rank"><TextInput value={open.rank} onChange={e => updateEntry(open.id, { rank: e.target.value })} /></Field>
        <Field label="Range"><TextInput value={open.range} onChange={e => updateEntry(open.id, { range: e.target.value })} /></Field>
      </div>
      <Field label="Damage / Effect"><TextInput value={open.damage} onChange={e => updateEntry(open.id, { damage: e.target.value })} /></Field>
      <Field label="Description"><TextArea value={open.description} onChange={e => updateEntry(open.id, { description: e.target.value })} style={{ minHeight: 140 }} /></Field>
    </div>
  );

  return (
    <div>
      {error && <ErrorBanner text={error} />}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the Data Pool..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 180 }}>
          <option value="all">All types</option>
          {ENTRY_TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
        </Select>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {ENTRY_TYPES.filter(t=>t.key!=="class").map(t => <Btn key={t.key} size="sm" onClick={() => addEntry(t.key)} style={{ color: t.color, borderColor: t.color+"44" }}><Plus size={12}/> {t.label}</Btn>)}
      </div>
      {classResults.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Classes (Book Data)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
            {classResults.map(n => (
              <div key={n} onClick={() => setOpenClass(n)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold+"66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                <Tag color={COLORS.gold}>Class</Tag>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{n}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{CLASS_DATA[n].flavor}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {bookEquip.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Equipment (Book Data)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
            {bookEquip.map(e => {
              const ti = typeInfo((e.category || "").toLowerCase());
              return (
                <div key={catalogKey(e)} onClick={() => setOpenEquip(e)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={ev => ev.currentTarget.style.borderColor = ti.color + "66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                  <Tag color={ti.color}>{e.category}</Tag>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{e.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{e.slot === "body" ? `Base AC ${e.acBase}` : e.acBonus ? `+${e.acBonus} AC` : ""}{e.dr ? ` · DR ${e.dr}` : ""} · {(e.zeni || 0).toLocaleString()}z</div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {customResults.length === 0 && classResults.length === 0 && bookEquip.length === 0 ? (
        <EmptyState icon={BookOpen} title="Nothing here yet" body="Search real Classes from the book, or build a custom weapon, technique, form, item, or condition." />
      ) : customResults.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
          {customResults.map(e => {
            const ti = typeInfo(e.type);
            return (
              <div key={e.id} onClick={() => setOpenId(e.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = ti.color+"66"} onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
                <Tag color={ti.color}>{ti.label}</Tag>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{e.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4, minHeight: 32, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{e.description || "No description yet."}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export {
  ENTRY_TYPES,
  blankEntry,
  CompendiumTab,
};
