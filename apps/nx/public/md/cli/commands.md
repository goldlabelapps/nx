---
order: 9041
title: CLI Command Reference & Workflows
description: Detailed usage, flags, and workflows for all NX CLI subcommands including packages, create, remove, dev, test, setup, env, and clean.
icon: Terminal
tags: cli, commands, reference
image: terminal
---

# CLI Command Reference & Workflows

The NX CLI provides a comprehensive suite of subcommands designed to handle monorepo maintenance, package inspection, dev server execution, and testing workflows.

---

## Command Overview

```bash
gla [subcommand] [options]
```

Or using `pnpm`:

```bash
pnpm --filter @goldlabelapps/cli cli [subcommand] [options]
```

---

## 1. Monorepo Package Inspector (`packages`)

The `packages` subcommand ([packages.js](file:///Users/milky/My%20Drive/GitHub/nx-clients/packages/cli/src/commands/packages.js)) is a powerful workspace inspector module (~37KB). It analyzes workspace structure, package interdependencies, and script targets.

```bash
gla packages
```

### Key Capabilities:
* **Workspace Dependency Graph**: Visualizes internal cross-dependencies between monorepo apps and shared packages.
* **Package Status & Version Audit**: Lists version numbers, entry points, build status, and npm publish readiness.
* **Script Dispatcher**: Interactively select and run scripts across individual workspace packages.

---

## 2. Scaffolding & Teardown (`create` / `remove`)

### `gla create`
Scaffolds new applications, libraries, or UI cartridges using interactive prompts:

```bash
gla create
```
* Prompts for project name, category (App, Package, Cartridge), and template type.
* Automatically configures `package.json`, TypeScript definitions, and imports into the monorepo workspace.

### `gla remove <package-name>`
Safely removes retired applications or packages from the workspace:

```bash
gla remove my-app
```
* Audits dependent packages to prevent broken imports before deletion.
* Prompts for mandatory interactive confirmation unless run with `--yes`.

---

## 3. Development Server Launcher (`dev`)

The `dev` subcommand ([dev.js](file:///Users/milky/My%20Drive/GitHub/nx-clients/packages/cli/src/commands/dev.js)) manages dev server lifecycles across monorepo applications:

```bash
# Interactive selection menu of all available apps
gla dev

# Directly launch a specific target app
gla template
gla dev:template
```

* Assigns ports dynamically within the standard range (`5520`–`5590`).
* Streamlined log formatting with multi-app output prefixing.

---

## 4. Test Runner & Quality Gates (`test`)

The `test` subcommand ([test.js](file:///Users/milky/My%20Drive/GitHub/nx-clients/packages/cli/src/commands/test.js)) wraps Vitest to execute quality checks:

```bash
gla test          # Run full monorepo test suite once
gla test unit     # Run targeted unit tests
gla test watch    # Interactive Vitest watch mode
```

---

## 5. System Health & Setup (`setup` / `env`)

### `gla setup`
Interactively installs dependencies, verifies pnpm lockfiles, and validates project setup for new developers.

### `gla env`
Runs environment diagnostics (Node version, pnpm version, Git status, OS runtime parameters) to verify developer toolchain health.

```bash
gla env
```

---

## 6. Workspace Cleanup (`clean`)

The `clean` subcommand ([clean.js](file:///Users/milky/My%20Drive/GitHub/nx-clients/packages/cli/src/commands/clean.js)) performs safe, non-destructive workspace resets:

```bash
gla clean
```
* Terminates orphaned development server background processes.
* Clears build caches (`dist`, `.turbo`, `.next`, `node_modules/.cache`).
* Preserves source files and environment variables.

---

## Global CLI Flags

| Flag | Short | Description |
| :--- | :--- | :--- |
| `--help` | `-h` | Display command usage and inline assistance |
| `--version` | `-v` | Print installed CLI version |
| `--interactive` | `-i` | Force interactive TUI mode |
| `--quiet` | `-q` | Suppress non-critical console outputs |
| `--dry-run` | | Simulate actions without modifying disk contents |
| `--yes` | `-y` | Skip confirmation prompts (for CI/CD pipelines) |

---

## Next Steps

- Explore **[The Terminal Experience](/goldlabel/terminal-experience)** to see how working in the CLI elevates developer ergonomics and aesthetics.
