// Species Features and Heritages (5.0 Ch.3). A Heritage lets you swap up to
// three of your Species Features for an equal number of Heritage Features
// (p.32); some Heritage Features name the one they replace ("Replaces: Super
// Saiyan Species Feature"). Restricted Heritages name who can or can't take them.
import { HERITAGE_DATA, HERITAGE_SWAP_LIMIT, SPECIES_DATA } from "../data/species-data.js";

const norm = (s) => String(s || "").toLowerCase().trim();
const speciesFor = (name) => SPECIES_DATA.find(s => norm(s.name) === norm(name)) || null;
const heritageByName = (name) => HERITAGE_DATA.find(h => norm(h.name) === norm(name)) || null;

// { ok, reason } for taking Heritage h as species sp (a SPECIES_DATA entry or name).
function heritageAllowed(h, sp) {
  const r = h && h.restriction;
  if (!r) return { ok: true };
  const s = typeof sp === "string" ? speciesFor(sp) : sp;
  const matches = (rule) => rule.category ? !!s && norm(s.category) === norm(rule.category) : !!s && norm(s.name) === norm(rule.species);
  if (r.only && !matches(r.only)) return { ok: false, reason: h.rule || `Only for ${r.only.species || r.only.category}` };
  if (r.not && matches(r.not)) return { ok: false, reason: h.rule || `Not for ${r.not.species || r.not.category}` };
  return { ok: true };
}

// Heritage Feature → the Species Feature it takes the place of. Features that
// name what they replace are fixed; the rest come from the player's picks.
// Never more than three, and each Species Feature is swapped out only once.
function heritageSwaps(char) {
  const h = heritageByName(char && char.heritage);
  const sp = speciesFor(char && char.species);
  if (!h) return {};
  const speciesNames = new Set((sp ? sp.features : []).map(norm));
  const out = {}; const used = new Set();
  const take = (feat, spFeat) => {
    if (Object.keys(out).length >= HERITAGE_SWAP_LIMIT || used.has(norm(spFeat))) return;
    if (sp && !speciesNames.has(norm(spFeat))) return;
    out[feat] = spFeat; used.add(norm(spFeat));
  };
  for (const f of h.features) if (f.replaces) take(f.name, f.replaces);
  const picks = (char && char.heritageSwaps) || {};
  for (const f of h.features) if (!f.replaces && picks[f.name]) take(f.name, picks[f.name]);
  return out;
}

// The Species and Heritage Features this character has, with their rules text.
// The chosen Sub-Species' benefits ride on the Sub-Species feature.
function characterSpeciesFeatures(char) {
  const sp = speciesFor(char && char.species);
  const h = heritageByName(char && char.heritage);
  const swaps = heritageSwaps(char);
  const out = new Set(Object.values(swaps).map(norm));
  const list = [];
  if (sp) {
    for (const f of sp.featureDetails || sp.features.map(name => ({ name, text: "" }))) {
      if (/List$/.test(f.name)) continue;
      const swapped = out.has(norm(f.name));
      const sub = /Sub-Species$/.test(f.name) && char.subspecies ? (sp.subSpeciesDetails || []).find(x => norm(x.name) === norm(char.subspecies)) : null;
      list.push({ ...f, source: "species", from: sp.name, swappedOut: swapped, ...(sub ? { chosen: sub } : {}) });
    }
  }
  if (h) {
    for (const f of h.features) if (swaps[f.name]) list.push({ ...f, source: "heritage", from: h.name, replacesFeature: swaps[f.name] });
  }
  return list;
}

export { speciesFor, heritageByName, heritageAllowed, heritageSwaps, characterSpeciesFeatures };
