// Species & Heritages — book data (Master Doc Ch.3). Extracted 2026-07-16.
// Core mechanical Traits + Feature/Sub-Species name lists per species. `complete`
// flags whether the full Traits block was captured (some are name-only stubs
// pending a follow-up extraction pass). Wired through the useOverrides pattern
// like FEAT_DATA / TECHNIQUE_DATA so entries are editable in-app.
export const SPECIES_DATA = [
  {
    id: "sp_saiyan", name: "Saiyan", category: "Mortal", complete: true,
    description: "Monkey-tailed warriors known as the “Species of Evolution,” born for conquest with explosive tempers and legendary transformations.",
    abilityScoreIncrease: "Strength +2, and Dexterity or Constitution +1",
    speed: "30 ft walk", languages: "Common, Sadalan", skills: "Athletics, Acrobatics", grantedSkills: ["Athletics", "Acrobatics"], skillChoice: null,
    features: ["Saiyan Instincts", "Saiyan Sub-Species", "Super Saiyan", "Super Stomach", "Zenkai Boost"],
    subSpecies: ["Universe 7 (Child of the Great Ape)", "Universe 6 (Masters of Super Saiyan)"],
  },
  {
    id: "sp_namekian", name: "Namekian", category: "Mortal", complete: true,
    description: "Green, water-sustained beings who stretch their limbs, regenerate, and communicate telepathically.",
    abilityScoreIncrease: "Constitution +1, Wisdom +1",
    speed: "30 ft walk", languages: "Common, Namekian", skills: "Arcana, Insight", grantedSkills: ["Arcana", "Insight"], skillChoice: null,
    features: ["Namekian Biology (stretch)", "Namekian Sub-Species", "Sounds of the Universe", "Telepathy"],
    subSpecies: ["Dark Clan", "Dragon Clan", "Warrior Clan"],
  },
  {
    id: "sp_majin", name: "Majin", category: "Mortal", complete: false,
    description: "Amorphous magical beings descended from Buu; organ-less and endlessly malleable. (ASI value garbled in the source — verify against book.)",
    abilityScoreIncrease: "See book (source text garbled)",
    speed: "30 ft walk", languages: "Common + 2 of choice", skills: "Arcana, Survival", grantedSkills: ["Arcana", "Survival"], skillChoice: null,
    features: ["Organ-less Resistance (choose Bludg/Pierc/Slash)", "Majin Sub-Species"],
    subSpecies: ["Raw Magic", "Saibaman"],
  },
  {
    id: "sp_arcosian", name: "Arcosian", category: "Otherworldly", complete: true,
    description: "Frost Demons — armored, horned, tailed aliens who thaw into power and once ruled a galactic empire.",
    abilityScoreIncrease: "Intelligence +2 or Dexterity +2, and Charisma +1",
    speed: "40 ft walk", languages: "Common, Cold", skills: "Persuasion, Deception", grantedSkills: ["Persuasion", "Deception"], skillChoice: null,
    features: ["Arcosian Sub-Species", "Galactic Lords", "Incredible Potential", "Short Fuse", "Strong Carapace"],
    subSpecies: ["Cold Tribe", "Hero Tribe"],
  },
  {
    id: "sp_android", name: "Android", category: "Otherworldly", complete: true,
    description: "Artificial beings identical to their designer's species; powerful but reliant on mechanical upgrades to advance.",
    abilityScoreIncrease: "Any one +2, any one +1",
    speed: "30 ft walk", languages: "Common + 1 of choice", skills: "Technology, History", grantedSkills: ["Technology", "History"], skillChoice: null,
    features: ["Robotic Body (required)", "Choose 5 Android Features (Crank Generator, …)"],
    subSpecies: [],
  },
  {
    id: "sp_cerealian", name: "Cerealian", category: "Mortal", complete: true,
    description: "Human-like aliens with green hair and a single hyper-evolved red eye granting incredible ranged accuracy.",
    abilityScoreIncrease: "Wisdom +2, Dexterity +1",
    speed: "30 ft walk", languages: "Common + 1 of choice", skills: "Perception, Technology", grantedSkills: ["Perception", "Technology"], skillChoice: null,
    features: ["Cerealian's Focus", "Hyper Reflexes", "Indomitable Will", "Red Eye of the Cerealians", "Laser Sight"],
    subSpecies: [],
  },
  {
    id: "sp_beastmen", name: "Beastmen", category: "Mortal", complete: true,
    description: "Humanoid animals created by a shapeshifting drug, keeping bestial features and instincts.",
    abilityScoreIncrease: "Increase all Ability Scores by 1, OR increase two by 1 and gain a Feat",
    speed: "35 ft walk", languages: "Common + 1 of choice", skills: "Nature, Survival", grantedSkills: ["Nature", "Survival"], skillChoice: null,
    features: ["Animal Sub-Species", "Bestial Characteristics", "Know-How", "More “Beast” than “Man”", "Primal Energy"],
    subSpecies: ["Aquatic", "Avian", "Insect", "Mammal", "Reptile"],
  },
  {
    id: "sp_celestial_primate", name: "Celestial Primate", category: "Mortal", complete: true,
    description: "Primates hatched from stone eggs with near-divine intellect, prehensile tails and feet, and long lifespans.",
    abilityScoreIncrease: "Dexterity +2, OR Strength +2 and Wisdom +1",
    speed: "30 ft walk, 30 ft climb", languages: "Common, and speak with beasts", skills: "Acrobatics + one of Nature/Survival/Religion", grantedSkills: ["Acrobatics"], skillChoice: { count: 1, from: ["Nature", "Survival", "Religion"] },
    features: ["Long Living", "Extended Learning Curve", "Primate Body", "Primate Sub-Species", "Spiritual Cultivation"],
    subSpecies: ["Interlocked-Armed Gibbon", "Red-Butted Baboon", "Six-Eared Macaque", "Wise Monkey"],
  },
  {
    id: "sp_galactic_citizen", name: "Galactic Citizen", category: "Mortal", complete: true,
    description: "The universe's varied civilized peoples — less flashy than other species but broadly capable and heroic.",
    abilityScoreIncrease: "Increase all Ability Scores by 1, OR increase two by 1 and gain a Feat",
    speed: "30 ft walk", languages: "Common + 1 of choice", skills: "Any 2 of choice", grantedSkills: [], skillChoice: { count: 2, from: "*" },
    features: ["Heroic Nature", "Galactic Sub-Species", "Know-How", "Strange Quirks"],
    subSpecies: ["Brench-Seijin", "Creamorian", "Earthling", "Heeter", "Hera Clan", "Herculean", "Jiangshi", "Konatsian", "Outworlder", "Triclops", "Tsufruian", "Wagashi-Seijin"],
  },
  {
    id: "sp_xeno", name: "Xeno", category: "Otherworldly", complete: true,
    description: "Nomadic beings of wholly unique biology and culture, adaptable and technologically gifted.",
    abilityScoreIncrease: "Increase all Ability Scores by 1, OR increase two by 1 and gain a Feat",
    speed: "35 ft walk", languages: "Common + 1 of choice", skills: "See Sub-Species", grantedSkills: [], skillChoice: null,
    features: ["Alien Characteristics", "Alien Talent", "Millenial Learning Curve", "Xeno Sub-Species"],
    subSpecies: [],
  },
  // ---- Name-only stubs (Traits not yet extracted — follow-up pass) ----
  { id: "sp_chronin", name: "Chronin", category: "Otherworldly", complete: false, description: "Purple, hairless, extremely long-lived beings who store excess time.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
  { id: "sp_demon_realm", name: "Demon Realm Denizen", category: "Otherworldly", complete: false, description: "Natives of the Demon Realm.", abilityScoreIncrease: "", speed: "", languages: "Infernal", skills: "", features: [], subSpecies: [] },
  { id: "sp_greys", name: "Greys", category: "Otherworldly", complete: false, description: "Classic small grey aliens.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
  { id: "sp_neko_majin", name: "Neko Majin", category: "Mortal", complete: false, description: "Cat-like Majin offshoot.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
  { id: "sp_neo_machine_mutant", name: "Neo Machine Mutant", category: "Otherworldly", complete: false, description: "Self-upgrading machine mutants.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
  { id: "sp_sateery", name: "Sateery", category: "Otherworldly", complete: false, description: "Sateerin-speaking species.", abilityScoreIncrease: "", speed: "", languages: "Sateerin", skills: "", features: [], subSpecies: [] },
  { id: "sp_yardratian", name: "Yardratian", category: "Otherworldly", complete: false, description: "Yardrat natives, masters of Instant Transmission and body manipulation.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
  { id: "sp_zoolatar", name: "Zoolatar", category: "Otherworldly", complete: false, description: "A rare offworld species.", abilityScoreIncrease: "", speed: "", languages: "", skills: "", features: [], subSpecies: [] },
];

// Heritages (Ch.3) — General (any PC) and Restricted (species-gated). Swap up to
// 3 Species Features for Heritage Features. Names captured; full text TODO.
export const HERITAGE_DATA = [
  { id: "her_majin_mark", name: "Majin Mark", type: "Restricted", description: "Heritage list entry (full text pending extraction)." },
];
