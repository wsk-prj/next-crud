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

export class ExternalServiceError extends InternalServerError {
  constructor(
    message: string = "외부 서비스 처리 중 오류가 발생했습니다",
    statusCode: number = 500,
    errorCode: string = "EXTERNAL_SERVICE_ERROR"
  ) {
    super(message, statusCode, errorCode);
  }
}

export class RepositoryError extends InternalServerError {
  constructor(
    message: string = "데이터베이스 처리 중 오류가 발생했습니다",
    statusCode: number = 500,
    errorCode: string = "REPOSITORY_ERROR"
  ) {
    super(message, statusCode, errorCode);
  }
}

export class ServiceError extends InternalServerError {
  constructor(
    message: string = "서비스 처리 중 오류가 발생했습니다",
    statusCode: number = 500,
    errorCode: string = "SERVICE_ERROR"
  ) {
    super(message, statusCode, errorCode);
  }
}

export class RouterError extends InternalServerError {
  constructor(
    message: string = "라우터 처리 중 오류가 발생했습니다",
    statusCode: number = 500,
    errorCode: string = "ROUTER_ERROR"
  ) {
    super(message, statusCode, errorCode);
  }
}
