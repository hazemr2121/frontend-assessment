import { TaskDashboard } from "@/components/tasks/TaskDashboard";
import { BackButton } from "@/components/shared/BackButton";

export default function TasksPage() {
  return (
    <main className="stack">
      <BackButton />
      <TaskDashboard />
    </main>
  );
}
