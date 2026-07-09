# AuthFX Context

This file is the canonical vocabulary for AuthFX. `SPEC.md` indexes the detailed contracts under `docs/spec/`.

## Positioning

AuthFX is an embedded-first, Effect-native authentication framework. It is intended to grow into a comprehensive authentication framework while beginning with the smallest production-complete slice required for Microsoft OpenID Connect, opaque sessions, bearer authentication, and device authorization.

## Language

**Identity**:
A durable local record representing one authenticated entity known to the consumer application.
_Avoid_: User, account, member

**External identity**:
A provider-issued identity associated with a local Identity through a stable issuer and subject.
_Avoid_: Social account, login account, connection

**Authenticator**:
A provider-neutral implementation of one authentication method that begins and completes an Authentication transaction.
_Avoid_: Provider, strategy, connector

**Authentication transaction**:
A short-lived, single-use attempt to prove an identity, including state, nonce, PKCE material, redirect intent, expiration, and completion status.
_Avoid_: Login session, OAuth state

**Session**:
A revocable, expiring authenticated relationship between a client and an Identity.
_Avoid_: Access token, provider token, connection

**Session token**:
An opaque bearer secret presented by a client to resolve a Session. Persistent stores keep only a verifier or hash, never the usable token.
_Avoid_: JWT, access token

**Authenticated subject**:
The consumer-facing opaque subject resolved from an authenticated Identity and Session.
_Avoid_: Authority, permission, tenant membership

**Subject resolver**:
The consumer-supplied boundary that maps an Identity into the host application's authenticated subject and optional claims.
_Avoid_: Authorization engine, tenant manager

**Authentication method**:
A protocol and credential mechanism used to authenticate an identity, such as OIDC, password, passkey, email link, or device authorization.
_Avoid_: Connection provider, capability

**Device authorization**:
An authentication method in which a constrained client receives a device code, a human approves a user code in another client, and the constrained client receives a Session token.
_Avoid_: Device login session

**Challenge**:
Short-lived proof material used by an Authenticator, including nonce, PKCE, one-time codes, or protocol-specific state.
_Avoid_: Credential

**Credential**:
Secret or public proof material used to authenticate an Identity through an Authentication method.
_Avoid_: Provider connection token

## Invariants

- Authentication proves identity; consumer applications own authorization, tenancy, roles, and business policy.
- AuthFX core contains no provider-specific or web-framework-specific branches.
- AuthFX public behavior is Effect-native and returns `Effect`, `Stream`, `Layer`, or plain Schema-backed values.
- Session tokens are opaque and persisted only as verifiers or hashes.
- Authentication transactions are expiring and single-use; replay fails typed and observably.
- Provider access credentials for external systems belong to ConnectFX, even when acquired during an OAuth flow.
- Consumers own deployment, persistence choice, key custody, and HTTP topology.
- Every behavior-bearing service has a test or memory layer.
- New durable concepts require a feature document; stable decisions require an ADR.

## Spec branches

- Product intent: `docs/spec/01-product-intent.md`
- Vocabulary and domain model: `docs/spec/02-vocabulary-and-domain-model.md`
- Non-functional requirements: `docs/spec/03-non-functional-requirements.md`
- Authentication transactions and authenticators: `docs/spec/04-authentication-transactions-and-authenticators.md`
- Identity and external identities: `docs/spec/05-identity-and-external-identities.md`
- Sessions and bearer authentication: `docs/spec/06-sessions-and-bearer-authentication.md`
- HTTP security and framework boundaries: `docs/spec/07-http-security-and-framework-boundaries.md`
- Microsoft OIDC provider: `docs/spec/08-microsoft-oidc-provider.md`
- Device authorization: `docs/spec/09-device-authorization.md`
- Stores and persistence: `docs/spec/10-stores-and-persistence.md`
- SDK and layer composition: `docs/spec/11-sdk-and-layer-composition.md`
- Testing and security verification: `docs/spec/12-testing-and-security-verification.md`
- Plus-One migration: `docs/spec/13-plusone-migration.md`
- Roadmap: `docs/spec/14-roadmap-and-open-questions.md`
