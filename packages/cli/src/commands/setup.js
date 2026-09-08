import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { checkEnv } from "../env.js";
import { log, banner, colors } from "../terminal.js";

/**
 * Execute command with inherited stdio or dry-run simulation
 */
function runStep(cmd, options = {}) {
  const isDryRun = options.dryRun || false;
  if (isDryRun) {
    log.info(`[DRY-RUN] Would execute: ${colors.cyan}${cmd}${colors.reset}`);
    return true;
  }
  try {
    execSync(cmd, { stdio: "inherit", shell: true });
    return true;
  } catch {
    log.error(`Command failed: ${cmd}`);
    return false;
  }
}

/**
 * Run interactive project setup
 */
export async function runSetup(options = {}) {
  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}🚀 Guided Project Setup & Onboarding Wizard${colors.reset}\n`);
  }

  // Step 1: Environment diagnostics
  log.step(1, 5, "Checking runtime environment and dependencies...");
  const env = checkEnv();

  if (!env.node.supported) {
    log.error(`Node.js version ${env.node.version} is not supported. Please install Node.js v18.0.0 or higher (v20+ recommended).`);
    return false;
  }

  log.success(`Node.js runtime v${env.node.version} verified.`);
  const pm = env.packageManagers.preferred;
  log.info(`Using package manager: ${colors.bold}${pm}${colors.reset}`);

  // Step 2: Install Node modules
  log.step(2, 5, `Installing project dependencies via ${pm}...`);
  const installCmd = `${pm} install`;
  const installOk = runStep(installCmd, options);
  if (!installOk) {
    log.error("Failed to install dependencies.");
    return false;
  }
  log.success("Dependencies installed successfully.");

  // Step 3: Ensure pnpm workspace allowBuilds configuration
  log.step(3, 5, "Verifying build script supply chain permissions...");
  const workspacePath = path.resolve(process.cwd(), "pnpm-workspace.yaml");
  if (!fs.existsSync(workspacePath)) {
    fs.writeFileSync(workspacePath, "allowBuilds:\n  unrs-resolver: true\nminimumReleaseAgeExclude:\n  - lucide-react@1.34.0\n", "utf-8");
    log.info("Created pnpm-workspace.yaml with approved native builds.");
  }
  log.success("Build permissions verified.");

  // Step 4: Quick sanity check
  log.step(4, 4, "Running initial TypeScript type check...");
  const typecheckOk = runStep(`${pm} run type-check`, options);
  if (!typecheckOk) {
    log.warn("Typecheck reported warnings or errors. Check your code configuration.");
  } else {
    log.success("TypeScript compilation passed with 0 errors.");
  }

  log.divider();
  log.success("🎉 Project setup is complete!");
  // console.log(`\n${colors.bold}${colors.brightWhite}What's next?${colors.reset}`);
  // console.log(`  ${colors.brightCyan}1.${colors.reset} Run dev server:         ${colors.bold}${pm} run dev${colors.reset}  ${colors.dim}(http://localhost:5590)${colors.reset}`);
  // console.log(`  ${colors.brightCyan}2.${colors.reset} Open interactive CLI:   ${colors.bold}${pm} run cli${colors.reset}`);
  // console.log(`  ${colors.brightCyan}3.${colors.reset} Run all test suites:    ${colors.bold}${pm} test${colors.reset}`);
  // console.log(`  ${colors.brightCyan}4.${colors.reset} Customize site config:  ${colors.bold}src/config/site.config.ts${colors.reset}\n`);

  return true;
}
