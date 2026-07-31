import { existsSync, readFileSync } from "node:fs";

for (const path of [
  "program-ids.json",
  "src/program-ids.ts",
  "src/programs/registry.ts",
  "scripts/sync-program-ids.mjs",
]) {
  if (!existsSync(path)) throw new Error(`Missing program layer file: ${path}`);
}

const registry = readFileSync("src/programs/registry.ts", "utf8");
for (const marker of [
  "PowerPayProgramDefinition",
  "powerPayProgram",
  "listPowerPayPrograms",
]) {
  if (!registry.includes(marker)) {
    throw new Error(`Program registry missing ${marker}`);
  }
}

const index = readFileSync("src/index.ts", "utf8");
if (!index.includes("./programs/index.js")) {
  throw new Error("SDK does not export the program registry");
}

console.log("PowerPay program layer: OK");
