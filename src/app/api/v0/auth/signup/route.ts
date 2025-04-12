import { NextResponse } from "next/server";
import { userService } from "@/app/api/service/user/_userService";
import { ApiResponse } from "@/types/api/ApiResponse";
import ResponseUtil from "@/app/api/_responseUtil";
import { withErrorHandler } from "@/app/api/_errorHandler";

export const POST = withErrorHandler(async (request: Request): Promise<NextResponse<ApiResponse>> => {
  const { loginid, loginpw, nickname } = await request.json();

  if (!loginid || !loginpw || !nickname) {
    return ResponseUtil.rejected({
      message: "아이디, 비밀번호, 닉네임을 입력해야 합니다.",
    });
  }

  try {
    await userService.signup({ loginid, loginpw, nickname });
    return ResponseUtil.success({
      message: "회원가입이 완료되었습니다.",
    });
  } catch {
    return ResponseUtil.failed({
      message: "회원가입 중 오류가 발생했습니다.",
    });
  }
});
