"use client";

import Content from "@/components/Content";
import { useAuthStore } from "@/hooks/useAuthStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Main = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { loggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading, loggedIn]);

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
      <section id="content" className="flex-1 flex flex-col">
        <Content>{children}</Content>
      </section>
    </main>
  );
};

export default Main;
