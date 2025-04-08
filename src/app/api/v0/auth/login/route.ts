import { ApiResponse } from "@/types/ApiResponse";
import { LoginDTO } from "@/lib/user/User";
import { NextResponse } from "next/server";
import { login } from "../../../../../lib/auth/_authServics";

export async function POST(request: Request) {
  const loginDTO: LoginDTO = await request.json();

  if (!loginDTO.loginid || !loginDTO.loginpw) {
    return NextResponse.json(
      { message: "아이디와 비밀번호를 입력해야 합니다.", timestamp: new Date().toISOString() } as ApiResponse,
      { status: 400 }
    );
  }

  try {
    const { token, payload } = await login(loginDTO);
    console.log(`login payload: ${JSON.stringify(payload)}`);
    return NextResponse.json({ message: "로그인에 성공했습니다.", token, payload }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "로그인에 실패했습니다." }, { status: 500 });
  }
}
