import { Cloud, Crosshair, Flame, Globe2, MapPin, Sparkles, Swords, Users } from "lucide-react";
import { RARITY_TIERS } from "../data/book-tables.js";
import { SPECIES_DATA } from "../data/species-data.js";
import { ENV_HAZARDS, TERRAIN_PRESETS } from "../engine/environment.js";
import { PLANET_CLASSES, STAR_TRAITS, WEATHER_DATA, weatherSlotsLabel } from "../engine/universe.js";
import { pick, uid } from "../lib/dice.js";
import { COLORS } from "../ui/theme.js";
import { useSharedList } from "./hooks.js";

/* ===================== WORLD & RULES REGISTRY (Compendium overhaul, Phase 1) =====================
   The editable, effect bearing data layer. Book datasets (planet classes, star
   traits, hazards, terrains) become entries the table can edit, enable or disable,
   rarity weight, and attach effect hooks to. DM edits directly; players propose an
   addition and the DM approves or declines. Consumers wire in during later phases. */

// Rarity as named tiers (reuses the first four RARITY_TIERS) mapped to generation
// weights. Higher weight = shows up more often when a galaxy is generated.
const REG_RARITY_TIERS = [
  ...RARITY_TIERS.slice(0, 4),   // Common, Uncommon, Rare, Very Rare
  { key: "unique", label: "Unique", color: COLORS.gold, unique: true },   // capped count, not weight based
];
const regRarityInfo = (k) => REG_RARITY_TIERS.find(r => r.key === k) || REG_RARITY_TIERS[0];
// Generation weights per tier. Unique gets a low weight so it can appear, but its
// total count is hard-capped by the entry's uniqueCount (see pickReg).
const RARITY_WEIGHT = { common: 8, uncommon: 4, rare: 2, veryrare: 1, unique: 1 };
const rarityWeight = (k) => RARITY_WEIGHT[k] != null ? RARITY_WEIGHT[k] : RARITY_WEIGHT.common;

// Effect hook framework (framework first, per the plan). Each type is data that
// drives the author time picker and, in Phase 3, the applier. Adding a type here
// is all it takes to offer it in the editor.
const HOOK_TYPES = [
  { type: "saveHazard", label: "Survival save", color: COLORS.red,
    params: [
      { key: "ability", kind: "stat", label: "Save" },
      { key: "baseDC", kind: "num", label: "DC", def: 10 },
      { key: "perHour", kind: "num", label: "DC per hour", def: 0 },
      { key: "onFail", kind: "text", label: "On fail", def: "1 level of Exhaustion" },
    ],
    summary: (h) => `${String(h.ability || "con").toUpperCase()} save DC ${h.baseDC != null ? h.baseDC : 10}${h.perHour ? ` (+${h.perHour} per hour)` : ""}` },
  { type: "flatPenalty", label: "Flat modifier", color: COLORS.amber,
    params: [
      { key: "to", kind: "select", label: "Applies to", options: ["attacks", "saves", "checks", "ac", "all d20"], def: "attacks" },
      { key: "amount", kind: "num", label: "Amount", def: -2 },
    ],
    summary: (h) => `${(h.amount != null ? h.amount : 0) >= 0 ? "+" : ""}${h.amount != null ? h.amount : 0} to ${h.to || "attacks"}` },
  { type: "kiField", label: "Ki field", color: COLORS.blue,
    params: [
      { key: "mode", kind: "select", label: "Affects", options: ["ki cost", "ki regen", "overload"], def: "ki cost" },
      { key: "mult", kind: "num", label: "Multiplier", def: 1.5 },
    ],
    summary: (h) => `${h.mode || "ki cost"} x${h.mult != null ? h.mult : 1}` },
  { type: "dmgPerTurn", label: "Damage per turn", color: COLORS.red,
    params: [{ key: "formula", kind: "text", label: "Damage", def: "1d4" }],
    summary: (h) => `${h.formula || "1d4"} damage per turn` },
  { type: "weightedRanks", label: "Weighted ranks", color: COLORS.purple,
    params: [{ key: "ranks", kind: "num", label: "Ranks (positive Light, negative Heavy)", def: -1 }],
    summary: (h) => `Weighted ${(h.ranks != null ? h.ranks : 0) >= 0 ? `Light ${h.ranks != null ? h.ranks : 0}` : `Heavy ${-(h.ranks)}`}` },
  { type: "movementMod", label: "Movement", color: COLORS.green,
    params: [{ key: "feet", kind: "num", label: "Feet", def: -10 }],
    summary: (h) => `${(h.feet != null ? h.feet : 0) >= 0 ? "+" : ""}${h.feet != null ? h.feet : 0} ft speed` },
  { type: "effectCondition", label: "Combat effects", color: COLORS.blue,
    params: [{ key: "effects", kind: "lines", label: "Effects, one per line", def: [] }],
    summary: (h) => { const n = (h.effects || []).filter(Boolean).length; return `${n} combat effect${n === 1 ? "" : "s"}`; } },
];
const hookType = (t) => HOOK_TYPES.find(x => x.type === t);
const hookSummary = (h) => { const t = hookType(h.type); return t ? t.summary(h) : h.type; };
const blankHook = (type) => { const t = hookType(type); const h = { type }; (t.params || []).forEach(p => { h[p.key] = p.def != null ? p.def : (p.kind === "num" ? 0 : p.kind === "lines" ? [] : ""); }); return h; };

// The datasets exposed in World & Rules. base() reads lazily so it can point at
// arrays defined later in the file. id / name / desc adapt each dataset's shape.
// DM quick-builder data: objectives that frame a war, and enemy warband templates.
// Rosters use "Role xN" or "Role xN-M" lines; the builder rolls the ranges.
const WAR_GOALS = [
  { id: "conquest", name: "Total Conquest", desc: "Seize the world and everything on it. Nothing short of full control will do.", rarity: "common" },
  { id: "subjugate", name: "Subjugation", desc: "Break their will and force vassalage. Leave the infrastructure standing.", rarity: "common" },
  { id: "plunder", name: "Plunder & Withdraw", desc: "Strip the world of resources, Ki-crystals and wealth, then pull out before relief arrives.", rarity: "common" },
  { id: "liberation", name: "Liberation", desc: "Free the world from an occupier. Win the population, not just the battlefield.", rarity: "common" },
  { id: "defense", name: "Hold the Line", desc: "Repel the invasion. Survive until relief comes or the enemy breaks.", rarity: "common" },
  { id: "capture", name: "Capture the Prize", desc: "A person, an artifact, or a Dragon Ball. The war is a means to seize one thing.", rarity: "uncommon" },
  { id: "extermination", name: "Extermination", desc: "Wipe out a bloodline, species, or faction entirely. A campaign of annihilation.", rarity: "uncommon" },
  { id: "proxy", name: "Proxy War", desc: "Neither patron wants open war. Fight through deniable forces for a hidden aim.", rarity: "uncommon" },
  { id: "vengeance", name: "Vengeance", desc: "This is personal. A past wrong drives the whole campaign, reason be damned.", rarity: "uncommon" },
  { id: "decapitate", name: "Decapitation Strike", desc: "Ignore the army. Cut straight to the leader and end it in one blow.", rarity: "rare" },
];
const RAID_PARTIES = [
  { id: "frieza-patrol", name: "Frieza Force Patrol", desc: "A standard occupation squad sweeping for resistance.", rarity: "common", roster: "Squad Captain x1\nFoot Soldier x3-5\nScouter Sniper x1-2" },
  { id: "bandits", name: "Space Bandits", desc: "Opportunistic raiders after loot and Zeni.", rarity: "common", roster: "Bandit Leader x1\nBrawler x2-4\nSlicer x1-3" },
  { id: "beasts", name: "Feral Pack", desc: "Wild beastmen or monsters driven from their den.", rarity: "common", roster: "Alpha x1\nPack Beast x3-6" },
  { id: "patrol-gp", name: "Galactic Patrol Detachment", desc: "Lawmen answering a distress call.", rarity: "common", roster: "Patrol Officer x1\nDeputy x2-4" },
  { id: "redribbon", name: "Red Ribbon Strike Team", desc: "Disciplined androids and soldiers on a mission.", rarity: "uncommon", roster: "Field Commander x1\nAssault Android x2\nRifleman x2-4" },
  { id: "cult", name: "Demon Cult Warband", desc: "Fanatics channeling dark Ki for their master.", rarity: "uncommon", roster: "Dark Priest x1\nCultist x3-5\nSummoned Fiend x0-2" },
  { id: "mercs", name: "Mercenary Company", desc: "Guns for hire, well-equipped and coordinated.", rarity: "uncommon", roster: "Captain x1\nVeteran x2-3\nGrunt x3-5\nMedic x0-1" },
  { id: "saiyan", name: "Saiyan Raid Squad", desc: "A handful of Saiyans razing a world for the Empire.", rarity: "rare", roster: "Elite Saiyan x1\nSaiyan Warrior x2-3" },
];

// Fighting Styles: a swappable, effect-bearing stance a fighter equips (one at a
// time). Seeded with book-flavored styles; the table can edit these or add their
// own (e.g. Majin Style, which is homebrew — not in the rulebook). Effects run
// through the same HOOK_TYPES engine as everything else.
const STYLES_DATA = [
  { id: "tiger",   name: "Tiger Style",   rarity: "common",   effect: { text: "Ferocious forward pressure — all offense.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }] } },
  { id: "crane",   name: "Crane Style",   rarity: "common",   effect: { text: "Poised and defensive; strike from stillness.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }] } },
  { id: "snake",   name: "Snake Style",   rarity: "common",   effect: { text: "Precise strikes to the vitals.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }, { type: "flatPenalty", to: "checks", amount: 1 }] } },
  { id: "turtle",  name: "Turtle Style",  rarity: "common",   effect: { text: "Immovable defense; patience over speed.", hooks: [{ type: "flatPenalty", to: "ac", amount: 2 }, { type: "movementMod", feet: -10 }] } },
  { id: "wolf",    name: "Wolf Style",    rarity: "common",   effect: { text: "Relentless pack pursuit; run the foe down.", hooks: [{ type: "movementMod", feet: 10 }] } },
  { id: "monkey",  name: "Monkey Style",  rarity: "common",   effect: { text: "Erratic and acrobatic; hard to pin down.", hooks: [{ type: "movementMod", feet: 10 }, { type: "flatPenalty", to: "ac", amount: 1 }] } },
  { id: "leopard", name: "Leopard Style", rarity: "common",   effect: { text: "Blinding speed and first-strike bursts.", hooks: [{ type: "movementMod", feet: 15 }] } },
  { id: "dragon",  name: "Dragon Style",  rarity: "uncommon", effect: { text: "Overwhelming power flows through every blow.", hooks: [{ type: "weightedRanks", ranks: 1 }] } },
  { id: "taekwondo", name: "Taekwondo",   rarity: "common",   effect: { text: "Devastating kicks with reach.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 1 }] } },
  { id: "judo",    name: "Judo",          rarity: "common",   effect: { text: "Leverage and throws; own the grapple.", hooks: [{ type: "flatPenalty", to: "checks", amount: 2 }] } },
  { id: "calm-heart", name: "Calm Heart (Instinctual)", rarity: "rare", effect: { text: "Ultra Instinct's defense: the body reacts on its own.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }, { type: "flatPenalty", to: "saves", amount: 1 }, { type: "movementMod", feet: 20 }] } },
  { id: "righteous-heart", name: "Righteous Heart (Instinctual)", rarity: "rare", effect: { text: "Ultra Instinct's offense: emotion sharpened into force.", hooks: [{ type: "flatPenalty", to: "attacks", amount: 2 }, { type: "movementMod", feet: 20 }] } },
  { id: "majin",   name: "Majin Style",   rarity: "uncommon", effect: { text: "Homebrew: an elastic Majin body that bends and rebounds.", hooks: [{ type: "flatPenalty", to: "ac", amount: 1 }, { type: "weightedRanks", ranks: 1 }] } },
];

const REGISTRY_CATS = [
  { key: "planets",    label: "Planet Classes", group: "Worlds",        icon: Globe2,   color: COLORS.green, base: () => PLANET_CLASSES,  id: (i) => i.name, name: (i) => i.name, desc: (i) => `Gravity ${i.g[0]} to ${i.g[1]} times g · ${i.hab}` },
  { key: "terrains",   label: "Terrains",       group: "Worlds",        icon: MapPin,   color: COLORS.blue,  base: () => TERRAIN_PRESETS, id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.note },
  { key: "weather",    label: "Weather",        group: "Worlds",        icon: Cloud,    color: COLORS.blue,  base: () => WEATHER_DATA,    id: (i) => i.id,   name: (i) => i.name, desc: (i) => weatherSlotsLabel(i),
    extraFields: [{ key: "climateTag", label: "Custom weather: which climate or planet class it occurs on (e.g. cold, Frozen)", kind: "text" }] },
  { key: "startraits", label: "Star Traits",    group: "Cosmic",        icon: Sparkles, color: COLORS.amber, base: () => STAR_TRAITS,     id: (i) => i.name, name: (i) => i.name, desc: (i) => i.desc },
  { key: "hazards",    label: "Hazards",        group: "Environmental", icon: Flame,    color: COLORS.red,   base: () => ENV_HAZARDS,     id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.cond,
    extraFields: [{ key: "weatherMatch", label: "Auto trigger on weather keywords (comma separated)", kind: "text" }] },
  { key: "races",      label: "Races",          group: "Peoples",       icon: Users,    color: COLORS.purple, base: () => SPECIES_DATA,   id: (i) => i.name, name: (i) => i.name, desc: (i) => i.description || i.category || "" },
  { key: "styles",     label: "Fighting Styles", group: "Combat",       icon: Swords,   color: COLORS.red,   base: () => STYLES_DATA,     id: (i) => i.id,   name: (i) => i.name, desc: (i) => (i.effect && i.effect.text) || "" },
  { key: "wargoals",   label: "War Goals",      group: "DM Builders",   icon: Swords,   color: COLORS.red,   base: () => WAR_GOALS,       id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.desc },
  { key: "raidparties", label: "Raid Parties",  group: "DM Builders",   icon: Crosshair, color: COLORS.amber, base: () => RAID_PARTIES,   id: (i) => i.id,   name: (i) => i.name, desc: (i) => i.desc,
    extraFields: [{ key: "roster", label: "Roster (one 'Role xN' or 'Role xN-M' per line)", kind: "textarea" }] },
];
const REGISTRY_GROUPS = ["Worlds", "Cosmic", "Environmental", "Peoples", "Combat", "DM Builders"];
const regCat = (k) => REGISTRY_CATS.find(c => c.key === k);

// Mirror of the enabled entries per category, so the pure galaxy generator can
// respect enable/disable, rarity and Unique caps. Kept fresh by useRegistryMirror.
let CURRENT_REG = {};
function useRegistryMirror() {
  const planets = useRegistry("planets");
  const races = useRegistry("races");
  const startraits = useRegistry("startraits");
  const weather = useRegistry("weather");
  const styles = useRegistry("styles");
  CURRENT_REG = {
    planets: planets.loading ? null : planets.entries.filter(e => e.enabled),
    races: races.loading ? null : races.entries.filter(e => e.enabled),
    startraits: startraits.loading ? null : startraits.entries.filter(e => e.enabled),
    weather: weather.loading ? null : weather.entries.filter(e => e.enabled),
    styles: styles.loading ? null : styles.entries,   // keep all so an equipped-but-disabled style still resolves
  };
}
// A fighter's equipped Fighting Style and its effect hooks (applied only to them).
const charStyleEntry = (char) => (char && char.styleId && CURRENT_REG && CURRENT_REG.styles) ? CURRENT_REG.styles.find(s => s._id === char.styleId) : null;
const charStyleHooks = (char) => { const s = charStyleEntry(char); return (s && s.effect && s.effect.hooks) || []; };
const styleFlatMod = (char, kind) => charStyleHooks(char).filter(h => h.type === "flatPenalty" && (h.to === kind || h.to === "all d20")).reduce((s, h) => s + (+h.amount || 0), 0);
const styleWeightedRanks = (char) => charStyleHooks(char).filter(h => h.type === "weightedRanks").reduce((s, h) => s + (+h.ranks || 0), 0);
const styleMoveMod = (char) => charStyleHooks(char).filter(h => h.type === "movementMod").reduce((s, h) => s + (+h.feet || 0), 0);
// Pick a registry entry weighted by rarity, skipping disabled (already filtered
// out of the mirror) and respecting the Unique cap via a per-generation `used`
// counter keyed by category+id. Falls back to a plain array when no registry.
function pickReg(catKey, used, fallback) {
  const pool = (CURRENT_REG && CURRENT_REG[catKey]) || null;
  if (!pool || !pool.length) return fallback && fallback.length ? pick(fallback) : null;
  const capOk = (e) => e.rarity !== "unique" || (used[`${catKey}:${e._id}`] || 0) < (e.uniqueCount != null ? e.uniqueCount : 1);
  const avail = pool.filter(capOk);
  const list = avail.length ? avail : pool.filter(e => e.rarity !== "unique");
  if (!list.length) return fallback && fallback.length ? pick(fallback) : pool[0];
  const weights = list.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total, chosen = list[list.length - 1];
  for (let i = 0; i < list.length; i++) { r -= weights[i]; if (r <= 0) { chosen = list[i]; break; } }
  used[`${catKey}:${chosen._id}`] = (used[`${catKey}:${chosen._id}`] || 0) + 1;
  return chosen;
}
// One weighted roll from a list of entries (no cap tracking) for the DM builders.
const weightedPickEntries = (list) => {
  if (!list || !list.length) return null;
  const w = list.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const t = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * t;
  for (let i = 0; i < list.length; i++) { r -= w[i]; if (r <= 0) return list[i]; }
  return list[list.length - 1];
};

// One registry category = a book base array, plus shared overrides (edits to book
// entries keyed by id), customs (new entries), and an off list (disabled ids).
function useRegistry(key) {
  const cat = regCat(key);
  const [state, persist] = useSharedList("registry_" + key);
  const data = (state && state[0]) || { ov: {}, custom: [], off: [] };
  const ov = data.ov || {}, off = data.off || [], customs = data.custom || [];
  const mk = (raw, custom) => {
    const id = custom ? (raw._id || raw.id) : cat.id(raw);
    const merged = (!custom && ov[id]) ? { ...raw, ...ov[id] } : raw;
    return {
      ...merged, _id: id, _custom: !!custom, _edited: !custom && !!ov[id],
      _name: merged.name != null ? merged.name : cat.name(raw),
      _desc: merged.desc != null ? merged.desc : cat.desc(raw),
      enabled: !off.includes(id),
      rarity: merged.rarity || "common",
      uniqueCount: merged.uniqueCount != null ? merged.uniqueCount : 1,
      effect: merged.effect || { text: "", hooks: [] },
    };
  };
  const entries = [...cat.base().map(b => mk(b, false)), ...customs.map(c => mk(c, true))];
  const save = (patch) => persist([{ ov, custom: customs, off, ...patch }]);
  const setPatch = (id, p) => {
    const e = entries.find(x => x._id === id);
    if (e && e._custom) save({ custom: customs.map(c => (c._id || c.id) === id ? { ...c, ...p } : c) });
    else save({ ov: { ...ov, [id]: { ...(ov[id] || {}), ...p } } });
  };
  const toggleEnabled = (id) => save({ off: off.includes(id) ? off.filter(x => x !== id) : [...off, id] });
  const addCustom = (seed) => { const id = uid(); save({ custom: [...customs, { name: seed && seed.name ? seed.name : "New " + cat.label.replace(/s$/, ""), desc: "", rarity: "common", effect: { text: "", hooks: [] }, ...(seed || {}), _id: id }] }); return id; };
  const removeEntry = (id) => { const e = entries.find(x => x._id === id); if (e && e._custom) save({ custom: customs.filter(c => (c._id || c.id) !== id), off: off.filter(x => x !== id) }); };
  const resetEntry = (id) => { const nov = { ...ov }; delete nov[id]; save({ ov: nov, off: off.filter(x => x !== id) }); };
  return { cat, loading: state === null, entries, setPatch, toggleEnabled, addCustom, removeEntry, resetEntry };
}

// Player submitted additions awaiting DM review, shared across the table.
function useProposals() { return useSharedList("registry_proposals"); }

export {
  REG_RARITY_TIERS,
  regRarityInfo,
  RARITY_WEIGHT,
  rarityWeight,
  HOOK_TYPES,
  hookType,
  hookSummary,
  blankHook,
  WAR_GOALS,
  RAID_PARTIES,
  STYLES_DATA,
  REGISTRY_CATS,
  REGISTRY_GROUPS,
  regCat,
  CURRENT_REG,
  useRegistryMirror,
  charStyleEntry,
  charStyleHooks,
  styleFlatMod,
  styleWeightedRanks,
  styleMoveMod,
  pickReg,
  weightedPickEntries,
  useRegistry,
  useProposals,
};
