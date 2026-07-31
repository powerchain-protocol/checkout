import { PublicKey, TransactionInstruction } from "@solana/web3.js";
export declare const POWERPAY_INSTRUCTION: {
    readonly initializeMerchant: 0;
    readonly updateMerchant: 1;
    readonly createPayment: 2;
    readonly settlePayment: 3;
    readonly refundPayment: 4;
    readonly createTokenPayment: 5;
    readonly settleTokenPayment: 6;
    readonly refundTokenPayment: 7;
};
export declare function initializeMerchantInstruction(authority: PublicKey, treasury: PublicKey, feeTreasuryOrFeeBps: PublicKey | number, feeBpsArg?: number): TransactionInstruction;
export interface CreatePaymentInstructionInput {
    payer: PublicKey;
    merchant: PublicKey;
    reference: PublicKey | Uint8Array;
    amount: bigint;
    expiresAt: bigint;
}
export declare function createPaymentInstruction(input: CreatePaymentInstructionInput): TransactionInstruction;
export declare function createTokenPaymentInstruction(input: {
    payer: PublicKey;
    merchant: PublicKey;
    reference: PublicKey | Uint8Array;
    amount: bigint;
    expiresAt: bigint;
    payerTokenAccount: PublicKey;
    escrowTokenAccount: PublicKey;
    mint: PublicKey;
    tokenProgram: PublicKey;
    decimals: number;
}): TransactionInstruction;
export declare function settlePaymentInstruction(input: {
    authority: PublicKey;
    merchant: PublicKey;
    payment: PublicKey;
    treasury: PublicKey;
    feeTreasury: PublicKey;
}): TransactionInstruction;
export declare function settleTokenPaymentInstruction(input: {
    authority: PublicKey;
    merchant: PublicKey;
    payment: PublicKey;
    escrowTokenAccount: PublicKey;
    treasuryTokenAccount: PublicKey;
    feeTreasuryTokenAccount: PublicKey;
    mint: PublicKey;
    tokenProgram: PublicKey;
}): TransactionInstruction;
export declare function refundPaymentInstruction(input: {
    caller: PublicKey;
    payment: PublicKey;
    payer: PublicKey;
}): TransactionInstruction;
//# sourceMappingURL=instructions.d.ts.map