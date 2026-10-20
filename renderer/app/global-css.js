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
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `;
}

export { globalCss };
