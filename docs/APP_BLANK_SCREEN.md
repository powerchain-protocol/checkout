# Blank-screen recovery

The app now displays a server-rendered startup card before React mounts. If a
top-level module, provider, or render error occurs, the page replaces the
startup card with a visible error message instead of leaving an empty screen.

## Development checks

```bash
cd /workspaces/powerpay
npm install
npm run dev:doctor
npm run dev:reset
npm run dev
```

## PWA behavior

Manifest injection and service-worker registration are production-only.
Development no longer requests missing manifest or service-worker resources.

## Wallet behavior

Wallet-provider initialization is isolated behind a runtime boundary. If the
wallet adapter cannot initialize, the application still renders in read-only
demonstration mode.

## Install-script warnings

npm may report packages with unapproved install scripts. PowerPay permits only
the required build-time scripts for Vite and Prisma in `.npmrc`:

- `esbuild`
- `prisma`
- `@prisma/engines`
- `protobufjs`

Review the current list with:

```bash
npm run install:scripts:review
```

Native optional packages such as USB and websocket accelerators are not
automatically approved.
