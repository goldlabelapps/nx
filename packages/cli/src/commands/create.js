import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promptInput, log } from "../terminal.js";
import { registerApp, runDev } from "./dev.js";

const GENERATED_DIRECTORIES = new Set([
  ".next", ".turbo", "node_modules", "out", "build", "coverage", "test-results",
  "playwright-report", "blob-report", ".vercel",
]);

export function slugifyAppName(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findMonorepoRoot(startDirectory = process.cwd()) {
  let directory = path.resolve(startDirectory);
  while (directory !== path.dirname(directory)) {
    if (fs.existsSync(path.join(directory, "apps", "nx")) || fs.existsSync(path.join(directory, "apps", "template"))) return directory;
    directory = path.dirname(directory);
  }
  return null;
}

function nextAvailablePort(rootDirectory) {
  const usedPorts = new Set();
  for (const entry of fs.readdirSync(path.join(rootDirectory, "apps"), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    try {
      const config = JSON.parse(fs.readFileSync(path.join(rootDirectory, "apps", entry.name, "nx.config.json"), "utf8"));
      if (Number.isInteger(config.port)) usedPorts.add(config.port);
    } catch {}
  }

  for (let port = 5600; ; port += 10) {
    if (!usedPorts.has(port)) return port;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function runCreate(options = {}) {
  const rootDirectory = findMonorepoRoot(options.rootDirectory);
  if (!rootDirectory) {
    log.error("Could not find apps/nx. Run this command from the NX monorepo.");
    return false;
  }

  const name = options.name || await promptInput("App name");
  const tagline = options.tagline || await promptInput("App tagline");
  const slug = slugifyAppName(name);
  if (!name || !tagline || !slug) {
    log.error("An app name and tagline are required.");
    return false;
  }

  const sourceDirectory = fs.existsSync(path.join(rootDirectory, "apps", "nx"))
    ? path.join(rootDirectory, "apps", "nx")
    : path.join(rootDirectory, "apps", "template");
  const targetDirectory = path.join(rootDirectory, "apps", slug);
  if (fs.existsSync(targetDirectory)) {
    log.error(`An app already exists at apps/${slug}.`);
    return false;
  }

  const port = nextAvailablePort(rootDirectory);
  const app = {
    key: slug,
    name,
    dir: `apps/${slug}`,
    filter: slug,
    port,
    url: `http://localhost:${port}`,
    desc: tagline,
  };

  if (options.dryRun) {
    log.info(`[DRY-RUN] Would create apps/${slug}, install dependencies, and launch ${app.url}.`);
    return true;
  }

  try {
    fs.cpSync(sourceDirectory, targetDirectory, {
      recursive: true,
      filter: (source) => !GENERATED_DIRECTORIES.has(path.basename(source)),
    });

    const appConfigPath = path.join(targetDirectory, "nx.config.json");
    const appConfig = JSON.parse(fs.readFileSync(appConfigPath, "utf8"));
    writeJson(appConfigPath, { ...appConfig, name, tagline, port, generatedFrom: "nx" });

    const packagePath = path.join(targetDirectory, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    packageJson.name = slug;
    packageJson.scripts.dev = `next dev --webpack -p ${port}`;
    packageJson.scripts.start = `next start -p ${port}`;
    writeJson(packagePath, packageJson);

    const projectPath = path.join(targetDirectory, "project.json");
    if (fs.existsSync(projectPath)) {
      const projectJson = JSON.parse(fs.readFileSync(projectPath, "utf8"));
      writeJson(projectPath, { ...projectJson, name: slug });
    }

    log.info(`Installing dependencies for apps/${slug}...`);
    execFileSync("pnpm", ["install"], { cwd: rootDirectory, stdio: "inherit" });
  } catch (error) {
    fs.rmSync(targetDirectory, { recursive: true, force: true });
    log.error(`Could not create ${name}: ${error.message}`);
    return false;
  }

  registerApp(app);
  log.success(`Created apps/${slug}. Launching ${name}...`);
  return runDev({ ...options, target: slug });
}