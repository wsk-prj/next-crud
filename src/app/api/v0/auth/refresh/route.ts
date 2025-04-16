import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { authService } from "@/app/api/service/auth/_authService";
import httpHeaderUtil from "@/app/api/utils/header/_httpHeaderUtil";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import csrfUtil from "@/app/api/utils/cookie/_csrfUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { Token } from "@/types/Token";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse<Token | null>>> => {
  const csrfToken = httpHeaderUtil.getHeader("x-csrf-token");
  await csrfUtil.validateToken(csrfToken!);

  try {
    const refreshToken = cookieUtil.getCookie("refreshToken");

    const accessToken = await authService.updateAccessToken(refreshToken);
    await authService.updateRefreshToken(refreshToken);

    console.log("[refresh] success");
    return responseUtil.success({
      message: "세션이 만료되었습니다. 다시 로그인해주세요.",
      data: accessToken,
    });
  } catch {
    return responseUtil.rejected({
      message: "세션이 만료되었습니다. 다시 로그인해주세요.",
      code: "SESSION_EXPIRED",
      status: 401,
    });
  }
});
