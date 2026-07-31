import type {
  PowerPayEvent,
  PowerPayEventType,
} from "../types/api.js";
import { POWERPAY_WEBSOCKET_PROTOCOL } from "../constants/events.js";

export type PowerPayWebSocketState =
  | "idle"
  | "connecting"
  | "open"
  | "reconnecting"
  | "closed"
  | "error";

export interface PowerPayWebSocketOptions {
  url: string;
  token?: string;
  merchantId?: string;
  protocols?: string | string[];
  reconnect?: boolean;
  initialReconnectDelayMs?: number;
  maximumReconnectDelayMs?: number;
  reconnectMultiplier?: number;
  reconnectJitter?: number;
  maximumReconnectAttempts?: number;
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
  private stateValue: PowerPayWebSocketState = "idle";
  private readonly listeners = new Map<
    PowerPayEventType | "*",
    Set<PowerPayEventListener>
  >();
  private readonly stateListeners = new Set<
    (state: PowerPayWebSocketState) => void
  >();
  private readonly errorListeners = new Set<(error: Event | Error) => void>();

  constructor(readonly options: PowerPayWebSocketOptions) {}

  get connected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  get state(): PowerPayWebSocketState {
    return this.stateValue;
  }

  connect(): void {
    if (this.connected || this.socket?.readyState === WebSocket.CONNECTING) {
      return;
    }
    this.manuallyClosed = false;
    this.setState(this.reconnectAttempt ? "reconnecting" : "connecting");

    const url = new URL(this.options.url);
    if (this.options.token) url.searchParams.set("access_token", this.options.token);
    if (this.options.merchantId) {
      url.searchParams.set("merchant_id", this.options.merchantId);
    }

    try {
      this.socket = new WebSocket(
        url,
        this.options.protocols ?? POWERPAY_WEBSOCKET_PROTOCOL,
      );
    } catch (error) {
      this.handleError(error instanceof Error ? error : new Error(String(error)));
      this.scheduleReconnect();
      return;
    }

    this.socket.addEventListener("open", () => {
      this.reconnectAttempt = 0;
      this.setState("open");
      this.resetHeartbeat();
    });
    this.socket.addEventListener("message", (message) => {
      this.resetHeartbeat();
      try {
        this.emit(JSON.parse(String(message.data)) as PowerPayEvent);
      } catch (error) {
        this.handleError(
          error instanceof Error ? error : new Error("Malformed WebSocket frame"),
        );
      }
    });
    this.socket.addEventListener("close", () => {
      this.clearHeartbeat();
      this.socket = null;
      if (!this.manuallyClosed && this.options.reconnect !== false) {
        this.scheduleReconnect();
      } else {
        this.setState("closed");
      }
    });
    this.socket.addEventListener("error", (error) => {
      this.handleError(error);
      this.socket?.close();
    });
  }

  close(code = 1000, reason = "client closed"): void {
    this.manuallyClosed = true;
    this.clearReconnect();
    this.clearHeartbeat();
    this.socket?.close(code, reason);
    this.socket = null;
    this.setState("closed");
  }

  subscribe<T = unknown>(
    type: PowerPayEventType | "*",
    listener: PowerPayEventListener<T>,
  ): () => void {
    const listeners = this.listeners.get(type) ?? new Set<PowerPayEventListener>();
    listeners.add(listener as PowerPayEventListener);
    this.listeners.set(type, listeners);
    return () => {
      listeners.delete(listener as PowerPayEventListener);
      if (!listeners.size) this.listeners.delete(type);
    };
  }

  onState(listener: (state: PowerPayWebSocketState) => void): () => void {
    this.stateListeners.add(listener);
    listener(this.stateValue);
    return () => this.stateListeners.delete(listener);
  }

  onError(listener: (error: Event | Error) => void): () => void {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  send(type: string, data?: unknown): boolean {
    if (!this.connected || !this.socket) return false;
    this.socket.send(JSON.stringify({ type, data }));
    return true;
  }

  private setState(state: PowerPayWebSocketState): void {
    this.stateValue = state;
    for (const listener of this.stateListeners) listener(state);
  }

  private handleError(error: Event | Error): void {
    this.setState("error");
    for (const listener of this.errorListeners) listener(error);
  }

  private emit(event: PowerPayEvent): void {
    for (const listener of this.listeners.get(event.type) ?? []) listener(event);
    for (const listener of this.listeners.get("*") ?? []) listener(event);
  }

  private scheduleReconnect(): void {
    const maximumAttempts = this.options.maximumReconnectAttempts ?? Infinity;
    if (this.reconnectAttempt >= maximumAttempts) {
      this.setState("closed");
      return;
    }
    this.clearReconnect();
    const initial = this.options.initialReconnectDelayMs ?? 500;
    const maximum = this.options.maximumReconnectDelayMs ?? 15_000;
    const multiplier = this.options.reconnectMultiplier ?? 1.8;
    const jitter = Math.max(0, Math.min(1, this.options.reconnectJitter ?? 0.2));
    const base = Math.min(maximum, initial * multiplier ** this.reconnectAttempt);
    const delay = Math.round(base * (1 - jitter + Math.random() * jitter * 2));
    this.reconnectAttempt += 1;
    this.setState("reconnecting");
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
