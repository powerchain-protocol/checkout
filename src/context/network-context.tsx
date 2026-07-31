import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ChainFamily } from "../clusters/types.js";

interface NetworkContextValue {
  chain: ChainFamily;
  clusterId: string;
  setNetwork(chain: ChainFamily, clusterId: string): void;
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

export function NetworkProvider({
  children,
  defaultChain = "solana",
  defaultClusterId = "solana:devnet",
}: {
  children: ReactNode;
  defaultChain?: ChainFamily;
  defaultClusterId?: string;
}) {
  const [chain, setChain] = useState<ChainFamily>(defaultChain);
  const [clusterId, setClusterId] = useState(defaultClusterId);

  const value = useMemo(
    () => ({
      chain,
      clusterId,
      setNetwork(nextChain: ChainFamily, nextClusterId: string) {
        setChain(nextChain);
        setClusterId(nextClusterId);
      },
    }),
    [chain, clusterId],
  );

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkContext(): NetworkContextValue {
  const value = useContext(NetworkContext);
  if (!value) {
    throw new Error("useNetworkContext must be used inside NetworkProvider");
  }
  return value;
}
