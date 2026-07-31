import { rmSync } from "node:fs";
import {
  assertNotActiveDirectory,
  assertRepositoryPath,
  repositoryRoot,
} from "./lib/safe-paths.mjs";

const root = repositoryRoot(import.meta.url);
for (const relativePath of ["app/dist", "app/.vite"]) {
  const target = assertRepositoryPath(root, relativePath, "app clean target");
  assertNotActiveDirectory(target, root);
  rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}
