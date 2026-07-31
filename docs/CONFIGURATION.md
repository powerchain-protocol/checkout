# Configuration

Configuration is split into:

- `src/config/env.ts` for validated environment variables;
- `src/config/networks.ts` for network defaults;
- `.env.example` for the combined browser/server template;
- `env/beta.env.example` for the beta server template.

Use `readPowerPayEnv` with `process.env` on a server. In Vite applications,
pass `import.meta.env` as a string record.

Server variables take precedence over browser aliases.

Never expose:

- private keys;
- seed phrases;
- API signing secrets;
- Helius API keys;
- merchant backend credentials;

through `VITE_` variables.
