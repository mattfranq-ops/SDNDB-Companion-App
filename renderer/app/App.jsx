import React, { useState, useEffect } from "react";
import { BaseTab } from "../features/base/BaseTab.jsx";
import { CharactersTab } from "../features/characters/CharactersTab.jsx";
import { CompendiumTab } from "../features/compendium/compendium.jsx";
import { EquipmentCompendiumTab } from "../features/compendium/gear.jsx";
import { FeatsTab } from "../features/compendium/feats.jsx";
import { NotesTab } from "../features/compendium/notes.jsx";
import { TechniquesCompendiumTab } from "../features/compendium/techniques.jsx";
import { DmPlaybookTab, GmToolsHub, HighTechCompendiumTab, MateroidsFlavorsTab } from "../features/gmtools/GmToolsHub.jsx";
import { NpcTab } from "../features/npcs/NpcTab.jsx";
import { BuildersTab, WorldRulesTab } from "../features/registry/registry-views.jsx";
import { MapDrawer } from "../features/session/map.jsx";
import { SessionTab } from "../features/session/SessionTab.jsx";
import { TablesScreen } from "../features/tables/tables.jsx";
import { UniverseTab } from "../features/universe/store.jsx";
import { useEnvGravitySync, useEnvHooksSync, useHouseRules } from "../state/hooks.js";
import { useRegistryMirror } from "../state/registry.js";
import { ScannerHeader, chamfer } from "../ui/atoms.jsx";
import { COLORS, FONTS } from "../ui/theme.js";
import { NAV, onNav } from "./bus.js";
import { ErrorBoundary } from "./ErrorBoundary.jsx";
import { globalCss } from "./global-css.js";
import { OptionsTab } from "./OptionsTab.jsx";
import { RollBannerHost } from "./RollBanner.jsx";
import { TableStatus } from "./TableStatus.jsx";

// Compendium sub-screens, opened from the GmToolsHub tiles.
const GM_SCREENS = {
  worldrules: { title: "WORLD & RULES", subtitle: "The editable building blocks the app generates and runs on. Toggle, tune, and give them real effects.", Component: WorldRulesTab },
  builders: { title: "BUILDERS", subtitle: "DM quick-builders: roll a war goal or a raid party, then drop it into play.", Component: BuildersTab },
  compendium: { title: "DATA POOL", subtitle: "Real book Classes + your custom compendium entries.", Component: CompendiumTab },
  feats: { title: "FEATS", subtitle: "Every Epic Boon, Fighting Style, General, Heroic, Stance, Trained, Origin and Biology Feat from the book, plus your own homebrew.", Component: FeatsTab },
  equipment: { title: "EQUIPMENT", subtitle: "Every weapon, piece of gear, consumable, enchantment, heroic item, marvel, mech and vehicle from Ch.9.", Component: EquipmentCompendiumTab },
  techniques: { title: "TECHNIQUES", subtitle: "Every Generic, Super, External, Misc, and Ultimate Technique from the book.", Component: TechniquesCompendiumTab },
  notes: { title: "NOTES", subtitle: "", Component: NotesTab },
  npcs: { title: "NPCS", subtitle: "", Component: NpcTab },
  materoids: { title: "MATEROIDS FLAVORS", subtitle: "Deviant rules & optional content.", Component: MateroidsFlavorsTab },
  hightech: { title: "HIGH-TECH PARTS", subtitle: "Cybernetic body enhancements for Android / Cyborg / Machine Mutant bodies.", Component: HighTechCompendiumTab },
  options: { title: "OPTIONS", subtitle: "Personal, per-device settings — not shared with the table.", Component: OptionsTab },
  playbook: { title: "DM PLAYBOOK", subtitle: "Yoohar's Unofficial 5.0 DM Playbook — encounter design, enemy tactics, house rules.", Component: DmPlaybookTab },
};

function GmScreen({ screen, onBack }) {
  if (screen === "tables") return <TablesScreen onBack={onBack} />;
  const def = GM_SCREENS[screen];
  if (!def) return null;
  const { title, subtitle, Component } = def;
  return <div><ScannerHeader title={title} subtitle={subtitle} onBack={onBack} /><Component /></div>;
}

function AppHeader() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 200, borderBottom: `1px solid ${COLORS.border}`, background: `${COLORS.panel}F2`, backdropFilter: "blur(8px)", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <div aria-hidden style={{ width: 28, height: 28, clipPath: chamfer(7), background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.onAccent, boxShadow: `0 0 0 3px ${COLORS.gold}` }} />
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 13.5, letterSpacing: 1.2 }}>SDNDBZ COMPANION</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: COLORS.dim, letterSpacing: 1.4 }}>SUPER DUNGEONS & DRAGONBALL</div>
      </div>
      <div style={{ flex: 1 }} />
      <TableStatus />
    </header>
  );
}

function BottomNav({ nav, tab, onSelect }) {
  return (
    <nav aria-label="Sections" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 150, background: `${COLORS.panel}F7`, backdropFilter: "blur(8px)", borderTop: `1px solid ${COLORS.border}`, display: "flex", paddingBottom: "env(safe-area-inset-bottom)" }}>
      {nav.map((n, i) => {
        const active = tab === n.key;
        return (
          <button key={n.key} onClick={() => onSelect(n.key)} aria-current={active ? "page" : undefined} title={`${n.label} (Alt+${i + 1})`} style={{
            position: "relative", flex: 1, background: active ? `linear-gradient(180deg, ${COLORS.gold}14, transparent)` : "transparent", border: "none", cursor: "pointer", padding: "10px 4px 9px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: active ? COLORS.gold : COLORS.muted, transition: "color .15s",
          }}>
            <span style={{ position: "absolute", top: -1, left: "22%", right: "22%", height: 2, background: active ? COLORS.gold : "transparent", boxShadow: active ? `0 0 10px ${COLORS.gold}` : "none" }} />
            <n.icon size={19} />
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>{n.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  const [tab, setTab] = useState("players");
  const [gmScreen, setGmScreen] = useState(null); // null = hub
  const [houseRules] = useHouseRules();
  // The Base tab is a Materoids flavor — only in the nav when the rule is on.
  const nav = NAV.filter(n => n.key !== "base" || houseRules.baseBuilding);

  // Mirror the current world's gravity so Weighted math is live on every tab.
  useEnvGravitySync();
  useEnvHooksSync();
  useRegistryMirror();

  // A Session hand-off (Target/Feature/Cast) switches the bottom-nav tab.
  useEffect(() => onNav(p => { if (p.tab) setTab(p.tab); }), []);

  const select = (key) => { setTab(key); setGmScreen(null); };

  // Alt+1…6 jumps between sections.
  useEffect(() => {
    const onKey = (e) => {
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      const n = nav[Number(e.key) - 1];
      if (n) { e.preventDefault(); select(n.key); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at 50% -10%, ${COLORS.blue}0C, transparent 55%), ${COLORS.bg}`, color: COLORS.text, fontFamily: FONTS.body }}>
      <style>{globalCss()}</style>
      <AppHeader />
      <RollBannerHost />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 20px 96px" }}>
        <ErrorBoundary key={`${tab}:${gmScreen || ""}`}>
          <div className="sd-screen">
            {tab === "players" && <CharactersTab />}
            {tab === "base" && houseRules.baseBuilding && <BaseTab />}
            {tab === "npcs" && <NpcTab />}
            {tab === "session" && <SessionTab />}
            {tab === "universe" && <UniverseTab />}
            {tab === "gmtools" && (gmScreen === null
              ? <GmToolsHub setScreen={setGmScreen} />
              : <GmScreen screen={gmScreen} onBack={() => setGmScreen(null)} />)}
          </div>
        </ErrorBoundary>
        {["players", "npcs", "session"].includes(tab) && <ErrorBoundary key="map"><MapDrawer /></ErrorBoundary>}
      </main>

      <BottomNav nav={nav} tab={tab} onSelect={select} />
    </div>
  );
}
