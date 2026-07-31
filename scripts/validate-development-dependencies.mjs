import { existsSync } from "node:fs";
import { resolve } from "node:path";

const required = [
  ["TypeScript", "node_modules/typescript/bin/tsc"],
  ["Node types", "node_modules/@types/node/package.json"],
  ["Vitest", "node_modules/vitest/package.json"],
  ["Vite client types", "node_modules/vite/client.d.ts"],
];

const missing = required.filter(([, path]) => !existsSync(resolve(path)));

if (missing.length > 0) {
  console.error("PowerPay development dependencies are incomplete:");
  for (const [label, path] of missing) {
    console.error(`  - ${label}: ${path}`);
  }
  console.error(
    "\nRun `npm install` at the repository root before typechecking or testing.",
  );
  process.exit(1);
}

console.log("Development dependencies: OK");
