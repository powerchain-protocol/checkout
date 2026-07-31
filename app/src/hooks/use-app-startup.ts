import { useEffect, useState } from "react";
import type { StartupPhase } from "../components/system/StartupScreen";

const STARTUP_SEQUENCE: Array<{
  phase: StartupPhase;
  delay: number;
}> = [
  { phase: "interface", delay: 0 },
  { phase: "wallets", delay: 260 },
  { phase: "networks", delay: 560 },
  { phase: "ready", delay: 900 },
];

export function useAppStartup() {
  const [phase, setPhase] = useState<StartupPhase>("interface");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const prepare = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        // Font readiness is an enhancement and must never block startup.
      }

      if (cancelled) return;

      for (const step of STARTUP_SEQUENCE) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setPhase(step.phase);
          }, step.delay),
        );
      }

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setComplete(true);
        }, 1120),
      );
    };

    void prepare();

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return { phase, complete };
}
