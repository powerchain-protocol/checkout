import {
  POWERPAY_API_ROUTES,
} from "../constants/routes.js";
import type {
  PowerPayPage,
  PowerPayPagination,
  PowerPayRequestContext,
} from "../types/sdk.js";
import type {
  CheckoutSessionResource,
  ClientResource,
  IntegrationResource,
  PaymentResource,
  PosTerminalResource,
} from "../types/resources.js";
import type {
  CreatePaymentRequest,
  CreateSessionRequest,
  HealthResponse,
} from "../types/api.js";
import type { PowerPayHttpTransport } from "./transport.js";

export interface CreateClientRequest {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  walletAddress?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateQrPaymentRequest {
  clientId?: string;
  amount: string;
  currency: string;
  settlementAsset: string;
  memo?: string;
  expiresInSeconds?: number;
  metadata?: Record<string, unknown>;
}

export interface CreatePosChargeRequest {
  terminalId?: string;
  clientId?: string;
  amount: string;
  currency: string;
  settlementAsset: string;
  receiptEmail?: string;
  metadata?: Record<string, unknown>;
}

export class HealthResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  get(context?: PowerPayRequestContext): Promise<HealthResponse> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.health },
      context,
    );
  }
}

export class PaymentsResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  create(
    request: CreatePaymentRequest,
    context?: PowerPayRequestContext,
  ): Promise<PaymentResource> {
    return this.transport.request(
      {
        method: "POST",
        url: POWERPAY_API_ROUTES.payments,
        data: request,
      },
      context,
    );
  }

  retrieve(
    paymentId: string,
    context?: PowerPayRequestContext,
  ): Promise<PaymentResource> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.payment(paymentId),
      },
      context,
    );
  }

  list(
    pagination: PowerPayPagination = {},
    context?: PowerPayRequestContext,
  ): Promise<PowerPayPage<PaymentResource>> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.payments,
        params: pagination,
      },
      context,
    );
  }
}

export class SessionsResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  create(
    request: CreateSessionRequest,
    context?: PowerPayRequestContext,
  ): Promise<CheckoutSessionResource> {
    return this.transport.request(
      {
        method: "POST",
        url: POWERPAY_API_ROUTES.sessions,
        data: request,
      },
      context,
    );
  }

  retrieve(
    sessionId: string,
    context?: PowerPayRequestContext,
  ): Promise<CheckoutSessionResource> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.session(sessionId),
      },
      context,
    );
  }
}

export class ClientsResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  create(
    request: CreateClientRequest,
    context?: PowerPayRequestContext,
  ): Promise<ClientResource> {
    return this.transport.request(
      {
        method: "POST",
        url: POWERPAY_API_ROUTES.clients,
        data: request,
      },
      context,
    );
  }

  retrieve(
    clientId: string,
    context?: PowerPayRequestContext,
  ): Promise<ClientResource> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.client(clientId),
      },
      context,
    );
  }

  list(
    pagination: PowerPayPagination = {},
    context?: PowerPayRequestContext,
  ): Promise<PowerPayPage<ClientResource>> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.clients,
        params: pagination,
      },
      context,
    );
  }
}

export class CheckoutResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  createQrPayment(
    request: CreateQrPaymentRequest,
    context?: PowerPayRequestContext,
  ): Promise<PaymentResource> {
    return this.transport.request(
      {
        method: "POST",
        url: POWERPAY_API_ROUTES.qrPayments,
        data: request,
      },
      context,
    );
  }

  createPosCharge(
    request: CreatePosChargeRequest,
    context?: PowerPayRequestContext,
  ): Promise<PaymentResource> {
    return this.transport.request(
      {
        method: "POST",
        url: POWERPAY_API_ROUTES.posCharges,
        data: request,
      },
      context,
    );
  }

  terminals(
    context?: PowerPayRequestContext,
  ): Promise<PowerPayPage<PosTerminalResource>> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.posTerminals,
      },
      context,
    );
  }
}

export class IntegrationsResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  list(
    context?: PowerPayRequestContext,
  ): Promise<PowerPayPage<IntegrationResource>> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.integrations,
      },
      context,
    );
  }

  retrieve(
    integrationId: string,
    context?: PowerPayRequestContext,
  ): Promise<IntegrationResource> {
    return this.transport.request(
      {
        method: "GET",
        url: POWERPAY_API_ROUTES.integration(integrationId),
      },
      context,
    );
  }
}


export interface CreateRefundRequest {
  paymentId: string;
  amount: string;
  currency?: string;
  reason?: string;
}

export interface CreateWebhookRequest {
  url: string;
  events?: string[];
}

export class RefundsResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  list(context?: PowerPayRequestContext): Promise<PowerPayPage<Record<string, unknown>>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.refunds },
      context,
    );
  }

  create(
    request: CreateRefundRequest,
    context?: PowerPayRequestContext,
  ): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "POST", url: POWERPAY_API_ROUTES.refunds, data: request },
      context,
    );
  }

  retrieve(
    refundId: string,
    context?: PowerPayRequestContext,
  ): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.refund(refundId) },
      context,
    );
  }
}

export class WebhooksResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  list(context?: PowerPayRequestContext): Promise<PowerPayPage<Record<string, unknown>>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.webhooks },
      context,
    );
  }

  create(
    request: CreateWebhookRequest,
    context?: PowerPayRequestContext,
  ): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "POST", url: POWERPAY_API_ROUTES.webhooks, data: request },
      context,
    );
  }

  remove(
    webhookId: string,
    context?: PowerPayRequestContext,
  ): Promise<{ id: string; deleted: boolean }> {
    return this.transport.request(
      { method: "DELETE", url: POWERPAY_API_ROUTES.webhook(webhookId) },
      context,
    );
  }
}

export class SystemResourceClient {
  constructor(private readonly transport: PowerPayHttpTransport) {}

  metrics(context?: PowerPayRequestContext): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.metrics },
      context,
    );
  }

  configuration(context?: PowerPayRequestContext): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.configuration },
      context,
    );
  }

  roles(context?: PowerPayRequestContext): Promise<Record<string, unknown>> {
    return this.transport.request(
      { method: "GET", url: POWERPAY_API_ROUTES.roles },
      context,
    );
  }
}
