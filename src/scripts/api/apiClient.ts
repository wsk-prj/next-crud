import instance from "./axiosConfig";
import { ApiResponse } from "../../types/api/ApiResponse";
import { AxiosError } from "axios";

interface Response<T> {
  result: ApiResponse<T> | null;
  error: ApiResponse<T> | null;
}

/**
 * API 호출 함수
 * Axios 인스턴스의 응답 또는 에러를 처리한 뒤 컴포넌트에 반환한다.
 *
 * T: 요청 데이터 타입
 * U: 응답 데이터 타입
 */
const apiClient = async <T, U>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  data?: T
): Promise<Response<U>> => {
  try {
    const response = await instance.request<ApiResponse<U>>({
      method,
      url,
      data,
    });
    return { result: response.data as ApiResponse<U>, error: null };
  } catch (error) {
    if (!(error instanceof AxiosError)) {
      console.log("[apiClient] error: ", error);
      throw error;
    }
    return { result: null, error: error.response?.data as ApiResponse<U> };
  }
};

export const GET = <U = null>(url: string): Promise<Response<U>> => {
  return apiClient<null, U>("GET", url);
};

export const POST = <T = null, U = null>(url: string, data?: T): Promise<Response<U>> => {
  return apiClient<T, U>("POST", url, data);
};

export const PATCH = <T = null, U = null>(url: string, data?: T): Promise<Response<U>> => {
  return apiClient<T, U>("PATCH", url, data);
};

export const DELETE = <U = null>(url: string): Promise<Response<U>> => {
  return apiClient<null, U>("DELETE", url);
};
