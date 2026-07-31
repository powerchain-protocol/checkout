import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const configFile = fileURLToPath(import.meta.url);
const appRoot = dirname(configFile);
const repositoryRoot = resolve(appRoot, "..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, appRoot, "VITE_");

  return {
    root: appRoot,
    cacheDir: resolve(repositoryRoot, "node_modules/.vite/powerpay-app"),
    plugins: [
      react(),
      {
        name: "powerpay-codespaces-manifest",
        transformIndexHtml(html) {
          if (mode === "production") return html;
          return html.replace(
            /<link\s+rel=["']manifest["'][^>]*>\s*/i,
            "",
          );
        },
      },
    ],
    resolve: {
      alias: {
        "@powerpay/sdk": resolve(repositoryRoot, "src/index.ts"),
        "@app": resolve(appRoot, "src"),
        "@app-lib": resolve(appRoot, "lib"),
      },
      dedupe: ["react", "react-dom"],
    },
    envPrefix: ["VITE_"],
    optimizeDeps: {
      entries: [resolve(appRoot, "index.html")],
      include: [
        "react",
        "react-dom",
        "@solana/web3.js",
        "@solana/wallet-adapter-react",
        "@solana/wallet-adapter-react-ui",
      ],
    },
    build: {
      target: "es2022",
      sourcemap: mode !== "production",
      manifest: true,
      outDir: resolve(appRoot, "dist"),
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      allowedHosts: true,
      watch: {
        ignored: [
          resolve(appRoot, "dist/**"),
          resolve(repositoryRoot, "reports/**"),
        ],
      },
      cors: {
        origin: true,
        methods: [
          "GET",
          "HEAD",
          "PUT",
          "PATCH",
          "POST",
          "DELETE",
          "OPTIONS",
        ],
        allowedHeaders: [
          "Authorization",
          "Content-Type",
          "Idempotency-Key",
          "X-PowerPay-Version",
        ],
      },
      headers: {
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      fs: {
        allow: [repositoryRoot],
      },
    },
    preview: {
      port: 4173,
      strictPort: true,
      allowedHosts: true,
      cors: true,
    },
    define: {
      __POWERPAY_API_BASE_URL__: JSON.stringify(
        env.VITE_POWERPAY_API_BASE_URL ?? "",
      ),
    },
  };
});
