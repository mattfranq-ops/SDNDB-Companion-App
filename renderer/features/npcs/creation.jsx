import React, { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Dices, Minus, Plus, Shuffle, X } from "lucide-react";
import { FEAT_DATA } from "../../data/feat-data.js";
import { NPC_POOLS } from "../../data/name-pools.js";
import { ANTAGONIST_TRAITS } from "../../data/npc-data.js";
import { TECHNIQUE_DATA } from "../../data/technique-data.js";
import { abilityMod } from "../../engine/core.js";
import { ALL_SKILLS, STAT_KEYS } from "../../engine/skills.js";
import { pick, uid } from "../../lib/dice.js";
import { Btn, Field, Gauge, LoadingBlock, Select, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { ANTAGONIST_TYPES, antagonistDerived, usePartyBaseline } from "./antagonist.jsx";
import { NamedEntryList } from "./sheet.jsx";

// Assemble a full antagonist from the guided choices, computing every book-Ch.1
// derived value. HP/AC are book-loose (dice count and armor are DM discretion),
// so they land as sensible, editable estimates.
function assembleGuidedNpc(g) {
  const conMod = abilityMod(g.stats.con);
  const wisMod = abilityMod(g.stats.wis);
  const dexMod = abilityMod(g.stats.dex);
  const d = antagonistDerived(g.type, g.level, conMod, wisMod);
  const L = Math.max(1, g.level || 1);
  const bestMod = Math.max(...STAT_KEYS.map(k => abilityMod(g.stats[k])));
  const dieMax = parseInt(d.hitDie.slice(1), 10) || 6;
  const hp = Math.max(1, Math.round((d.avgHpPerDie + conMod) * L));
  const ac = 10 + dexMod + Math.floor(d.prof / 2);
  // Species + archetype traits are inherent; Universal traits the user added.
  const inherent = [...(ANTAGONIST_TRAITS.species[g.species] || []), ...(ANTAGONIST_TRAITS.archetype[g.archetype] || [])];
  const traits = [...inherent, ...(g.universalTraits || [])];
  return blankNpc({
    name: g.name || "New Antagonist",
    species: g.species, archetype: g.archetype, role: g.faction || "",
    tier: g.type, antagonistLevel: L, kiRank: d.kiRank, prof: d.prof, hitDie: d.hitDie,
    stats: { ...g.stats },
    skillProfs: Object.fromEntries((g.skills || []).map(s => [s, "prof"])),
    traits, refTechniques: g.techniques || [], feats: g.feats || [],
    hp, maxHp: hp, ki: d.maxKi, maxKi: d.maxKi, stamina: d.stamina, maxStamina: d.stamina,
    ac, dc: 8 + d.prof + bestMod, attackBonus: d.prof + Math.max(abilityMod(g.stats.str), dexMod), saveBonus: d.prof, dr: 0,
    legendaryResistance: { max: g.type === "Iconic" ? (g.legendaryResistance ?? 3) : 0, used: 0 },
    iconicActions: g.iconicActions || [], telegraphedActions: g.telegraphedActions || [],
    phases: g.phases || [],
    breakBars: (g.phases && g.phases.length)
      ? g.phases.map(t => ({ pct: Math.round((t / hp) * 100), note: "Phase" }))
      : [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }],
    hook: g.hook || "",
  });
}

// Guided NPC Creation — implements the Roster's Ch.1 "Creating an Antagonist"
// rules as a wizard: Threat → Identity → Build (stats+skills) → Kit → Review.
// Pick Type + Level and every budget is derived; Iconic unlocks the boss kit.
function GuidedNpcCreation({ onCreate, onCancel }) {
  const [baseline] = usePartyBaseline();
  const [step, setStep] = useState(0);
  const [g, setG] = useState(() => ({
    type: "General", level: 3,
    name: "", species: "", archetype: "", faction: "", hook: "",
    stats: { str: 12, dex: 12, con: 12, int: 10, wis: 10, cha: 10 },
    skills: [], universalTraits: [], techniques: [], feats: [],
    legendaryResistance: 3, iconicActions: [], telegraphedActions: [], phases: [],
  }));
  const upd = (patch) => setG(prev => ({ ...prev, ...patch }));
  const STEPS = ["Threat", "Identity", "Build", "Kit", "Review"];
  if (baseline === null) return <LoadingBlock />;

  const conMod = abilityMod(g.stats.con), wisMod = abilityMod(g.stats.wis);
  const d = antagonistDerived(g.type, g.level, conMod, wisMod);
  const isIconic = g.type === "Iconic";
  const speciesList = Object.keys(ANTAGONIST_TRAITS.species);
  const archetypeList = Object.keys(ANTAGONIST_TRAITS.archetype);
  const rollName = () => `${pick(NPC_POOLS.first)} ${Math.random() > 0.4 ? pick(NPC_POOLS.last) : ""}`.trim();

  const typeBlurb = {
    General: "Dangerous in groups, individually limited — grunts, soldiers, Saibamen.",
    Elite: "Named lieutenants and standout threats — Ginyu Force, Saiyan warriors.",
    Iconic: "Saga bosses with Phases, Iconic Actions & Legendary Resistance — Frieza, Cell.",
  };
  const secHead = { fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "10px 0 6px" };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {STEPS.map((s, i) => <div key={s} onClick={() => setStep(i)} style={{ flex: 1, minWidth: 70, cursor: "pointer", textAlign: "center", padding: "6px 4px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, background: i === step ? `${COLORS.gold}1A` : COLORS.panel2, color: i === step ? COLORS.gold : COLORS.dim, border: `1px solid ${i === step ? COLORS.gold + "55" : COLORS.border}` }}>{s}</div>)}
      </div>

      {/* 1 — Threat */}
      {step === 0 && (
        <div>
          <div style={secHead}>Antagonist Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {ANTAGONIST_TYPES.map(t => (
              <div key={t} onClick={() => upd({ type: t })} style={{ cursor: "pointer", padding: 12, borderRadius: 8, background: g.type === t ? `${COLORS.gold}1A` : COLORS.panel2, border: `1px solid ${g.type === t ? COLORS.gold : COLORS.border}` }}>
                <div style={{ fontWeight: 700, color: g.type === t ? COLORS.gold : COLORS.text }}>{t}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4, lineHeight: 1.4 }}>{typeBlurb[t]}</div>
              </div>
            ))}
          </div>
          <div style={secHead}>Antagonist Level</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Btn size="sm" onClick={() => upd({ level: Math.max(1, g.level - 1) })}><Minus size={12} /></Btn>
            <span style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 24, color: COLORS.gold, minWidth: 40, textAlign: "center" }}>{g.level}</span>
            <Btn size="sm" onClick={() => upd({ level: Math.min(30, g.level + 1) })}><Plus size={12} /></Btn>
            <input type="range" min={1} max={30} value={g.level} onChange={e => upd({ level: +e.target.value })} style={{ flex: 1 }} />
          </div>
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 10, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Derived (book Ch.1)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 12 }}>
              <span><b>Ki Rank</b> {d.kiRank}</span><span><b>Prof</b> +{d.prof}</span><span><b>Hit Die</b> {d.hitDie}</span>
              <span><b>Ability Cap</b> {d.abilityCap ?? "—"}</span><span><b>Feats</b> {d.feats}</span>
              <span><b>Techniques</b> {d.techniques}{d.superTechniques ? ` +${d.superTechniques} Super` : ""}</span>
              <span><b>Stamina</b> {d.stamina}</span><span><b>Ki/Lvl</b> {d.kiPerLevel}</span>
            </div>
            {isIconic && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, fontSize: 12, color: COLORS.red }}>
                <b>Legendary kit unlocked:</b> up to {d.maxPhases} Phases · Iconic Actions · Legendary Resistance · +{d.initBonus} Initiative
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2 — Identity */}
      {step === 1 && (
        <div>
          <Field label="Name">
            <div style={{ display: "flex", gap: 6 }}>
              <TextInput value={g.name} onChange={e => upd({ name: e.target.value })} placeholder="Antagonist name" />
              <Btn size="sm" onClick={() => upd({ name: rollName() })}><Shuffle size={13} /></Btn>
            </div>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Species"><Select value={g.species} onChange={e => upd({ species: e.target.value })}><option value="">— none —</option>{speciesList.map(s => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Archetype"><Select value={g.archetype} onChange={e => upd({ archetype: e.target.value })}><option value="">— none —</option>{archetypeList.map(a => <option key={a}>{a}</option>)}</Select></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Faction / Descriptor">
              <div style={{ display: "flex", gap: 6 }}><TextInput value={g.faction} onChange={e => upd({ faction: e.target.value })} placeholder="e.g. Red Ribbon Army" /><Btn size="sm" onClick={() => upd({ faction: pick(NPC_POOLS.role) })}><Shuffle size={13} /></Btn></div>
            </Field>
            <Field label="Hook">
              <div style={{ display: "flex", gap: 6 }}><TextInput value={g.hook} onChange={e => upd({ hook: e.target.value })} placeholder="What drives them" /><Btn size="sm" onClick={() => upd({ hook: pick(NPC_POOLS.hook) })}><Shuffle size={13} /></Btn></div>
            </Field>
          </div>
          {(g.species || g.archetype) && (
            <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>
              Auto-applies {(ANTAGONIST_TRAITS.species[g.species] || []).length + (ANTAGONIST_TRAITS.archetype[g.archetype] || []).length} inherent traits from species + archetype.
            </div>
          )}
          <Btn size="sm" variant="ghost" style={{ marginTop: 8 }} onClick={() => upd({ name: g.name || rollName(), faction: g.faction || pick(NPC_POOLS.role), hook: g.hook || pick(NPC_POOLS.hook), species: g.species || pick(speciesList), archetype: g.archetype || pick(archetypeList) })}><Dices size={13} /> Roll the blanks</Btn>
        </div>
      )}

      {/* 3 — Build: stats + skills combined */}
      {step === 2 && (
        <div>
          <div style={secHead}>Ability Scores {d.abilityCap ? `(max ${d.abilityCap})` : ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {STAT_KEYS.map(k => {
              const v = g.stats[k];
              const over = d.abilityCap && v > d.abilityCap;
              return (
                <div key={k} style={{ background: COLORS.panel2, border: `1px solid ${over ? COLORS.red : COLORS.border}`, borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: COLORS.muted }}>{k}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Btn size="sm" onClick={() => upd({ stats: { ...g.stats, [k]: Math.max(1, v - 1) } })} style={{ padding: "2px 6px" }}><Minus size={10} /></Btn>
                    <span style={{ width: 26, textAlign: "center", fontWeight: 700, color: over ? COLORS.red : COLORS.text }}>{v}</span>
                    <Btn size="sm" onClick={() => upd({ stats: { ...g.stats, [k]: Math.min(d.abilityCap || 30, v + 1) } })} style={{ padding: "2px 6px" }}><Plus size={10} /></Btn>
                    <span style={{ width: 22, textAlign: "right", fontSize: 10.5, color: COLORS.gold, fontFamily: FONTS.mono }}>{abilityMod(v) >= 0 ? "+" : ""}{abilityMod(v)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <Btn size="sm" variant="ghost" onClick={() => { const arr = [15, 14, 13, 12, 10, 8]; upd({ stats: Object.fromEntries(STAT_KEYS.map((k, i) => [k, arr[i]])) }); }}><Dices size={12} /> Standard spread</Btn>
            <Btn size="sm" variant="ghost" title="Suggest stats that match your party baseline" onClick={() => { const target = 10 + Math.max(0, Math.round((baseline.avgToHit - d.prof) )) * 2; upd({ stats: Object.fromEntries(STAT_KEYS.map(k => [k, ["str", "dex"].includes(k) ? Math.min(d.abilityCap || 20, target + 4) : target])) }); }}>Match my party</Btn>
          </div>
          <div style={secHead}>Skill Proficiencies</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {ALL_SKILLS.map(s => {
              const on = (g.skills || []).includes(s);
              return <span key={s} onClick={() => upd({ skills: on ? g.skills.filter(x => x !== s) : [...(g.skills || []), s] })} style={{ cursor: "pointer", fontSize: 11, fontWeight: 600, borderRadius: 14, padding: "3px 10px", background: on ? `${COLORS.blue}22` : COLORS.panel2, color: on ? COLORS.blue : COLORS.dim, border: `1px solid ${on ? COLORS.blue + "66" : COLORS.border}` }}>{s}</span>;
            })}
          </div>
        </div>
      )}

      {/* 4 — Kit: techniques, feats, legendary */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>Budgets from the book: <b style={{ color: COLORS.text }}>{d.techniques}</b> Techniques{d.superTechniques ? <> + <b style={{ color: COLORS.text }}>{d.superTechniques}</b> Super</> : null}, <b style={{ color: COLORS.text }}>{d.feats}</b> Feats. (Guidance — add what fits.)</div>
          <NamedEntryList label="Techniques" entries={g.techniques} onChange={v => upd({ techniques: v })} color={COLORS.blue} namePlaceholder="Technique" suggestions={TECHNIQUE_DATA.slice(0, 40).map(t => ({ name: t.name, text: t.techType || "" }))} />
          <NamedEntryList label="Feats" entries={g.feats} onChange={v => upd({ feats: v })} color={COLORS.amber} namePlaceholder="Feat" suggestions={FEAT_DATA.slice(0, 30).map(f => ({ name: f.name, text: f.list || "" }))} />
          <NamedEntryList label="Universal Traits (optional)" entries={g.universalTraits} onChange={v => upd({ universalTraits: v })} color={COLORS.green} namePlaceholder="Trait" suggestions={ANTAGONIST_TRAITS.universal} />
          {isIconic && (
            <div style={{ marginTop: 6, paddingTop: 10, borderTop: `1px solid ${COLORS.red}44` }}>
              <div style={{ ...secHead, color: COLORS.red }}>Legendary Kit (Iconic)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 11.5 }}>Legendary Resistance / day</span>
                <Btn size="sm" onClick={() => upd({ legendaryResistance: Math.max(0, g.legendaryResistance - 1) })}><Minus size={11} /></Btn>
                <span style={{ fontFamily: FONTS.mono, fontWeight: 700 }}>{g.legendaryResistance}</span>
                <Btn size="sm" onClick={() => upd({ legendaryResistance: g.legendaryResistance + 1 })}><Plus size={11} /></Btn>
              </div>
              <PhaseThresholdEditor phases={g.phases} onChange={v => upd({ phases: v })} maxHpHint={Math.round((d.avgHpPerDie + conMod) * g.level)} maxPhases={d.maxPhases} />
              <NamedEntryList label="Iconic Actions" entries={g.iconicActions} onChange={v => upd({ iconicActions: v })} color={COLORS.red} namePlaceholder="Iconic Action" />
              <NamedEntryList label="Telegraphed Actions" entries={g.telegraphedActions} onChange={v => upd({ telegraphedActions: v })} color={COLORS.amber} namePlaceholder="Telegraphed Action" />
            </div>
          )}
        </div>
      )}

      {/* 5 — Review */}
      {step === 4 && (() => {
        const npc = assembleGuidedNpc(g);
        return (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{npc.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 10 }}>{[npc.tier, `Lv ${npc.antagonistLevel}`, npc.species, npc.archetype, npc.faction].filter(Boolean).join(" · ")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
              <Gauge label="HP" value={npc.hp} max={npc.maxHp} color={COLORS.red} />
              <Gauge label="Ki" value={npc.ki} max={npc.maxKi} color={COLORS.blue} />
            </div>
            <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 8 }}>AC {npc.ac} · DC {npc.dc} · Atk +{npc.attackBonus} · Save +{npc.saveBonus} · Stamina {npc.maxStamina} · Prof +{npc.prof} · {npc.hitDie}</div>
            <div style={{ fontSize: 11.5 }}><b>{npc.traits.length}</b> traits · <b>{npc.techniques.length}</b> techniques · <b>{npc.feats.length}</b> feats{npc.legendaryResistance.max ? <> · <span style={{ color: COLORS.red }}>Legendary Resistance {npc.legendaryResistance.max}/day</span></> : null}{npc.phases.length ? <> · <span style={{ color: COLORS.red }}>{npc.phases.length} Phases</span></> : null}</div>
          </div>
        );
      })()}

      <div style={{ display: "flex", gap: 8, marginTop: 16, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        {step > 0 && <Btn onClick={() => setStep(step - 1)}><ChevronLeft size={13} /> Back</Btn>}
        {step < 4 && <Btn variant="blue" onClick={() => setStep(step + 1)}>Next <ChevronRight size={13} /></Btn>}
        {step === 4 && <Btn variant="gold" onClick={() => onCreate(assembleGuidedNpc(g))}><Check size={14} /> Create Antagonist</Btn>}
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

// Phase HP-threshold editor (Iconic) — each row is an HP value the boss stops at
// to escalate; they render as break bars on the sheet.
function PhaseThresholdEditor({ phases, onChange, maxHpHint, maxPhases }) {
  const list = phases || [];
  const [val, setVal] = useState("");
  const add = () => { const n = parseInt(val, 10); if (!n) return; onChange([...list, n].sort((a, b) => b - a)); setVal(""); };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Phase HP Thresholds{maxPhases ? ` (up to ${maxPhases})` : ""}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
        {list.map((t, i) => <span key={i} style={{ fontSize: 11, fontWeight: 600, borderRadius: 12, padding: "3px 9px", background: `${COLORS.red}22`, color: COLORS.red, border: `1px solid ${COLORS.red}55`, display: "inline-flex", alignItems: "center", gap: 5 }}>{t} HP<X size={11} style={{ cursor: "pointer" }} onClick={() => onChange(list.filter((_, j) => j !== i))} /></span>)}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput type="number" value={val} onChange={e => setVal(e.target.value)} placeholder={maxHpHint ? `HP threshold (max ~${maxHpHint})` : "HP threshold"} onKeyDown={e => e.key === "Enter" && add()} style={{ fontSize: 12 }} />
        <Btn size="sm" onClick={add}><Plus size={12} /></Btn>
      </div>
    </div>
  );
}

// The unified NPC model. Every creation mode (Empty, Pregenerated, Guided)
// produces this shape and opens the same sheet. Legendary fields stay empty for
// non-Iconic NPCs. Quick-run tiles (ac/dc/attackBonus/…) drive the combat strip;
// the structured fields drive the editable stat block.
function blankNpc(patch = {}) {
  return {
    id: uid(), name: "New NPC",
    species: "", archetype: "", role: "", tier: "",       // tier = Type (General/Elite/Iconic)
    antagonistLevel: 1,                                    // level (below) mirrors it so shared char helpers work
    kiRank: 0, prof: 2, hitDie: "d4",
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    traits: [], feats: [], refTechniques: [], cybernetics: [], sections: {},
    // Char-compatible fields so the reused player tabs (Skills/Techniques/
    // Combat/Forms/Inventory) drive the NPC the same way they drive a PC.
    skillProfs: {}, savingThrowProfs: [],
    techniques: [], forms: [], items: [], equipment: {},
    zeni: 0, attunements: [], soulbinds: [], resources: [],
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0 },
    ac: 12, dc: 0, attackBonus: 0, saveBonus: 0, dr: 0,
    hp: 20, maxHp: 20, ki: 10, maxKi: 10, stamina: 0, maxStamina: 0,
    breakBars: [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }],
    // Legendary / Iconic boss kit (Roster §Additional Mechanics).
    iconicActions: [], legendaryResistance: { max: 0, used: 0 },
    telegraphedActions: [], phases: [],
    hook: "", notes: "",
    ...patch,
    level: patch.level ?? patch.antagonistLevel ?? 1,
  };
}

// Backfill older saved NPCs with the fields the tabbed sheet now expects.
function migrateNpc(n) {
  return {
    ...blankNpc(),
    ...n,
    level: n.level ?? n.antagonistLevel ?? 1,
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, ...(n.stats || {}) },
    legendaryResistance: { max: 0, used: 0, ...(n.legendaryResistance || {}) },
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0, ...(n.powerBonus || {}) },
    traits: n.traits || [], feats: n.feats || [],
    // Legacy NPCs stored guided techniques as {name,text} in `techniques`; move
    // those to refTechniques and keep `techniques` for the rich rollable shape.
    refTechniques: n.refTechniques || (Array.isArray(n.techniques) && n.techniques[0] && !n.techniques[0].techId && !n.techniques[0].uid ? n.techniques : []),
    techniques: (Array.isArray(n.techniques) && n.techniques[0] && (n.techniques[0].techId || n.techniques[0].uid)) ? n.techniques : [],
    forms: n.forms || [], items: n.items || [], equipment: n.equipment || {},
    skillProfs: n.skillProfs || {}, savingThrowProfs: n.savingThrowProfs || [],
    attunements: n.attunements || [], soulbinds: n.soulbinds || [], resources: n.resources || [],
    cybernetics: n.cybernetics || [], iconicActions: n.iconicActions || [],
    telegraphedActions: n.telegraphedActions || [], phases: n.phases || [],
    sections: n.sections || {},
  };
}

// Roster entry from a book antagonist: quick-run numbers (attack/DC pulled from
// the Actions text) plus the whole block for the stat-block panel. Iconic Phase
// thresholds become break bars so the sheet tracks them out of the box.
function npcFromBook(b) {
  const allText = Object.values(b.sections || {}).join("\n");
  const atkRolls = [...allText.matchAll(/Attack Roll:?\*?\s*\+(\d+)/gi)].map(m => +m[1]);
  const dcs = [...allText.matchAll(/\bDC\b\s*:?\s*(\d+)/gi)].map(m => +m[1]);
  const phaseThresholds = [...new Set([...(b.sections?.Phases || b.sections?.Phase || "").matchAll(/^\|\s*\d+\s*\|\s*([\d,]+)/gm)]
    .map(m => parseInt(m[1].replace(/,/g, ""), 10)).filter(n => n > 0 && b.hp && n < b.hp))];
  const breakBars = phaseThresholds.length
    ? phaseThresholds.map(t => ({ pct: Math.round((t / b.hp) * 100), note: "Phase" }))
    : [{ pct: 75, note: "" }, { pct: 50, note: "" }, { pct: 25, note: "" }];
  // Legendary Resistance uses/day, if the trait names a count (e.g. "3/Day").
  const lrTrait = (b.traits || []).find(t => /legendary resistance/i.test(t.name));
  const lrMax = lrTrait ? (parseInt((lrTrait.name.match(/(\d+)\s*\/\s*day/i) || lrTrait.text.match(/(\d+)\s*\/\s*day/i) || [])[1], 10) || 0) : 0;
  return blankNpc({
    name: b.name,
    species: (b.meta.match(/\(([^)]+)\)/) || [])[1] || "",
    role: b.group || "", tier: b.tier || "",
    antagonistLevel: b.antagonistLevel || 1, kiRank: b.kiRank ?? 0,
    prof: b.prof || 2, hitDie: b.hpDice ? `d${(b.hpDice.match(/d(\d+)/) || [])[1] || 8}` : "d8",
    stats: b.stats || undefined,
    traits: b.traits || [], sections: b.sections || {},
    hp: b.hp || 1, maxHp: b.hp || 1, ki: b.ki ?? 0, maxKi: b.ki ?? 0,
    stamina: b.stamina ?? 0, maxStamina: b.stamina ?? 0,
    ac: b.ac || 10, dr: 0, dc: dcs.length ? Math.max(...dcs) : 0,
    attackBonus: atkRolls.length ? Math.max(...atkRolls) : 0, saveBonus: 0,
    legendaryResistance: { max: lrMax, used: 0 },
    phases: phaseThresholds, breakBars, bookId: b.id, book: b,
  });
}

export {
  assembleGuidedNpc,
  GuidedNpcCreation,
  PhaseThresholdEditor,
  blankNpc,
  migrateNpc,
  npcFromBook,
};
