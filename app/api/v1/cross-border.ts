import { z } from "zod";
import { createId } from "../../../src/utils/id.js";
import { apiError, json, type ApiRequest } from "./_shared.js";

const schema = z.object({
  sourceNetwork: z.string().min(2),
  destinationNetwork: z.string().min(2),
  currency: z.literal("USDC"),
  amount: z.string().regex(/^\d+(?:\.\d+)?$/),
  recipient: z.string().min(10),
});

export async function createCrossBorderHandler(request: ApiRequest) {
  if (request.method !== "POST") {
    return apiError(405, "METHOD_NOT_ALLOWED", "Use POST");
  }

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return apiError(
      400,
      "INVALID_REQUEST",
      "Cross-border request is invalid",
      parsed.error.flatten(),
    );
  }

  return json(201, {
    id: createId("xfer"),
    status: "created",
    route: "cctp",
    ...parsed.data,
    createdAt: new Date().toISOString(),
  });
}
