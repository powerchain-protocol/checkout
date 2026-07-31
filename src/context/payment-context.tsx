import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ConfirmedPayment } from "../solana/payments.js";

interface PaymentContextValue {
  lastPayment: ConfirmedPayment | null;
  pending: boolean;
  error: Error | null;
  runPayment<T extends ConfirmedPayment>(
    action: () => Promise<T>,
  ): Promise<T>;
  reset(): void;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [lastPayment, setLastPayment] =
    useState<ConfirmedPayment | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const runPayment = useCallback(
    async <T extends ConfirmedPayment>(action: () => Promise<T>) => {
      setPending(true);
      setError(null);
      try {
        const payment = await action();
        setLastPayment(payment);
        return payment;
      } catch (cause) {
        const normalized =
          cause instanceof Error ? cause : new Error(String(cause));
        setError(normalized);
        throw normalized;
      } finally {
        setPending(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setLastPayment(null);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ lastPayment, pending, error, runPayment, reset }),
    [lastPayment, pending, error, runPayment, reset],
  );

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext(): PaymentContextValue {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used inside PaymentProvider");
  }
  return context;
}
