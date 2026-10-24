import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Btn } from "../ui/atoms.jsx";
import { COLORS, FONTS } from "../ui/theme.js";

// Catches a crash inside one screen so the rest of the app (and the table
// connection) keeps running. App keys it by screen, so navigating away resets it.
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Screen crashed:", error, info && info.componentStack); }
  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div role="alert" style={{ border: `1px solid ${COLORS.red}55`, borderLeft: `3px solid ${COLORS.red}`, background: `${COLORS.red}0F`, borderRadius: 6, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.red, fontFamily: FONTS.display, fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 }}>
          <AlertTriangle size={18} /> This screen hit an error
        </div>
        <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
          Your table data is safe on the host. Try again, or switch to another tab. If it keeps happening, send this message to whoever maintains the app:
        </div>
        <pre style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.text, background: COLORS.input, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: 10, whiteSpace: "pre-wrap", margin: "0 0 12px" }}>{String(error && (error.stack || error.message || error)).split("\n").slice(0, 6).join("\n")}</pre>
        <Btn variant="gold" onClick={() => this.setState({ error: null })}><RotateCcw size={14} /> Try again</Btn>
      </div>
    );
  }
}

export { ErrorBoundary };
