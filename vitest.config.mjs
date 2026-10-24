import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { loader: "jsx", include: /renderer\/.*\.jsx?$/, jsx: "transform" },
  test: { include: ["test/**/*.test.js"], environment: "node" },
});
