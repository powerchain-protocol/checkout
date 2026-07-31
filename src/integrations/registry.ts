import type {
  PowerPayIntegrationAdapter,
  PowerPayIntegrationHealth,
} from "./types.js";

export class PowerPayIntegrationRegistry {
  private readonly adapters = new Map<
    string,
    PowerPayIntegrationAdapter
  >();

  register(adapter: PowerPayIntegrationAdapter): this {
    if (this.adapters.has(adapter.id)) {
      throw new Error(
        `PowerPay integration already registered: ${adapter.id}`,
      );
    }
    this.adapters.set(adapter.id, adapter);
    return this;
  }

  replace(adapter: PowerPayIntegrationAdapter): this {
    this.adapters.set(adapter.id, adapter);
    return this;
  }

  get(id: string): PowerPayIntegrationAdapter | undefined {
    return this.adapters.get(id);
  }

  list(): PowerPayIntegrationAdapter[] {
    return [...this.adapters.values()];
  }

  async health(): Promise<PowerPayIntegrationHealth[]> {
    return Promise.all(
      this.list().map(async (adapter) => {
        try {
          return await adapter.health();
        } catch (error) {
          return {
            ok: false,
            provider: adapter.provider,
            checkedAt: new Date().toISOString(),
            message:
              error instanceof Error
                ? error.message
                : "Integration health check failed",
          };
        }
      }),
    );
  }
}
