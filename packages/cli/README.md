# @nx/cli

> Modular, cross-platform interactive CLI and developer toolchain for NX and Goldlabel workspaces.

## Features

- **Zero Runtime Dependencies**: Built with native Node.js ESM built-ins for instant execution (<20ms).
- **Interactive Terminal UI**: Retro ANSI banners, select menus, confirmation prompts, and text input.
- **Cross-Platform**: Seamless execution across macOS, Linux, and Windows CMD/PowerShell.
- **Subcommands**:
  - `setup`: Guided dependency installation & environment diagnostics.
  - `dev`: Launch development server.
  - `test`: Run full CI quality gateway pipeline.
  - `env`: Toolchain and runtime environment diagnostics.

## Usage

From monorepo root:

```bash
pnpm --filter @nx/cli cli
pnpm --filter @nx/cli cli dev
pnpm --filter @nx/cli cli test
pnpm --filter @nx/cli cli env
```
