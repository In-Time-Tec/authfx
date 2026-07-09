# Device Authorization

The device package provides an RFC 8628-compatible authorization flow backed by AuthFX Sessions.

A trusted client registration requests a device code and receives a high-entropy device code, human-readable user code, verification URI, expiration, and polling interval. A browser-authenticated Session may approve or deny the user code. Successful token polling consumes the device authorization and returns a new opaque Session token for the constrained client.

The implementation enforces client validation, expiration, single use, polling interval, `authorization_pending`, `slow_down`, denial, and brute-force protection for user-code lookup.

Device authorization does not issue ConnectFX credentials. It authenticates the constrained client into the host application.
