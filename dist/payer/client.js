import { Transaction, } from "@solana/web3.js";
export class PayerClient {
    connection;
    wallet;
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
    }
    async sendInstructions(instructions) {
        if (!this.wallet.publicKey)
            throw new Error("Wallet is not connected");
        const transaction = new Transaction().add(...instructions);
        transaction.feePayer = this.wallet.publicKey;
        transaction.recentBlockhash = (await this.connection.getLatestBlockhash("confirmed")).blockhash;
        const signed = await this.wallet.signTransaction(transaction);
        const signature = await this.connection.sendRawTransaction(signed.serialize(), { skipPreflight: false, maxRetries: 3 });
        await this.connection.confirmTransaction(signature, "confirmed");
        return signature;
    }
}
