import { execSync } from "node:child_process";
import { checkEnv } from "../env.js";
import { log, colors, banner } from "../terminal.js";

export async function runTest(subcommand, options = {}) {
  const env = checkEnv();
  const pm = env.packageManagers.preferred;

  if (!options.quiet && (options.interactive || !subcommand)) {
    console.log(banner);
  }

  const cmd = `${pm} run ci`;
  const description = "Running Pre-Merge CI Quality Gate Pipeline";

  log.info(`${colors.bold}${description}${colors.reset}`);
  log.divider();

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would execute: ${colors.cyan}${cmd}${colors.reset}`);
    return true;
  }

  try {
    execSync(cmd, { stdio: "inherit", shell: true });
    log.divider();
    log.success(`${description} completed successfully.`);
    return true;
  } catch {
    log.divider();
    log.error(`${description} encountered failures.`);
    return false;
  }
}
