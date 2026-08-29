export function SetupNotice() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-amber-950 shadow-sm">
        <h1 className="text-xl font-bold">環境変数が未設定です</h1>
        <p className="mt-3 text-sm leading-7">
          Tinyboard を動かすには Supabase の公開 URL と anon キーが必要です。
          <code className="mx-1 rounded bg-white/80 px-1.5 py-0.5 font-mono text-[0.85em]">
            .env.example
          </code>
          を
          <code className="mx-1 rounded bg-white/80 px-1.5 py-0.5 font-mono text-[0.85em]">
            .env.local
          </code>
          にコピーし、
          <code className="mx-1 rounded bg-white/80 px-1.5 py-0.5 font-mono text-[0.85em]">
            NEXT_PUBLIC_SUPABASE_URL
          </code>
          と
          <code className="mx-1 rounded bg-white/80 px-1.5 py-0.5 font-mono text-[0.85em]">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>
          を設定してください。
        </p>
      </div>
    </main>
  );
}
