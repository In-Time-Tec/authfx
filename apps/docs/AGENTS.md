# AuthFX Docs App

## Purpose

`apps/docs` is the FoldKit documentation shell for AuthFX. It is a static Vite app; framework behavior stays in `packages/`.

## Rules

- Keep the app as a presentation shell over `src/content/registry.ts`.
- Source prose from `docs/spec/`, `CONTEXT.md`, and `SPEC.md`. AuthFX is specification-first and pre-implementation; pages must describe specified contracts, not invent shipped APIs.
- Code examples illustrate the specified SDK shape. Snippets importing unimplemented `@authfx/*` packages are illustrative and are not executed.
- Do not add runtime behavior, persistence, provider calls, or product authorization semantics here.
- Add FoldCN components through the local `../foldcn` registry and keep the generated `components.json` configuration.
- Do not use `Date.now`; use fixed timestamps in examples.

## Verification

```bash
bun run --cwd apps/docs test
bun run --cwd apps/docs typecheck
bun run --cwd apps/docs build
```
