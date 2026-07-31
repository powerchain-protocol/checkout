export type IntegrationStatus =
  | "ready"
  | "degraded"
  | "disabled"
  | "unconfigured";

export interface ProviderStatus {
  id: string;
  name: string;
  chain?: "solana" | "sui";
  status: IntegrationStatus;
  latencyMs?: number;
  latestCheckpoint?: string;
  latestSlot?: number;
  error?: string;
  checkedAt: string;
}

export type TransactionLifecycle =
  | "created"
  | "validating"
  | "awaiting-signature"
  | "submitted"
  | "confirmed"
  | "finalized"
  | "failed";
