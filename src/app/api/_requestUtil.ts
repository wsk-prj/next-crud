import { BadRequestError, UnauthorizedError } from "@/types/api/error/BadRequest";
import { NextRequest } from "next/server";
import { Payload } from "./lib/_tokenProvider";
import cookieUtil from "./utils/cookie/_cookieUtil";
import { jwtUtil } from "./utils/jwt/_jwtUtil";

export const requestUtil = {
  getResourceId: (request: NextRequest): number => {
    const { pathname } = request.nextUrl;
    const id: number = Number(pathname.split("/").pop());
    if (!id) {
      throw new BadRequestError("잘못된 요청입니다.");
    }
    return Number(id);
  },
  getQueryParam: (request: NextRequest, paramName: string, defaultValue?: string): string | undefined => {
    const searchParams = request.nextUrl.searchParams;
    const value = searchParams.get(paramName);
    return value ? value : defaultValue;
  },
  getPayload: async (): Promise<Payload> => {
    const accessToken = cookieUtil.getCookie("accessToken");
    const payload = jwtUtil.decodeToken(accessToken) as Payload;

    if (!payload) {
      throw new UnauthorizedError("잘못된 요청입니다.");
    }
    return payload;
  },
};
