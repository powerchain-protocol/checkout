import { ReloadIcon } from "@radix-ui/react-icons";
import { Card } from "../components/ui/card";

export function LoadingPage({ label = "Loading PowerPay workspace" }: { label?: string }) {
  return (
    <main className="route-state route-state--centered" aria-busy="true">
      <Card className="route-state__card loading-card">
        <span className="loading-card__mark" aria-hidden="true">
          <ReloadIcon width={24} height={24} />
        </span>
        <p className="eyebrow">Secure workspace</p>
        <h1>{label}</h1>
        <p>Connecting wallet services, RPC health, and merchant configuration.</p>
        <div className="skeleton-stack" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </Card>
    </main>
  );
}
