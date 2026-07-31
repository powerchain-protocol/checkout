import { rmSync } from "node:fs";

for (const path of [
  "node_modules",
  "app/node_modules",
  "package-lock.json",
  "app/package-lock.json",
]) {
  rmSync(path, { recursive: true, force: true });
  console.log(`Removed ${path}`);
}
