import React, { useState, useEffect } from "react";
import { QuickDice } from "./QuickDice.jsx";
import { RotateCcw, WifiOff } from "lucide-react";
import { BaseTab } from "../features/base/BaseTab.jsx";
import { CraftingScreen } from "../features/crafting/crafting.jsx";
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
import { NAV, onNav, onUndo } from "./bus.js";
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
    <header className="sd-appheader" style={{ position: "sticky", top: 0, zIndex: 200, borderBottom: `1px solid ${COLORS.border}`, background: `${COLORS.panel}F2`, backdropFilter: "blur(8px)", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <div aria-hidden style={{ width: 28, height: 28, clipPath: chamfer(7), background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.onAccent, boxShadow: `0 0 0 3px ${COLORS.gold}` }} />
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 13.5, letterSpacing: 1.2 }}>SDNDBZ COMPANION</div>
        <div className="sd-appheader-sub" style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: COLORS.dim, letterSpacing: 1.4 }}>SUPER DUNGEONS & DRAGONBALL</div>
      </div>
      <div style={{ flex: 1 }} />
      <TableStatus />
    </header>
  );
}

// Shown when the connection to the table drops: the screens keep the last
// copy they had, but nothing saves until it comes back.
function ConnectionBanner() {
  const [down, setDown] = useState(false);
  useEffect(() => {
    let timer = null, seen = false;
    // Reconnect attempts repeat "offline"; only the first one starts the clock.
    const off = window.storage.onStatus((live) => {
      if (live) { clearTimeout(timer); timer = null; seen = true; setDown(false); }
      else if (seen && !timer) timer = setTimeout(() => setDown(true), 2500);
    });
    return () => { clearTimeout(timer); off(); };
  }, []);
  if (!down) return null;
  return (
    <div role="alert" style={{ position: "sticky", top: 49, zIndex: 190, background: `${COLORS.amber}1F`, borderBottom: `1px solid ${COLORS.amber}66`, color: COLORS.text, fontSize: 12.5, padding: "7px 16px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(6px)" }}>
      <WifiOff size={15} color={COLORS.amber} />
      <span style={{ flex: 1 }}><b style={{ color: COLORS.amber }}>Lost the table.</b> You're seeing the last saved copy. Changes won't save until it reconnects, which it keeps trying to do.</span>
    </div>
  );
}

// "Hit Kael · Undo" for a few seconds after anything undoable (bus.js).
function UndoHost() {
  const [item, setItem] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let timer = null;
    const off = onUndo((u) => { clearTimeout(timer); setItem(u); timer = setTimeout(() => setItem(null), 7000); });
    return () => { clearTimeout(timer); off(); };
  }, []);
  if (!item) return null;
  const undo = async () => { setBusy(true); try { await item.restore(); } finally { setBusy(false); setItem(null); } };
  return (
    <div role="status" style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: "calc(84px + env(safe-area-inset-bottom))", zIndex: 170, display: "flex", alignItems: "center", gap: 12, background: COLORS.panel2, border: `1px solid ${COLORS.borderLit}`, borderRadius: 10, padding: item.restore ? "8px 8px 8px 14px" : "11px 14px", boxShadow: "0 10px 30px rgba(0,0,0,.55)", maxWidth: "calc(100vw - 150px)", animation: "rollpop .2s ease" }}>
      <span style={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
      {item.restore && <button onClick={undo} disabled={busy} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", background: `${COLORS.gold}1A`, border: `1px solid ${COLORS.gold}66`, color: COLORS.gold, borderRadius: 6, padding: "7px 12px", fontWeight: 700, fontSize: 13 }}><RotateCcw size={14} /> Undo</button>}
    </div>
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
            <span className="sd-navlabel" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>{n.label}</span>
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
  // The Base and Crafting tabs are Materoids flavors, only in the nav when their rule is on.
  const nav = NAV.filter(n => (n.key !== "base" || houseRules.baseBuilding) && (n.key !== "crafting" || houseRules.crafting));

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
      <ConnectionBanner />
      <RollBannerHost />

      <main className="sd-main" style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 20px 96px" }}>
        <ErrorBoundary key={`${tab}:${gmScreen || ""}`}>
          <div className="sd-screen">
            {tab === "players" && <CharactersTab />}
            {tab === "base" && houseRules.baseBuilding && <BaseTab />}
            {tab === "crafting" && houseRules.crafting && <CraftingScreen />}
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

      <QuickDice />
      <UndoHost />
      <BottomNav nav={nav} tab={tab} onSelect={select} />
    </div>
  );
}
