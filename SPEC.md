# AuthFX Specification Index

AuthFX is an embedded-first, Effect-native authentication framework for TypeScript. It is designed to grow into a comprehensive authentication framework while beginning with a Microsoft-focused production slice.

## How to read this tree

Read `CONTEXT.md`, then the root specification documents, then the feature branch matching the work. Stable architectural decisions live under `docs/spec/decisions/`. Implementation must not introduce public behavior absent from this tree.

```diagram
SPEC.md
├─ 00-reading-guide.md
├─ 01-product-intent.md
├─ 02-vocabulary-and-domain-model.md
├─ 03-non-functional-requirements.md
├─ feature branches
│  ├─ 04-authentication-transactions-and-authenticators.md
│  ├─ 05-identity-and-external-identities.md
│  ├─ 06-sessions-and-bearer-authentication.md
│  ├─ 07-http-security-and-framework-boundaries.md
│  ├─ 08-microsoft-oidc-provider.md
│  ├─ 09-device-authorization.md
│  ├─ 10-stores-and-persistence.md
│  ├─ 11-sdk-and-layer-composition.md
│  ├─ 12-testing-and-security-verification.md
│  └─ 13-plusone-migration.md
├─ planning
│  └─ 14-roadmap-and-open-questions.md
└─ decisions
   ├─ ADR-0001-authfx-is-an-embedded-effect-native-authentication-framework.md
   ├─ ADR-0002-authentication-and-authorization-remain-separate.md
   ├─ ADR-0003-authenticators-are-provider-packages.md
   ├─ ADR-0004-sessions-use-opaque-tokens.md
   ├─ ADR-0005-microsoft-oidc-is-the-first-provider.md
   ├─ ADR-0006-http-is-an-optional-adapter.md
   └─ ADR-0007-authfx-and-connectfx-are-separate-frameworks.md
```

## Canonical entry points

| Need                                  | Read                                                             |
| ------------------------------------- | ---------------------------------------------------------------- |
| Why AuthFX exists                     | `docs/spec/01-product-intent.md`                                 |
| Domain language                       | `CONTEXT.md`, `docs/spec/02-vocabulary-and-domain-model.md`      |
| Reliability and security requirements | `docs/spec/03-non-functional-requirements.md`                    |
| Provider-neutral authentication flow  | `docs/spec/04-authentication-transactions-and-authenticators.md` |
| Identity linking                      | `docs/spec/05-identity-and-external-identities.md`               |
| Sessions and bearer tokens            | `docs/spec/06-sessions-and-bearer-authentication.md`             |
| Cookies, CSRF, origins, and handlers  | `docs/spec/07-http-security-and-framework-boundaries.md`         |
| Microsoft sign-in                     | `docs/spec/08-microsoft-oidc-provider.md`                        |
| CLI and constrained-device login      | `docs/spec/09-device-authorization.md`                           |
| Persistence contracts                 | `docs/spec/10-stores-and-persistence.md`                         |
| Public Effect SDK                     | `docs/spec/11-sdk-and-layer-composition.md`                      |
| Security verification                 | `docs/spec/12-testing-and-security-verification.md`              |
| Replacing Better Auth in Plus-One     | `docs/spec/13-plusone-migration.md`                              |
| Planned expansion                     | `docs/spec/14-roadmap-and-open-questions.md`                     |

## Non-negotiable decisions

1. AuthFX is embedded-first and Effect-native.
2. Authentication and product authorization remain separate.
3. Core is provider-neutral; authentication methods live in provider or method packages.
4. Sessions use random opaque tokens and stores persist only token verifiers or hashes.
5. Authentication transactions are expiring, single-use, and replay-detecting.
6. Microsoft OIDC is the first provider, not the core ontology.
7. HTTP integrations are optional adapters over Effect-native services.
8. ConnectFX owns external provider connections and operational credentials.
9. Every behavior-bearing service exposes a deterministic test or memory layer.
10. Public behavior is specified before implementation.

## Spec maintenance rules

- Update the owning feature document before changing behavior.
- Add an ADR when changing a stable decision.
- Update `CONTEXT.md` before introducing or renaming domain terms.
- Keep this file an index; detailed requirements belong in feature documents.
