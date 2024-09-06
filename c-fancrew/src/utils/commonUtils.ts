import crypto from 'crypto';

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
  return url.substring(url.lastIndexOf('/') + 1);
};
