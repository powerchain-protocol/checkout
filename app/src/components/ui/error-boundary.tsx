import { Component, type ErrorInfo, type ReactNode } from "react";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "./card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("PowerPay application error", { error, info });
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <main className="route-state route-state--centered">
        <Card className="route-state__card" tone="danger">
          <CardContent>
            <span className="route-state__icon" aria-hidden="true">
              <ExclamationTriangleIcon width={28} height={28} />
            </span>
            <p className="eyebrow">Application recovery</p>
            <h1>Something interrupted PowerPay.</h1>
            <p>
              No transaction was submitted by this screen. Retry the interface,
              or reload after checking the RPC and environment configuration.
            </p>
            <details>
              <summary>Technical details</summary>
              <code>{error.message}</code>
            </details>
            <div className="route-state__actions">
              <button className="secondary-button" type="button" onClick={this.reset}>
                Retry view
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={() => window.location.reload()}
              >
                <ReloadIcon />
                Reload app
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }
}
