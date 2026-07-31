# PowerPay UI Foundation

The merchant application now uses a layered style architecture:

```text
globals.css      tokens, reset, themes, accessibility, utilities
components.css   reusable button, badge, empty-state components
app.css          application layouts and feature-specific styling
```

## TypeScript environment

`app/tsconfig.json` includes both:

```json
"types": ["vite/client", "node"]
```

This supports Vite globals and Node globals such as `process` in build and
configuration files. The app workspace also declares `@types/node` directly.

## Components

New reusable primitives:

- `Button`
- `Badge`
- `EmptyState`

Buttons include variants, sizes, loading state, icons, disabled behavior, and
full-width presentation.

## Accessibility

The global foundation includes:

- consistent visible focus rings;
- screen-reader-only content;
- reduced-motion handling;
- accessible selection colors;
- touch-safe controls;
- semantic loading and disabled states.
