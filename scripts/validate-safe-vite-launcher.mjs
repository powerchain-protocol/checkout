import { readFileSync } from "node:fs";

const launcher = readFileSync("scripts/run-vite-safe.mjs", "utf8");
const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
const appPackage = JSON.parse(readFileSync("app/package.json", "utf8"));

for (const marker of [
  "process.chdir(repositoryRoot)",
  "cwd: repositoryRoot",
  "node_modules",
  "\"vite\"",
  "\"bin\"",
  "\"vite.js\"",
]) {
  if (!launcher.includes(marker)) {
    throw new Error(`Safe Vite launcher missing ${marker}`);
  }
}

if (rootPackage.scripts.dev !== "node scripts/run-vite-safe.mjs") {
  throw new Error("Root dev script does not use the safe Vite launcher");
}

if (appPackage.scripts.dev !== "node ../scripts/run-vite-safe.mjs") {
  throw new Error("App dev script does not use the safe Vite launcher");
}

console.log("Safe Vite launcher: OK");
