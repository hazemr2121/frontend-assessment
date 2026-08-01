import type { TaskFilter } from "@/types/api";

const FILTERS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <section aria-label="Filter tasks by status" className="card">
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {FILTERS.map((filter) => {
          const active = filter.value === value;
          const variantClass =
            filter.value === "completed"
              ? "filter-chip completed"
              : filter.value === "pending"
                ? "filter-chip pending"
                : "filter-chip";

          return (
            <button
              key={filter.value}
              type="button"
              className={`button ${variantClass} ${active ? "active" : ""}`.trim()}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
