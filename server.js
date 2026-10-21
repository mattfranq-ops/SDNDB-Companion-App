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
// The built app (dist/). Served at / so a phone on the same network or VPN can
// open http://<host>:<port> in its browser and play without installing anything.
let webDir = path.join(__dirname, "dist");

const worlds = new Map();   // world -> Map(key -> value string)
const clients = new Map();  // world -> Set(res)  (open SSE streams)
const dirty = new Set();    // worlds with unsaved changes
const lastBackup = new Map(); // world -> ms of the last .bak snapshot
let saveTimer = null;

const MAX_BODY = 8 * 1024 * 1024;
const MAX_KEY = 256;
const MAX_WORLD = 64;
const BACKUP_EVERY_MS = 10 * 60 * 1000;
let heartbeat = null;

// --- persistence ---------------------------------------------------------

function worldFile(world) {
  const safe = String(world).replace(/[^A-Za-z0-9_-]/g, "_") || "_default";
  return path.join(worldsDir, safe + ".json");
}

function readWorldFile(file) {
  const obj = JSON.parse(fs.readFileSync(file, "utf8"));
  const map = new Map();
  for (const k of Object.keys(obj)) map.set(k, obj[k]);
  return map;
}

function loadWorld(world) {
  const file = worldFile(world);
  if (!fs.existsSync(file)) return new Map(); // new world
  try {
    return readWorldFile(file);
  } catch (e) {
    // Corrupt save: fall back to the backup rather than starting empty (an
    // empty world would overwrite the damaged file on the next save).
    console.error("World file unreadable, trying backup:", e.message);
    try {
      fs.copyFileSync(file, file + ".corrupt-" + Date.now());
      return readWorldFile(file + ".bak");
    } catch {
      return new Map();
    }
  }
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
      const file = worldFile(world);
      // Keep a rolling backup of the last good save, refreshed every few minutes.
      const now = Date.now();
      if (fs.existsSync(file) && now - (lastBackup.get(world) || 0) > BACKUP_EVERY_MS) {
        fs.copyFileSync(file, file + ".bak");
        lastBackup.set(world, now);
      }
      // Write-then-rename so a crash mid-save can never leave a half-written world.
      fs.writeFileSync(file + ".tmp", JSON.stringify(obj));
      fs.renameSync(file + ".tmp", file);
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
    let done = false;
    const fail = (e) => { if (!done) { done = true; reject(e); } };
    req.on("data", (c) => {
      if (done) return;
      data += c;
      if (data.length > MAX_BODY) { fail(new Error("body too large")); req.destroy(); }
    });
    req.on("end", () => {
      if (done) return;
      done = true;
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error("bad json")); }
    });
    req.on("error", fail);
  });
}

function validWorld(w) {
  return typeof w === "string" && w.length > 0 && w.length <= MAX_WORLD;
}

function openStream(req, res, world) {
  cors(res);
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("retry: 2000\n: connected\n\n");

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
    const world = url.searchParams.get("world") || "_default";
    if (!validWorld(world)) { sendJson(res, 400, { error: "bad world" }); return; }
    openStream(req, res, world);
    return;
  }

  if (req.method === "GET" && url.pathname === "/ping") {
    sendJson(res, 200, { ok: true, app: "sdndbz-companion", worlds: [...worlds.keys()] });
    return;
  }

  if (req.method === "POST" && url.pathname.startsWith("/api/")) {
    let body;
    try { body = await readBody(req); }
    catch (e) { sendJson(res, 400, { error: e.message }); return; }

    const op = url.pathname.slice(5);
    const world = body.world || "_default";
    if (!validWorld(world)) { sendJson(res, 400, { error: "bad world" }); return; }
    if (op !== "list" && (typeof body.key !== "string" || !body.key || body.key.length > MAX_KEY)) {
      sendJson(res, 400, { error: "bad key" });
      return;
    }
    if (op === "set" && typeof body.value !== "string") { sendJson(res, 400, { error: "value must be a string" }); return; }
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

  if (req.method === "GET" || req.method === "HEAD") { serveStatic(req, res, url.pathname); return; }

  sendJson(res, 404, { error: "not found" });
}

// --- the app itself, for phones and other browsers --------------------------

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
  ".png": "image/png", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
};

function serveStatic(req, res, pathname) {
  let rel;
  try { rel = decodeURIComponent(pathname); } catch { sendJson(res, 400, { error: "bad path" }); return; }
  if (rel === "/" || rel === "") rel = "/index.html";
  const file = path.resolve(webDir, "." + rel);
  // Never step outside the app folder.
  if (file !== webDir && !file.startsWith(webDir + path.sep)) { sendJson(res, 404, { error: "not found" }); return; }
  fs.readFile(file, (err, data) => {
    if (err) { sendJson(res, 404, { error: "not found" }); return; }
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    // index.html points at versioned bundles, so it must never be cached.
    res.writeHead(200, { "Content-Type": type, "Cache-Control": rel === "/index.html" ? "no-cache" : "public, max-age=3600" });
    res.end(req.method === "HEAD" ? undefined : data);
  });
}

// --- lifecycle -----------------------------------------------------------

function start(port, dir, appDir) {
  if (server) return Promise.resolve(status());
  worldsDir = dir;
  if (appDir) webDir = path.resolve(appDir);
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
  worlds.clear(); // reload from disk on the next start
  if (server) {
    server.close();
    // Drop idle keep-alive sockets too, or the port stays held after "Stop".
    if (server.closeAllConnections) server.closeAllConnections();
    server = null;
  }
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
