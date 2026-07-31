export type SolanaActionType = "action" | "transaction" | "completed";

export interface SolanaActionLink {
  label: string;
  href: string;
  parameters?: Array<{
    name: string;
    label: string;
    required?: boolean;
  }>;
}

export interface SolanaActionGetResponse {
  type?: "action";
  icon: string;
  title: string;
  description: string;
  label: string;
  disabled?: boolean;
  error?: { message: string };
  links?: {
    actions: SolanaActionLink[];
  };
}

export interface SolanaActionPostRequest {
  account: string;
  data?: Record<string, unknown>;
}

export interface SolanaActionPostResponse {
  transaction: string;
  message?: string;
  links?: {
    next?: {
      type: "post";
      href: string;
    };
  };
}
