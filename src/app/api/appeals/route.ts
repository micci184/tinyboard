import { NextResponse } from "next/server";
import { getAppealSheets } from "@/lib/data/appeals";

export const dynamic = "force-dynamic";

export async function GET() {
  const sheets = await getAppealSheets();
  return NextResponse.json({ data: sheets });
}
