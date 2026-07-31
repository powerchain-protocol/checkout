import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./styles/app.css";

function renderStartupFailure(error: unknown): void {
  const root = document.getElementById("root");
  const message =
    error instanceof Error ? error.message : "Unknown startup failure";

  if (!root) return;

  root.innerHTML = `
    <main class="boot-screen">
      <section class="boot-card">
        <p class="eyebrow">Application startup</p>
        <h1>PowerPay could not start.</h1>
        <p>${message.replace(/[<>&"]/g, "")}</p>
        <p style="margin-top: 16px">
          Check the browser console, then run
          <code>npm run dev:doctor</code>.
        </p>
        <button
          type="button"
          style="margin-top:18px;padding:10px 14px"
          onclick="window.location.reload()"
        >
          Reload
        </button>
      </section>
    </main>
  `;
}

window.addEventListener("error", (event) => {
  renderStartupFailure(event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  renderStartupFailure(event.reason);
});

const container = document.getElementById("root");
if (!container) {
  throw new Error('Missing application mount element "#root"');
}

try {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  renderStartupFailure(error);
}
