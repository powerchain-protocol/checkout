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
export declare function encodePowerPayTransferRequest(request: PowerPayTransferRequest): URL;
//# sourceMappingURL=solana-pay-sdk.d.ts.map