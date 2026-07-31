import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkToolchainIntegrity } from "./lib/toolchain-integrity.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const result = await checkToolchainIntegrity(root);

if (!result.ok) {
  console.error(`PowerPay toolchain is incomplete: ${result.reason}`);
  console.error("Run: npm run install:repair");
  process.exit(1);
}

console.log(`PowerPay toolchain integrity: OK (Vite ${result.viteVersion})`);
