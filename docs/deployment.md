# Deployment

The docs site (`apps/docs`) deploys through Railway project `authfx` with GitHub-triggered environments gated on green CI:

- Staging https://authfx-docs-staging.up.railway.app auto-deploys every push to `main`.
- Production https://authfx-docs.up.railway.app auto-deploys every push to `release`.
- Pull requests create temporary Railway PR environments based on staging and remove them when the pull request closes.

Promote staging to production:

```bash
git push origin main:release
```

Build configuration lives in `apps/docs/railway.json`. The static output directory is configured as `RAILPACK_SPA_OUTPUT_DIR=apps/docs/dist`. Verify permanent environments with `bun run verify:docs-deploy`.
