import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*"], // 모든 api 경로에 대해 미들웨어 설정
};

// 공개 경로 설정
export const publicApiPaths = [
  "/api/v0/auth/login",
  "/api/v0/auth/register",
  "/api/v0/auth/check",
  "/api/v0/auth/refresh",
  "/api/v0/board",
];

export function middleware(request: NextRequest): NextResponse {
  console.log("[middleware] " + request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  // 공개 경로인 경우, 통과
  if (publicApiPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 토큰이 없는 경우, 401 응답
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요한 기능입니다.", timestamp: new Date() }, { status: 401 });
  }

  return NextResponse.next();
}
