import React, { useState } from "react";
import { BookOpen, Check, ChevronRight, ClipboardList, FileText, Globe2, Orbit, Plus, Search, Settings, Sparkles, Swords, Table2, Trash2, Wrench, Zap } from "lucide-react";
import { DM_PLAYBOOK } from "../../data/book-tables.js";
import { HIGH_TECH_PARTS } from "../../data/hightech-data.js";
import { gravAcclimRanks, gravityColor } from "../../engine/universe.js";
import { uid } from "../../lib/dice.js";
import { attunementCapFor, useHouseRules, useSharedList } from "../../state/hooks.js";
import { Btn, CommaNumInput, EmptyState, Field, LoadingBlock, ScannerHeader, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ============================== GM TOOLS HUB ============================== */
function DmPlaybookTab() {
  const [custom, persist] = useSharedList("custom_playbook_v1");
  const [query, setQuery] = useState("");
  const [closedSections, setClosedSections] = useState(() => new Set());   // default: everything open
  const [adding, setAdding] = useState(false);
  const blank = { section: "Homebrew", title: "", body: "" };
  const [draft, setDraft] = useState(blank);
  const toggleSection = (s) => setClosedSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  if (custom === null) return <LoadingBlock />;

  // Merge homebrew entries into the book sections (appending to an existing one,
  // or spinning up a new section) so custom advice lives alongside the real thing.
  const sectionMap = new Map();
  DM_PLAYBOOK.forEach(s => sectionMap.set(s.section, s.entries.map(e => ({ ...e }))));
  custom.forEach(c => { const sec = c.section || "Homebrew"; if (!sectionMap.has(sec)) sectionMap.set(sec, []); sectionMap.get(sec).push({ ...c, custom: true }); });
  const bookSections = DM_PLAYBOOK.map(s => s.section);
  const existingSections = [...sectionMap.keys()];

  const q = query.trim().toLowerCase();
  const filtered = [...sectionMap.entries()].map(([section, entries]) => ({
    section,
    entries: entries.filter(e => !q || e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q)),
  })).filter(section => section.entries.length > 0);

  const save = () => {
    if (!draft.title.trim()) return;
    persist([...custom, { id: uid(), section: (draft.section || "Homebrew").trim(), title: draft.title.trim(), body: draft.body.trim() }]);
    setDraft(blank); setAdding(false);
  };
  const remove = (id) => persist(custom.filter(c => c.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search DM advice — e.g. 'break bars', 'dying'..." style={{ paddingLeft: 30 }} />
        </div>
        {!adding && <Btn variant="gold" size="sm" onClick={() => setAdding(true)}><Plus size={14} /> Homebrew Entry</Btn>}
      </div>
      {adding && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Field label="Section"><TextInput list="dm-sections" value={draft.section} onChange={e => setDraft({ ...draft, section: e.target.value })} placeholder="Homebrew" /><datalist id="dm-sections">{existingSections.map(s => <option key={s} value={s} />)}</datalist></Field>
            <Field label="Title"><TextInput value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="Rule / advice name" /></Field>
          </div>
          <Field label="Body"><TextArea value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} placeholder="The advice, house rule, or reference text." /></Field>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <Btn variant="gold" size="sm" onClick={save}><Check size={13} /> Save Entry</Btn>
            <Btn variant="ghost" size="sm" onClick={() => { setAdding(false); setDraft(blank); }}>Cancel</Btn>
          </div>
        </div>
      )}
      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No matches" body="Try a different search term, or add a homebrew entry." />
      ) : filtered.map(section => {
        const open = !closedSections.has(section.section);
        const homebrewSection = !bookSections.includes(section.section);
        return (
          <div key={section.section} style={{ marginBottom: 14 }}>
            <div onClick={() => toggleSection(section.section)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <ChevronRight size={14} style={open ? { transform: "rotate(90deg)" } : undefined} color={COLORS.gold} />
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: COLORS.gold }}>{section.section}</div>
              {homebrewSection && <Tag color={COLORS.gold}>Homebrew</Tag>}
            </div>
            {open && section.entries.map((e, i) => (
              <div key={e.id || i} style={{ background: COLORS.panel, border: `1px solid ${e.custom ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 8, marginLeft: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{e.title}{e.custom && <Tag color={COLORS.gold}>Homebrew</Tag>}</div>
                  {e.custom && <Trash2 size={13} color={COLORS.red} style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => remove(e.id)} />}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 12.5, lineHeight: 1.6 }}>{e.body}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// Materoids Flavors — the table's home for deviant / optional rules. Toggles are
// shared house rules (useHouseRules), so a change applies for everyone at once.
// Browsable reference for the High-Tech Parts (cybernetics). Read-only; installing
// them onto a character happens on the character's Inventory → Cybernetics panel.
function HighTechCompendiumTab() {
  const [custom, persist] = useSharedList("custom_hightech_v1");
  const [adding, setAdding] = useState(false);
  const blank = { name: "", integrationDC: 10, zeni: 100, effect: "", advancedTech: "" };
  const [draft, setDraft] = useState(blank);
  if (custom === null) return <LoadingBlock />;
  const parts = [...HIGH_TECH_PARTS, ...custom];
  const isCustom = (id) => custom.some(c => c.id === id);
  const save = () => {
    if (!draft.name.trim()) return;
    persist([...custom, { ...draft, id: uid(), name: draft.name.trim(), integrationDC: +draft.integrationDC || 0, zeni: +draft.zeni || 0, custom: true }]);
    setDraft(blank); setAdding(false);
  };
  const remove = (id) => persist(custom.filter(c => c.id !== id));
  return (
    <div>
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
        <div style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Installation &amp; Limit</div>
        Install over 8 hours — the implementer makes an <span style={{ color: COLORS.text }}>Int (Technology) + Wis (Medicine)</span> check vs the Part's Integration DC; a failure costs the recipient 1 Rank of Exhaustion. Each attuned Part gives <span style={{ color: COLORS.amber }}>−2 to all Ki Control checks and Berserk saves</span>, and you can't attune duplicates. Your <span style={{ color: COLORS.text }}>Cybernetic Limit</span> (max installed) = <span style={{ color: COLORS.text }}>½ (CON mod + WIS mod)</span>. <span style={{ color: COLORS.green }}>Androids</span> take no negatives and treat every Part as Advanced; the <span style={{ color: COLORS.green }}>Cyborg</span> heritage also takes no negatives (Construct type). A Signature Upgrade grants one Part that doesn't count against the Limit.
      </div>
      <div style={{ marginBottom: 14 }}>
        {adding ? (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Field label="Part Name"><TextInput value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Cloaking Field" /></Field>
              <Field label="Integration DC"><TextInput type="number" value={draft.integrationDC} onChange={e => setDraft({ ...draft, integrationDC: e.target.value })} /></Field>
              <Field label="Ƶeni"><CommaNumInput value={draft.zeni} onValue={v => setDraft({ ...draft, zeni: v })} /></Field>
            </div>
            <Field label="Effect"><TextArea value={draft.effect} onChange={e => setDraft({ ...draft, effect: e.target.value })} placeholder="What the base part does." /></Field>
            <Field label="Advanced Tech"><TextArea value={draft.advancedTech} onChange={e => setDraft({ ...draft, advancedTech: e.target.value })} placeholder="The upgraded effect (Androids treat every Part as Advanced)." /></Field>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <Btn variant="gold" size="sm" onClick={save}><Check size={13} /> Save Part</Btn>
              <Btn variant="ghost" size="sm" onClick={() => { setAdding(false); setDraft(blank); }}>Cancel</Btn>
            </div>
          </div>
        ) : (
          <Btn variant="gold" size="sm" onClick={() => setAdding(true)}><Plus size={14} /> Homebrew Part</Btn>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
        {parts.map(p => (
          <div key={p.id} style={{ background: COLORS.panel2, border: `1px solid ${isCustom(p.id) ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}{isCustom(p.id) && <Tag color={COLORS.gold} style={{ marginLeft: 6 }}>Homebrew</Tag>}</span>
              <span style={{ fontSize: 10, color: COLORS.dim, fontFamily: FONTS.mono, display: "flex", alignItems: "center", gap: 6 }}>DC {p.integrationDC} · Ƶ{(p.zeni || 0).toLocaleString()}{isCustom(p.id) && <Trash2 size={12} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => remove(p.id)} />}</span>
            </div>
            {p.effect && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5, marginBottom: 6 }}>{p.effect}</div>}
            {p.advancedTech && <div style={{ fontSize: 11, color: COLORS.blue, lineHeight: 1.5 }}><span style={{ color: COLORS.dim, textTransform: "uppercase", fontSize: 9, letterSpacing: 0.5 }}>Advanced Tech</span><br />{p.advancedTech}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MateroidsFlavorsTab() {
  const [houseRules, persist] = useHouseRules();
  const [chars] = useSharedList("characters_v2");
  const OptionCard = ({ active, onClick, title, formula, blurb }) => (
    <div onClick={onClick} style={{ cursor: "pointer", flex: 1, minWidth: 240, background: active ? `${COLORS.gold}14` : COLORS.panel, border: `1px solid ${active ? COLORS.gold : COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${active ? COLORS.gold : COLORS.muted}`, background: active ? COLORS.gold : "transparent", flexShrink: 0 }} />
        <div style={{ fontWeight: 700, fontSize: 14, color: active ? COLORS.gold : COLORS.text }}>{title}</div>
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.blue, marginBottom: 8, lineHeight: 1.5 }}>{formula}</div>
      <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.55 }}>{blurb}</div>
    </div>
  );
  const system = houseRules.powerSystem;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ fontSize: 12.5, color: COLORS.muted }}>Deviant rules &amp; optional content for your table. Changes here are shared with everyone in the room.</div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Power Level System</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Which number the Combat banner and Stats page show as your power level.</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <OptionCard active={system === "kili"} onClick={() => persist({ powerSystem: "kili" })}
            title="Kili (Book)"
            formula="Max HP × (Ki ÷ 2) × (Power Bonus + 1)"
            blurb="The book's grounded metric. Steady, mid-range numbers; weight doesn't swing it. Best if you like readable power comparisons." />
          <OptionCard active={system === "battlePower"} onClick={() => persist({ powerSystem: "battlePower" })}
            title="Higher Power Levels"
            formula="Current HP × Current Ki × (1 + Ki Rank + Power Bonus) × Form Multiplier × Weight"
            blurb="The scouter reading. Every power buff (forms, Hyper Mode, Enraged) raises it, and a Form's Multiplier field pushes it into the astronomical values from the manga and show — and it drops as a fighter takes damage." />
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Attunement Slots</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>The book caps Attunement at 2. Unlock to set your own limit for the table.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ attunementCapEnabled: !houseRules.attunementCapEnabled })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.attunementCapEnabled ? COLORS.gold : COLORS.border}`, background: houseRules.attunementCapEnabled ? `${COLORS.gold}1A` : "transparent", color: houseRules.attunementCapEnabled ? COLORS.gold : COLORS.muted }}>
            {houseRules.attunementCapEnabled ? "Custom cap" : "Book cap (2)"}
          </button>
          {houseRules.attunementCapEnabled && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: COLORS.muted }}>Limit</span>
              <TextInput type="number" value={houseRules.attunementCap} onChange={e => persist({ attunementCap: Math.max(0, +e.target.value || 0) })} style={{ width: 90, textAlign: "center" }} />
            </div>
          )}
          <span style={{ marginLeft: "auto", fontSize: 12, color: COLORS.dim }}>Effective: <b style={{ color: COLORS.text }}>{attunementCapFor(houseRules)}</b> slots</span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Gravity Acclimation</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>A fighter trained under crushing gravity stays strong anywhere lighter. With this on, a character's Bio gains an <b>Accustomed Gravity</b> field — the highest gravity they can handle — and they auto-gain ranks of Weighted (Light): <b>10× → +1</b>, <b>25× → +2</b>, <b>50× → +3</b>, which feed their Power and Battle Power.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: (houseRules.gravityAcclimation && (chars || []).length) ? 14 : 0 }}>
            <button onClick={() => persist({ gravityAcclimation: !houseRules.gravityAcclimation })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.gravityAcclimation ? COLORS.gold : COLORS.border}`, background: houseRules.gravityAcclimation ? `${COLORS.gold}1A` : "transparent", color: houseRules.gravityAcclimation ? COLORS.gold : COLORS.muted }}>
              {houseRules.gravityAcclimation ? "On — Lightweight auto-applied" : "Off (book default)"}
            </button>
            <span style={{ fontSize: 11.5, color: COLORS.dim }}>Auto-grants Lightweight from each fighter's Accustomed Gravity (set on their Bio).</span>
          </div>
          {houseRules.gravityAcclimation && (chars || []).filter(c => !c.archived).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Accustomed gravity</div>
              {(chars || []).filter(c => !c.archived).map(c => {
                const r = gravAcclimRanks(c.accustomedGravity);
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, padding: "5px 8px", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8 }}>
                    <span style={{ fontWeight: 700, flex: 1, minWidth: 0 }}>{c.name}</span>
                    <span style={{ color: gravityColor(c.accustomedGravity), fontFamily: FONTS.mono }}>{c.accustomedGravity ? `${c.accustomedGravity}×g` : "—"}</span>
                    {r > 0 ? <Tag color={COLORS.green}>Lightweight +{r}</Tag> : <span style={{ fontSize: 10.5, color: COLORS.dim }}>no bonus (&lt;10×)</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Harsh Galaxies</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>The world you fight on bites back. With this on, the party's current planet goes live in the Session tracker so its gravity, weather and star conditions are in effect during play for the table to run. Off keeps every world as pure flavor.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ harshGalaxies: !houseRules.harshGalaxies })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.harshGalaxies ? COLORS.gold : COLORS.border}`, background: houseRules.harshGalaxies ? `${COLORS.gold}1A` : "transparent", color: houseRules.harshGalaxies ? COLORS.gold : COLORS.muted }}>
            {houseRules.harshGalaxies ? "On · environmental conditions live" : "Off · worlds are flavor only"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Quick Combat</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>For the fights you would rather not play out in full. With this on, the Session tab gains a Quick Combat surface that skips a skirmish to an answer, weighing the party's Battle Power against the enemy force and handing back an outcome plus the toll it took. Scales up to army versus army.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ quickCombat: !houseRules.quickCombat })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.quickCombat ? COLORS.gold : COLORS.border}`, background: houseRules.quickCombat ? `${COLORS.gold}1A` : "transparent", color: houseRules.quickCombat ? COLORS.gold : COLORS.muted }}>
            {houseRules.quickCombat ? "On · Quick Combat tab shown" : "Off"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Base Building</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>For tables that want a home to fight for. With this on, a Base tab appears: your player faction's home world (its facilities and commerce, spread across the planet) and a capital ship you carry with you. Both have Structural Integrity and Shields, so they can be developed, defended, and wrecked in a conflict. Off hides the tab entirely.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ baseBuilding: !houseRules.baseBuilding })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.baseBuilding ? COLORS.gold : COLORS.border}`, background: houseRules.baseBuilding ? `${COLORS.gold}1A` : "transparent", color: houseRules.baseBuilding ? COLORS.gold : COLORS.muted }}>
            {houseRules.baseBuilding ? "On · Base tab shown" : "Off"}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>More Governing</div>
        <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Adds a governance layer to the Base tab's home world (needs Base Building on). The base runs a weekly economy: income auto-derives from the planet's wealth, tax and commerce facilities, banks over time on the Session clock, and splits into a small player dividend and the People's Money that funds upgrades. Facilities move Stability and Reputation, and a "legal" Black Market lets the party trade the people's trust for profit. A balancing game for tables that want it.</div>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <button onClick={() => persist({ moreGoverning: !houseRules.moreGoverning })} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, borderRadius: 20, padding: "6px 16px", border: `1px solid ${houseRules.moreGoverning ? COLORS.gold : COLORS.border}`, background: houseRules.moreGoverning ? `${COLORS.gold}1A` : "transparent", color: houseRules.moreGoverning ? COLORS.gold : COLORS.muted }}>
            {houseRules.moreGoverning ? "On · Governance shown on the base" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GmToolsHub({ setScreen }) {
  const tiles = [
    { key: "tables", label: "Tables", icon: Table2, color: COLORS.gold },
    { key: "worldrules", label: "World & Rules", icon: Orbit, color: COLORS.green },
    { key: "builders", label: "Builders", icon: Swords, color: COLORS.red },
    { key: "compendium", label: "Data Pool", icon: Globe2, color: COLORS.blue },
    { key: "feats", label: "Feats", icon: ClipboardList, color: COLORS.amber },
    { key: "techniques", label: "Techniques", icon: Zap, color: COLORS.blue },
    { key: "notes", label: "Notes", icon: FileText, color: COLORS.green },
    { key: "npcs", label: "NPCs", icon: Sparkles, color: COLORS.purple },
    { key: "materoids", label: "Materoids Flavors", icon: Settings, color: COLORS.purple },
    { key: "hightech", label: "High-Tech Parts", icon: Wrench, color: COLORS.blue },
    { key: "playbook", label: "DM Playbook", icon: BookOpen, color: COLORS.red },
    { key: "options", label: "Options", icon: Settings, color: COLORS.muted },
  ];
  return (
    <div>
      <ScannerHeader title="COMPENDIUM" subtitle="Your table's dictionary — look up or store anything in the game." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
        {tiles.map(t => (
          <div key={t.key} onClick={() => setScreen(t.key)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18, textAlign: "center" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.color+"77"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
            <t.icon size={26} color={t.color} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  DmPlaybookTab,
  HighTechCompendiumTab,
  MateroidsFlavorsTab,
  GmToolsHub,
};
