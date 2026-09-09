import fs from "node:fs";
import nodePath from "node:path";
import { execSync } from "node:child_process";
import { log, colors, banner, promptSelect, promptInput, promptConfirm } from "../terminal.js";
import { checkEnv } from "../env.js";
import { killOccupiedPorts, resolveApp } from "./dev.js";
import { slugifyAppName } from "./create.js";

function findRepoRoot() {
  let curr = process.cwd();
  while (curr !== nodePath.dirname(curr)) {
    if (fs.existsSync(nodePath.join(curr, "pnpm-workspace.yaml"))) {
      return curr;
    }
    curr = nodePath.dirname(curr);
  }
  return process.cwd();
}

/**
 * Scan packages directory and consuming apps to get full inventory
 */
export function getPackagesInfo() {
  const rootDir = findRepoRoot();
  const packagesDir = nodePath.join(rootDir, "packages");
  const appsDir = nodePath.join(rootDir, "apps");

  const packages = [];
  const apps = [];

  // 1. Scan apps
  if (fs.existsSync(appsDir)) {
    const appEntries = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const entry of appEntries) {
      if (!entry.isDirectory()) continue;
      const pkgPath = nodePath.join(appsDir, entry.name, "package.json");
      if (fs.existsSync(pkgPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
          apps.push({
            key: entry.name,
            name: manifest.name || entry.name,
            dir: nodePath.join("apps", entry.name),
            dependencies: manifest.dependencies || {},
            devDependencies: manifest.devDependencies || {},
            scripts: manifest.scripts || {},
          });
        } catch {}
      }
    }
  }

  // 2. Scan packages
  if (fs.existsSync(packagesDir)) {
    const pkgEntries = fs.readdirSync(packagesDir, { withFileTypes: true });
    for (const entry of pkgEntries) {
      if (!entry.isDirectory()) continue;
      const pkgPath = nodePath.join(packagesDir, entry.name, "package.json");
      if (fs.existsSync(pkgPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
          const distPath = nodePath.join(packagesDir, entry.name, "dist");
          const hasDist = fs.existsSync(distPath) && fs.readdirSync(distPath).length > 0;

          // Find which apps consume this package
          const consumers = [];
          for (const app of apps) {
            const depVersion = app.dependencies[manifest.name] || app.devDependencies[manifest.name];
            if (depVersion) {
              consumers.push({
                appKey: app.key,
                appName: app.name,
                versionSpec: depVersion,
                isWorkspace: depVersion.includes("workspace"),
              });
            }
          }

          packages.push({
            key: entry.name,
            name: manifest.name || entry.name,
            version: manifest.version || "1.0.0",
            dir: nodePath.join("packages", entry.name),
            private: Boolean(manifest.private),
            publishAccess: manifest.publishConfig?.access || (manifest.private ? "restricted" : "public"),
            hasDist,
            scripts: manifest.scripts || {},
            consumers,
            manifest,
          });
        } catch {}
      }
    }
  }

  return { packages, apps };
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function packageNameFromSlug(slug) {
  return `@goldlabelapps/${slug}`;
}

function packageFiles(slug, displayName, version) {
  const packageName = packageNameFromSlug(slug);
  return {
    "package.json": {
      name: packageName,
      version,
      description: `${displayName} package for Goldlabel applications.`,
      type: "module",
      main: "dist/index.js",
      module: "dist/index.js",
      types: "dist/index.d.ts",
      exports: {
        ".": {
          types: "./dist/index.d.ts",
          import: "./dist/index.js",
          require: "./dist/index.js",
        },
      },
      files: ["dist"],
      publishConfig: { access: "public" },
      scripts: {
        build: "tsc -p tsconfig.build.json",
        "type-check": "tsc --noEmit",
        test: "node --test",
      },
      devDependencies: {
        typescript: "^5",
      },
    },
    "tsconfig.json": {
      extends: "../../tsconfig.json",
      compilerOptions: {
        noEmit: true,
        module: "esnext",
        moduleResolution: "bundler",
        lib: ["ES2020"],
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
    },
    "tsconfig.build.json": {
      extends: "./tsconfig.json",
      compilerOptions: {
        noEmit: false,
        declaration: true,
        outDir: "dist",
        module: "ESNext",
        target: "ES2020",
        isolatedModules: false,
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist", "**/*.test.ts"],
    },
    "src/index.ts": `/** Public entry point for ${displayName}. */\nexport {};\n`,
    "README.md": `# ${displayName}\n\n## ${packageName}\n\nA public package for Goldlabel applications.\n\n## Development\n\npnpm build compiles the package to dist/.\n`,
  };
}

export async function createPackage(options = {}) {
  const rootDir = findRepoRoot();
  const rootManifest = JSON.parse(fs.readFileSync(nodePath.join(rootDir, "package.json"), "utf8"));
  const displayName = options.name || await promptInput("Package name");
  const slug = slugifyAppName(displayName || "");

  if (!displayName || !slug) {
    log.error("A package name is required.");
    return false;
  }

  const packageDir = nodePath.join(rootDir, "packages", slug);
  if (fs.existsSync(packageDir)) {
    log.error(`A package already exists at packages/${slug}.`);
    return false;
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would create public package ${packageNameFromSlug(slug)} in packages/${slug}.`);
    return true;
  }

  try {
    const files = packageFiles(slug, displayName, rootManifest.version || "1.0.0");
    fs.mkdirSync(nodePath.join(packageDir, "src"), { recursive: true });
    writeJson(nodePath.join(packageDir, "package.json"), files["package.json"]);
    writeJson(nodePath.join(packageDir, "tsconfig.json"), files["tsconfig.json"]);
    writeJson(nodePath.join(packageDir, "tsconfig.build.json"), files["tsconfig.build.json"]);
    fs.writeFileSync(nodePath.join(packageDir, "src/index.ts"), files["src/index.ts"], "utf8");
    fs.writeFileSync(nodePath.join(packageDir, "README.md"), files["README.md"], "utf8");

    log.info("Refreshing workspace dependencies...");
    execSync("pnpm install", { cwd: rootDir, stdio: "inherit" });
    log.success(`Created public package ${packageNameFromSlug(slug)} at packages/${slug}.`);
    log.info("Package is ready to build and publish with npm publish --access public.");
    return true;
  } catch (error) {
    fs.rmSync(packageDir, { recursive: true, force: true });
    log.error(`Could not create package ${displayName}: ${error.message}`);
    return false;
  }
}

function removePackageDependencyReferences(rootDir, packageName) {
  const workspaceFiles = [];
  for (const root of ["apps", "packages"]) {
    const directory = nodePath.join(rootDir, root);
    if (!fs.existsSync(directory)) continue;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) workspaceFiles.push(nodePath.join(directory, entry.name, "package.json"));
    }
  }

  let changed = false;
  for (const filePath of workspaceFiles) {
    if (!fs.existsSync(filePath)) continue;
    const manifest = JSON.parse(fs.readFileSync(filePath, "utf8"));
    let manifestChanged = false;
    for (const field of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
      if (manifest[field]?.[packageName]) {
        delete manifest[field][packageName];
        manifestChanged = true;
      }
    }
    if (manifestChanged) {
      writeJson(filePath, manifest);
      changed = true;
      log.info(`Removed ${packageName} from ${nodePath.relative(rootDir, filePath)}.`);
    }
  }
  return changed;
}

export async function deletePackage(options = {}) {
  const rootDir = findRepoRoot();
  const { packages } = getPackagesInfo();
  if (packages.length === 0) {
    log.warn("No packages found under packages/.");
    return false;
  }

  const selected = options.target || await promptSelect(
    "Select Package to Delete",
    packages.map((pkg) => ({ label: `${pkg.name} (packages/${pkg.key})`, value: pkg.key }))
  );
  if (!selected || selected === "exit") return true;

  const pkg = packages.find((item) => item.key === selected || item.name === selected);
  if (!pkg) {
    log.error(`Package '${selected}' not found.`);
    return false;
  }
  if (pkg.key === "cli") {
    log.error("The active CLI package cannot be deleted while it is running.");
    return false;
  }

  const confirmed = options.yes || await promptConfirm(
    `Permanently delete ${pkg.name} and remove its monorepo references?`,
    false
  );
  if (!confirmed) {
    log.info("Package deletion cancelled.");
    return true;
  }
  if (options.dryRun) {
    log.info(`[DRY-RUN] Would delete ${pkg.dir} and remove references to ${pkg.name}.`);
    return true;
  }

  fs.rmSync(nodePath.join(rootDir, pkg.dir), { recursive: true, force: true });
  removePackageDependencyReferences(rootDir, pkg.name);
  try {
    log.info("Refreshing workspace lockfile...");
    execSync("pnpm install", { cwd: rootDir, stdio: "inherit" });
  } catch (error) {
    log.error(`Package was deleted, but dependencies could not be refreshed: ${error.message}`);
    return false;
  }
  log.success(`Deleted ${pkg.name} and refreshed workspace references.`);
  return true;
}

/**
 * Print detailed status table of all monorepo packages and their consumption
 */
export function printPackageStatus(options = {}) {
  const { packages } = getPackagesInfo();

  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}📦 Monorepo Package Registry & npm Status${colors.reset}\n`);
  }

  console.log(`${colors.bold}Available Packages in Workspace:${colors.reset}\n`);

  packages.forEach((pkg) => {
    const isPublic = !pkg.private && pkg.publishAccess === "public";
    const accessTag = isPublic
      ? `${colors.brightGreen}[PUBLIC npm]${colors.reset}`
      : `${colors.yellow}[PRIVATE]${colors.reset}`;

    const distTag = !pkg.scripts?.build
      ? `${colors.green}✔ Ready (No build needed)${colors.reset}`
      : pkg.hasDist
        ? `${colors.green}✔ Built (dist/)${colors.reset}`
        : `${colors.gray}✖ Not built${colors.reset}`;

    console.log(`  ${colors.bold}${colors.brightCyan}${pkg.name}${colors.reset} ${colors.dim}(packages/${pkg.key})${colors.reset}`);
    console.log(`    ${colors.dim}•${colors.reset} Version: ${colors.bold}${pkg.version}${colors.reset}  ${accessTag}  ${distTag}`);

    if (pkg.consumers.length > 0) {
      const consumerList = pkg.consumers
        .map((c) => `${colors.cyan}${c.appKey}${colors.reset} ${colors.dim}(${c.versionSpec})${colors.reset}`)
        .join(", ");
      console.log(`    ${colors.dim}•${colors.reset} Consumed by: ${consumerList}`);
    } else {
      console.log(`    ${colors.dim}•${colors.reset} Consumed by: ${colors.dim}None${colors.reset}`);
    }
    console.log("");
  });

  return packages;
}

/**
 * Build a package or all packages
 */
export async function buildPackage(pkgKey, options = {}) {
  const { packages } = getPackagesInfo();
  const env = checkEnv();
  const pm = env.packageManagers.preferred || "pnpm";

  const targetPackages = pkgKey === "all" || !pkgKey
    ? packages.filter((p) => p.scripts.build)
    : packages.filter((p) => p.key === pkgKey || p.name === pkgKey);

  if (targetPackages.length === 0) {
    log.error(`Package '${pkgKey}' not found.`);
    return false;
  }

  for (const pkg of targetPackages) {
    if (!pkg.scripts.build) {
      log.info(`Package ${colors.bold}${pkg.name}${colors.reset} is a Bash/Node tool and does not require a build step.`);
      continue;
    }
    if (options.dryRun) {
      log.info(`[DRY-RUN] Would build package: ${pm} --dir ${pkg.dir} build`);
    } else {
      log.info(`Building ${colors.bold}${pkg.name}${colors.reset} (${pkg.dir})...`);
      try {
        execSync(`${pm} --dir "${pkg.dir}" build`, { stdio: "inherit" });
        log.success(`Built ${pkg.name} successfully!`);
      } catch {
        log.error(`Failed to build ${pkg.name}.`);
        return false;
      }
    }
  }

  return true;
}

/**
 * Test a package
 */
export async function testPackage(pkgKey, options = {}) {
  const { packages } = getPackagesInfo();
  const env = checkEnv();
  const pm = env.packageManagers.preferred || "pnpm";

  const targetPackages = pkgKey === "all" || !pkgKey
    ? packages.filter((p) => p.scripts.test)
    : packages.filter((p) => p.key === pkgKey || p.name === pkgKey);

  if (targetPackages.length === 0) {
    log.error(`Package '${pkgKey}' not found or has no test script.`);
    return false;
  }

  for (const pkg of targetPackages) {
    if (options.dryRun) {
      log.info(`[DRY-RUN] Would test package: ${pm} --dir ${pkg.dir} test`);
    } else {
      log.info(`Testing ${colors.bold}${pkg.name}${colors.reset}...`);
      try {
        execSync(`${pm} --dir "${pkg.dir}" test`, { stdio: "inherit" });
        log.success(`Tests passed for ${pkg.name}!`);
      } catch {
        log.error(`Tests failed for ${pkg.name}.`);
        return false;
      }
    }
  }

  return true;
}

/**
 * Bump package version
 */
export async function bumpPackageVersion(pkgKey, bumpType = "patch", options = {}) {
  const { packages } = getPackagesInfo();
  const pkg = packages.find((p) => p.key === pkgKey || p.name === pkgKey);

  if (!pkg) {
    log.error(`Package '${pkgKey}' not found.`);
    return false;
  }

  const currentVersion = pkg.version;
  const parts = currentVersion.split(".").map((n) => parseInt(n, 10) || 0);
  while (parts.length < 3) parts.push(0);

  let nextVersion = currentVersion;
  if (bumpType === "patch") {
    nextVersion = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
  } else if (bumpType === "minor") {
    nextVersion = `${parts[0]}.${parts[1] + 1}.0`;
  } else if (bumpType === "major") {
    nextVersion = `${parts[0] + 1}.0.0`;
  } else if (bumpType && bumpType.match(/^\d+\.\d+\.\d+/)) {
    nextVersion = bumpType;
  } else {
    log.error(`Invalid bump type '${bumpType}'. Use 'patch', 'minor', 'major', or an explicit semver (e.g. 1.2.0).`);
    return false;
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would bump ${pkg.name} from v${currentVersion} to v${nextVersion}`);
    return true;
  }

  const pkgJsonPath = nodePath.join(pkg.dir, "package.json");
  const manifest = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  manifest.version = nextVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(manifest, null, 2) + "\n");

  log.success(`Bumped ${colors.bold}${pkg.name}${colors.reset} to ${colors.bold}${colors.brightGreen}v${nextVersion}${colors.reset}`);
  return nextVersion;
}

/**
 * Pack package into a local .tgz tarball artifact
 */
export async function packPackage(pkgKey, options = {}) {
  const { packages } = getPackagesInfo();
  const pkg = packages.find((p) => p.key === pkgKey || p.name === pkgKey);

  if (!pkg) {
    log.error(`Package '${pkgKey}' not found.`);
    return false;
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would pack package: npm pack in ${pkg.dir}`);
    return true;
  }

  log.info(`Packing ${colors.bold}${pkg.name}${colors.reset}...`);
  try {
    execSync(`npm pack`, { cwd: pkg.dir, stdio: "inherit" });
    log.success(`Packed tarball created in ${pkg.dir}`);
    return true;
  } catch (err) {
    log.error(`Failed to pack ${pkg.name}: ${err.message}`);
    return false;
  }
}

/**
 * Ensure the developer is logged in to npm, prompting for npm login (with 2FA / Web Auth support) if not.
 */
export async function ensureNpmAuth(options = {}) {
  log.info("Checking npm authentication status...");
  if (options.dryRun) {
    log.info("[DRY-RUN] Simulated npm authentication check successful.");
    return true;
  }
  try {
    const npmUser = execSync("npm whoami", { stdio: ["pipe", "pipe", "ignore"], encoding: "utf8", timeout: options.timeout || 3000 }).trim();
    if (npmUser) {
      log.success(`Logged in as npm user: ${colors.brightGreen}${npmUser}${colors.reset}`);
      return true;
    }
  } catch {
    // Not logged in or whoami failed
  }

  log.warn("Not logged in to npm (or npm authentication token missing).");

  const shouldLogin = options.yes || (options.interactive ? await promptConfirm("Would you like to sign in to npm now (supports 2FA / Web Auth)?", true) : false);

  if (shouldLogin) {
    try {
      log.info("Launching 'npm login' (complete standard terminal/2FA prompts)...");
      execSync("npm login", { stdio: "inherit" });
      const npmUser = execSync("npm whoami", { stdio: ["pipe", "pipe", "ignore"], encoding: "utf8" }).trim();
      log.success(`Successfully authenticated as: ${colors.brightGreen}${npmUser}${colors.reset}`);
      return true;
    } catch (err) {
      log.error(`npm login failed or cancelled: ${err.message}`);
      return false;
    }
  } else {
    log.error("npm authentication is required to publish packages.");
    return false;
  }
}

/**
 * Print formatted summary table of package publish statuses
 */
export function printPublishStatusReport(statuses = []) {
  console.log(`\n${colors.bold}${colors.brightWhite}📊 Monorepo Package Publish Status Report:${colors.reset}\n`);
  statuses.forEach((s) => {
    const badge = s.status === "SUCCESS"
      ? `${colors.brightGreen}✔ SUCCESS${colors.reset}`
      : `${colors.brightRed}✖ FAILED${colors.reset}`;
    const info = s.error ? ` ${colors.red}(${s.error})${colors.reset}` : "";
    console.log(`  ${badge}  ${colors.bold}${s.name}${colors.reset} ${colors.dim}(v${s.version})${colors.reset}${info}`);
  });
  console.log("");
}

/**
 * Publish package to npm
 */
export async function publishPackage(pkgKey, options = {}) {
  const { packages } = getPackagesInfo();
  const pkg = packages.find((p) => p.key === pkgKey || p.name === pkgKey);

  if (!pkg) {
    log.error(`Package '${pkgKey}' not found.`);
    return false;
  }

  if (pkg.private && !options.force) {
    log.warn(`Package '${pkg.name}' is marked private in package.json.`);
    if (options.interactive) {
      const makePublic = await promptConfirm("Would you like to make this package public for publishing?", true);
      if (makePublic) {
        const pkgJsonPath = nodePath.join(pkg.dir, "package.json");
        const manifest = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
        delete manifest.private;
        manifest.publishConfig = { access: "public" };
        fs.writeFileSync(pkgJsonPath, JSON.stringify(manifest, null, 2) + "\n");
        log.success(`Updated ${pkg.name} to public access.`);
      } else {
        log.info("Publish cancelled.");
        return false;
      }
    } else {
      log.error(`Cannot publish private package '${pkg.name}'. Remove 'private: true' or set publishConfig: { access: 'public' }.`);
      return false;
    }
  }

  // 1. Build first (if package requires a build step)
  if (pkg.scripts?.build) {
    log.info(`Step 1/3: Building ${pkg.name}...`);
    if (!options.dryRun) {
      const buildOk = await buildPackage(pkg.key, options);
      if (!buildOk) {
        log.error("Aborting publish due to build failure.");
        return false;
      }
    }
  } else {
    log.info(`Step 1/3: Skipping build step for ${pkg.name} (Node/Bash tool)...`);
  }

  // 2. Check npm login
  if (!options.skipAuthCheck) {
    log.info(`Step 2/3: Checking npm authentication...`);
    const authed = await ensureNpmAuth(options);
    if (!authed) {
      log.error("Aborting publish due to unauthenticated npm session.");
      return false;
    }
  }

  // 3. Publish
  log.info(`Step 3/3: Publishing ${colors.bold}${pkg.name}@${pkg.version}${colors.reset} to npm...`);
  const tag = options.tag || "latest";
  const publishCmd = `npm publish --access public --tag ${tag}${options.dryRun ? " --dry-run" : ""}`;

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would execute: ${publishCmd} (in ${pkg.dir})`);
    log.success(`[DRY-RUN] Package ${pkg.name}@${pkg.version} simulated publish complete!`);
    return true;
  }

  try {
    execSync(publishCmd, { cwd: pkg.dir, stdio: "inherit" });
    log.success(`🚀 Successfully published ${colors.bold}${pkg.name}@${pkg.version}${colors.reset} to npm!`);
    console.log(`   ${colors.dim}View at: https://www.npmjs.com/package/${pkg.name}${colors.reset}\n`);
    return true;
  } catch (err) {
    const errText = String(err.message || "") + String(err.output || "");
    const isAlreadyPublished = errText.includes("E403") || errText.includes("previously published versions") || errText.includes("cannot publish over");

    if (isAlreadyPublished) {
      log.warn(`Version v${pkg.version} of ${pkg.name} is already published on npm.`);
      if (options.interactive || options.autoBump) {
        const autoBump = options.autoBump || await promptConfirm(`Would you like to bump patch version for ${pkg.name} and retry publishing?`, true);
        if (autoBump) {
          const newVersion = await bumpPackageVersion(pkg.key, "patch", options);
          if (newVersion) {
            log.info(`Retrying publish for ${pkg.name}@${newVersion}...`);
            return await publishPackage(pkg.key, { ...options, skipAuthCheck: true });
          }
        }
      }
    }

    log.error(`Publish failed for ${pkg.name}: ${err.message}`);
    return false;
  }
}

/**
 * Query current published version from npm registry
 */
export function getPublishedVersion(pkgName, options = {}) {
  if (options.dryRun) {
    return null;
  }
  try {
    const output = execSync(`npm view "${pkgName}" version`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
      timeout: options.timeout || 3000,
    }).trim();
    return output || null;
  } catch {
    return null;
  }
}

/**
 * Publish all packages that have changed versions compared to npm registry,
 * check consuming apps, stop them, update lockfile, and refresh dependencies.
 */
export async function publishAllPackages(options = {}) {
  const { packages, apps } = getPackagesInfo();

  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}🌐 Publish All Changed Packages to npm${colors.reset}\n`);
  }

  // 1. Check npm authentication (with 2FA support)
  const authed = await ensureNpmAuth(options);
  if (!authed) {
    log.error("Publish pipeline stopped due to unauthenticated npm session.");
    return false;
  }

  // 2. Filter publishable public packages
  const publishable = packages.filter((p) => !p.private || p.publishAccess === "public");

  if (publishable.length === 0) {
    log.warn("No public publishable packages found in workspace.");
    return true;
  }

  log.info(`Checking npm registry versions for ${publishable.length} package(s)...`);

  const toPublish = [];

  for (const pkg of publishable) {
    const publishedVersion = getPublishedVersion(pkg.name, options);
    const localVersion = pkg.version;

    if (!publishedVersion) {
      log.info(`  • ${colors.bold}${pkg.name}${colors.reset}: Local v${localVersion} (Not yet on npm) ➜ ${colors.brightYellow}NEEDS PUBLISH${colors.reset}`);
      toPublish.push({ ...pkg, publishedVersion: "none", reason: "not on npm" });
    } else if (localVersion !== publishedVersion) {
      log.info(`  • ${colors.bold}${pkg.name}${colors.reset}: Local v${localVersion} vs npm v${publishedVersion} ➜ ${colors.brightGreen}NEEDS PUBLISH${colors.reset}`);
      toPublish.push({ ...pkg, publishedVersion, reason: `v${publishedVersion} ➜ v${localVersion}` });
    } else {
      log.info(`  • ${colors.bold}${pkg.name}${colors.reset}: Local v${localVersion} == npm v${publishedVersion} ➜ ${colors.dim}UP TO DATE${colors.reset}`);
    }
  }

  if (toPublish.length === 0) {
    log.success("All packages are up to date with npm registry. Nothing to publish.");
    return true;
  }

  console.log(`\n${colors.bold}${colors.brightCyan}${toPublish.length} package(s) ready to publish:${colors.reset}`);
  toPublish.forEach((p) => {
    console.log(`  ${colors.dim}•${colors.reset} ${colors.bold}${p.name}@${p.version}${colors.reset} (${colors.yellow}${p.reason}${colors.reset})`);
  });
  console.log("");

  if (options.interactive && !options.yes) {
    const confirmed = await promptConfirm(`Proceed with publishing ${toPublish.length} package(s) to npm?`, true);
    if (!confirmed) {
      log.info("Publish all operation cancelled.");
      return false;
    }
  }

  // 3. Publish each changed package one by one and report status
  const publishedSuccess = [];
  const packageStatuses = [];

  for (let i = 0; i < toPublish.length; i++) {
    const pkg = toPublish[i];
    log.divider();
    log.info(`[${i + 1}/${toPublish.length}] Publishing ${colors.bold}${pkg.name}@${pkg.version}${colors.reset}...`);
    const success = await publishPackage(pkg.key, { ...options, skipAuthCheck: true });
    if (success) {
      publishedSuccess.push(pkg);
      packageStatuses.push({ name: pkg.name, version: pkg.version, status: "SUCCESS" });
    } else {
      packageStatuses.push({ name: pkg.name, version: pkg.version, status: "FAILED", error: "Publish failed" });
      log.error(`Failed to publish ${pkg.name}. Stopping publish-all pipeline.`);
      printPublishStatusReport(packageStatuses);
      return false;
    }
  }

  printPublishStatusReport(packageStatuses);

  log.divider();
  log.success(`Successfully published ${publishedSuccess.length} package(s) to npm!`);

  // 3. Check each app to see if it is importing any of the published packages
  const publishedNames = new Set(publishedSuccess.map((p) => p.name));
  const affectedApps = [];

  for (const app of apps) {
    const importedPublishedPkgs = [];
    for (const pkgName of publishedNames) {
      if (app.dependencies[pkgName] || app.devDependencies[pkgName]) {
        importedPublishedPkgs.push({
          pkgName,
          versionSpec: app.dependencies[pkgName] || app.devDependencies[pkgName],
        });
      }
    }

    if (importedPublishedPkgs.length > 0) {
      affectedApps.push({
        ...app,
        importedPackages: importedPublishedPkgs,
      });
    }
  }

  if (affectedApps.length === 0) {
    log.info("No apps in the monorepo are currently importing the published packages.");
    return true;
  }

  console.log(`\n${colors.bold}${colors.brightWhite}📱 Consuming Applications to Update & Refresh:${colors.reset}`);
  affectedApps.forEach((app) => {
    const pkgsList = app.importedPackages.map((p) => `${p.pkgName} (${p.versionSpec})`).join(", ");
    console.log(`  ${colors.dim}•${colors.reset} ${colors.bold}${app.name}${colors.reset} (${app.dir}) ➜ imports: ${colors.cyan}${pkgsList}${colors.reset}`);
  });
  console.log("");

  // 4. Stop running apps if occupied
  const portsToKill = affectedApps
    .map((app) => resolveApp(app.key)?.port)
    .filter(Boolean);

  if (portsToKill.length > 0) {
    if (options.dryRun) {
      log.info(`[DRY-RUN] Would stop lingering processes for affected apps on ports: ${portsToKill.join(", ")}`);
    } else {
      log.info(`Stopping running processes for affected apps (ports: ${portsToKill.join(", ")})...`);
      killOccupiedPorts(portsToKill);
      log.success("Stopped affected app processes.");
    }
  }

  // 5. Update and recreate lockfile
  if (options.dryRun) {
    log.info(`[DRY-RUN] Would run 'pnpm install' to recreate/update workspace lockfile.`);
  } else {
    log.info("Updating and recreating lockfile with 'pnpm install'...");
    try {
      execSync("pnpm install", { stdio: "inherit" });
      log.success("Lockfile recreated and workspace dependencies refreshed!");
    } catch (err) {
      log.error(`Failed to refresh dependencies: ${err.message}`);
      return false;
    }
  }

  log.divider();
  log.success("🎉 Publish-all pipeline and consuming app refresh completed successfully!");
  return true;
}

/**
 * Toggle or manage app dependency consumption between workspace:* and npm version
 */
export async function manageConsumption(targetApp, targetPkg, mode = "workspace", options = {}) {
  const { packages, apps } = getPackagesInfo();
  const rootDir = findRepoRoot();

  const selectedApps = targetApp === "all" || !targetApp
    ? apps
    : apps.filter((a) => a.key === targetApp || a.name === targetApp);

  const selectedPkg = packages.find((p) => p.key === targetPkg || p.name === targetPkg) || packages.find((p) => p.key === "theme");

  if (!selectedPkg) {
    log.error(`Package '${targetPkg}' not found.`);
    return false;
  }

  const newVersionSpec = mode === "npm"
    ? `^${selectedPkg.version}`
    : "workspace:*";

  let changedCount = 0;

  for (const app of selectedApps) {
    const pkgJsonPath = nodePath.join(rootDir, app.dir, "package.json");
    if (!fs.existsSync(pkgJsonPath)) continue;

    const manifest = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    let modified = false;

    if (manifest.dependencies && manifest.dependencies[selectedPkg.name]) {
      manifest.dependencies[selectedPkg.name] = newVersionSpec;
      modified = true;
    }
    if (manifest.devDependencies && manifest.devDependencies[selectedPkg.name]) {
      manifest.devDependencies[selectedPkg.name] = newVersionSpec;
      modified = true;
    }

    if (modified) {
      if (options.dryRun) {
        log.info(`[DRY-RUN] Would update ${app.key}: "${selectedPkg.name}": "${newVersionSpec}"`);
      } else {
        fs.writeFileSync(pkgJsonPath, JSON.stringify(manifest, null, 2) + "\n");
        log.success(`Updated ${colors.bold}${app.key}${colors.reset} ➜ "${selectedPkg.name}": "${newVersionSpec}"`);
        changedCount++;
      }
    }
  }

  if (changedCount > 0 && !options.dryRun) {
    log.info("Running 'pnpm install' to link updated dependency specifications...");
    try {
      execSync("pnpm install", { stdio: "inherit" });
      log.success("Dependencies synced!");
    } catch {}
  }

  return true;
}

/**
 * Update all @goldlabelapps packages across workspace package.json files to latest published versions on npm
 */
export async function updatePackages(options = {}) {
  const rootDir = findRepoRoot();

  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}🔄 Update @goldlabelapps Packages to Latest published npm Version${colors.reset}\n`);
  }

  // Find all workspace package.json files (apps and packages)
  const workspaceFiles = [];
  for (const subDir of ["apps", "packages"]) {
    const dirPath = nodePath.join(rootDir, subDir);
    if (!fs.existsSync(dirPath)) continue;
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const pkgJsonPath = nodePath.join(dirPath, entry.name, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
          workspaceFiles.push({ key: entry.name, relPath: nodePath.join(subDir, entry.name), fullPath: pkgJsonPath });
        }
      }
    }
  }

  // Also include root package.json if present
  const rootPkgJson = nodePath.join(rootDir, "package.json");
  if (fs.existsSync(rootPkgJson)) {
    workspaceFiles.push({ key: "root", relPath: "package.json", fullPath: rootPkgJson });
  }

  log.info("Fetching latest published versions from npm for @goldlabelapps packages...");

  // Cache latest npm version for each @goldlabelapps package
  const latestVersions = new Map();
  const getLatestNpmVersion = (pkgName) => {
    if (latestVersions.has(pkgName)) return latestVersions.get(pkgName);
    const ver = getPublishedVersion(pkgName, options);
    latestVersions.set(pkgName, ver);
    return ver;
  };

  const updates = [];

  for (const item of workspaceFiles) {
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(item.fullPath, "utf8"));
    } catch {
      continue;
    }

    let modified = false;
    for (const depType of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
      if (!manifest[depType]) continue;

      for (const [depName, currentSpec] of Object.entries(manifest[depType])) {
        if (!depName.startsWith("@goldlabelapps/")) continue;

        const latestVersion = options.dryRun ? "latest" : getLatestNpmVersion(depName);
        if (!latestVersion && !options.dryRun) {
          log.warn(`Could not find published version on npm for ${depName}`);
          continue;
        }

        const newSpec = `^${latestVersion}`;
        if (currentSpec !== newSpec) {
          manifest[depType][depName] = newSpec;
          modified = true;
          updates.push({
            location: item.relPath,
            depName,
            oldSpec: currentSpec,
            newSpec,
          });
        }
      }
    }

    if (modified) {
      if (options.dryRun) {
        log.info(`[DRY-RUN] Would update @goldlabelapps dependencies in ${item.relPath}`);
      } else {
        writeJson(item.fullPath, manifest);
        log.success(`Updated ${colors.bold}${item.relPath}${colors.reset}`);
      }
    }
  }

  if (updates.length > 0) {
    console.log(`\n${colors.bold}${colors.brightCyan}Updated @goldlabelapps packages:${colors.reset}`);
    updates.forEach((u) => {
      console.log(`  ${colors.dim}•${colors.reset} ${colors.bold}${u.location}${colors.reset}: ${u.depName} (${colors.yellow}${u.oldSpec}${colors.reset} ➜ ${colors.brightGreen}${u.newSpec}${colors.reset})`);
    });
    console.log("");
  } else if (!options.dryRun) {
    log.success("All @goldlabelapps dependencies are already up to date with published npm versions.");
    return true;
  }

  if (options.dryRun) {
    log.info("[DRY-RUN] Would update @goldlabelapps packages and run 'pnpm install' to refresh workspace dependencies.");
  } else {
    log.info("Refreshing workspace dependencies with 'pnpm install'...");
    try {
      execSync("pnpm install", { stdio: "inherit" });
      log.success("Workspace dependencies refreshed successfully!");
    } catch (err) {
      log.error(`Failed to refresh dependencies: ${err.message}`);
      return false;
    }
  }

  return true;
}

/**
 * Interactive Packages Menu Loop
 */
export async function runPackages(subcommand, options = {}) {
  if (subcommand) {
    const subLower = subcommand.toLowerCase();

    switch (subLower) {
      case "update":
      case "update:packages":
        return await updatePackages(options);

      default:
        log.error(`Unknown packages subcommand '${subcommand}'.`);
        console.log(`Available subcommands: update.\n`);
        return false;
    }
  }

  // Interactive Package Management Menu
  printPackageStatus(options);

  const menuOptions = [
    { label: "🔄 Update @goldlabelapps Packages", value: "update", desc: "Update @goldlabelapps dependencies to the latest published npm version" },
  ];

  const choice = await promptSelect("Package & npm Management Menu", menuOptions);

  if (choice === "exit") return true;

  log.divider();

  if (choice === "update") {
    await updatePackages(options);
  }

  return true;
}
