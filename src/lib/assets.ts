export interface BrandAsset {
  id: string;
  name: string;
  path: string;
  type: "icon" | "token" | "image";
}

export const POWERPAY_ASSETS = {
  mark: {
    id: "powerpay-mark",
    name: "PowerPay mark",
    path: "/icons/powerpay-mark.svg",
    type: "icon",
  },
  pwrp: {
    id: "pwrp-token",
    name: "PowerPay token",
    path: "/assets/pwrp-coin.svg",
    type: "token",
  },
  carbonCredit: {
    id: "powerchain-carbon-credit",
    name: "PowerChain carbon credit",
    path: "/assets/powerchain-carbon-credit-coin.png",
    type: "token",
  },
} as const satisfies Record<string, BrandAsset>;
