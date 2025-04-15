import { withErrorHandler } from "@/app/api/_errorHandler";
import { requestUtil } from "@/app/api/_requestUtil";
import responseUtil from "@/app/api/_responseUtil";
import { userService } from "@/app/api/service/user/_userService";
import { UserProfile } from "@/app/api/service/user/dto/response/UserProfile";
import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse<UserProfile | null>>> => {
  const payload = await requestUtil.getPayload();

  const user = await userService.getUserProfile(Number(payload.sub));

  return responseUtil.success({
    data: user,
  });
});
