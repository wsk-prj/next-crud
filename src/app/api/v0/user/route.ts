import { NextResponse } from "next/server";
import { registerUser } from "./_userServics";

export interface RegisterDTO {
  loginid: string;
  loginpw: string;
}

export async function POST(request: Request) {
  const { loginid, loginpw } = await request.json();

  if (!loginid || !loginpw) {
    return NextResponse.json({ message: "아이디와 비밀번호를 입력해야 합니다." }, { status: 400 });
  }

  try {
    await registerUser({ loginid, loginpw });
    return NextResponse.json({ message: "회원가입이 완료되었습니다." }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "회원가입 중 오류가 발생했습니다." }, { status: 500 });
  }
}
