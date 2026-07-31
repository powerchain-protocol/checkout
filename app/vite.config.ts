import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
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
        "@powerpay/sdk": fileURLToPath(
          new URL("../src/index.ts", import.meta.url),
        ),
        "@app": fileURLToPath(new URL("./src", import.meta.url)),
        "@app-lib": fileURLToPath(new URL("./lib", import.meta.url)),
      },
      dedupe: ["react", "react-dom"],
    },
    envPrefix: ["VITE_"],
    optimizeDeps: {
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
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      allowedHosts: true,
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
        allow: [".."],
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
