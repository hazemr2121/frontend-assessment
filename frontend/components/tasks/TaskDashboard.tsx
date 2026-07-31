"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import { LoadingCard } from "../shared/LoadingCard";
import { ErrorCard } from "../shared/ErrorCard";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="stack">
      <header className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Task Dashboard</h1>
      </header>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? <LoadingCard label="Loading tasks..." /> : null}

      {error ? <ErrorCard message={error} onRetry={fetchTasks} /> : null}

      {!loading && !error ? (
        <TaskList
          tasks={filteredTasks}
          updatingTaskId={updatingTaskId}
          onToggle={handleToggle}
        />
      ) : null}
    </section>
  );
}
