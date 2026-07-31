import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/app.css";

function renderStartupFailure(error: unknown): void {
  const root = document.getElementById("root");
  const message =
    error instanceof Error ? error.message : "Unknown startup failure";

  if (!root) return;

  root.innerHTML = `
    <main class="boot-screen">
      <section class="boot-content" role="alert">
        <img
          class="boot-logo"
          src="/icons/powerpay-mark.svg"
          alt=""
          width="78"
          height="78"
        />
        <div class="boot-wordmark" aria-label="PowerPay">
          <span>Power</span><strong>Pay</strong>
        </div>
        <h1 style="margin-top:32px">PowerPay could not start</h1>
        <p>${message.replace(/[<>&"]/g, "")}</p>
        <p>
          Check the browser console, then run
          <code>npm run dev:doctor</code>.
        </p>
        <button
          type="button"
          style="
            margin-top:20px;
            border:0;
            border-radius:12px;
            padding:12px 18px;
            background:#0b6b43;
            color:white;
            font:inherit;
            font-weight:700;
            cursor:pointer
          "
          onclick="window.location.reload()"
        >
          Reload PowerPay
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
