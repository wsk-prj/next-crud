"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import Link from "next/link";

const Main = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { loggedIn } = useAuthStore();

  return (
    <main id="main" className="px-8 py-4 h-5/6 flex flex-col gap-y-4">
      <section id="navbar">
        <nav className="flex items-center justify-center gap-x-2">
          {loggedIn ? (
            <>
              <Link href="/mypage">!회원정보</Link>
              <Link href="/board">!게시판</Link>
              <Link href="/auth/logout">!로그아웃</Link>
            </>
          ) : (
            <>
              <Link href="/board">!게시판</Link>
              <Link href="/auth/login">!로그인</Link>
            </>
          )}
        </nav>
      </section>
      <section id="content" className="flex-1 flex">
        <div className="flex-1 rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-y-4">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Main;
