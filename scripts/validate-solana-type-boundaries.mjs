import { readFileSync } from "node:fs";

const instructions = readFileSync("src/solana/instructions.ts", "utf8");
const history = readFileSync("src/solana/history.ts", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

if (!packageJson.dependencies?.buffer) {
  throw new Error("The buffer package must be a direct dependency");
}

if (!instructions.includes('import { Buffer } from "buffer";')) {
  throw new Error("Solana instruction boundary must import Buffer explicitly");
}

for (const unsafe of [
  "data: u8(",
  "data: concatBytes(",
]) {
  if (instructions.includes(unsafe)) {
    throw new Error(`Unconverted TransactionInstruction data: ${unsafe}`);
  }
}

if (!history.includes("toFinality(params.commitment)")) {
  throw new Error("History reads must narrow Commitment to Finality");
}

if (history.includes('commitment: params.commitment ?? "confirmed"')) {
  throw new Error("Wide Commitment passed to historical transaction API");
}

console.log("Solana type boundaries: OK");
