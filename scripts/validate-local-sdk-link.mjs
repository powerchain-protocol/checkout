import { readFileSync } from "node:fs";

const root = JSON.parse(readFileSync("package.json", "utf8"));
const app = JSON.parse(readFileSync("app/package.json", "utf8"));

if (root.packageManager !== "npm@11.9.0") {
  throw new Error(
    `Expected packageManager npm@11.9.0, found ${root.packageManager}`,
  );
}

const sdkDependency =
  app.dependencies?.["@powerchain-protocol/powerpay-checkout-sdk"];

if (sdkDependency !== "file:..") {
  throw new Error(
    `Demo app must use local SDK dependency file:.., found ${sdkDependency}`,
  );
}

for (const forbidden of ["workspace:*", "1.0.0-beta.1", "latest"]) {
  if (sdkDependency === forbidden) {
    throw new Error(
      `Demo app SDK dependency must not resolve from the npm registry: ${forbidden}`,
    );
  }
}

console.log("Local SDK dependency and npm package-manager policy: OK");
