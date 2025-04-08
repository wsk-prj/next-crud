import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

const now = () => new Date().toISOString();

interface ResponseUtilParams<T> {
  data?: ApiResponse<T>["data"];
  message?: ApiResponse<T>["message"];
  status?: number;
}

const ResponseUtil = {
  success: <T>({ data, message, status }: ResponseUtilParams<T>): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: message ?? "요청 성공",
        data: data ?? null,
        timestamp: now(),
      },
      { status: status ?? 200 }
    );
  },
  rejected: <T>({ data, message, status }: ResponseUtilParams<T>): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: message ?? "요청 거부",
        data: data ?? null,
        timestamp: now(),
      },
      { status: status ?? 400 }
    );
  },
  failed: <T>({ data, message, status }: ResponseUtilParams<T>): NextResponse<ApiResponse<T | null>> => {
    return NextResponse.json(
      {
        message: message ?? "요청 실패",
        data: data ?? null,
        timestamp: now(),
      },
      { status: status ?? 500 }
    );
  },
};

export default ResponseUtil;
