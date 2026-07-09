# Microsoft OIDC Provider

The Microsoft package is the first Authenticator implementation. It supports Microsoft Entra authorization-code sign-in for organizational accounts and test authorities.

It must:

- use authorization code with PKCE;
- generate and validate OIDC nonce;
- validate issuer, audience, signature, expiration, and token timing;
- support tenant configuration including `organizations` and explicit tenant ids;
- expose the Microsoft tenant id, issuer, subject, verified email claims, display name, and optional profile metadata as a verified External identity assertion;
- classify tenant rejection separately from protocol failure;
- support a configurable authority for deterministic local testing.

Tenant admission remains consumer policy. The provider proves the tenant claim; it does not decide whether that tenant may use the product.

The package must use Effect HTTP, Config, Redacted, Clock, and cryptographic services. Raw Microsoft SDK dependencies are optional and may be used only at the package boundary when they reduce protocol risk.
