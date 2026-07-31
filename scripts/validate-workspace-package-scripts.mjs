import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");

for (const relativePath of [
  "packages/config/package.json",
  "packages/sdk/powerpay/ui/package.json",
]) {
  const manifest = JSON.parse(
    readFileSync(resolve(repositoryRoot, relativePath), "utf8"),
  );

  for (const script of ["typecheck", "test", "validate"]) {
    if (!manifest.scripts?.[script]) {
      throw new Error(`${relativePath} missing scripts.${script}`);
    }
  }
}

console.log("Workspace package scripts: OK");
