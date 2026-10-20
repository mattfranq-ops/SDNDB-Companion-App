import React, { useState, useEffect } from "react";
import { Minus, Plus, Search, Sparkles, Swords, Trash2, TrendingUp, Users, X } from "lucide-react";
import { _pendingNav, clearPendingNav, onNav } from "../../app/bus.js";
import { ANTAGONIST_DATA, ANTAGONIST_TRAITS } from "../../data/npc-data.js";
import { abilityMod } from "../../engine/core.js";
import { STAT_KEYS } from "../../engine/skills.js";
import { isCaster } from "../../engine/spellcasting.js";
import { Btn, EmptyState, Field, Gauge, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { CombatRefTab } from "../characters/combat-tab.jsx";
import { ConditionsPanel, FormsPlayTab, FormsTab } from "../characters/forms.jsx";
import { MagicTab } from "../characters/magic.jsx";
import { StatsTab } from "../characters/stats-tab.jsx";
import { KnownTechniquesTab } from "../characters/techniques-tab.jsx";
import { InventoryTab } from "../characters/vitals-gear.jsx";
import { ANTAGONIST_TYPES, BreakBarsPanel, antagonistDerived } from "./antagonist.jsx";

// Section text from the book keeps its markdown; render it plainly — emphasis
// stripped, table rows in monospace so the columns still line up.
function BookText({ text }) {
  const blocks = [];
  let cur = null;
  for (const line of (text || "").split("\n")) {
    const isRow = line.trim().startsWith("|");
    if (!cur || cur.table !== isRow) { cur = { table: isRow, lines: [] }; blocks.push(cur); }
    cur.lines.push(line);
  }
  const strip = (s) => s.replace(/\*\*\*|\*\*|\*|#{2,}\s?/g, "").replace(/^:\s*$/gm, "").replace(/^___\s*$/gm, "");
  return (
    <div style={{ fontSize: 12, lineHeight: 1.55 }}>
      {blocks.map((blk, i) => {
        if (!blk.table) return <div key={i} style={{ whiteSpace: "pre-wrap", color: COLORS.text }}>{strip(blk.lines.join("\n")).replace(/\n{3,}/g, "\n\n").trim()}</div>;
        const rows = blk.lines.filter(l => !/^\|[\s:|-]+\|$/.test(l.trim()))
          .map(l => l.trim().replace(/^\||\|$/g, "").split("|").map(c => strip(c).trim()));
        if (!rows.length) return null;
        return (
          <table key={i} style={{ borderCollapse: "collapse", margin: "8px 0", width: "100%", fontSize: 11.5 }}>
            <tbody>
              {rows.map((cells, r) => (
                <tr key={r}>
                  {cells.map((c, j) => r === 0
                    ? <th key={j} style={{ border: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, textAlign: "left", whiteSpace: "nowrap" }}>{c}</th>
                    : <td key={j} style={{ border: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.text, verticalAlign: "top" }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}


function BookAntagonistBrowser({ onPick }) {
  const [query, setQuery] = useState("");
  const [saga, setSaga] = useState("all");
  const [tier, setTier] = useState("all");
  const sagas = [...new Set(ANTAGONIST_DATA.map(b => b.saga).filter(Boolean))];
  const results = ANTAGONIST_DATA.filter(b => {
    if (saga !== "all" && b.saga !== saga) return false;
    if (tier !== "all" && b.tier !== tier) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return b.name.toLowerCase().includes(q) || (b.group || "").toLowerCase().includes(q) || (b.meta || "").toLowerCase().includes(q);
  });
  const tierColor = { General: COLORS.blue, Elite: COLORS.amber, Iconic: COLORS.red };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search fighters..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={saga} onChange={e => setSaga(e.target.value)} style={{ width: 220 }}>
          <option value="all">All sagas</option>
          {sagas.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={tier} onChange={e => setTier(e.target.value)} style={{ width: 130 }}>
          <option value="all">All tiers</option>
          {["General", "Elite", "Iconic"].map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 8 }}>{results.length} fighter{results.length === 1 ? "" : "s"}</div>
      <div style={{ maxHeight: 420, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 8, paddingRight: 4 }}>
        {results.map(b => {
          const tc = tierColor[b.tier] || COLORS.dim;
          return (
            <div key={b.id} onClick={() => onPick(b)} style={{ cursor: "pointer", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, display: "flex", gap: 10 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, background: `${tc}1A`, border: `1px solid ${tc}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 16, color: tc }}>{(b.name || "?").charAt(0).toUpperCase()}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {b.tier && <Tag color={tc}>{b.tier}</Tag>}
                  {b.antagonistLevel != null && <Tag color={COLORS.dim}>AL {b.antagonistLevel}</Tag>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>{b.name}</div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[b.saga, b.group].filter(Boolean).join(" · ")}</div>
                <div style={{ fontSize: 10, marginTop: 3, color: COLORS.dim, fontFamily: "JetBrains Mono, monospace" }}>
                  HP {b.hp}{b.powerLevel != null ? ` · PL ${b.powerLevel.toLocaleString()}` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Reusable editor for a list of {name, text} entries — traits, techniques,
// Iconic Actions, Telegraphed Actions all share this shape.
function NamedEntryList({ label, entries, onChange, color = COLORS.blue, namePlaceholder = "Name", suggestions }) {
  const list = entries || [];
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const add = () => { const n = name.trim(); if (!n) return; onChange([...list, { name: n, text: text.trim() }]); setName(""); setText(""); };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}{list.length ? ` (${list.length})` : ""}</div>
      {list.map((e, i) => (
        <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 8px", marginBottom: 4, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{ flex: 1, fontSize: 12 }}><b style={{ color }}>{e.name}</b>{e.text ? <span style={{ color: COLORS.text }}> — {e.text}</span> : null}</div>
          <X size={12} onClick={() => onChange(list.filter((_, j) => j !== i))} style={{ cursor: "pointer", color: COLORS.red, flexShrink: 0, marginTop: 2 }} />
        </div>
      ))}
      {suggestions && suggestions.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "4px 0 6px" }}>
          {suggestions.filter(s => !list.some(e => e.name === s.name)).slice(0, 12).map((s, i) => (
            <span key={i} onClick={() => onChange([...list, s])} title={s.text} style={{ cursor: "pointer", fontSize: 10.5, color: COLORS.dim, border: `1px dashed ${COLORS.border}`, borderRadius: 12, padding: "2px 8px" }}>+ {s.name}</span>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,1fr) 2fr auto", gap: 6 }}>
        <TextInput value={name} onChange={e => setName(e.target.value)} placeholder={namePlaceholder} style={{ fontSize: 12 }} />
        <TextInput value={text} onChange={e => setText(e.target.value)} placeholder="Description (optional)" style={{ fontSize: 12 }} onKeyDown={e => e.key === "Enter" && add()} />
        <Btn size="sm" onClick={add}><Plus size={12} /></Btn>
      </div>
    </div>
  );
}

// Editable antagonist stat block — the shared build surface for Empty, Guided
// output, and (as an editable copy) Pregenerated. Type + Level drive the derived
// readout; Iconic unlocks the legendary panels.
function EditableStatBlock({ npc, onUpdate }) {
  const set = (patch) => onUpdate(patch);
  const conMod = abilityMod(npc.stats?.con ?? 10);
  const wisMod = abilityMod(npc.stats?.wis ?? 10);
  const derived = npc.tier ? antagonistDerived(npc.tier, npc.antagonistLevel, conMod, wisMod) : null;
  const isIconic = npc.tier === "Iconic";
  const head = { fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "14px 0 6px" };
  const cap = derived?.abilityCap;
  const speciesTraits = ANTAGONIST_TRAITS.species[npc.species] || [];
  const archetypeTraits = ANTAGONIST_TRAITS.archetype[npc.archetype] || [];
  const suggestions = [...ANTAGONIST_TRAITS.universal, ...archetypeTraits, ...speciesTraits];

  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
      {/* Type / Level / Archetype / Species + derived readout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
        <Field label="Antagonist Type"><Select value={npc.tier || ""} onChange={e => set({ tier: e.target.value })}><option value="">— none —</option>{ANTAGONIST_TYPES.map(t => <option key={t}>{t}</option>)}</Select></Field>
        <Field label="Antagonist Level"><TextInput type="number" value={npc.antagonistLevel ?? 1} min={1} max={30} onChange={e => { const v = Math.max(1, Math.min(30, +e.target.value || 1)); set({ antagonistLevel: v, level: v }); }} /></Field>
        <Field label="Archetype"><Select value={npc.archetype || ""} onChange={e => set({ archetype: e.target.value })}><option value="">— none —</option>{Object.keys(ANTAGONIST_TRAITS.archetype).map(a => <option key={a}>{a}</option>)}</Select></Field>
        <Field label="Species"><Select value={npc.species || ""} onChange={e => set({ species: e.target.value })}><option value="">— none —</option>{Object.keys(ANTAGONIST_TRAITS.species).map(s => <option key={s}>{s}</option>)}</Select></Field>
      </div>
      {derived && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 11.5, color: COLORS.muted, margin: "2px 0 4px" }}>
          <span><b style={{ color: COLORS.gold }}>Ki Rank</b> {derived.kiRank}</span>
          <span><b>Prof</b> +{derived.prof}</span>
          <span><b>Hit Die</b> {derived.hitDie}</span>
          <span><b>Ability Cap</b> {derived.abilityCap ?? "—"}</span>
          <span><b>Feats</b> {derived.feats}</span>
          <span><b>Techniques</b> {derived.techniques}{derived.superTechniques ? ` (+${derived.superTechniques} Super)` : ""}</span>
          <span><b>Stamina</b> {derived.stamina}</span>
          <span><b>Ki/Lvl</b> {derived.kiPerLevel}</span>
          {isIconic && <span><b style={{ color: COLORS.red }}>Max Phases</b> {derived.maxPhases}</span>}
        </div>
      )}

      {/* Ability scores */}
      <div style={head}>Ability Scores</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
        {STAT_KEYS.map(k => {
          const v = npc.stats?.[k] ?? 10;
          const over = cap && v > cap;
          return (
            <div key={k} style={{ background: COLORS.panel, border: `1px solid ${over ? COLORS.red : COLORS.border}`, borderRadius: 6, padding: "5px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase" }}>{k}</div>
              <input type="number" value={v} onChange={e => set({ stats: { ...npc.stats, [k]: +e.target.value } })} style={{ width: "100%", textAlign: "center", background: "transparent", border: "none", color: over ? COLORS.red : COLORS.text, fontWeight: 700, fontSize: 14, outline: "none" }} />
              <div style={{ fontSize: 9.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)}</div>
            </div>
          );
        })}
      </div>
      {cap && <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 3 }}>Ability score max for a {npc.tier} at Ki Rank {derived.kiRank}: {cap}</div>}

      {/* Traits, techniques, feats */}
      <div style={head}>Traits</div>
      <NamedEntryList label="Traits" entries={npc.traits} onChange={v => set({ traits: v })} color={COLORS.green} namePlaceholder="Trait name" suggestions={suggestions} />
      <div style={head}>Feats &amp; Technique Notes</div>
      <NamedEntryList label="Feats" entries={npc.feats} onChange={v => set({ feats: v })} color={COLORS.amber} namePlaceholder="Feat" />
      <NamedEntryList label="Technique Notes" entries={npc.refTechniques} onChange={v => set({ refTechniques: v })} color={COLORS.blue} namePlaceholder="Technique" />
      <div style={{ fontSize: 9.5, color: COLORS.dim }}>Rollable Ki techniques live in the Techniques tab.</div>

      {/* Legendary / Iconic kit */}
      {isIconic && (
        <>
          <div style={{ ...head, color: COLORS.red }}>Legendary Kit</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, color: COLORS.text }}>Legendary Resistance</span>
            <Btn size="sm" onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, max: Math.max(0, (npc.legendaryResistance?.max || 0) - 1), used: Math.min(npc.legendaryResistance?.used || 0, Math.max(0, (npc.legendaryResistance?.max || 0) - 1)) } })}><Minus size={11} /></Btn>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{npc.legendaryResistance?.max || 0}/day</span>
            <Btn size="sm" onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, max: (npc.legendaryResistance?.max || 0) + 1 } })}><Plus size={11} /></Btn>
          </div>
          <NamedEntryList label="Iconic Actions" entries={npc.iconicActions} onChange={v => set({ iconicActions: v })} color={COLORS.red} namePlaceholder="Iconic Action" />
          <NamedEntryList label="Telegraphed Actions" entries={npc.telegraphedActions} onChange={v => set({ telegraphedActions: v })} color={COLORS.amber} namePlaceholder="Telegraphed Action" />
          <div style={{ fontSize: 9.5, color: COLORS.dim }}>Phase HP thresholds are tracked as Break Bars above.</div>
        </>
      )}

      {/* Book prose sections (Actions etc.), editable */}
      {Object.keys(npc.sections || {}).length > 0 && (
        <>
          <div style={head}>Sections</div>
          {Object.entries(npc.sections).map(([sec, body]) => (
            <div key={sec} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, marginBottom: 3 }}>{sec}</div>
              <TextArea value={body} onChange={e => set({ sections: { ...npc.sections, [sec]: e.target.value } })} style={{ fontSize: 11.5 }} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// Bulk deploy — pick from the saved bestiary with a per-NPC quantity, then push
// them all onto the Session initiative tracker at once.
function BulkDeploy({ npcs, onDeploy, onCancel }) {
  const [qty, setQty] = useState({});
  const [query, setQuery] = useState("");
  const results = npcs.filter(n => !query || (n.name || "").toLowerCase().includes(query.toLowerCase()));
  const setQ = (id, v) => setQty(prev => ({ ...prev, [id]: Math.max(0, v) }));
  const picks = npcs.filter(n => (qty[n.id] || 0) > 0).map(n => ({ npc: n, qty: qty[n.id] }));
  const total = picks.reduce((s, p) => s + p.qty, 0);
  if (npcs.length === 0) return <EmptyState icon={Users} title="No saved NPCs" body="Create some antagonists first, then deploy them here." />;
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
        <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your bestiary..." style={{ paddingLeft: 30 }} />
      </div>
      <div style={{ maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
        {results.map(n => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.panel2, border: `1px solid ${(qty[n.id] || 0) > 0 ? COLORS.purple + "66" : COLORS.border}`, borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{n.name}</div>
              <div style={{ fontSize: 10.5, color: COLORS.muted }}>{[n.tier, n.species, n.role].filter(Boolean).join(" · ") || "—"} · HP {n.maxHp ?? n.hp}</div>
            </div>
            <Btn size="sm" onClick={() => setQ(n.id, (qty[n.id] || 0) - 1)}><Minus size={12} /></Btn>
            <span style={{ width: 22, textAlign: "center", fontWeight: 700, color: (qty[n.id] || 0) > 0 ? COLORS.purple : COLORS.dim }}>{qty[n.id] || 0}</span>
            <Btn size="sm" onClick={() => setQ(n.id, (qty[n.id] || 0) + 1)}><Plus size={12} /></Btn>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        <Btn variant="gold" disabled={total === 0} style={{ opacity: total === 0 ? 0.5 : 1 }} onClick={() => onDeploy(picks)}><Swords size={14} /> Add {total || ""} to Encounter</Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

// Read-only stat readout for the Sheet tab — ability scores + the derived
// antagonist line + any book meta (senses/resistances). Works for book,
// guided and blank NPCs alike; editing happens in the Growth tab.
function NpcStatReadout({ npc }) {
  const conMod = abilityMod(npc.stats?.con ?? 10), wisMod = abilityMod(npc.stats?.wis ?? 10);
  const derived = npc.tier ? antagonistDerived(npc.tier, npc.antagonistLevel, conMod, wisMod) : null;
  const b = npc.book || {};
  const head = { fontSize: 10.5, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "12px 0 6px" };
  const line = { fontSize: 12, color: COLORS.text };
  const meta = [b.senses, b.languages, b.resistances && `Resistances: ${b.resistances}`, b.immunities && `Immunities: ${b.immunities}`, b.savingThrows && `Saves: ${b.savingThrows}`, b.skills && `Skills: ${b.skills}`].filter(Boolean).join(" · ");
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12 }}>
        {b.powerLevel != null && <span style={line}><b style={{ color: COLORS.gold }}>Power Level</b> {b.powerLevel.toLocaleString()}</span>}
        <span style={line}><b>Antagonist Lv</b> {npc.antagonistLevel ?? npc.level ?? 1}</span>
        {derived && <><span style={line}><b>Ki Rank</b> {derived.kiRank}</span><span style={line}><b>Prof</b> +{derived.prof}</span><span style={line}><b>Hit Die</b> {derived.hitDie}</span></>}
      </div>
      <div style={head}>Ability Scores</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
        {STAT_KEYS.map(k => { const v = npc.stats?.[k] ?? 10; return (
          <div key={k} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase" }}>{k}</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{v} ({abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)})</div>
          </div>); })}
      </div>
      {meta && <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 8 }}>{meta}</div>}
    </div>
  );
}

// The NPC's abilities on their own page — traits, feats, actions and statblock
// prose shown with full descriptions (the player Features tab's counterpart).
// Building/editing happens in the Growth tab; this is the read surface.
function NpcFeaturesTab({ npc }) {
  const isIconic = npc.tier === "Iconic";
  const head = { fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, margin: "0 0 8px" };
  const Entry = ({ e, color }) => (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "9px 11px", marginBottom: 6 }}>
      <div style={{ fontWeight: 700, fontSize: 13, color }}>{e.name}</div>
      {e.text && <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5, marginTop: 3, whiteSpace: "pre-line" }}>{e.text.replace(/\*\*\*|\*\*|\*/g, "")}</div>}
    </div>
  );
  const Section = ({ label, entries, color }) => (entries && entries.length) ? (
    <div style={{ marginBottom: 18 }}>
      <div style={head}>{label} ({entries.length})</div>
      {entries.map((e, i) => <Entry key={i} e={e} color={color} />)}
    </div>
  ) : null;
  const secEntries = Object.entries(npc.sections || {});
  const empty = !(npc.traits?.length || npc.feats?.length || npc.refTechniques?.length || (isIconic && (npc.iconicActions?.length || npc.telegraphedActions?.length)) || secEntries.length);
  if (empty) return <EmptyState icon={Sparkles} title="No features yet" body="Add traits, feats and actions in the Growth tab — they'll show here with their full descriptions." />;
  return (
    <div>
      <Section label="Traits" entries={npc.traits} color={COLORS.green} />
      {isIconic && <Section label="Iconic Actions" entries={npc.iconicActions} color={COLORS.red} />}
      {isIconic && <Section label="Telegraphed Actions" entries={npc.telegraphedActions} color={COLORS.amber} />}
      <Section label="Feats" entries={npc.feats} color={COLORS.amber} />
      <Section label="Technique Notes" entries={npc.refTechniques} color={COLORS.blue} />
      {secEntries.map(([sec, body]) => (
        <div key={sec} style={{ marginBottom: 14 }}>
          <div style={head}>{sec}</div>
          <BookText text={body} />
        </div>
      ))}
    </div>
  );
}

// The NPC sheet — a near-mirror of the player play surface. Sheet holds the
// running stat block; Stats (roll tables), Features, Techniques, Combat, Forms and
// Inventory reuse the exact player tab components. A Growth tab is the build
// surface (stat block + traits + form catalog) — the DM-only counterpart to the
// player's Growth, keeping construction off the running sheet.
function NpcSheet({ npc, onUpdate, onRemove, onClose }) {
  const [tab, setTab] = useState(() => (_pendingNav && _pendingNav.entityId === npc.id && _pendingNav.sheetTab) || (npc._startEditing ? "growth" : "sheet"));
  const [combatTarget, setCombatTarget] = useState(() => (_pendingNav && _pendingNav.entityId === npc.id && _pendingNav.target) || null);
  const set = (patch) => onUpdate(patch);
  // Consume the pending Session hand-off and keep listening for further ones.
  useEffect(() => {
    clearPendingNav(npc.id);
    return onNav(p => {
      if (p.entityId !== npc.id) return;
      if (p.sheetTab) setTab(p.sheetTab);
      setCombatTarget(p.target || null);
    });
  }, [npc.id]);
  // Casters (archetype Caster/Mage, or an NPC with spellcasting enabled) get the
  // same Magic surface as players.
  const npcIsCaster = isCaster(npc) || ["Caster", "Mage"].includes(npc.archetype);
  const TABS = ["sheet", "stats", "features", "techniques", "combat", "forms", ...(npcIsCaster ? ["magic"] : []), "inventory"];
  const TAB_LABELS = { sheet: "Sheet", stats: "Stats", features: "Features", techniques: "Techniques", combat: "Combat", forms: "Forms", magic: "Magic", inventory: "Inventory" };
  const hasStamina = (npc.maxStamina || 0) > 0;
  const box = (title, node) => (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>{title}</div>
      {node}
    </div>
  );
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <TextInput value={npc.name} onChange={e => set({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm" variant={tab === "growth" ? "gold" : "default"} onClick={() => setTab(tab === "growth" ? "sheet" : "growth")}><TrendingUp size={13} /> Growth</Btn>
          <Btn size="sm" variant="danger" onClick={onRemove}><Trash2 size={13} /></Btn>
          <Btn size="sm" variant="ghost" onClick={onClose}><X size={15} /></Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {npc.tier && <Tag color={COLORS.purple}>{npc.tier}</Tag>}
        {npc.antagonistLevel > 1 && <Tag color={COLORS.dim}>Lv {npc.antagonistLevel}</Tag>}
        {npc.species && <Tag color={COLORS.blue}>{npc.species}</Tag>}
        {npc.archetype && <Tag color={COLORS.green}>{npc.archetype}</Tag>}
        {npc.role && <Tag color={COLORS.gold}>{npc.role}</Tag>}
      </div>
      {/* Always-visible vitals so HP/Ki track no matter which tab you're on */}
      <div style={{ display: "grid", gridTemplateColumns: hasStamina ? "1fr 1fr 1fr" : "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <Gauge label="HP" value={npc.hp} max={npc.maxHp} color={COLORS.red} />
        <Gauge label="Ki" value={npc.ki} max={npc.maxKi} color={COLORS.blue} />
        {hasStamina && <Gauge label="Stamina" value={npc.stamina} max={npc.maxStamina} color={COLORS.gold} />}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "sheet" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 12 }}>
            {[["ac", "AC"], ["dc", "DC"], ["attackBonus", "Atk Bonus"], ["saveBonus", "Save Bonus"], ["dr", "DR"]].map(([key, label]) => (
              <div key={key} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9.5, color: COLORS.muted, marginBottom: 2 }}>{label}</div>
                <TextInput type="number" value={npc[key] ?? 0} onChange={e => set({ [key]: +e.target.value })} style={{ textAlign: "center", border: "none", background: "transparent", fontWeight: 700, padding: 2 }} />
              </div>
            ))}
          </div>
          {npc.legendaryResistance?.max > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 11.5 }}>
              <span style={{ color: COLORS.red, fontWeight: 700 }}>Legendary Resistance</span>
              {Array.from({ length: npc.legendaryResistance.max }).map((_, i) => {
                const spent = i < (npc.legendaryResistance.used || 0);
                return <span key={i} onClick={() => set({ legendaryResistance: { ...npc.legendaryResistance, used: spent ? i : i + 1 } })} style={{ cursor: "pointer", width: 14, height: 14, borderRadius: "50%", border: `1px solid ${COLORS.red}`, background: spent ? "transparent" : COLORS.red }} title={spent ? "regain" : "spend"} />;
              })}
              <span style={{ color: COLORS.dim }}>{npc.legendaryResistance.max - (npc.legendaryResistance.used || 0)} left</span>
            </div>
          )}
          <BreakBarsPanel npc={npc} onUpdate={set} />
          <Field label="Hook"><TextInput value={npc.hook} onChange={e => set({ hook: e.target.value })} /></Field>
          <Field label="GM Notes"><TextArea value={npc.notes} onChange={e => set({ notes: e.target.value })} /></Field>
          <NpcStatReadout npc={npc} />
        </div>
      )}
      {tab === "stats" && <StatsTab char={npc} set={set} />}
      {tab === "features" && <NpcFeaturesTab npc={npc} />}
      {tab === "techniques" && <KnownTechniquesTab char={npc} set={set} />}
      {tab === "combat" && <CombatRefTab char={npc} set={set} combatTarget={combatTarget} onClearTarget={() => setCombatTarget(null)} />}
      {tab === "magic" && <MagicTab char={npc} set={set} />}
      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormsPlayTab char={npc} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}><ConditionsPanel char={npc} set={set} /></div>
        </div>
      )}
      {tab === "inventory" && <InventoryTab char={npc} set={set} />}
      {tab === "growth" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.dim }}>Build surface — the DM-only counterpart to a player's Growth. Everything set here shows on the running tabs.</div>
          {box("Stat Block, Traits & Feats", <EditableStatBlock npc={npc} onUpdate={set} />)}
          {box("Techniques", <KnownTechniquesTab char={npc} set={set} />)}
          {box("Forms", <FormsTab char={npc} set={set} />)}
        </div>
      )}
    </div>
  );
}

export {
  BookText,
  BookAntagonistBrowser,
  NamedEntryList,
  EditableStatBlock,
  BulkDeploy,
  NpcStatReadout,
  NpcFeaturesTab,
  NpcSheet,
};
