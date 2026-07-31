import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { PowerPayEnv } from "../config/env.js";
import type { CurrencyDefinition } from "../lib/currencies.js";
import { DEFAULT_CURRENCIES } from "../lib/currencies.js";

export interface PowerPayProviderConfig {
  env: PowerPayEnv;
  currencies?: CurrencyDefinition[];
}

const ConfigContext = createContext<PowerPayProviderConfig | null>(null);

export function PowerPayConfigProvider({
  value,
  children,
}: {
  value: PowerPayProviderConfig;
  children: ReactNode;
}) {
  const normalized = useMemo(
    () => ({
      ...value,
      currencies: value.currencies ?? DEFAULT_CURRENCIES,
    }),
    [value],
  );

  return (
    <ConfigContext.Provider value={normalized}>
      {children}
    </ConfigContext.Provider>
  );
}

export function usePowerPayConfig(): PowerPayProviderConfig {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error(
      "usePowerPayConfig must be used inside PowerPayConfigProvider",
    );
  }
  return config;
}
