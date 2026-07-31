import {
  CheckCircledIcon,
  DashboardIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { ConnectButton, ThemeToggle } from "@powerpay/sdk";
import { Brand } from "./Brand";

export function AppHeader() {
  return (
    <header className="app-header">
      <Brand />
      <nav aria-label="Primary">
        <a className="active" href="#/overview">
          <DashboardIcon />
          Overview
        </a>
        <a href="#/checkout">
          <ReaderIcon />
          Checkout
        </a>
        <a href="/api-docs/">
          <CheckCircledIcon />
          Developers
        </a>
      </nav>
      <div className="header-actions">
        <span className="network-chip" title="Solana development network">
          <i aria-hidden="true" />
          Devnet
        </span>
        <ThemeToggle />
        <ConnectButton />
      </div>
    </header>
  );
}
