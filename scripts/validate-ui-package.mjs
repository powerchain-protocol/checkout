import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");

function repositoryPath(relativePath) {
  return resolve(repositoryRoot, relativePath);
}

for (const relativePath of [
  "packages/sdk/powerpay/ui/src/index.ts",
  "packages/sdk/powerpay/ui/src/styles/powerpay.css",
]) {
  const path = repositoryPath(relativePath);
  if (!existsSync(path)) {
    throw new Error(`UI package missing ${relativePath}`);
  }
}

const source = readFileSync(
  repositoryPath("packages/sdk/powerpay/ui/src/index.ts"),
  "utf8",
);

if (!source.includes("export")) {
  throw new Error("UI package index does not expose any public API");
}

console.log("PowerPay UI package: OK");
