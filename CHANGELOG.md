# Changelog

## [1.0.0-beta.1] - 2026-07-31

### Fixed

- Added a visible startup card and top-level browser error screen.
- Prevented development manifest and service-worker requests.
- Added a wallet-provider fallback so the app remains visible.
- Restored `dev:reset` in both root and app workspace scripts.
- Added a restricted npm install-script policy for Vite and Prisma.


- Prevented Codespaces private-port `pf-signin` manifest CORS failures during development.
- Removed invalid CORS origin fallback behavior.
- Added strict preflight method and requested-header validation.
- Added Vite development and preview CORS configuration.


- Added `@vitejs/plugin-react` to both root and app development dependencies.
- Added the React plugin explicitly to `app/vite.config.ts`.
- Added a clear diagnostic for npm `ENOENT` and `uv_cwd` failures.
- Added npm workspace-safe development and application commands.

### Changed

- Normalized package and configuration release identifiers to
  `1.0.0-beta.1`.
- Switched the declared package manager and setup documentation to npm.
- Added a clean npm workspace installation command.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Normalized `/api/v1` application router.
- `/api/v1/sessions` create and read endpoints.
- `/api/v1/cors` policy endpoint and global OPTIONS handling.
- App API client factory and SDK session methods.
- Route and Solana public-API validators.
- Prisma generated-client editor fallback.

### Fixed

- Missing Prisma generated client declarations before initial generation.
- Missing merchant instruction exports.
- Payment reference `Uint8Array` versus `PublicKey` incompatibility.
- Settlement treasury account incompatibility.
- Historical Solana `Commitment` versus `Finality` mismatch.
- Inconsistent relative imports in API handlers.

### Changed

- Prisma typechecking now generates the client first.
- API responses share one CORS and error-response implementation.
- API paths accept optional trailing slashes.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Executable Sui `test_scenario` payment tests.
- Receipt payer, merchant, amount, and reference accessors.
- Successful merchant coin-delivery verification.
- Zero-payment and self-payment expected-failure tests.
- Sui Move test documentation and structural validation.

## [1.0.0-beta.1] - 2026-07-31

### Fixed

- `Uint8Array` incompatibility with `TransactionInstruction.data`.
- `Commitment` incompatibility with Solana historical RPC `Finality`.
- Processed commitment leaking into indexed transaction-history requests.

### Added

- Direct browser-compatible `buffer` dependency.
- `toFinality()` normalization helper.
- Solana type-boundary tests and static validation.

## [1.0.0-beta.1] - 2026-07-31

### Fixed

- Duplicate public `CLUSTERS` export in `src/index.ts`.
- Duplicate public `ClusterDefinition` type naming.
- Token metadata schema rejecting the `$schema` property.

### Changed

- Multichain `CLUSTERS` is the canonical public registry.
- Legacy Solana-only `CLUSTERS` is now exported as
  `SOLANA_CLUSTER_DEFINITIONS`.
- Legacy Solana cluster type is exported as `SolanaClusterDefinition`.

## [1.0.0-beta.1] - 2026-07-31

### Added

- `@app` and `@app-lib` Vite and TypeScript aliases.
- Application import-resolution validator.
- Import convention documentation.

### Fixed

- `AppHeader.tsx` importing the root SDK through an invalid relative `.js`
  path.
- Checkout cart and invoice preview importing utilities from nonexistent
  `app/src/lib`.
- Repeated Vite pre-transform failures caused by unresolved imports.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Public `styles/powerpay.css` package asset.
- Stable `./styles.css` and `./styles/powerpay.css` exports.
- Style synchronization and package-content validation scripts.
- Internal `/reports/` directory and report organizer.
- Documentation for package styles, reports, and TypeScript 7 path migration.

### Changed

- Build reports are excluded from npm publication.
- TypeScript `baseUrl` was removed from application configuration.
- The `@powerpay/sdk` path remains relative to `app/tsconfig.json`.

### Fixed

- Deprecated `baseUrl` compiler warning.
- Missing published stylesheet target.
- Build reports appearing in the package root.

## [1.0.0-beta.1] - 2026-07-31

### Added

- pnpm workspace configuration and approved dependency build-script policy.
- Runtime `dotenv` dependency for Prisma 7 configuration.
- Prisma dependency and pnpm configuration diagnostics.
- Dedicated Prisma TypeScript configuration.
- Vite and TypeScript `@powerpay/sdk` source alias.
- CSS side-effect declarations for Wallet Adapter UI styles.
- pnpm, Prisma, and Vite troubleshooting documentation.

### Fixed

- `Cannot find module 'prisma/config'` after dependency installation.
- Missing `dotenv/config` type/module resolution.
- Invalid Vite import from `../../../src/index.js`.
- Missing TypeScript declaration for
  `@solana/wallet-adapter-react-ui/styles.css`.
- Unsafe generic middleware response cast.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Sui SDK, React dApp Kit, and Cetus SDK dependencies.
- Organized Solana and Sui cluster registry.
- Sui RPC account, balance, coin metadata, checkpoint, and transaction data.
- Sui wallet and transaction adapter interfaces.
- Unified account, fee, provider status, and transaction result types.
- SUI, PWRC, and PWRP tokenized balance definitions.
- Pyth-backed price aggregation service.
- Cetus quote validation and swap transaction adapter boundary.
- Sui address, Move coin type, amount, and transaction policy validation.
- Sui Move payment contract scaffold and structural validation.
- Responsive Sui application route.
- Sui and multichain security documentation.

### Security

- Symbols do not establish token trust; full mints and Move coin types are
  required.
- Cetus swaps require quote expiry, minimum output, and slippage validation.
- Sui transactions require wallet-owned signing and explicit builders.
- The Move contract remains unaudited and undeployed.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Prisma ORM 7 schema, PostgreSQL adapter, generated-client configuration, seed,
  repositories, and initial SQL migration.
- Supabase and Neon deployment profiles.
- Vercel deployment configuration and optimized Vite chunking.
- Trusted-token registry and JSON token metadata schema.
- Circle CCTP attestation client and cross-border service.
- Fail-closed zero-knowledge verifier interface and proof database model.
- UUID and prefixed ID utilities.
- Cross-border API handlers and responsive app page.
- Database, CCTP, and ZK documentation.
- Database and token-metadata validation scripts.

### Changed

- Package and app versions updated to `1.0.0-beta.1`.
- OpenAPI contract expanded for trusted tokens and cross-border transfers.
- Root and app READMEs expanded for database and deployment workflows.

### Security

- Raw CCTP instruction construction is deliberately disabled until an audited,
  current Circle Solana binding is supplied.
- The default ZK verifier rejects all proofs.
- Supabase service-role credentials and database URLs are server-only.

All notable PowerPay changes are documented here.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Request middleware with request IDs and security response headers.
- Solana Actions metadata and public action request/response types.
- System, payment, and checkout configuration modules.
- Exact fee calculation.
- SOL, SPL Token, and Token-2022 balance aggregation.
- Cache, invoice, payment, and user services.
- Embedded-wallet, wallet-view, and user hooks.
- Development cache, database, safe-action, and embedded-wallet adapters.
- Organized metrics, merchant, user, and invoice data.
- Responsive cart, payment form, invoice preview, and checkout components.
- Checkout route and invoice/checkout documentation.

### Changed

- Package and app versions updated to `1.0.0-beta.1`.
- Checkout UX now exposes order lines, fees, wallet state, and authorization.
- Root and app documentation expanded for platform services and checkout flows.

### Security

- Embedded wallets are represented through an adapter contract. The bundled
  development adapter does not persist secret material and must not be treated
  as a custody implementation.
- Middleware adds baseline response headers but deployment platforms must still
  configure CSP, CORS, rate limits, authentication, and abuse prevention.

All notable PowerPay changes are documented here.

The format follows Keep a Changelog, and versions follow Semantic Versioning.

## [1.0.0-beta.1] - 2026-07-31

### Added

- Public beta release channel and exported SDK version metadata.
- Validated `/config` environment and network modules.
- Shared API, merchant, cluster, currency, and payment types.
- React configuration and payment contexts.
- Async, wallet-data, and Pyth price hooks.
- Framework-neutral utilities and Solana helpers.
- Assets and currency registries.
- Pyth Hermes pricing client.
- Helius RPC and enhanced transaction client.
- Consolidated Solana, Solana Pay, RPC, PowerPay, and API libraries.
- Versioned framework-neutral `/app/api/v1` handlers.
- OpenAPI 3.1 `swagger.yaml`.
- API, configuration, RPC, Pyth, Solana Pay, and beta migration documentation.
- OpenAPI structural validation script.

### Changed

- Package and app versions are now `1.0.0-beta.1`.
- Root and app README files now document the beta architecture.
- Environment templates now distinguish server secrets from browser-safe values.
- Build commands now include API validation and a complete release check.
- Public exports now include config, hooks, contexts, libraries, types, and utilities.

### Security

- Documentation now requires persistent reconciliation, idempotency, replay
  protection, authenticated webhooks, rate limiting, and secret separation for
  production deployments.

## [0.11.0]

### Added

- Connected-wallet SOL and token payment flows.
- Exact decimal conversion, balance validation, transaction simulation, and confirmation.
- Solana Pay QR creation and reference validation.
- Merchant payment client and wallet transaction history.

### Fixed

- Removed SDK reliance on Node `Buffer` for browser payment encoding.

## [0.10.0]

### Added

- Anchor, Axios, Base58, and node-fetch utilities.
- Radix UI and Web3 Icons integration.
- Information, alarms, loading, not-found, and test-area screens.

## [0.9.0]

### Changed

- Updated the TypeScript, React, Vite, test, and formatting toolchains.
- Reworked root and application documentation.

## [0.8.0]

### Fixed

- Wallet modal imports.
- Unsupported wallet adapter imports.
- React event types.
- Vite-specific environment access in publishable SDK code.
- Explicit TypeScript source and output layout.











