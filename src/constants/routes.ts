export const POWERPAY_API_PREFIX = "/api/v1" as const;

export const POWERPAY_API_ROUTES = {
  root: POWERPAY_API_PREFIX,
  openapi: `${POWERPAY_API_PREFIX}/openapi`,
  websocketInfo: `${POWERPAY_API_PREFIX}/websocket`,
  websocket: `${POWERPAY_API_PREFIX}/ws`,
  health: `${POWERPAY_API_PREFIX}/health`,
  cors: `${POWERPAY_API_PREFIX}/cors`,
  payments: `${POWERPAY_API_PREFIX}/payments`,
  payment: (paymentId: string) =>
    `${POWERPAY_API_PREFIX}/payments/${encodeURIComponent(paymentId)}`,
  sessions: `${POWERPAY_API_PREFIX}/sessions`,
  session: (sessionId: string) =>
    `${POWERPAY_API_PREFIX}/sessions/${encodeURIComponent(sessionId)}`,
  clients: `${POWERPAY_API_PREFIX}/clients`,
  client: (clientId: string) =>
    `${POWERPAY_API_PREFIX}/clients/${encodeURIComponent(clientId)}`,
  qrPayments: `${POWERPAY_API_PREFIX}/qr-payments`,
  posTerminals: `${POWERPAY_API_PREFIX}/pos/terminals`,
  posCharges: `${POWERPAY_API_PREFIX}/pos/charges`,
  integrations: `${POWERPAY_API_PREFIX}/integrations`,
  integration: (integrationId: string) =>
    `${POWERPAY_API_PREFIX}/integrations/${encodeURIComponent(integrationId)}`,
  trustedTokens: `${POWERPAY_API_PREFIX}/trusted-tokens`,
  crossBorder: `${POWERPAY_API_PREFIX}/cross-border`,
  refunds: `${POWERPAY_API_PREFIX}/refunds`,
  refund: (refundId: string) =>
    `${POWERPAY_API_PREFIX}/refunds/${encodeURIComponent(refundId)}`,
  webhooks: `${POWERPAY_API_PREFIX}/webhooks`,
  webhook: (webhookId: string) =>
    `${POWERPAY_API_PREFIX}/webhooks/${encodeURIComponent(webhookId)}`,
  metrics: `${POWERPAY_API_PREFIX}/metrics`,
  configuration: `${POWERPAY_API_PREFIX}/config`,
  roles: `${POWERPAY_API_PREFIX}/roles`,
} as const;

export const POWERPAY_APP_ROUTES = {
  overview: "overview",
  checkout: "checkout",
  crossBorder: "cross-border",
  sui: "sui",
  information: "informations",
  alarms: "alarms",
  testArea: "testarea",
  notFound: "not-found",
} as const;

export type PowerPayAppRoute =
  (typeof POWERPAY_APP_ROUTES)[keyof typeof POWERPAY_APP_ROUTES];

export const POWERPAY_ROUTE_LABELS: Record<PowerPayAppRoute, string> = {
  overview: "Overview",
  checkout: "Checkout",
  "cross-border": "Cross-border",
  sui: "Sui",
  informations: "Information",
  alarms: "Alarms",
  testarea: "Test area",
  "not-found": "Not found",
};
