import type { Connection, PublicKey } from "@solana/web3.js";
import { MerchantPaymentClient } from "../merchant/payment-client.js";
import type { ConnectedSolanaWallet } from "../solana/wallet.js";
import { createRpcConnection, type RpcClientOptions } from "./rpc.js";

export interface PowerPayClientOptions extends RpcClientOptions {
  connection?: Connection;
  merchant: string | PublicKey;
}

export class PowerPayClient {
  readonly connection: Connection;
  readonly payments: MerchantPaymentClient;

  constructor(options: PowerPayClientOptions) {
    this.connection =
      options.connection ??
      createRpcConnection(options);
    this.payments = new MerchantPaymentClient({
      connection: this.connection,
      merchantAddress: options.merchant,
      commitment: options.commitment,
    });
  }

  pay(input: {
    wallet: ConnectedSolanaWallet;
    amount: string | number;
    mint?: PublicKey;
  }) {
    return this.payments.sendFromConnectedWallet(input);
  }

  createQr(input: {
    amount: string | number;
    mint?: PublicKey;
    label?: string;
    message?: string;
    memo?: string;
  }) {
    return this.payments.createQrPayment(input);
  }

  history(limit = 20) {
    return this.payments.transactions(limit);
  }
}
