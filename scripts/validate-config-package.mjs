import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");

function repositoryPath(relativePath) {
  return resolve(repositoryRoot, relativePath);
}

for (const relativePath of [
  "packages/config/install-scripts-policy.json",
  "packages/config/src/workspace.js",
]) {
  const path = repositoryPath(relativePath);
  if (!existsSync(path)) {
    throw new Error(`Config package missing ${relativePath}`);
  }
}

const policy = JSON.parse(
  readFileSync(
    repositoryPath("packages/config/install-scripts-policy.json"),
    "utf8",
  ),
);

if (!policy || typeof policy !== "object" || Array.isArray(policy)) {
  throw new Error("Install script policy must be an object");
}

console.log("PowerPay config package: OK");
