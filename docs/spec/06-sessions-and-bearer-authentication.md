# Sessions And Bearer Authentication

Sessions are durable, revocable records identified by `SessionId`. A client receives a random opaque Session token exactly once. Stores persist a keyed verifier or cryptographic hash suitable for indexed lookup.

Session records include Identity id, authentication method, authenticated-at time, created-at time, absolute expiration, optional idle expiration, last-seen time, revocation state, and consumer-defined metadata.

Verification accepts a token, resolves the Session, rejects expiration or revocation, and returns the Identity plus Session metadata. Verification never grants product permissions.

Renewal may extend idle expiration within a fixed absolute lifetime. Rotation issues a new token and invalidates the prior token atomically. Privilege or subject changes require rotation or revocation according to consumer policy.

Bearer authentication and cookie authentication resolve through the same Session service. JWT sessions may be added later through a separate ADR; they are not the initial session model.
