# Payment security and confirmation

PowerPay v0.11 treats a wallet signature as only the start of payment
processing. A payment is considered successful only after:

1. the recipient, amount, mint, and decimals are validated;
2. the connected wallet address is available;
3. the wallet has enough SOL or token balance;
4. the transaction simulation succeeds;
5. the wallet submits the transaction;
6. the blockhash-based confirmation succeeds;
7. the signature status has no error and reaches the requested commitment;
8. Solana Pay transfers are reconciled by reference, recipient, amount, and mint.

## Amounts

All SDK conversions use decimal strings and `bigint`. JavaScript floating-point
multiplication is not used for token atomic amounts.

## SOL fee reserve

Direct SOL payment checks reserve lamports for transaction fees. Production
applications should obtain a message-specific fee estimate and may also reserve
rent or priority fees when relevant.

## Token payments

The SDK reads mint decimals from chain, detects SPL Token or Token-2022, checks
the payer ATA balance, creates the recipient ATA idempotently, and uses
`TransferChecked`.

## Merchant addresses

Merchant wallet strings are parsed as public keys and required to be on curve.
Program-owned treasury PDAs require a separate explicit integration because
they are intentionally rejected by wallet-address validation.

## QR payments

QR payloads are generated from the Solana Pay transfer-request URL. Each order
uses a unique reference public key. The merchant reconciles the resulting
signature with `findReference` and `validateTransfer`.
