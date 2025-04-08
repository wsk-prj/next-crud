"use client";

import useAuthStore from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { setLoggedIn, setToken } = useAuthStore();

  useEffect(() => {
    setToken(null);
    setLoggedIn(false);
    alert("로그아웃에 성공했습니다.");
    router.push("/");
  }, []);

  return <div>로그아웃 중입니다...</div>;
};

export default Logout;
