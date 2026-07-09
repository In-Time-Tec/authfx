# ADR-0006 — HTTP Is An Optional Adapter

## Status

Accepted.

## Context

Authentication is commonly delivered over HTTP, but core identity, transaction, and Session behavior must remain usable in workers, tests, CLIs, desktop applications, and different web frameworks.

## Decision

Core contains no web-framework request or response types. An optional Effect HTTP package owns routes, cookies, origin checks, CSRF, and error mapping. Next.js, Hono, Express, and other adapters are thin translations over that package.

## Consequences

- Security behavior is shared across framework integrations.
- Framework adapters stay small and replaceable.
- HTTP policy changes require updates to the HTTP specification, not core identity contracts.

## Rejected alternatives

- **Next.js as the primary runtime:** rejected because AuthFX must serve non-Next and non-web consumers.
- **Every framework implements its own security behavior:** rejected because cookie and CSRF drift would become a vulnerability source.

## Related docs

- `docs/spec/07-http-security-and-framework-boundaries.md`
