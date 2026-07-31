import { useMemo, useState } from "react";
import {
  CheckIcon,
  ClipboardCopyIcon,
  CodeIcon,
  PaperPlaneIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { NetworkIcon, TokenIcon } from "@web3icons/react/dynamic";
import bs58 from "bs58";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function TestAreaPage() {
  const [reference, setReference] = useState("PowerPay reference");
  const [copied, setCopied] = useState(false);

  const encoded = useMemo(
    () => bs58.encode(new TextEncoder().encode(reference || "PowerPay")),
    [reference],
  );

  async function copyEncoded() {
    await navigator.clipboard.writeText(encoded);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="content page-content" id="testarea">
      <header className="page-heading">
        <div>
          <Badge variant="info">Developer sandbox</Badge>
          <h1>Test area</h1>
          <p>Exercise UI states and local encoding without submitting a transaction.</p>
        </div>
        <div className="web3-icon-row">
          <NetworkIcon name="solana" size={34} variant="branded" />
          <TokenIcon symbol="SOL" size={34} variant="branded" />
          <TokenIcon symbol="USDC" size={34} variant="branded" />
        </div>
      </header>

      <div className="test-grid">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Base58 reference utility</CardTitle>
              <CardDescription>
                Encode a human-readable checkout reference for test fixtures.
              </CardDescription>
            </div>
            <CodeIcon />
          </CardHeader>
          <CardContent>
            <label className="field">
              <span>Reference text</span>
              <textarea
                rows={4}
                value={reference}
                onChange={(event) => setReference(event.target.value)}
              />
            </label>
            <div className="encoded-output">
              <code>{encoded}</code>
              <button
                className="icon-button"
                type="button"
                onClick={copyEncoded}
                aria-label="Copy Base58 value"
              >
                {copied ? <CheckIcon /> : <ClipboardCopyIcon />}
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Checkout state controls</CardTitle>
              <CardDescription>
                Preview button and status patterns used by payment workflows.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="test-actions">
            <button className="primary-button" type="button">
              <PaperPlaneIcon /> Simulate request
            </button>
            <button className="secondary-button" type="button">
              <ResetIcon /> Reset fixture
            </button>
            <div className="badge-preview">
              <Badge variant="success" dot>Confirmed</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="danger" dot>Failed</Badge>
              <Badge variant="outline">Draft</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
