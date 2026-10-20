import React, { useState, useRef, useEffect } from "react";
import { Archive, ArrowLeft, Check, Dices, Download, Plus, Trash2, TrendingUp, Upload, Users, X } from "lucide-react";
import { _pendingNav, clearPendingNav, onNav } from "../../app/bus.js";
import { CLASS_NAMES } from "../../data/class-data.js";
import { CLASS_HIT_DICE, abilityMod, charClasses, charTotalLevel, computeKiRank } from "../../engine/core.js";
import { computeAttacksPerTurn } from "../../engine/derived.js";
import { computeAC, computeArmorDR } from "../../engine/equipment.js";
import { STAT_KEYS } from "../../engine/skills.js";
import { isCaster } from "../../engine/spellcasting.js";
import { roll, uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, ConfirmBtn, EmptyState, ErrorBanner, Field, Gauge, LoadingBlock, ModeCard, ScannerHeader, Select, Tag, TextInput, downloadJSON } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { BioTab, ClassesTab, FeatsPickerTab, FeaturesTab, SpeciesPicker, TrainingTab } from "./builder-tabs.jsx";
import { CombatRefTab } from "./combat-tab.jsx";
import { BenefitsOfPowerCard, ConditionsPanel, FormsPlayTab, FormsTab, PowerOverloadCard } from "./forms.jsx";
import { FullBuilder } from "./full-builder.jsx";
import { MagicTab } from "./magic.jsx";
import { PREGEN_CHARS, migrateChar } from "./model.js";
import { ScouterSheet } from "./scouter-sheet.jsx";
import { StatsTab } from "./stats-tab.jsx";
import { KnownTechniquesTab, useDerivedCharSync } from "./techniques-tab.jsx";
import { InventoryTab, VitalsTab } from "./vitals-gear.jsx";

function CharacterEditorSimple({ char, onChange, onDelete, onClose }) {
  const [local, setLocal] = useState(() => migrateChar(char));
  // A Session hand-off may have set the tab we should open on + a combat target.
  const [tab, setTab] = useState(() => (_pendingNav && _pendingNav.entityId === char.id && _pendingNav.sheetTab) || "scouter");
  const [combatTarget, setCombatTarget] = useState(() => (_pendingNav && _pendingNav.entityId === char.id && _pendingNav.target) || null);
  const [customSpeciesInput, setCustomSpeciesInput] = useState("");
  const fileRef = useRef();
  const set = (patch) => setLocal(prev => ({ ...prev, ...patch }));
  // Consume the pending nav (last reader) and keep listening for further hand-offs.
  useEffect(() => {
    clearPendingNav(char.id);
    return onNav(p => {
      if (p.entityId !== char.id) return;
      if (p.sheetTab) setTab(p.sheetTab);
      setCombatTarget(p.target || null);
    });
  }, [char.id]);
  // Keep the stored ac/attacksPerTurn numbers live-synced to the class formula
  // whenever level, stats, or class change — so anywhere else that reads
  // char.ac or char.attacksPerTurn (roster cards, exports, combat) is correct
  // without the player re-entering anything.
  useDerivedCharSync(local, setLocal);
  useEffect(() => {
    setLocal(prev => {
      const patch = {};
      if (!prev.acOverride) { const c = computeAC(prev); if (c && c.value !== prev.ac) patch.ac = c.value; }
      if (prev.drOverride !== true) { const d = computeArmorDR(prev); if (d !== prev.dr) patch.dr = d; }
      return Object.keys(patch).length ? { ...prev, ...patch } : prev;
    });
  }, [JSON.stringify(local.classes), local.classId, local.level, local.stats?.dex, local.stats?.con, local.stats?.int, local.stats?.wis, local.acOverride, JSON.stringify(local.equipment), JSON.stringify(local.items), local.drOverride]);
  useEffect(() => {
    const attacks = computeAttacksPerTurn(local);
    if (attacks !== local.attacksPerTurn) setLocal(prev => ({ ...prev, attacksPerTurn: attacks }));
  }, [JSON.stringify(local.classes), local.classId, local.level]);

  useEffect(() => { onChange(local); /* eslint-disable-next-line */ }, [local]);
  const importFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { setLocal(migrateChar({ ...JSON.parse(reader.result), id: local.id })); } catch { alert("Couldn't read that file."); } };
    reader.readAsText(f);
  };
  const TABS = ["scouter", "bio", "stats", "combat", ...(isCaster(local) ? ["magic"] : []), "vitals", "forms", "inventory", "manage"];
  const TAB_LABELS = { scouter: "Scouter", bio: "Bio", stats: "Stats", combat: "Combat", magic: "Magic", vitals: "Vitals", forms: "Forms", inventory: "Inventory", manage: "Manage" };

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <TextInput value={local.name} onChange={e => set({ name: e.target.value })} style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, fontWeight: 700, background: "transparent", border: "none", maxWidth: 300 }} />
        <Btn size="sm" variant="ghost" onClick={onClose}><X size={15}/></Btn>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {local.pictureUrl && <img src={local.pictureUrl} alt="" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: `1px solid ${COLORS.border}` }} onError={e => { e.currentTarget.style.display = "none"; }} />}
        {charClasses(local).map((c, i) => <Tag key={i} color={i === 0 ? COLORS.gold : COLORS.blue}>{c.classId} {charClasses(local).length > 1 ? c.level : ""}</Tag>)}
        {local.species && <Tag color={COLORS.purple}>{local.species}</Tag>}
        {local.heritage && <Tag color={COLORS.amber}>{local.heritage}</Tag>}
        <Tag color={COLORS.dim}>Lv {charTotalLevel(local)}</Tag>
        <Tag color={COLORS.dim}>Ki Rank {computeKiRank(local)}</Tag>
        <Btn size="sm" variant={tab === "growth" ? "gold" : "default"} style={{ marginLeft: "auto" }} onClick={() => setTab("growth")}><TrendingUp size={13}/> Growth</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        <Gauge label="HP" value={local.hp} max={local.maxHp} color={COLORS.red} />
        <Gauge label="Ki" value={local.ki} max={local.maxKi} color={COLORS.blue} />
        <Gauge label="Stamina" value={local.stamina} max={local.maxStamina} color={COLORS.gold} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "scouter" && <ScouterSheet char={local} />}

      {tab === "bio" && <BioTab char={local} set={set} withNotes customSpeciesInput={customSpeciesInput} setCustomSpeciesInput={setCustomSpeciesInput} />}

      {tab === "growth" && (() => {
        const box = (title, node) => (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>{title}</div>
            {node}
          </div>
        );
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {box("Classes & Levels", <ClassesTab char={local} set={set} guided />)}
            {box("Feats", <FeatsPickerTab char={local} set={set} />)}
            {box("Features", <FeaturesTab char={local} set={set} />)}
            {box("Techniques", <KnownTechniquesTab char={local} set={set} />)}
            {box("Forms", <FormsTab char={local} set={set} />)}
            {box("Training", <TrainingTab char={local} set={set} />)}
          </div>
        );
      })()}

      {tab === "stats" && <StatsTab char={local} set={set} />}

      {tab === "combat" && <CombatRefTab char={local} set={set} combatTarget={combatTarget} onClearTarget={() => setCombatTarget(null)} />}

      {tab === "magic" && <MagicTab char={local} set={set} />}

      {tab === "vitals" && <VitalsTab char={local} set={set} />}

      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <PowerOverloadCard char={local} />
          <BenefitsOfPowerCard char={local} />
          <FormsPlayTab char={local} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <ConditionsPanel char={local} set={set} />
          </div>
        </div>
      )}

      {tab === "inventory" && <InventoryTab char={local} set={set} />}

      {tab === "manage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
          <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importFile} />
          <Btn variant="blue" onClick={() => downloadJSON(local, `${local.name.replace(/\s+/g,'_')}.json`)}><Download size={14}/> Save to device</Btn>
          <Btn onClick={() => fileRef.current.click()}><Upload size={14}/> Load from file</Btn>
          <Btn onClick={() => { const next = { ...local, archived: !local.archived }; setLocal(next); onChange(next); if (next.archived) onClose(); }}><Archive size={14}/> {local.archived ? "Unarchive character" : "Archive character"}</Btn>
          <ConfirmBtn variant="danger" size="md" confirmTitle="Delete this character permanently" onConfirm={() => onDelete(local.id)}><Trash2 size={14}/> Delete character</ConfirmBtn>
        </div>
      )}
    </div>
  );
}

function CharactersTab() {
  const [chars, persist, error] = useSharedList("characters_v2");
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState(null); // null | 'menu' | 'pregen' | 'template' | 'fast' | 'full'
  const [showArchived, setShowArchived] = useState(false);

  // Open the fighter a Session hand-off points at (this tab mounts as the nav
  // switches to it, so also read any nav that already fired).
  useEffect(() => {
    const apply = (p) => { if (p && p.tab === "players" && p.entityId) { setMode(null); setOpenId(p.entityId); } };
    apply(_pendingNav);
    return onNav(apply);
  }, []);

  if (chars === null) return <LoadingBlock />;
  const updateChar = (updated) => persist(chars.map(c => c.id === updated.id ? updated : c));
  const deleteChar = (id) => { persist(chars.filter(c => c.id !== id)); setOpenId(null); };
  const openChar = chars.find(c => c.id === openId);
  const addAndOpen = (c) => { const full = migrateChar(c.id ? c : { ...c, id: uid() }); persist([...chars, full]); setOpenId(full.id); setMode(null); };

  if (mode === "full") return (
    <div>
      <ScannerHeader title="FULL BUILDER" subtitle="Bio → Class → Stats → Skills → Inventory → Ability" onBack={() => setMode(null)} />
      <FullBuilder onSave={addAndOpen} onCancel={() => setMode(null)} />
    </div>
  );
  if (mode === "pregen") return (
    <div>
      <ScannerHeader title="PREGENERATED" subtitle="Ready-to-go fighters" onBack={() => setMode(null)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
        {PREGEN_CHARS.map((p,i) => (
          <div key={i} onClick={() => addAndOpen(p)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700 }}>{p.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{p.species} · {p.classId} · Lv {p.level}</div>
            <div style={{ color: COLORS.dim, fontSize: 11.5, fontStyle: "italic" }}>{p.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
  if (mode === "template" || mode === "fast") return (
    <div>
      <ScannerHeader title={mode === "template" ? "QUICK TEMPLATE" : "FAST & DIRTY"} subtitle={mode === "template" ? "Balanced stat block, pick species & class" : "Random stats, pick species & class"} onBack={() => setMode(null)} />
      <QuickCreate randomStats={mode === "fast"} onCreate={addAndOpen} onCancel={() => setMode(null)} />
    </div>
  );

  return (
    <div>
      <ScannerHeader title="PLAYERS" subtitle="Shared with the table. Export any sheet to save a copy on your device." />
      {error && <ErrorBanner text={error} />}
      {openChar ? (
        <CharacterEditorSimple char={openChar} onChange={updateChar} onClose={() => setOpenId(null)} onDelete={deleteChar} />
      ) : mode === "menu" ? (
        <div>
          <ModeCard title="Pregenerated" desc="Ready-to-go character from a small preset roster." onClick={() => setMode("pregen")} />
          <ModeCard title="Quick Template" desc="Balanced stat block, pick species/class, quick start." onClick={() => setMode("template")} />
          <ModeCard title="Fast & Dirty" desc="Randomly rolled stats. Pick species/class manually." onClick={() => setMode("fast")} />
          <ModeCard title="Full Builder" desc="Bio, real Class data with live feature progression, stats, skills, inventory." onClick={() => setMode("full")} />
          <Btn variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New Character</Btn>
            {chars.some(c => c.archived) && (
              <Btn size="sm" variant={showArchived ? "default" : "ghost"} onClick={() => setShowArchived(!showArchived)}><Archive size={13}/> Archived ({chars.filter(c => c.archived).length})</Btn>
            )}
          </div>
          {chars.filter(c => !c.archived).length === 0 && !showArchived ? (
            <EmptyState icon={Users} title="No characters yet" body="Add your first fighter." action={<Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New Character</Btn>} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
              {chars.filter(c => !c.archived).map(c => (
                <div key={c.id} onClick={() => setOpenId(c.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                    <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete this character permanently" onConfirm={() => deleteChar(c.id)}><Trash2 size={13}/></ConfirmBtn>
                  </div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{[c.species, charClasses(c).map(x => charClasses(c).length > 1 ? `${x.classId} ${x.level}` : x.classId).join(" / ")].filter(Boolean).join(" · ") || "Unset"} {c.level ? `· Lv ${charTotalLevel(c)}` : ""}</div>
                  <Gauge label="HP" value={c.hp} max={c.maxHp||1} color={COLORS.red} />
                  <Gauge label="Ki" value={c.ki} max={c.maxKi||1} color={COLORS.blue} />
                </div>
              ))}
            </div>
          )}
          {showArchived && chars.some(c => c.archived) && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10, paddingBottom: 4, borderBottom: `1px solid ${COLORS.border}` }}>Archived</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
                {chars.filter(c => c.archived).map(c => (
                  <div key={c.id} onClick={() => setOpenId(c.id)} style={{ cursor: "pointer", opacity: 0.55, background: COLORS.panel, border: `1px dashed ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                      <ConfirmBtn size="sm" variant="ghost" confirmTitle="Delete this character permanently" onConfirm={() => deleteChar(c.id)}><Trash2 size={13}/></ConfirmBtn>
                    </div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{[c.species, c.classId].filter(Boolean).join(" · ") || "Unset"} {c.level ? `· Lv ${charTotalLevel(c)}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Book ability-score methods (Ch.3): Standard Array (15,14,13,12,10,8) and Roll
// (4d6, keep the three highest). Both quick builders share this — Template uses the
// array, Fast & Dirty rolls — then you assign each number to an ability yourself.
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const rollAbilityScore = () => { const r = [roll(6), roll(6), roll(6), roll(6)].sort((a, b) => b - a); return r[0] + r[1] + r[2]; };

function QuickCreate({ randomStats, onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [customSpecies, setCustomSpecies] = useState("");
  const [classId, setClassId] = useState(CLASS_NAMES[0]);
  const [level, setLevel] = useState(1);
  const genPool = () => randomStats ? Array.from({ length: 6 }, rollAbilityScore) : [...STANDARD_ARRAY];
  const [pool, setPool] = useState(genPool);
  const [assign, setAssign] = useState({ str: null, dex: null, con: null, int: null, wis: null, cha: null });
  const reroll = () => { setPool(genPool()); setAssign({ str: null, dex: null, con: null, int: null, wis: null, cha: null }); };
  const usedIdx = STAT_KEYS.map(k => assign[k]).filter(i => i != null);
  const setAbility = (ab, raw) => setAssign(prev => {
    const idx = raw === "" ? null : Number(raw);
    const next = { ...prev };
    if (idx != null) for (const k of STAT_KEYS) if (next[k] === idx) next[k] = null; // each number used once
    next[ab] = idx;
    return next;
  });
  const stats = Object.fromEntries(STAT_KEYS.map(k => [k, assign[k] != null ? pool[assign[k]] : 10]));
  const ready = STAT_KEYS.every(k => assign[k] != null);

  // Book-correct derived stats: HP from the class hit die + CON; Stamina via the
  // book formula; AC is left to the computed unarmored-defense in the editor.
  const die = CLASS_HIT_DICE[classId] || "d8";
  const dieMax = parseInt(die.slice(1), 10) || 8;
  const avg = Math.floor(dieMax / 2) + 1;
  const conMod = abilityMod(stats.con);
  const L = Math.max(1, level || 1);
  const maxHp = Math.max(1, (dieMax + conMod) + (L - 1) * (avg + conMod));
  const maxStamina = Math.max(1, 2 + conMod + 2 * (L - 1));
  const maxKi = 10 + 5 * (L - 1); // no book Ki-max formula — editable starting estimate

  const create = () => onCreate({
    name: name || "New Fighter", species: species || customSpecies, classId, level: L,
    classes: [{ classId, level: L }],
    stats, hitDie: die,
    hp: maxHp, maxHp, ki: maxKi, maxKi, stamina: maxStamina, maxStamina,
  });

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <Field label="Name"><TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Character name" /></Field>
      <Field label="Species"><SpeciesPicker value={species} onChange={setSpecies} customValue={customSpecies} onCustomChange={setCustomSpecies} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Class"><Select value={classId} onChange={e => setClassId(e.target.value)}>{CLASS_NAMES.map(n => <option key={n}>{n}</option>)}</Select></Field>
        <Field label="Level"><TextInput type="number" value={level} min={1} max={20} onChange={e => setLevel(Math.max(1, Math.min(20, +e.target.value || 1)))} /></Field>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "6px 0 8px" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>
          {randomStats ? "Ability Scores — Rolled (4d6, drop lowest)" : "Ability Scores — Standard Array"}
        </span>
        {randomStats && <Btn size="sm" onClick={reroll}><Dices size={13} /> Re-roll</Btn>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {pool.map((v, i) => (
          <span key={i} style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 12.5, padding: "3px 9px", borderRadius: 6, background: usedIdx.includes(i) ? COLORS.panel2 : `${COLORS.gold}18`, color: usedIdx.includes(i) ? COLORS.dim : COLORS.gold, border: `1px solid ${usedIdx.includes(i) ? COLORS.border : COLORS.gold + "66"}`, textDecoration: usedIdx.includes(i) ? "line-through" : "none" }}>{v}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
        {STAT_KEYS.map(ab => {
          const options = pool.map((v, i) => ({ i, v })).filter(({ i }) => assign[ab] === i || !usedIdx.includes(i));
          const val = assign[ab] != null ? pool[assign[ab]] : null;
          const mod = val != null ? abilityMod(val) : null;
          return (
            <div key={ab} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: COLORS.muted }}>{ab}</span>
                {mod != null && <span style={{ fontSize: 10.5, color: COLORS.gold, fontFamily: "JetBrains Mono, monospace" }}>{mod >= 0 ? "+" : ""}{mod}</span>}
              </div>
              <Select value={assign[ab] == null ? "" : assign[ab]} onChange={e => setAbility(ab, e.target.value)} style={{ padding: "5px 6px" }}>
                <option value="">—</option>
                {options.map(({ i, v }) => <option key={i} value={i}>{v}</option>)}
              </Select>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>
        {die} hit die · HP {maxHp} · Stamina {maxStamina} · Ki {maxKi}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Btn variant="gold" onClick={create} disabled={!ready} style={{ opacity: ready ? 1 : 0.5 }}><Check size={14} /> Create</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

export {
  CharacterEditorSimple,
  CharactersTab,
  STANDARD_ARRAY,
  rollAbilityScore,
  QuickCreate,
};
