// 응답 body 타입 정의
export type ApiResponse<T = null> = {
  data: T;
  code: string;
  message: string;
  timestamp: string;
};
