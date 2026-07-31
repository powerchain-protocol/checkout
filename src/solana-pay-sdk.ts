import { encodeURL, TransferRequestURLFields } from "@solana/pay";
import BigNumber from "bignumber.js";
import { PublicKey } from "@solana/web3.js";

export interface PowerPayTransferRequest {
  recipient: PublicKey;
  amount: string | number;
  splToken?: PublicKey;
  reference?: PublicKey;
  label?: string;
  message?: string;
  memo?: string;
}

export function encodePowerPayTransferRequest(
  request: PowerPayTransferRequest,
): URL {
  const fields: TransferRequestURLFields = {
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
