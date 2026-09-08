import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/**/*.{test,spec}.{js,ts}"],
    testTimeout: 15000,
  },
});
