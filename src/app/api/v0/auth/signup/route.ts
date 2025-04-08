import { NextResponse } from "next/server";
import { signup } from "@/lib/user/_userService";

export async function POST(request: Request) {
  const { loginid, loginpw, nickname } = await request.json();

  if (!loginid || !loginpw || !nickname) {
    return NextResponse.json({ message: "아이디, 비밀번호, 닉네임을 입력해야 합니다." }, { status: 400 });
  }

  try {
    await signup({ loginid, loginpw, nickname });
    return NextResponse.json({ message: "회원가입이 완료되었습니다." }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "회원가입 중 오류가 발생했습니다." }, { status: 500 });
  }
}
