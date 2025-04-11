import { withErrorHandler } from "@/app/api/errorHandler";
import { authService, LoginRequest, LoginResponse } from "@/lib/auth/_authService";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/_responseUtil";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(
  async (request: Request): Promise<NextResponse<ApiResponse<LoginResponse | null>>> => {
    const loginRequest: LoginRequest = await request.json();

    if (!loginRequest.loginid || !loginRequest.loginpw) {
      return ResponseUtil.rejected({
        message: "아이디와 비밀번호를 입력해야 합니다.",
      });
    }

    try {
      await authService.login(loginRequest);
      return ResponseUtil.success({
        message: "로그인에 성공했습니다.",
      });
    } catch {
      return ResponseUtil.failed({
        message: "로그인에 실패했습니다.",
      });
    }
  }
);
