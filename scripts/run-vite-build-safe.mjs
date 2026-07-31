import { existsSync, realpathSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = realpathSync(resolve(scriptDirectory, ".."));
const appDirectory = realpathSync(resolve(repositoryRoot, "app"));
const vite = [
  resolve(repositoryRoot, "node_modules/vite/bin/vite.js"),
  resolve(appDirectory, "node_modules/vite/bin/vite.js"),
].find(existsSync);

if (!vite) {
  console.error("Vite is not installed. Run `npm install` at the repository root.");
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  [vite, "build", "--config", resolve(appDirectory, "vite.config.ts")],
  {
    cwd: appDirectory,
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
