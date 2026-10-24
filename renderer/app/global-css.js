import { COLORS } from "../ui/theme.js";

// App-wide stylesheet: resets, keyframes, focus rings and a few helper classes
// the inline-styled components opt into (sd-pulse, sd-blink, sd-iconbtn).
function globalCss() {
  return `
    * { box-sizing: border-box; }
    body { background: ${COLORS.bg}; }
    @keyframes scanmove { 0% { left:-30%; } 100% { left:130%; } }
    @keyframes rollpop { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform:none; } }
    @keyframes sdpulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
    @keyframes sdblink { 0%,49% { opacity: 1; } 50%,100% { opacity: .2; } }
    @keyframes sdfade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    .sd-pulse { animation: sdpulse 2.4s ease-in-out infinite; }
    .sd-blink { animation: sdblink 1s steps(1) infinite; }
    .sd-screen { animation: sdfade .18s ease-out; }
    .sd-iconbtn:hover { color: ${COLORS.text} !important; border-color: ${COLORS.borderLit} !important; }
    input:focus, textarea:focus, select:focus { border-color: ${COLORS.blue}88 !important; box-shadow: 0 0 0 2px ${COLORS.blue}22; }
    button:focus-visible, [role="button"]:focus-visible, a:focus-visible, summary:focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }
    ::selection { background: ${COLORS.gold}44; }
    ::placeholder { color: ${COLORS.dim}; }
    details summary::-webkit-details-marker { color: ${COLORS.muted}; }
    select option { background: ${COLORS.panel}; color: ${COLORS.text}; }
    /* No native scrollbars anywhere — scrolling still works by wheel/drag/touch. */
    * { scrollbar-width: none; -ms-overflow-style: none; }
    ::-webkit-scrollbar { width: 0; height: 0; display: none; }
    /* Phones: the initiative row stacks (name + init on top, then each pool and
       the controls on their own lines) instead of eight columns side by side. */
    @media (max-width: 700px) {
      .sd-navlabel { font-size: 8.5px !important; letter-spacing: 0 !important; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .sd-tracker-row { grid-template-columns: 18px minmax(0,1fr) 56px !important; }
      .sd-tracker-row > :nth-child(n+4) { grid-column: 1 / -1 !important; }
      .sd-tracker-row > .sd-tracker-dr { justify-self: start; width: 90px !important; }
      .sd-tracker-row > .sd-tracker-actions { justify-content: start !important; grid-template-columns: repeat(6, auto) !important; }
      /* Fixed many-column grids on the sheets fold to fewer columns, and the
         sidebar + content layouts (Vitals, Inventory) stack. */
      main [style*="grid-template-columns: repeat(6"] { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      main [style*="grid-template-columns: repeat(4"], main [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      main [style*="grid-template-columns: minmax(2"] { grid-template-columns: minmax(0, 1fr) !important; }
      .vitals-body > :first-child { max-width: 300px; width: 100%; margin: 0 auto; }
      /* Phones: chrome gets out of the way so the sheet starts near the top. */
      .sd-main { padding: 12px 10px 92px !important; }
      .sd-appheader { padding: 8px 12px !important; }
      .sd-appheader-sub, .sd-banner-sub { display: none; }
      .sd-banner { margin-bottom: 10px !important; }
      .sd-banner-inner { padding: 10px 14px 10px 16px !important; }
      .sd-sheet { padding: 12px !important; }
      .sd-tabbar { flex-wrap: nowrap !important; overflow-x: auto; }
      /* The map handle becomes a round button above the bottom nav. */
      .sd-maptab:not(.open) { top: auto !important; bottom: calc(76px + env(safe-area-inset-bottom)) !important; right: 12px !important; transform: none !important;
        border-radius: 50% !important; border-right: 1px solid ${COLORS.border} !important; width: 48px; height: 48px; padding: 0 !important; justify-content: center; }
      .sd-maptab:not(.open) > span { writing-mode: horizontal-tb !important; font-size: 9px !important; }
      .sd-maptab:not(.open) > svg { display: none; }
    }
    /* Touch screens: every control is at least a fingertip tall, and inputs use
       16px text so iPhones don't zoom in when one is tapped. */
    @media (pointer: coarse) {
      main button, main select, [role=dialog] button { min-height: 36px; }
      main button:has(> svg:only-child) { min-width: 36px; justify-content: center; }
      main select, main input:not([type=checkbox]):not([type=radio]), main textarea { min-height: 38px; font-size: 16px !important; }
      main input[type=checkbox], main input[type=radio] { width: 20px; height: 20px; }
    }
    /* HP / Ki / Stamina stay in view under the app bar while the sheet scrolls. */
    .sd-sheet-gauges { position: sticky; top: 49px; z-index: 20; background: ${COLORS.panel}; padding: 8px 0 6px; margin-top: -8px; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `;
}

export { globalCss };
