declare module "@solana/web3.js" {
 export class PublicKey { constructor(value:any); static findProgramAddressSync(seeds:any[], programId:PublicKey):[PublicKey,number]; toBuffer():Uint8Array; toBase58():string; equals(other:PublicKey):boolean; }
 export type Commitment = "processed" | "confirmed" | "finalized";
 export interface ConnectionConfig { commitment?:Commitment; wsEndpoint?:string; confirmTransactionInitialTimeout?:number; }
 export class Connection {
   constructor(endpoint:string, config?:ConnectionConfig|Commitment);
   rpcEndpoint:string;
   getSlot(commitment?:Commitment):Promise<number>;
   getBlockHeight(commitment?:Commitment):Promise<number>;
   getVersion():Promise<any>;
   getLatestBlockhash(commitment?:Commitment):Promise<{blockhash:string,lastValidBlockHeight:number}>;
   sendRawTransaction(data:any,options?:any):Promise<string>;
   confirmTransaction(signature:any,commitment?:Commitment):Promise<any>;
 }
 export class TransactionInstruction { constructor(args:any); data:Uint8Array; keys:any[]; programId:PublicKey; }
 export class Transaction {
   feePayer?:PublicKey; recentBlockhash?:string;
   add(...instructions:TransactionInstruction[]):this;
   serialize():Uint8Array;
 }
 export class VersionedTransaction { serialize():Uint8Array; }
 export const SystemProgram:{programId:PublicKey;createAccount(args:any):any};
 export type TransactionSignature = string;
 export function clusterApiUrl(cluster:"devnet"|"testnet"|"mainnet-beta"):string;
}
declare module "@solana/spl-token" { export const TOKEN_2022_PROGRAM_ID:any; }
}
interface ImportMetaEnv { readonly [key: string]: string | boolean | undefined; }
interface ImportMeta { readonly env: ImportMetaEnv; }
; type ChangeEvent<T=any>={target:T}; }

declare module "@solana/pay" {
  import { PublicKey } from "@solana/web3.js";
  export interface TransferRequestURLFields {
    recipient: PublicKey; amount?: any; splToken?: PublicKey; reference?: PublicKey | PublicKey[];
    label?: string; message?: string; memo?: string;
  }
  export function encodeURL(fields: TransferRequestURLFields): URL;
}
declare module "bignumber.js" {
  export default class BigNumber { constructor(value: string | number); }
}
declare module "@metaplex-foundation/umi" {
  export interface Umi { identity: any; use(plugin: any): Umi; }
  export function publicKey(value:string): any;
  export function percentAmount(value:number, decimals?:number): any;
  export function generateSigner(umi:Umi): any;
  export function signerIdentity(signer:any): any;
}
declare module "@metaplex-foundation/umi-bundle-defaults" {
  import { Umi } from "@metaplex-foundation/umi";
  export function createUmi(endpoint:string): Umi;
}
declare module "@metaplex-foundation/mpl-token-metadata" {
  export enum TokenStandard { Fungible }
  export function mplTokenMetadata(): any;
  export function createV1(umi:any,args:any): {sendAndConfirm(umi:any):Promise<any>};
  export function updateV1(umi:any,args:any): {sendAndConfirm(umi:any):Promise<any>};
  export function fetchMetadataFromSeeds(umi:any,args:any): Promise<any>;
}

declare module "@solana/wallet-adapter-base" {
  export interface Adapter { name:string; icon?:string; readyState:string; }
}
declare module "@solana/wallet-adapter-react" {
  import { PublicKey } from "@solana/web3.js";
  export function ConnectionProvider(props:any): any;
  export function WalletProvider(props:any): any;
  export function useWallet(): {
    wallets:Array<{adapter:{name:string;icon?:string;readyState:string}}>;
    select(name:string):void; wallet:any; connecting:boolean;
    publicKey:PublicKey|null; connected:boolean; disconnect():Promise<void>;
  };
  export function useWalletModal(): {visible:boolean;setVisible(value:boolean):void};
}
declare module "@solana/wallet-adapter-react-ui" {
  export function WalletModalProvider(props:any): any;
  export function useWalletModal(): { visible:boolean; setVisible(value:boolean):void };
}
declare module "@solana/wallet-adapter-wallets" {
  export class PhantomWalletAdapter {name:string;icon?:string;readyState:string}
  export class SolflareWalletAdapter {name:string;icon?:string;readyState:string}
  export class BackpackWalletAdapter {name:string;icon?:string;readyState:string}
}

declare module "qrcode" {
  const QRCode: {
    toDataURL(value: string, options?: any): Promise<string>;
  };
  export default QRCode;
}

declare module "@pythnetwork/hermes-client" {
  export class HermesClient {
    constructor(endpoint: string, options?: any);
    getLatestPriceUpdates(ids: string[], options?: any): Promise<any>;
  }
}
declare module "zod" {
  export const z: any;
}
