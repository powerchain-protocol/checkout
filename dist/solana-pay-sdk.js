import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
export function encodePowerPayTransferRequest(request) {
    const fields = {
        recipient: request.recipient,
        amount: new BigNumber(request.amount),
        splToken: request.splToken,
        reference: request.reference,
        label: request.label ?? "PowerPay",
        message: request.message,
        memo: request.memo,
    };
    return encodeURL(fields);
}
//# sourceMappingURL=solana-pay-sdk.js.map