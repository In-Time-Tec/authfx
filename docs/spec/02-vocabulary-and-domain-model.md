# Vocabulary And Domain Model

`CONTEXT.md` is canonical. This document records the relationships between its terms.

```text
Authenticator
  begins and completes
Authentication transaction
  proves
External identity
  links to
Identity
  resolves through Subject resolver to
Authenticated subject
  receives
Session
  presented through
Session token
```

An Identity may link multiple External identities. An External identity is uniquely identified by authenticator, issuer, and provider subject. Authentication completion either resolves an existing link or proposes a new Identity according to host-supplied linking policy.

A Session belongs to exactly one Identity and records the authentication method, authentication time, expiration, revocation state, and consumer-defined metadata. It does not contain product permissions.

Authentication transactions are separate from Sessions. A transaction may expire or fail without creating a Session. Successful completion consumes the transaction before a Session is exposed.
