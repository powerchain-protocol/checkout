import axios, { type AxiosInstance } from "axios";
import {
  Connection,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { concatBytes, u32LE, u64LE } from "../solana/bytes.js";

export type CircleCctpEnvironment = "testnet" | "mainnet";

export const CCTP_SOLANA = {
  testnet: {
    domain: 5,
    messageTransmitterV2:
      "CCTPV2Sm4AdWt5296sk4P66VBZ7bEhcARwFaaS9YPbeC",
    tokenMessengerMinterV2:
      "CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe",
  },
} as const;

export interface CircleCctpClientOptions {
  environment?: CircleCctpEnvironment;
  irisBaseUrl?: string;
}

export interface CctpAttestationResponse {
  status: "pending_confirmations" | "complete";
  attestation?: string;
  message?: string;
}

export class CircleCctpClient {
  readonly environment: CircleCctpEnvironment;
  readonly iris: AxiosInstance;

  constructor(options: CircleCctpClientOptions = {}) {
    this.environment = options.environment ?? "testnet";
    this.iris = axios.create({
      baseURL:
        options.irisBaseUrl ??
        (this.environment === "mainnet"
          ? "https://iris-api.circle.com"
          : "https://iris-api-sandbox.circle.com"),
      timeout: 20_000,
    });
  }

  async attestation(messageHash: string): Promise<CctpAttestationResponse> {
    if (!/^0x[0-9a-f]{64}$/i.test(messageHash)) {
      throw new Error("CCTP message hash must be a 32-byte hex value");
    }
    const { data } = await this.iris.get<CctpAttestationResponse>(
      `/v2/messages/${messageHash}`,
    );
    return data;
  }
}

export interface DepositForBurnInstructionInput {
  programId: PublicKey;
  owner: PublicKey;
  eventAuthority: PublicKey;
  senderAuthority: PublicKey;
  messageTransmitter: PublicKey;
  tokenMessenger: PublicKey;
  tokenMinter: PublicKey;
  localToken: PublicKey;
  burnTokenAccount: PublicKey;
  messageSentEventData: PublicKey;
  amount: bigint;
  destinationDomain: number;
  mintRecipient: Uint8Array;
}

export function createDepositForBurnInstruction(
  input: DepositForBurnInstructionInput,
): TransactionInstruction {
  if (input.amount <= 0n) throw new Error("CCTP amount must be positive");
  if (input.mintRecipient.length !== 32) {
    throw new Error("CCTP mint recipient must contain 32 bytes");
  }

  // This is an integration boundary, not a hand-maintained replacement for
  // Circle's audited client bindings. The discriminator must come from the
  // deployed IDL/client package before submitting this instruction.
  throw new Error(
    "Use Circle's current Solana CCTP V2 IDL/client bindings to construct deposit_for_burn; raw construction is intentionally disabled",
  );
}

export async function waitForCctpAttestation(params: {
  client: CircleCctpClient;
  messageHash: string;
  intervalMs?: number;
  timeoutMs?: number;
}): Promise<CctpAttestationResponse> {
  const started = Date.now();
  while (Date.now() - started < (params.timeoutMs ?? 10 * 60_000)) {
    const result = await params.client.attestation(params.messageHash);
    if (result.status === "complete" && result.attestation) return result;
    await new Promise((resolve) =>
      setTimeout(resolve, params.intervalMs ?? 3_000),
    );
  }
  throw new Error("Timed out waiting for Circle CCTP attestation");
}
