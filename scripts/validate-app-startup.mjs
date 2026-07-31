import { readFileSync } from "node:fs";

const html = readFileSync("app/index.html", "utf8");
const main = readFileSync("app/src/main.tsx", "utf8");
const app = readFileSync("app/src/App.tsx", "utf8");
const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
const appPackage = JSON.parse(readFileSync("app/package.json", "utf8"));

for (const marker of [
  'id="root"',
  "Starting PowerPay",
  'src="/src/main.tsx"',
]) {
  if (!html.includes(marker)) throw new Error(`index.html missing ${marker}`);
}

for (const marker of [
  "renderStartupFailure",
  "unhandledrejection",
  'Missing application mount element "#root"',
]) {
  if (!main.includes(marker)) throw new Error(`main.tsx missing ${marker}`);
}

if (!app.includes("enabled={import.meta.env.PROD}")) {
  throw new Error("PWA must be production-only");
}
if (rootPackage.scripts?.["dev:reset"] !== "node scripts/reset-dev-state.mjs") {
  throw new Error("Root dev:reset script missing");
}
if (appPackage.scripts?.["dev:reset"] !== "node ../scripts/reset-dev-state.mjs") {
  throw new Error("App dev:reset script missing");
}

console.log("Application startup: OK");
