import { z } from "zod";
import { Keypair, PublicKey } from "@solana/web3.js";
import type {
  CreatePaymentRequest,
  PaymentResponse,
} from "../../../src/types/api.js";
import { createRpcConnection } from "../../../src/lib/rpc.js";
import { createSolanaPayRequest } from "../../../src/solana/solana-payments.js";
import { createRequestId } from "../../../src/utils/util.js";
import { futureIso } from "../../../src/utils/helpers.js";
import {
  apiError,
  json,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

const schema = z.object({
  merchant: z.string().min(32),
  amount: z.string().regex(/^\d+(?:\.\d+)?$/),
  currency: z.string().min(2),
  mint: z.string().optional(),
  orderId: z.string().min(1).max(128),
  label: z.string().max(64).optional(),
  message: z.string().max(256).optional(),
  memo: z.string().max(566).optional(),
  expiresInSeconds: z.number().int().min(60).max(86_400).default(900),
});

export async function createPaymentHandler(
  request: ApiRequest,
): Promise<ApiResponse<PaymentResponse | unknown>> {
  if (request.method !== "POST") {
    return apiError(405, "METHOD_NOT_ALLOWED", "Use POST for this endpoint");
  }

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return apiError(
      400,
      "INVALID_REQUEST",
      "Payment request validation failed",
      parsed.error.flatten(),
    );
  }

  try {
    const body = parsed.data as CreatePaymentRequest & {
      expiresInSeconds: number;
    };
    const connection = createRpcConnection({
      cluster:
        (process.env.POWERPAY_CLUSTER as
          | "devnet"
          | "testnet"
          | "mainnet-beta"
          | "localnet") ?? "devnet",
      endpoint: process.env.POWERPAY_RPC_URL,
    });
    const reference = Keypair.generate().publicKey;
    const requestData = await createSolanaPayRequest(connection, {
      recipient: new PublicKey(body.merchant),
      amount: body.amount,
      splToken: body.mint ? new PublicKey(body.mint) : undefined,
      reference,
      label: body.label,
      message: body.message,
      memo: body.memo,
    });

    const createdAt = new Date().toISOString();
    return json(201, {
      id: createRequestId("pay"),
      orderId: body.orderId,
      merchant: body.merchant,
      amount: body.amount,
      currency: body.currency,
      mint: body.mint,
      status: "pending",
      reference: reference.toBase58(),
      paymentUrl: requestData.url.toString(),
      qrDataUrl: requestData.qrDataUrl,
      createdAt,
      expiresAt: futureIso(body.expiresInSeconds),
    });
  } catch (cause) {
    return apiError(
      500,
      "PAYMENT_CREATION_FAILED",
      cause instanceof Error ? cause.message : "Payment creation failed",
    );
  }
}
