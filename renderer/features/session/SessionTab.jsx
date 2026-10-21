import React, { useState } from "react";
import { useHouseRules } from "../../state/hooks.js";
import { ScannerHeader } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { ClocksTab } from "./clocks.jsx";
import { SessionFeed } from "./combat-parts.jsx";
import { EnvironmentTab } from "./environment-tab.jsx";
import { InitiativeTab, RollsTab } from "./initiative.jsx";
import { QuickCombatTab } from "./quick-combat.jsx";
import { SessionDetailsTab, SessionTimeTab } from "./time.jsx";

function SessionTab() {
  const [sub, setSub] = useState("initiative");
  const [houseRules] = useHouseRules();
  return (
    <div>
      <ScannerHeader title="SESSION" subtitle="Live play state, shared with the table in real time." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
        {[["initiative","Initiative"],["rolls","Rolls"],...(houseRules.quickCombat?[["quickcombat","Quick Combat"]]:[]),["clocks","Clocks"],["environment","Environment"],["time","Calendar"],["details","Session Details"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "initiative" && <InitiativeTab />}
      {sub === "quickcombat" && <QuickCombatTab />}
      {sub === "rolls" && <RollsTab />}
      {sub === "clocks" && <ClocksTab />}
      {sub === "time" && <SessionTimeTab />}
      {sub === "environment" && <EnvironmentTab />}
      {sub === "details" && <SessionDetailsTab />}
      <SessionFeed />
    </div>
  );
}

export {
  SessionTab,
};
