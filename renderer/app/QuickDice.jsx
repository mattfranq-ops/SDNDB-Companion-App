import React, { useState } from "react";
import { Dices, Minus, Plus, RotateCcw, X } from "lucide-react";
import { roll } from "../lib/dice.js";
import { COLORS, FONTS } from "../ui/theme.js";
import { emitRoll } from "./bus.js";

/* ===== Quick dice: a dice button on every screen =====
   Tap dice to build a pool (2d6 + 1d8), add a modifier, and roll. A lone d20
   can roll with Advantage or Disadvantage. Rolls show in the roll toast and
   land in the table's Rolls log (private if this device rolls privately).
   The last few rolls stay in the panel. */

const DICE = [4, 6, 8, 10, 12, 20, 100];
const HISTORY_KEY = "sdndbz_quickdice_history_v1";

function readHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}
function writeHistory(h) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 12))); } catch { /* private mode */ }
}

const poolLabel = (pool, mod) => {
  const parts = DICE.filter(d => pool[d]).map(d => `${pool[d]}d${d}`);
  return `${parts.join(" + ") || "—"}${mod ? ` ${mod > 0 ? "+" : "−"} ${Math.abs(mod)}` : ""}`;
};

function rollPool(pool, mod, mode) {
  const lone20 = Object.keys(pool).filter(d => pool[d]).join() === "20" && pool[20] === 1;
  const groups = DICE.filter(d => pool[d]).map(d => {
    if (lone20 && (mode === "adv" || mode === "dis")) {
      const a = roll(20), b = roll(20);
      return { d, rolls: [a, b], kept: [mode === "adv" ? Math.max(a, b) : Math.min(a, b)] };
    }
    const rolls = Array.from({ length: pool[d] }, () => roll(d));
    return { d, rolls, kept: rolls };
  });
  const total = groups.reduce((s, g) => s + g.kept.reduce((a, b) => a + b, 0), 0) + mod;
  const detail = groups.map(g => `${g.rolls.length}d${g.d} [${g.rolls.join(", ")}]${g.kept !== g.rolls ? ` keep ${g.kept[0]}` : ""}`).join(" + ") + (mod ? ` ${mod > 0 ? "+" : "−"} ${Math.abs(mod)}` : "");
  const nat = lone20 ? groups[0].kept[0] : null;
  return { total, detail, nat };
}

function QuickDice() {
  const [open, setOpen] = useState(false);
  const [pool, setPool] = useState({});
  const [mod, setMod] = useState(0);
  const [mode, setMode] = useState("normal");
  const [last, setLast] = useState(null);
  const [history, setHistory] = useState(readHistory);
  const count = Object.values(pool).reduce((s, n) => s + n, 0);
  const lone20 = count === 1 && pool[20] === 1;
  const add = (d) => setPool(p => ({ ...p, [d]: Math.min(20, (p[d] || 0) + 1) }));
  const clear = () => { setPool({}); setMod(0); setMode("normal"); };
  const go = (p = pool, m = mod) => {
    if (!Object.values(p).some(Boolean)) return;
    const one20 = Object.values(p).reduce((s, n) => s + n, 0) === 1 && p[20] === 1;
    const label = poolLabel(p, m) + (one20 && mode !== "normal" ? (mode === "adv" ? " (Adv)" : " (Dis)") : "");
    const r = rollPool(p, m, one20 ? mode : "normal");
    const entry = { label, total: r.total, detail: r.detail, nat: r.nat, pool: p, mod: m, at: Date.now() };
    setLast(entry);
    const h = [entry, ...history].slice(0, 12); setHistory(h); writeHistory(h);
    emitRoll({ label: `Quick roll: ${label}`, total: r.total, detail: r.detail, color: r.nat === 20 ? COLORS.green : r.nat === 1 ? COLORS.red : COLORS.blue, share: true });
  };
  const btn = (on) => ({ cursor: "pointer", borderRadius: 8, border: `1px solid ${on ? COLORS.gold : COLORS.border}`, background: on ? `${COLORS.gold}1A` : COLORS.panel2, color: on ? COLORS.gold : COLORS.text, fontWeight: 700 });
  return (
    <>
      <button className="sd-dicefab" onClick={() => setOpen(!open)} aria-label={open ? "Close the dice roller" : "Open the dice roller"} aria-expanded={open}
        style={{ position: "fixed", left: 16, bottom: "calc(80px + env(safe-area-inset-bottom))", zIndex: 160, width: 52, height: 52, borderRadius: "50%", border: `1px solid ${COLORS.gold}88`, background: `radial-gradient(circle at 35% 30%, ${COLORS.panel2}, ${COLORS.panel})`, color: COLORS.gold, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 22px rgba(0,0,0,.5), 0 0 14px ${COLORS.gold}33` }}>
        {open ? <X size={22} /> : <Dices size={24} />}
      </button>
      {open && (
        <div role="dialog" aria-label="Dice roller" style={{ position: "fixed", left: 12, bottom: "calc(142px + env(safe-area-inset-bottom))", zIndex: 160, width: "min(340px, calc(100vw - 24px))", maxHeight: "calc(100vh - 220px)", overflowY: "auto", background: COLORS.panel, border: `1px solid ${COLORS.borderLit}`, borderRadius: 12, padding: 12, boxShadow: "0 16px 44px rgba(0,0,0,.6)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {DICE.map(d => (
              <button key={d} onClick={() => add(d)} aria-label={`Add a d${d}`} style={{ ...btn(!!pool[d]), padding: "10px 0", fontSize: 14, position: "relative", fontFamily: FONTS.mono }}>
                d{d}{pool[d] ? <span style={{ position: "absolute", top: 2, right: 5, fontSize: 10, color: COLORS.gold }}>×{pool[d]}</span> : null}
              </button>
            ))}
            <button onClick={clear} aria-label="Clear the dice" style={{ ...btn(false), padding: "10px 0", color: COLORS.muted, display: "flex", alignItems: "center", justifyContent: "center" }}><RotateCcw size={15} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, flex: 1, minWidth: 0, color: count ? COLORS.text : COLORS.dim }}>{poolLabel(pool, mod)}</span>
            <button onClick={() => setMod(m => m - 1)} aria-label="Modifier down" style={{ ...btn(false), width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={14} /></button>
            <span style={{ fontFamily: FONTS.mono, minWidth: 28, textAlign: "center" }}>{mod >= 0 ? `+${mod}` : mod}</span>
            <button onClick={() => setMod(m => m + 1)} aria-label="Modifier up" style={{ ...btn(false), width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={14} /></button>
          </div>
          {lone20 && (
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[["dis", "Disadvantage"], ["normal", "Normal"], ["adv", "Advantage"]].map(([k, l]) => (
                <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k} style={{ ...btn(mode === k), flex: 1, padding: "7px 0", fontSize: 12 }}>{l}</button>
              ))}
            </div>
          )}
          <button onClick={() => go()} disabled={!count} style={{ marginTop: 10, width: "100%", padding: "11px 0", borderRadius: 8, border: `1px solid ${COLORS.gold}`, background: count ? COLORS.gold : COLORS.panel2, color: count ? COLORS.onAccent : COLORS.dim, fontWeight: 800, fontSize: 14, letterSpacing: 1, cursor: count ? "pointer" : "not-allowed", fontFamily: FONTS.display }}>ROLL</button>
          {last && (
            <div aria-live="polite" style={{ marginTop: 10, textAlign: "center" }}>
              <div style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 34, color: last.nat === 20 ? COLORS.green : last.nat === 1 ? COLORS.red : COLORS.blue }}>{last.total}</div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.muted }}>{last.detail}</div>
            </div>
          )}
          {history.length > 0 && (
            <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>
              <div style={{ fontSize: 10.5, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Recent</div>
              {history.slice(0, 6).map((h, i) => (
                <button key={h.at + "-" + i} onClick={() => { setPool(h.pool || {}); setMod(h.mod || 0); go(h.pool || {}, h.mod || 0); }} title="Roll this again"
                  style={{ display: "flex", width: "100%", gap: 8, alignItems: "baseline", background: "none", border: "none", color: COLORS.text, cursor: "pointer", padding: "5px 2px", textAlign: "left" }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 12, flex: 1, minWidth: 0, color: COLORS.muted }}>{h.label}</span>
                  <span style={{ fontWeight: 800, fontFamily: FONTS.mono }}>{h.total}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { QuickDice, rollPool, poolLabel };
