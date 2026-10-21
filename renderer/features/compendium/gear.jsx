import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { rarityInfo } from "../../data/book-tables.js";
import { CONSUMABLE_DATA, GEAR_DATA, GEAR_RULES, WEAPON_DATA } from "../../data/gear-data.js";
import { BOOK_EQUIPMENT } from "../../engine/equipment.js";
import { Tag, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { RulesText } from "../characters/species-book.jsx";

/* ===== Equipment (5.0 Ch.9): every table and rules entry, searchable. ===== */

const zeniLabel = (z) => z == null ? "" : z < 1 ? `${Math.round(z * 100)} CP` : `Ƶ ${z.toLocaleString()}`;
const SECTIONS = ["Weapons", "Armor", "Consumables", "Adventuring Gear", "Tools", "Weapon Properties", "Armor Rules", "Magical Gear", "Enchantments", "Heroic Gear", "Wondrous Items", "Scientific Marvels", "Mechs", "Vehicles"];

function Row({ title, meta, price, rarity, text }) {
  const [open, setOpen] = useState(false);
  const Icon = open ? ChevronDown : ChevronRight;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 7, marginBottom: 5 }}>
      <button onClick={() => text && setOpen(o => !o)} aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", background: "none", border: "none", cursor: text ? "pointer" : "default", color: COLORS.text, textAlign: "left" }}>
        {text ? <Icon size={13} color={COLORS.dim} /> : <span style={{ width: 13 }} />}
        <span style={{ fontWeight: 700, fontSize: 12.5, minWidth: 160 }}>{title}</span>
        <span style={{ fontSize: 11.5, color: COLORS.muted, flex: 1 }}>{meta}</span>
        {rarity && <Tag color={rarityInfo(rarity).color}>{rarityInfo(rarity).label}</Tag>}
        {price && <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.gold, minWidth: 70, textAlign: "right" }}>{price}</span>}
      </button>
      {open && <div style={{ padding: "0 12px 10px 33px" }}><RulesText text={text} /></div>}
    </div>
  );
}

function EquipmentCompendiumTab() {
  const [section, setSection] = useState("Weapons");
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const all = [
      ...WEAPON_DATA.map(w => ({ section: "Weapons", group: w.weaponGroup, title: w.name, meta: [`${w.damageDice} ${w.damageType}`, w.properties, `Mastery: ${w.mastery}`].filter(Boolean).join(" · "), price: zeniLabel(w.zeni) })),
      ...BOOK_EQUIPMENT.map(a => ({ section: "Armor", title: a.name, meta: [a.acBase ? `AC ${a.acBase}` : `+${a.acBonus} AC`, a.dr ? `DR ${a.dr}` : "", a.strReq ? `Str ${a.strReq}` : "", a.stealthDisadv ? "Stealth Disadvantage" : ""].filter(Boolean).join(" · "), price: zeniLabel(a.zeni), rarity: a.rarity, text: a.notes })),
      ...CONSUMABLE_DATA.map(c => ({ section: "Consumables", title: c.name, meta: "Restores " + Object.entries(c.restore).map(([k, v]) => `${v} ${k === "hp" ? "HP" : k === "ki" ? "Ki" : k === "stamina" ? "Stamina" : "Exhaustion"}`).join(", "), price: zeniLabel(c.zeni), text: c.notes })),
      ...GEAR_DATA.map(g => ({ section: g.category === "Tool" ? "Tools" : "Adventuring Gear", group: g.category === "Ammunition" ? "Ammunition" : g.category === "Scouter" ? "Scouters" : null, title: g.name, meta: g.weight, price: zeniLabel(g.zeni), text: g.notes })),
      ...GEAR_RULES.map(r => ({ section: r.section, group: r.category, title: r.name, meta: r.subtitle || "", price: r.zeni ? zeniLabel(r.zeni) : "", rarity: r.rarity, text: r.text })),
    ];
    return all;
  }, []);
  const ql = q.trim().toLowerCase();
  const list = rows.filter(r => ql ? `${r.title} ${r.meta} ${r.text || ""}`.toLowerCase().includes(ql) : r.section === section);
  const groups = [...new Set(list.map(r => (ql ? r.section : r.group) || ""))];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        {SECTIONS.map(s => (
          <button key={s} onClick={() => { setSection(s); setQ(""); }} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 11.5, fontWeight: 700, cursor: "pointer", border: `1px solid ${!ql && section === s ? COLORS.gold : COLORS.border}`, background: !ql && section === s ? `${COLORS.gold}1A` : COLORS.panel2, color: !ql && section === s ? COLORS.gold : COLORS.muted }}>{s}</button>
        ))}
        <div style={{ position: "relative", width: 220, marginLeft: "auto" }}>
          <Search size={13} style={{ position: "absolute", left: 9, top: 9, color: COLORS.dim }} />
          <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search all equipment" style={{ paddingLeft: 28 }} />
        </div>
      </div>
      {list.length === 0 && <div style={{ color: COLORS.dim, fontSize: 12.5 }}>Nothing matches.</div>}
      {groups.map(g => (
        <div key={g} style={{ marginBottom: 12 }}>
          {g && <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, margin: "6px 0" }}>{g}</div>}
          {list.filter(r => ((ql ? r.section : r.group) || "") === g).map((r, i) => <Row key={`${r.title}-${i}`} {...r} />)}
        </div>
      ))}
    </div>
  );
}

export { EquipmentCompendiumTab };
