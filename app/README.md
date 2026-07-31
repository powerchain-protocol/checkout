# PowerPay Professional App

The PowerPay app is the React reference interface for **PowerPay
1.0.0-beta.1**. It demonstrates wallet connectivity, merchant dashboards,
checkout previews, operational alarms, information screens, test utilities,
Web3 icons, loading and error states, and integration with the root SDK.

## Run

From the repository root:

```bash
npm run env:init
npm install
npm --prefix app install
npm run app:dev
```

Production checks:

```bash
npm run app:typecheck
npm run app:build
```

## Routes

```text
#overview
#informations
#alarms
#testarea
```

Unknown routes display the not-found screen.

## Application structure

```text
app/src/
  components/
    checkout/
    dashboard/
    layout/
    system/
    ui/
  context/
  data/
  hooks/
  lib/
  pages/
app/api/v1/
  _shared.ts
  health.ts
  payments.ts
  index.ts
  swagger.yaml
```

## Configuration

Browser-safe values are read from `.env.local` using `VITE_` names. Do not add
Helius API keys, merchant signing keys, seed phrases, or other secrets to Vite
variables.

```env
VITE_POWERPAY_CLUSTER=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_PYTH_HERMES_URL=https://hermes.pyth.network
VITE_USDC_MINT=
VITE_POWERPAY_TOKEN_MINT=
VITE_MERCHANT_TREASURY=
VITE_POWERPAY_API_BASE_URL=http://localhost:3000
```

## API integration

```ts
import { PowerPayApiClient } from "../../src/lib/api";

const api = new PowerPayApiClient(
  import.meta.env.VITE_POWERPAY_API_BASE_URL,
);

const payment = await api.createPayment({
  merchant,
  amount: "12.50",
  currency: "USDC",
  mint: usdcMint,
  orderId: "PP-2048",
});
```

The repository contains API handler logic and OpenAPI definitions, but the
Vite application is not itself a server runtime. Deploy `app/api/v1` through a
Node, serverless, or edge adapter.

## Design system

Reusable components include:

```text
components/ui/card.tsx
components/ui/badge.tsx
components/ui/error-boundary.tsx
```

Radix Icons provide interface symbols. Web3 Icons provides network, token, and
wallet imagery.

## Deployment checklist

1. Type-check and build the SDK and application.
2. Set the intended Solana cluster explicitly.
3. Configure production RPC and merchant addresses.
4. Keep Helius and server API keys outside Vite variables.
5. Replace demo data with persistent API resources.
6. Add CSP, HTTPS, rate limiting, observability, and error reporting.
7. Validate wallet, QR, and transaction confirmation flows on the target cluster.
8. Complete security review before Mainnet Beta.


## Checkout and invoice UI

The app now includes:

```text
src/components/checkout/checkout.tsx
src/components/checkout/cart.tsx
src/components/checkout/payment-form.tsx
src/components/checkout/invoice-preview.tsx
src/pages/checkout.tsx
```

Open `#checkout` to view the responsive checkout experience.

Development infrastructure is organized under:

```text
app/lib/
  cache.ts
  db.ts
  embedded-wallet.ts
  safe-actions.ts
  utils.ts
app/src/data/
  data.ts
  merchants.ts
  metrics.ts
  users.ts
```

The database and embedded-wallet implementations are development adapters.
Replace them with encrypted, authenticated, persistent production services.

## Cross-border page

Open `#cross-border` to review the CCTP-oriented native USDC experience. The
current page is a review surface; transaction construction remains behind the
Circle integration service and trusted-token policy.

## Deployment

`vercel.json` builds the Vite application from `app/` and rewrites SPA routes
to `index.html`. API functions require a deployment adapter under the
platform's function directory or a separate backend service.

## Sui network workspace

Open `#sui` for the Sui account, balances, tokenized asset, and Cetus route
interface. The displayed fixtures are UI examples until a Sui wallet adapter
and production coin types are configured.


## SDK alias and wallet CSS

Use the source alias for root SDK components:

```ts
import { ConnectButton, ThemeToggle } from "@powerpay/sdk";
```

Do not import `../../../src/index.js` from application components.

Wallet Adapter styles are loaded once from `src/main.tsx`:

```ts
import "@solana/wallet-adapter-react-ui/styles.css";
```


## TypeScript path configuration

The application uses `moduleResolution: "Bundler"` and a relative `paths`
mapping for `@powerpay/sdk`. It does not use the deprecated `baseUrl` option.


## Stable application aliases

Use:

```ts
import { ConnectButton } from "@powerpay/sdk";
import { formatCurrency } from "@app-lib/utils";
```

Avoid traversing from nested components to repository root files manually.
