// Local table server — the DM's app hosts this so players connect straight to
// their machine (LAN or a VPN like Hamachi/ZeroTier). No cloud, no bill.
//
// Transport: plain HTTP for reads/writes + Server-Sent Events for the live push
// (replaces the old Firestore onSnapshot). Shared state lives in memory and is
// saved to JSON on the host's disk. A "world" is a table namespace (the code
// players type), so one host can run several campaigns side by side.
//
// Also runnable standalone (`node server.js`) for testing outside Electron.

const http = require("http");
const os = require("os");
const fs = require("fs");
const path = require("path");

let server = null;
let listenPort = 0;
let worldsDir = null;

const worlds = new Map();   // world -> Map(key -> value string)
const clients = new Map();  // world -> Set(res)  (open SSE streams)
const dirty = new Set();    // worlds with unsaved changes
let saveTimer = null;
let heartbeat = null;

// --- persistence ---------------------------------------------------------

function worldFile(world) {
  const safe = String(world).replace(/[^A-Za-z0-9_-]/g, "_") || "_default";
  return path.join(worldsDir, safe + ".json");
}

function loadWorld(world) {
  const map = new Map();
  try {
    const raw = fs.readFileSync(worldFile(world), "utf8");
    const obj = JSON.parse(raw);
    for (const k of Object.keys(obj)) map.set(k, obj[k]);
  } catch { /* new world */ }
  return map;
}

function ensureWorld(world) {
  if (!worlds.has(world)) worlds.set(world, loadWorld(world));
  return worlds.get(world);
}

function scheduleSave(world) {
  dirty.add(world);
  if (saveTimer) return;
  saveTimer = setTimeout(saveDirty, 500);
}

function saveDirty() {
  saveTimer = null;
  for (const world of dirty) {
    const map = worlds.get(world);
    if (!map) continue;
    const obj = {};
    for (const [k, v] of map) obj[k] = v;
    try {
      fs.mkdirSync(worldsDir, { recursive: true });
      fs.writeFileSync(worldFile(world), JSON.stringify(obj));
    } catch (e) {
      console.error("World save failed:", e.message);
    }
  }
  dirty.clear();
}

// --- live push -----------------------------------------------------------

function broadcast(world, ev, payload) {
  const set = clients.get(world);
  if (!set) return;
  const frame = `event: ${ev}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of set) {
    try { res.write(frame); } catch { /* dropped; cleaned up on close */ }
  }
}

// --- request handling ----------------------------------------------------

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, code, obj) {
  cors(res);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(code);
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 8 * 1024 * 1024) reject(new Error("body too large"));
    });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error("bad json")); }
    });
    req.on("error", reject);
  });
}

function openStream(req, res, world) {
  cors(res);
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write(": connected\n\n");

  if (!clients.has(world)) clients.set(world, new Set());
  clients.get(world).add(res);

  req.on("close", () => {
    const set = clients.get(world);
    if (set) set.delete(res);
  });
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "OPTIONS") { cors(res); res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && url.pathname === "/events") {
    openStream(req, res, url.searchParams.get("world") || "_default");
    return;
  }

  if (req.method === "GET" && url.pathname === "/ping") {
    sendJson(res, 200, { ok: true, worlds: [...worlds.keys()] });
    return;
  }

  if (req.method === "POST" && url.pathname.startsWith("/api/")) {
    let body;
    try { body = await readBody(req); }
    catch (e) { sendJson(res, 400, { error: e.message }); return; }

    const op = url.pathname.slice(5);
    const world = body.world || "_default";
    const map = ensureWorld(world);

    switch (op) {
      case "get": {
        const has = map.has(body.key);
        sendJson(res, 200, { found: has, value: has ? map.get(body.key) : null });
        return;
      }
      case "set": {
        map.set(body.key, body.value);
        scheduleSave(world);
        broadcast(world, "update", { key: body.key, value: body.value });
        sendJson(res, 200, { ok: true });
        return;
      }
      case "delete": {
        map.delete(body.key);
        scheduleSave(world);
        broadcast(world, "delete", { key: body.key });
        sendJson(res, 200, { ok: true });
        return;
      }
      case "list": {
        const prefix = body.prefix || "";
        const keys = [...map.keys()].filter((k) => k.startsWith(prefix));
        sendJson(res, 200, { keys });
        return;
      }
      default:
        sendJson(res, 404, { error: "unknown op" });
        return;
    }
  }

  sendJson(res, 404, { error: "not found" });
}

// --- lifecycle -----------------------------------------------------------

function start(port, dir) {
  if (server) return Promise.resolve(status());
  worldsDir = dir;
  listenPort = port || 30000;
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      handle(req, res).catch((e) => sendJson(res, 500, { error: e.message }));
    });
    server.on("error", (e) => { server = null; reject(e); });
    server.listen(listenPort, "0.0.0.0", () => {
      heartbeat = setInterval(() => {
        for (const set of clients.values())
          for (const res of set) { try { res.write(": ping\n\n"); } catch {} }
      }, 25000);
      resolve(status());
    });
  });
}

function stop() {
  if (heartbeat) { clearInterval(heartbeat); heartbeat = null; }
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  saveDirty();
  for (const set of clients.values())
    for (const res of set) { try { res.end(); } catch {} }
  clients.clear();
  if (server) { server.close(); server = null; }
  return { running: false };
}

function status() {
  let streams = 0;
  for (const set of clients.values()) streams += set.size;
  return {
    running: !!server,
    port: listenPort,
    worlds: [...worlds.keys()],
    clients: streams,
  };
}

function localIps() {
  const out = [];
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const net of ifaces[name] || []) {
      if (net.family === "IPv4" && !net.internal) out.push({ name, address: net.address });
    }
  }
  // Surface likely Hamachi/ZeroTier addresses first.
  out.sort((a, b) => (a.address.startsWith("25.") ? -1 : 0) - (b.address.startsWith("25.") ? -1 : 0));
  return out;
}

module.exports = { start, stop, status, localIps };

// Standalone (testing outside Electron): `PORT=30000 node server.js`
if (require.main === module) {
  start(Number(process.env.PORT) || 30000, path.join(__dirname, "worlds"))
    .then((s) => console.log("Table server on :" + s.port, "worlds dir:", path.join(__dirname, "worlds")))
    .catch((e) => { console.error(e); process.exit(1); });
}
