# SDK, API, Hooks, Routing, and Integrations

## SDK client

Use the resource-oriented client:

```ts
import { createPowerPaySdk } from "@powerchain-protocol/powerpay-checkout-sdk";

const sdk = createPowerPaySdk({
  baseUrl: "https://api.example.com",
  apiKey: process.env.POWERPAY_API_KEY,
  merchantId: "merchant_123",
});

const payment = await sdk.payments.create(
  {
    amount: "245.00",
    currency: "USD",
  },
  {
    idempotencyKey: "checkout-order-42",
  },
);
```

Available resources:

- `sdk.health`
- `sdk.payments`
- `sdk.sessions`
- `sdk.clients`
- `sdk.checkout`
- `sdk.integrations`

## React context

Wrap the application once:

```tsx
<PowerPaySdkProvider
  config={{
    baseUrl: import.meta.env.VITE_POWERPAY_API_BASE_URL,
  }}
>
  <CheckoutProvider>
    <App />
  </CheckoutProvider>
</PowerPaySdkProvider>
```

Hooks include:

- `usePowerPaySdk`
- `useApiResource`
- `usePayment`
- `usePayments`
- `useCreatePayment`
- `useClient`
- `useClients`
- `useCreateClient`
- `useCheckoutActions`
- `useCheckoutDraft`

## API routes

New API v1 resources:

| Method | Route | Purpose |
|---|---|---|
| GET/POST | `/api/v1/clients` | List or create clients |
| GET | `/api/v1/clients/:clientId` | Retrieve a client |
| POST | `/api/v1/qr-payments` | Create a QR payment |
| POST | `/api/v1/pos/charges` | Create a PowerPOS charge |
| GET | `/api/v1/pos/terminals` | List terminals |
| GET | `/api/v1/integrations` | List integration health |
| GET | `/api/v1/integrations/:integrationId` | Retrieve integration health |

## Constants and routing

All route strings are centralized in:

- `POWERPAY_API_ROUTES`
- `POWERPAY_APP_ROUTES`
- `POWERPAY_ROUTE_LABELS`

The app route registry lives in `app/src/routes.ts`.

## Integrations

The integration registry supports built-in and custom adapters:

```ts
const registry = new PowerPayIntegrationRegistry();

registry.register(
  new HttpIntegrationAdapter({
    id: "merchant-risk",
    provider: "custom",
    healthUrl: "https://risk.example.com/health",
    capabilities: ["risk-score"],
  }),
);
```

Built-in API health reporting covers Helius, Pyth, Circle, and Cetus.
