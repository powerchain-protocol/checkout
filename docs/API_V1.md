# PowerPay API v1

PowerPay API v1 is described by the root `swagger.yaml` OpenAPI 3.1 document and
the source copy at `app/api/v1/swagger.yaml`.

## Endpoints

### `GET /api/v1/health`

Returns the service version, time, and configured Solana cluster.

### `POST /api/v1/payments`

Creates a Solana Pay transfer request with a unique reference and QR data URL.

The beta handler validates the request and creates the transfer resource in
memory. A production adapter must persist the payment, enforce idempotency,
authorize the merchant, and reconcile expiration and confirmation.

### `GET /api/v1/payments/{paymentId}`

Reserved in the OpenAPI contract. The persistence adapter must implement this
endpoint.

## Error format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Payment request validation failed",
    "requestId": "req_..."
  }
}
```

## Production requirements

- authenticated merchants;
- idempotency keys;
- request and response size limits;
- rate limits;
- persistent storage;
- signature and reference reconciliation;
- webhook signing;
- audit logs;
- secret rotation;
- structured metrics and traces.
