import React from "react";
import { uid } from "../../lib/dice.js";
import { Tag } from "../../ui/atoms.jsx";
import { COLORS } from "../../ui/theme.js";

// Pre-made caster NPCs — ready-to-drop spellcasters, each with a full spellcasting
// block (schools / cantrips / spells / slots) so their Magic tab is stocked out of
// the box. Archetype Caster/Mage surfaces the Magic tab (see NpcSheet).
const _cn = (name) => ({ id: uid(), name });
const _sp = (name, level) => ({ id: uid(), name, level });
const _slots = (...pairs) => pairs.map(([level, n]) => ({ id: uid(), level, current: n, max: n }));
const PREMADE_CASTERS = [
  {
    name: "Namekian Dragon-Clan Mystic", species: "Namekian", archetype: "Mage", role: "Dragon Clan Healer", tier: "Elite",
    antagonistLevel: 9, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 12, dex: 13, con: 15, int: 14, wis: 18, cha: 12 },
    ac: 15, dc: 16, attackBonus: 4, saveBonus: 6, dr: 1, hp: 104, maxHp: 104, ki: 42, maxKi: 42, stamina: 4, maxStamina: 4,
    hook: "Guards an ancient Dragon Clan secret and mends the fallen.",
    traits: [{ name: "Regeneration", text: "Regains HP at the start of each turn unless it took Destruction damage." }, { name: "Dragon Clan Rites", text: "Can create a Dragon Ball-linked ward; healing spells restore extra HP equal to Ki Rank." }],
    spellcasting: { enabled: true, ability: "wis", maxSpellLevel: 5, schools: ["Abjuration", "Evocation", "Conjuration"],
      cantrips: [_cn("Guidance"), _cn("Sacred Flame"), _cn("Resistance")],
      spells: [_sp("Cure Wounds", 1), _sp("Bless", 1), _sp("Healing Word", 1), _sp("Spiritual Weapon", 2), _sp("Lesser Restoration", 2), _sp("Mass Healing Word", 3), _sp("Revivify", 3), _sp("Death Ward", 4), _sp("Mass Cure Wounds", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Majin Chaos Sorcerer", species: "Majin", archetype: "Caster", role: "Blaster", tier: "Elite",
    antagonistLevel: 10, kiRank: 3, prof: 4, hitDie: "d6",
    stats: { str: 14, dex: 14, con: 16, int: 12, wis: 11, cha: 18 },
    ac: 14, dc: 16, attackBonus: 4, saveBonus: 5, dr: 0, hp: 96, maxHp: 96, ki: 48, maxKi: 48, stamina: 4, maxStamina: 4,
    hook: "A giggling engine of destruction that reshapes anything it touches.",
    traits: [{ name: "Elastic Body", text: "Resistance to Bludgeoning; can stretch to double its reach once per turn." }, { name: "Absorb", text: "On a killing blow it may assimilate a victim, temporarily gaining one of their Techniques." }],
    spellcasting: { enabled: true, ability: "cha", maxSpellLevel: 5, schools: ["Evocation", "Conjuration", "Transmutation"],
      cantrips: [_cn("Fire Bolt"), _cn("Mage Hand"), _cn("Prestidigitation")],
      spells: [_sp("Magic Missile", 1), _sp("Shield", 1), _sp("Chromatic Orb", 1), _sp("Scorching Ray", 2), _sp("Misty Step", 2), _sp("Fireball", 3), _sp("Counterspell", 3), _sp("Polymorph", 4), _sp("Cone of Cold", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Demon Realm Occultist", species: "Demon Realm Denizen", archetype: "Caster", role: "Warlock", tier: "Elite",
    antagonistLevel: 9, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 12, dex: 15, con: 15, int: 13, wis: 12, cha: 18 },
    ac: 15, dc: 16, attackBonus: 6, saveBonus: 4, dr: 1, hp: 92, maxHp: 92, ki: 40, maxKi: 40, stamina: 3, maxStamina: 3,
    hook: "Bound by a pact to something older than the gods.",
    traits: [{ name: "Magic Resistance", text: "Advantage on saving throws against spells and magical effects." }, { name: "Dark Pact", text: "Once per fight, reroll a failed save by offering a sliver of its life force (lose HP equal to level)." }],
    spellcasting: { enabled: true, ability: "cha", maxSpellLevel: 5, schools: ["Necromancy", "Enchantment", "Illusion"],
      cantrips: [_cn("Eldritch Blast"), _cn("Chill Touch"), _cn("Minor Illusion")],
      spells: [_sp("Hex", 1), _sp("Hellish Rebuke", 1), _sp("Hold Person", 2), _sp("Darkness", 2), _sp("Fear", 3), _sp("Vampiric Touch", 3), _sp("Blight", 4), _sp("Dominate Person", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
  {
    name: "Grey Psi-Technomancer", species: "Grey", archetype: "Mage", role: "Controller", tier: "Elite",
    antagonistLevel: 8, kiRank: 2, prof: 3, hitDie: "d6",
    stats: { str: 8, dex: 14, con: 13, int: 18, wis: 14, cha: 12 },
    ac: 13, dc: 15, attackBonus: 3, saveBonus: 5, dr: 0, hp: 74, maxHp: 74, ki: 44, maxKi: 44, stamina: 3, maxStamina: 3,
    hook: "Studies the party like specimens on a slab.",
    traits: [{ name: "Telepathy", text: "Communicates telepathically within 120 ft; can read surface thoughts as a bonus action." }, { name: "Analytical Mind", text: "After a creature acts, it gains +2 to saves and AC against that creature until its next turn." }],
    spellcasting: { enabled: true, ability: "int", maxSpellLevel: 5, schools: ["Divination", "Enchantment", "Transmutation"],
      cantrips: [_cn("Mind Sliver"), _cn("Message"), _cn("Mage Hand")],
      spells: [_sp("Detect Thoughts", 2), _sp("Levitate", 2), _sp("Suggestion", 2), _sp("Hypnotic Pattern", 3), _sp("Dimension Door", 4), _sp("Telekinesis", 5), _sp("Dominate Person", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 1], [5, 1]), pools: [] },
  },
  {
    name: "Yardratian Astral Sage", species: "Yardratian", archetype: "Mage", role: "Utility / Teleporter", tier: "Elite",
    antagonistLevel: 10, kiRank: 3, prof: 4, hitDie: "d8",
    stats: { str: 11, dex: 16, con: 14, int: 15, wis: 18, cha: 13 },
    ac: 16, dc: 16, attackBonus: 4, saveBonus: 6, dr: 1, hp: 88, maxHp: 88, ki: 46, maxKi: 46, stamina: 4, maxStamina: 4,
    hook: "A master of Instant Transmission — impossible to pin down.",
    traits: [{ name: "Instant Transmission", text: "As a bonus action, teleport to any point it can sense a Ki signature (no range limit within the system)." }, { name: "Serene Mind", text: "Immune to the Frightened and Charmed conditions." }],
    spellcasting: { enabled: true, ability: "wis", maxSpellLevel: 5, schools: ["Conjuration", "Abjuration", "Divination"],
      cantrips: [_cn("Guidance"), _cn("Light"), _cn("Spare the Dying")],
      spells: [_sp("Sanctuary", 1), _sp("Shield of Faith", 1), _sp("Misty Step", 2), _sp("Blink", 3), _sp("Dimension Door", 4), _sp("Banishment", 4), _sp("Wall of Force", 5)],
      slots: _slots([1, 4], [2, 3], [3, 3], [4, 2], [5, 1]), pools: [] },
  },
];

function PremadeCasterBrowser({ onPick }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
      {PREMADE_CASTERS.map((c, i) => (
        <div key={i} onClick={() => onPick({ ...c, id: uid() })} style={{ cursor: "pointer", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.purple + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
            <Tag color={COLORS.purple}>{c.tier}</Tag>
            <Tag color={COLORS.blue}>{c.species}</Tag>
            <Tag color={COLORS.green}>{c.archetype}</Tag>
          </div>
          <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.name}</div>
          <div style={{ fontSize: 10.5, color: COLORS.muted, marginBottom: 6 }}>Lv {c.antagonistLevel} · DC {c.dc} · {(c.spellcasting.spells || []).length} spells</div>
          <div style={{ fontSize: 11, color: COLORS.dim, lineHeight: 1.4 }}>{c.hook}</div>
        </div>
      ))}
    </div>
  );
}

export {
  _cn,
  _sp,
  _slots,
  PREMADE_CASTERS,
  PremadeCasterBrowser,
};
