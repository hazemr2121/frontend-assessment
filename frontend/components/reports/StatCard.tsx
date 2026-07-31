export function StatCard({
  label,
  value,
  size = "md",
}: {
  label: string;
  value: number;
  size?: "sm" | "md";
}) {
  return (
    <section className="card" style={{ padding: "1rem" }}>
      <p style={{ margin: 0, color: "var(--muted)" }}>{label}</p>
      <p
        style={{
          margin: "0.35rem 0 0",
          fontSize: size === "md" ? "2rem" : "1.5rem",
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </section>
  );
}
