import { UserModel } from "@/models/User";
import bcrypt from 'bcrypt';
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		await connectDb();
		const { email, password } = await req.json();
    
    // メールアドレスにてユーザーを抽出
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'メールアドレス、またはパスワードが不正です' }, { status: 401 });
    }

    // パスワード確認
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'メールアドレス、またはパスワードが不正です' }, { status: 401 });
    }
		return NextResponse.json({ message: "ログイン認証成功", user: { email: user.email } });
	} catch (error) {
		return NextResponse.json({ message: "ログイン認証失敗" }, { status: 500 })
	}
};

export const dynamic = "force-dynamic";