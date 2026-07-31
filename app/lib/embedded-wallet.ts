import { Keypair } from "@solana/web3.js";
import type {
  EmbeddedWalletRecord,
} from "../../src/types/user";
import type {
  EmbeddedWalletAdapter,
} from "../../src/hooks/use-embedded-wallets";

const wallets = new Map<string, EmbeddedWalletRecord>();

export const demoEmbeddedWalletAdapter: EmbeddedWalletAdapter = {
  async create(userId) {
    const existing = wallets.get(userId);
    if (existing) return existing;

    const wallet: EmbeddedWalletRecord = {
      id: `ew_${crypto.randomUUID()}`,
      userId,
      address: Keypair.generate().publicKey.toBase58(),
      provider: "embedded",
      createdAt: new Date().toISOString(),
    };
    wallets.set(userId, wallet);
    return wallet;
  },

  async get(userId) {
    return wallets.get(userId) ?? null;
  },
};
