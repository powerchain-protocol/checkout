import { readFileSync } from "node:fs";

const prismaFallback = readFileSync(
  "database/generated/prisma/client.d.ts",
  "utf8",
);
const shims = readFileSync("build-shims/vendor-shims.d.ts", "utf8");
const localConfig = JSON.parse(
  readFileSync("tsconfig.local-build.json", "utf8"),
);
const prismaConfig = JSON.parse(
  readFileSync("tsconfig.prisma.json", "utf8"),
);

if (prismaFallback.includes('from "@prisma/client"')) {
  throw new Error(
    "Prisma fallback must not re-export generated members from @prisma/client",
  );
}

for (const marker of [
  "export declare class PrismaClient",
  "export declare namespace Prisma",
]) {
  if (!prismaFallback.includes(marker)) {
    throw new Error(`Prisma fallback missing ${marker}`);
  }
}

for (const forbidden of [
  "declare const Buffer",
  "type Buffer =",
  "export type ReactNode=any",
  "declare namespace React",
]) {
  if (shims.includes(forbidden)) {
    throw new Error(`Vendor shims contain duplicate ambient declaration: ${forbidden}`);
  }
}

for (const type of ["node", "react", "react-dom"]) {
  if (!(localConfig.compilerOptions.types ?? []).includes(type)) {
    throw new Error(`Local build missing official type package: ${type}`);
  }
}

if (
  !(prismaConfig.include ?? []).includes(
    "database/generated/prisma/**/*.d.ts",
  )
) {
  throw new Error("Prisma typecheck does not include generated fallback declarations");
}

console.log("Prisma 7 and ambient shim boundaries: OK");
