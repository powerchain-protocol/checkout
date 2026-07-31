import type { CurrencyCode } from "../types/common.js";

export interface CurrencyDefinition {
  code: CurrencyCode;
  name: string;
  decimals: number;
  mint?: string;
  kind: "native" | "spl" | "token-2022";
  stable?: boolean;
}

export const DEFAULT_CURRENCIES: CurrencyDefinition[] = [
  {
    code: "SOL",
    name: "Solana",
    decimals: 9,
    kind: "native",
  },
  {
    code: "USDC",
    name: "USD Coin",
    decimals: 6,
    kind: "spl",
    stable: true,
  },
  {
    code: "PWRP",
    name: "PowerPay",
    decimals: 9,
    kind: "token-2022",
  },
];

export function currencyByCode(
  code: CurrencyCode,
  currencies = DEFAULT_CURRENCIES,
): CurrencyDefinition | undefined {
  return currencies.find((currency) => currency.code === code);
}
