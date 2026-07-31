import { readFileSync } from "node:fs";

const bootstrap = readFileSync("scripts/bootstrap-dependencies.mjs", "utf8");
if (bootstrap.includes("npm_config_jobs")) {
  throw new Error("Unsupported npm_config_jobs remains in bootstrap");
}
if (!bootstrap.includes("checkToolchainIntegrity")) {
  throw new Error("Bootstrap does not verify toolchain integrity");
}

const launcher = readFileSync("scripts/run-vite-safe.mjs", "utf8");
if (!launcher.includes("corrupted Vite installation")) {
  throw new Error("Vite launcher does not detect corruption");
}

const manifest = JSON.parse(readFileSync("package.json", "utf8"));
for (const script of ["toolchain:check", "toolchain:repair"]) {
  if (!manifest.scripts?.[script]) {
    throw new Error(`Missing scripts.${script}`);
  }
}

console.log("Toolchain recovery configuration: OK");
