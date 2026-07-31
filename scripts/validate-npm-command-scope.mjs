import { readFileSync } from "node:fs";

const npmrc = readFileSync(".npmrc", "utf8");
if (/^workspaces=true$/m.test(npmrc)) {
  throw new Error(
    ".npmrc must not fan every npm command out to all workspaces",
  );
}

const root = JSON.parse(readFileSync("package.json", "utf8"));
for (const [name, marker] of [
  ["app:typecheck", "--workspace=@powerchain-protocol/powerpay-demo-app"],
  ["app:build", "--workspace=@powerchain-protocol/powerpay-demo-app"],
]) {
  if (!root.scripts?.[name]?.includes(marker)) {
    throw new Error(`${name} is not explicitly app-scoped`);
  }
}

console.log("npm command scope: OK");
