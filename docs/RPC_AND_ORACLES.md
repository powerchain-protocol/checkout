# RPC and oracle configuration

## RPC

PowerPay accepts either a standard Solana RPC URL or a Helius endpoint.

```env
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=...
```

Avoid exposing a production Helius key in browser code. Proxy privileged methods through the PowerPay API.

## Pyth

Configure Hermes and explicit feed IDs:

```env
VITE_PYTH_HERMES_URL=https://pyth.dourolabs.app/hermes
VITE_PYTH_SOL_USD_FEED_ID=
VITE_PYTH_USDC_USD_FEED_ID=
VITE_PYTH_EUR_USD_FEED_ID=
PYTH_API_KEY=
PYTH_MAX_PRICE_AGE_SECONDS=30
```

Reject quotes older than the configured maximum age and store the feed ID and publish timestamp with every payment quote.
