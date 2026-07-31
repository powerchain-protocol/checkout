import {
  mkdirSync,
  readdirSync,
  renameSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const reports = join(root, "reports");
mkdirSync(reports, { recursive: true });

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (path === reports || path.startsWith(`${reports}/`)) continue;

    const stats = statSync(path);
    if (stats.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(path);
      continue;
    }

    if (!/^BUILD_REPORT.*\.md$/i.test(name)) continue;

    const parent = relative(root, directory)
      .replaceAll("/", "_")
      .replaceAll("\\", "_");
    const targetName = parent ? `${parent}_${name}` : name;
    renameSync(path, join(reports, targetName));
    console.log(`Moved ${path} -> reports/${targetName}`);
  }
}

walk(root);
