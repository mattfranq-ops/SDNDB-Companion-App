// Draws the app icon (the connect screen's logo: a chamfered gold→red tile with
// a ringed dot) as PNGs for phones' home screens. No image libraries needed.
//   node scripts/icons.mjs     writes renderer/public/icon-{180,192,512}.png
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "renderer", "public");

const hex = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const BG = hex("#0A0C11"), GOLD = hex("#F5B942"), RED = hex("#FF5C5C"), INK = hex("#0D0F16");
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

function draw(size) {
  const px = Buffer.alloc(size * size * 3);
  const pad = size * 0.16, s = size - 2 * pad, cut = s * 0.22;   // tile + chamfer
  const c = size / 2, dot = s * 0.16, ring = s * 0.25;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x - pad, v = y - pad;
    let col = BG;
    const inTile = u >= 0 && v >= 0 && u <= s && v <= s
      && u + v >= cut && (s - u) + v >= cut && u + (s - v) >= cut && (s - u) + (s - v) >= cut;
    if (inTile) {
      col = mix(GOLD, RED, (u + v) / (2 * s));
      const d = Math.hypot(x - c, y - c);
      if (d <= ring) col = d <= dot ? INK : GOLD;
    }
    px.set(col, (y * size + x) * 3);
  }
  return px;
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size) {
  const px = draw(size);
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) px.copy(raw, y * (size * 3 + 1) + 1, y * size * 3, (y + 1) * size * 3);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

fs.mkdirSync(out, { recursive: true });
for (const size of [180, 192, 512]) fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size));
console.log("icons written to", out);
