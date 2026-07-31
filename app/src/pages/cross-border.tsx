import { useState } from "react";
import {
  ArrowRightIcon,
  GlobeIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { NetworkIcon, TokenIcon } from "@web3icons/react/dynamic";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function CrossBorderPage() {
  const [amount, setAmount] = useState("100.00");

  return (
    <main className="content page-content" id="cross-border">
      <header className="page-hero">
        <div>
          <Badge variant="info" dot>Cross-border beta</Badge>
          <h1>Move native USDC across supported networks.</h1>
          <p>
            PowerPay models Circle CCTP routes separately from local Solana
            settlement and never presents wrapped assets as native USDC.
          </p>
        </div>
        <div className="web3-icon-cloud">
          <NetworkIcon network="solana" size={46} variant="branded" />
          <TokenIcon symbol="USDC" size={46} variant="branded" />
          <GlobeIcon width={34} height={34} />
        </div>
      </header>

      <div className="cross-border-grid">
        <Card>
          <CardHeader>
            <div>
              <p className="eyebrow">Transfer route</p>
              <CardTitle>Cross-border payment</CardTitle>
            </div>
            <Badge variant="warning">Testnet only</Badge>
          </CardHeader>
          <CardContent className="cross-border-form">
            <label className="field">
              <span>Amount</span>
              <div className="amount-input">
                <input
                  value={amount}
                  inputMode="decimal"
                  onChange={(event) => setAmount(event.target.value)}
                />
                <strong>USDC</strong>
              </div>
            </label>

            <div className="route-selector">
              <div>
                <span>Source</span>
                <strong><NetworkIcon network="solana" size={24} variant="branded" /> Solana</strong>
              </div>
              <ArrowRightIcon />
              <div>
                <span>Destination</span>
                <strong>Choose network</strong>
              </div>
            </div>

            <div className="route-disclosure">
              <LockClosedIcon />
              <p>
                Native USDC is burned on the source chain and minted after
                Circle attestation. Destination completion is a separate
                confirmed transaction.
              </p>
            </div>

            <button className="primary-button payment-submit" type="button">
              Review cross-border transfer
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated settlement</CardTitle>
          </CardHeader>
          <CardContent className="settlement-summary">
            <div><span>You send</span><strong>{amount} USDC</strong></div>
            <div><span>PowerPay fee</span><strong>Shown before signing</strong></div>
            <div><span>Route</span><strong>Circle CCTP</strong></div>
            <div><span>Recipient receives</span><strong>Validated native USDC</strong></div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
