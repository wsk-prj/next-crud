import { withErrorHandler } from "@/app/api/errorHandler";
import { authService } from "@/lib/auth/_authService";
import { ApiResponse } from "@/types/ApiResponse";
import { UnauthorizedError } from "@/types/error/BadRequest";
import cookieUtil from "@/utils/cookie/_cookieUtil";
import ResponseUtil from "@/utils/_responseUtil";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  try {
    const refreshToken = cookieUtil.getCookie("refreshToken");

    await authService.updateAccessToken(refreshToken);
    await authService.updateRefreshToken(refreshToken);

    return ResponseUtil.success();
  } catch {
    throw new UnauthorizedError("토큰 갱신에 실패했습니다.");
  }
});
