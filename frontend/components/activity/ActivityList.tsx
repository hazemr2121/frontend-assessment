import type { ActivityLog } from "@/types/api";

function formatActivityTime(value: string) {
  return new Date(value).toLocaleString();
}

export function ActivityList({
  items,
  emptyMessage,
}: {
  items: ActivityLog[];
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return <p style={{ margin: 0, color: "var(--muted)" }}>{emptyMessage}</p>;
  }

  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "grid",
        gap: "0.7rem",
      }}
    >
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "0.6rem",
          }}
        >
          <div style={{ fontWeight: 600 }}>{item.action || "(no action)"}</div>
          <div>{item.info || "(no info)"}</div>
          <small style={{ color: "var(--muted)" }}>
            {formatActivityTime(item.when)}
          </small>
        </li>
      ))}
    </ul>
  );
}
