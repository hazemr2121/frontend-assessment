import Link from "next/link";
type DashboardCardProps = {
  href: string;
  title: string;
  description: string;
};

export function DashboardCard({
  href,
  title,
  description,
}: DashboardCardProps) {
  return (
    <Link href={href} className="card" style={{ display: "block" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ margin: 0, color: "var(--muted)" }}>{description}</p>
    </Link>
  );
}
