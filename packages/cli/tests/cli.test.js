import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { parseArgs, runCli } from "../src/index.js";
import { resolveApp } from "../src/commands/dev.js";
import { checkEnv } from "../src/env.js";
import { colors, log } from "../src/terminal.js";
import { slugifyAppName } from "../src/commands/create.js";

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

describe("CLI App Resolver", () => {
  it("creates URL-safe folder slugs from app names", () => {
    expect(slugifyAppName("Acme's Great App!")).toBe("acme-s-great-app");
    expect(slugifyAppName("Cafe Del Mar")).toBe("cafe-del-mar");
  });

  it("resolves exact app keys and aliases", () => {
    expect(resolveApp("www")).toBeNull();
    expect(resolveApp("microsite")).toBeNull();
    expect(resolveApp("goldlabel")).toBeNull();
    expect(resolveApp("gold")).toBeNull();
    expect(resolveApp("gl")).toBeNull();
    expect(resolveApp("nx")?.port).toBe(4500);
    expect(resolveApp("template")?.port).toBe(4500);
    expect(resolveApp("starter")?.port).toBe(4500);
    expect(resolveApp("tpl")?.port).toBe(4500);
    expect(resolveApp("prospects")).toBeNull();
    expect(resolveApp("echopay")).toBeNull();
    expect(resolveApp("storybook")).toBeNull();
    expect(resolveApp("ds")).toBeNull();
    expect(resolveApp("nonexistent")).toBeNull();
  });
});

describe("CLI Environment Validator", () => {
  it("detects current node version and system environment", () => {
    const env = checkEnv();
    expect(env.node.major).toBeGreaterThanOrEqual(18);
    expect(env.node.supported).toBe(true);
    expect(env.os.platform).toBeDefined();
    expect(env.packageManagers.preferred).toBeDefined();
  });
});

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
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("gla v3.0.4"));
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

  it("handles dry-run publish based on available public packages", async () => {
    await runCli(["publish", "all", "--dry-run", "--quiet", "--yes"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[DRY-RUN\]|No public publishable packages/));
  });

  it("exports ensureNpmAuth and supports dry-run mode", async () => {
    const { ensureNpmAuth } = await import("../src/commands/packages.js");
    const result = await ensureNpmAuth({ dryRun: true });
    expect(result).toBe(true);
  });

  it("prints publish status report table without error", async () => {
    const { printPublishStatusReport } = await import("../src/commands/packages.js");
    printPublishStatusReport([
      { name: "@goldlabelapps/theme", version: "1.0.0", status: "SUCCESS" },
      { name: "@goldlabelapps/cli", version: "3.0.4", status: "FAILED", error: "Auth failed" },
    ]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Monorepo Package Publish Status Report"));
  });

  it("supports packages status subcommand", async () => {
    await runCli(["packages", "status"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Monorepo Package Registry"));
  });

  it("handles unknown commands gracefully", async () => {
    const errorSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await runCli(["unknown-command"]);
    expect(process.exitCode).toBe(1);
    process.exitCode = 0;
    errorSpy.mockRestore();
  });
});

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

