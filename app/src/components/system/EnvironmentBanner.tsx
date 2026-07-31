import { usePowerPayCluster } from "@powerpay/sdk";

export function EnvironmentBanner() {
  const { cluster, provider } = usePowerPayCluster();
  const production = cluster === "mainnet-beta";

  return (
    <div
      className={`environment-banner ${production ? "is-production" : ""}`}
      role="status"
    >
      <span className="environment-banner__dot" />
      <strong>{production ? "Mainnet payments enabled" : "Development environment"}</strong>
      <span>
        {cluster} · {provider} RPC
      </span>
    </div>
  );
}
