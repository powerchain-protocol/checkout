import { existsSync, readFileSync } from "node:fs";

const required = [
  "src/api/client.ts",
  "src/api/transport.ts",
  "src/api/resources.ts",
  "src/context/sdk-context.tsx",
  "src/context/checkout-context.tsx",
  "src/hooks/use-api-resource.ts",
  "src/hooks/use-payments.ts",
  "src/hooks/use-clients.ts",
  "src/hooks/use-checkout-actions.ts",
  "src/constants/routes.ts",
  "src/constants/sdk.ts",
  "src/integrations/registry.ts",
  "app/api/v1/clients.ts",
  "app/api/v1/checkout.ts",
  "app/api/v1/integrations.ts",
  "app/api/v1/routes.ts",
  "app/src/routes.ts",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const index = readFileSync("src/index.ts", "utf8");
const routes = readFileSync("src/constants/routes.ts", "utf8");
const router = readFileSync("app/api/v1/router.ts", "utf8");

for (const marker of [
  "./api/index.js",
  "./context/sdk-context.js",
  "./integrations/index.js",
]) {
  if (!index.includes(marker)) {
    throw new Error(`SDK index missing ${marker}`);
  }
}

for (const marker of [
  "qrPayments",
  "posCharges",
  "integrations",
  "clients",
]) {
  if (!routes.includes(marker)) {
    throw new Error(`Route constants missing ${marker}`);
  }
}

if (!router.includes("dispatchExtendedRoute")) {
  throw new Error("API router does not dispatch extended routes");
}

console.log("SDK/API/hooks/integrations upgrade: OK");
