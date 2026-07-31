import type { PublicKey } from "@solana/web3.js";
import { PowerPayClient } from "../lib/powerpay.js";
import type { ConnectedSolanaWallet } from "../solana/wallet.js";

export class PaymentService {
  constructor(readonly client: PowerPayClient) {}

  send(params: {
    wallet: ConnectedSolanaWallet;
    amount: string;
    mint?: PublicKey;
  }) {
    return this.client.pay(params);
  }

  createQr(params: {
    amount: string;
    mint?: PublicKey;
    label?: string;
    message?: string;
    memo?: string;
  }) {
    return this.client.createQr(params);
  }

  list(limit = 20) {
    return this.client.history(limit);
  }
}
