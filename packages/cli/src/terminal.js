import readline from "node:readline/promises";
import { emitKeypressEvents } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

// ANSI color escape sequences
export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  
  // Foreground
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  
  // Bright colors
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
};

export const banner = `
${colors.brightRed}╭─${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}─╮${colors.reset}
${colors.brightRed}│${colors.reset} ${colors.bold}${colors.brightWhite}▲ TURBO${colors.reset} ${colors.bold}${colors.brightBlue}NX°${colors.reset} ${colors.dim}CLI${colors.reset} ${colors.brightYellow}v3.3.0${colors.reset}                                 ${colors.brightMagenta}│${colors.reset}
${colors.brightYellow}│${colors.reset} ${colors.brightRed}█${colors.brightYellow}█${colors.brightGreen}█${colors.brightCyan}█${colors.brightBlue}█${colors.brightMagenta}█${colors.brightWhite}█${colors.reset} ${colors.dim}High-Performance Monorepo Toolchain${colors.reset}           ${colors.brightBlue}│${colors.reset}
${colors.brightGreen}╰─${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}──${colors.brightMagenta}──${colors.brightRed}──${colors.brightYellow}──${colors.brightGreen}──${colors.brightCyan}──${colors.brightBlue}─╯${colors.reset}
`;

export function clearScreen() {
  if (process.stdout.isTTY && process.env.NODE_ENV !== "test") {
    process.stdout.write("\x1Bc");
  }
}

/**
 * Cross-platform helper to launch the default web browser at the specified URL
 * @param {string} url
 */
export function openBrowser(url) {
  if (process.env.NODE_ENV === "test") return;
  const isWindows = process.platform === "win32";
  const isMac = process.platform === "darwin";
  try {
    if (isMac) {
      import("node:child_process").then(({ spawn }) => {
        spawn("open", [url], { stdio: "ignore", detached: true }).unref();
      });
    } else if (isWindows) {
      import("node:child_process").then(({ spawn }) => {
        spawn("cmd.exe", ["/c", "start", "", url], { stdio: "ignore", detached: true }).unref();
      });
    } else {
      import("node:child_process").then(({ spawn }) => {
        spawn("xdg-open", [url], { stdio: "ignore", detached: true }).unref();
      });
    }
  } catch {
    // Ignore browser spawn error if in headless or restricted environment
  }
}

const radioAcknowledgements = ["Roger", "WILCO"];

export const log = {
  info: (msg) => {
    const acknowledgement = radioAcknowledgements[Math.floor(Math.random() * radioAcknowledgements.length)];
    console.log(`${colors.brightBlue}ℹ${colors.reset}  ${colors.bold}${acknowledgement}:${colors.reset} ${msg}`);
  },
  success: (msg) => console.log(`${colors.brightGreen}✔${colors.reset}  ${colors.bold}Tally-ho:${colors.reset} ${colors.bold}${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.brightYellow}⚠${colors.reset}  ${colors.yellow}Stand by:${colors.reset} ${colors.yellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.brightRed}✖${colors.reset}  ${colors.red}${colors.bold}Negative:${colors.reset} ${colors.red}${colors.bold}${msg}${colors.reset}`),
  step: (step, total, msg) => console.log(`${colors.dim}[${step}/${total}]${colors.reset} ${colors.brightCyan}➜${colors.reset}  ${colors.bold}Bandit:${colors.reset} ${msg}`),
  highlight: (label, value) => console.log(`   ${colors.dim}•${colors.reset} ${colors.bold}${label}:${colors.reset} ${colors.cyan}${value}${colors.reset}`),
  raw: (msg) => console.log(msg),
  divider: () => console.log(`${colors.gray}─────────────────────────────────────────────────────────────────${colors.reset}`),
};

export function createPrompt() {
  const rl = readline.createInterface({ input, output });
  return rl;
}

function exitMenu() {
  if (input.isTTY && typeof input.setRawMode === "function") {
    input.setRawMode(false);
  }
  process.exit(0);
}

/**
 * Interactive single selection menu
 * @param {string} title
 * @param {Array<{ label: string, value: string, desc?: string }>} options
 * @returns {Promise<string>}
 */
export async function promptSelect(title, options) {
  const rl = createPrompt();
  const supportsRawInput = input.isTTY && typeof input.setRawMode === "function";
  const handleKeypress = (_character, key) => {
    if (key?.name === "escape") {
      exitMenu();
    }
  };

  try {
    if (supportsRawInput) {
      emitKeypressEvents(input);
      input.setRawMode(true);
      input.on("keypress", handleKeypress);
    }

    const printMenu = () => {
      if (title) {
        console.log(`\n${colors.bold}${colors.brightWhite}${title}${colors.reset} ${colors.dim}(radio channel)${colors.reset}`);
      }
      options.forEach((opt, idx) => {
        const num = `${colors.brightCyan}${idx + 1}${colors.reset}`;
        console.log(`  [${num}] ${colors.bold}${opt.label}${colors.reset}`);
      });
      console.log(`  [${colors.gray}0${colors.reset}] ${colors.gray}Exit${colors.reset}`);
    };

    printMenu();

    while (true) {
      const answer = await rl.question(`\n${colors.brightGreen}➜ ${colors.bold}Your orders, pilot?${colors.reset} Select option (1-${options.length}, or 0 to exit): `);
      const trimmed = answer.trim();
      if (trimmed === "0" || trimmed.toLowerCase() === "q" || trimmed.toLowerCase() === "exit") {
        exitMenu();
      }
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        return options[num - 1].value;
      }
      clearScreen();
      printMenu();
      log.warn(`Invalid bearing '${trimmed}'. Please enter a number between 1 and ${options.length}.`);
    }
  } finally {
    if (supportsRawInput) {
      input.off("keypress", handleKeypress);
      input.setRawMode(false);
    }
    rl.close();
  }
}

/**
 * Text input prompt with fallback default
 * @param {string} question
 * @param {string} defaultValue
 * @returns {Promise<string>}
 */
export async function promptInput(question, defaultValue = "") {
  const rl = createPrompt();
  try {
    const hint = defaultValue ? ` ${colors.dim}(default: ${defaultValue})${colors.reset}` : "";
    const answer = await rl.question(`${colors.brightCyan}?${colors.reset} ${colors.bold}Pilot, ${question}${colors.reset}${hint}: `);
    const trimmed = answer.trim();
    return trimmed ? trimmed : defaultValue;
  } finally {
    rl.close();
  }
}

/**
 * Yes / No Confirmation prompt
 * @param {string} question
 * @param {boolean} defaultYes
 * @returns {Promise<boolean>}
 */
export async function promptConfirm(question, defaultYes = true) {
  const rl = createPrompt();
  try {
    const opts = defaultYes ? "[Y/n]" : "[y/N]";
    const answer = await rl.question(`${colors.brightYellow}?${colors.reset} ${colors.bold}${question}${colors.reset} ${colors.dim}${opts}${colors.reset}: `);
    const trimmed = answer.trim().toLowerCase();
    if (!trimmed) return defaultYes;
    return trimmed === "y" || trimmed === "yes";
  } finally {
    rl.close();
  }
}

/**
 * Post-action prompt displaying 2 muted actions: hit Enter to continue or Esc to exit
 * @returns {Promise<"continue" | "exit">}
 */
export async function promptPostAction() {
  if (process.env.NODE_ENV === "test" || !process.stdin.isTTY) {
    return "continue";
  }

  return new Promise((resolve) => {
    process.stdout.write(`\n  ${colors.dim}Radio check: [Enter] to continue  ·  [Esc] to exit${colors.reset}\n`);

    const wasRaw = process.stdin.isRaw;
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();

    const onData = (chunk) => {
      const str = chunk.toString();
      if (str === "\r" || str === "\n" || str === " ") {
        cleanup();
        resolve("continue");
      } else if (str === "\u001b" || str.toLowerCase() === "q") {
        cleanup();
        exitMenu();
      } else if (str === "\u0003") {
        cleanup();
        process.exit(0);
      }
    };

    const cleanup = () => {
      process.stdin.removeListener("data", onData);
      if (process.stdin.setRawMode && process.stdin.isTTY) {
        process.stdin.setRawMode(wasRaw || false);
      }
    };

    process.stdin.on("data", onData);
  });
}

