import { SmsConfirmlModel } from "@/models/SmsConfirm";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

/**
 * SMS認証一時保存
 * @param req 
 * @returns 
 */
export const POST = async (req: Request) => {
  try {
    // データベースに接続
    await connectDb();

    // リクエストからメールアドレスを取得
    const { sessionId, otp } = await req.json();

    // 新しいメールアドレスを登録
    const newConfirmMail = new SmsConfirmlModel({ sessionId, otp });
    await newConfirmMail.save();

    // 正常終了時のレスポンス
    return NextResponse.json({ message: "SMSが一時保存されました"}, { status: 200 });

  } catch (error) {
    // エラーハンドリング: 例外が発生した場合の処理
    return NextResponse.json(
      { message: "SMS認証情報一時保存時にサーバーエラーが発生しました。再試行してください", error: error instanceof Error ? error.message : String(error) }, // エラーメッセージ: サーバーエラー
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";