import { rmSync } from "node:fs";
import {
  assertNotActiveDirectory,
  assertRepositoryPath,
  repositoryRoot,
} from "./lib/safe-paths.mjs";

const root = repositoryRoot(import.meta.url);

for (const relativePath of ["dist", "app/dist", "coverage"]) {
  const target = assertRepositoryPath(root, relativePath, "clean target");
  assertNotActiveDirectory(target, root);
  rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}
