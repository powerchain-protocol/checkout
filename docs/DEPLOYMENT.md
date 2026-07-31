# Deployment

```bash
npm install
cp env/devnet.env.example .env.local
npm run build:sdk
npm test
cargo test --workspace
npm run build:programs
npm run deploy:devnet
npm run program:ids
```

After deployment, set:

```env
VITE_SOLANA_PROGRAM_ID=<powerpay program address>
VITE_POWERCHAIN_PROGRAM_ID=<powerchain program address>
```

Rebuild the SDK and application after synchronizing program IDs.
