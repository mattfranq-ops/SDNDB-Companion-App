import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { RARITY_TIERS, rarityInfo } from "../../data/book-tables.js";
import { STAT_MOD_LABEL } from "../../engine/core.js";
import { SLOT_TYPES, catalogKey, catalogToItem, equipmentCatalog, normalizeItem } from "../../engine/equipment.js";
import { STAT_KEYS } from "../../engine/skills.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, Checkbox, CommaNumInput, Field, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

function TagListEditor({ label, items, onAdd, onRemove, color, placeholder }) {
  const [val, setVal] = useState("");
  return (
    <div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, marginBottom: 8, fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
      <div style={{ marginBottom: 8 }}>{items.map((c,i) => <Tag key={i} color={color} onRemove={() => onRemove(i)}>{c}</Tag>)}</div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} onKeyDown={e => { if (e.key==="Enter" && val) { onAdd(val); setVal(""); } }} />
        <Btn size="sm" onClick={() => { if (val) { onAdd(val); setVal(""); } }}><Plus size={13}/></Btn>
      </div>
    </div>
  );
}

const ITEM_CATEGORIES = ["Weapon", "Armor", "Shield", "Consumable", "Gear", "Tech", "Key Item", "Artifact", "Other"];
const ATTACK_STATS = [["str", "STR"], ["dex", "DEX"], ["con", "CON"], ["int", "INT"], ["wis", "WIS"], ["cha", "CHA"]];

// Named conditions/effects an item grants (e.g. "Searing Embers — 1d4 fire on a
// failed Con save"). Descriptive for now; surfaced in the Inventory readout.
function ItemEffectsEditor({ effects, onChange }) {
  const list = effects || [];
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const add = () => { const n = name.trim(); if (!n) return; onChange([...list, { id: uid(), name: n, description: desc.trim() }]); setName(""); setDesc(""); };
  const remove = (id) => onChange(list.filter(e => e.id !== id));
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Effects / Conditions</div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 6 }}>
          {list.map(e => (
            <div key={e.id} style={{ display: "flex", gap: 6, alignItems: "flex-start", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 8px" }}>
              <div style={{ flex: 1, fontSize: 11.5, lineHeight: 1.4 }}><span style={{ color: COLORS.gold, fontWeight: 700 }}>[{e.name}]</span>{e.description ? <span style={{ color: COLORS.muted }}> — {e.description}</span> : null}</div>
              <button onClick={() => remove(e.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }} title="Remove"><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr auto", gap: 6 }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Effect name" />
        <TextInput value={desc} onChange={e => setDesc(e.target.value)} placeholder="What it does and when it triggers" onKeyDown={e => { if (e.key === "Enter") add(); }} />
        <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
      </div>
    </div>
  );
}

// Ability Score changes an item applies while equipped (Hill Giant Gauntlets →
// "STR set 20"; a +2 belt → "STR add 2"). Resolution lives in effectiveStats().
function ItemStatModsEditor({ statMods, onChange }) {
  const list = statMods || [];
  const [stat, setStat] = useState("str");
  const [mode, setMode] = useState("set");
  const [value, setValue] = useState("");
  const add = () => {
    const v = Number(value);
    if (!value.trim() || Number.isNaN(v)) return;
    onChange([...list, { id: uid(), stat, mode, value: v }]);
    setValue("");
  };
  const remove = (id) => onChange(list.filter(m => m.id !== id));
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Ability Scores</div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
          {list.map(m => (
            <div key={m.id} style={{ display: "flex", gap: 6, alignItems: "center", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "4px 8px" }}>
              <span style={{ fontSize: 11.5 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>{STAT_MOD_LABEL[m.stat]}</span>
                <span style={{ color: COLORS.muted }}> {m.mode === "set" ? "set to" : "+"}{m.mode === "set" ? ` ${m.value}` : m.value}</span>
              </span>
              <button onClick={() => remove(m.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }} title="Remove"><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 6 }}>
        <Select value={stat} onChange={e => setStat(e.target.value)}>
          {STAT_KEYS.map(k => <option key={k} value={k}>{STAT_MOD_LABEL[k]}</option>)}
        </Select>
        <Select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="set">Set to</option>
          <option value="add">Add</option>
        </Select>
        <TextInput type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Value" onKeyDown={e => { if (e.key === "Enter") add(); }} />
        <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
      </div>
    </div>
  );
}

// Structured inventory. Items carry slot + combat fields so they can drive AC and
// surface as weapons. Every item mirrors into the shared Data Pool dictionary so
// "anything you add" is findable/reusable there; equipping happens in Equipped.
function ItemsEditor({ items, onChange }) {
  const list = (items || []).map(normalizeItem);
  const [catalog, persistCatalog] = useSharedList("compendium_v2");
  const [draft, setDraft] = useState("");
  const [pick, setPick] = useState("");
  const [openId, setOpenId] = useState(null);
  const cat = equipmentCatalog(catalog);
  const upd = (id, patch) => onChange(list.map(it => it.id === id ? { ...it, ...patch } : it));
  const remove = (id) => onChange(list.filter(it => it.id !== id));

  // Ensure the shared dictionary has an equivalent entry; returns its catalogId.
  const ensureCatalog = (item) => {
    if (!catalog) return item.catalogId || null;
    const existing = catalog.find(e => e.isEquipment && (e.name || "").toLowerCase() === item.name.toLowerCase());
    if (existing) return existing.id;
    const n = normalizeItem(item);
    const entry = { ...n, id: uid(), isEquipment: true, type: (item.category || "item").toLowerCase(),
      cost: item.zeni ? `${item.zeni}z` : "", rank: "", range: "", damage: item.damageDice || "", description: item.notes || "" };
    persistCatalog([...catalog, entry]);
    return entry.id;
  };

  const addByName = () => {
    const name = draft.trim(); if (!name) return;
    const base = normalizeItem({ name });
    onChange([...list, { ...base, catalogId: ensureCatalog(base) }]);
    setDraft("");
  };
  const addFromCatalog = () => {
    const entry = cat.find(e => catalogKey(e) === pick); if (!entry) return;
    onChange([...list, catalogToItem(entry)]);
    setPick("");
  };
  const totalZeni = list.reduce((s, it) => s + (it.zeni || 0) * (it.qty || 1), 0);
  const cols = "2fr 1.1fr 1.2fr 0.8fr 0.6fr auto";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Items / Inventory</div>
        {list.length > 0 && <div style={{ fontSize: 10.5, color: COLORS.dim }}>{list.length} item{list.length > 1 ? "s" : ""} · {totalZeni.toLocaleString()}z value</div>}
      </div>

      {/* Add from the Compendium dictionary (book armor/shield + custom) */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <Select value={pick} onChange={e => setPick(e.target.value)} style={{ flex: 1 }}>
          <option value="">Add from Compendium…</option>
          {cat.map(e => <option key={catalogKey(e)} value={catalogKey(e)}>{e.name}{e.category ? ` — ${e.category}` : ""}{e.zeni ? ` (${e.zeni}z)` : ""}</option>)}
        </Select>
        <Btn size="sm" onClick={addFromCatalog} disabled={!pick}><Plus size={13}/> Add</Btn>
      </div>

      {list.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, padding: "0 8px 4px", fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <span>Name</span><span>Type</span><span>Rarity</span><span style={{ textAlign: "center" }}>Ƶeni ea.</span><span style={{ textAlign: "center" }}>Qty</span><span />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10, maxHeight: 460, overflowY: list.length > 8 ? "auto" : "visible", paddingRight: list.length > 8 ? 4 : 0 }}>
        {list.map(it => {
          const r = rarityInfo(it.rarity);
          const isOpen = openId === it.id;
          return (
            <div key={it.id} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${r.color}`, borderRadius: 7 }}>
              <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, alignItems: "center", padding: "6px 8px" }}>
                <TextInput value={it.name} onChange={e => upd(it.id, { name: e.target.value })} placeholder="Item name" style={{ color: r.color, fontWeight: 600 }} />
                <Select value={it.category} onChange={e => upd(it.id, { category: e.target.value })} style={{ fontSize: 11 }}>
                  <option value="">—</option>
                  {ITEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
                <Select value={it.rarity} onChange={e => upd(it.id, { rarity: e.target.value })} style={{ fontSize: 11, color: r.color }}>
                  {RARITY_TIERS.map(t => <option key={t.key} value={t.key} style={{ color: COLORS.text }}>{t.label}</option>)}
                </Select>
                <CommaNumInput value={it.zeni || 0} onValue={v => upd(it.id, { zeni: v })} title="Ƶeni each" style={{ textAlign: "center", fontSize: 11 }} />
                <TextInput type="number" value={it.qty} onChange={e => upd(it.id, { qty: +e.target.value || 1 })} title="Quantity" style={{ textAlign: "center", fontSize: 11 }} />
                <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <button onClick={() => setOpenId(isOpen ? null : it.id)} title="Slot & combat stats" style={{ background: "transparent", border: "none", color: it.slot ? COLORS.blue : COLORS.dim, cursor: "pointer", padding: 2 }}>{isOpen ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</button>
                  <button onClick={() => remove(it.id)} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 2 }} title="Remove"><Trash2 size={14}/></button>
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                    <Field label="Slot"><Select value={it.slot} onChange={e => upd(it.id, { slot: e.target.value })}>{SLOT_TYPES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</Select></Field>
                    <Field label="+AC bonus (stacks)"><TextInput type="number" value={it.acBonus} onChange={e => upd(it.id, { acBonus: +e.target.value || 0 })} /></Field>
                    <Field label="+DR"><TextInput type="number" value={it.dr} onChange={e => upd(it.id, { dr: +e.target.value || 0 })} /></Field>
                    <Field label="Weighted rank"><TextInput type="number" value={it.weightedRank} onChange={e => upd(it.id, { weightedRank: +e.target.value || 0 })} title="Weighted (Heavy) ranks while worn" /></Field>
                  </div>
                  {it.slot === "body" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 8, alignItems: "end" }}>
                      <Field label="Base AC"><TextInput type="number" value={it.acBase} onChange={e => upd(it.id, { acBase: +e.target.value || 0 })} /></Field>
                      <Field label="Dex handling"><Select value={it.acDexMode} onChange={e => upd(it.id, { acDexMode: e.target.value })}><option value="full">+ full Dex (light)</option><option value="max2">+ Dex, max 2 (medium)</option><option value="none">no Dex (heavy)</option></Select></Field>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, cursor: "pointer", paddingBottom: 8 }}><Checkbox checked={!!it.acHalfProf} onChange={e => upd(it.id, { acHalfProf: e.target.checked })} /> add ½ Prof</label>
                    </div>
                  )}
                  {it.slot === "held" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr", gap: 8 }}>
                      <Field label="Damage dice"><TextInput value={it.damageDice} onChange={e => upd(it.id, { damageDice: e.target.value })} placeholder="1d8+3" /></Field>
                      <Field label="Damage type"><TextInput value={it.damageType} onChange={e => upd(it.id, { damageType: e.target.value })} placeholder="Slashing" /></Field>
                      <Field label="Attack stat"><Select value={it.attackStat} onChange={e => upd(it.id, { attackStat: e.target.value })}>{ATTACK_STATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select></Field>
                    </div>
                  )}
                  <Field label="Notes"><TextInput value={it.notes} onChange={e => upd(it.id, { notes: e.target.value })} placeholder="Effect / description" /></Field>
                  <ItemStatModsEditor statMods={it.statMods} onChange={next => upd(it.id, { statMods: next })} />
                  <ItemEffectsEditor effects={it.effects} onChange={next => upd(it.id, { effects: next })} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={draft} onChange={e => setDraft(e.target.value)} placeholder="New custom item…" onKeyDown={e => { if (e.key === "Enter") addByName(); }} />
        <Btn size="sm" onClick={addByName}><Plus size={13}/> Create</Btn>
      </div>
    </div>
  );
}

// Where each slot marker sits on the silhouette (percent of the paperdoll box).
const SLOT_POS = {
  head: { l: 50, t: 5 }, eyes: { l: 50, t: 13 }, neck: { l: 50, t: 21 },
  body: { l: 50, t: 34 }, waist: { l: 50, t: 48 }, artifact: { l: 50, t: 61 }, feet: { l: 50, t: 94 },
  back: { l: 77, t: 27 },
  hand1: { l: 12, t: 40 }, wrists: { l: 15, t: 53 }, ring1: { l: 17, t: 66 },
  hand2: { l: 88, t: 40 }, gloves: { l: 85, t: 53 }, ring2: { l: 83, t: 66 },
};

// The Equipped paperdoll: a silhouette with the 14 body slots. Click a slot to
// equip a fitting inventory item; AC/DR update live off the equipment.
// The shared holographic body silhouette (used by the Inventory paperdoll and
// the Vitals tab). Fills its positioned parent; pass an aura color to flare it,
// and a stroke color to tint the figure (e.g. red when bloodied).
function BodyFigure({ aura = null, stroke = COLORS.blue }) {
  const bodyPath = "M120 36 C133 36 142 47 143 65 C143 78 138 86 132 90 L150 99 C170 104 182 110 186 118 L189 158 L183 210 C186 232 187 246 178 256 C170 262 164 256 167 244 L169 208 L161 150 C154 168 146 188 141 206 C148 214 150 224 150 234 L148 258 L145 320 L141 362 L137 399 C150 405 157 410 156 416 C146 420 134 417 127 410 L123 300 L120 252 L117 300 L113 410 C106 417 94 420 84 416 C83 410 90 405 103 399 L99 362 L95 320 L92 258 L90 234 C90 224 92 214 99 206 C94 188 86 168 79 150 L71 208 L73 244 C76 256 70 262 62 256 C53 246 54 232 57 210 L51 158 L54 118 C58 110 70 104 90 99 L108 90 C102 86 97 78 97 65 C98 47 107 36 120 36 Z";
  return (
    <svg viewBox="0 0 300 460" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <filter id="figGlow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="auraGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      {aura && (
        <g transform="translate(24,2) scale(1.05)">
          <path d={bodyPath} transform="translate(120,232) scale(1.16) translate(-120,-232)" fill={aura} fillOpacity="0.14" filter="url(#auraGlow)" />
          <path d="M120 452 L142 442 L158 404 L150 392 L190 338 L178 326 L214 256 L200 248 L210 178 L196 176 L188 104 L176 110 L166 36 L154 50 L146 -30 L132 4 L120 -58 L108 4 L94 -30 L86 50 L74 36 L64 110 L52 104 L44 176 L30 178 L40 248 L26 256 L62 326 L50 338 L90 392 L82 404 L98 442 Z" fill={aura} fillOpacity="0.16" stroke={aura} strokeOpacity="0.6" strokeWidth="1.4" strokeLinejoin="round" filter="url(#auraGlow)">
            <animate attributeName="opacity" values="0.6;1;0.72;0.95;0.6" dur="1.8s" repeatCount="indefinite" />
          </path>
        </g>
      )}
      <g transform="translate(24,2) scale(1.05)" filter="url(#figGlow)">
        <path d={bodyPath} fill={`${stroke}12`} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <g fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round">
          <path d="M101 103 Q120 113 139 103" /><path d="M120 111 L120 150" /><path d="M102 107 Q111 132 120 130" /><path d="M138 107 Q129 132 120 130" /><path d="M109 166 Q120 170 131 166" /><path d="M110 182 Q120 186 130 182" /><path d="M112 197 Q120 200 128 197" /><path d="M86 322 Q92 328 98 322" /><path d="M142 322 Q148 328 154 322" />
        </g>
      </g>
    </svg>
  );
}

export {
  TagListEditor,
  ITEM_CATEGORIES,
  ATTACK_STATS,
  ItemEffectsEditor,
  ItemStatModsEditor,
  ItemsEditor,
  SLOT_POS,
  BodyFigure,
};
