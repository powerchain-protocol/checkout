import { existsSync, readFileSync } from "node:fs";

for (const path of [
  "app/vite.config.ts",
  "scripts/run-vite-safe.mjs",
  "scripts/run-vite-build-safe.mjs",
  "scripts/run-vite-preview-safe.mjs",
]) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const launcher = readFileSync("scripts/run-vite-safe.mjs", "utf8");
for (const marker of [
  "const configFile = resolve(appDirectory, \"vite.config.ts\")",
  "executable,\n    appDirectory,",
  "cwd: repositoryRoot",
  "PWD: repositoryRoot",
]) {
  if (!launcher.includes(marker)) {
    throw new Error(`Safe Vite launcher missing ${marker}`);
  }
}

const config = readFileSync("app/vite.config.ts", "utf8");
for (const marker of [
  "const appRoot = dirname(configFile)",
  "const repositoryRoot = resolve(appRoot, \"..\")",
  "cacheDir: resolve(repositoryRoot",
  "entries: [resolve(appRoot, \"index.html\")]",
  "outDir: resolve(appRoot, \"dist\")",
]) {
  if (!config.includes(marker)) {
    throw new Error(`Vite config missing ${marker}`);
  }
}

console.log("Vite config restart and absolute-root handling: OK");
