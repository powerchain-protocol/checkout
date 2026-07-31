import { POWERPAY_API_ROUTES } from "../../../src/constants/routes";

export const API_CATALOG = [
  {
    group: "System",
    endpoints: [
      { method: "GET", path: POWERPAY_API_ROUTES.root },
      { method: "GET", path: POWERPAY_API_ROUTES.health },
      { method: "GET", path: POWERPAY_API_ROUTES.openapi },
      { method: "GET", path: POWERPAY_API_ROUTES.websocketInfo },
    ],
  },
  {
    group: "Commerce",
    endpoints: [
      { method: "POST", path: POWERPAY_API_ROUTES.payments },
      { method: "POST", path: POWERPAY_API_ROUTES.sessions },
      { method: "GET/POST", path: POWERPAY_API_ROUTES.clients },
      { method: "POST", path: POWERPAY_API_ROUTES.qrPayments },
      { method: "POST", path: POWERPAY_API_ROUTES.posCharges },
    ],
  },
  {
    group: "Integrations",
    endpoints: [
      { method: "GET", path: POWERPAY_API_ROUTES.integrations },
      { method: "GET", path: POWERPAY_API_ROUTES.trustedTokens },
      { method: "POST", path: POWERPAY_API_ROUTES.crossBorder },
    ],
  },
] as const;
