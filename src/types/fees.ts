import type { ChainFamily } from "../clusters/types.js";

export interface NetworkFeeEstimate {
  chain: ChainFamily;
  network: string;
  atomicAmount: string;
  currency: "SOL" | "SUI";
  uiAmount: string;
  source: "rpc" | "simulation" | "configured";
}

export interface PaymentFeeBreakdown {
  network: NetworkFeeEstimate;
  platformAtomic: string;
  routeAtomic?: string;
  totalAtomic: string;
  currency: string;
}
