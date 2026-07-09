# AuthFX Product Intent

## The short version

AuthFX is the embedded-first, Effect-native authentication framework for TypeScript. It gives applications composable authentication methods, secure authentication transactions, identities, sessions, device authorization, and HTTP integrations without requiring a hosted identity control plane or a Promise-first runtime.

## Why it exists

Effect applications currently adapt authentication libraries whose primary contracts are callbacks, promises, framework handlers, and mutable plugin contexts. That creates an architectural seam exactly where security behavior should be explicit, typed, testable, and composable.

AuthFX makes authentication an Effect program. Authentication methods, identity and session stores, subject resolution, HTTP security, rate limiting, audit, and test implementations are services and layers. Failures remain typed. Time, randomness, cryptography, configuration, and concurrency enter through Effect services.

## Boundary rules

- AuthFX proves who authenticated and issues sessions. It does not infer product authorization.
- AuthFX does not own external work-system connections, provider API credentials, webhook subscriptions, or provider resources; those belong to ConnectFX.
- AuthFX does not require a hosted AuthFX service. Consumers compose it into their own process and persistence.
- Provider packages own protocol and provider quirks. Core contains no Microsoft, Google, password, passkey, SAML, or framework-specific branches.
- The first implementation is Microsoft-focused, but Microsoft never defines the core identity or session model.

## Designed to grow

The target framework can eventually support passwords, email links, passkeys, MFA, social and enterprise identity providers, SAML, SCIM, OAuth-provider mode, organization helpers, and framework adapters. Those capabilities are added only through specified packages and real consumer requirements.

## Where it is today

The repository contains the charter, vocabulary, specifications, ADRs, toolchain, and implementation backlog. Runtime behavior has not been implemented.
