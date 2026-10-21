/* ===== Lifepath tables =====
   Rollable backstory prompts for Bio → Story, in the spirit of the Cyberpunk
   RED Companion's lifepath. These are table prompts, not book rules: every
   field can be rerolled, picked from its table, or typed over. */

const LIFEPATH_TABLES = [
  { key: "origin", label: "Where you grew up", entries: [
    "A farming village far from any city", "The slums under a capital city", "A military academy",
    "A remote mountain monastery", "A nomad fleet drifting between planets", "A wealthy family estate",
    "A research station run by a corporation", "An island tournament town", "A conquered world under occupation",
    "Nowhere for long; you were always on the move",
  ] },
  { key: "family", label: "Your family", entries: [
    "Big, loud and close", "A single parent who worked themselves ragged", "Raised by a master who found you",
    "Orphaned young, raised by the street", "A famous warrior bloodline you can't live up to",
    "Estranged; you left and never went back", "Lost them all in an attack", "A sibling you'd do anything for",
    "Adopted by another species", "You never knew them",
  ] },
  { key: "training", label: "Who taught you to fight", entries: [
    "A strict old master with impossible exercises", "A rival who kept beating you", "Your own parent",
    "A military drill instructor", "You taught yourself from scraps and scrolls", "A gang that needed muscle",
    "A god or celestial being, briefly", "Tournament after tournament", "A villain, before you turned on them",
    "Instinct; it woke up on its own",
  ] },
  { key: "drive", label: "Why you fight", entries: [
    "To protect the people I love", "To be the strongest there is", "For the thrill of a worthy opponent",
    "Revenge", "To pay off a debt", "Because nobody else will", "To prove my master was right about me",
    "To surpass my rival", "For money and fame", "To atone for what I did",
  ] },
  { key: "personality", label: "How others see you", entries: [
    "Cheerful and always hungry", "Cold, quiet and focused", "Arrogant but brilliant", "Kind to a fault",
    "Hot-headed and reckless", "Calculating and patient", "Goofy until it matters", "Proud and honourable",
    "Shy, but fierce when cornered", "Impossible to read",
  ] },
  { key: "quirk", label: "A habit you can't shake", entries: [
    "Eating at every chance", "Naming every technique out loud", "Training even while sleeping",
    "Holding back to make fights last", "Talking to your opponent mid-fight", "Keeping score of every fight",
    "Meditating before every battle", "Never backing down from a challenge", "Collecting trinkets from beaten foes",
    "Wearing the same battered gi everywhere",
  ] },
  { key: "possession", label: "Your most valued possession", entries: [
    "Your master's old weighted clothing", "A dragon-ball-like orb of unknown origin", "A photo of your family",
    "A broken scouter", "A sword passed down for generations", "A capsule with your whole home inside",
    "A letter you've never opened", "Your first tournament belt", "A senzu-like healing bean you're saving",
    "Nothing; you travel light",
  ] },
  { key: "people", label: "How you feel about most people", entries: [
    "Everyone deserves a second chance", "People are weak and need protecting", "Trust is earned, not given",
    "Most people are in the way", "Every stranger is a potential rival", "People are fascinating",
    "I'd rather be alone", "Friends are the source of true power",
  ] },
  { key: "goal", label: "Your life goal", entries: [
    "Become the strongest in the universe", "Master a legendary transformation", "Find and defeat my rival",
    "Protect my home world", "Open a dojo of my own", "Restore my family's honour", "Find out where I really come from",
    "Win the great tournament", "Make enough money to never fight again", "Bring someone back from the dead",
  ] },
];

const pickFrom = (list, rng = Math.random) => list[Math.floor(rng() * list.length)];

// One field: a fresh entry, different from the current one when possible.
function rollLifepathField(key, current = "", rng = Math.random) {
  const table = LIFEPATH_TABLES.find(t => t.key === key);
  if (!table) return current;
  const options = table.entries.length > 1 ? table.entries.filter(e => e !== current) : table.entries;
  return pickFrom(options, rng);
}

// Every field at once.
function rollLifepath(rng = Math.random) {
  return Object.fromEntries(LIFEPATH_TABLES.map(t => [t.key, pickFrom(t.entries, rng)]));
}

export {
  LIFEPATH_TABLES,
  rollLifepathField,
  rollLifepath,
};
