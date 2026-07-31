import {
  PowerPayPwa,
  ThemeProvider,
} from "@powerpay/sdk";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import { StartupScreen } from "./components/system/StartupScreen";
import { ToastRegion } from "./components/system/ToastRegion";
import { WalletRuntime } from "./components/system/WalletRuntime";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useAppStartup } from "./hooks/use-app-startup";
import { useHashRoute } from "./hooks/use-hash-route";
import { AlarmsPage } from "./pages/alarms";
import { CheckoutPage } from "./pages/checkout";
import { CrossBorderPage } from "./pages/cross-border";
import { SuiPage } from "./pages/sui";
import { InformationsPage } from "./pages/informations";
import { NotFoundPage } from "./pages/not-found";
import { OverviewPage } from "./pages/overview";
import { TestAreaPage } from "./pages/testarea";
import "./styles/app.css";
import "../../src/styles/powerpay.css";

function RouteContent() {
  const { route } = useHashRoute();

  return (
    <div className="pp-ui app-shell app-shell--entered">
      <AppHeader />
      <Sidebar activeRoute={route} />
      {route === "overview" && <OverviewPage />}
      {route === "informations" && <InformationsPage />}
      {route === "alarms" && <AlarmsPage />}
      {route === "testarea" && <TestAreaPage />}
      {route === "checkout" && <CheckoutPage />}
      {route === "cross-border" && <CrossBorderPage />}
      {route === "sui" && <SuiPage />}
      {route === "not-found" && <NotFoundPage />}
    </div>
  );
}

export function App() {
  const { phase, complete } = useAppStartup();

  if (!complete) {
    return <StartupScreen phase={phase} />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WalletRuntime>
          <PowerPayPwa enabled={import.meta.env.PROD} />
          <a className="skip-link" href="#overview">
            Skip to workspace
          </a>
          <RouteContent />
          <ToastRegion />
        </WalletRuntime>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
