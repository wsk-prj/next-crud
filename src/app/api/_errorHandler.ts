/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import ResponseUtil from "@/app/api/_responseUtil";
import { BadRequestError, UnauthorizedError } from "@/types/api/error/BadRequest";
import { ExternalServiceError, InternalServerError } from "@/types/api/error/InternalError";
import csrfUtil from "@/app/api/utils/cookie/_csrfUtil";

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

const handleApiError = async (error: unknown): Promise<NextResponse> => {
  if (error instanceof UnauthorizedError) {
    console.log("[errorHandler] UnauthorizedError:", error.message);
    return ResponseUtil.rejected({
      message: error.message,
      data: { token: await csrfUtil.getToken() },
      status: 401,
    });
  }
  if (error instanceof BadRequestError) {
    console.log("[errorHandler] BadRequestError:", error.message);
    return ResponseUtil.rejected({
      message: error.message,
      status: error.statusCode,
    });
  }

  if (error instanceof ExternalServiceError) {
    console.log("[errorHandler] ExternalServiceError:", error.message);
    return ResponseUtil.failed({
      message: error.message,
      status: error.statusCode,
    });
  }
  if (error instanceof InternalServerError) {
    console.log("[errorHandler] InternalServerError:", error.message);
    return ResponseUtil.failed({
      message: error.message,
      status: error.statusCode,
    });
  }

  console.log("[errorHandler] Unhandled Error:", error);
  return ResponseUtil.failed({
    message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    status: 500,
  });
};
