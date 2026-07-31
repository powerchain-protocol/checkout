export interface MerchantConfiguration {
  authority: string;
  treasury: string;
  feeTreasury?: string;
}

export function readMerchantConfiguration(): MerchantConfiguration {
  const authority = import.meta.env.VITE_MERCHANT_AUTHORITY?.trim();
  const treasury = import.meta.env.VITE_MERCHANT_TREASURY?.trim();

  if (!authority || !treasury) {
    throw new Error(
      "Merchant authority and treasury must be configured in .env.local",
    );
  }

  return {
    authority,
    treasury,
    feeTreasury: import.meta.env.VITE_MERCHANT_FEE_TREASURY?.trim(),
  };
}
