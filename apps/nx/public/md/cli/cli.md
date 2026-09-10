---
order: 9039
title: Commnd Line Interface
description: Interactive command-line toolchain for NX and Goldlabel workspaces — zero runtime dependencies, non-destructive operation, retro interactive terminal UI, and terminal aesthetics.
icon: Terminal
tags: cli, terminal, developer-tools
image: terminal
---

The **NX CLI package** (`@goldlabelapps/cli`, aliased via binary entries as `nx-cli` and `gla`) is a modular, cross-platform interactive command-line toolchain built specifically for NX and Goldlabel workspaces.

Instead of memorizing multi-flag shell commands or relying on clunky GUI dashboards, the NX CLI delivers a fast, keyboard-driven terminal experience that brings speed, clarity, and precision to everyday workspace operations.

---

## Documentation Sections

Explore the expanded NX CLI documentation:

- 🏗️ **[Architecture & Terminal Engineering](/nx/cli/architecture)** — Zero-dependency ESM design, native `readline` TUI engine, sub-20ms boot times, and cross-platform compatibility.
- ⚡ **[Command Reference & Workflows](/nx/cli/commands)** — Exhaustive guide to `packages`, `create`, `remove`, `dev`, `test`, `setup`, `env`, `clean`, and CLI flags.
- 🕶️ **[The Terminal Experience & Aesthetics](/goldlabel/terminal-experience)** — Why operating in the terminal makes you faster, more efficient, and undeniably cool.

---

## Core Philosophy & Highlights

* ⚡ **Sub-20ms Boot Performance**: Built with 100% native Node.js ESM built-ins (`readline`, `child_process`, `fs`, `path`, `os`). Zero external runtime dependencies means no `node_modules` overhead, instant startup, and zero risk of dependency supply-chain breaks.
* 🛡️ **Non-Destructive & Safe**: Built with interactive confirmation prompts, `--dry-run` simulation flags, and clear diagnostic output to ensure operations never delete or overwrite code unintentionally.
* 🎮 **Retro Interactive TUI**: Features custom ANSI banners, keyboard-navigable selection menus, real-time spinners, and post-action summaries.
* 🌐 **Cross-Platform Parity**: Runs seamlessly on macOS, Linux, and Windows (CMD & PowerShell) without requiring Unix-only bash utilities.

---

## Quick Usage

You can invoke the CLI directly via its binary entrypoints or through `pnpm`:

```bash
# Launch interactive main menu using configured binary aliases
gla
nx-cli

# Or run via pnpm filter from monorepo root
pnpm --filter @goldlabelapps/cli cli

# Run targeted subcommands
gla setup
gla dev
gla test
gla env
```

---

## Summary

The NX CLI turns complex monorepo operations—scaffolding apps, managing dependencies, launching dev servers, and clearing caches—into effortless terminal commands. 

Proceed to [Architecture & Terminal Engineering](/nx/cli/architecture) to explore how the zero-dependency CLI engine works under the hood.
