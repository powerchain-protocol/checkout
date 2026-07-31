import type { Invoice } from "../../src/types/invoice";
import type { MerchantConfig } from "../../src/types/merchant";
import type { User } from "../../src/types/user";

interface DatabaseState {
  users: Map<string, User>;
  merchants: Map<string, MerchantConfig & { id: string }>;
  invoices: Map<string, Invoice>;
}

const state: DatabaseState = {
  users: new Map(),
  merchants: new Map(),
  invoices: new Map(),
};

export const db = {
  users: {
    get: async (id: string) => state.users.get(id) ?? null,
    set: async (value: User) => {
      state.users.set(value.id, value);
      return value;
    },
    all: async () => [...state.users.values()],
  },
  merchants: {
    get: async (id: string) => state.merchants.get(id) ?? null,
    set: async (value: MerchantConfig & { id: string }) => {
      state.merchants.set(value.id, value);
      return value;
    },
    all: async () => [...state.merchants.values()],
  },
  invoices: {
    get: async (id: string) => state.invoices.get(id) ?? null,
    set: async (value: Invoice) => {
      state.invoices.set(value.id, value);
      return value;
    },
    all: async () => [...state.invoices.values()],
  },
};

export function resetDatabaseForTests(): void {
  state.users.clear();
  state.merchants.clear();
  state.invoices.clear();
}
