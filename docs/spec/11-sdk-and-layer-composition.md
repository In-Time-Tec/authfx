# SDK And Layer Composition

The public API is Effect-native. Consumers compose authenticators, stores, HTTP security, subject resolution, audit, and cryptography through layers.

The intended package graph is:

```text
@authfx/core
  <- @authfx/store-sql
  <- @authfx/http
  <- @authfx/microsoft
  <- @authfx/device
  <- @authfx/testing
```

Core exposes schemas, services, errors, and plain configuration values. Provider and adapter packages depend inward on core. Core imports none of them.

One-shot operations return `Effect`; event feeds return `Stream`; configuration uses `Config`; secrets use `Redacted`; resources use `Scope`. Promise wrappers may exist only in thin framework adapters.

The initial published surface is expected to use `@authfx/*`. Publishing remains deferred until the contracts are implemented and conformance-tested.
