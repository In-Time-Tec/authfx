# Authentication Transactions And Authenticators

An Authenticator implements one authentication method behind a provider-neutral Effect interface. Core owns transaction lifecycle; the Authenticator owns protocol-specific request and response processing.

Required operations are:

- begin authentication and return a redirect, challenge, or protocol instruction;
- complete authentication from validated callback or proof input;
- normalize the result into a verified External identity assertion;
- classify denial, malformed response, provider outage, invalid proof, and configuration failures.

An Authentication transaction stores its authenticator id, challenge material, redirect intent, creation and expiration times, attempt status, and opaque authenticator data. Consumers cannot supply a completed identity assertion directly.

Transaction stores must provide atomic consume semantics. Completion consumes the transaction before identity linking and session issuance become externally visible. If the enclosing store supports transactions, completion and session issuance occur in one transaction; otherwise the implementation must use an idempotent completion key.

Core does not define OAuth-specific fields. PKCE, nonce, SAML request ids, passkey challenges, and email codes are authenticator-owned challenge data.
