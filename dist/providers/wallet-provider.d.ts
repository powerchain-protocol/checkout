import type { Adapter } from "@solana/wallet-adapter-base";
import type { PowerPayCluster } from "../constants/clusters.js";
import type { RpcProvider } from "../rpc/clusters.js";
export interface WalletProviderProps {
    children: React.ReactNode;
    cluster?: PowerPayCluster;
    rpcProvider?: RpcProvider;
    rpcUrl?: string;
    wsUrl?: string;
    heliusApiKey?: string;
    wallets?: Adapter[];
    autoConnect?: boolean;
}
export declare function WalletProvider({ children, cluster, rpcProvider, rpcUrl, wsUrl, heliusApiKey, wallets, autoConnect, }: WalletProviderProps): any;
