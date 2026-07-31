# Loading Experience Optimization

The startup experience keeps the approved metallic PowerPay design while
reducing transfer size and runtime work.

## Asset delivery

The exact user-provided logo is available through responsive formats:

- AVIF when supported;
- WebP as the standard optimized format;
- optimized PNG as the compatibility fallback.

The original source asset remains in the repository for design traceability.

## Runtime behavior

- A static HTML startup layer appears before React executes.
- React takes over without changing the composition.
- Startup phases are tied to readiness work and protected by a five-second
  watchdog.
- The animation has a short minimum duration to prevent visual flashing.
- The screen is shown once per browser tab; later application remounts open
  directly into the dashboard.
- Reduced-motion preferences disable decorative motion.
- Short desktop screens and mobile screens use compact responsive layouts.

## Rendering performance

Decorative effects use transforms and opacity where possible. Major panels use
containment when the browser supports it. The main application fades in after
the startup screen without forcing a large layout shift.
