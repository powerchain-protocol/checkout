import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  PowerPaySdk,
  createPowerPaySdk,
} from "../api/client.js";
import type { PowerPaySdkConfig } from "../types/sdk.js";

const PowerPaySdkContext = createContext<PowerPaySdk | null>(null);

export interface PowerPaySdkProviderProps {
  children: ReactNode;
  client?: PowerPaySdk;
  config?: PowerPaySdkConfig;
}

export function PowerPaySdkProvider({
  children,
  client,
  config,
}: PowerPaySdkProviderProps) {
  const value = useMemo(() => {
    if (client) return client;
    if (!config) {
      throw new Error(
        "PowerPaySdkProvider requires either client or config",
      );
    }
    return createPowerPaySdk(config);
  }, [client, config]);

  return (
    <PowerPaySdkContext.Provider value={value}>
      {children}
    </PowerPaySdkContext.Provider>
  );
}

export function usePowerPaySdk(): PowerPaySdk {
  const client = useContext(PowerPaySdkContext);
  if (!client) {
    throw new Error(
      "usePowerPaySdk must be used inside PowerPaySdkProvider",
    );
  }
  return client;
}
