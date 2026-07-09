<!-- Generated: 2026-07-09 | Updated: 2026-07-09 -->

# AuthFX

## Purpose

AuthFX is an embedded-first, Effect-native authentication framework for TypeScript. The long-term product is a comprehensive authentication framework; the first implementation slice is Microsoft OIDC, secure authentication transactions, opaque sessions, bearer authentication, HTTP security, and device authorization.

## Repository Layout

| Directory            | Purpose                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `packages/`          | Reusable deep-module packages. `packages/core` is currently the only scaffolded package. |
| `docs/spec/`         | Canonical feature contracts and ADRs.                                                    |
| `ast-grep/rules/`    | Structural lint rules.                                                                   |
| `.github/workflows/` | CI gates.                                                                                |

## Current Standards

- Read `CONTEXT.md`, `SPEC.md`, and the owning feature document before changing public behavior.
- Do not implement a public contract, service, table, route, or runtime invariant not described in the spec tree.
- AuthFX is Effect-native: public operations return `Effect` or `Stream`; services compose through `Layer`; boundary values use Effect Schema; failures crossing boundaries are typed tagged errors.
- Core is provider-neutral and framework-neutral. Microsoft and HTTP integrations live in separate packages when implemented.
- Authentication does not imply authorization. Consumer applications resolve identities into their own subjects, tenants, roles, and permissions.
- AuthFX does not own external provider connections or provider API credentials; ConnectFX owns that domain.
- Raw time, randomness, cryptography, HTTP, files, and concurrency remain behind Effect services.
- Every behavior-bearing service exposes a test or memory layer.
- No code comments. Architectural rationale belongs in specs and ADRs.
- Use Bun, Turbo, Vitest with `@effect/vitest`, plain oxlint, ast-grep, and Prettier.

## For AI Agents

- Treat the repository as specification-first and pre-implementation.
- Stop and update docs before introducing any durable concept not already specified.
- Inspect installed Effect source before using unstable APIs.
- Do not add compatibility with Better Auth to core contracts. Migration adapters, if required, belong at the edge.
- Do not add SAML, SCIM, passwords, passkeys, MFA, or organization management until their own specs and ADRs exist.

## Commands

```bash
bun install
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run test:coverage
bun run build
```

<!-- MANUAL: Add human-maintained notes below this line. -->
