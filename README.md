
# Release Version

This repository is standardized on **1.0.0-beta.1**.

All SDK packages, application packages, documentation, examples, changelog
entries, OpenAPI metadata, and configuration should use **1.0.0-beta.1** until
the next coordinated release.

## Quick Start

```bash
npm run cwd:check
npm install
npm run dev
```

## Version Policy

- SDK version: **1.0.0-beta.1**
- Demo App version: **1.0.0-beta.1**
- API version: **v1**
- npm workspace enabled
- Vite + React supported


# PowerPay SDK

> **1.0.0 Beta** — TypeScript SDK, merchant application, Solana programs, and versioned payment API.

PowerPay is a Solana-native checkout platform for sending and receiving SOL,
SPL Token, and Token-2022 payments. The beta workspace includes exact decimal
handling, connected-wallet payment flows, Solana Pay QR requests, transaction
confirmation, merchant reconciliation, RPC integrations, Pyth pricing, Helius
enhanced data, and a documented `/api/v1` contract.

## Status

`1.0.0-beta.1` is a public beta. APIs may still change before the stable
`1.0.0` release. The native programs and payment flows must be independently
audited before production custody or Mainnet Beta use.

## Requirements

- Node.js 22.12 or later
- npm 11 or later
- TypeScript 7
- Rust stable and the Solana/Agave toolchain for native programs
- Anchor 0.32 for Anchor clients and compatible program workflows

## Install

```bash
git clone https://github.com/powerchain-protocol/powerpay-checkout-sdk.git
cd powerpay-checkout-sdk

pnpm env:init
pnpm install
pnpm check
pnpm build:all
```

## Packages and integrations

- `@solana/web3.js` for the current wallet and transaction compatibility layer
- `@solana/pay` for standard transfer-request URLs and validation
- `@solana/spl-token` for SPL Token and Token-2022 transfers
- `@coral-xyz/anchor` for typed program clients
- `@pythnetwork/hermes-client` for Pyth price feeds
- Axios for browser and service HTTP clients
- Helius JSON-RPC and enhanced transaction APIs
- Zod for environment and request validation
- QRCode for Solana Pay QR images
- Radix Icons and Web3 Icons in the app

## Quick SDK example

```ts
import {
  PowerPayClient,
  createRpcConnection,
} from "@powerchain-protocol/powerpay-checkout-sdk";

const connection = createRpcConnection({
  cluster: "devnet",
  endpoint: import.meta.env.VITE_SOLANA_RPC_URL,
});

const powerpay = new PowerPayClient({
  connection,
  merchant: import.meta.env.VITE_MERCHANT_TREASURY,
});

const result = await powerpay.pay({
  wallet,
  amount: "0.05",
});

console.log(result.signature, result.confirmationStatus);
```

## Solana Pay QR request

```ts
const request = await powerpay.createQr({
  amount: "12.50",
  mint: usdcMint,
  label: "Atlas Commerce",
  message: "Order PP-2048",
});

image.src = request.qrDataUrl;
```

## Configuration

Configuration is centralized under `src/config/`. Both server variables and
browser-safe `VITE_` aliases are supported through `readPowerPayEnv`.

```ts
import { readPowerPayEnv } from "@powerchain-protocol/powerpay-checkout-sdk";

const config = readPowerPayEnv(process.env);
```

Templates:

```text
.env.example
env/beta.env.example
env/devnet.env.example
env/mainnet.env.example
```

Never expose API secrets, private keys, seed phrases, or funded keypairs through
`VITE_` variables.

## Project layout

```text
src/
  config/                 validated environment and network configuration
  context/                React configuration and payment state
  hooks/                  asynchronous, wallet, mobile, and Pyth hooks
  lib/                    API, assets, currencies, Helius, Pyth, RPC, Solana
  merchant/               merchant clients and payment orchestration
  solana/                 amounts, bytes, payments, PDAs, history, validation
  types/                  public API and domain types
  utils/                  framework-neutral helpers
app/
  api/v1/                 versioned API handlers and OpenAPI specification
  src/                    professional React application
programs/                 PowerPay and PowerChain native programs
docs/                     architecture, APIs, payments, deployment, and security
swagger.yaml              root OpenAPI 3.1 contract
```

## Versioned API

The beta API is defined by [`swagger.yaml`](swagger.yaml).

```text
GET  /api/v1/health
POST /api/v1/payments
GET  /api/v1/payments/{paymentId}
```

Example:

```bash
curl -X POST http://localhost:3000/api/v1/payments   -H 'content-type: application/json'   -d '{
    "merchant": "MERCHANT_PUBLIC_KEY",
    "amount": "12.50",
    "currency": "USDC",
    "mint": "USDC_MINT",
    "orderId": "PP-2048"
  }'
```

The handlers in `app/api/v1` are framework-neutral TypeScript functions. An
HTTP deployment adapter must map platform requests and responses to these
handlers and persist payment resources.

## Pyth prices

```ts
import { PythPriceClient } from "@powerchain-protocol/powerpay-checkout-sdk";

const pyth = new PythPriceClient();
const quote = await pyth.latestPrice(feedId);
const decimal = PythPriceClient.decimal(quote);
```

Pyth prices are informational inputs. Payment authorization must not depend on
an unchecked or stale oracle response.

## Helius

```ts
import { HeliusClient } from "@powerchain-protocol/powerpay-checkout-sdk";

const helius = new HeliusClient({
  apiKey: process.env.POWERPAY_HELIUS_API_KEY!,
  cluster: "mainnet-beta",
});

const transactions = await helius.getTransactions(walletAddress);
```

Keep Helius API keys on the server.

## Commands

```bash
pnpm build:sdk
pnpm app:dev
pnpm app:build
pnpm typecheck:sdk
pnpm test:sdk
pnpm api:validate
pnpm docs:check
pnpm check
pnpm release:check
```

## Documentation

- [Beta migration guide](docs/BETA_1_0_MIGRATION.md)
- [API guide](docs/API_V1.md)
- [SDK architecture](docs/ARCHITECTURE.md)
- [Configuration](docs/CONFIGURATION.md)
- [RPC and providers](docs/RPC_PROVIDERS.md)
- [Pyth pricing](docs/PYTH_PRICING.md)
- [Solana Pay](docs/SOLANA_PAY.md)
- [Merchant integration](docs/MERCHANT_INTEGRATION.md)
- [Payment security](docs/PAYMENT_SECURITY_AND_CONFIRMATION.md)
- [Deployment](docs/DEPLOYMENT.md)
- [App guide](app/README.md)
- [Changelog](CHANGELOG.md)

## Security

A submitted wallet signature is not proof of payment. PowerPay checks
transaction simulation, blockhash-aware confirmation, signature status,
recipient, amount, mint, reference, and commitment. Production systems must
also implement durable payment storage, idempotency, replay protection,
webhook authentication, request limits, and independent transaction
reconciliation.

## License

Apache-2.0.


## Beta 2 platform additions

The beta 2 workspace adds:

- centralized system, checkout, and payment configuration;
- balance aggregation for SOL, SPL Token, and Token-2022 accounts;
- exact platform fee calculation;
- cache, payment, user, and invoice services;
- embedded-wallet adapter contracts;
- external wallet, user, and embedded-wallet hooks;
- framework-neutral middleware and safe actions;
- in-memory database and cache adapters for development;
- Solana Actions metadata in `app/actions.json`;
- organized merchant, user, metric, and invoice data;
- responsive cart, payment form, invoice preview, and checkout page.

The new checkout route is:

```text
#checkout
```

See [Invoices and checkout](docs/INVOICES_AND_CHECKOUT.md).


## Beta 3: database, token policy, and cross-border settlement

Beta 3 adds:

- Prisma ORM 7 PostgreSQL models and migrations;
- deployment profiles for Supabase and Neon;
- Vercel and optimized Vite configuration;
- trusted-token registry and validated token metadata;
- Circle CCTP V2 attestation integration boundary;
- cross-border USDC service and API route;
- a fail-closed zero-knowledge verifier interface;
- UUID and prefixed-ID utilities;
- cross-border application UI.

New route:

```text
#cross-border
```

Database setup:

```bash
cp .env.example .env.local
pnpm install
pnpm db:generate
pnpm db:migrate:deploy
pnpm db:seed
```

See:

- [Database architecture](docs/DATABASE.md)
- [Cross-border payments and CCTP](docs/CROSS_BORDER_AND_CCTP.md)
- [ZK integration](docs/ZK_INTEGRATION.md)


## Beta 4: Sui, Cetus, and multichain accounts

Beta 4 adds Sui alongside Solana:

- Sui devnet, testnet, mainnet, and localnet clusters;
- Sui RPC account, balance, metadata, checkpoint, and transaction reads;
- Sui wallet and transaction adapter interfaces;
- SUI, PWRC, and PWRP balance presentation;
- unified account, fee, status, and transaction types;
- Pyth-backed price service for configured assets;
- Cetus quote and transaction adapter boundaries;
- trusted coin-type and transaction security policies;
- a beta Move payment contract scaffold;
- a responsive `#sui` application route.

```ts
const wallet = await fetchSuiWalletData({
  address: suiAddress,
  network: "testnet",
});

const quote = await cetus.quote({
  network: "testnet",
  coinIn: "0x2::sui::SUI",
  coinOut: configuredPwrcCoinType,
  amountIn: "1000000000",
});
```

See [Sui integration](docs/SUI_INTEGRATION.md) and
[Multichain security](docs/MULTICHAIN_SECURITY.md).


## Beta 5: pnpm, Prisma, and Vite fixes

The workspace now pins pnpm, records approved dependency build scripts,
installs `dotenv` for Prisma 7 configuration, and uses an explicit Vite alias
for application imports from the root SDK.

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
pnpm install
pnpm approve-builds
pnpm db:generate
pnpm db:validate
pnpm app:check
```

Use `@powerpay/sdk` inside the application instead of fragile relative imports.
Wallet Adapter UI CSS is imported once in `app/src/main.tsx`.

See [pnpm, Prisma 7, and Vite fixes](docs/PNPM_PRISMA_VITE_FIXES.md).


## Beta 6: package styles and private reports

The SDK now publishes its stylesheet from:

```text
styles/powerpay.css
```

Import it with:

```ts
import "@powerchain-protocol/powerpay-checkout-sdk/styles.css";
```

Build reports have moved to `/reports/` and are excluded from the npm package.
The deprecated TypeScript `baseUrl` setting has also been removed.

See [Styles and internal reports](docs/STYLES_AND_REPORTS.md).


## Beta 7: application import resolution

Vite application imports now use stable aliases:

```ts
import { ConnectButton, ThemeToggle } from "@powerpay/sdk";
import { formatCurrency } from "@app-lib/utils";
```

Run `pnpm imports:validate` to detect unresolved relative imports before
starting Vite.

See [Application import conventions](docs/APP_IMPORTS.md).


## Beta 8: unambiguous cluster exports

The multichain `CLUSTERS` registry is now the canonical SDK export. The older
Solana-only registry is exported as `SOLANA_CLUSTER_DEFINITIONS`.

```ts
import {
  CLUSTERS,
  SOLANA_CLUSTER_DEFINITIONS,
  SOLANA_CLUSTERS,
  SUI_CLUSTERS,
} from "@powerchain-protocol/powerpay-checkout-sdk";
```

The token metadata JSON Schema now explicitly permits the `$schema` editor
reference used by `token/metadata.json`.

See [Public cluster exports](docs/PUBLIC_CLUSTER_EXPORTS.md).


## Beta 9: Solana type boundaries

Solana instruction encoders remain `Uint8Array` based, while
`TransactionInstruction` construction now converts payloads with
`Buffer.from(...)`. Historical RPC methods narrow `Commitment` to `Finality`,
promoting `"processed"` to `"confirmed"`.

See [Solana TypeScript boundaries](docs/SOLANA_TYPE_BOUNDARIES.md).


## Beta 10: Sui Move payment tests

The Sui payment contract now has `test_scenario` coverage for successful SUI
payments, receipt data, merchant delivery, zero-value rejection, and
self-payment rejection.

```bash
cd contracts/sui
sui move test
```

See [Sui Move payment tests](docs/SUI_MOVE_TESTS.md).


## Beta 11: API v1 routing

The app and SDK now share normalized `/api/v1` routing with checkout sessions,
centralized CORS/preflight handling, trailing-slash support, and consistent
route errors.

```ts
const session = await api.createSession({
  merchant,
  orderId: "order-123",
  amount: "19.99",
  currency: "USDC",
});
```

This release also restores the Solana merchant instruction API and adds a
Prisma generated-client editor fallback.

See [API v1 routing](docs/API_ROUTING_V1.md).


## npm workspace installation

All project and application versions are normalized to `1.0.0-beta.1`.

```bash
cd /workspaces/powerpay
npm run cwd:check
npm install
npm run dev
```

The root and app packages both declare `@vitejs/plugin-react`, allowing
`app/vite.config.ts` to resolve under npm workspace hoisting.

See [npm installation and Vite](docs/NPM_INSTALL_AND_VITE.md).


## CORS and Codespaces

Development CORS validates preflight methods and headers and emits only valid
`Access-Control-Allow-Origin` values. Vite suppresses the PWA manifest link in
development to avoid GitHub Codespaces private-port `pf-signin` redirects
being treated as cross-origin manifest requests.

See [CORS and GitHub Codespaces](docs/CORS_AND_CODESPACES.md).


## Rolldown current-directory panic

The development launcher now resolves and verifies the application directory
before starting Vite, preventing `Failed to get current dir` panics after a
workspace folder is replaced.

```bash
cd /workspaces/powerpay
npm install
npm run dev:reset
npm run dev
```

See [Rolldown current-directory panic](docs/ROLLDOWN_CWD_PANIC.md).


## Blank-screen recovery

The app now renders a visible startup card before React initializes and shows
a diagnostic screen for top-level errors. PWA registration is production-only,
and wallet initialization can fall back to read-only demo mode.

```bash
npm install
npm run dev:doctor
npm run dev:reset
npm run dev
```

See [Blank-screen recovery](docs/APP_BLANK_SCREEN.md).
