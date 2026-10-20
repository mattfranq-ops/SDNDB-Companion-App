import React from "react";
import { Home as HomeIcon } from "lucide-react";
import { CONDITIONS_DATA, activeForms, benefitsOfPower, charClasses, charTotalLevel, computeKiRank, effectivePowerBonus, effectiveStats, profBonusForLevel, statMod } from "../../engine/core.js";
import { cyberneticKiControlPenalty, cyberneticLimit, cyberneticsUsed, installedParts } from "../../engine/cybernetics.js";
import { computeAttacksPerTurn, computeCarryWeight, computeOverload, computePassives, computePowerLevel, computeTechRefs, powerDR } from "../../engine/derived.js";
import { computeAC, computeArmorDR, computeWeighted, equippedEntries } from "../../engine/equipment.js";
import { SKILL_LIST, STAT_KEYS, computeSaveBonus, computeSkillBonus } from "../../engine/skills.js";
import { activeAura, isCaster, spellStats } from "../../engine/spellcasting.js";
import { gravAcclimRanks, gravityColor } from "../../engine/universe.js";
import { useHouseRules } from "../../state/hooks.js";
import { Tag } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { BodyFigure } from "./items.jsx";

// Scouter sheet — dense, read-only, everything-computed overview of a character.
// Pure assembly off the existing compute functions (no new math, no mutation), so
// it always matches the live sheet. Techniques and Feats get their own full-width
// space (table directive). Scouter-HUD look: cyan labels, mono/Orbitron numbers.
const SC = {
  card: { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 12 },
  head: { fontSize: 10, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  label: { fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 0.5 },
  mono: { fontFamily: "JetBrains Mono, monospace" },
};
function ScTile({ label, value, sub, color = COLORS.text }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", minWidth: 0 }}>
      <div style={SC.label}>{label}</div>
      <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 17, color, lineHeight: 1.1 }}>{value}</div>
      {sub != null && <div style={{ fontSize: 8.5, color: COLORS.dim }}>{sub}</div>}
    </div>
  );
}
function ScProfDot({ state }) {
  const c = state === "expertise" ? COLORS.blue : state === "prof" || state === true ? COLORS.gold : "transparent";
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, border: `1px solid ${c === "transparent" ? COLORS.dim : c}`, display: "inline-block", flexShrink: 0 }} />;
}
function ScouterSheet({ char }) {
  const [houseRules] = useHouseRules();
  const prof = profBonusForLevel(charTotalLevel(char));
  const power = computePowerLevel(char, houseRules.powerSystem);
  const pas = computePassives(char);
  const ac = computeAC(char);
  const dr = (char.drOverride === true ? (char.dr || 0) : computeArmorDR(char)) + powerDR(char);
  const bop = benefitsOfPower(char);
  const eff = effectivePowerBonus(char);
  const over = computeOverload(char);
  const speed = Math.max(0, (char.speedBase || 30) + (char.speedExtra || 0) + computeWeighted(char).net * 10 + bop.physical * 5);
  const forms = activeForms(char);
  const caster = isCaster(char);
  const ss = caster ? spellStats(char) : null;
  const resources = char.resources || [];
  const techs = char.techniques || [];
  const feats = char.feats || [];
  const refByType = Object.fromEntries(computeTechRefs(char).map(r => [r.type, r]));
  const classLine = charClasses(char).map(c => `${c.classId} ${c.level}`).join(" · ") || "—";
  const equipped = equippedEntries(char);
  const conds = Object.entries(char.activeConditions || {}).filter(([, v]) => v).map(([k]) => CONDITIONS_DATA.find(c => c.id === k)?.name || k).concat(char.conditions || []);
  const injuries = char.injuries || [];
  const aura = activeAura(char);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header — figure + identity + the scouter's signature Power readout */}
      <div style={{ ...SC.card, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        {char.pictureUrl && <img src={char.pictureUrl} alt="" style={{ width: 96, height: 96, borderRadius: 12, objectFit: "cover", border: `1px solid ${COLORS.border}`, flexShrink: 0 }} onError={e => { e.currentTarget.style.display = "none"; }} />}
        <div style={{ position: "relative", width: 66, height: 101, flexShrink: 0 }}><BodyFigure aura={aura} stroke={aura || COLORS.blue} /></div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>{char.name || "—"}</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{classLine} · {char.species || "—"}{char.subspecies ? ` (${char.subspecies})` : ""}</div>
          <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 2 }}>Lv {charTotalLevel(char)} · Ki Rank {computeKiRank(char)} · Prof +{prof}{char.alignment ? ` · ${char.alignment}` : ""}{char.heritage ? ` · ${char.heritage}` : ""}</div>
          {(char.homeworld || (houseRules.gravityAcclimation && char.accustomedGravity > 0)) && (
            <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 2, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              <HomeIcon size={11} style={{ color: COLORS.gold }} />
              <span>Home: <span style={{ color: COLORS.text }}>{char.homeworld || "—"}</span>{houseRules.gravityAcclimation && char.accustomedGravity > 0 ? <span style={{ color: gravityColor(char.accustomedGravity) }}> · handles {char.accustomedGravity}×g</span> : null}</span>
              {houseRules.gravityAcclimation && gravAcclimRanks(char.accustomedGravity) > 0 && <Tag color={COLORS.green}>Lightweight +{gravAcclimRanks(char.accustomedGravity)}</Tag>}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right", minWidth: 120 }}>
          <div style={SC.label}>{power.label}</div>
          <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 26, color: COLORS.gold, lineHeight: 1 }}>{power.value.toLocaleString()}</div>
          <div style={{ ...SC.label, marginTop: 4 }}>Carry {computeCarryWeight(char).toLocaleString()} lb</div>
        </div>
      </div>

      {/* Vitals + defenses */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(74px,1fr))", gap: 8 }}>
        <ScTile label="HP" value={`${char.hp ?? 0}`} sub={`/ ${char.maxHp ?? 0}`} color={COLORS.red} />
        <ScTile label="Ki" value={`${char.ki ?? 0}`} sub={`/ ${char.maxKi ?? 0}`} color={COLORS.blue} />
        <ScTile label="Stamina" value={`${char.stamina ?? 0}`} sub={`/ ${char.maxStamina ?? 0}`} color={COLORS.gold} />
        <ScTile label="AC" value={char.acOverride ? char.ac : (ac ? ac.value : char.ac)} color={COLORS.text} />
        <ScTile label="DR" value={dr} color={COLORS.text} />
        <ScTile label="Speed" value={`${speed}`} sub="ft" />
        <ScTile label="Atk/Turn" value={computeAttacksPerTurn(char)} />
        <ScTile label="Power" value={`${eff >= 0 ? "+" : ""}${eff}`} sub={over.over > 0 ? `overload ${over.over}` : "stable"} color={over.over > 0 ? COLORS.amber : COLORS.green} />
      </div>

      {/* Abilities + Saving Throws */}
      <div style={SC.card}>
        <div style={SC.head}>Abilities &amp; Saves</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {STAT_KEYS.map(k => {
            const mod = statMod(char, k);
            const save = computeSaveBonus(char, k);
            return (
              <div key={k} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                <div style={SC.label}>{k}</div>
                <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}>{mod >= 0 ? "+" : ""}{mod}</div>
                <div style={{ ...SC.mono, fontSize: 10, color: COLORS.muted }}>{effectiveStats(char)[k]}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center", marginTop: 4, fontSize: 10, color: save.proficient ? COLORS.gold : COLORS.dim }}>
                  <ScProfDot state={save.proficient} /> save {save.value >= 0 ? "+" : ""}{save.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      <div style={SC.card}>
        <div style={SC.head}>Skills</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: "3px 14px" }}>
          {STAT_KEYS.flatMap(k => (SKILL_LIST[k] || []).map(skill => {
            const sk = computeSkillBonus(char, skill);
            return (
              <div key={skill} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, padding: "2px 0" }}>
                <ScProfDot state={sk.state} />
                <span style={{ flex: 1, color: sk.state !== "none" ? COLORS.text : COLORS.muted }}>{skill}</span>
                <span style={{ ...SC.mono, color: sk.state !== "none" ? COLORS.gold : COLORS.dim }}>{sk.value >= 0 ? "+" : ""}{sk.value}</span>
              </div>
            );
          }))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 8, borderTop: `1px solid ${COLORS.border}`, flexWrap: "wrap", fontSize: 11, color: COLORS.muted }}>
          <span><span style={SC.label}>Passive Perc</span> {pas.perception}</span>
          <span><span style={SC.label}>Insight</span> {pas.insight}</span>
          <span><span style={SC.label}>Stealth</span> {pas.stealth}</span>
          <span><span style={SC.label}>Ki Stealth</span> {pas.kiStealth}</span>
        </div>
      </div>

      {/* Power / Benefits / Forms */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <div style={SC.card}>
          <div style={SC.head}>Power</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div><span style={SC.label}>Effective Bonus</span> <span style={{ color: COLORS.gold, fontWeight: 700 }}>{eff >= 0 ? "+" : ""}{eff}</span></div>
            <div><span style={SC.label}>Overload</span> threshold {over.threshold} · <span style={{ color: over.over > 0 ? COLORS.amber : COLORS.green }}>{over.over > 0 ? `over by ${over.over} (${over.damage} dmg)` : "stable"}</span></div>
            <div><span style={SC.label}>{power.label}</span> {power.value.toLocaleString()}</div>
          </div>
        </div>
        <div style={SC.card}>
          <div style={SC.head}>Benefits of Power</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px", fontSize: 11.5 }}>
            <span><span style={SC.label}>Energy</span> {bop.energy}</span>
            <span><span style={SC.label}>Toughness</span> {bop.toughness}</span>
            <span><span style={SC.label}>Physical</span> {bop.physical}</span>
            <span><span style={SC.label}>Extra</span> {bop.extra}</span>
          </div>
        </div>
        {forms.length > 0 && (
          <div style={SC.card}>
            <div style={SC.head}>Active Forms</div>
            {forms.map(f => (
              <div key={f.id} style={{ fontSize: 11.5, marginBottom: 3 }}>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>{f.name}</span>
                <span style={{ color: COLORS.dim }}> · +{f.powerBonus || 0} pwr{f.multiplier ? ` · ×${f.multiplier}` : ""}{f.upkeepCost ? ` · ${f.upkeepCost} Ki upkeep` : ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Techniques — own space */}
      <div style={SC.card}>
        <div style={SC.head}>Techniques — {techs.length}</div>
        {techs.length === 0 ? <div style={{ color: COLORS.dim, fontSize: 12 }}>None known.</div> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {techs.map(t => {
              const ref = refByType[t.techType];
              const res = t.resolution === "attack" ? `+${ref ? ref.atk : 0} atk` : t.resolution === "save" ? `DC ${ref ? ref.dc : 0}${t.saveAbility ? ` ${t.saveAbility.slice(0, 3)}` : ""}` : "utility";
              return (
                <div key={t.uid} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 11.5, padding: "3px 0", borderTop: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontWeight: 700, flex: 1, minWidth: 0 }}>{t.name}{t.mastery ? <span style={{ color: COLORS.gold }}> {"★".repeat(t.mastery)}</span> : ""}</span>
                  <span style={{ ...SC.label, width: 62, textAlign: "right" }}>{t.techType} R{t.kiRank}</span>
                  <span style={{ ...SC.mono, color: COLORS.dim, width: 70, textAlign: "right" }}>{t.kiCost || "—"}</span>
                  <span style={{ ...SC.mono, color: COLORS.blue, width: 92, textAlign: "right" }}>{res}</span>
                  <span style={{ ...SC.mono, color: COLORS.muted, width: 78, textAlign: "right" }}>{t.damageDice || ""}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feats — own space */}
      <div style={SC.card}>
        <div style={SC.head}>Feats — {feats.length}</div>
        {feats.length === 0 ? <div style={{ color: COLORS.dim, fontSize: 12 }}>None taken.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "3px 14px" }}>
            {feats.map((f, i) => (
              <div key={f.id || i} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ fontWeight: 700, flex: 1 }}>{typeof f === "string" ? f : (f.name || "—")}</span>
                {f.list && <span style={SC.label}>{f.list}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resources + Spellcasting */}
      {(resources.length > 0 || caster) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          {resources.length > 0 && (
            <div style={SC.card}>
              <div style={SC.head}>Resources</div>
              {resources.map(r => (
                <div key={r.id} style={{ display: "flex", fontSize: 11.5, padding: "2px 0" }}>
                  <span style={{ flex: 1 }}>{r.name}{r.die ? <span style={{ color: COLORS.blue }}> {r.die}</span> : ""}</span>
                  <span style={SC.mono}>{r.current ?? 0} / {r.max}</span>
                </div>
              ))}
            </div>
          )}
          {caster && (
            <div style={SC.card}>
              <div style={SC.head}>Spellcasting</div>
              <div style={{ fontSize: 11.5, lineHeight: 1.8 }}>
                <div><span style={SC.label}>Save DC</span> {ss.saveDC} · <span style={SC.label}>Attack</span> +{ss.attack} · <span style={SC.label}>{ss.ability}</span></div>
                <div><span style={SC.label}>Cantrips</span> {(char.spellcasting?.cantrips || []).length} · <span style={SC.label}>Spells</span> {(char.spellcasting?.spells || []).length}</div>
                {(char.spellcasting?.slots || []).length > 0 && <div><span style={SC.label}>Slots</span> {char.spellcasting.slots.map(s => `${s.current}/${s.max}`).join(" · ")}</div>}
                {(char.spellcasting?.pools || []).map(p => <div key={p.id}><span style={SC.label}>{p.name}</span> {p.current}/{p.max}</div>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Equipment */}
      {equipped.length > 0 && (
        <div style={SC.card}>
          <div style={SC.head}>Equipped</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "3px 14px" }}>
            {equipped.map(e => (
              <div key={e.slotKey} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ ...SC.label, width: 60, flexShrink: 0 }}>{e.slotKey}</span>
                <span style={{ flex: 1, color: COLORS.text }}>{e.item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cybernetics */}
      {(char.cybernetics || []).length > 0 && (
        <div style={SC.card}>
          <div style={SC.head}>Cybernetics — {cyberneticsUsed(char)} / {cyberneticLimit(char)}{cyberneticKiControlPenalty(char) > 0 ? ` · −${cyberneticKiControlPenalty(char)} Ki Control` : ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "3px 14px" }}>
            {installedParts(char).map(({ uid: u, signature, def }) => (
              <div key={u} style={{ fontSize: 11.5, display: "flex", gap: 6 }}>
                <span style={{ flex: 1, color: COLORS.text }}>{def.name}</span>
                {signature && <span style={{ color: COLORS.gold }}>★</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditions & Injuries */}
      {(conds.length > 0 || injuries.length > 0) && (
        <div style={SC.card}>
          <div style={SC.head}>Status</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {conds.map((c, i) => <Tag key={"c" + i} color={COLORS.amber}>{c}</Tag>)}
            {injuries.map(inj => <Tag key={inj.id} color={COLORS.red}>{inj.name}</Tag>)}
          </div>
        </div>
      )}
    </div>
  );
}

export {
  SC,
  ScTile,
  ScProfDot,
  ScouterSheet,
};
