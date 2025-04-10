import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/responseUtil";
import TokenProvider, { Payload } from "@/lib/tokenProvider";
import { jwtUtil } from "@/utils/jwt/jwtUtil";
import cookieUtil from "@/utils/cookie/cookieUtil";

export async function GET(request: Request): Promise<NextResponse<ApiResponse<Payload | null>>> {
  const accessToken = cookieUtil.getCookie("accessToken");

  jwtUtil.verifyTokenExpired(accessToken);
  const payload = TokenProvider.getPayload(accessToken);

  return ResponseUtil.success({
    data: payload,
  });
}
