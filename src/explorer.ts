export type SolanaCluster = "mainnet-beta" | "devnet" | "testnet" | "localnet";
export type ExplorerKind = "solana" | "solscan";

function clusterQuery(cluster: SolanaCluster, customRpc?: string): string {
  if (cluster === "mainnet-beta") return "";
  if (cluster === "localnet") {
    if (!customRpc) throw new Error("customRpc is required for localnet explorer links");
    return `?cluster=custom&customUrl=${encodeURIComponent(customRpc)}`;
  }
  return `?cluster=${cluster}`;
}

export function explorerUrl(args: { type: "tx" | "address" | "block"; value: string | number; cluster?: SolanaCluster; explorer?: ExplorerKind; customRpc?: string }): string {
  const cluster = args.cluster ?? "mainnet-beta";
  const explorer = args.explorer ?? "solana";
  const value = encodeURIComponent(String(args.value));
  if (explorer === "solscan") {
    const segment = args.type === "tx" ? "tx" : args.type === "address" ? "account" : "block";
    const suffix = cluster === "mainnet-beta" ? "" : `?cluster=${cluster === "localnet" ? "custom" : cluster}`;
    return `https://solscan.io/${segment}/${value}${suffix}`;
  }
  const segment = args.type === "tx" ? "tx" : args.type === "address" ? "address" : "block";
  return `https://explorer.solana.com/${segment}/${value}${clusterQuery(cluster, args.customRpc)}`;
}

export const transactionExplorerUrl = (signature: string, cluster?: SolanaCluster) => explorerUrl({ type: "tx", value: signature, cluster });
export const addressExplorerUrl = (address: string, cluster?: SolanaCluster) => explorerUrl({ type: "address", value: address, cluster });
