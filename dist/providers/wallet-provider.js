import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { ConnectionProvider, WalletProvider as SolanaWalletProvider, } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ClusterProvider, usePowerPayCluster } from "../context/cluster-context.js";
function WalletRuntime({ children, wallets: suppliedWallets, autoConnect = true, }) {
    const { rpcUrl } = usePowerPayCluster();
    const wallets = useMemo(() => suppliedWallets ?? [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ], [suppliedWallets]);
    return (_jsx(ConnectionProvider, { endpoint: rpcUrl, children: _jsx(SolanaWalletProvider, { wallets: wallets, autoConnect: autoConnect, children: _jsx(WalletModalProvider, { children: children }) }) }));
}
export function WalletProvider({ children, cluster = "devnet", rpcProvider, rpcUrl, wsUrl, heliusApiKey, wallets, autoConnect, }) {
    return (_jsx(ClusterProvider, { initialCluster: cluster, provider: rpcProvider, rpcUrl: rpcUrl, wsUrl: wsUrl, heliusApiKey: heliusApiKey, children: _jsx(WalletRuntime, { wallets: wallets, autoConnect: autoConnect, children: children }) }));
}
