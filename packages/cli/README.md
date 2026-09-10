# @goldlabelapps/cli

> Interactive command-line toolchain and developer workspace manager for Goldlabel and NX° applications.

[![npm version](https://img.shields.io/npm/v/@goldlabelapps/cli.svg)](https://www.npmjs.com/package/@goldlabelapps/cli)
[![license](https://img.shields.io/npm/l/@goldlabelapps/cli.svg)](https://github.com/goldlabelapps/nx)

`@goldlabelapps/cli` provides a zero-dependency, high-performance interactive CLI toolchain for workspace setup, app generation, development server orchestration, build execution, testing pipelines, and dependency management.

---

## Key Features

- **Zero Runtime Dependencies**: Built entirely with native Node.js ESM built-ins for lightweight, instant startup (`<20ms`).
- **Interactive Terminal UI**: Retro ANSI banners, navigable menu prompts, confirm dialogs, and clean log formatting.
- **Cross-Platform**: Tested and compatible across macOS, Linux, and Windows (CMD and PowerShell).
- **Workspace Diagnostics**: Instant system environment checking for Node.js, pnpm/npm, Git, and configuration validity.
- **App Management**: Fast app creation and workspace teardown/removal workflows.

---

## Installation

You can run the CLI directly with `npx` or install it globally / locally in your workspace:

### Global Installation

```bash
# via npm
npm install -g @goldlabelapps/cli

# via pnpm
pnpm add -g @goldlabelapps/cli
```

### Local Workspace Installation

```bash
pnpm add -D @goldlabelapps/cli
```

---

## Quick Start & Usage

Executable binaries: `nx-cli` or `gla`

### Interactive Mode

Launch the interactive selection menu simply by invoking the binary without arguments:

```bash
npx @goldlabelapps/cli
# or if installed globally:
gla
```

---

## Command Reference

### `setup` / `init`
Interactive project onboarding, workspace setup, and toolchain dependency verification.

```bash
gla setup [options]
```

### `dev` / `start`
Launch local development servers for workspace applications.

```bash
# Launch default app/interactive selector
gla dev

# Launch a specific app directly
gla dev nx
```

### `build`
Execute build scripts across workspace applications and packages.

```bash
gla build
```

### `create` / `new`
Interactively create, configure, and initialize a new application in the workspace.

```bash
gla create
```

### `remove` / `delete` / `rm`
Safely purge an application directory and clean up workspace references.

```bash
gla remove <app-name>
```

### `test`
Execute the workspace quality gate (type-checking, linting, and unit test runner).

```bash
gla test
```

### `update`
Check for and update `@goldlabelapps` packages to their latest published npm releases.

```bash
gla update
```

### `clean`
Terminate active workspace processes and purge build caches and `node_modules`.

```bash
gla clean
```

### `env` / `doctor`
Inspect system diagnostics, toolchain versions (Node, pnpm, Git), and environment parameters.

```bash
gla env
```

### `help`
Display command manual and usage synopsis.

```bash
gla help
```

---

## Options & Flags

| Flag | Short | Description |
| --- | --- | --- |
| `--help` | `-h` | Display usage synopsis and available commands |
| `--version` | `-v` | Display CLI version |
| `--interactive` | `-i` | Force launch interactive menu loop |
| `--quiet` | `-q` | Suppress banners and non-essential terminal outputs |
| `--dry-run` | | Print commands without executing side-effects |
| `--yes` | `-y` | Skip interactive prompts and accept default choices |

---

## Programmatic Usage

You can also import CLI functions programmatically in Node.js ESM modules:

```javascript
import { runCli, parseArgs } from "@goldlabelapps/cli";

// Parse CLI input arguments
const parsed = parseArgs(["dev", "nx", "--quiet"]);

// Programmatically invoke CLI execution
await runCli(["env"]);
```

---

## License

MIT © [Goldlabel Apps](https://github.com/goldlabelapps)


