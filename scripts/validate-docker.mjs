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
  "FROM nginx:1.27-alpine",
  "HEALTHCHECK",
]) {
  if (!dockerfile.includes(marker)) {
    throw new Error(`Dockerfile missing ${marker}`);
  }
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
