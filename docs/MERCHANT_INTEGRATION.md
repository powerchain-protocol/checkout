# Merchant integration

1. Configure a merchant authority, treasury, fee treasury, and fee rate.
2. Derive and initialize the merchant PDA.
3. Create a payment intent with a unique 32-byte reference.
4. Have the payer sign the SOL or token payment.
5. Confirm the transaction and settle it to merchant and fee treasury accounts.

```ts
import {
  MerchantClient,
  createPowerPayConnection,
} from "@powerchain-protocol/powerpay-checkout-sdk";

const connection = createPowerPayConnection();
const merchant = new MerchantClient(profile);
const initialize = merchant.initializeInstruction();
```

For SPL and Token-2022 payments, create token accounts using the matching token program. The escrow token account authority must be the payment PDA.
