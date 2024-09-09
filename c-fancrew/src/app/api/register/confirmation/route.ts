import { ConfirmMailModel } from "@/models/ConfirmMail";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // データベースに接続
    await connectDb();

    // リクエストからメールアドレスを取得
    const { email, token } = await req.json();

    // メールアドレスのバリデーション (基本的な例、必要に応じてカスタマイズ)
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: "無効なメールアドレスです" }, // エラーメッセージ: 無効なメールアドレス
        { status: 400 }
      );
    }

    const result = await ConfirmMailModel.aggregate([
      {
        $group: {
          _id: null,
          maxMailNo: { $max: "$mailNo" }
        }
      }
    ]);

    const mailNo: number = result.length > 0 ? result[0].maxMailNo + 1 : 0;

    // 新しいメールアドレスを登録
    const newConfirmMail = new ConfirmMailModel({ mailNo, email, token });
    await newConfirmMail.save();

    // 正常終了時のレスポンス
    return NextResponse.json(
      { 
        message: "メールアドレスが正常に登録されました", // Success message
        mailNo: mailNo // Include the mailNo in the response
      },
      { status: 201 } // Set the status code
    );

  } catch (error) {
    // エラーハンドリング: 例外が発生した場合の処理
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。再試行してください", error: error instanceof Error ? error.message : String(error) }, // エラーメッセージ: サーバーエラー
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";