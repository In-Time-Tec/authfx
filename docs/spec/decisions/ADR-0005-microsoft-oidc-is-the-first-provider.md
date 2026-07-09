# ADR-0005 — Microsoft OIDC Is The First Provider

## Status

Accepted.

## Context

Plus-One currently depends on Microsoft organizational sign-in and already has a local Microsoft mock, tenant admission policy, and JWT/JWKS verification experience. Building several providers before one is production-complete would spread security work and freeze an unproven abstraction.

## Decision

The first Authenticator package implements Microsoft Entra OIDC authorization-code sign-in with PKCE. Microsoft-specific claims and authority configuration remain inside the package. Core stays provider-neutral.

## Consequences

- The first end-to-end consumer is Plus-One.
- The Authenticator contract remains provisional until a second real method validates it.
- Microsoft test fixtures and mock-authority support are required from the first implementation.

## Rejected alternatives

- **Implement a broad social-provider catalog first:** rejected because breadth would precede production proof and increase protocol risk.
- **Use Microsoft concepts in core:** rejected because tenant ids and Graph scopes are provider data, not authentication ontology.

## Related docs

- `docs/spec/08-microsoft-oidc-provider.md`
- `docs/spec/13-plusone-migration.md`
