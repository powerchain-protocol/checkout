import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkToolchainIntegrity } from "./lib/toolchain-integrity.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

function run(args) {
  const result = spawnSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    args,
    {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_OPTIONS:
          process.env.NODE_OPTIONS || "--max-old-space-size=1536",
        npm_config_maxsockets:
          process.env.npm_config_maxsockets || "4",
        npm_config_foreground_scripts: "false",
      },
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const integrity = await checkToolchainIntegrity(root);

if (integrity.ok) {
  console.log(
    `PowerPay dependency toolchain is already installed (Vite ${integrity.viteVersion}).`,
  );
  process.exit(0);
}

console.warn(`PowerPay dependency toolchain needs repair: ${integrity.reason}`);

console.log("Validating local SDK workspace dependency.");
run(["run", "local:sdk:validate"]);

console.log("Installing the PowerPay workspace with reduced concurrency.");
run([
  "install",
  "--workspaces",
  "--include-workspace-root",
  "--no-audit",
  "--no-fund",
]);

console.log("PowerPay dependency bootstrap completed.");
