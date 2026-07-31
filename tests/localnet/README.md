# Localnet integration tests

Run `npm run test:localnet`. The script starts `solana-test-validator`, builds and deploys both programs, synchronizes IDs, and then runs the TypeScript tests. Add transaction-level integration cases here as the client API grows.
