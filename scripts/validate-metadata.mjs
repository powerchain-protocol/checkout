import { readFile } from "node:fs/promises";
const metadata = JSON.parse(await readFile(new URL("../public/metadata.json", import.meta.url)));
for (const field of ["name", "symbol", "description", "image"]) {
  if (!metadata[field]) throw new Error(`metadata.json is missing ${field}`);
}
if (metadata.symbol !== "PWRP") throw new Error("Expected PWRP symbol");
console.log("metadata.json valid:", metadata.name, metadata.symbol);
