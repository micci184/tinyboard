// 稟議書 Excel テンプレート（方式C: テンプレート読み込み方式）を生成するスクリプト。
// 生成物: templates/appeal-sheet-template.xlsx
// プレースホルダ {{COLUMN_NAME}} は Snowflake のカラム名と一致させる。
import ExcelJS from "exceljs";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "templates");
const outPath = path.join(outDir, "appeal-sheet-template.xlsx");

const workbook = new ExcelJS.Workbook();
workbook.creator = "tinyboard";
const sheet = workbook.addWorksheet("稟議書");

sheet.columns = [
  { width: 20 },
  { width: 50 },
];

const titleCell = sheet.getCell("A1");
titleCell.value = "稟議書 / Appeal Sheet";
titleCell.font = { size: 16, bold: true };
sheet.mergeCells("A1:B1");

const rows = [
  ["稟議番号 (APPEAL_ID)", "{{APPEAL_ID}}"],
  ["件名 (TITLE)", "{{TITLE}}"],
  ["申請者 (APPLICANT_NAME)", "{{APPLICANT_NAME}}"],
  ["部署 (DEPARTMENT)", "{{DEPARTMENT}}"],
  ["金額 (AMOUNT)", "{{AMOUNT}}"],
  ["ステータス (STATUS)", "{{STATUS}}"],
  ["承認者 (APPROVER_NAME)", "{{APPROVER_NAME}}"],
  ["申請日 (SUBMITTED_AT)", "{{SUBMITTED_AT}}"],
  ["申請理由 (REASON)", "{{REASON}}"],
];

let rowIndex = 3;
for (const [label, placeholder] of rows) {
  const labelCell = sheet.getCell(`A${rowIndex}`);
  labelCell.value = label;
  labelCell.font = { bold: true };
  labelCell.alignment = { vertical: "top" };
  const valueCell = sheet.getCell(`B${rowIndex}`);
  valueCell.value = placeholder;
  valueCell.alignment = { vertical: "top", wrapText: true };
  rowIndex += 1;
}

await mkdir(outDir, { recursive: true });
await workbook.xlsx.writeFile(outPath);
console.log(`Wrote template: ${outPath}`);
