export function toAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login")) {
    return "メールアドレスまたはパスワードが正しくありません。";
  }
  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered") ||
    normalized.includes("user already exists")
  ) {
    return "このメールアドレスは既に登録されています。";
  }
  if (normalized.includes("email not confirmed")) {
    return "メールアドレスの確認が完了していません。受信トレイを確認してください。";
  }
  if (normalized.includes("password should be") || normalized.includes("password is known")) {
    return "パスワードは6文字以上で、推測されにくいものを設定してください。";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "リクエストが多すぎます。しばらく待ってから再試行してください。";
  }
  if (normalized.includes("signup is disabled")) {
    return "現在、新規登録は無効です。";
  }

  return "認証に失敗しました。入力内容を確認して再度お試しください。";
}
