import type { AppealSheet } from "@/lib/schemas";

/**
 * USE_MOCK=true のときに利用するモックデータ。
 * キーは Snowflake のカラム名（大文字スネークケース）と一致させる。
 */
export const MOCK_APPEAL_SHEETS: AppealSheet[] = [
  {
    APPEAL_ID: "AP-2026-0001",
    TITLE: "開発用クラウド環境の増強",
    APPLICANT_NAME: "山田 太郎",
    DEPARTMENT: "プラットフォーム開発部",
    AMOUNT: 480000,
    STATUS: "PENDING",
    REASON:
      "CI/CD パイプラインのビルド待ち時間が慢性的に増加しているため、ビルド用インスタンスを増強したい。",
    APPROVER_NAME: "佐藤 花子",
    SUBMITTED_AT: "2026-08-21T09:30:00.000Z",
  },
  {
    APPEAL_ID: "AP-2026-0002",
    TITLE: "BI ツールのライセンス追加購入",
    APPLICANT_NAME: "鈴木 一郎",
    DEPARTMENT: "経営企画部",
    AMOUNT: 1200000,
    STATUS: "APPROVED",
    REASON:
      "四半期レポートの作成メンバーが増員されたため、閲覧・編集ライセンスを 10 名分追加する。",
    APPROVER_NAME: "田中 部長",
    SUBMITTED_AT: "2026-08-18T02:15:00.000Z",
  },
  {
    APPEAL_ID: "AP-2026-0003",
    TITLE: "セキュリティ研修の外部委託",
    APPLICANT_NAME: "高橋 みどり",
    DEPARTMENT: "情報システム部",
    AMOUNT: 350000,
    STATUS: "DRAFT",
    REASON:
      "全社員向けのフィッシング対策研修を外部ベンダーへ委託し、年 2 回実施する。",
    APPROVER_NAME: "—",
    SUBMITTED_AT: "2026-08-25T11:00:00.000Z",
  },
  {
    APPEAL_ID: "AP-2026-0004",
    TITLE: "オフィス複合機のリプレース",
    APPLICANT_NAME: "伊藤 健",
    DEPARTMENT: "総務部",
    AMOUNT: 780000,
    STATUS: "REJECTED",
    REASON:
      "既存機のリース満了に伴う入れ替え。ただし現行機の継続利用が可能と判断されたため差し戻し。",
    APPROVER_NAME: "渡辺 課長",
    SUBMITTED_AT: "2026-08-12T06:45:00.000Z",
  },
];
