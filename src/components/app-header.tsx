"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AppHeaderProps = {
  email: string | null;
};

export function AppHeader({ email }: AppHeaderProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="text-lg font-bold tracking-tight text-zinc-900">Tinyboard</p>
          <p className="text-xs text-zinc-500">自分のタスクだけを管理するボード</p>
        </div>
        <div className="flex items-center gap-3">
          {email ? (
            <p className="hidden text-sm text-zinc-600 sm:block">{email}</p>
          ) : null}
          <button
            type="button"
            onClick={handleLogout}
            disabled={pending}
            className="rounded-xl border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60"
          >
            {pending ? "ログアウト中..." : "ログアウト"}
          </button>
        </div>
      </div>
    </header>
  );
}
