import path from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        exclude: ["@apt/db", "@apt/lib", "@apt/types", "@apt/ui"]
      })
    ],
    build: {
      rollupOptions: {
        external: ["better-sqlite3"]
      }
    },
    resolve: {
      alias: {
        "@apt/types": path.resolve(__dirname, "../../packages/types/src/index.ts"),
        "@apt/lib": path.resolve(__dirname, "../../packages/lib/src/index.ts"),
        "@apt/db": path.resolve(__dirname, "../../packages/db/src/index.ts"),
        "@apt/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts")
      }
    }
  },
  preload: {
    plugins: [
      externalizeDepsPlugin({
        exclude: ["@apt/db", "@apt/lib", "@apt/types", "@apt/ui"]
      })
    ],
    resolve: {
      alias: {
        "@apt/types": path.resolve(__dirname, "../../packages/types/src/index.ts")
      }
    }
  },
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        "@apt/types": path.resolve(__dirname, "../../packages/types/src/index.ts"),
        "@apt/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts")
      }
    }
  }
});
