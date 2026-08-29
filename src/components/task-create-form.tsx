"use client";

import { useState } from "react";
import { createTask } from "@/app/actions/tasks";
import type { TaskStatus } from "@/lib/database.types";
import { TASK_STATUS_LABEL, TASK_STATUSES } from "@/lib/task-status";

export function TaskCreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const result = await createTask({ title, description, status });
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    setTitle("");
    setDescription("");
    setStatus("todo");
    setPending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-zinc-900">タスクを追加</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_10rem_auto]">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-600">タイトル</span>
          <input
            name="title"
            required
            maxLength={200}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="例: 仕様書をレビューする"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/10"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-600">説明</span>
          <input
            name="description"
            maxLength={2000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="任意"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/10"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-600">ステータス</span>
          <select
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/10"
          >
            {TASK_STATUSES.map((value) => (
              <option key={value} value={value}>
                {TASK_STATUS_LABEL[value]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60 md:w-auto"
          >
            {pending ? "追加中..." : "追加"}
          </button>
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
