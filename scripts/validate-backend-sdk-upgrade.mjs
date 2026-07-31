import { existsSync, readFileSync } from "node:fs";

for (const path of [
  "src/config/backend.ts",
  "src/constants/roles.ts",
  "app/api/v1/backend.ts",
  "src/api/websocket.ts",
  "docs/BACKEND_API_CONFIG.md",
]) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const routes = readFileSync("src/constants/routes.ts", "utf8");
for (const marker of [
  "refunds:",
  "webhooks:",
  "metrics:",
  "configuration:",
  "roles:",
]) {
  if (!routes.includes(marker)) throw new Error(`Routes missing ${marker}`);
}

const router = readFileSync("app/api/v1/router.ts", "utf8");
for (const marker of [
  "refundsHandler",
  "webhooksHandler",
  "metricsHandler",
  "configHandler",
  "rolesHandler",
]) {
  if (!router.includes(marker)) throw new Error(`Router missing ${marker}`);
}

const client = readFileSync("src/api/client.ts", "utf8");
for (const marker of [
  "RefundsResourceClient",
  "WebhooksResourceClient",
  "SystemResourceClient",
]) {
  if (!client.includes(marker)) throw new Error(`SDK client missing ${marker}`);
}

const websocket = readFileSync("src/api/websocket.ts", "utf8");
for (const marker of [
  "PowerPayWebSocketState",
  "maximumReconnectAttempts",
  "reconnectJitter",
  "onState",
  "onError",
]) {
  if (!websocket.includes(marker)) throw new Error(`WebSocket missing ${marker}`);
}

const startup = readFileSync(
  "app/src/components/system/StartupScreen.tsx",
  "utf8",
);
if (startup.includes("ShieldIcon") || startup.includes("ShieldCheckIcon")) {
  throw new Error("Startup screen still imports an unsupported shield icon");
}

for (const path of [
  "app/src/pages/cross-border.tsx",
  "app/src/pages/informations.tsx",
  "app/src/pages/sui.tsx",
  "app/src/pages/testarea.tsx",
]) {
  const source = readFileSync(path, "utf8");
  if (source.includes("NetworkIcon network=")) {
    throw new Error(`${path} uses invalid NetworkIcon network prop`);
  }
}

console.log("Backend, API, WebSocket, config, packages, and SDK upgrade: OK");
