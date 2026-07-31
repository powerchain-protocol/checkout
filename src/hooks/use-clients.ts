import { usePowerPaySdk } from "../context/sdk-context.js";
import type {
  PowerPayPagination,
  PowerPayRequestContext,
} from "../types/sdk.js";
import type {
  CreateClientRequest,
} from "../api/resources.js";
import { useApiResource } from "./use-api-resource.js";

export function useClients(
  pagination: PowerPayPagination = {},
) {
  const sdk = usePowerPaySdk();
  return useApiResource(
    (signal) =>
      sdk.clients.list(pagination, { signal }),
    [sdk, pagination.cursor, pagination.limit],
  );
}

export function useClient(clientId?: string) {
  const sdk = usePowerPaySdk();
  return useApiResource(
    (signal) =>
      sdk.clients.retrieve(clientId!, { signal }),
    [sdk, clientId],
    { enabled: Boolean(clientId) },
  );
}

export function useCreateClient() {
  const sdk = usePowerPaySdk();
  return (
    request: CreateClientRequest,
    context?: PowerPayRequestContext,
  ) => sdk.clients.create(request, context);
}
