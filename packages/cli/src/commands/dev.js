import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { checkEnv } from "../env.js";
import { log, colors, banner, promptSelect, openBrowser } from "../terminal.js";

export const MONOREPO_PORTS = [5530];

export const APPS = {
  nx: {
    key: "nx",
    name: "NX",
    dir: "apps/nx",
    filter: "nx",
    port: 5530,
    url: "http://localhost:5530",
    desc: "Modular Next.js saas app with Lorem Ipsum",
    aliases: ["template", "starter", "tpl"],
  },
};


export function registerApp(app) {
  APPS[app.key] = app;
}

function loadGeneratedApps() {
  const appsDirectory = path.resolve(process.cwd(), "apps");
  if (!fs.existsSync(appsDirectory)) return;

  for (const entry of fs.readdirSync(appsDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory() || APPS[entry.name]) continue;
    try {
      const config = JSON.parse(fs.readFileSync(path.join(appsDirectory, entry.name, "nx.config.json"), "utf8"));
      if ((config.generatedFrom !== "nx" && config.generatedFrom !== "template") || !config.name || !config.tagline || !Number.isInteger(config.port)) continue;
      registerApp({
        key: entry.name,
        name: config.name,
        dir: `apps/${entry.name}`,
        filter: entry.name,
        port: config.port,
        url: `http://localhost:${config.port}`,
        desc: config.tagline,
      });
    } catch {}
  }
}

loadGeneratedApps();

/**
 * Resolve an app configuration from key, alias, or directory name
 */
export function resolveApp(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  
  if (APPS[q]) return APPS[q];

  for (const app of Object.values(APPS)) {
    if (app.key === q || app.dir === q || app.dir === `apps/${q}`) return app;
    if (app.aliases && app.aliases.includes(q)) return app;
  }

  return null;
}

export function killOccupiedPorts(ports = MONOREPO_PORTS) {
  const isWindows = process.platform === "win32";
  if (isWindows) {
    for (const port of ports) {
      try {
        const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf-8" });
        const lines = out.split("\n");
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== "0" && !isNaN(Number(pid))) {
            execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          }
        }
      } catch {
        // Port was already free
      }
    }
    try {
      execSync("taskkill /F /IM playwright.exe 2>nul || exit 0", { stdio: "ignore", shell: true });
    } catch {}
  } else {
    const portList = ports.join(",");
    try {
      execSync(`lsof -ti :${portList} | xargs kill -9 2>/dev/null || true`, { stdio: "ignore", shell: true });
    } catch {}
    try {
      execSync(`pkill -f "playwright" 2>/dev/null || true`, { stdio: "ignore", shell: true });
      execSync(`pkill -f "chrome-headless-shell" 2>/dev/null || true`, { stdio: "ignore", shell: true });
    } catch {}
  }
}

/**
 * Prompt user to select a single application to launch
 */
export async function promptSelectApp() {
  const options = Object.values(APPS).map((app) => ({
    label: `${app.name} (${colors.brightCyan}Port ${app.port}${colors.reset})`,
    value: app.key,
    desc: app.desc,
  }));

  return await promptSelect("🎯 Roger. Launch what, sir?", options);
}

/**
 * Run dev server for either all apps or a single specified app
 */
export async function runDev(options = {}) {
  const env = checkEnv();
  const pm = env.packageManagers.preferred || "pnpm";

  // Handle single app selection if requested interactively
  let target = options.target || null;
  if (options.single && !target) {
    target = await promptSelectApp();
    if (target === "exit") {
      log.info("Aborted single app launcher.");
      return true;
    }
  }

  // If a single target was specified or chosen:
  if (target && target !== "all") {
    const app = resolveApp(target);
    if (!app) {
      log.error(`Unknown application: '${target}'. Available apps: ${Object.keys(APPS).join(", ")}`);
      return false;
    }

    if (!options.quiet) {
      console.log(banner);
      console.log(`${colors.bold}${colors.brightWhite}⚡ Launching ${app.name} Development Server${colors.reset}\n`);
      log.info(`Directory:    ${colors.bold}${app.dir}${colors.reset}`);
      log.info(`Local URL:    ${colors.brightCyan}${app.url}${colors.reset}`);
      log.info(`Port:         ${colors.brightGreen}${app.port}${colors.reset}`);
      log.info(`Browser:      ${colors.bold}Launching default browser automatically...${colors.reset}\n`);
      log.info(`Press ${colors.bold}Ctrl+C${colors.reset} at any time to stop the server.\n`);
      log.divider();
    }

    if (options.dryRun) {
      log.info(`[DRY-RUN] Freeing port ${app.port}, opening browser at ${app.url}, and running: ${pm} --dir ${app.dir} ${app.command || "dev"}`);
      return true;
    }

    // Preemptively free the target port
    killOccupiedPorts([app.port]);

    // Open the browser right as server starts
    setTimeout(() => {
      openBrowser(app.url);
    }, 1200);

    return new Promise((resolve) => {
      const isWindows = process.platform === "win32";
      const shellCmd = isWindows ? "cmd.exe" : "/bin/sh";
      const shellArg = isWindows ? "/c" : "-c";
      const command = `${pm} --dir ${app.dir} ${app.command || "dev"}`;

      const child = spawn(shellCmd, [shellArg, command], {
        stdio: "inherit",
        cwd: process.cwd(),
        env: process.env,
      });

      const cleanup = () => {
        if (!child.killed) {
          child.kill();
        }
      };

      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);

      child.on("close", (code) => {
        process.off("SIGINT", cleanup);
        process.off("SIGTERM", cleanup);
        if (code === 0) {
          log.info(`${app.name} server stopped.`);
          resolve(true);
        } else {
          log.warn(`${app.name} server exited with code ${code}.`);
          resolve(false);
        }
      });
    });
  }

  // Otherwise, launch ALL development servers concurrently
  if (!options.quiet) {
    console.log(banner);
    console.log(`${colors.bold}${colors.brightWhite}⚡ Launching NX° Development Servers${colors.reset}\n`);
    log.info(`NX App:               ${colors.brightCyan}http://localhost:5530${colors.reset}\n`);
    log.info(`Press ${colors.bold}Ctrl+C${colors.reset} at any time to stop all servers.\n`);
    log.divider();
  }

  if (options.dryRun) {
    log.info(`[DRY-RUN] Freeing ports (5530-5580) and starting: pnpm run dev:all`);
    return true;
  }

  // Preemptively free all ports and lingering browser processes
  killOccupiedPorts();

  return new Promise((resolve) => {
    const isWindows = process.platform === "win32";
    const shellCmd = isWindows ? "cmd.exe" : "/bin/sh";
    const shellArg = isWindows ? "/c" : "-c";
    const command = `${pm} run dev:all`;

    const child = spawn(shellCmd, [shellArg, command], {
      stdio: "inherit",
      cwd: process.cwd(),
      env: process.env,
    });

    const cleanup = () => {
      if (!child.killed) {
        child.kill();
      }
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

    child.on("close", (code) => {
      process.off("SIGINT", cleanup);
      process.off("SIGTERM", cleanup);
      if (code === 0) {
        log.info("Development servers stopped.");
        resolve(true);
      } else {
        log.warn(`Development servers exited with code ${code}.`);
        resolve(false);
      }
    });
  });
}
