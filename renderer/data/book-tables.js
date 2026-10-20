const BOOK_TABLES = [
  {
    id: "lingering_injury", name: "Lingering Injury Table", die: "1d20", source: "Book — Crippled Condition",
    rows: [
      { range: "1", result: "Lose an Eye. Disadvantage on Perception (sight) checks, -2 to Ranged/Shot Attack Rolls. Regenerate (or losing all eyes) can fix/change this." },
      { range: "2", result: "Lose an Arm or Hand. Can only hold one object; Casting Time of Action/Bonus Action Techniques increases by 1 step. A 4th-level+ healing spell restores it." },
      { range: "3", result: "Lose a Foot or Leg. Walk Speed halved, need a cane/crutch/prosthesis. A 4th-level+ healing spell restores it." },
      { range: "4", result: "Tailless. Permanently lose your tail (and any regrow feature) if your Species has one. 4th-level+ healing regenerates it." },
      { range: "5-7", result: "Major Internal Injury. Once per combat on an Action, DC 20 Con save or gain Dazed until your next turn. Heals with 6th-level+ healing or 10 days of rest." },
      { range: "8-10", result: "Minor Internal Injury. As Major Internal Injury, but DC 15." },
      { range: "11-13", result: "Horrible Scar. -1 to Persuasion, +1 to Intimidation. Removed by 2nd-level+ healing." },
      { range: "14-16", result: "Festering Wound. Lose 1 Max HP every 24 hours until treated (dies at 0). Magical healing cures it, or DC 15 Medicine check once/24hrs, 10 successes needed." },
      { range: "17-20", result: "Minor Scar. No mechanical effect. Removed by 2nd-level+ healing." },
    ],
  },
];

// DM Playbook — Yoohar's Unofficial 5.0 DM Playbook, uploaded reference content.
const DM_PLAYBOOK = [
  {
    section: "Encounter Design",
    entries: [
      { title: "Variables to Consider", body: "Before structuring an encounter, know player capabilities: average damage/round, average AC, average Save DC and to-hit for their common attacks, average movement speed. Beyond numbers, consider items/potions, Ki-sapping abilities, healers in the party, status conditions available to them, and their damage types dealt/resisted. Don't consider all factors every fight — leave room for creative problem-solving. Attack-roll-centric builds have swingy, hard-to-predict DPR (100% or 0% propositions)." },
      { title: "Gentlemen's Agreement", body: "Balance around a player's base stat line, not their fully powered-up state — if a player gets a +1 Weapon, don't raise all future enemy AC by +1 to compensate. In exchange, ask players to power up gradually across a fight's rounds rather than turning everything on turn one, so enhancements actually feel like a difference." },
      { title: "Introduce Fundamentals Early, Weakly", body: "Introduce damage resistances and condition immunities early in small doses (a Piercing resistance here, a Frightened immunity there) so players know these mechanics exist before they matter. Encourage party roles/unique playstyles so no single damage type renders a character useless." },
      { title: "Encountering Flaws Can Lead to Paranoid Preparation", body: "Watch for players over-covering every possible weakness until characters become homogenized (everyone just picks whatever counters the last enemy). It's fine for players to shore up a real weak point — just keep giving them moments of effectiveness with their existing kit often enough that weaknesses don't feel like mandatory holes to patch." },
      { title: "Draw Out Resources and Test Endurance", body: "5.0's caps make attrition realistic again. Chip at HP/Stamina before a set-piece encounter — a hazard that saps Stamina, a Skill Check with real stakes. Exhaustion works well as a trade rather than a punishment (auto-succeed a dire check in exchange for a Rank). Rests are precious: after level 5, stop guaranteeing a Long Rest before/after every encounter, and give Short Rests only after 1-2 encounters. Ease into this gradually to avoid an accidental TPK." },
    ],
  },
  {
    section: "Enemy Considerations",
    entries: [
      { title: "Action Economy", body: "The side with more total Action Economy usually wins. Snap Decisions and Reactions mean simply matching player count with Legendary Actions isn't enough. Don't stack extra enemies (\"adds\") onto a boss if the adds ARE the boss's Action Economy leverage, unless you're intentionally gating some of that power behind the adds being defeated." },
      { title: "Resources", body: "Don't just inflate HP/Stamina carelessly on single bosses — give respectable HP and tune Stamina to how threatening the fight should feel. Let hits land on HP sometimes rather than constant Push Back/Wild Sense/Energy Clash/Struggle announcements every turn. Enemies essentially require 2-3 Snap Decision uses even at low tier, given Technique lethality. Give enough Ki for a real \"War of Attrition\" — not so much the fight ends before they ever need to Gather Ki." },
      { title: "Forcing Movement", body: "Players won't move without a reason. Use Spacing, Cover, and Environment — line of sight problems, spread-out enemies vs AoEs, Lair Actions (telegraph the next round's hazard area at the top of initiative). Give single-entity enemies 1 Emanation Lair Action to stop the inevitable player blob." },
      { title: "Shoot Your Monks (Responsibly)", body: "Give characters chances to show off their build — let the tank tank, the healer heal, don't counter every build aspect just to \"challenge\" players. Build in exploitable flaws in enemies that happen to reward the party's actual strategy, rather than always attacking whoever's easiest to hit." },
      { title: "Objectives", body: "Avoid pure \"beat the guy till he dies\" brawls outside rare cases — they get static fast. Objectives must be mechanically relevant, not just RP flavor (saving civilians should have a real mechanical stake, not just moral victory), and must be worth the Action Economy cost to engage with or players will ignore them entirely." },
      { title: "Break Bars", body: "Control pacing with HP thresholds (75%/50%/25%, etc). Crossing one (\"losing a Break Bar\") can grant more Power, stronger moves, a shift in motivation (sparring → lethal intent). Optionally: crossing a threshold makes the enemy immune to further damage for the rest of that round, and/or clears their negative Conditions. Consider telegraphing how close a Break Bar is so players can strategize their round." },
      { title: "Stunning, Incapacitating, and Paralyzing", body: "Use extremely sparingly on both sides of the table — these are \"no-fun buttons\" that leave the affected creature doing nothing but rolling saves. Overuse forces absurd Legendary Resistances / high Con-mental saves into every fight just to counter it." },
      { title: "Single-Entity Fights", body: "Action Economy is critical — give mobility (move while ignoring opportunity attacks, Launch to prevent clumping) so the boss isn't just damage-raced. Target ~8 on the d20 for them to hit average player AC/DC (6-7 vs a fully rested party); ~12 on the d20 for players to hit them (higher vs a rested party). Give the boss their own objective so targeting doesn't just default to \"most damage last round.\" Adds should diminish the boss's own capabilities if renewable, or gate boss power behind their defeat — and shouldn't be tanky enough to feel like mini-bosses themselves (2-3 intercepts/hits max)." },
      { title: "Party vs Party Fights", body: "Two flavors: individually strong enemies matching party size (Ginyu Force), or numerous weaker enemies (Goblin Camp) — treat the latter as a swarm: one statblock with multi-attacks as if 4 units, HP divided into thresholds that shed -1 attack/-2 Stamina/-10 Ki/etc per 25% lost. Give each enemy or swarm a clear niche (bruiser/ranged/support) so players have defined engagement points. Target ~10 on the d20 for enemies to succeed vs players, ~8 for players vs them (elites: 8-9 / 9-10)." },
    ],
  },
  {
    section: "Favored Optional Rulings",
    entries: [
      { title: "Chase Mechanics", body: "5e's Opportunity Attacks + individual initiative make fleeing combat cumbersome, so most fights become pseudo-fights-to-the-death by default. Consider adopting dedicated Fleeing Combat rules (MonkeyDM's Rules for Fleeing Combat PDF is the referenced source) so either side can realistically flee overwhelming danger." },
      { title: "Dying Condition (replaces Unconscious at 0 HP)", body: "At 0 HP, fall prone and gain the Dying Condition instead of going Unconscious (still counts as Unconscious for rule interactions). Concentration checks from the triggering damage are at disadvantage. Each turn under Dying, make a death save at the start of the turn, then may spend one of: Action (3 Ranks of Exhaustion), Bonus Action or Reaction (1 Rank of Exhaustion), or Movement (free). 3 successes = 1 HP and the condition ends. 3 failures = dead." },
      { title: "Revivify Rules (Matt Mercer-style)", body: "Casting a resurrection makes a Resurrection Check: d20 + spellcasting ability modifier vs DC 10, +1 for each previous successful resurrection that character has undergone. On failure, the soul isn't lost, but the attempt fails and future Resurrection Checks for that character get +1 DC." },
      { title: "Tumble and Overrun", body: "Replaces moving through a hostile space as Difficult Terrain. Tumble: Action or Bonus Action, Dex (Acrobatics) vs the creature's Unarmed Save DC — win and move through their space once this turn. Overrun: Action or Bonus Action, Str (Athletics) vs their Unarmed Save DC — win and push through their space once this turn (Advantage if you're larger than them, Disadvantage if smaller)." },
    ],
  },
  {
    section: "Campaign Design",
    entries: [
      { title: "Encouraging Creativity", body: "Give players real reasons to take non-combat options. If someone wants a utility Cantrip or similar, build scenarios where it specifically matters (a hunger/satiation mechanic, a reputation system for feeding the poor) rather than letting it sit unused." },
      { title: "Lopsided Player Stats", body: "\"Average\" balancing assumes only a 3-4 point spread between players' AC/to-hit/DCs. If that spread grows past comfort range (e.g. 16 AC lowest vs 22 AC highest), talk to your players directly. Offer alternate investment paths instead of just handing out +1-3 weapons/armor to close gaps — custom conjurable items via a burned Feat, or a custom Temporary Form Improvement Feat suited to their playstyle, land better." },
    ],
  },
];

// Rarity ladder used across Gear, Enchanting, Night Market, Bounty rewards.
// Pseudo-Legendary is a dead end; only true Legendary items can awaken into Mythic.
const RARITY_TIERS = [
  { key: "common", label: "Common", color: "#9AA3B5" },
  { key: "uncommon", label: "Uncommon", color: "#4ADE80" },
  { key: "rare", label: "Rare", color: "#4FD1FF" },
  { key: "veryrare", label: "Very Rare", color: "#B990FF" },
  { key: "pseudolegendary", label: "Pseudo-Legendary", color: "#FF8C42", deadEnd: true },
  { key: "legendary", label: "Legendary", color: "#F5B942" },
  { key: "mythic", label: "Mythic", color: "#FF5C5C", requiresLegendary: true },
];
const rarityInfo = (key) => RARITY_TIERS.find(r => r.key === key) || RARITY_TIERS[0];

// Real Downtime Activities, pulled from the rulebook (Chapter 5).
const DOWNTIME_ACTIVITIES = [
  { name: "Befriend", cost: 2, desc: "By taking time to build trust, you form an unbreakable bond with a Buddy. Create and Soulbind to a Buddy of your design, crafted through the Buddy Creation Guidelines." },
  { name: "Buddy Training", cost: 2, desc: "All Buddies that you are Soulbound to gain 5 Training Boons. A Buddy can only receive this benefit a number of times equal to your Ki Rank." },
  { name: "Center", cost: 1, desc: "Reflect on your growth. Expend any retained Training Boons. Additionally, you may replace any Techniques learned by Level-Up that have no Ranks of Mastery with another Technique on your Learnable Technique List." },
  { name: "Cooking", cost: 1, desc: "Requires Cook's Utensils. Choose a Tier (1-5) and succeed a Con/Wis (Cook's Utensils) check against that Tier's DC and Zeni cost to grant temporary HP/Ki/Stamina to whoever eats it (24 hrs or until expended). Tier 1: DC10, 20z, 5 temp HP/Ki or 1 Stamina. Tier 5: DC30, 10,000z, 75 temp HP/Ki or 12 Stamina." },
  { name: "Crafting", cost: 1, desc: "Choose Adventuring Gear, Armor, a Vehicle, or a Weapon as your Goal. Succeed a DC 15 check with the matching Toolkit (Tinker's/Smith's/Leatherworker's/Engineer's) to create it for 85% of normal price, dropping 5% further per 5 you beat the DC by, to a minimum of 50%." },
  { name: "Enchanting", cost: 2, desc: "Spellcasters only. Spend Zeni to turn a piece of Equipment into Enchanted Gear, choosing one Enchantment and gaining the listed Magical Bonus. Common: +1 / 400z. Uncommon: +1 / 5,000z. Rare: +2 / 20,000z. Very Rare: +3 / 80,000z. Legendary: +3 / 300,000z." },
  { name: "Gather Materials", cost: 1, desc: "DC 15 Wis (Perception), Int (Investigation), or Cha (Persuasion) check. On success, your next Crafting or Enchanting activity's Zeni cost drops 15%, further 5% per 5 over the DC, to a minimum of 45%." },
  { name: "Hunting", cost: 2, desc: "Choose a Tier (1-5), succeed a Nature check at that Tier's DC to gain Rations or Bento Boxes. Tier 1: DC10, 3 Rations. Tier 5: DC30, 30 Rations or 3 Bento Boxes." },
  { name: "Improving", cost: 1, desc: "Those who can Enchant may spend half the next Rarity tier's Zeni cost to raise a piece of Enchanted or Heroic Gear to the next Rarity, gaining a new Level 1 Enchantment (max 3 for Enchanted Gear, 2 for Heroic Gear) or upgrading an existing one." },
  { name: "Invent", cost: 2, desc: "Attempt an Int (Technology) check against a Scientific Marvel's rarity DC to unlock it as a Crafting option, using an Engineer's Kit. Common: DC10. Uncommon: DC15. Rare: DC20. Very Rare: DC25. Legendary: DC30." },
];

const TRAINING_ARC_STYLES = [
  { name: "Solo", desc: "Training alone lets you develop your own style. Gain 3 Ranks of Mastery to put into known Techniques, or a unique DM-defined benefit, in addition to your Training Boons." },
  { name: "Collaborative", desc: "Designate a location. All creatures training at that location (and their Buddies) can spend 2 Training Boons to learn a Mortal Trained Feature or Super Technique from someone else there they qualify for, or 3 Boons for an Otherworldly Trained Feature." },
  { name: "Tutored", desc: "Designate an eligible Master. You and anyone else training with that Master (plus Buddies) can spend 2 Training Boons to learn a Mortal Trained Feature or Super Technique the Master knows, or 3 Boons for an Otherworldly Trained Feature or Ultimate Technique." },
];

const TRAINING_BOON_SPENDS = [
  "1 Boon: Increase a Resource (max times = Ki Rank + 1)",
  "1 Boon: Gain a Hit Die + Max HP as if you gained a level",
  "1 Boon: Gain Ki as if you gained a level",
  "1 Boon: Max Stamina increases by 4",
  "1 Boon: Base Walk Speed increases by 5ft",
  "1 Boon: Gain 1 Rank of Mastery for a known Technique",
  "1 Boon: Learn a Generic or Super Technique of your Ki Rank (can't be traded later)",
  "1 Boon: Gain proficiency in a Tool, Vehicle, or Weapon",
  "2 Boons: Gain a Feat you qualify for",
];

const MAX_TRAINING_BOONS_PER_RANK = [
  { rank: 1, max: 4 }, { rank: 2, max: 8 }, { rank: 3, max: 16 }, { rank: 4, max: 32 },
];

// Gambling & Bounty Hunting are not in the rulebook — designed here to fit the
// existing math (Ki Rank scaling, Zeni economy, DC-based checks).
const GAMBLING_GAMES = [
  { name: "Dice Clash", stake: "10-500 Ƶeni", desc: "Wager, then roll 2d6 + your Luck-equivalent modifier (or straight 2d6 if none) against the house's 2d6+2. Beat it, double your stake. Tie, stake returned. Lose, stake forfeited." },
  { name: "Ki Pull Machines", stake: "5-100 Ƶeni per pull", desc: "DC 12 flat roll (no modifiers). Success: 2x stake. Beat DC by 10+: roll on a rarity table for a bonus Common-tier item. Slow, repeatable Zeni sink with a small item-drop chance." },
  { name: "High-Stakes Sparring Bets", stake: "50-5,000 Ƶeni", desc: "Wager on the outcome of an actual sparring/exhibition match between two NPCs the DM controls. Payout scales with the underdog's odds — a good excuse to run a quick Combat Sim." },
  { name: "Card Tables (Speed Draw)", stake: "20-1,000 Ƶeni", desc: "Contested Charisma (Deception) or Wisdom (Insight) check against the dealer's DC 14. Winners double their stake; a natural 20 triples it. Cheating attempts use Sleight of Hand vs. the house's passive Perception." },
];

const BOUNTY_TIERS = [
  { key: "petty", label: "Petty", reward: "150-400 Ƶeni", npcTier: "fodder" },
  { key: "standard", label: "Standard", reward: "500-1,500 Ƶeni", npcTier: "elite" },
  { key: "dangerous", label: "Dangerous", reward: "2,000-6,000 Ƶeni", npcTier: "miniboss" },
  { key: "capital", label: "Capital", reward: "10,000-40,000 Ƶeni + rarity-scaled gear", npcTier: "boss" },
];

const NPC_TIERS = [
  { key: "fodder", label: "Fodder", mult: 0.6 },
  { key: "hfodder", label: "Hardened Fodder", mult: 0.8 },
  { key: "elite", label: "Elite", mult: 1.0 },
  { key: "helite", label: "Hardened Elite", mult: 1.25 },
  { key: "miniboss", label: "Mini-Boss", mult: 1.6 },
  { key: "hminiboss", label: "Hardened Mini-Boss", mult: 2.0 },
  { key: "boss", label: "Boss", mult: 2.6 },
  { key: "hboss", label: "Hardened Boss", mult: 3.4 },
];

export {
  BOOK_TABLES,
  DM_PLAYBOOK,
  RARITY_TIERS,
  rarityInfo,
  DOWNTIME_ACTIVITIES,
  TRAINING_ARC_STYLES,
  TRAINING_BOON_SPENDS,
  MAX_TRAINING_BOONS_PER_RANK,
  GAMBLING_GAMES,
  BOUNTY_TIERS,
  NPC_TIERS,
};
