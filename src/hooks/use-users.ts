import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user.js";
import type { UserService } from "../services/user-service.js";

export function useUsers(
  service: UserService,
  userId: string | undefined,
) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setUser(null);
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const value = await service.byId(userId);
      setUser(value);
      return value;
    } catch (cause) {
      const normalized =
        cause instanceof Error ? cause : new Error(String(cause));
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [service, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { user, loading, error, refresh };
}
