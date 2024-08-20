import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_TOKEN_EXCHANGE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // ユーザーデータ取得
      const userInfoResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GOOGLE_USER_FETCH_URL}${data.access_token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );
      const userInfo = await userInfoResponse.text();
      console.log(userInfo)
      return NextResponse.json({ idToken: data.id_token, userInfo });
    } else {
      return NextResponse.json({ error: data }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
