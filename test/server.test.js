// The table server is the only copy of a campaign, so its save/sync contract
// gets real tests: HTTP ops, live SSE push, persistence, backups, and limits.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const server = require("../server.js");

const PORT = 30000 + Math.floor(Math.random() * 2000) + 1000;
const base = `http://127.0.0.1:${PORT}`;
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sdndbz-worlds-"));

// Let the client notice sockets the server closed on stop() before reusing them.
const settle = () => new Promise((r) => setTimeout(r, 50));

const api = async (op, body) => {
  const r = await fetch(`${base}/api/${op}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json() };
};

// Minimal SSE reader: resolves with the first event of the given type.
function nextEvent(world, type) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${base}/events?world=${encodeURIComponent(world)}`, (res) => {
      let buf = "";
      res.on("data", (c) => {
        buf += c;
        const frames = buf.split("\n\n");
        buf = frames.pop();
        for (const f of frames) {
          const ev = /^event: (.+)$/m.exec(f);
          const data = /^data: (.+)$/m.exec(f);
          if (ev && ev[1] === type) { req.destroy(); resolve(JSON.parse(data[1])); }
        }
      });
    });
    req.on("error", (e) => { if (e.code !== "ECONNRESET") reject(e); });
    setTimeout(() => { req.destroy(); reject(new Error("no event")); }, 3000);
  });
}

beforeAll(async () => { await server.start(PORT, dir); });
afterAll(() => { server.stop(); fs.rmSync(dir, { recursive: true, force: true }); });

describe("table server", () => {
  it("answers ping", async () => {
    const r = await fetch(`${base}/ping`);
    expect((await r.json()).ok).toBe(true);
  });

  it("sets, gets, lists and deletes keys per world", async () => {
    expect((await api("set", { world: "A", key: "characters_v2", value: "[1]" })).json.ok).toBe(true);
    await api("set", { world: "A", key: "session_time", value: "{}" });
    await api("set", { world: "B", key: "characters_v2", value: "[2]" });
    expect((await api("get", { world: "A", key: "characters_v2" })).json).toEqual({ found: true, value: "[1]" });
    expect((await api("get", { world: "B", key: "characters_v2" })).json.value).toBe("[2]");
    expect((await api("list", { world: "A", prefix: "session_" })).json.keys).toEqual(["session_time"]);
    await api("delete", { world: "A", key: "session_time" });
    expect((await api("get", { world: "A", key: "session_time" })).json.found).toBe(false);
  });

  it("pushes updates to subscribers of the same world", async () => {
    const got = nextEvent("LIVE", "update");
    await new Promise((r) => setTimeout(r, 100));
    await api("set", { world: "LIVE", key: "session_feed", value: "[\"hi\"]" });
    expect(await got).toEqual({ key: "session_feed", value: "[\"hi\"]" });
  });

  it("rejects malformed requests", async () => {
    expect((await api("set", { world: "A", key: "", value: "x" })).status).toBe(400);
    expect((await api("set", { world: "A", key: "k", value: { not: "a string" } })).status).toBe(400);
    expect((await api("get", { world: "x".repeat(65), key: "k" })).status).toBe(400);
    expect((await api("explode", { world: "A", key: "k" })).status).toBe(404);
  });

  it("persists worlds to disk atomically and reloads them", async () => {
    await api("set", { world: "SAVE-ME", key: "k", value: "v1" });
    server.stop(); // flushes pending saves
    const file = path.join(dir, "SAVE-ME.json");
    expect(JSON.parse(fs.readFileSync(file, "utf8"))).toEqual({ k: "v1" });
    expect(fs.existsSync(file + ".tmp")).toBe(false);
    await server.start(PORT, dir);
    await settle();
    expect((await api("get", { world: "SAVE-ME", key: "k" })).json.value).toBe("v1");
  });

  it("falls back to the backup when a world file is corrupt", async () => {
    server.stop();
    const file = path.join(dir, "BROKEN.json");
    fs.writeFileSync(file + ".bak", JSON.stringify({ k: "from-backup" }));
    fs.writeFileSync(file, "{ not json");
    await server.start(PORT, dir);
    await settle();
    expect((await api("get", { world: "BROKEN", key: "k" })).json.value).toBe("from-backup");
    expect(fs.readdirSync(dir).some((f) => f.startsWith("BROKEN.json.corrupt-"))).toBe(true);
  });
});

// Phones open the host's address in a browser, so the server also hands out the app.
describe("serving the app", () => {
  const web = fs.mkdtempSync(path.join(os.tmpdir(), "sdndbz-web-"));
  fs.writeFileSync(path.join(web, "index.html"), "<!doctype html><title>app</title>");
  fs.writeFileSync(path.join(web, "manifest.webmanifest"), "{}");

  it("serves index.html at / and other files with their types", async () => {
    server.stop(); await settle();
    await server.start(PORT, dir, web);
    const page = await fetch(`${base}/`);
    expect(page.status).toBe(200);
    expect(page.headers.get("content-type")).toMatch(/text\/html/);
    expect(await page.text()).toContain("<title>app</title>");
    const man = await fetch(`${base}/manifest.webmanifest`);
    expect(man.headers.get("content-type")).toBe("application/manifest+json");
  });
  it("never serves files outside the app folder", async () => {
    expect((await fetch(`${base}/..%2fserver.js`)).status).toBe(404);
    expect((await fetch(`${base}/%2e%2e/%2e%2e/etc/hosts`)).status).toBe(404);
  });
  it("still answers the API alongside the app", async () => {
    expect((await fetch(`${base}/ping`)).status).toBe(200);
  });
});
