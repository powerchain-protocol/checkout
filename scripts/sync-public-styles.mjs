import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";

const source = [
  "src/styles/powerpay.css",
  "app/src/styles/app.css",
].find(existsSync);

if (!source) {
  console.error("No PowerPay stylesheet source was found");
  process.exit(1);
}

mkdirSync("styles", { recursive: true });
writeFileSync(
  "styles/powerpay.css",
  "/* PowerPay SDK public stylesheet — generated. */\n" +
    readFileSync(source, "utf8"),
);

console.log(`Synchronized ${source} -> styles/powerpay.css`);
