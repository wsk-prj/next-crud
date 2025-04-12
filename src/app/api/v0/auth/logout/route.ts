import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api/ApiResponse";
import ResponseUtil from "@/app/api/_responseUtil";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { withErrorHandler } from "@/app/api/_errorHandler";

export const POST = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  cookieUtil.deleteCookie("accessToken");
  cookieUtil.deleteCookie("refreshToken");

  return ResponseUtil.success({
    message: "로그아웃에 성공했습니다.",
  });
});
