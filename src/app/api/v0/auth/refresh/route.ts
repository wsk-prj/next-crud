import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { authService } from "@/app/api/service/auth/_authService";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse>> => {
  try {
    const refreshToken = cookieUtil.getCookie("refreshToken");

    await authService.updateAccessToken(refreshToken);
    await authService.updateRefreshToken(refreshToken);

    return responseUtil.success();
  } catch {
    return responseUtil.rejected({
      message: "세션이 만료되었습니다. 다시 로그인해주세요.",
      code: "SESSION_EXPIRED",
      status: 401,
    });
  }
});
