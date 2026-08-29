/**
 * USE_MOCK が true の間はデータ層がモックデータで動作する。
 * 明示的に "false" が指定された場合のみ Snowflake 接続を行う。
 */
export const USE_MOCK = process.env.USE_MOCK !== "false";
