import { PublicKey } from "@solana/web3.js";
import {
  POWERCHAIN_PROGRAM_ID,
  POWERPAY_PROGRAM_ID,
} from "../program-ids.js";

export const POWERPAY_PROGRAM_IDS = {
  powerpay: POWERPAY_PROGRAM_ID,
  powerchain: POWERCHAIN_PROGRAM_ID,
} as const;

export type PowerPayProgramName = keyof typeof POWERPAY_PROGRAM_IDS;

export type PowerPayProgramEnvironment =
  | "localnet"
  | "devnet"
  | "testnet"
  | "mainnet-beta";

export interface PowerPayProgramDefinition {
  id: PowerPayProgramName;
  address: PublicKey;
  environment: PowerPayProgramEnvironment;
  enabled: boolean;
}

export function powerPayProgram(
  id: PowerPayProgramName,
  environment: PowerPayProgramEnvironment = "devnet",
): PowerPayProgramDefinition {
  const value = POWERPAY_PROGRAM_IDS[id];

  return {
    id,
    address: new PublicKey(value),
    environment,
    enabled: true,
  };
}

export function listPowerPayPrograms(
  environment: PowerPayProgramEnvironment = "devnet",
): PowerPayProgramDefinition[] {
  return (Object.keys(POWERPAY_PROGRAM_IDS) as PowerPayProgramName[]).map(
    (id) => powerPayProgram(id, environment),
  );
}
