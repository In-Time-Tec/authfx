# Testing And Security Verification

Tests are organized by contract:

- schema and codec tests;
- authentication transaction state-machine tests;
- identity linking policy tests;
- session issue, verify, renew, rotate, expire, and revoke tests;
- HTTP origin, CSRF, cookie, and callback validation tests;
- Microsoft OIDC protocol fixture tests;
- device authorization polling and abuse tests;
- store conformance tests;
- end-to-end local mock-provider tests.

Security tests include replayed callbacks, stolen state without matching cookie or verifier, nonce mismatch, wrong issuer or audience, stale signing keys, unverified-email linking, session fixation, revoked-session reuse, cookie downgrade, cross-origin state change, user-code brute force, and duplicate device approval.

No test waits on wall-clock time. TestClock and deterministic randomness drive expiration and token scenarios. Every behavior-bearing service exposes a test or memory layer.

Production adoption requires an independent security review of session, HTTP, OAuth/OIDC, and device-flow implementations.
