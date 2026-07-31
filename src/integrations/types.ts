export interface PowerPayIntegrationContext {
  merchantId?: string;
  organizationId?: string;
  environment?: "development" | "staging" | "production";
}

export interface PowerPayIntegrationHealth {
  ok: boolean;
  provider: string;
  checkedAt: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface PowerPayIntegrationAdapter {
  readonly id: string;
  readonly provider: string;
  readonly capabilities: readonly string[];
  health(
    context?: PowerPayIntegrationContext,
  ): Promise<PowerPayIntegrationHealth>;
}
