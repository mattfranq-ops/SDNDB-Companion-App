import { pick, uid } from "../lib/dice.js";
import { CURRENT_REG, pickReg, rarityWeight } from "../state/registry.js";
import { COLORS } from "../ui/theme.js";

/* ============================== APP SHELL ============================== */
/* ============================== UNIVERSE & ECONOMY ==============================
   A randomly generated galaxy: systems → planets, each with economy attributes
   that drive what a world can and can't do. Designed (homebrew) in DBZ flavor.
   Tier 1: the generator, browsable/editable planet cards, and set-home per
   character. Store + Night Market are planet-contextual and come next. */

const GALAXY_SIZES = {
  small: { label: "Small", systems: [4, 6], desc: "A tight cluster — a handful of worlds." },
  medium: { label: "Medium", systems: [10, 15], desc: "A proper galaxy — plenty of homes to choose." },
  large: { label: "Large", systems: [20, 28], desc: "A sprawling expanse — a campaign's worth of worlds." },
  gigantium: { label: "Gigantium", systems: [34, 48], desc: "A titanic reach — an entire sector of the cosmos." },
};
// Eras lightly bias generation (government/stability weights) and tag the galaxy.
const GALAXY_ERAS = {
  frontier: { label: "Post-War Frontier", biasStability: -1, biasGov: ["Warlord State", "Anarchy", "Tribal Confederacy"] },
  frieza: { label: "Frieza's Empire Ascendant", biasStability: -1, biasGov: ["Frieza Force Occupation", "Corporate Oligarchy"] },
  peace: { label: "The Long Peace", biasStability: +1, biasGov: ["Ruling Council", "Galactic Patrol Protectorate"] },
  tournaments: { label: "Age of Tournaments", biasStability: 0, biasGov: ["Absolute Monarchy", "Ruling Council"] },
  androids: { label: "Rise of the Androids", biasStability: -1, biasGov: ["AI Technocracy", "Corporate Oligarchy"] },
};

const UNI_ECONOMIES = ["Mining & Ore", "Heavy Industry", "Agriculture", "Tech & R&D", "Luxury Goods", "Black Market", "Military Complex", "Trade Hub", "Ki-Crystal Harvest", "Salvage & Scrap"];
const UNI_WEALTH = ["Destitute", "Struggling", "Stable", "Prosperous", "Thriving"];        // 0..4
const UNI_STABILITY = ["Warzone", "Unrest", "Tense", "Stable", "Golden Age"];               // 0..4
const UNI_TECH = ["Primitive", "Industrial", "Spacefaring", "Advanced", "Hyper-Advanced"];  // 0..4
const UNI_POP = ["Uninhabited", "Sparse", "Scattered", "Moderate", "Populous", "Teeming"];
const UNI_GOVERNMENTS = ["Absolute Monarchy", "Corporate Oligarchy", "Warlord State", "Ruling Council", "Theocracy", "Frieza Force Occupation", "Galactic Patrol Protectorate", "Anarchy", "Tribal Confederacy", "AI Technocracy"];
const UNI_SPECIES = ["Saiyan", "Namekian", "Arcosian", "Majin", "Android", "Beastman", "Cerealian", "Galactic Citizen", "Yardratian", "Demon Realm Denizen", "Neko Majin", "Grey", "Human"];
const UNI_LAWS = ["Weapons openly permitted", "Personal arms outlawed", "Ki-suppression fields in cities", "Martial law enforced", "Open bounty licenses", "Strict import tariffs", "No-fly restrictions over the capital", "Tournament combat legalized", "Slavery outlawed", "Black market tolerated", "Curfew after dusk", "Free-trade zone", "Outsiders require a visa", "Ki duels settle all disputes"];
const UNI_FEATURES = [
  "A dormant Dragon Ball rumored to lie in the wastes",
  "A gravity-training citadel favored by warriors",
  "A crashed Frieza Force cruiser slowly being salvaged",
  "A grand coliseum that hosts deadly tournaments",
  "A ki-crystal mine the entire economy depends on",
  "A refugee flotilla crowding the orbital lanes",
  "An ancient ruin humming with sealed power",
  "A corporate arcology towering over endless slums",
  "A sacred spring said to heal any wound",
  "A warlord's fortress commanding the trade routes",
  "A hidden bazaar beneath the capital where anything sells",
  "A weather-controlled paradise for the ultra-rich",
  "A shattered moon whose debris rings the planet",
  "A Capsule Corp research outpost testing new tech",
  "A monastery of martial monks who guard an old secret",
];
const UNI_STARS = [
  { type: "Yellow Dwarf", color: "#F5C542" }, { type: "Red Giant", color: "#E5533C" },
  { type: "Blue Supergiant", color: "#5AA9F5" }, { type: "White Star", color: "#E8ECF5" },
  { type: "Binary Pair", color: "#C77DF5" }, { type: "Dying Ember", color: "#B4763C" },
];
// Star modifiers — a condition on the system's star radiates to EVERY planet in
// that system. `twin` draws a second star in the orbital view; `env` is the
// system-wide environmental condition shown on each world.
const STAR_TRAITS = [
  { name: "Dual Suns", twin: true, env: "Scorching daylight", desc: "Two suns share the sky — brutal heat and almost no true night across every world." },
  { name: "Binary System", twin: true, env: "Erratic tides", desc: "Two stars lock the system in a complex dance — wild tides and long, shifting seasons." },
  { name: "Red Giant", env: "Bloated red light", desc: "A swollen dying star bathes the system in dim crimson light; inner worlds slowly bake." },
  { name: "Blue Supergiant", env: "Harsh UV glare", desc: "Fierce ultraviolet output scours unshielded surfaces — radiation saves may apply." },
  { name: "Flare Star", env: "Solar flares", desc: "Unstable — periodic flares knock out tech and irradiate exposed worlds." },
  { name: "Dying Ember", env: "Failing light", desc: "The star is guttering out — cold, dark, and dimming year by year." },
  { name: "Neutron Star", env: "Sweeping radiation", desc: "A pulsar's beams rake the system on a relentless clock — deadly to the unshielded." },
  { name: "Eclipsed", env: "Long shadow", desc: "A dark companion or debris ring throws the system into frequent, lingering eclipses." },
  { name: "Ki-Rich Corona", env: "Ambient Ki", desc: "The star bleeds raw energy — Ki regenerates faster here, but Overload comes quicker too." },
  { name: "Nova Warning", env: "Impending nova", desc: "Instability readings spike — this star may not have long, and everyone can feel it." },
];
const starTrait = (name) => STAR_TRAITS.find(t => t.name === name);
const UNI_SYS_ROOTS = ["Sadal", "Konat", "Yardr", "Cere", "Todok", "Arli", "Brench", "Zeta", "Kanas", "Morvun", "Tarbl", "Vega", "Namek", "Frost", "Ember", "Halox", "Drayen", "Ossul", "Pyria", "Velmor"];
const UNI_SYS_SUFFIX = ["a", "os", "ia", "us", "eon", "ar", "ith", "or", "ex", "is", "un", "el"];
// Palette for galactic factions (empires that claim territory across systems).
const FACTION_COLORS = ["#E5533C", "#5AA9F5", "#F5C542", "#57C97A", "#C77DF5", "#EC6FB0", "#48C7C7", "#E08A3C", "#9B8CF5", "#7FBF4F"];
const FACTION_ROOTS = ["Frieza Force", "Galactic Patrol", "Red Ribbon", "Saiyan Remnant", "Cold Empire", "Free Worlds", "Namekian Concord", "Crimson Syndicate", "Iron Dominion", "Star League", "Void Reavers", "Sable Compact"];

const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const clampIdx = (i, arr) => Math.max(0, Math.min(arr.length - 1, i));

/* ===== Planet classes (Stellaris-style variety) ===== Each class carries a
   habitability tier, a fixed gravity range (rolled once at generation and never
   changes), a colour, and a climate that drives its seasonal weather. Weather is
   picked per-season; hostile/airless worlds ignore seasons (flat tables). ===== */
const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
const WEATHER_CLIMATE = {
  temperate: { Spring: ["Mild rain", "Blossom winds", "Clear skies"], Summer: ["Warm & clear", "Heat haze", "Thunderstorm"], Autumn: ["Crisp air", "Rolling fog", "Steady rain"], Winter: ["Snowfall", "Hard frost", "Cold & clear"] },
  ocean:     { Spring: ["Sea breeze", "Passing squalls", "Calm swells"], Summer: ["Humid heat", "Monsoon rain", "Typhoon warning"], Autumn: ["Coastal storms", "Choppy seas", "Grey drizzle"], Winter: ["Cold rain", "Howling gales", "Sleet"] },
  dry:       { Spring: ["Dust on the breeze", "Dry & clear", "Rare shower"], Summer: ["Scorching heat", "Heat mirage", "Sandstorm"], Autumn: ["Warm days", "Dry winds", "Cooling dusk"], Winter: ["Cold nights", "Frosty dawn", "Clear & mild"] },
  cold:      { Spring: ["Thaw & slush", "Meltwater mist", "Pale sun"], Summer: ["Cool & bright", "Brief green", "Chill wind"], Autumn: ["First frost", "Sleet showers", "Grey freeze"], Winter: ["Blizzard", "Whiteout", "Deep freeze"] },
};
const flatSeasons = (arr) => ({ Spring: arr, Summer: arr, Autumn: arr, Winter: arr });
const WEATHER_HOSTILE = {
  "City-World": flatSeasons(["Smog haze", "Climate-controlled", "Acid drizzle"]),
  Crystalline: flatSeasons(["Resonant winds", "Crystal bloom", "Prismatic storm"]),
  Barren: flatSeasons(["Airless calm", "Meteor shower", "Solar flare exposure"]),
  Molten: flatSeasons(["Ashfall", "Lava geysers", "Firestorm"]),
  Toxic: flatSeasons(["Acid rain", "Toxic fog", "Chemical squall"]),
  Frozen: flatSeasons(["Blizzard", "Ice storm", "Still, killing cold"]),
  "Gas Giant": flatSeasons(["Perpetual storm", "Lightning bands", "Crushing winds"]),
  Asteroid: flatSeasons(["Vacuum", "Micrometeorites", "Silent dark"]),
};
const PLANET_CLASSES = [
  { name: "Gaia", hab: "Habitable", climate: "temperate", g: [0.9, 1.1], color: "#5fe08f" },
  { name: "Continental", hab: "Habitable", climate: "temperate", g: [0.8, 1.3], color: "#4ADE80" },
  { name: "Ocean", hab: "Habitable", climate: "ocean", g: [0.9, 1.4], color: "#4FD1FF" },
  { name: "Tropical", hab: "Habitable", climate: "ocean", g: [0.8, 1.2], color: "#3fcaa0" },
  { name: "Savannah", hab: "Habitable", climate: "temperate", g: [0.8, 1.3], color: "#c8b24a" },
  { name: "City-World", hab: "Habitable", climate: null, g: [0.9, 1.3], color: "#c0c8e0" },
  { name: "Arid", hab: "Marginal", climate: "dry", g: [0.7, 1.4], color: "#e0a24b" },
  { name: "Desert", hab: "Marginal", climate: "dry", g: [0.6, 1.5], color: "#e0813b" },
  { name: "Tundra", hab: "Marginal", climate: "cold", g: [0.8, 1.4], color: "#7fb4c8" },
  { name: "Arctic", hab: "Marginal", climate: "cold", g: [0.8, 1.5], color: "#a8d8f0" },
  { name: "Alpine", hab: "Marginal", climate: "cold", g: [1.0, 2.0], color: "#9fb8d8" },
  { name: "Crystalline", hab: "Hostile", climate: null, g: [0.5, 14], color: "#B990FF" },
  { name: "Molten", hab: "Hostile", climate: null, g: [0.8, 12], color: "#FF5C5C" },
  { name: "Toxic", hab: "Hostile", climate: null, g: [0.7, 1.8], color: "#8fbf3f" },
  { name: "Frozen", hab: "Hostile", climate: null, g: [0.5, 1.6], color: "#bfe0ff" },
  { name: "Barren", hab: "Barren", climate: null, g: [0.2, 1.6], color: "#9AA3B5" },
  { name: "Gas Giant", hab: "Barren", climate: null, g: [8, 50], color: "#d8a86a" },
  { name: "Asteroid", hab: "Barren", climate: null, g: [0.05, 0.3], color: "#8a8a8a" },
];
const planetClass = (name) => PLANET_CLASSES.find(c => c.name === name) || PLANET_CLASSES.find(c => c.name === "Barren");
const classWeather = (name) => { const c = planetClass(name); return c.climate ? WEATHER_CLIMATE[c.climate] : (WEATHER_HOSTILE[name] || flatSeasons(["—"])); };

// --- Weather as registry data (Compendium overhaul, Weather migration) ---------
// Flatten the climate/hostile weather tables into entries keyed by name, each
// carrying the `${climate}|${season}` and `hostile:${class}` slots that generation
// matches on — so weather keeps its climate/season fidelity while becoming an
// editable, enable/disable-able, effect-bearing registry category.
const weatherSlug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const WEATHER_DATA = (() => {
  const bySlug = {};
  const push = (name, slot) => {
    if (!name || name === "—") return;
    const id = weatherSlug(name);
    if (!bySlug[id]) bySlug[id] = { id, name, slots: [], rarity: "common" };
    if (!bySlug[id].slots.includes(slot)) bySlug[id].slots.push(slot);
  };
  for (const climate in WEATHER_CLIMATE) for (const season of SEASONS) for (const w of WEATHER_CLIMATE[climate][season]) push(w, `${climate}|${season}`);
  for (const cls in WEATHER_HOSTILE) for (const w of WEATHER_HOSTILE[cls].Spring) push(w, `hostile:${cls}`);
  return Object.values(bySlug);
})();
const CLIMATE_LABEL = { temperate: "Temperate", ocean: "Ocean", dry: "Dry", cold: "Cold" };
const weatherSlotsLabel = (e) => {
  if (e.climateTag) return `Custom · ${e.climateTag}`;
  const climates = new Set(), classes = new Set();
  (e.slots || []).forEach(s => { if (s.startsWith("hostile:")) classes.add(s.slice(8)); else climates.add(s.split("|")[0]); });
  const parts = [...[...climates].map(c => CLIMATE_LABEL[c] || c), ...[...classes]];
  return parts.length ? parts.join(", ") + " worlds" : "Any world";
};
// Enabled weather entries valid for a planet class + season (registry-driven).
const weatherPool = (entries, cls, season) => {
  const climate = planetClass(cls).climate;
  return (entries || []).filter(e => e.enabled).filter(e => {
    if (e.slots && e.slots.length) return climate ? e.slots.includes(`${climate}|${season}`) : e.slots.includes(`hostile:${cls}`);
    if (e.climateTag) { const t = String(e.climateTag).toLowerCase(); return t === String(climate || "").toLowerCase() || t === String(cls).toLowerCase(); }
    return false;
  });
};
// Weighted pick from an already-filtered pool of registry entries, honoring caps.
function weightedPickFrom(pool, used, catKey) {
  if (!pool || !pool.length) return null;
  const capOk = (e) => e.rarity !== "unique" || (used[`${catKey}:${e._id}`] || 0) < (e.uniqueCount != null ? e.uniqueCount : 1);
  const avail = pool.filter(capOk);
  const use = avail.length ? avail : pool;
  const w = use.map(e => Math.max(0.0001, rarityWeight(e.rarity)));
  const t = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * t, chosen = use[use.length - 1];
  for (let i = 0; i < use.length; i++) { r -= w[i]; if (r <= 0) { chosen = use[i]; break; } }
  if (used) used[`${catKey}:${chosen._id}`] = (used[`${catKey}:${chosen._id}`] || 0) + 1;
  return chosen;
}
// Generation weather pick: registry pool if mirrored, else the const tables.
function pickWeather(cls, season, used) {
  const all = (CURRENT_REG && CURRENT_REG.weather) || null;
  if (all) { const e = weightedPickFrom(weatherPool(all, cls, season), used, "weather"); if (e) return e._name; }
  return pick(classWeather(cls)[season] || ["—"]);
}
const HAB_ORDER = { Habitable: 3, Marginal: 2, Hostile: 1, Barren: 0 };
const habColor = (hab) => ({ Habitable: COLORS.green, Marginal: COLORS.amber, Hostile: COLORS.red, Barren: COLORS.dim }[hab] || COLORS.dim);
const GRAVITY_MAX = 50;   // the highest gravity (50×) any world may generate at
// A world this heavy (≥10×) can't sustain normal life — it's a crushing gas
// giant (habitation on hovering platforms) or an unstable high-gravity ruin.
const GRAVITY_EXTREME = 10;
const gravityBand = (g) => g == null ? "—" : g < 0.6 ? "Low-g" : g < 1.4 ? "Standard" : g < 2.5 ? "High-g" : g < GRAVITY_EXTREME ? "Crushing" : `${Math.round(g)}× Extreme`;
const gravityColor = (g) => g == null ? COLORS.dim : g < 0.6 ? COLORS.blue : g < 1.4 ? COLORS.green : g < 2.5 ? COLORS.amber : COLORS.red;
const rollGravity = (name) => { const c = planetClass(name); return +Math.min(GRAVITY_MAX, c.g[0] + Math.random() * (c.g[1] - c.g[0])).toFixed(2); };
// Extreme gravity forces a world uninhabitable regardless of its class.
const extremeGravityFlavor = (className) => className === "Gas Giant"
  ? "A crushing gas giant — any habitation clings to hovering platforms above the storm layer."
  : "An unstable high-gravity world, barely holding itself together.";
// Gravity acclimation (Materoids Flavor): a fighter raised/trained under heavy
// gravity carries Lightweight ranks anywhere lighter — 10× → 1, 25× → 2, 50× → 3.
const gravAcclimRanks = (g) => !g ? 0 : g >= 50 ? 3 : g >= 25 ? 2 : g >= GRAVITY_EXTREME ? 1 : 0;
// Environmental gravity → Weighted ranks for anyone standing on the world
// (book Ch.1/9). Near-weightless floats you into Weighted (Light, +); crushing
// gravity drags you into Weighted (Heavy, −). Thresholds mirror gravityBand.
const envGravityRanks = (g) => {
  if (g == null) return 0;
  if (g < 0.15) return 2;                          // near-weightless float
  if (g < 0.6)  return 1;                          // Low-g
  if (g < 1.4)  return 0;                          // Standard, no effect
  if (g < 2.5)  return -1;                         // High-g
  if (g < GRAVITY_EXTREME) return -2;              // Crushing
  return -3 - Math.floor((g - GRAVITY_EXTREME) / 20); // Extreme, worsening with mass
};
// One-line summary of what a world's gravity does to everyone on it, for banners.
const envGravityEffect = (g) => {
  const r = envGravityRanks(g);
  if (!r) return { ranks: 0, kind: "none", label: "Standard gravity · no strain", color: COLORS.green };
  if (r > 0) return { ranks: r, kind: "light", label: `Weighted (Light) ${r}: +${r * 10} ft Speed, +${r} Power`, color: COLORS.blue };
  const h = -r;
  return { ranks: r, kind: "heavy", label: `Weighted (Heavy) ${h}: −${h * 10} ft Speed, −${h} Power`, color: COLORS.red };
};

// Old free-text biomes → new planet classes, for migrating pre-class galaxies.
const OLD_BIOME_MAP = { Desert: "Desert", Ocean: "Ocean", Ice: "Frozen", Volcanic: "Molten", Jungle: "Tropical", "Barren Rock": "Barren", "Gas Giant": "Gas Giant", "City-World": "City-World", "Agri-World": "Continental", "Toxic Waste": "Toxic", Verdant: "Continental", Crystalline: "Crystalline" };
function migratePlanet(p) {
  const cls = (p.class && planetClass(p.class).name === p.class) ? p.class : (OLD_BIOME_MAP[p.biome] || (PLANET_CLASSES.some(c => c.name === p.biome) ? p.biome : "Barren"));
  const c = planetClass(cls);
  const season = SEASONS.includes(p.season) ? p.season : pick(SEASONS);
  const opts = classWeather(cls)[season] || ["—"];
  const gravity = Math.min(GRAVITY_MAX, p.gravity != null ? p.gravity : rollGravity(cls));
  const hab = gravity >= GRAVITY_EXTREME ? "Barren" : c.hab;   // extreme gravity overrides class habitability
  return { ...p, class: cls, biome: cls, habitability: hab, gravity, season, weather: p.weather || opts[0], influence: p.influence ?? 0 };
}

// Terraforming is a colossal, world-reshaping undertaking — it costs the same
// steep Ƶeni price and the FULL Influence outlay no matter what you turn a world
// into. Influence still carries the impoverished penalty (below); Ƶeni does not.
const TERRAFORM_ZENI = 250000;
const TERRAFORM_INF = 150;
// Impoverished worlds under a faction's thumb resist outside influence — actions
// there cost half again as much Influence.
const isImpoverished = (p) => (p.wealthIdx ?? 2) <= 1 || (p.stabilityIdx ?? 2) <= 1;
const influencePenalty = (planet, systemFactionId) => (systemFactionId && isImpoverished(planet)) ? 1.5 : 1;
const withPenalty = (inf, planet, systemFactionId) => Math.round(inf * influencePenalty(planet, systemFactionId));
// Base Influence cost of each world action (before the impoverished penalty).
const INFLUENCE_ACTIONS = {
  revolution: { label: "Lead Revolution", inf: 80, zeni: 0, desc: "Topple the sitting government — install a new one and shake up stability." },
  band: { label: "Form a Band", inf: 40, zeni: 0, desc: "Rally a militia, rebel cell, or crew loyal to your cause." },
  favor: { label: "Call in a Favor", inf: 25, zeni: 0, desc: "Cash in political capital for a one-time boon from the locals." },
};

// Spiral-galaxy layout: normalized [0,1] positions for n systems along 2-3
// logarithmic arms, denser toward the core. Deterministic jitter so a saved
// galaxy always redraws the same way.
// Shared spiral geometry so the drawn arms and the system positions line up.
const SPIRAL_ARMS = (n) => (n > 32 ? 4 : n > 16 ? 3 : 2);
const SPIRAL_TURNS = 1.0;         // gentle sweep — tight coils are what bunched systems into the core
const SPIRAL_RIN = 0.14;          // inner radius floor: nothing sits at dead center
const SPIRAL_ROUT = 0.46;         // outer radius: arms reach near the disk edge
function spiralPositions(n) {
  const arms = SPIRAL_ARMS(n);
  const out = [];
  for (let i = 0; i < n; i++) {
    const arm = i % arms;
    const countInArm = Math.floor((n - 1 - arm) / arms) + 1;   // systems on this arm
    const idxInArm = Math.floor(i / arms);
    const t = countInArm > 1 ? idxInArm / (countInArm - 1) : 0.5; // evenly spaced 0..1 along the arm
    const jr = Math.sin(i * 71.13) * 0.5;                      // -0.5..0.5 deterministic
    const ja = Math.sin(i * 12.9898 + 4.1) * 0.5;             // -0.5..0.5
    const angle = t * SPIRAL_TURNS * Math.PI * 2 + (arm / arms) * Math.PI * 2 + ja * 0.24;
    const radius = SPIRAL_RIN + (SPIRAL_ROUT - SPIRAL_RIN) * t + jr * 0.035;
    out.push({ x: +(0.5 + radius * Math.cos(angle)).toFixed(4), y: +(0.5 + radius * Math.sin(angle)).toFixed(4) });
  }
  return out;
}
// Ensure every system has an {x,y} — backfills galaxies saved before the map.
function ensureGalaxyLayout(galaxy) {
  if (!galaxy) return galaxy;
  const laidOut = galaxy.factions
    && galaxy.systems.every(s => s.x != null && s.y != null && s.planets.every(p => p.class != null))
    && (galaxy.factions || []).every(f => f.influence != null);
  if (laidOut) return galaxy;
  const pos = spiralPositions(galaxy.systems.length);
  return {
    ...galaxy,
    // Factions gain an Influence treasury; backfill existing ones to 0.
    factions: (galaxy.factions || []).map(f => ({ ...f, influence: f.influence ?? 0 })),
    // Backfill: galaxies made before fog-of-war stay fully visible (?? true);
    // freshly generated systems come in undiscovered so players explore. Planets
    // gain a class / gravity / habitability / weather / influence via migratePlanet.
    systems: galaxy.systems.map((s, i) => ({ ...s, x: s.x ?? pos[i].x, y: s.y ?? pos[i].y, factionId: s.factionId ?? null, discovered: s.discovered ?? true, planets: s.planets.map(migratePlanet) })),
  };
}

// Hex placement: pointy-top hexagons laid out in offset rows across [0,1]².
// Snap to the nearest free cell so systems lock to distinct hexes without
// stacking. HEX_COLS controls density; odd rows are shifted half a cell so the
// centers interlock into a proper honeycomb.
const HEX_COLS = 11;
const HEX_DX = 1 / HEX_COLS;                 // column spacing (pointy-top hex width)
const HEX_DY = HEX_DX * Math.sqrt(3) / 2;    // row spacing (3/4 of hex height)
const HEX_R = HEX_DX / Math.sqrt(3);         // circumradius, normalized units
const HEX_CELLS = (() => {
  const out = [];
  const nRows = Math.ceil(1 / HEX_DY) + 1;
  for (let r = 0; r < nRows; r++) {
    const cy = r * HEX_DY + HEX_DY / 2;
    if (cy > 0.99) break;
    const shift = (r & 1) ? HEX_DX / 2 : 0;
    for (let c = 0; c < HEX_COLS; c++) {
      const cx = c * HEX_DX + HEX_DX / 2 + shift;
      if (cx > 0.99) continue;
      out.push({ cx, cy, key: c + "," + r });
    }
  }
  return out;
})();
// SVG polygon points for a pointy-top hex centered at (cx,cy) with radius R.
function hexPoints(cx, cy, R) {
  const p = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 - 90) * Math.PI / 180;
    p.push((cx + R * Math.cos(a)).toFixed(1) + "," + (cy + R * Math.sin(a)).toFixed(1));
  }
  return p.join(" ");
}
function nearestFreeCell(x, y, taken) {
  let best = { x, y }, bd = Infinity;
  for (const cell of HEX_CELLS) {
    if (taken.has(cell.key)) continue;
    const d = (cell.cx - x) ** 2 + (cell.cy - y) ** 2;
    if (d < bd) { bd = d; best = { x: cell.cx, y: cell.cy, key: cell.key }; }
  }
  return best;
}
function nearestCellKey(x, y) {
  let key = null, bd = Infinity;
  for (const cell of HEX_CELLS) {
    const d = (cell.cx - x) ** 2 + (cell.cy - y) ** 2;
    if (d < bd) { bd = d; key = cell.key; }
  }
  return key;
}
function snapOne(x, y, systems, exceptId) {
  const taken = new Set();
  for (const s of systems) {
    if (s.id === exceptId) continue;
    taken.add(nearestCellKey(s.x, s.y));
  }
  return nearestFreeCell(x, y, taken);
}

function uniName(roots) {
  let n = pick(roots) + pick(UNI_SYS_SUFFIX);
  if (Math.random() < 0.25) n += " " + ["Prime", "Major", "Minor", "II", "III", "IV", "IX", "Secundus"][rint(0, 7)];
  else if (Math.random() < 0.2) n += "-" + rint(2, 99);
  return n;
}

// Tax rate is derived, not random noise: corporate/occupied worlds tax hard,
// anarchies barely at all; prosperity and instability nudge it.
function deriveTax(government, wealthIdx, stabilityIdx) {
  const base = { "Corporate Oligarchy": 22, "Frieza Force Occupation": 30, "Absolute Monarchy": 18, "Theocracy": 15, "Ruling Council": 12, "Galactic Patrol Protectorate": 14, "AI Technocracy": 16, "Warlord State": 10, "Tribal Confederacy": 6, "Anarchy": 2 }[government] ?? 12;
  const adj = (wealthIdx - 2) * 2 + (2 - stabilityIdx) * 2;   // richer taxes more; unrest raises desperate levies
  return Math.max(0, Math.min(45, Math.round(base + adj)));
}

function generatePlanet(era, used = {}) {
  // Planet class and population species now come from the World & Rules registry:
  // disabled classes/races never spawn, rarity biases frequency, Unique caps count.
  const c = pickReg("planets", used, PLANET_CLASSES);
  const speciesPick = () => { const e = pickReg("races", used, UNI_SPECIES); return e ? (e._name || e) : "—"; };
  // Gas giants roll extreme naturally; other worlds get a rare unstable spike.
  let gravity = rollGravity(c.name);
  if (c.name !== "Gas Giant" && Math.random() < 0.06) gravity = +Math.min(GRAVITY_MAX, GRAVITY_EXTREME + Math.random() * 20).toFixed(2);
  const hab = gravity >= GRAVITY_EXTREME ? "Barren" : c.hab;   // extreme gravity = uninhabitable
  const uninhabited = (hab === "Barren" || hab === "Hostile") ? Math.random() < 0.85 : Math.random() < 0.08;
  const season = pick(SEASONS);
  const stabilityIdx = uninhabited ? null : clampIdx(rint(1, 4) + (era?.biasStability || 0), UNI_STABILITY);
  const wealthIdx = uninhabited ? null : rint(0, 4);
  const government = uninhabited ? "—" : (Math.random() < 0.5 && era?.biasGov ? pick(era.biasGov) : pick(UNI_GOVERNMENTS));
  return {
    id: uid(),
    name: uniName(UNI_SYS_ROOTS),
    class: c.name, biome: c.name, habitability: hab,
    gravity, season, weather: pickWeather(c.name, season, used), influence: 0,
    population: uninhabited ? "Uninhabited" : UNI_POP[rint(1, UNI_POP.length - 1)],
    species: uninhabited ? "—" : (Math.random() < 0.35 ? `${speciesPick()} & ${speciesPick()}` : speciesPick()),
    economy: uninhabited ? "Uninhabited" : pick(UNI_ECONOMIES),
    wealth: uninhabited ? "—" : UNI_WEALTH[wealthIdx], wealthIdx,
    taxRate: uninhabited ? 0 : deriveTax(government, wealthIdx, stabilityIdx),
    government,
    ruler: uninhabited ? "—" : `${pick(["Warlord", "Governor", "Overlord", "Chief", "Prelate", "Director", "Prince", "Matriarch", "Commander", "Elder"])} ${uniName(UNI_SYS_ROOTS)}`,
    stability: uninhabited ? "—" : UNI_STABILITY[stabilityIdx], stabilityIdx,
    tech: uninhabited ? "—" : UNI_TECH[rint(0, 4)],
    laws: uninhabited ? [] : [...new Set([pick(UNI_LAWS), pick(UNI_LAWS)])],
    feature: pick(UNI_FEATURES),
    homes: [],
  };
}

// A fillable blank planet for "custom" systems where the DM sets everything.
function blankPlanet() {
  return { id: uid(), name: uniName(UNI_SYS_ROOTS), class: "Barren", biome: "Barren", habitability: "Barren", gravity: rollGravity("Barren"), season: "Spring", weather: classWeather("Barren").Spring[0], influence: 0, population: "Uninhabited", species: "—", economy: "Uninhabited", wealth: "—", wealthIdx: null, taxRate: 0, government: "—", ruler: "—", stability: "—", stabilityIdx: null, tech: "—", laws: [], feature: "", homes: [] };
}
function newRandomSystem(eraDef, used = {}) {
  const nPlanets = Math.random() < 0.45 ? rint(1, 2) : rint(2, 5);
  return { id: uid(), name: uniName(UNI_SYS_ROOTS) + " System", star: pick(UNI_STARS), factionId: null, planets: Array.from({ length: nPlanets }, () => generatePlanet(eraDef, used)) };
}

function generateGalaxy({ size = "medium", era = "frontier" } = {}) {
  const sz = GALAXY_SIZES[size] || GALAXY_SIZES.medium;
  const eraDef = GALAXY_ERAS[era];
  const nSystems = rint(sz.systems[0], sz.systems[1]);
  const pos = spiralPositions(nSystems);
  const used = {};   // galaxy-wide tally so Unique entries stay capped across systems
  const systems = Array.from({ length: nSystems }, (_, i) => {
    const nPlanets = Math.random() < 0.45 ? rint(1, 2) : rint(2, 5);
    return {
      id: uid(),
      name: uniName(UNI_SYS_ROOTS) + " System",
      star: pick(UNI_STARS),
      x: pos[i].x, y: pos[i].y, factionId: null, discovered: false,
      planets: Array.from({ length: nPlanets }, () => generatePlanet(eraDef, used)),
    };
  });
  return {
    id: uid(), size, era,
    name: `The ${pick(["Uncharted", "Frontier", "Northern", "Outer", "Forgotten", "Shattered", "Verdant", "Crimson"])} ${pick(["Reaches", "Expanse", "Cluster", "Belt", "Rim", "Spiral"])}`,
    createdAt: Date.now(),
    factions: [],
    systems,
  };
}

// Colors for the two index-based ladders (stability, wealth).
const stabilityColor = (idx) => idx == null ? COLORS.dim : [COLORS.red, COLORS.amber, COLORS.amber, COLORS.green, COLORS.blue][clampIdx(idx, UNI_STABILITY)];
const wealthColor = (idx) => idx == null ? COLORS.dim : [COLORS.red, COLORS.amber, COLORS.muted, COLORS.green, COLORS.gold][clampIdx(idx, UNI_WEALTH)];

export {
  GALAXY_SIZES,
  GALAXY_ERAS,
  UNI_ECONOMIES,
  UNI_WEALTH,
  UNI_STABILITY,
  UNI_TECH,
  UNI_POP,
  UNI_GOVERNMENTS,
  UNI_SPECIES,
  UNI_LAWS,
  UNI_FEATURES,
  UNI_STARS,
  STAR_TRAITS,
  starTrait,
  UNI_SYS_ROOTS,
  UNI_SYS_SUFFIX,
  FACTION_COLORS,
  FACTION_ROOTS,
  rint,
  clampIdx,
  SEASONS,
  WEATHER_CLIMATE,
  flatSeasons,
  WEATHER_HOSTILE,
  PLANET_CLASSES,
  planetClass,
  classWeather,
  weatherSlug,
  WEATHER_DATA,
  CLIMATE_LABEL,
  weatherSlotsLabel,
  weatherPool,
  weightedPickFrom,
  pickWeather,
  HAB_ORDER,
  habColor,
  GRAVITY_MAX,
  GRAVITY_EXTREME,
  gravityBand,
  gravityColor,
  rollGravity,
  extremeGravityFlavor,
  gravAcclimRanks,
  envGravityRanks,
  envGravityEffect,
  OLD_BIOME_MAP,
  migratePlanet,
  TERRAFORM_ZENI,
  TERRAFORM_INF,
  isImpoverished,
  influencePenalty,
  withPenalty,
  INFLUENCE_ACTIONS,
  SPIRAL_ARMS,
  SPIRAL_TURNS,
  SPIRAL_RIN,
  SPIRAL_ROUT,
  spiralPositions,
  ensureGalaxyLayout,
  HEX_COLS,
  HEX_DX,
  HEX_DY,
  HEX_R,
  HEX_CELLS,
  hexPoints,
  nearestFreeCell,
  nearestCellKey,
  snapOne,
  uniName,
  deriveTax,
  generatePlanet,
  blankPlanet,
  newRandomSystem,
  generateGalaxy,
  stabilityColor,
  wealthColor,
};
