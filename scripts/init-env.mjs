import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const root = process.cwd();
const source = resolve(root, ".env.example");
const destination = resolve(root, ".env.local");

if (!existsSync(resolve(root, "package.json")) || !existsSync(source)) {
  console.error("PowerPay environment setup must be run from the repository root.");
  console.error(`Current directory: ${root}`);
  console.error("Expected to find package.json and .env.example.");
  process.exit(1);
}

if (existsSync(destination)) {
  console.log(".env.local already exists; no changes made.");
  process.exit(0);
}

copyFileSync(source, destination);
console.log("Created .env.local from .env.example.");
console.log("Review RPC URLs, program IDs, mint addresses, and API keys before starting the app.");
