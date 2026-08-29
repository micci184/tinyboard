import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-xl font-bold text-gray-900">
        稟議書が見つかりません
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        指定された稟議書は存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        一覧へ戻る
      </Link>
    </div>
  );
}
