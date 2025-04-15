import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { userService } from "@/app/api/service/user/_userService";
import { UserRequest } from "@/app/api/service/user/dto/request/UserRequest";
import { ApiResponse } from "@/types/api/ApiResponse";
import { UserResponse } from "@supabase/auth-js";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandler(
  async (
    request: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse<ApiResponse<UserResponse | null>>> => {
    const id: number = Number(params.id);

    const userRequest: UserRequest = await request.json();
    await userService.updateUserProfile(id, userRequest);

    // TODO: 회원정보 수정 후 쿠키, 토큰 갱신
    return responseUtil.success();
  }
);

export const DELETE = withErrorHandler(
  async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> => {
    const id: number = Number(params.id);

    await userService.withdrawUser(id);

    // TODO: 회원탈퇴 후 쿠키, 토큰 삭제
    return responseUtil.success();
  }
);
