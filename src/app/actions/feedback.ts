"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const feedbackMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "メッセージを入力してください。")
    .max(2000, "メッセージは2000文字以内で入力してください。"),
});

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

export async function createFeedback(input: { message: string }): Promise<ActionResult> {
  const parsed = feedbackMessageSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "入力内容を確認してください。" };
  }

  const auth = await requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error } = await auth.supabase.from("feedback").insert({
    user_id: auth.userId,
    message: parsed.data.message,
  });

  if (error) {
    return { ok: false, error: "フィードバックの送信に失敗しました。" };
  }

  return { ok: true };
}
