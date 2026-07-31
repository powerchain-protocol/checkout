import { readFileSync, writeFileSync } from "node:fs";

const root = JSON.parse(readFileSync("package.json", "utf8"));
const app = JSON.parse(readFileSync("app/package.json", "utf8"));

root.scripts = {
  ...root.scripts,
  "toolchain:check": "node scripts/check-toolchain-integrity.mjs",
  "toolchain:repair": "node scripts/install-repair.mjs",
  "local:sdk:validate": "node scripts/validate-local-sdk-link.mjs",
  "install:local": "npm install --workspaces --include-workspace-root --no-audit --no-fund",
  "ci": "npm run local:sdk:validate && npm run production:check && npm run release:dry-run"
};

app.dependencies = {
  ...app.dependencies,
  "@powerchain-protocol/powerpay-checkout-sdk": "file:.."
};

writeFileSync("package.json", JSON.stringify(root, null, 2) + "\n");
writeFileSync("app/package.json", JSON.stringify(app, null, 2) + "\n");
console.log("Applied PowerPay local dependency and toolchain scripts.");
