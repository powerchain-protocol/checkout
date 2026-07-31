# Workspace Architecture

PowerPay follows explicit dependency boundaries.

```text
root
├── src/                         Public SDK implementation
├── app/
│   ├── src/                     Merchant application
│   └── api/v1/                  Reference API handlers
└── packages/
    ├── config/                  Shared policy and repository configuration
    └── sdk/powerpay/ui/         Reusable React UI package
```

## Root SDK: `src/`

Owns public types, API clients, hooks, contexts, constants, blockchain
integrations, services, and package exports.

It must remain browser-safe where documented and must not import application
pages or demo-only data.

## Merchant app: `app/src/`

Owns routing, pages, merchant workflows, demo data, application composition,
and product-specific UI.

It consumes the SDK through `@powerpay/sdk` and shared UI packages.

## Shared packages: `packages/`

Contains independently bounded reusable modules. Packages must expose a clear
entrypoint and must not reach into `app/src`.

## API handlers: `app/api/v1/`

Provides the reference HTTP routing implementation. Shared request and
response types belong in the root SDK; handler-specific storage and routing
remain under the application API directory.


## Development dependency state

Before typechecking or testing a new checkout, run:

```bash
npm install
npm run deps:dev:validate
```

The SDK test command invokes Vitest through Node instead of relying on the
filesystem execute bit of `node_modules/.bin/vitest`. This is more reliable in
Codespaces, mounted volumes, extracted archives, and restrictive containers.
