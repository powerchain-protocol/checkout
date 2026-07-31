import { useState } from "react";
import {
  ArrowRightIcon,
  CubeIcon,
  MixerHorizontalIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { NetworkIcon, TokenIcon } from "@web3icons/react/dynamic";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const balances = [
  { symbol: "SUI", amount: "24.891", usd: "$82.41" },
  { symbol: "PWRC", amount: "1,250.00", usd: "$1,250.00" },
  { symbol: "PWRP", amount: "8,420.00", usd: "$421.00" },
];

export function SuiPage() {
  const [network, setNetwork] = useState("testnet");

  return (
    <main className="content page-content" id="sui">
      <header className="page-hero">
        <div>
          <Badge variant="info" dot>Sui integration beta</Badge>
          <h1>Sui accounts, tokenized balances, and Cetus routing.</h1>
          <p>
            Inspect SUI, PWRC, and PWRP balances, fetch coin metadata and
            prices, and prepare wallet-signed Sui transactions.
          </p>
        </div>
        <div className="web3-icon-cloud">
          <NetworkIcon network="sui" size={48} variant="branded" />
          <TokenIcon symbol="SUI" size={48} variant="branded" />
          <CubeIcon width={34} height={34} />
        </div>
      </header>

      <div className="sui-toolbar">
        <label>
          <span>Network</span>
          <select
            value={network}
            onChange={(event) => setNetwork(event.target.value)}
          >
            <option value="devnet">Devnet</option>
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </label>
        <button className="secondary-button" type="button">
          <ReloadIcon />
          Refresh account
        </button>
      </div>

      <section className="sui-balance-grid">
        {balances.map((balance) => (
          <Card key={balance.symbol} interactive>
            <CardHeader>
              <TokenIcon
                symbol={balance.symbol}
                size={34}
                variant="branded"
              />
              <Badge variant="success">Trusted</Badge>
            </CardHeader>
            <CardContent>
              <p className="eyebrow">{balance.symbol} balance</p>
              <strong className="sui-balance-value">{balance.amount}</strong>
              <span className="sui-balance-usd">{balance.usd}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="sui-integration-grid">
        <Card>
          <CardHeader>
            <div>
              <p className="eyebrow">Cetus</p>
              <CardTitle>Swap routing</CardTitle>
            </div>
            <MixerHorizontalIcon />
          </CardHeader>
          <CardContent className="sui-route-card">
            <div><span>From</span><strong>SUI</strong></div>
            <ArrowRightIcon />
            <div><span>To</span><strong>PWRC</strong></div>
            <p>
              Quotes require a configured Cetus adapter, trusted coin types,
              expiry checks, slippage limits, and wallet review.
            </p>
            <button className="primary-button" type="button">
              Request quote
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account security</CardTitle>
          </CardHeader>
          <CardContent className="status-list">
            {[
              "Address format validation",
              "Trusted coin-type policy",
              "Exact atomic amount checks",
              "Wallet-owned signing",
              "Digest and effects verification",
            ].map((item) => (
              <div className="status-list__item" key={item}>
                <span className="ui-badge__dot" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
