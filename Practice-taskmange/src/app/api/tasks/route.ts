import { NextResponse } from "next/server";

export interface Task {
	id: number;
	name: string;
}

const tasks: Task[] = [
	{ id: 1, name: 'プログラミング'},
	{ id: 2, name: 'ネクストJS'},
];

export const GET = async () => {
	return NextResponse.json({ tasks }, {
		status: 200
	})
}

export const dynamic = 'force-dynamic';