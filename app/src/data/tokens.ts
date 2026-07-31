export interface SupportedToken {
  symbol: string;
  name: string;
  chain: "solana" | "sui";
  mint?: string;
  coinType?: string;
  decimals: number;
  trusted: boolean;
}

export const SUPPORTED_TOKENS: SupportedToken[] = [
  {
    symbol: "SOL",
    name: "Solana",
    chain: "solana",
    decimals: 9,
    trusted: true,
  },
  {
    symbol: "SUI",
    name: "Sui",
    chain: "sui",
    coinType: "0x2::sui::SUI",
    decimals: 9,
    trusted: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "solana",
    mint: import.meta.env.VITE_USDC_MINT,
    decimals: 6,
    trusted: true,
  },
  {
    symbol: "PWRC",
    name: "PowerChain Credit",
    chain: "solana",
    mint: import.meta.env.VITE_PWRC_MINT,
    decimals: Number(import.meta.env.VITE_PWRC_DECIMALS ?? 9),
    trusted: Boolean(import.meta.env.VITE_PWRC_MINT),
  },
  {
    symbol: "PWRP",
    name: "PowerPay",
    chain: "solana",
    mint: import.meta.env.VITE_POWERPAY_TOKEN_MINT,
    decimals: Number(import.meta.env.VITE_POWERPAY_TOKEN_DECIMALS ?? 9),
    trusted: Boolean(import.meta.env.VITE_POWERPAY_TOKEN_MINT),
  },
  {
    symbol: "PWRC",
    name: "PowerChain Credit on Sui",
    chain: "sui",
    coinType: import.meta.env.VITE_SUI_PWRC_COIN_TYPE,
    decimals: Number(import.meta.env.VITE_SUI_PWRC_DECIMALS ?? 9),
    trusted: Boolean(import.meta.env.VITE_SUI_PWRC_COIN_TYPE),
  },
  {
    symbol: "PWRP",
    name: "PowerPay on Sui",
    chain: "sui",
    coinType: import.meta.env.VITE_SUI_PWRP_COIN_TYPE,
    decimals: Number(import.meta.env.VITE_SUI_PWRP_DECIMALS ?? 9),
    trusted: Boolean(import.meta.env.VITE_SUI_PWRP_COIN_TYPE),
  },
];
