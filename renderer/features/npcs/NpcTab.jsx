import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import { _pendingNav, emitRoll, onNav, undoable } from "../../app/bus.js";
import { NPC_TIERS } from "../../data/book-tables.js";
import { NPC_POOLS } from "../../data/name-pools.js";
import { abilityMod } from "../../engine/core.js";
import { pick, roll } from "../../lib/dice.js";
import { useSharedList } from "../../state/hooks.js";
import { Btn, EmptyState, ErrorBanner, Gauge, LoadingBlock, ModeCard, ScannerHeader } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";
import { blankCombatant } from "../session/combat-parts.jsx";
import { FIGHT_TYPES, PartyBaselineEditor, scaledNpc, usePartyBaseline } from "./antagonist.jsx";
import { GuidedNpcCreation, blankNpc, migrateNpc, npcFromBook } from "./creation.jsx";
import { PremadeCasterBrowser } from "./premade-casters.jsx";
import { BookAntagonistBrowser, BulkDeploy, NpcSheet } from "./sheet.jsx";

function NpcTab() {
  const [npcs, persist, error] = useSharedList("npcs_v2");
  const [encounter, persistEncounter] = useSharedList("session_combat");
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState(null);
  const [baseline] = usePartyBaseline();
  // Open the NPC a Session hand-off points at (mirrors the players tab).
  useEffect(() => {
    const apply = (p) => { if (p && p.tab === "npcs" && p.entityId) { setMode(null); setOpenId(p.entityId); } };
    apply(_pendingNav);
    return onNav(apply);
  }, []);
  if (npcs === null || baseline === null) return <LoadingBlock />;

  // Bulk deploy — push chosen saved NPCs (×qty) into the Session initiative
  // tracker as combatants, rolling initiative (d20 + Dex mod) for each.
  const deployToBoard = (picks) => {
    const cur = (encounter && encounter[0]) || { round: 1, turn: 0, combatants: [] };
    const added = [];
    for (const { npc, qty } of picks) {
      for (let i = 0; i < qty; i++) {
        const dexMod = abilityMod(npc.stats?.dex ?? 10);
        added.push({
          ...blankCombatant(),
          name: qty > 1 ? `${npc.name} ${i + 1}` : npc.name,
          // Only 1-of deployments link back to the sheet; duplicates share an id
          // so we'd sync them onto each other — leave those unlinked.
          sourceType: qty === 1 ? "npc" : null, sourceId: qty === 1 ? npc.id : null,
          init: roll(20) + dexMod,
          hp: npc.hp ?? npc.maxHp ?? 20, maxHp: npc.maxHp ?? 20,
          ki: npc.ki ?? 0, maxKi: npc.maxKi ?? 0,
          stamina: npc.stamina ?? 0, maxStamina: npc.maxStamina ?? 0,
          dr: npc.dr ?? 0,
        });
      }
    }
    persistEncounter([{ ...cur, combatants: [...cur.combatants, ...added] }]);
    return added.length;
  };

  const addAndOpen = (n) => { persist([migrateNpc(n), ...npcs]); setOpenId(n.id); setMode(null); };
  const remove = (id) => { const gone = npcs.find(n => n.id === id); undoable(`Deleted ${(gone && gone.name) || "NPC"}`, ["npcs_v2"], () => persist(npcs.filter(n => n.id !== id))); setOpenId(null); };
  const update = (id, patch) => persist(npcs.map(n => n.id === id ? { ...n, ...patch } : n));
  const open = npcs.find(n => n.id === openId);
  const openNpc = open ? migrateNpc(open) : null;

  const quickRoll = () => {
    const n = scaledNpc({ species: pick(NPC_POOLS.species), role: pick(NPC_POOLS.role), tierKey: pick(NPC_TIERS).key, fightTypeKey: pick(FIGHT_TYPES).key, baseline });
    addAndOpen(n);
  };
  if (mode === "book") return (
    <div><ScannerHeader title="FROM THE BOOK" subtitle="Roster of FighterZ — every antagonist, saga by saga" onBack={() => setMode(null)} />
      <BookAntagonistBrowser onPick={(b) => addAndOpen(npcFromBook(b))} /></div>
  );
  if (mode === "casters") return (
    <div><ScannerHeader title="PRE-MADE CASTERS" subtitle="Ready-to-run spellcasters — their Magic tab comes stocked" onBack={() => setMode("menu")} />
      <PremadeCasterBrowser onPick={addAndOpen} /></div>
  );
  if (mode === "guided") return (
    <div><ScannerHeader title="GUIDED NPC CREATION" subtitle="Threat → Identity → Build → Kit → Review (book Ch.1)" onBack={() => setMode(null)} />
      <GuidedNpcCreation onCreate={addAndOpen} onCancel={() => setMode(null)} /></div>
  );
  if (mode === "bulk") return (
    <div><ScannerHeader title="BULK DEPLOY" subtitle="Throw several saved enemies onto the board at once" onBack={() => setMode(null)} />
      <BulkDeploy npcs={npcs} onDeploy={(picks) => { const n = deployToBoard(picks); emitRoll({ label: "Bulk deploy", detail: `${n} combatant${n === 1 ? "" : "s"} added to the encounter` }); setMode(null); }} onCancel={() => setMode(null)} /></div>
  );

  return (
    <div>
      <ScannerHeader title="NPCS" subtitle="Instant statblocks for whoever just walked into the scene." />
      {!open && mode !== "guided" && mode !== "bulk" && <PartyBaselineEditor />}
      {error && <ErrorBanner text={error} />}
      {openNpc ? (
        <NpcSheet key={openNpc.id} npc={openNpc} onUpdate={(patch) => update(openNpc.id, patch)} onRemove={() => remove(openNpc.id)} onClose={() => setOpenId(null)} />
      ) : mode === "menu" ? (
        <div>
          <ModeCard title="From the Book" desc="Roster of FighterZ antagonists — Pilaf Gang to Perfect Cell." onClick={() => setMode("book")} />
          <ModeCard title="Pre-made Casters" desc="Ready-to-run spellcasters with a stocked Magic tab." onClick={() => setMode("casters")} />
          <ModeCard title="Pregenerated" desc="Quick roll — one click, fully randomized." onClick={quickRoll} />
          <ModeCard title="Empty" desc="Blank NPC opened straight into the full editable stat block." onClick={() => { const n = blankNpc({ _startEditing: true }); persist([n, ...npcs]); setOpenId(n.id); setMode(null); }} />
          <ModeCard title="Guided Creation" desc="Pick a threat level and the book builds the antagonist step by step." onClick={() => setMode("guided")} />
          <ModeCard title="Bulk" desc="Deploy several saved enemies onto the board at once." onClick={() => setMode("bulk")} />
          <Btn variant="ghost" onClick={() => setMode(null)}><ArrowLeft size={13}/> Back</Btn>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}><Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New NPC</Btn></div>
          {npcs.length === 0 ? (
            <EmptyState icon={Sparkles} title="No NPCs yet" body="Create one — pregen roll, blank sheet, guided wizard, or bulk generate." action={<Btn variant="gold" onClick={() => setMode("menu")}><Plus size={14}/> New NPC</Btn>} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {npcs.map(n => (
                <div key={n.id} onClick={() => setOpenId(n.id)} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ fontWeight: 700 }}>{n.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{[n.species,n.role,n.tier].filter(Boolean).join(" · ")}</div>
                  <Gauge label="HP" value={n.hp} max={n.maxHp} color={COLORS.red} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export {
  NpcTab,
};
