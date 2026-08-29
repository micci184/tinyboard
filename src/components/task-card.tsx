"use client";

import { useState } from "react";
import { deleteTask, updateTask, updateTaskStatus } from "@/app/actions/tasks";
import type { Task, TaskStatus } from "@/lib/database.types";
import { TASK_STATUS_LABEL, TASK_STATUSES } from "@/lib/task-status";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleStatusChange(nextStatus: TaskStatus) {
    setError("");
    const result = await updateTaskStatus(task.id, nextStatus);
    if (!result.ok) {
      setError(result.error);
    }
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const result = await updateTask({
      id: task.id,
      title,
      description,
      status,
    });

    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    setEditing(false);
    setPending(false);
  }

  async function handleDelete() {
    setPending(true);
    setError("");
    const result = await deleteTask(task.id);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      {editing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={200}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-zinc-900/10"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
            rows={3}
            className="w-full resize-y rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-zinc-900/10"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-zinc-900/10"
          >
            {TASK_STATUSES.map((value) => (
              <option key={value} value={value}>
                {TASK_STATUS_LABEL[value]}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
            >
              {pending ? "保存中..." : "保存"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setTitle(task.title);
                setDescription(task.description);
                setStatus(task.status);
                setError("");
              }}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700"
            >
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-sm font-semibold text-zinc-900">{task.title}</h3>
          {task.description ? (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-600">
              {task.description}
            </p>
          ) : null}
          <label className="mt-3 block">
            <span className="sr-only">ステータス</span>
            <select
              value={task.status}
              onChange={(event) => handleStatusChange(event.target.value as TaskStatus)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:ring-4 focus:ring-zinc-900/10"
            >
              {TASK_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {TASK_STATUS_LABEL[value]}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setConfirmingDelete(false);
              }}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            >
              編集
            </button>
            {confirmingDelete ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-red-700">削除しますか？</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={pending}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {pending ? "削除中..." : "削除する"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700"
                >
                  やめる
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                削除
              </button>
            )}
          </div>
        </>
      )}
      {error ? (
        <p role="alert" className="mt-3 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </article>
  );
}
