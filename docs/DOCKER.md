# Docker

PowerPay includes separate production and development container workflows.

## Production image

Build and run:

```bash
npm run docker:build
npm run docker:run
```

Open:

```text
http://localhost:8080
```

Health endpoint:

```text
http://localhost:8080/healthz
```

The production image uses a multi-stage build:

1. Node 22 installs npm workspace dependencies.
2. Vite builds the demo application.
3. Nginx serves the static output on port 8080.

Nginx includes an SPA fallback, so application routes resolve to `index.html`
instead of returning a blank 404 page.

## Docker Compose

Production:

```bash
npm run docker:up
```

Development with hot reload:

```bash
npm run docker:dev
```

The development service publishes Vite on port 5173 and uses named volumes for
workspace dependencies.

Stop services:

```bash
npm run docker:down
```

## Environment

Copy the template before running services that need API configuration:

```bash
cp .env.example .env
```

For production, configure exact CORS origins rather than using a wildcard:

```env
POWERPAY_CORS_ORIGINS=https://checkout.example.com
```

## Image version

The image and Compose configuration are standardized on:

```text
powerpay-checkout-sdk:1.0.0-beta.1
```
