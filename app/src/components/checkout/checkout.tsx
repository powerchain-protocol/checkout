import { useMemo, useState } from "react";
import type { InvoiceLineItem } from "../../../../src/types/invoice";
import { calculateInvoiceTotals } from "../../../../src/services/invoice-service";
import { Cart } from "./cart";
import { InvoicePreview } from "./invoice-preview";
import { PaymentForm } from "./payment-form";
import { demoInvoice } from "../../data/data";

export function Checkout({
  walletAddress = null,
}: {
  walletAddress?: string | null;
}) {
  const [items, setItems] = useState<InvoiceLineItem[]>(
    demoInvoice.lineItems,
  );
  const [pending, setPending] = useState(false);

  const invoice = useMemo(() => {
    const totals = calculateInvoiceTotals({
      lineItems: items,
      fees: demoInvoice.fees,
    });
    return { ...demoInvoice, lineItems: items, ...totals };
  }, [items]);

  function updateQuantity(id: string, quantity: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  }

  function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  async function pay() {
    setPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="checkout-page">
      <header className="checkout-hero">
        <div>
          <p className="eyebrow">PowerPay secure checkout</p>
          <h1>Review your order and pay from your Solana wallet.</h1>
          <p>
            Exact totals, visible fees, invoice preview, and transaction
            confirmation in one responsive checkout flow.
          </p>
        </div>
        <span className="checkout-environment">Devnet preview</span>
      </header>

      <div className="checkout-layout">
        <div className="checkout-layout__main">
          <Cart
            items={items}
            onQuantityChange={updateQuantity}
            onRemove={remove}
          />
          <PaymentForm
            amount={`$${invoice.total}`}
            walletAddress={walletAddress}
            pending={pending}
            onSubmit={pay}
          />
        </div>
        <aside className="checkout-layout__aside">
          <InvoicePreview invoice={invoice} />
        </aside>
      </div>
    </main>
  );
}
