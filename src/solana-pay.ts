import { PublicKey } from "@solana/web3.js";

export interface SolanaPayTransferRequest {
  recipient: PublicKey;
  amount?: string | number;
  splToken?: PublicKey;
  reference?: PublicKey | PublicKey[];
  label?: string;
  message?: string;
  memo?: string;
}

function decimalAmount(value: string | number): string {
  const text = String(value);
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(text)) throw new Error("Solana Pay amount must be a non-negative decimal without scientific notation");
  return text;
}

export function createSolanaPayUrl(request: SolanaPayTransferRequest): URL {
  const url = new URL(`solana:${request.recipient.toBase58()}`);
  if (request.amount !== undefined) url.searchParams.set("amount", decimalAmount(request.amount));
  if (request.splToken) url.searchParams.set("spl-token", request.splToken.toBase58());
  const refs = request.reference ? (Array.isArray(request.reference) ? request.reference : [request.reference]) : [];
  refs.forEach((ref) => url.searchParams.append("reference", ref.toBase58()));
  if (request.label) url.searchParams.set("label", request.label);
  if (request.message) url.searchParams.set("message", request.message);
  if (request.memo) url.searchParams.set("memo", request.memo);
  return url;
}

export function createSolanaPayTransactionRequest(endpoint: string, label?: string, message?: string): URL {
  const url = new URL(`solana:${endpoint}`);
  if (!/^https:\/\//.test(endpoint)) throw new Error("Transaction request endpoint must use HTTPS");
  if (label) url.searchParams.set("label", label);
  if (message) url.searchParams.set("message", message);
  return url;
}
