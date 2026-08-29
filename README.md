# tinyboard

稟議書（AppealSheet）の一覧・閲覧・Excel 出力を行う軽量ボードアプリ。

## 技術スタック

- Next.js 16 (App Router) / TypeScript
- Tailwind CSS v4
- Zod（境界バリデーション）
- ExcelJS（Excel 生成: テンプレート読み込み方式 / 方式C）

## セットアップ

```bash
pnpm install
pnpm generate:template   # Excel テンプレート（templates/appeal-sheet-template.xlsx）を生成
cp .env.example .env      # USE_MOCK=true
pnpm dev                  # http://localhost:3000
```

## 環境変数

| 変数 | 説明 |
| --- | --- |
| `USE_MOCK` | `true`（既定）の間はモックデータで動作し Snowflake へ接続しない。 |

## 主要ディレクトリ

| パス | 役割 |
| --- | --- |
| `src/app` | App Router のページ・API ルート |
| `src/components` | 表示コンポーネント（`AppealSheetView` は表示専用） |
| `src/lib/data` | データ層（`USE_MOCK` 分岐・モックデータ） |
| `src/lib/schemas.ts` | Zod スキーマ（Snowflake カラム名を統一） |
| `src/lib/excel.ts` | Excel 生成（方式C: テンプレート読み込み） |
| `templates/` | Excel テンプレート |
| `docs/react-best-practices/` | React ベストプラクティス |

## API

| メソッド / パス | 説明 |
| --- | --- |
| `GET /api/appeals` | 稟議書一覧を返す |
| `GET /api/appeals/:id` | 稟議書 1 件を返す |
| `GET /api/appeals/:id/excel` | 稟議書を Excel 出力する |

## データ層の方針

- `USE_MOCK=true` の間はモックデータで動作する。
- Snowflake のカラム名（大文字スネークケース）を API / フロント / Excel の全レイヤーで統一し、リネームしない。

## スクリプト

| コマンド | 説明 |
| --- | --- |
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド |
| `pnpm start` | 本番サーバー起動 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | 型チェック |
| `pnpm generate:template` | Excel テンプレート生成 |
