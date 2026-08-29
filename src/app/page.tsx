import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { SetupNotice } from "@/components/setup-notice";
import { TaskBoard } from "@/components/task-board";
import type { Task } from "@/lib/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("id, user_id, title, description, status, created_at, updated_at")
    .order("created_at", { ascending: false });

  const tasks = (data ?? []) as Task[];

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader email={user.email ?? null} />
      <main className="flex-1">
        <TaskBoard
          tasks={tasks}
          loadError={error ? "タスクの読み込みに失敗しました。時間をおいて再度お試しください。" : null}
        />
      </main>
    </div>
  );
}
