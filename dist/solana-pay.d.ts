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
export declare function createSolanaPayUrl(request: SolanaPayTransferRequest): URL;
export declare function createSolanaPayTransactionRequest(endpoint: string, label?: string, message?: string): URL;
//# sourceMappingURL=solana-pay.d.ts.map