import { ApiResponse } from "@/types/api/ApiResponse";
import { NextResponse } from "next/server";

const now = (): string => new Date().toISOString();

interface ResponseUtilParams<T> {
  data?: ApiResponse<T>["data"];
  code?: ApiResponse<T>["code"];
  message?: ApiResponse<T>["message"];
  status?: number;
  headers?: Record<string, string>;
}

const responseUtil = {
  success: <T>(parmas: ResponseUtilParams<T> = {}): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: parmas.message ?? "요청 성공",
        code: parmas.code ?? "SUCCESS",
        data: parmas.data ?? null,
        timestamp: now(),
      },
      { status: parmas.status ?? 200, headers: parmas.headers }
    );
  },
  rejected: <T>(parmas: ResponseUtilParams<T> = {}): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: parmas.message ?? "요청 거부",
        code: parmas.code ?? "REJECTED",
        data: parmas.data ?? null,
        timestamp: now(),
      },
      { status: parmas.status ?? 400, headers: parmas.headers }
    );
  },
  failed: <T>(parmas: ResponseUtilParams<T> = {}): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: parmas.message ?? "요청 실패",
        code: parmas.code ?? "FAILED",
        data: parmas.data ?? null,
        timestamp: now(),
      },
      { status: parmas.status ?? 500, headers: parmas.headers }
    );
  },
};

export default responseUtil;
