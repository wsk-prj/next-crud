"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { checkAuth } = useAuthStore();
  const { userProfile, fetchUserProfile } = useUserProfile();

  useEffect(() => {
    (async () => {
      await checkAuth();
      await fetchUserProfile();
    })();
  }, []);

  if (!userProfile) {
    return;
  }

  return <>{children}</>;
};
