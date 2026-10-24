import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { HERITAGE_DATA, HERITAGE_RULE, HERITAGE_SWAP_LIMIT } from "../../data/species-data.js";
import { characterSpeciesFeatures, heritageAllowed, heritageByName, heritageSwaps, speciesFor } from "../../engine/species.js";
import { Select, SelectWithCustom, Tag } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

/* ===== Species and Heritages from the 5.0 book (Ch.3) ===== */

function RulesText({ text, size = 12 }) {
  if (!text) return null;
  return text.split("\n").map((p, i) => {
    const lead = p.match(/^([A-Z][^.:]{1,40}[.:]) (.+)$/);
    return (
      <div key={i} style={{ fontSize: size, color: COLORS.muted, lineHeight: 1.55, marginTop: i ? 5 : 0 }}>
        {lead ? <><b style={{ color: COLORS.text }}>{lead[1]}</b> {lead[2]}</> : p}
      </div>
    );
  });
}

// A feature's options (Bestial Characteristics, Strange Quirks…), grouped the
// way the book lists them.
function OptionList({ feature, color }) {
  const [open, setOpen] = useState(null);
  const opts = feature.options || [];
  if (!opts.length) return null;
  const groups = [...new Set(opts.map(o => o.group || ""))];
  return (
    <div style={{ marginTop: 8 }}>
      {groups.map(g => (
        <div key={g} style={{ marginBottom: 6 }}>
          {g && <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.dim, textTransform: "uppercase", margin: "4px 0" }}>{g}</div>}
          {g && feature.groups && feature.groups[g] && <div style={{ marginBottom: 4 }}><RulesText text={feature.groups[g]} size={11.5} /></div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {opts.filter(o => (o.group || "") === g).map(o => {
              const on = open === o;
              return (
                <button key={o.name} onClick={() => setOpen(on ? null : o)} aria-expanded={on}
                  style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: on ? `${color}30` : `${color}10`, color, border: `1px solid ${on ? color : color + "44"}` }}>{o.name}</button>
              );
            })}
          </div>
          {open && (open.group || "") === g && (
            <div style={{ marginTop: 6, padding: 8, borderRadius: 6, background: COLORS.panel, border: `1px solid ${color}33` }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 3 }}>{open.name}</div>
              <RulesText text={open.text} size={11.5} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SpeciesFeatureCard({ feature, color = COLORS.green, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = open ? ChevronDown : ChevronRight;
  const dim = feature.swappedOut;
  return (
    <div style={{ border: `1px solid ${dim ? COLORS.border : color + "44"}`, borderRadius: 7, background: COLORS.panel2, marginBottom: 6, opacity: dim ? 0.55 : 1 }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "7px 10px", background: "none", border: "none", cursor: "pointer", color: dim ? COLORS.dim : color, textAlign: "left" }}>
        <Icon size={13} />
        <span style={{ fontWeight: 700, fontSize: 12.5, textDecoration: dim ? "line-through" : "none" }}>{feature.name}</span>
        {feature.chosen && <span style={{ fontSize: 11, color: COLORS.muted }}>· {feature.chosen.name}</span>}
        {feature.source === "heritage" && <span style={{ fontSize: 10.5, color: COLORS.dim, marginLeft: "auto" }}>{feature.from}, in place of {feature.replacesFeature}</span>}
        {dim && <span style={{ fontSize: 10.5, color: COLORS.dim, marginLeft: "auto" }}>swapped for a Heritage Feature</span>}
      </button>
      {open && (
        <div style={{ padding: "0 10px 10px 29px" }}>
          <RulesText text={feature.text} />
          {feature.chosen && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 3 }}>{feature.chosen.name}</div>
              <RulesText text={feature.chosen.text} />
            </div>
          )}
          <OptionList feature={feature} color={color} />
        </div>
      )}
    </div>
  );
}

// Species and Heritage Features on the Features tab.
function SpeciesFeatureList({ char }) {
  const list = characterSpeciesFeatures(char);
  if (!list.length) return null;
  const sp = speciesFor(char.species);
  return (
    <>
      <div style={{ fontSize: 11.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
        Species Features ({sp ? sp.name : char.species}{char.heritage && heritageByName(char.heritage) ? ` · ${char.heritage}` : ""})
      </div>
      <div style={{ marginBottom: 18 }}>
        {list.map(f => <SpeciesFeatureCard key={`${f.source}-${f.name}`} feature={f} color={f.source === "heritage" ? COLORS.amber : COLORS.green} />)}
      </div>
    </>
  );
}

// Book traits under the Species field.
function SpeciesTraits({ species }) {
  const sp = speciesFor(species);
  const [lore, setLore] = useState(false);
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
        {sp.page && <span style={{ fontSize: 10, color: COLORS.dim, marginLeft: "auto" }}>p.{sp.page}</span>}
      </div>
      {sp.description && <div style={{ fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5, marginBottom: 8, fontStyle: "italic" }}>{sp.description}</div>}
      {row("Ability Scores", sp.abilityScoreIncrease)}
      {row("Speed", sp.speed)}
      {row("Languages", sp.languages)}
      {row("Skills", sp.skills)}
      {sp.subSpecies?.length > 0 && row("Sub-Species", sp.subSpecies.join(", "))}
      {sp.featureDetails?.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {sp.featureDetails.map(f => <SpeciesFeatureCard key={f.name} feature={f} />)}
        </div>
      )}
      {sp.lore && (sp.lore.physical || sp.lore.history) && (
        <div style={{ marginTop: 6 }}>
          <button onClick={() => setLore(l => !l)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.blue, fontSize: 11.5, fontWeight: 700 }}>{lore ? "Hide" : "Read"} description, history and society</button>
          {lore && ["physical", "history", "society"].map(k => sp.lore[k] && (
            <div key={k} style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10.5, color: COLORS.dim, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{k === "physical" ? "Physical Description" : k}</div>
              <RulesText text={sp.lore[k]} size={11.5} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Heritage field plus the swap: pick which Species Features each Heritage
// Feature replaces, up to three.
function HeritagePicker({ char, set }) {
  const sp = speciesFor(char.species);
  const options = HERITAGE_DATA.filter(h => heritageAllowed(h, sp).ok).map(h => h.name);
  return (
    <SelectWithCustom value={char.heritage || ""} onChange={v => set({ heritage: v, heritageSwaps: {} })} options={options} placeholder="e.g. Mutant, Blessing of Komedi" />
  );
}

function HeritageSwaps({ char, set }) {
  const h = heritageByName(char.heritage);
  const sp = speciesFor(char.species);
  if (!h) return null;
  const allowed = heritageAllowed(h, sp);
  const swaps = heritageSwaps(char);
  const used = Object.keys(swaps).length;
  const taken = new Set(Object.values(swaps));
  const pick = (feat, spFeat) => {
    const next = { ...(char.heritageSwaps || {}) };
    if (spFeat) next[feat] = spFeat; else delete next[feat];
    set({ heritageSwaps: next });
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.amber}44`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{h.name}</span>
        <span style={{ fontSize: 9.5, color: COLORS.dim, textTransform: "uppercase" }}>{h.type}{h.note ? ` · ${h.note}` : ""}</span>
        <span style={{ fontSize: 10.5, color: used >= HERITAGE_SWAP_LIMIT ? COLORS.amber : COLORS.dim, marginLeft: "auto" }}>{used}/{HERITAGE_SWAP_LIMIT} swapped</span>
      </div>
      {h.rule && <Tag color={allowed.ok ? COLORS.dim : COLORS.red}>{h.rule}</Tag>}
      {h.description && <div style={{ marginBottom: 6 }}><RulesText text={h.description} size={11.5} /></div>}
      <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 8 }}>{HERITAGE_RULE}</div>
      {h.features.map(f => {
        const cur = swaps[f.name] || "";
        const full = !cur && used >= HERITAGE_SWAP_LIMIT;
        return (
          <div key={f.name} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: cur ? COLORS.amber : COLORS.muted, minWidth: 140 }}>{f.name}</span>
              {f.replaces ? (
                <span style={{ fontSize: 11.5, color: COLORS.dim }}>Replaces {f.replaces}{cur ? "" : " (not on this species)"}</span>
              ) : (
                <Select value={cur} disabled={full || !sp} onChange={e => pick(f.name, e.target.value)} style={{ width: "auto", minWidth: 180, fontSize: 12, padding: "4px 8px" }} aria-label={`Swap ${f.name} in for`}>
                  <option value="">{full ? "Three swaps used" : "Not taken"}</option>
                  {(sp ? sp.features : []).filter(n => n === cur || !taken.has(n)).map(n => <option key={n} value={n}>In place of {n}</option>)}
                </Select>
              )}
            </div>
            <SpeciesFeatureCard feature={f} color={COLORS.amber} />
          </div>
        );
      })}
    </div>
  );
}

export { RulesText, SpeciesFeatureCard, SpeciesFeatureList, SpeciesTraits, HeritagePicker, HeritageSwaps };
