// High-Tech Parts — cybernetic body enhancements (SDNDB Master Doc Ch.10). Installed
// via Attunement; each has an Integration DC (Int/Technology + Wis/Medicine check),
// a Ƶeni price, a base effect, and an "Advanced Tech" upgrade (Androids get the
// Advanced version of every Part automatically). See the character Cybernetics panel
// + the Compendium tile. `integrates` marks the Parts wired into the engine.
export const HIGH_TECH_PARTS = [
  {
    id: "digital-cameras", name: "Digital Cameras", integrationDC: 10, zeni: 100,
    effect: "Implanted eye cameras: you are immune to the Blinded condition and gain a bonus to sight-based Perception checks equal to your Ki Rank.",
    advancedTech: "The sight-Perception bonus becomes Proficiency in Perception (Expertise if already proficient), and you gain Eidetic Memory.",
  },
  {
    id: "durable-exterior", name: "Durable Exterior", integrationDC: 20, zeni: 5000,
    effect: "A metallic exoskeleton replaces your skin. Choose Bludgeoning, Piercing, or Slashing — you gain Resistance to it. At Ki Rank 2 and again at Ki Rank 3, choose another you didn't pick.",
    advancedTech: "Your exterior can pass for living tissue without losing resistance, and you may instead pick from Acid, Cold, Fire, Poison, and Lightning.",
  },
  {
    id: "energy-shields", name: "Energy Shields", integrationDC: 20, zeni: 1000,
    effect: "An energy barrier lets you perform the Block Snap Decision without spending Stamina a number of times per Long Rest equal to your Ki Rank.",
    advancedTech: "When you Block using Energy Shields, all creatures of your choice within 5 feet of you also reduce the damage they'd take by half.",
  },
  {
    id: "hand-cannons", name: "Hand Cannons", integrationDC: 10, zeni: 100,
    effect: "As if drawing a weapon, shift your hands into cannons. While a cannon, your Basic Ki Blast deals +1 damage die and replaces its Attack Roll with a Dexterity save vs your Beam Save DC.",
    advancedTech: "With a hand detached, your Basic Ki Blast also forces the same Dexterity save from all creatures within 5 feet of the target's location.",
  },
  {
    id: "ki-engine", name: "Ki Engine", integrationDC: 25, zeni: 1000, integrates: true,
    effect: "An internal energy core regains you Ki equal to half your Character Level (rounded up) at the start of each of your turns.",
    advancedTech: "Your Ki engine runs more efficiently — you regain Ki equal to your full Character Level at the start of each of your turns.",
  },
  {
    id: "scanners", name: "Scanners", integrationDC: 10, zeni: 100,
    effect: "As an Action, make a Wisdom (Perception) check with Advantage to sense energy signatures at a Continental scale, learning the location and Power Level of sensed creatures while you hold Concentration. Unaffected by Ki Exhaustion.",
    advancedTech: "No Concentration needed, and range scales with Ki Rank: Continental (1) → Planetary (2) → Solar System (3) → Galactic Sector (4).",
  },
  {
    id: "stamina-engine", name: "Stamina Engine", integrationDC: 30, zeni: 50000, integrates: true,
    effect: "An auxiliary power source: your Breather Pool refills on a Short Rest.",
    advancedTech: "After completing a Snap Decision you spent at least 2 Stamina on (other than Flurry), you are refunded 1 Stamina.",
  },
  {
    id: "synthetic-muscle-fibers", name: "Synthetic Muscle Fibers", integrationDC: 25, zeni: 1000, integrates: true,
    effect: "Synthetic muscles far stronger than your original. You gain 1 Rank of Weighted (Light).",
    advancedTech: "While you benefit from a Rank of Weighted (Light) you gain +5 ft movement speed, and you may ignore 1 Rank of Weighted (Heavy).",
  },
  {
    id: "weaponized-hands", name: "Weaponized Hands", integrationDC: 10, zeni: 100,
    effect: "Integrate a single One-Handed Melee weapon (chosen once) into your Main Hand — shift between the weapon and a normal hand as if drawing it. Taking this Part again adds another weapon to shift between, or grants the benefit to your Off Hand.",
    advancedTech: "A built-in energy source lets the weapon deal Energy Damage, and Armed Techniques using it count as Ki Techniques for the sake of Clashes.",
  },
];

// Install rules (Ch.10): 8-hour install; Int(Technology) + Wis(Medicine) vs the
// Integration DC, failure = 1 Rank Exhaustion. Each attuned Part gives −2 to all Ki
// Control checks and Berserk saves, and no duplicates. Cybernetic Limit (max
// installed) = half of (CON mod + WIS mod). Androids take no negatives and treat
// every Part as Advanced; the Cyborg heritage also takes no negatives (Construct
// type). A species/heritage Signature Upgrade grants one Part that doesn't count
// against the Limit.
export const CYBERNETICS_RULES = {
  installCheck: "Int (Technology) + Wis (Medicine) vs Integration DC · 8 hours · failure = 1 Rank Exhaustion",
  penalty: "−2 to all Ki Control checks and Berserk saves per attuned Part (Android / Cyborg: no penalty)",
};
