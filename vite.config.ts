import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 5174,
    open: false,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
