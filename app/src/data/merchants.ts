export const merchants = [
  {
    id: "mrc_atlas",
    name: "Atlas Commerce",
    authority: import.meta.env.VITE_MERCHANT_AUTHORITY ?? "",
    treasury: import.meta.env.VITE_MERCHANT_TREASURY ?? "",
    feeTreasury: import.meta.env.VITE_MERCHANT_FEE_TREASURY ?? "",
    status: "development",
  },
] as const;
