import { getAppealSheet } from "@/lib/data/appeals";
import { generateAppealSheetExcel } from "@/lib/excel";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sheet = await getAppealSheet(id);

  if (!sheet) {
    return Response.json(
      { error: "指定された稟議書が見つかりません" },
      { status: 404 },
    );
  }

  const buffer = await generateAppealSheetExcel(sheet);
  const filename = `appeal-sheet-${sheet.APPEAL_ID}.xlsx`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
