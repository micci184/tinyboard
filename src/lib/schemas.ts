import { z } from "zod";

/**
 * 稟議書（AppealSheet）のステータス。
 * Snowflake 上の値をそのまま利用するため大文字で統一する。
 */
export const AppealStatus = z.enum(["DRAFT", "PENDING", "APPROVED", "REJECTED"]);
export type AppealStatus = z.infer<typeof AppealStatus>;

/**
 * 稟議書レコード。
 * Snowflake のカラム名（大文字スネークケース）を API / フロント / Excel 全レイヤーで統一する。
 * ここでキーをリネームしないこと。
 */
export const AppealSheet = z.object({
  APPEAL_ID: z.string(),
  TITLE: z.string(),
  APPLICANT_NAME: z.string(),
  DEPARTMENT: z.string(),
  AMOUNT: z.number().nonnegative(),
  STATUS: AppealStatus,
  REASON: z.string(),
  APPROVER_NAME: z.string(),
  SUBMITTED_AT: z.string(),
});
export type AppealSheet = z.infer<typeof AppealSheet>;

export const AppealSheetList = z.array(AppealSheet);
export type AppealSheetList = z.infer<typeof AppealSheetList>;
