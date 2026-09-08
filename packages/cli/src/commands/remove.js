import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { log, promptSelect, promptConfirm } from "../terminal.js";
import { findMonorepoRoot } from "./create.js";

// Apps that scaffolding/tooling depends on and must never be removed by this command
const PROTECTED_APPS = new Set(["nx", "template"]);

function listRemovableApps(rootDirectory) {
  const appsDirectory = path.join(rootDirectory, "apps");
  if (!fs.existsSync(appsDirectory)) return [];
  return fs
    .readdirSync(appsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !PROTECTED_APPS.has(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function writeText(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

/** Remove the app's registry object literal (if any) from dev.js's hardcoded APPS map */
function stripFromDevJs(rootDirectory, key) {
  const filePath = path.join(rootDirectory, "packages/cli/src/commands/dev.js");
  const content = readText(filePath);
  if (!content) return false;

  let updated = content;
  let changed = false;

  const entryMatch = updated.match(new RegExp(`\\n  ${key}: \\{[\\s\\S]*?\\n  \\},`));
  if (entryMatch) {
    const portMatch = entryMatch[0].match(/port:\s*(\d+)/);
    updated = updated.replace(entryMatch[0], "");
    changed = true;

    if (portMatch) {
      const port = portMatch[1];
      updated = updated.replace(
        /export const MONOREPO_PORTS = \[([^\]]+)\];/,
        (_full, list) => {
          const ports = list.split(",").map((p) => p.trim()).filter((p) => p !== port);
          return `export const MONOREPO_PORTS = [${ports.join(", ")}];`;
        }
      );
      updated = updated.replace(
        new RegExp(`\\s*log\\.info\\(\`[^\`]*localhost:${port}[^\`]*\`\\);\\n`),
        "\n"
      );
    }
  }

  if (changed) writeText(filePath, updated);
  return changed;
}

/** Remove the app's hardcoded command line (if any) from help.js */
function stripFromHelpJs(rootDirectory, key) {
  const filePath = path.join(rootDirectory, "packages/cli/src/commands/help.js");
  const content = readText(filePath);
  if (!content) return false;

  const lines = content.split("\n");
  const filtered = lines.filter(
    (line) => !new RegExp(`\\$\\{colors\\.brightGreen\\}${key}\\$\\{colors\\.reset\\}`).test(line)
  );

  if (filtered.length === lines.length) return false;
  writeText(filePath, filtered.join("\n"));
  return true;
}

/** Remove the app from root package.json's dev:all and build script chains */
function stripFromRootPackageJson(rootDirectory, key) {
  const filePath = path.join(rootDirectory, "package.json");
  const pkg = JSON.parse(readText(filePath));
  let changed = false;

  if (pkg.scripts?.["dev:all"]) {
    const script = pkg.scripts["dev:all"];
    const commandRegex = /"pnpm --dir ([^\s"]+) dev"/g;
    const dirs = [...script.matchAll(commandRegex)].map((m) => m[1]);
    const index = dirs.indexOf(`apps/${key}`);
    if (index !== -1) {
      const namesMatch = script.match(/-n ([^\s]+)/);
      const colorsMatch = script.match(/-c ([^\s]+)/);
      const commands = [...script.matchAll(commandRegex)].map((m) => m[0]);
      commands.splice(index, 1);

      let updated = script;
      if (namesMatch) {
        const names = namesMatch[1].split(",");
        names.splice(index, 1);
        updated = updated.replace(namesMatch[0], `-n ${names.join(",")}`);
      }
      if (colorsMatch) {
        const shades = colorsMatch[1].split(",");
        shades.splice(index, 1);
        updated = updated.replace(colorsMatch[0], `-c ${shades.join(",")}`);
      }
      updated = updated.replace(/"pnpm --dir [^\s"]+ dev"( "pnpm --dir [^\s"]+ dev")*/, commands.join(" "));
      pkg.scripts["dev:all"] = updated;
      changed = true;
    }
  }

  if (pkg.scripts?.build) {
    const segments = pkg.scripts.build.split(" && ");
    const filtered = segments.filter((segment) => !segment.includes(`apps/${key} build`));
    if (filtered.length !== segments.length) {
      pkg.scripts.build = filtered.join(" && ");
      changed = true;
    }
  }

  if (changed) writeText(filePath, `${JSON.stringify(pkg, null, 2)}\n`);
  return changed;
}

/** Remove the app's row from the root README.md workspace map table */
function stripFromReadme(rootDirectory, key) {
  const filePath = path.join(rootDirectory, "README.md");
  const content = readText(filePath);
  if (!content) return false;

  const lines = content.split("\n");
  const filtered = lines.filter((line) => !line.includes(`(./apps/${key})`));
  if (filtered.length === lines.length) return false;
  writeText(filePath, filtered.join("\n"));
  return true;
}

/** Remove the app's entry from docs/apps/apps.md and delete its docs subfolder, if any */
function stripFromDocs(rootDirectory, key) {
  let changed = false;

  const docsAppDirectory = path.join(rootDirectory, "docs/apps", key);
  if (fs.existsSync(docsAppDirectory)) {
    fs.rmSync(docsAppDirectory, { recursive: true, force: true });
    changed = true;
  }

  const apppsMdPath = path.join(rootDirectory, "docs/apps/apps.md");
  const content = readText(apppsMdPath);
  if (content) {
    const lines = content.split("\n");
    const filtered = lines.filter(
      (line) => !line.includes(`](./${key}/`) && !line.includes(`apps/${key}/`)
    );
    if (filtered.length !== lines.length) {
      writeText(apppsMdPath, filtered.join("\n"));
      changed = true;
    }
  }

  return changed;
}

/** Remove the app's package.json entry from the required test workspaces list */
function stripFromTestingFramework(rootDirectory, key) {
  const filePath = path.join(rootDirectory, "tests/testing-framework.test.mjs");
  const content = readText(filePath);
  if (!content) return false;

  const lines = content.split("\n");
  const filtered = lines.filter((line) => line.trim() !== `'apps/${key}/package.json',`);
  if (filtered.length === lines.length) return false;
  writeText(filePath, filtered.join("\n"));
  return true;
}

export async function runRemove(options = {}) {
  const rootDirectory = findMonorepoRoot(options.rootDirectory);
  if (!rootDirectory) {
    log.error("Could not find apps/nx. Run this command from the NX monorepo.");
    return false;
  }

  const removable = listRemovableApps(rootDirectory);
  if (removable.length === 0) {
    log.error("No removable apps found under apps/.");
    return false;
  }

  let key = options.target;
  if (key && !removable.includes(key)) {
    log.error(`'${key}' is not a removable app. Available: ${removable.join(", ")}`);
    return false;
  }
  if (!key) {
    key = await promptSelect(
      "🗑️  Select Application to Remove",
      removable.map((name) => ({ label: name, value: name }))
    );
    if (key === "exit") {
      log.info("Aborted app removal.");
      return true;
    }
  }

  const targetDirectory = path.join(rootDirectory, "apps", key);
  if (!fs.existsSync(targetDirectory)) {
    log.error(`No app found at apps/${key}.`);
    return false;
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would delete apps/${key}, strip its references from CLI/config/docs, and run pnpm install.`);
    return true;
  }

  if (!options.yes) {
    const confirmed = await promptConfirm(`Permanently delete apps/${key} and all its references?`, false);
    if (!confirmed) {
      log.info("Aborted app removal.");
      return true;
    }
  }

  fs.rmSync(targetDirectory, { recursive: true, force: true });
  stripFromDevJs(rootDirectory, key);
  stripFromHelpJs(rootDirectory, key);
  stripFromRootPackageJson(rootDirectory, key);
  stripFromReadme(rootDirectory, key);
  stripFromDocs(rootDirectory, key);
  stripFromTestingFramework(rootDirectory, key);

  log.warn(`Check packages/cli/tests/cli.test.js for stale assertions referencing '${key}'.`);

  log.info("Refreshing lockfile...");
  execFileSync("pnpm", ["install"], { cwd: rootDirectory, stdio: "inherit" });

  log.success(`Removed apps/${key} and its references from the monorepo.`);
  return true;
}
