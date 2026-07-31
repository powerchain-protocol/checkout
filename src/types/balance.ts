export interface WalletBalance {
  symbol: string;
  mint?: string;
  decimals: number;
  atomicAmount: string;
  uiAmount: string;
  usdValue?: string;
}

export interface BalanceSnapshot {
  wallet: string;
  slot: number;
  balances: WalletBalance[];
  fetchedAt: string;
}
