import process from "node:process";
import { banner, colors, log, promptSelect, clearScreen, promptPostAction } from "./terminal.js";
import { printEnvSummary } from "./env.js";
import { showHelp } from "./commands/help.js";
import { runSetup } from "./commands/setup.js";
import { runDev, resolveApp } from "./commands/dev.js";
import { runTest } from "./commands/test.js";
import { runClean } from "./commands/clean.js";
import { runPackages, updatePackages } from "./commands/packages.js";
import { runCreate } from "./commands/create.js";
import { runRemove } from "./commands/remove.js";
import { runBuild } from "./commands/build.js";

const VERSION = "3.0.4";

const MAIN_MENU_OPTIONS = [
  { label: "🚀 install", value: "setup:diagnostics", desc: "Guided onboarding and toolchain verification" },
  { label: "🧪 test", value: "test", desc: "Full pre-merge CI quality gate (type-check, lint, unit tests)" },
  { label: "🎯 dev", value: "dev:nx", desc: "Run the NX app & auto-open browser" },
  { label: "🏗️  build", value: "build", desc: "Build all packages and applications" },
  { label: "🔄 update", value: "update", desc: "Update @goldlabelapps packages to latest published npm versions" },
  { label: "🧹 clean", value: "clean", desc: "Terminate processes, purge build caches & node_modules" },
  { label: "📖 help", value: "help", desc: "Display full command line reference" },
];

/**
 * Parse CLI flags and positional arguments
 */
export function parseArgs(rawArgs) {
  const flags = {
    help: false,
    version: false,
    interactive: false,
    quiet: false,
    dryRun: false,
    yes: false,
  };

  const positional = [];

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
    } else if (arg === "-v" || arg === "--version") {
      flags.version = true;
    } else if (arg === "-i" || arg === "--interactive") {
      flags.interactive = true;
    } else if (arg === "-q" || arg === "--quiet") {
      flags.quiet = true;
    } else if (arg === "--dry-run") {
      flags.dryRun = true;
    } else if (arg === "-y" || arg === "--yes") {
      flags.yes = true;
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  return {
    command: positional[0] || null,
    subcommand: positional[1] || null,
    extra: positional.slice(2),
    flags,
  };
}

/**
 * Interactive main menu loop
 */
async function runInteractiveMenu(flags) {
  let isFirstRender = true;

  while (true) {
    if (isFirstRender) {
      if (!flags.quiet) {
        clearScreen();
      }
      console.log(banner);
      isFirstRender = false;
    } else {
      console.log(`\n${colors.brightCyan}✦ Goldlabel NX°${colors.reset}`);
    }

    const choice = await promptSelect("", MAIN_MENU_OPTIONS);

    if (choice === "exit") {
      log.info("Goodbye!");
      break;
    }

    log.divider();

    switch (choice) {
      case "setup:diagnostics":
        printEnvSummary();
        await runSetup({ ...flags, interactive: true });
        break;
      case "dev":
        await runDev(flags);
        break;
      case "dev:nx":
      case "dev:template":
      case "dev:single":
        await runDev({ target: "nx", ...flags });
        break;
      case "setup":
        await runSetup({ ...flags, interactive: true });
        break;
      case "build":
      case "build:all":
        await runBuild(flags);
        break;
      case "update":
      case "update-packages":
      case "update:packages":
        await updatePackages(flags);
        break;
      case "test":
        await runTest(null, { ...flags, interactive: true });
        break;
      case "clean":
        await runClean({ ...flags, interactive: true });
        break;
      case "help":
        showHelp();
        break;
    }

    log.divider();

    const nextAction = await promptPostAction();
    if (nextAction === "exit") {
      log.info("Goodbye!");
      break;
    }
  }
}

/**
 * Main entry point for CLI execution
 */
export async function runCli(rawArgs = process.argv.slice(2)) {
  const { command, subcommand, extra, flags } = parseArgs(rawArgs);

  if (flags.version) {
    console.log(`nx-cli / gla v${VERSION}`);
    return;
  }

  if (flags.help && !command) {
    showHelp();
    return;
  }

  // If no command is provided, launch interactive menu
  if (!command || flags.interactive) {
    await runInteractiveMenu(flags);
    return;
  }

  if (!flags.quiet) {
    clearScreen();
  }

  const cmdLower = command.toLowerCase();

  // Check if command is a direct single app name (e.g. `gla prospects` or `gla echopay`)
  const directApp = resolveApp(cmdLower);
  if (directApp) {
    await runDev({ target: directApp.key, ...flags });
    return;
  }

  // Check if command is in `dev:<app>` format (e.g. `gla dev:echopay`)
  if (cmdLower.startsWith("dev:")) {
    const appKey = cmdLower.replace("dev:", "");
    await runDev({ target: appKey, ...flags });
    return;
  }

  // Direct command routing
  switch (cmdLower) {
    case "setup":
    case "init":
      await runSetup(flags);
      break;

    case "dev":
    case "start":
      if (subcommand) {
        await runDev({ target: subcommand, ...flags });
      } else {
        await runDev(flags);
      }
      break;

    case "create":
    case "new":
      await runCreate(flags);
      break;

    case "remove":
    case "rm":
    case "delete":
      await runRemove({ ...flags, target: subcommand });
      break;

    case "test":
      await runTest(subcommand, flags);
      break;

    case "build":
    case "build:all":
      await runBuild(flags);
      break;

    case "packages":
    case "pkg":
      await runPackages(subcommand, { ...flags, extra });
      break;

    case "update":
    case "update-packages":
    case "update:packages":
      await updatePackages(flags);
      break;

    case "clean":
      await runClean(flags);
      break;

    case "env":
    case "doctor":
    case "check-env":
      printEnvSummary();
      break;

    case "help":
      showHelp();
      break;

    default:
      log.error(`Unknown command '${command}'.`);
      console.log(`Run ${colors.bold}pnpm run cli --help${colors.reset} for a list of available commands.\n`);
      process.exitCode = 1;
  }
}
