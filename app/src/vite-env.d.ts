/// <reference types="vite/client" />

declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "@solana/wallet-adapter-react-ui/styles.css";
