import { LIFEPATH_TABLES } from "../../data/lifepath-data.js";
import { chargeState, CHARGE_RESET_LABEL } from "../../engine/charges.js";
import { charClasses, charTotalLevel, statMod } from "../../engine/core.js";
import { totalDR } from "../../engine/damage.js";
import { computeAC, equippedEntries } from "../../engine/equipment.js";
import { STAT_KEYS } from "../../engine/skills.js";
import { uid } from "../../lib/dice.js";

/* ===== Duplicate and Print a character =====
   Duplicate makes an independent copy (new id, "(copy)" name, unarchived).
   Print renders a plain one-page sheet into a hidden iframe and opens the
   system print dialog, which also offers "Save as PDF". */

function duplicateChar(char) {
  const copy = JSON.parse(JSON.stringify(char));
  return { ...copy, id: uid(), name: `${char.name || "Fighter"} (copy)`, archived: false };
}

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const signed = (n) => `${n >= 0 ? "+" : ""}${n}`;
const safe = (fn, fallback) => { try { return fn(); } catch { return fallback; } };

function characterPrintHtml(char) {
  const classes = charClasses(char).map(c => `${c.classId} ${c.level}`).join(" / ");
  const ac = safe(() => computeAC(char), null);
  const dr = safe(() => totalDR(char), char.dr || 0);
  const stats = STAT_KEYS.map(k => `<td><b>${k.toUpperCase()}</b><br>${esc((char.stats || {})[k] ?? 10)} (${signed(safe(() => statMod(char, k), 0))})</td>`).join("");
  const techs = (char.techniques || []).map(t => {
    const st = chargeState(t);
    const bits = [t.techType, t.kiRank && `R${t.kiRank}`, t.kiCost, t.damageDice && `${t.damageDice} ${t.damageType || ""}`.trim(), st && `${st.left}/${st.max} uses ${CHARGE_RESET_LABEL[st.reset]}`].filter(Boolean);
    return `<li><b>${esc(t.name)}</b> <span class="dim">${esc(bits.join(" · "))}</span></li>`;
  }).join("");
  const gear = safe(() => equippedEntries(char), []).map(e => `<li>${esc(e.item.name)} <span class="dim">(${esc(e.slotKey)})</span></li>`).join("");
  const feats = (char.feats || []).map(f => `<li>${esc(f.name)}</li>`).join("");
  const lp = char.lifepath || {};
  const lifepath = LIFEPATH_TABLES.filter(t => lp[t.key]).map(t => `<li><span class="dim">${esc(t.label)}:</span> ${esc(lp[t.key])}</li>`).join("");
  const goals = (char.goals || []).map(g => `<li>${g.done ? "☑" : "☐"} ${esc(g.text)}</li>`).join("");
  const people = (char.people || []).map(p => `<li><b>${esc(p.name)}</b> <span class="dim">${esc(p.relation)}</span>${p.notes ? ` · ${esc(p.notes)}` : ""}</li>`).join("");
  const section = (title, body) => body ? `<h2>${title}</h2>${body}` : "";
  const list = (items) => items ? `<ul>${items}</ul>` : "";
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(char.name)}</title><style>
    body { font: 11pt/1.35 system-ui, sans-serif; color: #111; margin: 18mm; }
    h1 { font-size: 20pt; margin: 0; } h2 { font-size: 11pt; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #999; margin: 14px 0 6px; }
    .dim { color: #666; } table { border-collapse: collapse; width: 100%; } td { border: 1px solid #bbb; padding: 4px 6px; text-align: center; }
    ul { margin: 0; padding-left: 18px; } .row { display: flex; gap: 18px; flex-wrap: wrap; } .row div { min-width: 90px; }
    p { white-space: pre-wrap; margin: 4px 0; }
  </style></head><body>
    <h1>${esc(char.name)}</h1>
    <div class="dim">${esc([char.handle && `"${char.handle}"`, char.species, classes, `Level ${charTotalLevel(char)}`].filter(Boolean).join(" · "))}</div>
    <h2>Combat</h2>
    <div class="row">
      <div><b>HP</b> ${esc(char.hp)} / ${esc(char.maxHp)}</div><div><b>Ki</b> ${esc(char.ki)} / ${esc(char.maxKi)}</div>
      <div><b>Stamina</b> ${esc(char.stamina)} / ${esc(char.maxStamina)}</div><div><b>AC</b> ${esc(ac ? ac.value : char.ac)}</div>
      <div><b>DR</b> ${esc(dr)}</div><div><b>Speed</b> ${esc((char.speedBase || 30) + (char.speedExtra || 0))} ft</div>
    </div>
    <h2>Stats</h2><table><tr>${stats}</tr></table>
    ${section("Techniques", list(techs))}
    ${section("Equipped", list(gear))}
    ${section("Feats", list(feats))}
    ${section("Personality", char.personality ? `<p>${esc(char.personality)}</p>` : "")}
    ${section("Lifepath", list(lifepath))}
    ${section("Backstory", char.backstory ? `<p>${esc(char.backstory)}</p>` : "")}
    ${section("Goals", list(goals))}
    ${section("People", list(people))}
    ${section("Notes", char.notes ? `<p>${esc(char.notes)}</p>` : "")}
  </body></html>`;
}

function printCharacter(char) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(frame);
  const doc = frame.contentWindow.document;
  doc.open(); doc.write(characterPrintHtml(char)); doc.close();
  const cleanup = () => setTimeout(() => frame.remove(), 500);
  frame.contentWindow.onafterprint = cleanup;
  setTimeout(() => { frame.contentWindow.focus(); frame.contentWindow.print(); cleanup(); }, 50);
}

export {
  duplicateChar,
  characterPrintHtml,
  printCharacter,
};
