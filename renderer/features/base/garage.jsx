import React, { useState } from "react";
import { ArrowUpCircle, Car, Hammer, Swords, Wrench } from "lucide-react";
import { logSession, notify } from "../../app/bus.js";
import { baseBonuses } from "../../engine/base.js";
import {
  VEHICLE_MODS, addMod, damageVehicle, isVehicleItem, modCost, repairCost,
  repairVehicle, tierUpItem, tierUpTarget, vehicleCombatant, vehicleStats,
} from "../../engine/vehicles.js";
import { roll, uid } from "../../lib/dice.js";
import { useHouseRules, useSharedList } from "../../state/hooks.js";
import { Btn, CommaNumInput, LoadingBlock, Tag } from "../../ui/atoms.jsx";
import { COLORS, FONTS } from "../../ui/theme.js";

/* ===== Garage: every vehicle and mech the party owns =====
   Vehicles live in their owner's inventory (catalogId points at the book's
   statblock). Here they take damage, collect Dings, get repaired (paid from the
   owner's Zeni, cheaper with a Hangar or Workshop), get upgraded, Tier Up, and
   roll out onto the initiative tracker. */

const zeni = (n) => `Ƶ${(n || 0).toLocaleString()}`;

function VehicleCard({ entry, bonuses, onItem, onPay, onDeploy, deployed }) {
  const { item, owner } = entry;
  const s = vehicleStats(item);
  const [dmg, setDmg] = useState(0);
  const [open, setOpen] = useState(false);
  if (!s) return null;
  const pct = bonuses.dingRepairPct ?? 100;
  const repair = repairCost(s, pct);
  const hpPct = s.maxHp ? Math.max(0, s.hp) / s.maxHp : 0;
  const hpColor = hpPct > 0.5 ? COLORS.green : hpPct > 0.25 ? COLORS.amber : COLORS.red;
  const tier = tierUpTarget(item);
  const cash = owner.zeni || 0;
  const pay = (cost, patchItem, line) => {
    if (cash < cost) { notify(`${owner.name} needs ${zeni(cost)} (has ${zeni(cash)})`); return; }
    onPay(cost, patchItem);
    logSession(line, owner.name);
  };
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <Car size={15} color={COLORS.blue} />
        <b style={{ fontFamily: FONTS.display, fontSize: 14 }}>{item.name}</b>
        <span style={{ fontSize: 11, color: COLORS.dim }}>{s.size} {s.kind} · {owner.name}</span>
        <div style={{ flex: 1 }} />
        {deployed && <Tag color={COLORS.red}>In combat</Tag>}
        {s.dings > 0 && <Tag color={COLORS.amber}>{s.dings} Ding{s.dings > 1 ? "s" : ""}</Tag>}
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, marginBottom: 6 }}>
        <span><b>AC</b> {s.ac}{s.mods.plating ? <span style={{ color: COLORS.green }}> (+{s.mods.plating})</span> : null}</span>
        <span><b>Speed</b> {s.speed} ft</span>
        {s.shieldTemp > 0 && <span><b>Shield</b> {s.shieldTemp} Temp HP</span>}
        {s.stamina > 0 && <span><b>Stamina</b> {s.stamina}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, height: 8, background: COLORS.input, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${hpPct * 100}%`, height: "100%", background: hpColor }} />
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 12 }}>{s.hp}/{s.maxHp} HP</span>
      </div>
      {s.actions.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
          {s.actions.map((a, i) => <span key={i} title={a.text} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 10, border: `1px solid ${COLORS.border}`, color: a.attack ? COLORS.red : COLORS.muted }}>
            {a.name}{a.attack ? ` · ${a.attack.dice} ${a.attack.type}` : ""}
          </span>)}
        </div>
      )}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <CommaNumInput value={dmg} onValue={setDmg} style={{ width: 64, textAlign: "center", padding: "4px 6px" }} aria-label="Damage" />
        <Btn size="sm" variant="danger" disabled={!dmg} onClick={() => { onItem({ vehicle: damageVehicle(item, dmg) }); setDmg(0); }}>Damage</Btn>
        <Btn size="sm" variant="ghost" disabled={s.hp >= s.maxHp} onClick={() => pay(repair, { vehicle: repairVehicle(item) }, `Repaired ${item.name} (${s.dings} Ding${s.dings === 1 ? "" : "s"}, ${zeni(repair)})`)}
          title={`An hour and 10% of the price per Ding${pct < 100 ? `, at ${pct}% thanks to the base` : ""}`}>
          <Wrench size={12} /> Repair{s.hp < s.maxHp ? ` ${zeni(repair)}` : ""}
        </Btn>
        <Btn size="sm" variant="ghost" onClick={() => onDeploy(item, owner)} disabled={deployed}><Swords size={12} /> Deploy</Btn>
        <Btn size="sm" variant="ghost" onClick={() => setOpen(!open)}><Hammer size={12} /> Upgrades</Btn>
      </div>
      {open && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {VEHICLE_MODS.map(m => {
            const have = s.mods[m.key] || 0; const cost = modCost(s, m);
            return (
              <div key={m.key} style={{ fontSize: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ flex: 1 }}>{m.name}</b>
                  <span style={{ fontFamily: FONTS.mono, color: have ? COLORS.green : COLORS.dim }}>{have}/{m.max}</span>
                  <Btn size="sm" disabled={have >= m.max} onClick={() => pay(cost, { vehicle: addMod(item, m.key) }, `Built ${m.name} on ${item.name} (${zeni(cost)})`)}>{have >= m.max ? "Maxed" : `Build ${zeni(cost)}`}</Btn>
                </div>
                <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 2 }}>{m.desc}</div>
              </div>
            );
          })}
          {tier && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 6 }}>
              <ArrowUpCircle size={13} color={COLORS.gold} />
              <span style={{ flex: 1 }}>Tier Up! to <b>{tier.rule.name}</b> (25% of its price)</span>
              <Btn size="sm" variant="gold" onClick={() => pay(tier.zeni, tierUpItem(item), `${item.name} tiered up to ${tier.rule.name} (${zeni(tier.zeni)})`)}>Tier Up {zeni(tier.zeni)}</Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Garage({ base }) {
  const [chars, persistChars] = useSharedList("characters_v2");
  const [combat, persistCombat] = useSharedList("session_combat");
  const [hr] = useHouseRules();
  if (chars === null) return <LoadingBlock />;
  const bonuses = baseBonuses(base, { enabled: !!hr.baseBuilding });
  const entries = (chars || []).filter(c => !c.archived).flatMap(c => (c.items || []).filter(isVehicleItem).map(item => ({ item, owner: c })));
  const cap = bonuses.garage || 0;
  const data = (combat && combat[0]) || { round: 1, turn: 0, combatants: [] };
  const deployedIds = new Set((data.combatants || []).filter(c => c.sourceType === "vehicle").map(c => c.vehicleItemId));
  const patchChar = (ownerId, fn) => persistChars((chars || []).map(c => c.id === ownerId ? fn(c) : c));
  const onItem = (entry) => (patch) => patchChar(entry.owner.id, c => ({ ...c, items: (c.items || []).map(i => i.id === entry.item.id ? { ...i, ...patch } : i) }));
  const onPay = (entry) => (cost, patch) => patchChar(entry.owner.id, c => ({ ...c, zeni: (c.zeni || 0) - cost, items: (c.items || []).map(i => i.id === entry.item.id ? { ...i, ...patch } : i) }));
  const deploy = (item, owner) => {
    const row = vehicleCombatant(item, owner, { id: uid(), init: roll(20) });
    persistCombat([{ ...data, combatants: [...(data.combatants || []), row] }]);
    notify(`${item.name} added to the tracker`);
  };
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14, marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <Car size={16} color={COLORS.blue} />
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 14 }}>Garage</span>
        <Tag color={cap && entries.length > cap ? COLORS.red : COLORS.blue}>{entries.length}{cap ? ` / ${cap}` : ""} vehicles</Tag>
        {bonuses.dingRepairPct != null && <Tag color={COLORS.green}>Repairs at {bonuses.dingRepairPct}%</Tag>}
        <span style={{ fontSize: 11, color: COLORS.dim, flex: "1 1 220px" }}>
          {cap ? (entries.length > cap ? "More vehicles than the Hangar can hold: the extras sit outside." : "The Hangar keeps these docked and serviced.") : "Build a Hangar on the home world to dock vehicles and repair them cheaper."}
        </span>
      </div>
      {entries.length === 0
        ? <div style={{ fontSize: 12, color: COLORS.dim }}>No vehicles or mechs yet. Buy one in the Store or build one from a sheet's Crafting tab.</div>
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 10 }}>
            {entries.map(e => <VehicleCard key={e.item.id} entry={e} bonuses={bonuses} onItem={onItem(e)} onPay={onPay(e)} onDeploy={deploy} deployed={deployedIds.has(e.item.id)} />)}
          </div>}
    </div>
  );
}

export { Garage, VehicleCard };
