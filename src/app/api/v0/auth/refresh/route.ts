import { withErrorHandler } from "@/app/api/_errorHandler";
import ResponseUtil from "@/app/api/_responseUtil";
import { authService } from "@/app/api/service/auth/_authService";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { UnauthorizedError } from "@/types/api/error/BadRequest";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse>> => {
  try {
    const refreshToken = cookieUtil.getCookie("refreshToken");

    await authService.updateAccessToken(refreshToken);
    await authService.updateRefreshToken(refreshToken);

    return ResponseUtil.success();
  } catch {
    throw new UnauthorizedError("토큰 갱신에 실패했습니다.");
  }
});
