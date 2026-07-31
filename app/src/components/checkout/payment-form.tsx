import { useMemo, useState } from "react";
import {
  CheckCircledIcon,
  ChevronDownIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import type { ClientRecord } from "../../data/clients";

const methods = [
  { id: "pwrc", label: "PWRC", network: "PowerChain", balance: "12,450.75" },
  { id: "usdc", label: "USDC", network: "Solana", balance: "4,850.12" },
  { id: "usdt", label: "USDT", network: "Solana", balance: "1,250.00" },
  { id: "sol", label: "SOL", network: "Solana", balance: "84.20" },
];

export function PaymentForm({ client }: { client: ClientRecord }) {
  const [method, setMethod] = useState("pwrc");
  const [amount, setAmount] = useState("1250.75");
  const [memo, setMemo] = useState("Energy certificate payment");

  const selected = useMemo(
    () => methods.find((item) => item.id === method)!,
    [method],
  );

  return (
    <form className="payment-form" onSubmit={(event) => event.preventDefault()}>
      <div className="form-section-heading">
        <span>1</span>
        <div>
          <h3>Select payment method</h3>
          <p>Choose the asset the client will use.</p>
        </div>
      </div>

      <div className="payment-method-grid">
        {methods.map((item) => (
          <button
            key={item.id}
            type="button"
            className={method === item.id ? "selected" : ""}
            onClick={() => setMethod(item.id)}
          >
            <span className={`asset-orb asset-orb--${item.id}`}>
              {item.label.slice(0, 1)}
            </span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.network}</small>
            </span>
            {method === item.id && <CheckCircledIcon />}
          </button>
        ))}
      </div>

      <div className="form-divider" />

      <div className="form-section-heading">
        <span>2</span>
        <div>
          <h3>Payment details</h3>
          <p>Review amount, recipient, and settlement details.</p>
        </div>
      </div>

      <div className="field-grid">
        <label>
          <span>Pay with</span>
          <div className="select-field">
            <span className={`asset-orb asset-orb--${method}`}>
              {selected.label.slice(0, 1)}
            </span>
            <strong>{selected.label}</strong>
            <ChevronDownIcon />
          </div>
          <small>Available balance: {selected.balance} {selected.label}</small>
        </label>

        <label>
          <span>Amount</span>
          <div className="amount-field">
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
            />
            <strong>{selected.label}</strong>
            <button type="button">Max</button>
          </div>
          <small>≈ $245.00 USD</small>
        </label>

        <label className="field-span">
          <span>Recipient</span>
          <div className="recipient-field">
            <span className="client-avatar small">{client.initials}</span>
            <span>
              <strong>{client.name}</strong>
              <small>{client.company}</small>
            </span>
            <CheckCircledIcon />
          </div>
        </label>

        <label className="field-span">
          <span>Memo</span>
          <input
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
          />
        </label>
      </div>

      <div className="review-panel">
        <div className="form-section-heading">
          <span>3</span>
          <div>
            <h3>Review and confirm</h3>
            <p>Funds settle to the verified merchant wallet.</p>
          </div>
        </div>

        <dl>
          <div><dt>Subtotal</dt><dd>$245.00</dd></div>
          <div><dt>Network fee</dt><dd>0.10 PWRC</dd></div>
          <div><dt>Total</dt><dd>1,250.75 PWRC</dd></div>
        </dl>

        <button className="primary-button payment-submit" type="submit">
          <LockClosedIcon />
          Pay 1,250.75 PWRC
        </button>

        <p className="secure-note">
          <LockClosedIcon />
          Secure, encrypted, and verified on-chain.
        </p>
      </div>
    </form>
  );
}
