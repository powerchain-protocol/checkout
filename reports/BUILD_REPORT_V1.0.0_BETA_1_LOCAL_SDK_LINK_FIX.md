# PowerPay local SDK dependency and package-manager correction

Generated: 2026-07-31T07:38:26.894012+00:00

- Local SDK link: PASS
- Dependency slimming: PASS
- Toolchain recovery: PASS
- Production structure: PASS
- Packages: FAIL

## Corrected

- Changed the demo app SDK dependency from the unpublished registry version to `file:..`.
- Added local SDK dependency validation before bootstrap installs.
- Added npm package-manager guidance and local install commands.
- Documented recovery from registry E404 and stale dependency state.
- Kept the repository npm-only to match workspaces, CI, and install-script policy.

## Packages

```text

> @powerchain-protocol/powerpay-checkout-sdk@1.0.0-beta.1 packages:validate
> node scripts/validate-packages-and-app.mjs

file:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/scripts/validate-packages-and-app.mjs:48
  throw new Error("App SDK dependency does not match the root version");
        ^

Error: App SDK dependency does not match the root version
    at [90mfile:///mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/[39mscripts/validate-packages-and-app.mjs:48:9
[90m    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)[39m
[90m    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)[39m
[90m    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)[39m

Node.js v22.16.0

```
