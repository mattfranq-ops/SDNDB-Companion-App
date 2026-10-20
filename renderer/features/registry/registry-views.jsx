import React, { useState } from "react";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Crosshair, Dices, Eye, EyeOff, Plus, RotateCcw, Swords, Trash2, X } from "lucide-react";
import { useLocalOption } from "../../app/App.jsx";
import { STAT_KEYS } from "../../engine/skills.js";
import { rint } from "../../engine/universe.js";
import { roll, uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { HOOK_TYPES, REGISTRY_CATS, REGISTRY_GROUPS, REG_RARITY_TIERS, blankHook, hookSummary, hookType, regRarityInfo, useProposals, useRegistry, weightedPickEntries } from "../../state/registry.js";
import { Btn, Field, LoadingBlock, Select, Tag, TextArea, TextInput } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { blankCombatant } from "../session/combat-parts.jsx";

// One editable form field for a hook parameter, keyed off its declared kind.
function HookParamField({ p, value, onChange }) {
  if (p.kind === "num") return <TextInput type="number" value={value != null && value !== "" ? value : ""} onChange={e => onChange(e.target.value === "" ? "" : +e.target.value)} title={p.label} style={{ width: 84 }} />;
  if (p.kind === "stat") return <Select value={value || "con"} onChange={e => onChange(e.target.value)} style={{ width: 84 }}>{STAT_KEYS.map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}</Select>;
  if (p.kind === "select") return <Select value={value || p.options[0]} onChange={e => onChange(e.target.value)} style={{ width: 110 }}>{p.options.map(o => <option key={o} value={o}>{o}</option>)}</Select>;
  if (p.kind === "lines") return <TextArea value={Array.isArray(value) ? value.join("\n") : (value || "")} onChange={e => onChange(e.target.value.split("\n"))} placeholder={p.label} style={{ minHeight: 44, flex: 1, minWidth: 200 }} />;
  return <TextInput value={value || ""} onChange={e => onChange(e.target.value)} placeholder={p.label} style={{ flex: 1, minWidth: 140 }} />;
}

// The effect editor shared by the entry editor and the proposal form: free text
// plus a data driven list of automatic hooks.
function EffectEditor({ effect, onChange, editable }) {
  const eff = effect || { text: "", hooks: [] };
  const hooks = eff.hooks || [];
  const setText = (t) => onChange({ ...eff, text: t });
  const setHook = (i, h) => onChange({ ...eff, hooks: hooks.map((x, j) => j === i ? h : x) });
  const addHook = (type) => onChange({ ...eff, hooks: [...hooks, blankHook(type)] });
  const removeHook = (i) => onChange({ ...eff, hooks: hooks.filter((_, j) => j !== i) });
  return (
    <div>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, margin: "10px 0 5px" }}>What it does</div>
      {editable
        ? <TextArea value={eff.text || ""} onChange={e => setText(e.target.value)} placeholder="Describe the effect in plain language. Broad is fine." style={{ minHeight: 48 }} />
        : <div style={{ fontSize: 12.5, color: eff.text ? COLORS.text : COLORS.dim }}>{eff.text || "No description."}</div>}
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, margin: "12px 0 5px" }}>Automatic effects</div>
      {hooks.length === 0 && <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 6 }}>None. {editable ? "Add one below to give this a mechanical effect the app applies for you." : ""}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {hooks.map((h, i) => { const t = hookType(h.type); return (
          <div key={i} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: editable ? 8 : 0, flexWrap: "wrap" }}>
              <Tag color={t ? t.color : COLORS.muted}>{t ? t.label : h.type}</Tag>
              {!editable && <span style={{ fontSize: 12 }}>{hookSummary(h)}</span>}
              {editable && <><div style={{ flex: 1 }} /><X size={13} color={COLORS.red} style={{ cursor: "pointer" }} onClick={() => removeHook(i)} /></>}
            </div>
            {editable && t && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {t.params.map(p => (
                  <label key={p.key} style={{ fontSize: 10, color: COLORS.muted, display: "flex", flexDirection: "column", gap: 3 }}>
                    {p.label}
                    <HookParamField p={p} value={h[p.key]} onChange={v => setHook(i, { ...h, [p.key]: v })} />
                  </label>
                ))}
              </div>
            )}
          </div>
        ); })}
      </div>
      {editable && (
        <Select value="" onChange={e => { if (e.target.value) addHook(e.target.value); }} style={{ marginTop: 8, width: 240 }}>
          <option value="">Add an automatic effect...</option>
          {HOOK_TYPES.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
        </Select>
      )}
    </div>
  );
}

// The World & Rules screen: a hub of registry categories, drilling into a list of
// entries and an editor. DM edits directly; players propose additions.
function WorldRulesTab() {
  const [view] = useLocalOption("sdndbz_session_view_v1", { mode: "player" });
  const isDM = view.mode === "dm";
  const [openCat, setOpenCat] = useState(null);
  const [proposals] = useProposals();
  const pendingBy = {};
  for (const p of (proposals || [])) pendingBy[p.cat] = (pendingBy[p.cat] || 0) + 1;
  if (openCat) return <RegistryCategoryView catKey={openCat} isDM={isDM} onBack={() => setOpenCat(null)} />;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: COLORS.muted }}>Edit the building blocks the app generates and runs on. {isDM ? "You are in DM view: your edits change the table's rules." : "You are in Player view: you can browse and propose additions for the DM to approve."}</div>
      </div>
      {REGISTRY_GROUPS.map(group => (
        <div key={group} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>{group}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {REGISTRY_CATS.filter(c => c.group === group).map(c => (
              <div key={c.key} onClick={() => setOpenCat(c.key)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, position: "relative" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = c.color + "77"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                <c.icon size={22} color={c.color} style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 700, fontSize: 13 }}>{c.label}</div>
                <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 2 }}>{c.base().length} entries</div>
                {isDM && pendingBy[c.key] > 0 && <span style={{ position: "absolute", top: 10, right: 10, background: COLORS.gold, color: "#0b0e17", fontSize: 10, fontWeight: 800, borderRadius: 10, padding: "1px 7px" }}>{pendingBy[c.key]}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RarityTag({ rarity, count }) {
  const r = regRarityInfo(rarity);
  return <Tag color={r.color}>{r.label}{r.unique && count ? ` x${count}` : ""}</Tag>;
}

function RegistryCategoryView({ catKey, isDM, onBack }) {
  const reg = useRegistry(catKey);
  const [proposals, persistProposals] = useProposals();
  const [openId, setOpenId] = useState(null);
  const [draft, setDraft] = useState(null);   // { name, desc, rarity, effect } for a new entry / proposal
  if (reg.loading) return <LoadingBlock />;
  const cat = reg.cat;
  const pending = (proposals || []).filter(p => p.cat === catKey);
  const approve = (p) => { reg.addCustom(p.payload); persistProposals((proposals || []).filter(x => x.id !== p.id)); };
  const decline = (p) => persistProposals((proposals || []).filter(x => x.id !== p.id));
  const startDraft = () => { const seed = { name: "", desc: "", rarity: "common", effect: { text: "", hooks: [] } }; (cat.extraFields || []).forEach(f => { seed[f.key] = ""; }); setDraft(seed); };
  const submitDraft = () => {
    if (!draft.name.trim()) return;
    if (isDM) reg.addCustom(draft);
    else persistProposals([...(proposals || []), { id: uid(), cat: catKey, entryName: draft.name.trim(), payload: draft, ts: Date.now() }]);
    setDraft(null);
  };
  const open = reg.entries.find(e => e._id === openId);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <Btn size="sm" variant="ghost" onClick={onBack}><ArrowLeft size={14} /> All categories</Btn>
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 15 }}>{cat.label}</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={startDraft}><Plus size={13} /> {isDM ? "Add entry" : "Propose entry"}</Btn>
      </div>

      {isDM && pending.length > 0 && (
        <div style={{ background: `${COLORS.gold}0E`, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Player proposals ({pending.length})</div>
          {pending.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{p.entryName}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{(p.payload && p.payload.desc) || "No description."}{p.payload && p.payload.effect && p.payload.effect.hooks && p.payload.effect.hooks.length ? ` · ${p.payload.effect.hooks.length} automatic effect(s)` : ""}</div>
              </div>
              <Btn size="sm" variant="gold" onClick={() => approve(p)}><Check size={13} /> Approve</Btn>
              <Btn size="sm" variant="ghost" onClick={() => decline(p)}><X size={13} /></Btn>
            </div>
          ))}
        </div>
      )}

      {draft && (
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.gold}55`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>{isDM ? "New entry" : "Propose an addition"}</div>
          <Field label="Name"><TextInput value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="Name" /></Field>
          <Field label="Description"><TextArea value={draft.desc} onChange={e => setDraft({ ...draft, desc: e.target.value })} placeholder="What is it?" style={{ minHeight: 44 }} /></Field>
          <Field label="Rarity"><Select value={draft.rarity} onChange={e => setDraft({ ...draft, rarity: e.target.value })} style={{ width: 160 }}>{REG_RARITY_TIERS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
          {draft.rarity === "unique" && <Field label="How many in the galaxy"><TextInput type="number" value={draft.uniqueCount != null ? draft.uniqueCount : 1} onChange={e => setDraft({ ...draft, uniqueCount: Math.max(1, +e.target.value || 1) })} style={{ width: 120 }} /></Field>}
          {(cat.extraFields || []).map(f => (
            <Field key={f.key} label={f.label}>{f.kind === "textarea"
              ? <TextArea value={draft[f.key] || ""} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} style={{ minHeight: 64 }} />
              : <TextInput value={draft[f.key] || ""} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} />}</Field>
          ))}
          <EffectEditor effect={draft.effect} onChange={eff => setDraft({ ...draft, effect: eff })} editable />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn size="sm" variant="gold" onClick={submitDraft}>{isDM ? "Add" : "Submit to DM"}</Btn>
            <Btn size="sm" variant="ghost" onClick={() => setDraft(null)}>Cancel</Btn>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {reg.entries.map(e => {
          const editing = openId === e._id;
          return (
            <div key={e._id} style={{ background: COLORS.panel, border: `1px solid ${editing ? COLORS.gold + "66" : COLORS.border}`, borderRadius: 10, padding: 12, opacity: e.enabled ? 1 : 0.55 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setOpenId(editing ? null : e._id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{e._name}</span>
                    <RarityTag rarity={e.rarity} count={e.uniqueCount} />
                    {e._custom && <Tag color={COLORS.purple}>Custom</Tag>}
                    {e._edited && <Tag color={COLORS.blue}>Edited</Tag>}
                    {!e.enabled && <Tag color={COLORS.dim}>Disabled</Tag>}
                    {(e.effect.hooks || []).length > 0 && <Tag color={COLORS.green}>{e.effect.hooks.length} effect{e.effect.hooks.length === 1 ? "" : "s"}</Tag>}
                  </div>
                  <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 3 }}>{e._desc}</div>
                </div>
                {isDM && (
                  <button onClick={() => reg.toggleEnabled(e._id)} title={e.enabled ? "Disable" : "Enable"} style={{ cursor: "pointer", background: "transparent", border: "none", color: e.enabled ? COLORS.green : COLORS.dim, padding: 4 }}>
                    {e.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                )}
                <button onClick={() => setOpenId(editing ? null : e._id)} style={{ cursor: "pointer", background: "transparent", border: "none", color: COLORS.muted, padding: 4 }}>
                  {editing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              {editing && (
                <div style={{ marginTop: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
                  {isDM ? (
                    <>
                      <Field label="Name"><TextInput value={e._name} onChange={ev => reg.setPatch(e._id, { name: ev.target.value })} /></Field>
                      <Field label="Description"><TextArea value={e._desc} onChange={ev => reg.setPatch(e._id, { desc: ev.target.value })} style={{ minHeight: 44 }} /></Field>
                      <Field label="Rarity"><Select value={e.rarity} onChange={ev => reg.setPatch(e._id, { rarity: ev.target.value })} style={{ width: 160 }}>{REG_RARITY_TIERS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}</Select></Field>
                      {e.rarity === "unique" && <Field label="How many in the galaxy"><TextInput type="number" value={e.uniqueCount} onChange={ev => reg.setPatch(e._id, { uniqueCount: Math.max(1, +ev.target.value || 1) })} style={{ width: 120 }} /></Field>}
                      {(cat.extraFields || []).map(f => (
                        <Field key={f.key} label={f.label}>{f.kind === "textarea"
                          ? <TextArea value={e[f.key] || ""} onChange={ev => reg.setPatch(e._id, { [f.key]: ev.target.value })} style={{ minHeight: 64 }} />
                          : <TextInput value={e[f.key] || ""} onChange={ev => reg.setPatch(e._id, { [f.key]: ev.target.value })} />}</Field>
                      ))}
                      <EffectEditor effect={e.effect} onChange={eff => reg.setPatch(e._id, { effect: eff })} editable />
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        {e._custom && <Btn size="sm" variant="danger" onClick={() => { reg.removeEntry(e._id); setOpenId(null); }}><Trash2 size={13} /> Delete</Btn>}
                        {e._edited && <Btn size="sm" variant="ghost" onClick={() => { reg.resetEntry(e._id); setOpenId(null); }}><RotateCcw size={13} /> Reset to book</Btn>}
                      </div>
                    </>
                  ) : (
                    <EffectEditor effect={e.effect} onChange={() => {}} editable={false} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Parse a raid-party roster ("Role xN" / "Role xN-M" lines) and roll the ranges.
const rollRoster = (rosterText) => String(rosterText || "").split("\n").map(s => s.trim()).filter(Boolean).map(line => {
  const m = line.match(/^(.*?)\s*[x×]\s*(\d+)(?:\s*[-to]+\s*(\d+))?\s*$/i);
  if (!m) return { role: line, count: 1 };
  const lo = +m[2], hi = m[3] != null ? +m[3] : lo;
  return { role: m[1].trim(), count: rint(Math.min(lo, hi), Math.max(lo, hi)) };
}).filter(r => r.count > 0);

// DM quick-builders: roll a war goal or a raid party from the registry (respecting
// enable/disable + rarity), and drop a rolled warband straight into the tracker.
function WarGoalBuilder() {
  const reg = useRegistry("wargoals");
  const [result, setResult] = useState(null);
  const pool = reg.loading ? [] : reg.entries.filter(e => e.enabled);
  const rollGoal = () => { const e = weightedPickEntries(pool); if (e) setResult(e); };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Swords size={16} color={COLORS.red} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>War Goal</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={rollGoal}><Dices size={13} /> {result ? "Reroll" : "Roll"}</Btn>
      </div>
      {result ? (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.red}55`, borderRadius: 8, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{result._name}</span>
            <RarityTag rarity={result.rarity} />
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.muted }}>{result._desc}</div>
        </div>
      ) : <div style={{ fontSize: 12, color: COLORS.dim }}>Roll a random objective to frame the next war. Edit the pool in World & Rules.</div>}
    </div>
  );
}

function RaidPartyBuilder() {
  const reg = useRegistry("raidparties");
  const [combat, persistCombat] = useSharedList("session_combat");
  const [result, setResult] = useState(null);   // { entry, roster: [{role, count}] }
  const [added, setAdded] = useState(false);
  const pool = reg.loading ? [] : reg.entries.filter(e => e.enabled);
  const rollParty = () => { const e = weightedPickEntries(pool); if (e) { setResult({ entry: e, roster: rollRoster(e.roster) }); setAdded(false); } };
  const total = result ? result.roster.reduce((s, r) => s + r.count, 0) : 0;
  const addToTracker = () => {
    if (!result) return;
    const data = (combat && combat[0]) || { round: 1, turn: 0, combatants: [] };
    const newCombs = [];
    result.roster.forEach(r => { for (let i = 0; i < r.count; i++) newCombs.push({ ...blankCombatant(), name: r.count > 1 ? `${r.role} ${i + 1}` : r.role, init: roll(20) }); });
    persistCombat([{ ...data, combatants: [...data.combatants, ...newCombs] }]);
    setAdded(true);
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Crosshair size={16} color={COLORS.amber} />
        <span style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 14 }}>Raid Party</span>
        <div style={{ flex: 1 }} />
        <Btn size="sm" variant="gold" onClick={rollParty}><Dices size={13} /> {result ? "Reroll" : "Roll"}</Btn>
      </div>
      {result ? (
        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.amber}55`, borderRadius: 8, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{result.entry._name}</span>
            <RarityTag rarity={result.entry.rarity} />
            <Tag color={COLORS.dim}>{total} fighters</Tag>
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>{result.entry._desc}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {result.roster.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5 }}>
                <span style={{ color: COLORS.amber, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", minWidth: 28 }}>{r.count}x</span>
                <span>{r.role}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <Btn size="sm" variant={added ? "ghost" : "gold"} disabled={added} onClick={addToTracker}>{added ? "Added to Initiative ✓" : <><Plus size={13} /> Add to Initiative</>}</Btn>
          </div>
        </div>
      ) : <div style={{ fontSize: 12, color: COLORS.dim }}>Roll an enemy warband, then drop it into the Initiative tracker. Edit the templates in World & Rules.</div>}
    </div>
  );
}

function BuildersTab() {
  return (
    <div>
      <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>Quick-roll the pieces of an encounter. Both pull from editable pools in World & Rules (enable/disable, rarity, or add your own).</div>
      <WarGoalBuilder />
      <RaidPartyBuilder />
    </div>
  );
}

export {
  HookParamField,
  EffectEditor,
  WorldRulesTab,
  RarityTag,
  RegistryCategoryView,
  rollRoster,
  WarGoalBuilder,
  RaidPartyBuilder,
  BuildersTab,
};
