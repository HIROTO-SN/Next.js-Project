"use server"

import { formLoginInputs } from '@/app/(home)/login/page';
import { LoginAPIReturn } from '@/app/api/login/route';
import { createConfirmationUrl, generateRandom6Digit } from '@/utils/commonUtils';
import { smsVerificationMsg } from '@/utils/config/registerConf';
import { ApplogToFile, ErrorlogToFile } from '@/utils/logger';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { v4 as uuidv4 } from 'uuid';
import { confirmEmailTemplate } from '../../templates/mail/confirmation';

export interface retLoginState {
  message: string;
  error: string;
}

/**
 * ユーザー認証
 * @param state 
 * @param formData 
 * @returns 
 */
export const verifyUser = async (formData: formLoginInputs): Promise<retLoginState> => {
  const email = formData.email;
  const password = formData.password;

  try {

    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data: LoginAPIReturn = await response.json();
    return { message: data.message, error: data.error };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ErrorlogToFile(`Login confirmation failed: email typed: ${email}, password typed: ${password}, message: ${errorMessage}`);
    return { message: "ログイン認証失敗", error: errorMessage };
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

    const token = uuidv4();  // ユニークなトークンを生成

    const response = await fetch(`${process.env.API_URL}/register/confirmation`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    })

    const data = await response.json();
    if (!response.ok) {
      return data.message;
    }

    // Email 内容
    const mailOptions = {
      from: process.env.SMTP_GMAIL_USER, // 送信者アドレス
      to: email,                    // 受信者アドレス
      subject: '【フェンくる-clone】仮登録完了',
      html: confirmEmailTemplate(createConfirmationUrl(token, data.mailNo)),
    };

    // メール送信
    const ret = await transporter.sendMail(mailOptions);
    return true
  } catch (error) {
    return false
  }
}

export interface paramDataConfirmingMail {
  id: Number;
  param: string;
}

/**
 * 本登録画面遷移時トークン認証
 * @param
 */
export const verifyConfirmEmail = async (paramData: paramDataConfirmingMail): Promise<string> => {
  const { id, param } = paramData;

  try {
    const url = `${process.env.API_URL}/register/confirmation?id=${id}&param=${param}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    if (response.status !== 200) {
      ApplogToFile(`Mail confirmation failed with status: ${response.status}, id: ${id}, token: ${param}, message: ${data.message}`);
      return "";
    }
    return data.email;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ErrorlogToFile(`Mail confirmation failed: id: ${id}, token: ${param}, message: ${errorMessage}`);
    return "";
  }
}

/**
 * 電話番号認証
 * @param tel 電話番号
 */
export const verifySMS = async (tel: string): Promise<string> => {

  try {
    const sessionId = uuidv4(); // ユーザーごとに一意のセッションID生成
    const otp = generateRandom6Digit();

    // データベースへOTP保存（キー: sessionId, 値: otp）
    const url = `${process.env.API_URL}/register/sms`;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, otp }),
    })

    if (response.status !== 200) {
      return "";
    }
    
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
    
    console.log("    await client.messages.create前      ");
    await client.messages.create({
      body: `${otp} ${smsVerificationMsg}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: tel,
    });

    console.log("    await client.messages.create後    ");

    return sessionId;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ErrorlogToFile(`SMS send failed: phone number: ${tel}, message: ${errorMessage}`);
    return "";
  }
}