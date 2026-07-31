import { existsSync, readFileSync, statSync } from "node:fs";

const required = [
  "scripts/lib/safe-paths.mjs",
  "scripts/dev.sh",
  "scripts/dev-app.sh",
  "scripts/recover-cwd.sh",
  ".devcontainer/devcontainer.json",
  ".vscode/tasks.json",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

for (const path of [
  "scripts/dev.sh",
  "scripts/dev-app.sh",
  "scripts/recover-cwd.sh",
]) {
  if ((statSync(path).mode & 0o111) === 0) {
    throw new Error(`${path} is not executable`);
  }
}

for (const path of [
  "scripts/clean.mjs",
  "scripts/clean-install.mjs",
  "scripts/reset-dev-state.mjs",
]) {
  const source = readFileSync(path, "utf8");
  for (const marker of [
    "repositoryRoot(import.meta.url)",
    "assertRepositoryPath",
    "assertNotActiveDirectory",
  ]) {
    if (!source.includes(marker)) {
      throw new Error(`${path} missing safety marker ${marker}`);
    }
  }
  if (source.includes("resolve(process.cwd()")) {
    throw new Error(`${path} still resolves destructive paths from cwd`);
  }
}

const dev = readFileSync("scripts/dev.sh", "utf8");
if (!dev.includes('cd "$REPOSITORY_ROOT"')) {
  throw new Error("CWD-safe launcher does not enter repository root");
}

console.log("Script and working-directory safety: OK");
