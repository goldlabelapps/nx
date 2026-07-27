# nx-agent Documentation

This README is a lightweight pointer for source files and agent tooling.

## Table of Contents

1. [Package README](./README.md)
2. [Agent guide](./AGENTS.md)
3. [Claude guide](./CLAUDE.md)

## Agent Scaffold

- `agent/instructions.md`
- `agent/agent.ts`
- `agent/channels/eve.ts`
- `agent/skills/research.md`
- `agent/tools/getProjectContext.ts`
- `agent/tools/proposeSensitiveAction.ts`

## Web Chat Scaffold

- `next.config.ts` (with `withEve` integration)
- `app/` (Next.js chat UI)
- `components/` (UI elements scaffolded by Eve web channel)

## Evals

- `evals/evals.config.ts`
- `evals/smoke.eval.ts`

## Docs Conventions

- Keep package-level documentation in this package directory.
- Prefer concise, implementation-focused docs with links to official sources.
