import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

interface idTokenReturn {
  error: string;
  idToken: string;
  status: number;
  userInfo: object;
}

export const POST = async (req: NextRequest) => {
  const ret: idTokenReturn = {
    error: "",
    idToken: "",
    status: 200,
    userInfo: {},
  };

  const handleReturn = (message: string, status: number, idToken: string, userInfo: object) => {
    ret.error = message;
    ret.status = status;
    ret.idToken = idToken;
    ret.userInfo = userInfo;
    return NextResponse.json(ret);
  };

  try {
    const { idToken } = await req.json();

    if (!idToken) {
      // idTokenがリクエストに含まれていない場合
      return handleReturn('idTokenが見つかりませんでした', 400, ret.idToken, ret.userInfo);
    }
    // GoogleJWTから公開鍵情報を取得する
    const jwksResponse = await fetch(process.env.NEXT_PUBLIC_JWKS_URL || "");
    const jwksData = await jwksResponse.json();

    // 公開鍵を使用してトークンを検証する
    const decodedHeader = jwt.decode(idToken, { complete: true }) as { header: { kid: string } };
    const kid = decodedHeader?.header.kid;
    
    // 'kid'に該当する公開鍵を探す
    const key = jwksData.keys.find((key: { kid: string }) => key.kid === kid);
    if (!key) {
      return handleReturn('有効な公開鍵が見つかりませんでした', 401, ret.idToken, ret.userInfo);
    }

    // PEMフォーマットで公開鍵を構築する
    const publicKey = jwkToPem(key);

    let decodedToken;
    try {
      decodedToken = jwt.verify(idToken, publicKey, { algorithms: ['RS256'] });

    } catch (error) {
      // トークンが無効または期限切れの場合
      return handleReturn('無効または期限切れのidTokenです', 401, ret.idToken, ret.userInfo);
    }

    // トークンに必要なクレームが含まれているかを確認する例
    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.sub) {
      // idTokenの構造が無効な場合
      return handleReturn('idTokenの構造が無効です', 400, ret.idToken, ret.userInfo);
    }
    // トークンが有効な場合
    return handleReturn("", 200, idToken, decodedToken);

  } catch (error) {
    // 内部サーバーエラーが発生した場合
    return handleReturn(`内部サーバーエラー: ${error instanceof Error ? error.message : "不明なエラー"}`, 500, ret.idToken, ret.userInfo);
  }
};
