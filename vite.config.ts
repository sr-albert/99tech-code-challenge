import { defineConfig } from "vite";
import { resolve } from "path";

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
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        problem1: resolve(__dirname, "src/problem1/index.html"),
        problem2: resolve(__dirname, "src/problem2/index.html"),
        problem3: resolve(__dirname, "src/problem3/index.html"),
      },
    },
  },
});
