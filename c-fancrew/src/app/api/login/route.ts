import { UserModel } from "@/models/User";
import { connectDb } from "@/utils/mongodb";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectDb();
    const { email, password } = await req.json();

    // メールアドレスにてユーザーを抽出
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return NextResponse.json({ error: 'メールアドレスまたはパスワードが間違っています' }, { status: 401 });
    }

    // パスワード確認
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
      // return NextResponse.json({ error: 'パスワードが間違っています' }, { status: 401 });
    // }
    return NextResponse.json({ message: "ログイン認証成功", user: { email: user.email } });
  } catch (error) {
    return NextResponse.json(
      { message: "ログイン認証失敗", error: error instanceof Error ? error.message : String(error) },
      { status: 500 })
  }
};

export const dynamic = "force-dynamic";