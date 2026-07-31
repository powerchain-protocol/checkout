import { readFileSync } from "node:fs";

const source = readFileSync("src/programs/registry.ts", "utf8");
for (const marker of [
  "POWERPAY_PROGRAM_ID",
  "POWERCHAIN_PROGRAM_ID",
  "POWERPAY_PROGRAM_IDS",
  "PowerPayProgramName",
]) {
  if (!source.includes(marker)) {
    throw new Error(`Program registry missing ${marker}`);
  }
}
if (source.includes('import { PROGRAM_IDS }')) {
  throw new Error("Program registry still imports nonexistent PROGRAM_IDS");
}

console.log("Program registry exports: OK");
