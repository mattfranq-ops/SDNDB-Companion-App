import React, { useState } from "react";

const COLORS = {
  bg: "#0A0C11", panel: "#12151D", panel2: "#0D0F16", border: "#232838",
  gold: "#F5B942", blue: "#5AA9E6", text: "#E8E9ED", muted: "#8A93A6", red: "#E5484D",
};

const DEFAULT_PORT = 30000;

const inputStyle = {
  width: "100%", background: COLORS.panel2, border: `1px solid ${COLORS.border}`,
  borderRadius: 7, color: COLORS.text, padding: "10px 12px", fontSize: 14,
  marginBottom: 12, outline: "none", boxSizing: "border-box",
  fontFamily: "JetBrains Mono, monospace",
};
const labelStyle = { fontSize: 11, color: COLORS.muted, textAlign: "left", marginBottom: 5, letterSpacing: 0.4 };

function buildBase(addr, port) {
  let a = (addr || "").trim();
  if (!a) return "";
  if (!/^https?:\/\//i.test(a)) a = "http://" + a;
  // Append the port only if the host part doesn't already carry one.
  const hostPart = a.replace(/^https?:\/\//i, "");
  if (!/:\d+/.test(hostPart)) a += ":" + (port || DEFAULT_PORT);
  return a.replace(/\/+$/, "");
}

export default function ConnectGate({ children }) {
  const hasHost = typeof window !== "undefined" && !!window.lanHost;
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState(hasHost ? "host" : "join");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Join fields
  const [addr, setAddr] = useState((window.storage.getServer() || "").replace(/^https?:\/\//, "").replace(/:\d+$/, ""));
  const [joinPort, setJoinPort] = useState(DEFAULT_PORT);
  const [joinWorld, setJoinWorld] = useState(window.storage.getWorld());

  // Host fields
  const [hostPort, setHostPort] = useState(DEFAULT_PORT);
  const [hostWorld, setHostWorld] = useState(window.storage.getWorld());
  const [ips, setIps] = useState([]);

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
      setError(e.message || "Connection failed.");
    } finally {
      setBusy(false);
    }
  };

  const doHost = async () => {
    setError("");
    if (!hostWorld.trim()) return setError("Name your table.");
    setBusy(true);
    try {
      await window.lanHost.start(Number(hostPort) || DEFAULT_PORT);
      const list = await window.lanHost.ips();
      setIps(list || []);
      window.storage.setServer(`http://localhost:${Number(hostPort) || DEFAULT_PORT}`);
      window.storage.setWorld(hostWorld);
      await window.storage.connect();
      setReady(true);
    } catch (e) {
      setError(e.message || "Couldn't start the server.");
    } finally {
      setBusy(false);
    }
  };

  const Tab = ({ id, label }) => (
    <button onClick={() => { setMode(id); setError(""); }} style={{
      flex: 1, padding: "9px 0", fontSize: 13, fontWeight: 700, cursor: "pointer",
      background: mode === id ? `${COLORS.gold}1A` : "transparent",
      color: mode === id ? COLORS.gold : COLORS.muted,
      border: "none", borderBottom: `2px solid ${mode === id ? COLORS.gold : "transparent"}`,
    }}>{label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{
        background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12,
        padding: 28, width: 420, textAlign: "center",
      }}>
        <div style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 900, fontSize: 18, marginBottom: 4, letterSpacing: 1 }}>
          SDNDBZ COMPANION
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12.5, marginBottom: 18, lineHeight: 1.5 }}>
          One player hosts the table on their machine; everyone else joins their
          address over LAN or a VPN like Hamachi.
        </div>

        <div style={{ display: "flex", marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
          <Tab id="host" label="Host a table" />
          <Tab id="join" label="Join a table" />
        </div>

        {mode === "host" && (
          hasHost ? (
            <>
              <div style={labelStyle}>TABLE NAME</div>
              <input style={inputStyle} value={hostWorld} autoFocus
                onChange={(e) => setHostWorld(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doHost()}
                placeholder="e.g. FRIEZA-CREW" />
              <div style={labelStyle}>PORT</div>
              <input style={inputStyle} value={hostPort}
                onChange={(e) => setHostPort(e.target.value.replace(/\D/g, ""))}
                placeholder={String(DEFAULT_PORT)} />

              {ips.length > 0 && (
                <div style={{
                  background: COLORS.panel2, border: `1px solid ${COLORS.border}`, borderRadius: 8,
                  padding: 12, marginBottom: 12, textAlign: "left",
                }}>
                  <div style={{ fontSize: 11, color: COLORS.gold, marginBottom: 6, letterSpacing: 0.4 }}>
                    PLAYERS JOIN WITH
                  </div>
                  {ips.map((ip) => (
                    <div key={ip.address} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}>
                      {ip.address}:{hostPort} <span style={{ color: COLORS.muted }}>({ip.name})</span>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={doHost} disabled={busy} style={{
                width: "100%", padding: "10px 0", borderRadius: 7, border: `1px solid ${COLORS.gold}55`,
                background: `${COLORS.gold}1A`, color: COLORS.gold, fontWeight: 700, fontSize: 14,
                cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1,
              }}>{busy ? "Starting…" : "Start Hosting"}</button>
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
            <div style={labelStyle}>HOST ADDRESS</div>
            <input style={inputStyle} value={addr} autoFocus
              onChange={(e) => setAddr(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doJoin()}
              placeholder="e.g. 25.1.2.3" />
            <div style={labelStyle}>PORT</div>
            <input style={inputStyle} value={joinPort}
              onChange={(e) => setJoinPort(e.target.value.replace(/\D/g, ""))}
              placeholder={String(DEFAULT_PORT)} />
            <div style={labelStyle}>TABLE NAME</div>
            <input style={inputStyle} value={joinWorld}
              onChange={(e) => setJoinWorld(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doJoin()}
              placeholder="e.g. FRIEZA-CREW" />
            <button onClick={doJoin} disabled={busy} style={{
              width: "100%", padding: "10px 0", borderRadius: 7, border: `1px solid ${COLORS.blue}55`,
              background: `${COLORS.blue}1A`, color: COLORS.blue, fontWeight: 700, fontSize: 14,
              cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1,
            }}>{busy ? "Connecting…" : "Connect"}</button>
          </>
        )}

        {error && (
          <div style={{ color: COLORS.red, fontSize: 12.5, marginTop: 12 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
