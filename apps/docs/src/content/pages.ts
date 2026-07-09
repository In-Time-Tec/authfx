import { bullets, callout, code, codeBlock, definePage, h2, h3, lead, link, p, pills, strong, table } from "../prose"

const planned = callout(
  "warning",
  "Specification-first",
  "Authfx is pre-release. These pages describe the accepted contracts and intended package boundaries. Check the repository issues and release notes before treating an API as shipped.",
)

export const introduction = definePage({
  path: "/docs/start/introduction",
  title: "What is Authfx?",
  navTitle: "Introduction",
  group: "Start",
  description: "An embedded-first authentication framework for Effect applications.",
  content: [
    lead(
      "Authfx gives Effect applications provider-neutral authentication transactions, durable identities, opaque sessions, bearer authentication, and testable security boundaries without taking over product authorization.",
    ),
    planned,
    h2("why-authfx", "Why Authfx"),
    p(
      "Authentication libraries often mix protocol mechanics, HTTP middleware, persistence, provider tokens, tenant membership, and business permissions. Authfx separates those responsibilities into explicit Effect services and optional adapters.",
    ),
    bullets(
      [strong("Embedded-first."), " Compose Authfx into the process and topology you already own."],
      [
        strong("Effect-native."),
        " Operations return Effect values, services compose through Layer, and failures remain typed.",
      ],
      [strong("Provider-neutral core."), " Microsoft Entra is the first provider, not the ontology."],
      [
        strong("Authentication only."),
        " The host resolves an Identity into its own subject, tenancy, roles, and permissions.",
      ],
    ),
    h2("first-slice", "The first production slice"),
    pills([
      "Authentication transactions",
      "Identity",
      "External identity",
      "Opaque Session",
      "Bearer authentication",
      "Microsoft OIDC",
      "Device authorization",
    ]),
    h2("boundaries", "Framework boundaries"),
    table(
      ["Concern", "Owner"],
      [
        ["Identity proof, Sessions, authenticators", "Authfx"],
        ["Provider API Credentials and operational Connections", "Connectfx"],
        ["Tenancy, roles, permissions, product policy", "Host application"],
        ["Durable communication", "Relayfx"],
        ["Agent execution", "Batonfx"],
      ],
    ),
  ],
})

export const installation = definePage({
  path: "/docs/start/installation",
  title: "Installation",
  navTitle: "Installation",
  group: "Start",
  description: "Add the core contract now and optional provider, HTTP, and persistence packages as they ship.",
  content: [
    planned,
    h2("runtime", "Runtime requirements"),
    bullets("Bun or another modern TypeScript runtime", "Effect 4", "A host-owned persistence and deployment strategy"),
    codeBlock({ label: "Planned package installation", language: "bash", source: "bun add @authfx/core effect" }),
    p(
      "Optional packages are specified for Microsoft OIDC, Effect HTTP, device authorization, and Effect SQL persistence. They remain separate so applications only carry the protocols and infrastructure they use.",
    ),
    h2("repository", "Work from the repository"),
    codeBlock({
      label: "Local verification",
      language: "bash",
      source:
        "bun install --frozen-lockfile\nbun run format:check\nbun run lint\nbun run typecheck\nbun run test\nbun run build",
    }),
  ],
})

export const quickstart = definePage({
  path: "/docs/start/quickstart",
  title: "Quickstart",
  navTitle: "Quickstart",
  group: "Start",
  description: "See the intended layer composition for an authentication flow and opaque Session.",
  content: [
    planned,
    h2("compose", "Compose the services"),
    p(
      "The host supplies stores, cryptography, time, and a Subject resolver. Optional packages supply an authenticator and HTTP boundary.",
    ),
    codeBlock({
      label: "Planned composition shape",
      source: `import { Layer } from "effect"
import { Auth } from "@authfx/core"
import { MicrosoftOidc } from "@authfx/microsoft"

const AuthLive = Auth.layer.pipe(
  Layer.provide(MicrosoftOidc.layer),
  Layer.provide(IdentityStoreLive),
  Layer.provide(SessionStoreLive),
  Layer.provide(AuthenticationTransactionStoreLive),
  Layer.provide(SubjectResolverLive),
)
`,
    }),
    h2("flow", "Run the browser flow"),
    bullets(
      "Begin an Authentication transaction and persist state, nonce, PKCE material, redirect intent, and expiry.",
      "Redirect to the authenticator and complete the callback exactly once.",
      "Resolve or create the local Identity from the stable issuer and subject.",
      "Issue an opaque Session token while persisting only its verifier or hash.",
      "Resolve the Session on later requests, then ask the host Subject resolver for consumer-facing claims.",
    ),
  ],
})

export const transactions = definePage({
  path: "/docs/learn/authentication-transactions",
  title: "Authentication transactions",
  navTitle: "Transactions",
  group: "Learn",
  description: "Short-lived, single-use protocol state makes authentication explicit and replay-resistant.",
  content: [
    h2("transaction", "A transaction is not a Session"),
    p(
      "An Authentication transaction exists only while an authenticator proves an identity. It carries state, nonce, PKCE material, redirect intent, expiry, and completion status. A Session begins only after proof succeeds.",
    ),
    h2("invariants", "Required invariants"),
    bullets(
      "Transactions expire",
      "Completion is single-use",
      "State and nonce are verified",
      "Replay fails with a typed error",
      "Redirect intent is validated rather than trusted blindly",
    ),
    h2("authenticator", "Authenticator boundary"),
    p(
      "An Authenticator begins and completes one authentication method. Core does not branch on Microsoft, password, passkey, or any future mechanism.",
    ),
  ],
})

export const identities = definePage({
  path: "/docs/learn/identities-and-subjects",
  title: "Identities and subjects",
  navTitle: "Identities and subjects",
  group: "Learn",
  description: "Authfx records authenticated identities while the host owns application subjects and authorization.",
  content: [
    h2("identity", "Identity"),
    p(
      "An Identity is a durable local record representing one authenticated entity known to the application. External identities attach provider issuer and subject pairs to that record.",
    ),
    h2("subject", "Authenticated subject"),
    p(
      "The Subject resolver is supplied by the host. It maps an Identity and Session into the opaque subject and claims the application wants to expose to its own code.",
    ),
    callout(
      "info",
      "Separation of concerns",
      "Authentication proves who is present. It does not decide tenant membership, roles, permissions, or business authority.",
    ),
    h2("linking", "Identity linking"),
    p(
      "Provider email addresses and display names are mutable attributes, not stable linking keys. Stable issuer and subject pairs identify External identities; linking policy remains explicit and auditable.",
    ),
  ],
})

export const sessions = definePage({
  path: "/docs/learn/opaque-sessions",
  title: "Opaque Sessions",
  navTitle: "Opaque Sessions",
  group: "Learn",
  description: "Revocable, expiring Session secrets without self-contained authorization claims.",
  content: [
    h2("token", "The Session token is a bearer secret"),
    p(
      "Clients receive an opaque token. Persistent stores keep only a verifier or cryptographic hash, never the usable token.",
    ),
    h2("why", "Why opaque"),
    bullets(
      "Immediate revocation",
      "Server-side expiry and rotation policy",
      "No stale product authorization embedded in a token",
      "No provider Credential exposed as an application Session",
    ),
    h2("resolution", "Resolution"),
    p(
      "Bearer and cookie adapters extract the token, core resolves the Session, and the Subject resolver maps the authenticated Identity into host claims.",
    ),
  ],
})

export const composeLayers = definePage({
  path: "/docs/guides/compose-layers",
  title: "Compose Authfx layers",
  navTitle: "Compose layers",
  group: "Guides",
  description: "Keep protocol, storage, security, and host policy as replaceable layers.",
  content: [
    planned,
    h2("production", "Production graph"),
    codeBlock({
      label: "Planned layer graph",
      source: `const ProductionAuth = Auth.layer.pipe(
  Layer.provide(MicrosoftOidc.layer),
  Layer.provide(EffectHttpSecurity.layer),
  Layer.provide(PostgresStores.layer),
  Layer.provide(CryptoLive),
  Layer.provide(SubjectResolverLive),
)
`,
    }),
    h2("tests", "Test graph"),
    p(
      "Swap provider calls, stores, time, cryptography, and subject resolution for deterministic test layers. The public service graph stays the same.",
    ),
    codeBlock({
      label: "Planned test graph",
      source: `const TestAuth = Auth.testLayer.pipe(Layer.provide(TestAuthenticator.layer))`,
    }),
  ],
})

export const secureHttp = definePage({
  path: "/docs/guides/secure-http",
  title: "Secure an HTTP boundary",
  navTitle: "Secure HTTP",
  group: "Guides",
  description: "Keep extraction, cookie policy, redirects, and response mapping in an optional HTTP adapter.",
  content: [
    planned,
    h2("adapter", "HTTP stays optional"),
    p(
      "Core authentication services are framework-neutral. The Effect HTTP package is specified to own cookie and bearer extraction, callback routes, security headers, redirects, and typed error mapping.",
    ),
    h2("cookie", "Cookie Sessions"),
    bullets(
      "Secure in production",
      "HttpOnly",
      "Explicit SameSite policy",
      "Bounded path and domain",
      "Rotation and revocation through core Session services",
    ),
    h2("bearer", "Bearer Sessions"),
    p(
      "The adapter extracts the bearer secret without treating it as a provider access token. Core resolves it through the same Session service used by cookie authentication.",
    ),
  ],
})

export const microsoft = definePage({
  path: "/docs/guides/microsoft-oidc",
  title: "Microsoft Entra OIDC",
  navTitle: "Microsoft OIDC",
  group: "Guides",
  description: "Use Microsoft as the first Authenticator without allowing it to define core.",
  content: [
    planned,
    h2("provider", "Provider package responsibilities"),
    bullets(
      "Discovery and issuer validation",
      "Authorization URL construction",
      "PKCE, state, and nonce verification",
      "Code exchange",
      "ID token validation",
      "Stable issuer and subject extraction",
      "Provider-specific typed errors",
    ),
    h2("boundary", "What does not cross into core"),
    p(
      "Microsoft tenant IDs, Graph scopes, provider API tokens, and external-system Connections do not become Authfx core concepts. Operational Graph access belongs to Connectfx.",
    ),
    h2("testing", "Deterministic fixtures"),
    p(
      "The provider package is specified to ship mock discovery, key, token, and claim fixtures so applications can test complete flows without calling Microsoft.",
    ),
  ],
})

export const deviceAuthorization = definePage({
  path: "/docs/guides/device-authorization",
  title: "Device authorization",
  navTitle: "Device authorization",
  group: "Guides",
  description: "Authenticate constrained clients through an RFC 8628-style approval flow.",
  content: [
    planned,
    h2("flow", "Flow"),
    bullets(
      "Issue a device code and human-readable user code",
      "Show the verification URI and expiry",
      "Let a human authenticate in another client",
      "Approve or deny exactly once",
      "Poll with bounded cadence",
      "Issue an Authfx Session token after approval",
    ),
    h2("not-provider-token", "The result is an Authfx Session"),
    p(
      "The constrained client receives an application Session token. It does not receive a Microsoft Graph access token or a Connectfx Credential.",
    ),
  ],
})

export const vocabulary = definePage({
  path: "/docs/reference/vocabulary",
  title: "Vocabulary",
  navTitle: "Vocabulary",
  group: "Reference",
  description: "Canonical names for Authfx concepts and boundaries.",
  content: [
    table(
      ["Term", "Meaning"],
      [
        [code("Identity"), "Durable local record for one authenticated entity"],
        [code("External identity"), "Provider issuer and subject associated with an Identity"],
        [code("Authenticator"), "Implementation of one authentication method"],
        [code("Authentication transaction"), "Expiring single-use proof attempt"],
        [code("Session"), "Revocable authenticated relationship between client and Identity"],
        [code("Session token"), "Opaque bearer secret whose usable value is never persisted"],
        [code("Subject resolver"), "Host boundary mapping Identity and Session into application claims"],
      ],
    ),
    h2("avoid", "Terms to avoid"),
    p(
      "Do not call an External identity a connection, a Session token an access token, or an authenticated subject an authority. Those names collapse boundaries Authfx keeps explicit.",
    ),
  ],
})

export const packageReference = definePage({
  path: "/docs/reference/packages",
  title: "Package map",
  navTitle: "Packages",
  group: "Reference",
  description: "The intended package boundaries for core, providers, HTTP, persistence, and tests.",
  content: [
    planned,
    table(
      ["Package", "Responsibility"],
      [
        [code("@authfx/core"), "Provider-neutral schemas, services, errors, and layer composition"],
        [code("@authfx/microsoft"), "Microsoft Entra OIDC Authenticator"],
        [code("@authfx/http"), "Effect HTTP security and routes"],
        [code("@authfx/sql"), "Effect SQL store implementations"],
        [code("@authfx/test"), "Deterministic fixtures, conformance suites, and test layers"],
      ],
    ),
    h2("status", "Implementation status"),
    p(
      "Only packages present in the repository and listed in release notes should be considered available. Follow ",
      link("https://github.com/In-Time-Tec/authfx/issues", "the implementation backlog"),
      " for delivery order.",
    ),
  ],
})

export const invariants = definePage({
  path: "/docs/reference/invariants",
  title: "Security invariants",
  navTitle: "Security invariants",
  group: "Reference",
  description: "Non-negotiable rules shared by every Authfx package and adapter.",
  content: [
    h2("core", "Core invariants"),
    bullets(
      "Authentication never implies product authorization",
      "Core has no provider-specific or web-framework-specific branches",
      "Authentication transactions expire and complete once",
      "Session tokens are opaque and persisted only as verifiers or hashes",
      "Provider API Credentials belong to Connectfx",
      "Every behavior-bearing service has a test or memory layer",
    ),
    h2("operations", "Operational invariants"),
    bullets(
      "Missing configuration fails at startup",
      "Secrets remain in platform secret stores",
      "Time, randomness, cryptography, and HTTP stay behind services",
      "Security-sensitive failures are typed and observable",
    ),
    h3("change-control", "Change control"),
    p(
      "New durable concepts require a feature document. Stable decisions require an ADR before implementation changes the contract.",
    ),
  ],
})
