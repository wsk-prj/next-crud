"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const { loggedIn } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      alert("로그인이 필요한 페이지입니다.");

      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", pathname);
      }

      router.push("/auth/login");
    }
    setIsChecking(false);
  }, []);

  if (isChecking || !loggedIn) {
    return null;
  }

  return <>{children}</>;
};
