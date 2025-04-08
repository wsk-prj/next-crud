import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ message: "로그아웃에 성공했습니다." }, { status: 200 });
}
