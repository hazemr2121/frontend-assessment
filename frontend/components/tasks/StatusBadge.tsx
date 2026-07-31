// components/tasks/StatusBadge.tsx
import type { Task } from "@/types/api";

export function StatusBadge({ completed }: { completed: boolean }) {
  return (
    <span
      className="badge"
      style={
        completed
          ? { color: "#166534", background: "#dcfce7" }
          : { color: "#92400e", background: "#fef3c7" }
      }
    >
      {completed ? "Completed" : "Pending"}
    </span>
  );
}
