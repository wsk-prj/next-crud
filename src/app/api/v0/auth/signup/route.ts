import { withErrorHandler } from "@/app/api/_errorHandler";
import ResponseUtil from "@/app/api/_responseUtil";
import { authService } from "@/app/api/service/auth/_authService";
import { AuthRequest } from "@/app/api/service/auth/dto/request/AuthRequest";
import { UserRequest } from "@/app/api/service/user/dto/request/UserRequest";
import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  const { loginid, loginpw, nickname } = await request.json();
  const authReqeust: AuthRequest = AuthRequest.from({ loginid, loginpw });
  const userRequest: UserRequest = UserRequest.from({ nickname });

  await authService.signup(authReqeust, userRequest);
  return ResponseUtil.success({
    message: "회원가입이 완료되었습니다.",
  });
});
