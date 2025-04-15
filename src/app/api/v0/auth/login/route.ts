import { withErrorHandler } from "@/app/api/_errorHandler";
import ResponseUtil from "@/app/api/_responseUtil";
import { authService } from "@/app/api/service/auth/_authService";
import { AuthRequest } from "@/app/api/service/auth/dto/request/AuthRequest";
import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  const loginRequest: AuthRequest = await request.json();

  await authService.login(loginRequest);

  return ResponseUtil.success({
    message: "로그인에 성공했습니다.",
  });
});
