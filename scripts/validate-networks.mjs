import { readFileSync } from "node:fs";

const files = [
  "src/clusters/solana.ts",
  "src/clusters/sui.ts",
];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const required of ["rpcUrl", "explorerUrl", "nativeCurrency"]) {
    if (!source.includes(required)) {
      throw new Error(`${file} is missing ${required}`);
    }
  }
}

console.log("Network definitions: OK");
