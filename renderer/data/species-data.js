// Species & Heritages — book data (5.0 Ch.3, pp. 31–88). Generated from the
// 5.0 Beta PDF; edit entries in-app through the Encyclopedia overrides.
// featureDetails / subSpeciesDetails carry the rules text; features and
// subSpecies keep the name lists the rest of the app reads.
export const SPECIES_DATA = [
 {
  "id": "sp_beastmen",
  "name": "Beastmen",
  "category": "Mortal",
  "complete": true,
  "page": 33,
  "description": "Humanoid animals created by a shapeshifting drug, keeping bestial features and instincts.",
  "abilityScoreIncrease": "Increase all Ability Scores by 1 OR increase 2 by 1 and choose a Feat",
  "speed": "35 ft walk",
  "languages": "Common and 1 other Language of your choice",
  "skills": "Nature and Survival Skills",
  "grantedSkills": [
   "Nature",
   "Survival"
  ],
  "skillChoice": null,
  "features": [
   "Animal Sub-Species",
   "Bestial Characteristics",
   "Know-How",
   "More “Beast” than “Man”",
   "Primal Energy"
  ],
  "subSpecies": [
   "Aquatic",
   "Avian",
   "Insect",
   "Mammal",
   "Reptile"
  ],
  "lore": {
   "physical": "Humanoid animals, ranging in height similar to Earthlings. Due to the nature of their initial transformation from standard Earthlings, most Beastmen have animal features from desirable beasts such as Bears, Sharks, or Buffalo though Beastmen of all shapes exist.",
   "history": "A company known as “Magical Pharmaceuticals” produced a drug known as Animorphaline that caused temporary shapeshifting into a humanoid beast form.\nDuring the production of this drug a knock-off was released and sold as the original product that forced permanant transformation into this form.",
   "society": "After the incident many Earthlings and other humanoid species became these Beastmen and have since reintegrated into society, raising families and continuing their lives."
  },
  "featureDetails": [
   {
    "name": "Animal Sub-Species",
    "text": "Your animal nature shows itself in a variety of ways.\nYou must choose your Sub-Species from the following list, detailed at the end of this Species:\nAquatic\nAvian\nInsect\nMammal\nReptile"
   },
   {
    "name": "Bestial Characteristics",
    "text": "Prerequisite: Animal Sub-Species Species Feature\nYou possess natural strengths that are not commonplace among other humanoids. Choose two options from the Bestial Characteristcs List listed at the end of this Species, these can not be changed later.",
    "options": [
     {
      "name": "Burrowing",
      "group": "General Bestial Characteristics",
      "text": "You are capable of tearing through the ground to traverse. You gain a 30 foot Burrow Speed."
     },
     {
      "name": "Carapace",
      "group": "General Bestial Characteristics",
      "text": "You possess natural armor made of chitin, keratin, or other natural building blocks. You gain a bonus to AC equal to your Ki Rank."
     },
     {
      "name": "Climbing Expert",
      "group": "General Bestial Characteristics",
      "text": "You have a Climbing Speed of 30 feet, allowing you to scale vertical surfaces and cling to walls without needing to make an Ability Check. This Climbing Speed functions similarly to your Walking Speed and can be used to traverse surfaces or obstacles."
     },
     {
      "name": "Darkvision",
      "group": "General Bestial Characteristics",
      "text": "Your eyes are specialized for sight in low light conditions. You gain Darkvision in a range of 60 feet."
     },
     {
      "name": "Echolocation",
      "group": "General Bestial Characteristics",
      "text": "You are capable of sending out sharp clicks into your surroundings. As a Bonus Action on your turn you may chirp, granting you Blindsight in a range of 30 feet until the end of your next turn."
     },
     {
      "name": "Enhanced Physicallity",
      "group": "General Bestial Characteristics",
      "text": "Your animal muscularity helps you with physical acts.\nYou gain Proficiency in your choice of Acrobatics or Athletics, if you already have Proficiency in the chosen Skill you gain Expertise in it."
     },
     {
      "name": "Magnetic Navigation",
      "group": "General Bestial Characteristics",
      "text": "You can sense the planet’s magnetic fields, aiding in long-distance navigation. So long as you are on a Planet, you have Advantage on Survival Checks to find your way over vast distances and in unfamiliar terrain, such as tracking or orienting yourself in a large, unexplored area."
     },
     {
      "name": "Mighty Beast",
      "group": "General Bestial Characteristics",
      "text": "You are larger than your contemporaries. You are always under 1 Rank of Rescaled (Maxi)."
     },
     {
      "name": "Natural Weapons",
      "group": "General Bestial Characteristics",
      "text": "You possess sharp claws that can be used for combat.\nYou may replace the Damage Type of any Unarmed Strike or Unarmed Technique that you cast to Slashing Damage."
     },
     {
      "name": "Pack Tactics",
      "group": "General Bestial Characteristics",
      "text": "Once per round, when you would hit a creature within a Melee Weapon Attack or Unarmed Strike, an allied creature other than yourself within 30 feet gains a bonus to their next Attack Roll against that creature equal to half your Ki Rank, rounded up Pheromone Communication You can use chemical signals to communicate with others of your species. You can use this ability to coordinate complex actions like defense or finding food with any creature similar to your Sub-Species within 1 mile, provided they understand your chemical signals.\nThis communication can convey simple instructions or emotional states but cannot convey complex concepts."
     },
     {
      "name": "Prehensile Tail",
      "group": "General Bestial Characteristics",
      "text": "You possess a tail long enough to be wrapped around your waist. It cannot lift anything over 10 pounds, and is susceptible to pain. Additionally, you may wield a Light Weapon with it as if it were an additional Off-Hand."
     },
     {
      "name": "Sharp Vision",
      "group": "General Bestial Characteristics",
      "text": "You have Advantage on Wisdom (Perception) Checks that rely on sight. You can see clearly at long distances, granting you a range of vision up to twice the normal distance for spotting creatures or objects. You also have Advantage on Perception Checks to spot fine details or hidden features."
     },
     {
      "name": "Temperature Adaptation",
      "group": "General Bestial Characteristics",
      "text": "You are naturally adapted to hot climates. You have Resistance to Fire Damage and Advantage on any Saving Throw made to ignore the negative effects of extremely hot enviroments."
     },
     {
      "name": "Thick Hide",
      "group": "General Bestial Characteristics",
      "text": "Your covered in a dense layer of hair or insulating skin.\nYou have Resistance to Cold Damage and Advantage on any Saving Throw made to ignore the negative effects of extremely cold enviroments."
     },
     {
      "name": "Toe Pads",
      "group": "General Bestial Characteristics",
      "text": "You feet are tipped with pads that aid in traction control.\nSo long as you are not wearing shoes you have Advantage on Saving Throws against being knocked Prone. Additionally, you are not effected by the effects of Difficult Terrain while you are on the ground."
     },
     {
      "name": "Toxin Tolerance",
      "group": "General Bestial Characteristics",
      "text": "Your body is adept at fighting off poisons and toxins.\nYou gain Advantage on Saving Throws against effects that would deal Poison Damage or give you the Poisoned Condition. Additionally, you have Resistance against Poison Damage."
     },
     {
      "name": "Aquatic Hunter",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic or Reptile\nYou are a master of the water and the ability to go unnoticed while in it. Whenever you are in water or a similar liquid, you are considered Heavily Obscured."
     },
     {
      "name": "Bio-Electrical Charge",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic, Mammal, or Reptile\nYou possess a unique organ, or specialized fur, that creates an electrical current through contact. You may replace the Damage Type of any Melee Weapon, Unarmed Strike, Armed Technique or Unarmed Technique that you cast to Lightning Damage."
     },
     {
      "name": "Bio-Electrical Current",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic or Reptile\nYou possess a unique but weak organ that creates an electrical current to be used to empower your natural energies. You may replace the Damage Type of any Basic Ki Blast or Ki Technique that you cast to Lightning Damage."
     },
     {
      "name": "Bioluminescence",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic or Insect\nYou are capable of illuminating the surrounding area with your own light. As an Action or Bonus Action on your turn you make give off Bright Light for 10 feet and Dim Light for another 10 feet. This effect requires Concentration to maintain."
     },
     {
      "name": "Membranous Eyelid",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Mammal, or Reptile\nYou possess an additional, translucent eyelid that helps scatter bright lights and defend from debris. As a Bonus Action on your turn, you may end the Blinded Condition on yourself."
     },
     {
      "name": "Molt on command",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic, Avian or Reptile\nYou may shed your feathers, scale, or exoskeleton to heal yourself. As an Action on your turn you may roll any amount of Hit Die and regain that many Hit Points, this can not restore you above your Maximum Hit Points."
     },
     {
      "name": "Poison Barbs",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic, Insect, Mammal, or Reptile\nYou possess sharp spines or claws that can inject poison into your foes. You may replace the Damage Type of any Melee Weapon, Unarmed Strike, Armed Technique or Unarmed Technique that you cast to Poison Damage."
     },
     {
      "name": "Poison Bite",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Insect, or Reptile\nYou possess a sharp set of fangs capable of granting a debilitating toxin. As a Bonus Action on your turn you may bite a creature within your Unarmed Strike Range.\nMake an Unarmed Technique Attack Roll against the target, granting the Poisoned Condition for 1 minute on a hit. A Poisoned Creature may remake the Saving Throw at the end of their turn to end the effect early."
     },
     {
      "name": "Poison Sac",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic, Insect, Mammal, or Reptile\nYou possess a unique but weak organ that creates a thick poison to be used to kill your enemies. You may replace the Damage Type of any Basic Ki Blast or Ki Technique that you cast to Poison Damage."
     },
     {
      "name": "Powerful Leaps",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Avian, Insect, or Mammal\nYour legs are built for short-twitch movement which greatly increases your ability to jump. When you make a running long jump, you can cover a distance up to 10 times your Strength Score in feet. When you make a standing long jump, you can cover a distance up to 5 times your Strength Score in feet. Your high vertical leap allows you to jump a number of feet equal to 3 + your Strength Modifier."
     },
     {
      "name": "Regenerative Body",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic, Insect or Reptile\nYou are capable of detatching limbs on command. As an Action on your turn you may detatch 1 Limb of your choice to end a Grapple that is effecting you.\nAdditionally, you may expend 2 Stamina as an Action to regrow any singular lost Limb."
     },
     {
      "name": "Shifting Pigmentation",
      "group": "Limited Bestial Characteristics",
      "text": "Prerequisite: Aquatic or Reptile\nYou possess a natural ability to hide yourself. As an Action on your turn you may attempt to hide yourself with this ability. So long as you hold Concentration, you have Advantage on all Stealth Checks and your Passive Ki Stealth is considered 5 higher than it actually is."
     }
    ],
    "groups": {
     "General Bestial Characteristics": "The following Bestial Characteristics can be chosen regardless of what Animal Sub-Species you choose:",
     "Limited Bestial Characteristics": "The following Bestial Characteristics can only be chosen if your Animal Sub-Species matches one of the Sub-Species listed:"
    }
   },
   {
    "name": "Know-How",
    "text": "Due to the ever changing nature of your life, it has become easier to learn things as you go and make the best of every opportunity to do so.\nWhenever a Level-Up would not grant you a Technique, you gain one, and you gain an additional Technique every Level beyond 20. Additionally, you gain 1 additional Training Boon each time you have a Training Arc."
   },
   {
    "name": "More “Beast” than “Man”",
    "text": "You are closer to being a large animal than other intelligent species. Your Creature Type is replaced with Beast."
   },
   {
    "name": "Primal Energy",
    "text": "You are far more physically fit than most other humanoid species. At 1st Level and every time you Level-Up you gain +1 to your Maximum Stamina Points."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Aquatic",
    "text": "You possess a mucus lined skin or a covering of light scales that help you move smoothly in the water. You gain the following benefits:\nBorn to Swim. At 1st Level you gain the Nonterrestrial Fightning Style from the Warrior Class.\nSemi-Aquatic. You are capable of breathing underwater as well as in open air. Additionally, you may hold your breath for twice as long."
   },
   {
    "name": "Avian",
    "text": "You possess feathers, a beak, and even have arms that double as wings. You gain the following benefits:\nEcholalia. Your voicebox is made to be contorted for incredible effect. You gain a Static Bonus to Performance Checks that involve talking, singing, or impersonating another sound equal to your Ki Rank.\nWinged Form. Your arms function as wings. So long as you are not holding a Weapon in either hand you gain a Fly Speed equal to 15x your Ki Rank."
   },
   {
    "name": "Insect",
    "text": "Your biology is more simple than other beastmen, with a more resilient and disturbing form. You gain the following benefits:\nNuke Survivor. Insects are said to be so resilient that they are practically unkillable outside of natural means. A number of times per Long Rest equal to your Ki Rank you may choose to remain at 1 Hit Point whenever you would be reduced to zero Hit Points from taking Damage.\nMental Chronometry. You possess an incredible ability to react to stimuli and change your actions at the last second. If a creature would use their Reaction in response to you rolling an Attack Roll against them, you can use your Reaction to change the target of the initial Attack Roll to be another target within its range. The creature who triggers this effect still expends their Reaction."
   },
   {
    "name": "Mammal",
    "text": "Mammal-Type Beastmen tend to be the most commonly seen type of Beastmen, able to survive in many enviroments and possessing superior strength. You gain the following benefits:\nDread Hunter. Your animal instincts are geared toward finding prey and noticing threats. You gain a Static Bonus equal to your Ki Rank on any Skill Check to locate a creature that you have previously seen, or have identified via their energy signature.\nPolyphasic Sleep. Due to your animal instincts you find it almost impossible to sleep through the night, instead sleeping in sporadic naps that leave you minimally aware of their surroundings. You only need to sleep for 4 hours out of a Long Rest, leaving the other 4 hours for light activity. Additionally, you may make perception checks as if you were awake while you are Unconscious."
   },
   {
    "name": "Reptile",
    "text": "You are cold blooded and have scales that protects your vulnerable form. You gain the following benefits:\nLizard Brain. Your reptilian nature causes you to be impossible to sway through magical effects. You are Immune to any magical effect that would attempt to impart the Berserk, Charmed, or Frightened Condition.\nRegenerative Limbs. Whenever you would perform a Short Rest, you may maximize the result of any Hit Die that you expend to heal. Additionally if you suffer from a lost limb due to the Crippled Condition when you perform a Short or Long Rest, it is removed as your limb regenerates."
   }
  ]
 },
 {
  "id": "sp_celestial_primate",
  "name": "Celestial Primate",
  "category": "Mortal",
  "complete": true,
  "page": 37,
  "description": "Primates hatched from stone eggs with near-divine intellect, prehensile tails and feet, and long lifespans.",
  "abilityScoreIncrease": "Dexterity +2 or Strength +2, Wisdom +1",
  "speed": "30 ft walk, 30 ft climb",
  "languages": "Common and you gain the ability to comprehend and verbally communicate with beasts",
  "skills": "Acrobatics Skill and your choice of one of the following: Nature. You gain the Nature Skill. Survival. You gain the Survival Skill. Religion. You gain the Religion Skill",
  "grantedSkills": [
   "Acrobatics"
  ],
  "skillChoice": {
   "count": 1,
   "from": [
    "Nature",
    "Religion",
    "Survival"
   ]
  },
  "features": [
   "Long Living",
   "Extended Learning Curve",
   "Primate Body",
   "Primate Sub-Species",
   "Spiritual Cultivation"
  ],
  "subSpecies": [
   "Interlocked-Armed Gibbon",
   "Red Butted Baboon",
   "Six-Eared Macaque",
   "Wise Monkey"
  ],
  "lore": {
   "physical": "Falling into the standard body shapes of other humanoids, Celestial Primates are one of a small group of primates that are hatched from Stone Eggs and possess incredible abilities as well as mental acuity.\nDespite their advanced potential and intellect, they otherwise remain indistinguishable from other primates while standing with their traditional posture.",
   "history": "Long ago during the Era of Tang a small group of primates were hatched from stones that absorbed the light given off from another realm, this origin left them out of the sphere of influence of the divine. Stories have since spread of decendants and reincarnations throughout the ages.",
   "society": "The Celestial Primates once valued freedom above all else, before eventually falling to their own egos and joining the divine by some means or another. The time that they spend on the mortal plane is almost always filled with adventure and learning as they strive for fullfillment."
  },
  "featureDetails": [
   {
    "name": "Long Living",
    "text": "The unique circumstances of your creation cause you to be incredibly long-lived. Your natural lifespan sits around 1000 years. Additionally, you are treated as an Otherworldly Species whenever you would be effected by the Altered Condition."
   },
   {
    "name": "Extended Learning Curve",
    "text": "Prerequisite: Long Living Species Feature\nYou have adapted to support your extreme lifespan. At 1st Level you gain 3 Skill, Tool, or Item Proficiencies of your choice. Each time your Proficiency Bonus increases you gain an additional proficiency of your choice. You may instead gain Expertise in a Skill you already have proficiency in."
   },
   {
    "name": "Primate Body",
    "text": "You possess a body shape that is extremely well designed to traverse the world around you. You gain the following effects:\nYour Creature Type is replaced with Beast.\nYou possess a tail that functions as a third primary limb, capable of wielding or assissting in the use of a Weapon and holding your bodyweight with some strain.\nYour feet are also prehensile capable of manipulating objects or holding a Light Weapon as if they were additional Off-Hands. Your Walk Speed is reduced by half for each foot that you are using to wield a Weapon in this way."
   },
   {
    "name": "Primate Sub-Species",
    "text": "You were born of one of the four Celestial Primates.\nYou must choose your Sub-Species from the following list, detailed at the end of this Species:\nInterlocked-Armed Gibbon\nRed Butted Baboon\nSix-Eared Macaque\nWise Monkey"
   },
   {
    "name": "Spiritual Cultivation",
    "text": "Due to your near-divine nature, the mastery of the spirit comes to you like second nature.\nAt Level 1 you gain 1 Spirit Control Trained Feature of your choice. You also gain an additional Spirit Control Trained Feature at Ki Rank 3."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Interlocked-Armed Gibbon",
    "text": "You possess mystical arms that share a combined strength. You gain the following benefits:\nInterlocked Arms. At 1st Level you gain the Titan Wielder Heroic Feat.\nOutstanding Reach. Your Melee Reach is extended by 5 feet."
   },
   {
    "name": "Red Butted Baboon",
    "text": "You possess a near inability to die. You gain the following benefits:\nBlood Keeps Pumping. At 1st Level you gain the Survivor Heroic Feat.\nNear Immortality. You gain a Static Bonus to Death Saving Throws equal to your Ki Rank."
   },
   {
    "name": "Six-Eared Macaque",
    "text": "You possess two extra sets of ears and the best senses out of all of the Celestial Primates. You gain the following benefits:\nIncredible Sense. You gain a Static Bonus on all Wisdom Checks for Perception and sensing energy signatures equal to your Ki Rank.\nKnowledge of the Auspicious. At 1st Level you gain the Ki Sense Heroic Feat."
   },
   {
    "name": "Wise Monkey",
    "text": "Your stone egg sat under the light of Heaven for longer than the rest, this left you with an enhanced capability to learn and discern the truth. You gain the following benefits:\nFlaming Eyes. You have Advantage on Ability Checks and Saving Throws to see past illusions.\nMonkey See, Monkey Do. At 1st Level you gain the Eagle-Eyed Adaptation Heroic Feat."
   }
  ]
 },
 {
  "id": "sp_cerealian",
  "name": "Cerealian",
  "category": "Mortal",
  "complete": true,
  "page": 39,
  "description": "Human-like aliens with green hair and a single hyper-evolved red eye granting incredible ranged accuracy.",
  "abilityScoreIncrease": "Wisdom +2, Dexterity +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 other Language of your choice",
  "skills": "Perception and Technology Skills",
  "grantedSkills": [
   "Technology",
   "Perception"
  ],
  "skillChoice": null,
  "features": [
   "Cerealians Focus",
   "Hyper Reflexes",
   "Indomitable Will",
   "Red Eye Of The Cerealians",
   "Laser Sight"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Cerealians look similar to Human-type Earthlings, though they all seem to have green-colored hair and have an average lifespan of 200 years, Their right eyes have also evolved to grant them incredible visual acuity, having a merged iris and pupil, which is deep red in color.",
   "history": "The Cerealians were once the inhabitants of Cereal and coexisted with a tribe of Namekians who settled on the planet after traveling from another realm. Around Age 733, the Cerealian homeworld was ravaged by the Frieza Force and its Saiyan Army. Using the full moon, the Saiyans transformed into Great Apes and annihilated nearly all of the population and their cities.\nFortunately, a powerful Cerealian warrior named Flayk was able to destroy the planet’s moon causing the Saiyans to revert to their base forms. Unfortunately, the invaders were still too powerful for the Cerealian and Namekian inhabitants to handle. In the aftermath, a handful of Cerealians survived and have since been scattered throughout the universe.",
   "society": "Little is known about Cerealian Society since the loss of their homeworld, most are solitary nomads in the galaxy."
  },
  "featureDetails": [
   {
    "name": "Cerealians Focus",
    "text": "As a Bonus Action on your turn you may spend 1 Stamina to gain a Static Bonus on all Ranged Weapon Attack Rolls equal to your Ki Rank until the end of your next turn. You may do this a number of times equal to your Proficiency Bonus per Long Rest."
   },
   {
    "name": "Hyper Reflexes",
    "text": "Your brain is evolved to take on more information than others. Once per Round, you may expend your Reaction to regain the use of a Snap Decision that you used on this turn."
   },
   {
    "name": "Indomitable Will",
    "text": "Your determination to live is stronger than most. Once per Long Rest when you drop to 0 Hit Points, but are not killed outright, you may instead drop to 1 Hit Point."
   },
   {
    "name": "Red Eye Of The Cerealians",
    "text": "Cerealians are born with a strange quirk, a single hyperevolved red eye. Your right eye becomes a Hyper Focused Red-Eye and you gain the Red Eye Focus Power-Up so long as you have that eye.\nAdditionally, each time you Rank Up you gain one Red Eye Focus Form-Specific Modification."
   },
   {
    "name": "Laser Sight",
    "text": "Your supernatural aim allows you to make every shot a little more deadly. Your first Ranged Weapon Attack each turn deals additional Damage equal to your Proficiency Bonus."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_galactic_citizen",
  "name": "Galactic Citizen",
  "category": "Mortal",
  "complete": true,
  "page": 40,
  "description": "The universe's varied civilized peoples — less flashy than other species but broadly capable and heroic.",
  "abilityScoreIncrease": "Increase all Ability Scores by 1 OR increase 2 by 1 and gain a Feat",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "any 2 Skills of your choice",
  "grantedSkills": [],
  "skillChoice": {
   "count": 2,
   "from": "*"
  },
  "features": [
   "Heroic Nature",
   "Galactic Sub-Species",
   "Indomitable Will",
   "Know-How",
   "Strange Quirks"
  ],
  "subSpecies": [
   "Brench-Seijin",
   "Creamorian",
   "Earthling",
   "Heeter Tribe",
   "Hera Clan",
   "Herculean",
   "Jiangshi",
   "Konatsian",
   "Outworlders",
   "Triclops",
   "Tsufruian",
   "Wagashi-Seijin"
  ],
  "lore": {
   "physical": "They come in all shapes and sizes; some are large, some are small, some are bald, some have three eyes.\nGalactic Citizens are strong in their own right, but have less flashy abilities than other species.",
   "history": "The civilized species of the universe are extremely varied, each carrying their own unique histories.",
   "society": "The civilized species of the universe are extremely varied, each carrying their own unique societies or integrating themselves into other older societies."
  },
  "featureDetails": [
   {
    "name": "Heroic Nature",
    "text": "A life of strife and growth has led to you having stores of heroism that those that are stronger still find hard to emulate. At 1st Level and everytime you Rank Up you gain one Heroic Feat of your choice, this does not count as gaining a Heroic Feat as a Class Feature."
   },
   {
    "name": "Galactic Sub-Species",
    "text": "Galactic Citizens come in a wide variety. You must choose your Sub-Species from the following list, detailed at the end of this Species:\nBrench-Seijin\nCreamorian\nEarthling\nHeeter\nHera Clan\nHerculean\nJiangshi\nKonatsian\nOutworlder\nTriclops\nTsufruian\nWagashi-Seijin"
   },
   {
    "name": "Indomitable Will",
    "text": "Your determination to live is stronger than most. Once per Long Rest when you drop to 0 Hit Points, but are not killed outright, you may instead drop to 1 Hit Point."
   },
   {
    "name": "Know-How",
    "text": "Due to the ever changing nature of your life, it has become easier to learn things as you go and make the best of every opportunity to do so.\nWhenever a Level-Up would not grant you a Technique, you gain one, and you gain an additional Technique every Level beyond 20. Additionally, you gain 1 additional Training Boon each time you have a Training Arc."
   },
   {
    "name": "Strange Quirks",
    "text": "Prerequisite: Galactic Sub-Species Species Feature\nMany Galactic Citizens possess minor differences that set them apart from each other. Choose two options from the Quirks List listed at the end of this Species, these can not be changed later.",
    "options": [
     {
      "name": "Analytic Mind",
      "text": "Your brain works more on facts and logic then emotion.\nYou gain a bonus to all Saving Throws against being Charmed or Frightened equal to your Ki Rank."
     },
     {
      "name": "Darkvision",
      "text": "Your eyes are able to pierce through the veil of darkness. You gain 60 feet of Darkvision."
     },
     {
      "name": "Dense Body",
      "text": "You’re not fat, you’re just big boned! You are treated as one Size Category larger than you really are whenever an effect would attempt to Launch you."
     },
     {
      "name": "Energized Spirit",
      "text": "Though not powerful enough to produce the largest of attacks, your spirit radiates a strange energy. Choose one of the following Damage Types from the list below, this can not be changed later, and change the Damage Type of your Basic Ki Blast to it:\nCold\nFire\nLightning\nThunder"
     },
     {
      "name": "Enhanced Senses (Hearing)",
      "text": "Your ears are elongated and end in a point to aid in hearing. You gain Advantage on all Perception Checks involving hearing."
     },
     {
      "name": "Enhanced Senses (Sight)",
      "text": "Your eyes are sharper than others. You gain Advantage on all Perception Checks involving sight."
     },
     {
      "name": "Long Living",
      "text": "You are destined to outlive the others of your species.\nYour Rate of Aging is one category higher than it would normally be."
     },
     {
      "name": "Napolean Syndrome (Deprecated)",
      "text": "You have complete understanding that other species have flashier abilities than you and that just pushes you to try even harder. Whenever you make an Attack Roll against a creature with a higher Power Bonus than you, you gain a Static Bonus to the roll equal to half of the difference in Power Bonus, rounded up to a minimum of +1."
     },
     {
      "name": "Natural Talent",
      "text": "You find yourself more skilled then some of the more powerful species. At 1st Level, you gain Expertise in one Skill that you have Proficiency with."
     },
     {
      "name": "No Nose",
      "text": "Your face is smooth and you possess a mutated circulatory system go along with that fact. You have Advantage on all Saving Throws against the Poisoned Condition and can hold your breath twice as long."
     },
     {
      "name": "Resilient",
      "text": "Prerequisite: Indomitable Will Species Feature\nYou are tougher than the rest of your species. You gain a second use of the Indomitable Will Species Feature per Long Rest."
     },
     {
      "name": "Small Stature",
      "text": "You are as small as they come for your people. Your Base Walk Speed is increased by 10 feet but you are treated as one Size Category smaller than you really are whenever an effect would attempt to Launch you."
     },
     {
      "name": "Wild Tendencies",
      "text": "“Citizen” doesn’t always mean civilized, and you are a prime example of that fact. You gain Proficiency in the Nature and Survival Skills, if you already have these Proficiencies they instead become Expertise."
     },
     {
      "name": "Witch-Born",
      "text": "You come from a magical bloodline that fully manifested with your birth. At 1st Level you must choose one School of Magic, this can not be changed later. You gain Spells from the chosen list at specified Character Levels, listed below. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for these Spell. Spell Levels that have the same number of uses per Short or Long Rest share the number.\nAt 1st Level, you gain a 1st Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 3rd Level, you gain a 2nd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 5th Level, you gain a 3rd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to half your Proficiency Bonus, rounded up."
     }
    ]
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Brench-Seijin",
    "text": "Brench-Seijin spent most of their known history under the reign of the Cold Empire and as such lack a formal history of their own. You gain the following benefits:\nGalactic Artillery. Your people are hailed for their impressive energy attacks. Your Ki Techniques deal an additional 2 Damage.\nLong Ranged. You take pride in your energy projections, and their effectiveness reflects this. All Ki Techniques that you cast have their Range extended as if they were Charged once."
   },
   {
    "name": "Creamorian",
    "text": "Creamorians have spent most of their known history under the reign of the Cold Empire and as such lack a formal history of their own. You gain the following benefits:\nDashing Combatant. You strive to keep your fights as captivating as yourself. All Strike Techniques with a Range of Melee gain 10 feet of Movement as part of their Casting.\nGalactic Infantry. Your Strike Techniques deal an additional 2 points of Damage."
   },
   {
    "name": "Earthling",
    "text": "The dominant species of Earth, Earthlings have held the planet for as long as sentient life has existed there, protecting it time and time again with the help of the more powerful and clever among them. You gain the following benefits:\nI can figure this out. You gain a bonus to any Skill Check involved with using an Item or Vehicle that you are not Proficient with equal to 1/3 of your Proficiency Bonus, rounded up.\nIntelligent Ape. Your deep-rooted ape biology has its advantages, including an ease at learning the basics.\nYou immediately gain the Technique Mastery Heroic Feat."
   },
   {
    "name": "Heeter Tribe",
    "text": "With bright blue skin and horns of various sizes that extend from their head, the Heaters are a species of nomadic people. Many Heaters find themselves in positions as mercenaries or soldiers due to their hardy nature. You gain the following benefits:\nUnyielding Ferocity. Choose one variation of the Boosted Condition, this can not be changed later.\nWhenever you possess the Berserk or Enraged Conditions, you gain the chosen Condition for its duration.\nWarrior’s Wrath. Generations traversing the stars has left you with a survival instinct that comes out whenever you are in danger. The first time per Long Rest that you are reduced below 50% of your Maximum Hit Points, you gain the Enraged Condition."
   },
   {
    "name": "Hera Clan",
    "text": "Long ago the Hera Clan were a proud and respectable warrior species before the unfortunate loss of their homeworld that led to their survival through piracy.\nThroughout the ages many Hera-Jin have denounced this life and settled on quiet planets, though most of them to this day still find themselves being born in the medbay of a Warship. You gain the following benefits:\nSpace Pirate. Years aboard Starships and mercenary vessels have taught you all manner of combat. You gain Proficiency in all Martial Weapons.\nPowerful Body. You are considered one Size Category larger then normal when Grappling or interacting with the Launch Mechanic."
   },
   {
    "name": "Herculean",
    "text": "Long ago there was another sub-species of Earthling known as the Herculeans that were said to be blessed by the gods with divine might. You gain the following benefits:\nEmpowered Fists. Your fists are weapons in their own right. Your Unarmed Strikes can be treated as Combat Gauntlets for the sake of casting Armed Techniques.\nLegendary Might. You have an innate wellspring of strength that you can call on temporarily. Once per Long Rest as a Bonus Action on your turn you may gain the Boosted Condition or the Empowered Condition for a number of rounds equal to your Ki Rank."
   },
   {
    "name": "Jiangshi",
    "text": "With stark white skin, save for their rosie cheeks, the Jiangshi are a rare sight to see. The Jiangshi are seen as a sub-species to modern Earthlings. You gain the following benefits:\nMagic Being. You gain a bonus to all Intelligence, Wisdom, and Charisma Saving Throws enforced by Spells equal to your Ki Rank.\nPsychic Energy. You may replace the Damage Type of your Basic Ki Blasts and Ki Techniques to Psychic Damage."
   },
   {
    "name": "Konatsian",
    "text": "The Konatsians once waged war against power hungry aliens known as the Kashvar, who re-awakened the ancient monster Hirudegarn. Two legendary heroes split the beast in half and sealed it within themselves to protect what remained of their people, leaving them to rebuild in relative peace. You gain the following benefits:\nMystical Nature. You possess natural magical qualities. You gain two Cantrips of your choice.\nSpace Knights. You may treat any Martial Melee Weapon that you are Proficient in as a Monastic Weapon."
   },
   {
    "name": "Outworlders",
    "text": "Outworlders make up the majority of the space fairing population. They can be found in every corner of the universe using their experience with technology and space travel to make a living in different kinds of ways.\nYou gain the following benefits:\nAlien Knowledge. Your myriad of offworld knowledge has led to you being incredibly gifted with creating things. The Base Zeni Cost to create any object is reduced by 25% of it’s original Zeni Cost.\nAlien Technology. You are used to far more advanced gear than you keep finding yourself with. Whenever you perform the Craft or Invent Downtime Activity, you gain a Static Bonus equal to 1 + your Ki Rank.\nAdditionally, crafting Scientific Gears only increases the Base Zeni Cost of the Enchant Downtime Activity by 50%."
   },
   {
    "name": "Triclops",
    "text": "Almost indistinguishable from Earthlings, the Triclops intermingled and interbred with them. The Triclops of the modern day are seen as a sub-species to modern Earthlings. You gain the following benefits:\nSight of Three Eyes. As an Action on your turn you may focus the true strength of your third eye, granting you Truesight in a range of 30 feet until the end of your next turn.\nImproved Perception. As a Bonus Action on your turn you may focus all three eyes on one point, granting you Advantage on the next Attack Roll or Perception Check that you make. You may use this Feature a number of times per Long Rest equal to your Proficiency Modifier."
   },
   {
    "name": "Tsufruian",
    "text": "Otherwise known as the Tuffles, the Tsufruians were a species of highly advanced people that were attacked and seemingly wiped out by the Saiyan Armada years prior. Tales arise all throughout the galaxy of sightings of them, yet the greater universe has yet to see direct evidence. You gain the following benefits:\nBeautiful Mind. You are capable of performing intense calculations in your head to assist in combat.\nAs a Bonus Action on your turn you may begin running calculations, allowing you to use your Intelligence Modifier in place of the Attack Modifier or Casting Modifier of the next Attack Roll that you make or Technique that you cast.\nMaster Craftsmen. Your people were famous for their ability to learn and create things. You gain Proficiency in three Toolkits of your choice."
   },
   {
    "name": "Wagashi-Seijin",
    "text": "Sometimes referred to as the “Grand Pontas”, the Wagashi-Seijin are a species of red skinned individuals that became renowned for their Universe-spanning delivery service. You gain the following benefits:\nSpace Couriers. You’re not exactly the fastest thing in the universe, but that doesn’t mean you aren’t quick. Your Base Walk Speed increases by 10 feet.\nInner Cowardice. No matter how brave they may be, part of your very genetics is always afraid and ready to flee. You may take the Dash or Disengage Action as a Bonus Action on your turn."
   }
  ]
 },
 {
  "id": "sp_android",
  "name": "Android",
  "category": "Otherworldly",
  "complete": true,
  "page": 48,
  "description": "Artificial beings identical to their designer's species; powerful but reliant on mechanical upgrades to advance.",
  "abilityScoreIncrease": "Any one Ability Score +2, Any one Ability Score +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 other Language of your choice",
  "skills": "Technology and History Skills",
  "grantedSkills": [
   "History",
   "Technology"
  ],
  "skillChoice": null,
  "features": [
   "Crank Generator",
   "Leech Cuffs",
   "Mental Processor",
   "Robotic Body",
   "Routine Maintenance",
   "Signature Upgrade"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Visibly identical to their designer’s species but completely artificial.",
   "history": "They’re hard to find, but certain scientists have the potential to turn you into an Android. These cyborgs have extended capabilities and power when compared to other creatures. However, they have little room for advancement without mechanical upgrades.",
   "society": "Androids do not have their own society, instead they blend in with Earthling society. While most retain their old personality, some may have their brains reprogrammed when becoming an android."
  },
  "featureDetails": [
   {
    "name": "Crank Generator",
    "text": "Your body possess a special generator that recycles energy you are hit with into a resource for you.\nWhenever you take damage that isn’t Destruction, you regain an amount of Ki Points equal to (1/2 x the final damage you took)."
   },
   {
    "name": "Leech Cuffs",
    "text": "You have small machines in the base of your hands granting you the following benefits:\nWhen you would take the Push Back Snap Decision, any damage that was reduced is converted into your Current Ki Points. This cannot raise you above your Maximum Ki Points.\nAlternatively, anytime you have a creature Grappled, you may expend your Bonus Action to steal Xd6 Current Ki Points from the Grappled target, where X equals your Ki Rank. Should a target start their turn Grappled by you, they lose an amount of Current Ki Points equal to your Unarmed Damage Die and you gain the result into your Current Ki Points. This cannot raise you above your Maximum Ki Points."
   },
   {
    "name": "Mental Processor",
    "text": "Your mind is assisted by a secondary processor to help filter out external stimuli. You gain Advantage on all Saving Throws against mind altering effects.\ncat warrior"
   },
   {
    "name": "Robotic Body",
    "text": "You have an internal power core that keeps you fueled.\nYour Creature Type becomes Construct and you do not suffer negative effects from not eating. Additionally, the act of sleeping is replaced with a different, albeit similar, Recovery Mode to properly restore yourself where you are semi-aware of your surroundings.\nAdditionally, you are incapable of regaining Ki from Gather Ki, a Technique, or an Item. Instead you regen (2 x your Character Level) + (3 x your Current Power Bonus) Ki Points per Round. Your artificial energy also means that you may not be found through the use of the Sense Energy option of the Ki Sense Heroic Feat."
   },
   {
    "name": "Routine Maintenance",
    "text": "Your body was made to be quickly repairable. You do not need to sleep, or rather do not need to go into your Recovery Mode, and can not be forced to fall asleep by any means.\nTo benefit from a Long Rest you must instead go into a Repair Mode where your systems fix themself. You may do light activity during this 4 hour rest period.\nAdditionally you may gain the benefits of a Short Rest in 10 Minutes."
   },
   {
    "name": "Signature Upgrade",
    "text": "A piece of advanced technology has been perfectly integrated into your mechanical form. You gain an option from the High-Tech Parts List, this does not count against your Cybernetic Limit."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_arcosian",
  "name": "Arcosian",
  "category": "Otherworldly",
  "complete": true,
  "page": 50,
  "description": "Frost Demons — armored, horned, tailed aliens who thaw into power and once ruled a galactic empire.",
  "abilityScoreIncrease": "Intelligence +2 or Dexterity +2, Charisma +1",
  "speed": "40 ft walk",
  "languages": "Common and Cold",
  "skills": "Persuasion and Deception Skills",
  "grantedSkills": [
   "Deception",
   "Persuasion"
  ],
  "skillChoice": null,
  "features": [
   "Arcosian Sub-Species",
   "Galactic Lords",
   "Incredible Potential",
   "Short Fuse",
   "Strong Carapace"
  ],
  "subSpecies": [
   "Cold Tribe",
   "Hero Tribe"
  ],
  "lore": {
   "physical": "Arcosians or Frost Demons are vaguely humanoid aliens born with protective armor/skin, horns, and tails.\nAll Frost Demons are males and they reproduce asexually. When a Frost Demon is born, it immediately covers itself in a thick, unbreakable layer of ice and begins a thawing process which can last a varying number of years. The number of years they remain in thawing determines how powerful they are when they emerge. The longer they thaw, the more powerful they will be. Upon emerging from this thawing period, they are fully grown adult Frost Demons. Afterwards, if it is needed, the Frost Demon will create for himself a varying number of transformations to help keep his power under control.",
   "history": "Frost Demons hail from one of the coldest planets in the Universe, Geyser. Due to the harsh nature of their home, the population remains relatively low. However, this did not stop them from making a name for themselves, conquering and trading planets for thousands of years. This practice led to one of the largest empires in the universe for several years until they were defeated by the Saiyans, an act of revenge for the destruction of their planet by Frieza.",
   "society": ""
  },
  "featureDetails": [
   {
    "name": "Arcosian Sub-Species",
    "text": "Certain variations in genetics have appeared between the different tribes that have appeared throught the Universes. You must choose your Sub-Species from the following list, detailed at the end of this Species:\nCold Tribe\nHero Tribe"
   },
   {
    "name": "Galactic Lords",
    "text": "Long ago your people were known for traveling the stars and conquering other planets. You do not need to breathe and have Resistance to Cold Damage as your body is designed to explore the vast reaches of space."
   },
   {
    "name": "Incredible Potential",
    "text": "The emperors of old thrived by their incredible potential that was used to great, though simple, effect as many never sought out to find the depts of said potential. You gain an additional Training Boon anytime you have a Training Arc."
   },
   {
    "name": "Short Fuse",
    "text": "You have inherited the same temper as the Arcosians of the past. A number of times per Long Rest equal to your Ki Rank you may use a Bonus Action to gain the Enraged Condition."
   },
   {
    "name": "Strong Carapace",
    "text": "Your exoskeleton is strong and capable of cushioning the more vital parts of your anatomy. Choose one of the following between Bludgeoning, Energy, Piercing, and Slashing Damage. You gain Resistance to the chosen Damage Type. Every time you Rank Up, you may choose another option that you did not pick."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Cold Tribe",
    "text": "Long ago this Tribe controlled vast stretches of the known Universe, made famous by a small group of Mutants of the Tribe. While most never reach the caliber of the great Lord Frieza, the Tribe as a whole still greatly resemble the tyrant of old. You gain the following benefit:\nGated Power. Born into their incredible power before hiding it through the use of Metamorphosis, the Cold Tribe spend a vast portion of their life attempting to “unlock” their original forms. At 1st Level the Power Regression Transformation is always active and must remain active at all times."
   },
   {
    "name": "Hero Tribe",
    "text": "After the destruction of the Cold Empire it took many years for the members of the Hero Tribe to rejoin the greater society without prejudice.\nMetamorphosis. Based on generations of learning to move through the galaxy to live and survive where they could, the Hero Tribe perfected the use of their innate metamorphic abilities to alter their form to better survive. At 5th Level you gain the Alter Form Transformation."
   }
  ]
 },
 {
  "id": "sp_chronin",
  "name": "Chronin",
  "category": "Otherworldly",
  "complete": true,
  "page": 52,
  "description": "Purple and almost humanoid, Chronins are hairless with tympaniums in place of ears.",
  "abilityScoreIncrease": "Wisdom +2 or Dexterity +2, Intelligence +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "any 2 Skills of your choice",
  "grantedSkills": [],
  "skillChoice": {
   "count": 2,
   "from": "*"
  },
  "features": [
   "Adaptability",
   "Blood of Time",
   "High-Speed Reactions",
   "Know-How",
   "Millennial Learning Curve"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Purple and almost humanoid, Chronins are hairless with tympaniums in place of ears. They can range between 5 and 7 feet tall at maturity and can live between 1000 and 2000 years.",
   "history": "A secretive and long lived species, Chronins wander the galaxy learning and improving. Born with the innate ability to store excess time, generations of this has changed their biology to such a degree that they can live for hundreds if not thousands of years. Chronins tend to only have children in their final years, only raising their children through their brief youth before leaving them to their own devices.",
   "society": "Due to their upbringing Chronins rarely ever spend time around others of their species, instead traveling the stars for somewhere they may call home.\nMany Chronins become scientists and scholars, using their ability to manipulate time to pursue the betterment of the future and eternal life; others still relish in their abilities, becoming mercenaries or assassins with deadly efficiency."
  },
  "featureDetails": [
   {
    "name": "Adaptability",
    "text": "Your species survives on it’s ability to learn and adapt to threats. Whenever you are hit with a Critical Hit, roll a d20 Check with a DC starting at 10, increasing by 2 each time you succeed. On a successful check you gain 1 Training Boon. These Training Boons must be used immediately or at the start of your next turn.\nThis Feature only activates in times of Mortal Peril, your DM may decide that the situation doesn’t warrant a high enough threat level to induce growth."
   },
   {
    "name": "Blood of Time",
    "text": "At Level 1, you gain the Basic Time Skipping Trained Feature and you reduce the Casting Cost of Techniques from the Time Skip Super Technique Line by 4x the Technique’s Rank, minimum 4 Ki."
   },
   {
    "name": "High-Speed Reactions",
    "text": "Your brain acts with a supernatural efficiency. Snap Decisions that you spend 2 or more Stamina on cost 1 less Stamina to use, to a minimum Casting Cost of 1 Stamina."
   },
   {
    "name": "Know-How",
    "text": "Due to the ever changing nature of your life, it has become easier to learn things as you go and make the best of every opportunity to do so.\nWhenever a Level-Up would not grant you a Technique, you gain one, and you gain an additional Technique every Level beyond 20. Additionally, you gain 1 additional Training Boon each time you have a Training Arc."
   },
   {
    "name": "Millennial Learning Curve",
    "text": "You have unique brain chemistry to support your extreme lifespan, due to this they are able to compartmentalize specific knowledge so that it can be remembered and improved on easily.\nAt 1st Level you gain 3 Skill, Tool, or Vehicle Proficiencies of your choice. Each time your Proficiency Bonus increases you gain an additional proficiency of your choice. You may instead gain Expertise in a Skill you already have proficiency in.\ncat warrior"
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_demon_realm",
  "name": "Demon Realm Denizen",
  "category": "Otherworldly",
  "complete": true,
  "page": 53,
  "description": "Demon Realm Denizens are one of the many species that some believe that life in the Mortal Realm evolved to emulate.",
  "abilityScoreIncrease": "Increase all Ability Scores by 1 OR increase 2 by 1 and choose a Feat",
  "speed": "30 ft walk",
  "languages": "Common and one additional Language of your choice",
  "skills": "two Skills of your choice",
  "grantedSkills": [],
  "skillChoice": {
   "count": 2,
   "from": "*"
  },
  "features": [
   "Awakened Demonic Power",
   "Demon World Sub-Species",
   "Magic or Mindfullness",
   "Magictech Knowledge",
   "Otherworldly Energy"
  ],
  "subSpecies": [
   "1st Demon World",
   "2nd Demon World",
   "3rd Demon World",
   "Otherworld Exile"
  ],
  "lore": {
   "physical": "Demon Realm Denizens are one of the many species that some believe that life in the Mortal Realm evolved to emulate. Though not limited to, each classification of Demon Realm Denizen is based on where they are most commonly found amongst the different Demon Worlds.",
   "history": "The Demon Realm was once the only realm in existence, that was until the Super Majin Rymus created the rest of the Multiverse. This expansion allowed for the wide spread expansion of intelligent life in the Mortal Realm, however may Demon Realm Denizens stayed behind out of love for their home.",
   "society": "Each layer of the Demon Realm has their own monarch and internal structrure though the monarchs of the 3rd and 2nd Demon Worlds ultimately hold less authority than the monarch of the 1st Demon World, known as the Supreme Demon King."
  },
  "featureDetails": [
   {
    "name": "Awakened Demonic Power",
    "text": "Whenever you would get the option to choose a God Form to gain, you may choose to instead choose a Form that you know and add the following permanent effects to it:\n+1 Stable Power The benefiting Form becomes a God Form.\nIncrease all available Movement Speeds by 10 feet.\nIncrease all Damage dealt by your Attack Action by 1.\nThe benefiting Form gains +5 Ki Upkeep, even if it is already expending a different Resource."
   },
   {
    "name": "Demon World Sub-Species",
    "text": "Though every Demon is different, many possess traits based on the world that they originate from. Your Creature Type is replaced with your choice of Celestial or Fiend, this can not be changed later.\nAdditionally you must choose your Sub-Species from the following list, detailed at the end of this Species, and gain the listed benefits:\n1st Demon World\n2nd Demon World\n3rd Demon World\nOtherworld Exile"
   },
   {
    "name": "Magic or Mindfullness",
    "text": "You possess an advanced mind that makes it possible to awaken mystical abilities or better process information.\nAt 1st Level you gain one of the following features of your choice, this can not be changed later:\nYou gain one 1st Level Spell of your choice. You may cast this spell a number of times per Short or Long Rest equal to your Proficiency Bonus. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for this Spell.\nAt 1st Level you gain 2 Skill Proficiencies of your choice or may gain Expertise in 1 Skill that you gained from your Species Traits."
   },
   {
    "name": "Magictech Knowledge",
    "text": "Your history with Demon Realm technology has led to the devices in the Mortal Realm to feel almost primative in comparison. You may reduce the Crafting Cost of any Technology by half."
   },
   {
    "name": "Otherworldly Energy",
    "text": "Your energy possess a truly unique magical signal.\nCreatures without God Ki treat your Passive Ki Stealth and Ki Stealth Checks as 5 higher than it would actually be."
   },
   {
    "name": "Demon World Magic List",
    "text": "",
    "options": [
     {
      "name": "Beast Shape",
      "text": "You have the ability to shift into an animalistic form.\nChoose one option from the General Bestial Characteristics List, this can not be changed later. As a Bonus Action on your turn you may shift back or forth from your animalistic form, gaining the effects of your chosen General Bestial Characteristic for the duration.\nYou can maintain this state for a number of minutes per Long Rest equal to your Ki Rank."
     },
     {
      "name": "Carapaced Hands",
      "text": "Your hands possess a hard shell-like covering that allows you to use your hands in a more destructive method. You can use your Unarmed Strikes for Armed Techniques as if they were Combat Gauntlets."
     },
     {
      "name": "Demonic Wings",
      "text": "You possess a pair of bat-like wings that protrude from your back granting you a Fly Speed of 15x your Ki Rank."
     },
     {
      "name": "Elementalist",
      "text": "Choose one Damage Type from the list below, this can not be changed later, anytime you cast a Technique you may spend Stamina equal to it’s Rank to change it’s Damage Type to your chosen Damage Type.\nFire Cold Lightning Thunder Force Psychic Poison"
     },
     {
      "name": "Esoteric Gift",
      "text": "You gain 1 Esoteric Art from the Esoteric Arts Class Feature."
     },
     {
      "name": "Fiendish Power",
      "text": "Whenever you make an Unarmed Strike or Unarmed Technique you may spend Stamina to give yourself a Static Boost equal to the amount spent for that casting.\nYou may not spend more than half of your Proficiency Bonus, rounded up, in Stamina in this manner for a single attack roll."
     },
     {
      "name": "Resistant Form",
      "text": "Choose one Damage Type other than Energy Damage or Destruction Damage, this can not be changed later.\nYou gain Resistance against the chosen Damage Type."
     },
     {
      "name": "Innate Magic",
      "text": "You gain one Spell of Spell Level 1 to Spell Level 3 of your choice. You may cast this Spell a number of times per Short or Long Rest equal to half your Proficiency Bonus, rounded up. This Spell can be upcast to a maximum Spell Level equal to your Ki Rank and Charisma is your Spellcasting Modifier for this Spell.\nThis Demon World Magic Option can be gained more than once, gaining an additional Spell of Spell Level 1 to Spell Level 3 of your choice each time. However, you do not gain additional castings for each Spell. All Spells gained in this manner share the number of use."
     },
     {
      "name": "Size Shifting",
      "text": "As an Action on your turn you may give yourself 1 Rank of Rescaled of your choice for the next minute or until you use this Feature again. You have a number of uses of this Feature per Long Rest equal to your Ki Rank."
     },
     {
      "name": "Unstable Biology",
      "text": "You gain the Rematerialize Snap Decision."
     }
    ]
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "1st Demon World",
    "text": "Sometimes known as Lucifarians, named after the once great Supreme Demon King Lucifer from the Age of Sand. These demons have rigid horns and occasionaly possess tails.\nYou gain the following benefits:\nDark Magic Manifestation. You have the ability to produce more magical effects than others. At 1st Level, you gain one option from the Demon World Magic List.\nWind through your horns. Whether by design or by chance, you possess almost superhuman manueverability. Your Base Walk Speed is increased by 15 feet."
   },
   {
    "name": "2nd Demon World",
    "text": "Usually referred to as the Glinds, these bright individuals almost ooze magic. Growing from magical trees and being the first place to look for replacements for Kais, the Glind are a very well respected people across the universes and Demon Realm.\nYou gain the following benefits:\nMagic Resilience. Your hyper magical nature give you the ability to try and push through magical effets.\nWhenever you use the Block Snap Decision you gain an additional +3 on all Saving Throws against Spells.\nMinor Magic. At 1st Level you must choose one School of Magic, this can not be changed later. You gain Spells from the chosen list at specified Character Levels, listed below. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for this Spell. Spell Levels that have the same number of uses per Short or Long Rest share the number.\nAt 3rd Level, you gain a 2nd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 7th Level, you gain a 4th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to half your Proficiency Bonus, rounded up.\nAt 9th Level, you gain a 5th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Ki Rank."
   },
   {
    "name": "3rd Demon World",
    "text": "Predominantly blue-skinned with snow white hair, the denizens of the 3rd Demon Realm are filled with a harsh desire to survive due to the rough living conditions around them.\nYou gain the following benefits:\nSurvival Instinct. You refuse to let the cruel world around you take you down! At 1st Level, you gain the Survivor Heroic Feat.\nQuick Thinking. You have learned to be quick on your feet and even quicker with your thoughts. A number of times per Long Rest equal to your Ki Rank you may add your Intelligence Modifier or Wisdom Modifier to a Skill Check, even if the Skill Check would already use that Ability Score Modifier."
   },
   {
    "name": "Otherworld Exile",
    "text": "There was once a group of Demon Realm Denizens, sometimes known as Ogres, that had attempted to stage a coup against an ancient Supreme Demon King and found themselves banished to Otherworld to remain in HFIL as it’s protectors or as assisstants to the powers that be.\nYou gain the following benefits:\nBloody Instincts. Your deeply seated instincts for battle are not gone, meerly suppressed. Whenever you roll Initiative, you may choose to gain the Enraged Condition for a number of rounds equal to your Ki Rank. At the end of this duration, you gain 1 Rank of Exhaustion.\nHFIL Horns. Choose one of the following to gain the benefits of:\nOne Horn. You possess a singular horn in the center of your head, only large enough to act as a sensory organ. At 1st Level, you gain Proficiency in the Perception Skill. This grants you Expertise if you would gain Proficiency from another source.\nTwo Horns. You possess a set of matching horns, each extending off the side of your head that grants you the intimidating visage of a demon. At 1st Level, you gain Proficiency in the Intimidation Skill. This grants you Expertise if you would gain Proficiency from another source."
   }
  ]
 },
 {
  "id": "sp_greys",
  "name": "Greys",
  "category": "Otherworldly",
  "complete": true,
  "page": 57,
  "description": "Purple and humanoid, Greys are hairless with tympaniums in place of ears.",
  "abilityScoreIncrease": "Constitution +2 or Strength +2, Wisdom +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "Ki Control and Athletics Skills",
  "grantedSkills": [
   "Athletics",
   "Ki Control"
  ],
  "skillChoice": null,
  "features": [
   "Burning Spirit",
   "Combative Nature",
   "Destructive Strikes",
   "Thunderous Reach",
   "Raw Talent"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Purple and humanoid, Greys are hairless with tympaniums in place of ears. They range from 6 to 9 feet once they reach maturity, with overly defined musculature and almost pitch black eyes.",
   "history": "Once a peaceful and spiritual people, the Greys lived simplistic prosperity. Using their incredible strength they tilled the land to their whims and grew kingdom sized farms. Peace rained until a mysterious threat appeared, single-handedly almost causing this species to go extinct. Luckily a few survived and escaped off of their plundered home.",
   "society": "Since the destruction of their Homeworld the Greys have become wanderers, some even leaving the bounds of their Ancestral Universe 11 and propagating in other universes."
  },
  "featureDetails": [
   {
    "name": "Burning Spirit",
    "text": "Your species isn’t always the most powerful yet they make up for that in an unyielding spirit that can temporarily push them further. You gain the Burning Spirit Transformation at Level 5."
   },
   {
    "name": "Combative Nature",
    "text": "You possess a secret reserve of energy to push yourself further in combat. You possess an additional pool of Stamina Points equal to 2 + your Ki Rank. These Stamina Points can only be used to perform Snap Decisions and recharge after a Rest."
   },
   {
    "name": "Destructive Strikes",
    "text": "Your attacks are capable of shattering the things around you. All damage that you deal to Structures is doubled.\nAdditionally whenever you would damage a creature or object’s Temporary Hit Points, the damage counts for double when being subtracted from their Temporary Hit Points."
   },
   {
    "name": "Thunderous Reach",
    "text": "When making an Unarmed Strike or casting an Unarmed Techniques, you may extend your Reach by 5ft x your Ki Rank. When making use of this additional range, the damage type of the Unarmed Strike or Technique becomes Thunder Damage."
   },
   {
    "name": "Raw Talent",
    "text": "You are a creature of unparalleled potential and find yourself accidently developing incredible abilities. At 5th Level and again at 15th Level you gain a Mortal Trained Feature that you would qualify for.\nAdditionally whenever you would take the Self Taught Feat, you may choose to forgo its traditional effect to instead gain the following benefit:\nYou gain one Otherworldly Trained Feature of your choice that you would fit the requirements for except the God Ki Creation Trained Feature."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_majin",
  "name": "Majin",
  "category": "Otherworldly",
  "complete": true,
  "page": 58,
  "description": "Majins have skin coming in various shades in colors, most commonly pink.",
  "abilityScoreIncrease": "Constitution +2 or Charisma +2, Dexterity +1",
  "speed": "30 ft walk",
  "languages": "Common and 2 other Languages of your choice",
  "skills": "Arcana and Survival Skills",
  "grantedSkills": [
   "Arcana",
   "Survival"
  ],
  "skillChoice": null,
  "features": [
   "Life Force Manipulator",
   "Magical Nature",
   "Majin Sub-Species",
   "Majin Regenerate",
   "Unnatural Internals"
  ],
  "subSpecies": [
   "Raw Magic",
   "Saibaman"
  ],
  "lore": {
   "physical": "Majins have skin coming in various shades in colors, most commonly pink. Their body types come in all shapes and sizes. Skin is made of an elastic, goo like substance. Majin have a single tentacle emitting from their forehead can be used to make ranged attacks.\nThey tend to live until destroyed, with no apparent age limit.",
   "history": "The original Majin Buu was an ancient evil, sealed within the Earth, but converted to a peaceful lifestyle after meeting Mr.Satan (World Martial Arts Champion) and became well-known as one of his promising pupils.\nEventually, Buu became obsessed with understanding the concept of “love”, a realization which led him to split into two entities: the original Buu, and a new, female Buu. They instantly fell in love and reproduced over generations, leading to the current population. They have been accepted into society with open arms thanks to the efforts of Mr. Satan, and their personalities all represent parts of Buu.",
   "society": "Majins were able to fit into society with varying degrees of success due to both the efforts of Mr. Satan and Earth’s inclusion into the Galactic Patrol. Some that represent the darker parts of Buu live in outcast and seclusion, but the majority of Majin settled in the cities and spend their days binging on treats. Some that found affiliation with smaller villages left the city to see more of the world and adventure."
  },
  "featureDetails": [
   {
    "name": "Life Force Manipulator",
    "text": "Your body is naturally attuned to the life force of the universe around you. At 1st Level and again at 10th Level, you gain a Trained Feature from the Life Force Manipulation Otherworldly Trained Feature List."
   },
   {
    "name": "Magical Nature",
    "text": "You have Advantage on all Intelligence, Charisma, and Wisdom Saving Throws against Spells. Additionally. at 10th Level and above, whenever you first gain the Enraged Condition you gain the Steam Release Power- Up."
   },
   {
    "name": "Majin Sub-Species",
    "text": "You were made through a ritual of dark magic, though could have had an altered recipe. You replace your Creature Type with Fiend.\nAdditionally you must choose your Sub-Species from the following list, detailed at the end of this Species, and gain the listed benefits:\nRaw Magic\nSaibaman"
   },
   {
    "name": "Majin Regenerate",
    "text": "Your body is capable of reconstructing itself. You have access to a pool of Hit Points equal to your Maximum Ki Points. As an Action on your turn, you may expend any number of Hit Points from this pool to regain that many. This can not raise you above your Hit Point Maximum. The pool refreshes on a Long Rest.\nAdditionally whenever you would drop to 0 Hit Points but aren’t killed outright, you may use your Reaction to begin spending Ki Points equal to the amount of Damage that would put you below 1. This effect leaves you with 1 Hit Point.\nAt Level 5, so long as you are not under the effects of Ki Exhaustion, you may expend your Bonus Action to regenerate a limb lost due to the Crippled Condition."
   },
   {
    "name": "Unnatural Internals",
    "text": "You lack traditional internal organs because of the nature of your creation. Choose one of the following between Bludgeoning, Piercing, and Slashing Damage.\nYou gain Resistance to the chosen Damage Type. At Ki Rank 2, and again at Ki Rank 3, you may choose another option that you did not pick."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Raw Magic",
    "text": "You were made without a physical basis, instead being an amalgamation of Demon Realm magic capable of extreme contortions and stretching.\nA Raw Magic Majin gains the following benefits:\nSplit Form. As a Bonus Action on your turn, you may sacrifice any amount of your Maximum Hit Points to create a Majin Blob with that many Hit Points. Majin Blobs are telepathically controlled by you at the end of each of your turns, able to move and take the Restrain Action. You may also command them to fuse back into your main body while they are within your Melee Range, consuming their Action and restoring your Maximum Hit Points to its previous value. When fused back into your main body, they also grant you any Hit Points they had remaining.\nYour Maximum Hit Points are restored if the Majin Blob is reduced to 0, but your Current Hit Points aren’t. Majin Blobs have your Ability Scores, share your AC and any Resistances at the time of creation, and have half as much Walk Speed as you do.\nRestrain Action. The Majin Blob attempts to Grapple the target. If this Action is used while a creature is already Grappled by this Action, it becomes Restrained after an additional successful Grapple, and if it is already Restrained by this Action, it is treated as Unconscious for the sake of interacting with Features and effects.\nRubbery Stretch. At 1st Level your Melee Range is increased by 5 feet, this increases by an additional 5 feet at Levels 10 and 19."
   },
   {
    "name": "Saibaman",
    "text": "You were created through the use of a Saibaman Seed in the attempt to create a super soldier.\nA Saibaman Majin gains the following benefits:\nSaibaman Form. Though a new creature entirely, you still retain distinct traits from your original heritage. Your Creature Type is replaced with Plant.\nSuper Soldier Design. You were designed to be fast and skilled from the moment of your conception.\nYour Base Walk Speed increases by 5ft. x your Ki Rank. Additionally a number of times equal to your Proficiency Bonus whenever you Learn a Technique, you may immediately Master it a single time."
   }
  ]
 },
 {
  "id": "sp_namekian",
  "name": "Namekian",
  "category": "Otherworldly",
  "complete": true,
  "page": 60,
  "description": "Green, water-sustained beings who stretch their limbs, regenerate, and communicate telepathically.",
  "abilityScoreIncrease": "Constitution +1, Wisdom +1",
  "speed": "30 ft walk",
  "languages": "Common and Namekian",
  "skills": "Arcana and Insight Skills",
  "grantedSkills": [
   "Arcana",
   "Insight"
  ],
  "skillChoice": null,
  "features": [
   "Namekian Assimilation",
   "Namekian Biology",
   "Namekian Sub-Species",
   "Sounds of the Universe",
   "Telepathy"
  ],
  "subSpecies": [
   "Dark Namekian",
   "Dragon Clan",
   "Warrior Clan"
  ],
  "lore": {
   "physical": "Namekians have primarily green skin, though the whole rainbow exists among them, with patches of translucent skin that exposes their inner muscles. They all have antennas on their head and large, pointed ears that allow them to hear over great distance.They come in a very large variety of body types ranging from short and round to tall and lean/stocky. Namekians are known for their regenerative abilities and stretchable limbs. They are genderless with no distinguishing traits and reproduce asexually through eggs that come from the mouth.",
   "history": "Long ago, Namekians dwelled in the Demon Realm before they launched a mass scale escape to avoid subjegation. While many Namekians settled in isolation, many more congregated on empty worlds to make into their own. History is rarely on the side of the Namekians, however, and their societies are prone to destruction that prevents mass growth as a species.",
   "society": "Namekians do not have armies or participate in war unless absolutely necessary. The peaceful nature of their species allowed for them to live several generations with little need to protect themselves. Still, every village has a guardian who has been trained in the ways of martial arts and watches over the town. All guardians report to a Guru, usually the oldest and wisest among them, and the creator of the planet’s currently used dragon balls. After the onslaught of Frieza’s men on planet Namek, many were trained in self-defense. This led to the establishment of barracks in each village with small groups of warriors that assist the presiding guardian when necessary."
  },
  "featureDetails": [
   {
    "name": "Namekian Assimilation",
    "text": "As a highly spiritual demonic species, Namekian are capable of assimilating other willing Namekians into themselves to create a stronger being.\nAs an Action on your Turn you may touch a willing Namekian and Assimilate them, turning you into a Namekian Fusion. When you Assimilate a Namekian you record the Creature and their Assimilated Power, as described below, and gain the Super Namekian Transformation. You gain the Creature’s Assimilated Power unless an effect would cause you to seperate from an Assimilated Creature.\nYou may Assimilate a number of Namekians equal to half of your Proficiency Modifier, rounded up.\nAdditionally, a Namekian that has already Assimilated another using this Feature transfers all of their Assimilations to the Namekian that Assimilated them.",
    "options": [
     {
      "name": "Assimilated Power",
      "text": "Record the Creature’s highest Ability Score and increase your own matching Ability Score by 1.\nRecord and gain all of the Creature’s Techniques."
     },
     {
      "name": "Duration of a Namekian Fusion",
      "text": "A Namekian Fusion has Maximum Fusion Points equal to 5x the number of Assimilated Namekians and has one Assimilated Namekian seperated from them for each 5 Fusion Points that they lose. Namekian Fusions regain lost Fusion Points on a Long Rest. This does not regain any Fusion Points lost due to the separation of an Assimilated Namekian.\nAlternatively, a Wish Spell or use of a set of Dragon Balls can undo the Assimilation effect."
     }
    ]
   },
   {
    "name": "Namekian Biology",
    "text": "Namekians do not eat and survive only off of water. Due to this liquid nature namekians are able to stretch their limbs for combat and utility purposes.\nYour Melee Range is increased by 5ft. x your Ki Rank.\nAdditionally whenever you reach Ki Rank 2 and again at Ki Rank 4, you may ignore the negatives of performing Grapple Checks on creatures a Size Category larger than you."
   },
   {
    "name": "Namekian Sub-Species",
    "text": "The Clan you originate from heavily impacts your abilities as a Namekian. At 1st Level you must choose one Sub-Species to gain the benefits from, detailed at the end of this Species:\nDark Clan Namekian\nDragon Clan Namekian\nWarrior Clan Namekian"
   },
   {
    "name": "Sounds of the Universe",
    "text": "The ears of Namekians are fine-tuned to hear oncoming noises so that they may hear danger encroaching on their homeworld. You gain a Static Bonus to hearing based Perception Checks and Passive Perception equal to your Proficiency Bonus. Additionally should you gain the ability to sense energy signatures, you may hear the surroundings of any creature you sense.\nUnfortunately your incredible hearing comes at a cost, you gain Vulnerability to Thunder Damage."
   },
   {
    "name": "Telepathy",
    "text": "Namekians can speak telepathically to anyone within a mile that they know well. This range is increased to 10 miles at Level 5, Continent-wide at Level 10, Planetwide at Level 15, and Galaxy-wide at Level 20.\nThis Feature can also target any creature who you can find through sensing their energy signature, so long as it is not from a Scouter."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Dark Namekian",
    "text": "These Namekians are hardier than most and are usually demonized in Namekian Society due to their duller colors and lack of distinct Namekian abilities. Dark Namekians have mastered their own regenerative capability, some say they evolved purely to combat the raging discrimination they once faced.\nYou gain the following benefits:\nDemonic Durability. Increase your Constitution Ability Score by 2.\nHellish Regeneration. You have access to a pool of Hit Points equal to 2x your Maximum Ki Points. As an Action on your turn, you may expend any number of Hit Points from this pool to regain that many. This can not raise you above your Hit Point Maximum.\nAdditionally as an Action on your turn, you may expend 10 of these Hit Points to regenerate a limb lost due to the Crippled Condition. The pool refreshes on a Long Rest.\ncat warrior"
   },
   {
    "name": "Dragon Clan",
    "text": "Those attuned to the spirit of Zalama the dragon god. these namekians are spiritually gifted and some even manage to emulate Zalama himself by creating Dragon Balls.\nYou gain the following benefits:\nAncient Teachings. Increase your Intelligence Ability Score and Wisdom Ability Score by 1.\nDraconic Blessing. You have access to a pool of Hit Points equal to your Maximum Ki Points. As an Action on your turn, you may expend any number of Hit Points from this pool to regain that many. This can not raise you above your Hit Point Maximum.\nAdditionally as an Action on your turn, you may expend 20 of these Hit Points to regenerate a limb lost due to the Crippled Condition. The pool refreshes on a Long Rest.\nPorunga’s Touch. You may touch a willing creature as an Action and expend Hit Points from this pool to restore half as many Hit Points to the Creature. This can not raise them above their Hit Point Maximum."
   },
   {
    "name": "Warrior Clan",
    "text": "Namekians born for combat that can utilize the monstrous Titan form.\nYou gain the following benefits:\nStunted Regeneration. You have access to a pool of Hit Points equal to your Maximum Ki Points. As an Action or Bonus Action on your turn, you may expend any number of Hit Points from this pool to regain that many. This can not raise you above your Hit Point Maximum. Additionally as an Action on your turn, you may expend 30 of these Hit Points to regenerate a limb lost due to the Crippled Condition.\nThe pool refreshes on a Long Rest.\nTitan Namekian. You gain the Titan Namekian Transformation.\nWarrior’s Frame. Increase your Dexterity Ability Score and Strength Ability Score by 1. This cannot raise you over your Ability Score Maximum."
   }
  ]
 },
 {
  "id": "sp_neko_majin",
  "name": "Neko Majin",
  "category": "Otherworldly",
  "complete": true,
  "page": 63,
  "description": "Neko Majins in their true form resemble a small bipedal cat.",
  "abilityScoreIncrease": "Charisma +2, Constitution or Wisdom +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "any 2 Skills of your choice",
  "grantedSkills": [],
  "skillChoice": {
   "count": 2,
   "from": "*"
  },
  "features": [
   "Magical Shape-Shifters",
   "Mystical Mimicry",
   "Natural Innocence",
   "Prodigious Learners",
   "Heroic Nature"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Neko Majins in their true form resemble a small bipedal cat. They are intellegent and understand the concept of clothing, though some don’t quite figure out the execution of it.",
   "history": "Neko Majins are an incredibly rare and mystical species capable of truly miraculous level of mimicry. Due to their magical nature they were once hunted to near extinction and most live in relative seclusion or small groups of 2 to 3.",
   "society": "Neko Majins no longer have a dedicated society and instead are masters of integrating themselves into any society they find themselves in, changing their behavior, looks, and even identities to match if needed."
  },
  "featureDetails": [
   {
    "name": "Magical Shape-Shifters",
    "text": "Years of hiding have made Neko Majins a master of hiding their true self. You gain the following Spells, that can only target yourself, at the Character Levels listed below:\n1st Level. Alter Self and Disguise Self 10th Level. Polymorph\nYou may cast these Spells at their lowest Spell Level by expending Ki Points equal to 5x the Spell Level.\nCharisma is your Spellcasting Modifier for this Spell."
   },
   {
    "name": "Mystical Mimicry",
    "text": "You’re ability to shape shift is so incredible that it allows you to mimic another’s very DNA. An amount of times equal to your Ki Rank per Rest, as a Reaction to when you would see a creature take the Ascend, Awaken or Ramp Up Action, you may temporarily gain that Form and the Form Modification that they are currently benefiting from but you must pay double its original Upkeep. You gain this Form for up to 1 Minute or until you reach 0 Ki Points.\nAdditionally this Feature fails if used to memorize a God Form, unless you have at least 1 God Ki."
   },
   {
    "name": "Natural Innocence",
    "text": "Your soul is bright and shining, even the most evil of Neko Majin radiates joy. You gain a Static Bonus on all Saving Throws against being Berserk, Charmed, or Frightened equal to your Ki Rank."
   },
   {
    "name": "Prodigious Learners",
    "text": "You are a natural master of replicating what you see. At 1st Level, you gain the Eagle-Eyed Adaptation Heroic Feat except it has the following additions:\nThe effect of the Eagle-Eyed Adaptation Heroic Feat can be used a number of times per Long Rest equal to your Proficiency Bonus.\nYou can have a number of Techniques memorized equal to your Intelligence Modifier. Whenever you would pass this maximum, replace one of your previously memorized Techniques."
   },
   {
    "name": "Heroic Nature",
    "text": "A life of strife and growth has led to you having stores of heroism that those that are stronger still find hard to emulate. At 1st Level and everytime you Rank Up you gain one Heroic Feat of your choice, this does not count as gaining a Heroic Feat as a Class Feature."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_neo_machine_mutant",
  "name": "Neo Machine Mutant",
  "category": "Otherworldly",
  "complete": true,
  "page": 64,
  "description": "Made of a futuristic bio-metal, Neo Machine Mutants were created by Tuffle scientists to appear unassuming amongst the populous to act as soldiers in response to threats.",
  "abilityScoreIncrease": "Any one Ability Score +2, Any one Ability Score +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "any 2 Skills of your choice",
  "grantedSkills": [],
  "skillChoice": {
   "count": 2,
   "from": "*"
  },
  "features": [
   "Eclipsing Biology",
   "Liquification",
   "Nanomachine Form",
   "Semi-solid form",
   "Signature Upgrade"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Made of a futuristic bio-metal, Neo Machine Mutants were created by Tuffle scientists to appear unassuming amongst the populous to act as soldiers in response to threats.",
   "history": "Years of being invaded for either their luxurious planet or advanced led to the development of the Neo Machine Mutants. Once the devastation of Planet Plant was over the remaining Neo Machine Mutants that remained wandered hoping to find a new purpose, and even some seek revenge for the home they once lost.",
   "society": "Since the lose of their home Neo Machine Mutants have little to no society to speak of without a Tuffle family to protect."
  },
  "featureDetails": [
   {
    "name": "Eclipsing Biology",
    "text": "You were created with the capability to merge with other creatures, though the methodoligy may vary.\nChoose one of the following Fusion Methods to gain access to:\nParasitic Fusion\nSymbiotic Fusion",
    "options": [
     {
      "name": "Parasitic Fusion",
      "text": "As an Action on your Turn you may target an Unconscious or willing Creature, that is not a Neo Machine Mutant, within your Melee Range and Dominate them to allow you to merge with them. You gain the Creature’s Assimilated Power until you are separated from your Dominated Creature.\nYou may Dominate a single Creature in this way at a time and can not Dominate a Creature who is comprised of more than one Creature already."
     },
     {
      "name": "Assimilated Power",
      "group": "Parasitic Fusion",
      "text": "All of the Creature’s Feats All of the Creature’s Forms and Form Modifications All of the Creature’s Techniques.\nAll of the Creature’s Species Features.\nAll of the Creature’s Trained Features."
     },
     {
      "name": "Duration of a Parasitic Fusion",
      "group": "Parasitic Fusion",
      "text": "A Parasitic Fusion has Maximum Fusion Points equal to their Character Level and are separated from their Dominated Creature should they ever reach zero Fusion Points. Parasitic Fusions regain lost Fusion Points on a Long Rest. This does not regain any Fusion Points lost due to the separation of an Assimilated Creature.\nAlternatively as an Action on your turn, you may evacuate from the Dominated Creature to end the Fusion early. You reappear in the closest space to the Dominated Creature.\nAdditionally, the Parasitic Fusion gains access to all Tufflized Family Forms and must have one active at all times. This effect forcibly ends, or moves if possible, any Power-Up that is currently active to activate the Tufflization Power-Up."
     },
     {
      "name": "Symbiotic Fusion",
      "text": "As an Action on your turn you may merge with a willing creature within your Melee Range, turning them into a Symbiotic Fusion."
     },
     {
      "name": "Duration of a Symbiotic Fusion",
      "group": "Symbiotic Fusion",
      "text": "A Symbiotic Fusion has the Ki Upkeep of all Tufflized Family Forms increased by 6 and lasts until the Symbiotic Fusion can no longer afford to pay the Ki Upkeep.\nAdditionally whenever a Symbiotic Fusion has a Tufflized Family Form active, they defuse if they ever choose not to pay the Ki Upkeep."
     },
     {
      "name": "Mechanics of a Symbiotic Fusion",
      "group": "Symbiotic Fusion",
      "text": "For the Duration of a Symbiotic Fusion, all of the following Statistics of the Neo Machine Mutant are transferred to the Symbiotic Fusion:\nClass Features:\nFeats:\nForms:\nHit Die:\nKi Points:\nTechniques:\nAdditionally, the Symbiotic Fusion gains access to all Tufflized Family Forms and must have one active at all times. This effect forcibly ends, or moves if possible, any Power-Up that is currently active to activate the Tufflization Power-Up.\nFinally once a Tufflized Family Form is actived, you may only replace it with a Tufflized Family Form with a higher Ki Upkeep."
     }
    ]
   },
   {
    "name": "Liquification",
    "text": "You have the ability to change your form into an amorphous blob or back to your original form as an Action or Bonus Action on your turn. While in your Blob Form you gain the following benefits:\nYou gain Resistance to all Damage Types except for Destruction or Psychic Damage.\nYou may slip through cracks as small as one inch wide Your Unarmed Strikes deal 1d4 Damage.\nYou can not use the Ki Blast Action or Cast Techniques.\nYou gain Advantage on Stealth Checks.\nTargets gain a negative equal to your Ki Rank when making contested Charisma Checks against you."
   },
   {
    "name": "Nanomachine Form",
    "text": "Your Creature Type is replaced with Construct. and you do not suffer negative effects from not eating.\nAdditionally, your body is composed of reconstructive nanomachines which allow you to rebuild your form when injured. As an Action on your turn you may roll any number of your available Hit Die and regain double that amount in Hit Points."
   },
   {
    "name": "Semi-solid form",
    "text": "Your body flexes against intense pressure, softening the impact. You have Resistance to Fall Damage."
   },
   {
    "name": "Signature Upgrade",
    "text": "A piece of advanced technology has been perfectly integrated into your mechanical form. You gain an option from the High-Tech Parts List, this does not count against your Cybernetic Limit."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_sateery",
  "name": "Sateery",
  "category": "Otherworldly",
  "complete": true,
  "page": 66,
  "description": "Large and goat-like the Sateery are a species capable of living longer than civilizations and almost none have ever been documented to die of old age.",
  "abilityScoreIncrease": "Wisdom +2 or Charisma +2, Intelligence +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "Nature and Arcana Skills",
  "grantedSkills": [
   "Arcana",
   "Nature"
  ],
  "skillChoice": null,
  "features": [
   "Ancient Soul",
   "Buried Instincts",
   "Children of the Capra",
   "Life Force Manipulator",
   "Major Magic"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "Large and goat-like the Sateery are a species capable of living longer than civilizations and almost none have ever been documented to die of old age.",
   "history": "Not much is known about this ancient magic bearing species. They are very far and few and only occasionly reproduce, immediately abandoning their offspring trusting their magic to keep them safe.",
   "society": "One they were a powerful species of magic users, stories suggest they were responsible for teaching the wizard Bibidi magic and were thanked for their generosity with destruction from his later creation, Majin Buu."
  },
  "featureDetails": [
   {
    "name": "Ancient Soul",
    "text": "Your biology is fueled by magic. As a Bonus Action on your turn you can enter the Boosted (Soul) Condition, this condition lasts for a number of rounds equal to your Proficiency Bonus."
   },
   {
    "name": "Buried Instincts",
    "text": "Though your species has evolved far beyond your ancestors, you still have some ingrained characteristics from the ages when they were prey creatures. Whenever a creature passes a Skill Check to find you while you are Hidden or benefiting from Ki Stealth, you are aware that it has happened. Additionally if you have access to sensing energy signatures and the creature would be within its range, you may immediately make a Wisdom (Ki Control) Skill Check to find them without expending Action Economy."
   },
   {
    "name": "Children of the Capra",
    "text": "Your animalistic qualities have made you a particularly agile individual. You are immune to the effects of Difficult Terrain. Additionally, you may choose to change the Damage Type of your Unarmed Strikes to be Slashing or Piercing Damage."
   },
   {
    "name": "Life Force Manipulator",
    "text": "Your body is naturally attuned to the life force of the universe around you. At 1st Level and again at 10th Level, you gain a Trained Feature from the Life Force Manipulation Otherworldly Trained Feature List."
   },
   {
    "name": "Major Magic",
    "text": "At 1st Level you must choose one School of Magic, this can not be changed later. You gain Spells from the chosen list at Character Levels listed below. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for this Spell.\nSpell Levels that have the same number of uses per Short or Long Rest share the number.\nAt 3rd Level, you gain a 2nd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 7th Level, you gain a 4th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to half your Proficiency Bonus, rounded up.\nAt 9th Level, you gain a 5th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Ki Rank.\nAt 11th Level, you gain a 6th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Ki Rank.\nAt 13th Level, you gain a 7th Level or lower Spell You may cast this Spell once per Short or Long Rest."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_saiyan",
  "name": "Saiyan",
  "category": "Otherworldly",
  "complete": true,
  "page": 67,
  "description": "Monkey-tailed warriors known as the “Species of Evolution,” born for conquest with explosive tempers and legendary transformations.",
  "abilityScoreIncrease": "Strength +2, Dexterity or Constitution +1",
  "speed": "30 ft walk",
  "languages": "Common and Sadalan",
  "skills": "Athletics and Acrobatics Skills",
  "grantedSkills": [
   "Athletics",
   "Acrobatics"
  ],
  "skillChoice": null,
  "features": [
   "Saiyan Instincts",
   "Saiyan Sub-Species",
   "Super Saiyan",
   "Super Stomach",
   "Zenkai Boost"
  ],
  "subSpecies": [
   "Universe 7",
   "Universe 6"
  ],
  "lore": {
   "physical": "Saiyans are strange species that bear bear an uncanny resemblence to many different Galactic Citizens, save for their strange monkey-like tails and incredible transformations. Known by many scholars as the “Species of Evolution”, there are certain academic theories that claim that saiyans may share an ancestor with the first lifeforms of the Universes.",
   "history": "Saiyans have a long history of invading and claiming planets to live on, often driving previous inhabitants to extinction. They are a fierce species born with a desire for conquest, but saiyan empires have never been established for long periods and the population remains relatively low.",
   "society": "Saiyan society relies on an unsteady monarchy, ruled by a king. This position can be challenged at any moment by a competitor who believes themselves to be stronger, more worthy of the crown. Beyond that however they tend to stick to their families, in which they hunt, eat, and train with each other. While some might think of saiyans as cold to one another, they are not usually resentful, but respectful of a person’s space. They are typically very aggressive and hard-headed, with short explosive tempers. However, if they care for another, forgiveness comes quickly."
  },
  "featureDetails": [
   {
    "name": "Saiyan Instincts",
    "text": "You add your half your Proficiency Bonus, rounded up, to Initiative and can roll normally even when Suprised.\nAdditionally, you may learn an Art of War Trained Feature as if it were a Feat."
   },
   {
    "name": "Saiyan Sub-Species",
    "text": "Your Saiyan genes vary slightly due to the mix of Saiyans following the Tournament of Power.\nRegardless of your choice, you are eligible for the Super Saiyan God God Form and it’s ritual. You must choose your Sub-Species from the following list, detailed at the end of this Species:\nUniverse 7 “Child of the Great Ape” Universe 6 “Masters of Super Saiyan”"
   },
   {
    "name": "Super Saiyan",
    "text": "The golden form of legend. At Level 5 you gain the Super Saiyan Transformation. Additionally, you gain access to Super Saiyan Form-Specific Modifications as listed in the Form-Specific Modifications Section."
   },
   {
    "name": "Super Stomach",
    "text": "Your energy level is almost seemingly connected to the fullness of your stomach. You require twice as much food as normal to avoid Exhaustion, however anytime that you eat an Attack Cuisine, Bento Boxes, or a unit of Rations you regain 1d6 Stamina. This benefit becomes 1d12 Stamina at 10th Level. You may not benefit from this Feature more times per Long Rest than your Constitution Modifier."
   },
   {
    "name": "Zenkai Boost",
    "text": "When pushed to near death the saiyan spirit is known to rebel against the threat of death, creating a stronger warrior when they are pushed to near death.\nWhenever you fail a Death Saving Throw, roll a d20 Check with a DC starting at 5, increasing by 2 each time you succeed. On a Success you gain 1 Training Boon.\nYou may use this Training Boon immediately, or instead wait until you regain conciousness for the chance at a second Zenkai Boost for more Training Boons.\nThis Feature only activates in times of Mortal Peril, your DM may decide that the situation doesn’t warrant a high enough threat level to induce growth."
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Universe 7",
    "text": "You gain access to Saiyan Feats with the U7 Tag and Feats in the Universe 7 Saiyan section. You also gain the Saiyan Pride , Saiyan Tail, and Warrior Race Features:\nRuthless and battle hungry, Universe 7 Saiyans lived many years as planet conquerors and soldiers with the help of their tail and the mighty great ape transformation.\nSaiyan Tail. Long enough to be wrapped around one’s waist. It cannot lift anything over 10 pounds, and is susceptible to pain. While you have your Tail you may use Great Ape Family Forms.\nIf your tail is ever severed it will regrow after 1d4 weeks. A creature may attempt to make a special Grapple against your tail as an Action, Restraining the Saiyan on a success. The Saiyan has Advantage on the Saving Throw against this Grapple.\nSaiyan Pride. Due to your indomitable spirit and pride you have Advantage on saves against being Charmed or Frightened. You cannot be put to sleep by magical means.\nWarrior Race. At 1st Level and everytime you Level- Up you gain +1 Maximum Hit Points.\ncat warrior"
   },
   {
    "name": "Universe 6",
    "text": "You gain access to Saiyan Feats with the U6 Tag and Feats in the Universe 6 Saiyan section. You also gain the Super Saiyan Superiority Feature:\nOtherwise known as Tail-less Saiyans, these are an alternate, or perhaps even future, evolution to the Universe 7 Saiyans. These Saiyans eventually lost their tails, replacing them with much higher S-Cells numbers.\nThis change resulted in stronger, though slower to obtain, Super Saiyan Forms.\nDecades of Experience. Due to the rise of Saiyans as peacekeepers instead of conquerors, the population had generations to progress their combat abilities. At 1st Level you gain a Paragon Mastery of your choice as if you had gained the Class Feature.\nEvolved Energy. Evolving beyond the use of Great Ape, Universe 6 Saiyans boast incredible energy reserves. At 1st Level and everytime you Level-Up you gain +1 Maximum Ki Point.\nSuper Saiyan Superiority. Saiyans in Universe 6 got to live a much more peaceful lifestyle, this peace and happiness evolved the saiyans into having higher Scell counts than Universe 7 Saiyan. The Super Saiyan gains an additional +1 Power Bonus when used as a Form or Form Modification."
   }
  ]
 },
 {
  "id": "sp_xeno",
  "name": "Xeno",
  "category": "Otherworldly",
  "complete": true,
  "page": 69,
  "description": "Nomadic beings of wholly unique biology and culture, adaptable and technologically gifted.",
  "abilityScoreIncrease": "Increase all Ability Scores by 1 OR increase 2 by 1 and choose a Feat",
  "speed": "35 ft walk",
  "languages": "Common and 1 other Language of your choice",
  "skills": "Technology Skill and one other Skill of your choice",
  "grantedSkills": [
   "Technology"
  ],
  "skillChoice": {
   "count": 1,
   "from": "*"
  },
  "features": [
   "Alien Characteristics",
   "Alien Talent",
   "Millennial Learning Curve",
   "Nearly Unreadable Energy",
   "Xeno Sub-Species"
  ],
  "subSpecies": [
   "Abberation",
   "Beast",
   "Construct",
   "Dragon",
   "Elemental",
   "Fey",
   "Giant",
   "Monstrosity",
   "Ooze",
   "Plant"
  ],
  "lore": {
   "physical": "Some inhabitants of the universe don’t fit into any existing categories and instead feature completely unique biology and culture. They hail from extremely diverse planets and environments, giving them adaptations and traits that almost no other residents across the universe possess.",
   "history": "These individuals tend to follow a nomadic lifestyle, roaming the galaxies rather than sticking to a particular home world. As a result most inhabitants of planets they visit typically refer to them simply as Xenos.",
   "society": "Xenos usually possess sharp intellects and advanced technological skills as they make frequent use of space travel and the mechanisms associated with it, aiding them in their ability to integrate themsleves across the galaxy."
  },
  "featureDetails": [
   {
    "name": "Alien Characteristics",
    "text": "Prerequisite: Xeno Sub-Species\nEvery Xeno is unique, and most of these qualities are extremely potent. Choose two options from the Alien Characteristics List listed on the following page, these can not be changed later.",
    "options": [
     {
      "name": "Determined Survival",
      "text": "Once per Long Rest when you drop to 0 Hit Points, but are not killed outright, you may instead drop to 1 Hit Point."
     },
     {
      "name": "Elemental Organ",
      "text": "You possess a unique anatomical structure that creates an element for you to attack with. Choose one of the following Damage Types, this can not be changed later.\nYou may choose to change the Damage Type of your Techniques to the chosen Damage Type.\nCold Fire Lightning Poison"
     },
     {
      "name": "Eyeless",
      "text": "You lack traditional optic organs but make up for it with other sense. You are always under the Blinded Condition but have Advantage on all Perception Checks related to sensing energy signatures, smell, and sound.\nAdditionally, you gain Blindsight equal to 20x your Ki Rank in Feet."
     },
     {
      "name": "Fast Twitch Muscles",
      "text": "Your muscles are able to react at a moments notice, though you must rebalance yourself afterwards.\nWhenever you use a Snap Decision, you may use your Reaction to gain an additional use of it until the start of your next turn."
     },
     {
      "name": "Flight Bladder",
      "text": "You possess a strange organ that allows you to become bouyant enough to fly. You gain a Base Fly Speed of 5x your Proficiency Bonus or increase your current Base Fly Speed by that same amount."
     },
     {
      "name": "Environmental Skin",
      "text": "Your body is malleable enough to adjust itself to the outside temperatures. You gain Advantage on Saving Throws from effects that would deal Cold Damage or Fire Damage. Additionally, you no longer need to breath, can survive in the vacuum of space, and do not suffer adverse effects from being in environments with extreme cold or extreme heat."
     },
     {
      "name": "Immense Stature",
      "text": "You stand out amongst other xenos due to your size.\nYou are always under 1 Rank of Gigantification."
     },
     {
      "name": "Minor Magic",
      "text": "At 1st Level you must choose one School of Magic, this can not be changed later. You gain Spells from the chosen list at specified Character Levels, listed below.\nThese Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for this Spell.\nAt 3rd Level, you gain a 2nd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 7th Level, you gain a 4th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to half your Proficiency Bonus, rounded up.\nAt 9th Level, you gain a 5th Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Ki Rank."
     },
     {
      "name": "Mighty Tail",
      "text": "You possess a tail long enough to be wrapped around your waist. It cannot lift anything over 30 pounds, and is susceptible to pain. Additionally, you may wield a Weapon that does not have the Heavy Property with it as if it were an additional Off-Hand."
     },
     {
      "name": "Subterranean Adept",
      "text": "You are highly skilled at traveling and hunting from underground. You gain a Burrow Speed equal to your Walk Speed and 30 feet of Tremor Sense."
     }
    ]
   },
   {
    "name": "Alien Talent",
    "text": "You gain strange abilities due to your unique biology.\nChoose one of the following:",
    "options": [
     {
      "name": "Mortal Gifts",
      "text": "At 1st Level and 10th Level, you gain a Mortal Trained Feature of your choice that you qualify for."
     },
     {
      "name": "Otherworldly Talent",
      "text": "At 10th Level, you gain a Otherworldly Trained Features that you fit the Requirements for other than God Ki Creation."
     }
    ]
   },
   {
    "name": "Millennial Learning Curve",
    "text": "You have unique brain chemistry to support your extreme lifespan, due to this they are able to compartmentalize specific knowledge so that it can be remembered and improved on easily.\nAt 1st Level you gain 3 Skill, Tool, or Vehicle Proficiencies of your choice. Each time your Proficiency Bonus increases you gain an additional proficiency of your choice. You may instead gain Expertise in a Skill you already have proficiency in."
   },
   {
    "name": "Nearly Unreadable Energy",
    "text": "Something about your energy makes use nearly undetectable to those without life-sensing technology.\nWhenever a creature would attempt to locate you through use of the Ki Sense Heroic Feat, they have Disadvantage."
   },
   {
    "name": "Xeno Sub-Species",
    "text": "Your alien nature shows itself in a variety of ways. You must choose your Sub-Species from the following list, detailed at the end of this Species:\nAbberation\nBeast\nConstruct\nDragon\nElemental\nFey\nGiant\nMonstrosity\nOoze\nPlant"
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Abberation",
    "text": "Your form defies the normal rules of evolution.\nAbberation Xenos gain the following benefits:\nAbberant Mind. Your mind functions differently than others. You have Resistance to Psychic Damage.\nAbberation Blood. Your blood originates from a strange alternative dimension. Your Creature Type is replaced with Abberation."
   },
   {
    "name": "Beast",
    "text": "You possess qualities usally reserved for animals. Beast Xenos gain the following benefits:\nAnimal Blood. Your blood possesses qualities not usually shared by intelligent species. Your Creature Type is replaced with Beast.\nAnimal Qualities. You possess incredible characteristics. You gain one of the following benefits:\nOne choice from the Limited Bestial Characteristics List.\nTwo choices from the General Bestial Characteristics List.\ncBaetr wgaarmrioor"
   },
   {
    "name": "Construct",
    "text": "You are a synthetic being fueled by an alternative power source. Construct Xenos gain the following benefits:\nHydraulic Fluid. Instead of traditional blood, you possess a sort of fluid to ease the movement of your joints. Your Creature Type is replaced with Construct.\nPrimary Material. Your body is made out of a nonorganic material, giving it special properties. You gain one of the following benefits based on the material of your composition:\nCrystaline. You gain Resistance to Energy Damage.\nMetallic. Choose one of the following between Bludgeoning, Piercing, and Slashing Damage.\nYou gain Resistance to the chosen Damage Type. At Ki Rank 2, and again at Ki Rank 3, you may choose another option that you did not pick.\nRubber-like Form. Whenever you would take Fall Damage, after any Damage Cap would be calculated, you reduce the amount of damage you would take by 50%, rounded up."
   },
   {
    "name": "Dragon",
    "text": "Old and mighty ancestory has led to your creation.\nDragon Xenos gain the following benefits:\nDraconic Blood. Your heart pumps with the thick blood of a dragon. Your Creature Type is replaced with Dragon.\nMighty Wings. At 1st Level, you gain the Flight Heroic Feat, except the Acceleration effect can reach four times your normal Movement Speed."
   },
   {
    "name": "Elemental",
    "text": "Your body is comprised of natural materials empowered by an element. Elemental Xenos gain the following benefits:\nElemental Nature. Choose one Damage Type from the list below, this can not be changed later. The chosen Damage Type becomes the natural Damage Type of your Basic Ki Blasts and Ki Techniques that deal Energy Damage.\nAcid Cold Fire Lightning Thunder Primordial Blood. Your “blood” is actually a magically imbued stream of your energy source.\nYour Creature Type is replaced with Elemental."
   },
   {
    "name": "Fey",
    "text": "Your ancestors are the creatures described in fairy tails.\nFey Xenos gain the following benefits:\nFey Flicker. You may cast the Misty Step Spell without a Casting Cost a number of times per Long Rest equal to your Ki Rank.\nMythical Blood. Your blood is partially comprised of energy from The Weave. Your Creature Type is replaced with Fey."
   },
   {
    "name": "Giant",
    "text": "Born in the dawn of creation, the giants are massive and imposing. Giant Xenos gain the following benefits:\nAncient Blood. Your bloodline comes from the ancient times when all things were more grand. Your Creature Type is replaced with Giant.\nGreat Stature. At 1st Level, you may choose one of the following to gain:\nRescaled (Maxi). You gain 1 Rank of Rescaled (Maxi).\nGigantification. You gain 1 Rank of Gigantification."
   },
   {
    "name": "Monstrosity",
    "text": "You resemble the subjects of ancient tales, a monster in your own right. Monstrosity Xenos gain the following benefits:\nEvil Blood. Dark magic and negative energy can be found when tracing your lineage. Your Creature Type is replaced with Monstrosity.\nMonstrous Power. The might behind your hands makes you understand the stories that scared children. You may treat your Unarmed Strikes as Combat Gauntlets for the sake of casting Armed Techniques."
   },
   {
    "name": "Ooze",
    "text": "Instead of a traditional creature on the web of life, you are an assemblage of goop that gained sentience. Ooze Xenos gain the following benefits:\nFalse Shape. As an Action, you can reshape your body to give yourself the appearance and limbs of a Humanoid Creature, or you can revert to a limbless blob capable of squeezing through spaces as small as one inch. While you have a humanlike shape, you can wear clothing and Armor made for a Humanoid of your size.\nAs a Bonus Action, you can extrude a pseudopod that is up to 6 inches wide and 10 feet long or reabsorb it into your body. As part of the same Bonus Action, you can use this pseudopod to manipulate an object, open or close a door or container, or pick up or set down a Tiny object. The pseudopod contains no sensory organs and can’t attack, activate magic items, or lift more than 10 pounds.\nPlasmic “Blood”. You don’t possess organs or blood like other creatures, only dying if you lose hold of your essence. You can squeeze through a space as narrow as 1 inch wide, provided you are wearing and carrying nothing. Your Creature Type is replaced with Ooze."
   },
   {
    "name": "Plant",
    "text": "You are much more closely related to things like trees than any animal in the Animal Kingdom. Plant Xenos gain the following benefits:\nChlorophyll. Rather than blood, chlorophyll floods through your cells to provide you with energy. Your Creature Type is replaced with Plant.\nPalpable Growth. You are capable of modulating your size for short moments, capitalizing on your strange nature. You can give your Unarmed Strikes additional range equal to 5x your Ki Rank.\nWhenever you use this additional Range, you may choose to replace the Damage Type of your Unarmed Strike with Piercing Damage."
   }
  ]
 },
 {
  "id": "sp_yardratian",
  "name": "Yardratian",
  "category": "Otherworldly",
  "complete": true,
  "page": 73,
  "description": "A relitively small species in comparison to most, standing between 3 and 5 feet tall, Yardratians are a peaceful and deeply spiritual people.",
  "abilityScoreIncrease": "Wisdom +2 or Intelligence +2, Charisma +1",
  "speed": "30 ft walk",
  "languages": "Common and one additional Language of your choice",
  "skills": "Ki Control and History Skills",
  "grantedSkills": [
   "History",
   "Ki Control"
  ],
  "skillChoice": null,
  "features": [
   "Bountiful Energy",
   "Know-How",
   "Masters of Spirit",
   "Powerful Energy",
   "Spirit Control Progenitor"
  ],
  "subSpecies": [],
  "lore": {
   "physical": "A relitively small species in comparison to most, standing between 3 and 5 feet tall, Yardratians are a peaceful and deeply spiritual people. Seperated between 2 visual destinct but otherwise virtually identical species. The breed standing closer to 5 feet tend to be Pink with wrinkled skin and multicolored spots while the smaller breed are smooth skinned and come in a wide variety and gradient of colors.",
   "history": "Not much is known of the ancient history of the Yardratians as most important knowledge is only known by their leader: The Great Elder. Very occasionally a yardratian is born with incredible combat potential and they are quickly exiled after their training is complete to become the guardian of the planet.",
   "society": "The planet of Yardrat funtions as a planetary wide monastary, preaching the understanding and masterery of the Spirit inside of everything. They are an incredibly peaceful people who under normal circumstances never leave their home planet."
  },
  "featureDetails": [
   {
    "name": "Bountiful Energy",
    "text": "Your energy flows far easier then others. Anytime you would regain Ki Points, you regain additional Ki Points equal to your Ki Rank."
   },
   {
    "name": "Know-How",
    "text": "Due to the ever changing nature of your life, it has become easier to learn things as you go and make the best of every opportunity to do so.\nWhenever a Level-Up would not grant you a Technique, you gain one, and you gain an additional Technique every Level beyond 20. Additionally, you gain 1 additional Training Boon each time you have a Training Arc."
   },
   {
    "name": "Masters of Spirit",
    "text": "Prerequisite: Spirit Control Progenitor Species Feature\nYou have spent your life in tune with your own spirit and due to this you can manipulate it with little effort.\nYou gain the option to reduce the casting time of any Spirit Control Trained Feature you use by 1 step, minimum Bonus Action. You do not lose access to prior Casting Times."
   },
   {
    "name": "Powerful Energy",
    "text": "Your energy is so dense that it can bore through defenses. Your Basic Ki Blasts ignore Resistance to Energy Damage."
   },
   {
    "name": "Spirit Control Progenitor",
    "text": "At 1st Level, you gain one Trained Feature of your choice from the Spirit Control Trained Feature List. You also gain an additional Trained Feature from the list each time your Ki Rank increases."
   }
  ],
  "subSpeciesDetails": []
 },
 {
  "id": "sp_zoolatar",
  "name": "Zoolatar",
  "category": "Otherworldly",
  "complete": true,
  "page": 74,
  "description": "Standing between 4 and 6 feet fully grown, the Zoolatar all resemble various kinds of bipedal animals.",
  "abilityScoreIncrease": "Dexterity +2 or Strength +2, Constitution +1",
  "speed": "30 ft walk",
  "languages": "Common and 1 additional Language of your choice",
  "skills": "Survival and Acrobatics Skills",
  "grantedSkills": [
   "Acrobatics",
   "Survival"
  ],
  "skillChoice": null,
  "features": [
   "Divine Endurance",
   "Erinys Soul",
   "Incredible Energy",
   "Predatory Combat",
   "Zoolatar Sub-Species"
  ],
  "subSpecies": [
   "Airavatan",
   "Húxiān",
   "Maahen",
   "Ninkilim",
   "Sekhmen",
   "Tu’er Yen"
  ],
  "lore": {
   "physical": "Standing between 4 and 6 feet fully grown, the Zoolatar all resemble various kinds of bipedal animals.",
   "history": "Across the universe, there exists animal-like species that possess otherworldly combat potential. These species are commonly sought out as candidates for Gods of Destruction.",
   "society": "The Zoolatar do not possess a traditional society, rather they enjoy roaming the universe in search of a planet that may worship them for their abilities."
  },
  "featureDetails": [
   {
    "name": "Divine Endurance",
    "text": "Though not actually divine, the toughness of the Zoolatar is such that it is not hard to make the mistake.\nSelect an Ability Score. You are Proficient in Saving Throws with the selected Ability Score."
   },
   {
    "name": "Erinys Soul",
    "text": "You hold within you the capability of pure divine wrath.\nAs a Bonus Action on your turn you can enter the Enraged Condition, this Condition lasts for a number of rounds equal to your Proficiency Bonus.\nEach additional time you choose to use this Feature after it ends, you gain 1 Rank of Exhaustion."
   },
   {
    "name": "Incredible Energy",
    "text": "Zoolatar possess incredible spirits that grant their energy unique properties. Choose one of the Damage Types listed below, this can not be changed later:\nCold\nFire\nLightning\nYou may choose to replace any Energy Damage that you would deal with your Basic Ki Blasts or Techniques with the chosen Damage Type. At Level 10 the chosen Damage Type ignores Resistance and treats Immunity as Resistance."
   },
   {
    "name": "Predatory Combat",
    "text": "Your animalistic nature shines in combat. You may choose to treat your Unarmed Strikes as Combat Gauntlets.\nAdditionally if you take the Attack Action or cast a Spell or Technique that deals Damage before doing anything else on your turn, you gain a +1 Stable Power until the start of your next turn."
   },
   {
    "name": "Zoolatar Sub-Species",
    "text": "You belong to one of the various animal-like species of the Zoolatar. At 1st Level you must choose one Sub- Species to gain the benefits from, detailed at the end of this Species:\nAiravatan\nHúxiān\nMaahen\nNinkilim\nSekhmen\nTu’er Yen"
   }
  ],
  "subSpeciesDetails": [
   {
    "name": "Airavatan",
    "text": "While a Zoolatar rarely dies of old age, the Airavatan are rumored to be the longest living species and are usually found on peaceful savannah planets.\nAn Elephant Never Forgets. Something about your breed of Zoolatar grants you an incredible memory.\nYou gain the Keen Mind Feat. Additionally, you have Advantage on History Checks.\nMagnificent Trunk. You possess a powerful trunk that functions as a third primary limb, capable of wielding a Weapon or manipulating objects."
   },
   {
    "name": "Húxiān",
    "text": "As a Húxiān, you gain the following benefits:\nSilver Tongue. You are commonly referred to as the most well spoken of the Zoolatar. You gain a Static Bonus to Charisma Checks equal to your Ki Rank.\nTail Multiplication. You have the ability to split your tail into multiple copies of itself momentarily. As a Reaction whenever you would take the Flurry Snap Decision, you may reduce its Casting Cost by half for the rest of your turn."
   },
   {
    "name": "Maahen",
    "text": "Proud and powerful, the Maahen are a lion-like variant of the Zoolatar that prefer to live on lush green planets.\nMaahen find the that the beauty of the worlds that they live on is how one determines their worth as a god to the denizens of their planets.\nAs a Maahen, you gain the following benefits:\nIncredible Roar. You can explode your spirit out further through the use of a heartfelt roar. A number of times per Rest equal to your Ki Rank whenever you cast a Technique with a range of Emanation, you can use your Reaction to increase the range by 5x your Ki Rank in feet.\nPride of a God. You possess a personal pride and willpower that puts other Zoolatar to shame. You gain a Static Bonus equal to your Ki Rank against all Saving Throws against the Charmed Condition, Frightened Condition, or Spells that would force you to take a specific Action."
   },
   {
    "name": "Ninkilim",
    "text": "Usually found on planets teeming with fields and woodlands, the Ninkilim are a powerful yet small Zoolatar that are always on the move.\nAs a Ninkilim, you gain the following benefits:\nBright Eyed and not so Bushy Tailed. You are always on the top of your game. A number of times per Long Rest equal to your Ki Rank, you may regain the use of a Snap Decision that you have taken.\nQuick Thinker. You are sometimes referred to as a rat due to how conniving you can be. You gain a Static Bonus to Intelligence Checks equal to your Ki Rank."
   },
   {
    "name": "Sekhmen",
    "text": "Sometimes called “sphinxes”, the Sekhmen prefer warm and dry climates and possess an insatiable appetite for decadence. Whenever these Zoolatar are not sleeping, they are finding “playthings” to combat for exercise.\nAs a Sekhmen, you gain the following benefits:\nCat Nap. You understand the value of a good nap.\nOnce per day whenever you perform a Short Rest, you may regain all expended Stamina Points.\nIncredible Power. You are known as one of the most powerful variants of Zoolatar, possessing strength as deadly as their claws. You may treat your Unarmed Strikes as Combat Gauntlets that deal Slashing Damage."
   },
   {
    "name": "Tu’er Yen",
    "text": "As graceful as they are deadly, the Tu’er Yen are one of the more rare types of Zoolatar. Preferring deserted and rocky planetoids where they may dig to their hearts content, many Tu’er Yen are known to make their home on various moons.\nAs a Tu’er Yen, you gain the following benefits:\nLunar Tunnler. Your nails are adapted for moving large quantities of the ground at once. You gain a Burrow Speed equal to your Walk Speed.\nVoice of the Dirt. Due to generation of staying underground, you have an incredible perception of vibrations around you. You gain Tremorsense for a number of feet equal to 10x your Ki Rank."
   }
  ]
 }
];

// Heritages (Ch.3, p.32 and pp. 78–88). General ones are open to anyone;
// Restricted ones name the species they're for or not for.
export const HERITAGE_RULE = "You may swap out up to three of the Species Features provided by your Species with an equal amount of Heritage Features provided by a Heritage. If anything would check your Species Features, they also check your Heritage Features.";
export const HERITAGE_SWAP_LIMIT = 3;
export const HERITAGE_DATA = [
 {
  "id": "her_blessing_of_komedi",
  "name": "Blessing of Komedi",
  "type": "General",
  "page": 78,
  "note": "Joke Character",
  "rule": null,
  "restriction": null,
  "description": "Sometimes during the birth of a creature the Universe itself takes notice, and laughs at them. Those carrying the divine blessing of Komedi are born with unholy amounts of luck, though no one can ever truly determine if it is good or bad.",
  "features": [
   {
    "name": "Divine Comedy",
    "text": "Whenever you roll a 1 on a d20 roll, you may treat it as a 20, however the next 20 you roll becomes a 1, this Feature can then be used again.\nThis Feature persists between game sessions."
   },
   {
    "name": "Shenanigans",
    "text": "Something always seems to go wrong when people attack you. A number of times equal to your Ki Rank, you may perform the Block Snap Decision without expending Stamina."
   },
   {
    "name": "Wacky Antics",
    "text": "Something about the way you carry yourself can make those around you burst into laughter. An amount of times per Long Rest equal to half of your Proficiency Bonus, you may know and may cast Tasha’s Hideous Laughter Spell as if through the Mysticism Class Feature. You may also Master this Spell as if it were a Technique without a Class Feature to allow you to do so."
   }
  ]
 },
 {
  "id": "her_experiment",
  "name": "Experiment",
  "type": "General",
  "page": 78,
  "rule": null,
  "restriction": null,
  "description": "Rigorous experimentation on your DNA has left you partially merged with another Species.",
  "features": [
   {
    "name": "Genetic Recreation",
    "text": "Granted with a variety of DNA from several species, you’re now capable of mimicking abilities from other species. Choose three options from the Genetic Recreation List listed at the end of this Species, these can not be changed later.\nAlternatively, you may forego one option from the Genetic Recreation List to instead choose one Genetic Recreation that you have access to, gaining its Genetic Advancement.",
    "options": [
     {
      "name": "Bestial Replication",
      "text": "Your body is incorporated with some characteristics to animals. At 1st Level, choose one option from the Bestial Characteristic List listed at the end of the Beasmen Species.\nGenetic Advancement. At 5th level, you gain an additional option from the Bestial Characteristic List."
     },
     {
      "name": "Enhanced Defenses",
      "text": "Your body is naturally durable and is capable of defending itself through much more punishment. You gain Resistance to one of the following damage type:\nAcid\nBludgeoning\nCold\nFire\nLightning\nPiercing\nPoison\nSlashing\nGenetic Advancement. At 5th Level, you gain an additional Resistance that you did not choose."
     },
     {
      "name": "Half-Heroic Spirit",
      "text": "While not as determined as others, your DNA possess the capability of awakening the spirit of a hero. At 1st Level, you gain a single Heroic Feat. This does not count as gaining a Heroic Feat as a Class Feature Genetic Advancement. At 5th Level, you gain an additional Heroic Feat."
     },
     {
      "name": "Inherent Knowledge Replication",
      "text": "You were integrated with some inherent knowledge within your brain. At Level 1, you gain one Trained Feature from the Mortal Trained Feature List.\nGenetic Advancement. At 10th Level, you gain an additional Trained Feature from the Mortal Trained Feature List."
     },
     {
      "name": "Inherent Magical Replication",
      "text": "You were integrated with minor levels of magic within you, capable of using it to your advantage. At 1st Level you must choose one School of Magic, this can not be changed later. You gain Spells from the chosen list at specified Character Levels, listed below. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for these Spell.\nSpell Levels that have the same number of uses per Short or Long Rest share the number.\nAt 1st Level, you gain a 1st Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nAt 3rd Level, you gain a 2nd Level or lower Spell You may cast this Spell a number of times per Short or Long Rest equal to your Proficiency Bonus.\nGenetic Advancement. At 5th Level, you gain a 3rd Level or lower Spell\nYou may cast this Spell a number of times per Short or Long Rest equal to your Ki Rank."
     },
     {
      "name": "Integrated Bio-Android",
      "text": "You were created with Android Parts within your body.\nYou gain an option from the High-Tech Parts List, this does not ocunt against your Cybenetic Limit.\nGenetic Advancement. Your chosen option from the High-Tech Parts List counts as Advanced Tech."
     },
     {
      "name": "Maximum Size Adjustment",
      "text": "Your body was made bigger than others. At 1st Level, you permanently gain 1 Rank of Rescaled (Maxi).\nGenetic Advancement. At 10th Level, you permanently gain an additional Rank of Rescaled (Maxi)"
     },
     {
      "name": "Minor Elementalist",
      "text": "You are capable of manifesting elements within your ki, being capable to minorly replciate an element. Choose one Damage Type from the list below, this can not be changed later, you may change your Basic Ki Blast’s Damage Type to the chosen Damage Type\nAcid Cold Fire Lightning Poison\nGenetic Advancement. At 5th Level, anytime you cast a Technique you may change its Damage Type to your chosen Damage Type"
     },
     {
      "name": "Regeneration Replication",
      "text": "You become capable of regenerating your body, even if somewhat inefficiently. You have access to a pool of Hit Points equal to your Maximum Ki Points. As an Action on your turn, you may expend any number of Hit Points from this pool to regain that many. This can not raise you above your Hit Point Maximum. The pool refereshes on a Long Rest Genetic Advancement. As an Action on your turn, you may expend 15 of these Hit Points to regenerate a limb lost due to the Crippled Condition."
     },
     {
      "name": "Semi-Know How",
      "text": "Due to the ever changing nature of the species within you, it has becomes easier to learn things as you go.\nWhenever a Level-Up would not grant you a Technique, you gain one, and you gain an additional Technique every Level beyond 20.\nGenetic Advancement. You gain 1 Additional Training Boon each time you have a Training Arc."
     },
     {
      "name": "Stretchy Body Replication",
      "text": "The DNA within your body allows your body to become more malleable than before, allowing you to stretch your body. Increase your Melee Range by 5 feet. This increases by 5 feet again at Ki Rank 3.\nGenetic Advancement. At Ki Rank 2, you may ignore the negative of performing Grapple Checks on creatures a Size Category larger than you."
     },
     {
      "name": "Transformation Replication",
      "text": "The DNA within your body allows you to replicate a species transformation. Choose one Biology Form, at 5th Level, you gain the chosen option. This form cannot be a God Form.\nGenetic Advancement. You now gain access to all Feats and Form Modification to the Biology Form. If all Feats and Form Modifications would require you to have the Species Feature, then you count as having it for the purpose of Feats and Form Modifications."
     }
    ]
   }
  ]
 },
 {
  "id": "her_mutant",
  "name": "Mutant",
  "type": "General",
  "page": 81,
  "rule": null,
  "restriction": null,
  "description": "Whether through a genetic abnormality or just chance your genetics are strange when compared to the rest of your species.",
  "features": [
   {
    "name": "Limitless",
    "text": "You seem to have a higher ceiling for strength then others. The amount of Power that you need to have before you go into Overload is increased by your Ki Rank."
   },
   {
    "name": "Neverending Energy",
    "text": "You never seem to tire. At 1st Level and everytime you Level-Up you gain an additional 1 Maximum Stamina.\nAdditionally you may ignore the negative effects of 1 Rank of Exhaustion, though you still die at 6."
   },
   {
    "name": "Titanic Vitality",
    "text": "At 1st Level and everytime you Level-Up you gain +1 Maximum Hit Points. Additionally when you would make any Saving Throw, you may choose to do so at Advantage. You may gain Advantage in this way an amount of times equal to your Ki Rank per Long Rest."
   },
   {
    "name": "Uncontrollable Power",
    "text": "Your power seems to be magnified and hard to control.\nAll Forms you use gain a +1 Power Bonus. Additionally, the amount of Power that you need to have before you go into Overload is reduced by your Ki Rank."
   }
  ]
 },
 {
  "id": "her_reincarnation",
  "name": "Reincarnation",
  "type": "General",
  "page": 81,
  "note": "Optional",
  "rule": null,
  "restriction": null,
  "description": "",
  "features": [
   {
    "name": "Awakening Spirit",
    "text": "Choose a Species that is not your Species, this is now your Reincarnated Species. This Heritage Feature does not replace the original Species Feature. At 3rd Level, you may replace the Species Feature with a Species Feature from your Reincarnated Species of your choice.\nAdditionally, choose one of the following:\nYour Maximum Hit Points are reduced by 1 to a minimum of 1. You reduce your Maximum Hit Points by 1 per every level thereafter Your Maximum Ki Points are reduced by 2 to a minimum of 1. You reduce your Maximum Hit Points by 2 per every level thereafter Your Maximum Stamina Points are reduced by 1 to a minimum of 1. You reduce your Maximum Stamina Points by 1 per every odd level thereafter"
   },
   {
    "name": "Refined Spirit",
    "text": "Prerequisite: Awakening Spirit Heritage Feature\nAt 5th Level, you may replace the Species Feature with a Species Feature from your Reincarnated Species of your choice. Additionally, choose one of the options that you did not choose on the Awakening Spirit Heritage Feature"
   },
   {
    "name": "True Spirit",
    "text": "Prerequisite: Refined Spirit Heritage Feature At 7th\nLevel, you may replace the Species Feature with a Species Feature from your Reincarnated Species of your choice. Additionally, choose one of the options that you did not choose on the Awakening Spirit and Refined Spirit Heritage Feature"
   }
  ]
 },
 {
  "id": "her_speedster",
  "name": "Speedster",
  "type": "General",
  "page": 82,
  "rule": null,
  "restriction": null,
  "description": "Blessed with the gift of super speed for one reason or another, you are the embodiment of “Gotta go fast”.",
  "features": [
   {
    "name": "Born for Speed",
    "text": "You were made to go fast and push yourself for even more speed and agility. At 1st Level you gain the Super Speed Power-Up."
   },
   {
    "name": "Natural Speed",
    "text": "You are light on your feet with seemingly no effort. Your Base Movement Speed increases by 10ft x your Ki Rank and you are not affected by Difficult Terrain that is tied to the surface that you are standing on."
   },
   {
    "name": "Velocity Combat",
    "text": "Prerequisite: Born for Speed Heritage Feature\nYour speed is so impressive that you can channel it into incredible feats. At 1st Level you may add the Velocity Combat Super Technique Line to your Learnable Technique List."
   }
  ]
 },
 {
  "id": "her_cyborg",
  "name": "Cyborg",
  "type": "Restricted",
  "page": 82,
  "rule": "Unavailable to the Android Species",
  "restriction": {
   "not": {
    "species": "Android"
   }
  },
  "description": "You’ve been rebuilt, they had the technology, and now your body is as much man as machine.",
  "features": [
   {
    "name": "Crank Generator",
    "text": "Your body possess a special generator that recycles energy you are hit with into a resource for you.\nWhenever you take damage that isn’t Destruction, you regain an amount of Ki Points equal to (1/2 x the damage you took)."
   },
   {
    "name": "Signature Upgrade",
    "text": "A piece of advanced technology has been perfectly integrated into your mechanical form. You gain an option from the High-Tech Parts List, this does not count against your Cybernetic Limit."
   },
   {
    "name": "Upgrade Compatability",
    "text": "Your electronics are primed for upgrade. You do not gain any Negatives for Installing High-Tech Parts.\nAdditionally, your Creature Type is replaced with Construct."
   }
  ]
 },
 {
  "id": "her_daemonchilde",
  "name": "Daemonchilde",
  "type": "Restricted",
  "page": 83,
  "rule": "Unavailable to Otherworldly Species",
  "restriction": {
   "not": {
    "category": "Otherworldly"
   }
  },
  "description": "Occasionally, a mortal is able to mix their bloodline with that of a member of the Demon Realm. This union results in a mortal with demonic features.",
  "features": [
   {
    "name": "Call of the Demon King",
    "text": "Your DNA remembers yours ancestor’s hellish existence, causing you to sometimes fly into a rage.\nOnce per Long Rest whenever you roll Initiative, you may choose to gain the Enraged Condition for a number of rounds equal to your Ki Rank. At the end of this duration, you gain 1 Rank of Exhaustion.\nWhenever you hit Ki Rank 3, this Feature no longer grants a Rank of Exhaustion."
   },
   {
    "name": "Extended Lifespan",
    "text": "Your demonic heritage allows you to outlive many of your constituents. You are treated as an Otherworldly Species when effected by the Altered Condition."
   },
   {
    "name": "Hellish Marking",
    "text": "You have a signature demonic feature that cements your connection to the Demon Realm. At 1st Level, you gain one option from the Demon World Magic List."
   },
   {
    "name": "Soul of a Demon",
    "text": "Regardless of your mortal nature, you possess the spirit of a demon. You gain one of the following Creature Types to have alongside your natural Creature Type, this can not be changed later:\nCelestial\nFiend\nInfernal"
   },
   {
    "name": "Vestigial Magic",
    "text": "You gain one 1st Level Spell of your choice. You may cast this spell a number of times per Short or Long Rest equal to your Proficiency Bonus. These Spells can only be cast at their lowest Spell Level and Charisma is your Spellcasting Modifier for this Spell."
   }
  ]
 },
 {
  "id": "her_hybrid",
  "name": "Hybrid",
  "type": "Restricted",
  "page": 83,
  "rule": "Unavailable to Otherworldly Species",
  "restriction": {
   "not": {
    "category": "Otherworldly"
   }
  },
  "description": "Your parents were not the same species, though were close enough to still produce someone like you.",
  "features": [
   {
    "name": "Diluted Blood",
    "text": "Choose a Mortal Species that is not your Species, this is now your Hybrid Bloodline. You may replace this Heritage Feature with a Species Feature from your Hybrid Bloodline"
   },
   {
    "name": "Mixed Blood",
    "text": "Prerequisite: Diluted Blood Heritage Feature\nThe blood of your Father is strong in your veins. You may replace this Heritage Feature with a Species Feature from your Hybrid Bloodline"
   },
   {
    "name": "Potent Blood",
    "text": "Prerequisite: Mixed Blood Heritage Feature\nThe blood of your Father is so strong that it is can be hard to tell which parent was which. You may replace this Heritage Feature with a Species Feature from your Hybrid Bloodline"
   },
   {
    "name": "Unstable Genetics",
    "text": "Prerequisite: Diluted Blood Heritage Feature\nThe mixture of genetics leads to issues with your psyche. Once per Long Rest you may use your Bonus Action to gain the Enraged Condition for a number of Rounds equal to your Proficiency Bonus."
   }
  ]
 },
 {
  "id": "her_prehistoric_blood",
  "name": "Prehistoric Blood",
  "type": "Restricted",
  "page": 84,
  "rule": "Only available to the Saiyan Species",
  "restriction": {
   "only": {
    "species": "Saiyan"
   }
  },
  "description": "Born in ancient times, these Prehistoric Saiyans boast a potent, primal Ki that drives them to seek out powerful foes to test themselves in battle. Though many are prime examples of ‘survival of the fittest’ or ‘might makes right’, there are still kind-hearted Saiyans to be found among the brutish bunch.",
  "features": [
   {
    "name": "Nose For Battle",
    "text": "You possess the uncanny ability to sniff out life around you. You gain the following new Bonus Action:\nSmell Energy. As a Bonus Action on your turn, you can use the Search Action in an Emanation with a radius equal to 60ft x your Ki Rank to detect energy signatures. Perform a Wisdom (Ki Control) Skill Check which the DM will check against the Passive Ki Stealth, or Active Ki Stealth if available, of all creatures within range that are not Constructs or Undead. Until the end of your next turn, you become aware of the location of all creatures whose Ki Stealth was exceeded by your Ki Control Skill Check. Additionally, you may choose to maintain Concentration and choose one creature that you find using this Action and learn the following information for as long as you maintain Concentration:\nLocation of the Creature If the Creature has the Bloodied, Critical, Incapacitated, or Unconscious Conditions The current Power Bonus of the Creature"
   },
   {
    "name": "Prehistoric Sub-Species",
    "text": "In the ancient times there were two distinct bloodlines of Saiyans that rose to great power before seemingly vanishing. You must choose one of the following Sub- Species to gain the benefits of, detailed at the end of this section:\nSaiyan God Blood\nDark Saiyan Blood",
    "options": [
     {
      "name": "Dark Saiyan Blood",
      "text": "There once was a Saiyan born with such dark malice in his heart that his very soul darkened to the point that it stained his lineage. You gain the following benefits:\nPowerful Saiyan Tail. Long enough to be wrapped around one’s waist. It cannot lift anything over 10 pounds, and is susceptible to pain. Additionally, you may wield a Light Weapon with it as if it were an additional Off-Hand. If your tail is ever severed it will regrow after 1d4 weeks. While you have your Tail you may use Great Ape Forms.\nTainted Energy. The darkness in your veins has lead to the manifestation of a dark energy. At 1st Level you gain the Dark Saiyan Power-Up and you may use this Form as a Form-Specific Modification for the Super Saiyan Form."
     },
     {
      "name": "Saiyan God Blood",
      "text": "You gain the following benefits:\nPowerful Saiyan Tail. Long enough to be wrapped around one’s waist. It cannot lift anything over 10 pounds, and is susceptible to pain. Additionally, you may wield a Light Weapon with it as if it were an additional Off-Hand. If your tail is ever severed it will regrow after 1d4 weeks. While you have your Tail you may use Great Ape Forms.\nRemnants of the Divine. The powers of the first Super Saiyan God still runs in your blood, however diluted. You gain the Burst of S-Cells Power-Up.\nAdditionally at 15th Level, you gain the Super Saiyan God Godly Transformation."
     }
    ],
    "replaces": "Saiyan Sub-Species"
   },
   {
    "name": "War-Torn World",
    "text": "An amount of times equal to your Ki Rank, when you would reach half of your Maximum Hit Points or an ally would reach 0 Hit Points, you gain the Enraged Condition for an amount of rounds equal to your Proficiency Bonus. You regain all expended uses on a Long Rest."
   }
  ]
 },
 {
  "id": "her_s_cell_overload",
  "name": "S-Cell Overload",
  "type": "Restricted",
  "page": 86,
  "rule": "Only available to the Saiyan Species",
  "restriction": {
   "only": {
    "species": "Saiyan"
   }
  },
  "description": "The Saiyan’s ability to adapt can occasionally lead to genetic instability, namely an overproduction of S-Cells.\nThis condition can present itself in a multitude of ways, each devastatingly powerful.",
  "features": [
   {
    "name": "Berserker Sub-Species",
    "text": "There are a multitude of ways that your mutation can present itself. You must choose one of the following Sub-Species to gain the benefits of, detailed at the end of this section:\nFull Power Mutation\nMonstrous Mutation\nB-Type Mutation",
    "options": [
     {
      "name": "Full Power Mutation",
      "text": "Your body is naturally durable and strong whereas your Super Saiyan, while powerful, appears unable to be naturally mutated further. You gain the following benefits.\nSuper Saiyan Full Power. At 5th Level or whenever you would first become Enraged, whichever comes first, you gain the Full Power Super Saiyan Form.\nAdditionally, Full Power Super Saiyan is treated as Super Saiyan for the sake of the Super Saiyan God God Form.\nPowerful Body. You are treated as one Size Category larger than you would normally be for the sake of the Launch Mechanic."
     },
     {
      "name": "Monstrous Mutation",
      "text": "Your mutantion runs rampant, pushing you into rage fueled episodes of incredible power. You gain the following benefits:\nExplosive Wrath. Whenever you witness the following events happen, you automatically gain the Enraged Condition:\nYou or an Allied Creature gains the Critical Condition for the first time since your last Long Rest.\nYou or an Allied Creature are subjected to a Critical Hit.\nYou or an Allied Creature are subjected to an Ultimate Technique.\nMonstrous Super Saiyan. At 5th Level or whenever you would first become Enraged, whichever comes first, you gain the Monstrous Super Saiyan Form.\nAdditionally, you gain access to Super Saiyan Form- Specific Modifications as listed in the Form-Specific Modifications Section."
     },
     {
      "name": "B-Type Mutation",
      "text": "Legends tell of a Saiyan that, in a blind rage after his life was threatened, destroyed the galaxy and rode the explosion to safety. Saiyans of this calibur are known as B-Type Saiyans. You gain the following benefits:\nSuper Saiyan B-Type. At 5th Level or whenever you would first become Enraged, whichever comes first, you gain the Super Saiyan B-Type Form.\nAdditionally, you gain access to Super Saiyan Form- Specific Modifications as listed in the Form-Specific Modifications Section.\nWill to Live. As a Reaction, when you would hit 0 Hit Points but aren’t killed outright, your Hit Points instead change to a number equal to twice your Character Level and for a number of rounds equal to your Proficiency Bonus, you gain the Enraged Condition. You only gain the benefit of this Feature once per Long Rest."
     }
    ],
    "replaces": "Super Saiyan"
   },
   {
    "name": "Bubbling Energy",
    "text": "You’re never quite able to pull back the power of your Super Saiyan abilities due to how much power you held in at all times. You gain the following effects:\nIncredible Energy Stores. You gain an additional +1 Maximum Stamina at 1st Level and every time you Level-Up.\nMaddening Rage. The natural duration of the Enraged Condition is doubled for you.\nWeak Minded. You have Disadvantage on Berserk Saving Throws and Saving Throws against the Charmed Condition.",
    "replaces": "Saiyan Instincts"
   },
   {
    "name": "“Evil Saiyan”",
    "text": "Prerequisite: Saiyan Sub-Species (Universe 6) Species Feature, Berserker Sub-Species Heritage Feature\nLegends in Universe 6 talk about a Saiyan with so much power that they could transform and lay siege with the entire universe should they be able to control it, those that look at you even start to believe it’s true. All Super Saiyan Family Forms gain +1 Power Bonus as well as +5 Ki Upkeep."
   },
   {
    "name": "Mighty Ape",
    "text": "Prerequisite: Saiyan Sub-Species (Universe 7) Species Feature\nYour massive energy levels have leaked into your Great Ape form. While in the Great Ape Form you gain an additional Rank of Gigantification and +1 Power while the Berserk DC of the Great Ape Form increases by an additional +1 every time you succeed the Berserk Saving Throw.\nAdditionally, the Oozaru: Controlled Biology Feat does not allow you automatically succeed the Berserk Saving Throw for Great Ape."
   }
  ]
 },
 {
  "id": "her_saiyan_blood",
  "name": "Saiyan Blood",
  "type": "Restricted",
  "page": 88,
  "rule": "Unavailable to the Saiyan Species",
  "restriction": {
   "not": {
    "species": "Saiyan"
   }
  },
  "description": "Saiyans have the uncanny ability to mix with a variety of species across the universe, imparting a portion of the saiyan’s incredible abilities to their offspring. These children are said to have incredible potential, using the abilities of the Saiyans to push themselves past the power of their other half.",
  "features": [
   {
    "name": "Emotions Unknown",
    "text": "Your Saiyan genes acted to heighten the emotions that you are capable of feeling, rather than hinder them.\nOnce per Long Rest as a Bonus Action on your turn, you may gain the Enraged Condition for a number of rounds equal to half of your Proficiency Bonus, rounded up.\nAdditionally if you have the Hybrid Super Saiyan Species Feature, you instead gain the Super Saiyan Form and Super Saiyan Form-Specific Modifications at the following Character Levels.\nSuper Saiyan Form : Character Level 3 Ascended Super Saiyan Form Modification :\nCharacter Level 7 Ultimate Super Saiyan Form Modification :\nCharacter Level 10"
   },
   {
    "name": "Hybrid Super Saiyan",
    "text": "You still possess S-Cells despite not being a full Saiyan.\nAt Level 5 you gain the Super Saiyan Transformation.\nAdditionally, you gain access to Super Saiyan Form- Specific Modifications at 2 Character Levels above what is listed in the Form-Specific Modifications Section."
   },
   {
    "name": "Incredible Potential",
    "text": "Your mixed genetics cause you to have a higher starting position of strength. A number of times equal to your Proficiency Bonus whenever you Learn a Technique, you may immediately Master it a single time."
   },
   {
    "name": "Proud Saiyan Heritage",
    "text": "Your Saiyan genes remain strong at their core.\nRegardless of your choice, you are eligible for the Super Saiyan God God Form and it’s ritual. You must choose your Sub-Species from the following list, detailed at the end of the Saiyan Species:\nUniverse 7 “Child of the Great Ape” Universe 6 “Masters of Super Saiyan”"
   }
  ]
 }
];
