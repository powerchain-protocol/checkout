import { rmSync } from "node:fs";
import { resolve } from "node:path";

for (const directory of ["dist", "app/dist", "coverage"]) {
  rmSync(resolve(process.cwd(), directory), { recursive: true, force: true });
  console.log(`Removed ${directory}`);
}
