import {
  apiError,
  json,
  methodNotAllowed,
  optionsResponse,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

function paymentFromRequest(
  request: ApiRequest,
  channel: "qr" | "pos",
): ApiResponse {
  const body = request.body as
    | {
        clientId?: string;
        terminalId?: string;
        amount?: string;
        currency?: string;
        settlementAsset?: string;
        memo?: string;
        receiptEmail?: string;
        metadata?: Record<string, unknown>;
      }
    | undefined;

  if (
    !body?.amount ||
    Number(body.amount) <= 0 ||
    !body.currency ||
    !body.settlementAsset
  ) {
    return apiError(
      400,
      "INVALID_CHECKOUT_REQUEST",
      "amount, currency, and settlementAsset are required",
      undefined,
      request,
    );
  }

  const id = `pay_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  const payment = {
    id,
    status: "pending",
    channel,
    money: {
      amount: body.amount,
      currency: body.currency,
    },
    settlement: {
      chain: "powerchain",
      asset: body.settlementAsset,
    },
    client: body.clientId ? { id: body.clientId } : undefined,
    memo: body.memo,
    qrPayload:
      channel === "qr"
        ? `powerpay:${id}?amount=${encodeURIComponent(body.amount)}`
        : undefined,
    checkoutUrl: `/checkout/${id}`,
    createdAt: now,
    updatedAt: now,
    expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    metadata: {
      terminalId: body.terminalId,
      receiptEmail: body.receiptEmail,
      ...body.metadata,
    },
  };

  return json(201, payment, request);
}

export function qrPaymentsRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "POST") {
    return methodNotAllowed(request, ["POST", "OPTIONS"]);
  }
  return paymentFromRequest(request, "qr");
}

export function posChargesRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "POST") {
    return methodNotAllowed(request, ["POST", "OPTIONS"]);
  }
  return paymentFromRequest(request, "pos");
}

export function posTerminalsRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  return json(
    200,
    {
      data: [
        {
          id: "terminal_main",
          name: "Main counter",
          merchantId: "merchant_demo",
          location: "PowerChain Labs",
          status: "online",
          capabilities: ["qr", "nfc", "link", "wallet"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      hasMore: false,
    },
    request,
  );
}
