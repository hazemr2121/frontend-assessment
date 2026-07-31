"use client";

import { useReportsSummary } from "@/hooks/useReportsSummary";
import { LoadingCard } from "@/components/shared/LoadingCard";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { StatCard } from "@/components/reports/StatCard";

export function ReportsDashboard() {
  const { summary, loading, error, fetchSummary } = useReportsSummary();

  if (loading) {
    return <LoadingCard label="Loading reports..." />;
  }

  if (error || !summary) {
    return (
      <ErrorCard
        message={error || "Could not load reports right now."}
        onRetry={fetchSummary}
      />
    );
  }

  const statusCards = [
    { label: "To do", value: summary.byStatus.todo },
    { label: "In progress", value: summary.byStatus["in-progress"] },
    { label: "Done", value: summary.byStatus.done },
  ];

  return (
    <section className="stack" aria-label="Task reports">
      <StatCard label="Total tasks" value={summary.total} size="md" />

      <section
        className="stack"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {statusCards.map((status) => (
          <StatCard
            key={status.label}
            label={status.label}
            value={status.value}
            size="sm"
          />
        ))}
      </section>

      <StatCard
        label="Recent activity"
        value={summary.recentActivityCount}
        size="sm"
      />
    </section>
  );
}
