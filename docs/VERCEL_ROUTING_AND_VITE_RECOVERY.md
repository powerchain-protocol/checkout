# Vercel Routing and Vite Recovery

## Vercel schema warning

The remote `$schema` reference was removed from `vercel.json`. This avoids
editor warnings when a workspace does not trust `openapi.vercel.sh`.

Vercel configuration remains valid without the schema declaration.

## Application routing

PowerPay does not use a `_redirects` file. Vercel rewrites all non-API,
non-static paths directly to the built Vite application:

```text
/index.html
```

The production output directory is:

```text
app/dist
```

## Rolldown panic recovery

The safe Vite launcher now detects:

- `SIGABRT`;
- Rolldown panic-report output;
- Rust fatal runtime panic output.

When detected, the launcher clears stale Vite caches and retries once using the
stable fallback environment with a forced dependency re-optimization.

Run:

```bash
npm run dev:reset
npm run dev
```

Validate deployment and recovery configuration:

```bash
npm run deployment:validate
```
