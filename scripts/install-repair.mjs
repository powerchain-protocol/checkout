import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

for (const relative of [
  "node_modules",
  "app/node_modules",
  "packages/config/node_modules",
  "packages/sdk/powerpay/ui/node_modules",
  "package-lock.json",
]) {
  const path = resolve(root, relative);
  if (existsSync(path)) {
    console.log(`Removing stale dependency state: ${relative}`);
    rmSync(path, { recursive: true, force: true });
  }
}

const result = spawnSync(
  process.execPath,
  [resolve(root, "scripts/bootstrap-dependencies.mjs")],
  {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
