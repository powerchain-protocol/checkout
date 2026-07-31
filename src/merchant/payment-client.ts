import {
  Connection,
  PublicKey,
  type Commitment,
} from "@solana/web3.js";
import {
  createSolanaPayRequest,
  waitForSolanaPayPayment,
  type EncodedSolanaPayRequest,
} from "../solana/solana-payments.js";
import {
  sendSolPayment,
  sendTokenPayment,
  type ConfirmedPayment,
} from "../solana/payments.js";
import {
  fetchWalletTransactions,
  type WalletTransactionRecord,
} from "../solana/history.js";
import {
  parseSolanaAddress,
} from "../solana/validation.js";
import type { ConnectedSolanaWallet } from "../solana/wallet.js";

export interface MerchantPaymentClientOptions {
  connection: Connection;
  merchantAddress: string | PublicKey;
  commitment?: Commitment;
}

export class MerchantPaymentClient {
  readonly connection: Connection;
  readonly merchant: PublicKey;
  readonly commitment: Commitment;

  constructor(options: MerchantPaymentClientOptions) {
    this.connection = options.connection;
    this.merchant =
      typeof options.merchantAddress === "string"
        ? parseSolanaAddress(options.merchantAddress, "merchant address")
        : options.merchantAddress;
    this.commitment = options.commitment ?? "confirmed";
  }

  createQrPayment(params: {
    amount: string | number;
    mint?: PublicKey;
    label?: string;
    message?: string;
    memo?: string;
  }): Promise<EncodedSolanaPayRequest> {
    return createSolanaPayRequest(this.connection, {
      recipient: this.merchant,
      amount: params.amount,
      splToken: params.mint,
      label: params.label,
      message: params.message,
      memo: params.memo,
    });
  }

  waitForQrPayment(params: {
    reference: PublicKey;
    amount: string | number;
    mint?: PublicKey;
    timeoutMs?: number;
  }) {
    return waitForSolanaPayPayment({
      connection: this.connection,
      recipient: this.merchant,
      reference: params.reference,
      amount: params.amount,
      splToken: params.mint,
      timeoutMs: params.timeoutMs,
      commitment: this.commitment,
    });
  }

  sendFromConnectedWallet(params: {
    wallet: ConnectedSolanaWallet;
    amount: string | number;
    mint?: PublicKey;
  }): Promise<ConfirmedPayment> {
    return params.mint
      ? sendTokenPayment({
          connection: this.connection,
          wallet: params.wallet,
          recipient: this.merchant,
          amount: params.amount,
          mint: params.mint,
          commitment: this.commitment,
        })
      : sendSolPayment({
          connection: this.connection,
          wallet: params.wallet,
          recipient: this.merchant,
          amount: params.amount,
          commitment: this.commitment,
        });
  }

  transactions(limit = 20): Promise<WalletTransactionRecord[]> {
    return fetchWalletTransactions({
      connection: this.connection,
      wallet: this.merchant,
      limit,
      commitment: this.commitment,
    });
  }
}
