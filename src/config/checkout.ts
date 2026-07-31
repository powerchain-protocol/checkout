export const CHECKOUT_CONFIG = {
  collectEmail: true,
  collectBillingName: true,
  showWalletAddress: true,
  showNetworkBadge: true,
  allowTips: false,
  allowDiscountCodes: true,
  invoicePreview: true,
  rememberCart: true,
  cartStorageKey: "powerpay:checkout-cart",
} as const;
