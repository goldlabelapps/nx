import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runCli } from "../src/index.js";

describe("CLI Non-Interactive Command Dispatcher", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("outputs version when --version flag is passed", async () => {
    await runCli(["--version"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("gla v3.3.0"));
  });

  it("outputs help manual when --help flag is passed", async () => {
    await runCli(["--help"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("SYNOPSIS"));
  });

  it("runs env diagnostics without error", async () => {
    await runCli(["env", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Environment & Toolchain Diagnostics"));
  });

  it("supports dry-run on test command", async () => {
    await runCli(["test", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DRY-RUN]"));
  });

  it("supports dry-run on build command for all packages and apps", async () => {
    await runCli(["build", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Starting workspace build for all packages and applications"));
  });

  it("prevents recursive build loops via GLA_BUILDING environment guard", async () => {
    process.env.GLA_BUILDING = "1";
    try {
      await runCli(["build"]);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("CLI build already in progress"));
    } finally {
      delete process.env.GLA_BUILDING;
    }
  });

  it("supports dry-run on dev command for all apps", async () => {
    await runCli(["dev", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[DRY-RUN\] Freeing ports \(4500-4550\) and starting: .+ run dev:all/));
  });

  it("supports dry-run launching single app via 'dev nx' and opens browser", async () => {
    await runCli(["dev", "nx", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DRY-RUN] Freeing port 4500, opening browser at http://localhost:4500"));
  });

  it("supports dry-run on clean command", async () => {
    await runCli(["clean", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DRY-RUN] Would terminate lingering processes"));
  });

  it("supports packages update subcommand", async () => {
    await runCli(["packages", "update", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DRY-RUN]"));
  });

  it("supports dry-run on update command for @goldlabelapps packages", async () => {
    await runCli(["update", "--dry-run", "--quiet"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DRY-RUN]"));
  });

  it("exports updatePackages and supports dry-run mode", async () => {
    const { updatePackages } = await import("../src/commands/packages.js");
    const result = await updatePackages({ dryRun: true });
    expect(result).toBe(true);
  });

  it("handles unknown commands gracefully", async () => {
    const errorSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await runCli(["unknown-command"]);
    expect(process.exitCode).toBe(1);
    process.exitCode = 0;
    errorSpy.mockRestore();
  });
});
