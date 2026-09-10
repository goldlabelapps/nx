import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/index.js";

describe("CLI Argument Parser", () => {
  it("parses flags and positional arguments accurately", () => {
    const res = parseArgs(["test", "coverage", "--quiet", "--dry-run"]);
    expect(res.command).toBe("test");
    expect(res.subcommand).toBe("coverage");
    expect(res.flags.quiet).toBe(true);
    expect(res.flags.dryRun).toBe(true);
    expect(res.flags.help).toBe(false);
  });

  it("handles short flags correctly", () => {
    const res = parseArgs(["-h", "-v", "-i", "-q", "-y"]);
    expect(res.flags.help).toBe(true);
    expect(res.flags.version).toBe(true);
    expect(res.flags.interactive).toBe(true);
    expect(res.flags.quiet).toBe(true);
    expect(res.flags.yes).toBe(true);
  });
});
