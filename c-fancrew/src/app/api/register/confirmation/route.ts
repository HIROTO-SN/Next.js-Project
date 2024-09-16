import { ConfirmMailModel } from "@/models/ConfirmMail";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    // データベースに接続
    await connectDb();
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const param = searchParams.get('param');
  
    // URLを認証
    if (!id || !param) {
      return NextResponse.json(
        { message: "idまたはparamが見つかりません" },
        { status: 400 }
      );
    }
  
    // idとparamでDB検索
    const response = await ConfirmMailModel.findOne({ mailNo: id, token: param });
        
    if (!response) {
      return NextResponse.json(
        { message: "トークンまたはメール番号が間違っています" },
        { status: 404 }
      );
    }

    // 現在時刻と比較し24時間以上経過している場合はエラー
    const moment = require('moment');
    const createdAtTime = moment.utc(response.createdAt);
    const currentTime = moment.utc();
    const timeDifference = moment.duration(currentTime.diff(createdAtTime));
    const hours = timeDifference.hours();

    if (hours > 24) {
      return NextResponse.json(
        { message: "トークン認証成功", response },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "トークン認証成功", response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "サーバーエラー", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }

}

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

    const mailNo: number = result.length > 0 ? result[0].maxMailNo + 1 : 1;

    // 新しいメールアドレスを登録
    const newConfirmMail = new ConfirmMailModel({ mailNo, email, token });
    await newConfirmMail.save();

    // 正常終了時のレスポンス
    return NextResponse.json(
      { 
        message: "メールアドレスが正常に登録されました",
        mailNo: mailNo
      },
      { status: 201 }
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