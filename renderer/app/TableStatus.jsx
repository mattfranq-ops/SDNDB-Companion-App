import React, { useState, useEffect, useRef } from "react";
import { Copy, Download, LogOut, Radio, Users, Wifi, WifiOff } from "lucide-react";
import { Btn, ConfirmBtn, downloadJSON } from "../ui/atoms.jsx";
import { COLORS, FONTS } from "../ui/theme.js";

// Set by ConnectGate right after "Start Hosting" so the host lands on the
// panel with the addresses to read out to players.
const SHOW_ADDRESSES_KEY = "sdndbz_show_addresses";

function useConnection() {
  const [live, setLive] = useState(() => window.storage.isConnected());
  useEffect(() => window.storage.onStatus(setLive), []);
  return live;
}

// Every shared doc at this table in one JSON file: characters, NPCs, the
// galaxy, the tracker, notes. The table server is the only copy of a campaign,
// so anyone at the table can keep their own backup.
async function downloadTableBackup(world) {
  const { keys } = await window.storage.list("", true);
  const docs = {};
  for (const k of keys) {
    try { const r = await window.storage.get(k, true); docs[k] = JSON.parse(r.value); } catch { /* skip unreadable */ }
  }
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  downloadJSON({ app: "SDNDBZ Companion", table: world, savedAt: new Date().toISOString(), docs }, `${(world || "table").replace(/\W+/g, "_")}-backup-${stamp}.json`);
}

// Host-only: poll the local server for addresses + connected players while open.
function useHostInfo(open) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    if (!open || !window.lanHost) return;
    let alive = true;
    const load = async () => {
      try {
        const [status, ips] = await Promise.all([window.lanHost.status(), window.lanHost.ips()]);
        if (alive) setInfo({ status, ips: ips || [] });
      } catch { /* host bridge unavailable */ }
    };
    load();
    const t = setInterval(load, 3000);
    return () => { alive = false; clearInterval(t); };
  }, [open]);
  return info;
}

function CopyLine({ text, sub }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { /* clipboard blocked */ }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: COLORS.input, border: `1px solid ${COLORS.border}`, borderRadius: 4, marginBottom: 6 }}>
      <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.text, flex: 1 }}>{text}</span>
      {sub && <span style={{ fontSize: 11, color: COLORS.dim }}>{sub}</span>}
      <button onClick={copy} title="Copy" aria-label={`Copy ${text}`} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? COLORS.green : COLORS.muted, display: "flex", padding: 2 }}>
        <Copy size={14} />
      </button>
    </div>
  );
}

function TableStatus() {
  const live = useConnection();
  const [open, setOpen] = useState(() => { try { return sessionStorage.getItem(SHOW_ADDRESSES_KEY) === "1"; } catch { return false; } });
  const ref = useRef(null);
  const host = useHostInfo(open);
  const isHost = !!(host && host.status && host.status.running);
  const world = window.storage.getWorld();
  const server = window.storage.getServer();

  useEffect(() => { try { sessionStorage.removeItem(SHOW_ADDRESSES_KEY); } catch { /* ignore */ } }, []);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const leave = async () => {
    try { if (isHost) await window.lanHost.stop(); } catch { /* already stopped */ }
    window.storage.disconnect();
    window.dispatchEvent(new Event("sdndbz:leave"));
  };

  const c = live ? COLORS.green : COLORS.amber;
  const port = host && host.status ? host.status.port : null;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} title="Table connection"
        style={{ display: "flex", alignItems: "center", gap: 8, background: `${c}12`, border: `1px solid ${c}55`, borderRadius: 4, padding: "5px 10px", cursor: "pointer", color: COLORS.text, fontFamily: FONTS.mono, fontSize: 11.5, letterSpacing: 0.6 }}>
        <span className={live ? "sd-pulse" : "sd-blink"} style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}` }} />
        <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{world || "NO TABLE"}</span>
        <span style={{ color: c }}>{live ? "LIVE" : "RECONNECTING"}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 320, zIndex: 400, background: COLORS.panel, border: `1px solid ${COLORS.borderLit}`, borderRadius: 6, padding: 14, boxShadow: "0 16px 40px rgba(0,0,0,.6)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            {live ? <Wifi size={16} color={COLORS.green} /> : <WifiOff size={16} color={COLORS.amber} />}
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}>{world}</div>
            {isHost && <span style={{ marginLeft: "auto", fontSize: 10.5, fontFamily: FONTS.mono, color: COLORS.gold, border: `1px solid ${COLORS.gold}55`, borderRadius: 3, padding: "1px 6px" }}>HOST</span>}
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>
            {live ? "Connected. Changes sync to everyone at this table in real time." : "Lost contact with the host. The app keeps retrying on its own; check the host still has the app open."}
          </div>
          {isHost ? (
            <>
              <div style={{ fontSize: 10.5, color: COLORS.gold, letterSpacing: 0.9, fontFamily: FONTS.mono, marginBottom: 6 }}>PLAYERS JOIN WITH</div>
              {host.ips.length === 0 && <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 6 }}>No network address found. Are you connected to Wi-Fi or a VPN?</div>}
              {host.ips.map(ip => <CopyLine key={ip.address} text={`${ip.address}:${port}`} sub={ip.address.startsWith("25.") ? "Hamachi" : ip.name} />)}
              <div style={{ fontSize: 11.5, color: COLORS.dim, margin: "4px 0 12px" }}>Plus the table name <b style={{ color: COLORS.text }}>{world}</b>. Same Wi-Fi: use the 192.168 / 10. address. Remote players: use your VPN address.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>
                <Users size={13} /> {host.status.clients} {host.status.clients === 1 ? "device" : "devices"} connected (including you)
              </div>
            </>
          ) : (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10.5, color: COLORS.blue, letterSpacing: 0.9, fontFamily: FONTS.mono, marginBottom: 6 }}>HOST</div>
              <CopyLine text={(server || "").replace(/^https?:\/\//, "")} />
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
            <Btn size="sm" variant="ghost" onClick={() => downloadTableBackup(world).catch(() => {})} title="Save everything at this table to a file on this device"><Download size={13} /> Backup</Btn>
            <div style={{ flex: 1 }} />
            <Btn size="sm" variant="ghost" onClick={() => setOpen(false)}>Close</Btn>
            <ConfirmBtn size="sm" confirmTitle={isHost ? "Stop hosting and leave" : "Leave table"} onConfirm={leave}>
              {isHost ? <Radio size={13} /> : <LogOut size={13} />} {isHost ? "Stop hosting" : "Leave table"}
            </ConfirmBtn>
          </div>
        </div>
      )}
    </div>
  );
}

export { TableStatus, SHOW_ADDRESSES_KEY };
