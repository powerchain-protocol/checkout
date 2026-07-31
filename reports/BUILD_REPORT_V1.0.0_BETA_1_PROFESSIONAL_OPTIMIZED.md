# PowerPay professional optimized application report

Generated: 2026-07-31T06:01:57.166486+00:00

- Exact design: PASS
- Loading optimization: PASS
- Install policy: PASS
- Dependency install: FAIL
- Production build: FAIL

## Delivered

- Professional exact-image loading experience
- Optimized AVIF, WebP, and PNG brand assets
- Functional staged startup and dashboard handoff
- Responsive light and dark themes
- Removed an unused unavailable Cetus package while preserving the adapter API
- Aligned React workspace versions and direct app build routing

## Dependency install

```text
npm error code E404
npm error 404 Not Found - GET https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/@coral-xyz%2fanchor
npm error 404
npm error 404  '@coral-xyz/anchor@^0.32.1' is not in this registry.
npm error 404
npm error 404 Note that you can also install from a
npm error 404 tarball, folder, http url, or git url.
npm error A complete log of this run can be found in: /mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/.npm-cache/_logs/2026-07-31T06_01_54_791Z-debug-0.log

```

## Production build

```text
d module '@solana/web3.js' or its corresponding type declarations.
../src/lib/solana.ts(41,47): error TS7031: Binding element 'pubkey' implicitly has an 'any' type.
../src/lib/solana.ts(41,55): error TS7031: Binding element 'account' implicitly has an 'any' type.
../src/lib/sui-rpc.ts(1,43): error TS2307: Cannot find module 'axios' or its corresponding type declarations.
../src/lib/trusted-tokens.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/merchant/client.ts(1,51): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/merchant/payment-client.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/merchant/types.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/metadata/metaplex.ts(1,27): error TS2307: Cannot find module '@metaplex-foundation/umi-bundle-defaults' or its corresponding type declarations.
../src/metadata/metaplex.ts(8,8): error TS2307: Cannot find module '@metaplex-foundation/mpl-token-metadata' or its corresponding type declarations.
../src/metadata/metaplex.ts(15,8): error TS2307: Cannot find module '@metaplex-foundation/umi' or its corresponding type declarations.
../src/payer/client.ts(7,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(1,32): error TS2307: Cannot find module 'react' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(5,8): error TS2307: Cannot find module '@solana/wallet-adapter-react' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(6,30): error TS2307: Cannot find module '@solana/wallet-adapter-base' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(10,8): error TS2307: Cannot find module '@solana/wallet-adapter-wallets' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(11,37): error TS2307: Cannot find module '@solana/wallet-adapter-react-ui' or its corresponding type declarations.
../src/providers/wallet-provider.tsx(43,5): error TS2875: This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. Make sure you have types for the appropriate package installed.
../src/pwa.tsx(1,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
../src/pwrp.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/pwrp.ts(2,39): error TS2307: Cannot find module '@solana/spl-token' or its corresponding type declarations.
../src/rpc/clusters.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/rpc/connection.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/security/validate.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/services/account-service.ts(1,44): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/services/cross-border-service.ts(1,32): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/services/payment-service.ts(1,32): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana-pay-sdk.ts(1,53): error TS2307: Cannot find module '@solana/pay' or its corresponding type declarations.
../src/solana-pay-sdk.ts(2,23): error TS2307: Cannot find module 'bignumber.js' or its corresponding type declarations.
../src/solana-pay-sdk.ts(3,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana-pay.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/finality.ts(1,43): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/history.ts(8,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/history.ts(69,21): error TS2552: Cannot find name 'finality'. Did you mean 'Finality'?
../src/solana/instructions.ts(1,24): error TS2307: Cannot find module 'buffer' or its corresponding type declarations.
../src/solana/instructions.ts(6,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/payments.ts(9,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/payments.ts(14,8): error TS2307: Cannot find module '@solana/spl-token' or its corresponding type declarations.
../src/solana/pdas.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/solana-payments.ts(1,23): error TS2307: Cannot find module 'bignumber.js' or its corresponding type declarations.
../src/solana/solana-payments.ts(2,20): error TS2307: Cannot find module 'qrcode' or its corresponding type declarations.
../src/solana/solana-payments.ts(8,8): error TS2307: Cannot find module '@solana/pay' or its corresponding type declarations.
../src/solana/solana-payments.ts(15,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/validation.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/validation.ts(12,8): error TS2307: Cannot find module '@solana/spl-token' or its corresponding type declarations.
../src/solana/wallet.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/wallet.ts(13,24): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/solana/wallet.ts(14,22): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/tokens.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/types/checkout.ts(1,54): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/types/common.ts(1,44): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/utils/helpers.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
../src/validate.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
npm error Lifecycle script `build` failed with error:
npm error code 1
npm error path /mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/app
npm error workspace @powerchain-protocol/powerpay-demo-app@1.0.0-beta.1
npm error location /mnt/data/powerpay-checkout-sdk-v1.0.0-beta.1-fixed/app
npm error command failed
npm error command sh -c tsc -b && vite build

```
