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

// export interface FormStateForOauth {
//   error: string;
//   userData: {};
// }

export const verifyOAuthCallback = async (state: FormState, formData: FormData) => {
  try {
    const code = formData.get("code");
    const urlState = formData.get("state");

    // 認可コードをトークンに交換
    const response = await fetch("/api/oauth/token", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, urlState }),
    });

    const data = await response.json();
    if (!response.ok) {
      // トークン交換に失敗しました
      state.error = data.error;
      return state as FormState;
    } else {
      // IDトークンを検証する処理
      const idToken = data.idToken
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
          state.error = userData.error;
          return state as FormState;
        }
        return state as FormState;
      }
      return state as FormState;
    }

  } catch (e) {
    state.error = "ログイン認証に失敗しました";
    return state as FormState;
  }

}