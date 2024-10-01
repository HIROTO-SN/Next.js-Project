import { UserModel } from "@/models/User";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export interface LoginAPIReturn {
  message: string;
  status: number;
  error: string;
}

function createConfReturn(
  message = "ログイン認証成功",
  status = 200,
  error = "",
): LoginAPIReturn {
  return { message, status, error };
}

const handleReturn = ({ message, status, error }: LoginAPIReturn) => {
  return NextResponse.json(
    { message: message, error: error },
    { status: status },
  );
};

export const POST = async (req: Request) => {
  try {
    await connectDb();
    const { email, password } = await req.json();

    // メールアドレスにてユーザーを抽出
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return handleReturn(createConfReturn("メールアドレスまたはパスワードが間違っています", 401));
    }

    // パスワード確認
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
      // return NextResponse.json({ error: 'パスワードが間違っています' }, { status: 401 });
    // }
    return handleReturn(createConfReturn());
  } catch (error) {
    handleReturn(createConfReturn("ログイン認証処理中に予期せぬエラーが発生しました。", 500, error instanceof Error ? error.message : String(error)));
  }
};

export const dynamic = "force-dynamic";