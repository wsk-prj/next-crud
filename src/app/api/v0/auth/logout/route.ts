import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/_responseUtil";
import cookieUtil from "@/utils/cookie/_cookieUtil";
import { withErrorHandler } from "@/app/api/errorHandler";

export const POST = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  cookieUtil.deleteCookie("accessToken");
  cookieUtil.deleteCookie("refreshToken");

  return ResponseUtil.success({
    message: "로그아웃에 성공했습니다.",
  });
});
