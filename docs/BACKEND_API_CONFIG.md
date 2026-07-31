# PowerPay backend, API, configuration, and packages

## Runtime configuration

| Variable | Default | Purpose |
|---|---:|---|
| `POWERPAY_HOST` | `0.0.0.0` | Backend bind host |
| `POWERPAY_PORT` / `PORT` | `8080` | Backend port |
| `POWERPAY_PUBLIC_URL` | local URL | Public API and WebSocket base |
| `POWERPAY_STORAGE_DIR` | `storage` | Static storage directory |
| `POWERPAY_APP_DIST` | `app/dist` | Built SPA directory |
| `POWERPAY_CORS_ORIGINS` | `*` | Comma-separated origins |
| `POWERPAY_BODY_LIMIT_BYTES` | `1048576` | JSON request limit |
| `POWERPAY_WS_HEARTBEAT_SECONDS` | `25` | Heartbeat cadence |
| `POWERPAY_WS_IDLE_TIMEOUT_SECONDS` | `75` | Idle connection timeout |

## Added API endpoints

```text
GET  /api/v1/config
GET  /api/v1/metrics
GET  /api/v1/roles
GET  /api/v1/refunds
POST /api/v1/refunds
GET  /api/v1/refunds/{refundId}
GET  /api/v1/webhooks
POST /api/v1/webhooks
GET  /api/v1/webhooks/{webhookId}
DELETE /api/v1/webhooks/{webhookId}
```

The beta backend handlers use in-memory storage. Production deployments should
replace them with authenticated persistence adapters.

## WebSockets

The SDK client exposes connection state and error subscriptions, bounded
reconnection attempts, exponential backoff, and randomized jitter.

```ts
const socket = sdk.websocket({
  merchantId: "merchant_123",
  maximumReconnectAttempts: 12,
});

socket.onState(console.log);
socket.onError(console.error);
socket.subscribe("*", console.log);
socket.connect();
```

## Development recovery

The safe Vite launcher re-resolves the repository and app directories before
every retry. It resets `PWD`, clears Vite caches, and retries with the stable
fallback after a Rolldown or deleted-working-directory panic.
