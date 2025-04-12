import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api/ApiResponse";
import ResponseUtil from "@/app/api/_responseUtil";
import TokenProvider, { Payload } from "@/app/api/lib/_tokenProvider";
import { jwtUtil } from "@/app/api/utils/jwt/_jwtUtil";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { withErrorHandler } from "@/app/api/_errorHandler";
import { UnauthorizedError } from "@/types/api/error/BadRequest";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse<Payload | null>>> => {
  try {
    const accessToken = cookieUtil.getCookie("accessToken");

    jwtUtil.verifyTokenExpired(accessToken);
    const payload = TokenProvider.getPayload(accessToken);
    return ResponseUtil.success({
      data: payload,
    });
  } catch {
    throw new UnauthorizedError("토큰이 만료되었습니다.");
  }
});
