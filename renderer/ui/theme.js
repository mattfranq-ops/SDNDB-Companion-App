/* ---------------------------------- tokens ----------------------------------
   Every color and font in the app comes from here. Components read COLORS /
   FONTS at render time, and many build translucent variants by appending a
   hex alpha (`${COLORS.gold}55`), so every color value MUST stay a 6-digit hex.

   Themes are picked per device (Compendium → Options). The choice is read once
   at startup and COLORS is filled from it before any other module evaluates,
   so module-level constants that capture a color (faction colors, feat-list
   colors…) pick up the right theme too. Switching theme reloads the window.

   Slot meanings — keep them semantic so a theme can't break the sheet:
     gold   primary accent: active tabs, selected state, Stamina, the main CTA
     blue   info / Ki / scanner glow       red    HP, damage, danger
     green  healing / success              purple forms, magic, rare
     amber  warnings, origin feats         muted/dim  secondary + tertiary text */

const THEMES = {
  scouter: {
    label: "Scouter",
    blurb: "The original gold-and-cyan scouter console.",
    colors: {
      bg: "#0A0C11", deep: "#0B0E17", panel: "#12151D", panel2: "#171B26", input: "#0D0F16",
      border: "#232838", borderLit: "#37405A",
      gold: "#F5B942", blue: "#4FD1FF", green: "#4ADE80", red: "#FF5C5C", purple: "#B990FF", amber: "#FF8C42",
      text: "#E8E9ED", muted: "#8A93A6", dim: "#5A6178", onAccent: "#0D0F16",
    },
    fonts: { display: "Orbitron", body: "Inter", mono: "JetBrains Mono" },
  },
  red: {
    label: "Night Market",
    blurb: "Hard black, signal red and cyan, after the Cyberpunk RED look.",
    colors: {
      bg: "#09090B", deep: "#0C0B0E", panel: "#131215", panel2: "#1A181C", input: "#0E0D10",
      border: "#2C272B", borderLit: "#54424A",
      gold: "#F0353F", blue: "#2EE6E6", green: "#3CF2A0", red: "#FF6B8B", purple: "#C084FC", amber: "#FFB224",
      text: "#F3F0EC", muted: "#A0959A", dim: "#685D63", onAccent: "#0A0A0B",
    },
    fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
  },
};
const THEME_KEY = "sdndbz_theme_v1";
const DEFAULT_THEME = "scouter";
const RESUME_KEY = "sdndbz_resume_table";

function readThemeId() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v && THEMES[v] ? v : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}
const ACTIVE_THEME = readThemeId();

const COLORS = { ...THEMES[ACTIVE_THEME].colors };
const FONTS = {
  display: `"${THEMES[ACTIVE_THEME].fonts.display}", sans-serif`,
  body: `"${THEMES[ACTIVE_THEME].fonts.body}", system-ui, sans-serif`,
  mono: `"${THEMES[ACTIVE_THEME].fonts.mono}", ui-monospace, monospace`,
};

function setTheme(id) {
  if (!THEMES[id] || id === ACTIVE_THEME) return;
  try {
    localStorage.setItem(THEME_KEY, id);
    // ConnectGate sees this after the reload and rejoins the same table.
    sessionStorage.setItem(RESUME_KEY, "1");
  } catch { /* private mode: stays default */ }
  window.location.reload();
}

const FEAT_LIST_COLOR = {
  "Epic Boon": "gold", "Fighting Style": "blue", "General": "dim", "Heroic": "purple",
  "Stance": "green", "Trained": "red", "Origin": "amber", "Biology": "green", "Custom": "muted",
};
const FEAT_LISTS = ["Epic Boon", "Fighting Style", "General", "Heroic", "Stance", "Trained", "Origin", "Biology"];

export {
  THEMES,
  ACTIVE_THEME,
  setTheme,
  RESUME_KEY,
  COLORS,
  FONTS,
  FEAT_LIST_COLOR,
  FEAT_LISTS,
};
