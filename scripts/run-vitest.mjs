import { existsSync, realpathSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = realpathSync(resolve(scriptDirectory, ".."));
const executable = [
  resolve(repositoryRoot, "node_modules/vitest/vitest.mjs"),
  resolve(repositoryRoot, "node_modules/vitest/dist/cli.js"),
].find(existsSync);

if (!executable) {
  console.error(
    "Vitest is not installed. Run `npm install` at the repository root.",
  );
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  [executable, "run", ...process.argv.slice(2)],
  {
    cwd: repositoryRoot,
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
