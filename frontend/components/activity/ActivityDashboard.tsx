import { LoadingCard } from "@/components/shared/LoadingCard";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { ActivityList } from "@/components/activity/ActivityList";
import { useActivity } from "@/hooks/useActivity";

export function ActivityDashboard() {
  const {
    filteredActivity,
    query,
    setQuery,
    stats,
    loading,
    error,
    fetchActivity,
  } = useActivity();

  return (
    <section className="stack">
      <section className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>Activity Feed</h1>
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

      {loading ? <LoadingCard label="Loading activity..." /> : null}
      {error ? <ErrorCard message={error} onRetry={fetchActivity} /> : null}

      {!loading && !error ? (
        <section className="card" style={{ padding: "1rem" }}>
          <ActivityList
            items={filteredActivity}
            emptyMessage={
              query ? "No activity matches your search." : "No activity yet."
            }
          />
        </section>
      ) : null}
    </section>
  );
}
