"use server"

import nodemailer from 'nodemailer';

export interface FormState {
  error: string;
}

/**
 * ユーザー認証
 * @param state 
 * @param formData 
 * @returns 
 */
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

/**
 * Google認証
 * @param paramData 
 * @returns 
 */
export const verifyOAuthCallback = async (paramData: paramDataOauthGmail): Promise<retOauthVerification> => {
  const ret: retOauthVerification = {
    error: "",
    userinfo: {},
  }

  try {
    const { code, stateUrl } = paramData;

    // 認可コードをトークンに交換
    const tokenResponse = await fetch(`${process.env.API_URL}/oauth/token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, stateUrl }),
    });
    const tokenFetchedData = await tokenResponse.json();
    if (tokenFetchedData.status !== 200) {
      // トークン交換に失敗しました
      ret.error = tokenFetchedData.error;
      return ret;
    }

    // IDトークンを検証する処理
    const idToken = tokenFetchedData.idToken;
    if (idToken.trim().length > 0) {
      const idVerifyResponse = await fetch(`${process.env.API_URL}/oauth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
      const idVerifyData = await idVerifyResponse.json();
      if (idVerifyData.status !== 200) {
        // IDトークンの検証に失敗しました
        ret.error = idVerifyData.error;
        return ret;
      }
      // 認証成功時
      ret.userinfo = {
        email: idVerifyData.userInfo.email,
        verified: idVerifyData.userInfo.email_verified
      };
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

/**
 * 確認メール送信
 * @param email メールアドレス 
 */
export const sendConfirmEmail = async (email: string): Promise<Boolean> => {
  try {
    // Gmail SMTP 設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // SMTP server host
      port: 587,               // SMTP server port
      secure: false,           // Use TLS
      auth: {
        user: process.env.SMTP_GMAIL_USER,  // SMTP username
        pass: process.env.SMTP_GMAIL_PASS,  // SMTP password
      },
    });

    // Email 内容
    const mailOptions = {
      from: process.env.SMTP_GMAIL_USER, // 送信者アドレス
      to: email,                    // 受信者アドレス
      subject: 'メールアドレス確認',
      text: 'このメールは、あなたのメールアドレスを確認するために送信されました。',
    };

    // メール送信
    const ret = await transporter.sendMail(mailOptions);
    return true
  } catch (error) {
    return false
  }
}