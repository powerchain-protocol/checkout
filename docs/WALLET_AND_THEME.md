# Wallet, cluster, and theme integration

PowerPay supports explicit devnet and mainnet-beta runtime selection. RPC routing may use Solana public endpoints, a custom endpoint, or Helius.

```tsx
import "@powerchain-protocol/powerpay-checkout-sdk/styles.css";
import {
  ConnectButton,
  ThemeProvider,
  ThemeToggle,
  WalletProvider,
} from "@powerchain-protocol/powerpay-checkout-sdk";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <WalletProvider
        cluster="devnet"
        rpcProvider="helius"
        heliusApiKey={import.meta.env.VITE_HELIUS_API_KEY}
      >
        <div className="pp-ui">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </WalletProvider>
    </ThemeProvider>
  );
}
```

## Mainnet safety

Do not silently switch a connected checkout from devnet to mainnet-beta. Display the selected network, invalidate old quotes, and rebuild every transaction after a cluster change.

## Theme palette

The UI uses white, light gray, dark green, black, and onyx tokens. Import the stylesheet once:

```ts
import "@powerchain-protocol/powerpay-checkout-sdk/styles.css";
```
