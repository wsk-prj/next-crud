import { login, LoginRequest, LoginResponse } from "@/lib/auth/_authService";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<ApiResponse<LoginResponse | null>>> {
  const loginRequest: LoginRequest = await request.json();

  if (!loginRequest.loginid || !loginRequest.loginpw) {
    return NextResponse.json(
      {
        message: "아이디와 비밀번호를 입력해야 합니다.",
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }

  try {
    const { token, payload } = await login(loginRequest);
    console.log(`login payload: ${JSON.stringify(payload)}`);
    return NextResponse.json(
      { message: "로그인에 성공했습니다.", data: { token, payload }, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "로그인에 실패했습니다.", data: null, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
