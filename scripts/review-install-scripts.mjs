import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const policy = JSON.parse(
  readFileSync(
    "packages/config/install-scripts-policy.json",
    "utf8",
  ),
);

console.log("PowerPay install-script policy");
console.log("==============================");
console.log("");

console.log("APPROVED");
for (const [name, entry] of Object.entries(policy.approved)) {
  console.log(`  ✓ ${name}`);
  console.log(`    ${entry.reason}`);
}

console.log("");
console.log("DENIED");
for (const [name, entry] of Object.entries(policy.denied)) {
  console.log(`  × ${name}`);
  console.log(`    ${entry.reason}`);
}

console.log("");
console.log(
  `package.json contains ${Object.keys(packageJson.allowScripts ?? {}).length} explicit decisions.`,
);
console.log(
  "Run `npm install-scripts ls` after install; it should report no unreviewed packages.",
);
