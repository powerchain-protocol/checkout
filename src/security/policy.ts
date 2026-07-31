import type { ChainFamily } from "../clusters/types.js";

export interface TransactionSecurityPolicy {
  allowedChains: ChainFamily[];
  allowedNetworks: string[];
  requireTrustedAsset: boolean;
  requireSimulation: boolean;
  maximumAtomicAmount?: bigint;
}

export function enforceTransactionPolicy(params: {
  policy: TransactionSecurityPolicy;
  chain: ChainFamily;
  network: string;
  amountAtomic: bigint;
  trustedAsset: boolean;
}): void {
  if (!params.policy.allowedChains.includes(params.chain)) {
    throw new Error(`Chain ${params.chain} is not allowed`);
  }
  if (!params.policy.allowedNetworks.includes(params.network)) {
    throw new Error(`Network ${params.network} is not allowed`);
  }
  if (params.policy.requireTrustedAsset && !params.trustedAsset) {
    throw new Error("Asset is not in the trusted-token registry");
  }
  if (
    params.policy.maximumAtomicAmount !== undefined &&
    params.amountAtomic > params.policy.maximumAtomicAmount
  ) {
    throw new Error("Transaction exceeds the configured amount limit");
  }
}
