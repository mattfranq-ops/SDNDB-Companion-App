import React, { useState, useEffect } from "react";
import { Radio, Wifi } from "lucide-react";
import { SHOW_ADDRESSES_KEY } from "./app/TableStatus.jsx";
import { chamfer } from "./ui/atoms.jsx";
import { COLORS, FONTS, RESUME_KEY } from "./ui/theme.js";

const DEFAULT_PORT = 30000;

const inputStyle = () => ({
  width: "100%", background: COLORS.input, border: `1px solid ${COLORS.border}`,
  borderRadius: 4, color: COLORS.text, padding: "10px 12px", fontSize: 14,
  marginBottom: 12, outline: "none", boxSizing: "border-box",
  fontFamily: FONTS.mono,
});
const labelStyle = () => ({ fontSize: 10.5, color: COLORS.muted, textAlign: "left", marginBottom: 5, letterSpacing: 1, fontFamily: FONTS.mono });

function buildBase(addr, port) {
  let a = (addr || "").trim();
  if (!a) return "";
  if (!/^https?:\/\//i.test(a)) a = "http://" + a;
  // Append the port only if the host part doesn't already carry one.
  const hostPart = a.replace(/^https?:\/\//i, "");
  if (!/:\d+/.test(hostPart)) a += ":" + (port || DEFAULT_PORT);
  return a.replace(/\/+$/, "");
}

// Turn low-level failures into something a player can act on.
function friendlyError(e, fallback) {
  const m = (e && e.message) || "";
  if (/EADDRINUSE/i.test(m)) return "That port is already in use. Close the other copy of the app, or pick another port.";
  if (/EACCES/i.test(m)) return "Your system blocked that port. Try a port above 1024, like 30000.";
  if (/reach the table server/i.test(m)) return "Couldn't reach the host. Check the address and port, that the DM has started hosting, and that you're on the same network or VPN.";
  return m || fallback;
}

export default function ConnectGate({ children }) {
  const hasHost = typeof window !== "undefined" && !!window.lanHost;
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState(hasHost ? "host" : "join");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Join fields
  const [addr, setAddr] = useState((window.storage.getServer() || "").replace(/^https?:\/\//, "").replace(/:\d+$/, ""));
  const [joinPort, setJoinPort] = useState(() => {
    const m = (window.storage.getServer() || "").match(/:(\d+)$/);
    return m ? Number(m[1]) : DEFAULT_PORT;
  });
  const [joinWorld, setJoinWorld] = useState(window.storage.getWorld());

  // Host fields
  const [hostPort, setHostPort] = useState(DEFAULT_PORT);
  const [hostWorld, setHostWorld] = useState(window.storage.getWorld());

  // "Leave table" in the header drops back to this screen.
  useEffect(() => {
    const onLeave = () => { setReady(false); setBusy(false); setError(""); };
    window.addEventListener("sdndbz:leave", onLeave);
    return () => window.removeEventListener("sdndbz:leave", onLeave);
  }, []);

  // After an in-app reload (theme switch) rejoin the table we were on. The host
  // server lives in the main process, so it is still running.
  useEffect(() => {
    let resume = false;
    try { resume = sessionStorage.getItem(RESUME_KEY) === "1"; sessionStorage.removeItem(RESUME_KEY); } catch { /* ignore */ }
    if (!resume || !window.storage.getServer() || !window.storage.getWorld()) return;
    setBusy(true);
    window.storage.connect().then(() => setReady(true)).catch(() => {}).finally(() => setBusy(false));
  }, []);

  if (ready) return children;

  const doJoin = async () => {
    setError("");
    if (!addr.trim()) return setError("Enter the host's address.");
    if (!joinWorld.trim()) return setError("Enter a table name.");
    setBusy(true);
    try {
      window.storage.setServer(buildBase(addr, joinPort));
      window.storage.setWorld(joinWorld);
      await window.storage.connect();
      setReady(true);
    } catch (e) {
      setError(friendlyError(e, "Connection failed."));
    } finally {
      setBusy(false);
    }
  };

  const doHost = async () => {
    setError("");
    if (!hostWorld.trim()) return setError("Name your table.");
    setBusy(true);
    try {
      const port = Number(hostPort) || DEFAULT_PORT;
      await window.lanHost.start(port);
      window.storage.setServer(`http://localhost:${port}`);
      window.storage.setWorld(hostWorld);
      await window.storage.connect();
      // Open the table panel once so the host sees the addresses to share.
      try { sessionStorage.setItem(SHOW_ADDRESSES_KEY, "1"); } catch { /* ignore */ }
      setReady(true);
    } catch (e) {
      setError(friendlyError(e, "Couldn't start the server."));
    } finally {
      setBusy(false);
    }
  };

  const Tab = ({ id, label, Icon }) => (
    <button onClick={() => { setMode(id); setError(""); }} aria-pressed={mode === id} style={{
      flex: 1, padding: "10px 0", fontSize: 12.5, fontWeight: 700, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
      background: mode === id ? `${COLORS.gold}14` : "transparent",
      color: mode === id ? COLORS.gold : COLORS.muted,
      border: "none", borderBottom: `2px solid ${mode === id ? COLORS.gold : "transparent"}`,
    }}><Icon size={14} />{label}</button>
  );

  const actionBtn = (color) => ({
    width: "100%", padding: "11px 0", borderRadius: 4, border: `1px solid ${color}66`,
    background: `${color}1A`, color, fontWeight: 800, fontSize: 13.5, letterSpacing: 1, textTransform: "uppercase",
    cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1, boxShadow: `0 0 18px ${color}22`,
  });
  const digits = (v) => v.replace(/\D/g, "").slice(0, 5);

  return (
    <div style={{
      minHeight: "100vh", color: COLORS.text, padding: 20,
      background: `radial-gradient(ellipse at 50% 0%, ${COLORS.blue}14, transparent 60%), ${COLORS.bg}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: FONTS.body,
    }}>
      <div style={{
        background: COLORS.panel, clipPath: chamfer(18), boxShadow: `inset 0 0 0 1px ${COLORS.border}`,
        padding: 30, width: 440, maxWidth: "100%", textAlign: "center",
      }}>
        <div style={{ width: 44, height: 44, margin: "0 auto 12px", clipPath: chamfer(10), background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: COLORS.onAccent, boxShadow: `0 0 0 4px ${COLORS.gold}` }} />
        </div>
        <div style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 19, marginBottom: 4, letterSpacing: 1.4 }}>
          SDNDBZ COMPANION
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 20, lineHeight: 1.55 }}>
          One player hosts the table on their machine; everyone else joins their
          address over LAN or a VPN like Hamachi.
        </div>

        <div style={{ display: "flex", marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
          <Tab id="host" label="Host a table" Icon={Radio} />
          <Tab id="join" label="Join a table" Icon={Wifi} />
        </div>

        {mode === "host" && (
          hasHost ? (
            <>
              <div style={labelStyle()}>TABLE NAME</div>
              <input style={inputStyle()} value={hostWorld} autoFocus aria-label="Table name"
                onChange={(e) => setHostWorld(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doHost()}
                placeholder="e.g. FRIEZA-CREW" />
              <div style={labelStyle()}>PORT</div>
              <input style={inputStyle()} value={hostPort} inputMode="numeric" aria-label="Port"
                onChange={(e) => setHostPort(digits(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && doHost()}
                placeholder={String(DEFAULT_PORT)} />
              <button onClick={doHost} disabled={busy} style={actionBtn(COLORS.gold)}>{busy ? "Starting…" : "Start Hosting"}</button>
              <div style={{ color: COLORS.dim, fontSize: 11.5, marginTop: 10, lineHeight: 1.5 }}>
                After it starts, the addresses for your players are in the table panel at the top right.
              </div>
            </>
          ) : (
            <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, padding: "8px 0 4px" }}>
              Hosting runs from the desktop app. In this preview, use <b style={{ color: COLORS.text }}>Join a table</b> to
              connect to a running server.
            </div>
          )
        )}

        {mode === "join" && (
          <>
            <div style={labelStyle()}>HOST ADDRESS</div>
            <input style={inputStyle()} value={addr} autoFocus aria-label="Host address"
              onChange={(e) => setAddr(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doJoin()}
              placeholder="e.g. 25.1.2.3" />
            <div style={labelStyle()}>PORT</div>
            <input style={inputStyle()} value={joinPort} inputMode="numeric" aria-label="Port"
              onChange={(e) => setJoinPort(digits(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && doJoin()}
              placeholder={String(DEFAULT_PORT)} />
            <div style={labelStyle()}>TABLE NAME</div>
            <input style={inputStyle()} value={joinWorld} aria-label="Table name"
              onChange={(e) => setJoinWorld(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doJoin()}
              placeholder="e.g. FRIEZA-CREW" />
            <button onClick={doJoin} disabled={busy} style={actionBtn(COLORS.blue)}>{busy ? "Connecting…" : "Connect"}</button>
          </>
        )}

        {error && (
          <div role="alert" style={{ color: COLORS.red, fontSize: 12.5, marginTop: 14, lineHeight: 1.5, background: `${COLORS.red}12`, border: `1px solid ${COLORS.red}44`, borderRadius: 4, padding: "8px 10px", textAlign: "left" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
