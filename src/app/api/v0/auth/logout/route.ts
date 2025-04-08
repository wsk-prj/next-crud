import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    { message: "로그아웃에 성공했습니다.", data: null, timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
