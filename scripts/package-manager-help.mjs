import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("package.json", "utf8"));
const configured = manifest.packageManager ?? "npm";

console.log(`PowerPay package manager: ${configured}`);
console.log("Use npm commands from the repository root:");
console.log("  npm install");
console.log("  npm run build");
console.log("  npm run app:build");
console.log("  npm run ci");
console.log("");
console.log(
  "Yarn is intentionally not used because the repository lockfile, workspaces, install-script policy, and CI are npm-based.",
);
