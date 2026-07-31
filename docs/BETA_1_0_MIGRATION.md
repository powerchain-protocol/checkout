# Migrating to PowerPay 1.0.0 Beta

## Version

The package version is `1.0.0-beta.1`.

## New module organization

Use the new public modules:

```text
src/config/
src/context/
src/hooks/
src/lib/
src/types/
src/utils/
```

Legacy exports remain available where practical during the beta.

## Configuration

Move ad hoc environment reads to `readPowerPayEnv`.

## RPC

Prefer `createRpcConnection` and pass the resulting connection to clients.

## Payments

Prefer `PowerPayClient` or `MerchantPaymentClient` for connected-wallet and QR
flows.

## API

The versioned API contract is now `/api/v1` and is defined in `swagger.yaml`.

## Beta compatibility

Before stable 1.0, exported names and API payloads may receive documented
breaking changes. Pin the exact beta version in production prototypes.
