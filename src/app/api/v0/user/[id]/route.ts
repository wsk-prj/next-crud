import User, { UserProfile } from "@/app/api/service/user/User";
import { userService } from "@/app/api/service/user/_userService";
import { ApiResponse } from "@/types/api/ApiResponse";
import ResponseUtil from "@/app/api/_responseUtil";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/app/api/_errorHandler";

export const PATCH = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<UserProfile | null>>> => {
    const { pathname } = request.nextUrl;
    const id: User["id"] = Number(pathname.split("/").pop());

    if (!id) {
      return ResponseUtil.rejected({
        message: "잘못된 요청입니다.",
      });
    }

    const { nickname } = await request.json();

    if (!nickname) {
      return ResponseUtil.rejected({
        message: "닉네임을 입력해야 합니다.",
      });
    }

    await userService.updateUserProfile(Number(id), { nickname });

    return ResponseUtil.success();
  }
);

export const DELETE = withErrorHandler(async (request: NextRequest): Promise<NextResponse<ApiResponse>> => {
  const { pathname } = request.nextUrl;
  const id: User["id"] = Number(pathname.split("/").pop());

  if (!id) {
    return ResponseUtil.rejected({
      message: "잘못된 요청입니다.",
    });
  }

  await userService.withdrawUser(Number(id));

  return ResponseUtil.success();
});
