"use client";

import { useCallback, useEffect, useState } from "react";
import type { ErrorResponse, TasksSummary } from "@/types/api";

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function ReportsDashboard() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/reports/tasks-summary");

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as ErrorResponse | null;
        throw new Error(body?.error?.message || "Could not load reports right now.");
      }

      setSummary((await response.json()) as TasksSummary);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load reports right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  if (loading) {
    return (
      <section className="card" style={{ padding: "1rem" }} aria-live="polite">
        <p style={{ margin: 0 }}>Loading reports...</p>
      </section>
    );
  }

  if (error || !summary) {
    return (
      <section
        className="card"
        style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}
        role="alert"
      >
        <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>
          {error || "Could not load reports right now."}
        </p>
        <button type="button" className="button" onClick={loadSummary}>
          Retry
        </button>
      </section>
    );
  }

  const statusCards = [
    { label: "To do", value: summary.byStatus.todo },
    { label: "In progress", value: summary.byStatus["in-progress"] },
    { label: "Done", value: summary.byStatus.done },
  ];

  return (
    <section className="stack" aria-label="Task reports">
      <section className="card" style={{ padding: "1rem" }}>
        <p style={{ margin: 0, color: "var(--muted)" }}>Total tasks</p>
        <p style={{ margin: "0.35rem 0 0", fontSize: "2rem", fontWeight: 700 }}>{summary.total}</p>
      </section>

      <section className="stack" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        {statusCards.map((status) => (
          <article key={status.label} className="card" style={{ padding: "1rem" }}>
            <p style={{ margin: 0, color: "var(--muted)" }}>{status.label}</p>
            <p style={{ margin: "0.35rem 0 0", fontSize: "1.5rem", fontWeight: 700 }}>{status.value}</p>
          </article>
        ))}
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <p style={{ margin: 0, color: "var(--muted)" }}>Recent activity</p>
        <p style={{ margin: "0.35rem 0 0", fontSize: "1.5rem", fontWeight: 700 }}>
          {summary.recentActivityCount}
        </p>
      </section>
    </section>
  );
}
