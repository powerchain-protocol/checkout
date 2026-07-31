# PowerPay Vercel, Vite, and loading refinement report

Generated: 2026-07-31T06:05:42.444656+00:00

- Deployment and Vite recovery: PASS
- Safe Vite launcher: FAIL
- Loading experience: PASS
- Exact loading design: PASS
- App startup: PASS
- Documentation: PASS

## Updated

- Removed the untrusted remote Vercel schema reference
- Removed conflicting redirects files
- Added direct SPA rewrites to the built app
- Preserved API v1 routing
- Added Rolldown SIGABRT panic detection and one-time fallback recovery
- Added deterministic Vite cache handling
- Reduced the loading ring to 44 px
- Removed the bolt divider below the PowerPay wordmark
- Refined Power Light and Pay Semibold typography
- Made the full PowerPay wordmark white in dark mode

## Safe Vite launcher

```text
file:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/scripts/validate-safe-vite-launcher.mjs:16
    throw new Error(`Safe Vite launcher missing ${marker}`);
          ^

Error: Safe Vite launcher missing process.chdir(appDirectory)
    at [90mfile:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/[39mscripts/validate-safe-vite-launcher.mjs:16:11
[90m    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)[39m
[90m    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)[39m
[90m    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)[39m

Node.js v22.16.0

```
