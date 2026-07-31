import { existsSync, readFileSync } from "node:fs";

const required = [
  ".dockerignore",
  "Dockerfile",
  "compose.yaml",
  "docker/nginx.conf",
  "src/index.ts",
  "src/config/networks.ts",
  "src/solana/history.ts",
  "src/solana/solana-payments.ts",
  "scripts/run-vite-safe.mjs",
  ".github/workflows/ci.yml",
  "scripts/validate-local-sdk-link.mjs",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Production file missing: ${path}`);
}

const index = readFileSync("src/index.ts", "utf8");
if (index.includes('export * from "./validate.js"')) {
  throw new Error("Root exports still expose validation through a collision-prone wildcard");
}
if (index.includes('export * from "./lib/index.js"')) {
  throw new Error("Root exports still expose lib through a collision-prone wildcard");
}

if (!index.includes("PowerPayApiClient")) {
  throw new Error("Root SDK export is missing PowerPayApiClient");
}

const constants = readFileSync("src/constants/sdk.ts", "utf8");
if (constants.includes("export { POWERPAY_SDK_VERSION }")) {
  throw new Error("SDK version is re-exported from multiple root paths");
}

const cors = readFileSync("app/api/v1/_shared.ts", "utf8");
for (const method of ["HEAD", "PUT", "OPTIONS"]) {
  if (!cors.includes(`"${method}"`)) {
    throw new Error(`CORS method list missing ${method}`);
  }
}

const launcher = readFileSync("scripts/run-vite-safe.mjs", "utf8");
for (const marker of [
  "availablePort",
  "process.chdir(repositoryRoot)",
  "PWD: repositoryRoot",
  "INIT_CWD: repositoryRoot",
  "ROLldown".toUpperCase().slice(0, 0),
]) {
  if (marker && !launcher.includes(marker)) {
    throw new Error(`Safe Vite launcher missing ${marker}`);
  }
}

const dockerignore = readFileSync(".dockerignore", "utf8");
for (const marker of ["node_modules", ".git", ".env", "target"]) {
  if (!dockerignore.includes(marker)) {
    throw new Error(`.dockerignore missing ${marker}`);
  }
}

console.log("Production readiness structure: OK");
