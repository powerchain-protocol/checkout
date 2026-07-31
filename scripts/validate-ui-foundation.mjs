import { existsSync, readFileSync } from "node:fs";

const required = [
  "app/src/styles/globals.css",
  "app/src/styles/components.css",
  "app/src/components/ui/button.tsx",
  "app/src/components/ui/badge.tsx",
  "app/src/components/ui/empty-state.tsx",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const tsconfig = JSON.parse(readFileSync("app/tsconfig.json", "utf8"));
const types = tsconfig.compilerOptions?.types ?? [];

for (const type of ["vite/client", "node"]) {
  if (!types.includes(type)) {
    throw new Error(`app/tsconfig.json missing type: ${type}`);
  }
}

const appPackage = JSON.parse(readFileSync("app/package.json", "utf8"));
if (!appPackage.devDependencies?.["@types/node"]) {
  throw new Error("app workspace is missing @types/node");
}

const main = readFileSync("app/src/main.tsx", "utf8");
for (const marker of [
  "./styles/globals.css",
  "./styles/components.css",
  "./styles/app.css",
]) {
  if (!main.includes(marker)) {
    throw new Error(`main.tsx missing ${marker}`);
  }
}

const globals = readFileSync("app/src/styles/globals.css", "utf8");
for (const marker of [
  "--pp-focus-ring",
  "[data-theme=\"dark\"]",
  "prefers-reduced-motion",
  ".pp-sr-only",
]) {
  if (!globals.includes(marker)) {
    throw new Error(`Global foundation missing ${marker}`);
  }
}

console.log("Professional UI foundation and Node typings: OK");
