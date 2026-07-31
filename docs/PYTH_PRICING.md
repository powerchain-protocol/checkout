# Pyth pricing

`PythPriceClient` uses the Hermes HTTP client to fetch parsed price updates.

```ts
const client = new PythPriceClient();
const price = await client.latestPrice(feedId);
```

Applications must validate:

- feed ID;
- publish time;
- confidence interval;
- expected exponent;
- maximum acceptable age.

A price quote should be captured with the payment order. Do not recalculate an
already accepted fiat price after the customer signs unless the order policy
explicitly allows repricing.
