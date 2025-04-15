import { withErrorHandler } from "@/app/api/_errorHandler";
import { requestUtil } from "@/app/api/_requestUtil";
import ResponseUtil from "@/app/api/_responseUtil";
import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async (): Promise<NextResponse<ApiResponse>> => {
  await requestUtil.getPayload();

  return ResponseUtil.success();
});
