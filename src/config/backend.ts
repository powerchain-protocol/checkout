export interface PowerPayBackendConfig {
  host: string;
  port: number;
  publicUrl: string;
  apiPrefix: string;
  storageDirectory: string;
  appDirectory: string;
  corsOrigins: string[];
  requestBodyLimitBytes: number;
  websocketHeartbeatSeconds: number;
  websocketIdleTimeoutSeconds: number;
}

function positiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function loadPowerPayBackendConfig(
  env: NodeJS.ProcessEnv = process.env,
): PowerPayBackendConfig {
  const port = positiveInteger(env.PORT ?? env.POWERPAY_PORT, 8080);
  return {
    host: env.POWERPAY_HOST?.trim() || "0.0.0.0",
    port,
    publicUrl:
      env.POWERPAY_PUBLIC_URL?.replace(/\/$/, "") ||
      `http://localhost:${port}`,
    apiPrefix: "/api/v1",
    storageDirectory: env.POWERPAY_STORAGE_DIR?.trim() || "storage",
    appDirectory: env.POWERPAY_APP_DIST?.trim() || "app/dist",
    corsOrigins:
      env.POWERPAY_CORS_ORIGINS
        ?.split(",")
        .map((value) => value.trim())
        .filter(Boolean) ?? ["*"],
    requestBodyLimitBytes: positiveInteger(
      env.POWERPAY_BODY_LIMIT_BYTES,
      1_048_576,
    ),
    websocketHeartbeatSeconds: positiveInteger(
      env.POWERPAY_WS_HEARTBEAT_SECONDS,
      25,
    ),
    websocketIdleTimeoutSeconds: positiveInteger(
      env.POWERPAY_WS_IDLE_TIMEOUT_SECONDS,
      75,
    ),
  };
}
