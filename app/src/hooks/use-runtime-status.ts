import { useEffect, useMemo, useState } from "react";

export interface RuntimeStatus {
  online: boolean;
  visibility: DocumentVisibilityState;
  environment: "development" | "production";
  updatedAt: string;
}

export function useRuntimeStatus(): RuntimeStatus {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [visibility, setVisibility] = useState<DocumentVisibilityState>(
    () => document.visibilityState,
  );
  const [updatedAt, setUpdatedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    const refresh = () => {
      setOnline(navigator.onLine);
      setVisibility(document.visibilityState);
      setUpdatedAt(new Date().toISOString());
    };

    window.addEventListener("online", refresh);
    window.addEventListener("offline", refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.removeEventListener("online", refresh);
      window.removeEventListener("offline", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return useMemo(
    () => ({
      online,
      visibility,
      environment: import.meta.env.PROD
        ? "production"
        : "development",
      updatedAt,
    }),
    [online, visibility, updatedAt],
  );
}
