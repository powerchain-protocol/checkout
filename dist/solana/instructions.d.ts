import { PublicKey, TransactionInstruction } from "@solana/web3.js";
export declare function initializeMerchantInstruction(authority: PublicKey, treasury: PublicKey, feeTreasury: PublicKey, feeBps: number): TransactionInstruction;
export declare function updateMerchantInstruction(authority: PublicKey, feeBps: number, paused: boolean): TransactionInstruction;
export declare function createPaymentInstruction(args: {
    payer: PublicKey;
    merchant: PublicKey;
    reference: Uint8Array;
    amount: bigint;
    expiresAt: bigint;
}): TransactionInstruction;
export declare function settlePaymentInstruction(args: {
    authority: PublicKey;
    merchant: PublicKey;
    payment: PublicKey;
    treasury: PublicKey;
    feeTreasury: PublicKey;
}): TransactionInstruction;
export declare function refundPaymentInstruction(caller: PublicKey, payment: PublicKey, payer: PublicKey): TransactionInstruction;
export declare function recordSettlementInstruction(network: PublicKey, authority: PublicKey, payment: PublicKey, amount: bigint): TransactionInstruction;
export declare function createTokenPaymentInstruction(args: {
    payer: PublicKey;
    merchant: PublicKey;
    reference: Uint8Array;
    amount: bigint;
    expiresAt: bigint;
    payerTokenAccount: PublicKey;
    escrowTokenAccount: PublicKey;
    mint: PublicKey;
    tokenProgram: PublicKey;
    decimals: number;
}): TransactionInstruction;
export declare function settleTokenPaymentInstruction(args: {
    authority: PublicKey;
    merchant: PublicKey;
    payment: PublicKey;
    escrowTokenAccount: PublicKey;
    treasuryTokenAccount: PublicKey;
    feeTreasuryTokenAccount: PublicKey;
    mint: PublicKey;
    tokenProgram: PublicKey;
}): TransactionInstruction;
export declare function refundTokenPaymentInstruction(args: {
    caller: PublicKey;
    payment: PublicKey;
    payer: PublicKey;
    escrowTokenAccount: PublicKey;
    payerTokenAccount: PublicKey;
    mint: PublicKey;
    tokenProgram: PublicKey;
}): TransactionInstruction;
