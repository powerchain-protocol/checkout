# Multichain security

Solana and Sui have different account, asset, transaction, and finality models.
PowerPay keeps chain-specific builders and signing interfaces separate.

Security requirements:

- validate the chain and network explicitly;
- validate full mint or Move coin type, not symbol alone;
- fetch decimals and metadata from chain;
- maintain trusted-asset allowlists;
- use exact atomic integer amounts;
- enforce amount and slippage limits;
- simulate or dry-run where supported;
- require wallet-owned signatures;
- verify transaction status and effects;
- reconcile merchant recipient and delivered amount;
- never silently route a direct payment through a swap;
- keep production and testnet package IDs separate.
