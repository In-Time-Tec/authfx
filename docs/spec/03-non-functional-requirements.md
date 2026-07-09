# Non-Functional Requirements

## Security

- Authentication transactions and device codes are single-use and replay-detecting.
- OAuth and OIDC adapters validate state, PKCE, nonce, issuer, audience, timestamps, signatures, and exact redirect targets as applicable.
- Session tokens contain at least 256 bits of cryptographically secure entropy.
- Persistent stores keep session-token hashes or keyed verifiers, never usable tokens.
- Cookie adapters default to `HttpOnly`, host-only, `SameSite=Lax`, path `/`, and `Secure` outside explicit local development.
- State-changing cookie-authenticated endpoints enforce trusted-origin and CSRF policy.
- Secrets flow through `Config` and `Redacted` and never enter logs or schemas intended for client output.

## Reliability

- Transaction completion, identity linking, and session issuance have explicit atomicity boundaries.
- Repeated callbacks and repeated device approvals cannot issue multiple sessions for one completed transaction.
- Revocation is immediately visible to later verification against canonical storage.
- Provider and store failures are typed and preserve retryability information.

## Testability

- Every service has a test or memory layer.
- Time and randomness are controllable through Effect test services.
- Provider packages include protocol fixtures for success, denial, malformed responses, key rotation, replay, and timeout.
- Security invariants have adversarial tests, not only happy-path examples.

## Operations

- Authentication attempts, outcomes, replay failures, session issue, renewal, and revocation emit structured telemetry without secrets.
- Consumers can inspect active sessions and terminate them through Effect services.
- Public APIs remain usable in single-process and consumer-owned multi-process deployments.
