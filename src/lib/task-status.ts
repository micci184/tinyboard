import type { TaskStatus } from "@/lib/database.types";

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const satisfies readonly TaskStatus[];

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "未着手",
  in_progress: "進行中",
  done: "完了",
};
