# Identity And External Identities

Identity is the stable local authentication record. External identities link provider assertions to it.

The identity store supports create, find, update profile metadata, disable, and link or unlink External identities. Linking is governed by a consumer-supplied policy. Core never links solely because two providers return the same unverified email.

External identity uniqueness is scoped by authenticator id, issuer, and provider subject. Email is profile data, not identity.

AuthFX emits lifecycle events after durable identity creation and linking. Consumers may use those events to provision product Members or profiles, but failures in consumer provisioning do not corrupt the authentication transaction. Consumers decide whether such failures block Session issuance through an explicit hook policy.

AuthFX does not own organization membership, tenant admission, roles, or application authority. Those are resolved through Subject resolver and consumer policy.
