import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/responseUtil";
import TokenProvider, { Payload } from "@/lib/tokenProvider";
import { jwtUtil } from "@/utils/jwt/jwtUtil";
import cookieUtil from "@/utils/cookie/cookieUtil";
import { withErrorHandler } from "@/app/api/errorHandler";
import { UnauthorizedError } from "@/types/error/BadRequest";

export const GET = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse<Payload | null>>> => {
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
