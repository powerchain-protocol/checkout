# PowerPay server, store, storage, roles, and program registry report

Generated: 2026-07-31T06:48:30.315871+00:00

- Program registry: PASS
- Program layer: PASS
- Server/store/roles: FAIL
- Packages and app: PASS
- App startup: PASS
- App imports: PASS
- Script safety: PASS
- API/WebSocket: PASS
- Docker: PASS
- Version: PASS

## Corrected

- Replaced the nonexistent PROGRAM_IDS import with generated program ID exports
- Added a typed POWERPAY_PROGRAM_IDS registry
- Added production server with SPA fallback
- Added /api/v1/store and /storage file delivery
- Added /store and /storage application pages
- Added roles, permissions, and authorization utilities
- Added WebSocket upgrade handling and heartbeat events
- Added production server Dockerfile and validation

## Server/store/roles

```text
file:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/scripts/validate-server-store-roles.mjs:14
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
                               ^

Error: Missing server.ts
    at [90mfile:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/[39mscripts/validate-server-store-roles.mjs:14:32
[90m    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)[39m
[90m    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)[39m
[90m    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)[39m

Node.js v22.16.0

```
