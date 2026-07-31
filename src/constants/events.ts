import type { PowerPayEventType } from "../types/api.js";

export const POWERPAY_WEBSOCKET_PROTOCOL = "powerpay.v1" as const;
export const POWERPAY_WEBSOCKET_HEARTBEAT_SECONDS = 25;
export const POWERPAY_WEBSOCKET_EVENTS: readonly PowerPayEventType[] = [
  "system.ready",
  "system.heartbeat",
  "payment.created",
  "payment.updated",
  "payment.confirmed",
  "payment.failed",
  "session.created",
  "session.updated",
  "session.completed",
  "integration.updated",
] as const;
