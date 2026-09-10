import { banner, colors, log } from "../terminal.js";

export function showHelp() {
  console.log(banner);
  console.log(`${colors.bold}${colors.brightWhite}NAME${colors.reset}`);
  console.log(`    ${colors.cyan}nx-cli / gla${colors.reset} — Goldlabel Autonomous NX° Toolchain\n`);

  console.log(`${colors.bold}${colors.brightWhite}SYNOPSIS${colors.reset}`);
  console.log(`    ${colors.bold}pnpm dev${colors.reset} [APP_NAME] [OPTIONS]`);
  console.log(`    ${colors.bold}pnpm run cli${colors.reset} [COMMAND] [OPTIONS]\n`);

  console.log(`${colors.bold}${colors.brightWhite}COMMANDS${colors.reset}`);
  console.log(`    ${colors.bold}${colors.brightGreen}dev${colors.reset} [app]       Launch development servers (all apps or a single specified app)`);
  console.log(`    ${colors.bold}${colors.brightGreen}nx${colors.reset}              Launch NX app (port 4500) & open browser`);
  console.log(`    ${colors.bold}${colors.brightGreen}build${colors.reset}           Build all packages and applications in the workspace`);
  console.log(`    ${colors.bold}${colors.brightGreen}create${colors.reset}          Create, configure, install, and launch an app from apps/nx`);
  console.log(`    ${colors.bold}${colors.brightGreen}remove${colors.reset} [app]     Permanently delete an app and strip its references from the monorepo`);
  console.log(`    ${colors.bold}${colors.brightGreen}packages${colors.reset} [sub]     Manage packages: ${colors.dim}update${colors.reset}`);
  console.log(`    ${colors.bold}${colors.brightGreen}update${colors.reset}           Update @goldlabelapps packages to latest published npm versions`);
  console.log(`    ${colors.bold}${colors.brightGreen}setup${colors.reset}           Interactive project onboarding, dependency install & verification`);
  console.log(`    ${colors.bold}${colors.brightGreen}test${colors.reset}            Run full CI quality gateway pipeline (type check, lint, unit tests)`);
  console.log(`    ${colors.bold}${colors.brightGreen}env${colors.reset}             Display toolchain diagnostics (Node, package manager, Git)`);
  console.log(`    ${colors.bold}${colors.brightWhite}help${colors.reset}            Display this Unix manual synopsis\n`);

  console.log(`${colors.bold}${colors.brightWhite}OPTIONS & FLAGS${colors.reset}`);
  console.log(`    ${colors.cyan}-h, --help${colors.reset}         Show manual synopsis and command usage`);
  console.log(`    ${colors.cyan}-v, --version${colors.reset}      Output version number (v3.3.0)`);
  console.log(`    ${colors.cyan}-i, --interactive${colors.reset}  Force launch interactive menu loop`);
  console.log(`    ${colors.cyan}-q, --quiet${colors.reset}        Suppress decorative banners and verbose outputs`);
  console.log(`    ${colors.cyan}--dry-run${colors.reset}          Print commands without executing side-effects\n`);

  console.log(`${colors.bold}${colors.brightWhite}EXAMPLES${colors.reset}`);
  console.log(`    ${colors.dim}# 1. Launch NX app and automatically open browser:${colors.reset}`);
  console.log(`    $ pnpm dev nx\n`);
  console.log(`    ${colors.dim}# 2. Launch interactive CLI menu:${colors.reset}`);
  console.log(`    $ pnpm dev\n`);
  console.log(`    ${colors.dim}# 3. Run full CI quality gateway pipeline:${colors.reset}`);
  console.log(`    $ pnpm run cli test\n`);

  log.divider();
}
