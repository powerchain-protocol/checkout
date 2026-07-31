import type { ChainTransactionResult } from "../types/transactions.js";
import type { ConnectedSuiWallet } from "../wallets/sui-wallet.js";
import { requireSuiWallet } from "../wallets/sui-wallet.js";
import { validateAtomicAmount, validateSuiAddress } from "../security/validate.js";
import { SUI_CLUSTERS } from "../clusters/sui.js";

export interface SuiTransactionBuilder {
  transferSui(params: {
    sender: string;
    recipient: string;
    amountAtomic: bigint;
  }): unknown;
  transferCoin(params: {
    sender: string;
    recipient: string;
    coinType: string;
    amountAtomic: bigint;
  }): unknown;
}

export async function sendSuiTransaction(params: {
  wallet: ConnectedSuiWallet;
  builder: SuiTransactionBuilder;
  recipient: string;
  amountAtomic: string | bigint;
  coinType?: string;
}): Promise<ChainTransactionResult> {
  const sender = await requireSuiWallet(params.wallet);
  const recipient = validateSuiAddress(params.recipient);
  const amountAtomic = validateAtomicAmount(params.amountAtomic);

  if (sender.toLowerCase() === recipient) {
    throw new Error("Sender and recipient must be different");
  }

  const transaction = params.coinType
    ? params.builder.transferCoin({
        sender,
        recipient,
        coinType: params.coinType,
        amountAtomic,
      })
    : params.builder.transferSui({
        sender,
        recipient,
        amountAtomic,
      });

  const result = await params.wallet.signAndExecuteTransaction({
    transaction,
    options: {
      showEffects: true,
      showEvents: true,
      showBalanceChanges: true,
    },
  });

  if (!result.digest) {
    throw new Error("Sui wallet returned no transaction digest");
  }

  const cluster = SUI_CLUSTERS[params.wallet.network];
  return {
    chain: "sui",
    network: params.wallet.network,
    digest: result.digest,
    status: "submitted",
    sender,
    recipient,
    asset: params.coinType ?? "0x2::sui::SUI",
    amountAtomic: amountAtomic.toString(),
    explorerUrl: `${cluster.explorerUrl}/tx/${result.digest}`,
  };
}
