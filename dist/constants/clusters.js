import { clusterApiUrl } from "@solana/web3.js";
export const DEFAULT_CLUSTER = "devnet";
export const CLUSTERS = {
    devnet: {
        id: "devnet",
        label: "Devnet",
        rpcUrl: clusterApiUrl("devnet"),
        wsUrl: "wss://api.devnet.solana.com",
        explorerCluster: "devnet",
        production: false,
    },
    "mainnet-beta": {
        id: "mainnet-beta",
        label: "Mainnet",
        rpcUrl: clusterApiUrl("mainnet-beta"),
        wsUrl: "wss://api.mainnet-beta.solana.com",
        production: true,
    },
    testnet: {
        id: "testnet",
        label: "Testnet",
        rpcUrl: clusterApiUrl("testnet"),
        wsUrl: "wss://api.testnet.solana.com",
        explorerCluster: "testnet",
        production: false,
    },
    localnet: {
        id: "localnet",
        label: "Local validator",
        rpcUrl: "http://127.0.0.1:8899",
        wsUrl: "ws://127.0.0.1:8900",
        production: false,
    },
};
export function isPowerPayCluster(value) {
    return value in CLUSTERS;
}
