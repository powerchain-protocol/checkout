# SDK compiler-fix report

- `ConfirmationPopupCard` mouse event: fixed
- `useWalletModal` import: fixed
- Unsupported Backpack adapter import: removed
- Vite-only `import.meta.env` access: replaced with explicit configuration
- `npm run build:sdk`: FAIL

```text
plicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
src/components/wallet-connect-modal.tsx(108,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
src/components/wallet-connect-modal.tsx(109,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
src/config.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/constants/clusters.ts(1,31): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/constants/programs.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/context/cluster-context.tsx(7,8): error TS2307: Cannot find module 'react' or its corresponding type declarations.
src/context/cluster-context.tsx(8,33): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/context/cluster-context.tsx(57,5): error TS2875: This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. Make sure you have types for the appropriate package installed.
src/hooks/use-mobile.ts(1,37): error TS2307: Cannot find module 'react' or its corresponding type declarations.
src/merchant/client.ts(1,51): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/merchant/types.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/metadata/metaplex.ts(1,27): error TS2307: Cannot find module '@metaplex-foundation/umi-bundle-defaults' or its corresponding type declarations.
src/metadata/metaplex.ts(8,8): error TS2307: Cannot find module '@metaplex-foundation/mpl-token-metadata' or its corresponding type declarations.
src/metadata/metaplex.ts(15,8): error TS2307: Cannot find module '@metaplex-foundation/umi' or its corresponding type declarations.
src/payer/client.ts(7,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/providers/wallet-provider.tsx(1,32): error TS2307: Cannot find module 'react' or its corresponding type declarations.
src/providers/wallet-provider.tsx(5,8): error TS2307: Cannot find module '@solana/wallet-adapter-react' or its corresponding type declarations.
src/providers/wallet-provider.tsx(6,30): error TS2307: Cannot find module '@solana/wallet-adapter-base' or its corresponding type declarations.
src/providers/wallet-provider.tsx(10,8): error TS2307: Cannot find module '@solana/wallet-adapter-wallets' or its corresponding type declarations.
src/providers/wallet-provider.tsx(11,37): error TS2307: Cannot find module '@solana/wallet-adapter-react-ui' or its corresponding type declarations.
src/providers/wallet-provider.tsx(43,5): error TS2875: This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. Make sure you have types for the appropriate package installed.
src/pwa.tsx(1,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
src/pwrp.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/pwrp.ts(2,39): error TS2307: Cannot find module '@solana/spl-token' or its corresponding type declarations.
src/rpc/clusters.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/rpc/connection.ts(5,8): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/solana-pay-sdk.ts(1,53): error TS2307: Cannot find module '@solana/pay' or its corresponding type declarations.
src/solana-pay-sdk.ts(2,23): error TS2307: Cannot find module 'bignumber.js' or its corresponding type declarations.
src/solana-pay-sdk.ts(3,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/solana-pay.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/solana/instructions.ts(1,66): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/solana/instructions.ts(3,104): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(4,123): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(5,274): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(6,143): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(7,562): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(7,577): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(7,594): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(8,497): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(9,310): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(10,340): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(10,355): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(28,14): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(29,5): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(30,5): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(33,5): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(73,10): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/instructions.ts(97,10): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/pdas.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/solana/pdas.ts(5,115): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/pdas.ts(6,230): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/pdas.ts(6,273): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/solana/pdas.ts(7,114): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/tokens.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/types/checkout.ts(1,54): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.
src/validate.ts(1,27): error TS2307: Cannot find module '@solana/web3.js' or its corresponding type declarations.

```
