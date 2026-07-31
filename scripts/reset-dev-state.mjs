import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

for (const relative of [
  "app/node_modules/.vite",
  "node_modules/.vite",
  "app/dist",
]) {
  const path = resolve(root, relative);
  rmSync(path, { recursive: true, force: true });
  console.log(`Removed ${path}`);
}

console.log("");
console.log("Development state reset.");
console.log("Start from a new terminal:");
console.log(`  cd ${root}`);
console.log("  npm run dev");
