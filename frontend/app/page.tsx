import { DashboardCard } from "@/components/shared/DashboardCard";

const cards = [
  {
    href: "/tasks",
    title: "Task Dashboard",
    description: "View and manage your tasks.",
  },
  {
    href: "/activity",
    title: "Activity Feed",
    description: "Search and filter recent activity.",
  },
  {
    href: "/reports",
    title: "Reports",
    description: "Review your performance and progress.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="stack" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>VeeLion Frontend Assessment</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Manage tasks, review activity, and track progress from one place.
        </p>
      </header>

      <section
        className="stack"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {cards.map((card) => (
          <DashboardCard
            href={card.href}
            title={card.title}
            description={card.description}
          />
        ))}
      </section>
    </main>
  );
}
