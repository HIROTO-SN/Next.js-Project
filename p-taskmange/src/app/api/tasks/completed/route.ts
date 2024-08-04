import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectDb();
		const completeTasks: TaskDocument[] = await TaskModel.find({
			isCompleted: true,
		});
		return NextResponse.json({ message: "タスク取得成功", tasks: completeTasks});
	} catch (error) {
		return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 })
	}
};

export const dynamic = "force-dynamic";