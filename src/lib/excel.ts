import ExcelJS from "exceljs";
import path from "node:path";
import type { AppealSheet } from "@/lib/schemas";

/**
 * Excel 生成はテンプレート読み込み方式（方式C）。
 * templates/appeal-sheet-template.xlsx を読み込み、{{COLUMN_NAME}} プレースホルダを
 * 実データで置換して出力する。プレースホルダ名は Snowflake のカラム名と一致させる。
 */

const TEMPLATE_PATH = path.join(
  process.cwd(),
  "templates",
  "appeal-sheet-template.xlsx",
);

function formatValue(key: keyof AppealSheet, sheet: AppealSheet): string {
  if (key === "AMOUNT") {
    return `¥${sheet.AMOUNT.toLocaleString("ja-JP")}`;
  }
  if (key === "SUBMITTED_AT") {
    return new Date(sheet.SUBMITTED_AT).toLocaleString("ja-JP");
  }
  return String(sheet[key]);
}

export async function generateAppealSheetExcel(
  sheet: AppealSheet,
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(TEMPLATE_PATH);

  const worksheet = workbook.worksheets[0];
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      if (typeof cell.value !== "string") return;
      cell.value = cell.value.replace(/\{\{(\w+)\}\}/g, (match, token) => {
        if (token in sheet) {
          return formatValue(token as keyof AppealSheet, sheet);
        }
        return match;
      });
    });
  });

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
