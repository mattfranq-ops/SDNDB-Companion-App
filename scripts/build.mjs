// Bundles the renderer into dist/ (bundle.js, bundle.css, font files, index.html).
//   node scripts/build.mjs           production build
//   node scripts/build.mjs --watch   rebuild on change (pair with `npm run electron`)
import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const watch = process.argv.includes("--watch");

function writeIndex() {
  const v = Date.now();
  const html = fs.readFileSync(path.join(root, "renderer", "index.html"), "utf8")
    .replace("bundle.css", `bundle.css?v=${v}`)
    .replace("bundle.js", `bundle.js?v=${v}`);
  fs.writeFileSync(path.join(dist, "index.html"), html);
  // Home-screen icons and the web app manifest for phones (renderer/public).
  fs.cpSync(path.join(root, "renderer", "public"), dist, { recursive: true });
}

const options = {
  entryPoints: [path.join(root, "renderer", "entry.jsx")],
  bundle: true,
  outfile: path.join(dist, "bundle.js"),
  loader: { ".js": "jsx", ".woff2": "file", ".woff": "file" },
  assetNames: "fonts/[name]-[hash]",
  define: { "process.env.NODE_ENV": watch ? '"development"' : '"production"' },
  target: ["chrome124", "safari15"],
  sourcemap: watch ? "inline" : false,
  // Smaller download for phones joining over Wi-Fi; names kept for error reports.
  minify: !watch,
  keepNames: true,
  logLevel: "info",
  plugins: [{ name: "index-html", setup(build) { build.onEnd((r) => { if (!r.errors.length) writeIndex(); }); } }],
};

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
