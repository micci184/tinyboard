# React / Next.js ベストプラクティス

tinyboard で React / Next.js のコードを書く際に従う指針。

## Server Components を既定にする

- App Router ではコンポーネントは既定で Server Component。データ取得は Server Component 側で `getAppealSheets()` などデータ層関数を直接呼ぶ。
- `"use client"` はブラウザ API・イベントハンドラ・状態が必要な最小範囲だけに付与する。

## データ層を分離する

- 画面から Snowflake / モックへ直接アクセスしない。必ず `src/lib/data/` 経由にする。
- `USE_MOCK` の分岐はデータ層に閉じ込め、コンポーネントは意識しない。
- Snowflake のカラム名（大文字スネークケース）を API / フロント / Excel の全レイヤーで統一し、リネームしない。

## 表示と操作を分離する

- `AppealSheetView` は表示専用。承認などの操作機能を持たせない。
- 操作が必要になった場合は別コンポーネント・別ルートに切り出す。

## バリデーション

- 外部データ（API レスポンス・Snowflake）は Zod スキーマ（`src/lib/schemas.ts`）で境界検証する。

## レンダリングとパフォーマンス

- リスト描画では安定した `key`（`APPEAL_ID` など）を使う。
- 不要な Client Component 化・不要な `useEffect` を避ける。
- 重い整形処理は表示ヘルパー（`src/lib/display.ts`）に集約し再利用する。
