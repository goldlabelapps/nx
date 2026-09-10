import { describe, expect, it, vi } from "vitest";
import { colors, log } from "../src/terminal.js";

describe("CLI Terminal Utilities", () => {
  it("has ANSI colors defined", () => {
    expect(colors.reset).toBe("\x1b[0m");
    expect(colors.bold).toBe("\x1b[1m");
    expect(colors.brightGreen).toBe("\x1b[92m");
  });

  it("provides log helpers without throwing", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    log.info("info test");
    log.success("success test");
    log.warn("warn test");
    log.error("error test");
    log.step(1, 3, "step test");
    log.highlight("label", "value");
    log.divider();
    expect(logSpy).toHaveBeenCalledTimes(7);
    logSpy.mockRestore();
  });

  it("handles promptPostAction safely in non-interactive/test environments", async () => {
    const { promptPostAction } = await import("../src/terminal.js");
    const res = await promptPostAction();
    expect(res).toBe("continue");
  });
});
