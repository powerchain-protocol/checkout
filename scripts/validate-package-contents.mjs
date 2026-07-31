import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

if (!existsSync("styles/powerpay.css")) {
  throw new Error("Missing styles/powerpay.css");
}

if (pkg.exports?.["./styles.css"] !== "./styles/powerpay.css") {
  throw new Error("./styles.css export must resolve to styles/powerpay.css");
}

if (pkg.files?.includes("reports")) {
  throw new Error("reports must not be published");
}

for (const entry of readdirSync(".")) {
  if (/^BUILD_REPORT.*\.md$/i.test(entry)) {
    throw new Error(`Build report must be moved to reports/: ${entry}`);
  }
}

console.log("Package contents: OK");
