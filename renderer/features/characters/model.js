import { TECHNIQUE_DATA } from "../../data/technique-data.js";
import { charTotalLevel, statMod } from "../../engine/core.js";
import { computeArmorDR, normalizeItem } from "../../engine/equipment.js";
import { SPECIES_BASE_LIST } from "../../engine/skills.js";
import { uid } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { useRegistry } from "../../state/registry.js";

function useSpeciesList() {
  const [custom] = useSharedList("compendium_v2");
  const races = useRegistry("races");
  const customSpecies = (custom || []).filter(e => e.type === "species").map(e => e.name);
  // Enabled races from the registry (book species + registry customs, minus disabled).
  const base = races.loading ? SPECIES_BASE_LIST : races.entries.filter(e => e.enabled).map(e => e._name);
  const merged = Array.from(new Set([...base, ...customSpecies])).sort();
  return merged;
}

const blankChar = () => ({
  id: uid(), name: "New Fighter", species: "", subspecies: "", heritage: "", classId: "", level: 1,
  classes: [], // multiclass: [{ classId, level }] — classId/level above stay synced as denormalized copies
  hp: 20, maxHp: 20, ki: 20, maxKi: 20, stamina: 5, maxStamina: 5, maxStaminaOverride: null,
  ac: 12, dr: 0, acOverride: false, drOverride: false, attacksPerTurn: 1, kiRankOverride: null,
  equipment: {}, // physical slot key → item id (references items[])
  powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0 },
  speedBase: 30, speedExtra: 0, zeni: 0, resistances: [],
  deathSaves: { success: 0, fail: 0 },
  alignment: "", pictureUrl: "",
  appearance: { age: "", height: "", weight: "", size: "Medium", gender: "", eyes: "", hair: "", skin: "" },
  personality: "", flaws: "", lifepath: {}, // Bio → Story lifepath prompts (data/lifepath-data.js)
  stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  conditions: [], activeConditions: {}, techniques: [], forms: [], items: [], equipped: [], notes: "", handle: "",
  trainingBoons: { current: 0, max: 4 }, features: [],
  savingThrowProfs: [], skillProfs: {}, speciesSkillChoices: [], feats: [],
  customMoves: [], moveOverrides: {}, // Combat: player-made moves + edits to computed ones
  breatherPool: null, // Stamina pool (Lv + CON mod); null = full
  weightedUnattuned: false, weightedManual: 0, // Weighted (Heavy/Light) state
  accustomedGravity: 0, // max gravity (×g) they can handle; drives Gravity Acclimation
  injuries: [], // [{ id, name, location, notes }]
  vitals: { exhaustion: 0, food: 3, water: 3, rest: 3 }, // 0–3 trackers (3 = full)
  // Spellcasting container — see spellStats()/isCaster(). Empty by default; the
  // Magic tab only appears for caster classes (or when enabled is set).
  spellcasting: {
    enabled: false,       // force-show the tab for a non-detected caster
    ability: "",          // "" = use the class default (defaultCasterAbility)
    maxSpellLevel: 0,     // highest castable Spell/Burst level (book table; editable)
    schools: [],          // chosen Schools of Magic (names from SPELL_SCHOOLS)
    cantrips: [],         // [{ id, name, notes }]
    spells: [],           // [{ id, name, level, notes }]
    slots: [],            // [{ id, level, current, max }] — slot-casters (Mystic)
    pools: [],            // [{ id, name, current, max, reset:"short"|"long" }]
  },
  // Resource trackers (book Ch.1/10). Max Hit Dice = character level; the die
  // size is class-set (editable, no per-class die in CLASS_DATA). Temp pools sit
  // on top of HP/Ki/Stamina and clear on a Long Rest. God Ki is usually gained
  // at Lv20. Attunement max 2, Soulbind max 2.
  hitDie: "d8", hitDiceUsed: 0,
  temp: { hp: 0, ki: 0, stamina: 0 },
  godKi: { current: 0, max: 0, temp: 0 },
  attunements: [], // [{ id, name }] — max 2
  soulbinds: [],   // [{ id, name }] — max 2
  // Limited-use resource pools. Class-granted ones (source:"class") are auto-built
  // from CLASS_RESOURCES by reconcileResources; custom ones (source:"custom") are
  // player-made. { id, key, source, name, die, max, current, reset, regen, note }.
  resources: [],
  // Installed High-Tech Parts (cybernetics): [{ uid, partId, signature }].
  cybernetics: [],
});

function migrateChar(char) {
  // Legacy flat "equipped" strings become carried inventory items so nothing is
  // lost when moving to the paperdoll (slot→item) model.
  const legacyEquipped = (char.equipped || []).filter(e => typeof e === "string").map(name => normalizeItem({ name }));
  const merged = {
    ...blankChar(), ...char,
    items: [...(char.items || char.gear || []).map(normalizeItem), ...legacyEquipped],
    equipment: char.equipment || {},
    equipped: [],
    customMoves: char.customMoves || [],
    moveOverrides: char.moveOverrides || {},
    breatherPool: char.breatherPool !== undefined ? char.breatherPool : null,
    weightedUnattuned: char.weightedUnattuned || false,
    weightedManual: char.weightedManual || 0,
    injuries: char.injuries || [],
    vitals: { exhaustion: 0, food: 3, water: 3, rest: 3, ...(char.vitals || {}) },
    spellcasting: { enabled: false, ability: "", maxSpellLevel: 0, schools: [], cantrips: [], spells: [], slots: [], pools: [], ...(char.spellcasting || {}) },
    hitDie: char.hitDie || "d8", hitDiceUsed: char.hitDiceUsed || 0,
    temp: { hp: 0, ki: 0, stamina: 0, ...(char.temp || {}) },
    godKi: { current: 0, max: 0, temp: 0, ...(char.godKi || {}) },
    attunements: char.attunements || [],
    soulbinds: char.soulbinds || [],
    resources: char.resources || [],
    cybernetics: char.cybernetics || [],
    features: char.features || [],
    // Feats are instances now (uid) so repeatable ones — ASI — can be taken
    // more than once and removed individually.
    feats: (char.feats || []).map(f => ({ ...f, uid: f.uid || uid() })),
    trainingBoons: char.trainingBoons || { current: 0, max: 4 },
    powerBonus: { stable: 0, transformation: 0, powerUp: 0, misc: 0, ...(char.powerBonus || {}) },
    appearance: { age: "", height: "", weight: "", size: "Medium", gender: "", eyes: "", hair: "", skin: "", ...(char.appearance || {}) },
    deathSaves: char.deathSaves || { success: 0, fail: 0 },
  };
  // Techniques used to be a free-text string[]; upgrade any old entries to the
  // structured shape (kept as custom/free-text so nothing is lost).
  merged.techniques = (char.techniques || []).map(t =>
    typeof t === "string"
      ? { uid: uid(), techId: null, custom: true, mastery: 0, name: t, lineName: "", techType: "", kiRank: "", kiCost: "", castingTime: "", range: "", damageDice: "", damageType: "", resolution: "utility", saveAbility: "", fullText: "" }
      : t
  );
  // Known techniques snapshot the book entry when added, so techniques added
  // before the merge script learned to inherit resolution across ranks are
  // frozen as "utility" — they roll damage with no attack roll or save DC.
  // Re-adopt the book's resolution for exactly that case; custom techniques and
  // anything without damage dice are left untouched.
  merged.techniques = merged.techniques.map(t => {
    if (t.custom || !t.techId || !t.damageDice || t.resolution !== "utility") return t;
    const book = TECHNIQUE_DATA.find(b => b.id === t.techId);
    if (!book || book.resolution === "utility") return t;
    return { ...t, resolution: book.resolution, saveAbility: t.saveAbility || book.saveAbility };
  });
  if ((!merged.classes || !merged.classes.length) && merged.classId) {
    merged.classes = [{ classId: merged.classId, level: merged.level || 1 }];
  }
  // Hand-entered stamina that disagrees with the book formula becomes an
  // explicit override instead of silently changing under the player.
  if (merged.maxStaminaOverride == null && merged.maxStamina != null) {
    const formula = Math.max(1, 2 + statMod(merged, "con") + 2 * (charTotalLevel(merged) - 1));
    if (merged.maxStamina !== formula) merged.maxStaminaOverride = merged.maxStamina;
  }
  // Preserve any DR a character already carries (class features, etc.): if they
  // had a manual DR that the worn armor doesn't account for, keep it as an
  // override so re-opening the sheet never silently zeroes it.
  if (char.drOverride == null && (char.dr || 0) !== computeArmorDR(merged)) {
    merged.drOverride = (char.dr || 0) > 0;
  }
  return merged;
}

const PREGEN_CHARS = [
  { name: "Kael Redstreak", classId: "Bruiser", species: "Saiyan", level: 5, hp: 55, maxHp: 55, ki: 30, maxKi: 30, stamina: 8, maxStamina: 8, ac: 15, notes: "Hot-headed brawler, always first into a fight." },
  { name: "Nira Voss", classId: "Guardian", species: "Namekian", level: 5, hp: 45, maxHp: 45, ki: 40, maxKi: 40, stamina: 7, maxStamina: 7, ac: 14, notes: "Calm support caster, keeps the party alive." },
  { name: "Dex Okonda", classId: "Agent", species: "Cerealian", level: 5, hp: 38, maxHp: 38, ki: 28, maxKi: 28, stamina: 6, maxStamina: 6, ac: 16, notes: "Gadget specialist, plans three steps ahead." },
];

export {
  useSpeciesList,
  blankChar,
  migrateChar,
  PREGEN_CHARS,
};
