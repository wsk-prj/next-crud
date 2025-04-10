import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/responseUtil";
import cookieUtil from "@/utils/cookie/cookieUtil";
import { updateAccessToken } from "@/lib/auth/_authService";
import { withErrorHandler } from "@/app/api/errorHandler";

export const GET = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  const refreshToken = cookieUtil.getCookie("refreshToken");

  await updateAccessToken(refreshToken);

  return ResponseUtil.success();
});
