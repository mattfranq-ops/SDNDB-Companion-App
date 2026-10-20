import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { computeAttacksPerTurn } from "../../engine/derived.js";
import { computeAC, computeArmorDR } from "../../engine/equipment.js";
import { Btn } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";
import { BioTab, ClassesTab, FeatsPickerTab, FeaturesTab, TrainingTab } from "./builder-tabs.jsx";
import { CombatRefTab } from "./combat-tab.jsx";
import { BenefitsOfPowerCard, ConditionsPanel, FormsTab, PowerOverloadCard } from "./forms.jsx";
import { blankChar } from "./model.js";
import { ScouterSheet } from "./scouter-sheet.jsx";
import { StatsTab } from "./stats-tab.jsx";
import { KnownTechniquesTab, useDerivedCharSync } from "./techniques-tab.jsx";
import { InventoryTab, VitalsTab } from "./vitals-gear.jsx";

function FullBuilder({ onSave, onCancel }) {
  const [tab, setTab] = useState("bio");
  const [char, setChar] = useState(blankChar());
  const [customSpeciesInput, setCustomSpeciesInput] = useState("");
  const set = (patch) => setChar(prev => ({ ...prev, ...patch }));
  // Order = creation flow (player feedback): Features right after Class,
  // Combat + Vitals at the end, Summary as the final step before saving.
  const TABS = ["bio", "class", "features", "stats", "feats", "techniques", "forms", "inventory", "training", "combat", "vitals", "summary"];
  const TAB_LABELS = { bio: "Bio", class: "Class", features: "Features", stats: "Stats", feats: "Feats", techniques: "Techniques", forms: "Forms", inventory: "Inventory", training: "Training", combat: "Combat", vitals: "Vitals", summary: "Summary" };
  const tabIndex = TABS.indexOf(tab);

  useDerivedCharSync(char, setChar);
  useEffect(() => {
    setChar(prev => {
      const patch = {};
      if (!prev.acOverride) { const c = computeAC(prev); if (c && c.value !== prev.ac) patch.ac = c.value; }
      if (prev.drOverride !== true) { const d = computeArmorDR(prev); if (d !== prev.dr) patch.dr = d; }
      return Object.keys(patch).length ? { ...prev, ...patch } : prev;
    });
  }, [JSON.stringify(char.classes), char.classId, char.level, char.stats?.dex, char.stats?.con, char.stats?.int, char.stats?.wis, char.acOverride, JSON.stringify(char.equipment), JSON.stringify(char.items), char.drOverride]);
  useEffect(() => {
    const attacks = computeAttacksPerTurn(char);
    if (attacks !== char.attacksPerTurn) setChar(prev => ({ ...prev, attacksPerTurn: attacks }));
  }, [JSON.stringify(char.classes), char.classId, char.level]);

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16 }}>{char.name || "New Character"}</div>
        <Btn size="sm" variant="ghost" onClick={onCancel}><X size={15}/></Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 12px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gold : "transparent"}`, color: tab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      {tab === "bio" && <BioTab char={char} set={set} withName customSpeciesInput={customSpeciesInput} setCustomSpeciesInput={setCustomSpeciesInput} />}

      {tab === "class" && <ClassesTab char={char} set={set} />}

      {tab === "stats" && <StatsTab char={char} set={set} />}

      {tab === "combat" && <CombatRefTab char={char} set={set} />}

      {tab === "vitals" && <VitalsTab char={char} set={set} />}


      {tab === "features" && <FeaturesTab char={char} set={set} />}

      {tab === "feats" && <FeatsPickerTab char={char} set={set} />}

      {tab === "techniques" && (
        <KnownTechniquesTab char={char} set={set} />
      )}

      {tab === "forms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <PowerOverloadCard char={char} />
          <BenefitsOfPowerCard char={char} />
          <FormsTab char={char} set={set} />
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <ConditionsPanel char={char} set={set} />
          </div>
        </div>
      )}

      {tab === "inventory" && <InventoryTab char={char} set={set} />}

      {tab === "training" && <TrainingTab char={char} set={set} />}

      {tab === "summary" && <ScouterSheet char={char} />}

      <div style={{ display: "flex", gap: 8, marginTop: 18, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
        <Btn onClick={() => setTab(TABS[tabIndex - 1])} disabled={tabIndex === 0} style={tabIndex === 0 ? { opacity: 0.4, cursor: "default" } : {}}><ChevronLeft size={14}/> Previous</Btn>
        <Btn onClick={() => setTab(TABS[tabIndex + 1])} disabled={tabIndex === TABS.length - 1} style={tabIndex === TABS.length - 1 ? { opacity: 0.4, cursor: "default" } : {}}>Next <ChevronRight size={14}/></Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="gold" onClick={() => onSave(char)}><Check size={14}/> Save Character</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

export {
  FullBuilder,
};
