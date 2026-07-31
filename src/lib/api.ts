import axios, { type AxiosInstance } from "axios";
import type {
  CorsResponse,
  CreatePaymentRequest,
  CreateSessionRequest,
  HealthResponse,
  PaymentResponse,
  SessionResponse,
} from "../types/api.js";

export interface PowerPayApiClientOptions {
  apiKey?: string;
  apiVersion?: "v1";
  timeoutMs?: number;
}

export class PowerPayApiClient {
  readonly http: AxiosInstance;
  readonly apiPrefix: string;

  constructor(
    baseURL: string,
    apiKeyOrOptions?: string | PowerPayApiClientOptions,
  ) {
    const options: PowerPayApiClientOptions =
      typeof apiKeyOrOptions === "string"
        ? { apiKey: apiKeyOrOptions }
        : apiKeyOrOptions ?? {};

    this.apiPrefix = `/api/${options.apiVersion ?? "v1"}`;
    this.http = axios.create({
      baseURL: baseURL.replace(/\/$/, ""),
      timeout: options.timeoutMs ?? 15_000,
      headers: options.apiKey
        ? { Authorization: `Bearer ${options.apiKey}` }
        : undefined,
    });
  }

  async health(): Promise<HealthResponse> {
    const response = await this.http.get<HealthResponse>(
      `${this.apiPrefix}/health`,
    );
    return response.data;
  }

  async createPayment(
    request: CreatePaymentRequest,
  ): Promise<PaymentResponse> {
    const response = await this.http.post<PaymentResponse>(
      `${this.apiPrefix}/payments`,
      request,
    );
    return response.data;
  }

  async payment(id: string): Promise<PaymentResponse> {
    const response = await this.http.get<PaymentResponse>(
      `${this.apiPrefix}/payments/${encodeURIComponent(id)}`,
    );
    return response.data;
  }

  async createSession(
    request: CreateSessionRequest,
  ): Promise<SessionResponse> {
    const response = await this.http.post<SessionResponse>(
      `${this.apiPrefix}/sessions`,
      request,
    );
    return response.data;
  }

  async session(id: string): Promise<SessionResponse> {
    const response = await this.http.get<SessionResponse>(
      `${this.apiPrefix}/sessions/${encodeURIComponent(id)}`,
    );
    return response.data;
  }

  async cors(): Promise<CorsResponse> {
    const response = await this.http.get<CorsResponse>(
      `${this.apiPrefix}/cors`,
    );
    return response.data;
  }
}
