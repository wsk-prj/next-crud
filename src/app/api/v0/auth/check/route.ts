import { withErrorHandler } from "@/app/api/_errorHandler";
import ResponseUtil from "@/app/api/_responseUtil";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { jwtUtil } from "@/app/api/utils/jwt/_jwtUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { UnauthorizedError } from "@/types/api/error/BadRequest";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse>> => {
  const accessToken = cookieUtil.getCookie("accessToken");

  try {
    jwtUtil.verifyTokenValid(accessToken);
    jwtUtil.verifyTokenExpired(accessToken);
    return ResponseUtil.success();
  } catch {
    throw new UnauthorizedError("토큰이 만료되었습니다.");
  }
});
