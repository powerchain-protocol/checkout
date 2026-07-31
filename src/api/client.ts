import type { PowerPaySdkConfig } from "../types/sdk.js";
import {
  PowerPayWebSocketClient,
  type PowerPayWebSocketOptions,
} from "./websocket.js";
import { PowerPayHttpTransport } from "./transport.js";
import {
  CheckoutResourceClient,
  ClientsResourceClient,
  HealthResourceClient,
  IntegrationsResourceClient,
  PaymentsResourceClient,
  SessionsResourceClient,
} from "./resources.js";

export class PowerPaySdk {
  readonly transport: PowerPayHttpTransport;
  readonly health: HealthResourceClient;
  readonly payments: PaymentsResourceClient;
  readonly sessions: SessionsResourceClient;
  readonly clients: ClientsResourceClient;
  readonly checkout: CheckoutResourceClient;
  readonly integrations: IntegrationsResourceClient;

  websocket(
    options: Omit<PowerPayWebSocketOptions, "url"> & { url?: string } = {},
  ): PowerPayWebSocketClient {
    const apiUrl = new URL(this.config.baseUrl);
    const protocol = apiUrl.protocol === "https:" ? "wss:" : "ws:";
    return new PowerPayWebSocketClient({
      ...options,
      url:
        options.url ??
        `${protocol}//${apiUrl.host}/api/v1/ws`,
    });
  }

  constructor(readonly config: PowerPaySdkConfig) {
    this.transport = new PowerPayHttpTransport(config);
    this.health = new HealthResourceClient(this.transport);
    this.payments = new PaymentsResourceClient(this.transport);
    this.sessions = new SessionsResourceClient(this.transport);
    this.clients = new ClientsResourceClient(this.transport);
    this.checkout = new CheckoutResourceClient(this.transport);
    this.integrations = new IntegrationsResourceClient(this.transport);
  }
}

export function createPowerPaySdk(
  config: PowerPaySdkConfig,
): PowerPaySdk {
  return new PowerPaySdk(config);
}
