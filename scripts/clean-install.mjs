import { rmSync } from "node:fs";
import {
  assertNotActiveDirectory,
  assertRepositoryPath,
  repositoryRoot,
} from "./lib/safe-paths.mjs";

const root = repositoryRoot(import.meta.url);

for (const relativePath of [
  "node_modules",
  "app/node_modules",
  "package-lock.json",
  "app/package-lock.json",
]) {
  const target = assertRepositoryPath(root, relativePath, "install cleanup target");

  if (relativePath.endsWith("node_modules")) {
    assertNotActiveDirectory(target, root);
  }

  rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}
