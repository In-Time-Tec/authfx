# ADR-0004 — Sessions Use Opaque Tokens

## Status

Accepted.

## Context

AuthFX needs immediate revocation, server-owned renewal, small client credentials, and one Session model shared by cookies, bearer headers, CLI, and desktop clients. Self-contained JWT sessions complicate immediate revocation and claim freshness.

## Decision

The initial Session model uses cryptographically random opaque tokens. Clients receive the token; stores persist only a verifier or hash. Verification resolves canonical Session state on each authenticated boundary or through an explicitly bounded cache.

## Consequences

- Revocation and subject changes are immediately enforceable.
- Session verification requires storage access.
- JWT issuance may be added as a separate capability, but it does not replace canonical Sessions without a new ADR.

## Rejected alternatives

- **JWT-only sessions:** rejected because immediate revocation and current subject resolution would require a second state mechanism.
- **Persist plaintext session tokens:** rejected because a database read would expose usable credentials.

## Related docs

- `docs/spec/06-sessions-and-bearer-authentication.md`
- `docs/spec/10-stores-and-persistence.md`
