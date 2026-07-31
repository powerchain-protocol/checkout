import { rmSync } from "node:fs";
import {
  assertNotActiveDirectory,
  assertRepositoryPath,
  repositoryRoot,
} from "./lib/safe-paths.mjs";

const root = repositoryRoot(import.meta.url);

for (const relativePath of [
  "app/node_modules/.vite",
  "node_modules/.vite",
  "app/.vite",
  "app/dist",
]) {
  const target = assertRepositoryPath(root, relativePath, "development reset target");
  assertNotActiveDirectory(target, root);
  rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}

console.log("");
console.log("Development state reset safely.");
console.log(`Repository: ${root}`);
console.log("Start with: npm run dev");
