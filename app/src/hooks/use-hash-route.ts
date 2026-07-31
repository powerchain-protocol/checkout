import { useEffect, useState } from "react";

export type AppRoute =
  | "overview"
  | "informations"
  | "alarms"
  | "testarea"
  | "checkout"
  | "cross-border"
  | "sui"
  | "not-found";

function readRoute(): AppRoute {
  const route = window.location.hash.replace(/^#\/?/, "") || "overview";
  if (["overview", "informations", "alarms", "testarea", "checkout", "cross-border", "sui"].includes(route)) {
    return route as AppRoute;
  }
  return "not-found";
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
