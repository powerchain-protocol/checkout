# PowerPay program, app, and release validation report

Generated: 2026-07-31T06:19:44.253196+00:00

- npm command scope: PASS
- Release fixes: PASS
- Program layer: PASS
- Checkout UI: PASS
- Docker: PASS
- Version: PASS
- Development dependencies: FAIL
- SDK tests: FAIL

## Completed source fixes

- Resolved ambiguous SDK exports
- Added typed program registry
- Added runtime application status
- Fixed Solana network/finality handling
- Fixed API-wide CORS preflight
- Added Docker ignore rules
- Corrected npm workspace command scope
- Added permission-independent Vitest launcher
- Added development dependency diagnostics

## Environment note

TypeScript and tests require a completed root `npm install`. The packaged
repository includes the required dependency declarations and now reports
an incomplete installation explicitly.

## Development dependencies

```text

> @powerchain-protocol/powerpay-checkout-sdk@1.0.0-beta.1 deps:dev:validate
> node scripts/validate-development-dependencies.mjs

PowerPay development dependencies are incomplete:
  - TypeScript: node_modules/typescript/bin/tsc
  - Node types: node_modules/@types/node/package.json
  - Vitest: node_modules/vitest/package.json
  - Vite client types: node_modules/vite/client.d.ts

Run `npm install` at the repository root before typechecking or testing.

```

## SDK tests

```text

> @powerchain-protocol/powerpay-checkout-sdk@1.0.0-beta.1 test:sdk
> node scripts/run-vitest.mjs

Vitest is not installed. Run `npm install` at the repository root.

```
