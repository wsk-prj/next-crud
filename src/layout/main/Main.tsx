"use client";

import Link from "next/link";
import { useState } from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main id="main" className="px-8 py-4 h-5/6">
      <section>
        <nav className="flex items-center justify-center gap-4">
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
      <section>{children}</section>
    </main>
  );
};

export default Main;
