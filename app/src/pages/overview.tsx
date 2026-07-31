import { PlusIcon } from "@radix-ui/react-icons";
import { CheckoutCard } from "../components/checkout/CheckoutCard";
import { QuickActions } from "../components/checkout/QuickActions";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TransactionTable } from "../components/dashboard/TransactionTable";
import { EnvironmentBanner } from "../components/system/EnvironmentBanner";
import { metrics } from "@app/lib/demo";

export function OverviewPage() {
  return (
    <main className="content" id="overview">
      <EnvironmentBanner />

      <section className="welcome">
        <div>
          <p className="eyebrow">Merchant overview</p>
          <h1>Good morning, Atlas.</h1>
          <p>Monitor payments, settlement, and checkout performance in real time.</p>
        </div>
        <button className="primary-button compact" type="button">
          <PlusIcon />
          New payment
        </button>
      </section>

      <section className="metric-grid" aria-label="Payment metrics">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} index={index} />
        ))}
      </section>

      <div className="workspace-grid">
        <div className="workspace-main">
          <TransactionTable />
          <QuickActions />
        </div>

        <aside className="checkout-preview" aria-label="Checkout preview">
          <div className="preview-heading">
            <div>
              <p className="eyebrow">Customer preview</p>
              <h2>Live checkout</h2>
            </div>
            <span className="live-dot">Live</span>
          </div>
          <CheckoutCard />
        </aside>
      </div>
    </main>
  );
}
