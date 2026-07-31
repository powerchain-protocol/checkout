import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { WalletProvider } from "@powerpay/sdk";

interface WalletRuntimeProps {
  children: ReactNode;
}

interface WalletRuntimeState {
  unavailable: boolean;
}

class WalletRuntimeBoundary extends Component<
  WalletRuntimeProps,
  WalletRuntimeState
> {
  state: WalletRuntimeState = { unavailable: false };

  static getDerivedStateFromError(): WalletRuntimeState {
    return { unavailable: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Wallet runtime unavailable", { error, info });
  }

  render() {
    if (this.state.unavailable) {
      return (
        <>
          <aside className="environment-banner" role="status">
            Wallet integration is unavailable. The dashboard remains in
            read-only demonstration mode.
          </aside>
          {this.props.children}
        </>
      );
    }

    return (
      <WalletProvider cluster="devnet" rpcProvider="public">
        {this.props.children}
      </WalletProvider>
    );
  }
}

export function WalletRuntime({ children }: WalletRuntimeProps) {
  return (
    <WalletRuntimeBoundary>
      {children}
    </WalletRuntimeBoundary>
  );
}
