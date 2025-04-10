import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(message: string = "잘못된 요청입니다", statusCode: number = 400, errorCode: string = "BAD_REQUEST") {
    super(message, statusCode, errorCode);
  }
}

export class UnauthorizedError extends BadRequestError {
  constructor(message: string = "인증이 필요합니다", statusCode: number = 401, errorCode: string = "UNAUTHORIZED") {
    super(message, statusCode, errorCode);
  }
}

export class ForbiddenError extends BadRequestError {
  constructor(message: string = "접근 권한이 없습니다", statusCode: number = 403, errorCode: string = "FORBIDDEN") {
    super(message, statusCode, errorCode);
  }
}

export class NotFoundError extends BadRequestError {
  constructor(
    message: string = "리소스를 찾을 수 없습니다",
    statusCode: number = 404,
    errorCode: string = "NOT_FOUND"
  ) {
    super(message, statusCode, errorCode);
  }
}
