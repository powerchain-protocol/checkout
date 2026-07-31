import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  PowerPayClientIdentity,
  PowerPayPaymentChannel,
  PowerPaySettlement,
} from "../types/sdk.js";

export interface CheckoutDraft {
  channel: PowerPayPaymentChannel;
  amount: string;
  currency: string;
  settlement: PowerPaySettlement;
  client?: PowerPayClientIdentity;
  memo?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckoutContextValue {
  draft: CheckoutDraft;
  update: (patch: Partial<CheckoutDraft>) => void;
  reset: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({
  children,
  initialDraft,
}: {
  children: ReactNode;
  initialDraft?: Partial<CheckoutDraft>;
}) {
  const initial = useMemo<CheckoutDraft>(
    () => ({
      channel: "checkout",
      amount: "0",
      currency: "USD",
      settlement: {
        chain: "powerchain",
        asset: "PWRC",
      },
      ...initialDraft,
    }),
    [initialDraft],
  );

  const [draft, setDraft] = useState(initial);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      draft,
      update: (patch) =>
        setDraft((current) => ({ ...current, ...patch })),
      reset: () => setDraft(initial),
    }),
    [draft, initial],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutDraft(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutDraft must be used inside CheckoutProvider",
    );
  }
  return context;
}
