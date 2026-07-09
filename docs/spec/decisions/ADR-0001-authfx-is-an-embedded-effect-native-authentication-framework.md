# ADR-0001 — AuthFX Is An Embedded Effect-Native Authentication Framework

## Status

Accepted.

## Context

Effect applications need authentication behavior that composes through Effect services, layers, schemas, test time, typed configuration, and typed failures. Existing authentication frameworks provide broad features but make promises, framework handlers, and mutable plugin contexts their primary runtime contract.

## Decision

AuthFX is a standalone, embedded-first authentication framework. Consumers compose it into their own Effect application, persistence, HTTP topology, and deployment. Public operations remain Effect-native, and the framework is designed to grow into a comprehensive authentication system through provider and capability packages.

## Consequences

- Consumers retain control of identity data, sessions, keys, and deployment.
- AuthFX must maintain security-sensitive protocol and session behavior.
- Hosted operation may be built by a consumer, but AuthFX is not defined as a hosted service.
- Package boundaries and test layers are part of the public architecture.

## Rejected alternatives

- **Continue wrapping a Promise-first authentication framework:** rejected because the wrapper remains the most security-sensitive architectural seam and does not remove duplicate identity or token models.
- **Build only Plus-One-specific authentication:** rejected because the identity, session, OIDC, HTTP security, and device-flow contracts are reusable and should not import product vocabulary.
- **Start with a hosted identity service:** rejected because consumers need embedded services, local policy, and direct persistence ownership.

## Related docs

- `docs/spec/01-product-intent.md`
- `docs/spec/11-sdk-and-layer-composition.md`
