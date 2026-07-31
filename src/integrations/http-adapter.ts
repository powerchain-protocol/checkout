import type {
  PowerPayIntegrationAdapter,
  PowerPayIntegrationContext,
  PowerPayIntegrationHealth,
} from "./types.js";

export class HttpIntegrationAdapter
  implements PowerPayIntegrationAdapter
{
  readonly id: string;
  readonly provider: string;
  readonly capabilities: readonly string[];

  constructor(
    options: {
      id: string;
      provider: string;
      healthUrl: string;
      capabilities?: readonly string[];
      headers?: Record<string, string>;
    },
  ) {
    this.id = options.id;
    this.provider = options.provider;
    this.healthUrl = options.healthUrl;
    this.capabilities = options.capabilities ?? [];
    this.headers = options.headers;
  }

  private readonly healthUrl: string;
  private readonly headers?: Record<string, string>;

  async health(
    _context?: PowerPayIntegrationContext,
  ): Promise<PowerPayIntegrationHealth> {
    const response = await fetch(this.healthUrl, {
      method: "GET",
      headers: this.headers,
    });

    return {
      ok: response.ok,
      provider: this.provider,
      checkedAt: new Date().toISOString(),
      message: response.ok
        ? "Integration available"
        : `Integration returned ${response.status}`,
    };
  }
}
