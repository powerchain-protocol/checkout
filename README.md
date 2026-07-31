<div align="center">

<img src="app/public/icons/powerpay-mark.svg" alt="PowerPay" width="88" />

# PowerPay

### Production-ready merchant payments for PowerChain, Solana, and Sui

Build embedded checkout, QR payments, PowerPOS terminals, invoices, payment
links, subscriptions, and cross-border settlement through one TypeScript SDK.

**Version `1.0.0-beta.1`**

[Documentation](docs/) · [Demo application](app/) · [API reference](docs/API_ROUTING_V1.md) · [Docker guide](docs/DOCKER.md)

</div>

---

## Overview

PowerPay is a multi-chain merchant payment platform and developer SDK for
modern Web3 commerce. It combines a professional merchant dashboard,
browser-safe TypeScript APIs, wallet integrations, payment sessions, invoices,
analytics, and production deployment tooling in one npm workspace.

The repository includes:

- a reusable TypeScript SDK;
- a polished React and Vite merchant application;
- Solana, Solana Pay, Sui, PWRC, and stablecoin payment flows;
- merchant checkout, client QR payment, and PowerPOS experiences;
- REST-style API v1 routing and OpenAPI documentation;
- Prisma, Supabase, Neon, Docker, and Nginx deployment support.

## Product experience

### Merchant checkout

Create a client-specific checkout with asset selection, verified merchant
identity, settlement details, fees, memos, receipts, and on-chain confirmation.

### Client QR payments

Generate client-specific payment requests that can be scanned, shared, copied,
or downloaded. Payment values and settlement assets update in real time.

### PowerPOS

Operate an in-person payment terminal with a touch-friendly amount keypad,
customer context, QR, NFC, checkout-link options, and automatic receipts.

### Light and dark themes

The application uses a professional forest-green design system with responsive
layouts, accessible contrast, clear hierarchy, and matching light and dark
interfaces.

## Platform capabilities

| Area | Capabilities |
|---|---|
| Checkout | Embedded checkout, merchant checkout, sessions, payment links |
| Client payments | Client directory, QR payments, wallet requests, receipts |
| Point of sale | PowerPOS, QR, NFC-ready flow, customer display |
| Networks | PowerChain, Solana, Solana Pay, Sui |
| Assets | PWRC, SOL, USDC, USDT, token payments |
| Business | Organizations, invoices, subscriptions, analytics |
| Settlement | Merchant settlement, cross-border flows, CCTP |
| Infrastructure | Prisma, PostgreSQL, Supabase, Neon, Docker, Nginx |
| Developer tools | TypeScript, React, Vite, OpenAPI, validators, tests |

## Architecture

```text
Merchant application
        │
        ▼
PowerPay React UI
        │
        ▼
PowerPay TypeScript SDK
        │
        ├── API v1 sessions and payments
        ├── Solana and Solana Pay
        ├── Sui Move integration
        ├── invoices and payment links
        └── analytics and settlement
        │
        ▼
PowerChain / Solana / Sui
```

## Quick start

### Requirements

- Node.js 22 or newer
- npm 11 or newer
- an existing working directory
- Docker optional

### Install

```bash
git clone <repository-url>
cd powerpay
npm install
```

Verify the environment:

```bash
npm run dev:doctor
```

Start the application:

```bash
npm run dev
```

Open `http://localhost:5173`.

## SDK example

```ts
import { PowerPay } from "@powerchain-protocol/powerpay-checkout-sdk";

const powerpay = new PowerPay({
  baseUrl: "https://api.example.com/api/v1",
});

const session = await powerpay.createSession({
  amount: "245.00",
  currency: "USD",
  settlementAsset: "PWRC",
  customer: {
    id: "client-1",
    email: "merchant-customer@example.com",
  },
});
```

## Application routes

| Experience | Route |
|---|---|
| Merchant overview | `#/overview` |
| Checkout workspace | `#/checkout` |
| Cross-border payments | `#/cross-border` |
| Sui payments | `#/sui` |
| System information | `#/informations` |
| Test area | `#/testarea` |

The checkout workspace includes internal modes for Merchant Checkout, Client QR
Payment, and PowerPOS.

## Docker

Build and run the production image:

```bash
npm run docker:build
npm run docker:run
```

Or use Compose:

```bash
npm run docker:up
```

Open `http://localhost:8080`.

Development container:

```bash
npm run docker:dev
```

Health endpoint:

```text
http://localhost:8080/healthz
```

## Configuration

Copy the environment template:

```bash
cp .env.example .env
```

Recommended production CORS configuration:

```env
POWERPAY_CORS_ORIGINS=https://checkout.example.com
```

Do not combine wildcard origins with credentialed CORS.

## Workspace commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite application safely |
| `npm run dev:doctor` | Validate the development environment |
| `npm run dev:reset` | Remove stale Vite build state |
| `npm run app:build` | Build the merchant application |
| `npm run test` | Run the test suite |
| `npm run typecheck` | Generate Prisma and validate TypeScript |
| `npm run docker:up` | Run the production Compose service |
| `npm run docker:dev` | Run the development Compose service |
| `npm run cors:validate` | Validate API and Vite CORS configuration |
| `npm run checkout:ui:validate` | Validate checkout UI capabilities |

## Repository structure

```text
powerpay/
├── app/                    React merchant application
├── src/                    TypeScript SDK
├── app/api/v1/             API v1 route handlers
├── contracts/sui/          Sui Move contract and tests
├── database/               Prisma schema and generated client
├── docs/                   Product and developer documentation
├── docker/                 Nginx production configuration
├── scripts/                Validators and developer utilities
├── tests/                  SDK and API tests
├── Dockerfile              Production container
├── Dockerfile.dev          Development container
└── compose.yaml            Docker Compose services
```

## Documentation

| Guide | Description |
|---|---|
| [SDK, API, Hooks, Routing, and Integrations](docs/SDK_API_HOOKS_INTEGRATIONS.md) | Resource clients, React hooks, routes, and adapters |
| [Application README](app/README.md) | Merchant dashboard and UI development |
| [Checkout UI and UX](docs/CHECKOUT_UI_UX.md) | Checkout, QR, and PowerPOS design |
| [API routing](docs/API_ROUTING_V1.md) | API v1 routes and behavior |
| [Docker](docs/DOCKER.md) | Production and development containers |
| [CORS and Codespaces](docs/CORS_AND_CODESPACES.md) | Origin policy and tunnel behavior |
| [Blank-screen recovery](docs/APP_BLANK_SCREEN.md) | Startup diagnostics and recovery |
| [Rolldown cwd panic](docs/ROLLDOWN_CWD_PANIC.md) | Safe Vite launch and cwd recovery |
| [Sui Move tests](docs/SUI_MOVE_TESTS.md) | Contract test coverage |
| [Solana boundaries](docs/SOLANA_TYPE_BOUNDARIES.md) | Browser-safe Solana types |

## Design principles

PowerPay interfaces are built around:

- clear payment status and transaction confidence;
- accessible contrast in light and dark modes;
- forest-green brand accents instead of generic blue UI;
- compact information density for merchant operations;
- responsive desktop, tablet, and mobile behavior;
- visible loading, empty, error, and recovery states;
- progressive disclosure for advanced payment details.

## Release status

Current release:

```text
1.0.0-beta.1
```

All package, application, documentation, Docker, API, and validation metadata
must remain synchronized to this version until the next coordinated release.

## Contributing

1. Create a focused branch.
2. Keep public SDK changes backward-compatible.
3. Add tests or validators for behavior changes.
4. Run type checks, tests, documentation checks, and package validation.
5. Include screenshots for meaningful UI changes.

Recommended validation:

```bash
npm run typecheck
npm run test
npm run checkout:ui:validate
npm run docker:validate
npm run version:validate
```

## Security

Do not commit private keys, wallet seed phrases, production API secrets, or
database credentials. Use environment variables and restricted merchant
origins in production.

## License

See the repository license for permitted use and distribution.


## Dependency installation security

PowerPay uses strict npm install-script governance. Required compiler and
Prisma scripts are explicitly approved, optional native accelerators are
denied, and package-maintainer `prepare` hooks are not executed during
consumer installation.

```bash
npm run install:scripts:validate
npm run install:scripts:review
npm run install:scripts:list
```

See [npm Install-Script Policy](docs/INSTALL_SCRIPT_POLICY.md) and
[Workspace Architecture](docs/WORKSPACE_ARCHITECTURE.md).


## API, Swagger, and WebSockets

PowerPay includes a typed API v1 router, OpenAPI 3.1 specification, Swagger UI,
standard request IDs, route fallbacks, and a reconnecting WebSocket SDK.

```text
GET  /api/v1
GET  /api/v1/health
GET  /api/v1/openapi
GET  /api/v1/websocket
POST /api/v1/payments
POST /api/v1/sessions
GET  /api/v1/clients
POST /api/v1/qr-payments
POST /api/v1/pos/charges
GET  /api/v1/integrations
POST /api/v1/cross-border
```

Open the interactive documentation at `/api-docs/`.

```ts
const socket = sdk.websocket({ merchantId: "merchant_123" });
socket.subscribe("payment.confirmed", console.log);
socket.connect();
```

See `docs/API_WEBSOCKETS.md`.


## Recovering from `uv_cwd`

`ENOENT: process.cwd` means the terminal is still located inside a directory
that was deleted or replaced. Node and npm fail before any package script can
run.

From Codespaces, recover with an absolute path:

```bash
cd /workspaces/powerpay
npm run dev
```

Or use the shell-safe launcher, which determines the repository from its own
file path:

```bash
/workspaces/powerpay/scripts/dev.sh
```

For another checkout path:

```bash
/path/to/powerpay/scripts/recover-cwd.sh npm run dev
```

Cleanup and reset scripts are repository-rooted and refuse to delete the active
directory or its ancestors.


## Workspace packages

PowerPay uses npm workspaces for the merchant application, shared configuration,
and reusable UI package.

```bash
npm install
npm run packages:validate
npm run packages:typecheck
npm run app:typecheck
npm run app:build
```

See `docs/PACKAGES_AND_APP.md`.


## Program toolchain fallback

`npm run build:programs` supports three environments:

1. Solana SBF tools installed: builds deployable program binaries.
2. Cargo installed without SBF tools: runs `cargo check --workspace`.
3. Cargo unavailable: runs structural program validators and exits successfully
   without producing binaries.

Inspect the current environment with:

```bash
npm run programs:doctor
```

A successful structural fallback does not mean deployable `.so` files were
created. Install Rust and the Solana CLI before deployment.
