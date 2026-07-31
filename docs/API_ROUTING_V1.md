# API v1 routing

The application exposes one normalized router rooted at:

```text
/api/v1
```

Supported routes:

```text
GET     /api/v1/health
POST    /api/v1/payments
POST    /api/v1/sessions
GET     /api/v1/sessions/:sessionId
GET     /api/v1/cors
OPTIONS /api/v1/*
GET     /api/v1/trusted-tokens
POST    /api/v1/cross-border
```

Trailing slashes are accepted. Unknown routes return a consistent
`ROUTE_NOT_FOUND` error envelope.

## CORS

All JSON responses include the configured CORS policy. Configure origins with:

```env
POWERPAY_CORS_ORIGINS=https://merchant.example,https://admin.example
```

Without configuration, development defaults to `*`. Production deployments
should provide an explicit allowlist.

## Checkout sessions

The session API creates hosted checkout URLs and provides a stable session
resource for the app and SDK. The included store is in-memory for the demo.
Production adapters should persist sessions through Prisma or another durable
repository.

## SDK

```ts
const client = new PowerPayApiClient("https://api.example.com");

const session = await client.createSession({
  merchant,
  orderId: "order-123",
  amount: "19.99",
  currency: "USDC",
});

const current = await client.session(session.id);
```
