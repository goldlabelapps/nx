import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "e2e", ".next"],
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/app/layout.tsx",
        "src/config/types.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 75,
        lines: 80,
      },
    },
    server: {
      deps: {
        inline: [
          "react-redux",
          "@goldlabelapps/uberedux",
          "@goldlabelapps/prospects",
        ],
      },
    },
  },
  ssr: {
    noExternal: ["react-redux", "@goldlabelapps/uberedux", "@goldlabelapps/prospects"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@goldlabelapps/agent-layer": path.resolve(import.meta.dirname, "../../packages/agent-layer/src"),
      "@goldlabelapps/theme": path.resolve(import.meta.dirname, "../../packages/theme/src"),
      "@goldlabelapps/flash": path.resolve(import.meta.dirname, "../../packages/flash/src"),
      "@goldlabelapps/notify": path.resolve(import.meta.dirname, "../../packages/notify/src"),
      "@goldlabelapps/prospects": path.resolve(import.meta.dirname, "../../packages/prospects/src"),
      "@goldlabelapps/uberedux": path.resolve(import.meta.dirname, "../../packages/uberedux/src"),
    },
  },
});
