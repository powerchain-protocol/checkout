import { Umi } from "@metaplex-foundation/umi";
export interface FungibleMetadataInput {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints?: number;
}
export declare function createMetadataUmi(rpcUrl: string): Umi;
/**
 * Creates Metaplex Token Metadata for an existing fungible SPL or Token-2022 mint.
 * The caller must install a signer identity with the mint/update authority.
 */
export declare function createFungibleTokenMetadata(umi: Umi, input: FungibleMetadataInput): Promise<{
    signature: import("@metaplex-foundation/umi").TransactionSignature;
    result: import("@metaplex-foundation/umi").RpcConfirmTransactionResult;
}>;
export declare function updateFungibleTokenMetadata(umi: Umi, mint: string, updates: Partial<Pick<FungibleMetadataInput, "name" | "symbol" | "uri">>): Promise<{
    signature: import("@metaplex-foundation/umi").TransactionSignature;
    result: import("@metaplex-foundation/umi").RpcConfirmTransactionResult;
}>;
//# sourceMappingURL=metaplex.d.ts.map