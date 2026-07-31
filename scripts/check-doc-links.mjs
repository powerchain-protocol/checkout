import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
const dir = new URL("../docs/", import.meta.url);
for (const file of await readdir(dir)) {
  if (!file.endsWith(".md")) continue;
  const text = await readFile(new URL(file, dir), "utf8");
  if (!text.trim()) throw new Error(`${file} is empty`);
}
console.log("Documentation files are present.");
