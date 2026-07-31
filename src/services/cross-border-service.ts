import type { PublicKey } from "@solana/web3.js";
import type { CurrencyCode } from "../types/common.js";
import {
  CircleCctpClient,
  waitForCctpAttestation,
} from "../lib/circle.js";
import { requireTrustedToken } from "../lib/trusted-tokens.js";

export interface CrossBorderQuote {
  id: string;
  sourceNetwork: string;
  destinationNetwork: string;
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  sourceAmount: string;
  estimatedDestinationAmount: string;
  feeAmount: string;
  route: "cctp" | "local-settlement";
  expiresAt: string;
}

export interface CrossBorderTransfer {
  id: string;
  quoteId: string;
  status:
    | "created"
    | "source-submitted"
    | "attesting"
    | "destination-ready"
    | "completed"
    | "failed";
  sourceSignature?: string;
  cctpMessageHash?: string;
  attestation?: string;
  destinationSignature?: string;
}

export class CrossBorderPaymentService {
  constructor(readonly circle = new CircleCctpClient()) {}

  validateUsdcMint(mint: PublicKey): void {
    const token = requireTrustedToken(mint.toBase58());
    if (token.symbol !== "USDC" || !token.stable) {
      throw new Error("CCTP routes require an approved native USDC mint");
    }
  }

  async awaitAttestation(
    transfer: CrossBorderTransfer,
  ): Promise<CrossBorderTransfer> {
    if (!transfer.cctpMessageHash) {
      throw new Error("Transfer has no CCTP message hash");
    }

    const result = await waitForCctpAttestation({
      client: this.circle,
      messageHash: transfer.cctpMessageHash,
    });

    return {
      ...transfer,
      status: "destination-ready",
      attestation: result.attestation,
    };
  }
}
