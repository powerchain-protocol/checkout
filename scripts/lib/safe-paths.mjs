import {
  existsSync,
  realpathSync,
  statSync,
} from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function repositoryRoot(importMetaUrl) {
  const scriptDirectory = dirname(fileURLToPath(importMetaUrl));
  const root = resolve(scriptDirectory, "../..");
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    throw new Error(`PowerPay repository root is unavailable: ${root}`);
  }
  return realpathSync(root);
}

export function safeCurrentDirectory(fallback) {
  try {
    return realpathSync(process.cwd());
  } catch {
    return realpathSync(fallback);
  }
}

export function assertRepositoryPath(root, target, label = "path") {
  const absoluteRoot = realpathSync(root);
  const absoluteTarget = isAbsolute(target)
    ? resolve(target)
    : resolve(absoluteRoot, target);
  const relation = relative(absoluteRoot, absoluteTarget);

  if (
    relation === "" ||
    relation === ".." ||
    relation.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) ||
    isAbsolute(relation)
  ) {
    throw new Error(
      `Refusing unsafe ${label} outside or equal to repository root: ${absoluteTarget}`,
    );
  }

  return absoluteTarget;
}

export function assertNotActiveDirectory(target, fallbackRoot) {
  const current = safeCurrentDirectory(fallbackRoot);
  const resolvedTarget = resolve(target);

  if (
    current === resolvedTarget ||
    current.startsWith(`${resolvedTarget}/`) ||
    resolvedTarget.startsWith(`${current}/`)
  ) {
    throw new Error(
      `Refusing to remove an active directory or its ancestor/descendant: ${resolvedTarget}`,
    );
  }
}
