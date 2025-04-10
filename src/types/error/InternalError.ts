import { ApiError } from "./ApiError";

export class InternalServerError extends ApiError {
  constructor(
    message: string = "서버 내부 오류가 발생했습니다",
    statusCode: number = 500,
    errorCode: string = "INTERNAL_SERVER_ERROR"
  ) {
    super(message, statusCode, errorCode);
  }
}
