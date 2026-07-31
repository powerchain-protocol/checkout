<div align="center">

<img src="public/icons/powerpay-mark.svg" alt="PowerPay" width="76" />

# PowerPay Merchant Application

### A professional checkout, QR payment, and PowerPOS workspace

React · TypeScript · Vite · Radix UI · PowerPay SDK

**Version `1.0.0-beta.1`**

</div>

---

## Product overview

The PowerPay Merchant Application is the reference interface for the PowerPay
Checkout SDK. It is designed for merchant operators, finance teams, checkout
developers, and in-person payment staff.

The application provides a responsive forest-green interface with coordinated
light and dark themes. It emphasizes payment confidence, client context,
transaction clarity, and fast merchant workflows.

## Main experiences

### Merchant dashboard

The dashboard presents operational metrics, transaction history, quick
actions, merchant status, wallet balances, and network information in a
high-density but readable layout.

### Checkout workspace

The checkout workspace combines:

- client selection and search;
- payment-method selection;
- amount and memo entry;
- merchant and recipient verification;
- network fee and settlement review;
- secure payment confirmation;
- automatic receipt messaging.

### Client QR payments

Create client-specific QR requests with:

- editable amounts;
- configurable settlement assets;
- payment memos;
- copyable checkout links;
- downloadable QR codes;
- merchant branding and client identity.

### PowerPOS

PowerPOS supports in-person merchant workflows with:

- touch-friendly amount entry;
- customer selection;
- QR wallet payments;
- NFC-ready interaction patterns;
- shareable payment links;
- automatic email and on-chain receipts;
- instant settlement status.

## Visual system

The interface uses a merchant-focused design system:

| Token | Direction |
|---|---|
| Primary | Forest green |
| Background | Warm white or deep green-black |
| Typography | Inter |
| Surfaces | Low-contrast bordered panels |
| Radius | 11–18 px depending on hierarchy |
| Shadows | Soft, restrained, operational |
| Status | Green success, amber pending, red danger |
| Density | Compact dashboard, generous checkout forms |

The light and dark themes preserve the same hierarchy and payment semantics.

## Run locally

From the repository root:

```bash
npm install
npm run dev
```

Or from the application workspace:

```bash
npm run dev --workspace @powerchain-protocol/powerpay-demo-app
```

Open `http://localhost:5173`.

## Startup diagnostics

Run:

```bash
npm run dev:doctor
```

Clear stale Vite state:

```bash
npm run dev:reset
```

The application includes a visible startup screen and top-level error recovery,
so startup failures no longer produce an unexplained blank page.

## Build

```bash
npm run app:build
```

Production output is written to:

```text
app/dist/
```

## Docker

Production:

```bash
npm run docker:up
```

Development with hot reload:

```bash
npm run docker:dev
```

Production application:

```text
http://localhost:8080
```

Development application:

```text
http://localhost:5173
```

## Application structure

```text
app/
├── api/v1/                 API route handlers
├── lib/                    Application API client and helpers
├── public/                 Icons, manifest, and static assets
├── src/
│   ├── components/
│   │   ├── checkout/       Checkout, QR, and PowerPOS components
│   │   ├── dashboard/      Metrics and transaction components
│   │   ├── layout/         Header, navigation, and sidebar
│   │   ├── system/         Error, toast, and wallet runtime boundaries
│   │   └── ui/             Reusable interface primitives
│   ├── data/               Demo merchants, clients, assets, and metrics
│   ├── hooks/              Navigation and application hooks
│   ├── pages/              Product pages
│   ├── styles/             Application design system
│   ├── App.tsx             Application composition
│   └── main.tsx            React startup and recovery
├── index.html
├── package.json
└── vite.config.ts
```

## Checkout component map

```text
CheckoutPage
├── Client directory
├── MerchantCheckout
│   └── PaymentForm
├── ClientQrPayment
├── PowerPos
├── Order summary
├── Merchant verification
└── Transaction assurance
```

## Theme behavior

The checkout workspace supports immediate light/dark switching. Forest-green
tokens remain the primary brand color in both modes.

Key CSS tokens include:

```css
--checkout-green: #0b6b43;
--checkout-green-2: #0f8252;
--checkout-green-soft: #e7f4ed;
```

Dark mode replaces backgrounds, surfaces, borders, and muted text while
preserving the same semantic green accents.

## Accessibility and UX

The application includes:

- semantic navigation and form controls;
- visible keyboard focus;
- readable contrast;
- descriptive button labels;
- responsive layout breakpoints;
- explicit success, warning, loading, and error states;
- safe read-only fallback when wallet providers fail;
- production-only PWA registration;
- secure-session and verified-merchant messaging.

## Environment configuration

Vite variables use the `VITE_` prefix:

```env
VITE_POWERPAY_API_BASE_URL=http://localhost:3000
```

Production CORS origins are configured at the server layer:

```env
POWERPAY_CORS_ORIGINS=https://checkout.example.com
```

## UI validation

Run:

```bash
npm run checkout:ui:validate
npm run app:startup:validate
npm run validate:app
```

These checks verify checkout modes, theme tokens, startup recovery, imports,
and required UI components.

## Adding a new payment experience

1. Add the feature component under `src/components/checkout/`.
2. Keep payment state local or expose it through an SDK hook.
3. Add the mode to `CheckoutPage`.
4. Use existing forest-green theme tokens.
5. Add responsive styles.
6. Update this README and `docs/CHECKOUT_UI_UX.md`.
7. Add or extend a validator.

## Product quality checklist

Before release, confirm:

- the page renders in light and dark modes;
- client selection remains visible and usable;
- payment amounts are readable at all breakpoints;
- transaction status is explicit;
- error states do not collapse into blank screens;
- no blue design tokens were introduced;
- desktop and mobile layouts remain usable;
- `1.0.0-beta.1` metadata remains synchronized.

## Related documentation

- [Root project README](../README.md)
- [Checkout UI and UX](../docs/CHECKOUT_UI_UX.md)
- [Blank-screen recovery](../docs/APP_BLANK_SCREEN.md)
- [Docker](../docs/DOCKER.md)
- [CORS and Codespaces](../docs/CORS_AND_CODESPACES.md)


## API documentation

The application serves Swagger UI at `/api-docs/` and the OpenAPI 3.1 document
at `/swagger.yaml`. API discovery is available from `/api/v1`.
