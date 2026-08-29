import Link from "next/link";
import { getAppealSheets } from "@/lib/data/appeals";
import { StatusBadge } from "@/components/StatusBadge";
import { formatAmount, formatDate } from "@/lib/display";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const sheets = await getAppealSheets();

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">稟議書一覧</h1>
          <p className="mt-1 text-sm text-gray-500">
            {sheets.length} 件の稟議書
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sheets.map((sheet) => (
          <li key={sheet.APPEAL_ID}>
            <Link
              href={`/appeals/${sheet.APPEAL_ID}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-gray-900">{sheet.TITLE}</h2>
                <StatusBadge status={sheet.STATUS} />
              </div>
              <p className="mt-1 text-xs text-gray-500">{sheet.APPEAL_ID}</p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
                <div className="flex gap-1">
                  <dt className="text-gray-500">申請者</dt>
                  <dd>{sheet.APPLICANT_NAME}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-gray-500">金額</dt>
                  <dd>{formatAmount(sheet.AMOUNT)}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-gray-500">申請日</dt>
                  <dd>{formatDate(sheet.SUBMITTED_AT)}</dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
