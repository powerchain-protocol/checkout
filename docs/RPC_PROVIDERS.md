# RPC providers

`createRpcConnection` creates a standard `@solana/web3.js` connection from a
cluster default or explicit endpoint.

The Helius client supports:

- Helius JSON-RPC requests;
- enhanced transaction history.

Use the standard RPC connection for portable transaction construction and
confirmation. Use Helius as an optional data and performance provider.

Production deployments should use multiple providers, health checks, bounded
timeouts, and controlled failover. Never silently switch clusters.
