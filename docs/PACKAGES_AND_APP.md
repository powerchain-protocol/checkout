# Packages and application

npm is the canonical workspace manager.

## Workspaces

```text
app
packages/config
packages/sdk/powerpay/ui
```

All workspace package commands live under each manifest's `scripts` object.
The app uses the root SDK at the matching `1.0.0-beta.1` workspace version.

## Commands

```bash
npm install
npm run packages:validate
npm run packages:typecheck
npm run app:typecheck
npm run app:build
npm run dev:safe
```

App development, builds, previews, and cleanup resolve their directories from
the script location. They do not depend on the terminal's inherited working
directory.

## Package roles

`@powerchain-protocol/powerpay-config` owns workspace and install-script policy.

`@powerchain-protocol/powerpay-ui` owns reusable React checkout components and
styles.

`@powerchain-protocol/powerpay-demo-app` is the professional Vite merchant
application.
