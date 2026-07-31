import { useCallback, useEffect, useState } from "react";
import type { ErrorResponse, TasksSummary } from "@/types/api";

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function useReportsSummary() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/reports/tasks-summary");

      if (!response.ok) {
        const body = (await response
          .json()
          .catch(() => null)) as ErrorResponse | null;
        throw new Error(
          body?.error?.message || "Could not load reports right now.",
        );
      }

      setSummary((await response.json()) as TasksSummary);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load reports right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  return { summary, loading, error, fetchSummary };
}
