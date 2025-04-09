"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Main = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { loggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(false);
    }
  }, [loggedIn]);

  return (
    <main id="main" className="px-8 py-4 h-5/6 flex flex-col gap-y-4">
      <section id="navbar">
        <nav className="flex h-4 items-center justify-center gap-x-2">
          {isLoading ? (
            ""
          ) : loggedIn ? (
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
