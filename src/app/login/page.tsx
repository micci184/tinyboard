import { SetupNotice } from "@/components/setup-notice";
import { LoginForm } from "@/components/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function LoginPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 py-16">
      <p className="mb-6 text-sm font-semibold tracking-wide text-zinc-500">Tinyboard</p>
      <LoginForm />
    </main>
  );
}
