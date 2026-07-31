import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const failures = [];
const required = [
  "app/index.html",
  "app/src/main.tsx",
  "app/src/App.tsx",
  "app/vite.config.ts",
  "node_modules/vite/bin/vite.js",
  "node_modules/@vitejs/plugin-react/package.json",
];

for (const path of required) {
  if (!existsSync(resolve(path))) failures.push(`Missing ${path}`);
}

const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
const appPackage = JSON.parse(readFileSync("app/package.json", "utf8"));

if (rootPackage.scripts?.dev !== "node scripts/run-vite-safe.mjs") {
  failures.push("Root dev script is not using the safe launcher");
}
if (appPackage.scripts?.dev !== "node ../scripts/run-vite-safe.mjs") {
  failures.push("App dev script is not using the safe launcher");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("PowerPay development environment: OK");
