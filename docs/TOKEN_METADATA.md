# SPL, Token-2022 and Metaplex metadata

PWRP is configured as a Token-2022 asset. The SDK also supports classic SPL Token mints.

The repository includes two metadata layers:

- `public/metadata.json`: web and wallet-facing metadata.
- Metaplex Token Metadata: optional on-chain metadata for wallet and explorer compatibility.

Use `createFungibleTokenMetadata` with a Umi signer identity that controls the mint or update authority. Upload the image and JSON to permanent HTTPS or content-addressed storage before mainnet.
