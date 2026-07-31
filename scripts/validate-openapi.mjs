import { readFileSync } from "node:fs";

const source = readFileSync("swagger.yaml", "utf8");
const required = [
  "openapi: 3.1.0",
  "/api/v1/health:",
  "/api/v1/payments:",
  "CreatePaymentRequest:",
  "Payment:",
  "ApiError:",
];

const missing = required.filter((value) => !source.includes(value));
if (missing.length) {
  console.error(`OpenAPI document is missing: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("OpenAPI structure: OK");
