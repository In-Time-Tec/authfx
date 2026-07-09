# AuthFX

The Effect-native authentication framework for TypeScript.

AuthFX is an embedded-first framework for identities, authentication transactions, sessions, HTTP security, and authentication methods. Its first provider is Microsoft OpenID Connect, but its core model is provider-neutral and designed to grow into a comprehensive authentication framework.

## Status

AuthFX is specification-first and pre-implementation. The repository currently defines its vocabulary, boundaries, architecture, and implementation roadmap.

## Principles

- Effect-native services, layers, schemas, streams, schedules, scopes, config, and typed errors.
- Embedded into the consumer's application and persistence rather than operated as a hosted identity service.
- Authentication proves identity; consumer applications own product authorization and tenancy policy.
- Security-sensitive behavior is specified and tested before implementation.
- Microsoft OIDC, opaque sessions, bearer authentication, and device authorization are the first implementation slice.

## Commands

```bash
bun install
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
```

Read `CONTEXT.md` for vocabulary and `SPEC.md` for the specification tree.
