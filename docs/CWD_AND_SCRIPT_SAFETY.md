# Working-directory and script safety

## Why `uv_cwd` happens

The shell stores its current directory as a reference to a filesystem entry.
When that directory is deleted or a workspace folder is replaced, the terminal
can continue displaying the old path while the entry no longer exists.

Node reads the current directory during startup. Therefore this failure happens
before npm can read `package.json` or execute `npm run dev`.

## Immediate Codespaces recovery

```bash
cd /workspaces/powerpay
npm run dev
```

A launcher that does not depend on the inherited working directory is also
available:

```bash
/workspaces/powerpay/scripts/dev.sh
```

## Safe cleanup

`clean.mjs`, `clean-install.mjs`, and `reset-dev-state.mjs` resolve targets from
the script location rather than `process.cwd()`. Each target must be inside the
repository, cannot equal the repository root, and cannot be the current
directory or one of its ancestors.

## VS Code

Use the task **PowerPay: Dev (CWD Safe)**. The devcontainer also sets new
integrated terminals to `/workspaces/powerpay`.
