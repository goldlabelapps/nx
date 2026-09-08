import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const appDir = path.resolve(import.meta.dirname, "../..");

describe("Template Distribution & Assets", () => {
  it("verifies Next.js core application files exist", () => {
    const coreFiles = [
      "package.json",
      "project.json",
      "next.config.ts",
      "tsconfig.json",
      "vercel.json",
    ];

    for (const file of coreFiles) {
      const filePath = path.join(appDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  it("verifies public documentation chapters exist", () => {
    const docChapters = [
      "public/md/index.md",
      "public/md/nx/developer/installation.md",
      "public/md/nx/config.md",
      "public/md/nx/developer/testing.md",
      "public/md/nx/api.md",
      "public/md/nx/architecture.md",
      "public/md/python/index.md",
      "public/md/career/nextjs/next-js.md",
    ];

    for (const doc of docChapters) {
      const filePath = path.join(appDir, doc);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });
});
