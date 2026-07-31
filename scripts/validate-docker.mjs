import { existsSync, readFileSync } from "node:fs";

const required = [
  "Dockerfile",
  "Dockerfile.dev",
  ".dockerignore",
  "compose.yaml",
  "docker/nginx.conf",
];

for (const path of required) {
  if (!existsSync(path)) {
    throw new Error(`Missing Docker file: ${path}`);
  }
}

const dockerfile = readFileSync("Dockerfile", "utf8");
const compose = readFileSync("compose.yaml", "utf8");
const nginx = readFileSync("docker/nginx.conf", "utf8");

for (const marker of [
  "npm run app:build",
  "HEALTHCHECK",
]) {
  if (!dockerfile.includes(marker)) {
    throw new Error(`Dockerfile missing ${marker}`);
  }
}

if (!/FROM nginx:1\.27(?:\.\d+)?-alpine AS runtime/.test(dockerfile)) {
  throw new Error("Dockerfile must use a pinned nginx 1.27 Alpine runtime");
}

if (
  !dockerfile.includes("npm ci --workspaces --include-workspace-root") &&
  !dockerfile.includes("npm install --workspaces --include-workspace-root")
) {
  throw new Error("Dockerfile is missing workspace dependency installation");
}

for (const marker of [
  "powerpay-app:",
  "powerpay-dev:",
  "1.0.0-beta.1",
]) {
  if (!compose.includes(marker)) {
    throw new Error(`compose.yaml missing ${marker}`);
  }
}

if (!nginx.includes("try_files $uri $uri/ /index.html")) {
  throw new Error("Nginx SPA fallback is missing");
}

console.log("Docker configuration: OK");
