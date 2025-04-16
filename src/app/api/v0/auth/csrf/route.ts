import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import csrfUtil from "@/app/api/utils/cookie/_csrfUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { Token } from "@/types/Token";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse<Token | null>>> => {
  const csrfToken = await csrfUtil.getToken();

  return responseUtil.rejected({
    status: 401,
    message: "로그인이 필요한 기능입니다.",
    data: { token: csrfToken },
  });
});
