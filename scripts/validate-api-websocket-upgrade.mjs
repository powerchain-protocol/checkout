import { existsSync, readFileSync } from "node:fs";

const required = [
  "swagger.yaml",
  "app/public/swagger.yaml",
  "app/public/api-docs/index.html",
  "app/api/v1/system.ts",
  "src/api/websocket.ts",
  "src/hooks/use-powerpay-events.ts",
  "src/constants/events.ts",
  "docs/API_WEBSOCKETS.md",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const swagger = readFileSync("swagger.yaml", "utf8");
for (const marker of [
  "openapi: 3.1.0",
  "/api/v1:",
  "/api/v1/websocket:",
  "/api/v1/clients:",
  "/api/v1/qr-payments:",
  "/api/v1/pos/charges:",
  "WebSocketInfo:",
  "ApiError:",
]) {
  if (!swagger.includes(marker)) {
    throw new Error(`Swagger missing ${marker}`);
  }
}

const router = readFileSync("app/api/v1/router.ts", "utf8");
for (const marker of [
  "apiIndexHandler",
  "openApiHandler",
  "websocketInfoHandler",
  "ROUTE_NOT_FOUND",
  "API_HANDLER_FAILED",
]) {
  if (!router.includes(marker)) {
    throw new Error(`Router missing ${marker}`);
  }
}

const socket = readFileSync("src/api/websocket.ts", "utf8");
for (const marker of [
  "scheduleReconnect",
  "heartbeat timeout",
  "subscribe",
  "merchant_id",
]) {
  if (!socket.includes(marker)) {
    throw new Error(`WebSocket SDK missing ${marker}`);
  }
}

console.log("Swagger, API, routes, fallbacks, and WebSockets: OK");
