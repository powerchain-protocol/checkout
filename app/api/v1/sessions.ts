import { z } from "zod";
import type {
  CreateSessionRequest,
  SessionResponse,
} from "../../../src/types/api.js";
import { createRequestId } from "../../../src/utils/util.js";
import { futureIso } from "../../../src/utils/helpers.js";
import {
  apiError,
  json,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

const sessions = new Map<string, SessionResponse>();

const createSessionSchema = z.object({
  merchant: z.string().min(32),
  orderId: z.string().min(1).max(128),
  amount: z.string().regex(/^\d+(?:\.\d+)?$/),
  currency: z.string().min(2),
  returnUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  expiresInSeconds: z.number().int().min(60).max(86_400).default(900),
});

export async function sessionsHandler(
  request: ApiRequest,
): Promise<ApiResponse<SessionResponse | unknown>> {
  if (request.method !== "POST") {
    return methodNotAllowed(request, ["POST", "OPTIONS"]);
  }

  const parsed = createSessionSchema.safeParse(request.body);
  if (!parsed.success) {
    return apiError(
      400,
      "INVALID_SESSION",
      "Checkout session validation failed",
      parsed.error.flatten(),
      request,
    );
  }

  const input = parsed.data as CreateSessionRequest & {
    expiresInSeconds: number;
  };
  const id = createRequestId("cs");
  const createdAt = new Date().toISOString();
  const apiOrigin =
    process.env.POWERPAY_CHECKOUT_ORIGIN ?? "http://localhost:5173";

  const session: SessionResponse = {
    id,
    status: "active",
    merchant: input.merchant,
    orderId: input.orderId,
    amount: input.amount,
    currency: input.currency,
    checkoutUrl: `${apiOrigin.replace(/\/$/, "")}/checkout/${id}`,
    returnUrl: input.returnUrl,
    cancelUrl: input.cancelUrl,
    metadata: input.metadata,
    createdAt,
    expiresAt: futureIso(input.expiresInSeconds),
  };

  sessions.set(id, session);
  return json(201, session, request);
}

export async function sessionHandler(
  request: ApiRequest,
): Promise<ApiResponse<SessionResponse | unknown>> {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  const id = request.params?.sessionId;
  if (!id) {
    return apiError(
      400,
      "SESSION_ID_REQUIRED",
      "A sessionId route parameter is required",
      undefined,
      request,
    );
  }

  const session = sessions.get(id);
  if (!session) {
    return apiError(
      404,
      "SESSION_NOT_FOUND",
      "Checkout session was not found",
      { sessionId: id },
      request,
    );
  }

  if (
    session.status === "active" &&
    Date.parse(session.expiresAt) <= Date.now()
  ) {
    session.status = "expired";
  }

  return json(200, session, request);
}
