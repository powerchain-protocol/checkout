import { PublicKey } from "@solana/web3.js";
export type CctpEnvironment = "mainnet" | "devnet";
export declare const SOLANA_CCTP_DOMAIN = 5;
export declare const CCTP_V2_PROGRAMS: {
    readonly mainnet: {
        readonly messageTransmitter: PublicKey;
        readonly tokenMessengerMinter: PublicKey;
    };
    readonly devnet: {
        readonly messageTransmitter: PublicKey;
        readonly tokenMessengerMinter: PublicKey;
    };
};
export interface CctpTransferQuote {
    amount: bigint;
    maxFee: bigint;
    destinationDomain: number;
    minFinalityThreshold: number;
}
export declare function calculateCctpMaxFee(amount: bigint, feeBps: number, minimumAtomic?: bigint): bigint;
export declare class CctpAttestationClient {
    private readonly endpoint;
    constructor(endpoint?: string);
    fetchMessage(messageHash: string, fetchImpl?: typeof fetch): Promise<unknown>;
}
