// Environmental hazards that go live under Harsh Galaxies. Each is an hourly
// survival save; failure costs a level of Exhaustion. Extensible as more get
// added. (No dashes in any copy, per table style.)
// Preset battlefield terrains for the Environment tab. A dropdown, never a
// free-text box — the table picks a scene, it doesn't type one.
const TERRAIN_PRESETS = [
  { id: "open", name: "Open Field", note: "Clear ground. Full movement and line of sight for everyone." },
  { id: "urban", name: "Urban / Ruins", note: "Cover everywhere, broken sightlines, chokepoints to hold." },
  { id: "forest", name: "Forest", note: "Lightly obscured at range. Difficult terrain off the trails." },
  { id: "mountain", name: "Mountain / Cliffs", note: "Steep elevation. Climbing and falling both come into play." },
  { id: "desert", name: "Desert", note: "Loose sand is difficult terrain. Glare cuts long sightlines." },
  { id: "arctic", name: "Arctic / Ice", note: "Slippery footing. DEX checks to keep balance on a hard rush." },
  { id: "aquatic", name: "Aquatic", note: "Swimming rules. Ranged shots and open flame falter underwater." },
  { id: "volcanic", name: "Volcanic", note: "Lava and ash. Footing can collapse near the flows." },
  { id: "space", name: "Space / Zero-G", note: "No footing. Movement floats free in every direction." },
  { id: "interior", name: "Interior / Ship", note: "Tight corridors. Cramped, hard to spread the party out." },
];
const terrainPreset = (id) => TERRAIN_PRESETS.find(t => t.id === id) || null;

// Does a planet's weather string trip a hazard's trigger keywords? Keywords live
// on each hazard entry (`weatherMatch`), so the DM can retune the mapping in
// World & Rules. Overlaps are fine: a monsoon is both wind and rain.
const weatherMatchesEntry = (weather, match) => {
  if (!weather || !match) return false;
  const w = String(weather).toLowerCase();
  return String(match).split(/[,\n]/).map(s => s.trim()).filter(Boolean).some(k => w.includes(k.toLowerCase()));
};

// Normalize a registry hazard entry into one shape the panel renders and rolls
// from. Book entries carry legacy fields; custom entries express the same
// mechanics through effect hooks (a saveHazard hook = a survival save, an
// effectCondition hook = battlefield effects).
const normHazard = (e) => {
  const hooks = (e.effect && e.effect.hooks) || [];
  const saveHook = hooks.find(h => h.type === "saveHazard");
  const effHook = hooks.find(h => h.type === "effectCondition");
  return {
    id: e._id, name: e._name, cond: (e.cond || e._desc || "").replace(/\.\s*$/, ""),
    isSave: e.type === "save" || !!saveHook,
    ability: e.ability || (saveHook && saveHook.ability) || "con",
    baseDC: e.baseDC != null ? e.baseDC : (saveHook && saveHook.baseDC != null ? saveHook.baseDC : 10),
    perHour: e.perHour != null ? e.perHour : (saveHook && saveHook.perHour != null ? saveHook.perHour : 0),
    fail: e.fail || (saveHook && saveHook.onFail) || "1 level of Exhaustion",
    mods: e.mods || "",
    effects: (e.effects && e.effects.length ? e.effects : (effHook && effHook.effects) || []).filter(Boolean),
    weatherMatch: e.weatherMatch || "",
    hooks,
  };
};

const ENV_HAZARDS = [
  { id: "heat", name: "Extreme Heat", type: "save", cond: "Temperatures over 100°F without water", ability: "con", baseDC: 5, perHour: 1, fail: "1 level of Exhaustion", mods: "Disadvantage in heavy or medium armor or clothing; fire resistant or adapted creatures are immune", weatherMatch: "heat, scorch, mirage, firestorm, ashfall, lava, molten, solar flare, humid" },
  { id: "cold", name: "Extreme Cold", type: "save", cond: "Temperatures at or below 0°F", ability: "con", baseDC: 10, perHour: 0, fail: "1 level of Exhaustion", mods: "Automatic success with cold weather gear, resistance or immunity to cold, or natural adaptation", weatherMatch: "snow, frost, blizzard, freeze, whiteout, sleet, ice, deep freeze, killing cold, chill" },
  { id: "wind", name: "Strong Wind", type: "effect", cond: "Powerful gusts sweep the field", effects: ["Disadvantage on ranged weapon attack rolls", "Open flames go out and fog disperses", "A flying creature must land at the end of its turn or fall", "A desert sandstorm also gives Disadvantage on Wisdom (Perception)"], weatherMatch: "wind, gale, typhoon, squall, sandstorm, cyclone, tornado, storm, monsoon" },
  { id: "precip", name: "Heavy Precipitation", type: "effect", cond: "Heavy rain or heavy snowfall", effects: ["The area is Lightly Obscured", "Disadvantage on all Wisdom (Perception) checks", "Heavy rain also puts out open flames"], weatherMatch: "rain, drizzle, snowfall, sleet, monsoon, shower" },
];

export {
  TERRAIN_PRESETS,
  terrainPreset,
  weatherMatchesEntry,
  normHazard,
  ENV_HAZARDS,
};
