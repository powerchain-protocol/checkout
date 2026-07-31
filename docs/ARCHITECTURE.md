# Architecture

PowerPay separates browser-safe SDK functions from privileged server operations.

```text
Merchant app
  ├─ Checkout SDK / React app
  ├─ Payer wallet
  └─ PowerPay API
       ├─ Helius or standard Solana RPC
       ├─ Pyth Hermes prices
       ├─ Merchant configuration
       └─ Solana programs
            ├─ PowerPay escrow and settlement
            └─ PowerChain settlement accounting
```

## Payment assets

The PowerPay program supports:

- Native SOL escrow
- Classic SPL Token transfers
- Token-2022 transfers

Token payments use `TransferChecked` CPI instructions and record the mint, token program, and decimals in the payment account.

## Trust boundaries

- Browser: publishable keys and public RPC configuration only.
- Server: Helius API key, Pyth API key, merchant signer, webhook secrets.
- On-chain: payment state, authorization, fee calculation, settlement, refund rules.
