/* ---------------------------------- tokens ---------------------------------- */
const COLORS = {
  bg: "#0A0C11", panel: "#12151D", panel2: "#171B26", border: "#232838", borderLit: "#37405A",
  gold: "#F5B942", blue: "#4FD1FF", green: "#4ADE80", red: "#FF5C5C", purple: "#B990FF", amber: "#FF8C42",
  text: "#E8E9ED", muted: "#8A93A6", dim: "#5A6178",
};
const FEAT_LIST_COLOR = {
  "Epic Boon": "gold", "Fighting Style": "blue", "General": "dim", "Heroic": "purple",
  "Stance": "green", "Trained": "red", "Origin": "amber", "Custom": "muted",
};
const FEAT_LISTS = ["Epic Boon", "Fighting Style", "General", "Heroic", "Stance", "Trained", "Origin"];
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

export {
  COLORS,
  FEAT_LIST_COLOR,
  FEAT_LISTS,
  FONT_IMPORT,
};
