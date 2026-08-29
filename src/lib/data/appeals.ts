import { USE_MOCK } from "@/lib/env";
import { AppealSheet, AppealSheetList } from "@/lib/schemas";
import { MOCK_APPEAL_SHEETS } from "@/lib/data/mock";

/**
 * データ層エントリポイント。
 * USE_MOCK=true の間はモックデータを返す。false のときのみ Snowflake に接続する。
 * どのレイヤーでも Snowflake のカラム名（大文字スネークケース）をリネームしない。
 */

async function fetchFromSnowflake(): Promise<AppealSheetList> {
  // USE_MOCK=false 運用時に Snowflake ドライバへ差し替える箇所。
  // 本タスクではモック運用のため未実装。
  throw new Error(
    "Snowflake 接続は未設定です。USE_MOCK=true で起動するか、接続情報を設定してください。",
  );
}

export async function getAppealSheets(): Promise<AppealSheetList> {
  if (USE_MOCK) {
    return AppealSheetList.parse(MOCK_APPEAL_SHEETS);
  }
  return AppealSheetList.parse(await fetchFromSnowflake());
}

export async function getAppealSheet(
  appealId: string,
): Promise<AppealSheet | null> {
  const sheets = await getAppealSheets();
  const found = sheets.find((sheet) => sheet.APPEAL_ID === appealId);
  return found ? AppealSheet.parse(found) : null;
}
