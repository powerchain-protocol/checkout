# PowerPay UI Package

Reusable React UI primitives for the PowerPay SDK and merchant application.

This package contains:

- theme and wallet providers;
- wallet connection components;
- shared cluster constants;
- checkout types and validation;
- PowerPay design-system styles.

## Dependency direction

```text
packages/sdk/powerpay/ui
          ▲
          │
      app/src
```

The UI package may consume stable SDK types. It must not import merchant
application pages, demo data, or API route handlers.
