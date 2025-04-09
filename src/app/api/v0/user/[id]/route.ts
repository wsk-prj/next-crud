import User, { UserProfile } from "@/lib/user/User";
import { getUserProfile, withdrawUser } from "@/lib/user/_userService";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/responseUtil";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<UserProfile | null>>> {
  const { pathname } = request.nextUrl;
  const id: User["id"] = Number(pathname.split("/").pop());

  if (!id) {
    return ResponseUtil.rejected({
      message: "잘못된 요청입니다.",
    });
  }

  const user = await getUserProfile(Number(id));

  return ResponseUtil.success({
    data: user,
  });
}

export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse<UserProfile | null>>> {
  const { pathname } = request.nextUrl;
  const id: User["id"] = Number(pathname.split("/").pop());

  if (!id) {
    return ResponseUtil.rejected({
      message: "잘못된 요청입니다.",
    });
  }

  await withdrawUser(Number(id));

  return ResponseUtil.success();
}
