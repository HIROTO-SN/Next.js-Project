import crypto from 'crypto';

/**
 * UUIDを構築
 * @return {String} : ランダムな16進数で構築されたUUID
 */
export const generateUUID = () => {
  return crypto.randomBytes(16).toString('hex');
};
