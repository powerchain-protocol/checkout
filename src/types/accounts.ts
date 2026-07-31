import type { ChainFamily } from "../clusters/types.js";

export interface ChainAccount {
  chain: ChainFamily;
  address: string;
  network: string;
  label?: string;
  walletProvider?: string;
  connected: boolean;
}

export interface CoinBalance {
  chain: ChainFamily;
  owner: string;
  symbol: string;
  coinType?: string;
  mint?: string;
  decimals: number;
  atomicAmount: string;
  uiAmount: string;
  usdValue?: string;
}

export interface AccountPortfolio {
  account: ChainAccount;
  balances: CoinBalance[];
  totalUsdValue?: string;
  fetchedAt: string;
}
