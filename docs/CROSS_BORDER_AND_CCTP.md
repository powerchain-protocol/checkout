# Cross-border payments and Circle CCTP

PowerPay treats cross-border native USDC transfers as a multi-stage workflow:

1. validate the source native USDC mint against the trusted-token registry;
2. calculate and disclose fees;
3. build the source-chain CCTP V2 transaction through Circle's current Solana
   IDL/client bindings;
4. submit and confirm the source burn transaction;
5. derive and persist the CCTP message hash;
6. request Circle attestation;
7. construct and submit the destination receive transaction;
8. confirm the destination transaction and mark the transfer complete.

The SDK intentionally does not hand-code the current CCTP program instruction
discriminator. `createDepositForBurnInstruction` rejects raw use until an
audited/current Circle binding is configured.

CCTP moves native USDC by burning on the source chain and minting on the
destination chain. It should not be presented as a wrapped-token bridge.
