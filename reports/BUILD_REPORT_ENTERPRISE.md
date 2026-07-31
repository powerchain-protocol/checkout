# Build report

- Metadata validation: PASS
  - `metadata.json valid: PowerPay PWRP`
- TypeScript SDK build: FAIL

```text
src/config.ts(34,52): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/config.ts(35,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
src/index.ts(18,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './pwa.js'?
src/index.ts(19,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './brand-assets.js'?
src/index.ts(21,1): error TS2308: Module "./explorer.js" has already exported a member named 'SolanaCluster'. Consider explicitly re-exporting to resolve the ambiguity.
src/payer/client.ts(2,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'Connection'.
src/payer/client.ts(4,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'Transaction'.
src/payer/client.ts(6,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'VersionedTransaction'.
src/rpc/connection.ts(2,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'Commitment'.
src/rpc/connection.ts(3,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'Connection'.
src/rpc/connection.ts(4,3): error TS2305: Module '"@solana/web3.js"' has no exported member 'ConnectionConfig'.
src/solana-pay-sdk.ts(2,10): error TS2614: Module '"bignumber.js"' has no exported member 'BigNumber'. Did you mean to use 'import BigNumber from "bignumber.js"' instead?

```
- Rust program compile: NOT RUN (Cargo unavailable in this execution environment)

## Rebuild after type fixes

- TypeScript SDK build: PASS
