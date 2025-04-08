import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import ResponseUtil from "@/utils/ResponseUtil";

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  return ResponseUtil.success({
    message: "로그아웃에 성공했습니다.",
  });
}
