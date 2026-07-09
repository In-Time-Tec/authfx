# HTTP Security And Framework Boundaries

AuthFX core has no dependency on Next.js, Hono, Express, browser globals, or raw Node request types. An optional HTTP package translates Effect HTTP requests into authentication operations and cookie responses.

The HTTP adapter owns:

- authentication begin and callback endpoints;
- cookie creation, clearing, and renewal;
- bearer extraction;
- trusted-origin and callback-target validation;
- CSRF policy for cookie-authenticated state changes;
- request rate limiting hooks;
- safe error response mapping.

Framework packages are thin adapters over the Effect HTTP contract. They do not implement session or protocol behavior.

The first HTTP surface must support Microsoft sign-in, current-session lookup, sign-out, device authorization, and callback handling. Exact route paths are adapter configuration, not core vocabulary.
