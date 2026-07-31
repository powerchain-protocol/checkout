import { existsSync, readFileSync } from "node:fs";

for (const path of [
  ".dockerignore",
  "src/programs/registry.ts",
  "app/src/hooks/use-runtime-status.ts",
]) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const index = readFileSync("src/index.ts", "utf8");
for (const forbidden of [
  'export * from "./utils/index.js";',
]) {
  if (index.includes(forbidden)) {
    throw new Error(`Ambiguous root export remains: ${forbidden}`);
  }
}

const history = readFileSync("src/solana/history.ts", "utf8");
if (history.includes("const requested = finality;")) {
  throw new Error("Solana history still references an undefined finality");
}

const solanaPayments = readFileSync(
  "src/solana/solana-payments.ts",
  "utf8",
);
if (!solanaPayments.includes("toFinality(commitment)")) {
  throw new Error("Solana Pay does not normalize Commitment to Finality");
}

const shared = readFileSync("app/api/v1/_shared.ts", "utf8");
if (!shared.includes('??\n    "POST"')) {
  throw new Error("CORS preflight fallback method is missing");
}

console.log("Release failure fixes: OK");
