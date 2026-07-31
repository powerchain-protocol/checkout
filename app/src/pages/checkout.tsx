import { useMemo, useState } from "react";
import {
  CheckCircledIcon,
  CopyIcon,
  DownloadIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { PaymentForm } from "../components/checkout/payment-form";
import { MerchantCheckout } from "../components/checkout/merchant-checkout";
import { ClientQrPayment } from "../components/checkout/client-qr-payment";
import { PowerPos } from "../components/checkout/power-pos";
import { clients, type ClientRecord } from "../data/clients";

type CheckoutMode = "checkout" | "qr" | "pos";

export function CheckoutPage() {
  const [mode, setMode] = useState<CheckoutMode>("checkout");
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);

  const selectedClient = clients.find((client) => client.id === selectedClientId)!;
  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return clients;
    return clients.filter((client) =>
      [client.name, client.email, client.company, client.wallet]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <main
      className={`content checkout-workspace ${dark ? "theme-dark" : "theme-light"}`}
      id="checkout"
    >
      <section className="checkout-topbar">
        <div>
          <p className="eyebrow">Merchant payments</p>
          <h1>Checkout workspace</h1>
          <p>
            Create secure payment requests, accept QR payments, and operate
            PowerPOS from one merchant-ready interface.
          </p>
        </div>

        <div className="checkout-topbar__actions">
          <span className="security-chip">
            <LockClosedIcon />
            Secure session
          </span>
          <button
            className="icon-button"
            type="button"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            onClick={() => setDark((value) => !value)}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="primary-button compact" type="button">
            <PlusIcon />
            New payment
          </button>
        </div>
      </section>

      <nav className="checkout-mode-tabs" aria-label="Checkout mode">
        {[
          ["checkout", "Merchant checkout"],
          ["qr", "Client QR payment"],
          ["pos", "PowerPOS"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={mode === value ? "active" : ""}
            onClick={() => setMode(value as CheckoutMode)}
          >
            {label}
          </button>
        ))}
      </nav>

      <section className="checkout-layout">
        <aside className="client-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Client directory</p>
              <h2>Select client</h2>
            </div>
            <button className="icon-button" type="button" aria-label="Client filters">
              <MixerHorizontalIcon />
            </button>
          </div>

          <label className="client-search">
            <MagnifyingGlassIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clients"
            />
          </label>

          <div className="client-list">
            {filteredClients.map((client) => (
              <button
                key={client.id}
                type="button"
                className={`client-row ${
                  selectedClientId === client.id ? "selected" : ""
                }`}
                onClick={() => setSelectedClientId(client.id)}
              >
                <span className="client-avatar">{client.initials}</span>
                <span>
                  <strong>{client.name}</strong>
                  <small>{client.company}</small>
                </span>
                <span className={`client-status ${client.status}`}>
                  {client.status}
                </span>
              </button>
            ))}
          </div>

          <button className="secondary-button client-add" type="button">
            <PlusIcon />
            Add client
          </button>

          <ClientSummary client={selectedClient} />
        </aside>

        <section className="checkout-main-panel">
          {mode === "checkout" && (
            <MerchantCheckout client={selectedClient}>
              <PaymentForm client={selectedClient} />
            </MerchantCheckout>
          )}
          {mode === "qr" && <ClientQrPayment client={selectedClient} />}
          {mode === "pos" && <PowerPos client={selectedClient} />}
        </section>

        <aside className="checkout-insights">
          <section className="summary-card">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Live payment</p>
                <h2>Order summary</h2>
              </div>
              <span className="live-dot">Live</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>$245.00</strong>
              <small>≈ 1,250.75 PWRC</small>
            </div>

            <dl className="summary-list">
              <div>
                <dt>Invoice</dt>
                <dd>INV-2026-081</dd>
              </div>
              <div>
                <dt>Client</dt>
                <dd>{selectedClient.name}</dd>
              </div>
              <div>
                <dt>Settlement</dt>
                <dd>Instant</dd>
              </div>
              <div>
                <dt>Network</dt>
                <dd>PowerChain</dd>
              </div>
            </dl>

            <button className="secondary-button full-button" type="button">
              <DownloadIcon />
              Download invoice
            </button>
          </section>

          <section className="merchant-card">
            <div className="merchant-logo">P</div>
            <div>
              <p className="eyebrow">Merchant</p>
              <h3>PowerChain Labs</h3>
              <span>
                <CheckCircledIcon />
                Verified merchant
              </span>
            </div>
          </section>

          <section className="trust-card">
            <h3>Transaction assurance</h3>
            <ul>
              <li><CheckCircledIcon /> End-to-end encrypted</li>
              <li><CheckCircledIcon /> On-chain verification</li>
              <li><CheckCircledIcon /> Automatic receipt</li>
              <li><CheckCircledIcon /> Carbon-aware settlement</li>
            </ul>
          </section>

          <section className="wallet-card">
            <p className="eyebrow">Client wallet</p>
            <strong>{selectedClient.wallet}</strong>
            <button type="button" className="icon-button" aria-label="Copy wallet">
              <CopyIcon />
            </button>
          </section>
        </aside>
      </section>
    </main>
  );
}

function ClientSummary({ client }: { client: ClientRecord }) {
  return (
    <section className="client-summary">
      <div className="client-summary__head">
        <span className="client-avatar large">{client.initials}</span>
        <div>
          <strong>{client.name}</strong>
          <small>{client.email}</small>
        </div>
      </div>
      <dl>
        <div>
          <dt>Lifetime value</dt>
          <dd>{client.lifetimeValue}</dd>
        </div>
        <div>
          <dt>Payments</dt>
          <dd>{client.payments}</dd>
        </div>
      </dl>
    </section>
  );
}
