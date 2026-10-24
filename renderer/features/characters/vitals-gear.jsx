import React, { useState } from "react";
import { HeartPulse, Minus, Plus, RotateCcw, Trash2, X, Zap } from "lucide-react";
import { rarityInfo } from "../../data/book-tables.js";
import { CYBERNETICS_RULES, HIGH_TECH_PARTS } from "../../data/hightech-data.js";
import { logSession } from "../../app/bus.js";
import { consumeItem } from "../../engine/consumables.js";
import { charTotalLevel } from "../../engine/core.js";
import { cyberneticKiControlPenalty, cyberneticLimit, cyberneticsExempt, cyberneticsUsed, hasCybernetic, installedParts, isAndroidBody, partIsAdvanced } from "../../engine/cybernetics.js";
import { computeAttacksPerTurn } from "../../engine/derived.js";
import { EQUIP_SLOTS, computeAC, computeArmorDR, computeWeighted, equippedEntries, normalizeItem, slotTypeLabel, weightMultiplier } from "../../engine/equipment.js";
import { cappedArmorDR } from "../../engine/damage.js";
import { resourceRestPatch } from "../../engine/resources.js";
import { chargesResetPatch } from "../../engine/charges.js";
import { activeAura, classDefenseDR } from "../../engine/spellcasting.js";
import { uid } from "../../lib/dice.js";
import { attunementCapFor, useHouseRules } from "../../state/hooks.js";
import { Btn, Checkbox, CommaNumInput, Gauge, Select, TextInput } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { BodyFigure, ItemsEditor, SLOT_POS, TagListEditor } from "./items.jsx";
import { ResourceTracker, magicRestPatch } from "./magic.jsx";
import { DeathSavesPanel } from "./stats-tab.jsx";
import { InjuriesCard, InjuryOverlay } from "./injuries.jsx";
import { addInjuriesPatch, injuryLine, longRestInjuryPatch, rollLingeringInjury } from "../../engine/injuries.js";

function VitalsTab({ char, set }) {
  const hpPct = char.maxHp ? char.hp / char.maxHp : 1;
  const healthColor = hpPct < 0.25 ? COLORS.red : hpPct < 0.5 ? COLORS.amber : COLORS.blue;
  const v = char.vitals || { exhaustion: 0, food: 3, water: 3, rest: 3 };
  const setV = (patch) => set({ vitals: { ...v, ...patch } });
  const [bodyPart, setBodyPart] = useState(null);
  // Adding Crippled rolls a Lingering Injury onto the body (book p.11).
  const addStatus = (val) => {
    const patch = { conditions: [...(char.conditions || []), val] };
    if (/^crippled\b/i.test(String(val).trim())) {
      const inj = rollLingeringInjury();
      Object.assign(patch, addInjuriesPatch(char, [inj]));
      logSession(`${char.name} is Crippled: ${injuryLine(inj)}`, char.name);
    }
    set(patch);
  };
  // Rests (book Ch.1): Short → regain half max Ki. Long → full HP/Ki/Stamina,
  // refill the Breather pool, reset death saves, drop one Exhaustion, Rest→Fresh.
  const shortRest = () => set({
    ki: Math.min(char.maxKi || 0, (char.ki || 0) + Math.floor((char.maxKi || 0) / 2)),
    ...(magicRestPatch(char, "short") || {}),
    ...(resourceRestPatch(char, "short") || {}),
    ...(chargesResetPatch(char, "short") || {}),
    // Stamina Engine (High-Tech Part): the Breather Pool refills on a Short Rest.
    ...(hasCybernetic(char, "stamina-engine") ? { breatherPool: null } : {}),
  });
  const longRest = () => set({
    hp: char.maxHp || 0, ki: char.maxKi || 0, stamina: char.maxStamina || 0,
    breatherPool: null, deathSaves: { success: 0, fail: 0 }, consumablesUsed: {},
    vitals: { ...v, exhaustion: Math.max(0, (v.exhaustion || 0) - 1), rest: 3 },
    // Regain half your Hit Dice (min 1, 5e rule); temp pools expire; God Ki refills.
    hitDiceUsed: Math.max(0, (char.hitDiceUsed || 0) - Math.max(1, Math.floor(charTotalLevel(char) / 2))),
    temp: { hp: 0, ki: 0, stamina: 0 },
    godKi: { ...(char.godKi || { max: 0 }), current: (char.godKi || {}).max || 0, temp: 0 },
    ...(magicRestPatch(char, "long") || {}),
    ...(resourceRestPatch(char, "long") || {}),
    ...(chargesResetPatch(char, "long") || {}),
    // A day passes: each Festering Wound takes 1 Maximum HP.
    ...(() => { const p = longRestInjuryPatch(char); return p ? { ...p, hp: p.maxHp } : {}; })(),
  });
  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 };
  const head = { fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 };
  const stepper = (label, val, on, max, words) => (
    <div>
      <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span><span style={{ color: COLORS.text, fontWeight: 700 }}>{words ? words[val] ?? val : val}</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Btn size="sm" onClick={() => on(Math.max(0, val - 1))}><Minus size={11}/></Btn>
        <div style={{ flex: 1, height: 6, background: "#00000055", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${(val / max) * 100}%`, height: "100%", background: label === "Exhaustion" ? COLORS.red : COLORS.gold }} /></div>
        <Btn size="sm" onClick={() => on(Math.min(max, val + 1))}><Plus size={11}/></Btn>
      </div>
    </div>
  );
  return (
    <div className="vitals-grid" style={{ display: "grid", gridTemplateColumns: "minmax(260px,360px) 1fr", gap: 18, alignItems: "start" }}>
      <div className="vitals-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4.6", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
          <BodyFigure stroke={healthColor} />
          <InjuryOverlay char={char} selected={bodyPart} onSelect={setBodyPart} />
        </div>
        <InjuriesCard char={char} set={set} selected={bodyPart} onSelect={setBodyPart} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={card}>
          <div style={head}>Health</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["hp", "maxHp", "HP", COLORS.red], ["ki", "maxKi", "Ki", COLORS.blue], ["stamina", "maxStamina", "Stamina", COLORS.gold]].map(([cur, mx, label, color]) => (
              <div key={cur}>
                <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>{label}</div>
                <CommaNumInput value={char[cur] || 0} onValue={v => set({ [cur]: v })} style={{ textAlign: "center" }} />
                <div style={{ marginTop: 6 }}><Gauge label="" value={char[cur]} max={char[mx] || 1} color={color} /></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card, display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ ...head, marginBottom: 0, flex: 1 }}>Rest</div>
          <Btn size="sm" onClick={shortRest} title="Regain half your maximum Ki"><Zap size={13}/> Short Rest</Btn>
          <Btn size="sm" variant="gold" onClick={longRest} title="Full HP / Ki / Stamina, refill Breather, reset Death Saves, −1 Exhaustion"><HeartPulse size={13}/> Long Rest</Btn>
        </div>
        <DeathSavesPanel char={char} set={set} />
        {(() => {
          const hdMax = charTotalLevel(char);
          const hdUsed = char.hitDiceUsed || 0;
          const hdAvail = Math.max(0, hdMax - hdUsed);
          const temp = char.temp || { hp: 0, ki: 0, stamina: 0 };
          const gk = char.godKi || { current: 0, max: 0, temp: 0 };
          const subHead = { fontSize: 10, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 };
          const numCol = (label, val, on, color) => (
            <div><div style={{ fontSize: 10, color: color || COLORS.muted, marginBottom: 4 }}>{label}</div>
              <TextInput type="number" value={val || 0} onChange={e => on(+e.target.value || 0)} style={{ textAlign: "center" }} /></div>
          );
          return (
            <div style={card}>
              <div style={head}>Resources</div>
              {/* Hit Dice — max = character level; spend to heal, regain half on a Long Rest. */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ ...subHead, marginBottom: 0, flex: 1 }}>Hit Dice</div>
                <Select value={char.hitDie || "d8"} onChange={e => set({ hitDie: e.target.value })} style={{ width: 74 }}>
                  {["d6", "d8", "d10", "d12"].map(d => <option key={d} value={d}>{d}</option>)}
                </Select>
                <Btn size="sm" onClick={() => set({ hitDiceUsed: Math.min(hdMax, hdUsed + 1) })} title="Spend a Hit Die">Spend</Btn>
                <span style={{ fontWeight: 700, minWidth: 62, textAlign: "center" }}>{hdAvail}<span style={{ color: COLORS.dim, fontWeight: 400 }}> / {hdMax}</span></span>
                <Btn size="sm" onClick={() => set({ hitDiceUsed: Math.max(0, hdUsed - 1) })} title="Restore a Hit Die"><RotateCcw size={12}/></Btn>
              </div>
              {/* Temp pools sit on top of HP/Ki/Stamina; cleared by a Long Rest. */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginBottom: 12 }}>
                <div style={subHead}>Temporary Points</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {numCol("Temp HP", temp.hp, x => set({ temp: { ...temp, hp: x } }), COLORS.red)}
                  {numCol("Temp Ki", temp.ki, x => set({ temp: { ...temp, ki: x } }), COLORS.blue)}
                  {numCol("Temp Stamina", temp.stamina, x => set({ temp: { ...temp, stamina: x } }), COLORS.gold)}
                </div>
              </div>
              {/* God Ki — usually gained at Lv20; refills on a Long Rest. */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
                <div style={subHead}>God Ki</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {numCol("Current", gk.current, x => set({ godKi: { ...gk, current: x } }))}
                  {numCol("Max", gk.max, x => set({ godKi: { ...gk, max: x } }))}
                  {numCol("Temp", gk.temp, x => set({ godKi: { ...gk, temp: x } }))}
                </div>
              </div>
              {/* Class-granted + custom limited-use pools (Superiority Dice, Power Points, …). */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginTop: 12 }}>
                <div style={subHead}>Limited-Use Resources</div>
                <ResourceTracker char={char} set={set} />
              </div>
            </div>
          );
        })()}
        <div style={card}>
          <div style={head}>Sustenance &amp; Rest</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {stepper("Food", v.food, x => setV({ food: x }), 3, ["Starving", "Hungry", "Fed", "Well Fed"])}
            {stepper("Water", v.water, x => setV({ water: x }), 3, ["Parched", "Thirsty", "Hydrated", "Full"])}
            {stepper("Rest", v.rest, x => setV({ rest: x }), 3, ["Exhausted", "Tired", "Rested", "Fresh"])}
            {stepper("Exhaustion", v.exhaustion, x => setV({ exhaustion: x }), 6, null)}
          </div>
        </div>
        <div style={card}>
          <TagListEditor label="Status Effects" items={char.conditions || []} onAdd={addStatus} onRemove={i => set({ conditions: (char.conditions || []).filter((_, j) => j !== i) })} color={COLORS.purple} placeholder="Poisoned, Stunned, Crippled…" />
        </div>
      </div>
    </div>
  );
}

function EquippedTab({ char, set }) {
  const items = (char.items || []).map(normalizeItem);
  const equipment = char.equipment || {};
  const byId = Object.fromEntries(items.map(it => [it.id, it]));
  const [activeSlot, setActiveSlot] = useState(null);

  const equip = (slotKey, itemId) => {
    const next = { ...equipment };
    for (const k of Object.keys(next)) if (next[k] === itemId) delete next[k]; // one item, one slot
    next[slotKey] = itemId;
    set({ equipment: next });
    setActiveSlot(null);
  };
  const unequip = (slotKey) => { const next = { ...equipment }; delete next[slotKey]; set({ equipment: next }); setActiveSlot(null); };
  const slotOf = (key) => EQUIP_SLOTS.find(s => s.key === key);
  const candidates = (slotKey) => { const t = slotOf(slotKey)?.type; return items.filter(it => it.slot && it.slot === t); };

  const ac = computeAC(char);
  const drRaw = (char.drOverride === true ? (char.dr || 0) : computeArmorDR(char)) + classDefenseDR(char, !!ac?.armored);
  const drShown = cappedArmorDR(char);
  const active = activeSlot ? slotOf(activeSlot) : null;
  const filled = Object.values(equipment).filter(Boolean).length;
  const equippedEffects = equippedEntries(char).flatMap(e => (e.item.effects || []).map(ef => ({ ...ef, itemName: e.item.name, color: rarityInfo(e.item.rarity).color })));
  const wt = computeWeighted(char);
  const aura = activeAura(char);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 300px) 1fr", gap: 18, alignItems: "start" }}>
      {/* Paperdoll */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4.6", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
        <BodyFigure aura={aura} />
        {EQUIP_SLOTS.map(s => {
          const pos = SLOT_POS[s.key];
          const item = byId[equipment[s.key]];
          const isActive = activeSlot === s.key;
          const rar = item ? rarityInfo(item.rarity) : null;
          return (
            <button key={s.key} onClick={() => setActiveSlot(isActive ? null : s.key)} title={s.label}
              style={{ position: "absolute", left: `${pos.l}%`, top: `${pos.t}%`, transform: "translate(-50%,-50%)",
                minWidth: 62, maxWidth: 82, padding: "3px 5px", borderRadius: 6, cursor: "pointer", textAlign: "center",
                background: item ? `${rar.color}22` : COLORS.panel, border: `1px solid ${isActive ? COLORS.gold : (item ? rar.color + "99" : COLORS.border)}`,
                color: item ? rar.color : COLORS.dim, fontSize: 8.5, lineHeight: 1.2 }}>
              <div style={{ textTransform: "uppercase", letterSpacing: 0.3, fontSize: 7.5, color: COLORS.dim }}>{s.label}</div>
              <div style={{ fontWeight: 700, fontSize: 9, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item ? item.name : "—"}</div>
            </button>
          );
        })}
      </div>

      {/* Right column: AC/DR + slot picker */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Armor Class</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.text }}>{char.acOverride ? char.ac : (ac ? ac.value : char.ac)}</div>
            <div style={{ fontSize: 9, color: COLORS.dim, marginTop: 2 }}>{ac && !char.acOverride ? ac.formula : "manual override"}</div>
          </div>
          <div style={{ flex: 1, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Damage Reduction</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.text }}>{drShown}</div>
            <div style={{ fontSize: 9, color: drRaw > drShown ? COLORS.amber : COLORS.dim, marginTop: 2 }}>{drRaw > drShown ? `capped at Prof + 1 (gear gives ${drRaw})` : `${filled} slot${filled !== 1 ? "s" : ""} filled`}</div>
          </div>
        </div>

        <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Item Effects</div>
          {equippedEffects.length === 0 ? (
            <div style={{ fontSize: 11.5, color: COLORS.dim }}>—</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {equippedEffects.map(ef => (
                <div key={ef.id} style={{ fontSize: 12, lineHeight: 1.5 }}>
                  <span style={{ color: ef.color, fontWeight: 700 }}>[{ef.name}]</span>
                  <span style={{ color: COLORS.dim }}> from {ef.itemName}:</span>
                  {ef.description ? <span style={{ color: COLORS.muted }}> {ef.description}</span> : null}
                </div>
              ))}
            </div>
          )}
        </div>

        {wt.gear > 0 && (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>Weighted Gear</div>
              <span style={{ fontWeight: 700, fontSize: 12, color: wt.net > 0 ? COLORS.green : wt.net < 0 ? COLORS.red : COLORS.dim }}>{wt.heavy > 0 ? `Heavy ${wt.heavy}` : wt.light > 0 ? `Light ${wt.light}` : "—"}</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => set && set({ weightedUnattuned: !char.weightedUnattuned })} style={{ background: char.weightedUnattuned ? `${COLORS.green}1A` : `${COLORS.red}1A`, border: `1px solid ${char.weightedUnattuned ? COLORS.green : COLORS.red}66`, color: char.weightedUnattuned ? COLORS.green : COLORS.red, borderRadius: 6, padding: "4px 10px", fontSize: 10.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                {char.weightedUnattuned ? "Un-attuned (Light)" : "Attuned (Heavy)"}
              </button>
              <div style={{ fontSize: 10, color: COLORS.dim, lineHeight: 1.5 }}>
                Power {wt.net >= 0 ? "+" : ""}{wt.net} · Speed {wt.net >= 0 ? "+" : ""}{wt.net * 10}ft · BP ×{weightMultiplier(char).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {active ? (
          <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.gold}66`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{active.label} <span style={{ color: COLORS.dim, fontSize: 10.5 }}>· fits {slotTypeLabel(active.type)}</span></div>
              <Btn size="sm" variant="ghost" onClick={() => setActiveSlot(null)}><X size={14}/></Btn>
            </div>
            {equipment[active.key] && (
              <div style={{ marginBottom: 8 }}><Btn size="sm" variant="danger" onClick={() => unequip(active.key)}><Minus size={12}/> Unequip {byId[equipment[active.key]]?.name}</Btn></div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {candidates(active.key).length === 0 ? (
                <div style={{ fontSize: 11.5, color: COLORS.dim }}>No items for this slot.</div>
              ) : candidates(active.key).map(it => {
                const rar = rarityInfo(it.rarity);
                const here = equipment[active.key] === it.id;
                return (
                  <button key={it.id} onClick={() => equip(active.key, it.id)} disabled={here}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 6, cursor: here ? "default" : "pointer",
                      background: here ? `${rar.color}22` : COLORS.panel, border: `1px solid ${here ? rar.color + "99" : COLORS.border}`, color: COLORS.text, textAlign: "left" }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: rar.color }}>{it.name}</span>
                    <span style={{ fontSize: 10, color: COLORS.dim, fontFamily: FONTS.mono }}>{it.slot === "body" ? `AC ${it.acBase}` : it.acBonus ? `+${it.acBonus} AC` : ""}{it.dr ? ` · DR ${it.dr}` : ""}{it.damageDice ? ` · ${it.damageDice}` : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Single "Inventory" tab: the equip paperdoll and the item list together, so you
// add/stat an item and equip it without switching tabs.
// Attunement (max 2) & Soulbinding (max 2) — book Ch.10. A capped list of named
// bonds; a Soulbind can only be broken by Death or a Dragon Ball wish.
function BondSlots({ label, max, items, onChange, color }) {
  const list = items || [];
  const [name, setName] = useState("");
  const add = () => { const n = name.trim(); if (!n || list.length >= max) return; onChange([...list, { id: uid(), name: n }]); setName(""); };
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{label} <span style={{ color: list.length >= max ? COLORS.amber : COLORS.dim }}>{list.length}/{max}</span></div>
      {list.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
          {list.map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.panel, border: `1px solid ${color}55`, borderRadius: 6, padding: "5px 9px" }}>
              <span style={{ flex: 1, fontSize: 12.5 }}>{b.name}</span>
              <button onClick={() => onChange(list.filter(x => x.id !== b.id))} style={{ background: "transparent", border: "none", color: COLORS.dim, cursor: "pointer", padding: 0 }}><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      {list.length < max && (
        <div style={{ display: "flex", gap: 6 }}>
          <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Item name" onKeyDown={e => { if (e.key === "Enter") add(); }} />
          <Btn size="sm" onClick={add}><Plus size={12}/></Btn>
        </div>
      )}
    </div>
  );
}

// Cybernetics — install/track High-Tech Parts against the computed Cybernetic Limit
// (½ of CON mod + WIS mod). Android/Cyborg bodies take no −2 Ki Control/Berserk
// penalty and (Android) treat every Part as Advanced. Auto-wired effects: Synthetic
// Muscle Fibers → Weighted (Light), Stamina Engine → Breather refills on Short Rest,
// Ki Engine → per-turn Ki regen (shown as a readout). Others are reference text.
function CyberneticsPanel({ char, set }) {
  const installed = char.cybernetics || [];
  const limit = cyberneticLimit(char);
  const used = cyberneticsUsed(char);
  const advanced = partIsAdvanced(char);
  const exempt = cyberneticsExempt(char);
  const penalty = cyberneticKiControlPenalty(char);
  const [adding, setAdding] = useState(false);
  const install = (partId) => { set({ cybernetics: [...installed, { uid: uid(), partId, signature: false }] }); setAdding(false); };
  const remove = (u) => set({ cybernetics: installed.filter(c => c.uid !== u) });
  const toggleSig = (u) => set({ cybernetics: installed.map(c => c.uid === u ? { ...c, signature: !c.signature } : c) });
  const available = HIGH_TECH_PARTS.filter(p => !hasCybernetic(char, p.id));
  const overLimit = used > limit;
  const kiEngine = hasCybernetic(char, "ki-engine") ? (advanced ? charTotalLevel(char) : Math.ceil(charTotalLevel(char) / 2)) : 0;

  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Cybernetics — High-Tech Parts</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: overLimit ? COLORS.red : COLORS.text }}>{used} / {limit}</span>
        <span style={{ fontSize: 10, color: COLORS.dim }}>limit = ½(CON+WIS mod)</span>
        {installed.some(c => c.signature) && <span style={{ fontSize: 10, color: COLORS.gold }}>+ signature (free)</span>}
        <label style={{ marginLeft: "auto", fontSize: 10.5, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <Checkbox checked={exempt} disabled={isAndroidBody(char) || /cyborg/i.test(char.heritage || "")} onChange={e => set({ cyberneticsNoPenalty: e.target.checked })} /> no penalty
        </label>
        <label style={{ fontSize: 10.5, color: COLORS.muted, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <Checkbox checked={advanced} disabled={isAndroidBody(char)} onChange={e => set({ cyberneticsAdvanced: e.target.checked })} /> advanced
        </label>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginBottom: 10 }}>
        {CYBERNETICS_RULES.installCheck}. {penalty > 0 ? <span style={{ color: COLORS.amber }}>−{penalty} to Ki Control &amp; Berserk saves</span> : <span style={{ color: COLORS.green }}>no Ki Control / Berserk penalty</span>}{kiEngine > 0 ? ` · Ki Engine +${kiEngine} Ki/turn` : ""}
      </div>

      {installed.length === 0 ? <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 10 }}>None installed.</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
          {installedParts(char).map(({ uid: u, signature, def }) => (
            <div key={u} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 12.5 }}>{def.name}</span>
                <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: FONTS.mono }}>DC {def.integrationDC}</span>
                {def.integrates && <span style={{ fontSize: 8.5, color: COLORS.green, textTransform: "uppercase", letterSpacing: 0.5 }}>auto</span>}
                <span onClick={() => toggleSig(u)} title="Mark as your free Signature Upgrade (doesn't count against the Limit)" style={{ marginLeft: "auto", cursor: "pointer", fontSize: 10, color: signature ? COLORS.gold : COLORS.dim }}>{signature ? "★ signature" : "☆ signature"}</span>
                <span onClick={() => remove(u)} style={{ cursor: "pointer", color: COLORS.dim }}><Trash2 size={12} /></span>
              </div>
              <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5 }}>{advanced ? def.advancedTech : def.effect}</div>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: COLORS.muted, textTransform: "uppercase" }}>Install a Part</span>
            <span onClick={() => setAdding(false)} style={{ cursor: "pointer", color: COLORS.dim }}><X size={14} /></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 6, maxHeight: 260, overflowY: "auto" }}>
            {available.map(p => (
              <div key={p.id} onClick={() => install(p.id)} title={p.advancedTech} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{p.name}</span>
                  <span style={{ fontSize: 9.5, color: COLORS.dim, fontFamily: FONTS.mono }}>DC {p.integrationDC} · Ƶ{p.zeni.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 3, lineHeight: 1.4 }}>{p.effect}</div>
              </div>
            ))}
            {available.length === 0 && <div style={{ fontSize: 11, color: COLORS.dim }}>All Parts installed.</div>}
          </div>
        </div>
      ) : (
        <Btn size="sm" onClick={() => setAdding(true)}><Plus size={13} /> Install High-Tech Part</Btn>
      )}
    </div>
  );
}

// Potions, Senzu Beans and the like in the inventory, one tap to use.
function ConsumablesCard({ char, set }) {
  const [msg, setMsg] = useState("");
  const list = (char.items || []).filter(it => it && it.restore);
  if (!list.length) return null;
  const use = (it) => {
    const r = consumeItem(char, it);
    if (!r.ok) { setMsg(r.reason); return; }
    set(r.patch);
    setMsg(r.summary);
    logSession(`${char.name || "A fighter"} used ${r.summary}`, char.name || "");
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.green}44`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Consumables</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {list.map(it => (
          <Btn key={it.id} size="sm" onClick={() => use(it)} title={it.notes || ""}>
            {it.name} ×{it.qty || 1} · {Object.entries(it.restore).filter(([k]) => k !== "exhaustion").map(([k, v]) => `${v === "full" ? "full" : v} ${k === "hp" ? "HP" : k === "ki" ? "Ki" : "Stamina"}`).join(", ")}
          </Btn>
        ))}
      </div>
      {msg && <div style={{ fontSize: 12, color: COLORS.green, marginTop: 8 }}>{msg}</div>}
      <div style={{ fontSize: 10.5, color: COLORS.dim, marginTop: 6 }}>Hetap and Senzu Beans after the first before a Long Rest add Exhaustion; one Premium Bento Box per Long Rest.</div>
    </div>
  );
}

function InventoryTab({ char, set }) {
  const [houseRules] = useHouseRules();
  const attuneCap = attunementCapFor(houseRules);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <EquippedTab char={char} set={set} />
      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Ƶeni</span>
          <CommaNumInput value={char.zeni || 0} onValue={v => set({ zeni: v })} style={{ width: 140, textAlign: "center", padding: "5px 6px" }} />
        </div>
        <ConsumablesCard char={char} set={set} />
        <ItemsEditor items={char.items} onChange={next => set({ items: next })} />
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 16 }}>
          <BondSlots label="Attunement" max={attuneCap} items={char.attunements} onChange={next => set({ attunements: next })} color={COLORS.blue} />
          <BondSlots label="Soulbinding" max={2} items={char.soulbinds} onChange={next => set({ soulbinds: next })} color={COLORS.purple} />
        </div>
        <div style={{ marginTop: 16 }}><CyberneticsPanel char={char} set={set} /></div>
      </div>
    </div>
  );
}

function ComputedACField({ char, onOverride }) {
  const computed = computeAC(char);
  const isOverridden = char.acOverride === true;
  if (!computed) {
    return (
      <div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>AC</div>
        <TextInput type="number" value={char.ac} onChange={e => onOverride({ ac: +e.target.value })} style={{ textAlign: "center" }} />
        <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 4 }}>Pick a Class to auto-compute AC</div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
        <span>AC {!isOverridden && <span style={{ color: COLORS.green }}>(auto)</span>}</span>
        <span onClick={() => onOverride({ acOverride: !isOverridden, ac: isOverridden ? computed.value : char.ac })} style={{ cursor: "pointer", color: COLORS.blue, fontSize: 9.5, textDecoration: "underline" }}>
          {isOverridden ? "use auto" : "override"}
        </span>
      </div>
      {isOverridden ? (
        <TextInput type="number" value={char.ac} onChange={e => onOverride({ ac: +e.target.value })} style={{ textAlign: "center" }} />
      ) : (
        <div title={computed.formula} style={{ textAlign: "center", fontSize: 16, fontWeight: 700, padding: "7px 0", cursor: "help" }}>{computed.value}</div>
      )}
      <div style={{ fontSize: 9.5, color: COLORS.dim, marginTop: 4, textAlign: "center" }}>{isOverridden ? "Manual override" : computed.formula}</div>
    </div>
  );
}

function AttacksPerTurnBadge({ char }) {
  if (!char.classId) return null;
  const attacks = computeAttacksPerTurn(char);
  return (
    <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 6, textAlign: "center" }}>
      <span style={{ color: COLORS.blue, fontWeight: 700 }}>{attacks}</span> Attack{attacks>1?"s":""}/Turn <span style={{ color: COLORS.green }}>(auto)</span>
    </div>
  );
}

export {
  VitalsTab,
  EquippedTab,
  BondSlots,
  CyberneticsPanel,
  InventoryTab,
  ComputedACField,
  AttacksPerTurnBadge,
};
