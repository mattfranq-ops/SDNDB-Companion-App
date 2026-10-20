// Antagonist stat blocks + trait catalogs — Roster of FighterZ (Beta),
// extracted: 132 fighters + 3 combat zones by extraction/build_antagonists.py.
// Do not hand-edit; re-run the script against extraction/raw instead.
export const ANTAGONIST_DATA = [
 {
  "name": "Beastly Bandit",
  "meta": "Large Humanoid (Beastman), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Bandits",
  "stats": {
   "str": 14,
   "dex": 10,
   "con": 14,
   "int": 8,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Toughened Hide",
    "text": "The beastly bandit has 1 point of *Damage Reduction*"
   },
   {
    "name": "Ki-Inexperienced",
    "text": "The beastly bandit cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Rubble Crash*, *Savage Cut*, *Wide Swipe*",
   "Actions": "***Giant Scimitar.*** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d8+2) Slashing damage"
  },
  "powerLevel": 280,
  "ac": 13,
  "acNote": "Padded Gi",
  "hp": 10,
  "hpDice": "2d6+4",
  "ki": 14,
  "stamina": 2,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 1,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_beastly_bandit"
 },
 {
  "name": "Bandit",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Bandits",
  "stats": {
   "str": 12,
   "dex": 12,
   "con": 10,
   "int": 10,
   "wis": 9,
   "cha": 10
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The bandit cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Point-Blank Shot*, & *Savage Cut*",
   "Actions": "***Scimitar.*** *Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d6+1) Slashing damage\n:\n***Pistol.*** *Ranged Attack Roll:* +3, range 80/180 ft., *Hit:* 3 (1d6+1) Piercing Damage"
  },
  "powerLevel": 9,
  "ac": 12,
  "acNote": "",
  "hp": 3,
  "hpDice": "1d4",
  "ki": 3,
  "stamina": null,
  "breatherPool": null,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 9",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_bandit"
 },
 {
  "name": "Leader Bandit",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Bandits",
  "stats": {
   "str": 12,
   "dex": 13,
   "con": 12,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dirty Tactics",
    "text": "While the leader bandit has an ally within 5 feet and they may spend their reaction to force the the ally to take the *Interception (Ally)* **Snap Decision** with them as the target"
   },
   {
    "name": "Ki-Inexperienced",
    "text": "The leader bandit cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.***  *Impale*, *Parry*, *Point-Blank Shot*, & *Savage Cut*",
   "Actions": "***Scimitar.*** *Melee Attack Roll:* +4, reach 5 ft. *Hit:* 3 (1d6+1) Slashing damage\n:\n***Pistol.*** *Ranged Attack Roll:* +4, range 80/180 ft., *Hit:* 3 (1d6+1) Piercing Damage"
  },
  "powerLevel": 192,
  "ac": 14,
  "acNote": "Padded Gi",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 12,
  "stamina": 4,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_leader_bandit"
 },
 {
  "name": "Giant Boar",
  "meta": "Large Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Beasts of Paozu",
  "stats": {
   "str": 14,
   "dex": 10,
   "con": 14,
   "int": 6,
   "wis": 10,
   "cha": 3
  },
  "traits": [
   {
    "name": "Bloodied Fury",
    "text": "The boar has *Advantage* on melee attack rolls while it is *Bloodied*"
   },
   {
    "name": "Ki-Inexperienced",
    "text": "The leader bandit cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Actions": "***Tusk.*** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 3 (1d6+2) Piercing damage. if the target is a Large or smaller creature and the boar has moved 15+ feet straight towards it immediately before the hit, the target takes an extra 2 (1d4) Piercing Damage and has the *Impaled Condition* until the end of their next turn. It may addiitonally spend 4 Ki to increase the damage to 1d6 instead of 1d4.",
   "Bonus Action": "**Bulleted Charge (2 Ki).** The Giant Boar ca move half of its *Movement Speed* to a creature of their choice within range, when taking this action, all *Opportunity Attacks* are made at *Disadvantage* against the boar."
  },
  "powerLevel": 280,
  "ac": 15,
  "acNote": "Natural Armor",
  "hp": 10,
  "hpDice": "2d6+4",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 4,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "-",
  "id": "ant_emperor_pilaf_saga_giant_boar"
 },
 {
  "name": "Giant Fish",
  "meta": "Large Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Beasts of Paozu",
  "stats": {
   "str": 14,
   "dex": 10,
   "con": 14,
   "int": 6,
   "wis": 10,
   "cha": 3
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The fish cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Water Breathing",
    "text": "The fish can breathe only underwater."
   },
   {
    "name": "Bloodlust (4 Ki)",
    "text": "Until the end of their next turn, the fish is able to gain 30 feet of *Blindsight* so long as it within the water."
   }
  ],
  "sections": {
   "Actions": "***Bite.*** *Melee Attack Roll:* +5 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage. Additionally while the *Bloodlust* **Trait** is active and the fish would hit a creature, it may spend 2 Ki to grant them the *Grappled* and *Restrained Condition*. While *Restrained* this way, they are moved alongside the fish."
  },
  "powerLevel": 280,
  "ac": 15,
  "acNote": "Natural Armor",
  "hp": 10,
  "hpDice": "2d6+4",
  "ki": 14,
  "stamina": 5,
  "breatherPool": null,
  "speed": "0 ft. 40 ft. swimming",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "-",
  "id": "ant_emperor_pilaf_saga_giant_fish"
 },
 {
  "name": "Pterodactyl",
  "meta": "Large Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Beasts of Paozu",
  "stats": {
   "str": 12,
   "dex": 14,
   "con": 10,
   "int": 10,
   "wis": 8,
   "cha": 8
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The Pterodactyl cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Powerful Grasp",
    "text": "The pterodactyl does not have its fly speed reduced as a result of grappling a creature. Additionally, while a creature is grappled by the Pterodactyl and would attempt to break out, the pterodactyl may spend 2 ki to reduce their *Saving Throw* by 1."
   }
  ],
  "sections": {
   "Actions": "***Bite.*** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 4 (1d4+2) *Piercing Damage*\n:\n***Gruesome Bite (3 Ki).*** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (2d4+4) *Piercing Damage* and the following creature must make a *Constitution Saving Throw*, on a failure, the next instance of damage dealt to the creature is an additional 1d4 *Necrotic Damage.* This counts as a **Melee Technique** for the purpose of **Features** and **Rules Interaction**"
  },
  "powerLevel": 96,
  "ac": 15,
  "acNote": "Natural Armor",
  "hp": 6,
  "hpDice": "2d6",
  "ki": 8,
  "stamina": 5,
  "breatherPool": 2,
  "speed": "15 ft. Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 9",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_pterodactyl"
 },
 {
  "name": "Alpha Wolf",
  "meta": "Medium Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Desert Wolves",
  "stats": {
   "str": 12,
   "dex": 15,
   "con": 12,
   "int": 4,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The wolf cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pack Tactics",
    "text": "The wolf has *Advantage* on attack rolls taking the *Attack Action* against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition."
   }
  ],
  "sections": {
   "Actions": "***Bite.*** *Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6+2) *Piercing Damage*"
  },
  "powerLevel": 336,
  "ac": 14,
  "acNote": "",
  "hp": 12,
  "hpDice": "3d6+3",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 14",
  "languages": "Understand Common",
  "skills": "Perception +4, Stealth +5",
  "id": "ant_emperor_pilaf_saga_alpha_wolf"
 },
 {
  "name": "Mountain Wolf",
  "meta": "Medium Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Desert Wolves",
  "stats": {
   "str": 10,
   "dex": 12,
   "con": 10,
   "int": 3,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Titanium Claws (3 Ki)",
    "text": "While the wolf is on the ground or on a vertical surface, and they would be forced to make a *Saving Throw* to be *Launched*, they may be *Launched* for half the distance."
   },
   {
    "name": "Ki-Inexperienced",
    "text": "The wolf cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pack Tactics",
    "text": "The wolf has *Advantage* on attack rolls taking the *Attack Action* against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition."
   }
  ],
  "sections": {
   "Actions": "***Bite.*** *Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d4+1) *Piercing Damage*",
   "Reaction": "***Swift Dodge (4 Ki).*** When an attack would miss the wolf and the wolf is not *Suspended,* they may move up to their *Movement Speed* to a point of their choice."
  },
  "powerLevel": 40,
  "ac": 12,
  "acNote": "",
  "hp": 4,
  "hpDice": "2d4",
  "ki": 10,
  "stamina": 2,
  "breatherPool": null,
  "speed": "35 ft., Climb 20 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 13",
  "languages": "Understand Common",
  "skills": "Perception +3, Stealth +3",
  "id": "ant_emperor_pilaf_saga_mountain_wolf"
 },
 {
  "name": "Wolf",
  "meta": "Medium Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Desert Wolves",
  "stats": {
   "str": 10,
   "dex": 12,
   "con": 10,
   "int": 3,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The wolf cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pack Tactics",
    "text": "The wolf has *Advantage* on attack rolls taking the *Attack Action* against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition."
   },
   {
    "name": "Aggressive Rush (3 Ki)",
    "text": "At the start of the Wolf's turn, they may choose to gain the *Boosted (Tempo) Condition.* until the end of the turn."
   }
  ],
  "sections": {
   "Actions": "***Bite.*** *Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d4+1) *Piercing Damage*",
   "Reaction": "***Unionized Pack (3 Ki).*** The wolf may spend its reaction to grant an allied creature other than itself to make an *Attack Roll* with the *Attack Action*"
  },
  "powerLevel": 32,
  "ac": 12,
  "acNote": "",
  "hp": 4,
  "hpDice": "2d4",
  "ki": 8,
  "stamina": 2,
  "breatherPool": 1,
  "speed": "35 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 13",
  "languages": "Understand Common",
  "skills": "Perception +3, Stealth +3",
  "id": "ant_emperor_pilaf_saga_wolf"
 },
 {
  "name": "Rabbit Mob Carrot Crusher",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Monster Carrot's Mob",
  "stats": {
   "str": 14,
   "dex": 10,
   "con": 12,
   "int": 8,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The rabbit mob cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Hoplock",
    "text": "While a creature is *Grappled* by the rabbit mob, *Monster Carrot* gains advantage on the *Carrot Touch Action* made against the creature."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Assault* & *Clinch*",
   "Actions": "***Unarmed Strikes.*** *Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4+2) *Bludgeoning Damage*"
  },
  "powerLevel": 30,
  "ac": 12,
  "acNote": "Padded Gi",
  "hp": 6,
  "hpDice": "2d4+2",
  "ki": 5,
  "stamina": 3,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Athletics +3",
  "id": "ant_emperor_pilaf_saga_rabbit_mob_carrot_crusher"
 },
 {
  "name": "Rabbit Mob Burrow Shooter",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Monster Carrot's Mob",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 10,
   "int": 8,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The rabbit mob cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Impale* & *Hobbling Shot*",
   "Actions": "***Dagger.*** *Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4+2) *Slashing Damage*\n:\n***Rifle.*** *Melee Attack Roll:* +4, range 90/240 ft., *Hit* 6 (1d8+2) *Piercing Damage*"
  },
  "powerLevel": 24,
  "ac": 14,
  "acNote": "Padded Gi",
  "hp": 4,
  "hpDice": "2d4",
  "ki": 6,
  "stamina": 2,
  "breatherPool": 1,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Athletics +3",
  "id": "ant_emperor_pilaf_saga_rabbit_mob_burrow_shooter"
 },
 {
  "name": "Mai",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Pilaf Gang",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 10,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "Mai cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pilaf Gang Coordination",
    "text": "When Mai would be within 10 ft. of Shu or Pilaf, she may forego her action to allow them to make an additional attack with their *Attack Action*"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Bullet Rain*, *Claim Distance*",
   "Actions": "***Pistol.*** *Range Attack Roll:* +4, range 80/180 ft., *Hit* 5 (1d6+2) *Piercing Damage*\n:\n***Bazooka (2/LR).*** Mai may choose a point within 60 feet of her, all creatures in a 15 ft. Emanataion Radius Sphere from the chosen point must make a *Dexterity Saving Throw* against **DC** 14, on a failure, they take 1d8+6 *Fire Damage*, half on a success. This counts as a **Shot Technique** for the purpose of **Features** and **Rules Interaction.**"
  },
  "powerLevel": 16,
  "ac": 14,
  "acNote": "Padded Gi",
  "hp": 4,
  "hpDice": "2d4",
  "ki": 4,
  "stamina": 2,
  "breatherPool": 1,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Acrobatics +4, Investigation +3",
  "id": "ant_emperor_pilaf_saga_mai"
 },
 {
  "name": "Pilaf",
  "meta": "Small Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Pilaf Gang",
  "stats": {
   "str": 8,
   "dex": 10,
   "con": 8,
   "int": 14,
   "wis": 10,
   "cha": 12
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "Shu cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pilaf Gang Support",
    "text": "Pilaf at the start of his turn can choose to give 1d4+2 **Temporary Hit Point** to Shu or Mai."
   }
  ],
  "sections": {
   "Actions": "***Dagger.*** *Melee Attack Roll:* +2, reach 5 ft., *Hit* 2 (1d4) *Piercing Damage*\n:\n***The Treatment.*** A creature of Pilaf's choice within 60 feet must make a *Charisma Saving Throw* against **DC** 12. On a failure, they lose their Bonus Action on their next turn."
  },
  "powerLevel": 4,
  "ac": 11,
  "acNote": "",
  "hp": 2,
  "hpDice": "2d4-2",
  "ki": 2,
  "stamina": 1,
  "breatherPool": 0,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Acrobatics +4",
  "id": "ant_emperor_pilaf_saga_pilaf"
 },
 {
  "name": "Pilaf Machine",
  "meta": "Large Vehicle, Unaligned",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Pilaf Gang",
  "stats": {
   "str": 14,
   "dex": 12,
   "con": 14,
   "int": 3,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Mai Piloted",
    "text": "While Mai is piloting the *Pilaf Machine*, they may increase the range of the *Pilaf Gang Coordination* to 20 ft."
   },
   {
    "name": "Pilaf Piloted",
    "text": "While Pilaf is piloting the *Pilaf Machine*, his *Pilaf Gang Support* **Trait** is now increased to 2d4+4 **Temporary Hit Points**"
   },
   {
    "name": "Shu Piloted",
    "text": "While Shu is piloting the *Pilaf Machine*, they may move up to 25 ft. without provoking *Opportunity Attack.* ##### Mastery - ***Erupting Energy.*** Pilaf's Robot may change the damage type to *Fire Damage*"
   }
  ],
  "sections": {
   "Actions": "***Giant Arm.*** *Melee Weapon Attack:* +5 to hit, reach 10 ft., *Hit:* 6 (1d8+2) *Slashing Damage\n\n***Mech Merge.*** While two other *Pilaf Machine* are within 5 feet of each other, they may take this *Action* to merge and become the *Pilaf Fusion Mech*"
  },
  "powerLevel": null,
  "ac": 16,
  "acNote": "Natural Armor",
  "hp": 15,
  "hpDice": "3d6+6",
  "ki": null,
  "stamina": null,
  "breatherPool": null,
  "speed": "35 ft., Fly 25 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_pilaf_machine"
 },
 {
  "name": "Pilaf Robot",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Pilaf Gang",
  "stats": {
   "str": 14,
   "dex": 12,
   "con": 14,
   "int": 11,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Constructed Body",
    "text": "The Pilaf Robot cannot be detected by having his energy detected. Additionally at the start of its turn, the *Pilaf Robot* regains 4 **Ki Points** at the start of its turn."
   }
  ],
  "sections": {
   "Feat": "- Elemental Energy\n- Flight",
   "Techniques": "***Ki Rank 1.*** *Erupting Energy☆*, *Savage Cut*, *Uplifting Shot*\n\n##### Mastery\n\n- ***Erupting Energy.*** *Erupting Energy* may deal *Fire Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Burning Condition* from the *Elemental Affliction List.*",
   "Actions": "***Scimitar.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 6 (1d8+2) *Slashing Damage\n:\n***Flamethrower.*** *Ranged Weapon Attack:* +4 to hit, range 30/60 ft., *Hit:* 4 (1d6+1) *Fire Damage.*"
  },
  "powerLevel": 320,
  "ac": 16,
  "acNote": "Natural Armor",
  "hp": 10,
  "hpDice": "2d6+4",
  "ki": 16,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_emperor_pilaf_saga_pilaf_robot"
 },
 {
  "name": "Shu",
  "meta": "Small Humanoid (Beastman), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "General",
  "group": "Pilaf Gang",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 12,
   "int": 10,
   "wis": 12,
   "cha": 12
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "Shu cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Pilaf Gang Maneuver",
    "text": "When Shu would gain an action from Mai, he can move up to 15 ft. without provoking *Opportunity Attack.*"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Vault*, *Wide Swipe*",
   "Actions": "***Katana.*** *Melee Attack Roll:* +4, reach 5 ft., *Hit* 5 (1d6+2) *Slashing Damage* or 6 (1d8+2) *Slashing Damage* if used with two hands"
  },
  "powerLevel": 30,
  "ac": 14,
  "acNote": "Padded Gi",
  "hp": 6,
  "hpDice": "2d4+2",
  "ki": 5,
  "stamina": 2,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Acrobatics +4",
  "id": "ant_emperor_pilaf_saga_shu"
 },
 {
  "name": "Monser Carrot",
  "meta": "Medium Humanoid (Beastman), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "Elite",
  "group": "Monster Carrot",
  "stats": {
   "str": 11,
   "dex": 15,
   "con": 14,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Monster Carrot uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Powerful Leap",
    "text": "When Monster Carrot would make a running long jump, he can cover a distance up to 150 feet. When he would make a standing long jump, he can cover a distance up to 75 feet. His high vertical leap allows him to jump up to 5 ft."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.***  *Assault,* *Haymaker☆*, *Jab*, & *Strike Combination☆*\n:\n##### Mastery\n\n- ***Haymaker.*** *Monster Carrot* may move up to 15 ft.\n- ***Strike Combination.*** *Monster Carrot* may cast this **Technique** as a Bonus Action",
   "Actions": "***Carrot Touch.*** *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4+3) *Bludgeoning Damage* and the affected creature must make a *Wisdom Saving Throw* against his **Blast Save DC** (**DC** 13), on a failure,they are under the effect of the *Candy Beam* **Super Technique.** A creature that was forced to make this **Saving Throw** cannot be affected by this **Feature** until the end of Monster Rabbit's next turn.\n:\n***Explosive Carrot.*** *Ranged Attack Roll:* +5, range 30/60 ft. *Hit:*  8 (2d8) fire damage and all creatures within a 10 ft. Emanation from the affected creature must make a *Dexterity Saving Throw*, taking the triggering damage."
  },
  "powerLevel": 1080,
  "ac": 15,
  "acNote": "Padded Gi",
  "hp": 30,
  "hpDice": "6d6+12",
  "ki": 18,
  "stamina": 8,
  "breatherPool": 4,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common, Rabbit-Speak",
  "skills": "Acrobatics +3",
  "id": "ant_emperor_pilaf_saga_monser_carrot"
 },
 {
  "name": "Master Boxer",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Boxers",
  "stats": {
   "str": 14,
   "dex": 14,
   "con": 14,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Lightning Strikes",
    "text": "When the boxer would hit with an *Unarmed Strike*, they may cast an **Unarmed Technique** as a Bonus Action. Casting a **Technique** this way increases the **Technique's** Casting Cost by half of its **Casting Cost.**"
   },
   {
    "name": "Steel Punches",
    "text": "When the boxer would hit a creature with an *Unarmed Strike*, they must make a **Constitution Saving Throw** against their **Unarmed Save DC**, on a failure, they reduce their **AC** & **Saving Throws** by 1 until the start of the boxer's next turn. This **Feature** cannot stack with each other."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura\n- Brutal Critical",
   "Techniques": "***Ki Rank 1.*** *Axe Kick*, *Gut Punch*, *Haymaker* & *Jab*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 3 (1d4+2) *Bludgeoning Damage*",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 360,
  "ac": 16,
  "acNote": "",
  "hp": 15,
  "hpDice": "3d6+6",
  "ki": 12,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+5 Athletics",
  "id": "ant_21st_world_martial_arts_tournament_master_boxer"
 },
 {
  "name": "Novice Boxer",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Boxers",
  "stats": {
   "str": 12,
   "dex": 10,
   "con": 12,
   "int": 10,
   "wis": 10,
   "cha": 10
  },
  "traits": [],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Haymaker* & *Jab*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +3 to hit, reach 5 ft., *Hit:* 3 (1d4+1) *Bludgeoning Damage*",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 24,
  "ac": 11,
  "acNote": "",
  "hp": 6,
  "hpDice": "2d4+2",
  "ki": 4,
  "stamina": 3,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+3 Athletics",
  "id": "ant_21st_world_martial_arts_tournament_novice_boxer"
 },
 {
  "name": "Skilled Boxer",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Boxers",
  "stats": {
   "str": 14,
   "dex": 12,
   "con": 12,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Steel Punches",
    "text": "When the boxer would hit a creature with an *Unarmed Strike*, they must make a **Constitution Saving Throw** against their **Unarmed Save DC**, on a failure, they reduce their **AC** & **Saving Throws** by 1 until the start of the boxer's next turn. This **Feature** cannot stack with each other."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura",
   "Techniques": "***Ki Rank 1.*** *Axe Kick*, *Gut Punch*, *Haymaker* & *Jab*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 3 (1d4+1) *Bludgeoning Damage*",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 192,
  "ac": 15,
  "acNote": "",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 12,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+5 Athletics",
  "id": "ant_21st_world_martial_arts_tournament_skilled_boxer"
 },
 {
  "name": "Master Martial Artist",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Martial Artists",
  "stats": {
   "str": 10,
   "dex": 16,
   "con": 14,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   }
  ],
  "sections": {
   "Feat": "- Dragon Style\n- Ki Growth Training",
   "Techniques": "***Ki Rank 1.*** *Concussive Blast*, *Heavy Throw*, *Leg Sweep* & *Targeted Barrage*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage*",
   "Bonus Action": "***Martial Reflexes (4 Ki).*** Until the start of the martial artists next turn, you may increase your **AC** and all **Strength, Dexterity,** and **Constitution Saving Throws** by 1"
  },
  "powerLevel": 440,
  "ac": 17,
  "acNote": "",
  "hp": 10,
  "hpDice": "2d6+4",
  "ki": 22,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_21st_world_martial_arts_tournament_master_martial_artist"
 },
 {
  "name": "Novice Martial Artist",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Martial Artists",
  "stats": {
   "str": 10,
   "dex": 12,
   "con": 10,
   "int": 10,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Concussive Blast* & *Heavy Throw*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +3 to hit, reach 5 ft., *Hit:* 3 (1d4+1) *Bludgeoning Damage*"
  },
  "powerLevel": 20,
  "ac": 13,
  "acNote": "",
  "hp": 4,
  "hpDice": "2d4",
  "ki": 5,
  "stamina": 3,
  "breatherPool": 1,
  "speed": "35 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_21st_world_martial_arts_tournament_novice_martial_artist"
 },
 {
  "name": "Skilled Martial Artist",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "General",
  "group": "Martial Artists",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 12,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   }
  ],
  "sections": {
   "Feat": "- Dragon Style",
   "Techniques": "***Ki Rank 1.*** *Concussive Blast*, *Heavy Throw*, *Leg Sweep* & *Targeted Barrage*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 4 (1d4+2) *Bludgeoning Damage*"
  },
  "powerLevel": 256,
  "ac": 16,
  "acNote": "",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 16,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_21st_world_martial_arts_tournament_skilled_martial_artist"
 },
 {
  "name": "Bacterian",
  "meta": "Large Humanoid (Galactic Citizen), Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Elite",
  "group": "Legends of the 21st",
  "stats": {
   "str": 14,
   "dex": 12,
   "con": 15,
   "int": 9,
   "wis": 12,
   "cha": 11
  },
  "traits": [],
  "sections": {
   "Feat": "- Aggressive Aura\n- Ferocious Strength",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Stomp*, *Submission Hold*, & *Thunderous Uppercut*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 5 (1d6+2) *Bludgeoning Damage*\n:\n***Breath of Death (5 Ki).*** All creatures within a 20 foot cone from Bacterian must make a *Constitution Saving Throw*, on a failure, they take 1d6+4 *Poison Damage* and all affected creatures gain the *Poison Condition* for the next minute. On a success, they take half damage and no additional effects. This *Action* counts as a **Beam Technique** for the purpose of **Rules Interactions** and **Features**"
  },
  "powerLevel": 960,
  "ac": 14,
  "acNote": "",
  "hp": 30,
  "hpDice": "6d6+12",
  "ki": 16,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Strength +5",
  "id": "ant_21st_world_martial_arts_tournament_bacterian"
 },
 {
  "name": "Giran",
  "meta": "Medium Monstrosity, Neutral Evil",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Elite",
  "group": "Legends of the 21st",
  "stats": {
   "str": 16,
   "dex": 12,
   "con": 16,
   "int": 10,
   "wis": 11,
   "cha": 12
  },
  "traits": [
   {
    "name": "Superhuman Strength (3/day)",
    "text": "When Giran would make a *Dexterity Saving Throw*, to instead make a *Strength Saving Throw*. If he would succeed a *Saving Throw* this way, he may immediately cast a **Rank 1 Generic Technique.**"
   },
   {
    "name": "Toughened Hide",
    "text": "Giran has 2 points of *Damage Reduction*"
   }
  ],
  "sections": {
   "Feat": "- Brutal Critical\n- Tough",
   "Techniques": "***Ki Rank 1.*** *Heavy Throw*, *Lariat*, *Shockwave Strike* & *Suplex*",
   "Actions": "***Merry-Go-Round-Gum (6 Ki).*** A creature within 60 feet from Giran must make a Dexterity Saving Throw against **DC** 14, on a failure, they take 1d8+6 *Bludgeoning Damage* and they are *Restrained* for the next minute. They may spend their action to attempt to make a *Strength Saving Throw* to break out. This *Action* counts as a **Beam Technique** for the purpose of **Rules Interactions** and **Features**\n:\n***Tail Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 8 (1d6+3) *Bludgeoning Damage*"
  },
  "powerLevel": 2016,
  "ac": 16,
  "acNote": "Natural Armor",
  "hp": 63,
  "hpDice": "7d6+35",
  "ki": 16,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "savingThrows": "Strength +6, Consitution +6",
  "id": "ant_21st_world_martial_arts_tournament_giran"
 },
 {
  "name": "Nam",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Elite",
  "group": "Legends of the 21st",
  "stats": {
   "str": 12,
   "dex": 16,
   "con": 14,
   "int": 12,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Greater High Jump",
    "text": "Nam can make a 40 foot High Jump instead of its original calculation. He does not take *Fall Damage* as a result of this."
   }
  ],
  "sections": {
   "Feat": "- Ki Sense\n- Powerful Ki",
   "Techniques": "***Ki Rank 1.*** *Dive Strike ☆*, *Leg Sweep*, & *Strike Combination*\n\n##### Mastery\n\n- ***Dive Strike:*** Nam ignores 1 damaage die from taking *Fall Damage*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage*"
  },
  "powerLevel": 1600,
  "ac": 18,
  "acNote": "Natural Armor",
  "hp": 40,
  "hpDice": "8d6+16",
  "ki": 20,
  "stamina": 7,
  "breatherPool": 4,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 16",
  "languages": "Common",
  "savingThrows": "Dexterity +6, Wisdom +6",
  "skills": "Acrobatics +6, Insight +6, Ki Control +6, Perception +6",
  "id": "ant_21st_world_martial_arts_tournament_nam"
 },
 {
  "name": "Ranfan",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Elite",
  "group": "Legends of the 21st",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 12,
   "int": 12,
   "wis": 12,
   "cha": 16
  },
  "traits": [],
  "sections": {
   "Feat": "- Elemental Energy",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Haymaker ☆*, & *Jab*\n\n##### Mastery\n\n- ***Haymaker,*** *Haymaker* may deal *Fire Damage* instead of *Bludgeoning Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Burning Condition* from the *Elemental Affliction List.*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage*\n:\n***Woman's Charm.*** One creature within 60 feet that can see Ranfan must make a *Wisdom Saving Throw*, on a failure, the next attack roll made against that creature is made at advantage. Once a creature makes a *Saving Throw* against this *Action*, they cannot be affected for the next 24 hours.",
   "Bonus Action": "***Heat Fist (Recharge 6).*** Ranfan can increase her next instance of damage by 1d4+2 points of *Fire Damage*"
  },
  "powerLevel": 960,
  "ac": 15,
  "acNote": "",
  "hp": 24,
  "hpDice": "6d6+6",
  "ki": 20,
  "stamina": 7,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Dexterity +5",
  "skills": "Acrobatics +5, Deception +6, Persuasion +6",
  "id": "ant_21st_world_martial_arts_tournament_ranfan"
 },
 {
  "name": "Jackie Chun (Master Roshi)",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Iconic",
  "group": "Jackie Chun, Master of the Turtle Style",
  "stats": {
   "str": 17,
   "dex": 18,
   "con": 16,
   "int": 13,
   "wis": 18,
   "cha": 12
  },
  "traits": [
   {
    "name": "Afterimage",
    "text": "Once per round, when an attack would miss Jackie Chun, he may move up to 20 feet. This *Movement* does not trigger *Opportunity Attacks.*"
   },
   {
    "name": "Dexterous Combat",
    "text": "Jackie Chun uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Instinctive Defense\n- Steadfast Strikes\n- Turtle Style\n- Unarmed Master",
   "Forms": "- Superpower",
   "Techniques": "***Ki Rank 1.*** *Eye Poke*, *Leg Sweep*, *Kamehameha ☆*, *Strike Cobination*, *Thunder Shock Surprise*\n\n##### Mastery\n\n- ***Kamehameha.*** Kamehameha counts as an **Unarmed Technique**",
   "Actions": "***Multiattack.*** Jackie Chun can make two *Unarmed Strikes*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 7 (1d6+4) *Bludgeoning Damage*\n:\n***Hypnosis (1/Long Rest).*** A creature within 60 feet from Jackie Chun must make a *Constitution Saving Throw* against **DC** 13. On a failure, they are **Unconscious** for the next mintue. At the start of their turn, they may make a *Consitution Saving Throw* to attempt to break out from the *Condition*.",
   "Bonus Action": "**Drunken Style (4 Ki).** Jackie Chun activates this feature as an action. Until the start of his next turn, whenever an attack misses him or he succeeds on a *Dexterity Saving Throw*, he can use his reaction to make one *Unarmed Strike*. After making this attack, he may spend 4 Ki to regain his reaction. This regained reaction can only be used to make an Unarmed Strike granted by this feature.",
   "Iconic Action": "*Immediately after another creature's turn, Jackie Chun can expend a use to take one of the following actions.*\n***Attack.*** Jackie CHun can make one *Unarmed Strike* Attack\n:\n***Cast Technique.*** Jackie Chun can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Jackie Chun can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Jackie Chun can move up to its *Movement Speed*",
   "Phases": "When Jackie Chun is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold| Benefit |\n|:-----:|:------------------:|:-------:|\n| 2     | 27                 | Jackie Chun activates the *Superpower* **Form** for no action economy. While Roshi is benefiting from the *Superpower* **Form**, his **Strength Ability Score** becomes an 18 and for the duration, all damage dealt using his **Strength Ability Modifier** ignores 2 points of *Damage Reduction*."
  },
  "powerLevel": 3024,
  "ac": 20,
  "acNote": "",
  "hp": 54,
  "hpDice": "9d6+27",
  "ki": 28,
  "stamina": 14,
  "breatherPool": 5,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 17",
  "languages": "Common",
  "savingThrows": "Strength +6, Dexterity +7",
  "skills": "Athletics +6, Acrobatics +7, Insight +7, Ki Control +7, Perception +7",
  "id": "ant_21st_world_martial_arts_tournament_jackie_chun_master_roshi"
 },
 {
  "name": "Jiang Shi: Ogre",
  "meta": "Large Fiend, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Jiang-Shi",
  "stats": {
   "str": 18,
   "dex": 12,
   "con": 18,
   "int": 6,
   "wis": 8,
   "cha": 6
  },
  "traits": [
   {
    "name": "Ogre Stubborness",
    "text": "When the Jiang Shi: Ogre or another creature would take *Struggle* **Snap Decision**, you may increase all benefiting *Attack Rolls* by 2."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura\n- Tough",
   "Techniques": "**Ki Rank 1** *Bonk!, Heavy Throw, Lariat*, & *Stomp*",
   "Action": "***Giant Greatclub.*** *Melee Attack Roll:* +7, reach 5 ft. *Hit:* 12 (2d8+4) *Bludgeoning Damage*"
  },
  "powerLevel": 736,
  "ac": 17,
  "acNote": "",
  "hp": 23,
  "hpDice": "3d6+14",
  "ki": 16,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "25 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 9",
  "languages": "Common",
  "savingThrows": "Strength +7",
  "id": "ant_red_ribbon_army_saga_jiang_shi_ogre"
 },
 {
  "name": "Jiang Shi: Vampire",
  "meta": "Medium Undead, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Jiang-Shi",
  "stats": {
   "str": 12,
   "dex": 18,
   "con": 12,
   "int": 16,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Jackie Chun uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Vampiric Weaknesses",
    "text": "The vampire has two weaknesses: - ***Garlic Breath.*** Once per turn, a creature who has eaten Garlic may spend their bonus action, so long as the vampire is within 15 feet, it gains *Disadvantage* on its next attack roll. - ***Cross Shape.*** Once per turn, a creature may spend their bonus action to make the shape of a cross, the vampire must make a *Wisdom Saving Throw*, gaining the *Frightened Condition* until the start of its next turn."
   }
  ],
  "sections": {
   "Techniques": "**Ki Rank 1** *Assault*, *Energy Whip*, *Land Mine*, & *Psychokinesis*",
   "Action": "***Multiattack.*** The Vampire can make two Claws Attack\n\n***Claws (Vampire Form Only).*** *Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8+4) *Slashing Damage* plus 2 (1d4) *Necrotic Damage*\n:\n***Vampiric Bite (Bat or Vampire Form Only).*** *Constitution Saving Throw:* DC 12, one creature within 5 feet that is willing or that has the *Grappled*, *Incapacitateed* or *Restrained* Condition. *Failure:* 6 (1d4+4) *Piercing Damage* plus 4 (1d8) *Necrotic Damage*. The target's **Hit Points** maximum decreases by an amount equal to the *Necrotic Damage* taken and the vampire regains **Hit Points** equal to that amount. A *Humanoid* reduced to 0 **Hit Points** by this damage and then buried rises the following sunset as a Jiang Shi: Vampire.",
   "Bonus Action": "***Shape-Shift.*** If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or it returns to its vampire form. Anything it is wearing transforms with it."
  },
  "powerLevel": 336,
  "ac": 16,
  "acNote": "",
  "hp": 12,
  "hpDice": "3d6+3",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "vulnerabilities": "Radiant",
  "savingThrows": "Dexterity +7",
  "id": "ant_red_ribbon_army_saga_jiang_shi_vampire"
 },
 {
  "name": "Jiang Shi: Werewolf",
  "meta": "Large Monstrosity, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Jiang-Shi",
  "stats": {
   "str": 16,
   "dex": 14,
   "con": 18,
   "int": 6,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Clawed Hands",
    "text": "The werewolf's **Unarmed Technioque** may deal *Slashing Damage.* Additionally, once per round, when the werewolf would deal *Slashing Damage* from a **Technique**, the creature is *Grappled.*"
   }
  ],
  "sections": {
   "Feats": "- Heightened Instincts\n- I'll Take It!",
   "Techniques": "**Ki Rank 1** *Axe Kick,* *Eye Poke*, *Strike Combination*, & *Suplex*",
   "Action": "***Multiattack.*** The werewolf can make two Claws Attack\n:\n***Claws.*** *Melee Attack Roll:* +6, reach 5 ft. *Hit:* 9 (2d6+3) *Slashing Damage*",
   "Bonus Action": "***Quadruped.*** The werewolf may gain the following benefits:\n- You cannot manipulate objects with your hands.\n- You are capable of holding a single object in your mouth as if it were your hand.\n- You gain additional *Walking Speed* equal to 5 feet.."
  },
  "powerLevel": 560,
  "ac": 16,
  "acNote": "",
  "hp": 14,
  "hpDice": "2d6+8",
  "ki": 20,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 14",
  "languages": "Common",
  "savingThrows": "Consitution +7",
  "skills": "Perception +4",
  "id": "ant_red_ribbon_army_saga_jiang_shi_werewolf"
 },
 {
  "name": "Jiang Shi: Yokai",
  "meta": "Medium Undead, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Jiang-Shi",
  "stats": {
   "str": 14,
   "dex": 16,
   "con": 12,
   "int": 10,
   "wis": 18,
   "cha": 8
  },
  "traits": [
   {
    "name": "Incorporeal Movement",
    "text": "The yokai can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object."
   },
   {
    "name": "Corrupted Energy",
    "text": "The yokai may change its **Ki Technique** damage type to *Necrotic Damage*. Additionally, when you would deal damage, the affected creature must make a *Constitution Saving Throw* against **DC** 15, on a failure, they gain the *Rot Condition* for the next minute. At the start of their turn, they may remake the saving throw."
   }
  ],
  "sections": {
   "Feats": "- Spirit Burst\n- Powerful Ki",
   "Techniques": "**Ki Rank 1** *Concussive Blast,* *Explosive Wave,* *Mouth Blast* & *Palm Blast*",
   "Action": "***Ectoplasm.*** *Ranged Weapon Attack:* +7 to hit, range 60/120 ft., *Hit:* 9 (1d10+4) *Necrotic Damage*"
  },
  "powerLevel": 320,
  "ac": 19,
  "acNote": "",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 20,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "5 ft., 30 ft. hover",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 14",
  "languages": "Common",
  "savingThrows": "Wisdom +7",
  "id": "ant_red_ribbon_army_saga_jiang_shi_yokai"
 },
 {
  "name": "Jiang Shi: Zombie",
  "meta": "Medium Undead, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Jiang-Shi",
  "stats": {
   "str": 16,
   "dex": 16,
   "con": 16,
   "int": 3,
   "wis": 5,
   "cha": 1
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The zombie cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Undead Fortitude",
    "text": "If damage reduces the zombie to 0 **Hit Points**, it makes a *Constitution Saving Throw* (DC 5 plus the damage taken) unless the damage is *Radiant* or from a *Critical Hit*. On a successful save, the zombie drops to 1 **Hit Point** instead. Additionally, the zombie can spend 3 **Ki Points**, to increase their *Saving Throw* by 1."
   }
  ],
  "sections": {
   "Feats": "- Survivor",
   "Action": "***Multiattack.*** The werewolf can make two Slam Attack\n:\n***Slam.*** *Melee Attack Roll:* +6, reach 5 ft. *Hit:* 6 (1d6+3) *Bludgeoning Damage.* Addiitonally, the zombie can spend 2 **Ki Points** to cause the affected creature to make a *Constitution Saving Throw* against **DC** 14, on a failure, they gain the *Frightened Condition* until the end of their next turn."
  },
  "powerLevel": 320,
  "ac": 16,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 10,
  "stamina": 5,
  "breatherPool": 5,
  "speed": "5 ft., 30 ft. hover",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 7",
  "languages": "-",
  "id": "ant_red_ribbon_army_saga_jiang_shi_zombie"
 },
 {
  "name": "Giant Electric Eel",
  "meta": "Medium Beast, Unaligned",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate Cavern",
  "stats": {
   "str": 10,
   "dex": 14,
   "con": 12,
   "int": 6,
   "wis": 10,
   "cha": 3
  },
  "traits": [
   {
    "name": "Electric Channeler (4 ki)",
    "text": "When the giant electric eel would take the Electric Pulse Action, it can instead cause all creatures within a 15 foot Emanation to make the Constitution Saving Throw instead of a singular creature."
   },
   {
    "name": "Ki-Inexperienced",
    "text": "The giant electric eel cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Action": "**Bite.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 3 (1d4+2) *Piercing Damage.*\n:\n**Electric Pulse.** A creature that the giant electric eel can see within 30 feet must make a *Constitution Saving Throw* against **DC** 13, made with *disadvantage* if the target is touching the eel. On a failed save, a creature takes 16 (2d8+8) *Lightning Damage* and is *Dazed* until the end of their next turn. On a successful save, a creature takes half as much damage and isn't dazed."
  },
  "powerLevel": null,
  "ac": 14,
  "acNote": "Natural AC",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "Swim 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_giant_electric_eel"
 },
 {
  "name": "Pirate Buccaneer",
  "meta": "Medium Humanoid, Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate Cavern",
  "stats": {
   "str": 16,
   "dex": 14,
   "con": 12,
   "int": 12,
   "wis": 12,
   "cha": 14
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The pirate cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Swiftly Dodge (2 ki)",
    "text": "Once per round, when the pirate bucaneer would be targeted by an attack roll or would be forced to make a *Dexterity Saving Throw*, it may reduce the attack by 2 or increase their *Saving Throw* by 1."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Hobbling Shot* & *Wide Swipe*",
   "Action": "***Multiattack.*** The pirate can make two attacks\n\n***Scimitar.*** *Melee Weapon Attack:* +5 to hit,  reach 5 ft., *Hit* 6 (1d6+3) *Slashing Damage*\n:\n***Pistol.*** *Ranged Weapon Attack:* +5 to hit, range 80/180 ft., *Hit:* 6 (1d6+3) *Piercing Damage*"
  },
  "powerLevel": 36,
  "ac": 16,
  "acNote": "Medium Battle Armor",
  "hp": 6,
  "hpDice": "2d4+2",
  "ki": 6,
  "stamina": 3,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_pirate_buccaneer"
 },
 {
  "name": "Pirate Captain",
  "meta": "Medium Humanoid, Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate Cavern",
  "stats": {
   "str": 18,
   "dex": 18,
   "con": 14,
   "int": 14,
   "wis": 11,
   "cha": 14
  },
  "traits": [
   {
    "name": "Plunderer’s Hand",
    "text": "The pirate captain can make a *Sleight of Hand* contested against the creature's *Passive Perception*, on a success, the pirate captain steals an item of their choice so long as it is not being worn or on their hand"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Bullet Rain,* *Hobbling Shot*, *Impale,* & *Wide Swipe*",
   "Action": "***Multiattack.*** The pirate can make two attacks\n\n***Scimitar.*** *Melee Weapon Attack:* +7 to hit,  reach 5 ft., *Hit* 6 (1d8+4) *Slashing Damage*\n:\n***Rifle.*** *Ranged Weapon Attack:* +7 to hit, range 80/180 ft., *Hit:* 8 (1d8+4) *Piercing Damage*"
  },
  "powerLevel": 21,
  "ac": 16,
  "acNote": "",
  "hp": 15,
  "hpDice": "3d6+6",
  "ki": 7,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Sleight of Hand +7",
  "id": "ant_red_ribbon_army_saga_pirate_captain"
 },
 {
  "name": "Pirate Sharpshot",
  "meta": "Medium Humanoid, Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate Cavern",
  "stats": {
   "str": 12,
   "dex": 18,
   "con": 12,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The pirate cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Buckshot (3 ki)",
    "text": "When the Pirate Sharpshot would make a *Weapon Attack* with their rifle, they can forego the attack roll to force all creatures within a 15 foot radius sphere from a point within the weapon's short range to make a *Dexterity Saving Throw*, on a failure, they take half of the total damage."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Hobbling Shot* & *Wide Swipe*",
   "Action": "***Multiattack.*** The pirate can make two attacks\n\n***Dagger.*** *Melee Weapon Attack:* +6 to hit,  reach 5 ft., *Hit* 6 (1d4+4) *Slashing Damage*\n:\n***Rifle.*** *Ranged Weapon Attack:* +6 to hit, range 80/180 ft., *Hit:* 8 (1d8+4) *Piercing Damage*"
  },
  "powerLevel": 21,
  "ac": 16,
  "acNote": "Light Battle Armor",
  "hp": 3,
  "hpDice": "1d4+1",
  "ki": 7,
  "stamina": 3,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 0,
  "antagonistLevel": 1,
  "prof": 2,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_pirate_sharpshot"
 },
 {
  "name": "Commander Red",
  "meta": "Small Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 12,
   "dex": 10,
   "con": 12,
   "int": 16,
   "wis": 12,
   "cha": 16
  },
  "traits": [
   {
    "name": "Novice Stratagem",
    "text": "Commander Red can take the *Brace Yourself Stratagem* as if he had the *Stratagem* **Class Feature.**"
   },
   {
    "name": "Red Ribbon Tactical Network",
    "text": "While Commander Red is within the Center Tower, all creatures that are within the Red Ribbon Army Headquarters count as if they are within sight"
   },
   {
    "name": "Ki-Inexperienced",
    "text": "Commander Red cannot take the **Gather Ki Action.**"
   }
  ],
  "sections": {
   "Action": "***Unarmed Strikes.*** *Melee Weapon Attack:* +4 to hit,  reach 5 ft., *Hit* 3 (1d4+1) *Bludgeoning Damage*\n:\n***Commanding Presence (6 Ki).*** Commander Red can give an allied creature that he can see within 30 feet an additional action to take. Additionally he can spend an additional 2 ki to allow the creature to move up to their *Movement Speed*."
  },
  "powerLevel": 224,
  "ac": 15,
  "acNote": "",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_commander_red"
 },
 {
  "name": "Murasaki Brothers",
  "meta": "Medium Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 10,
   "dex": 16,
   "con": 12,
   "int": 16,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Brotherly Combination",
    "text": "Once per round as a result of being targeted by a **Technique** or **Spell** and the Murasaki Brothers or Ninja Murasaki are within 30 feet from each other, they are able to switch with each other so long as they are willing"
   }
  ],
  "sections": {
   "Feats": "- Alert\n- Combat Coordination",
   "Techniques": "***Ki Rank 1.*** *Iaijutsu*, *Onslaught*, *Savage Cut*, & *Wild Swipe*",
   "Action": "***Katana.*** *Melee Weapon Attack:* +6 to hit,  reach 5 ft., *Hit* 6 (1d6+3) *Slashing Damage* or 7 (1d8+3) *Slashing Damage* if used with two hands"
  },
  "powerLevel": 336,
  "ac": 17,
  "acNote": "Light Battle Armor",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 14,
  "stamina": 3,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "skills": "Stealth +6",
  "id": "ant_red_ribbon_army_saga_murasaki_brothers"
 },
 {
  "name": "Red Ribbon Blaster Trooper",
  "meta": "Medium Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 10,
   "dex": 16,
   "con": 10,
   "int": 12,
   "wis": 16,
   "cha": 10
  },
  "traits": [],
  "sections": {
   "Action": "***Pistol.*** *Ranged Weapon Attack:* +6 to hit, range 90/240 ft., *Hit:* 7 (1d6+3) *Piercing Damage*\n:\n***Energy Cannon.*** The red ribbon soldier may choose a point that is within 90 feet. All creature from a 30 foot radius sphere from the chosen point must make a *Dexterity Saving Throw* against **DC** 15, on a failure, they take 3d8+10 **Energy Damage.** After taking this action, they must spend their next action reloading the Energy Cannon. This counts as a **Ki Technique** for the purpose of **Features** and **Rules Interaction.**",
   "Bonus Action": "***Energy Infusion (9 ki).*** The red ribbon soldier can treat the Energy Cannon as if you had *Charged* it for 1 round."
  },
  "powerLevel": 224,
  "ac": 17,
  "acNote": "Light Battle Armor",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 14,
  "stamina": 5,
  "breatherPool": 2,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_red_ribbon_blaster_trooper"
 },
 {
  "name": "Red Ribbon Combatant",
  "meta": "Medium Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 16,
   "dex": 14,
   "con": 14,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Battle Line Discipline",
    "text": "While this creature and one other ally are within 5 feet of a hostile creature, the red ribbon soldier gains +1 to their **AC** and *Dexterity Saving Throws* against the triggering creature"
   },
   {
    "name": "Charged Strike",
    "text": "Once per round, each time a red ribbon soldier deals damage, it gains 1 charge, up to a maximum of 3. When a red ribbon soldier would deal damage with an **Unarmed Technique**, they may expend one charge to deal an additional +2 *Lightning Damage*"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Assault*, *Gut Punch* *Jab*, & *Lariat*",
   "Action": "***Multiattack.*** The red ribbon soldier can make two attacks with their *Unarmed Strike*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit* 5 (1d4+3)"
  },
  "powerLevel": 612,
  "ac": 18,
  "acNote": "Medium Elite Armor",
  "hp": 17,
  "hpDice": "3d6+8",
  "ki": 18,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_red_ribbon_combatant"
 },
 {
  "name": "Red Ribbon Power Trooper",
  "meta": "Medium Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 18,
   "dex": 10,
   "con": 16,
   "int": 10,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Collateral Assault",
    "text": "Whenever the red ribbon soldier would miss an *attack roll* with an **Armed Technique**, you may expend half the **Ki Cost** to force the area within a 15 ft. Emanation from yourself becomes *Difficult Terrain* except for yourself."
   },
   {
    "name": "Last Stand Protocol (1/LR)",
    "text": "When the red ribbon soldier is under 1/2 of his **Maximum Hit Points**, they gain the *Boosted (Body) Condition*. They lose the condition once they are brough above 1/2 of their **Maximum Hit Points** or after 1 minute passes."
   }
  ],
  "sections": {
   "Feats": "- Armed Master\n- Action Surge",
   "Techniques": "***Ki Rank 1.*** *Explosive Wave ☆,* *Rubble Crush,* & *Vault.*\n\n##### Mastery\n\n- **Explosive Wave.** Explosive Wave counts as an Armed Technique",
   "Action": "***Maul.*** *Melee Attack Attack:* +7 to hit, reach 5 ft., *Hit* 10 (2d6+4) *Bludgeoning Damage*"
  },
  "powerLevel": 576,
  "ac": 18,
  "acNote": "Heavy Battle Armor",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 16,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_red_ribbon_power_trooper"
 },
 {
  "name": "Red Ribbon Riflemen",
  "meta": "Medium Humanoid, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Army",
  "stats": {
   "str": 10,
   "dex": 16,
   "con": 12,
   "int": 16,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Long-Distance Targeting",
    "text": "When the red ribbon soldier would make a *Weapon Attack* to a creature that is above the *short range* of their *ranged weapon*, they gain a +1 *Static Bonus*."
   },
   {
    "name": "Energy Projectile Mastery",
    "text": "All **Shot Techniques** counts as a **Ki Technique** for the purpose of taking the *Energy Clash* **Snap Decision**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Hobbling Shot,* *Impale*, *Point-Blank Shot,* & *Power Shot*",
   "Action": "***Dagger.*** *Melee Weapon Attack:* +6 to hit,  reach 5 ft., *Hit* 5 (1d4+3) *Piercing Damage*\n:\n***Rifle.*** *Ranged Weapon Attack:* +6 to hit, range 90/240 ft., *Hit:* 7 (1d8+3) *Piercing Damage*"
  },
  "powerLevel": 288,
  "ac": 17,
  "acNote": "Light Battle Armor",
  "hp": 8,
  "hpDice": "2d6+2",
  "ki": 18,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_red_ribbon_riflemen"
 },
 {
  "name": "Bandage the Mummy",
  "meta": "Large Undead, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Baba's Otherworldly Martial Arts Experts",
  "stats": {
   "str": 20,
   "dex": 16,
   "con": 16,
   "int": 12,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Undead Fortitude",
    "text": "If damage reduces the Bandage the Mummy to 0 **Hit Points**, it makes a *Constitution Saving Throw* (DC 5 plus the damage taken) unless the damage is *Radiant* or from a *Critical Hit*. On a successful save, Bandage drops to 1 **Hit Point** instead. Additionally, he can spend 3 **Ki Points**, to increase their *Saving Throw* by 1."
   }
  ],
  "sections": {
   "Feat": "- Aggressive Aura\n- I'll Take It!\n- Tough",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Full Power Energy Wave*, *Infusion*, & *Stomp*",
   "Action": "***Multiattack.*** Bandage the Mummy can make two *Unarmed Strikes*\n:\n***Unarmed Strike*** *Melee Weapon Attack:* +8 to hit, reach 10 ft., *Hit* 8 (1d6+5) *Bldugeoning Damage*\n:\n***Bandage Throw.*** A creature of his choice that is within 60 feet from him must make a *Strength Saving Throw* against his **Unarmed Save DC**, on a failure, they take 1d8+6 *Bludgeoning Damage* and are grappled. Additionally as a bonus action, he is able to move the creature 15 ft. closer to him."
  },
  "powerLevel": 3168,
  "ac": 18,
  "acNote": "",
  "hp": 72,
  "hpDice": "8d6+40",
  "ki": 22,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 16",
  "languages": "Common",
  "skills": "Athletics +8, Perception +6",
  "id": "ant_red_ribbon_army_saga_bandage_the_mummy"
 },
 {
  "name": "Fangs the Vampire",
  "meta": "Medium Undead, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Baba's Otherworldly Martial Arts Experts",
  "stats": {
   "str": 14,
   "dex": 18,
   "con": 14,
   "int": 18,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Fangs the Vampire uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Vampiric Weaknesses",
    "text": "The vampire has two weaknesses: - ***Garlic Breath.*** Once per turn, a creature who has eaten Garlic may spend their bonus action, so long as the vampire is within 15 feet, it gains *Disadvantage* on its next attack roll. - ***Cross Shape.*** Once per turn, a creature may spend their bonus action to make the shape of a cross, the vampire must make a *Wisdom Saving Throw*, gaining the *Frightened Condition* until the start of its next turn."
   }
  ],
  "sections": {
   "Feat": "- Steadfast Strikes\n- Combat Awareness",
   "Techniques": "***Ki Rank 1.*** *Haymaker,* *Jab*, *Suplex*, & *Thunderous Uppercut*",
   "Action": "***Multiattack (Vampire Form Only).*** Fangs the Vampire can make two *Unarmed Strikes*\n:\n***Unarmed Strike (Vampire Form Only)*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., *Hit* 8 (1d6+4) *Bldugeoning Damage* and 2 (1d4) *Necrotic Damage*\n:\n\n***Vampiric Bite (Bat or Vampire Form Only).*** *Constitution Saving Throw:* DC 12, one creature within 5 feet that is willing or that has the *Grappled*, *Incapacitateed* or *Restrained* Condition. *Failure:* 6 (1d4+4) *Piercing Damage* plus 6 (3d4) *Necrotic Damage*. The target's **Hit Points** maximum decreases by an amount equal to the *Necrotic Damage* taken and the vampire regains **Hit Points** equal to that amount. A *Humanoid* reduced to 0 **Hit Points** by this damage and then buried rises the following sunset as a Jiang Shi: Vampire.",
   "Bonus Action": "***Shape-Shift.*** If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 40 ft.) or it returns to its vampire form. Anything it is wearing transforms with it."
  },
  "powerLevel": 1200,
  "ac": 20,
  "acNote": "",
  "hp": 30,
  "hpDice": "6d6+12",
  "ki": 20,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "skills": "Acrobatics +7",
  "id": "ant_red_ribbon_army_saga_fangs_the_vampire"
 },
 {
  "name": "Invisible Man",
  "meta": "Medium Monstrosity, Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Baba's Otherworldly Martial Arts Experts",
  "stats": {
   "str": 14,
   "dex": 16,
   "con": 14,
   "int": 18,
   "wis": 12,
   "cha": 14
  },
  "traits": [
   {
    "name": "See-Through",
    "text": "Invisible Man always has the *Invisible Condition* active."
   }
  ],
  "sections": {
   "Feat": "- Ki Stealth",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Eye Poke*, *Heavy Throw*, & *Strike Combination*",
   "Action": "***Unarmed Strike*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit* 5 (1d4+3) *Bldugeoning Damage*"
  },
  "powerLevel": 1584,
  "ac": 20,
  "acNote": "",
  "hp": 36,
  "hpDice": "6d6+18",
  "ki": 22,
  "stamina": 7,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_invisible_man"
 },
 {
  "name": "Spike the Devil Man",
  "meta": "Medium Monstrosity, Chaotic Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Baba's Otherworldly Martial Arts Experts",
  "stats": {
   "str": 20,
   "dex": 16,
   "con": 18,
   "int": 12,
   "wis": 10,
   "cha": 18
  },
  "traits": [
   {
    "name": "Devilish Techniques",
    "text": "All **Ki Techniques** that *Spike* would cast uses his **Charisma Ability Modifier** for its **Casting Ability Modifier**"
   },
   {
    "name": "Otherworldly Armament",
    "text": "Spike for no action economy can call upon his Devil Fork, so long as it is within the same realm."
   }
  ],
  "sections": {
   "Feat": "- Thrown Weapon Combat\n- Thrown Weapon Style\n- Weapon Focus",
   "Techniques": "***Ki Rank 1.*** *Impale*, *Infusion,* *Clean Shot*, &  *Psychokinesis*",
   "Action": "***Demon Fork*** *Melee Weapon Attack:* +9 to hit, reach 10 ft or range 20/60 ft., *Hit* 9 (1d6+6) *Piercing Damage* plus 3 (1d6) Necrotic Damage. This damage counts as magical for the purpose of overcoming resistance and immunity.\n:\n***Devilmite Beam (Recharge 5-6).*** A creature of Spike's choice must make a *Charisma Saving Throw* against **DC** 15, on a failure, they take 2d12+6 *Necrotic Damage*, half on a success. A creature that is of the *Evil Alignment* reduces their *Saving Throw* by 2. A creature that is of the *Good Alignment* increases their *Saving Throw* by 2 and if they succeed the *Saving Throw*, they do not take any damage."
  },
  "powerLevel": 2016,
  "ac": 19,
  "acNote": "",
  "hp": 56,
  "hpDice": "8d6+32",
  "ki": 18,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_spike_the_devil_man"
 },
 {
  "name": "Octopapa",
  "meta": "Huge Beast, True Neutral",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate's Guardian",
  "stats": {
   "str": 18,
   "dex": 10,
   "con": 14,
   "int": 8,
   "wis": 14,
   "cha": 3
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The pirate cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Water Breathing",
    "text": "The octopus can breathe only underwater. It can hold its breath for 1 hour outside water."
   }
  ],
  "sections": {
   "Action": "***Multiattack.*** The Octopapa can make two *Tentacles* attack.\n:\n***Tentacles.*** *Melee Attack Roll:* +7, reach 15 ft. *Hit:* 9 (1d10+4) *Bludgeoning Damage*. If the target is a Medium or smaller creature, it has the *Grappled Condition* (escape DC 15). While *Grappled*, the target has the *Restrained Condition*.\n:\n***Toxic Ink (6 ki).*** All creatures from a 20 ft. Emanataion from Octopapa must make a *Constitution Saving Throw* against **DC** 13, on a failure, they take 2d8+6 *Poison Damage* and they gain the *Poisoned Condition*, half on a success and no additional effects. This counts as a **Technique** for the purpose of **Features** and **Rules Interaction.**"
  },
  "powerLevel": 1320,
  "ac": 18,
  "acNote": "Natural **AC**",
  "hp": 30,
  "hpDice": "6d6+12",
  "ki": 22,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "10 ft., Swim 50 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_octopapa"
 },
 {
  "name": "Pirate Robot Mk. I",
  "meta": "Large Construct, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Pirate's Guardian",
  "stats": {
   "str": 16,
   "dex": 14,
   "con": 18,
   "int": 8,
   "wis": 8,
   "cha": 3
  },
  "traits": [
   {
    "name": "Plated Armor",
    "text": "Pirate Robot Mk. I has 2 points of *Damage Reduction.* Additionally, when it would take damage, it may expend 2 ki points to gain an additional 2 points of *Damage Reduction.*"
   }
  ],
  "sections": {
   "Action": "***Multiattack.*** The Pirate Robot Mk. I can make a Integrated Blade and an Electric Tail attack\n:\n***Electric Tail.*** *Melee Attack Roll:* +6, reach 15 ft. *Hit:* 7 (1d6+3) *Piercing Damage* plus 6 (3d4) *Lightning Damage\n:\n***Integrated Blade.*** *Melee Attack Roll:* +9, reach 10 ft. *Hit:* 10 (1d10+5) *Bludgeoning Damage*.\n:\n***Flamethrower (4 ki).*** All creatures in a 20 foot cone from the Pirate Robot Mk. I must make a *Dexterity Saving Throw* against **DC** 16. On a failure, they take 14 (2d10+4) *Fire Damage*.",
   "Bonus Action": "***Unrelenting Rush.*** Pirate Robot Mk. I can move up to its speed toward a hostile creature that it can see."
  },
  "powerLevel": 1568,
  "ac": 18,
  "acNote": "Natural **AC**",
  "hp": 49,
  "hpDice": "7d6+28",
  "ki": 16,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "35 ft., Hover 35 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 9",
  "languages": "Common",
  "resistances": "Nonmagical Bludgeoning, Piercing and Slashing",
  "immunities": "Poison, Psychic",
  "id": "ant_red_ribbon_army_saga_pirate_robot_mk_i"
 },
 {
  "name": "Buyon",
  "meta": "Huge Monstrosity, Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Leaders",
  "stats": {
   "str": 16,
   "dex": 8,
   "con": 20,
   "int": 8,
   "wis": 10,
   "cha": 6
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The pirate cannot take the **Gather Ki Action.**"
   },
   {
    "name": "Rubber Body",
    "text": "When a creature would target Buyon with an attack roll or a **Technique/Spell**, Buyon and the triggering creature must make a contested *Attack Roll* using its **Unarmed Technique Attack Roll**. If the triggering creature succeeds the *Attack Roll*, the effects continue as normal. If Buyon succeeds the *Attack Roll*, the damage is reduced to 0 and Buyon suffers no additional effects. Additionally, until the end of the current turn the following **Snap Decisions** have their casting cost reduced to zero: - *Redirect (Cone/Cube)* - *Redirect (Cylinder/Line)* - *Redirect (Emanation)* - *Redirect (Sphere)* - *Redirect (Targeted)*"
   },
   {
    "name": "Brittle Body",
    "text": "When Buyon would gain *Ranks of Freezing Air*, it cannot benefit from its *Rubber Body* **Trait**."
   }
  ],
  "sections": {
   "Action": "***Multiattack.*** The Pirate Robot Mk. I can make two Tongue Attacks\n:\n***Tongue Attack.*** *Melee Attack Roll:* +8, reach 10 ft. *Hit:* 9 (1d8+5) *Bludgeoning Damage*\n:\n***Electric Antennae (6 Ki).*** Buyon can choose one point that he can see, all creatures in a 15 foot Emanation must make a *Dexterity Saving Throw* against **DC** 16, on a failure, they take 1d10+5 *Lightning Damage* and they are *Dazed* until the end of their next turn. This counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction.**"
  },
  "powerLevel": null,
  "ac": 17,
  "acNote": "Natural **AC**",
  "hp": 64,
  "hpDice": "8d6+40",
  "ki": 18,
  "stamina": 10,
  "breatherPool": 7,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "vulnerabilities": "Cold",
  "id": "ant_red_ribbon_army_saga_buyon"
 },
 {
  "name": "General Blue",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Leaders",
  "stats": {
   "str": 10,
   "dex": 18,
   "con": 14,
   "int": 18,
   "wis": 12,
   "cha": 14
  },
  "traits": [
   {
    "name": "Psychic Mastery",
    "text": "While General Blue is holding an item, he is able to manipulate it up to 30 feet from himself. If this item is a *Melee Weapon*, he may forego an *Unarmed Strike* to make a *Weapon Attack* with the *Weapon*. A *Weapon Attack* made in this way may use his **Intelligence Ability Modifier** instead of its original **Weapon Attack.**"
   }
  ],
  "sections": {
   "Feat": "- Omni Master\n- Redirect Attack",
   "Technique": "***Rank 1.*** *Strike Combination ☆*, & *Suspending Uppercut ☆*\n\n##### Mastery\n\n- **Strike Combination.** *Strike Combination* has its casting aciton changed to a bonus action\n- **Suspending Uppercut.** *Suspending Uppercut* counts as an **Omni Technique**",
   "Action": "***Multiattack.*** General Blue can make three *Unarmed Strikes*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +8, reach 5 ft. *Hit:* 6 (1d4+4) *Bludgeoning Damage*\n:\n***Psychic Eyes.*** General Blue creates a 20-foot cone. Each creature in the area must make a *Constitution Saving Throw* against **DC** 15. On a failed save, a creature gains the *Dazed* and *Restrained Conditions*. All affected creature must remake the *Constitution Saving Throw* at the end of their turn. General Blue must maintain *Concentration* to sustain this effect, which lasts for up to 1 minute. The effect ends early for all creature if General Blue loses *Concentration*."
  },
  "powerLevel": null,
  "ac": 20,
  "acNote": "",
  "hp": 48,
  "hpDice": "8d6+24",
  "ki": 16,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_general_blue"
 },
 {
  "name": "Major Metallitron",
  "meta": "Large Construct, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Leaders",
  "stats": {
   "str": 18,
   "dex": 12,
   "con": 18,
   "int": 10,
   "wis": 8,
   "cha": 6
  },
  "traits": [
   {
    "name": "Battery Powered",
    "text": "Major Metallitron has 25 Battery Charges. At the end of his turn, he loses 1 Battery Charge."
   },
   {
    "name": "Core Powered",
    "text": "When Major Metallitron would cast a **Ki Technique**, he may spend 1 Battery Charge to change the **Technique Type** to a **Beam Technique.**"
   },
   {
    "name": "Relentless Machine",
    "text": "If Major Metallitron is knocked to 0 **Hit Points**, it does not go *Unconscious* so long as it has Battery Charges. Additionally, for every instance of damage that Major Metallitron would take while he is at 0 **Hit Points**, he loses 1 Battery Charge."
   }
  ],
  "sections": {
   "Feat": "- Bottomless Reserve\n- Brutal Critical\n- I'll Take It",
   "Technique": "**Rank 1.** *Clinch*, *Full Power Energy Wave*, *Haymaker,* & *Mouth Blast*",
   "Action": "***Multiattack.*** Major Metallitron can make three *Unarmed Strikes*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +8, reach 10 ft. *Hit:* 12 (2d8+4) *Bludgeoning Damage*"
  },
  "powerLevel": 2016,
  "ac": 17,
  "acNote": "",
  "hp": 63,
  "hpDice": "9d6+36",
  "ki": 16,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "",
  "languages": "",
  "id": "ant_red_ribbon_army_saga_major_metallitron"
 },
 {
  "name": "Ninja Murasaki",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Leaders",
  "stats": {
   "str": 10,
   "dex": 18,
   "con": 14,
   "int": 16,
   "wis": 14,
   "cha": 14
  },
  "traits": [
   {
    "name": "Brotherly Combination",
    "text": "Once per round as a result of being targeted by a **Technique** or **Spell** and the Murasaki Brothers are within 30 feet from each other, they are able to switch with each other so long as they are willing"
   },
   {
    "name": "Water Stride Technique",
    "text": "Ninja Murasaki can walk amongst liquid surfaces"
   }
  ],
  "sections": {
   "Feat": "- Combat Coordination\n- Weapon Focus (Katana)",
   "Technique": "**Rank 1.** *Concussive Throw*, *Clean Shot*, *Parry,* *Savage Cut*",
   "Action": "***Multiattack.*** Ninja Murasaki can make two *Katana* or three *Shuriken* Attacks\n:\n***Katana.*** *Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d6+5) *Slashing Damage* or 9 (1d8+5) *Slashing Damage* if used with two hands\n:\n***Shuriken.*** *Ranged Attack Roll:* +7, range 60/120 ft. *Hit:* 6 (1d4+4) *Piercing Damage*"
  },
  "powerLevel": 1280,
  "ac": 19,
  "acNote": "",
  "hp": 40,
  "hpDice": "8d6+16",
  "ki": 18,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "skills": "Deception +5, Stealth +7",
  "id": "ant_red_ribbon_army_saga_ninja_murasaki"
 },
 {
  "name": "Staff Officer Black",
  "meta": "Medium Humanoid (Galactic Citizen), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "General",
  "group": "Red Ribbon Leaders",
  "stats": {
   "str": 14,
   "dex": 14,
   "con": 12,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Cheap Shot (1/LR)",
    "text": "Before combat has started, Staff Officer Black can expend 10 Ki Points to target one creature within 10 feet of him with an attack. This Attack counts as a *Critical Hit*."
   },
   {
    "name": "Commander's Wrath",
    "text": "When Staff Officer Black would be equal or under half of his **Maximum Hit Points**, he can spend his reaction to summon the **Commander's Battle Jacket**."
   }
  ],
  "sections": {
   "Action": "***Multiattack.*** Staff Officer Black can make two *Unarmed Strike* or *Pistol* Attacks\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +7, reach 5 ft. *Hit:* 5 (1d6+2) *Slashing Damage*\n:\n***Pistol.*** *Ranged Attack Roll:* +5, range 80/180 ft. *Hit:* 5 (1d6+2) *Piercing Damage*"
  },
  "powerLevel": 576,
  "ac": 13,
  "acNote": "",
  "hp": 24,
  "hpDice": "6d6+6",
  "ki": 12,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_red_ribbon_army_saga_staff_officer_black"
 },
 {
  "name": "Commander's Battle Jacket",
  "meta": "Large Vehicle, Unaligned",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "Iconic",
  "group": "Commander's Battle Jacket",
  "stats": {
   "str": 20,
   "dex": 12,
   "con": 20,
   "int": 3,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Armored Core",
    "text": "The Commander Battle Jacket gains 2 points of *Damage Reduction.*"
   },
   {
    "name": "Controlled",
    "text": "The mech is controlled by its pilot meaning the pilot is its mind, when in the mech the pilot shares the same turn with the mecha, when in the mech the pilot is considered in total cover however this effect is reduced by 1/4 cover each time the mech takes **Destruction Damage**.This Mech can support a Pilot of **Medium Size** or smaller. **Legendary Resistance (2/Day).** If Commander's Battle Jacket fails a Saving Throw, it can choose to succeed instead"
   },
   {
    "name": "Prototype Ki Engine",
    "text": "At the start of its turn, the Commander's Battle Jacket gains 4 **Ki Points**"
   }
  ],
  "sections": {
   "Actions": "***Multiattack.*** The Commander's Battle Jacket can choose to take the Laser Cannon Action and make 1 Giant Slam or Rocket Attack or they can make 3 Giant Slam Attacks or 3 Rocket Attacks.\n:\n***Giant Slam.*** *Melee Weapon Attack:* +8 to hit, reach 15 ft., *Hit:* 13 (2d8+5) *Bludgeoning Damage*\n:\n***Rocket*** *Ranged Weapon Attack:* +8 to hit, range 120 ft., *Hit* 9 (2d4+5) *Fire Damage.* Additionally, the Commander's Battle Jacket may expend 4 Ki to on a hit, all creatures other than the *Commander's Battle Jacket* within a 15 foot radius sphere must make a *Dexterity Saving Throw*, on a failure, they take the damage taken, half on a success.\n:\n***Laser Cannon (Recharge 5-6)***. All creatures in a 90 foot long and 15 foot wide line from the Commander's Battle Jacket must make a *Dexterity Saving Throw* against **DC** 16. On a failure, they take 19 (3d6+10) *Energy Damage.* This counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction.**",
   "Reaction": "***Energy Barrier (10 Ki)*** When the Commander's Battle Jacket would be targeted by a **Technique** that would deal damage, it may increase its **AC** and *Saving Throw* by 2 for the duration of the turn. It gains this Reaction on *Phase 2*.",
   "Iconic Action": "*Immediately after another creature's turn, Commmander's Battle Jacket can expend a use to take one of the following actions.*\n:\n***Attack.*** Commander's Battle Jacket can make a *Giant Slam* or *Rocket* Attack\n:\n***Energy Burst.*** The Commander's Battle Jacket can regain a number of **Ki Points** equal to 3d4.\n:\n***Iconic Snap.*** Commmander's Battle Jacket can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Commander's Battle Jacket can move up to its *Movement Speed*",
   "Phases": "When Commander's Battle Jacket is reduced to a **Hit Point Threshold**, it stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit|\n|:-----:|:-------------------:|:------:|\n| 2     | 53                  | The Commander's Battle Jacket gains a +1 **Stable Power** and you gain the *Energy Barrier Reaction.* |\n| 3     | 26                  | The Commander's Battle Jacket's increases its Laser Canon by 1 damage die step and the Rocket increases its Area of Effect by 10 feet. |"
  },
  "powerLevel": null,
  "ac": 19,
  "acNote": "",
  "hp": 80,
  "hpDice": "10d6+50",
  "ki": null,
  "stamina": null,
  "breatherPool": null,
  "speed": "40 ft., 30 ft. Flight",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "immunities": "Psychic, Poison",
  "savingThrows": "Strength +8, Constitution +8",
  "id": "ant_red_ribbon_army_saga_commander_s_battle_jacket"
 },
 {
  "name": "Grandpa Gohan",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "Iconic",
  "group": "Grandpa Gohan",
  "stats": {
   "str": 18,
   "dex": 20,
   "con": 18,
   "int": 13,
   "wis": 20,
   "cha": 12
  },
  "traits": [
   {
    "name": "Afterimage",
    "text": "Once per round, when an attack would miss Grandpa Gohan, he may move up to 20 feet. This *Movement* does not trigger *Opportunity Attacks.*"
   },
   {
    "name": "Dexterous Combat",
    "text": "Grandpa Gohan uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier** **Legendary Resistance (2/Day).** If Grandpa Gohan fails a Saving Throw, it can choose to succeed instead"
   },
   {
    "name": "Turtle School Tranquility",
    "text": "When Grandpa Gohan would cast a **Technique** from the *Jan-Ken Fist* **Super Technique Line**, he can take his Bonus Action to make two additional *Unarmed Strikes*."
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Unarmed Master\n- Turtle Style\n\n#### Trained Features\n- Turtle Style Master\n- Turtle Style Combat",
   "Techniques": "***Ki Rank 1.*** *Eye Poke*, *Leg Sweep*, *Kamehameha ☆*, *Strike Combination*, *Jan-ken Fist: Rock*\n\n##### Mastery\n\n- ***Kamehameha.*** Kamehameha counts as an **Unarmed Technique**",
   "Actions": "***Multiattack.*** Grandpa Gohan can make three *Unarmed Strikes*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., *Hit:* 9 (1d8+5) *Bludgeoning Damage*\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., *Hit* 9 (1d8+5) *Energy Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Grandpa Gohan can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Grandpa Gohan can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Grandpa Gohan can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Grandpa Gohan can move up to its *Movement Speed*",
   "Phases": "When Grandpa Gohan is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit|\n|:-----:|:-------------------:|:------:|\n| 2     | 38                  |  Grandpa Gohan gains +1 **Stable Power** and he increases all his available *Movement Speed* by 15 feet for the duration of this combat. Additionally he gains *Jan-ken Fist: Scissors* and *Jan-Ken Fist: Paper* **Super Technique**|"
  },
  "powerLevel": 4928,
  "ac": 22,
  "acNote": "",
  "hp": 77,
  "hpDice": "11d6+44",
  "ki": 32,
  "stamina": 18,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "savingThrows": "Strength +7, Dexterity +8",
  "skills": "Athletics +7, Acrobatics +8, Insight +8, Ki Control +8, Perception +8",
  "id": "ant_red_ribbon_army_saga_grandpa_gohan"
 },
 {
  "name": "Tao Pai Pai",
  "meta": "Medium Humanoid (Galactic Citizen), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Red Ribbon Army Saga",
  "tier": "Iconic",
  "group": "Tao Pai Pai",
  "stats": {
   "str": 16,
   "dex": 20,
   "con": 16,
   "int": 20,
   "wis": 16,
   "cha": 12
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Tao Pai Pai uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Legendary Resistance (2/Day)",
    "text": "If Tao Pai Pai fails a Saving Throw, it can choose to succeed instead"
   },
   {
    "name": "Killing Strike",
    "text": "Once per round, when Tao Pai Pai would hit an *Unarmed Strike* or *Ki Blast Attack*, he may deal 2d8 *Energy Damage*. If he has *advantage* on the attack roll, he increases the damage die quantity by 1."
   }
  ],
  "sections": {
   "Feat": "#### Feats\n\n- Alert\n- Crane Style\n- Fluid Combatant (Scimitar)\n- Omni Master",
   "Techniques": "***Ki Rank 1.*** *Aura Flare,* *Bombardment*, *Counterblast*, *Dodon-Pa ☆*\n\n##### Mastery\n\n- **Dodon-Pa.** Dodon-Pa counts as an **Omni Technique**",
   "Actions": "***Multiattack.*** Tao Pai Pai can make three *Attacks*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage*\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., *Hit* 9 (1d8+5) *Energy Damage*\n:\n***Crane Scimitar (Phase 2 Only).*** *Melee Weapon Attack:* +9 to hit, reach 5 ft., *Hit:* 10 (1d8+6) *Slashing Damage*",
   "Reaction": "***Emergency Grenade.*** When Tao Pai Pai is under half of **Maximum Hit Points**, he may move to a point within half of his *Movement Speed*, this *Movement* does not trigger *Opportunity Attacks*. Additionally all creature from the point he was at must make a *Dexterity Saving Throw* against **DC** 16, on a failure, they take 2d8+4 **Fire Damage.** This counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction.**",
   "Iconic Action": "*Immediately after another creature's turn, Tao Pai Pai can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Tao Pai Pai can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Tao Pai Pai can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Tao Pai Pai can move up to its *Movement Speed*",
   "Phases": "When Tao Pai Pai is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit|\n|:-----:|:-------------------:|:------:|\n| 2     | 30                  |  Tao Pai Pai gains +1 **Stable Power** and he increases all his available *Movement Speed* by 15 feet for the duration of this combat. Additionally, he gains access to the Crane Scimitar Weapon and the damage die of the Killing Strike Trait increases by 1 damage die step. |"
  },
  "powerLevel": 4928,
  "ac": 22,
  "acNote": "",
  "hp": 60,
  "hpDice": "10d6+30",
  "ki": 26,
  "stamina": 14,
  "breatherPool": 5,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "savingThrows": "Dexterity +8, Intelligence +8",
  "skills": "Acrobatics +8, Deception +4, Investigation +8, Ki Control +8, Perception +8",
  "id": "ant_red_ribbon_army_saga_tao_pai_pai"
 },
 {
  "name": "Ki Adept Boxer",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Boxer, cont.",
  "stats": {
   "str": 16,
   "dex": 16,
   "con": 16,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Lightning Strikes",
    "text": "When the boxer would hit with an *Unarmed Strike*, they may cast an **Unarmed Technique** as a Bonus Action. Casting a **Technique** this way increases the **Technique's** Casting Cost by half of its **Casting Cost.**"
   },
   {
    "name": "Steel Punches",
    "text": "When the boxer would hit a creature with an *Unarmed Strike*, they must make a **Constitution Saving Throw** against their **Unarmed Save DC**, on a failure, they reduce their **AC** & **Saving Throws** by 1 until the start of the boxer's next turn. This **Feature** cannot stack with each other."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura\n- Brutal Critical",
   "Techniques": "***Ki Rank 1.*** *Axe Kick*, *Gut Punch*, *Infusion* & *Jab*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n\n:\n\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 6 (1d6+3) *Bludgeoning Damage.* Additionally, if the *Boxer* would deal damage with his *Unarmed Strike*, he may cast a **Strike Technique** that he has access to.",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 576,
  "ac": 16,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 16,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+6 Athletics",
  "id": "ant_demon_king_piccolo_saga_ki_adept_boxer"
 },
 {
  "name": "Dark Vassal Energy Tyrant",
  "meta": "Medium Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Dark Vassal",
  "stats": {
   "str": 8,
   "dex": 16,
   "con": 18,
   "int": 14,
   "wis": 18,
   "cha": 12
  },
  "traits": [
   {
    "name": "Instant Casting",
    "text": "Once per round, the dark vassal energy tyrant can immediately cast two **Ki Techniques** as part of the same action. Casting the second **Ki Techniuqe** in this manner increases the **Ki Cost** by half its **Casting Cost.**"
   }
  ],
  "sections": {
   "Feats": "- Ki Sense\n- Palpable Aura (Recharging Aura)",
   "Techniques": "***Ki Rank 1.*** *Cratering Beam, Full Power Energy Wave,* *Ki Flash*, & *Condensed Orb*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 5 (1d6+3) *Energy Damage.*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage.*\n:\n***Tyrant's Presence.*** All creatures within a 15 foot Emanation must make a *Wisdom Saving THrow* against the dark vassal energy tyrant's **Blast Save DC (DC 15).** On a failure, all affected creatures reduce their **Current Ki Points** by 1d6+4 and the dark vassal energy tyrant gains an amount equal to the result. This *Action* counts as **Blast Technique** for the purpose of **Features** and **Rules Interaction**"
  },
  "powerLevel": null,
  "ac": 17,
  "acNote": "",
  "hp": 21,
  "hpDice": "3d6+12",
  "ki": 26,
  "stamina": 8,
  "breatherPool": 4,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 14",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_dark_vassal_energy_tyrant"
 },
 {
  "name": "Dark Vassal Juggernaut",
  "meta": "Large Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Dark Vassal",
  "stats": {
   "str": 18,
   "dex": 12,
   "con": 20,
   "int": 8,
   "wis": 12,
   "cha": 6
  },
  "traits": [
   {
    "name": "Scaled Exterior",
    "text": "The dark vassal juggernaut has 2 points of *Damage Reduction*"
   },
   {
    "name": "Titan Techniques",
    "text": "The dark vassal juggernaut can use its **Strength Ability Modifier** for the *Reinforced* **Ki Technique.**"
   }
  ],
  "sections": {
   "Feats": "- Tough",
   "Techniques": "***Ki Rank 1.*** *Erupting Energy*, *Gut Punch*, *Reinforced*, & *Thunderous Uppercut*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 6 (1d6+3) *Bludgeoning Damage.*"
  },
  "powerLevel": null,
  "ac": 17,
  "acNote": "Natural **AC**",
  "hp": 26,
  "hpDice": "3d6+17",
  "ki": 22,
  "stamina": 9,
  "breatherPool": 7,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_dark_vassal_juggernaut"
 },
 {
  "name": "Dark Vassal Ravager",
  "meta": "Medium Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Dark Vassal",
  "stats": {
   "str": 18,
   "dex": 18,
   "con": 16,
   "int": 10,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Rending Fists",
    "text": "When the dark vassal ravager would deal damage with an **Unarmed Strike** or **Unramed Technique**, it increases the damage dealt by 3."
   },
   {
    "name": "Unyielding Fury",
    "text": "When the dark vassal ravager would deal damage with his *Opportunity Attacks*, he reduces the creature's damage by half and for every 5 feet the creature would walk, it takes 1d4+2 *Necrotic Damage* until the end of the creature's turn."
   }
  ],
  "sections": {
   "Feats": "- Reckless Attack",
   "Techniques": "***Ki Rank 1.*** *Energy Javelin,* *Infusion,* *Stomp* & *Haymaker*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 6 (1d4+4) *Energy Damage.*\n\n:\n\n***Unarmed Strike.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., *Hit:* 7 (1d6+4) *Bludgeoning Damage.*"
  },
  "powerLevel": 720,
  "ac": 18,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 20,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+6 Athletics",
  "id": "ant_demon_king_piccolo_saga_dark_vassal_ravager"
 },
 {
  "name": "Dark Vassal Winged Terror",
  "meta": "Medium Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Dark Vassal",
  "stats": {
   "str": 12,
   "dex": 20,
   "con": 12,
   "int": 8,
   "wis": 20,
   "cha": 7
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Grandpa Gohan uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Wing Buffet",
    "text": "When an **Unarmed Technique** would make an *Attack Roll*, the dark vassal winged terror may also target all creatures from a 5 foot Emanation from the triggering creature."
   }
  ],
  "sections": {
   "Feats": "- Redirect Attack",
   "Techniques": "***Ki Rank 1.*** *Assault,* *Dive Strike,* *Focused Spray* & *Suspending Uppercut*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n\n:\n\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 6 (1d6+3) *Bludgeoning Damage.* Additionally, if the *Boxer* would deal damage with his *Unarmed Strike*, he may cast a **Strike Technique** that he has access to."
  },
  "powerLevel": null,
  "ac": 16,
  "acNote": "",
  "hp": 12,
  "hpDice": "3d6+3",
  "ki": 22,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "20 ft., Fly 45 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+6 Athletics",
  "id": "ant_demon_king_piccolo_saga_dark_vassal_winged_terror"
 },
 {
  "name": "Ki Adept Martial Artist",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "General",
  "group": "Martial Artist, cont.",
  "stats": {
   "str": 10,
   "dex": 16,
   "con": 14,
   "int": 14,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Flowing Technique",
    "text": "When the martial artist would cast a **Ki Technique** that would deal damage, they may choose to make a *Basic Ki Blast* as part of casting the **Ki Technique** for no additional action economy"
   }
  ],
  "sections": {
   "Feat": "- Dragon Style\n- Ki Growth Training",
   "Techniques": "***Ki Rank 1.*** *Concussive Blast*, *Heavy Throw*, *Leg Sweep* & *Targeted Barrage*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 60/90 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage*",
   "Bonus Action": "***Martial Reflexes (4 Ki).*** Until the start of the martial artists next turn, you may increase your **AC** and all **Strength, Dexterity,** and **Constitution Saving Throws** by 1"
  },
  "powerLevel": 528,
  "ac": 16,
  "acNote": "",
  "hp": 12,
  "hpDice": "3d6+6",
  "ki": 22,
  "stamina": 6,
  "breatherPool": 4,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_ki_adept_martial_artist"
 },
 {
  "name": "Cymbal",
  "meta": "Medium Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Dark Vassal's Commanders",
  "stats": {
   "str": 18,
   "dex": 14,
   "con": 16,
   "int": 8,
   "wis": 20,
   "cha": 16
  },
  "traits": [],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Elemental Energy (Lightning)\n- Slow Fall",
   "Techniques": "***Ki Rank 1.*** *Cannon Burst*, *Lariat*, & *Sustained Explosion ☆*\n\n##### Mastery\n\n- ***Sustained Explosion.*** *Sustained Explosion* may deal *Lightning Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Shocked Condition* from the *Elemental Affliction List*.",
   "Actions": "***Unarmed Strike:*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., *Hit:* 5 (1d4+4) *Bludgeoning Damage*"
  },
  "powerLevel": 1408,
  "ac": 19,
  "acNote": "",
  "hp": 32,
  "hpDice": "8d6+8",
  "ki": 22,
  "stamina": 5,
  "breatherPool": 5,
  "speed": "30 ft., 30 ft. Fly",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_cymbal"
 },
 {
  "name": "Drum",
  "meta": "Large Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Dark Vassal's Commanders",
  "stats": {
   "str": 18,
   "dex": 14,
   "con": 18,
   "int": 12,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Powerful Beats",
    "text": "When Drum would fight against a creature that have a **Level** higher than his, he gains a **Power Bonus** equal to half of their difference in **Level**"
   },
   {
    "name": "Quick Feet",
    "text": "When a *Melee Attack* would miss Drum, he may immediately make an *Unarmed Strikes*"
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Brutal Critical\n- Ferocious Strength",
   "Techniques": "***Ki Rank 1.*** *Full Power Energy Wave*, *Heavy Throw*, *Lariat* & *Stomp*",
   "Actions": "***Multiattack.*** Drum can make three attack\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +5 to hit, range 30/60 ft., *Hit:* 4 (1d4+2) *Energy Damage*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., *Hit:* 6 (1d4+4) *Bludgeoning Damage*"
  },
  "powerLevel": 2156,
  "ac": 18,
  "acNote": "",
  "hp": 49,
  "hpDice": "7d6+28",
  "ki": 22,
  "stamina": 9,
  "breatherPool": 6,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_drum"
 },
 {
  "name": "Tambourine",
  "meta": "Medium Fiend, Lawful Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Dark Vassal's Commanders",
  "stats": {
   "str": 10,
   "dex": 20,
   "con": 12,
   "int": 8,
   "wis": 20,
   "cha": 16
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Tambourine uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Eagle Eyed Adaptation\n- Elemental Energy (Lightning)",
   "Techniques": "***Ki Rank 1.*** *Axe Kick* *Strike Combination*, *Ki Burst ☆*\n\n##### Mastery\n\n- ***Ki Burst.*** *Ki Burst* may deal *Lightning Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Shocked Condition* from the *Elemental Affliction List*.",
   "Actions": "***Multiattack.*** Tambourine can make two Unarmed Strikes Attack\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., *Hit:* 7 (1d6+4) *Bludgeoning Damage*"
  },
  "powerLevel": 1408,
  "ac": 22,
  "acNote": "",
  "hp": 32,
  "hpDice": "8d6+8",
  "ki": 22,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft., 45 ft. Fly",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_tambourine"
 },
 {
  "name": "Chiaotzu",
  "meta": "Small Humanoid (Galactic Citizen), Lawful Neutral",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Legends of the 22nd",
  "stats": {
   "str": 10,
   "dex": 18,
   "con": 12,
   "int": 8,
   "wis": 16,
   "cha": 16
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "Chiaotzu uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Uncalculated Mind",
    "text": "A creature as a bonus action may perform an **Intelligence Ability Check** against **DC** 14, on a failure, Chiaotzu gains the *Dazed Condition* until  the start of his next turn."
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Crane Style\n- Unarmed Mastery\n\n#### Trained Features\n\n- Sky Dancing\n- Psychic Reach",
   "Techniques": "***Ki Rank 1.*** *Energy Rain*, *Dodon-Pa*, *Psychokinesis ☆*\n\n##### Mastery\n\n- ***Psychokinesis.*** Psychokinesis counts as an **Unarmed Technique**",
   "Actions": "***Multiattack.*** Chiaotzu can make two attacks between his Psychic Blast and Unarmed Strikes\n\n***Psychic Blast.*** *Melee Weapon Attack:* +6 to hit, range 60/90 ft., *Hit:* 7 (1d4+5) *Psychic Damage.*\n\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 7 (1d4+5) *Bludgeoning Damage*",
   "Bonus Action": "***Psychic Focus.*** All **Techniques** that deals *Psychic Damage* gain a +1 *Static Bonus* so long as Chiaotzu is *Concentrating* on this Action."
  },
  "powerLevel": 1408,
  "ac": 19,
  "acNote": "",
  "hp": 32,
  "hpDice": "8d6+8",
  "ki": 22,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "30 ft., 20 ft. Fly",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "skills": "Acrobatics +8, Perception +8",
  "id": "ant_demon_king_piccolo_saga_chiaotzu"
 },
 {
  "name": "King Chappa",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Legends of the 22nd",
  "stats": {
   "str": 12,
   "dex": 12,
   "con": 12,
   "int": 9,
   "wis": 14,
   "cha": 12
  },
  "traits": [
   {
    "name": "Eight-Handed Technique",
    "text": "When King Chappa would take the *Flurry* **Snap Decision**, he may spend the **Stamina Cost** against to make an additional attack as part of the *Attack Action*."
   }
  ],
  "sections": {
   "Feat": "- Steadfast Strikes",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Jab* *Strike Combination*, & *Suspending Uppercut*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 3 (1d4+1) *Bludgeoning Damage*"
  },
  "powerLevel": 768,
  "ac": 15,
  "acNote": "",
  "hp": 24,
  "hpDice": "6d6+6",
  "ki": 16,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Strength +5",
  "skills": "Athletics +6",
  "id": "ant_demon_king_piccolo_saga_king_chappa"
 },
 {
  "name": "Krillin",
  "meta": "Small Humanoid (Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Legends of the 22nd",
  "stats": {
   "str": 16,
   "dex": 16,
   "con": 18,
   "int": 12,
   "wis": 18,
   "cha": 12
  },
  "traits": [
   {
    "name": "Momentous Power",
    "text": "When Krillin would succeed a *Saving Throw*, he gains a +1 **Power Bonus** until the end of the round, up to a maximum of 1."
   },
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Snap Afterimage",
    "text": "Once per round, when a Krillin would take a **Snap Decision**, he may immediately move up to his *Movement Speed*."
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n\n- Bottomless Reserve\n- Turtle Style\n- Slow Fall",
   "Techniques": "***Ki Rank 1.*** *Finger Shot ☆,* *Impact Beam,* *Infusion*, & *Kamehameha*\n\n##### Mastery\n\n- ***Finger Shot.*** Krillin can use a Bonus Action to cast Finger Shot",
   "Actions": "***Multiattack.*** Krillin can make two *Unarmed Strikes*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage*"
  },
  "powerLevel": 3136,
  "ac": 19,
  "acNote": "",
  "hp": 56,
  "hpDice": "8d6+32",
  "ki": 28,
  "stamina": 7,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 15",
  "languages": "Common",
  "skills": "Athletics +6, Acrobatics +8, History +4, Insight +8",
  "id": "ant_demon_king_piccolo_saga_krillin"
 },
 {
  "name": "Man-Wolf",
  "meta": "Medium Humanoid (Galactic Citizen), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Legends of the 22nd",
  "stats": {
   "str": 18,
   "dex": 14,
   "con": 18,
   "int": 10,
   "wis": 10,
   "cha": 12
  },
  "traits": [
   {
    "name": "Sharpened Claws",
    "text": "When Man-Wolf would deal damage from a *Critical Hit*, the creature makes the next *Attack Roll* at disadvantage."
   },
   {
    "name": "Moonlit Transformation",
    "text": "While Man-Wolf is under Sunlight, he gains the benefit of his *Wolf Body*. While in his *Wolf Body*, he increases his *Movement Speed* by 15 ft., he may choose to deal *Slashing Damage* for his **Unarmed Technique**, and he gains 1 Rank of *Weighted (Light)*"
   },
   {
    "name": "Wolf Hide",
    "text": "While Man-Wolf is benefiting from his *Wolf Body*, he gains the 2 *Damage Reduction.*"
   }
  ],
  "sections": {
   "Feat": "#### Feats\n\n- Brutal Critical\n- Reckless Attack",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Jab*, *Lariat*, & *Suplex*",
   "Actions": "***Multiattack.*** While Man-Wolf is under the benefit of his *Wolf Body*, he can two *Unarmed Strikes*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 7 (1d4+5) *Bludgeoning Damage.* While Man-Wolf is under the benefits of his *Wolf Body*, he increases his Unarmed Strike's damage by 2 and may choose to deal *Slashing Damage* instead"
  },
  "powerLevel": 1408,
  "ac": 15,
  "acNote": "",
  "hp": 32,
  "hpDice": "8d6+8",
  "ki": 22,
  "stamina": 5,
  "breatherPool": 6,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_man_wolf"
 },
 {
  "name": "Pamput",
  "meta": "Medium Humanoid (Galactic Citizen), True Neutral",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Legends of the 22nd",
  "stats": {
   "str": 18,
   "dex": 16,
   "con": 16,
   "int": 14,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Lightning Strikes",
    "text": "When the boxer would hit with an *Unarmed Strike*, they may cast an **Unarmed Technique** as a Bonus Action. Casting a **Technique** this way increases the **Technique's** Casting Cost by half of its **Casting Cost.**"
   },
   {
    "name": "Steel Punches",
    "text": "When the boxer would hit a creature with an *Unarmed Strike*, they must make a **Constitution Saving Throw** against their **Unarmed Save DC**, on a failure, they reduce their **AC** & **Saving Throws** by 1 until the start of the boxer's next turn. This **Feature** cannot stack with each other."
   }
  ],
  "sections": {
   "Feats": "- Bottomless Reserves\n- Redirect Attack",
   "Techniques": "***Ki Rank 1.*** *Assault,* *Strike Combination,* *Jab* & *Suspending Uppercut*",
   "Actions": "***Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n\n:\n\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 6 (1d6+3) *Bludgeoning Damage.* Additionally, if the *Boxer* would deal damage with his *Unarmed Strike*, he may cast a **Strike Technique** that he has access to.",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 1152,
  "ac": 15,
  "acNote": "",
  "hp": 36,
  "hpDice": "6d6+18",
  "ki": 16,
  "stamina": 7,
  "breatherPool": 5,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_demon_king_piccolo_saga_pamput"
 },
 {
  "name": "Demon King Piccolo (Elder)",
  "meta": "Medium Humanoid (Namekian), Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Demon King Piccolo (Elder)",
  "stats": {
   "str": 20,
   "dex": 18,
   "con": 18,
   "int": 16,
   "wis": 14,
   "cha": 16
  },
  "traits": [
   {
    "name": "Body of the Nameless Namekian",
    "text": "Once per round, Demon King Piccolo (Elder) may gain advantage on a *Saving Throw* of his choice."
   },
   {
    "name": "Demon Enhancement",
    "text": "All **Ki Techniques** that he casts may benefit from the *Upgraded Iconic Mastery* even if they already have an *Iconic Mastery*, but only if they do not already have the *Upgraded Iconic Mastery*"
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Demon King Piccolo (Elder) gains 1 rank of *Weighted (Light)* **Legendary Resistance (3/Day).** If Demon King Piccolo (Elder) fails a Saving Throw, it can choose to succeed instead\\"
   }
  ],
  "sections": {
   "Feats & Trained Feats": "#### Feats\n\n- Aggressive Aura\n- Beam Mastery (2)\n- Brutal Critical\n- Flight\n- Ki Sense",
   "Techniques": "***Ki Rank 1.*** *Distracting Barrage ☆*, *Finger Shot*, *Gut Punch ☆*, *Jab*, *Laser Vision*, *Ki Flash ☆*\n\n##### Mastery\n\n- ***Distracting Barrage.*** Distracting Barrage may be used as a bonus action\n- ***Gut Punch.*** Gut Punch may land a critical hit on a roll of 19-20\n- ***Ki Flash.*** Ki Flash counts as a **Beam Technique**",
   "Actions": "***Multiattack.*** Demon King Piccolo can use his Evil Wave Explosion. It then makes two attacks\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage.*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 7 (1d6+4) *Energy Damage.*\n:\n***Evil Wave Explosion.*** All creature of Demon King Piccolo's (Elder) within a 15 foot Emanation must make a **DC** 15 *Wisdom Saving Throw*, on a failure, they take 1d6+6 *Necrotic Damage* and they gain the *Frightened Condition* for 1 minute. A creature can repeat the *Saving Throw* at the end of each of its turn, ending the effects on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the Demon King Piccolo's (Elder) Evil Wave Explosion for the next 24 hours. This action counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction**",
   "Iconic Action": "*Immediately after another creature's turn, the Demon King Piccolo (Elder)  can expend a use to take one of the following actions.*\n:\n***Cast a Technique.*** Demon King Piccolo (Elder) can cast a *Rank 1* **Technique**\n:\n***Iconic Snap.*** Demon King Piccolo (Elder) can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Demon King Piccolo (Elder) can move up to its *Movement Speed*",
   "Phases": "When Demon King Piccolo (Elder) is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 61                  | When Demon King Piccolo (Elder) would enter Phase 2, all creatures within a 15 ft. Emanation from Demon King Piccolo must make a *Dexterity Saving Throw*, on a failure, they are *Launched* 30 feet away from him. Additionally at the start of his turn until combat is over, he gains 10 *Temporary Hit Points*. |\n| 3     | 30                   | Once per round, Demon King Piccolo (Elder) may apply the **Demon's Enhancement** trait twice to a **Technique**, gaining the benefit of the *Upgraded Icoinc Masteyr twice.*   |"
  },
  "powerLevel": 7098,
  "ac": 20,
  "acNote": "",
  "hp": 91,
  "hpDice": "13d6+52",
  "ki": 39,
  "stamina": 20,
  "breatherPool": 7,
  "speed": "40 ft., Fly 40 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "savingThrows": "Strength +8, Dexterity +7, Wisdom +5",
  "skills": "Athletics +8, History +6, Investigation +6, Ki Control +5, Perception +8",
  "id": "ant_demon_king_piccolo_saga_demon_king_piccolo_elder"
 },
 {
  "name": "Demon King Piccolo (Youth)",
  "meta": "Medium Humanoid (Namekian), Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Demon King Piccolo (Youth)",
  "stats": {
   "str": 22,
   "dex": 18,
   "con": 20,
   "int": 16,
   "wis": 14,
   "cha": 16
  },
  "traits": [
   {
    "name": "Body of the Nameless Namekian",
    "text": "Once per round, Demon King Piccolo may gain advantage on a *Saving Throw* of his choice."
   },
   {
    "name": "Demon Enhancement",
    "text": "All **Ki Techniques** that he casts may benefit from the *Upgraded Iconic Mastery* even if they already have an *Iconic Mastery*, but only if they do not already have the *Upgraded Iconic Mastery*"
   },
   {
    "name": "Eternal Body",
    "text": "Demon King Piccolo is immune to any spell or effect that would alter its form"
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Demon King Piccolo (Elder) gains 1 rank of *Weighted (Light)* **Legendary Resistance (3/Day).** If Demon King Piccolo (Youth) fails a Saving Throw, it can choose to succeed instead"
   }
  ],
  "sections": {
   "Feats & Trained Feats": "#### Feats\n\n- Aggressive Aura\n- Beam Mastery (2)\n- Brutal Critical\n- Flight\n- Ki Sense",
   "Techniques": "***Ki Rank 1.*** *Distracting Barrage ☆*, *Finger Shot*, *Gut Punch ☆*, *Jab*, *Laser Vision*, *Mouth Blast ☆*\n\n##### Mastery\n\n- ***Distracting Barrage.*** Distracting Barrage may be used as a bonus action\n- ***Gut Punch.*** Gut Punch may land a critical hit on a roll of 19-20\n- ***Mouth Blast.*** Mouth Blast counts as a **Beam Technique**",
   "Actions": "***Multiattack.*** Demon King Piccolo (Youth) can use his Evil Wave Explosion. It then makes two attacks\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., *Hit:* 9 (1d6+6) *Bludgeoning Damage.*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., *Hit:* 7 (1d6+4) *Energy Damage.*\n:\n***Evil Wave Explosion.*** Each creature of Demon King Piccolo's (Youth) choice must make a **DC** 16 *Wisdom Saving Throw*, on a failure, they take 1d6+6 *Necrotic Damage* and they gain the *Frightened Condition* for 1 minute. A creature can repeat the *Saving Throw* at the end of each of its turn, ending the effects on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the Demon King Piccolo's (Elder) Evil Wave Explosion for the next 24 hours. This action counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction**",
   "Bonus Action": "***Ruthless Power (Phase 3 Only).*** When Demon King Piccolo would deal damage to a creature with a **Technique** that is benefiting from the *Upgraded Iconic Mastery*, they must make a *Constitution Saving Throw*, on a failure, they must roll under the *Crippled Condition* Table",
   "Iconic Action": "*Immediately after another creature's turn, the Demon King Piccolo (Youth)  can expend a use to take one of the following actions.*\n:\n***Cast a Technique.*** Demon King Piccolo (Youth) can cast a *Rank 1* **Technique**\n:\n***Iconic Snap.*** Demon King Piccolo (Youth) can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Demon King Piccolo (Youth) can move up to its *Movement Speed*",
   "Phases": "When Demon King Piccolo (Youth) is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 61                  |At the start of his turn until combat is over, he gains 15 *Temporary Hit Points*. While he has *Temporary Hit Points*, he gains the *Enraged Condition*.|\n| 3     | 30                   | Once per round, Demon King Piccolo (Youth) may apply the **Demon's Enhancement** trait twice to a **Technique**, gaining the benefit of the *Upgraded Icoinc Mastery* twice.  |"
  },
  "powerLevel": 9408,
  "ac": 21,
  "acNote": "",
  "hp": 112,
  "hpDice": "14d6+70",
  "ki": 42,
  "stamina": 22,
  "breatherPool": 8,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "savingThrows": "Strength +8, Dexterity +7, Wisdom +5",
  "skills": "Athletics +8, History +6, Investigation +6, Ki Control +5, Perception +8",
  "conditionImmunities": "Altered Condition",
  "id": "ant_demon_king_piccolo_saga_demon_king_piccolo_youth"
 },
 {
  "name": "Tien Shinhan",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Neutral",
  "era": "Dragon Ball",
  "saga": "Demon King Piccolo Saga",
  "tier": "Elite",
  "group": "Tien Shinhan",
  "stats": {
   "str": 20,
   "dex": 18,
   "con": 18,
   "int": 16,
   "wis": 18,
   "cha": 14
  },
  "traits": [
   {
    "name": "Three Eyed Magic",
    "text": "Tien has 10 feet of *Truesight*. As a Bonus Action, he may gain 30 feet instead of 10 feet until the end of his turn."
   },
   {
    "name": "Dangerous Technique",
    "text": "When a creature would fail a *Saving Throw* from a **Technique** by Tien Shinhan, he may increase the **Technique's Casting Cost** by 1/2 of its **Ki Cost**. Tien Shinhan may choose to gain advantage on the next *attack roll* he would make or force the creature to have disadvantage on the next *Saving Throw* he would force."
   },
   {
    "name": "Master Push Back",
    "text": "When  Tien Shinhan would take the *Push Back* **Snap Decision**, hey may add an addiitonal 2 points of reducing damage per every **Stamina** spent on the **Snap Decision.**"
   },
   {
    "name": "Ruthless Tactics",
    "text": "Once per round, when Tien Shinhan would target  a creature that has less than half of its **Maximum Hit Points** and has the *Prone Condition*, he may increase his the damage die step of his **Techniques** by a single step."
   }
  ],
  "sections": {
   "Feats & Trained Feats": "#### Feats\n- Crane Style\n- Final Dregs\n- Flight\n- Ki Sense\n\n#### Trained Features\n- Fist of the Four Witches\n- Sky Dancing",
   "Forms": "- Four Witches",
   "Techniques": "***Ki Rank 1.*** *Dodon-Pa ☆,* *Strike Combination,* *Jab,* *Solar Flare,* *Tri-Beam*",
   "Actions": "***Multiattack.*** Tien can make two attacks between his Unarmed Strikes or Ki Blast\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage.*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 7 (1d6+4) *Bludgeoning Damage.*",
   "Phases": "When Tien Shinhan is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 56                  | Tien Shinhan can activate the *Four Witches* **Form** without expending any action. Additionally, once per round, when a creature he can see casts a **Technique** that requires more than one *Attack Roll*, Tien Shinhan can use his reaction to cast **Strike Combination** against that creature. On a hit, the target must make a *Constitution Saving Throw* against his **Unarmed Save DC**, or the **Technique** fails and has no effect. |\n| 3     | 28                  | While Tien Shinhan is not benefiting from the *Four Witches* **Form**, he gains the benefit of +2 **Stable Power** and he increases all available *Movement Speed* by 10 feet. Additionally, when he would cast a **Technique**, he may grant it the *Sanguine Iconic Mastery* to the **Technique**, even if it already has an *Iconic Mastery*, but only if they do not already have the *Sanguine Iconic Mastery*. A **Technique** may increase its damage dealt by 8. |"
  },
  "powerLevel": 5040,
  "ac": 21,
  "acNote": "",
  "hp": 84,
  "hpDice": "12d6+48",
  "ki": 30,
  "stamina": 16,
  "breatherPool": 6,
  "speed": "35 ft",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 20",
  "languages": "Common",
  "savingThrows": "Dexterity +8, Wisdom +8",
  "skills": "Athletics +8, Acrobatics +7, Insight +7, Perception +10, Stealth +7",
  "id": "ant_demon_king_piccolo_saga_tien_shinhan"
 },
 {
  "name": "Ki Master Boxer",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "General",
  "group": "Boxer, Cont.",
  "stats": {
   "str": 18,
   "dex": 16,
   "con": 18,
   "int": 12,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Burning Stamina",
    "text": "When the boxer would take *Rush* **Snap Decision**, they may double the movement speed they would gain from it."
   },
   {
    "name": "Lightning Strikes",
    "text": "When the boxer would hit with an *Unarmed Strike*, they may cast an **Unarmed Technique** as a Bonus Action. Casting a **Technique** this way increases the **Technique's** Casting Cost by half of its **Casting Cost.**"
   },
   {
    "name": "Steel Punches",
    "text": "When the boxer would hit a creature with an *Unarmed Strike*, they must make a **Constitution Saving Throw** against their **Unarmed Save DC**, on a failure, they reduce their **AC** & **Saving Throws** by 1 until the start of the boxer's next turn. This **Feature** cannot stack with each other."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura\n- Bottomless Reserve\n- Brutal Critical",
   "Techniques": "***Ki Rank 1.*** *Axe Kick*, *Gut Punch*, *Haymaker*, *Infusion*, *Jab*, *Propulsion Beam*",
   "Actions": "***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n\n:\n\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 7 (1d6+4) *Bludgeoning Damage.* Additionally, if the *Boxer* would deal damage with his *Unarmed Strike*, he may cast a **Strike Technique** that he has access to.",
   "Reaction": "***Dempsey Roll.*** Whenever an attack would miss, the boxer may spend their reaction to make an *Unarmed Strike* against the triggering creature. The next time the triggering creature would attempt to make an attack roll against them, they make it at disadvantage."
  },
  "powerLevel": 1134,
  "ac": 16,
  "acNote": "",
  "hp": 21,
  "hpDice": "3d6+12",
  "ki": 27,
  "stamina": 10,
  "breatherPool": 7,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "+6 Athletics",
  "id": "ant_piccolo_jr_saga_ki_master_boxer"
 },
 {
  "name": "Ki Master Martial Artist",
  "meta": "Medium Humanoid (Beastman/Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "General",
  "group": "Martial Artist",
  "stats": {
   "str": 10,
   "dex": 18,
   "con": 14,
   "int": 14,
   "wis": 18,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dexterous Combat",
    "text": "The martial artist uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Flowing Technique",
    "text": "When the martial artist would cast a **Ki Technique** that would deal damage, they may choose to make a *Basic Ki Blast* as part of casting the **Ki Technique** for no additional action economy"
   }
  ],
  "sections": {
   "Feat": "- Fly\n- Dragon Style\n- Ki Growth Training",
   "Techniques": "***Ki Rank 1.*** *Concussive Blast*, *Condensed Orb*, *Dust Maker*, *Heavy Throw*, *Leg Sweep* & *Targeted Barrage*",
   "Actions": "***Multiattack.*** The martial artist can make two attacks with either their Unarmed Strike or Basic Ki Blast\n:\n***Basic Ki Blast.*** *Melee Weapon Attack:* +6 to hit, range 60/90 ft., *Hit:* 5 (1d4+3) *Energy Damage.*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Bludgeoning Damage*",
   "Bonus Action": "***Martial Reflexes (4 Ki).*** Until the start of the martial artists next turn, you may increase your **AC** and all **Strength, Dexterity,** and **Constitution Saving Throws** by 1"
  },
  "powerLevel": 1560,
  "ac": 16,
  "acNote": "",
  "hp": 20,
  "hpDice": "4d6+8",
  "ki": 39,
  "stamina": 8,
  "breatherPool": 5,
  "speed": "40 ft., Fly 40 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_piccolo_jr_saga_ki_master_martial_artist"
 },
 {
  "name": "Chi Chi",
  "meta": "Medium Humanoid (Galactic Citizen), Neutral Good",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "Elite",
  "group": "Legend of the 23rd",
  "stats": {
   "str": 16,
   "dex": 18,
   "con": 16,
   "int": 14,
   "wis": 18,
   "cha": 16
  },
  "traits": [
   {
    "name": "Body Over Speed",
    "text": "At the start of Chi-Chi's turn, Chi-Chi may reduce her **Dexterity Ability Score** to a minimum of a 10 on her Score. She may increase her **Strength Ability Score** by the amount spent. This last until the start of her next turn."
   },
   {
    "name": "Dexterous Combat",
    "text": "Chi-Chi uses her **Dexterity Ability Score** for her **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Ox Strength (8 Ki)",
    "text": "When Chi Chi would deal damage with an *Unarmed Strike* or **Unarmed Technique**, she may increase the damage by double her **Strength Ability Modifier**"
   }
  ],
  "sections": {
   "Feat": "- Turtle Style\n- Iconic Technique (Blitzing)\n- Heightened Instincts",
   "Techniques": "***Ki Rank 1.*** *Axe Kick*, *Infusion*, *Jab*, *Strike Combination (Blitzing)*, *Submission Hold*, & *Suplex*",
   "Actions": "***Multiattack.*** Chi Chi can make two Unarmed Strikes\n:\n***Unarmed Strike.***"
  },
  "powerLevel": 3888,
  "ac": 18,
  "acNote": "",
  "hp": 54,
  "hpDice": "9d6+27",
  "ki": 36,
  "stamina": 9,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "skills": "Acrobatics +7, Insight +7, Medicine +7, Survival +7",
  "id": "ant_piccolo_jr_saga_chi_chi"
 },
 {
  "name": "King Chappa",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "Elite",
  "group": "Legend of the 23rd",
  "stats": {
   "str": 12,
   "dex": 14,
   "con": 12,
   "int": 9,
   "wis": 16,
   "cha": 12
  },
  "traits": [
   {
    "name": "Eight-Handed Technique",
    "text": "When King Chappa would take the *Flurry* **Snap Decision**, he may spend the **Stamina Cost** against to make an additional attack as part of the *Attack Action*."
   }
  ],
  "sections": {
   "Feat": "- Alert\n- Steadfast Strikes",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Jab* *Strike Combination*, & *Suspending Uppercut*",
   "Actions": "***Unarmed Strike.*** *Melee Weapon Attack:* +5 to hit, reach 5 ft., *Hit:* 3 (1d4+1) *Bludgeoning Damage*"
  },
  "powerLevel": 1152,
  "ac": 17,
  "acNote": "",
  "hp": 32,
  "hpDice": "8d6+8",
  "ki": 18,
  "stamina": 5,
  "breatherPool": 3,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Strength +5",
  "skills": "Athletics +6",
  "id": "ant_piccolo_jr_saga_king_chappa"
 },
 {
  "name": "Piccolo Jr.",
  "meta": "Medium Humanoid (Namekian), Chaotic Evil",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "Iconic",
  "group": "Piccolo Jr.",
  "stats": {
   "str": 22,
   "dex": 20,
   "con": 20,
   "int": 16,
   "wis": 22,
   "cha": 16
  },
  "traits": [
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Piccolo Jr. gains 1 rank of *Weighted (Light)* **Legendary Resistance (3/Day).** If Piccolo Jr. fails a Saving Throw, it can choose to succeed instead"
   },
   {
    "name": "Destructive Power",
    "text": "All **Ki Techniques** that you cast may benefit from the *Incantation Iconic Mastery* even if they already have an *Iconic Mastery*, but only if they do not already have the *Incantation Iconic Mastery*"
   },
   {
    "name": "Stunted Regeneration",
    "text": "Piccolo Jr. has a pool of 54 **Hit Points**. He may expend any number of **Hit Points** as an action or bonus on his turn to regain that many **Hit Points** Additionally as an action, he may expend 30 of these **Hit Points** to regenerate a limb lost due to the *Crippled Condition.* This pool refreshes on a Long Rest."
   }
  ],
  "sections": {
   "Feats & Trained Feats": "#### Feats\n\n- Flight\n- Iconic Technique (Homing)\n- Ki Sense\n- Ki Stealth\n\n#### Trained Feats\n\n- Mafuba",
   "Forms": "- Titan Namekian",
   "Techniques": "***Ki Rank 1.*** *Evil Containment Wave*, *Explosive Wave*, *Full Power Energy Wave (Homing)*, *Jab*, *Laser Vision*, *Masenko*, *Stomp*",
   "Actions": "***Multiattack.*** Piccolo Jr. can use his Antennae Beam. It then makes two attacks.\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +9 to hit, reach 5 ft., *Hit:* 9 (1d6+6) *Bludgeoning Damage.*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., *Hit:* 8 (1d6+5) *Energy Damage.*\n:\n***Antennae Beam (Recharge 5-6).*** A creature within 60 feet from Piccolo Jr. must make a *Constitution Saving Throw*, on a failure, they take 2d8+10 *Lightning Damage* and gain the *Restrained Condition* until the end of his next turn. This aciton counts as a **Beam Technique** for the purpose of **Features** and **Rules Interaction.**",
   "Bonus Action": "***Ruthless Power (Phase 3 Only).*** When Piccolo Jr. would deal damage to a creature with a **Technique** that is benefiting from the *Upgraded Iconic Mastery*, they must make a *Constitution Saving Throw*, on a failure, they must roll under the *Crippled Condition* Table",
   "Iconic Action": "*If Piccolo Jr. is fighting more than one creature, he can take Iconic Actions. Immediately after another creature's turn, the Demon King Piccolo (Youth) can expend a use to take one of the following actions.*\n:\n***Cast a Technique.*** Piccolo Jr. can cast a *Rank 1* **Technique**\n:\n***Iconic Snap.*** Piccolo Jr. can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Piccolo Jr. can move up to its *Movement Speed*",
   "Phases": "When Piccolo Jr. is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 80                  | Piccolo Jr. can activate the *Titan Namekian* **Form** without expending any action. Additionally, he may choose to activate the following **Temporary Form Improvement:** Piccolo Jr. can gain 1 Rank of *Rescaled (Maxi)* and reduce his *Movement Speed* by 15 feet. Additionally, he increases the **Ki Upkeep** by 3.|\n| 3     | 40                  |While Piccolo Jr. does not have the *Titan Namekian* active, he gains a +2 **Static Power.** Additionally he gains the *Hyper Mode Condition* for the duration of combat and he can activate the *Casting Cost* reduction effect of *Hyper Mode* once per Round  |"
  },
  "powerLevel": 12960,
  "ac": 23,
  "acNote": "",
  "hp": 120,
  "hpDice": "15d6+120",
  "ki": 54,
  "stamina": 22,
  "breatherPool": 8,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "savingThrows": "Strength +9, Dexterity +8, Wisdom +9",
  "id": "ant_piccolo_jr_saga_piccolo_jr"
 },
 {
  "name": "Tao Pai Pai (Cyborg)",
  "meta": "Medium Humanoid (Android), Neutral Evil",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "Iconic",
  "group": "Tao Pai Pai (Cyborg)",
  "stats": {
   "str": 16,
   "dex": 20,
   "con": 16,
   "int": 20,
   "wis": 16,
   "cha": 12
  },
  "traits": [
   {
    "name": "Cyborg Body",
    "text": "Tao Pai Pai (Cyborg) may count as a *Construct* for the purpose of **Features** and **Rules Interaction**"
   },
   {
    "name": "Dexterous Combat",
    "text": "Tao Pai Pai uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Legendary Resistance (2/Day)",
    "text": "If Tao Pai Pai fails a Saving Throw, it can choose to succeed instead"
   },
   {
    "name": "Killing Strike",
    "text": "Once per round, when Tao Pai Pai would hit an *Unarmed Strike* or *Ki Blast Attack*, he may deal 2d8 *Energy Damage*. If he has *advantage* on the attack roll, he increases the damage die quantity by 1"
   }
  ],
  "sections": {
   "Feat": "#### Feats\n\n- Alert\n- Crane Style\n- Fluid Combatant (Scimitar)\n- Omni Master",
   "Techniques": "***Ki Rank 1.*** *Aura Flare,* *Bombardment*, *Counterblast*, *Dodon-Pa ☆*, *Reinforcement*, & *Straight Shot*\n\n##### Mastery\n\n- **Dodon-Pa.** Dodon-Pa counts as an **Omni Technique**",
   "Actions": "***Multiattack.*** Tao Pai Pai can make three *Attacks*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage*\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., *Hit* 9 (1d8+5) *Energy Damage*",
   "Bonus Action": "***Integrated Ki Cannon (6 Ki).*** When Tao Pai Pai would fire a **Ki Technique**, he may add his Ki Blast's damage\n:\n***Prototype 3D Scanning.*** Tao Pai Pai (Cyborg) can choose one of the following benefits to gain the benefit from:\n\n- Gain a +1 **AC** to the next attack roll made against him\n- Gain a +1 bonus to the next *Saving Throw* he would make\n- Gain a +1 *Static Bonus* on the next **Technique** that he would cast",
   "Iconic Action (Group Fight Only)": "*If Tao Pai Pai. is fighting more than one creature, he can take Iconic Actions. Immediately after another creature's turn, Tao Pai Pai can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Tao Pai Pai can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Tao Pai Pai can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Tao Pai Pai can move up to its *Movement Speed*",
   "Phases": "When Tao Pai Pai is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit|\n|:-----:|:-------------------:|:------:|\n| 2     | 36                  |  Tao Pai Pai gains +1 **Stable Power** and he increases all his available *Movement Speed* by 15 feet for the duration of this combat. Additionally he may change his *Unarmed Strike's* damage to *Slashing Damage* and if he would deal damage with his *Unarmed Strike* or *Ki Blast*, he can immediately cast a **Technique** as part of his Bonus Action. |"
  },
  "powerLevel": 5616,
  "ac": 22,
  "acNote": "",
  "hp": 72,
  "hpDice": "12d6+36",
  "ki": 39,
  "stamina": 18,
  "breatherPool": 6,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "savingThrows": "Dexterity +8, Intelligence +8",
  "skills": "Acrobatics +8, Deception +4, Investigation +8, Ki Control +8, Perception +8",
  "id": "ant_piccolo_jr_saga_tao_pai_pai_cyborg"
 },
 {
  "name": "Tien Shinhan (23rd Martial Arts)",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Good",
  "era": "Dragon Ball",
  "saga": "Piccolo Jr. Saga",
  "tier": "Iconic",
  "group": "Tien Shinhan (23rd Martial Arts Tournament)",
  "stats": {
   "str": 20,
   "dex": 18,
   "con": 18,
   "int": 16,
   "wis": 20,
   "cha": 14
  },
  "traits": [
   {
    "name": "Three Eyed Magic",
    "text": "Tien has 10 feet of *Truesight*. As a Bonus Action, he may gain 30 feet instead of 10 feet until the end of his turn."
   },
   {
    "name": "Dangerous Technique",
    "text": "When a creature would fail a *Saving Throw* from a **Technique** by Tien Shinhan, he may increase the **Technique's Casting Cost** by 1/2 of its **Ki Cost**. Tien Shinhan may choose to gain advantage on the next *attack roll* he would make or force the creature to have disadvantage on the next *Saving Throw* he would force."
   },
   {
    "name": "Master Push Back",
    "text": "When  Tien Shinhan would take the *Push Back* **Snap Decision**, hey may add an addiitonal 2 points of reducing damage per every **Stamina** spent on the **Snap Decision.**"
   },
   {
    "name": "Ruthless Tactics",
    "text": "Once per round, when Tien Shinhan would target  a creature that has less than half of its **Maximum Hit Points** and has the *Prone Condition*, he may increase his the damage die step of his **Techniques** by a single step."
   }
  ],
  "sections": {
   "Feats & Trained Feats": "#### Feats\n- Crane Style\n- Eagle Eyed Adaptation\n- Final Dregs\n- Ki Sense\n\n#### Trained Features\n- Fist of the Four Witches\n- Sky Dancing",
   "Forms": "- Four Witches",
   "Techniques": "***Ki Rank 1.*** *Binding Clone*, *Dodon-Pa ☆,* *Jab*, *Solar Flare*, *Strike Combination,* *Tri-Beam*",
   "Actions": "***Multiattack.*** Tien can make two attacks between his Unarmed Strikes or Ki Blast\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 8 (1d6+5) *Bludgeoning Damage.*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 7 (1d6+4) *Energy Damage.*",
   "Phases": "When Tien Shinhan is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 46                  | Tien gains a +2 **Stable Power Bonus** and he increases all available *Movement Speed* by 15 feet for the duration of this combat. Additionally he gains *Combat Clone* and *Accelerating Clone*.  |"
  },
  "powerLevel": 8736,
  "ac": 21,
  "acNote": "",
  "hp": 91,
  "hpDice": "13d6+48",
  "ki": 48,
  "stamina": 16,
  "breatherPool": 7,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 20",
  "languages": "Common",
  "savingThrows": "Dexterity +8, Wisdom +8",
  "skills": "Athletics +8, Acrobatics +7, Insight +7, Perception +10, Stealth +7",
  "id": "ant_piccolo_jr_saga_tien_shinhan_23rd_martial_arts"
 },
 {
  "name": "Earth's Ferocisaurus",
  "meta": "Huge Beast, Unaligned",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Dinosaurs of Earth",
  "stats": {
   "str": 22,
   "dex": 14,
   "con": 18,
   "int": 2,
   "wis": 10,
   "cha": 9
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The ferocisaurus cannot take the *Gather Ki Action.*"
   }
  ],
  "sections": {
   "Actions": "***Multiattack.*** The fercisaurus makes one Bite attack and one Tail attack.\n:\n***Bite.*** Melee Attack Roll: +0, reach 10 ft. Hit: 14 (2d8+6) Piercing damage.\n:\n***Tail.*** Melee Attack Roll: +10, reach 15 ft. Hit: 12 (2d6+6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.",
   "Bonus Action": "***Dash.*** The ferocisaurus can move up to his *Movement Speed*. Additionally when it takes the *Dash* Action this way, it may expend 6 ki to make a Tail Attack."
  },
  "powerLevel": 1008,
  "ac": 16,
  "acNote": "Natural AC",
  "hp": 28,
  "hpDice": "4d6+16",
  "ki": 18,
  "stamina": 8,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "-",
  "id": "ant_saiyan_saga_earth_s_ferocisaurus"
 },
 {
  "name": "Earth's Raptor",
  "meta": "Medium Beast, Unaligned",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Dinosaurs of Earth",
  "stats": {
   "str": 16,
   "dex": 18,
   "con": 16,
   "int": 2,
   "wis": 10,
   "cha": 9
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The raptor cannot take the *Gather Ki Action.*"
   },
   {
    "name": "Pack Tactics",
    "text": "The raptor has *advantage* on an *attack roll* against a creature if at least one of its allies is within 5 feet of the creature and the ally isn't incapacitated."
   },
   {
    "name": "Erupting Dash (8 Ki)",
    "text": "When the raptor would take the *Dash Action*, it may make a Claw Attack. If the raptor moves at least 10 feet in a straight line to a creature, it may increase its Static Bonus by 1 and increase the damage dealt by 4."
   }
  ],
  "sections": {
   "Actions": "***Claw.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. Hit: 8 (2d4+4) slashing damage."
  },
  "powerLevel": 576,
  "ac": 17,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 16,
  "stamina": 9,
  "breatherPool": 6,
  "speed": "50 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "id": "ant_saiyan_saga_earth_s_raptor"
 },
 {
  "name": "Earth's T-Rex",
  "meta": "Huge Beast, Unaligned",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Dinosaurs of Earth",
  "stats": {
   "str": 18,
   "dex": 14,
   "con": 22,
   "int": 2,
   "wis": 10,
   "cha": 9
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The T-Rex cannot take the *Gather Ki Action.*"
   },
   {
    "name": "Toughened Hide",
    "text": "The T-Rex gains 3 points of *Damage Reduction.*"
   }
  ],
  "sections": {
   "Actions": "***Multiattack.*** The T-Rex makes one Bite attack and one Tail attack.\n:\n***Bite.*** Melee Attack Roll: +8, reach 10 ft. Hit: 14 (2d8+4) Piercing damage and if the target is *Large* or *Smaller*, the affected creature is *Grappled*. A creature that is *Grappled* this way is also *Restrained*.\n:\n***Tail.*** Melee Attack Roll: +8, reach 15 ft. Hit: 12 (2d6+4) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition."
  },
  "powerLevel": 1584,
  "ac": 17,
  "acNote": "Natural AC",
  "hp": 36,
  "hpDice": "4d6+24",
  "ki": 22,
  "stamina": 10,
  "breatherPool": 8,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "-",
  "id": "ant_saiyan_saga_earth_s_t_rex"
 },
 {
  "name": "Earth's Triceratop",
  "meta": "Large Beast, Unaligned",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Dinosaurs of Earth",
  "stats": {
   "str": 18,
   "dex": 10,
   "con": 22,
   "int": 4,
   "wis": 10,
   "cha": 5
  },
  "traits": [
   {
    "name": "Ki-Inexperienced",
    "text": "The Triceratop cannot take the *Gather Ki Action.*"
   }
  ],
  "sections": {
   "Actions": "***Gore.*** *Melee Attack Roll:* +7, reach 5 ft. Hit: 10 (2d6 + 4) *Piercing damage*. If the target is Huge or smaller and the triceratops moved 20+ feet straight toward it immediately before the hit, the target takes an extra 4 (1d8) *Piercing damage* and has the Prone condition.",
   "Reactions": "***Heightened Hide (6 Ki).*** When the Triceratop would take damage, it gains 2 points of *Damage Reduction*"
  },
  "powerLevel": 720,
  "ac": 18,
  "acNote": "Natural AC",
  "hp": 36,
  "hpDice": "4d6+24",
  "ki": 30,
  "stamina": 9,
  "breatherPool": 8,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "id": "ant_saiyan_saga_earth_s_triceratop"
 },
 {
  "name": "Copyman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 16,
   "dex": 14,
   "con": 16,
   "int": 4,
   "wis": 14,
   "cha": 5
  },
  "traits": [
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Eagle-Eyed Adaptation\n- Elemental Energy (Poison)",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Full Power Energy Wave ☆*, *Submission Hold*, & *Volley ☆*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** *Full Power Energy Wave* may deal *Poison Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Poisoned Condition* from the *Elemental Affliction List*.\n\n- ***Volley.*** *Volley* has its Cones range increased by 20 feet.",
   "Actions": "***Claws.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Slashing Damage*\n:\n***Copy Form (1/LR).*** Copyman may choose a creature that is not a **Level** higher than him that it can see within 60 feet of him. For the next minute, Copyman **Statistics** changes to the targeted creature and it gains all **Species** and **Class Features** as well as any **Forms** and **Feats** the chosen creature has. Copyman also gains an amount of **Temporary Hit Points** equal to the Creature's **Maximum Hit Points.** Copyman cannot use any of its **Traits** or **Action** so long as it benefiting from htis Action.\n:\n***Self Destruction.*** While a Copyman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. All creature within a 10 foot *Emanation* must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 2d8+5 *Fire Damage*, half on a success."
  },
  "powerLevel": 720,
  "ac": 14,
  "acNote": "",
  "hp": 12,
  "hpDice": "2d6+6",
  "ki": 30,
  "stamina": 9,
  "breatherPool": 6,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "id": "ant_saiyan_saga_copyman"
 },
 {
  "name": "Kaiwareman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 16,
   "dex": 16,
   "con": 12,
   "int": 4,
   "wis": 14,
   "cha": 5
  },
  "traits": [
   {
    "name": "Pack Tactics",
    "text": "The Kaiwareman has *Advantage* on *attack rolls* taking the *Attack Action* against a creature if at least one of the wolf’s allies is within 5 feet of the creature and the ally doesn’t have the *Incapacitated condition*."
   },
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Action Surge\n- Elemental Energy (Acid)",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Full Power Energy Wave ☆*, *Submission Hold*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** *Full Power Energy Wave* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.",
   "Actions": "***Multiattack.*** The Kaiwareman is able to make two Claw or Ki Blast attacks\n:\n***Claws.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Slashing Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 13. On a failure, they take 2d6+8 *Fire Damage*, half on a success."
  },
  "powerLevel": 540,
  "ac": 15,
  "acNote": "",
  "hp": 15,
  "hpDice": "3d6+6",
  "ki": 18,
  "stamina": 8,
  "breatherPool": 4,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 2,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "id": "ant_saiyan_saga_kaiwareman"
 },
 {
  "name": "Kyukonman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 16,
   "dex": 16,
   "con": 20,
   "int": 14,
   "wis": 6,
   "cha": 5
  },
  "traits": [
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Aggressive Aura\n- Elemental Energy (Acid)",
   "Techniques": "***Ki Rank 1.*** *Full Power Energy Wave ☆*, *Reinforce*, *Submission Hold*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** *Full Power Energy Wave* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.",
   "Actions": "***Claws.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Slashing Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 13. On a failure, they take 2d6+8 *Fire Damage*, half on a success.",
   "Bonus Action": "***Hardened Body.*** Kyukonman can reduce all available *Movement Speed* to 0 and gain 3 points of *Damage Reduction.* Additionally, when Kyukonman would make an attack roll, it makes it at *Disadvantage.*"
  },
  "powerLevel": 1296,
  "ac": 17,
  "acNote": "Natural AC",
  "hp": 27,
  "hpDice": "3d6+15",
  "ki": 24,
  "stamina": 12,
  "breatherPool": 8,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_saiyan_saga_kyukonman"
 },
 {
  "name": "Jinkouman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 14,
   "dex": 16,
   "con": 16,
   "int": 4,
   "wis": 18,
   "cha": 5
  },
  "traits": [
   {
    "name": "Poisnous Claws",
    "text": "When Jinkouman would deal *Poison Damage* with a **Technique** and would roll the 1d4 *Elemental Affliction List*, it may roll twice."
   },
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Elemental Energy (Poison) (2)",
   "Techniques": "***Ki Rank 1.*** *Clinch ☆*, *Full Power Energy Wave ☆*, *Submission Hold*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** *Full Power Energy Wave* may deal *Poison Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Poisoned Condition* from the *Elemental Affliction List*.\n\n- ***Clinch.*** *Clinch* may deal *Poison Damage* instead of *Bludgeoning Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Poisoned Condition* from the *Elemental Affliction List*.",
   "Actions": "***Multiattack.*** The Kaiwareman is able to make two Claw or Ki Blast attacks\n:\n***Claws.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., *Hit:* 5 (1d4+3) *Poison Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 5 (1d4+3) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 2d4+4 *Poison Damage* and they gain the *Poisoned Condition*, half on a success and no additional effect."
  },
  "powerLevel": 1296,
  "ac": 15,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 36,
  "stamina": 9,
  "breatherPool": 6,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 14",
  "languages": "Common",
  "id": "ant_saiyan_saga_jinkouman"
 },
 {
  "name": "Saibabrute",
  "meta": "Large Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 22,
   "dex": 14,
   "con": 18,
   "int": 4,
   "wis": 12,
   "cha": 5
  },
  "traits": [
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Elemental Energy (Acid)\n- Tough",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Gathered Beam ☆*, *Stomp ☆*, & *Suspending Uppercut*\n\n##### Mastery\n\n- ***Gathered Beam.*** *Gathered Beam* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.\n\n- ***Stomp.*** *Stomp* may deal *Acid Damage* instead of *Bludgeoning Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.",
   "Actions": "***Multiattack.*** The Saibabrute is able to cast 1 **Strike Technique** of its choice. Afterward it can make two Claws\n:\n***Claws.*** *Melee Weapon Attack:* +9 to hit, reach 10 ft., *Hit:* 11 (1d10+6) *Slashing Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 3d8+10 *Fire Damage* and they gain the *Poisoned Condition*, half on a success and no additional effect."
  },
  "powerLevel": 2400,
  "ac": 14,
  "acNote": "",
  "hp": 40,
  "hpDice": "4d6+24",
  "ki": 30,
  "stamina": 10,
  "breatherPool": 7,
  "speed": "30 ft., Fly 20 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_saiyan_saga_saibabrute"
 },
 {
  "name": "Saibaman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 18,
   "dex": 18,
   "con": 18,
   "int": 4,
   "wis": 14,
   "cha": 5
  },
  "traits": [
   {
    "name": "Clawed Hands",
    "text": "When the Saibaman would cast an *Unarmed Technique*, it may change the damage type to *Slashing Damage.*"
   },
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Elemental Energy (Acid)\n- Grappler",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Full Power Energy Wave ☆*, *Submission Hold*, & *Volley ☆*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** *Full Power Energy Wave* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.\n\n- ***Volley.*** *Volley* has its Cones range increased by 20 feet.",
   "Actions": "***Multiattack.*** The Saibaman is able to make two Claw or Ki Blast attacks\n:\n***Claws.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., *Hit:* 7 (1d6+4) *Slashing Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 6 (1d6+4) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 3d8+10 *Fire Damage*, half on a success."
  },
  "powerLevel": 1386,
  "ac": 16,
  "acNote": "",
  "hp": 21,
  "hpDice": "3d6+12",
  "ki": 33,
  "stamina": 10,
  "breatherPool": 7,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_saiyan_saga_saibaman"
 },
 {
  "name": "Saiman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 14,
   "dex": 22,
   "con": 14,
   "int": 4,
   "wis": 16,
   "cha": 5
  },
  "traits": [
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Elemental Energy (Acid)\n- Unlock Ki Growth",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Ki Flash ☆* *Mouth Blast ☆*, *Submission Hold*\n\n##### Mastery\n\n- ***Ki Flash.*** *Ki Flash* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.\n\n- ***Mouth Blast.*** *Mouth Blast* may target up to two creatures instead of one.",
   "Actions": "***Multiattack.*** The Saibaman is able to make two Claw or Ki Blast attacks\n:\n***Claws.*** *Melee Weapon Attack:* +9 to hit, reach 5 ft., *Hit:* 8 (1d4+6) *Slashing Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +9 to hit, range 30/60 ft., *Hit:* 9 (1d6+6) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 2d6+6 *Fire Damage*, half on a success."
  },
  "powerLevel": 1512,
  "ac": 18,
  "acNote": "",
  "hp": 21,
  "hpDice": "3d6+6",
  "ki": 36,
  "stamina": 10,
  "breatherPool": 5,
  "speed": "30 ft., Fly 30 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "id": "ant_saiyan_saga_saiman"
 },
 {
  "name": "Tennenman",
  "meta": "Small Plant, Chaotic Neutral",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "General",
  "group": "Saibamen",
  "stats": {
   "str": 12,
   "dex": 20,
   "con": 16,
   "int": 4,
   "wis": 12,
   "cha": 5
  },
  "traits": [
   {
    "name": "Afterimage",
    "text": "Once per round, when an attack would miss Tennenman, he may move up to 20 feet. This *Movement* does not trigger *Opportunity Attacks.* **Dexterous Combat.** Saiman uses his **Dexterity Ability Score** for his **Unarmed Technique Casting Ability Modifier**"
   },
   {
    "name": "Photosynthetic Strength",
    "text": "While under direct sunlight, when the Saibaman would cast a **Technique**, it may choose one  benefit within the *Charging a Technique* Section."
   }
  ],
  "sections": {
   "Feats": "- Elemental Energy (Acid)",
   "Techniques": "***Ki Rank 1.*** *Distracting Barrage*, *Energy Rain ☆*, *Jab*, *Thunderous Uppercut*\n\n##### Mastery\n\n- ***Energy Rain.*** *Energy Rain* may deal *Acid Damage* instead of *Energy Damage*, additionally, when you would deal damage, you may roll a 1d4. On a 1, you deal the *Corrosive Condition* from the *Elemental Affliction List*.",
   "Actions": "***Multiattack.*** The Saibaman is able to make two Claw or Ki Blast attacks\n:\n***Claws.*** *Melee Weapon Attack:* +9 to hit, reach 5 ft., *Hit:* 8 (1d4+6) *Slashing Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +9 to hit, range 30/60 ft., *Hit:* 9 (1d6+6) *Energy Damage*\n:\n***Self Destruction.*** While a Saibaman has a creature with the *Restrained Condition*, it can reduce its **Hit Points** to 0. The targeted creature must make a *Strength Saving Throw* against **DC** 15. On a failure, they take 2d6+6 *Fire Damage*, half on a success."
  },
  "powerLevel": 972,
  "ac": 17,
  "acNote": "",
  "hp": 18,
  "hpDice": "3d6+9",
  "ki": 27,
  "stamina": 10,
  "breatherPool": 6,
  "speed": "40 ft., Fly 40 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_saiyan_saga_tennenman"
 },
 {
  "name": "Raditz",
  "meta": "Medium Humanoid (Saiyan), Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "Elite",
  "group": "Saiyan Warriors",
  "stats": {
   "str": 20,
   "dex": 18,
   "con": 18,
   "int": 16,
   "wis": 14,
   "cha": 20
  },
  "traits": [
   {
    "name": "Quickened Counter",
    "text": "When Raditz would take the *Wild Sense* **Snap Decision** or take the *Sonic Sway* **Snap Decision**, he may immediately take the *Counter* **Snap Decision** for no **Stamina Cost.**"
   },
   {
    "name": "Saiyan Pride",
    "text": "Raditz adds a +3 to his *Initiative Checks.*"
   },
   {
    "name": "Tactical Saiyan",
    "text": "Once per turn, when a creature would fail a **Technique** caused by Raditz, the triggering creature reduces their next *Saving Throw* by 2. Alternatively, Raditz may forego this benefit to instead increase his *Saving Throws* by 1 until the start of his next turn."
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n- Flight\n- Instinctive Defense\n- Redirect Attack\n- Survivor\n\n#### Trained Features\n\n- Explosive Power",
   "Forms": "- Oozaru",
   "Techniques": "***Ki Rank 1.*** *Shockwave Strike*, *Strike Combination*, *Targeted Barrage*, & *Volatile Beam ☆*\n\n##### Mastery\n\n- ***Volatile Beam.*** Volatile Beam may be used as  a bonus action instead of an action.",
   "Actions": "***Multiattack.*** Raditz can cast a **Technique** and make three *Attack Rolls*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., *Hit:* 10 (1d10+5) *Bludgeoning Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., *Hit:* 8 (1d8+4) *Energy Damage*"
  },
  "powerLevel": 5082,
  "ac": 18,
  "acNote": "Light Battle Armor",
  "hp": 77,
  "hpDice": "11d6+44",
  "ki": 33,
  "stamina": 10,
  "breatherPool": 7,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "skills": "Athletics +8, Stealth +7, History +6, Deception +8",
  "id": "ant_saiyan_saga_raditz"
 },
 {
  "name": "Nappa",
  "meta": "Medium Humanoid (Saiyan), Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "Elite",
  "group": "Saiyan Warriors",
  "stats": {
   "str": 22,
   "dex": 16,
   "con": 22,
   "int": 10,
   "wis": 14,
   "cha": 16
  },
  "traits": [
   {
    "name": "Brute's Rampage",
    "text": "When Nappa has at least two creatures within a 10 Foot Emanation from him, he gains 1 point of *Damage Reduction.* For every two additional creatures that are within that range, Nappa gains an additional 1 point of *Damage Reduction*"
   },
   {
    "name": "Continuous Strength",
    "text": "When Nappa would deal damage with an *Unarmed Strike*, he gains an additional +2 points of damage to all *Unarmed Strikes* and **Unarmed Techniques** until the end of his turn. This **Trait** may apply itself more than once, up to a maximum of 6 points of damage."
   },
   {
    "name": "Hyper Strength",
    "text": "When Nappa would activate the *Full Power* **Form**, he may choose to take the *Hyper Mode Engage! Action*."
   },
   {
    "name": "Saiyan Pride",
    "text": "Nappa adds a +3 to his *Initiative Checks.*"
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n\n- Beam Mastery\n- Instincts: Berserker\n- Flight\n- Full Power Fighter\n\n#### Trained Features\n\n- Survivor of War",
   "Forms": "- Full Power\n- Oozaru",
   "Techniques": "***Ki Rank 1.*** *Body Crash ☆*, *Distance Detonation*, *Full Power Energy Wave*, *Gut Punch*, *Mouth Blast*, *Power Fan*, *Strike Combination*\n\n##### Mastery\n\n- ***Body Crash.*** *Body Crash* may be used as a bonus action instead of an action.\n- ***Mouth Blast.*** *Mouth Blast* counts as an *Unarmed Technique*",
   "Actions": "***Multiattack.*** Nappa can make three attacks.\n\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +0 to hit, reach 5 ft., *Hit:* 10 (1d10+6) *Bludgeoning Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., *Hit:* 8 (1d8+4) *Energy Damage*"
  },
  "powerLevel": 8424,
  "ac": 18,
  "acNote": "Medium Elite Armor",
  "hp": 108,
  "hpDice": "12d6+72",
  "ki": 39,
  "stamina": 12,
  "breatherPool": 9,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 3,
  "prof": 3,
  "senses": "passive perception 12",
  "languages": "Common, Sadalan",
  "skills": "Athletics +9, Intimidation +6, Survival +5",
  "id": "ant_saiyan_saga_nappa"
 },
 {
  "name": "Vegeta",
  "meta": "Medium Humanoid (Saiyan), Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Saiyan Saga",
  "tier": "Elite",
  "group": "Vegeta IV, the Prince of all Saiyans",
  "stats": {
   "str": 22,
   "dex": 20,
   "con": 22,
   "int": 14,
   "wis": 18,
   "cha": 16
  },
  "traits": [
   {
    "name": "Elite Moon",
    "text": "When Vegeta would create a *False Moon*, he doubles the amount of **Hit Points** it has."
   },
   {
    "name": "Explosive Power (Phase 2-4)",
    "text": "Once per turn when Vegeta would cast a **Technique**, he gains the *Boosted (Spirit) Condition*. If Vegeta is in *Phase 4*, he may increase his *Static Bonus* for this effect by 1."
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Vegeta gains 1 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (3/Day)",
    "text": "If Vegeta fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Powerful Technique",
    "text": "Vegeta may increase the **Casting Cost** of his **Ki Techniques** by 10. This **Technique** counts as if it had been upcasted by 1 rank."
   },
   {
    "name": "Saiyan Pride",
    "text": "Vegeta adds a +3 to his *Initiative Checks.*"
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n\n- Action Surge\n- Flight\n- Instincts: Realized\n- Oozaru: Controlled\n- Oozaru: False Moon\n\n#### Trained Features\n\n- Survivor of War",
   "Forms": "- Oozaru\n- Saiyan Spirit",
   "Techniques": "***Ki Rank 1.*** *Bombardment*, *Explosive Wave ☆*, *Final Crash*, *Finger Shot*, *Galick Gun ☆*\n\n##### Mastery\n\n- ***Explosive Wave.*** *Explosive Wave* has its Emanation increased by 20 feet.\n\n- ***Galick Gun.*** *Galick Gun* has its width increased by 10 ft.",
   "Actions": "***Multiattack.*** Vegeta can make three attacks with his *Unarmed Strike* or *Ki Blast*\n:\n***Unarmed Strike.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., *Hit:* 10 (1d10+6) *Bludgeoning Damage*\n:\n**Ki Blasts.** *Ranged Weapon Attack:* +9 to hit, range 30/60 ft., *Hit:* 8 (1d8+4) *Energy Damage*",
   "Bonus Action": "***Vegeta's Technique.*** When Vegeta would make at least three *Ki Blast* attacks, he can make an additional two *Ki Blasts Attacks*",
   "Iconic Action": "*Immediately after another creature's turn, Vegeta can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Vegeta can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Vegeta can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Vegeta can move up to his *Movement Speed*",
   "Phases": "When Vegeta is reduced to a **Hit Point Threshold**, he stops taking damage, removes  any *Conditions* of his choice and gains the corresponding benefits\n\n| Phase | Hit Point Threshold | Benefit |\n|:-----:|:-------------------:|:-------:|\n| 2     | 108                  | Vegeta can activate the *Saiyan Spirit* **Form** without expending any action. Additionally while Vegeta has the benefit of the *Saiyan Spirit* **Form**, he gains the benefit of the *Enraged Condition*. |\n| 3     | 72                  | Vegeta automatically creates the *False Moon* without taking any Actions. Additionally, while he is under the effects of the *False Moon*, his *Damage Reduction* cannot be ignored by **Class Features** **Feats**, and **Species Features**. |\n|4      | 36                  | If Vegeta is no longer benefiting from the *Oozaru* **Form**, he gains a +1 *Static Bonus* and he gains resistance to *Bludgeoning, Energy, Piercing,* and *Slashing damage* for the duration of Combat. If Vegeta is still benefiting from the *Oozaru* **Form**, he increases all damage dealt by an additional damage die. |"
  },
  "powerLevel": 19584,
  "ac": 22,
  "acNote": "",
  "hp": 144,
  "hpDice": "16d6+96",
  "ki": 68,
  "stamina": 18,
  "breatherPool": 10,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "passive perception 18",
  "languages": "Common, Sadalan",
  "skills": "Athletics +10, Acrobatics +9, History +6, Investigation +6, Perception +8, Survival +8",
  "id": "ant_saiyan_saga_vegeta"
 },
 {
  "name": "Frieza Force Brute",
  "meta": "Large Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 18,
   "dex": 12,
   "con": 16,
   "int": 10,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Mighty Strength",
    "text": "When the Frieza Force Bruite would be forced to make a *Strength Saving Throw* to be *Grappled* by a creature that is the same Size Category or smaller, it gains a +2 to its *Strength Saving Throw*."
   },
   {
    "name": "Powerful Size (Ki Rank 1)",
    "text": "The Frieza Force has 1 *Rank of Gigantification*"
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Brutal Critical\n- Crusher\n- Flight",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Cratering Beam*, *Erupting Energy*, *Full Power Energy Wave*, *Gut Punch*, *Propulsion Beam*, *Submission Hold*, *Suplex*",
   "Actions": "***Multiattack.*** The Frieza Force Bruite is able to make two Unarmed Strikes or Ki Blasts Attacks\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +8 to hit, reach 10 ft., **Hit:** 9 (1d8+4) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +5 to hit, range 30/60 ft., **Hit:** 4 (1d4+1) *Energy Damage*"
  },
  "powerLevel": 2016,
  "ac": 18,
  "acNote": "Heavy Battle Armor",
  "hp": 28,
  "hpDice": "4d6+12",
  "ki": 36,
  "stamina": 11,
  "breatherPool": 7,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Strength +8",
  "skills": "Athletics +8",
  "id": "ant_frieza_saga_frieza_force_brute"
 },
 {
  "name": "Frieza Force Blaster",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 8,
   "dex": 14,
   "con": 16,
   "int": 10,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Hastened Volley",
    "text": "When the Frieza Force Blaster Elite would cast a **Ki Technique**, they may immediately take the **Ki Blast** action as a bonus action."
   },
   {
    "name": "Powerful Spirit",
    "text": "When the Frieza Force Blaster Elite would gain **Ki** from the **Gather Ki Action**, all creatures within a 5 ft. Emanataion must make a *Strength Saving Throw* against his **Blast Save DC**, on a failure, they are moved 5 feet away from them."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- I'm Putting it All Into This!\n- Palpable Aura\n- Flight",
   "Techniques": "***Ki Rank 1.*** *Beam Sweep*, *Explosive Wave*, *Full Power Energy Wave*, *Ki Burst*, *Impact Beam*, *Laser Vision*, *Orb Crash*, *Power Fan*",
   "Actions": "***Unarmed Strikes.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., **Hit:** 5 (1d4+2) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., **Hit:** 5 (1d4+2) *Energy Damage*"
  },
  "powerLevel": 3696,
  "ac": 17,
  "acNote": "Light Battle Armor",
  "hp": 28,
  "hpDice": "4d6+12",
  "ki": 44,
  "stamina": 11,
  "breatherPool": 7,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "savingThrows": "Wisdom +7",
  "skills": "Ki Control +8",
  "id": "ant_frieza_saga_frieza_force_blaster"
 },
 {
  "name": "Frieza Force Tactician",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 14,
   "dex": 16,
   "con": 12,
   "int": 18,
   "wis": 14,
   "cha": 14
  },
  "traits": [
   {
    "name": "Self Sulficiency",
    "text": "As an action, the Frieza Force Battle Coordinator may reduce their *Movement Speed* by half to gain a +2 to their **AC** and all *Saving Throws* until the start of their next turn."
   },
   {
    "name": "Tactical Mind",
    "text": "As a reaction while the Frieza Force Battle Coordinator can see an allied creature within 30 feet make an *attack roll* or a *Saving Throw*, they may add a +2 to their roll."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Alert\n- Brain Blast\n- Redirect Attacks",
   "Techniques": "***Rank 1.*** *Condensed Orb*, *Controlled Energy Ball*, *Energy Whip*, *Ki-Fueled Reload*, *Point-Blank Shot*, *Reinforcement*, *Straight Shot*, *Targeted Barrage*",
   "Actions": "***Laser Dagger.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., **Hit:** 6 (1d4+3) *Energy Damage*\n:\n***Pistol.*** *Ranged Weapon Attack:* +7 to hit, range 80/180 ft., **Hit:** 7 (1d6+3) *Piercing Damage*"
  },
  "powerLevel": 1280,
  "ac": 18,
  "acNote": "Medium Elite Armor",
  "hp": 20,
  "hpDice": "4d6+4",
  "ki": 32,
  "stamina": 9,
  "breatherPool": 5,
  "speed": "30 ft.",
  "kiRank": null,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "savingThrows": "Dexterity +7",
  "skills": "Investigation +8",
  "id": "ant_frieza_saga_frieza_force_tactician"
 },
 {
  "name": "Frieza Force Technician",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 8,
   "dex": 16,
   "con": 12,
   "int": 18,
   "wis": 12,
   "cha": 14
  },
  "traits": [
   {
    "name": "Dexterous Weaponry",
    "text": "Frieza Force Combat Technique can usu their **Dexterity Ability Score** for their **Armed Technique Casting Ability Modifier.**"
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Brain Blast\n- Crafter\n- Speedy",
   "Techniques": "***Ki Rank 1.*** *Angry Bombing*, *Clean Shot*, *Distracting Barrage*, *Infusion*, *Straight Shot.*",
   "Action": "***Laser Scimitar.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., **Hit:** 6 (1d8+3) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +7 to hit, range 30/60 ft., **Hit:** 6 (1d4+3) *Energy Damage*\n:\n***Tech Towers (4/Rest).*** As an action, the Frieza Force Combat Technician can choose for one of the following effects to trigger at the end of your turn:\n- *Explosive Mine.* All creatures within a 15 foot *Emanation* from the Frieza Force Combat Technician must make a *Dexterity Saving Throw* against their **Omni Save DC** or take 11 (1d8+6) *Fire Damage*\n- *Gravity Mine.* All creatures excluding yourself within a 10  foot wide, 30 foot tall Cylinder centered on you must make a *Dexterity Saving Throw* against their **Omni Save DC** or be *Launched* 10 feet to the ground.\n- *Turrent.* One creature within 30 feet of Frieza Force Combat Technician must make a *Dexterity Saving Throw* against their **Omni Save DC** or take 16 (2d6+8) *Piercing Damage.*"
  },
  "powerLevel": 1120,
  "ac": 17,
  "acNote": "Medium Battle Armor",
  "hp": 20,
  "hpDice": "4d6+4",
  "ki": 28,
  "stamina": 9,
  "breatherPool": 5,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "savingThrows": "Dexterity +7",
  "skills": "Technology +8",
  "id": "ant_frieza_saga_frieza_force_technician"
 },
 {
  "name": "Frieza Force Swarm",
  "meta": "Large Swarm of Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 14,
   "dex": 14,
   "con": 20,
   "int": 10,
   "wis": 10,
   "cha": 10
  },
  "traits": [
   {
    "name": "Combined Assist",
    "text": "The Frieza Force Swarm can take the *Assist* **Snap Decision** to itself when it would cast a **Technique.**"
   },
   {
    "name": "Swarm",
    "text": "The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium Creature. The swarm can't regain **Hit Points** or gain **Temporary Hit Points.** Additionally, when this swarm would be at 27 **Hit Points**, they gain a -2 *Static Bonus* to their **Beam Techniques** and at 9 **Hit Points**, reduce it by an additional -2 (4 Total)."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Action Surge\n- Bottomless Reserves\n- Flight",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Bombardment*, *Cratering Beam*, *Full Power Energy Wave*, *Haymaker*",
   "Actions": "***Multiattack.*** The Frieza Force Swarm can make three Unarmed Strikes or Ki Blasts Attacks\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft.,  **Hit:** 8 (2d4+2) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., **Hit:** 8 (2d4+2) *Energy Damage*"
  },
  "powerLevel": 288,
  "ac": 15,
  "acNote": "",
  "hp": 36,
  "hpDice": "4d6+20",
  "ki": 40,
  "stamina": 13,
  "breatherPool": 9,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "id": "ant_frieza_saga_frieza_force_swarm"
 },
 {
  "name": "Frieza Force Sniper",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "General",
  "group": "Frieza Force",
  "stats": {
   "str": 10,
   "dex": 18,
   "con": 14,
   "int": 10,
   "wis": 16,
   "cha": 12
  },
  "traits": [
   {
    "name": "Held Position",
    "text": "At the start of their turn, the Frieza Force Sniper may expend all their *Movement Speed* to gain advantage on their next attack roll."
   },
   {
    "name": "Sneak Attack",
    "text": "Once Per Turn, the Frieza Force Sniper may deal an additional 2d4 Damage on an attack roll that has advantage."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Flight\n- Ki Stealth\n- Skulker",
   "Techniques": "***Ki Rank 1.*** *Claim Distance*, *Clean Shot*, *Gunkata*, *Ki-Fueled Reload*, *Mag Dump*",
   "Actions": "***Multiattack.*** The Frieza Force Swarm can make two Dagger, Pistol, or Laser Sniper Rifle\n:\n***Dagger.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., **Hit:** 7 (1d4+4) *Piercing Damage*\n:\n***Pistol.*** *Ranged Weapon Attack:* +6 to hit, range 80/180 ft., **Hit:** 8 (1d6+4) *Piercing Damage*\n:\n***Laser Sniper Rifle.*** *Ranged Weapon Attack:* +8 to hit, range 200/800 ft., **Hit:** 13 (1d12+4) *Energy Damage*"
  },
  "powerLevel": 1920,
  "ac": 15,
  "acNote": "",
  "hp": 24,
  "hpDice": "4d6+8",
  "ki": 40,
  "stamina": 13,
  "breatherPool": 6,
  "speed": "30 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 17",
  "languages": "Common",
  "skills": "Perception +7",
  "id": "ant_frieza_saga_frieza_force_sniper"
 },
 {
  "name": "Dodoria",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Frieza Force's Elite",
  "stats": {
   "str": 22,
   "dex": 16,
   "con": 22,
   "int": 10,
   "wis": 12,
   "cha": 12
  },
  "traits": [
   {
    "name": "Charging Power",
    "text": "If Dodoria would move at least 10 feet to a creature in a Straight Line, he may increase the damage dealt of his next **Unarmed Technique** by 1 damage die step."
   },
   {
    "name": "Overwhelming Strikes",
    "text": "Once per turn, when Dodoria would deal *Bludgeoning Damage*, creatures must make a *Constitution Saving Throw* against his **Unarmed Save DC**, on a failure, they gain the *Dazed Condition* until the end of their turn."
   },
   {
    "name": "Powerful Body",
    "text": "Dodoria counts as one size larger for the purpose of the *Launch* **Rule Interaction**."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Aggressive Aura\n- Beam Master\n- Tough",
   "Techniques": "***Ki Rank 1.*** *Assault ☆*, *Gathered Beam*, *Haymaker*, *Impact Beam*, *Lariat*, *Mouth Blast ☆*\n\n##### Mastery\n\n- *Assault.* Assault now lands a *Critical Hit* on a 19-20.\n- *Mouth Blast.* Mouth Blast now counts as a **Beam Technique.**",
   "Actions": "***Multiattack.*** Dodoria can make two *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., **Hit:** 13 (1d12+6) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., **Hit:** 7 (1d6+3) *Energy Damage*"
  },
  "powerLevel": 17472,
  "ac": 20,
  "acNote": "Heavy Elite Armor",
  "hp": 182,
  "hpDice": "14d6+112",
  "ki": 48,
  "stamina": 14,
  "breatherPool": 10,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "skills": "Athletics +10, Intimidation +5",
  "id": "ant_frieza_saga_dodoria"
 },
 {
  "name": "Kiwi",
  "meta": "Medium Humanoid (Xeno), Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Frieza Force's Elite",
  "stats": {
   "str": 18,
   "dex": 16,
   "con": 18,
   "int": 12,
   "wis": 14,
   "cha": 20
  },
  "traits": [
   {
    "name": "Grand Coward",
    "text": "When Kiwi would be *Bloodied* or under, his *Movement Speed* is increased by 15 feet."
   },
   {
    "name": "Overpowering Confidence",
    "text": "When Kiwi is above *Bloodied*, he gains a +1 *Static Bonus* to the **Beam Technique**"
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Flight\n- Martial Superiority\n  - Distracting Strike\n  - Evasive Footwork\n- Speedy",
   "Techniques": "***Ki Rank 1.*** *Exploisve Wave*, *Full Power Energy Wave ☆*, *Jab*, *Leg Sweep ☆*, *Strike Combination*, *Volley*\n\n##### Mastery\n\n- ***Full Power Energy Wave.*** Full Power Energy Wave can be used as a Bonus Action.\n- ***Leg Sweep.*** *Leg Sweep* gains an additional 10 feet to its Emanataion",
   "Actions": "***Multiattack.*** Kiwi can make two *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., **Hit:** 10 (1d10+4) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., **Hit:** 8 (1d8+3) *Energy Damage*\n:\n***Ah! Lord Frieza!.*** When Kiwi would be *Bloodied*, all creatures within a 30 foot Emanataion that can hear Kiwi must make a *Charisma Saving Throw* against **DC** 18. Once a creature has been targeted by this Action, they cannot be affected after 24 hours. Regardless of a failure or success, Kiwi can take the following effects:\n- Kiwi can cast a **Technique** of his choice, Kiwi gains advantage on any creature that failed or the failed creature gains disadvantage on the triggering *Saving Throw*\n- Kiwi can move up to his *Movement Speed*, a creature that would fail the *Saving Throw* cannot take an *Attack of Opportunity.*"
  },
  "powerLevel": 10296,
  "ac": 19,
  "acNote": "Medium Elite Armor",
  "hp": 117,
  "hpDice": "13d6+52",
  "ki": 44,
  "stamina": 13,
  "breatherPool": 8,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "skills": "Athletics +8, Deception +9, Investigation +5",
  "id": "ant_frieza_saga_kiwi"
 },
 {
  "name": "Zarbon",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Frieza Force's Elite",
  "stats": {
   "str": 16,
   "dex": 22,
   "con": 18,
   "int": 16,
   "wis": 14,
   "cha": 12
  },
  "traits": [
   {
    "name": "Dextrous Combat",
    "text": "Zarbon can use their **Dexterity Ability Score Modifier** for their **Unarmed Technique Casting Ability Modifier.**"
   },
   {
    "name": "Elegant Form",
    "text": "While Zarbon is not benefiting from the *Full Power* **Form** and would cast a **Beam Technique**, he may move up to his *Movement Speed*."
   },
   {
    "name": "Monster Form",
    "text": "While Zarbon is benefiting from the *Full Power* **Form**, he reduces his *Movement Speed* by 15 ft. Additionally, his *Unarmed Strikes* add his **Strength Ability Modifier** to all damage rolls and his **Unarmed Techniques** add his **Strength Ability Score** to all damage rolls."
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n- Full Power Fighter\n- Grappler\n\n#### Trained Features\n- Explosive Power",
   "Forms": "- Full Power",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Finger Shot*, *Full Power Energy Wave ☆*, *Heavy Throw*, *Lariat*, *Suplex*, *Volatile Beam*\n##### Mastery\n\n- *Full Power Energy Wave.* Zarbon can cast *Full Power Energy Wave* as a Bonus Action.",
   "Actions": "***Multiattack.*** Zarbon can make two *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 12 (1d10+6) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +10 to hit, range 30/60 ft., **Hit:** 12 (1d10+6) *Energy Damage*"
  },
  "powerLevel": 9856,
  "ac": 21,
  "acNote": "",
  "hp": 112,
  "hpDice": "14d6+56",
  "ki": 44,
  "stamina": 12,
  "breatherPool": 8,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "skills": "Acrobatics +10, Insight +7, Investigation +7, Perception +6",
  "id": "ant_frieza_saga_zarbon"
 },
 {
  "name": "Burter",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Ginyu Force",
  "stats": {
   "str": 20,
   "dex": 14,
   "con": 16,
   "int": 14,
   "wis": 20,
   "cha": 10
  },
  "traits": [
   {
    "name": "Burter Fighting Pose",
    "text": "At the start of Burter's turn, he may choose one of the Following: - **Fighting Pose D:** Burter may take the *Dash Action* without expending an Action. - **Fighting Pose I:** Burter increases his *Movement Speed by 15 ft. and his speed cannot be reduced by any means."
   },
   {
    "name": "Ginyu Force Tactics",
    "text": "At the start of every round if Burter would have an ally within the *Ginyu Force* Section, he or any ally that has this **Trait** may make an *Unarmed Strike* or *Ki Blast.*"
   },
   {
    "name": "Purple Comet Combo",
    "text": "When Burter would cast a **Technique** as a result of the *Overlapping Offense* **Snap Decision**, Jeice can take the *Assist* **Snap Decision** for 1 **Stamina Point** instead of 2."
   },
   {
    "name": "Quicker than the Eye Can See",
    "text": "When Burter would deal damage to a creature, the creature must make a *Dexterity Saving Throw* against Burter's **Unarmed Save DC**, on a failure, the creature cannot take a **Snap Decision** against Burter until the start of the next round."
   }
  ],
  "sections": {
   "Feats": "#### Feats\n\n- Flight\n\n#### Trained Feature\n- Fastest in the Universe\n- Overlapping Offense\n- Partner's Pledge (Burter)",
   "Forms": "##### Power Up\n- Super Speed",
   "Technique": "***Ki Rank 1.*** *Cannon Burst ☆*, *Explosive Wave*, *Full Power Energy Wave*, *Haymaker*, *Jab*, *Palm Blast*, *Strike Combination*\n\n##### Mastery\n\n- *Cannon Burst.* Cannon Burst has its range increased by 20 ft.",
   "Actions": "***Multiattack.*** Burter can make two *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 10 (1d8+5) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +10 to hit, range 30/60 ft., **Hit:** 10 (1d8+5) *Energy Damage*"
  },
  "powerLevel": 10192,
  "ac": 18,
  "acNote": "Medium Elite Armor",
  "hp": 98,
  "hpDice": "14d6+42",
  "ki": 52,
  "stamina": 11,
  "breatherPool": 7,
  "speed": "45 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 19",
  "languages": "Common",
  "skills": "Acrobatics +6, Stealth +6, Perception +9",
  "id": "ant_frieza_saga_burter"
 },
 {
  "name": "Captain Ginyu",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Ginyu Force",
  "stats": {
   "str": 22,
   "dex": 20,
   "con": 18,
   "int": 14,
   "wis": 18,
   "cha": 16
  },
  "traits": [
   {
    "name": "Milky Explosion (4/Rest)",
    "text": "When Captain Ginyu would cast a **Ki Technique**, it may benefit from the *Bursting Iconic Mastery* even if they already have an *Iconic Mastery*, but only if they do not already have the *Bursting Iconic Mastery.*"
   },
   {
    "name": "Ginyu Fighting Pose",
    "text": "At the start of Captain Ginyu's turn, he may choose one of the following: - **Body:** Ginyu gains the *Boosted (Spirit) Condition* until the start of his next turn - **Heart:** Ginyu gains the *Boosted (Heart) Condition* until the start of his next turn - **Instinct:** Ginyu gains the *Boosted (Instinct) Condition* until the start of his next turn - **Mind:** Ginyu gains the *Boosted (Mind) Condition* until the start of his next turn - **Soul:** Ginyu gains the *Boosted (Soul) Condition* until the start of his next turn - **Spirit:** Ginyu gains the *Boosted (Spirit) Condition* until the start of his next turn - **Tempo:** Ginyu gains the *Boosted (Tempo) Condition* until the start of his next turn"
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Captain Ginyu gains 1 rank of *Weighted (Light)*"
   }
  ],
  "sections": {
   "Feat & Trained Features": "#### Feats\n- Aggressive Aura\n- Flight\n- Survivor\n\n#### Trained Features\n\n- Inner Rage",
   "Technique": "***Ki Rank 1.*** *Axe Kick*, *Condensed Orb ☆☆*, *Dust Maker*, *Full Power Energy Wave*, *Gut Punch ☆*, *Strike Combination ☆*\n\n##### Mastery\n\n- *Condensed Orb.* Increase the Area of Effect of Condensed Orb by 20 ft.\n- *Gut Punch.* Gut Punch may now target two creatures within the same attack roll\n- *Strike Combination.* Strike Combination may be used as a bonus action.",
   "Actions": "***Multiattack.*** Captain Ginyu can make three *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 12 (1d10+6) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +10 to hit, range 30/60 ft., **Hit:** 12 (1d10+6) *Energy Damage*\n:\n***Body Change (4 Stamina).*** Choose one Creature that Captain Ginyu can see within 60 feet, the triggering creature must make a *Dexterity Saving Throw* against **DC** 16. On a failure, Captain Ginyu and the creature changes the following:\n- When this feature activates, take note of the *percentage* of **Hit Points** that Captain Ginyu and the triggering creature have when swapping bodies. Captain Ginyu and the triggering creature swap the *percentage* they have based on their **Hit Points**, rounded up.\n- Captain Ginyu and the triggering creature swap their **Strength, Dexterity, & Constitution Ability Score.**\n- Captain Ginyu gains any **Species Features** the creature has.\n- Captain Ginyu and the triggering creature does not gain any **Biology Form** unless they remain in the Swapped Body for 24 hours."
  },
  "powerLevel": 34020,
  "ac": 21,
  "acNote": "",
  "hp": 162,
  "hpDice": "18d8+72",
  "ki": 70,
  "stamina": 14,
  "breatherPool": 9,
  "speed": "45 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 18",
  "languages": "Common",
  "skills": "Athletics +10, Deception +7, Insight +8, Intimidation +7, Perception +8",
  "id": "ant_frieza_saga_captain_ginyu"
 },
 {
  "name": "Guldo",
  "meta": "Small Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Ginyu Force",
  "stats": {
   "str": 12,
   "dex": 18,
   "con": 14,
   "int": 18,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Boulean Lungs (1 Stamina)",
    "text": "When Guldo would expend all uses of the *Time Breath* **Trained Feature**, he may expend the listed amount to gain an additional usage."
   },
   {
    "name": "Ginyu Force Tactics",
    "text": "At the start of every round if Guldo would have an ally within the *Ginyu Force* Section, he or any ally that has this **Trait** may make *Unarmed Strike* or *Ki Blast.*"
   },
   {
    "name": "Guldo Fighting Pose",
    "text": "At the start of Guldo's turn, he may choose one of the Following: - **Fighting Pose B:** Guldo's speed cannot be reduced by any magical means or by a **Technique** so long as it does not *Restrain.* - **Fighting Pose H:** Guldo gains 2 points of *Damage Reduction*"
   },
   {
    "name": "Keen Sight",
    "text": "Guldo has advantage on *Perception* Checks made with Sight"
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n\n- Flight\n- Speedy\n\n#### Trained Features\n\n- Time Breath",
   "Techniques": "**Ki Rank 1.** *Focused Spray*, *Energy Whip*, *Laser Vision*, *Materialization*, *Psychokinesis ☆*, *Reinforcement*, & *Targeted Barrage*\n\n##### Mastery\n\n- *Psychokinesis.* Psychokinesis can now target two creatures in one attack roll.",
   "Actions": "***Multiattack.*** Guldo can make wtwo *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., **Hit:** 8 (1d6+4) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., **Hit:** 8 (1d8+4) *Energy Damage*"
  },
  "powerLevel": 6240,
  "ac": 18,
  "acNote": "Light Elite Armor",
  "hp": 78,
  "hpDice": "13d6+26",
  "ki": 40,
  "stamina": 10,
  "breatherPool": 6,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "skills": "History +8, Investigation +8",
  "id": "ant_frieza_saga_guldo"
 },
 {
  "name": "Jeice",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Ginyu Force",
  "stats": {
   "str": 14,
   "dex": 22,
   "con": 16,
   "int": 14,
   "wis": 20,
   "cha": 10
  },
  "traits": [
   {
    "name": "Dextrous Combat",
    "text": "Zarbon can use their **Dexterity Ability Score Modifier** for their **Unarmed Technique Casting Ability Modifier.**"
   },
   {
    "name": "Ginyu Force Tactics",
    "text": "At the start of every round if Jeice would have an ally within the *Ginyu Force* Section, he or any ally that has this **Trait** may make an *Unarmed Strike* or *Ki Blast.*"
   },
   {
    "name": "Jeice Fighting Pose",
    "text": "At the start of Jeice's turn, he may choose one of the Following: - **Fighting Pose B:** When Jeice would cast a **Strike Techniques**, their damage is increased by 5. - **Fighting Pose G:** When Jeice would cast a **Ki Techniques**, their damage is increased by 5."
   },
   {
    "name": "Purple Comet Combo",
    "text": "When Jeice would cast a **Technique** as a result of the *Overlapping Offense* **Snap Decision**, Jeice can take the *Assist* **Snap Decision** for 1 **Stamina Point** instead of 2."
   }
  ],
  "sections": {
   "Feats & Trained Features": "#### Feats\n\n- Barrage Master\n- Flight\n\n#### Trained Feature\n- Overlapping Offense\n- Partner's Pledge (Burter)",
   "Techniques": "***Ki Rank 1.*** *Assault ☆*, *Cannon Burst*, *Distance Detonation ☆*, *Energy Rain*, *Explosive Wave*, *Volley*\n\n##### Mastery\n\n- *Assault.* Assault can be used as a bonus action\n- *Canon Burst.* Counts as a **Barrage Technique**",
   "Action": "***Multiattack.*** Jeice can make wtwo *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 11 (1d8+6) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +10 to hit, range 30/60 ft., **Hit:** 10 (1d6+6) *Energy Damage*"
  },
  "powerLevel": 9856,
  "ac": 21,
  "acNote": "",
  "hp": 112,
  "hpDice": "14d6+",
  "ki": 40,
  "stamina": 12,
  "breatherPool": 6,
  "speed": "35 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 15",
  "languages": "Common",
  "skills": "Acrobatics +10, Insight +9",
  "id": "ant_frieza_saga_jeice"
 },
 {
  "name": "Recoome",
  "meta": "Medium Humanoid (Galactic Citizen), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Elite",
  "group": "Ginyu Force",
  "stats": {
   "str": 22,
   "dex": 18,
   "con": 20,
   "int": 7,
   "wis": 14,
   "cha": 10
  },
  "traits": [
   {
    "name": "Creamorian Durability (1 Stamina)",
    "text": "If Recoome has any of the *Conditions* listed below, he can spend the listed amount to automatically remake the *Saving Throw* to remove the *Condition*. If there was no *Saving Throw* made, then Recoome can make a *Strength Saving Throw* against the Save DC tied to effect: - *Dazed* - *Disabled* - *Grappled* - *Incapacitated* - *Paralyzed* - *Restrained*"
   },
   {
    "name": "Solo Recoome Tactics",
    "text": "While Recoome has no other ally fighting alongside him, Once Per Round, he gains 1 action that he can take after a hostile creature's turn. **Technique's** casted this way cost double the **Ki Cost.**"
   },
   {
    "name": "Recoome's Fighting Pose",
    "text": "At the start of Recoome's turn, he may choose one of the following: - **Fighting Pose E:** Recoome's *Unarmed Strike* and *Ki Blast* deal an additional 2 points of damage. - **Fighting Pose J:** Recoome gains 2 points of **Temporary Stamina.** - **Fighting Pose K:** Recoome's *Creamorian Durability* no longer cost *Stamina*, and instead becomes once per turn."
   }
  ],
  "sections": {
   "Feats": "- Brutal Critical\n- Flight\n- Tough\n- Unarmed Master",
   "Techniques": "***Ki Rank 1.*** *Assault*, *Explosive Wave ☆*, *Full Power Energy Wave*, *Gut Punch*, *Haymaker*, *Jab*, & *Strike Combination*\n\n##### Mastery\n\n- *Explosive Wave.* Explosive Wave counts as an **Unarmed Technique**",
   "Actions": "***Multiattack.*** Recoome can make two *Unarmed Strikes* or *Ki Blasts*\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 12 (1d10+6) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +8 to hit, range 30/60 ft., **Hit:** 7 (1d4+4) *Energy Damage*"
  },
  "powerLevel": 15840,
  "ac": 21,
  "acNote": "",
  "hp": 180,
  "hpDice": "15d6+120",
  "ki": 44,
  "stamina": 13,
  "breatherPool": 9,
  "speed": "40 ft.",
  "kiRank": 1,
  "antagonistLevel": 4,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "skills": "Athletics +10",
  "id": "ant_frieza_saga_recoome"
 },
 {
  "name": "Emperor Frieza",
  "meta": "Medium Humanoid (Acorsian), Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Frieza Saga",
  "tier": "Iconic",
  "group": "Emperor Frieza",
  "stats": {
   "str": 20,
   "dex": 22,
   "con": 20,
   "int": 18,
   "wis": 18,
   "cha": 16
  },
  "traits": [
   {
    "name": "Cold Tribe",
    "text": "Frieza always has the *Power Regression* **Form** active"
   },
   {
    "name": "Emperor’s Rule (1/Long Rest)",
    "text": "When Frieza would hit 0 **Hit Points** but would not take damage over half of his **Maximum Hit Points**, he may expend up to his maximum amount of **Hit Die** and regain that amount."
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Frieza gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Frieza fails a *Saving Throw*, it can choose to succeed instead"
   },
   {
    "name": "Mutant Power",
    "text": "All of Frieza's **Forms** provide 1 additional **Power Bonus.**"
   },
   {
    "name": "Space Survivor",
    "text": "Frieza does not require air and are immune to the effects of the vacuum of space."
   }
  ],
  "sections": {
   "Feat": "- Aggressive Aura\n- Barrage Master\n- Final Dregs\n- Flight\n- Ki Growth Training\n- Iconic Technique [Homing]\n::",
   "Forms & Form Modification": "##### Forms\n\n- *Power Regression*\n- *Released Power*\n\n##### Form Modifications\n\n- *Magnificent Ability*\n- *Piercing Energy*\n- *Powerful Attacks*",
   "Techniques": "***Ki Rank 1.*** *Energy Disk Barrage [Homing]*, *Finger Beam ☆*, *Finger Shot [Homing]*, *Cannon Burst*, *Death Ball ☆☆*, *Psychokinesis*\n:\n***Ki Rank 2.*** *Expanding Death Ball*, *Supernova*\n\n##### Mastery\n- *Death Ball.* Death Ball's Area of Effect is increased by 10 feet and when a creature fails this *Saving Throw*, they are knocked *Prone* for the next minute or until they succeed a *Constitution Saving Throw*\n- *Expanding Death Ball.* Expanding Death Ball deals a *Critical Hit* on a 19-20\n- *Finger Beam.* Finger Beam counts as a **Barrage Technique**",
   "Actions": "***Multiattack.*** Frieza can make three *Unarmed Strikes* or *Ki Blasts*. Additionally Frieza can cast a **Generic Ki Technique** after taking the *Attack Action*.\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +10 to hit, range 60/120 ft., **Hit:** 12 (1d10+6) *Energy Damage*\n:\n***Unarmed Attacks.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 16 (2d8+6) *Bludgeoning Damage*",
   "Bonus Action": "***Emperor's Wrath (2/Long Rest).*** Frieza gains the *Enraged Condition* for 2 rounds.",
   "Iconic Actions": "*Immediately after another creature's turn, Frieza can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Frieza can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Frieza can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Frieza can move up to his *Movement Speed*"
  },
  "powerLevel": 71250,
  "ac": 22,
  "acNote": "",
  "hp": 250,
  "hpDice": "25d8+125",
  "ki": 95,
  "stamina": 25,
  "breatherPool": 10,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 18",
  "languages": "Common, Acorsian",
  "skills": "Athletics +9, Acrobatics +10, Deception +7, History +8, Intimidation +7, Perception +8",
  "conditionImmunities": "Charmed, Frightened, Incapacitated, Weighted (Heavy)",
  "id": "ant_frieza_saga_emperor_frieza"
 },
 {
  "name": "Frieza Force Elite Brute",
  "meta": "Large Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Elite Frieza Force",
  "stats": {
   "str": 20,
   "dex": 12,
   "con": 18,
   "int": 10,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Mighty Strength",
    "text": "When the Frieza Force Brute would be forced to make a *Strength Saving Throw* to be *Grappled* by a creature that is the same Size Category or smaller, it gains a +2 to its *Strength Saving Throw*."
   },
   {
    "name": "Powerful Size (Ki Rank 1)",
    "text": "The Frieza Force has 1 *Rank of Gigantification*"
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Brutal Critical\n- Crusher\n- Flight\n- Tough",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Cratering Beam*, *Erupting Energy*, *Full Power Energy Wave*, *Gut Punch ☆*, *Jab*, *Propulsion Beam*, *Submission Hold*, *Suplex*\n\n##### Mastery\n\n- *Gut Punch.* Gut Punch deals a *Critical Hit* on a 19-20",
   "Actions": "***Multiattack.*** The Frieza Force Bruite is able to make two Unarmed Strikes or Ki Blasts Attacks\n:\n***Unarmed Strikes.*** *Melee Weapon Attack:* +9 to hit, reach 10 ft., **Hit:** 10 (1d8+5) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +5 to hit, range 30/60 ft., **Hit:** 4 (1d4+1) *Energy Damage*"
  },
  "powerLevel": 7425,
  "ac": 18,
  "acNote": "Heavy Battle Armor",
  "hp": 45,
  "hpDice": "5d8+20",
  "ki": 55,
  "stamina": 14,
  "breatherPool": 9,
  "speed": "35 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "savingThrows": "Strength +9",
  "skills": "Athletics +9",
  "id": "ant_android_saga_frieza_force_elite_brute"
 },
 {
  "name": "Frieza Force Elite Blaster",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Elite Frieza Force",
  "stats": {
   "str": 8,
   "dex": 16,
   "con": 16,
   "int": 10,
   "wis": 18,
   "cha": 10
  },
  "traits": [
   {
    "name": "Hastened Volley",
    "text": "When the Frieza Force Blaster Elite would cast a **Ki Technique**, they may immediately take the **Ki Blast** action as a bonus action."
   },
   {
    "name": "Powerful Spirit",
    "text": "When the Frieza Force Blaster Elite would gain **Ki** from the **Gather Ki Action**, all creatures within a 5 ft. Emanataion must make a *Strength Saving Throw* against his **Blast Save DC**, on a failure, they are moved 5 feet away from them."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- I'm Putting it All Into This!\n- Ki Growth Training\n- Palpable Aura\n- Flight",
   "Techniques": "***Ki Rank 1.*** *Beam Sweep*, *Distance Detonation*, *Explosive Wave*, *Full Power Energy Wave*, *Ki Burst*, *Impact Beam*, *Laser Vision*, *Orb Crash*, *Palm Blast*, & *Power Fan*",
   "Actions": "***Unarmed Strikes.*** *Melee Weapon Attack:* +6 to hit, reach 5 ft., **Hit:** 5 (1d4+2) *Bludgeoning Damage*\n:\n***Ki Blasts.*** *Ranged Weapon Attack:* +6 to hit, range 30/60 ft., **Hit:** 5 (1d4+2) *Energy Damage*"
  },
  "powerLevel": 10200,
  "ac": 18,
  "acNote": "Light Battle Armor",
  "hp": 40,
  "hpDice": "5d8+15",
  "ki": 85,
  "stamina": 13,
  "breatherPool": 8,
  "speed": "40 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "savingThrows": "Wisdom +8",
  "skills": "Ki Control +8",
  "id": "ant_android_saga_frieza_force_elite_blaster"
 },
 {
  "name": "Frieza Force Eltie Tactician",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Elite Frieza Force",
  "stats": {
   "str": 14,
   "dex": 16,
   "con": 12,
   "int": 20,
   "wis": 14,
   "cha": 14
  },
  "traits": [
   {
    "name": "Self Sulficiency",
    "text": "As an action, the Frieza Force Battle Coordinator may reduce their *Movement Speed* by half to gain a +2 to their **AC** and all *Saving Throws*."
   },
   {
    "name": "Tactical Mind",
    "text": "As a reaction while the Frieza Force Battle Coordinator can see an allied creature within 30 feet make an *attack roll* or a *Saving Throw*, they may add a +2 to their roll."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Alert\n- Brain Blast\n- Redirect Attacks",
   "Techniques": "***Rank 1.*** *Condensed Orb*, *Controlled Energy Ball*, *Energy Whip*, *Energy Javelin*, *Ki Blast Barrage*, *Ki-Fueled Reload*, *Point-Blank Shot*, *Reinforcement*, *Straight Shot*, *Targeted Barrage*",
   "Actions": "***Laser Dagger.*** *Melee Weapon Attack:* +7 to hit, reach 5 ft., **Hit:** 6 (1d4+3) *Energy Damage*\n:\n***Pistol.*** *Ranged Weapon Attack:* +7 to hit, range 80/180 ft., **Hit:** 7 (1d6+3) *Piercing Damage*"
  },
  "powerLevel": 4050,
  "ac": 19,
  "acNote": "Medium Elite Armor",
  "hp": 30,
  "hpDice": "5d8+5",
  "ki": 45,
  "stamina": 11,
  "breatherPool": 6,
  "speed": "30 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 12",
  "languages": "Common",
  "savingThrows": "Dexterity +7",
  "skills": "Investigation +8",
  "id": "ant_android_saga_frieza_force_eltie_tactician"
 },
 {
  "name": "Frieza Force Elite Sniper",
  "meta": "Medium Humanoid (Xeno), Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Elite Frieza Force",
  "stats": {
   "str": 10,
   "dex": 20,
   "con": 14,
   "int": 10,
   "wis": 16,
   "cha": 12
  },
  "traits": [
   {
    "name": "Held Position",
    "text": "At the start of their turn, the Frieza Force Sniper may expend all their *Movement Speed* to gain advantage on their next attack roll."
   },
   {
    "name": "Sneak Attack",
    "text": "Once Per Turn, the Frieza Force Sniper may deal an additional 2d4 Damage on an attack roll that has advantage."
   }
  ],
  "sections": {
   "Feats & Trained Features": "- Flight\n- Ki Stealth\n- Skulker",
   "Techniques": "***Ki Rank 1.*** *Claim Distance*, *Clean Shot*, *Gunkata*, *Ki Blast Barrage*, *Ki-Fueled Reload*, *Mag Dump*, *Raze*, *Straight Shot*",
   "Actions": "***Multiattack.*** The Frieza Force Swarm can make two Dagger, Pistol, or Laser Sniper Rifle\n:\n***Dagger.*** *Melee Weapon Attack:* +8 to hit, reach 5 ft., **Hit:** 7 (1d4+4) *Piercing Damage*\n:\n***Pistol.*** *Ranged Weapon Attack:* +6 to hit, range 80/180 ft., **Hit:** 8 (1d6+4) *Piercing Damage*\n:\n***Laser Sniper Rifle.*** *Ranged Weapon Attack:* +8 to hit, range 200/800 ft., **Hit:** 13 (1d12+4) *Energy Damage*"
  },
  "powerLevel": 6825,
  "ac": 19,
  "acNote": "Light Elite Armor",
  "hp": 35,
  "hpDice": "5d8+10",
  "ki": 65,
  "stamina": 13,
  "breatherPool": 7,
  "speed": "30 ft.",
  "kiRank": 2,
  "antagonistLevel": 5,
  "prof": 4,
  "senses": "Passive Perception 17",
  "languages": "Common",
  "skills": "Perception +7",
  "id": "ant_android_saga_frieza_force_elite_sniper"
 },
 {
  "name": "Red Ribbon Mech Commander",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 20,
   "dex": 16,
   "con": 20,
   "int": 16,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Energy Core",
    "text": "The Red Ribbon Mech Commander cannot take the *Gather Ki Action*. But at the start of its turn, the Red Ribbon Mech Soldier gains 5 **Ki Points**"
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "The Red Ribbon Mech Commander gains 1 rank of Weighted (Light)"
   },
   {
    "name": "Morphed Armor",
    "text": "The Red Ribbon Mech Commander's **AC** counts as *Heavy Armor* for the purpose of **Features** and **Rules Interaction**. Additionally, he gains 4 *Damage Reduction*"
   },
   {
    "name": "Mechanized Techniques",
    "text": "When the Red Ribbon Mech Soldier would land an attack roll from an **Unarmed Technique** or they would fail a *Saving Throw* from the **Unarmed Technique**, they gain the *Dazed Condition* until the end of their next turn."
   }
  ],
  "sections": {
   "Feats": "- Bottomless Reserve\n- Flight\n- Heavy Armor Master",
   "Forms": "- Overclock",
   "Techniques": "***Ki Rank 1.*** *Cratering Beam ☆*, *Dive Strike*, *Explosive Wave ☆*, *Full Power Energy Wave*, *Gathered Beam*, *Haymaker*, *Heavy Throw ☆☆*, *Impact Beam*, *Jab*, *Palm Blast*, *Strike Combination ☆☆*, & *Thunderous Uppercut*\n\n##### Mastery\n\n- *Cratering Beam.* Cratering Beam has its Area of Effect increased by 10 feet.\n- *Explosive Wave.* Explosive Wave has its Area of Effect increased by 10 feet.\n- *Heavy Throw.* Heavy Throw now can target up to two creatures\n- *Strike Combination.* The Red Ribbon Mech Commander can move up to 30 feet when casting this **Technique.**",
   "Action": "***Multiattack.*** Red Ribbon Mech Soldier can make two Mecha Punch Attacks and Ki Blaster\n:\n***Gatling Gun*** *Ranged Attack Roll:* +6, range 60/90 ft., *Hit:* 7 (1d8+2) *Bludgeoning Damage*\n:\n***Mecha Punch.*** *Melee Attack Roll:* +9, reach 5 ft., *Hit:* 10 (1d10+4) *Bludgeoning Damage*. Addiitonally, creatures who would take damage must make a *Constitution Saving Throw* against its **Unarmed Save DC**, on a failure, they gain the *Dazed Condition* until the end of their next turn."
  },
  "powerLevel": 34020,
  "ac": 20,
  "acNote": "",
  "hp": 90,
  "hpDice": "9d8+45",
  "ki": 126,
  "stamina": 23,
  "breatherPool": 14,
  "speed": "40 ft.",
  "kiRank": 2,
  "antagonistLevel": 9,
  "prof": 5,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_red_ribbon_mech_commander"
 },
 {
  "name": "Red Ribbon Mech Soldier",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 18,
   "dex": 14,
   "con": 18,
   "int": 16,
   "wis": 16,
   "cha": 10
  },
  "traits": [
   {
    "name": "Energy Core",
    "text": "The Red Ribbon Mech Soldier cannot take the *Gather Ki Action*. But at the start of its turn, the Red Ribbon Mech Soldier gains 3 **Ki Points**"
   },
   {
    "name": "Morphed Armor",
    "text": "The Red Ribbon Mech Soldier's **AC** counts as *Heavy Armor* for the purpose of **Features** and **Rules Interaction**. Additionally, he gains 3 *Damage Reduction*"
   },
   {
    "name": "Mechanized Techniques",
    "text": "When the Red Ribbon Mech Soldier would land an attack roll from an **Unarmed Technique** or they would fail a *Saving Throw* from the **Unarmed Technique**, they gain the *Dazed Condition* until the end of their next turn."
   }
  ],
  "sections": {
   "Feats": "- Bottomless Reserve\n- Flight\n- Heavy Armor Master",
   "Forms": "- Increased Output",
   "Techniques": "***Ki Rank 1.*** *Cratering Beam*, *Dive Strike*, *Explosive Wave*, *Full Power Energy Wave*, *Gathered Beam*, *Haymaker*, *Heavy Throw*, *Impact Beam*, *Jab*, *Palm Blast*, *Strike Combination*, & *Thunderous Uppercut*",
   "Action": "***Multiattack.*** Red Ribbon Mech Soldier can make two Mecha Punch Attacks and Ki Blaster\n:\n***Gatling Gun*** *Ranged Attack Roll:* +6, range 60/90 ft., *Hit:* 7 (1d8+2) *Bludgeoning Damage*\n:\n***Mecha Punch.*** *Melee Attack Roll:* +9, reach 5 ft., *Hit:* 10 (1d10+4) *Bludgeoning Damage*. Addiitonally, creatures who would take damage must make a *Constitution Saving Throw* against its **Unarmed Save DC**, on a failure, they gain the *Dazed Condition* until the end of their next turn."
  },
  "powerLevel": 12636,
  "ac": 19,
  "acNote": "**Natural AC**",
  "hp": 54,
  "hpDice": "6d8+24",
  "ki": 78,
  "stamina": 16,
  "breatherPool": 10,
  "speed": "30 ft.",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 5,
  "senses": "Passive Perception 13",
  "languages": "Common",
  "conditionImmunities": "Charmed, Deafened, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_red_ribbon_mech_soldier"
 },
 {
  "name": "Skull Robot Mk. I (Flying Model)",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 20,
   "dex": 14,
   "con": 20,
   "int": 8,
   "wis": 8,
   "cha": 3
  },
  "traits": [
   {
    "name": "Plated Armor",
    "text": "Pirate Robot Mk. I has 2 points of *Damage Reduction*. Additionally, when it would take damage, it may expend 2 ki points to gain an additional 2 points of *Damage Reduction* until the start of their next turn."
   },
   {
    "name": "Energy Core",
    "text": "At the start of the Pirate Robot Mk. I's turn, it gains 5 **Ki Points**"
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Bonk! ☆☆*, *Bullet Rain*, *Clean Shot*, *Flash Flare ☆☆*, *Frenzy*, *Mag Dump*, *Parry,* & *Wide Swipe*\n\n##### Mastery\n\n- *Bonk.* Bonk can now target up to three creature within one *Attack Roll.*\n- *Flash Flare.* Flash Flare has its Area Of Effect increased by 10 feet and its range is increased to 90 feet",
   "Action": "***Multiattack.*** Skull Robot Mk. I can make one Tail Slam and one Mace Weapon or two Gatling Gun's Attacks\n:\n***Gatling Gun*** *Ranged Attack Roll:* +6, range 60/90 ft., *Hit:* 7 (1d8+2) *Bludgeoning Damage*\n:\n***Mace.*** *Melee Attack Roll:* +9, reach 5 ft., *Hit:* 11 (1d10+5) *Bludgeoning Damage*\n:\n***Tail Slam.*** *Melee Attack Roll:* +9, reach 10 ft., *Hit:* 10 (1d8+5) *Bludgeoning Damage*"
  },
  "powerLevel": 10800,
  "ac": 19,
  "acNote": "",
  "hp": 60,
  "hpDice": "6d8+30",
  "ki": 60,
  "stamina": 17,
  "breatherPool": 11,
  "speed": "30 ft., 30 ft. Fly",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 4,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_skull_robot_mk_i_flying_model"
 },
 {
  "name": "Skull Robot Mk. II",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 14,
   "dex": 20,
   "con": 20,
   "int": 8,
   "wis": 12,
   "cha": 3
  },
  "traits": [
   {
    "name": "Energy Core",
    "text": "At the start of the Pirate Robot Mk. I's turn, it gains 5 **Ki Points**"
   },
   {
    "name": "Titanic Armor",
    "text": "Pirate Robot Mk. I has 3 points of *Damage Reduction*. Additionally, when it would take damage, it may expend 2 ki points to gain an additional 2 points of *Damage Reduction* until the start of their next turn."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Bonk! ☆☆*, *Bullet Rain*, *Clean Shot*, *Flash Flare ☆☆*, *Frenzy*, *Gun Kata*, *Mag Dump*, *Parry*, *Point-Blank Shot*, & *Wide Swipe*\n\n##### Mastery\n\n- *Bonk.* Bonk can now target up to three creature within one *Attack Roll.*\n- *Flash Flare.* Flash Flare has its Area Of Effect increased by 10 feet and its range is increased to 90 feet",
   "Action": "***Multiattack.*** Skull Robot Mk. I can make one Tail Slam and one Mace Weapon or two Gatling Gun's Attacks\n:\n***Gatling Gun*** *Ranged Attack Roll:* +6, range 60/90 ft., *Hit:* 7 (1d8+2) *Bludgeoning Damage*\n:\n***Mace.*** *Melee Attack Roll:* +9, reach 5 ft., *Hit:* 11 (1d10+5) *Bludgeoning Damage*\n:\n***Tail Slam.*** *Melee Attack Roll:* +9, reach 10 ft., *Hit:* 10 (1d8+5) *Bludgeoning Damage*"
  },
  "powerLevel": 12600,
  "ac": 20,
  "acNote": "",
  "hp": 70,
  "hpDice": "7d8+35",
  "ki": 60,
  "stamina": 19,
  "breatherPool": 12,
  "speed": "30 ft., 30 ft. Fly",
  "kiRank": 2,
  "antagonistLevel": 7,
  "prof": 5,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_skull_robot_mk_ii"
 },
 {
  "name": "Skull Robot Mk. III",
  "meta": "Large Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 18,
   "dex": 18,
   "con": 20,
   "int": 8,
   "wis": 12,
   "cha": 3
  },
  "traits": [
   {
    "name": "Energy Core",
    "text": "At the start of the Pirate Robot Mk. I's turn, it gains 5 **Ki Points**"
   },
   {
    "name": "Powerful Size (Ki Rank 1)",
    "text": "Skull Robot Mk. III has 1 Rank of *Gigantification*"
   },
   {
    "name": "Colossal Armor",
    "text": "Pirate Robot Mk. I has 4 points of *Damage Reduction*. Additionally, when it would take damage, it may expend 2 ki points to gain an additional 2 points of *Damage Reduction* until the start of their next turn."
   }
  ],
  "sections": {
   "Techniques": "***Ki Rank 1.*** *Bonk! ☆☆*, *Bullet Rain*, *Clean Shot*, *Flash Flare ☆☆*, *Frenzy*, *Gun Kata*, *Mag Dump*, *Parry*, *Point-Blank Shot*, & *Wide Swipe*\n\n##### Mastery\n\n- *Bonk.* Bonk can now target up to three creature within one *Attack Roll.*\n- *Flash Flare.* Flash Flare has its Area Of Effect increased by 10 feet and its range is increased to 90 feet",
   "Action": "***Multiattack.*** Skull Robot Mk. I can make one Tail Slam and one Mace Weapon or two Gatling Gun's Attacks\n:\n***Gatling Gun*** *Ranged Attack Roll:* +6, range 60/90 ft., *Hit:* 7 (1d8+2) *Bludgeoning Damage*\n:\n***Mace.*** *Melee Attack Roll:* +9, reach 10 ft., *Hit:* 11 (1d10+5) *Bludgeoning Damage*\n:\n***Tail Slam.*** *Melee Attack Roll:* +9, reach 10 ft., *Hit:* 10 (1d8+5) *Bludgeoning Damage*"
  },
  "powerLevel": 23040,
  "ac": 20,
  "acNote": "",
  "hp": 80,
  "hpDice": "8d8+40",
  "ki": 96,
  "stamina": 19,
  "breatherPool": 13,
  "speed": "30 ft., 30 ft. Fly",
  "kiRank": 2,
  "antagonistLevel": 8,
  "prof": 5,
  "senses": "Passive Perception 11",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_skull_robot_mk_iii"
 },
 {
  "name": "Support Robot",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "General",
  "group": "Red Ribbon Army Robots",
  "stats": {
   "str": 6,
   "dex": 16,
   "con": 10,
   "int": 16,
   "wis": 16,
   "cha": 3
  },
  "traits": [
   {
    "name": "Energy Core",
    "text": "The Support Robot cannot take the *Gather Ki Action*. But at the start of its turn, the Support Robot gains 2 **Ki Points**."
   },
   {
    "name": "RR Mode Change",
    "text": "At the start of combat, the Support Robot may choose one of the following benefits to have for the duration of combat: - *Attack Bot:* Increase all damage dealt by +2. Additionally, if the Support Robot would have one allied creature make an attack roll, it may expend 8 ki to make a *Headbutt* or *Gun* attack roll. - *Assist Bot:* Choose one creature within the Combat Encounter, for the duration of combat, the benefiting creature gains a +1 **Stable Power Bonus** and increase all available *Movement Speed* by 10 ft. Additionally, the Support Robot may expend 10 ki to increase the benefiting creature's 2 *Damage Reduction* until the end of their next turn. - *Recovery Bot:* Choose one creature within the Combat Encounter, for the duration of combat, they gain 5 **Hit Points** at the start of their turn. Additionally, the Support Robot may expend 10 ki to increase the amount of **Hit Points** regained by 15."
   }
  ],
  "sections": {
   "Action": "***Headbutt.*** *Melee Attack Roll:* +6, reach 5 ft., *Hit:* 6 (1d4+3) *Bludgeoning Damage*\n:\n***Gun.*** *Ranged Attack Roll:* +6, range 90/180 ft., *Hit:* 6 (1d4+3) *Piercing Damage*"
  },
  "powerLevel": 4860,
  "ac": 17,
  "acNote": "**Natural AC**",
  "hp": 30,
  "hpDice": "6d8",
  "ki": 54,
  "stamina": 12,
  "breatherPool": 6,
  "speed": "50 ft. Hover, 50 ft. Fly",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 4,
  "senses": "Passive Perception 10",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Frightened, Incapacitated, Poisoned",
  "id": "ant_android_saga_support_robot"
 },
 {
  "name": "Android 19",
  "meta": "Medium Construct, Lawful Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Elite",
  "group": "RR Absorption Model",
  "stats": {
   "str": 22,
   "dex": 18,
   "con": 18,
   "int": 16,
   "wis": 12,
   "cha": 10
  },
  "traits": [
   {
    "name": "Electric Controller",
    "text": "Once per turn, when Android 19 would cast a **Technique** and change the damage type to *Lightning Damage*, it may choose to halve all *Damage Reduction*. If it is benefiting from the *Overclock* **Form**, it may halve the reduction of *Block* **Snap Decision** and *Push Back* **Snap Decision*."
   },
   {
    "name": "Inherent Power (Ki Rank 1)",
    "text": "Android 19 gains 1 rank of *Weighted (Light)*"
   },
   {
    "name": "Leech Cuffs",
    "text": "When Android 19 would take the *Push Back* **Snap Decision**, any damage that was reduced is converted into its **Current Ki Points.** This cannot raise it above its **Maximum Ki Points.** Alternatively, anytime it has a creature *Grappled*, it may expend its Bonus Action to steal 2d6 **Current Ki Points** from the *Grappled* target. Should a target start their turn *Grappled* it, they loses an amount of **Current Ki Points** equal to 2d8 and it gains the result into its **Current Ki Points.** This cannot raise it above its **Maximum Ki Points**."
   },
   {
    "name": "Robotic Body",
    "text": "It cannot take the *Gather Ki Action*, a **Technique**, or an **Item.** Instead at the start of its turn, it gains 12 + (3 times its **Current Power Bonus**( **Ki Points**. It also cannot be found through the **Sense Energy** option of the *Ki Sense* **Heroic Feat.** Additionally, it counts as an *Android* for the purpose of the **High-Tech Parts Advanced Upgrade**."
   }
  ],
  "sections": {
   "Feats": "- Alert\n- Elemental Energy\n- Grappler\n- Flight",
   "Forms": "- Overclock",
   "Techniques": "**Ki Rank 1.** *Aura Flare*, *Clinch*, *Controlled Energy Ball ☆*, *Energy Rain ☆*, *Energy Whip*, *Full Power Energy Wave ☆*, *Reinforcement*, *Stomp*, *Submission Hold*\n\n##### Mastery\n\n- *Controlled Energy Ball.* Controlled Energy Ball can be changed to *Lightning Damage*\n- *Energy Rain.* Energy Rain can be changed to *Lightning Damage.*\n- *Full Power Energy Wave.* Full Power's Energy Wave can be changed to *Lightning Damage.*",
   "Actions": "***Multiattack.*** Android 19 can take four *Unarmed Strike* or *Ki Blast* Action\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +8, range 30/60 ft., *Hit:* 6 (2d4+4) *Energy Damage*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +10, reach 5 ft., *Hit:* 16 (2d8+6) *Bludgeoning Damage*"
  },
  "powerLevel": 46332,
  "ac": 20,
  "acNote": "",
  "hp": 198,
  "hpDice": "22d8+88",
  "ki": 78,
  "stamina": 19,
  "breatherPool": 10,
  "speed": "30 ft.",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 4,
  "senses": "Passive Perception 16",
  "languages": "Common",
  "skills": "Athletics +10, Acrobatics +8, Insight +6, Perception +6",
  "conditionImmunities": "Charmed, Exhaustion, Incapacitated, Poisoned",
  "id": "ant_android_saga_android_19"
 },
 {
  "name": "Android 20 (Dr. Gero)",
  "meta": "Medium Construct, Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Elite",
  "group": "RR Absorption Model",
  "stats": {
   "str": 16,
   "dex": 22,
   "con": 16,
   "int": 24,
   "wis": 14,
   "cha": 16
  },
  "traits": [
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Dr. Gero gains 2 ranks of *Weighted (Light)*"
   },
   {
    "name": "Intellectual Fighting",
    "text": "Dr. Gero may use his **Intelligence Ability Modifier** for his **Beam Techniques**, **Unarmed Techniques** and *Unarmed Strikes* instead of its original **Ability Modifier.**"
   },
   {
    "name": "Leech Cuffs",
    "text": "When Dr. Gero would take the *Push Back* **Snap Decision**, any damage that was reduced is converted into his **Current Ki Points.** This cannot raise it above his **Maximum Ki Points.** Alternatively, anytime he has a creature *Grappled*, he may expend his Bonus Action to steal 2d6 **Current Ki Points** from the *Grappled* target. Should a target start their turn *Grappled*, they loses an amount of **Current Ki Points** equal to 2d8 and he gains the result into his **Current Ki Points.** This cannot raise it above his **Maximum Ki Points**."
   },
   {
    "name": "Robotic Body",
    "text": "He cannot take the *Gather Ki Action*, a **Technique**, or an **Item.** Instead at the start of his turn, he gains 14 + (3 times his **Current Power Bonus**) **Ki Points**. He also cannot be found through the **Sense Energy** option of the *Ki Sense* **Heroic Feat.** Additionally, he counts as an *Android* for the purpose of the **High-Tech Parts Advanced Upgrade**."
   },
   {
    "name": "The Smartest of Earth",
    "text": "When Dr. Gero would gain the benefit of the *Boosted (Mind) Condition*, he increases his **AC** by 3."
   }
  ],
  "sections": {
   "Feats": "- Alert\n- Brain Blast\n- Flight\n- Iconic Technique",
   "Forms": "- Overclocked",
   "Techniques": "***Ki Rank 1.*** *Aura Flare ☆*, *Clarity Burst*, *Counterblast*, *Full Power Energy Wave*, *Gathered Beam [Binding] ☆*, *Infusion*, *Jab*, *Propulsion Beam [Binding]*, *Raze*, *Reinforcement*, *Strike Combination*, & *Supression Hold*\n\n##### Mastery\n\n- *Gathered Beam.* Gathered Beam can be used as an action\n- *Aura Flare.* Aura Flare can be used as a *Bonus Action*",
   "Actions": "***Multiattack.*** Dr. Gero can take four *Unarmed Strike* or *Ki Blast* Action\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +11, range 30/60 ft., *Hit:* 14 (2d6+6) *Energy Damage*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +12, reach 5 ft., *Hit:* 15 (2d6+7) *Bludgeoning Damage*"
  },
  "powerLevel": 69888,
  "ac": 22,
  "acNote": "",
  "hp": 208,
  "hpDice": "26d8+78",
  "ki": 112,
  "stamina": 17,
  "breatherPool": 10,
  "speed": "30 ft.",
  "kiRank": 2,
  "antagonistLevel": 7,
  "prof": 5,
  "senses": "Passive Perception 16",
  "languages": "Common",
  "conditionImmunities": "Charmed, Exhaustion, Incapacitated, Poisoned",
  "id": "ant_android_saga_android_20_dr_gero"
 },
 {
  "name": "Cell Jr.'s",
  "meta": "Small Monstosity, Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Elite",
  "group": "Cell Jr.'s",
  "stats": {
   "str": 22,
   "dex": 22,
   "con": 20,
   "int": 10,
   "wis": 18,
   "cha": 8
  },
  "traits": [
   {
    "name": "Copied Knowledge",
    "text": "The Cell Jr. can choose one of the following options: - The Cell Jr. gains the *Kamehameha* and *Dragon Fist* **Technique** - The Cell Jr. gains the *Galick Gun* and *Final Crash* **Technique** - The Cell Jr. gains the *Masenko* and *Solar FLare* **Technique** - The Cell Jr. Gains the *Dodon-Pa* and *Tri-Beam* **Technique**"
   },
   {
    "name": "Flowing Super Saiyan",
    "text": "Cell Jr. always has the *Super Saiyan* **Form** active and it does not have to spend its **Ki Upkeep**"
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Cell Jr. gains 2 ranks of *Weighted (Light)*"
   },
   {
    "name": "Weak Regenerating Core",
    "text": "If Cell Jr. would hit 0 **Hit Points** and has not expended **Hit Points** from the *Regeneration Action*, it is able to instead be brought to 1 **Hit Point**, even if it would be killed outright."
   }
  ],
  "sections": {
   "Feats": "- Action Surge\n- Flight\n- Unarmed Fighting\n- Choose one of the Following\n  - Crane Style\n  - Turtle Style",
   "Forms": "- Super Saiyan",
   "Techniques": "***Ki Rank 1.*** *Angry Bombing*, *Condensed Orb*, *Distracting Barrage ☆☆*, *Energy Javelin*, *Explosive Wave ☆☆*, *Finger Shot*, *Full Power Energy Wave*, *Gut Punch ☆☆*, *Jab*, *Supressing Uppercut*, & *Raze*\n\n##### Mastery\n\n- *Distracting Barrage.* Distracting Barrage can now target up to three creatures in one attack roll.\n- *Explosive Wave.* Explosive Wave can be used as a Bonus Action and its Area of Effect is increased by 10 ft.\n- *Gut Punch.* Gut Punch deals a *Critical Hit* on an 18-20.",
   "Actions": "***Multiattack.*** Cell Jr. can take two *Unarmed Strike* or *Ki Blast* Action. After taking this action, he can cast a **Technique** of his choice.\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +11, range 30/60 ft., *Hit:* 14 (2d6+6) *Energy Damage*\n:\n***Regeneration.*** Cell Jr's has access to a pool of **Hit Points** equal to 135. As an action on his turn, he may expend any number of **Hit Points** from this pool to regain that many. This can not raise him above his **Hit Point Maximum**. Alternatively as an action, he may expend 15 of these **Hit Points** to regenrate a limb lost due to the *Crippled Condition.* This pool refereshes on a Long Rest.\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +12, reach 5 ft., *Hit:* 14 (2d6+6) *Bludgeoning Damage*"
  },
  "powerLevel": 121500,
  "ac": 24,
  "acNote": "",
  "hp": 300,
  "hpDice": "30d8+150",
  "ki": 135,
  "stamina": 23,
  "breatherPool": 14,
  "speed": "45 ft.",
  "kiRank": 2,
  "antagonistLevel": 9,
  "prof": 5,
  "senses": "Passive Perception 19",
  "languages": "Common",
  "skills": "Acrobatics +11, Athletics +11, Insight +9, Ki Control +9, Perception +9",
  "id": "ant_android_saga_cell_jr_s"
 },
 {
  "name": "Android 16",
  "meta": "Medium Construct, Lawful Neutral",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Android 16",
  "stats": {
   "str": 24,
   "dex": 16,
   "con": 22,
   "int": 14,
   "wis": 20,
   "cha": 10
  },
  "traits": [
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Android 16 gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Android 16 fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Powerful Energy",
    "text": "If Android 16 would *Charge* a **Ki Technique**, he may treat as if it had been *Charged* once."
   },
   {
    "name": "Robotic Body",
    "text": "He cannot take the *Gather Ki Action*, a **Technique**, or an **Item.** Instead at the start of its turn, he gains 14 + (3 times his **Current Power Bonus**) **Ki Points**. He also cannot be found through the **Sense Energy** option of the *Ki Sense* **Heroic Feat.** Additionally, he counts as an *Android* for the purpose of the **High-Tech Parts Advanced Upgrade**."
   },
   {
    "name": "Self Detruction Device",
    "text": "So long as Android 16 has the Self Destruction Device in him, he has the *Final Explosion* **Ki Technique.**"
   }
  ],
  "sections": {
   "Feats & Trained Feat": "##### Feat\n\n- Brutal Critical\n- Action Surge\n- Flight\n- I'll Take It!\n- I'm Putting It All Into This!\n- Tough",
   "Forms": "- Overclock",
   "Techniques": "***Ki Rank 1.*** *Clinch*, *Full Power Energy Wave*, *Gut Punch ☆*, *Haymaker*, *Impact Beam*, *Lariat ☆*, *Suplex*, *Stomp*, *Suppression Hold*\n:\n***Ki Rank 2.*** *Hell Flash ☆☆*\n\n##### Mastery\n\n- *Gut Punch.* Gut Punch deals a *Critical Hit* on a 19-29\n- *Hell Flash.* Hell Flash can be cast as a Bonus Action and if the affected creature would fail the *Saving Throw*, they are *Dazed* for the next minute or until they succeed a *Constitution Saving Throw*.\n- *Lariat.* Lariat can be used as a bonus action",
   "Action": "***Multiattack.*** Android 16 can make four *Unarmed Strikes* or *Ki Blasts*. Additionally, Android 16 can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +8, range 30/60 ft., *Hit:* 9 (1d10+3) *Energy Damage*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +12, reach 5 ft., *Hit:* 18 (2d10+6) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Android 16 can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Android 16 can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Android 16 can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Android 16 can move up to his *Movement Speed*",
   "Phase": "*When Android 16 is reduced to a **Hit Point Threshold**, he stops taking damage, removes any *Conditions* of his choice and gains the corresponding benefits*\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2      | 260                 | Android 16 activates the *Overclocked* **Form** without expending any action. Additionally his *Hell Flash* **Ki Technique's** damage is increased as if it had been *Charged* once. Alternatively, if he casts the *Final Explosion* **Ki Technique**, he gains +2 *Static Bonus* but doubles the damage dealt to himself. |\n:"
  },
  "powerLevel": 237120,
  "ac": 22,
  "acNote": "",
  "hp": 520,
  "hpDice": "40d8+320",
  "ki": 152,
  "stamina": 40,
  "breatherPool": 14,
  "speed": "40 ft.",
  "kiRank": 2,
  "antagonistLevel": 8,
  "prof": 5,
  "senses": "Passive Perception 20",
  "languages": "Common",
  "skills": "Animal Handling +10, Athletics +11, Nature +10, Perception +10",
  "id": "ant_android_saga_android_16"
 },
 {
  "name": "Android 17",
  "meta": "Medium Construct, Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Android 17 & 18",
  "stats": {
   "str": 22,
   "dex": 18,
   "con": 22,
   "int": 20,
   "wis": 16,
   "cha": 14
  },
  "traits": [
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Android 17 gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Android 17 fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Robotic Body",
    "text": "He cannot take the *Gather Ki Action*, a **Technique**, or an **Item.** Instead at the start of its turn, he gains 14 + (3 times his **Current Power Bonus**) **Ki Points**. He also cannot be found through the **Sense Energy** option of the *Ki Sense* **Heroic Feat.** Additionally, he counts as an *Android* for the purpose of the **High-Tech Parts Advanced Upgrade**."
   },
   {
    "name": "Team Cooperator",
    "text": "When Android 17 would take the *Assist*, *Overlapping Offense*, or *Tag Team* **Snap Decision** with Android 18, he or Android 18 gain an additional +1 *Static Bonus* to the triggering **Technique**."
   }
  ],
  "sections": {
   "Feats & Trained Feat": "##### Feat\n\n- Combat Coordination\n- Flight\n- Tough\n-\n##### Trained Features\n- Partner's Pledge (Android 18)\n- Tandem Techniques\n- Overalpping Offense",
   "Forms": "- Overclock",
   "Techniques": "***Ki Rank 1.*** *Coordinated Command*, *Full Power Energy Wave*, *Gut Punch*, *Ki Blast Barrage*, *Jab*, *Raze ☆*, *Shockwave Strike*, *Support Barrier*, *Synchronized Assault*, *Volley ☆*\n:\n***Ki Rank 2.*** *Perfect Union,* *Reactive Barrier*\n\n##### Mastery\n\n- *Raze.* Raze can be used as a Bonus Action\n- *Volley.* Volley's *Area of Effect* is increased by 20 ft.",
   "Action": "***Multiattack.*** Android 17 can make three *Unarmed Strikes* or *Ki Blasts*. Additionally, Android 17 can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +9, range 30/60 ft., *Hit:* 12 (2d6+4) *Energy Damage*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +11, reach 5 ft., *Hit:* 16 (2d8+6) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Android 17 can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Android 17 can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Android 17 can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Android 17 can move up to his *Movement Speed*",
   "Phase": "*When Android 17 is reduced to a **Hit Point Threshold**, he stops taking damage, removes any *Conditions* of his choice and gains the corresponding benefits*\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2     | 208                  | Android 17 can activate the *Overclocked* **Form** without expending any action. Additionally, if Android 17 has Android 18 in combat with him, all **Ki Cost** from the **Techniques** in the **Coordinated Combat Technique List** are reduced by half. If Android 17 does not have Android 18 in combat with him, he instead gains a +1 **Power Bonus** and he increases his *Movement Speed* by 10 feet while the *Overclocked* **Form** is active.|\n:"
  },
  "powerLevel": 148512,
  "ac": 23,
  "acNote": "",
  "hp": 416,
  "hpDice": "32d8+256",
  "ki": 119,
  "stamina": 34,
  "breatherPool": 13,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 7,
  "prof": 5,
  "senses": "Passive Perception 20",
  "languages": "Common",
  "skills": "Athletics +11, Investigation +10, Nature +8 Perception +10",
  "id": "ant_android_saga_android_17"
 },
 {
  "name": "Android 18",
  "meta": "Medium Construct, Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Android 17 & 18",
  "stats": {
   "str": 18,
   "dex": 22,
   "con": 22,
   "int": 16,
   "wis": 20,
   "cha": 16
  },
  "traits": [
   {
    "name": "Dextrous Combat",
    "text": "Android 18 can use their **Dexterity Ability Score** for their **Unarmed Technique Casting Ability Modifier.**"
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Android 18 gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Android 18 fails a *Saving Throw*, she can choose to succeed instead"
   },
   {
    "name": "Robotic Body",
    "text": "She cannot take the *Gather Ki Action*, a **Technique**, or an **Item.** Instead at the start of her turn, she gains 14 + (3 times her **Current Power Bonus**) **Ki Points**. She also cannot be found through the **Sense Energy** option of the *Ki Sense* **Heroic Feat.** Additionally, she counts as an *Android* for the purpose of the **High-Tech Parts Advanced Upgrade**."
   },
   {
    "name": "Team Cooperator",
    "text": "When Android 18 would take the *Assist*, *Overlapping Offense*, or *Tag Team* **Snap Decision** with Android 17, she or Android 17 gain an additional +1 *Static Bonus* to the triggering **Technique**."
   }
  ],
  "sections": {
   "Feat & Trained Features": "##### Feat\n\n- Combat Coordination\n- Flight\n- Ki Growth Training\n\n##### Trained Features\n- Partner's Pledge (Android 18)\n- Tandem Techniques\n- Overalpping Offense",
   "Forms": "- Overclock",
   "Techniques": "*Axe Kick*, *Bombardment ☆*, *Coordinated Command*, *Destructo Disk*, *Energy Disk Barrage ☆*, *Ki Blast Barrage*, *Jab*, *Support Barrier*, *Synchronized Assault*, *Volley*\n:\n***Ki Rank 2.*** *Perfect Union,* *Reactive Barrier*\n\n##### Mastery\n- *Energy Disk.* Energy Disk can be used as a Bonus Action\n- *Bombardment.* Bombardment's *Area of Effect* is increased by 20 ft.",
   "Action": "***Multiattack.*** Android 18 can make three *Unarmed Strikes* or *Ki Blasts*. Additionally, Android 18 can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blasts.*** *Ranged Attack Roll:* +9, range 30/60 ft., *Hit:* 16 (2d8+6) *Energy Damage*\n:\n***Unarmed Strikes.*** *Melee Attack Roll:* +11, reach 5 ft., *Hit:* 12 (2d4+6) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Android 18 can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Android 18 can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Android 18 can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Android 18 can move up to his *Movement Speed*",
   "Phase": "*When Android 18 is reduced to a **Hit Point Threshold**, she stops taking damage, removes any *Conditions* of her choice and gains the corresponding benefits*\n\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2     | 168                  | Android 18 can activate the *Overclocked* **Form** without expending any action. Additionally, if Android 18 has Android 17 in combat with her, all **Ki Cost** from the **Techniques** in the **Coordinated Combat Technique List** are reduced by half. If Android 18 does not have Android 17 in combat with him, she instead increases her **Dexterity Ability Score** to 24 for the duration *Overclocked* **Form** is active for this Combat.|\n:::"
  },
  "powerLevel": 155232,
  "ac": 24,
  "acNote": "",
  "hp": 352,
  "hpDice": "32d8+192",
  "ki": 147,
  "stamina": 34,
  "breatherPool": 13,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 7,
  "prof": 5,
  "senses": "Passive Perception",
  "languages": "Common",
  "skills": "Acrobatics +11, Ki Control +10, Perception +10, Sleight of Hand +11",
  "id": "ant_android_saga_android_18"
 },
 {
  "name": "Imperfect Cell",
  "meta": "Medium Monstrosity, Neutral Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Imperfect Cell",
  "stats": {
   "str": 22,
   "dex": 22,
   "con": 20,
   "int": 12,
   "wis": 20,
   "cha": 14
  },
  "traits": [
   {
    "name": "Absorbing Tail",
    "text": "When Imperfect Cell would kill a creature with his Tail Attack, he gains an amount of **Training Boons** equal to the creature’s Ki Rank + 1. Imperfect Cell can gain a maximum of 30 **Training Boons** this way, these **Training Boons** carry over to *Semi-Perfect Cell* and *Perfect Cell* (Cell's **Ability Scores** cannot be increased past 24). Alternatively if he were to cause Android 17 & 18 to hit 0 **Hit Points**, he may absorb them to *Evolve*, becoming *Semi-Perfect Cell*."
   },
   {
    "name": "Evolving Perfection (Stage 1)",
    "text": "When Imperfect Cell would hit 0 **Hit Points**, he does not die outright but he cannot be targeted by any attack roll, saving throws or effects. He must make three **Death Saving Throws** at the start of his turn. On a success, he may expend any amount of **Hit Die** and must make a **DC** 15 *Constitution Ability Check*, *ascending* to the *Semi-Perfect Cell*. Once this feature is used, he can no longer gain this benefit across all versions of Cell."
   },
   {
    "name": "Flowing Super Saiyan",
    "text": "Cell always has the *Super Saiyan* **Form** active and he does not have to spend its **Ki Upkeep**."
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Imperfect Cell gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Imperfect Cell fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Regeneration",
    "text": "Imperfect Cell has a pool of 144 **Hit Points**. He may expend any number of **Hit Points** as an action or bonus on his turn to regain that many **Hit Points**. Additionally as an action, he may expend 30 of these **Hit Points** to regenerate a limb lost due to the *Crippled Condition*. This pool refreshes on a Long Rest. \\column"
   }
  ],
  "sections": {
   "Feats & Trained Feat": "- Durable\n- Energy Released x2\n- Flight\n- Ki Sense\n- Ki Stealth\n- Turtle Style",
   "Forms": "- Maximum Energy Release\n- Super Saiyan",
   "Techniques": "***Ki Rank 1.*** *Finger Beam*, *Finger Shot*, *Galick Gun*, *Heavy Throw*, *Jab*, *Kamehameha ☆☆*, *Raze*, *Solar Flare ☆*, *Special Beam Cannon*, & *Volley*\n:\n***Ki Rank 2.*** *Gamma-Burst Galick Gun ☆☆*\n\n##### Mastery\n\n- *Gamma Burst Galick Gun.* Gamma Burst Galick Gun has its Width by 10 ft. and its length increased by 20 ft.\n- *Kamehameha.* Kamehameha has its Width increased 10 ft and its Length by 30 ft.\n- *Solar Flare.* A creature that would fail *Solar Flare* gains the *Dazed Condition* for the next minute or until they succeed a *Constitution Saving Throw.*",
   "Actions": "***Multiattack.*** Imperfect Cell can make three Unarmed Strikes or Basic Ki Blast and one Tail Attack. Cell can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blast*** *Ranged Attack Roll:* +11, range 30/60 ft., *Hit:* 16 (2d8+6) *Energy Damage*\n:\n***Tail Attack.*** *Melee Attack Roll:* +11, reach 5 ft., *Hit:* 12 (2d6+6) *Piercing Damage*. Additionally, Cell gains an additional amount of **Ki Points** from this attack equal to the result.\n:\n***Unarmed Strike.*** *Melee Attack Roll:* +11, reach 5 ft., *Hit:* 12 (2d10+6) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Imperfect Cell can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Imperfect Cell can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Imperfect Cell can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Imperfect Cell can move up to his *Movement Speed*"
  },
  "powerLevel": 172800,
  "ac": 24,
  "acNote": "",
  "hp": 400,
  "hpDice": "40d8+200",
  "ki": 144,
  "stamina": 34,
  "breatherPool": 13,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 8,
  "prof": 5,
  "senses": "Passive Perception 20",
  "languages": "Acorsian, Common, Namekian, Sadalan",
  "skills": "Athletics +11, Acrobatics +11, Insight +10, Ki Control +15, Perception +10, Stealth +16",
  "id": "ant_android_saga_imperfect_cell"
 },
 {
  "name": "King Cold",
  "meta": "Large Humanoid (Acorsian), Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "King Cold",
  "stats": {
   "str": 22,
   "dex": 20,
   "con": 20,
   "int": 14,
   "wis": 18,
   "cha": 20
  },
  "traits": [
   {
    "name": "Cold Tribe",
    "text": "King Cold always has the *Gated Power* **Form** active"
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "King Cold gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If King Cold fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Powerful Mutant Power",
    "text": "All of King Cold **Forms** provide 2 additional **Power Bonus.**"
   },
   {
    "name": "Refined Power",
    "text": "King Cold always has *Magnificent Ability* active and he does not have to spend its **Ki Upkeep**"
   },
   {
    "name": "Space Survivor",
    "text": "King Cold does not require air and are immune to the effects of the vacuum of space."
   }
  ],
  "sections": {
   "Feat": "- Aggressive Aura\n- Beam Master\n- Brutal Critical\n- Final Dregs\n- Flight\n- Tough",
   "Forms & Form Modification": "##### Forms\n\n- *Power Regression*\n- *Released Power*\n\n##### Form Modifications\n\n- *Magnificent Ability*",
   "Techniques": "***Ki Rank 1.*** *Cannon Burst*, *Death Ball ☆*, *Explosive Wave ☆*, *Finger Beam*, *Finger Shot*, *Gut Punch*, *Haymaker*, *Jab*, *Strike Combination*\n:\n***Ki Rank 2.*** *Expanding Death Ball*\n\n##### Mastery\n\n- *Explosive Wave.* Explosive Wave counts as a **Beam Technique.**\n- *Death Ball.* Death Ball counts as a **Beam Technique.**\n\n##### Mastery\n- *Death Ball.* Death Ball's Area of Effect is increased by 10 feet and when a creature fails this *Saving Throw*, they are knocked *Prone* for the next minute or until they succeed a *Constitution Saving Throw*\n- *Expanding Death Ball.* Expanding Death Ball deals a *Critical Hit* on a 19-20\n- *Finger Beam.* Finger Beam counts as a **Barrage Technique**",
   "Actions": "***Multiattack.*** King Cold can make three *Unarmed Strikes* or *Ki Blasts*. Additionally King Cold can cast a **Generic Ki Technique** after taking the *Attack Action*.\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +9 to hit, range 60/120 ft., **Hit:** 12 (1d10+5) *Energy Damage*\n:\n***Unarmed Attacks.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 16 (2d8+6) *Bludgeoning Damage*",
   "Bonus Action": "***Emperor's Wrath (2/Long Rest).*** King Cold gains the *Enraged Condition* for 2 rounds.",
   "Iconic Actions": "*Immediately after another creature's turn, King Cold can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** King Cold can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** King Cold can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** King Cold can move up to his *Movement Speed*",
   "Phases": "When King Cold is reduced to a **Hit Point Threshold**, he stops taking damage, removes any *Conditions* of his choice and gains the corresponding benefits\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2     | 168                  | King Cold can activate the *Released Power* **Form** without expending any action.. Additionally for the duration of this **Phase**, he gains a +2 *Static Bonus* to all *Unarmed Strikes* and *Weapon Attacks*.|"
  },
  "powerLevel": 102816,
  "ac": 22,
  "acNote": "",
  "hp": 336,
  "hpDice": "28d8+196",
  "ki": 102,
  "stamina": 17,
  "breatherPool": 11,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 4,
  "senses": "Passive Perception 18",
  "languages": "Common, Acorsian",
  "skills": "Athletics +10, Acrobatics +9, Deception +10, History +8, Intimidation +7, Perception +8",
  "conditionImmunities": "Charmed, Frightened, Incapacitated, Weighted (Heavy)",
  "id": "ant_android_saga_king_cold"
 },
 {
  "name": "Mecha Frieza",
  "meta": "Medium Humanoid (Acorsian), Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Mecha Frieza",
  "stats": {
   "str": 20,
   "dex": 22,
   "con": 20,
   "int": 18,
   "wis": 18,
   "cha": 16
  },
  "traits": [
   {
    "name": "Cold Tribe",
    "text": "Mecha Frieza always has the *Gated Power* **Form** active"
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Mecha Frieza gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Mecha Frieza fails a *Saving Throw*, it can choose to succeed instead"
   },
   {
    "name": "Mutant Power",
    "text": "All of Mecha Frieza's **Forms** provide 1 additional **Power Bonus.**"
   },
   {
    "name": "Mechanized Enhancement",
    "text": "The *Power Regression* **Form Modification's Ki Cost** is reduced to 0. However, all **Ki Techniques Ki Cost** is increased by 1/4th of its **Ki Cost.**"
   },
   {
    "name": "Space Survivor",
    "text": "Mecha Frieza does not require air and are immune to the effects of the vacuum of space."
   }
  ],
  "sections": {
   "Feat": "- Aggressive Aura\n- Barrage Master\n- Final Dregs\n- Flight\n- Ki Growth Training\n- Iconic Technique [Homing]",
   "Forms & Form Modification": "##### Forms\n\n- *Power Regression*\n- *Released Power*\n\n##### Form Modifications\n\n- *Magnificent Ability*\n- *Piercing Energy*\n- *Powerful Attacks*",
   "Techniques": "***Ki Rank 1.*** *Energy Disk Barrage [Homing]*, *Finger Beam  ☆*, *Finger Shot [Homing]*, *Cannon Burst*, *Death Ball ☆☆*, *Psychokinesis*\n:\n***Ki Rank 2.*** *Expanding Death Ball ☆*, *Supernova*\n\n##### Mastery\n- *Death Ball.* Death Ball's Area of Effect is increased by 10 feet and when a creature fails this *Saving Throw*, they are knocked *Prone* for the next minute or until they succeed a *Constitution Saving Throw*\n- *Expanding Death Ball.* Expanding Death Ball deals a *Critical Hit* on a 19-20\n- *Finger Beam.* Finger Beam counts as a **Barrage Technique**",
   "Actions": "***Multiattack.*** Mecha Frieza can make three *Unarmed Strikes* or *Ki Blasts*. Additionally Frieza can cast a **Generic Ki Technique** after taking the *Attack Action*.\n:\n***Ki Blast.*** *Ranged Weapon Attack:* +10 to hit, range 60/120 ft., **Hit:** 12 (1d10+6) *Energy Damage*\n:\n***Unarmed Attacks.*** *Melee Weapon Attack:* +10 to hit, reach 5 ft., **Hit:** 16 (2d8+6) *Bludgeoning Damage*",
   "Bonus Action": "***Emperor's Wrath (2/Long Rest).*** Frieza gains the *Enraged Condition* for 2 rounds.",
   "Iconic Actions": "*Immediately after another creature's turn, Frieza can expend a use to take one of the following actions.*\n:\n***Cast Technique.*** Frieza can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Frieza can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Frieza can move up to his *Movement Speed*",
   "Phases": "When Mecha Frieza is reduced to a **Hit Point Threshold**, he stops taking damage, removes any *Conditions* of his choice and gains the corresponding benefits\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2     | 140          |  Frieza can activate the *Released Power* **Form** without expending any action.. Additionally for the duration of this **Phase**, creatures who have a **Power Bonus** less than Mecha Frieza's **Power Bonus** has all instances of reduction from **Snap Decision** halved.  |"
  },
  "powerLevel": 85680,
  "ac": 22,
  "acNote": "",
  "hp": 280,
  "hpDice": "28d8+140",
  "ki": 102,
  "stamina": 17,
  "breatherPool": 11,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 6,
  "prof": 4,
  "senses": "Passive Perception 18",
  "languages": "Common, Acorsian",
  "skills": "Athletics +9, Acrobatics +10, Deception +7, History +8, Intimidation +7, Perception +8",
  "conditionImmunities": "Charmed, Frightened, Incapacitated, Weighted (Heavy)",
  "id": "ant_android_saga_mecha_frieza"
 },
 {
  "name": "Semi-Perfect Cell",
  "meta": "Medium Monstrosity, Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Semi-Perfect Cell",
  "stats": {
   "str": 24,
   "dex": 22,
   "con": 22,
   "int": 14,
   "wis": 20,
   "cha": 14
  },
  "traits": [
   {
    "name": "Absorbing Tail",
    "text": "When Semi-Perfect Cell would kill a creature with his Tail Attack, he gains an amount of **Training Boons** equal to the creature’s Ki Rank + 1. Semi-Perfect Cell can gain a maximum of 45 **Training Boons** this way, these **Training Boons** carry over to and *Perfect Cell* (Cell's **Ability Scores** cannot be increased past 24). Alternatively if he were to cause Android 17 & 18 to hit 0 **Hit Points**, he may absorb them to *Evolve*, becoming *Perfect Cell*. If Semi-Perfect Cell would be hit with a *Critical Hit* while he is in the *Critical Condition*, he must make a DC 25 *Constitution Saving Throw*, on a failure, he *descends* to Imperfect Cell with the same amount of **Current Hit Points** and releases them in the reverse order and released the Androids in the reverse order of obtainment."
   },
   {
    "name": "Evolving Perfection (Stage 2)",
    "text": "When Semi-Perfect Cell would hit 0 **Hit Points**, he does not die outright but he cannot be targeted by any attack roll, saving throws or effects. He must make three **Death Saving Throws** at the start of his turn. On a success, he may expend any amount of **Hit Die** and must make a **DC** 15 *Constitution Ability Check*, *ascending* to the *Perfect Cell* and gaining the *Ascended Super Saiyan* **Form Modification**. Once this feature is used, he can no longer gain this benefit across all versions of Cell."
   },
   {
    "name": "Flowing Super Saiyan",
    "text": "Semi-Perfect Cell always has the *Super Saiyan* **Form** active and he does not have to spend its **Ki Upkeep**."
   },
   {
    "name": "Inherent Power (Ki Rank 2)",
    "text": "Semi-Perfect Cell gains 2 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (4/Day)",
    "text": "If Semi-Perfect Cell fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Regeneration",
    "text": "Semi-Perfect Cell has a pool of 152 **Hit Points**. He may expend any number of **Hit Points** as an action or bonus on his turn to regain that many **Hit Points**. Additionally as an action, he may expend 30 of these **Hit Points** to regenerate a limb lost due to the *Crippled Condition*. This pool refreshes on a Long Rest. \\column"
   }
  ],
  "sections": {
   "Feats & Trained Feat": "- Durable\n- Energy Released\n- Full Power Fighter x2\n- Flight\n- Ki Sense\n- Ki Stealth\n- Turtle Style",
   "Forms": "- Full Power\n- Maximum Energy Release\n- Super Saiyan",
   "Techniques": "***Ki Rank 1.*** *Death Ball  ☆*, *Finger Beam*, *Finger Shot*, *Galick Gun*, *Heavy Throw*, *Jab*, *Kamehameha ☆☆*, *Raze*, *Solar Flare ☆*, *Special Beam Cannon*, & *Volley*\n:\n***Ki Rank 2.*** *Gamma-Burst Galick Gun ☆☆*\n\n##### Mastery\n\n- *Death Ball.* Death Ball has its *Area of Effect* increased by 10 ft.\n- *Gamma Burst Galick Gun.* Gamma Burst Galick Gun has its Width by 10 ft. and its length increased by 20 ft.\n- *Kamehameha.* Kamehameha has its Width increased 10 ft and its Length by 30 ft.\n- *Solar Flare.* A creature that would fail *Solar Flare* gains the *Dazed Condition* for the next minute or until they succeed a *Constitution Saving Throw.*",
   "Actions": "***Multiattack.*** Semi-Perfect Cell can make three Unarmed Strikes or Basic Ki Blast and one Tail Attack. Cell can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blast*** *Ranged Attack Roll:* +11, range 30/60 ft., *Hit:* 18 (2d10+6) *Energy Damage*\n:\n***Tail Attack.*** *Melee Attack Roll:* +12, reach 5 ft., *Hit:* 17 (2d8+7) *Piercing Damage*. Additionally, Cell gains an additional amount of **Ki Points** from this attack equal to the result.\n:\n***Unarmed Strike.*** *Melee Attack Roll:* +12, reach 5 ft., *Hit:* 21 (2d12+7) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Semi-Perfect Cell can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Semi-Perfect Cell can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Semi-Perfect Cell can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Semi-Perfect Cell can move up to his *Movement Speed*"
  },
  "powerLevel": 250800,
  "ac": 24,
  "acNote": "",
  "hp": 550,
  "hpDice": "50d8+300",
  "ki": 152,
  "stamina": 42,
  "breatherPool": 15,
  "speed": "50 ft.",
  "kiRank": 2,
  "antagonistLevel": 9,
  "prof": 5,
  "senses": "Passive Perception 20",
  "languages": "Acorsian, Common, Namekian, Sadalan",
  "skills": "Athletics +11, Acrobatics +11, Insight +10, Ki Control +15, Perception +10, Stealth +16",
  "id": "ant_android_saga_semi_perfect_cell"
 },
 {
  "name": "Perfect Cell",
  "meta": "Medium Monstrosity, Chaotic Evil",
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Iconic",
  "group": "Perfect Cell",
  "stats": {
   "str": 24,
   "dex": 24,
   "con": 22,
   "int": 14,
   "wis": 22,
   "cha": 14
  },
  "traits": [
   {
    "name": "Absorbing Tail",
    "text": "When Perfect Cell would kill a creature with his Tail Attack, he gains an amount of **Training Boons** equal to the creature’s Ki Rank + 1. Perfect Cell can gain a maximum of 60 **Training Boons** this way (Cell's **Ability Scores** cannot be increased past 26).  If Perfect Cell would be hit with a *Critical Hit* while he is in the *Critical Condition*, he must make a DC 25 *Constitution Saving Throw*, on a failure, he *descends* to Semi-Perfect Cell with the same amount of **Current Hit Points** and releases them in the reverse order and released the Androids in the reverse order of obtainment."
   },
   {
    "name": "Evolving Perfection (Stage 2)",
    "text": "When Perfect Cell would hit 0 **Hit Points**, he does not die outright but he cannot be targeted by any attack roll, saving throws or effects. He must make three **Death Saving Throws** at the start of his turn. On a success, he may expend any amount of **Hit Die** and must make a **DC** 15 *Constitution Ability Check*, gaining the *Ascended Super Saiyan* **Form Modification**. Once this feature is used, he can no longer gain this benefit across all versions of Cell."
   },
   {
    "name": "Flowing Super Saiyan",
    "text": "Perfect Cell always has the *Super Saiyan* **Form** active and he does not have to spend its **Ki Upkeep**."
   },
   {
    "name": "Inherent Power (Ki Rank 3)",
    "text": "Perfect Cell gains 3 rank of *Weighted (Light)*"
   },
   {
    "name": "Legendary Resistance (6/Day)",
    "text": "If Perfect Cell fails a *Saving Throw*, he can choose to succeed instead"
   },
   {
    "name": "Perfected Destruction",
    "text": "When Perfect Cell would cast the *Solar Kamehameha* **Ki Technique**,  he deals double damage to all *Structures* and *Celestial Bodies*"
   },
   {
    "name": "Regeneration",
    "text": "Perfect Cell has a pool of 210 **Hit Points**. He may expend any number of **Hit Points** as an action or bonus on his turn to regain that many **Hit Points**. Additionally as an action, he may expend 30 of these **Hit Points** to regenerate a limb lost due to the *Crippled Condition*. This pool refreshes on a Long Rest."
   }
  ],
  "sections": {
   "Feats & Trained Feat": "##### Feats\n\n- Durable\n- Energy Released\n- Full Power Fighter x2\n- Flight\n- Ki Growth Training\n- Ki Sense\n- Ki Stealth\n- Tough\n- Turtle Style\n\n##### Trained Features\n\n- Instant Transmission (Perfect Cell gains this **Trained Feature** from the *Evolving Perfection (Stage 2)* **Trait**)",
   "Forms": "##### Forms\n\n- Full Power\n- Maximum Energy Release\n- Super Saiyan\n\n##### Form Modification\n\n- Ascended Super Saiyan (Perfect Cell gains this **Form Modification** from the *Evolving Perfection (Stage 2)* **Trait**)",
   "Techniques": "***Ki Rank 1.*** *Death Ball  ☆*, *Finger Beam*, *Finger Shot*, *Galick Gun*, *Heavy Throw*, *Jab*, *Kamehameha ☆☆*, *Raze*, *Solar Flare ☆*, *Special Beam Cannon*, & *Volley*\n:\n***Ki Rank 2.*** *Expanding Death Ball*, *Gamma-Burst Galick Gun ☆☆*\n:\n***Ki Rank 3.*** *Solar Kamehameha*\n\n##### Mastery\n\n- *Death Ball.* Death Ball has its *Area of Effect* increased by 10 ft.\n- *Gamma Burst Galick Gun.* Gamma Burst Galick Gun has its Width by 10 ft. and its length increased by 20 ft.\n- *Kamehameha.* Kamehameha has its Width increased 10 ft and its Length by 30 ft.\n- *Solar Flare.* A creature that would fail *Solar Flare* gains the *Dazed Condition* for the next minute or until they succeed a *Constitution Saving Throw.*",
   "Actions": "***Multiattack.*** Semi-Perfect Cell can make three Unarmed Strikes or Basic Ki Blast and one Tail Attack. Cell can cast a **Generic Technique** after taking the *Attack Action*\n:\n***Ki Blast*** *Ranged Attack Roll:* +13, range 30/60 ft., *Hit:* 21 (2d12+7) *Energy Damage*\n:\n***Tail Attack.*** *Melee Attack Roll:* +13, reach 5 ft., *Hit:* 19 (2d10+7) *Piercing Damage*. Additionally, Cell gains an additional amount of **Ki Points** from this attack equal to the result.\n:\n***Unarmed Strike.*** *Melee Attack Roll:* +13, reach 5 ft., *Hit:* 21 (2d12+7) *Bludgeoning Damage*",
   "Iconic Action": "*Immediately after another creature's turn, Perfect Cell can expend a use to take one of the following action.*\n:\n***Cast Technique.*** Perfect Cell can cast one **Technique** so long as it is not a **Super Technique**\n:\n***Iconic Snap.*** Perfect Cell can expend one usage of his **Iconic Action's** to regain a usage of an expended **Snap Decision**\n:\n***Move.*** Perfect Cell can move up to his *Movement Speed*",
   "Phases": "*When Perfect Cell is reduced to a **Hit Point Threshold**, he stops taking damage, removes any *Conditions* of him choice and gains the corresponding benefits*\n\n| Phases | Hit Point Threshold | Benefit |\n|:------:|:-------------------:|:-------:|\n| 2      | 413                 | Perfect Cell can activate the *Maximum Energy Release* **Form** without expending any action. Additionally, while Semi-Perfect Cell has *Maximum Energy Release* active, Semi-Perfect Cell gains 2 *Damage Reduction* to all creatures that have 2 less **Power Bonus** than he does. |\n| 3      | 275                 | Perfect Cell can activate the *Full Power* **Form** as a **Form Modification** without expending any action. Additionally, while Perfect Cell has *Full Power active*, his *Unarmed Strikes* add half of his **Strength Ability Modifier** to the damage and his **Techniques** may add his **Strength Ability Modifier** to the damage  |\n| 4      | 137                  | Perfect Cell may enter a *Self-Destructive State* which lasts till the end of the next round. In the *Self-Destructive State*, Semi-Perfect Cell's *Movement Speed* is reduced by half and if Perfect Cell takes any damage or at the end of the next round, he automatically casts the *Final Explosion* **Ki Technique**. Casting *Final Explosion* this way automatically deals double damage to all Celestial Bodies and Structures. If this *Phase* has been used by any version of Perfect Cell, he can no longer benefit from this *Phase*. |\n| 5      | 275 (Special)         | This *Phase* can only be gained after using any version of the *Evolving Perfection* **Trait.**. Perfect Cell can activate the *Ascended Super Saiyan* **Form Modification** without expending any action. Additionally for the duration of this *Phase*, Cell may now cast **Super Techniques** instead of **Generic Techniques** after taking the *Attack Action*."
  },
  "powerLevel": 708400,
  "ac": 26,
  "acNote": "",
  "hp": 770,
  "hpDice": "55d10+440",
  "ki": 230,
  "stamina": 42,
  "breatherPool": 16,
  "speed": "50 ft.",
  "kiRank": 3,
  "antagonistLevel": 10,
  "prof": 6,
  "senses": "Passive Perception 22",
  "languages": "Acorsian, Common, Namekian, Sadalan",
  "skills": "Athletics +13, Acrobatics +13, Insight +12, Ki Control +18, Perception +12, Stealth +18",
  "id": "ant_android_saga_perfect_cell"
 }
];

export const COMBAT_ZONE_DATA = [
 {
  "name": "Pilaf's Castle",
  "meta": "Large Structure",
  "wide": true,
  "era": "Dragon Ball",
  "saga": "Emperor Pilaf Saga",
  "tier": "Combat Zone",
  "group": "Pilaf's Castle",
  "stats": null,
  "traits": [],
  "sections": {
   "Rooms": "#### First Floor Arena\n\nFor every minute that a hostile creature starts their round within this room, the **DM** may roll 2d4+2 *Pilaf's Robot*.\n\n#### Hallway\nAt *Initiative Round* 20, roll a 1d6 with the effects determined by the table below for all creatures within the *Hallway*:\n\n| 1d6 | Hallway Encounter |\n|:---:|:-----------------:|\n| 1-2   | No Effect      |\n| 3-4 | The floor is electrified, all creature standing on the ground must make a *Dexterity Saving Throw* against **DC** 12, they take 1d4+2 *Lightning Damage*. A creature that takes damage from this **Technique** gains the *Incapacitated Condition*. |\n| 5-6 | Barrels of the guns come out of the wall, all creature within the *Hallway* must make a *Dexterity Saving Throw* against **DC** 12, they take 1d8+4 *Piercing Damage.* |\n\n#### Impenetrable Jail\n\nWhile a creature is within this room, the *Damage Threshold* is doubled. Additionally, creatures within this room cannot gain the benefit of a *Rest* and at the end of every minute, they take 1d6+3 *Fire Damage*\n\n#### Second Floor Arena\n\nFor every minute that a hostile creature starts their round within this room, the **DM** may roll 3d4+2 *Pilaf's Robot*. If the **Pilaf Machine** is active, they instead roll 1d4+2.",
   "Telegraphed Action": "*At the start of the round, Pilaf may choose one of the following Telegraphed Action*\n:\n**Launching Explosion.** Choose up to three points of **Pilaf's** Choice while they are within the castle. At the start of the next round, all creatures within a 10 ft. radius sphere, they must make a *Dexterity Saving Throw* against **DC** 12, on a failure, they are *Launched* 15 ft. to a point of Pilaf's choice.\n:\n**Concussive Gas.** Choose one point of **Pilaf's** choice while they are within a room that is not the **Hallway**. At the start of the next round, All creatures within a 30 ft. radius sphere from that point  must make a *Constitution Saving Throw* against **DC** 12, on a failure, they gain the *Unconscious* Condition for the next minute or until a creature spends their Action to wake them up. A creature who succeeded this effect cannot be affected for the next minute.\n:\n**Handy Helpers.** Choose up to two points of **Pilaf's** choice within the castle. At the start of the next round, all creatures within a  15 ft. radius sphere, they must make a *Strength Saving Throw* against **DC** 12, on a failure, they take 1d8+4 *Bludgeoning Damage* and are *Grappled* within that point. The affected creature must spend their action to attempt to break out."
  },
  "powerLevel": null,
  "ac": 16,
  "acNote": "",
  "hp": 70,
  "hpDice": "10d8+30",
  "ki": null,
  "stamina": null,
  "breatherPool": null,
  "speed": "",
  "kiRank": null,
  "antagonistLevel": null,
  "prof": null,
  "senses": "",
  "languages": "",
  "resistances": "Bludgeoning, Energy, Piercing, and Slashing",
  "immunities": "Necrotic, Poison, and Psychic",
  "damageThreshold": "15",
  "id": "ant_emperor_pilaf_saga_pilaf_s_castle"
 },
 {
  "name": "World Martial Arts Tournament",
  "meta": "Gargantuan Structure",
  "wide": true,
  "era": "Dragon Ball",
  "saga": "21st World Martial Arts Tournament",
  "tier": "Combat Zone",
  "group": "World Martial Arts Tournament",
  "stats": null,
  "traits": [],
  "sections": {
   "Rules": "1. While you are within the **Tournament Grounds**, you are not permitted to kill. For the duration of the **Tournament**, you may choose to have all damage that you would deal count as Non-Lethal Damage for the duration.\n\n2. When you would be *Launched* outside the stated **Tournament Grounds**, you must make a *Dexterity Saving Throw* against **DC** 12 or the triggering creatures **Save DC**. On a failure, they are eliminated. On a success, you jump 5 feet into the ring.\n\n3. When you would be knocked to 0 **Hit Points** but not killed outright, you are not allowed to be moved or grappled and you may make a *Constitution Saving Throw* against **DC** 15, on a failure, you remain *Unconscious*. On a success, you wake up with a number of **Hit Points** equal to double your **Character Level.** If you would fail two *Saving Throws* in a row, you are eliminated.\n\n4. While you are fighting within the *Preliminary Grounds* or *World Tournament Stadium*, you may without any action state that you surrender. Surrendering this way automatically disqualifies you from the Tournament.",
   "Rooms": "#### Preliminary Grounds\n\n**Tournament Grounds:** 60 ft. x 60 ft. Square.\n:\nWhile you are in the Preliminary **Tournament Grounds**, if you have any of the following **Resources** that are below the listed amount, you double the **Maximum** and **Current** for the duration that the **Tournament** is active\n\n- **Maximum Hit Points:** 15\n- **Maximum Ki Points:** 20\n- **Maximum Stamina Points:** 5\n\n#### World Tournament Stadium\n**Tournament Grounds:** 90 ft. x 90 ft. Square.\n\nWhile you are in the World Tournament Stadium **Tournament Grounds**, if you have any of the following **Resources** that are below the listed amount, you double the **Maximum** and **Current** for the duration that the **Tournament** is active\n\n- **Maximum Hit Points:** 15\n- **Maximum Ki Points:** 20\n- **Maximum Stamina Points:** 5\n\nAdditionally the cheer of the stadium enhances both contestants performance, both contestant must choose up to two numbers between 1-4, these numbers cannot be the same as each other. at the start of every round during a combat, while both Tournament Contestants are under 1/2th of their **Maximum Ki Points**, the **DM** may roll a 1d4. If the chosen number would be one that you picked, you gain one of the following options:\n\n- **Temporary Hit Points** 5 x your **Ki Rank**\n- **Temporary Ki Points** 10 x your **Ki Rank**\n- **Temporary Stamina Points** Your **Ki Rank**"
  },
  "powerLevel": null,
  "ac": null,
  "acNote": "",
  "hp": null,
  "hpDice": "",
  "ki": null,
  "stamina": null,
  "breatherPool": null,
  "speed": "",
  "kiRank": null,
  "antagonistLevel": null,
  "prof": null,
  "senses": "",
  "languages": "",
  "id": "ant_21st_world_martial_arts_tournament_world_martial_arts_tournament"
 },
 {
  "name": "Cell Games Arena",
  "meta": "Gargantuan Structure",
  "wide": true,
  "era": "Dragon Ball Z",
  "saga": "Android Saga",
  "tier": "Combat Zone",
  "group": "Cell Games Arena",
  "stats": null,
  "traits": [],
  "sections": {
   "Rules": "- One creature of Perfect Cell's choice that is standing on the Cell Games Arena is now considered *Cell's Opponent*.\n- While *Cell's Opponent* is in the Cell Games Arena, they double their **Maximum Resources** until they forfeit, are eliminated or are kiled..\n- If Cell or Cell's Opponent would be *Launched* to the edge of the Cell Games Arena, they must make a **DC** 20 *Dexterity Saving Throw*, on a failure they are eliminated. Eliminating Cell this way deactivates the effects of the Cell Games Arena and its Destroyed Effect.\n- All creatures within the Cell Games Arena cannot willingly leave the arena. The only way to leave the Cell Games Arena is to defeat Perfect Cell, announce that they Forfeit, or if they would be *Launched* outside the Arena.\n- For the duration that the Cell Games Arena is not destroyed, Cell halves the **Ki Cost** of all **Techniques** and halves the **Stamina Cost** of all **Snap Decision.**\n- Creatures that are not Perfect Cell nor *Cell's Opponent* cannot enter the arena by any means necessary. Any attempts to teleport them will force them to appear 5 feet outside the Cell Games Arena. Additionally they cannot damage the Cell Games Arena unless there is no *Cell's Opponent*",
   "Destroyed": "If the Cell Games Arena would be destroyed as a result of *Cell's Opponent* or Perfect Cell's **Phase Change**, all previous rules no longer are active but Perfect Cell gains the *Boosted (Spirit) Condition* for the duration of Combat."
  },
  "powerLevel": null,
  "ac": 21,
  "acNote": "",
  "hp": 300,
  "hpDice": "30d8+150",
  "ki": null,
  "stamina": null,
  "breatherPool": null,
  "speed": "",
  "kiRank": null,
  "antagonistLevel": null,
  "prof": null,
  "senses": "",
  "languages": "",
  "damageThreshold": "25",
  "id": "ant_android_saga_cell_games_arena"
 }
];

// Trait catalogs Guided Creation auto-applies by archetype/species.
export const ANTAGONIST_TRAITS = {
 "universal": [
  {
   "name": "Clawed Hands",
   "text": "When the Antagonist would cast an *Unarmed Technique*, it may change the damage type to *Slashing Damage.*"
  },
  {
   "name": "Critical Rage",
   "text": "When the Antagonist would be **Critical**, it gains the *Enraged Condition.*"
  },
  {
   "name": "Dexterous Combat",
   "text": "The Antagonist can use their **Dexterity Ability Score** for their **Unarmed Technique Casting Ability Modifier**"
  },
  {
   "name": "Dextrous Techniques",
   "text": "The Antagonist can use their **Dexterity Ability Score** for one of their **Ki Technique's Casting Ability Modifier.**"
  },
  {
   "name": "Dexterous Weaponry",
   "text": "The Antagonist can use their **Dexterity Ability Score** for their **Armed Technique Casting Ability Modifier.**"
  },
  {
   "name": "Inherent Power (Ki Rank 1)",
   "text": "The Antagonist gains 1 rank of *Weighted (Light)*"
  },
  {
   "name": "Inherent Power (Ki Rank 2)",
   "text": "The Antagonist gains 2 rank of *Weighted (Light)*"
  },
  {
   "name": "Inherent Power (Ki Rank 3)",
   "text": "The Antagonist gains 3 ranks of *Weighted (Light)*"
  },
  {
   "name": "Inherent Power (Ki Rank 4)",
   "text": "The Antagonist gains 4 rank of *Weighted (Light)*"
  },
  {
   "name": "Inherent Power (Ki Rank 5)",
   "text": "The Antagonist gains 5 rank of *Weighted (Light)*"
  },
  {
   "name": "Intellectual Combat",
   "text": "The Antagonist can use their **Intelligence Ability Score** for their **Unarmed Technique Casting Ability Modifier**"
  },
  {
   "name": "Intellectual Techniques",
   "text": "The Antagonist can use their **Intelligence Ability Score** for one of their **Ki Technique's Casting Ability Modifier.**"
  },
  {
   "name": "Intellectual Weaponry",
   "text": "The Antagonist can use their **Intelligence Ability Score** for their **Armed Technique Casting Ability Modifier.**"
  },
  {
   "name": "Internal Combat",
   "text": "The Antagonist can use their **Constitution Ability Score** for their **Unarmed Technique Casting Ability Modifier**"
  },
  {
   "name": "Interal Techniques",
   "text": "The Antagonist can use their **Constitution Ability Score** for one of their **Ki Technique's Casting Ability Modifier.**"
  },
  {
   "name": "Internal Weaponry",
   "text": "The Antagonist can use their **Constitution Ability Score** for their **Armed Technique Casting Ability Modifier.**"
  },
  {
   "name": "Lasting Rage",
   "text": "The *Enraged Condition* last a number of additional rounds equal to the creature's **Ki Rank**"
  },
  {
   "name": "Ki-Inexperienced",
   "text": "The Antagonist cannot take the *Gather Ki Action*."
  },
  {
   "name": "Magic Combat",
   "text": "The Antagonist can use their **Charisma Ability Score** for their **Unarmed Technique Casting Ability Modifier**"
  },
  {
   "name": "Magical Techniques",
   "text": "The Antagonist can use their **Charisma Ability Score** for one of their **Ki Technique's Casting Ability Modifier.**"
  },
  {
   "name": "Magic Weaponry",
   "text": "The Antagonist can use their **Charisma Ability Score** for their **Armed Technique Casting Ability Modifier.**"
  },
  {
   "name": "Pack Tactics",
   "text": "The Antagonist has *advantage* on an *attack roll* against a creature if at least one of its allies is within 5 feet of the creature and the ally isn't *incapacitated*."
  },
  {
   "name": "Pointed Hands",
   "text": "When the Antagonist would cast an *Unarmed Technique*, it may change the damage type to *Piercing Damage.*"
  },
  {
   "name": "Powerful Size (Ki Rank 1)",
   "text": "The Antagonist has 1 Rank of *Gigantification*"
  },
  {
   "name": "Powerful Size (Ki Rank 2)",
   "text": "The Antagonist has 2 Ranks of *Gigantification*"
  },
  {
   "name": "Powerful Size (Ki Rank 3)",
   "text": "The Antagonist has 3 Ranks of *Gigantification*"
  },
  {
   "name": "Powerful Size (Ki Rank 4)",
   "text": "The Antagonist has 4 Ranks of *Gigantification*"
  },
  {
   "name": "Powerful Size (Ki Rank 5)",
   "text": "The Antagonist has 5 Rank of *Gigantification*"
  },
  {
   "name": "Spiritual Combat",
   "text": "The Antagonist can use their **Wisdom Ability Score** for their **Unarmed Technique Casting Ability Modifier**"
  },
  {
   "name": "Spiritual Techniques",
   "text": "The Antagonist can use their **Wisdom Ability Score** for one of their **Ki Technique's Casting Ability Modifier.**"
  },
  {
   "name": "Spiritual Weaponry",
   "text": "The Antagonist can use their **Wisdom Ability Score** for their **Armed Technique Casting Ability Modifier.**"
  }
 ],
 "archetype": {
  "Brawler": [
   {
    "name": "Toughened Exterior",
    "text": "The Antagonist gains 2 points of damage reduction"
   },
   {
    "name": "Iron Strikes",
    "text": "The Antagonist's **Unarmed Strike** deals an additional damage equal to half of the **Strength** or **Dexterity Ability Modifier**. Additioanlly, all **Unarmed Techniques** have their damage increases by the chosen **Ability Modifier**"
   },
   {
    "name": "Lightning Strikes",
    "text": "When the Antagonist would hit with an *Unarmed Strike*, they may cast an **Unarmed Technique** as a Bonus Action. Casting a Technique this way increases the Technique’s Casting Cost by half of its Casting Cost."
   },
   {
    "name": "Steel Punches",
    "text": "When the Antagonist would hit a creature with an *Unarmed Strike*, they must make a *Constitution Saving Throw* against their **Unarmed Save DC**, on a failure, they reduce their **AC** & *Saving Throws* by 1 until the start of the creature’s next turn. This Feature cannot stack with each other."
   }
  ],
  "Caster": [
   {
    "name": "Clash Master",
    "text": "When the Antagonist would take the *Energy Clash* **Snap Decision**, the Antagonist gains an additional +1 *Static Bonus* to the *Contested Attack Rolls.*"
   },
   {
    "name": "Ki Enriched",
    "text": "When the Antagonist would deal damage with their *Ki Blast*, you gain an amount of 5 times their **Ki Rank**"
   },
   {
    "name": "Mighty Charge",
    "text": "When the Antagonist would *Charge* their **Ki Technique**, they may expend double the **Ki Cost** to treat their **Technique** as if they had *Charged* it an additional time"
   },
   {
    "name": "Piercing Energy",
    "text": "When you would hit an Antagonist with a **Ki Technique**, you ignore 2 points of damage reduction"
   },
   {
    "name": "Spiritual Weight",
    "text": "Once per turn, when an Antagonist would fail a *Dexterity Saving Throw* from a **Ki Technique**, they gain 1 rank of *Weighted (Heavy)* until the end of their next turn. Creatures affected this way cannot gain more ranks than half of the creature's **Ki Rank**."
   }
  ],
  "Mage": [
   {
    "name": "Elemental Master",
    "text": "When the Antagonist would deal damage with a **Technique** or **Spell**, the creature may change the damage type to *Acid*, *Cold*, *Fire* *Lightning* or *Poison.*"
   },
   {
    "name": "Depth of Metamagic",
    "text": "The Antagonist gains one *Metamgic* and they gain *Sorcery Points* equal to their *Proficiency Bonus*. If they have the *Metamagic* **Heroic Feat**, then these benefits stack."
   },
   {
    "name": "Magic Over Ki",
    "text": "When an Antagonist would attempt to use *Ki Sense Action* to attempt to sense them, they may expend a **Spell Slot** to treat themselves as immune to the *Ki Sense Action*"
   },
   {
    "name": "Professor of Magic",
    "text": "The Antagonist may choose an amount of *School of Magic* equal to half of their **Ki Rank**. The first **Spell** from that *School of Magic*  that the Antagonist would cast in that encounter that is no higher than their **Ki Rank** does not expend a **Spell Slot**."
   },
   {
    "name": "Spell Siphon",
    "text": "The Antagonist may target a creature that can cast **Spells**, the targeted creature must make a *Charisma Saving Throw* against the creature's **Spell Save DC**. On a failure, the creature loses 1 **Spell Slot** from a **Spell Level** equal to the Antagonist's **Ki Rank** and they gain the expended **Spell Slot.**"
   }
  ],
  "Ranger": [
   {
    "name": "Hunter's Instinct",
    "text": "The Antagonist may choose a number of creatures equal to their **Ki Rank**, they gain a +1 *Static Bonus* against all chosen creature"
   },
   {
    "name": "Longshot",
    "text": "All **Ki Techniques** and **Shot Techniques** that have a *Range* that is not *Melee* has their *Range* increased by 50%"
   },
   {
    "name": "Relocation Expert",
    "text": "After casting a **Ki Technique**, **Shot Technique** or *Ranged Weapon Attack*, the Antagonist can move up to half of its speed without provoking opportunity attacks"
   },
   {
    "name": "Still Shot",
    "text": "The Antagonist may expend their *Movement Speed* to gain the following benefits: Increase their *Critical Hit Threshold* by 1 and increase the damage die step by 1."
   },
   {
    "name": "Target Acquired",
    "text": "At the start of its turn, the Antagonist can choose one creature it can see within combat, that creature is now marked. A Marked Creature cannot benefit from *Half Cover* against the creature."
   }
  ],
  "Striker": [
   {
    "name": "Combo Fighter",
    "text": "Once per turn, after the Antagonist hits with an *Unarmed Strike* or *Weapon Attack*, the next **Strike Technique** it uses before the end of its turn is increased by an additional damage die step."
   },
   {
    "name": "Crushing Blow",
    "text": "When the Antagonist would cast a **Strike Technique**, it may use its Bonus Action to increase the *Critical Hit Threshold* by their **Ki Rank.**"
   },
   {
    "name": "Pressure Fighter",
    "text": "When the creature would take an *Opportunity Attack*, they may also move up to their *Movement Speed*."
   },
   {
    "name": "Relentless Assault",
    "text": "Whenever this Antagonist hits with a *Melee Attack* or **Armed/Unarmed Techniquee**, its movement doesn't provoke attacks of opportunity"
   },
   {
    "name": "Rising Pressure",
    "text": "Whenever this Antagonist lands a successful hit, they gain a +1 *Static Bonus* against the triggering creature for the next minute. This **Trait** may stack a maximum number of times equal to the creature's **Ki Rank.**"
   }
  ]
 },
 "species": {
  "Acorsian": [
   {
    "name": "Cold Tribe",
    "text": "The Antagonist always has the *Power Regression* **Form** active"
   },
   {
    "name": "Hero Tribe",
    "text": "All *Metamorphosis* **Form Family** have their **Ki Cost** reduced by half."
   },
   {
    "name": "Prodigal Species",
    "text": "**Techniques** have their **Ki Cost** reduced by an amount** equal to the **Technique's Ki Rank**"
   },
   {
    "name": "Space Survivor",
    "text": "The Antagonist does not require air and are immune to the effects of the vacuum of space."
   },
   {
    "name": "Tyrannical Presence",
    "text": "Hostile creatures within a 10  feet times the creature's **Ki Rank** *Emanation* have *Disadvantage* on *Saving Throw* against becoming Frightened."
   }
  ],
  "Android": [
   {
    "name": "Boosted Core",
    "text": "The Antagonist always has 1 variation of the *Boosted Condition.* The creature may change which variation at the end of a Long Rest"
   },
   {
    "name": "Combat Programming",
    "text": "The Antagonist does not roll *Disadvantage* on *Initiatve* even if it would be *Surpried*"
   },
   {
    "name": "High-Tech Power",
    "text": "The Antagonist does not have to make *Berserk"
   },
   {
    "name": "Leech Cuffs",
    "text": "When the Antagonist would take the *Push Back* **Snap Decision**, any damage that was reduced is converted into their **Current Ki Points**. This cannot raise them above their **Maximum Ki Points**. Alternatively, anytime it has a creature *Grappled*, they may expend their Bonus Action to steal 2d6 **Current Ki Points** from the *Grappled* target. Should a target start their turn *Grappled* by them, they loses an amount of **Current Ki Points** equal to 2d8 and they gain the result into their **Current Ki Points**. This cannot raise them above their **Maximum Ki Points**."
   },
   {
    "name": "Robotic Body",
    "text": "They cannot take the Gather Ki Action, a Technique, or an Item. Instead at the start of their turn, they gain (2 times their **Antagonist Level**) + (3 times their **Current Power Bonus**) **Ki Points**. They also cannot be found through the *Sense Energy* option of the *Ki Sense* **Heroic Feat**. Additionally, it counts as an Android for the purpose of the **High-Tech Parts Advanced Upgrade**."
   }
  ],
  "Beastman": [
   {
    "name": "Bestial Characteristics",
    "text": "The Antagonist gains a number of **Bestial Characteristic** equal their **Ki Rank**"
   },
   {
    "name": "Primitive Endurance",
    "text": "At the start of the Antagonist's turn, so long as they have at least 1 **Ki Point**, they gain an amount of **Temporary Stamina Points** equal to double the creature's **Ki Rank**"
   },
   {
    "name": "Swift Beast",
    "text": "The Antagonist has advantage on *Dexterity Saving Throw* and the Antagonist increases their *Movement Speed* By 15 feet."
   },
   {
    "name": "Wild Pursuit",
    "text": "When a Antagonist would leave their range, the Antagonist gains additional 10 feet until the end of its nex tturn if it moves towards that creature."
   }
  ],
  "Celestial Primate": [
   {
    "name": "Nimble Movement",
    "text": "The Antagonist has advantage on *Saving Throws* against being *Grappled* and the *Restrained Conition*"
   },
   {
    "name": "Heavenly Agility",
    "text": "The Antagonist ignores *Difficult Terrain* and all opportunity attacks against the Antagonist are made at disadvantage"
   },
   {
    "name": "Playful Combatant",
    "text": "When the Antagonist would miss an attack, it may immediately move up to half of their *Movement Speed* without provoking *Opportunity Attacks.*"
   },
   {
    "name": "Primate Sub-Species",
    "text": "The Antagonist has one *Sub-Species* from the *Primate Sub-Species* **Species Feature**"
   },
   {
    "name": "Spiritual Understanding",
    "text": "When a *Spirit Control* **Trained Feature** would require expending **Stamina**, the Antagonist is refunded 1."
   }
  ],
  "Cerealian": [
   {
    "name": "Critical Strike",
    "text": "When the Antagonist would score a *Critical Hit*, they deal additioanl damage equal to the **Ability Score Modifier** used for the *Attack Roll*"
   },
   {
    "name": "Exploit Weakness",
    "text": "Whenever the Antagonist damages a creature that is *Bloodied*, it ignores *Resistance* to that attack's damage type"
   },
   {
    "name": "Keen Observation",
    "text": "The Antagonist has advantage on Investigation and Perception Checks"
   },
   {
    "name": "Perfect Trajectory",
    "text": "**Ki Techniques**, *Ranged Attacks* & **Shot Techniques** ignore nonmagical environmental penalties (Fog, rain, darkness, etc.)"
   },
   {
    "name": "Vital Point Analysis",
    "text": "Once on each of their turn, when this Antagonist would hit a creature with a *Melee Attack*, it may increase its damage dealt by their *Proficiency Bonus*. If it would hit a creature with an **Unarmed Technique**, they instead increase the damage dealt by double their *Proficiency Bonus*"
   }
  ],
  "Chronin": [
   {
    "name": "Adaptive Mindset",
    "text": "When a creature would miss an attack against the Antagonist, the Antagonist gains a +1 *Static Bonus* to their **AC** and *Saving Throw*"
   },
   {
    "name": "Chronal Knowledge",
    "text": "All *Time Skip* **Techniques** have their **Casting Cost** reduced by the Antagonist's **Ki Rank**"
   },
   {
    "name": "Learning Fighter",
    "text": "Whenever the Antagonist would take damage from a **Technique** that would force them to make a *Saving Throw*, they gain a +1 *Static Bonus* to *Saving Throws* made against that **Technique** until the end of combat, to a maximum equal to the Antagonist's **Ki Rank**"
   },
   {
    "name": "Pressure Lock",
    "text": "Once per round, when this Antagonist would deal damage with an *Unarmed Strike* or **Unarmed Technique**, the targeted creature must make a *Constitution Saving Throw* against their **Unarmed Save DC**. On a failure, they gain the *Dazed Condition* until the end of their next turn."
   },
   {
    "name": "Killing Intent",
    "text": "Whenever this Antagonist would deal damage to a *Bloodied* or *Critical* creature, they increase the damage dealt by the **Antagonist's Level**"
   }
  ],
  "Demon Realm Denizen": [
   {
    "name": "Abyssal Resilience",
    "text": "The Antagonist has advantage on *Death Saving Throws* and *Constitution Saving Throws*"
   },
   {
    "name": "Corrupted Spirit",
    "text": "This Antagonist has advantage on *Saving Throws* on being *Charmed* or being *Possessed* (Dominate Person, Parasitic Fusion, etc.)"
   },
   {
    "name": "Dark Invocation",
    "text": "Once per turn, when this Antagonist would cast a **Spell**, they gain +2 **AC** until the start of their next turn"
   },
   {
    "name": "Esoteric Masters",
    "text": "This Antagonist may choose a number of Esoteric Art equal to half of their **Ki Rank**, rounded up"
   },
   {
    "name": "Holy Nature",
    "text": "Whenever this Antagonist deals damage with a **Ki Technique**, it may change the damage type to *Necrotic* or *Radiant Damage.* Additionally, the targetted creature must make a *Constitution Saving Throw* against the trigerring **Technique Type**, on a failure, they gain an *Elemetanl Affliction* associated with the *Damage Type*"
   }
  ],
  "Galactic Citizen": [
   {
    "name": "Indomitable Will",
    "text": "Once per long rest, when they would drop to 0 **Hit Points** but are not killed outright, they may regain a number of **Hit Points** equal to double their **Character Level**"
   },
   {
    "name": "Kinship Trust",
    "text": "The Antagonist and all creatures within a 10 feet time **Ki Rank** *Emanation* gains a bonus to their *Initiative Rolls* equal to their **Ki Rank**"
   },
   {
    "name": "Master of Class",
    "text": "The Antagonist has one **Class** of the DM's chocie and are treated as if they have as many levels equal to their **Antagonist Level**"
   },
   {
    "name": "Strange Quirk",
    "text": "The Antagonist gains two options from the *Strange Quirks* **Species Features**"
   },
   {
    "name": "Team Fighter",
    "text": "When the Antagonist would have at least one allied creature within a 10 feet from them, they gain a bonus to their attack rolls and **Save DC's** equal to half of their **Ki Rank**"
   }
  ],
  "Grey": [
   {
    "name": "Breakable Defense",
    "text": "When the Antagonist would deal damage to a creature with *Damage Reduction*, the *Damage Reduction* is reduced by half"
   },
   {
    "name": "Disciplined Mind",
    "text": "This Antagonist has advantage on *Constitution Saving Throws* made to *Concentrate* on **Techniques** and **Spells**"
   },
   {
    "name": "Flaming Fists",
    "text": "This Antagonist can change their **Unarmed Technique's** *Damage Type* to *Fire Damage* and they reduce the **Ki Cost** of their **Unarmed Technique** by their **Ki Rank**."
   },
   {
    "name": "Overwhelming Aura",
    "text": "All Hostile Creatures that would begin their turn within 10 feet from the Antagonist reduce their **Power Bonus** by 1. This can not lower the creature's **Power Bonus** below 0."
   },
   {
    "name": "Pressure Wave",
    "text": "Whenever this Antagonist would score a *Critical Hit* on an **Unarmed Technique**, all creatures within a 10 feet from the triggering creature excluding the Antagonist must make a *Strength Saving Throw* or be *Launched* 10 feet away."
   }
  ],
  "Majin": [
   {
    "name": "Bouncing Body",
    "text": "Whenever the Antagonist is *Launched*, knocked *Prone* or moved forcefully, it may immediately move up to half of their *Movement Speed* after the effects resolve"
   },
   {
    "name": "Flexible Body",
    "text": "The Antagonist gains additional *Melee Reach* equal to 5 feet times their **Ki Rank**"
   },
   {
    "name": "Majin Regeneration",
    "text": "The Antagonist has access to a pool of **Hit Points** equal to their **Maximum Ki Points.** As an Action on their turn, they may expend any number of **Hit Points** from this pool to regain that many. This can not raise them above their **Hit Point Maximum**. The pool refreshes on a Long Rest. Additionally whenever they would drop to 0 **Hit Points** but aren’t killed outright, they may use their Reaction to begin spending **Ki Points** equal to the amount of Damage that would put them below 1. This effect leaves them with 1 **Hit Point.**"
   },
   {
    "name": "Magical Nature",
    "text": "The Antagonist gains advantage on all *Intelligence, Charisma,* and  *Wisdom Saving Throws* made against spells."
   },
   {
    "name": "Powerful Defense",
    "text": "When a creature would hit this Antagonist with a *Critical Hit*, the Antagonist gains additional *Damage Reduction* equal to their *Proficiency Bonus*"
   }
  ],
  "Namekian": [
   {
    "name": "Flexible Body",
    "text": "The Antagonist gains additional *Melee Reach* equal to 5 feet times their **Ki Rank**"
   },
   {
    "name": "Guardian's Resolve",
    "text": "When the Antagonist would take the *Interception (Ally) or Interception (Enemy)* **Snap Decision**, they gain **Temporary Hit Points** equal to their *Proficiency Bonus*."
   },
   {
    "name": "Ki Sage",
    "text": "When the *Antagonist* would *Charge* a **Technique**, they regain an amount of **Ki Points** equal to their **Ki Rank** for each time they would *Charge* the **Technique**"
   },
   {
    "name": "Namekian Tribe",
    "text": "The Antagonist has one *Sub-Species* from the *Namekian Sub-Species* **Species Feature**"
   },
   {
    "name": "Powerful Hearing",
    "text": "The Antagonist gains advantage on all *Perception Checks* made with hearing. Additionally, creatures that would attempt to take the *Hide Action* do so at advantage"
   }
  ],
  "Neko Majin": [
   {
    "name": "Agile Movement",
    "text": "Standing from *Prone* cost no *Movement*, additionally, the creature takes no damage from *falling* or being *Launched* shorter than 30 feet"
   },
   {
    "name": "Easily Distracted",
    "text": "Whenever a creature would roll a Natural 1 on an attack roll against the Antagonist, they gain advantage on their next attack roll before the end of their next turn"
   },
   {
    "name": "Lightning Crawl",
    "text": "The Antagonists ignores *Difficult Terrain* and cannot have their *Movement Reduced* by **Techniques** or **Spells**"
   },
   {
    "name": "Mystical Mimicry",
    "text": "As a reaction to when the Antagonist would see a creature take the *Ascend, Awaken*, or *Ramp Up Action*, they may temporarily gain that **Form** and the **Form Modification** that they are currently benefiting from"
   },
   {
    "name": "Playful Spirit",
    "text": "The creature has advantage on *Saving Throws* against being *Frightened*"
   }
  ],
  "Neo Machine Mutant": [
   {
    "name": "Assimilation Protocol",
    "text": "Whenever this Antagonist would reduce a creature to 0 **Hit Points**, it gains an amount of **Ki Points** equal to 10 times their **Ki Rank**"
   },
   {
    "name": "Eclisping Biology",
    "text": "This Antagonist may choose the *Parasitic Fusion* or *Symbiotic Fusion* *Fusion Method*"
   },
   {
    "name": "Liquification",
    "text": "As an action or bonus action, the Antagonist may transform to a *Blob* and gain the following: They gains resistance to all *Damage Types* except for *Destruction* or *Psychic* Damage, slip through cracks as small as one inch wide, and advantage on *Stealth Checks*. Additionally while they are benefitnig from this, they cannot take the *Ki Blast Action* or cast **Techniques**"
   },
   {
    "name": "Parasitic Seed",
    "text": "Once per combat, when this creature would damage a *Critical* creature, it may implant a parasite. For the duration, whenever the benefiting creature would regain **Hit Points** or **Ki Points**, the Antagonist gains the same amount of points they would gain"
   },
   {
    "name": "Techno-Organic Body",
    "text": "This Antagonist cannot have their **Current Ki Points** reduced by any means necessary"
   }
  ],
  "Sateery": [
   {
    "name": "Arcane Vessel",
    "text": "Whenever this Antagonist would cast a **Spell**, they regain 10 **Ki Points**"
   },
   {
    "name": "Magical Dominance",
    "text": "When a creature would attempt to take a **Snap Decision** against the Antagonist's **Spell** that would reduce the damage dealt, the Antagonist may spend 2 **Stamina** to have the amount of damage reduced by half. This counts as a **Snap Decision** for the purpose of **Features** and **Rules Interaction**."
   },
   {
    "name": "Mystic Constitution",
    "text": "An amount of times per Long Rest, when the Antagonist would fail a *Constitution Saving Throw* when maintaing *Concentration*, they may choose to instead automatically suceed."
   },
   {
    "name": "Soul Leech",
    "text": "At the start of their turn, when the Antagonist would be *Grappling* a creature, the *Grappled Creature* reduces their **Hit Points** by the Antagonist's *Unarmed Damage Die* and they regain a number of **Hit Points** equal to double the result."
   },
   {
    "name": "Mystic Barrier",
    "text": "The first time that the Antagonist would take damage from a **Spell** each round, they reduce the damage by half"
   }
  ],
  "Saiyan": [
   {
    "name": "Oozaru Empowerement",
    "text": "When the creature would have a **Form** from the *Oozaru Family* active and would gain the *Enraged Condition*, they gain an additional +2 **Power Bonus** and increase all *Movement Speed* by 10 feet."
   },
   {
    "name": "Saiyan Pride",
    "text": "The creature's *Initiative Bonus* is increased by half of their *Proficiency Bonus.*"
   },
   {
    "name": "Saiyan Rage",
    "text": "When the creature would activate a **Form** that's from the **Saiyan Biology Form**, they gain the *Enraged Condition* for a number of rounds equal to double their **Ki Rank.**"
   },
   {
    "name": "Saiyan Sub-Species",
    "text": "The Antagonist has one *Sub-Species* from the *Saiyan Sub-Species* **Species Feature**"
   },
   {
    "name": "Overpowering Spirit",
    "text": "When a *Super Saiyan* **Form Family** would be active, they may increase their **Technique's** damage by their *Proficiency Bonus*"
   }
  ],
  "Xeno": [
   {
    "name": "Alien Characteristics",
    "text": "The Antagonist may choose two option from the *Alien Characteristic* **Species Feature**"
   },
   {
    "name": "Flexible Evolution",
    "text": "When this creature would succeed on a *Saving Throw* they gain a bonus to their *Saving Throws* by 1 for the duration of Combat. This **Trait** stacks a maximum amount of times equal to their **Ki Rank**"
   },
   {
    "name": "Evolutionary Defenses",
    "text": "Once per Combat, after taking damage, the Antagonist gains resistance to that damage type until the start of its next turn"
   },
   {
    "name": "Driving Instincts",
    "text": "The first time this Antagonist would be **Bloodied** each combat, it gains a +1 **Static Power Bonus** and increase all available *Movement Speed* by 15 feet until combat ends."
   },
   {
    "name": "Untraceable Energy",
    "text": "Whenever a creature would attempt to locate the Antagonist using the *Ki Sense* **Heroic Feat**, they have *Disadvantage*"
   }
  ],
  "Yardratian": [
   {
    "name": "Calm Mind",
    "text": "When the Antagonist would make a *Saving Throw* to avoid being charmed or frightened by a magical effect, they gain advantage"
   },
   {
    "name": "Gentle Spirit",
    "text": "When the Antagonist would be forced make a *Saving Throw* to maintain *Concentration*, it may use their **Wisdom Ability Modifier** instead of their **Constitution Ability Modifier**"
   },
   {
    "name": "Ki Anchor",
    "text": "The Antagonist cannot be unwillingly teleported or banished unless it chooses to be"
   },
   {
    "name": "Refined Ki",
    "text": "Whenever this Antagonist would regain **Ki Points**, it regains an additional amount equal to their *Proficiency BOnus*"
   },
   {
    "name": "Spiritual Master",
    "text": "All *Spirit Control* with an Action Economy have theirs reduced by 1 step (Full Turn -> Action -> Bonus Action)"
   }
  ],
  "Zoolatar": [
   {
    "name": "Apex Physiology",
    "text": "The Antagonist has advantage on *Strength* and *Dexterity Saving Throws* against **Spells** and **Techniques**"
   },
   {
    "name": "Nine Lives",
    "text": "The Antagonist may add half of their *Proficiency Bonus*, rounded up, to a *Saving Throw* that they already have *Proficiency* in."
   },
   {
    "name": "Peerless Predator",
    "text": "The Antagonist's Attack rolls now scores a *Critical Hit* on a 19-20"
   },
   {
    "name": "Primitive Anger",
    "text": "When the Antagonist would gain the *Enraged Condition*, the duration of the *Condtiion* now lasts for 1 minute"
   },
   {
    "name": "Predatory Combat",
    "text": "If the Antagonist would take the *Attack Action* or cast a **Spell** or **Technique** that deals damage before doing anything else on their turn, they gain an amount of **Stable Power** equal to half of their **Ki Rank**, rounded up"
   }
  ]
 }
};
