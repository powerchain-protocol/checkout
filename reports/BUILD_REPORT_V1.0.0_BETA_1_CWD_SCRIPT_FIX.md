# PowerPay CWD, application, and script safety fix

Generated: 2026-07-31T06:36:57.139356+00:00

- Script safety: PASS
- Safe Vite launcher: PASS
- Workspace: PASS
- API/WebSocket: PASS
- App startup: PASS
- Checkout UI: PASS
- Docker: PASS
- Version: PASS

## Corrected

- Added shell-level CWD recovery that works before Node/npm startup
- Added absolute-path safe development launcher
- Rooted cleanup, reset, and clean-install operations at the repository
- Added active-directory and repository-boundary deletion safeguards
- Added VS Code tasks and Codespaces terminal defaults
- Hardened current-directory diagnostics
- Preserved app, API, WebSocket, Docker, and startup validation
