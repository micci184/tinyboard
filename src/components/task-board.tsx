import type { Task, TaskStatus } from "@/lib/database.types";
import { TASK_STATUS_LABEL, TASK_STATUSES } from "@/lib/task-status";
import { FeedbackForm } from "@/components/feedback-form";
import { TaskCard } from "@/components/task-card";
import { TaskCreateForm } from "@/components/task-create-form";

type TaskBoardProps = {
  tasks: Task[];
  loadError?: string | null;
};

export function TaskBoard({ tasks, loadError }: TaskBoardProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <TaskCreateForm />

      {loadError ? (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {loadError}
        </p>
      ) : null}

      {!loadError && tasks.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
          <p className="text-base font-semibold text-zinc-900">タスクはまだありません</p>
          <p className="mt-2 text-sm text-zinc-600">
            上のフォームから最初のタスクを追加してください。
          </p>
        </div>
      ) : null}

      {!loadError && tasks.length > 0 ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {TASK_STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      ) : null}

      <div className="mt-6">
        <FeedbackForm />
      </div>
    </div>
  );
}

function TaskColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  return (
    <section className="rounded-2xl bg-zinc-100/80 p-3">
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-zinc-800">{TASK_STATUS_LABEL[status]}</h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">
          {tasks.length}
        </span>
      </header>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 px-3 py-6 text-center text-xs text-zinc-500">
            この列にタスクはありません
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}
