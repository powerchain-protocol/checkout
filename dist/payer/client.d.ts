import { Connection, PublicKey, Transaction, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
export interface PayerWallet {
    publicKey: PublicKey | null;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
}
export declare class PayerClient {
    readonly connection: Connection;
    readonly wallet: PayerWallet;
    constructor(connection: Connection, wallet: PayerWallet);
    sendInstructions(instructions: TransactionInstruction[]): Promise<string>;
}
