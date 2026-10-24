import React, { useState } from "react";
import { ChefHat, Dices, FlaskConical, Hammer, Minus, Package, Plus, Sparkles, Weight } from "lucide-react";
import { emitRoll, logSession, notify } from "../../app/bus.js";
import { rarityInfo } from "../../data/book-tables.js";
import { GEAR_RULES } from "../../data/gear-data.js";
import { profBonusForLevel, statMod } from "../../engine/core.js";
import {
  COOKING_TIERS, CRAFT_DC, DOWNTIME_COST, ENCHANT_TABLE, GATHER_DC, INVENT_DC,
  craftCost, craftPriceShare, enchantCost, enchantPatch, enchantTierOf, gatherDiscount,
  gravityTraining, mealPatch, toolkitFor,
} from "../../engine/crafting.js";
import { normalizeItem } from "../../engine/equipment.js";
import { computeSaveBonus, computeSkillBonus } from "../../engine/skills.js";
import { isCaster } from "../../engine/spellcasting.js";
import { roll } from "../../lib/dice.js";
import { useBase } from "../../state/base-state.js";
import { useHouseRules, useSharedList } from "../../state/hooks.js";
import { Btn, Checkbox, EmptyState, LoadingBlock, ScannerHeader, Select, Tag, TextInput } from "../../ui/atoms.jsx";
import { useLocalOption } from "../../state/local-options.js";
import { COLORS, FONTS } from "../../ui/theme.js";
import { buildStoreCatalog, purchaseItemFromCatalog } from "../universe/store.jsx";
import { miniBtnStyle } from "../session/combat-parts.jsx";

/* ===== Crafting: the making Downtime Activities (5.0 Ch.5) =====
   Each activity spends Downtime Points, rolls (or takes a typed physical
   roll), pays from the character's Zeni and changes the sheet: a new item in
   the inventory, an enchanted weapon, an invented Marvel, a meal's Temporary
   pools, more Accustomed Gravity. The party base's facilities (engine/base.js)
   add their check bonuses and discounts while the party is there. */

const z = (n) => `Ƶ${Math.round(n || 0).toLocaleString()}`;
const sign = (n) => `${n >= 0 ? "+" : ""}${n}`;
const ABILS = [["str", "STR"], ["dex", "DEX"], ["con", "CON"], ["int", "INT"], ["wis", "WIS"], ["cha", "CHA"]];
const ACTIVITIES = [
  { key: "craft", label: "Craft", icon: Hammer },
  { key: "gather", label: "Gather Materials", icon: Package },
  { key: "invent", label: "Invent", icon: FlaskConical },
  { key: "enchant", label: "Enchant / Improve", icon: Sparkles },
  { key: "cook", label: "Cook", icon: ChefHat },
  { key: "train", label: "Train", icon: Weight },
];
const MARVELS = GEAR_RULES.filter(r => r.section === "Scientific Marvels");
const ENCHANTMENTS = GEAR_RULES.filter(r => r.section === "Enchantments");
const CATALOG = buildStoreCatalog([]).filter(e => e.kind !== "hightech" && e.zeni > 0);

const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, marginBottom: 12 };
const label = { fontSize: 10.5, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: FONTS.mono, marginBottom: 4 };

// A row of choices ({ value, label }).
function Choice({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map(o => <Btn key={o.value} size="sm" variant={value === o.value ? "gold" : "default"} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}</Btn>)}
    </div>
  );
}

// A d20 check: the app rolls, or the player types the die they rolled.
function CheckRow({ name, bonus, dc, disabled, onResult, note }) {
  const [typed, setTyped] = useState("");
  const go = (die) => { onResult({ die, total: die + bonus }); setTyped(""); };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
      <span style={{ fontFamily: FONTS.mono, fontSize: 12.5 }}>{name}: d20 {sign(bonus)}{dc != null ? ` vs DC ${dc}` : ""}</span>
      {note && <span style={{ fontSize: 11, color: COLORS.green }}>{note}</span>}
      <div style={{ flex: 1 }} />
      <TextInput value={typed} onChange={e => setTyped(e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="d20" aria-label="Typed d20" style={{ width: 52, textAlign: "center", padding: "4px 6px" }} />
      <Btn size="sm" disabled={disabled || !typed} onClick={() => go(Math.max(1, Math.min(20, +typed)))}>Use my roll</Btn>
      <Btn size="sm" variant="gold" disabled={disabled} onClick={() => go(roll(20))}><Dices size={13} /> Roll</Btn>
    </div>
  );
}

function ToolCheck({ char, set, toolkit, abil, setAbil }) {
  const profs = char.toolProfs || {};
  const kits = toolkit.split(" or ");
  const proficient = kits.some(k => profs[k]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
      <span>Toolkit: <b>{toolkit}</b></span>
      {kits.map(k => (
        <label key={k} style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <Checkbox checked={!!profs[k]} onChange={e => set({ toolProfs: { ...profs, [k]: e.target.checked } })} /> proficient{kits.length > 1 ? ` (${k.split("'")[0]})` : ""}
        </label>
      ))}
      <Select value={abil} onChange={e => setAbil(e.target.value)} style={{ width: 80, padding: "3px 6px", fontSize: 12 }} aria-label="Ability">
        {ABILS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
      </Select>
      <span style={{ color: COLORS.dim }}>{proficient ? "adds Proficiency" : "no Proficiency"}</span>
    </div>
  );
}
const toolBonus = (char, toolkit, abil) => statMod(char, abil) + (toolkit.split(" or ").some(k => (char.toolProfs || {})[k]) ? profBonusForLevel(char.level) : 0);

function ResultCard({ result }) {
  if (!result) return null;
  return (
    <div role="status" style={{ ...card, borderColor: result.ok ? `${COLORS.green}88` : `${COLORS.red}88`, background: result.ok ? `${COLORS.green}10` : `${COLORS.red}10` }}>
      <b style={{ color: result.ok ? COLORS.green : COLORS.red }}>{result.title}</b>
      {result.lines.map((l, i) => <div key={i} style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{l}</div>)}
    </div>
  );
}

// One crafter's workbench. `set(patch, others)` writes the crafter's patch and
// any patches for other characters (a shared meal) in one save.
function Workbench({ char, set }) {
  const { bonuses, enabled } = useBase();
  const [hr] = useHouseRules();
  const [chars] = useSharedList("characters_v2");
  const [act, setAct] = useState("craft");
  const [result, setResult] = useState(null);
  const dp = char.downtimePoints || 0;
  const gathered = char.craftMaterials || 0;
  const cash = char.zeni || 0;
  const who = char.name || "Someone";
  const canSpend = (activity) => dp >= (DOWNTIME_COST[activity] || 1);
  const share = (lbl, total, detail) => emitRoll({ label: `${who}: ${lbl}`, total, detail, color: COLORS.gold, share: true, who });
  const finish = (ok, title, lines, patch, others) => {
    set(patch, others);
    setResult({ ok, title, lines });
    logSession(`${who} · ${title}`, who);
  };

  const bonusTags = [
    bonuses.craftCheck && `+${bonuses.craftCheck} Crafting`, bonuses.craftDiscount && `−${bonuses.craftDiscount}% Crafting cost`,
    bonuses.inventCheck && `+${bonuses.inventCheck} Invent`, bonuses.gatherCheck && `+${bonuses.gatherCheck} Gather`,
    bonuses.gatherDiscount && `+${bonuses.gatherDiscount}% Gather discount`, bonuses.trainGravity && `${bonuses.trainGravity}×g chamber`,
    bonuses.trainingBoons && `+${bonuses.trainingBoons} Training Boons`,
  ].filter(Boolean);

  return (
    <div>
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div>
          <div style={label}>Downtime Points</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button style={miniBtnStyle} aria-label="One fewer Downtime Point" onClick={() => set({ downtimePoints: Math.max(0, dp - 1) })}><Minus size={13} /></button>
            <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, minWidth: 28, textAlign: "center" }}>{dp}</span>
            <button style={miniBtnStyle} aria-label="One more Downtime Point" onClick={() => set({ downtimePoints: dp + 1 })}><Plus size={13} /></button>
          </div>
        </div>
        <div>
          <div style={label}>Zeni</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 15, color: COLORS.gold }}>{z(cash)}</div>
        </div>
        {gathered > 0 && <div><div style={label}>Materials</div><Tag color={COLORS.green}>−{Math.round(gathered * 100)}% next craft</Tag></div>}
        <div style={{ flex: "1 1 240px" }}>
          <div style={label}>Base bonuses here {enabled ? `(${bonuses.where})` : ""}</div>
          {!enabled ? <span style={{ fontSize: 11.5, color: COLORS.dim }}>Base Building is off in the house rules.</span>
            : bonusTags.length ? <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{bonusTags.map(t => <Tag key={t} color={COLORS.green}>{t}</Tag>)}</div>
            : <span style={{ fontSize: 11.5, color: COLORS.dim }}>None where the party is. A Workshop, Comms Array, Black Market or Gravity Chamber helps here.</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {ACTIVITIES.map(a => <Btn key={a.key} size="sm" variant={act === a.key ? "gold" : "default"} onClick={() => { setAct(a.key); setResult(null); }}><a.icon size={13} /> {a.label}{a.key !== "train" ? ` · ${DOWNTIME_COST[a.key]} DP` : ""}</Btn>)}
      </div>

      <ResultCard result={result} />
      {act === "craft" && <CraftPanel char={char} set={set} bonuses={bonuses} canSpend={canSpend("craft")} share={share} finish={finish} />}
      {act === "gather" && <GatherPanel char={char} bonuses={bonuses} canSpend={canSpend("gather")} share={share} finish={finish} />}
      {act === "invent" && <InventPanel char={char} bonuses={bonuses} canSpend={canSpend("invent")} share={share} finish={finish} />}
      {act === "enchant" && <EnchantPanel char={char} canSpend={canSpend} share={share} finish={finish} />}
      {act === "cook" && <CookPanel char={char} set={set} chars={chars} canSpend={canSpend("cook")} share={share} finish={finish} />}
      {act === "train" && <TrainPanel char={char} bonuses={bonuses} hr={hr} share={share} finish={finish} />}
    </div>
  );
}

function CraftPanel({ char, set, bonuses, canSpend, share, finish }) {
  const [q, setQ] = useState("");
  const [goalId, setGoalId] = useState("");
  const [abil, setAbil] = useState("int");
  const known = new Set(char.inventions || []);
  const goals = CATALOG.filter(e => e.category !== "Technology" || known.has(e.catalogId));
  const shown = q ? goals.filter(e => e.name.toLowerCase().includes(q.toLowerCase())).slice(0, 40) : goals.slice(0, 0);
  const goal = goals.find(e => e.catalogId === goalId);
  const gathered = char.craftMaterials || 0;
  const facilityPct = bonuses.craftDiscount || 0;
  const costAt = (total) => goal ? craftCost(goal.zeni, { share: craftPriceShare(total), gathered, facilityPct }) : null;
  const best = costAt(CRAFT_DC);
  const toolkit = goal ? toolkitFor(goal) : "";
  const bonus = goal ? toolBonus(char, toolkit, abil) + (bonuses.craftCheck || 0) : 0;
  const onResult = ({ die, total }) => {
    share(`Craft ${goal.name}`, total, `d20 ${die} ${sign(bonus)} vs DC ${CRAFT_DC}`);
    const c = costAt(total);
    const spent = { downtimePoints: (char.downtimePoints || 0) - DOWNTIME_COST.craft };
    if (!c) return finish(false, `Failed to craft ${goal.name} (${total})`, ["The Downtime Point is spent; nothing was made. Materials are kept."], spent);
    if ((char.zeni || 0) < c.zeni) return finish(false, `Can't pay for ${goal.name}`, [`It would cost ${z(c.zeni)}; you have ${z(char.zeni)}. The Downtime Point is spent.`], spent);
    const item = { ...purchaseItemFromCatalog(goal), crafted: { by: char.name || "", share: c.share } };
    finish(true, `Crafted ${goal.name} for ${z(c.zeni)} (${total})`,
      [`${Math.round(c.share * 100)}% of the ${z(goal.zeni)} price${gathered ? ", using your gathered materials" : ""}${facilityPct ? `, Workshop −${facilityPct}%` : ""}.`, "It's in your Inventory."],
      { ...spent, zeni: (char.zeni || 0) - c.zeni, craftMaterials: 0, items: [...(char.items || []), item] });
  };
  return (
    <div style={card}>
      <div style={label}>Goal</div>
      <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search gear, armor, weapons, vehicles, mechs, invented Marvels…" />
      {shown.length > 0 && (
        <div style={{ maxHeight: 220, overflowY: "auto", marginTop: 6, border: `1px solid ${COLORS.border}`, borderRadius: 6 }}>
          {shown.map(e => (
            <button key={e.catalogId} onClick={() => { setGoalId(e.catalogId); setQ(""); }} style={{ display: "flex", width: "100%", gap: 8, padding: "6px 10px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, cursor: "pointer", textAlign: "left", fontSize: 12.5 }}>
              <span style={{ flex: 1 }}>{e.name}</span><span style={{ color: COLORS.dim }}>{e.storeGroup}</span><span style={{ fontFamily: FONTS.mono, color: COLORS.gold }}>{z(e.zeni)}</span>
            </button>
          ))}
        </div>
      )}
      {(char.inventions || []).length === 0 && <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 4 }}>Scientific Marvels show up here once you Invent them.</div>}
      {goal && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <b style={{ fontSize: 14 }}>{goal.name}</b>
            <Tag color={rarityInfo(goal.rarity).color}>{rarityInfo(goal.rarity).label}</Tag>
            <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.dim }}>book price {z(goal.zeni)}</span>
          </div>
          <ToolCheck char={char} set={set} toolkit={toolkit} abil={abil} setAbil={setAbil} />
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>
            On a {CRAFT_DC}: {z(best.zeni)} · {CRAFT_DC + 5}: {z(costAt(CRAFT_DC + 5).zeni)} · {CRAFT_DC + 10}: {z(costAt(CRAFT_DC + 10).zeni)} · {CRAFT_DC + 15}+: {z(costAt(CRAFT_DC + 15).zeni)}
          </div>
          <CheckRow name="Crafting" bonus={bonus} dc={CRAFT_DC} disabled={!canSpend || (char.zeni || 0) < costAt(CRAFT_DC + 99).zeni}
            note={bonuses.craftCheck ? `Workshop +${bonuses.craftCheck}` : ""} onResult={onResult} />
          {!canSpend && <div style={{ fontSize: 11, color: COLORS.red, marginTop: 4 }}>Needs {DOWNTIME_COST.craft} Downtime Point.</div>}
        </div>
      )}
    </div>
  );
}

function GatherPanel({ char, bonuses, canSpend, share, finish }) {
  const [skill, setSkill] = useState("Investigation");
  const bonus = computeSkillBonus(char, skill).value + (bonuses.gatherCheck || 0);
  const extra = bonuses.gatherDiscount || 0;
  const onResult = ({ die, total }) => {
    share(`Gather Materials (${skill})`, total, `d20 ${die} ${sign(bonus)} vs DC ${GATHER_DC}`);
    const d = gatherDiscount(total, GATHER_DC, extra);
    const spent = { downtimePoints: (char.downtimePoints || 0) - DOWNTIME_COST.gather };
    if (!d) return finish(false, `Found nothing useful (${total})`, ["The Downtime Point is spent."], spent);
    const keep = Math.max(d, char.craftMaterials || 0);
    finish(true, `Gathered materials: −${Math.round(keep * 100)}% (${total})`, ["Comes off your next Crafting or Enchanting, down to 45% of the price."], { ...spent, craftMaterials: keep });
  };
  return (
    <div style={card}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Choice options={["Perception", "Investigation", "Persuasion"].map(s => ({ value: s, label: s }))} value={skill} onChange={setSkill} />
      </div>
      <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>Success takes 15% off your next craft, 5% more for every 5 over the DC{extra ? `, plus ${extra}% from the Black Market` : ""}.</div>
      <CheckRow name={skill} bonus={bonus} dc={GATHER_DC} disabled={!canSpend} note={bonuses.gatherCheck ? `Comms Array +${bonuses.gatherCheck}` : ""} onResult={onResult} />
    </div>
  );
}

function InventPanel({ char, bonuses, canSpend, share, finish }) {
  const known = new Set(char.inventions || []);
  const [id, setId] = useState("");
  const m = MARVELS.find(r => r.id === id);
  const dc = m ? INVENT_DC[m.rarity] || 20 : null;
  const bonus = computeSkillBonus(char, "Technology").value + (bonuses.inventCheck || 0);
  const onResult = ({ die, total }) => {
    share(`Invent ${m.name}`, total, `d20 ${die} ${sign(bonus)} vs DC ${dc}`);
    const spent = { downtimePoints: (char.downtimePoints || 0) - DOWNTIME_COST.invent };
    if (total < dc) return finish(false, `${m.name} doesn't work yet (${total})`, ["The Downtime Points are spent. Try again next downtime."], spent);
    finish(true, `Invented ${m.name} (${total})`, ["You can Craft it now from the Craft activity."], { ...spent, inventions: [...known, m.id] });
  };
  return (
    <div style={card}>
      <div style={label}>Scientific Marvel</div>
      <Select value={id} onChange={e => setId(e.target.value)}>
        <option value="">Pick a Marvel to invent…</option>
        {MARVELS.map(r => <option key={r.id} value={r.id} disabled={known.has(r.id)}>{r.name} · {r.subtitle}{known.has(r.id) ? " · invented" : ""}</option>)}
      </Select>
      {known.size > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>{[...known].map(k => <Tag key={k} color={COLORS.green}>{(MARVELS.find(r => r.id === k) || {}).name || k}</Tag>)}</div>}
      {m && <>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 8, whiteSpace: "pre-wrap", maxHeight: 120, overflowY: "auto" }}>{m.text}</div>
        <CheckRow name="Intelligence (Technology)" bonus={bonus} dc={dc} disabled={!canSpend} note={bonuses.inventCheck ? `Workshop +${bonuses.inventCheck}` : ""} onResult={onResult} />
      </>}
      {!canSpend && <div style={{ fontSize: 11, color: COLORS.red, marginTop: 4 }}>Needs {DOWNTIME_COST.invent} Downtime Points.</div>}
    </div>
  );
}

function EnchantPanel({ char, canSpend, share, finish }) {
  const items = (char.items || []).map(normalizeItem).filter(i => i.slot === "held" || i.slot === "body" || i.damageDice || i.acBase || i.acBonus);
  const [itemId, setItemId] = useState("");
  const [ench, setEnch] = useState("");
  const item = items.find(i => i.id === itemId);
  const cur = item ? enchantTierOf(item) : -1;
  const improve = cur >= 0;
  const tierIdx = improve ? cur + 1 : 0;
  const [pickTier, setPickTier] = useState(0);
  const idx = improve ? tierIdx : pickTier;
  const tier = ENCHANT_TABLE[idx];
  const activity = improve ? "improve" : "enchant";
  const gathered = char.craftMaterials || 0;
  const cost = item && tier ? enchantCost(item, idx, { gathered, improve }) : 0;
  const caster = isCaster(char);
  const enchDef = ENCHANTMENTS.find(e => e.name === ench);
  const apply = () => {
    if ((char.zeni || 0) < cost) { notify(`Needs ${z(cost)}`); return; }
    const patch = enchantPatch(item, idx, improve ? null : ench);
    share(`${improve ? "Improve" : "Enchant"} ${item.name}`, null, `${tier.label} +${tier.bonus} · ${z(cost)}`);
    finish(true, `${item.name} is now ${tier.label} +${tier.bonus}`,
      [`Paid ${z(cost)}${gathered ? " with your gathered materials" : ""}.`, `+${tier.bonus} to attack and damage rolls (weapons) or AC (armor and shields).`, ...(patch.enchantments || []).map(e => `${e.name}: Level ${e.level}`)],
      { downtimePoints: (char.downtimePoints || 0) - DOWNTIME_COST[activity], zeni: (char.zeni || 0) - cost, craftMaterials: 0,
        items: (char.items || []).map(i => i.id === item.id ? { ...i, ...patch, name: i.name.replace(/ \+\d$/, "") } : i) });
  };
  return (
    <div style={card}>
      {!caster && <div style={{ fontSize: 11.5, color: COLORS.amber, marginBottom: 6 }}>The book gives Enchanting to spellcasters. Ask your GM if this character can.</div>}
      <div style={label}>Item</div>
      <Select value={itemId} onChange={e => setItemId(e.target.value)}>
        <option value="">Pick a weapon, armor or shield…</option>
        {items.map(i => <option key={i.id} value={i.id}>{i.name}{i.magicBonus ? ` +${i.magicBonus}` : ""} · {rarityInfo(i.rarity).label}</option>)}
      </Select>
      {item && (improve ? (
        tier ? <div style={{ fontSize: 12.5, marginTop: 8 }}>Improve from <b>{ENCHANT_TABLE[cur].label} +{item.magicBonus}</b> to <b>{tier.label} +{tier.bonus}</b> for half price: <b style={{ color: COLORS.gold }}>{z(cost)}</b> · 1 DP</div>
          : <div style={{ fontSize: 12.5, marginTop: 8, color: COLORS.dim }}>Already Legendary.</div>
      ) : <>
        <div style={{ ...label, marginTop: 10 }}>Rarity</div>
        <Choice options={ENCHANT_TABLE.map((t, i) => ({ value: i, label: `${t.label} +${t.bonus}` }))} value={pickTier} onChange={setPickTier} />
        <div style={{ ...label, marginTop: 10 }}>Enchantment</div>
        <Select value={ench} onChange={e => setEnch(e.target.value)}>
          <option value="">Just the Magical Bonus</option>
          {ENCHANTMENTS.map(e => <option key={e.id} value={e.name}>{e.name} · {(e.subtitle || "").replace(/^Available to:\s*/, "")}</option>)}
        </Select>
        {enchDef && <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 6, whiteSpace: "pre-wrap", maxHeight: 140, overflowY: "auto" }}>{enchDef.text}</div>}
        <div style={{ fontSize: 12.5, marginTop: 8 }}>Cost: <b style={{ color: COLORS.gold }}>{z(cost)}</b>{/technology/i.test(item.category) ? " (Scientific gear costs double)" : ""} · 2 DP</div>
      </>)}
      {item && tier && <div style={{ marginTop: 8 }}><Btn variant="gold" size="sm" disabled={!canSpend(activity) || (char.zeni || 0) < cost} onClick={apply}><Sparkles size={13} /> {improve ? "Improve" : "Enchant"}</Btn></div>}
    </div>
  );
}

function CookPanel({ char, set, chars, canSpend, share, finish }) {
  const [t, setT] = useState(0);
  const [abil, setAbil] = useState("wis");
  const party = (chars || []).filter(c => !c.archived && c.id !== char.id);
  const [eaters, setEaters] = useState({});
  const tier = COOKING_TIERS[t];
  const toolkit = "Cook's Utensils";
  const bonus = toolBonus(char, toolkit, abil);
  const onResult = ({ die, total }) => {
    share(`Cook: ${tier.name}`, total, `d20 ${die} ${sign(bonus)} vs DC ${tier.dc}`);
    const base = { downtimePoints: (char.downtimePoints || 0) - DOWNTIME_COST.cook, zeni: (char.zeni || 0) - tier.zeni };
    if (total < tier.dc) return finish(false, `The meal flopped (${total})`, [`Ingredients (${z(tier.zeni)}) and the Downtime Point are spent.`], base);
    const fed = party.filter(c => eaters[c.id]);
    finish(true, `Served ${tier.name.toLowerCase()} (${total})`,
      [`Everyone who ate has at least ${tier.hp} Temporary HP, ${tier.ki} Temporary Ki and ${tier.stamina} Temporary Stamina.`, `Ate: ${[char.name || "you", ...fed.map(c => c.name)].join(", ")}`],
      { ...base, ...mealPatch(char, tier) }, Object.fromEntries(fed.map(c => [c.id, mealPatch(c, tier)])));
  };
  return (
    <div style={card}>
      <Choice options={COOKING_TIERS.map((c, i) => ({ value: i, label: `Tier ${c.tier}` }))} value={t} onChange={setT} />
      <div style={{ fontSize: 12.5, marginTop: 8 }}><b>{tier.name}</b> · ingredients {z(tier.zeni)} · DC {tier.dc} · grants {tier.hp} Temp HP, {tier.ki} Temp Ki, {tier.stamina} Temp Stamina</div>
      <div style={{ marginTop: 6 }}><ToolCheck char={char} set={set} toolkit={toolkit} abil={abil} setAbil={setAbil} /></div>
      {party.length > 0 && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8, fontSize: 12 }}>
        <span style={{ color: COLORS.muted }}>Also feeds:</span>
        {party.map(c => <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}><Checkbox checked={!!eaters[c.id]} onChange={e => setEaters({ ...eaters, [c.id]: e.target.checked })} />{c.name}</label>)}
      </div>}
      <CheckRow name="Cooking" bonus={bonus} dc={tier.dc} disabled={!canSpend || (char.zeni || 0) < tier.zeni} onResult={onResult} />
    </div>
  );
}

function TrainPanel({ char, bonuses, hr, share, finish }) {
  const cap = bonuses.trainGravity || 0;
  const g = char.accustomedGravity || 0;
  const save = computeSaveBonus(char, "con").value;
  const boons = bonuses.trainingBoons || 0;
  const tb = char.trainingBoons || {};
  const total = tb.total ?? tb.max ?? 4;
  const onGravity = ({ die, total: t }) => {
    share(`Gravity training (${cap}×g)`, t, `d20 ${die} ${sign(save)} vs DC 15`);
    const next = gravityTraining(g, t, cap);
    const spent = { downtimePoints: Math.max(0, (char.downtimePoints || 0) - 1) };
    if (next === g) return finish(false, `The gravity won this time (${t})`, ["The Downtime Point is spent."], spent);
    finish(true, `Now handles ${next}×g (${t})`, [`Up from ${g}×g.${hr.gravityAcclimation ? " Gravity Acclimation uses this." : ""}`], { ...spent, accustomedGravity: next });
  };
  return (
    <div style={card}>
      <div style={{ ...label }}>Gravity Chamber</div>
      {cap ? <>
        <div style={{ fontSize: 12.5 }}>Accustomed Gravity <b>{g}×g</b>, chamber goes up to <b>{cap}×g</b>. A DC 15 Constitution save raises it by 5×g, 5 more per 5 over (1 DP).</div>
        <CheckRow name="Constitution save" bonus={save} dc={15} disabled={g >= cap || (char.downtimePoints || 0) < 1} onResult={onGravity} />
      </> : <div style={{ fontSize: 12, color: COLORS.dim }}>No Gravity Chamber where the party is.</div>}
      <div style={{ ...label, marginTop: 14 }}>Training Arc</div>
      {boons ? <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5 }}>Training here adds <b>+{boons}</b> Training Boon{boons > 1 ? "s" : ""} to each Training Arc.</span>
        <Btn size="sm" variant="gold" onClick={() => finish(true, `Base training: +${boons} Training Boon${boons > 1 ? "s" : ""}`, [`Training Boons total ${total} → ${total + boons}.`], { trainingBoons: { ...tb, total: total + boons } })}>Add after a Training Arc</Btn>
      </div> : <div style={{ fontSize: 12, color: COLORS.dim }}>No Training Grounds or Gravity Chamber where the party is.</div>}
    </div>
  );
}

// The Crafting screen (a Materoids flavor): pick who's crafting, then work.
function CraftingScreen() {
  const [chars, persistChars] = useSharedList("characters_v2");
  const [crafterId, setCrafterId] = useLocalOption("sdndbz_crafter_v1", { id: "" });
  if (chars === null) return <LoadingBlock />;
  const roster = (chars || []).filter(c => !c.archived);
  const char = roster.find(c => c.id === crafterId.id) || null;
  const set = (patch, others = {}) => persistChars((chars || []).map(c =>
    c.id === char.id ? { ...c, ...patch } : others[c.id] ? { ...c, ...others[c.id] } : c));
  return (
    <div>
      <ScannerHeader title="CRAFTING" subtitle="Downtime making: craft, gather, invent, enchant, cook and train." />
      {roster.length === 0 ? <EmptyState icon={Hammer} title="No characters yet" body="Make a character on the Players tab first." /> : <>
        <div style={{ ...card, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>Crafter</span>
          <Select value={char ? char.id : ""} onChange={e => setCrafterId({ id: e.target.value })} style={{ width: 240 }} aria-label="Crafter">
            <option value="">Pick who's crafting…</option>
            {roster.map(c => <option key={c.id} value={c.id}>{c.name || "Unnamed"}</option>)}
          </Select>
        </div>
        {char && <Workbench key={char.id} char={char} set={set} />}
      </>}
    </div>
  );
}

export { CraftingScreen, Workbench };
