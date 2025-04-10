"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = (): React.ReactNode => {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
    alert("로그아웃에 성공했습니다.");
    router.push("/");
  }, []);

  return;
};

export default Logout;
