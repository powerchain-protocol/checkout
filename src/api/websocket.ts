import type {
  PowerPayEvent,
  PowerPayEventType,
} from "../types/api.js";
import { POWERPAY_WEBSOCKET_PROTOCOL } from "../constants/events.js";

export interface PowerPayWebSocketOptions {
  url: string;
  token?: string;
  merchantId?: string;
  protocols?: string | string[];
  reconnect?: boolean;
  initialReconnectDelayMs?: number;
  maximumReconnectDelayMs?: number;
  reconnectMultiplier?: number;
  heartbeatTimeoutMs?: number;
}

export type PowerPayEventListener<T = unknown> = (
  event: PowerPayEvent<T>,
) => void;

export class PowerPayWebSocketClient {
  private socket: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempt = 0;
  private manuallyClosed = false;
  private readonly listeners = new Map<
    PowerPayEventType | "*",
    Set<PowerPayEventListener>
  >();

  constructor(readonly options: PowerPayWebSocketOptions) {}

  get connected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  connect(): void {
    if (
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    this.manuallyClosed = false;
    const url = new URL(this.options.url);
    if (this.options.token) {
      url.searchParams.set("access_token", this.options.token);
    }
    if (this.options.merchantId) {
      url.searchParams.set("merchant_id", this.options.merchantId);
    }

    this.socket = new WebSocket(
      url,
      this.options.protocols ?? POWERPAY_WEBSOCKET_PROTOCOL,
    );

    this.socket.addEventListener("open", () => {
      this.reconnectAttempt = 0;
      this.resetHeartbeat();
    });

    this.socket.addEventListener("message", (message) => {
      this.resetHeartbeat();
      try {
        this.emit(JSON.parse(String(message.data)) as PowerPayEvent);
      } catch {
        // Ignore malformed frames without interrupting checkout.
      }
    });

    this.socket.addEventListener("close", () => {
      this.clearHeartbeat();
      this.socket = null;
      if (!this.manuallyClosed && this.options.reconnect !== false) {
        this.scheduleReconnect();
      }
    });

    this.socket.addEventListener("error", () => {
      this.socket?.close();
    });
  }

  close(code = 1000, reason = "client closed"): void {
    this.manuallyClosed = true;
    this.clearReconnect();
    this.clearHeartbeat();
    this.socket?.close(code, reason);
    this.socket = null;
  }

  subscribe<T = unknown>(
    type: PowerPayEventType | "*",
    listener: PowerPayEventListener<T>,
  ): () => void {
    const listeners =
      this.listeners.get(type) ?? new Set<PowerPayEventListener>();
    listeners.add(listener as PowerPayEventListener);
    this.listeners.set(type, listeners);

    return () => {
      listeners.delete(listener as PowerPayEventListener);
      if (listeners.size === 0) this.listeners.delete(type);
    };
  }

  send(type: string, data?: unknown): boolean {
    if (!this.connected || !this.socket) return false;
    this.socket.send(JSON.stringify({ type, data }));
    return true;
  }

  private emit(event: PowerPayEvent): void {
    for (const listener of this.listeners.get(event.type) ?? []) {
      listener(event);
    }
    for (const listener of this.listeners.get("*") ?? []) {
      listener(event);
    }
  }

  private scheduleReconnect(): void {
    this.clearReconnect();
    const initial = this.options.initialReconnectDelayMs ?? 500;
    const maximum = this.options.maximumReconnectDelayMs ?? 15_000;
    const multiplier = this.options.reconnectMultiplier ?? 1.8;
    const delay = Math.min(
      maximum,
      initial * multiplier ** this.reconnectAttempt,
    );
    this.reconnectAttempt += 1;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private resetHeartbeat(): void {
    this.clearHeartbeat();
    this.heartbeatTimer = setTimeout(() => {
      this.socket?.close(4000, "heartbeat timeout");
    }, this.options.heartbeatTimeoutMs ?? 60_000);
  }

  private clearReconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
  }

  private clearHeartbeat(): void {
    if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }
}

export function createPowerPayWebSocket(
  options: PowerPayWebSocketOptions,
): PowerPayWebSocketClient {
  return new PowerPayWebSocketClient(options);
}
