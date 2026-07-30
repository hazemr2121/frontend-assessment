"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function formatActivityTime(value: string) {
    return new Date(value).toLocaleString();
  }

  function filterActivity(items: ActivityLog[], text: string) {
    if (!text) {
      return items;
    }

    const lower = text.toLowerCase();
    return items.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lower) ||
        (item.info || "").toLowerCase().includes(lower)
    );
  }

  const loadActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/activity");

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(body?.error?.message || "Could not load activity right now.");
      }

      const data = (await response.json()) as ActivityLog[];
      setActivity(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not load activity right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadActivity();
  }, [loadActivity]);

  const visibleActivity = useMemo(() => filterActivity(activity, query), [activity, query]);

  const stats = useMemo(() => {
    return {
      total: activity.length,
      visible: visibleActivity.length,
    };
  }, [activity.length, visibleActivity.length]);

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>

        <input
          className="input"
          placeholder="Search activity"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <small style={{ color: "var(--muted)" }}>
          Total: {stats.total} | Visible: {stats.visible}
        </small>
      </section>

      {loading ? (
        <section className="card" style={{ padding: "1rem" }} aria-live="polite">
          <p style={{ margin: 0 }}>Loading activity...</p>
        </section>
      ) : null}

      {error ? (
        <section
          className="card"
          style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}
          role="alert"
        >
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>{error}</p>
          <button type="button" className="button" onClick={loadActivity}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <section className="card" style={{ padding: "1rem" }}>
          {visibleActivity.length === 0 ? (
            <p style={{ margin: 0, color: "var(--muted)" }}>
              {query ? "No activity matches your search." : "No activity yet."}
            </p>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
              {visibleActivity.map((item) => (
                <li key={item.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem" }}>
                  <div style={{ fontWeight: 600 }}>{item.action || "(no action)"}</div>
                  <div>{item.info || "(no info)"}</div>
                  <small style={{ color: "var(--muted)" }}>{formatActivityTime(item.when)}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </main>
  );
}
