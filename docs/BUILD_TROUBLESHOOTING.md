# Build troubleshooting

## Wallet modal hook

`useWalletModal` is exported by `@solana/wallet-adapter-react-ui`, not
`@solana/wallet-adapter-react`.

## Backpack wallet

The aggregate `@solana/wallet-adapter-wallets` package does not expose
`BackpackWalletAdapter` in every release. PowerPay now uses Phantom and
Solflare adapters explicitly. Wallet Standard-compatible wallets may also be
discovered by supported wallet-adapter integrations.

## PWRP mint configuration

Reusable SDK code must not access Vite-only `import.meta.env` directly.

```ts
const mint = getPowerPayMint({
  mint: import.meta.env.VITE_POWERPAY_TOKEN_MINT,
});
```

On a Node server:

```ts
const mint = getPowerPayMint({ env: process.env });
```
