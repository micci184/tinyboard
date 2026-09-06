# Tinyboard

ログインしたユーザーが自分のタスクだけを管理できる、小さな日本語タスクボードです。

- Next.js 16 (App Router) / React 19 / TypeScript / Tailwind CSS 4
- 認証: Supabase Auth（メール / パスワード）
- データ: Supabase PostgreSQL + Row Level Security（`user_id`）

## 機能

1. メール / パスワードでログイン（同じ画面から新規登録も可）
2. タスク一覧
3. タスク作成
4. タスク更新（タイトル・説明・ステータス）
5. タスク削除（確認つき）
6. ログイン後ホームからのフィードバック送信（`public.feedback`）

未ログインのユーザーはログイン画面へリダイレクトされます。各ユーザーは自分の行だけ閲覧・操作できます。

## 必要な環境変数

`.env.example` を `.env.local` にコピーして値を入れてください。

```bash
cp .env.example .env.local
```

| 変数 | 説明 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable キー |

サービスロールキーは使わず、コミットもしないでください。`.env` / `.env.local` は gitignore 済みです。

公開環境変数が無い状態でも `pnpm build` は通るようにしてあります（ビルド時はプレースホルダを使い、実行時に実値を読みます）。アプリを実際に使うときは必ず `.env.local` を設定してください。

## ローカル起動

パッケージマネージャは **pnpm** です。npm / yarn には切り替えないでください。

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

## Supabase のセットアップ

1. [Supabase](https://supabase.com/) でプロジェクトを作成する
2. Project Settings → API から Project URL と anon / publishable キーを控える
3. マイグレーションを適用する（どちらか）
   - **SQL Editor**: `supabase/migrations/` 内の SQL（タスクとフィードバック）を実行
   - **Supabase CLI**: `supabase db push`（または `supabase migration up`）
4. Authentication → Providers で Email が有効なことを確認する
5. デモ用途では Authentication → Providers → Email の **Confirm email** をオフにすると、登録直後にログインできます
6. メール確認を使う場合は Authentication → URL Configuration の Site URL を `http://localhost:3000` にし、確認リンクを `/auth/confirm?token_hash={{ .TokenHash }}&type=email` に向ける

マイグレーションが作るもの:

- `public.tasks`（`id`, `user_id`, `title`, `description`, `status`, `created_at`, `updated_at`）
- `status` は `todo` / `in_progress` / `done`
- RLS により `authenticated` ユーザーは `user_id = auth.uid()` の行だけ SELECT / INSERT / UPDATE / DELETE できる
- `public.feedback`（`id`, `user_id`, `message`, `created_at`）
- RLS により `authenticated` ユーザーは自分の行だけ INSERT できる（`user_id = auth.uid()`）

## ビルド

```bash
pnpm build
```

## 構成

- `src/lib/supabase/client.ts` — ブラウザ用 Supabase クライアント
- `src/lib/supabase/server.ts` — Server Components / Server Actions 用クライアント
- `src/lib/supabase/proxy.ts` + `src/proxy.ts` — Cookie セッションの更新と未ログイン時のリダイレクト（Next.js 16 の Proxy。旧 middleware 相当）
- `src/app/actions/tasks.ts` — タスク CRUD の Server Actions
- `src/app/actions/feedback.ts` — フィードバック送信の Server Action
- `supabase/migrations` — スキーマと RLS
