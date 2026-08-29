import type { AppealSheet } from "@/lib/schemas";
import { StatusBadge } from "@/components/StatusBadge";
import { formatAmount, formatDate } from "@/lib/display";

/**
 * AppealSheetView は表示専用コンポーネント。承認などの操作機能は持たない。
 */
export function AppealSheetView({ sheet }: { sheet: AppealSheet }) {
  const fields: { label: string; value: React.ReactNode }[] = [
    { label: "稟議番号", value: sheet.APPEAL_ID },
    { label: "申請者", value: sheet.APPLICANT_NAME },
    { label: "部署", value: sheet.DEPARTMENT },
    { label: "金額", value: formatAmount(sheet.AMOUNT) },
    { label: "承認者", value: sheet.APPROVER_NAME },
    { label: "申請日", value: formatDate(sheet.SUBMITTED_AT) },
  ];

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{sheet.TITLE}</h1>
          <p className="mt-1 text-sm text-gray-500">{sheet.APPEAL_ID}</p>
        </div>
        <StatusBadge status={sheet.STATUS} />
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {field.label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{field.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
          申請理由
        </dt>
        <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-900">
          {sheet.REASON}
        </dd>
      </div>
    </article>
  );
}
