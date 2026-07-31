# Rolldown current-directory panic

The message:

```text
Failed to get current dir: No such file or directory
```

means the running shell or dev process references a directory that has been
deleted, renamed, or replaced. This is an operating-system working-directory
failure, not a source-code transform failure.

## Recovery

Stop the failed process and open a new terminal:

```bash
cd /workspaces/powerpay
pwd
test -d app
npm install
npm run dev:reset
npm run dev
```

Do not keep a terminal open inside `/workspaces/powerpay/app` while replacing
or deleting the repository directory.

## Safe launcher

Both root and app `dev` scripts now use `scripts/run-vite-safe.mjs`. The
launcher derives the repository path from its own file location, verifies the
app and Vite executable exist, changes into the app directory, and starts Vite
with an explicit `cwd`.

This prevents Vite and Rolldown from inheriting an invalid workspace path.
