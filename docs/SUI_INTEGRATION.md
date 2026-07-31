# Sui integration

PowerPay beta 4 adds Sui network configuration, account and balance fetching,
wallet abstractions, transaction boundaries, Cetus routing, and a Move contract
scaffold.

## SDK packages

The workspace declares:

- `@mysten/sui`;
- `@mysten/dapp-kit-react`;
- `@cetusprotocol/cetus-sui-clmm-sdk`.

Core RPC reads use a small provider-neutral client so server code is not tied
to React or a specific wallet. Application adapters can use Mysten's current
dApp Kit for wallet connectivity.

## Account data

`fetchSuiWalletData` retrieves:

- latest checkpoint;
- all coin balances;
- coin metadata;
- atomic and UI amounts.

Unknown coin types remain identifiable by full Move type and are not
automatically treated as trusted.

## Transactions

`sendSuiTransaction` requires:

- a connected wallet;
- validated sender and recipient addresses;
- positive atomic amount;
- a transaction builder supplied by the application;
- wallet-owned signing.

The core SDK does not hold Sui private keys.

## Cetus

`CetusService` validates coin types, amount, slippage, quote expiry, and minimum
output. An application must supply a current Cetus SDK adapter configured with
the target network package IDs and RPC transport.

Do not execute stale quotes or assume a displayed symbol uniquely identifies a
coin type.

## Move contract

See `contracts/sui`. The package is a beta scaffold and requires compilation,
tests, deployment IDs, upgrade policy, and audit before production.
