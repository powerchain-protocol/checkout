import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const cwd = process.cwd();
const required = ["package.json", "tsconfig.json", ".env.example"];
const missing = required.filter((file) => !existsSync(resolve(cwd, file)));

console.log("PowerPay repository doctor");
console.log(`Node: ${process.version}`);
console.log(`npm: ${process.env.npm_config_user_agent ?? "unknown"}`);
console.log(`cwd: ${cwd}`);

if (missing.length) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  console.error("Run this command from the repository root.");
  process.exitCode = 1;
} else {
  console.log("Repository root: OK");
}

if (!existsSync(resolve(cwd, ".env.local"))) {
  console.log(".env.local: missing — run `npm run env:init`");
} else {
  console.log(".env.local: present");
}

const pkg = JSON.parse(readFileSync(resolve(cwd, "package.json"), "utf8"));
console.log(`Package: ${pkg.name}@${pkg.version}`);
console.log("Install-script review: run `npm install-scripts ls` on npm versions that support it.");
