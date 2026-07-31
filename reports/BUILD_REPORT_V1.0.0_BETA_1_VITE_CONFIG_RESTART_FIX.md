# PowerPay Vite config restart correction

Generated: 2026-07-31T07:30:48.501589+00:00

- Vite restart: PASS
- Safe launcher: PASS
- App startup: PASS
- Production structure: PASS

## Corrected

- Vite now runs from the stable repository root.
- The application root and config file are passed as absolute paths.
- Build and preview launchers use the same stable path model.
- Vite cache, optimizer entry, aliases, output directory, and fs allowlist are absolute.
- Config restarts no longer resolve `vite.config.ts` relative to a stale cwd.
