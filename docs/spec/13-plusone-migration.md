# Plus-One Migration

Plus-One is the first consumer and migration source, not the AuthFX domain model.

Migration preserves existing consumer-facing Effect seams while replacing Better Auth behind them. The sequence is:

1. ConnectFX removes external-provider connection OAuth and operational token custody from Better Auth.
2. AuthFX implements Microsoft sign-in, Sessions, bearer verification, HTTP integration, and device authorization.
3. Plus-One adapts AuthFX Identity through its own tenant admission and Member provisioning boundary.
4. Cutover forces reauthentication rather than preserving Better Auth Session cookies.
5. Better Auth-encrypted provider tokens are migrated by ConnectFX or invalidated through explicit re-consent before the Better Auth secret is retired.
6. SSO, SCIM, JWT issuance, invitations, and other configured Better Auth features are removed only after production usage is checked.

AuthFX must not import Plus-One `TenantId`, `MemberId`, `AuthorityContext`, Agent, or provider-connection vocabulary. Migration adapters remain in Plus-One or dedicated edge packages.
