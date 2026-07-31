import { readFileSync } from "node:fs";

const shared = readFileSync("app/api/v1/_shared.ts", "utf8");
const vite = readFileSync("app/vite.config.ts", "utf8");

for (const invalid of [
  '"access-control-allow-origin": "null"',
  "origins[0]",
]) {
  if (shared.includes(invalid)) {
    throw new Error(`Invalid CORS fallback remains: ${invalid}`);
  }
}

for (const marker of [
  "CORS_ORIGIN_DENIED",
  "CORS_METHOD_DENIED",
  "CORS_HEADERS_DENIED",
  "access-control-request-headers",
]) {
  if (!shared.includes(marker)) {
    throw new Error(`Missing strict preflight handling: ${marker}`);
  }
}

for (const marker of [
  'name: "powerpay-codespaces-manifest"',
  "allowedHosts: true",
  "Cross-Origin-Resource-Policy",
]) {
  if (!vite.includes(marker)) {
    throw new Error(`Missing Vite CORS/Codespaces setting: ${marker}`);
  }
}

console.log("CORS configuration: OK");
