import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
} from "@solana/web3.js";

export interface PayerWallet {
  publicKey: PublicKey | null;
  signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
  ): Promise<T>;
}

export class PayerClient {
  constructor(
    readonly connection: Connection,
    readonly wallet: PayerWallet,
  ) {}

  async sendInstructions(
    instructions: TransactionInstruction[],
  ): Promise<string> {
    if (!this.wallet.publicKey) throw new Error("Wallet is not connected");

    const transaction = new Transaction().add(...instructions);
    transaction.feePayer = this.wallet.publicKey;
    transaction.recentBlockhash = (
      await this.connection.getLatestBlockhash("confirmed")
    ).blockhash;

    const signed = await this.wallet.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(
      signed.serialize(),
      { skipPreflight: false, maxRetries: 3 },
    );
    await this.connection.confirmTransaction(signature, "confirmed");
    return signature;
  }
}
