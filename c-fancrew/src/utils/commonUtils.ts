import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * UUIDを構築
 * @return {String} : ランダムな16進数で構築されたUUID
 */
export const generateUUID = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
* URLの最後のスラッシュ以降の文字列を取得する関数
 * @param {string} url - 対象のURL
 * @return {string} - スラッシュ以降の文字列
 */
export const getLastSegmentUrl = (url: string): string => {
  const lastSegment = url.substring(url.lastIndexOf('/') + 1);
  const isNumber = !isNaN(Number(lastSegment));
  const lastSlashIndex = url.lastIndexOf('/');

  return isNumber
    ? url.substring(url.lastIndexOf('/', lastSlashIndex - 1) + 1, lastSlashIndex)
    : lastSegment
}

/**
 * 確認用URLを作成する関数
 * 
 * @param token - 認証用の一意のトークン文字列
 * @param mailNo - メールに関連付けられた一意の番号
 * @returns 生成された確認用URL
 */
export const createConfirmationUrl = (token: string, mailNo: number): string => {

  // ベースURLは環境変数から取得（本番環境やステージング環境用）
  // ローカル開発時にはハードコードされたURLを使用
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';  // 本番環境では実際のURLに置き換える

  // 完全な確認用URLを返す
  return `${baseUrl}/${mailNo}?param=${token}`;
};