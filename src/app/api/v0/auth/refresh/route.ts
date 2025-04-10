import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/responseUtil";
import cookieUtil from "@/utils/cookie/cookieUtil";
import { updateAccessToken } from "@/lib/auth/_authService";
import { withErrorHandler } from "@/app/api/errorHandler";
import { UnauthorizedError } from "@/types/error/BadRequest";

export const GET = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  try {
    const refreshToken = cookieUtil.getCookie("refreshToken");

    await updateAccessToken(refreshToken);

    return ResponseUtil.success();
  } catch {
    throw new UnauthorizedError("토큰 갱신에 실패했습니다.");
  }
});
