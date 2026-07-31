import { existsSync, readFileSync } from "node:fs";

const root = JSON.parse(readFileSync("package.json", "utf8"));
const app = JSON.parse(readFileSync("app/package.json", "utf8"));
const config = JSON.parse(
  readFileSync("packages/config/package.json", "utf8"),
);
const ui = JSON.parse(
  readFileSync("packages/sdk/powerpay/ui/package.json", "utf8"),
);

const expectedWorkspaces = [
  "app",
  "packages/config",
  "packages/sdk/powerpay/ui",
];
for (const workspace of expectedWorkspaces) {
  if (!root.workspaces?.includes(workspace)) {
    throw new Error(`Root workspaces missing ${workspace}`);
  }
}

for (const [label, manifest] of [
  ["config", config],
  ["ui", ui],
]) {
  if (typeof manifest.typecheck !== "undefined") {
    throw new Error(`${label} package has invalid top-level typecheck field`);
  }
  if (typeof manifest.test !== "undefined") {
    throw new Error(`${label} package has invalid top-level test field`);
  }
  for (const script of ["typecheck", "test", "validate"]) {
    if (!manifest.scripts?.[script]) {
      throw new Error(`${label} package missing scripts.${script}`);
    }
  }
}

if (app.scripts.check.includes("pnpm")) {
  throw new Error("App check script must use canonical npm commands");
}
if (!app.scripts.build.includes("run-vite-build-safe.mjs")) {
  throw new Error("App build is not using the CWD-safe Vite build launcher");
}
const appSdkDependency =
  app.dependencies["@powerchain-protocol/powerpay-checkout-sdk"];
if (
  appSdkDependency !== root.version &&
  appSdkDependency !== "file:.."
) {
  throw new Error(
    "App SDK dependency must match the root version or use file:..",
  );
}

for (const path of [
  "scripts/run-vite-build-safe.mjs",
  "scripts/run-vite-preview-safe.mjs",
  "scripts/clean-app.mjs",
]) {
  if (!existsSync(path)) throw new Error(`Missing app tool ${path}`);
}

console.log("Packages and application configuration: OK");
