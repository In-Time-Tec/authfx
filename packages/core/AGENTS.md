<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-07-09 | Updated: 2026-07-09 -->

# packages/core

## Purpose

`@authfx/core` is the infrastructure-free authentication contract package. It will own identity, authenticator, authentication transaction, session, and typed-error schemas plus Effect service interfaces. It must not own HTTP framework adapters, SQL implementations, product tenancy, or provider SDK clients.

## For AI Agents

- Read `CONTEXT.md`, `SPEC.md`, and the owning feature document before adding exports.
- Do not add public behavior until its contract and failure modes exist in the spec tree.
- Every behavior-bearing service must expose a test or memory layer.

## Testing And Verification

Run `bun --cwd ../.. test`, `bun --cwd ../.. typecheck`, and `bun --cwd ../.. lint`.

<!-- MANUAL: Add human-maintained notes below this line. -->
