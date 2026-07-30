import Link from "next/link";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function ReportsPage() {
  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

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
