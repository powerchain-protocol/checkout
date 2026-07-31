import BigNumber from "bignumber.js";
import QRCode from "qrcode";
import {
  encodeURL,
  findReference,
  validateTransfer,
  type FindReferenceError,
} from "@solana/pay";
import {
  Connection,
  Keypair,
  PublicKey,
  type Commitment,
  type ConfirmedSignatureInfo,
} from "@solana/web3.js";
import { resolveMintInfo } from "./validation.js";
import { parseUiAmount } from "./amounts.js";

export interface SolanaPayRequest {
  recipient: PublicKey;
  amount: string | number;
  splToken?: PublicKey;
  reference?: PublicKey;
  label?: string;
  message?: string;
  memo?: string;
}

export interface EncodedSolanaPayRequest {
  url: URL;
  reference: PublicKey;
  amount: BigNumber;
  qrDataUrl: string;
}

export async function createSolanaPayRequest(
  connection: Connection,
  request: SolanaPayRequest,
): Promise<EncodedSolanaPayRequest> {
  const reference = request.reference ?? Keypair.generate().publicKey;
  const amount = new BigNumber(String(request.amount));

  if (!amount.isFinite() || !amount.isPositive()) {
    throw new Error("Solana Pay amount must be a positive decimal");
  }

  if (request.splToken) {
    const { decimals } = await resolveMintInfo(connection, request.splToken);
    parseUiAmount(amount.toFixed(), decimals);
  } else {
    parseUiAmount(amount.toFixed(), 9);
  }

  const url = encodeURL({
    recipient: request.recipient,
    amount,
    splToken: request.splToken,
    reference,
    label: request.label,
    message: request.message,
    memo: request.memo,
  });

  return {
    url,
    reference,
    amount,
    qrDataUrl: await QRCode.toDataURL(url.toString(), {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 512,
    }),
  };
}

export async function waitForSolanaPayPayment(params: {
  connection: Connection;
  reference: PublicKey;
  recipient: PublicKey;
  amount: string | number;
  splToken?: PublicKey;
  commitment?: Commitment;
  intervalMs?: number;
  timeoutMs?: number;
}): Promise<ConfirmedSignatureInfo> {
  const commitment = params.commitment ?? "confirmed";
  const started = Date.now();
  const amount = new BigNumber(String(params.amount));

  while (Date.now() - started < (params.timeoutMs ?? 120_000)) {
    try {
      const signatureInfo = await findReference(
        params.connection,
        params.reference,
        { finality: commitment },
      );

      await validateTransfer(
        params.connection,
        signatureInfo.signature,
        {
          recipient: params.recipient,
          amount,
          splToken: params.splToken,
          reference: params.reference,
        },
        { commitment },
      );

      return signatureInfo;
    } catch (error) {
      const name = (error as FindReferenceError)?.name;
      if (name !== "FindReferenceError") {
        throw error;
      }
    }

    await new Promise((resolve) =>
      setTimeout(resolve, params.intervalMs ?? 1_000),
    );
  }

  throw new Error("Timed out waiting for the Solana Pay transaction");
}
