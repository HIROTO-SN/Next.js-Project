"use server"

export interface FormState {
  error: string;
}

export const verifyUser = async (state: FormState, formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json();
    if (!response.ok) {
      return data.error as FormState;
    } else {
      console.log("ログインに成功");
      return state;
    }
  } catch (e) {
    state.error = "ログイン認証に失敗しました";
    return state as FormState;
  }
}

export interface paramDataOauthGmail {
  code: string;
  stateUrl: string;
}
export interface retOauthVerification {
  error: string;
  userinfo: object;
}

export const verifyOAuthCallback = async (paramData: paramDataOauthGmail): Promise<retOauthVerification> => {
  const ret: retOauthVerification = {
    error: "",
    userinfo: {},
  }
  
  try {
    const { code, stateUrl } = paramData;
    
    // 認可コードをトークンに交換
    const response = await fetch(`${process.env.API_URL}/oauth/token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, stateUrl }),
    });
    const tokenData = await response.json();

    if (!response.ok) {
      // トークン交換に失敗しました
      ret.error = tokenData.error;
      return ret;
    }
    // IDトークンを検証する処理
    const idToken = tokenData.idToken
    if (idToken) {
      const userResponse = await fetch("/api/oauth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const userData = await userResponse.json();
      if (!userResponse.ok) {
        // IDトークンの検証に失敗しました
        ret.error = "IDトークンの検証に失敗しました";
        return ret;
      }
      // 認証成功時
      ret.userinfo = userData
      return ret;
    } else {
      ret.error = "ID tokenが見つかりませんでした";
      return ret;
    }

  } catch (e) {
    ret.error = "ユーザー認証に失敗しました";
    return ret;
  }

}