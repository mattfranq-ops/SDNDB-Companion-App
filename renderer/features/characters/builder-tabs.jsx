import React, { useState } from "react";
import { ArrowLeft, BookOpen, Check, Dices, Minus, Plus, RotateCcw, Search, Shuffle, Trash2, TrendingUp, X, Zap } from "lucide-react";
import { emitRoll, logSession } from "../../app/bus.js";
import { TRAINING_BOON_SPENDS } from "../../data/book-tables.js";
import { CLASS_DATA, CLASS_NAMES } from "../../data/class-data.js";
import { FEAT_DATA } from "../../data/feat-data.js";
import { NPC_POOLS } from "../../data/name-pools.js";
import { HERITAGE_DATA } from "../../data/species-data.js";
import { charClasses, charTotalLevel, computeKiRank, computeMaxStamina, profBonusForLevel, statMod } from "../../engine/core.js";
import { computeAttacksPerTurn, featsOwed, techniquesKnownBudget } from "../../engine/derived.js";
import { classGrantedResources } from "../../engine/resources.js";
import { SKILL_LIST, STAT_KEYS, computeSaveBonus, computeSkillBonus, speciesByName, speciesSkillData } from "../../engine/skills.js";
import { alignmentAuraColor } from "../../engine/spellcasting.js";
import { pick, roll, uid } from "../../lib/dice.js";
import { useHouseRules, useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, Field, Gauge, InfoChip, LoadingBlock, Select, SelectWithCustom, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FEAT_LISTS, FEAT_LIST_COLOR, FONTS } from "../../ui/theme.js";
import { miniBtnStyle } from "../session/combat-parts.jsx";
import { RESOURCE_RESET_LABEL } from "./magic.jsx";
import { useSpeciesList } from "./model.js";

function ClassPicker({ value, onConfirm, onCancel }) {
  const [sel, setSel] = useState(value || CLASS_NAMES[0]);
  const c = CLASS_DATA[sel];
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, overflowX: "auto" }}>
        {CLASS_NAMES.map(n => (
          <button key={n} onClick={() => setSel(n)} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${sel === n ? COLORS.gold : COLORS.border}`, background: sel === n ? `${COLORS.gold}1A` : COLORS.panel2, color: sel === n ? COLORS.gold : COLORS.text, whiteSpace: "nowrap" }}>{n}</button>
        ))}
      </div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 16 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{sel}</div>
        <div style={{ height: 1, background: COLORS.border, marginBottom: 10 }} />
        <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, maxHeight: 180, overflowY: "auto" }}>{c.flavor}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <Btn variant="gold" onClick={() => onConfirm(sel)}><Check size={14}/> Confirm</Btn>
          <Btn onClick={onCancel}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

function AbilityTab({ classId, level }) {
  if (!classId || !CLASS_DATA[classId]) return <EmptyState icon={BookOpen} title="No class selected" body="Pick a class in the Class tab to see its live feature progression here." />;
  const c = CLASS_DATA[classId];
  const lvls = Object.keys(c.featuresByLevel).map(Number).filter(l => l <= (level || 20)).sort((a,b) => a-b);
  return (
    <div>
      <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{classId} — Level {level}</div>
      <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>{c.flavor}</div>
      {lvls.map(l => (
        <div key={l} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
          <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 7, background: `${COLORS.blue}15`, border: `1px solid ${COLORS.blue}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.mono, fontSize: 12, color: COLORS.blue, fontWeight: 700 }}>{l}</div>
          <div style={{ fontSize: 13, color: COLORS.text, paddingTop: 6 }}>{c.featuresByLevel[l]}</div>
        </div>
      ))}
    </div>
  );
}

// Book species traits readout — shows under the Species field when the selected
// species matches book data (SPECIES_DATA).
function SpeciesTraits({ species }) {
  const sp = speciesByName(species);
  if (!sp) return null;
  const row = (label, val) => val ? (
    <div style={{ display: "flex", gap: 6, fontSize: 11.5, lineHeight: 1.5 }}>
      <span style={{ color: COLORS.dim, minWidth: 92, flexShrink: 0 }}>{label}</span>
      <span style={{ color: COLORS.muted }}>{val}</span>
    </div>
  ) : null;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{sp.name}</span>
        <span style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>{sp.category}</span>
        {!sp.complete && <span style={{ fontSize: 9, color: COLORS.amber }}>partial data</span>}
      </div>
      {sp.description && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5, marginBottom: 8, fontStyle: "italic" }}>{sp.description}</div>}
      {row("Ability Scores", sp.abilityScoreIncrease)}
      {row("Speed", sp.speed)}
      {row("Languages", sp.languages)}
      {row("Skills", sp.skills)}
      {sp.features?.length > 0 && row("Features", sp.features.join(", "))}
      {sp.subSpecies?.length > 0 && row("Sub-Species", sp.subSpecies.join(", "))}
    </div>
  );
}

// Picker for species that grant a *choice* of Skills (e.g. Celestial Primate:
// Acrobatics + one of Nature/Survival/Religion). Renders only when the current
// species has a skillChoice; the picks feed the Skill floor via speciesSkillData.
function SpeciesSkillChoice({ char, set }) {
  const { sp, fixed, choice, pool, chosen } = speciesSkillData(char);
  if (!sp || !choice) return null;
  const toggle = (skill) => {
    const cur = new Set(chosen);
    if (cur.has(skill)) cur.delete(skill);
    else if (cur.size < choice.count) cur.add(skill);
    set({ speciesSkillChoices: [...cur] });
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
          Species Skill{choice.count > 1 ? "s" : ""} — choose {choice.count}{choice.from === "*" ? " (any)" : ""}
        </span>
        <span style={{ fontSize: 10.5, color: chosen.length === choice.count ? COLORS.gold : COLORS.dim }}>{chosen.length}/{choice.count}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {pool.map(skill => {
          const on = chosen.includes(skill);
          const full = !on && chosen.length >= choice.count;
          return (
            <button key={skill} onClick={() => toggle(skill)} disabled={full}
              style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 12, cursor: full ? "default" : "pointer",
                background: on ? `${COLORS.gold}22` : COLORS.panel, color: on ? COLORS.gold : full ? COLORS.dim : COLORS.muted,
                border: `1px solid ${on ? COLORS.gold + "88" : COLORS.border}`, opacity: full ? 0.5 : 1 }}>
              {skill}
            </button>
          );
        })}
      </div>
      {fixed.length > 0 && <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 8 }}>Always granted: {fixed.join(", ")}</div>}
    </div>
  );
}

function SpeciesPicker({ value, onChange, customValue, onCustomChange }) {
  const speciesList = useSpeciesList();
  const [addingNew, setAddingNew] = useState(false);
  const [newSpecies, persistCompendium] = useSharedList("compendium_v2");

  const addCustomSpecies = () => {
    const name = (customValue || "").trim();
    if (!name) return;
    const list = newSpecies || [];
    persistCompendium([...list, { id: uid(), type: "species", name, cost: "", rank: "", range: "", damage: "", description: "Added from character creation." }]);
    onChange(name);
    onCustomChange("");
    setAddingNew(false);
  };

  return (
    <div>
      {!addingNew ? (
        <div style={{ display: "flex", gap: 6 }}>
          <Select value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1 }}>
            <option value="">Select a species...</option>
            {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Btn size="sm" onClick={() => setAddingNew(true)} title="Add a new species to the Encyclopedia"><Plus size={13}/></Btn>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={customValue} onChange={e => onCustomChange(e.target.value)} placeholder="New species name..." onKeyDown={e => e.key==="Enter" && addCustomSpecies()} />
          <Btn size="sm" variant="gold" onClick={addCustomSpecies}><Check size={13}/></Btn>
          <Btn size="sm" variant="ghost" onClick={() => setAddingNew(false)}><X size={13}/></Btn>
        </div>
      )}
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 4 }}>Adding a new species saves it to the Encyclopedia so it's available for everyone next time.</div>
    </div>
  );
}

function FeaturesTab({ char, set }) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAction, setNewAction] = useState("");
  const [newMax, setNewMax] = useState("");
  // Each class contributes features up to its OWN level, not the total.
  const classFeatures = charClasses(char).flatMap(({ classId, level }) =>
    CLASS_DATA[classId]
      ? Object.entries(CLASS_DATA[classId].featuresByLevel)
          .filter(([lvl]) => Number(lvl) <= (level || 1))
          .map(([lvl, text]) => ({ classId, lvl, text }))
      : []
  );
  const multi = charClasses(char).length > 1;
  // Species features auto-show from SPECIES_DATA (player feedback #10). Names are
  // book-extracted; full text arrives with the Track B extraction pass.
  const sp = speciesByName(char.species);
  const speciesFeatures = (sp && sp.features) || [];
  const addCustom = () => {
    if (!newName) return;
    const max = newMax ? Number(newMax) : null;
    set({ features: [...char.features, { name: newName, description: newDesc, source: "Custom", action: newAction, maxUses: max, uses: max }] });
    setNewName(""); setNewDesc(""); setNewAction(""); setNewMax("");
  };
  const removeCustom = (i) => set({ features: char.features.filter((_,j) => j!==i) });
  const updateFeature = (i, patch) => set({ features: char.features.map((f, j) => j === i ? { ...f, ...patch } : f) });
  // Spend a feature: decrement its use pool (if limited) and post to the shared
  // Session feed so the table sees it.
  const useFeature = (i) => {
    const f = char.features[i];
    const tracked = Number(f.maxUses) > 0;
    if (tracked) {
      const left = f.uses != null ? f.uses : f.maxUses;
      if (left <= 0) return;
      updateFeature(i, { uses: left - 1 });
    }
    logSession(`${char.name || "A fighter"} used ${f.name}${f.action ? ` (${f.action})` : ""}`, char.name || "");
  };

  return (
    <div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
        Class Features {charClasses(char).length ? `(${charClasses(char).map(c => c.classId).join(" / ")})` : ""}
      </div>
      {classFeatures.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 16 }}>Pick a Class in the Class tab to see its features here.</div>
      ) : (
        <div style={{ marginBottom: 18 }}>
          {classFeatures.map(({ classId, lvl, text }, i) => (
            <InfoChip key={`${classId}-${lvl}-${i}`} label={multi ? `${classId} ${lvl}` : `Lv ${lvl}`} sub={text.split(",")[0]} description={text} color={COLORS.blue} />
          ))}
        </div>
      )}
      {speciesFeatures.length > 0 && (
        <>
          <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Species Features ({sp.name})</div>
          <div style={{ marginBottom: 18 }}>
            {speciesFeatures.map((name, i) => (
              <InfoChip key={i} label={name} color={COLORS.green} />
            ))}
          </div>
        </>
      )}
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Other Features (Feats, Custom)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {char.features.map((f, i) => {
          const tracked = Number(f.maxUses) > 0;
          const left = f.uses != null ? f.uses : f.maxUses;
          return (
            <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{f.name}</span>
                {f.action && <Tag color={COLORS.blue}>{f.action}</Tag>}
                {tracked && <Tag color={left > 0 ? COLORS.green : COLORS.red}>{left}/{f.maxUses} uses</Tag>}
                {f.source && <span style={{ fontSize: 10.5, color: COLORS.dim }}>({f.source})</span>}
                <div style={{ flex: 1 }} />
                <Btn size="sm" variant="gold" disabled={tracked && left <= 0} onClick={() => useFeature(i)}><Zap size={12}/> Use</Btn>
                {tracked && left < f.maxUses && <Btn size="sm" variant="ghost" title="Restore uses (on a rest)" onClick={() => updateFeature(i, { uses: f.maxUses })}><RotateCcw size={12}/></Btn>}
                <Btn size="sm" variant="ghost" onClick={() => removeCustom(i)}><X size={13} color={COLORS.red}/></Btn>
              </div>
              {f.description && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>{f.description}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 6, marginTop: 8 }}>
                <TextInput value={f.action || ""} onChange={e => updateFeature(i, { action: e.target.value })} placeholder="Action economy — Action / Bonus / Reaction / Special…" style={{ fontSize: 11.5 }} />
                <TextInput type="number" value={f.maxUses ?? ""} onChange={e => { const m = e.target.value ? Number(e.target.value) : null; updateFeature(i, { maxUses: m, uses: m }); }} placeholder="Max uses" style={{ fontSize: 11.5, textAlign: "center" }} title="Blank = unlimited" />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        <TextInput value={newName} onChange={e => setNewName(e.target.value)} placeholder="Feature name..." />
        <TextInput value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Short description..." />
        <TextInput value={newAction} onChange={e => setNewAction(e.target.value)} placeholder="Action economy (Action / Bonus / Reaction / Special / …)" />
        <TextInput type="number" value={newMax} onChange={e => setNewMax(e.target.value)} placeholder="Max uses (blank = unlimited)" />
      </div>
      <Btn size="sm" onClick={addCustom}><Plus size={13}/> Add Feature</Btn>
    </div>
  );
}

const boonCostOf = (s) => { const m = s.match(/^(\d+) Boons?:/); return m ? Number(m[1]) : 1; };

function TrainingTab({ char, set }) {
  const tb = char.trainingBoons || {};
  const spends = tb.spends || {};
  const total = tb.total ?? tb.max ?? 4; // player sets this; migrates from old `max`
  const used = TRAINING_BOON_SPENDS.reduce((sum, s, i) => sum + (spends[i] || 0) * boonCostOf(s), 0);
  const remaining = total - used;
  const setTb = (patch) => set({ trainingBoons: { total, spends, ...patch } });
  const spend = (i, cost) => { if (remaining < cost) return; setTb({ spends: { ...spends, [i]: (spends[i] || 0) + 1 } }); };
  const refund = (i, cost) => { if ((spends[i] || 0) <= 0) return; setTb({ spends: { ...spends, [i]: spends[i] - 1 } }); };
  return (
    <div>
      <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>Training Boons — Total</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => setTb({ total: Math.max(0, total - 1) })} style={miniBtnStyle}><Minus size={13}/></button>
            <TextInput type="number" value={total} onChange={e => setTb({ total: Math.max(0, +e.target.value) })} style={{ width: 60, textAlign: "center" }} />
            <button onClick={() => setTb({ total: total + 1 })} style={miniBtnStyle}><Plus size={13}/></button>
          </div>
        </div>
        <Gauge label="" value={used} max={total || 1} color={remaining < 0 ? COLORS.red : COLORS.gold} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11.5 }}>
          <span style={{ color: COLORS.muted }}>Used <span style={{ color: COLORS.gold, fontWeight: 700 }}>{used}</span> of {total}</span>
          <span style={{ color: remaining < 0 ? COLORS.red : COLORS.green, fontWeight: 700 }}>{remaining} remaining{remaining < 0 ? " (over!)" : ""}</span>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Spend Boons</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TRAINING_BOON_SPENDS.map((s, i) => {
          const cost = boonCostOf(s);
          const count = spends[i] || 0;
          const canSpend = remaining >= cost;
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, background: COLORS.panel, border: `1px solid ${count > 0 ? COLORS.gold + "55" : COLORS.border}`, borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ fontSize: 12.5, color: COLORS.text, flex: 1 }}>{s}</span>
              {count > 0 && <span style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: FONTS.mono, whiteSpace: "nowrap" }}>×{count} · {count * cost} TB</span>}
              <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                <button onClick={() => refund(i, cost)} disabled={count === 0} style={{ ...miniBtnStyle, opacity: count === 0 ? 0.35 : 1, cursor: count === 0 ? "default" : "pointer" }} title="Refund one"><Minus size={12}/></button>
                <span style={{ width: 18, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{count}</span>
                <button onClick={() => spend(i, cost)} disabled={!canSpend} style={{ ...miniBtnStyle, borderColor: canSpend ? COLORS.gold + "88" : COLORS.border, color: canSpend ? COLORS.gold : COLORS.dim, opacity: canSpend ? 1 : 0.5, cursor: canSpend ? "pointer" : "default" }} title={`Spend ${cost} boon${cost>1?"s":""}`}><Plus size={12}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfCircle({ on, expertise }) {
  const color = expertise ? COLORS.blue : on ? COLORS.gold : COLORS.dim;
  return <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${color}`, background: expertise || on ? color : "transparent", flexShrink: 0 }} />;
}

function SkillsSavesTab({ char, set }) {
  const prof = profBonusForLevel(char.level);
  const [log, setLog] = useState([]);
  const toggleSave = (statKey) => {
    const cur = char.savingThrowProfs || [];
    set({ savingThrowProfs: cur.includes(statKey) ? cur.filter(s => s !== statKey) : [...cur, statKey] });
  };
  const cycleSkill = (skillName) => {
    const cur = char.skillProfs || {};
    const state = cur[skillName] || "none";
    const next = state === "none" ? "prof" : state === "prof" ? "expertise" : "none";
    set({ skillProfs: { ...cur, [skillName]: next } });
  };
  // CPR pattern: the modifier IS the roll button — tap it to roll d20 + bonus.
  const rollCheck = (label, bonus) => {
    const d20 = roll(20);
    setLog(prev => [{ id: uid(), label, d20, bonus, total: d20 + bonus }, ...prev].slice(0, 8));
    emitRoll({ label, total: d20 + bonus, detail: `d20 ${d20} ${bonus >= 0 ? "+" : ""}${bonus}`, color: COLORS.blue });
  };
  const rollBtn = (label, value, color) => (
    <button onClick={e => { e.stopPropagation(); rollCheck(label, value); }} title={`Roll d20 ${value >= 0 ? "+" : ""}${value}`}
      style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}14`, border: `1px solid ${color}55`, color, borderRadius: 5, padding: "2px 8px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: FONTS.mono }}>
      <Dices size={11}/>{value >= 0 ? "+" : ""}{value}
    </button>
  );
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 10, lineHeight: 1.5 }}>
        Proficiency Bonus <span style={{ color: COLORS.gold, fontWeight: 700 }}>+{prof}</span> — non-proficient Saving Throws still get half of it, rounded up (book rule). Click the dot next to Saving Throw to toggle proficiency. Click a Skill to cycle Untrained → Proficient → Expertise.
      </div>
      {log.length > 0 && (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
            <span>Checks</span>
            <span onClick={() => setLog([])} style={{ cursor: "pointer", color: COLORS.dim, fontSize: 9.5, textTransform: "none" }}>clear</span>
          </div>
          {log.map(r => (
            <div key={r.id} style={{ fontSize: 11.5, fontFamily: FONTS.mono, display: "flex", gap: 8, alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, color: COLORS.text }}>{r.label}</span>
              <span style={{ color: COLORS.blue, fontWeight: 700 }}>{r.total}</span>
              <span style={{ color: COLORS.dim }}>(d20 {r.d20} {r.bonus >= 0 ? "+" : ""}{r.bonus})</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
        {STAT_KEYS.map(statKey => {
          const mod = statMod(char, statKey);
          const save = computeSaveBonus(char, statKey);
          return (
            <div key={statKey} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{statKey}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim }}>{mod >= 0 ? "+" : ""}{mod} mod</div>
              </div>
              <div onClick={() => toggleSave(statKey)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 2px", borderBottom: `1px dashed ${COLORS.border}`, marginBottom: 6 }}>
                <ProfCircle on={save.proficient} />
                <span style={{ fontSize: 12, flex: 1, color: COLORS.text }}>Saving Throw</span>
                {rollBtn(`${statKey.toUpperCase()} Save`, save.value, save.proficient ? COLORS.gold : COLORS.muted)}
              </div>
              {(SKILL_LIST[statKey] || []).map(skill => {
                const sk = computeSkillBonus(char, skill);
                return (
                  <div key={skill} onClick={() => cycleSkill(skill)} title={sk.granted ? `Proficient from ${char.species} (species)` : undefined} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "3px 2px" }}>
                    <ProfCircle on={sk.state !== "none"} expertise={sk.state === "expertise"} />
                    <span style={{ fontSize: 11.5, color: COLORS.muted, flex: 1 }}>
                      {skill}
                      {sk.granted && <span style={{ fontSize: 9, color: COLORS.dim, marginLeft: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>species</span>}
                    </span>
                    {rollBtn(skill, sk.value, sk.state === "expertise" ? COLORS.blue : sk.state === "prof" ? COLORS.gold : COLORS.muted)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatsPickerTab({ char, set }) {
  const [custom] = useSharedList("custom_feats_v1");
  const [query, setQuery] = useState("");
  const [listFilter, setListFilter] = useState("all");
  if (custom === null) return <LoadingBlock />;

  const allFeats = [...FEAT_DATA, ...custom];
  const picked = char.feats || [];
  const pickedIds = new Set(picked.map(f => f.id));
  // The book marks repeatable feats in their text (e.g. ASI); those can be taken
  // more than once, so picks are stored as instances keyed by uid.
  const isRepeatable = (f) => /repeatable/i.test(f.fullText || "");
  const isASI = (f) => f.id === "book_32" || /^ability score improvement$/i.test(f.name || "");
  const results = allFeats.filter(f => {
    if (listFilter !== "all" && f.list !== listFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return f.name.toLowerCase().includes(q) || f.fullText.toLowerCase().includes(q);
  });
  const addFeat = (f) => { if (!pickedIds.has(f.id) || isRepeatable(f)) set({ feats: [...picked, { ...f, uid: uid() }] }); };
  const removeFeat = (u) => set({ feats: picked.filter(f => f.uid !== u) });
  // ASI: 3 points per take, spread across ability scores. Feeds effectiveStats()
  // through statModSources so the Stats tab shows the applied points.
  const asiUsed = (f) => STAT_KEYS.reduce((s, k) => s + ((f.asi || {})[k] || 0), 0);
  const setAsiPoint = (u, stat, delta) => set({ feats: picked.map(f => {
    if (f.uid !== u) return f;
    if (delta > 0 && asiUsed(f) >= 3) return f;
    const asi = { ...(f.asi || {}) };
    asi[stat] = Math.max(0, (asi[stat] || 0) + delta);
    return { ...f, asi };
  }) });
  const asiPicks = picked.filter(isASI);
  const owed = featsOwed(char);
  const owedBreakdown = [owed.heroic && `${owed.heroic} Heroic`, owed.general && `${owed.general} General`, owed.epic && `${owed.epic} Epic Boon`].filter(Boolean).join(" · ");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>
          Feats Known ({picked.length}{owed.total ? <> / <span style={{ color: picked.length < owed.total ? COLORS.amber : COLORS.text }}>{owed.total} owed</span></> : ""})
        </span>
        {owed.total > 0 && <span title="From class levels: Heroic Surge (2 first, +1 each after) + a Feat at Lv 4/8/12/16 + Epic Boon at 19. Excludes species feats." style={{ fontSize: 10.5, color: COLORS.dim }}>{owedBreakdown}</span>}
      </div>
      {picked.length === 0 ? (
        <div style={{ color: COLORS.dim, fontSize: 12.5, marginBottom: 16 }}>No Feats picked yet — search the list below to add some.</div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          {picked.map(f => (
            <span key={f.uid || f.id} style={{ position: "relative", display: "inline-block" }}>
              <InfoChip label={f.name} sub={f.list} description={f.fullText} color={COLORS[FEAT_LIST_COLOR[f.list]] || COLORS.muted} />
              <X size={11} onClick={() => removeFeat(f.uid)} style={{ position: "absolute", top: -4, right: 2, cursor: "pointer", background: COLORS.panel, borderRadius: 8, color: COLORS.red }} />
            </span>
          ))}
        </div>
      )}
      {asiPicks.map((f, idx) => (
        <div key={f.uid} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Ability Score Improvement{asiPicks.length > 1 ? ` #${idx + 1}` : ""} — {3 - asiUsed(f)} of 3 points left
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {STAT_KEYS.map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", width: 24 }}>{k}</span>
                <Btn size="sm" onClick={() => setAsiPoint(f.uid, k, -1)} style={{ padding: "2px 6px" }}><Minus size={10}/></Btn>
                <span style={{ width: 14, textAlign: "center", fontWeight: 700, fontSize: 12, color: (f.asi || {})[k] ? COLORS.gold : COLORS.dim }}>{(f.asi || {})[k] || 0}</span>
                <Btn size="sm" onClick={() => setAsiPoint(f.uid, k, 1)} style={{ padding: "2px 6px" }}><Plus size={10}/></Btn>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: COLORS.dim }} />
          <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Feats to add..." style={{ paddingLeft: 30 }} />
        </div>
        <Select value={listFilter} onChange={e => setListFilter(e.target.value)} style={{ width: 150 }}>
          <option value="all">All lists</option>
          {FEAT_LISTS.map(l => <option key={l} value={l}>{l}</option>)}
        </Select>
      </div>
      <div style={{ maxHeight: 340, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, paddingRight: 4 }}>
        {results.map(f => {
          const already = pickedIds.has(f.id) && !isRepeatable(f);
          const againCount = isRepeatable(f) ? picked.filter(p => p.id === f.id).length : 0;
          const color = COLORS[FEAT_LIST_COLOR[f.list]] || COLORS.muted;
          return (
            <div key={f.id} onClick={() => !already && addFeat(f)} title={f.fullText} style={{ cursor: already ? "default" : "pointer", opacity: already ? 0.45 : 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <Tag color={color}>{f.list}</Tag>
              <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>{f.name}</div>
              <div style={{ fontSize: 10, marginTop: 2, color: already ? COLORS.green : COLORS.blue }}>{already ? "✓ Known" : againCount ? `+ Add again (×${againCount})` : "+ Add"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Shared character tabs (used by FullBuilder AND the editor) -------- */

function BioTab({ char, set, withName, withNotes, customSpeciesInput, setCustomSpeciesInput }) {
  const [houseRules] = useHouseRules();
  const app = char.appearance || {};
  const setApp = (k, v) => set({ appearance: { ...app, [k]: v } });
  return (
    <div>
      {withName && (
        <Field label="Name">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.name} onChange={e => set({ name: e.target.value })} />
            <Btn size="sm" onClick={() => set({ name: `${pick(NPC_POOLS.first)} ${pick(NPC_POOLS.last)}` })} title="Reroll from Name table"><Shuffle size={13}/></Btn>
          </div>
        </Field>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Handle / Nickname"><TextInput value={char.handle} onChange={e => set({ handle: e.target.value })} placeholder="e.g. Redstreak" /></Field>
        <Field label="Alignment">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Select value={char.alignment || ""} onChange={e => set({ alignment: e.target.value })} style={{ flex: 1 }}>
              <option value="">— Alignment —</option>
              {["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"].map(a => <option key={a} value={a}>{a}</option>)}
              {char.alignment && !["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"].includes(char.alignment) && <option value={char.alignment}>{char.alignment}</option>}
            </Select>
            <div title="Aura color (book alignment table)" style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: alignmentAuraColor(char), border: `1px solid ${COLORS.border}` }} />
          </div>
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Homeworld">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.homeworld || ""} onChange={e => set({ homeworld: e.target.value })} placeholder="Planet name" />
            <Btn size="sm" onClick={() => set({ homeworld: pick(NPC_POOLS.planet) })}><Shuffle size={13}/></Btn>
          </div>
        </Field>
        {houseRules.gravityAcclimation && (
          <Field label="Accustomed Gravity (×g)">
            <TextInput type="number" step="0.1" value={char.accustomedGravity || 0} onChange={e => set({ accustomedGravity: +e.target.value })} title="Max gravity they can handle — drives Gravity Acclimation" />
          </Field>
        )}
        <Field label="Clothing Style">
          <div style={{ display: "flex", gap: 6 }}>
            <TextInput value={char.clothing || ""} onChange={e => set({ clothing: e.target.value })} />
            <Btn size="sm" onClick={() => set({ clothing: pick(NPC_POOLS.clothing) })}><Shuffle size={13}/></Btn>
          </div>
        </Field>
      </div>
      <Field label="Species">
        <SpeciesPicker value={char.species} onChange={(v) => set({ species: v })} customValue={customSpeciesInput} onCustomChange={setCustomSpeciesInput} />
      </Field>
      <SpeciesTraits species={char.species} />
      <SpeciesSkillChoice char={char} set={set} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Sub-Species"><SelectWithCustom value={char.subspecies} onChange={v => set({ subspecies: v })} options={(speciesByName(char.species) || {}).subSpecies || []} placeholder="Sub-species…" /></Field>
        <Field label="Heritage"><SelectWithCustom value={char.heritage || ""} onChange={v => set({ heritage: v })} options={HERITAGE_DATA.map(h => h.name)} placeholder="e.g. Mutant, Blessing of Komedi" /></Field>
      </div>
      <Field label="Picture URL"><TextInput value={char.pictureUrl || ""} onChange={e => set({ pictureUrl: e.target.value })} placeholder="https:// — shows on the sheet header" /></Field>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", margin: "6px 0 8px" }}>Appearance</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {[["age","Age"],["height","Height"],["weight","Weight"],["size","Size"],["gender","Gender"],["eyes","Eyes"],["hair","Hair"],["skin","Skin"]].map(([k,label]) => (
          <Field key={k} label={label}><TextInput value={app[k] || ""} onChange={e => setApp(k, e.target.value)} /></Field>
        ))}
      </div>
      <Field label="Core Personality Traits"><TextArea value={char.personality || ""} onChange={e => set({ personality: e.target.value })} placeholder="One trait per line..." /></Field>
      <Field label="Flaws & Weaknesses"><TextArea value={char.flaws || ""} onChange={e => set({ flaws: e.target.value })} placeholder="One flaw per line..." /></Field>
      {withNotes && <Field label="Notes"><TextArea value={char.notes} onChange={e => set({ notes: e.target.value })} /></Field>}
    </div>
  );
}

// Guided level-up (play editor only). Fired from ClassesTab's + button: bumps one
// class's level, rolls (or averages) HP for the new level, and previews everything
// the level changes so the player knows what to pick next. The class-level change
// cascades through useDerivedCharSync (char.level, prof bonus, max Stamina, etc.).
function LevelUpModal({ char, set, classIndex, onClose }) {
  const classes = char.classes || [];
  const c = classes[classIndex] || {};
  const fromCL = c.level || 1;
  const toCL = Math.min(20, fromCL + 1);
  const after = { ...char, classes: classes.map((x, j) => j === classIndex ? { ...x, level: toCL } : x) };
  const cd = CLASS_DATA[c.classId];
  const feats = (cd && cd.featuresByLevel && cd.featuresByLevel[toCL]) || "";
  const featTokens = feats.split(",").map(s => s.trim()).filter(Boolean);
  const grantsFeat = featTokens.some(t => /^(Feat|Epic Boon|Heroic Surge)$/.test(t));

  const die = char.hitDie || "d8";
  const dieSize = parseInt(die.slice(1), 10) || 8;
  const conMod = statMod(char, "con");
  const avgRoll = Math.floor(dieSize / 2) + 1; // 5e "fixed HP" value for the die

  const [mode, setMode] = useState("roll"); // roll | average | manual
  const [rolled, setRolled] = useState(() => roll(dieSize));
  const [manual, setManual] = useState(String(Math.max(1, avgRoll + conMod)));

  const baseDie = mode === "average" ? avgRoll : rolled;
  const hpGain = mode === "manual" ? Math.max(0, parseInt(manual, 10) || 0) : Math.max(1, baseDie + conMod);

  const rows = [
    ["Character Level", charTotalLevel(char), charTotalLevel(after)],
    ["Proficiency Bonus", profBonusForLevel(charTotalLevel(char)), profBonusForLevel(charTotalLevel(after))],
    ["Ki Rank", computeKiRank(char), computeKiRank(after)],
    ["Max Stamina", computeMaxStamina(char), computeMaxStamina(after)],
    ["Attacks / Turn", computeAttacksPerTurn(char), computeAttacksPerTurn(after)],
    ["Techniques Known (budget)", techniquesKnownBudget(char), techniquesKnownBudget(after)],
    ["Feats Owed", featsOwed(char).total, featsOwed(after).total],
  ].filter(r => r[1] !== r[2]);
  // Resource pools this level newly grants (or whose max grows) — auto-provisioned.
  const beforeRes = classGrantedResources(char);
  const afterRes = classGrantedResources(after);
  const newResources = afterRes.filter(a => {
    const b = beforeRes.find(x => x.key === a.key);
    return !b || b.max !== a.max;
  });

  const confirm = () => {
    const patch = { classes: after.classes };
    if (hpGain > 0) { patch.maxHp = (char.maxHp || 0) + hpGain; patch.hp = (char.hp || 0) + hpGain; }
    set(patch);
    onClose();
  };

  const modeBtn = (key, label) => (
    <button onClick={() => setMode(key)} style={{ flex: 1, padding: "6px 8px", fontSize: 12, fontWeight: 600, cursor: "pointer",
      background: mode === key ? `${COLORS.gold}22` : COLORS.panel, color: mode === key ? COLORS.gold : COLORS.muted,
      border: `1px solid ${mode === key ? COLORS.gold + "88" : COLORS.border}`, borderRadius: 6 }}>{label}</button>
  );

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(6,8,12,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: COLORS.panel, border: `1px solid ${COLORS.borderLit}`, borderRadius: 12, padding: 18, width: 460, maxWidth: "100%", maxHeight: "86vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <TrendingUp size={18} color={COLORS.gold} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>Level Up — {c.classId}</span>
          <span style={{ marginLeft: "auto", cursor: "pointer", color: COLORS.dim }} onClick={onClose}><X size={18} /></span>
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>{c.classId} {fromCL} → <span style={{ color: COLORS.gold, fontWeight: 700 }}>{toCL}</span></div>

        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Hit Points — {die}{conMod !== 0 ? ` ${conMod > 0 ? "+" : "−"} ${Math.abs(conMod)} CON` : ""}</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {modeBtn("roll", "Roll")}{modeBtn("average", `Average (${avgRoll})`)}{modeBtn("manual", "Manual")}
          </div>
          {mode === "roll" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 13 }}>{die} rolled <span style={{ color: COLORS.gold, fontWeight: 700 }}>{rolled}</span></span>
              <Btn size="sm" onClick={() => setRolled(roll(dieSize))}><Dices size={13} /> Re-roll</Btn>
            </div>
          )}
          {mode === "manual" && (
            <div style={{ marginBottom: 6 }}>
              <TextInput type="number" value={manual} onChange={e => setManual(e.target.value)} style={{ width: 90 }} />
              <span style={{ fontSize: 11, color: COLORS.dim, marginLeft: 8 }}>total HP added</span>
            </div>
          )}
          <div style={{ fontSize: 13, marginTop: 4 }}>
            <span style={{ color: COLORS.green, fontWeight: 700 }}>+{hpGain} HP</span>
            <span style={{ color: COLORS.dim }}> — Max HP {char.maxHp || 0} → <span style={{ color: COLORS.text, fontWeight: 700 }}>{(char.maxHp || 0) + hpGain}</span></span>
          </div>
        </div>

        {feats && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Class Features at {c.classId} {toCL}</div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{feats}</div>
            {grantsFeat && <div style={{ fontSize: 11.5, color: COLORS.gold, marginTop: 6 }}>Grants a Feat — pick it in Growth → Feats.</div>}
          </div>
        )}

        {newResources.length > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.green}44`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: COLORS.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>New Resource{newResources.length > 1 ? "s" : ""} — auto-tracked</div>
            {newResources.map(r => (
              <div key={r.key} style={{ fontSize: 12.5, color: COLORS.text }}>
                <span style={{ fontWeight: 700 }}>{r.name}</span>
                <span style={{ color: COLORS.dim }}> — {r.max}{r.die ? ` × ${r.die}` : ""} · {RESOURCE_RESET_LABEL[r.reset] || r.reset}</span>
              </div>
            ))}
          </div>
        )}

        {rows.length > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>What Changes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {rows.map(([label, a, b]) => (
                <div key={label} style={{ display: "flex", fontSize: 12.5 }}>
                  <span style={{ color: COLORS.muted, flex: 1 }}>{label}</span>
                  <span style={{ fontFamily: FONTS.mono }}><span style={{ color: COLORS.dim }}>{a}</span> <span style={{ color: COLORS.dim }}>→</span> <span style={{ color: COLORS.gold, fontWeight: 700 }}>{b}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="gold" onClick={confirm}><Check size={14} /> Confirm Level {toCL}</Btn>
        </div>
      </div>
    </div>
  );
}

function ClassesTab({ char, set, guided = false }) {
  const [adding, setAdding] = useState(false);
  const [levelUpIdx, setLevelUpIdx] = useState(null);
  const classes = char.classes || [];
  const updateClass = (i, patch) => set({ classes: classes.map((c, j) => j === i ? { ...c, ...patch } : c) });
  const bumpLevel = (i, c) => {
    if (guided && (c.level || 1) < 20) setLevelUpIdx(i);
    else updateClass(i, { level: Math.min(20, (c.level || 1) + 1) });
  };
  const removeClass = (i) => set({ classes: classes.filter((_, j) => j !== i) });
  const addClass = (classId) => { set({ classes: [...classes, { classId, level: 1 }] }); setAdding(false); };
  const total = charTotalLevel(char);

  if (adding || classes.length === 0) return (
    <div>
      {classes.length > 0 && <div style={{ marginBottom: 10 }}><Btn size="sm" variant="ghost" onClick={() => setAdding(false)}><ArrowLeft size={13}/> Back</Btn></div>}
      <ClassPicker value="" onConfirm={addClass} onCancel={() => setAdding(false)} />
    </div>
  );

  return (
    <div>
      {classes.map((c, i) => (
        <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Tag color={i === 0 ? COLORS.gold : COLORS.blue}>{c.classId}</Tag>
            {i === 0 && classes.length > 1 && <span style={{ fontSize: 10, color: COLORS.dim }}>primary — drives Unarmored Defense</span>}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: COLORS.muted }}>Level</span>
              <button onClick={() => updateClass(i, { level: Math.max(1, (c.level || 1) - 1) })} style={miniBtnStyle}><Minus size={12}/></button>
              <span style={{ fontWeight: 700, width: 22, textAlign: "center" }}>{c.level || 1}</span>
              <button onClick={() => bumpLevel(i, c)} style={miniBtnStyle} title={guided ? "Level up (guided)" : "Increase level"}><Plus size={12}/></button>
              <Btn size="sm" variant="danger" onClick={() => removeClass(i)} title="Remove this class"><Trash2 size={12}/></Btn>
            </div>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {CLASS_DATA[c.classId]?.flavor}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13}/> Add Class (multiclass)</Btn>
        <span style={{ fontSize: 11.5, color: COLORS.dim }}>Character Level <span style={{ color: COLORS.gold, fontWeight: 700 }}>{total}</span> = sum of class levels</span>
      </div>
      {levelUpIdx != null && <LevelUpModal char={char} set={set} classIndex={levelUpIdx} onClose={() => setLevelUpIdx(null)} />}
    </div>
  );
}

export {
  ClassPicker,
  AbilityTab,
  SpeciesTraits,
  SpeciesSkillChoice,
  SpeciesPicker,
  FeaturesTab,
  boonCostOf,
  TrainingTab,
  ProfCircle,
  SkillsSavesTab,
  FeatsPickerTab,
  BioTab,
  LevelUpModal,
  ClassesTab,
};
