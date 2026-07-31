"use client";

import { ActivityDashboard } from "@/components/activity/ActivityDashboard";
import { BackButton } from "@/components/shared/BackButton";

export default function ActivityPage() {
  return (
    <main className="stack">
      <BackButton />
      <ActivityDashboard />
    </main>
  );
}
