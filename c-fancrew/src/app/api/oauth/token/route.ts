import { NextResponse } from 'next/server';

interface tokenReturn {
  error: string;
  idToken: string;
  status: number;
  userInfo: object;
}


export const POST = async (req: Request) => {
  const ret: tokenReturn = {
    error: "",
    idToken: "",
    status: 200,
    userInfo: {},
  }

  const handleReturn = (message: string, status: number, idToken: string, userInfo: object) => {
    ret.error = message;
    ret.status = status;
    ret.idToken = idToken;
    ret.userInfo = userInfo;
    return NextResponse.json(ret);
  };

  try {
    const { code, urlState } = await req.json();

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string);
    params.append('client_secret', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string);
    params.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT as string);
    params.append('grant_type', 'authorization_code');
    params.append('state', urlState);

    // トークン交換の準備
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_TOKEN_EXCHANGE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const tokenData = await tokenResponse.json();

    if (tokenResponse.ok) {
      // ユーザーデータ取得
      const userInfoResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GOOGLE_USER_FETCH_URL}${tokenData.access_token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      const userInfo = await userInfoResponse.json();
      if (userInfoResponse.ok) {
        // 正常系（ユーザー取得に成功、トークン交換成功）
        const returnttt = handleReturn(ret.error, ret.status, tokenData.id_token, userInfo);
        return handleReturn(ret.error, ret.status, tokenData.id_token, userInfo);
      } else {
        // ユーザー情報取得に失敗
        return handleReturn(userInfo.error, userInfoResponse.status, ret.idToken, ret.userInfo);
      }
    } else {
      // トークンの取得に失敗
      return handleReturn(tokenData, tokenResponse.status, ret.idToken, ret.userInfo);
    }
  } catch (error) {
    return handleReturn(`"Internal Server Error: ${error instanceof Error ? error.message : "Unknown error"}`, 500, ret.idToken, ret.userInfo);
  }
}
