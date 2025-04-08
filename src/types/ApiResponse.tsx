// 응답 body 타입 정의
export type ApiResponse<T = null> = {
  data: T;
  message: string;
  timestamp: string;
};
