# PowerPay API and WebSockets

## Discovery

```text
GET /api/v1
GET /api/v1/openapi
GET /api/v1/websocket
GET /api/v1/health
```

Swagger UI is served from:

```text
/api-docs/
```

The OpenAPI 3.1 specification is served from:

```text
/swagger.yaml
```

## Error fallback

Every JSON response includes:

```text
X-Request-Id
X-PowerPay-Version
```

Unknown routes return a typed `ROUTE_NOT_FOUND` response. Unexpected handler
failures return `API_HANDLER_FAILED` with `retryable: true`.

## WebSocket client

```ts
import { createPowerPaySdk } from "@powerchain-protocol/powerpay-checkout-sdk";

const sdk = createPowerPaySdk({
  baseUrl: "https://api.example.com",
  publishableKey: "pk_test_...",
});

const socket = sdk.websocket({
  merchantId: "merchant_123",
  reconnect: true,
});

const unsubscribe = socket.subscribe("payment.confirmed", (event) => {
  console.log(event.resourceId, event.data);
});

socket.connect();
```

The client supports exponential reconnect, heartbeat timeout, wildcard event
subscriptions, authentication query parameters, and safe malformed-frame
handling.

## Event types

- `system.ready`
- `system.heartbeat`
- `payment.created`
- `payment.updated`
- `payment.confirmed`
- `payment.failed`
- `session.created`
- `session.updated`
- `session.completed`
- `integration.updated`
