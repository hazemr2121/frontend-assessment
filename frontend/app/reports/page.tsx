import { ReportsDashboard } from "@/components/reports/ReportsDashboard";
import { BackButton } from "@/components/shared/BackButton";

export default function ReportsPage() {
  return (
    <main className="stack">
      <BackButton />

      <header className="card" style={{ padding: "1rem" }}>
        <h1 style={{ margin: 0 }}>Reports</h1>
        <p style={{ marginBottom: 0, color: "var(--muted)" }}>
          A snapshot of task progress and recent activity.
        </p>
      </header>

      <ReportsDashboard />
    </main>
  );
}
