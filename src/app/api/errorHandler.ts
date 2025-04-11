import { NextRequest, NextResponse } from "next/server";
import ResponseUtil from "@/utils/_responseUtil";
import { BadRequestError } from "@/types/error/BadRequest";
import { InternalServerError } from "@/types/error/InternalError";

type RouteHandler = (req: NextRequest, ...args: any[]) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

const handleApiError = (error: unknown): NextResponse => {
  if (error instanceof BadRequestError) {
    console.log("[errorHandler] BadRequestError:", error);
    return ResponseUtil.failed({
      message: error.message,
      status: error.statusCode,
    });
  }

  if (error instanceof InternalServerError) {
    console.log("[errorHandler] InternalServerError:", error);
    return ResponseUtil.failed({
      message: error.message,
      status: error.statusCode,
    });
  }

  console.log("[errorHandler] Unhandled Error:", error);
  return ResponseUtil.failed({
    message: "서버 오류가 발생했습니다",
    status: 500,
  });
};
