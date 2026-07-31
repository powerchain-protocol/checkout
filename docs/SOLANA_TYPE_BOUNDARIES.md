# Solana TypeScript boundaries

## Transaction instruction data

PowerPay encoding helpers return `Uint8Array` so they remain usable in browsers
and non-Node runtimes. `@solana/web3.js` v1 types require `Buffer` for
`TransactionInstruction.data`, so conversion happens only when constructing
the instruction:

```ts
import { Buffer } from "buffer";

new TransactionInstruction({
  programId,
  keys,
  data: Buffer.from(encodedBytes),
});
```

The `buffer` package is a direct dependency and Vite can bundle its browser
implementation.

## Commitment and finality

Solana's `Commitment` type includes `"processed"`, but historical methods such
as `getSignaturesForAddress` and `getParsedTransactions` accept the narrower
`Finality` type:

```ts
type Finality = "confirmed" | "finalized";
```

`toFinality()` preserves confirmed/finalized and promotes processed requests to
confirmed for historical reads. Submission and preflight APIs may continue to
accept the wider `Commitment` type.
