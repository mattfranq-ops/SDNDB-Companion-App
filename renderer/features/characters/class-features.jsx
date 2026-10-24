import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CLASS_DATA, classFeature } from "../../data/class-data.js";
import { STAT_MOD_LABEL, profBonusForLevel } from "../../engine/core.js";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ===== Class features from the 5.0 book =====
   The class table, each feature's rules text (click a feature to read it), and
   the class's hit die, Ki Modifier, saves and proficiencies. Used by the class
   picker, the Features tab, the level-up dialog and the Compendium. */

const UD_LABEL = { magic: "Magic", prof: "Proficiency" };
const ordinal = (n) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;
const tokens = (text) => String(text || "").split(",").map(s => s.trim()).filter(Boolean);

// One feature's rules text, with its options (Quips, Combat Maneuvers…) folded.
function FeatureRules({ feature }) {
  const [showOpts, setShowOpts] = useState(false);
  if (!feature) return <div style={{ fontSize: 12, color: COLORS.dim }}>No rules text in the book for this one.</div>;
  const opts = feature.options || [];
  return (
    <div style={{ fontSize: 12.5, color: COLORS.text, lineHeight: 1.6 }}>
      <div>{feature.text}</div>
      {opts.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button onClick={() => setShowOpts(o => !o)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.blue, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            {showOpts ? <ChevronDown size={13} /> : <ChevronRight size={13} />} {opts.length} option{opts.length > 1 ? "s" : ""}
          </button>
          {showOpts && opts.map((o, i) => (
            <div key={i} style={{ marginTop: 8, paddingLeft: 10, borderLeft: `2px solid ${COLORS.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{o.name}</div>
              {o.text && <div style={{ color: COLORS.muted }}>{o.text}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// A level's Features cell as buttons; clicking one opens its rules underneath.
function FeatureList({ classId, text, color = COLORS.blue, initialOpen = null }) {
  const [open, setOpen] = useState(initialOpen);
  const list = tokens(text);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {list.map(t => {
          const on = open === t;
          return (
            <button key={t} onClick={() => setOpen(on ? null : t)} aria-expanded={on}
              style={{ cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "4px 9px", borderRadius: 4,
                background: on ? `${color}30` : `${color}14`, color, border: `1px solid ${on ? color : color + "55"}` }}>
              {t}
            </button>
          );
        })}
      </div>
      {open && (
        <div style={{ marginTop: 8, background: COLORS.panel2, border: `1px solid ${color}44`, borderRadius: 6, padding: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 4, color }}>{open}</div>
          <FeatureRules feature={classFeature(classId, open)} />
        </div>
      )}
    </div>
  );
}

// Every feature in a Features cell with its rules written out (level-up dialog).
function FeatureRulesList({ classId, text }) {
  return tokens(text).map(t => (
    <div key={t} style={{ marginTop: 8 }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{t}</div>
      <FeatureRules feature={classFeature(classId, t)} />
    </div>
  ));
}

function ClassSummary({ classId }) {
  const c = CLASS_DATA[classId];
  if (!c) return null;
  const p = c.proficiencies || {};
  const row = (label, val) => val ? (
    <div style={{ display: "flex", gap: 8, fontSize: 12, lineHeight: 1.5 }}>
      <span style={{ color: COLORS.muted, minWidth: 92, flexShrink: 0 }}>{label}</span><span style={{ color: COLORS.text }}>{val}</span>
    </div>
  ) : null;
  const ud = c.unarmoredDefense && (UD_LABEL[c.unarmoredDefense] || { str: "Strength", dex: "Dexterity", con: "Constitution", int: "Intelligence", wis: "Wisdom", cha: "Charisma" }[c.unarmoredDefense]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {row("Hit Die", `${c.hitDie} per level · ${parseInt(c.hitDie.slice(1), 10)} + CON at 1st`)}
      {row("Ki Modifier", c.kiModifier != null ? `+${c.kiModifier}` : null)}
      {row("Saves", (c.saves || []).map(s => STAT_MOD_LABEL[s]).join(", "))}
      {row("Unarmed", [c.unarmedCombat && `Unarmed Combat (${c.unarmedCombat})`, ud && `Unarmored Defense (${ud})`].filter(Boolean).join(" · "))}
      {row("Armor", p.armor)}
      {row("Weapons", p.weapons)}
      {row("Tools", p.tools)}
      {row("Skills", p.skills)}
      {row("Equipment", c.equipment)}
    </div>
  );
}

// The class table: level, Proficiency, features (clickable) and the extra columns.
function ClassTable({ classId, level = 20, upTo = 20 }) {
  const c = CLASS_DATA[classId];
  const [open, setOpen] = useState(null); // { lvl, token }
  if (!c) return null;
  const cols = c.columns || [];
  const th = { padding: "6px 8px", fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, textAlign: "left", borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" };
  const td = { padding: "5px 8px", fontSize: 12, borderBottom: `1px solid ${COLORS.border}`, verticalAlign: "top" };
  const rows = Array.from({ length: Math.min(20, upTo) }, (_, i) => i + 1);
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 520 }}>
        <thead>
          <tr>
            <th style={th}>Level</th><th style={th}>Prof</th><th style={{ ...th, width: "100%" }}>Features</th>
            {cols.map(col => <th key={col.label} style={{ ...th, textAlign: "center" }}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(l => {
            const here = l === level, reached = l <= level;
            const isOpen = open && open.lvl === l;
            return (
              <React.Fragment key={l}>
                <tr style={{ background: here ? `${COLORS.gold}14` : "transparent", opacity: reached ? 1 : 0.6 }}>
                  <td style={{ ...td, fontFamily: FONTS.mono, color: here ? COLORS.gold : COLORS.blue, fontWeight: 700 }}>{ordinal(l)}</td>
                  <td style={{ ...td, fontFamily: FONTS.mono }}>+{profBonusForLevel(l)}</td>
                  <td style={td}>
                    {tokens(c.featuresByLevel[l]).map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && <span style={{ color: COLORS.dim }}>, </span>}
                        <button onClick={() => setOpen(isOpen && open.token === t ? null : { lvl: l, token: t })}
                          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, color: isOpen && open.token === t ? COLORS.gold : COLORS.text, textDecoration: "underline dotted", textUnderlineOffset: 3 }}>{t}</button>
                      </React.Fragment>
                    ))}
                  </td>
                  {cols.map(col => <td key={col.label} style={{ ...td, textAlign: "center", fontFamily: FONTS.mono }}>{col.values[l - 1] ?? "—"}</td>)}
                </tr>
                {isOpen && (
                  <tr>
                    <td colSpan={3 + cols.length} style={{ ...td, background: COLORS.panel2 }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 4, color: COLORS.gold }}>{open.token}</div>
                      <FeatureRules feature={classFeature(classId, open.token)} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export {
  FeatureRules,
  FeatureList,
  FeatureRulesList,
  ClassSummary,
  ClassTable,
};
