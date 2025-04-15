import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { userService } from "@/app/api/service/user/_userService";
import { UserRequest } from "@/app/api/service/user/dto/request/UserRequest";
import { requestUtil } from "@/app/api/_requestUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { UserResponse } from "@supabase/auth-js";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<UserResponse | null>>> => {
    const id: number = requestUtil.getResourceId(request);

    const userRequest: UserRequest = await request.json();
    await userService.updateUserProfile(id, userRequest);

    return responseUtil.success();
  }
);

export const DELETE = withErrorHandler(async (request: NextRequest): Promise<NextResponse<ApiResponse>> => {
  const id: number = requestUtil.getResourceId(request);

  await userService.withdrawUser(Number(id));

  return responseUtil.success();
});
