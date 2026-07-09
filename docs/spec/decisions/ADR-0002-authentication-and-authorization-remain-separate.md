# ADR-0002 — Authentication And Authorization Remain Separate

## Status

Accepted.

## Context

Authentication establishes identity. Products still need tenant admission, roles, resource ownership, delegated authority, and business policy. Combining those concerns in AuthFX would bake one product model into a reusable framework and make successful login imply permissions it cannot safely infer.

## Decision

AuthFX produces an authenticated Identity and Session. A consumer-supplied Subject resolver maps that Identity into an opaque Authenticated subject. Consumers own authorization, tenancy, roles, and policy outside AuthFX.

## Consequences

- AuthFX can serve products with different tenant and authorization models.
- Applications perform an explicit authorization step after Session verification.
- AuthFX cannot expose convenience APIs that silently derive roles from authentication claims.

## Rejected alternatives

- **Built-in organization and role model in core:** rejected because application organizations and provider organizations are not universal or equivalent.
- **Authentication claims as product authority:** rejected because provider claims do not prove current application permission.

## Related docs

- `docs/spec/05-identity-and-external-identities.md`
- `docs/spec/06-sessions-and-bearer-authentication.md`
