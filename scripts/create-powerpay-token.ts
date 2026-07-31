#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountIdempotent,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  getMintLen,
  mintToChecked,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  pack,
  type TokenMetadata,
} from "@solana/spl-token-metadata";

const NAME = "PowerPay";
const SYMBOL = "PWRP";
const DECIMALS = 6;
const DEFAULT_SUPPLY = 1_000_000_000n;

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function hasFlag(name: string): boolean { return process.argv.includes(`--${name}`); }
function loadKeypair(file: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(secret)) throw new Error(`Invalid keypair: ${file}`);
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}
function expandHome(value: string): string {
  return value.startsWith("~/") ? path.join(os.homedir(), value.slice(2)) : value;
}

async function main() {
  const cluster = flag("cluster") ?? "devnet";
  const rpc = flag("rpc") ?? (cluster === "localnet" ? "http://127.0.0.1:8899" : clusterApiUrl(cluster as "devnet" | "testnet" | "mainnet-beta"));
  const payerPath = expandHome(flag("payer") ?? process.env.SOLANA_KEYPAIR ?? "~/.config/solana/id.json");
  const metadataUri = flag("metadata-uri") ?? process.env.PWRP_METADATA_URI;
  const requestedSupply = BigInt(flag("supply") ?? DEFAULT_SUPPLY.toString());
  const dryRun = hasFlag("dry-run");

  if (!metadataUri) throw new Error("Provide --metadata-uri https://.../pwrp.json or set PWRP_METADATA_URI");
  if (!/^https:\/\//.test(metadataUri)) throw new Error("Metadata URI must use HTTPS");
  if (requestedSupply <= 0n || requestedSupply > DEFAULT_SUPPLY) throw new Error("Supply must be between 1 and 1,000,000,000 PWRP");

  const payer = loadKeypair(payerPath);
  const mint = Keypair.generate();
  const connection = new Connection(rpc, "confirmed");
  const metadata: TokenMetadata = {
    mint: mint.publicKey,
    name: NAME,
    symbol: SYMBOL,
    uri: metadataUri,
    additionalMetadata: [
      ["standard", "Token-2022"],
      ["purpose", "PowerPay utility and rewards"],
    ],
  };
  const mintLen = getMintLen([ExtensionType.MetadataPointer]);
  const metadataLen = pack(metadata).length;
  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

  console.log(JSON.stringify({ cluster, rpc, payer: payer.publicKey.toBase58(), mint: mint.publicKey.toBase58(), decimals: DECIMALS, supply: requestedSupply.toString(), metadataUri, standard: "Token-2022", dryRun }, null, 2));
  if (dryRun) return;

  const createTx = new Transaction().add(
    SystemProgram.createAccount({ fromPubkey: payer.publicKey, newAccountPubkey: mint.publicKey, space: mintLen, lamports, programId: TOKEN_2022_PROGRAM_ID }),
    createInitializeMetadataPointerInstruction(mint.publicKey, payer.publicKey, mint.publicKey, TOKEN_2022_PROGRAM_ID),
    createInitializeMintInstruction(mint.publicKey, DECIMALS, payer.publicKey, payer.publicKey, TOKEN_2022_PROGRAM_ID),
    createInitializeInstruction({ programId: TOKEN_2022_PROGRAM_ID, metadata: mint.publicKey, updateAuthority: payer.publicKey, mint: mint.publicKey, mintAuthority: payer, name: NAME, symbol: SYMBOL, uri: metadataUri }),
  );
  const createSignature = await sendAndConfirmTransaction(connection, createTx, [payer, mint], { commitment: "confirmed" });
  const ata = await createAssociatedTokenAccountIdempotent(connection, payer, mint.publicKey, payer.publicKey, {}, TOKEN_2022_PROGRAM_ID);
  const atomicSupply = requestedSupply * 10n ** BigInt(DECIMALS);
  const mintSignature = await mintToChecked(connection, payer, mint.publicKey, ata, payer, atomicSupply, DECIMALS, [], {}, TOKEN_2022_PROGRAM_ID);

  const deployment = { name: NAME, symbol: SYMBOL, mint: mint.publicKey.toBase58(), tokenProgram: TOKEN_2022_PROGRAM_ID.toBase58(), decimals: DECIMALS, uiSupply: requestedSupply.toString(), atomicSupply: atomicSupply.toString(), treasuryTokenAccount: ata.toBase58(), cluster, rpc, metadataUri, createSignature, mintSignature, createdAt: new Date().toISOString(), mintAuthority: payer.publicKey.toBase58(), freezeAuthority: payer.publicKey.toBase58() };
  fs.mkdirSync("deployments", { recursive: true });
  fs.writeFileSync(`deployments/pwrp-${cluster}.json`, JSON.stringify(deployment, null, 2) + "\n");
  console.log(`\nCreated ${NAME} (${SYMBOL}) mint: ${deployment.mint}`);
  console.log(`Deployment manifest: deployments/pwrp-${cluster}.json`);
  console.log("Review governance and custody before revoking either authority.");
}

main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
