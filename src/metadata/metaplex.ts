import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createV1,
  fetchMetadataFromSeeds,
  mplTokenMetadata,
  TokenStandard,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  generateSigner,
  percentAmount,
  publicKey,
  signerIdentity,
  Umi,
} from "@metaplex-foundation/umi";

export interface FungibleMetadataInput {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints?: number;
}

export function createMetadataUmi(rpcUrl: string): Umi {
  return createUmi(rpcUrl).use(mplTokenMetadata());
}

/**
 * Creates Metaplex Token Metadata for an existing fungible SPL or Token-2022 mint.
 * The caller must install a signer identity with the mint/update authority.
 */
export async function createFungibleTokenMetadata(
  umi: Umi,
  input: FungibleMetadataInput,
) {
  return createV1(umi, {
    mint: publicKey(input.mint),
    authority: umi.identity,
    payer: umi.identity,
    updateAuthority: umi.identity,
    name: input.name,
    symbol: input.symbol,
    uri: input.uri,
    sellerFeeBasisPoints: percentAmount(
      (input.sellerFeeBasisPoints ?? 0) / 100,
      2,
    ),
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);
}

export async function updateFungibleTokenMetadata(
  umi: Umi,
  mint: string,
  updates: Partial<Pick<FungibleMetadataInput, "name" | "symbol" | "uri">>,
) {
  const metadata = await fetchMetadataFromSeeds(umi, {
    mint: publicKey(mint),
  });
  return updateV1(umi, {
    mint: publicKey(mint),
    authority: umi.identity,
    data: {
      ...metadata,
      name: updates.name ?? metadata.name,
      symbol: updates.symbol ?? metadata.symbol,
      uri: updates.uri ?? metadata.uri,
    },
  }).sendAndConfirm(umi);
}
