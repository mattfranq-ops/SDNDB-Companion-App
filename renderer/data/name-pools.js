/* ============================== NAME / FLAVOR POOLS (GM Toolkit tables) ============================== */
const NPC_POOLS = {
  first: ["Kessu","Vorra","Brenlo","Nadeth","Zhun","Karrik","Tessek","Ombra","Yulen","Draza","Miku","Solen","Tarrow","Vex","Ondu","Ketch"],
  last: ["of the Red Sands","Ironhide","of Namek's Edge","Voss","the Wandering","Karr-Sett","of North Galaxy","Steelclaw","the Unbroken","Dray'zul"],
  species: ["Saiyan","Namekian","Human","Majin","Android","Cerealian","Beastman","Zoolatar","Demon World Denizen","Grey","Tuffle","Yardratian","Acorsian"],
  role: ["Rookie Fighter","Bandit Captain","Wandering Sage","Bounty Hunter","Village Elder","Arena Champion","Rogue Scientist","Ki Cultist","Merchant-Smuggler","Failed Experiment","Retired Soldier","Street Brawler"],
  hook: ["Owes a debt to a crime syndicate.","Searching for a lost sibling.","Secretly weaker than their reputation suggests.","Hunting the party for a bounty.","Wants to defect from their faction.","Obsessed with surpassing a childhood rival.","Guards a Dragon Ball fragment.","Was exiled from their homeworld."],
  planet: ["Konatsu Prime","the Red Wastes of Xerath","the floating city of Ombrus","New Namek's outer moon","the ruined arena world Grellow","the ice-locked station Veyra-9","the trading hub Marrowgate","the jungle world Sennai"],
  clothing: ["torn training gi","corp-issue combat suit","tattered heritage robes","scavenged armor plating","street-gang colors","ceremonial fighting garb"],
};
const NAME_TABLE = { id: "npc_names", name: "NPC Name Generator", die: "roll", source: "GM Toolkit", pools: NPC_POOLS };

export {
  NPC_POOLS,
  NAME_TABLE,
};
