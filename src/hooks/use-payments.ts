import type {
  CreatePaymentRequest,
} from "../types/api.js";
import type {
  PowerPayPagination,
  PowerPayRequestContext,
} from "../types/sdk.js";
import { usePowerPaySdk } from "../context/sdk-context.js";
import { useApiResource } from "./use-api-resource.js";

export function usePayment(paymentId?: string) {
  const sdk = usePowerPaySdk();
  return useApiResource(
    (signal) =>
      sdk.payments.retrieve(paymentId!, { signal }),
    [sdk, paymentId],
    { enabled: Boolean(paymentId) },
  );
}

export function usePayments(
  pagination: PowerPayPagination = {},
) {
  const sdk = usePowerPaySdk();
  return useApiResource(
    (signal) =>
      sdk.payments.list(pagination, { signal }),
    [sdk, pagination.cursor, pagination.limit],
  );
}

export function useCreatePayment() {
  const sdk = usePowerPaySdk();

  return async (
    request: CreatePaymentRequest,
    context?: PowerPayRequestContext,
  ) => sdk.payments.create(request, context);
}
