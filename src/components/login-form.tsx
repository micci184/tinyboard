"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toAuthErrorMessage } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setInfo("");

    const supabase = createClient();

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(toAuthErrorMessage(signInError.message));
        setPending(false);
        return;
      }

      router.push("/");
      router.refresh();
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(toAuthErrorMessage(signUpError.message));
      setPending(false);
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setInfo(
      "確認メールを送信しました。受信トレイのリンクを開いてアカウントを有効化してください。",
    );
    setPending(false);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex rounded-xl bg-zinc-100 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
            setInfo("");
          }}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "login"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          ログイン
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError("");
            setInfo("");
          }}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "signup"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          新規登録
        </button>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
        {mode === "login" ? "ログイン" : "アカウント作成"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        {mode === "login"
          ? "登録済みのメールアドレスとパスワードでサインインします。"
          : "メールアドレスとパスワードだけで始められます。"}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            メールアドレス
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-900/10 focus:border-zinc-400 focus:ring-4"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            パスワード
          </span>
          <input
            type="password"
            name="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-900/10 focus:border-zinc-400 focus:ring-4"
          />
        </label>

        {error ? (
          <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {info ? (
          <p role="status" className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {info}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? mode === "login"
              ? "ログイン中..."
              : "登録中..."
            : mode === "login"
              ? "ログイン"
              : "登録する"}
        </button>
      </form>
    </div>
  );
}
