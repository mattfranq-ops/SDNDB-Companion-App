import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react";
import { COLORS, FONTS } from "./theme.js";

/* ============================== UI atoms ==============================
   Shared building blocks. Every screen is styled inline from COLORS / FONTS, so
   these atoms are where the look of the whole app is set — keep props stable,
   they're used in hundreds of places. */

// Chamfered corners (top-left + bottom-right), the app's signature panel cut.
const chamfer = (n = 10) => `polygon(${n}px 0, 100% 0, 100% calc(100% - ${n}px), calc(100% - ${n}px) 100%, 0 100%, 0 ${n}px)`;

function ScannerHeader({ title, subtitle, onBack, actions }) {
  return (
    <div className="sd-banner" style={{ position: "relative", marginBottom: 18 }}>
      <div className="sd-banner-inner" style={{ position: "relative", overflow: "hidden", clipPath: chamfer(14), background: `linear-gradient(120deg, ${COLORS.panel2} 0%, ${COLORS.panel} 55%, ${COLORS.deep} 100%)`, padding: "16px 20px 16px 22px", boxShadow: `inset 0 0 0 1px ${COLORS.border}` }}>
        {/* fine scanner grid + sweeping glow */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.blue}0A 1px, transparent 1px), linear-gradient(90deg, ${COLORS.blue}0A 1px, transparent 1px)`, backgroundSize: "22px 22px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: "-30%", width: "30%", height: "100%", background: `linear-gradient(90deg, transparent, ${COLORS.blue}1F, transparent)`, animation: "scanmove 3.5s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 14, bottom: 0, width: 3, background: COLORS.gold, boxShadow: `0 0 12px ${COLORS.gold}88` }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="sd-iconbtn" style={{ background: `${COLORS.text}08`, border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.muted, cursor: "pointer", display: "flex", padding: 5 }}>
              <ArrowLeft size={17} />
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, letterSpacing: 1.6, textTransform: "uppercase", color: COLORS.text, textShadow: `0 0 18px ${COLORS.blue}33`, lineHeight: 1.15 }}>{title}</div>
            {subtitle && <div className="sd-banner-sub" style={{ color: COLORS.muted, fontSize: 12.5, marginTop: 4, lineHeight: 1.45 }}>{subtitle}</div>}
          </div>
          {actions && <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}
function Gauge({ label, value, max, color, icon: Icon }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.muted, marginBottom: 4, fontFamily: FONTS.mono, letterSpacing: 0.4 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, textTransform: "uppercase" }}>{Icon && <Icon size={11} />} {label}</span>
        <span style={{ color: COLORS.text }}>{(value ?? 0).toLocaleString()}/{(max ?? 0).toLocaleString()}</span>
      </div>
      <div style={{ height: 8, background: COLORS.input, border: `1px solid ${COLORS.border}`, overflow: "hidden", clipPath: chamfer(4) }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `repeating-linear-gradient(90deg, ${color} 0 10px, ${color}D9 10px 12px)`, boxShadow: `0 0 10px ${color}88`, transition: "width .3s" }} />
      </div>
    </div>
  );
}
function Btn({ children, onClick, variant = "default", size = "md", style, disabled, ...rest }) {
  const base = {
    fontFamily: FONTS.body, fontWeight: 600, letterSpacing: 0.2, cursor: disabled ? "not-allowed" : "pointer",
    border: `1px solid ${COLORS.border}`, borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6,
    transition: "border-color .15s, background .15s, box-shadow .15s", whiteSpace: "nowrap",
    padding: size === "sm" ? "5px 10px" : "8px 14px", fontSize: size === "sm" ? 12.5 : 13.5,
    background: COLORS.panel2, color: COLORS.text, opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    default: {}, gold: { background: `${COLORS.gold}1A`, borderColor: `${COLORS.gold}66`, color: COLORS.gold },
    blue: { background: `${COLORS.blue}1A`, borderColor: `${COLORS.blue}55`, color: COLORS.blue },
    danger: { background: `${COLORS.red}15`, borderColor: `${COLORS.red}44`, color: COLORS.red },
    ghost: { background: "transparent", borderColor: "transparent" },
  };
  const v = variants[variant] || variants.default;
  const hover = variant === "gold" ? COLORS.gold : variant === "blue" ? COLORS.blue : variant === "danger" ? COLORS.red : COLORS.borderLit;
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...v, ...style }} {...rest}
      onMouseEnter={e => { if (disabled) return; e.currentTarget.style.borderColor = hover; if (variant !== "default" && variant !== "ghost") e.currentTarget.style.boxShadow = `0 0 12px ${hover}33`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = (style && style.borderColor) || v.borderColor || COLORS.border; e.currentTarget.style.boxShadow = "none"; }}>{children}</button>
  );
}
// Two-step confirm — replaces blocking native confirm(). First click arms the
// button into ✓/✗; confirming fires onConfirm. Auto-disarms after a few seconds.
function ConfirmBtn({ children, onConfirm, variant = "danger", size = "sm", style, confirmTitle = "Confirm", ...rest }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 3500); return () => clearTimeout(t); }, [armed]);
  if (!armed) return <Btn variant={variant} size={size} style={style} onClick={e => { e.stopPropagation(); setArmed(true); }} {...rest}>{children}</Btn>;
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      <Btn variant="danger" size={size} title={confirmTitle} aria-label={confirmTitle} onClick={e => { e.stopPropagation(); setArmed(false); onConfirm(); }}><Check size={13} /></Btn>
      <Btn variant="ghost" size={size} title="Cancel" aria-label="Cancel" onClick={e => { e.stopPropagation(); setArmed(false); }}><X size={13} /></Btn>
    </span>
  );
}
function Field({ label, children }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 10.5, color: COLORS.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.9, fontFamily: FONTS.mono }}>{label}</div>{children}</label>; }
const inputStyle = { width: "100%", background: COLORS.input, border: `1px solid ${COLORS.border}`, borderRadius: 4, color: COLORS.text, padding: "7px 10px", fontSize: 13.5, fontFamily: FONTS.body, outline: "none", transition: "border-color .15s, box-shadow .15s" };
// Number fields select their contents on focus so typing replaces the value
// instead of appending to a leading "0" (player feedback).
function TextInput(props) {
  const onFocus = props.type === "number" ? (e => { e.target.select(); props.onFocus?.(e); }) : props.onFocus;
  return <input {...props} onFocus={onFocus} style={{ ...inputStyle, ...(props.style||{}) }} />;
}
// Auto-grows to fit its content so notes/descriptions expand to show everything
// (player feedback) — line breaks and long text stay fully visible without scrolling.
function TextArea(props) {
  const grow = (el) => { if (el) { el.style.height = "auto"; el.style.height = Math.max(el.scrollHeight, 60) + "px"; } };
  return <textarea {...props} ref={grow} onInput={e => { grow(e.target); props.onInput?.(e); }}
    style={{ ...inputStyle, resize: "vertical", minHeight: 60, overflow: "hidden", lineHeight: 1.5, ...(props.style||{}) }} />;
}
function Select({ children, ...props }) { return <select {...props} style={{ ...inputStyle, cursor: "pointer", ...(props.style||{}) }}>{children}</select>; }

// A starship-console dropdown: angular clipped corners, monospace uppercase text,
// a scanning glow, and ▸ markers. options = [{ value, label, count? }].
function SciSelect({ value, onChange, options, placeholder = "SELECT", width = 180, accent = COLORS.blue }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const sel = options.find(o => o.value === value);
  const clip = chamfer(9);
  const mono = FONTS.mono;
  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <button onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(${COLORS.panel2}, ${COLORS.deep})`, border: `1px solid ${accent}${open ? "cc" : "66"}`, color: sel ? accent : COLORS.muted, padding: "8px 11px", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: mono, cursor: "pointer", textAlign: "left", clipPath: clip, boxShadow: open ? `0 0 12px ${accent}55, inset 0 0 8px ${accent}22` : `inset 0 0 6px ${accent}14` }}>
        <span style={{ color: accent, opacity: 0.7 }}>▸</span>
        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sel ? sel.label : placeholder}</span>
        {sel && sel.count != null && <span style={{ opacity: 0.8 }}>[{sel.count}]</span>}
        <span style={{ color: accent, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s", fontSize: 9 }}>▾</span>
      </button>
      {open && (
        <div role="listbox" style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0, zIndex: 60, background: COLORS.deep, border: `1px solid ${accent}88`, boxShadow: `0 0 16px ${accent}44`, maxHeight: 300, overflowY: "auto", padding: 3, clipPath: clip }}>
          {options.length === 0 && <div style={{ padding: "8px 10px", fontSize: 11, color: COLORS.dim, fontFamily: mono, letterSpacing: 1 }}>NO DATA</div>}
          {options.map(o => { const on = o.value === value; return (
            <div key={String(o.value)} role="option" aria-selected={on} onClick={() => { onChange(o.value); setOpen(false); }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${accent}14`; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", cursor: "pointer", background: on ? `${accent}22` : "transparent", color: on ? accent : COLORS.text, fontSize: 11.5, letterSpacing: 0.6, textTransform: "uppercase", fontFamily: mono }}>
              <span style={{ color: accent, opacity: on ? 1 : 0.35 }}>{on ? "▸" : "·"}</span>
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.label}</span>
              {o.count != null && <span style={{ opacity: 0.7 }}>[{o.count}]</span>}
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}
// Dropdown that still allows free text ("Other…") — book lists are incomplete
// for some fields (heritages), and custom values like "Cyborg" gate mechanics.
function SelectWithCustom({ value, onChange, options, placeholder }) {
  const [typing, setTyping] = useState(false);
  if (!options.length || typing || (value && !options.includes(value))) {
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <TextInput value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus={typing} />
        {options.length > 0 && <Btn size="sm" onClick={() => { setTyping(false); onChange(""); }} title="Pick from list"><X size={13}/></Btn>}
      </div>
    );
  }
  return (
    <Select value={value || ""} onChange={e => { if (e.target.value === "__other__") { setTyping(true); onChange(""); } else onChange(e.target.value); }}>
      <option value="">—</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
      <option value="__other__">Other…</option>
    </Select>
  );
}
// Styled replacement for the bare OS checkbox (player feedback) — real <input>
// stays in the tree (hidden) so keyboard/label semantics are unchanged.
function Checkbox({ checked, onChange, disabled, style }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0, ...style }}>
      <input type="checkbox" checked={!!checked} disabled={disabled} onChange={onChange} style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", margin: 0, cursor: disabled ? "default" : "pointer" }} />
      <span style={{ width: 15, height: 15, borderRadius: 3, border: `1px solid ${checked ? COLORS.gold : COLORS.borderLit}`, background: checked ? COLORS.gold : COLORS.input, display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all .15s", opacity: disabled ? 0.45 : 1 }}>
        {checked && <Check size={11} strokeWidth={3.5} color={COLORS.onAccent} />}
      </span>
    </span>
  );
}
// Number input that comma-formats while you type (player feedback). Emits a
// plain number via onValue; accepts an optional leading minus.
function CommaNumInput({ value, onValue, style, ...rest }) {
  const num = typeof value === "number" && !isNaN(value) ? value : 0;
  const handle = (e) => {
    const raw = e.target.value.replace(/[^\d-]/g, "");
    const n = parseInt(raw, 10);
    onValue(isNaN(n) ? 0 : n);
  };
  return <input {...rest} type="text" inputMode="numeric" value={num.toLocaleString()} onChange={handle}
    onFocus={e => { e.target.select(); rest.onFocus?.(e); }} style={{ ...inputStyle, ...(style||{}) }} />;
}
function Tag({ children, color = COLORS.dim, onRemove }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, background: `${color}1F`, color, border: `1px solid ${color}55`, borderRadius: 3, padding: "2px 8px", letterSpacing: 0.3, marginRight: 5, marginBottom: 5 }}>{children}{onRemove && <button type="button" onClick={onRemove} aria-label="Remove" title="Remove" style={{ display: "inline-flex", background: "none", border: "none", padding: 0, color: "inherit", cursor: "pointer" }}><X size={11} /></button>}</span>;
}
// Hover to reveal on desktop, tap to toggle on mobile — used for feature/technique descriptions.
function InfoChip({ label, description, color = COLORS.blue, sub }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block", marginRight: 8, marginBottom: 8 }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div onClick={() => setOpen(o => !o)} style={{
        cursor: "pointer", fontSize: 12.5, fontWeight: 600, background: `${color}18`, color,
        border: `1px solid ${color}55`, borderRadius: 4, padding: "7px 11px", userSelect: "none",
      }}>
        {label}{sub && <span style={{ color: COLORS.dim, fontWeight: 500, marginLeft: 5, fontSize: 11 }}>{sub}</span>}
      </div>
      {open && description && (
        <div style={{
          position: "absolute", top: "110%", left: 0, zIndex: 20, width: 240,
          background: COLORS.panel2, border: `1px solid ${color}55`, borderRadius: 4, padding: 10,
          fontSize: 12, color: COLORS.text, lineHeight: 1.5, boxShadow: "0 6px 20px #00000088",
        }}>{description}</div>
      )}
    </div>
  );
}
function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px", color: COLORS.muted, border: `1px dashed ${COLORS.borderLit}`, borderRadius: 6, background: `radial-gradient(ellipse at 50% 0%, ${COLORS.gold}0D, transparent 60%), ${COLORS.panel}` }}>
      <div style={{ display: "inline-flex", padding: 12, borderRadius: "50%", border: `1px solid ${COLORS.border}`, background: COLORS.panel2, marginBottom: 12 }}><Icon size={24} color={COLORS.gold} style={{ opacity: 0.8 }} /></div>
      <div style={{ color: COLORS.text, fontWeight: 700, marginBottom: 4, fontFamily: FONTS.display, letterSpacing: 0.8, textTransform: "uppercase", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 380, margin: "0 auto 14px" }}>{body}</div>
      {action}
    </div>
  );
}
function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function LoadingBlock() { return <div role="status" style={{ color: COLORS.muted, padding: 40, textAlign: "center", fontFamily: FONTS.mono, letterSpacing: 1 }}><span className="sd-blink" style={{ color: COLORS.blue }}>▮</span> Loading table data…</div>; }
function ErrorBanner({ text }) { return <div role="alert" style={{ background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}55`, borderLeft: `3px solid ${COLORS.red}`, color: COLORS.red, borderRadius: 4, padding: "8px 12px", fontSize: 12.5, marginBottom: 12 }}>{text}</div>; }
function ModeCard({ title, desc, onClick }) {
  return (
    <div onClick={onClick} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(e); } }}
      style={{ cursor: "pointer", background: `linear-gradient(90deg, ${COLORS.panel2}, ${COLORS.panel})`, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${COLORS.gold}55`, borderRadius: 4, padding: "15px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12, transition: "border-color .15s, transform .15s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold + "77"; e.currentTarget.style.borderLeftColor = COLORS.gold; }} onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.borderLeftColor = COLORS.gold + "55"; }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3, fontFamily: FONTS.display, letterSpacing: 0.6 }}>{title}</div>
        <div style={{ color: COLORS.muted, fontSize: 12.5 }}>{desc}</div>
      </div>
      <ChevronRight size={18} color={COLORS.dim} />
    </div>
  );
}
function Pills({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: "6px 12px", borderRadius: 3, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          border: `1px solid ${value === o ? COLORS.gold : COLORS.border}`,
          background: value === o ? `${COLORS.gold}1A` : COLORS.panel2, color: value === o ? COLORS.gold : COLORS.text,
        }}>{o}</button>
      ))}
    </div>
  );
}

export {
  chamfer,
  ScannerHeader,
  Gauge,
  Btn,
  ConfirmBtn,
  Field,
  inputStyle,
  TextInput,
  TextArea,
  Select,
  SciSelect,
  SelectWithCustom,
  Checkbox,
  CommaNumInput,
  Tag,
  InfoChip,
  EmptyState,
  downloadJSON,
  LoadingBlock,
  ErrorBanner,
  ModeCard,
  Pills,
};
