"use client";

import { useEffect } from "react";
import { initAuthStore } from "@/hooks/useAuthStore";
import { initUserProfile } from "@/hooks/useUserProfile";
import { useAuthStore } from "@/hooks/useAuthStore";

export const Initializer = (): null => {
  const { payload } = useAuthStore();

  useEffect(() => {
    (async () => {
      await initAuthStore();
    })();
  }, []);

  useEffect(() => {
    if (!payload) {
      console.log(`[Initializer] payload is not set`);
      return;
    }

    (async () => {
      await initUserProfile();
    })();
  }, [payload]);

  return null;
};
