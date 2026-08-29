"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { TASK_STATUSES } from "@/lib/task-status";

const taskFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "タイトルを入力してください。")
    .max(200, "タイトルは200文字以内で入力してください。"),
  description: z.string().trim().max(2000, "説明は2000文字以内で入力してください。"),
  status: z.enum(TASK_STATUSES),
});

const taskIdSchema = z.string().uuid("タスクが見つかりません。");

export type ActionResult = { ok: true } | { ok: false; error: string };

type AuthContext =
  | { ok: true; supabase: Awaited<ReturnType<typeof createClient>>; userId: string }
  | { ok: false; error: string };

async function requireUser(): Promise<AuthContext> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase の環境変数が設定されていません。" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId || typeof userId !== "string") {
    return { ok: false, error: "ログインが必要です。" };
  }

  return { ok: true, supabase, userId };
}

export async function createTask(input: {
  title: string;
  description: string;
  status: string;
}): Promise<ActionResult> {
  const parsed = taskFieldsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "入力内容を確認してください。" };
  }

  const auth = await requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error } = await auth.supabase.from("tasks").insert({
    user_id: auth.userId,
    title: parsed.data.title,
    description: parsed.data.description,
    status: parsed.data.status,
  });

  if (error) {
    return { ok: false, error: "タスクの作成に失敗しました。" };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function updateTask(input: {
  id: string;
  title: string;
  description: string;
  status: string;
}): Promise<ActionResult> {
  const idResult = taskIdSchema.safeParse(input.id);
  if (!idResult.success) {
    return { ok: false, error: idResult.error.issues[0]?.message ?? "タスクが見つかりません。" };
  }

  const parsed = taskFieldsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "入力内容を確認してください。" };
  }

  const auth = await requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error, data } = await auth.supabase
    .from("tasks")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status,
    })
    .eq("id", idResult.data)
    .select("id");

  if (error) {
    return { ok: false, error: "タスクの更新に失敗しました。" };
  }
  if (!data?.length) {
    return { ok: false, error: "タスクが見つからないか、更新する権限がありません。" };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function updateTaskStatus(id: string, status: string): Promise<ActionResult> {
  const idResult = taskIdSchema.safeParse(id);
  const statusResult = z.enum(TASK_STATUSES).safeParse(status);

  if (!idResult.success || !statusResult.success) {
    return { ok: false, error: "ステータスを更新できませんでした。" };
  }

  const auth = await requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error, data } = await auth.supabase
    .from("tasks")
    .update({ status: statusResult.data })
    .eq("id", idResult.data)
    .select("id");

  if (error) {
    return { ok: false, error: "ステータスの更新に失敗しました。" };
  }
  if (!data?.length) {
    return { ok: false, error: "タスクが見つからないか、更新する権限がありません。" };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function deleteTask(id: string): Promise<ActionResult> {
  const idResult = taskIdSchema.safeParse(id);
  if (!idResult.success) {
    return { ok: false, error: "タスクが見つかりません。" };
  }

  const auth = await requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error, data } = await auth.supabase
    .from("tasks")
    .delete()
    .eq("id", idResult.data)
    .select("id");

  if (error) {
    return { ok: false, error: "タスクの削除に失敗しました。" };
  }
  if (!data?.length) {
    return { ok: false, error: "タスクが見つからないか、削除する権限がありません。" };
  }

  revalidatePath("/");
  return { ok: true };
}
