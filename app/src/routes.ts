import {
  POWERPAY_APP_ROUTES,
  type PowerPayAppRoute,
} from "@powerpay/sdk";

export interface AppRouteDefinition {
  id: PowerPayAppRoute;
  label: string;
  description: string;
  navigation: boolean;
}

export const APP_ROUTES: readonly AppRouteDefinition[] = [
  {
    id: POWERPAY_APP_ROUTES.overview,
    label: "Overview",
    description: "Merchant operations and payment activity",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.checkout,
    label: "Checkout",
    description: "Merchant checkout, QR payments, and PowerPOS",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.crossBorder,
    label: "Cross-border",
    description: "Cross-border settlement and CCTP",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.sui,
    label: "Sui",
    description: "Sui payment and liquidity operations",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.information,
    label: "Information",
    description: "Environment and SDK information",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.alarms,
    label: "Alarms",
    description: "Operational alerts",
    navigation: true,
  },
  {
    id: POWERPAY_APP_ROUTES.testArea,
    label: "Test area",
    description: "Integration and component testing",
    navigation: false,
  },
  {
    id: POWERPAY_APP_ROUTES.notFound,
    label: "Not found",
    description: "Unknown route",
    navigation: false,
  },
];

export function isAppRoute(value: string): value is PowerPayAppRoute {
  return APP_ROUTES.some((route) => route.id === value);
}

export function hrefForRoute(route: PowerPayAppRoute): string {
  return `#/${route}`;
}
