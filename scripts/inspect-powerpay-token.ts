#!/usr/bin/env node
import process from "node:process";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, getMint } from "@solana/spl-token";

const mintValue = process.argv[2] ?? process.env.VITE_POWERPAY_TOKEN_MINT;
const rpc = process.argv[3] ?? process.env.VITE_SOLANA_RPC_URL ?? clusterApiUrl("devnet");
if (!mintValue) throw new Error("Usage: npm run token:inspect -- <mint> [rpc]");
const connection = new Connection(rpc, "confirmed");
const mint = await getMint(connection, new PublicKey(mintValue), "confirmed", TOKEN_2022_PROGRAM_ID);
console.log(JSON.stringify({ mint: mintValue, tokenProgram: TOKEN_2022_PROGRAM_ID.toBase58(), decimals: mint.decimals, supplyAtomic: mint.supply.toString(), mintAuthority: mint.mintAuthority?.toBase58() ?? null, freezeAuthority: mint.freezeAuthority?.toBase58() ?? null, initialized: mint.isInitialized }, null, 2));
