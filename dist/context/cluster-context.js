import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState, } from "react";
import { createClusterConnection, resolveRpc, } from "../rpc/clusters.js";
const ClusterContext = createContext(null);
export function ClusterProvider({ initialCluster = "devnet", children, ...options }) {
    const [cluster, setClusterState] = useState(initialCluster);
    const resolved = useMemo(() => resolveRpc({ ...options, cluster }), [cluster, options.rpcUrl, options.wsUrl, options.provider, options.heliusApiKey]);
    const connection = useMemo(() => createClusterConnection({ ...options, cluster }), [resolved.rpcUrl, resolved.wsUrl, resolved.commitment]);
    const setCluster = useCallback((next) => {
        setClusterState(next);
    }, []);
    const value = useMemo(() => ({ ...resolved, connection, setCluster }), [resolved, connection, setCluster]);
    return (_jsx(ClusterContext.Provider, { value: value, children: children }));
}
export function usePowerPayCluster() {
    const context = useContext(ClusterContext);
    if (!context)
        throw new Error("usePowerPayCluster must be used inside ClusterProvider");
    return context;
}
