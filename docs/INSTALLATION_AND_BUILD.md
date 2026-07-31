# Installation and build

Run all setup commands from the repository root.

```bash
npm run doctor
npm run env:init
npm install
npm run build:sdk
```

## npm install-script approvals

Recent npm releases may require explicit approval before dependency lifecycle
scripts can run.

```bash
npm install-scripts ls
npm install-scripts approve <package>
npm install-scripts deny <package>
```

Review each package before approval. Do not approve an unknown package merely to
make installation continue.

## TypeScript 6

The SDK `tsconfig.json` explicitly sets:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

This prevents TypeScript 6 from changing emitted file layout based on inferred
common source directories.

## Offline structural verification

The repository includes local declaration shims for environments where npm
dependencies cannot be downloaded:

```bash
npm run verify:offline
```

This validates PowerPay source structure and declarations. A release must still
pass the normal dependency-backed build and test suite.
