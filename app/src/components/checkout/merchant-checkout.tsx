import type { ReactNode } from "react";
import type { ClientRecord } from "../../data/clients";

export function MerchantCheckout({
  client,
  children,
}: {
  client: ClientRecord;
  children: ReactNode;
}) {
  return (
    <section className="merchant-checkout">
      <header className="merchant-checkout__header">
        <div>
          <p className="eyebrow">Merchant checkout</p>
          <h2>Accept payment from {client.name}</h2>
          <p>
            Secure checkout powered by PowerChain with instant merchant
            settlement and automatic receipts.
          </p>
        </div>
        <div className="merchant-checkout__badges">
          <span>Secure</span>
          <span>Encrypted</span>
          <span>Verified</span>
        </div>
      </header>
      {children}
    </section>
  );
}
