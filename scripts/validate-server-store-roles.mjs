import { existsSync, readFileSync } from "node:fs";

for (const path of [
  "server.ts",
  "src/constants/roles.ts",
  "src/security/authorization.ts",
  "src/types/store.ts",
  "data/store.json",
  "storage/README.md",
  "app/src/pages/store.tsx",
  "app/src/pages/storage.tsx",
  "Dockerfile.server",
]) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const server = readFileSync("server.ts", "utf8");
for (const marker of [
  'pathname === "/api/v1/store"',
  'pathname.startsWith("/storage/")',
  'join(appDist, "index.html")',
  'pathname !== "/api/v1/ws"',
  "APP_NOT_BUILT",
]) {
  if (!server.includes(marker)) {
    throw new Error(`Server missing ${marker}`);
  }
}

const roles = readFileSync("src/constants/roles.ts", "utf8");
for (const marker of [
  "POWERPAY_ROLES",
  "POWERPAY_PERMISSIONS",
  "POWERPAY_ROLE_PERMISSIONS",
  "roleCan",
]) {
  if (!roles.includes(marker)) throw new Error(`Roles missing ${marker}`);
}

const catalog = JSON.parse(readFileSync("data/store.json", "utf8"));
if (!Array.isArray(catalog.products) || catalog.products.length === 0) {
  throw new Error("Store catalog requires products");
}

const app = readFileSync("app/src/App.tsx", "utf8");
for (const marker of ["StorePage", "StoragePage"]) {
  if (!app.includes(marker)) throw new Error(`App missing ${marker}`);
}

console.log("Server, store, storage, roles, and SPA fallback: OK");
