import { existsSync, readFileSync } from "node:fs";

for (const manifestPath of ["package.json", "app/package.json"]) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  for (const dependency of [
    "@solana/wallet-adapter-wallets",
    "@mysten/dapp-kit-react",
  ]) {
    if (manifest.dependencies?.[dependency]) {
      throw new Error(
        `${manifestPath} still contains heavy dependency ${dependency}`,
      );
    }
  }
}

for (const sourcePath of [
  "src/providers/wallet-provider.tsx",
  "packages/sdk/powerpay/ui/src/providers/wallet-provider.tsx",
]) {
  const source = readFileSync(sourcePath, "utf8");
  if (source.includes("@solana/wallet-adapter-wallets")) {
    throw new Error(`${sourcePath} imports the wallet adapter bundle`);
  }
  if (!source.includes("wallets = []")) {
    throw new Error(`${sourcePath} does not use Wallet Standard discovery`);
  }
}

for (const path of [
  "scripts/bootstrap-dependencies.mjs",
  "scripts/install-repair.mjs",
]) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const root = JSON.parse(readFileSync("package.json", "utf8"));
for (const script of [
  "ci",
  "deps:bootstrap",
  "install:repair",
  "deps:slim:validate",
]) {
  if (!root.scripts?.[script]) {
    throw new Error(`package.json missing scripts.${script}`);
  }
}

console.log("Dependency slimming and recovery scripts: OK");
