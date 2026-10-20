import React, { useState, useRef, useEffect } from "react";
import { Dices, X } from "lucide-react";
import { BOOK_TABLES } from "../data/book-tables.js";
import { NPC_POOLS } from "../data/name-pools.js";
import { BaseTab } from "../features/base/BaseTab.jsx";
import { CharactersTab } from "../features/characters/CharactersTab.jsx";
import { CompendiumTab } from "../features/compendium/compendium.jsx";
import { FeatsTab } from "../features/compendium/feats.jsx";
import { NotesTab } from "../features/compendium/notes.jsx";
import { TechniquesCompendiumTab } from "../features/compendium/techniques.jsx";
import { DmPlaybookTab, GmToolsHub, HighTechCompendiumTab, MateroidsFlavorsTab } from "../features/gmtools/GmToolsHub.jsx";
import { NpcTab } from "../features/npcs/NpcTab.jsx";
import { BuildersTab, WorldRulesTab } from "../features/registry/registry-views.jsx";
import { MapDrawer } from "../features/session/map.jsx";
import { SessionTab } from "../features/session/SessionTab.jsx";
import { BookTableCard, BountyHuntingTab, CustomTablesTab, DowntimeTab, FlavorTableCard, GamblingTab, NameTableCard } from "../features/tables/tables.jsx";
import { UniverseTab } from "../features/universe/store.jsx";
import { roll, uid } from "../lib/dice.js";
import { useEnvGravitySync, useEnvHooksSync, useHouseRules } from "../state/hooks.js";
import { useRegistryMirror } from "../state/registry.js";
import { Btn, Checkbox, ScannerHeader, TextInput } from "../ui/atoms.jsx";
import { COLORS, FONT_IMPORT } from "../ui/theme.js";
import { NAV, _rollBannerSubs, emitRoll, onNav } from "./bus.js";

const ROLL_BANNER_KEY = "sdndbz_roll_banner_v1";
const ROLL_BANNER_DEFAULT = { enabled: true, sticky: false, seconds: 4 };
function useLocalOption(key, def) {
  const [val, setVal] = useState(() => { try { const v = localStorage.getItem(key); return v == null ? def : { ...def, ...JSON.parse(v) }; } catch { return def; } });
  const save = (patch) => setVal(prev => { const next = { ...prev, ...patch }; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ } return next; });
  return [val, save];
}
function RollBannerHost() {
  const [opts] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const optsRef = useRef(opts); optsRef.current = opts;
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const sub = (p) => {
      const o = optsRef.current;
      if (!o.enabled) return;
      const id = uid();
      setToasts(t => [{ id, ...p }, ...t].slice(0, 4));
      if (!o.sticky) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), Math.max(1, o.seconds || 4) * 1000);
    };
    _rollBannerSubs.add(sub);
    return () => _rollBannerSubs.delete(sub);
  }, []);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  if (!toasts.length) return null;
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 300, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: "auto", minWidth: 210, maxWidth: 300, background: COLORS.panel, border: `1px solid ${(t.color || COLORS.gold)}99`, borderRadius: 10, padding: "10px 12px", boxShadow: "0 10px 34px rgba(0,0,0,0.55)", animation: "rollpop .25s ease" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
            <Dices size={13} color={t.color || COLORS.gold} />
            <span style={{ fontWeight: 700, fontSize: 12.5, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.label}</span>
            <span onClick={() => dismiss(t.id)} title="Dismiss" style={{ cursor: "pointer", color: COLORS.dim, display: "flex" }}><X size={14} /></span>
          </div>
          {t.total != null && t.total !== "" && <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 24, color: t.color || COLORS.gold, lineHeight: 1.1 }}>{t.total}</div>}
          {t.detail && <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: COLORS.muted, marginTop: 2 }}>{t.detail}</div>}
        </div>
      ))}
    </div>
  );
}
function OptionsTab() {
  const [opts, save] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const card = { background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, maxWidth: 520 };
  const rowLabel = { fontSize: 12.5, color: COLORS.text };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={card}>
        <div style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Roll Banner</div>
        <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 12 }}>Saved on this device only — it doesn't affect anyone else at the table.</div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
          <Checkbox checked={opts.enabled} onChange={e => save({ enabled: e.target.checked })} />
          <span style={rowLabel}>Show a pop-up with the result when I make a roll</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: opts.enabled ? "pointer" : "default", opacity: opts.enabled ? 1 : 0.5 }}>
          <Checkbox disabled={!opts.enabled} checked={opts.sticky} onChange={e => save({ sticky: e.target.checked })} />
          <span style={rowLabel}>Stay until I dismiss it (otherwise it fades on its own)</span>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: opts.enabled && !opts.sticky ? 1 : 0.5 }}>
          <span style={rowLabel}>Fade after</span>
          <TextInput type="number" value={opts.seconds} disabled={!opts.enabled || opts.sticky} onChange={e => save({ seconds: Math.max(1, Math.min(30, +e.target.value || 4)) })} style={{ width: 64, textAlign: "center" }} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>seconds</span>
          <Btn size="sm" style={{ marginLeft: "auto" }} onClick={() => emitRoll({ label: "Test Roll", total: roll(20), detail: "d20 · sample", color: COLORS.blue })}><Dices size={13} /> Test</Btn>
        </div>
      </div>
    </div>
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

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        @keyframes scanmove { 0% { left:-30%; } 100% { left:130%; } }
        @keyframes rollpop { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform:none; } }
        input:focus, textarea:focus, select:focus { border-color: ${COLORS.blue}88 !important; box-shadow: 0 0 0 2px ${COLORS.blue}22; }
        ::selection { background: ${COLORS.gold}44; }
        details summary::-webkit-details-marker { color: ${COLORS.muted}; }
        /* No native scrollbars anywhere — scrolling still works by wheel/drag/touch. */
        * { scrollbar-width: none; -ms-overflow-style: none; }
        ::-webkit-scrollbar { width: 0; height: 0; display: none; }
      `}</style>

      <div style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.panel, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`, flexShrink: 0 }} />
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 0.5 }}>SDNDBZ COMPANION</div>
      </div>

      <RollBannerHost />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 20px 90px" }}>
        {tab === "players" && <CharactersTab />}
        {tab === "base" && houseRules.baseBuilding && <BaseTab />}
        {tab === "npcs" && <NpcTab />}
        {tab === "session" && <SessionTab />}
        {["players", "npcs", "session"].includes(tab) && <MapDrawer />}
        {tab === "universe" && <UniverseTab />}
        {tab === "gmtools" && (
          gmScreen === null ? <GmToolsHub setScreen={setGmScreen} /> :
          gmScreen === "tables" ? <div><ScannerHeader title="TABLES" subtitle="" onBack={() => setGmScreen(null)} /><TablesScreenInner /></div> :
          gmScreen === "worldrules" ? <div><ScannerHeader title="WORLD & RULES" subtitle="The editable building blocks the app generates and runs on. Toggle, tune, and give them real effects." onBack={() => setGmScreen(null)} /><WorldRulesTab /></div> :
          gmScreen === "builders" ? <div><ScannerHeader title="BUILDERS" subtitle="DM quick-builders: roll a war goal or a raid party, then drop it into play." onBack={() => setGmScreen(null)} /><BuildersTab /></div> :
          gmScreen === "compendium" ? <div><ScannerHeader title="DATA POOL" subtitle="Real book Classes + your custom compendium entries." onBack={() => setGmScreen(null)} /><CompendiumTab /></div> :
          gmScreen === "feats" ? <div><ScannerHeader title="FEATS" subtitle="Every Epic Boon, Fighting Style, General, Heroic, Stance, Trained, and Origin Feat from the book, plus your own homebrew." onBack={() => setGmScreen(null)} /><FeatsTab /></div> :
          gmScreen === "techniques" ? <div><ScannerHeader title="TECHNIQUES" subtitle="Every Generic, Super, External, Misc, and Ultimate Technique from the book." onBack={() => setGmScreen(null)} /><TechniquesCompendiumTab /></div> :
          gmScreen === "notes" ? <div><ScannerHeader title="NOTES" subtitle="" onBack={() => setGmScreen(null)} /><NotesTab /></div> :
          gmScreen === "npcs" ? <div><ScannerHeader title="NPCS" subtitle="" onBack={() => setGmScreen(null)} /><NpcTab /></div> :
          gmScreen === "materoids" ? <div><ScannerHeader title="MATEROIDS FLAVORS" subtitle="Deviant rules & optional content." onBack={() => setGmScreen(null)} /><MateroidsFlavorsTab /></div> :
          gmScreen === "hightech" ? <div><ScannerHeader title="HIGH-TECH PARTS" subtitle="Cybernetic body enhancements for Android / Cyborg / Machine Mutant bodies." onBack={() => setGmScreen(null)} /><HighTechCompendiumTab /></div> :
          gmScreen === "options" ? <div><ScannerHeader title="OPTIONS" subtitle="Personal, per-device settings — not shared with the table." onBack={() => setGmScreen(null)} /><OptionsTab /></div> :
          gmScreen === "playbook" ? <div><ScannerHeader title="DM PLAYBOOK" subtitle="Yoohar's Unofficial 5.0 DM Playbook — encounter design, enemy tactics, house rules." onBack={() => setGmScreen(null)} /><DmPlaybookTab /></div> : null
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.panel, borderTop: `1px solid ${COLORS.border}`, display: "flex" }}>
        {nav.map(n => {
          const active = tab === n.key;
          return (
            <button key={n.key} onClick={() => { setTab(n.key); setGmScreen(null); }} style={{
              flex: 1, background: "transparent", border: "none", cursor: "pointer", padding: "10px 4px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              color: active ? COLORS.gold : COLORS.muted,
            }}>
              <n.icon size={19} />
              <span style={{ fontSize: 10.5, fontWeight: 600 }}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TablesScreenInner() {
  const [sub, setSub] = useState("book");
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
        {[["book","Book Tables"],["downtime","Downtime & Training"],["gambling","Gambling"],["bounty","Bounty Hunting"],["gm","GM Toolkit"],["custom","Custom"]].map(([k,l]) => (
          <button key={k} onClick={() => setSub(k)} style={{ padding: "8px 14px", background: "transparent", border: "none", borderBottom: `2px solid ${sub===k?COLORS.gold:"transparent"}`, color: sub===k?COLORS.gold:COLORS.muted, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      {sub === "book" && BOOK_TABLES.map(t => <BookTableCard key={t.id} table={t} />)}
      {sub === "downtime" && <DowntimeTab />}
      {sub === "gambling" && <GamblingTab />}
      {sub === "bounty" && <BountyHuntingTab />}
      {sub === "gm" && (
        <>
          <NameTableCard />
          <FlavorTableCard title="Homeworld / Planet Flavor" pool={NPC_POOLS.planet} />
          <FlavorTableCard title="NPC Role / Archetype" pool={NPC_POOLS.role} />
          <FlavorTableCard title="Plot Hook" pool={NPC_POOLS.hook} />
        </>
      )}
      {sub === "custom" && <CustomTablesTab />}
    </div>
  );
}

export {
  ROLL_BANNER_KEY,
  ROLL_BANNER_DEFAULT,
  useLocalOption,
  RollBannerHost,
  OptionsTab,
  TablesScreenInner,
};
