import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

function filterActivity(items: ActivityLog[], text: string) {
  if (!text) return items;
  const lower = text.toLowerCase();
  return items.filter(
    (item) =>
      (item.action || "").toLowerCase().includes(lower) ||
      (item.info || "").toLowerCase().includes(lower),
  );
}

export function useActivity() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/activity");

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(
          body?.error?.message || "Could not load activity right now.",
        );
      }

      const data = (await response.json()) as ActivityLog[];
      setActivity(data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load activity right now.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchActivity();
  }, [fetchActivity]);

  const filteredActivity = useMemo(
    () => filterActivity(activity, query),
    [activity, query],
  );

  const stats = useMemo(
    () => ({ total: activity.length, visible: filteredActivity.length }),
    [activity.length, filteredActivity.length],
  );

  return {
    filteredActivity,
    query,
    setQuery,
    stats,
    loading,
    error,
    fetchActivity,
  };
}
