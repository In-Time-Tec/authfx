# Product Intent

AuthFX gives Effect applications a complete, embeddable authentication foundation without forcing authentication through Promise-first callbacks, a hosted control plane, or provider-specific core models.

The framework owns authentication methods, authentication transactions, identity linking, sessions, device authorization, HTTP security adapters, persistence ports, and test layers. Consumers own product authorization, tenancy, roles, deployment, key custody, and policy.

The first production target is Microsoft OIDC sign-in plus opaque web and bearer sessions and device authorization. The architecture must allow later password, email, passkey, MFA, social, SAML, SCIM, and OAuth-provider packages without changing the core identity and session contracts.

AuthFX does not own external provider API access after login. Operational connections, provider grants, API keys, service accounts, webhooks, and managed resources belong to ConnectFX.
