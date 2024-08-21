import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface idTokenReturn {
  error: string;
  idToken: string;
  status: number;
  userInfo: object;
}

const PUBLIC_KEY = process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY as string;

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
    console.log("Idtoken検証作業中---------------")

    if (!idToken) {
      // idTokenがリクエストに含まれていない場合
      return handleReturn('idTokenが見つかりませんでした', 400, ret.idToken, ret.userInfo);
    }

    let decodedToken;
    try {
      // 公開鍵を使用してトークンを検証する
      decodedToken = jwt.verify(idToken, PUBLIC_KEY, { algorithms: ['RS256'] });
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
    ret.idToken = idToken; // Set the valid idToken
    ret.userInfo = decodedToken; // Assuming decodedToken contains user information
    return NextResponse.json(ret);

  } catch (error) {
    // 内部サーバーエラーが発生した場合
    return handleReturn(`内部サーバーエラー: ${error instanceof Error ? error.message : "不明なエラー"}`, 500, ret.idToken, ret.userInfo);
  }
};
