import { PUBLIC_API_PATHS } from "@/utils/routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*"], // 모든 api 경로에 대해 미들웨어 설정
};

export function middleware(request: NextRequest): NextResponse {
  console.log("[middleware] " + request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  // 공개 경로인 경우, 통과
  if (PUBLIC_API_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 토큰이 없는 경우, 401 응답
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken) {
    return NextResponse.rewrite(new URL("/api/v0/auth/csrf", request.url));
  }

  return NextResponse.next();
}
