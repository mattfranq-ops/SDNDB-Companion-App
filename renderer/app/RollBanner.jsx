import React, { useState, useRef, useEffect } from "react";
import { Dices, X } from "lucide-react";
import { uid } from "../lib/dice.js";
import { chamfer } from "../ui/atoms.jsx";
import { COLORS, FONTS } from "../ui/theme.js";
import { _rollBannerSubs } from "./bus.js";
import { ROLL_BANNER_DEFAULT, ROLL_BANNER_KEY, useLocalOption } from "../state/local-options.js";

// Mounted once by App. Shows the local roll toast stack (see emitRoll in bus.js).
function RollBannerHost() {
  const [opts] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const optsRef = useRef(opts); optsRef.current = opts;
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const sub = (p) => {
      const o = optsRef.current;
      if (!o.enabled) return;
      const id = uid();
      setToasts(t => [{ id, ...p }, ...t].slice(0, 4));
      if (!o.sticky) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), Math.max(1, o.seconds || 4) * 1000);
    };
    _rollBannerSubs.add(sub);
    return () => _rollBannerSubs.delete(sub);
  }, []);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  if (!toasts.length) return null;
  return (
    <div aria-live="polite" style={{ position: "fixed", top: 70, right: 16, zIndex: 300, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => {
        const c = t.color || COLORS.gold;
        return (
          <div key={t.id} style={{ pointerEvents: "auto", minWidth: 220, maxWidth: 300, background: `linear-gradient(135deg, ${COLORS.panel2}, ${COLORS.panel})`, borderLeft: `3px solid ${c}`, clipPath: chamfer(10), padding: "10px 12px", boxShadow: `inset 0 0 0 1px ${c}55, 0 10px 34px rgba(0,0,0,0.55)`, animation: "rollpop .25s ease" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
              <Dices size={13} color={c} />
              <span style={{ fontWeight: 700, fontSize: 12.5, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.label}</span>
              <button onClick={() => dismiss(t.id)} title="Dismiss" aria-label="Dismiss" style={{ cursor: "pointer", color: COLORS.dim, display: "flex", background: "none", border: "none", padding: 0 }}><X size={14} /></button>
            </div>
            {t.total != null && t.total !== "" && <div style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 26, color: c, lineHeight: 1.1, textShadow: `0 0 14px ${c}55` }}>{t.total}</div>}
            {t.detail && <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.muted, marginTop: 2 }}>{t.detail}</div>}
          </div>
        );
      })}
    </div>
  );
}

export { RollBannerHost };
