import type { CSSProperties } from "react";
import {
  CheckCircledIcon,
  GlobeIcon,
  LockClosedIcon,
  LightningBoltIcon,
  ShieldCheckIcon,
} from "@radix-ui/react-icons";

export type StartupPhase =
  | "interface"
  | "wallets"
  | "networks"
  | "ready";

const PHASE_COPY: Record<
  StartupPhase,
  { label: string; detail: string; progress: number }
> = {
  interface: {
    label: "Starting PowerPay…",
    detail: "Loading the merchant interface and secure workspace.",
    progress: 26,
  },
  wallets: {
    label: "Preparing wallet providers…",
    detail: "Connecting supported wallet and signing services.",
    progress: 54,
  },
  networks: {
    label: "Checking payment networks…",
    detail: "Preparing PowerChain, Solana, and Sui settlement.",
    progress: 82,
  },
  ready: {
    label: "PowerPay is ready",
    detail: "Opening your merchant workspace.",
    progress: 100,
  },
};

export interface StartupScreenProps {
  phase?: StartupPhase;
  compact?: boolean;
}

export function StartupScreen({
  phase = "interface",
  compact = false,
}: StartupScreenProps) {
  const copy = PHASE_COPY[phase];

  return (
    <main
      className={`startup-screen${compact ? " startup-screen--compact" : ""}`}
      aria-busy={phase !== "ready"}
      aria-live="polite"
    >
      <div className="startup-screen__ambient" aria-hidden="true">
        <span className="startup-screen__orb startup-screen__orb--one" />
        <span className="startup-screen__orb startup-screen__orb--two" />
        <span className="startup-screen__particle startup-screen__particle--one" />
        <span className="startup-screen__particle startup-screen__particle--two" />
        <span className="startup-screen__particle startup-screen__particle--three" />
      </div>

      <div className="startup-screen__waves" aria-hidden="true">
        <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
          <path d="M0 246C146 178 240 314 396 239C560 160 654 302 815 232C984 158 1090 307 1246 221C1322 179 1389 184 1440 202" />
          <path d="M0 274C164 204 264 332 424 264C583 197 689 318 850 253C1013 187 1114 322 1273 245C1336 215 1391 215 1440 229" />
          <path d="M0 302C165 242 283 350 450 294C615 238 727 338 884 284C1046 228 1154 345 1311 277C1360 256 1402 252 1440 260" />
          <path d="M0 326C176 277 300 365 470 322C640 279 756 359 918 316C1081 273 1190 363 1346 311C1380 300 1412 294 1440 295" />
        </svg>
      </div>

      <section className="startup-screen__content">
        <div className="startup-brand" aria-label="PowerPay">
          <img
            className="startup-brand__mark"
            src="/icons/powerpay-mark.svg"
            alt=""
            width="92"
            height="92"
          />
          <div className="startup-brand__wordmark" aria-hidden="true">
            <span>Power</span><strong>Pay</strong>
          </div>
        </div>

<div
          className={`startup-progress${phase === "ready" ? " startup-progress--complete" : ""}`}
          style={{ "--startup-progress": `${copy.progress}%` } as CSSProperties}
          role="progressbar"
          aria-label="PowerPay startup progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={copy.progress}
        >
          <span className="startup-progress__track" />
          <span className="startup-progress__value" />
          <span className="startup-progress__core">
            {phase === "ready" ? (
              <CheckCircledIcon width={21} height={21} />
            ) : (
              <LightningBoltIcon width={19} height={19} />
            )}
          </span>
        </div>

        <div className="startup-screen__copy">
          <h1>{copy.label}</h1>
          <p>{copy.detail}</p>
        </div>

        <div className="startup-assurance" aria-label="Startup security">
          <span>
            <ShieldCheckIcon />
            Secure
          </span>
          <span>
            <LockClosedIcon />
            Encrypted
          </span>
          <span>
            <CheckCircledIcon />
            Verified
          </span>
        </div>
      </section>

      {!compact && (
        <footer className="startup-capabilities">
          <div>
            <span className="startup-capabilities__icon">
              <ShieldCheckIcon />
            </span>
            <span>
              <strong>Powered by PowerChain</strong>
              <small>The next energy generation</small>
            </span>
          </div>
          <div>
            <span className="startup-capabilities__icon">
              <GlobeIcon />
            </span>
            <span>
              <strong>Multi-chain ready</strong>
              <small>Solana · Sui · PowerChain</small>
            </span>
          </div>
          <div>
            <span className="startup-capabilities__icon">
              <LightningBoltIcon />
            </span>
            <span>
              <strong>Instant, secure payments</strong>
              <small>Built for modern Web3 commerce</small>
            </span>
          </div>
        </footer>
      )}
    </main>
  );
}
