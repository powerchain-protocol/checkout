import { readFileSync } from "node:fs";

const router = readFileSync("app/api/v1/router.ts", "utf8");
const client = readFileSync("src/lib/api.ts", "utf8");
const openapi = readFileSync("swagger.yaml", "utf8");

for (const route of [
  "/health",
  "/payments",
  "/sessions",
  "/cors",
  "/trusted-tokens",
  "/cross-border",
]) {
  if (!router.includes(route.replaceAll("/", "\\/"))) {
    throw new Error(`Router missing ${route}`);
  }
}

for (const method of ["createSession(", "session(", "cors("]) {
  if (!client.includes(method)) {
    throw new Error(`SDK API client missing ${method}`);
  }
}

for (const path of [
  "/api/v1/sessions:",
  "/api/v1/sessions/{sessionId}:",
  "/api/v1/cors:",
]) {
  if (!openapi.includes(path)) {
    throw new Error(`OpenAPI missing ${path}`);
  }
}

console.log("API v1 routes: OK");
