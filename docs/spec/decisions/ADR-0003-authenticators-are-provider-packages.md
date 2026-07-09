# ADR-0003 — Authenticators Are Provider Or Method Packages

## Status

Accepted.

## Context

OIDC, passwords, passkeys, email links, SAML, and device authorization have different protocol requirements and dependencies. Putting them in core would create provider branches and force every consumer to install every dependency.

## Decision

Core defines the Authenticator contract and Authentication transaction lifecycle. Concrete methods and providers live in optional packages that depend inward on core. Core never imports a provider package.

## Consequences

- Consumers install only the methods they use.
- Provider packages can carry protocol-specific dependencies and test fixtures.
- The Authenticator contract must remain smaller than any one provider implementation.

## Rejected alternatives

- **All authentication methods in core:** rejected because dependency and protocol complexity would leak into every consumer.
- **One universal OAuth provider configuration:** rejected because non-OAuth methods and provider-specific verification cannot be represented safely by endpoint strings alone.

## Related docs

- `docs/spec/04-authentication-transactions-and-authenticators.md`
- `docs/spec/08-microsoft-oidc-provider.md`
