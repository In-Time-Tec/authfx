# Stores And Persistence

Core defines infrastructure-free ports for Identity, External identity, Authentication transaction, Session, and device authorization storage.

Stores must define atomic operations explicitly rather than expose generic CRUD. Required semantics include unique External identity links, atomic transaction consume, atomic Session token rotation, revocation visibility, and single-use device approval.

The initial SQL package will target Effect SQL and support Postgres first. SQL schemas are package-owned and migration artifacts are generated from the implementation repository. Memory stores implement the same semantics for tests and local examples.

AuthFX does not require consumers to use AuthFX SQL stores. Alternative stores may implement the ports, but conformance tests are mandatory.
