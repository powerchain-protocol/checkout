import {
  CheckCircledIcon,
  CodeIcon,
  ExternalLinkIcon,
  GlobeIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { NetworkIcon, TokenIcon, WalletIcon } from "@web3icons/react/dynamic";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const capabilities = [
  {
    icon: LockClosedIcon,
    title: "Non-custodial",
    text: "PowerPay prepares payment instructions while the connected wallet controls approval.",
  },
  {
    icon: GlobeIcon,
    title: "Network-aware",
    text: "Cluster, RPC provider, program IDs, and mint configuration remain explicit.",
  },
  {
    icon: CodeIcon,
    title: "TypeScript-first",
    text: "Typed merchant, payer, pricing, token, metadata, and Solana Pay modules.",
  },
];

export function InformationsPage() {
  return (
    <main className="content page-content" id="informations">
      <header className="page-hero">
        <div>
          <Badge variant="info" dot>Platform information</Badge>
          <h1>Solana checkout infrastructure with visible trust boundaries.</h1>
          <p>
            Review the active payment stack, supported asset presentation, and
            operational safeguards before moving a merchant to production.
          </p>
        </div>
        <div className="web3-icon-cloud" aria-label="Supported Web3 services">
          <NetworkIcon name="solana" size={48} variant="branded" />
          <TokenIcon symbol="SOL" size={48} variant="branded" />
          <TokenIcon symbol="USDC" size={48} variant="branded" />
          <WalletIcon name="phantom" size={48} variant="branded" />
        </div>
      </header>

      <section className="feature-card-grid">
        {capabilities.map(({ icon: Icon, title, text }) => (
          <Card key={title} interactive>
            <CardHeader>
              <span className="feature-icon"><Icon width={20} height={20} /></span>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardDescription>{text}</CardDescription>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Integration status</CardTitle>
            <CardDescription>
              Components included in this professional reference workspace.
            </CardDescription>
          </div>
          <Badge variant="success" dot>Ready for development</Badge>
        </CardHeader>
        <CardContent className="status-list">
          {[
            "Anchor client and program account helpers",
            "Base58 reference and signature utilities",
            "Axios browser API client",
            "Node fetch compatibility for server tools",
            "Radix interface icons",
            "Web3 token, network, and wallet icon components",
          ].map((item) => (
            <div className="status-list__item" key={item}>
              <CheckCircledIcon className="status-list__check" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
        <a
          className="text-link"
          href="https://github.com/powerchain-protocol/powerpay-checkout-sdk"
          target="_blank"
          rel="noreferrer"
        >
          Open repository <ExternalLinkIcon />
        </a>
      </Card>
    </main>
  );
}
