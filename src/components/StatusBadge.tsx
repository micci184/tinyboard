import type { AppealStatus } from "@/lib/schemas";
import { STATUS_CLASS, STATUS_LABEL } from "@/lib/display";

export function StatusBadge({ status }: { status: AppealStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
