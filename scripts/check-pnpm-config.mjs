import { readFileSync } from "node:fs";

const workspace = readFileSync("pnpm-workspace.yaml", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

const allowed = [
  "@stellar/stellar-sdk",
  "bigint-buffer",
  "blake-hash",
  "bufferutil",
  "protobufjs",
  "tiny-secp256k1",
  "usb",
  "utf-8-validate",
];

for (const dependency of allowed) {
  if (
    !workspace.includes(`${dependency}: true`) &&
    !workspace.includes(`"${dependency}": true`)
  ) {
    throw new Error(`Missing allowBuilds entry for ${dependency}`);
  }
}

if (!packageJson.packageManager?.startsWith("pnpm@")) {
  throw new Error("packageManager must pin pnpm");
}
if (!packageJson.dependencies?.dotenv) {
  throw new Error("dotenv must be in dependencies");
}

console.log("pnpm configuration: OK");
