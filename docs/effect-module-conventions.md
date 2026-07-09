# Effect Module Conventions

AuthFX modules expose intentional namespaces from package entrypoints. Behavior-bearing modules export an `Interface`, a `Context.Service`, and explicit production and test layers. Errors crossing service boundaries use `Schema.TaggedErrorClass`.

```ts
import { Context, Effect, Layer, Schema } from "effect"

export class AuthenticationFailed extends Schema.TaggedErrorClass<AuthenticationFailed>()(
  "AuthFX/AuthenticationFailed",
  { reason: Schema.String },
) {}

export interface Interface {
  readonly verify: (input: unknown) => Effect.Effect<unknown, AuthenticationFailed>
}

export class Service extends Context.Service<Service, Interface>()("@authfx/core/Example.Service") {}

export const testLayer = (implementation: Interface) => Layer.succeed(Service, implementation)
```

## Rules

- Use named Effect functions for service methods and protocol handlers.
- Bind services to named variables inside `Effect.gen` before invoking methods.
- Use `Config` and `Redacted` for secret configuration.
- Use Effect `Clock`, randomness, HTTP, cryptography, streams, queues, scopes, and schedules instead of raw platform APIs where available.
- Do not use terminal Effect runners inside domain packages.
- Provider and framework adapters translate raw external values at the boundary and do not leak them into core schemas.
- Test time through `TestClock`; do not wait on real timers.
