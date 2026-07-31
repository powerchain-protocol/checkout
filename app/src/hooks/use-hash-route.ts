import { useCallback, useEffect, useMemo, useState } from "react";
import {
  POWERPAY_APP_ROUTES,
  type PowerPayAppRoute,
} from "@powerpay/sdk";
import {
  APP_ROUTES,
  hrefForRoute,
  isAppRoute,
} from "../routes";

function readRoute(): PowerPayAppRoute {
  const route =
    window.location.hash.replace(/^#\/?/, "") ||
    POWERPAY_APP_ROUTES.overview;
  return isAppRoute(route)
    ? route
    : POWERPAY_APP_ROUTES.notFound;
}

export function useHashRoute() {
  const [route, setRoute] = useState<PowerPayAppRoute>(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () =>
      window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: PowerPayAppRoute) => {
    window.location.hash = hrefForRoute(next);
  }, []);

  const definition = useMemo(
    () =>
      APP_ROUTES.find((item) => item.id === route) ??
      APP_ROUTES[APP_ROUTES.length - 1],
    [route],
  );

  return {
    route,
    definition,
    navigate,
    href: hrefForRoute(route),
  };
}
