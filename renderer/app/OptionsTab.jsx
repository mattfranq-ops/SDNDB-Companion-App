import React from "react";
import { Check, Dices } from "lucide-react";
import { roll } from "../lib/dice.js";
import { Btn, Checkbox, TextInput } from "../ui/atoms.jsx";
import { ACTIVE_THEME, COLORS, FONTS, THEMES, setTheme } from "../ui/theme.js";
import { emitRoll } from "./bus.js";
import { ROLL_BANNER_DEFAULT, ROLL_BANNER_KEY, useLocalOption } from "../state/local-options.js";

const card = () => ({ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 16, maxWidth: 560 });
const cardTitle = () => ({ fontSize: 11, color: COLORS.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.9, marginBottom: 4, fontFamily: FONTS.mono });

function ThemeCard() {
  return (
    <div style={card()}>
      <div style={cardTitle()}>Interface Theme</div>
      <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Saved on this device only. Switching reloads the window; your table stays connected afterwards.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
        {Object.entries(THEMES).map(([id, t]) => {
          const on = id === ACTIVE_THEME; const c = t.colors;
          return (
            <button key={id} onClick={() => setTheme(id)} aria-pressed={on} style={{ textAlign: "left", cursor: on ? "default" : "pointer", background: c.bg, border: `1px solid ${on ? c.gold : c.border}`, borderRadius: 6, padding: 12, color: c.text, boxShadow: on ? `0 0 14px ${c.gold}44` : "none" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                {[c.gold, c.blue, c.red, c.green, c.purple].map((x, i) => <span key={i} style={{ width: 18, height: 6, background: x }} />)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13.5, fontFamily: `"${t.fonts.display}", sans-serif`, letterSpacing: 0.6, textTransform: "uppercase" }}>
                {t.label}{on && <Check size={14} color={c.gold} />}
              </div>
              <div style={{ fontSize: 11.5, color: c.muted, marginTop: 3 }}>{t.blurb}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RollBannerCard() {
  const [opts, save] = useLocalOption(ROLL_BANNER_KEY, ROLL_BANNER_DEFAULT);
  const rowLabel = { fontSize: 12.5, color: COLORS.text };
  return (
    <div style={card()}>
      <div style={cardTitle()}>Roll Banner</div>
      <div style={{ fontSize: 11.5, color: COLORS.dim, marginBottom: 12 }}>Saved on this device only — it doesn't affect anyone else at the table.</div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
        <Checkbox checked={opts.enabled} onChange={e => save({ enabled: e.target.checked })} />
        <span style={rowLabel}>Show a pop-up with the result when I make a roll</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: opts.enabled ? "pointer" : "default", opacity: opts.enabled ? 1 : 0.5 }}>
        <Checkbox disabled={!opts.enabled} checked={opts.sticky} onChange={e => save({ sticky: e.target.checked })} />
        <span style={rowLabel}>Stay until I dismiss it (otherwise it fades on its own)</span>
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: opts.enabled && !opts.sticky ? 1 : 0.5 }}>
        <span style={rowLabel}>Fade after</span>
        <TextInput type="number" value={opts.seconds} disabled={!opts.enabled || opts.sticky} onChange={e => save({ seconds: Math.max(1, Math.min(30, +e.target.value || 4)) })} style={{ width: 64, textAlign: "center" }} />
        <span style={{ fontSize: 12, color: COLORS.muted }}>seconds</span>
        <Btn size="sm" style={{ marginLeft: "auto" }} onClick={() => emitRoll({ label: "Test Roll", total: roll(20), detail: "d20 · sample", color: COLORS.blue })}><Dices size={13} /> Test</Btn>
      </div>
    </div>
  );
}

function OptionsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <ThemeCard />
      <RollBannerCard />
    </div>
  );
}

export { OptionsTab };
