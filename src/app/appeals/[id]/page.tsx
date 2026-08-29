import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppealSheet } from "@/lib/data/appeals";
import { AppealSheetView } from "@/components/AppealSheetView";

export const dynamic = "force-dynamic";

export default async function AppealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sheet = await getAppealSheet(id);

  if (!sheet) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 一覧へ戻る
        </Link>
        <a
          href={`/api/appeals/${sheet.APPEAL_ID}/excel`}
          className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Excel を出力
        </a>
      </div>

      <AppealSheetView sheet={sheet} />
    </div>
  );
}
