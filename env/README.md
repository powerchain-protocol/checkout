# Environment profiles

Copy one profile to the repository root as `.env.local`.

```bash
cp env/devnet.env.example .env.local
```

Only variables prefixed with `VITE_` are exposed to browser builds. Keep Helius API keys, Pyth API keys, merchant signers, and PowerPay secret keys on the server whenever possible.
