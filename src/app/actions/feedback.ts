"use server";

import { z } from "zod";
import { FEEDBACK_MESSAGE_MAX } from "@/lib/feedback";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true } | { ok: false; error: string };

const feedbackMessageSchema = z
  .string()
  .trim()
  .min(1, "フィードバックを入力してください。")
  .max(FEEDBACK_MESSAGE_MAX, `フィードバックは${FEEDBACK_MESSAGE_MAX}文字以内で入力してください。`);

type AuthContext =
  | { ok: true; supabase: Awaited<ReturnType<typeof createClient>>; userId: string }
  | { ok: false; error: string };

class FeedbackAuth {
  static async requireUser(): Promise<AuthContext> {
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
}

export async function createFeedback(input: { message: string }): Promise<ActionResult> {
  const parsed = feedbackMessageSchema.safeParse(input.message);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "入力内容を確認してください。" };
  }

  const auth = await FeedbackAuth.requireUser();
  if (!auth.ok) {
    return auth;
  }

  const { error } = await auth.supabase.from("feedback").insert({
    user_id: auth.userId,
    message: parsed.data,
  });

  if (error) {
    return { ok: false, error: "フィードバックの送信に失敗しました。" };
  }

  return { ok: true };
}
