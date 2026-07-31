import { useEffect, useMemo, useState } from "react";
import type {
  PowerPayEvent,
  PowerPayEventType,
} from "../types/api.js";
import type { PowerPayWebSocketOptions } from "../api/websocket.js";
import { usePowerPaySdk } from "../context/sdk-context.js";

export interface UsePowerPayEventsOptions
  extends Omit<PowerPayWebSocketOptions, "url"> {
  type?: PowerPayEventType | "*";
  maximumEvents?: number;
}

export function usePowerPayEvents(
  options: UsePowerPayEventsOptions = {},
) {
  const sdk = usePowerPaySdk();
  const [events, setEvents] = useState<PowerPayEvent[]>([]);
  const [connected, setConnected] = useState(false);

  const client = useMemo(
    () => sdk.websocket(options),
    [sdk, options.merchantId, options.token],
  );

  useEffect(() => {
    const unsubscribe = client.subscribe(
      options.type ?? "*",
      (event) => {
        setEvents((current) =>
          [event, ...current].slice(0, options.maximumEvents ?? 50),
        );
      },
    );

    client.connect();
    const timer = window.setInterval(
      () => setConnected(client.connected),
      500,
    );

    return () => {
      window.clearInterval(timer);
      unsubscribe();
      client.close();
    };
  }, [client, options.maximumEvents, options.type]);

  return {
    events,
    connected,
    clear: () => setEvents([]),
    client,
  };
}
