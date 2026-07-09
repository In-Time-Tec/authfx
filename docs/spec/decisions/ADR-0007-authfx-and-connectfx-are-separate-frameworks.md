# ADR-0007 — AuthFX And ConnectFX Are Separate Frameworks

## Status

Accepted.

## Context

Login identities and operational provider connections may both use OAuth, but they have different subjects, lifecycles, credentials, and security consequences. A successful login does not imply permission to act in an external work system, and provider installations may belong to organizations or applications rather than users.

## Decision

AuthFX owns local authentication and Sessions. ConnectFX owns external provider Connections, operational Credentials, Grants, health, subscriptions, and managed resources. Neither framework imports the other. Consumer applications bridge them through opaque subject identifiers and explicit policy.

## Consequences

- OAuth protocol code may exist in both domains behind different contracts or shared low-level standards libraries.
- Product authority remains explicit at the composition boundary.
- AuthFX provider tokens used only for identity proof are not ConnectFX operational credentials.

## Rejected alternatives

- **One combined auth-and-connections framework:** rejected because it would conflate login identity with external-system authority.
- **ConnectFX reads AuthFX sessions directly:** rejected because connection operations must receive an already authorized host subject.

## Related docs

- `docs/spec/01-product-intent.md`
- `docs/spec/13-plusone-migration.md`
