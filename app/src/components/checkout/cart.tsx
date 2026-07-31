import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import type { InvoiceLineItem } from "../../../../src/types/invoice";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@app-lib/utils";

export interface CartProps {
  items: InvoiceLineItem[];
  currency?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export function Cart({
  items,
  currency = "USD",
  onQuantityChange,
  onRemove,
}: CartProps) {
  return (
    <Card className="checkout-cart">
      <CardHeader>
        <div>
          <p className="eyebrow">Order</p>
          <CardTitle>Your cart</CardTitle>
        </div>
        <span className="cart-count">{items.length}</span>
      </CardHeader>

      <div className="cart-list">
        {items.length === 0 ? (
          <div className="empty-cart">
            <strong>Your cart is empty</strong>
            <span>Add an item to continue to payment.</span>
          </div>
        ) : (
          items.map((item) => (
            <article className="cart-line" key={item.id}>
              <div className="cart-line__copy">
                <strong>{item.name}</strong>
                {item.description && <span>{item.description}</span>}
                <small>{formatCurrency(item.unitAmount, currency)}</small>
              </div>

              <div className="quantity-control" aria-label={`${item.name} quantity`}>
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    onQuantityChange?.(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  <MinusIcon />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    onQuantityChange?.(item.id, item.quantity + 1)
                  }
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                className="cart-remove"
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove?.(item.id)}
              >
                <TrashIcon />
              </button>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}
