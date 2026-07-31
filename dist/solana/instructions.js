import { Buffer } from "buffer";
import { PublicKey, SystemProgram, TransactionInstruction, } from "@solana/web3.js";
import { merchantPda, paymentPda, powerpayProgramId, } from "./pdas.js";
export const POWERPAY_INSTRUCTION = {
    initializeMerchant: 0,
    updateMerchant: 1,
    createPayment: 2,
    settlePayment: 3,
    refundPayment: 4,
    createTokenPayment: 5,
    settleTokenPayment: 6,
    refundTokenPayment: 7,
};
function referenceBytes(reference) {
    const bytes = reference instanceof PublicKey ? reference.toBytes() : reference;
    if (bytes.length !== 32) {
        throw new Error("reference must be 32 bytes");
    }
    return Buffer.from(bytes);
}
function u64(value) {
    if (value < 0n || value > 0xffffffffffffffffn) {
        throw new RangeError("u64 out of range");
    }
    const bytes = Buffer.alloc(8);
    bytes.writeBigUInt64LE(value);
    return bytes;
}
function i64(value) {
    const bytes = Buffer.alloc(8);
    bytes.writeBigInt64LE(value);
    return bytes;
}
export function initializeMerchantInstruction(authority, treasury, feeTreasuryOrFeeBps, feeBpsArg) {
    const feeTreasury = feeTreasuryOrFeeBps instanceof PublicKey
        ? feeTreasuryOrFeeBps
        : treasury;
    const feeBps = typeof feeTreasuryOrFeeBps === "number"
        ? feeTreasuryOrFeeBps
        : feeBpsArg;
    if (feeBps === undefined ||
        !Number.isInteger(feeBps) ||
        feeBps < 0 ||
        feeBps > 10_000) {
        throw new RangeError("feeBps must be 0..10000");
    }
    const [merchant] = merchantPda(authority);
    const data = Buffer.alloc(3);
    data[0] = POWERPAY_INSTRUCTION.initializeMerchant;
    data.writeUInt16LE(feeBps, 1);
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: authority, isSigner: true, isWritable: true },
            { pubkey: treasury, isSigner: false, isWritable: false },
            { pubkey: feeTreasury, isSigner: false, isWritable: false },
            { pubkey: merchant, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data,
    });
}
export function createPaymentInstruction(input) {
    if (input.amount <= 0n) {
        throw new RangeError("Payment amount must be positive");
    }
    const reference = referenceBytes(input.reference);
    const [payment] = paymentPda(input.merchant, reference);
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: input.payer, isSigner: true, isWritable: true },
            { pubkey: input.merchant, isSigner: false, isWritable: false },
            { pubkey: payment, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat([
            Buffer.from([POWERPAY_INSTRUCTION.createPayment]),
            reference,
            u64(input.amount),
            i64(input.expiresAt),
        ]),
    });
}
export function createTokenPaymentInstruction(input) {
    if (input.amount <= 0n) {
        throw new RangeError("Payment amount must be positive");
    }
    const reference = referenceBytes(input.reference);
    const [payment] = paymentPda(input.merchant, reference);
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: input.payer, isSigner: true, isWritable: true },
            { pubkey: input.merchant, isSigner: false, isWritable: false },
            { pubkey: payment, isSigner: false, isWritable: true },
            { pubkey: input.payerTokenAccount, isSigner: false, isWritable: true },
            { pubkey: input.escrowTokenAccount, isSigner: false, isWritable: true },
            { pubkey: input.mint, isSigner: false, isWritable: false },
            { pubkey: input.tokenProgram, isSigner: false, isWritable: false },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat([
            Buffer.from([POWERPAY_INSTRUCTION.createTokenPayment]),
            reference,
            u64(input.amount),
            i64(input.expiresAt),
            Buffer.from([input.decimals]),
        ]),
    });
}
export function settlePaymentInstruction(input) {
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: input.authority, isSigner: true, isWritable: false },
            { pubkey: input.merchant, isSigner: false, isWritable: false },
            { pubkey: input.payment, isSigner: false, isWritable: true },
            { pubkey: input.treasury, isSigner: false, isWritable: true },
            { pubkey: input.feeTreasury, isSigner: false, isWritable: true },
        ],
        data: Buffer.from([POWERPAY_INSTRUCTION.settlePayment]),
    });
}
export function settleTokenPaymentInstruction(input) {
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: input.authority, isSigner: true, isWritable: false },
            { pubkey: input.merchant, isSigner: false, isWritable: false },
            { pubkey: input.payment, isSigner: false, isWritable: true },
            { pubkey: input.escrowTokenAccount, isSigner: false, isWritable: true },
            { pubkey: input.treasuryTokenAccount, isSigner: false, isWritable: true },
            {
                pubkey: input.feeTreasuryTokenAccount,
                isSigner: false,
                isWritable: true,
            },
            { pubkey: input.mint, isSigner: false, isWritable: false },
            { pubkey: input.tokenProgram, isSigner: false, isWritable: false },
        ],
        data: Buffer.from([POWERPAY_INSTRUCTION.settleTokenPayment]),
    });
}
export function refundPaymentInstruction(input) {
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: input.caller, isSigner: true, isWritable: false },
            { pubkey: input.payment, isSigner: false, isWritable: true },
            { pubkey: input.payer, isSigner: false, isWritable: true },
        ],
        data: Buffer.from([POWERPAY_INSTRUCTION.refundPayment]),
    });
}
//# sourceMappingURL=instructions.js.map