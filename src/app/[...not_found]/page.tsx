"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [count, router]);

  return (
    <div className="flex-1 items-center justify-center flex flex-col gap-y-4">
      <div className="text-2xl font-bold">페이지를 찾을 수 없습니다.</div>
      <div className="text-lg font-bold">
        {count ? `${count}초 후 메인 화면으로 이동합니다.` : "메인 화면으로 이동합니다."}
      </div>
    </div>
  );
}
