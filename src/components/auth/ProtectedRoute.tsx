"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { userProfile } = useUserProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!userProfile) {
      alert("로그인이 필요한 페이지입니다.");
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [userProfile]);

  if (!userProfile) {
    return;
  }

  return <>{children}</>;
};
