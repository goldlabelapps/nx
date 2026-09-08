import { execSync } from "node:child_process";
import { log, colors } from "../terminal.js";
import { checkEnv } from "../env.js";
import { getPackagesInfo } from "./packages.js";

/**
 * Build all packages and applications in the monorepo workspace
 */
export async function runBuild(options = {}) {
  if (process.env.GLA_BUILDING === "1") {
    log.info(`${colors.dim}• CLI build already in progress (skipped nested call)${colors.reset}`);
    return true;
  }
  process.env.GLA_BUILDING = "1";

  try {
    const { packages, apps } = getPackagesInfo();
    const env = checkEnv();
    const pm = env.packageManagers.preferred || "pnpm";

    log.info(`${colors.bold}Starting workspace build for all packages and applications...${colors.reset}`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    // 1. Build packages first
    if (packages.length > 0) {
      log.info(`\n${colors.bold}Building packages (${packages.length}):${colors.reset}`);
      for (const pkg of packages) {
        // Prevent recursive death loop by skipping CLI package itself or recursive build invocations
        const isCliPkg = pkg.key === "cli" || pkg.name === "@goldlabelapps/cli" || pkg.dir.includes("packages/cli");
        const isSelfBuild = pkg.scripts?.build?.includes("cli.js build");
        const isNoopBuild = !pkg.scripts?.build || pkg.scripts?.build.startsWith("echo ");

        if (isCliPkg || isSelfBuild || isNoopBuild) {
          log.info(`  ${colors.dim}• ${pkg.name}: No separate build step required (skipped)${colors.reset}`);
          skipCount++;
          continue;
        }

        if (options.dryRun) {
          log.info(`  ${colors.brightCyan}[DRY-RUN]${colors.reset} Would build package ${pkg.name} (${pkg.dir})`);
          successCount++;
        } else {
          log.info(`  ${colors.brightCyan}➜${colors.reset} Building package ${colors.bold}${pkg.name}${colors.reset}...`);
          try {
            execSync(`${pm} --dir "${pkg.dir}" build`, { stdio: "inherit" });
            log.success(`Built ${pkg.name} successfully.`);
            successCount++;
          } catch (err) {
            log.error(`Failed to build package ${pkg.name}: ${err.message}`);
            failCount++;
          }
        }
      }
    }

    // 2. Build applications
    if (apps.length > 0) {
      log.info(`\n${colors.bold}Building applications (${apps.length}):${colors.reset}`);
      for (const app of apps) {
        const isSelfBuild = app.scripts?.build?.includes("cli.js build");
        const isNoopBuild = !app.scripts?.build || app.scripts?.build.startsWith("echo ");

        if (isSelfBuild || isNoopBuild) {
          log.info(`  ${colors.dim}• ${app.name}: No separate build step required (skipped)${colors.reset}`);
          skipCount++;
          continue;
        }

        if (options.dryRun) {
          log.info(`  ${colors.brightCyan}[DRY-RUN]${colors.reset} Would build application ${app.name} (${app.dir})`);
          successCount++;
        } else {
          log.info(`  ${colors.brightCyan}➜${colors.reset} Building application ${colors.bold}${app.name}${colors.reset}...`);
          try {
            execSync(`${pm} --dir "${app.dir}" build`, { stdio: "inherit" });
            log.success(`Built application ${app.name} successfully.`);
            successCount++;
          } catch (err) {
            log.error(`Failed to build application ${app.name}: ${err.message}`);
            failCount++;
          }
        }
      }
    }

    if (packages.length === 0 && apps.length === 0) {
      if (options.dryRun) {
        log.info(`[DRY-RUN] Would run ${pm} run build at repository root.`);
        return true;
      }
      try {
        execSync(`${pm} run build`, { stdio: "inherit" });
        log.success("Workspace build completed successfully.");
        return true;
      } catch (err) {
        log.error(`Workspace build failed: ${err.message}`);
        return false;
      }
    }

    log.divider();
    if (failCount > 0) {
      log.error(`Build finished with ${failCount} failure(s) and ${successCount} success(es).`);
      return false;
    } else {
      log.success(`All targets built successfully (${successCount} target(s) built, ${skipCount} skipped).`);
      return true;
    }
  } finally {
    delete process.env.GLA_BUILDING;
  }
}
