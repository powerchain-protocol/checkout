import { spawnSync } from "node:child_process";

function commandExists(command) {
  const result = spawnSync(
    process.platform === "win32" ? "where" : "sh",
    process.platform === "win32"
      ? [command]
      : ["-c", `command -v ${command}`],
    { stdio: "ignore" },
  );
  return result.status === 0;
}

const status = {
  cargo: commandExists("cargo"),
  cargoBuildSbf: commandExists("cargo-build-sbf"),
  cargoBuildBpf: commandExists("cargo-build-bpf"),
  solana: commandExists("solana"),
  rustc: commandExists("rustc"),
};

const mode = status.cargoBuildSbf
  ? "sbf"
  : status.cargoBuildBpf
    ? "bpf"
    : status.cargo
      ? "host-check"
      : "structural-validation";

console.log(JSON.stringify({ mode, ...status }, null, 2));

if (mode === "structural-validation") {
  console.log(
    "\nCargo is unavailable. `npm run build:programs` will validate source " +
    "structure and exit successfully without producing binaries.",
  );
} else if (mode === "host-check") {
  console.log(
    "\nCargo is available, but Solana SBF tools are missing. " +
    "`npm run build:programs` will run `cargo check --workspace`.",
  );
} else {
  console.log(`\nProgram build mode: ${mode}`);
}
