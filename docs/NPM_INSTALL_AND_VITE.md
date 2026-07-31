# npm installation and Vite React plugin

This repository is configured as an npm workspace.

## Install

The terminal must be inside an existing repository directory:

```bash
cd /workspaces/powerpay
npm install
```

The `uv_cwd` error occurs before npm loads `package.json`. It means the shell
still points at a directory that was deleted or renamed. `npm install`,
dependency changes, and lockfile deletion cannot repair that shell state.

Open a new terminal or move to an existing directory first:

```bash
cd /
cd /workspaces/powerpay
pwd
npm run cwd:check
npm install
```

## Vite React plugin

`@vitejs/plugin-react` is declared in both the workspace root and demo app
development dependencies. This supports editors that resolve
`app/vite.config.ts` from the root and npm installations that hoist workspace
dependencies.

```ts
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## Clean installation

From the repository root:

```bash
npm run install:clean
```

This removes workspace `node_modules` directories and lockfiles, then performs
a fresh npm installation.
