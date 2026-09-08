import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { log, colors, banner, promptConfirm } from "../terminal.js";
import { killOccupiedPorts } from "./dev.js";

/**
 * Execute deep workspace clean (preserves .env files)
 */
export async function runClean(options = {}) {
  const repoRoot = process.cwd();

  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}🧹 Repository Artifact Clean & Reset${colors.reset}\n`);
    log.info("This will stop all running dev processes, clear build caches, and remove node_modules.");
    log.info("Environment (.env, .env.*) and workspace configs will be preserved.\n");
  }

  if (options.interactive && !options.yes) {
    const confirmed = await promptConfirm("Are you sure you want to clean the repository?", false);
    if (!confirmed) {
      log.info("Clean operation cancelled.");
      return true;
    }
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would terminate lingering processes, remove .turbo, .next, and node_modules directories.`);
    return true;
  }

  // 1. Free ports and background processes
  log.info("Stopping lingering processes & freeing ports...");
  try {
    killOccupiedPorts();
  } catch {}

  // 2. Git clean if in a repository
  let cleanedViaGit = false;
  try {
    const isGit = execSync("git rev-parse --is-inside-work-tree", { stdio: "pipe", encoding: "utf-8" }).trim() === "true";
    if (isGit) {
      log.info("Cleaning ignored build artifacts via git (preserving .env)...");
      execSync("git clean -fdX -e .env -e .env.* -e '**/.env' -e '**/.env.*'", { stdio: "inherit" });
      cleanedViaGit = true;
    }
  } catch {
    // Fallback to manual removal
  }

  // 3. Manual fallback cleaning for node_modules, .turbo, .next
  const targets = [".turbo", ".next", "dist", "build-storybook-static", ".yarn", "yarn.lock"];
  const removeDirsRecursively = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (targets.includes(entry.name) || entry.name === "node_modules") {
            try {
              fs.rmSync(fullPath, { recursive: true, force: true });
            } catch {}
          } else if (!entry.name.startsWith(".git")) {
            removeDirsRecursively(fullPath);
          }
        }
      }
    } catch {}
  };

  if (!cleanedViaGit) {
    log.info("Performing manual file system cleanup...");
    removeDirsRecursively(repoRoot);
  }

  log.divider();
  log.success("Clean complete! Run 'pnpm install' or 'pnpm run dev' to rebuild.");
  return true;
}
