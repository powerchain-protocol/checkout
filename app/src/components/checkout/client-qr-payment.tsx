import { useState } from "react";
import {
  CopyIcon,
  DownloadIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import type { ClientRecord } from "../../data/clients";

export function ClientQrPayment({ client }: { client: ClientRecord }) {
  const [amount, setAmount] = useState("245.00");

  return (
    <section className="qr-workspace">
      <header className="merchant-checkout__header">
        <div>
          <p className="eyebrow">Client QR payment</p>
          <h2>Scan, approve, and pay</h2>
          <p>
            Generate a client-specific request for {client.name}. The QR code
            updates automatically when the amount changes.
          </p>
        </div>
      </header>

      <div className="qr-layout">
        <section className="qr-config">
          <label>
            <span>Payment amount</span>
            <div className="currency-input">
              <span>$</span>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <strong>USD</strong>
            </div>
          </label>

          <label>
            <span>Settlement asset</span>
            <select defaultValue="pwrc">
              <option value="pwrc">PWRC · PowerChain</option>
              <option value="usdc">USDC · Solana</option>
              <option value="usdt">USDT · Solana</option>
            </select>
          </label>

          <label>
            <span>Payment note</span>
            <textarea defaultValue="Energy certificate payment" />
          </label>

          <button className="primary-button" type="button">
            <ReloadIcon />
            Refresh payment request
          </button>
        </section>

        <section className="qr-preview">
          <p className="eyebrow">Ready to scan</p>
          <h3>${amount} USD</h3>
          <div className="qr-code" aria-label="Payment QR code">
            <div className="qr-grid">
              {Array.from({ length: 100 }, (_, index) => (
                <i key={index} className={(index * 7 + index % 9) % 3 === 0 ? "on" : ""} />
              ))}
            </div>
            <span className="qr-logo">P</span>
          </div>
          <strong>{client.name}</strong>
          <small>{client.company}</small>
          <div className="qr-actions">
            <button className="secondary-button" type="button">
              <CopyIcon />
              Copy link
            </button>
            <button className="secondary-button" type="button">
              <DownloadIcon />
              Download QR
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
