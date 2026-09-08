import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import { log, colors } from "./terminal.js";

/**
 * Execute command silently and return stdout, or null if failed
 */
export function execQuiet(command, timeoutMs = 1500) {
  try {
    return execSync(command, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: timeoutMs,
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Inspect development environment and toolchain
 */
export function checkEnv() {
  const nodeVersion = process.versions.node;
  const majorNode = parseInt(nodeVersion.split(".")[0], 10);
  const isNodeSupported = majorNode >= 18;
  const isNodeRecommended = majorNode >= 20;

  // Check package managers with fast timeouts
  const pnpmVersion = execQuiet("pnpm --version", 1000);
  const npmVersion = execQuiet("npm --version", 1000);
  const yarnVersion = execQuiet("yarn --version", 1000);
  const bunVersion = execQuiet("bun --version", 1000);

  // Determine preferred package manager
  let preferredPm = "npm";
  if (pnpmVersion) preferredPm = "pnpm";
  else if (bunVersion) preferredPm = "bun";
  else if (yarnVersion) preferredPm = "yarn";

  // Check Git
  const gitVersion = execQuiet("git --version", 1000);
  let gitBranch = gitVersion ? execQuiet("git branch --show-current", 1000) : null;
  if (!gitBranch && gitVersion) {
    const fallbackRef = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || execQuiet("git rev-parse --abbrev-ref HEAD", 1000);
    if (fallbackRef && fallbackRef !== "HEAD") {
      gitBranch = fallbackRef;
    }
  }
  const gitDirty = gitVersion ? execQuiet("git status --porcelain", 1000) : null;

  // Check Playwright from package.json or fast version
  let playwrightVersion = null;
  try {
    const pkgPath = path.resolve(process.cwd(), "node_modules/@playwright/test/package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      playwrightVersion = `Version ${pkg.version}`;
    }
  } catch {
    playwrightVersion = null;
  }

  return {
    os: {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      type: os.type(),
    },
    node: {
      version: nodeVersion,
      major: majorNode,
      supported: isNodeSupported,
      recommended: isNodeRecommended,
    },
    packageManagers: {
      preferred: preferredPm,
      pnpm: pnpmVersion,
      npm: npmVersion,
      yarn: yarnVersion,
      bun: bunVersion,
    },
    git: {
      installed: !!gitVersion,
      version: gitVersion,
      branch: gitBranch,
      isClean: gitDirty === "",
    },
    playwright: {
      installed: !!playwrightVersion,
      version: playwrightVersion,
    },
  };
}

/**
 * Print environment summary to terminal
 */
export function printEnvSummary() {
  const env = checkEnv();
  
  console.log(`\n${colors.bold}${colors.brightWhite}🔧 Environment & Toolchain Diagnostics${colors.reset}`);
  log.divider();

  // OS Info
  const osLabel = `${env.os.platform} (${env.os.arch}) - ${env.os.type} ${env.os.release}`;
  log.highlight("Operating System", osLabel);

  // Node.js
  if (env.node.recommended) {
    console.log(`   ${colors.dim}•${colors.reset} ${colors.bold}Node.js:${colors.reset}        ${colors.brightGreen}v${env.node.version} (Recommended)${colors.reset}`);
  } else if (env.node.supported) {
    console.log(`   ${colors.dim}•${colors.reset} ${colors.bold}Node.js:${colors.reset}        ${colors.yellow}v${env.node.version} (Supported, v20+ recommended)${colors.reset}`);
  } else {
    console.log(`   ${colors.dim}•${colors.reset} ${colors.bold}Node.js:${colors.reset}        ${colors.brightRed}v${env.node.version} (Unsupported! Requires v18+)${colors.reset}`);
  }

  // Package Managers
  const pmStatus = [
    env.packageManagers.pnpm ? `${colors.brightGreen}pnpm v${env.packageManagers.pnpm}${colors.reset}` : `${colors.gray}pnpm (missing)${colors.reset}`,
    env.packageManagers.npm ? `${colors.brightGreen}npm v${env.packageManagers.npm}${colors.reset}` : `${colors.gray}npm (missing)${colors.reset}`,
    env.packageManagers.bun ? `${colors.cyan}bun v${env.packageManagers.bun}${colors.reset}` : null,
  ].filter(Boolean).join("  |  ");
  log.highlight("Package Managers", pmStatus);
  log.highlight("Active Strategy", `${colors.brightCyan}${env.packageManagers.preferred}${colors.reset}`);

  // Git
  if (env.git.installed) {
    const branchStatus = env.git.branch ? `branch: ${colors.cyan}${env.git.branch}${colors.reset}` : "detached";
    const cleanStatus = env.git.isClean ? `${colors.brightGreen}clean working tree${colors.reset}` : `${colors.brightYellow}uncommitted changes${colors.reset}`;
    log.highlight("Git Repository", `${env.git.version} (${branchStatus}, ${cleanStatus})`);
  } else {
    console.log(`   ${colors.dim}•${colors.reset} ${colors.bold}Git:${colors.reset}           ${colors.yellow}Not installed or not in PATH${colors.reset}`);
  }

  // Playwright
  if (env.playwright.installed) {
    log.highlight("Playwright", `${colors.brightGreen}${env.playwright.version}${colors.reset}`);
  } else {
    log.highlight("Playwright", `${colors.gray}Not installed locally${colors.reset}`);
  }

  log.divider();
  return env;
}
