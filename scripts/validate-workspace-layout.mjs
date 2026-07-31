import { existsSync, readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const expected = [
  "app",
  "packages/config",
  "packages/sdk/powerpay/ui",
];

for (const workspace of expected) {
  if (!packageJson.workspaces.includes(workspace)) {
    throw new Error(`Missing workspace declaration: ${workspace}`);
  }
}

const unique = new Set(packageJson.workspaces);
if (unique.size !== packageJson.workspaces.length) {
  throw new Error("Workspace declarations contain duplicates");
}

for (const path of [
  "src/index.ts",
  "app/src/App.tsx",
  "packages/config/package.json",
  "packages/sdk/powerpay/ui/package.json",
]) {
  if (!existsSync(path)) {
    throw new Error(`Missing source boundary: ${path}`);
  }
}

for (const path of [
  "app/src/App.tsx",
  "app/src/main.tsx",
]) {
  const content = readFileSync(path, "utf8");
  if (content.includes("../../app/src")) {
    throw new Error(`Invalid recursive application import in ${path}`);
  }
}

console.log("Workspace layout: OK");
