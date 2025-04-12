import { withErrorHandler } from "@/app/api/_errorHandler";
import { userService } from "@/app/api/service/user/_userService";
import { UserProfile } from "@/app/api/service/user/User";
import { ApiResponse } from "@/types/api/ApiResponse";
import responseUtil from "@/app/api/_responseUtil";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { jwtUtil } from "@/app/api/utils/jwt/_jwtUtil";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse<UserProfile | null>>> => {
  const accessToken = cookieUtil.getCookie("accessToken");
  const payload = jwtUtil.decodeToken(accessToken);

  if (!payload) {
    return responseUtil.rejected({
      message: "잘못된 요청입니다.",
    });
  }

  const user = await userService.getUserProfile(Number(payload.sub));

  return responseUtil.success({
    data: user,
  });
});
