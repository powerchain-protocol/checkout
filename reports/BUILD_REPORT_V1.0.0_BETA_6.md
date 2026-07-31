# PowerPay 1.0.0 Beta 6 build report

Generated: 2026-07-31T04:29:24.388693+00:00

- Style synchronization: PASS
- Report organization: PASS
- Package contents: PASS
- pnpm configuration: PASS
- Metadata validation: PASS
- Documentation validation: PASS
- OpenAPI validation: PASS
- TypeScript baseUrl scan: PASS

## Changes

- Public stylesheet exported from styles/powerpay.css
- Build reports moved under reports/
- Reports excluded from npm publication
- TypeScript baseUrl removed
- Relative paths mapping retained for @powerpay/sdk

## Dependency-backed validation

Run `pnpm install`, `pnpm typecheck`, `pnpm app:check`, and `pnpm pack --dry-run` locally.
