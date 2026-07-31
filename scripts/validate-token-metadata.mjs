import { readFileSync } from "node:fs";

const metadata = JSON.parse(
  readFileSync("token/metadata.json", "utf8"),
);

for (const field of [
  "name",
  "symbol",
  "description",
  "image",
  "decimals",
  "standard",
]) {
  if (metadata[field] === undefined || metadata[field] === "") {
    throw new Error(`token/metadata.json is missing ${field}`);
  }
}

if (!Number.isInteger(metadata.decimals) || metadata.decimals < 0) {
  throw new Error("Token decimals are invalid");
}

console.log("Token metadata: OK");
