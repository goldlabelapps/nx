<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Open Source</span>
    </h1>
</div>

> NX° is a powerful JavaScript framework for creating apps to meet multiple projects and needs. Built for creators, coders, collaborators, and audiences who need a flexible space to publish, discover, and engage with rich content [more...](./docs/README.md)

## Test Suite

The NX° test suite validates apps, shared packages, and monorepo guardrails in one place. It combines Jest (apps), Vitest (design system), and Node/TSX tests (shared packages + root checks), then prints a single end-of-run summary. Run from repository root

```bash
pnpm test
```

#### Understand the code

- [Monorepo test runner](tests/run-monorepo-tests.mjs)
- [Monorepo coverage runner](tests/run-monorepo-coverage.mjs)
- [Root framework guard tests](tests/testing-framework.test.mjs)
- [WWW integration test example](apps/www/tests/integration/nav-theme-toggle.test.tsx)
- [Design-system navigation test example](packages/design-system/tests/components/navigation/navigation.test.tsx)
- [Markdown parser package test example](packages/markdown/tests/parser.test.ts)

## Bash CLI

The repo includes a bash-only workspace CLI in [shell/nx.sh](shell/nx.sh). It works from a fresh clone before any package install:

```bash
bash shell/nx.sh
bash shell/nx.sh bootstrap
bash shell/nx.sh dev
```

On Windows, run it from Git Bash or WSL so the bash entrypoint is available.
