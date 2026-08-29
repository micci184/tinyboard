import { NextResponse } from "next/server";
import { getAppealSheet } from "@/lib/data/appeals";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sheet = await getAppealSheet(id);

  if (!sheet) {
    return NextResponse.json(
      { error: "指定された稟議書が見つかりません" },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: sheet });
}
