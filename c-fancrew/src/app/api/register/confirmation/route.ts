import { ConfirmMailModel } from "@/models/ConfirmMail";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

interface confReturn {
  message: string;
  status: number;
  error: string;
}

function createConfReturn(
  message: string = "トークン認証成功",
  status: number = 200,
  error: string = "",
): confReturn {
  return { message, status, error };
}

const handleReturn = ({ message, status, error }: confReturn) => {
  return NextResponse.json(
    { message: message, error: error },
    { status: status },
  );
};

/**
 * 確認用メールアドレスをトークンとidで認証
 * @param req 
 * @returns 
 */
export const GET = async (req: Request) => {
  try {
    // データベースに接続
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const param = searchParams.get('param');

    // URLを認証
    if (!id || !param) {
      return handleReturn(createConfReturn("idまたはparamが見つかりません", 400, ""))
    }
    // idとparamでDB検索
    const response = await ConfirmMailModel.findOne({ mailNo: id, token: param });
    if (!response) {
      return handleReturn(createConfReturn("トークンまたはメール番号が間違っています", 404, ""))
    }
    
    // 現在時刻と比較し24時間以上経過している場合はエラー
    const moment = require('moment');
    const createdAtTime = moment.utc(response.createdAt);
    const currentTime = moment.utc();
    const timeDifference = moment.duration(currentTime.diff(createdAtTime));
    const days = Number(timeDifference.days());
    const hours = Number(timeDifference.hours());
    const total = days * 24 + hours;

    // トークンの有効期限は24時間とする
    if (total < 24) {
      return handleReturn(createConfReturn())
    } else {
      return handleReturn(createConfReturn("トークンの有効期限が切れています", 404, ""))
    }
  } catch (error) {
    return handleReturn(createConfReturn("サーバーエラー", 500, error instanceof Error ? error.message : String(error)))
  }
}

/**
 * 確認用メールアドレスの登録
 * @param req 
 * @returns 
 */
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