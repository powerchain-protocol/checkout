import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const policy = JSON.parse(
  readFileSync(
    "packages/config/install-scripts-policy.json",
    "utf8",
  ),
);

const allowScripts = packageJson.allowScripts;
if (!allowScripts || typeof allowScripts !== "object") {
  throw new Error("package.json allowScripts policy is missing");
}

const approved = Object.keys(policy.approved);
const denied = Object.keys(policy.denied);
const documented = new Set([...approved, ...denied]);

for (const name of approved) {
  if (allowScripts[name] !== true) {
    throw new Error(`Required install script is not approved: ${name}`);
  }
}

for (const name of denied) {
  if (allowScripts[name] !== false) {
    throw new Error(`Denied install script is not explicitly false: ${name}`);
  }
}

for (const name of Object.keys(allowScripts)) {
  if (!documented.has(name)) {
    throw new Error(`Undocumented allowScripts entry: ${name}`);
  }
}

for (const name of documented) {
  if (!(name in allowScripts)) {
    throw new Error(`Policy entry missing from allowScripts: ${name}`);
  }
}

const npmrc = readFileSync(".npmrc", "utf8");
if (!npmrc.includes("strict-allow-scripts=true")) {
  throw new Error(".npmrc must enable strict-allow-scripts");
}
if (/allow-scripts\.[^=]+=/.test(npmrc)) {
  throw new Error(
    "Package decisions belong in package.json allowScripts, not .npmrc",
  );
}

console.log(
  `Install-script policy: OK (${approved.length} approved, ${denied.length} denied)`,
);
