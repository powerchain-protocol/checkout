import type {
  CreatePosChargeRequest,
  CreateQrPaymentRequest,
} from "../api/resources.js";
import { usePowerPaySdk } from "../context/sdk-context.js";
import type {
  PowerPayRequestContext,
} from "../types/sdk.js";

export function useCheckoutActions() {
  const sdk = usePowerPaySdk();

  return {
    createQrPayment: (
      request: CreateQrPaymentRequest,
      context?: PowerPayRequestContext,
    ) => sdk.checkout.createQrPayment(request, context),

    createPosCharge: (
      request: CreatePosChargeRequest,
      context?: PowerPayRequestContext,
    ) => sdk.checkout.createPosCharge(request, context),

    listTerminals: (context?: PowerPayRequestContext) =>
      sdk.checkout.terminals(context),
  };
}
