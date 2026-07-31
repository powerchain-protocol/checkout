import { useMemo, useState } from "react";
import {
  CheckCircledIcon,
  LockClosedIcon,
  WalletIcon,
} from "@radix-ui/react-icons";
import { NetworkIcon, TokenIcon } from "@web3icons/react/dynamic";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface PaymentFormValue {
  currency: "SOL" | "USDC" | "PWRP";
  email: string;
  billingName: string;
  acceptTerms: boolean;
}

export function PaymentForm({
  amount,
  walletAddress,
  pending = false,
  onSubmit,
}: {
  amount: string;
  walletAddress?: string | null;
  pending?: boolean;
  onSubmit?: (value: PaymentFormValue) => Promise<void> | void;
}) {
  const [value, setValue] = useState<PaymentFormValue>({
    currency: "USDC",
    email: "",
    billingName: "",
    acceptTerms: false,
  });
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () =>
      Boolean(
        walletAddress &&
        value.email.includes("@") &&
        value.billingName.trim() &&
        value.acceptTerms &&
        !pending,
      ),
    [walletAddress, value, pending],
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) {
      setError("Connect a wallet and complete all required fields.");
      return;
    }

    setError(null);
    try {
      await onSubmit?.(value);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Payment failed");
    }
  }

  return (
    <Card className="payment-form-card">
      <CardHeader>
        <div>
          <p className="eyebrow">Payment</p>
          <CardTitle>Complete checkout</CardTitle>
        </div>
        <Badge variant={walletAddress ? "success" : "warning"} dot>
          {walletAddress ? "Wallet connected" : "Wallet required"}
        </Badge>
      </CardHeader>

      <CardContent>
        <form className="payment-form" onSubmit={submit}>
          <fieldset>
            <legend>Pay with</legend>
            <div className="currency-options">
              {(["USDC", "SOL", "PWRP"] as const).map((currency) => (
                <label
                  className={
                    value.currency === currency
                      ? "currency-option selected"
                      : "currency-option"
                  }
                  key={currency}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={currency}
                    checked={value.currency === currency}
                    onChange={() => setValue({ ...value, currency })}
                  />
                  <TokenIcon symbol={currency} size={28} variant="branded" />
                  <span>
                    <strong>{currency}</strong>
                    <small>
                      {currency === "USDC"
                        ? "Stable payment"
                        : currency === "SOL"
                          ? "Native Solana"
                          : "PowerPay token"}
                    </small>
                  </span>
                  {value.currency === currency && <CheckCircledIcon />}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Billing name</span>
            <input
              value={value.billingName}
              onChange={(event) =>
                setValue({ ...value, billingName: event.target.value })
              }
              autoComplete="name"
              placeholder="Atlas Customer"
            />
          </label>

          <label className="field">
            <span>Email receipt</span>
            <input
              type="email"
              value={value.email}
              onChange={(event) =>
                setValue({ ...value, email: event.target.value })
              }
              autoComplete="email"
              placeholder="customer@example.com"
            />
          </label>

          <div className="wallet-summary">
            <WalletIcon />
            <div>
              <span>Payment wallet</span>
              <strong>
                {walletAddress
                  ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-6)}`
                  : "Connect a Solana wallet"}
              </strong>
            </div>
            <NetworkIcon network="solana" size={28} variant="branded" />
          </div>

          <label className="terms-check">
            <input
              type="checkbox"
              checked={value.acceptTerms}
              onChange={(event) =>
                setValue({ ...value, acceptTerms: event.target.checked })
              }
            />
            <span>
              I authorize this wallet payment and confirm the invoice details.
            </span>
          </label>

          {error && <div className="form-error" role="alert">{error}</div>}

          <button
            className="primary-button payment-submit"
            type="submit"
            disabled={!canSubmit}
          >
            <LockClosedIcon />
            {pending ? "Confirming payment…" : `Pay ${amount}`}
          </button>

          <p className="secure-note">
            Transaction details are simulated before your wallet requests a
            signature. PowerPay never receives your private key.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
