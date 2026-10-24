// Storage layer. Two backings behind one interface:
//   shared:false -> localStorage (this device only; personal saves/exports)
//   shared:true  -> the local table server over HTTP + SSE (the DM's machine,
//                   reached on LAN or a VPN like Hamachi). Replaces the old
//                   cloud sync — no server bill, the world lives on the host.
//
// The app talks only through window.storage, so it never sees the transport.

let serverBase = localStorage.getItem("sdndbz_server") || ""; // e.g. http://25.1.2.3:30000
let world = localStorage.getItem("sdndbz_room") || "";
let evtSource = null;
let connected = false;

const subs = new Map();       // key -> Set(cb)   live subscribers
const statusCbs = new Set();  // connection-status listeners
let everOpened = false;       // a reconnect (not the first open) re-reads what we watch

// Last value seen for each shared doc, so a dropped connection shows the last
// known table instead of blank screens. Kept per table in localStorage (big
// docs only in memory) and refreshed on every read and live update.
const memCache = new Map();
const cacheKey = (key) => `sdndbz_cache:${world}:${key}`;
function remember(key, value) {
  memCache.set(world + ":" + key, value);
  try {
    if (value == null) localStorage.removeItem(cacheKey(key));
    else if (value.length < 1500000) localStorage.setItem(cacheKey(key), value);
  } catch { /* storage full: memory copy only */ }
}
function recall(key) {
  const m = memCache.get(world + ":" + key);
  if (m !== undefined) return m;
  try { return localStorage.getItem(cacheKey(key)); } catch { return null; }
}

function setWorld(code) {
  world = (code || "").trim().toUpperCase();
  localStorage.setItem("sdndbz_room", world);
}
function getWorld() { return world; }

function setServer(base) {
  serverBase = (base || "").trim().replace(/\/+$/, "");
  localStorage.setItem("sdndbz_server", serverBase);
}
function getServer() { return serverBase; }

function emitStatus(s) {
  connected = s;
  statusCbs.forEach((cb) => { try { cb(s); } catch {} });
}
function onStatus(cb) {
  statusCbs.add(cb);
  cb(connected);
  return () => statusCbs.delete(cb);
}

async function api(op, payload) {
  if (!serverBase) throw new Error("No table server set");
  const r = await fetch(`${serverBase}/api/${op}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ world, ...payload }),
  });
  if (!r.ok) throw new Error(`${op} failed (${r.status})`);
  return r.json();
}

// Open the live event stream. Resolves once connected, rejects if the host
// can't be reached within the timeout. EventSource auto-reconnects afterwards.
function connect(timeoutMs = 8000) {
  disconnect();
  if (!serverBase || !world) return Promise.reject(new Error("Missing server or world"));

  return new Promise((resolve, reject) => {
    let settled = false;
    const url = `${serverBase}/events?world=${encodeURIComponent(world)}`;
    const es = new EventSource(url);
    evtSource = es;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      es.close();
      if (evtSource === es) evtSource = null;
      reject(new Error("Could not reach the table server"));
    }, timeoutMs);

    es.onopen = () => {
      emitStatus(true);
      // Back after a drop: updates sent meanwhile were missed, so re-read
      // every doc someone is watching.
      if (everOpened) {
        for (const [key, set] of subs) {
          if (!set.size) continue;
          window.storage.get(key, true).then((r) => set.forEach((cb) => { try { cb(r.value); } catch {} })).catch(() => {});
        }
      }
      everOpened = true;
      if (!settled) { settled = true; clearTimeout(timer); resolve(); }
    };
    es.onerror = () => {
      emitStatus(false);
      // Not settled yet means the very first connect failed; let the timeout
      // reject. After that, leave the socket to auto-reconnect.
    };
    es.addEventListener("update", (e) => {
      const { key, value } = JSON.parse(e.data);
      remember(key, value);
      const set = subs.get(key);
      if (set) set.forEach((cb) => { try { cb(value); } catch {} });
    });
    es.addEventListener("delete", (e) => {
      const { key } = JSON.parse(e.data);
      const set = subs.get(key);
      if (set) set.forEach((cb) => { try { cb(null); } catch {} });
    });
  });
}

function disconnect() {
  if (evtSource) { evtSource.close(); evtSource = null; }
  everOpened = false;
  emitStatus(false);
}

window.storage = {
  async get(key, shared = false) {
    if (!shared) {
      const v = localStorage.getItem("personal_" + key);
      if (v === null) throw new Error("not found");
      return { key, value: v, shared: false };
    }
    let res;
    try { res = await api("get", { key }); }
    catch (err) {
      // Host unreachable: fall back to the last copy we saw.
      const cached = recall(key);
      if (cached != null) return { key, value: cached, shared: true, stale: true };
      throw err;
    }
    if (!res.found) throw new Error("not found");
    remember(key, res.value);
    return { key, value: res.value, shared: true };
  },

  async set(key, value, shared = false) {
    if (!shared) {
      localStorage.setItem("personal_" + key, value);
      return { key, value, shared: false };
    }
    await api("set", { key, value });
    remember(key, value);
    return { key, value, shared: true };
  },

  async delete(key, shared = false) {
    if (!shared) {
      localStorage.removeItem("personal_" + key);
      return { key, deleted: true, shared: false };
    }
    await api("delete", { key });
    return { key, deleted: true, shared: true };
  },

  async list(prefix = "", shared = false) {
    if (!shared) {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith("personal_" + prefix))
        .map((k) => k.replace("personal_", ""));
      return { keys, prefix, shared: false };
    }
    const res = await api("list", { prefix });
    return { keys: res.keys, prefix, shared: true };
  },

  // Live subscription. Fires once with the current value (mirrors the old
  // onSnapshot behaviour), then again on every remote change.
  subscribe(key, shared, cb) {
    if (!shared) return () => {};
    if (!subs.has(key)) subs.set(key, new Set());
    subs.get(key).add(cb);
    this.get(key, true).then((res) => cb(res.value)).catch(() => {});
    return () => {
      const set = subs.get(key);
      if (set) set.delete(cb);
    };
  },

  // Connection + identity
  setServer, getServer,
  setWorld, getWorld,
  setRoom: setWorld, getRoom: getWorld, // back-compat aliases
  connect, disconnect, onStatus,
  isConnected: () => connected,
};
