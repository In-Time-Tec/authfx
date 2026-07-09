# Roadmap And Open Questions

## Initial implementation sequence

1. Core schemas, errors, and service ports.
2. Memory stores and conformance tests.
3. Opaque Session service.
4. Authentication transaction service.
5. Microsoft OIDC Authenticator and mock fixtures.
6. Effect HTTP adapter with cookies, origins, and CSRF.
7. Device authorization.
8. Effect SQL Postgres store.
9. Plus-One migration adapter and end-to-end verification.

## Later candidates

- Password credentials and reset flows.
- Email links and one-time passwords.
- WebAuthn and passkeys.
- MFA and recovery.
- Additional OIDC and social provider helpers.
- SAML service-provider support.
- SCIM server support.
- OAuth/OIDC provider mode.
- Organization and membership helper packages.

## Open questions

- Whether the first SQL package supports only Postgres or multiple Effect SQL dialects.
- Whether session token lookup uses a keyed hash, slow password hash, or split public id plus verifier format.
- Whether a generic lifecycle event port ships in core or remains consumer hooks in the initial version.
- Which later authentication method provides the second implementation needed to validate the Authenticator contract.
