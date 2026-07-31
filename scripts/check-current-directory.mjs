import { existsSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = realpathSync(resolve(scriptDirectory, ".."));

let currentDirectory;
try {
  currentDirectory = realpathSync(process.cwd());
} catch {
  console.error(
    "The terminal working directory no longer exists. Run:\n" +
    `  ${resolve(repositoryRoot, "scripts/recover-cwd.sh")} npm run dev`,
  );
  process.exit(1);
}

if (!existsSync(resolve(repositoryRoot, "package.json"))) {
  throw new Error(`Invalid repository root: ${repositoryRoot}`);
}

if (
  currentDirectory !== repositoryRoot &&
  !currentDirectory.startsWith(`${repositoryRoot}/`)
) {
  console.warn(`Current directory is outside the repository: ${currentDirectory}`);
}

console.log(`Repository root: ${repositoryRoot}`);
console.log(`Current directory: ${currentDirectory}`);
