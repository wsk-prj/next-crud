"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect } from "react";

export const Initializer = (): null => {
  const { checkAuth } = useAuthStore();
  const { fetchUserProfile } = useUserProfile();

  useEffect(() => {
    (async () => {
      await checkAuth();
      await fetchUserProfile();
    })();
  }, []);

  return null;
};
