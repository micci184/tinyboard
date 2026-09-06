"use client";

import { useState } from "react";
import { submitFeedback } from "@/app/actions/feedback";

export function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setSuccess("");

    const result = await submitFeedback({ message });
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    setMessage("");
    setSuccess("フィードバックを送信しました。ありがとうございます。");
    setPending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-zinc-900">フィードバック</h2>
      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-medium text-zinc-600">メッセージ</span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="ご意見・ご要望をご記入ください"
          className="w-full resize-y rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/10"
        />
      </label>
      <div className="mt-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {pending ? "送信中..." : "送信"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mt-3 text-sm text-emerald-700">
          {success}
        </p>
      ) : null}
    </form>
  );
}
