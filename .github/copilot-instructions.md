# AI Coding Instructions

## Core principle

Use AI sparingly and efficiently. Only use AI when it provides clear value. Prefer simple, deterministic solutions and existing project patterns over generating new code or exploring unnecessary alternatives.

## Minimise AI usage

* Do not use AI for trivial changes that can be made directly.
* Do not unnecessarily inspect large numbers of files.
* Do not repeatedly re-read files that have already been understood.
* Keep changes tightly scoped to the user's request.
* Do not refactor unrelated code.
* Do not add abstractions unless they are genuinely required.
* Prefer editing existing code over generating large amounts of new code.
* Before making a change, understand the smallest set of files required.

## Testing

* **Do not run the full test suite automatically.**
* Do not run tests after every change.
* Do not generate tests unless explicitly requested or they are genuinely necessary for the task.
* If testing is appropriate, run only the smallest relevant test or validation.
* Prefer lightweight validation such as TypeScript checks, linting, or targeted tests where appropriate.
* Never spend significant AI/tool usage on broad test execution unless explicitly requested.

## Agent behaviour

* Do not autonomously expand the scope of a task.
* Do not attempt to "improve" unrelated code.
* Do not proactively implement future features.
* Do not make speculative changes.
* Ask for clarification when requirements are genuinely ambiguous rather than exploring multiple implementations.
* Work incrementally and stop when the requested task is complete.

## Codebase awareness

* Follow existing project conventions and patterns.
* Reuse existing utilities, components, hooks and abstractions where possible.
* Do not introduce new dependencies unless necessary.
* Do not create documentation, comments or files unless they provide real value.
* Avoid unnecessary file creation.

## Cost awareness

Treat AI context, agent iterations and tool calls as limited resources.

Before acting, determine the smallest useful operation that will complete the task. Prefer one focused change over a long autonomous workflow.

When the task is complete, stop. Do not continue analysing, testing or suggesting additional work unless asked.
